const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Progress = require('../models/Progress');
const logger = require('../utils/logger');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const isGoogleConfigured =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id.apps.googleusercontent.com';

if (isGoogleConfigured) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const googleId = profile.id;
          const name = profile.displayName;
          const avatar = profile.photos?.[0]?.value || '';

          // Find or create user
          let user = await User.findOne({ email });

          if (user) {
            // Link googleId if missing
            if (!user.googleId) {
              user.googleId = googleId;
              if (!user.avatar) user.avatar = avatar;
              await user.save();
            }
          } else {
            // Create user
            user = await User.create({
              name,
              email,
              googleId,
              avatar,
            });

            // Initialize progress stats
            await Progress.create({
              userId: user._id,
              assessmentsTaken: 0,
              careersExplored: 0,
              milestonesCompleted: 0,
              totalMilestones: 0,
              daysActive: 1,
              currentStreak: 1,
              lastActiveDate: new Date(),
            });
          }

          logger.info(`Google strategy auth successful for: ${user.email}`);
          return done(null, user);
        } catch (error) {
          logger.error(`Passport Google Strategy Error: ${error.message}`);
          return done(error, null);
        }
      }
    )
  );
} else {
  logger.warn('Google Client ID/Secret not set. Passport Google strategy disabled.');
}

module.exports = passport;

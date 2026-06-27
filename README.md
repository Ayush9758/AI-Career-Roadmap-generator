# 🚀 AI Career Roadmap Generator

An AI-powered web application that generates personalized career roadmaps based on a user's current skills, experience, career goals, and interests. The application leverages Large Language Models (LLMs) to provide structured learning paths, recommended resources, projects, certifications, and career guidance.

---

## 📌 Features

- 🎯 Personalized AI-generated career roadmaps
- 🤖 Powered by Large Language Models (LLMs)
- 📚 Skill gap analysis
- 🛣️ Step-by-step learning roadmap
- 💼 Project recommendations
- 📖 Course and certification suggestions
- 📊 Interactive roadmap visualization
- ⚡ Fast and responsive user interface
- 🔒 Secure API integration using environment variables

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- FastAPI
- REST API

### AI
- Google Gemini API *(or update with the model you're using)*

### Database *(if applicable)*
- SQLite / PostgreSQL / MongoDB *(Update if used)*

---

## 📂 Project Structure

```
AI-Career-Roadmap-Generator/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── requirements.txt
│   └── main.py
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Ayush9758/AI-Career-Roadmap-generator.git

cd AI-Career-Roadmap-generator
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will run on:

```
http://localhost:8000
```

---

## Environment Variables

Create a `.env` file in the appropriate directory and add:

```env
GEMINI_API_KEY=your_api_key_here
```

If additional environment variables are required, add them accordingly.

---

## How It Works

1. User enters their:
   - Current skills
   - Education
   - Career goal
   - Experience level
   - Interests

2. The frontend sends the information to the backend.

3. The backend processes the request and communicates with the AI model.

4. The AI generates:
   - Career roadmap
   - Learning path
   - Recommended projects
   - Certifications
   - Skills to acquire

5. The generated roadmap is displayed visually in the frontend.

---

## Future Improvements

- User Authentication
- Save generated roadmaps
- Download roadmap as PDF
- Progress tracking dashboard
- Resume Analyzer
- Job Recommendation System
- AI Interview Preparation
- Learning Resource Ranking
- Career Timeline Visualization

---

## Screenshots

### Home Page

*(Add screenshot here)*

---

### Generated Roadmap

*(Add screenshot here)*

---

### AI Response

*(Add screenshot here)*

---

## API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/generate-roadmap` | Generate personalized career roadmap |
| GET | `/health` | Health check |

*(Update according to your backend APIs.)*

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```
git checkout -b feature-name
```

3. Commit your changes

```
git commit -m "Added new feature"
```

4. Push to your branch

```
git push origin feature-name
```

5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

**Ayush**

GitHub: https://github.com/Ayush9758

---

⭐ If you found this project helpful, consider giving it a star!

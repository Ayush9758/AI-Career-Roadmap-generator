import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2, Send } from 'lucide-react';
import type { AssessmentQuestion, AssessmentAnswer } from '@/types/career.types';
import { assessmentService } from '@/services/assessmentService';
import QuestionCard from './QuestionCard';

interface AssessmentFormProps {
  questions: AssessmentQuestion[];
  onComplete?: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ questions, onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | string[] | number>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const total = questions.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === total - 1;
  const currentQuestion = questions[currentStep];
  const progressPercent = ((currentStep + 1) / total) * 100;

  const handleAnswer = useCallback(
    (questionId: string, value: string | string[] | number) => {
      setAnswers((prev) => {
        const next = new Map(prev);
        next.set(questionId, value);
        return next;
      });
    },
    []
  );

  const handleNext = useCallback(() => {
    if (!isLast) {
      setSlideDirection('left');
      setCurrentStep((s) => s + 1);
    }
  }, [isLast]);

  const handleBack = useCallback(() => {
    if (!isFirst) {
      setSlideDirection('right');
      setCurrentStep((s) => s - 1);
    }
  }, [isFirst]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const assessmentAnswers: AssessmentAnswer[] = Array.from(answers.entries()).map(
        ([questionId, answer]) => ({ questionId, answer })
      );
      await assessmentService.submitAssessment(assessmentAnswers);
      onComplete?.();
      navigate('/recommendations');
    } catch {
      // Error handling could be enhanced with a toast system
      console.error('Assessment submission failed');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, navigate, onComplete]);

  const currentAnswer = currentQuestion ? answers.get(currentQuestion.id) : undefined;

  const hasAnswer = (() => {
    if (!currentAnswer) return false;
    if (Array.isArray(currentAnswer)) return currentAnswer.length > 0;
    return true;
  })();

  return (
    <div style={styles.wrapper}>
      {/* Progress header */}
      <div style={styles.header}>
        <div style={styles.stepInfo}>
          <span style={styles.stepLabel}>
            Question <span className="gradient-text" style={{ fontWeight: 700 }}>{currentStep + 1}</span> of{' '}
            {total}
          </span>
        </div>

        <div className="progress-bar" style={{ marginTop: 'var(--space-sm)' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        key={currentStep}
        className={slideDirection === 'left' ? 'animate-slide-left' : 'animate-slide-right'}
        style={styles.questionContainer}
      >
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={handleAnswer}
          />
        )}
      </div>

      {/* Navigation */}
      <div style={styles.navRow}>
        <button
          id="assessment-back-btn"
          className="btn btn-secondary"
          onClick={handleBack}
          disabled={isFirst}
          style={{ minWidth: 120 }}
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {isLast ? (
          <button
            id="assessment-submit-btn"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting || !hasAnswer}
            style={{ minWidth: 160 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing…
              </>
            ) : (
              <>
                Submit
                <Send size={18} />
              </>
            )}
          </button>
        ) : (
          <button
            id="assessment-next-btn"
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!hasAnswer}
            style={{ minWidth: 120 }}
          >
            Next
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    maxWidth: 720,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xl)',
  },

  header: {
    width: '100%',
  },

  stepInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--space-xs)',
  },

  stepLabel: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },

  questionContainer: {
    minHeight: 280,
  },

  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--space-md)',
  },
};

export default AssessmentForm;

import React, { useCallback } from 'react';
import type { AssessmentQuestion } from '@/types/career.types';

interface QuestionCardProps {
  question: AssessmentQuestion;
  answer: string | string[] | number | undefined;
  onAnswer: (questionId: string, answer: string | string[] | number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer, onAnswer }) => {
  const handleSingleSelect = useCallback(
    (option: string) => {
      onAnswer(question.id, option);
    },
    [onAnswer, question.id]
  );

  const handleMultipleToggle = useCallback(
    (option: string) => {
      const current = Array.isArray(answer) ? answer : [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      onAnswer(question.id, updated);
    },
    [onAnswer, question.id, answer]
  );

  const handleScaleChange = useCallback(
    (value: number) => {
      onAnswer(question.id, value);
    },
    [onAnswer, question.id]
  );

  const renderSingleOptions = () => {
    if (!question.options) return null;
    return (
      <div style={styles.optionsGrid}>
        {question.options.map((option, idx) => {
          const isSelected = answer === option;
          return (
            <div
              key={idx}
              id={`${question.id}-opt-${idx}`}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => handleSingleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSingleSelect(option);
                }
              }}
              style={{
                ...styles.optionCard,
                ...(isSelected ? styles.optionCardSelected : {}),
              }}
            >
              <div
                style={{
                  ...styles.radioCircle,
                  ...(isSelected ? styles.radioCircleSelected : {}),
                }}
              >
                {isSelected && <div style={styles.radioInner} />}
              </div>
              <span style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                {option}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMultipleOptions = () => {
    if (!question.options) return null;
    const selected = Array.isArray(answer) ? answer : [];
    return (
      <div style={styles.pillsContainer}>
        {question.options.map((option, idx) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={idx}
              id={`${question.id}-opt-${idx}`}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => handleMultipleToggle(option)}
              style={{
                ...styles.pill,
                ...(isSelected ? styles.pillSelected : {}),
              }}
            >
              {isSelected && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {option}
            </button>
          );
        })}
      </div>
    );
  };

  const renderScale = () => {
    const min = question.min ?? 1;
    const max = question.max ?? 10;
    const currentValue = typeof answer === 'number' ? answer : Math.round((min + max) / 2);
    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <div style={styles.scaleContainer}>
        <div style={styles.scaleValueContainer}>
          <span className="gradient-text" style={styles.scaleValue}>
            {currentValue}
          </span>
          <span style={styles.scaleMax}>/ {max}</span>
        </div>

        <div style={styles.sliderWrapper}>
          <input
            id={`${question.id}-scale`}
            type="range"
            min={min}
            max={max}
            step={1}
            value={currentValue}
            onChange={(e) => handleScaleChange(Number(e.target.value))}
            style={styles.rangeInput}
          />
          {/* Track fill overlay */}
          <div
            style={{
              ...styles.sliderFill,
              width: `${percentage}%`,
            }}
          />
        </div>

        <div style={styles.scaleLabels}>
          <span style={styles.scaleLabelText}>
            {question.scaleLabels?.min ?? min}
          </span>
          <span style={styles.scaleLabelText}>
            {question.scaleLabels?.max ?? max}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card-static animate-slide-up" style={styles.card}>
      <h3 style={styles.questionText}>{question.question}</h3>

      <div style={styles.questionBody}>
        {question.type === 'single' && renderSingleOptions()}
        {question.type === 'multiple' && renderMultipleOptions()}
        {question.type === 'scale' && renderScale()}
      </div>

      {question.type === 'multiple' && (
        <p style={styles.hint}>Select all that apply</p>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  card: {
    padding: 'var(--space-2xl)',
  },

  questionText: {
    fontSize: 'var(--text-xl)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-xl)',
    lineHeight: 1.4,
  },

  questionBody: {
    marginTop: 'var(--space-md)',
  },

  /* ---- Single-select (radio card grid) ---- */
  optionsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },

  optionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: '0.875rem var(--space-lg)',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-glass)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    userSelect: 'none' as const,
  },

  optionCardSelected: {
    borderColor: 'var(--accent-primary)',
    background: 'rgba(124, 58, 237, 0.1)',
    boxShadow: '0 0 0 1px var(--accent-primary)',
  },

  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '2px solid var(--border-glass-hover)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all var(--transition-fast)',
  },

  radioCircleSelected: {
    borderColor: 'var(--accent-primary)',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: 'var(--accent-gradient)',
    animation: 'scaleIn 0.2s ease-out',
  },

  /* ---- Multiple-select (pills) ---- */
  pillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-sm)',
  },

  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.5rem 1rem',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    borderRadius: 'var(--radius-full)',
    background: 'var(--bg-glass)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-glass)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap',
  },

  pillSelected: {
    background: 'rgba(124, 58, 237, 0.15)',
    borderColor: 'var(--accent-primary)',
    color: 'var(--accent-secondary-light)',
  },

  /* ---- Scale (range slider) ---- */
  scaleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-lg) 0',
  },

  scaleValueContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 'var(--space-xs)',
  },

  scaleValue: {
    fontSize: 'var(--text-5xl)',
    fontWeight: 800,
    lineHeight: 1,
  },

  scaleMax: {
    fontSize: 'var(--text-lg)',
    color: 'var(--text-muted)',
    fontWeight: 500,
  },

  sliderWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 480,
    height: 8,
    background: 'var(--bg-glass)',
    borderRadius: 'var(--radius-full)',
    overflow: 'visible',
  },

  sliderFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: 'var(--accent-gradient)',
    borderRadius: 'var(--radius-full)',
    pointerEvents: 'none',
    transition: 'width var(--transition-fast)',
  },

  rangeInput: {
    position: 'absolute',
    top: -10,
    left: 0,
    width: '100%',
    height: 28,
    margin: 0,
    appearance: 'none',
    WebkitAppearance: 'none',
    background: 'transparent',
    cursor: 'pointer',
    zIndex: 2,
    // Thumb styling must be handled via CSS — we rely on browser defaults + transparent track
  },

  scaleLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
  },

  scaleLabelText: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-muted)',
    fontWeight: 500,
  },

  hint: {
    marginTop: 'var(--space-md)',
    fontSize: 'var(--text-xs)',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
};

export default QuestionCard;

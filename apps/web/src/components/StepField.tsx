import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepFieldProps {
  stepIndex: number;
  label: string;
  hint: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  error: string;
  ctaLabel: string;
  isLast?: boolean;
}

export function StepField({
  stepIndex,
  label,
  hint,
  type = 'text',
  value,
  onChange,
  onNext,
  error,
  ctaLabel,
  isLast = false,
}: StepFieldProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 380);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      onNext();
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'hsl(var(--card) / 0.5)',
    borderColor: focused
      ? 'hsl(var(--primary) / 0.6)'
      : error
      ? 'hsl(var(--destructive) / 0.8)'
      : 'hsl(var(--border))',
    color: 'hsl(var(--foreground))',
    boxShadow: focused
      ? '0 0 0 2px hsl(var(--primary) / 0.25), 0 0 24px hsl(var(--primary) / 0.18)'
      : 'none',
    transition: 'border-color 180ms ease-out, box-shadow 180ms ease-out',
    outline: 'none',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '0.75rem',
    padding: type === 'textarea' ? '0.875rem 1rem' : '0.875rem 1rem',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    resize: 'none' as const,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.8125rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    transition: 'color 200ms ease',
    background: focused
      ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-accent)))'
      : 'none',
    WebkitBackgroundClip: focused ? 'text' : 'unset',
    WebkitTextFillColor: focused ? 'transparent' : 'hsl(var(--muted-foreground))',
    backgroundClip: focused ? 'text' : 'unset',
  };

  return (
    <div className="flex w-full flex-col">
      {/* Label */}
      <label htmlFor={`step-field-${stepIndex}`} style={labelStyle}>
        {label}
      </label>

      {/* Hint */}
      <p
        className="mb-4 text-sm"
        style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.6 }}
      >
        {hint}
      </p>

      {/* Input */}
      {type === 'textarea' ? (
        <textarea
          id={`step-field-${stepIndex}`}
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          rows={4}
          placeholder=""
          style={inputStyle}
          aria-describedby={error ? `step-error-${stepIndex}` : undefined}
        />
      ) : (
        <input
          id={`step-field-${stepIndex}`}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder=""
          style={inputStyle}
          aria-describedby={error ? `step-error-${stepIndex}` : undefined}
        />
      )}

      {/* Inline error */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`step-error-${stepIndex}`}
            role="alert"
            className="mt-2 text-sm"
            style={{ color: 'hsl(var(--destructive))' }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.button
        onClick={onNext}
        className="mt-6 rounded-full px-8 py-3 text-sm font-semibold tracking-wide"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
          color: 'hsl(var(--primary-foreground))',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 24px hsl(var(--brand-accent) / 0.35)',
          fontFamily: 'var(--font-body)',
          alignSelf: 'flex-start',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={{ scale: [1, 1.015, 1] }}
        transition={{
          scale: {
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          },
        }}
        aria-label={ctaLabel}
      >
        {ctaLabel}
      </motion.button>
    </div>
  );
}

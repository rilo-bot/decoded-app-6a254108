import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

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
  isOptional?: boolean;
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
  isOptional = false,
}: StepFieldProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 360);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      onNext();
    }
  };

  const hasValue = value.trim().length > 0;
  const isValid = hasValue && !error;

  const sharedInputStyle: React.CSSProperties = {
    background: focused
      ? 'hsl(var(--card) / 0.7)'
      : 'hsl(var(--card) / 0.45)',
    borderColor: error
      ? 'hsl(var(--destructive) / 0.75)'
      : focused
      ? 'hsl(var(--primary) / 0.7)'
      : isValid
      ? 'hsl(var(--brand-accent) / 0.5)'
      : 'hsl(var(--border))',
    color: 'hsl(var(--foreground))',
    boxShadow: error
      ? '0 0 0 2px hsl(var(--destructive) / 0.18)'
      : focused
      ? '0 0 0 3px hsl(var(--primary) / 0.20), 0 0 28px hsl(var(--primary) / 0.14)'
      : 'none',
    transition: 'border-color 200ms ease, box-shadow 200ms ease, background 200ms ease',
    outline: 'none',
    width: '100%',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderRadius: '0.875rem',
    padding: type === 'textarea' ? '0.875rem 1rem' : '0.875rem 1.125rem',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    resize: 'none' as const,
    lineHeight: '1.6',
  };

  return (
    <div className="flex w-full flex-col">
      {/* Label row */}
      <div className="mb-1.5 flex items-center gap-2">
        <label
          htmlFor={`step-field-${stepIndex}`}
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{
            color: focused
              ? 'hsl(var(--primary))'
              : 'hsl(var(--muted-foreground) / 0.85)',
            transition: 'color 200ms ease',
          }}
        >
          {label}
        </label>
        {isOptional && (
          <span
            className="rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide"
            style={{
              background: 'hsl(var(--muted) / 0.6)',
              color: 'hsl(var(--muted-foreground) / 0.7)',
            }}
          >
            Optional
          </span>
        )}
      </div>

      {/* Hint */}
      <p
        className="mb-4 text-[0.8375rem] leading-relaxed"
        style={{ color: 'hsl(var(--muted-foreground) / 0.8)' }}
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
          style={sharedInputStyle}
          aria-describedby={error ? `step-error-${stepIndex}` : undefined}
          aria-invalid={!!error}
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
          style={sharedInputStyle}
          aria-describedby={error ? `step-error-${stepIndex}` : undefined}
          aria-invalid={!!error}
        />
      )}

      {/* Inline error */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`step-error-${stepIndex}`}
            role="alert"
            className="mt-2 flex items-center gap-1.5 text-xs"
            style={{ color: 'hsl(var(--destructive))' }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* CTA button */}
      <div className="mt-7">
        <motion.button
          onClick={onNext}
          className="relative overflow-hidden rounded-full px-8 py-3 text-sm font-semibold tracking-wide"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
            color: 'hsl(var(--primary-foreground))',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            boxShadow: '0 4px 20px hsl(var(--primary) / 0.40), 0 1px 4px hsl(280 75% 10% / 0.5)',
            letterSpacing: '0.02em',
          }}
          whileHover={{ scale: 1.04, boxShadow: '0 6px 28px hsl(var(--primary) / 0.55)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          aria-label={ctaLabel}
        >
          {/* Shine sweep on hover */}
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, hsl(var(--primary-foreground) / 0.14) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
            }}
            whileHover={{ transform: 'translateX(100%)' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          />
          <span className="relative z-10">{ctaLabel}</span>
        </motion.button>
      </div>

      {/* Enter key hint */}
      {type !== 'textarea' && (
        <p
          className="mt-3 text-[11px]"
          style={{ color: 'hsl(var(--muted-foreground) / 0.45)' }}
        >
          Press{' '}
          <kbd
            className="rounded px-1 py-0.5 text-[10px] font-medium"
            style={{
              background: 'hsl(var(--muted) / 0.6)',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--muted-foreground) / 0.7)',
            }}
          >
            Enter
          </kbd>{' '}
          {isLast ? 'to send' : 'to continue'}
        </p>
      )}
    </div>
  );
}

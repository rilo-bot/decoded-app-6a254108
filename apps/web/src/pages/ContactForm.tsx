import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { AuroraBackground } from '@/components/AuroraBackground';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { StepField } from '@/components/StepField';
import { SuccessOverlay } from '@/components/SuccessOverlay';
import { useContactStore } from '@/stores/contactStore';
import { toast } from 'sonner';

const STEPS = [
  {
    field: 'name' as const,
    label: 'Your name',
    hint: "Let's start with your name — we'll take it one step at a time.",
    type: 'text' as const,
    ctaLabel: 'Sounds good →',
    validate: (v: string) => {
      if (!v.trim()) return 'A name helps us greet you properly.';
      if (v.trim().length < 2) return 'Just a bit more — at least two characters.';
      return '';
    },
  },
  {
    field: 'email' as const,
    label: 'Your email',
    hint: "Where should we send our reply? We'll only use this to get back to you.",
    type: 'email' as const,
    ctaLabel: 'That looks right →',
    validate: (v: string) => {
      if (!v.trim()) return 'An email address is needed so we can reach you.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
        return 'Something looks off — double-check the email format.';
      return '';
    },
  },
  {
    field: 'phone' as const,
    label: 'Your phone',
    hint: 'Optional, but handy if you prefer a quick call. Skip it if you like.',
    type: 'tel' as const,
    ctaLabel: 'Continue →',
    validate: (_: string) => '',
  },
  {
    field: 'message' as const,
    label: 'Your message',
    hint: "What's on your mind? Share as much or as little as you'd like.",
    type: 'textarea' as const,
    ctaLabel: 'Send it ✦',
    validate: (v: string) => {
      if (!v.trim()) return 'A message gives us something to work with.';
      if (v.trim().length < 10) return 'A little more detail helps us understand better.';
      return '';
    },
  },
];

const slideVariants = {
  enter: {
    opacity: 0,
    y: 24,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -16,
  },
};

export default function ContactForm() {
  // === auto fetch-on-mount (backend planner) ===
  const fetchContacts = useContactStore((s) => s.fetchContacts);
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);
  // === end auto fetch-on-mount ===

  const currentStep = useContactStore((s) => s.currentStep);
  const values = useContactStore((s) => s.values);
  const showSuccess = useContactStore((s) => s.showSuccess);
  const entries = useContactStore((s) => s.entries);
  const setStep = useContactStore((s) => s.setStep);
  const setField = useContactStore((s) => s.setField);
  const submitForm = useContactStore((s) => s.submitForm);
  const resetForm = useContactStore((s) => s.resetForm);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const stepDef = STEPS[currentStep];

  const lastEntry = useMemo(() => {
    return entries.length > 0 ? entries[entries.length - 1] : null;
  }, [entries]);

  const handleNext = () => {
    if (!stepDef) return;
    const error = stepDef.validate(values[stepDef.field]);
    if (error) {
      setErrors((prev) => ({ ...prev, [stepDef.field]: error }));
      return;
    }
    setErrors((prev) => ({ ...prev, [stepDef.field]: '' }));

    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setStep((currentStep + 1) as 0 | 1 | 2 | 3);
    } else {
      submitForm();
      toast.success('Message sent — we will be in touch soon.');
    }
  };

  const handleChange = (val: string) => {
    if (!stepDef) return;
    setField(stepDef.field, val);
    if (errors[stepDef.field]) {
      setErrors((prev) => ({ ...prev, [stepDef.field]: '' }));
    }
  };

  return (
    <AuroraBackground>
      {/* Brand wordmark */}
      <div className="mb-8 flex flex-col items-center gap-1">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AuroraContact
        </h1>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          A light-speed conversation
        </p>
      </div>

      {/* Progress */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={STEPS.length}
        labels={['Name', 'Email', 'Phone', 'Message']}
      />

      {/* Form card */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl p-7"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--primary) / 0.14) 0%, hsl(var(--brand-accent) / 0.08) 100%)',
          border: '1px solid hsl(var(--primary) / 0.20)',
          boxShadow:
            '0 0 40px hsl(var(--primary) / 0.22), 0 8px 40px hsl(var(--card) / 0.5)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.32,
              ease: [0.34, 1.2, 0.64, 1],
            }}
          >
            {stepDef && (
              <StepField
                stepIndex={currentStep}
                label={stepDef.label}
                hint={stepDef.hint}
                type={stepDef.type}
                value={values[stepDef.field]}
                onChange={handleChange}
                onNext={handleNext}
                error={errors[stepDef.field] ?? ''}
                ctaLabel={stepDef.ctaLabel}
                isLast={currentStep === STEPS.length - 1}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step counter */}
        <p
          className="mt-6 text-right text-xs"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Step {currentStep + 1} of {STEPS.length}
        </p>
      </div>

      {/* Footer note */}
      <p
        className="mt-6 max-w-xs text-center text-xs leading-relaxed"
        style={{ color: 'hsl(var(--muted-foreground) / 0.7)' }}
      >
        Your details are kept private and used only to respond to your inquiry.
      </p>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && lastEntry && (
          <SuccessOverlay entry={lastEntry} onRestart={resetForm} />
        )}
      </AnimatePresence>
    </AuroraBackground>
  );
}
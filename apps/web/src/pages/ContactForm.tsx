import { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { StepField } from '@/components/StepField';
import { SuccessOverlay } from '@/components/SuccessOverlay';
import { useContactStore } from '@/stores/contactStore';
import { toast } from 'sonner';

const STEPS = [
  {
    field: 'name' as const,
    label: 'Your name',
    hint: "Let's start with who you are — we love putting a name to a conversation.",
    type: 'text' as const,
    ctaLabel: 'Sounds good →',
    isOptional: false,
    validate: (v: string) => {
      if (!v.trim()) return 'A name helps us greet you properly.';
      if (v.trim().length < 2) return 'Just a little more — at least two characters.';
      return '';
    },
  },
  {
    field: 'email' as const,
    label: 'Your email',
    hint: "Where should we send our reply? We will only use this to get back to you.",
    type: 'email' as const,
    ctaLabel: 'Looks good →',
    isOptional: false,
    validate: (v: string) => {
      if (!v.trim()) return 'An email address is needed so we can reach you.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
        return 'Something looks off — double-check the email format.';
      return '';
    },
  },
  {
    field: 'phone' as const,
    label: 'Phone number',
    hint: 'Optional, but handy if you prefer a quick call. Skip ahead if you like.',
    type: 'tel' as const,
    ctaLabel: 'Continue →',
    isOptional: true,
    validate: (_: string) => '',
  },
  {
    field: 'message' as const,
    label: 'Your message',
    hint: "What is on your mind? Share as much or as little as you would like.",
    type: 'textarea' as const,
    ctaLabel: 'Send it ✦',
    isOptional: false,
    validate: (v: string) => {
      if (!v.trim()) return 'A message gives us something to work with.';
      if (v.trim().length < 10) return 'A little more detail helps us understand better.';
      return '';
    },
  },
];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 28 : -20, scale: 0.97 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -18 : 20, scale: 0.98 }),
};

export default function ContactForm() {
  const currentStep = useContactStore((s) => s.currentStep);
  const values = useContactStore((s) => s.values);
  const showSuccess = useContactStore((s) => s.showSuccess);
  const entries = useContactStore((s) => s.entries);
  const setStep = useContactStore((s) => s.setStep);
  const setField = useContactStore((s) => s.setField);
  const submitForm = useContactStore((s) => s.submitForm);
  const resetForm = useContactStore((s) => s.resetForm);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);

  const stepDef = STEPS[currentStep];

  const lastEntry = useMemo(() => {
    return entries.length > 0 ? entries[entries.length - 1] : null;
  }, [entries]);

  const handleNext = () => {
    if (!stepDef) return;
    const error = stepDef.validate(values[stepDef.field]);
    if (error) {
      setErrors((prev) => ({ ...prev, [stepDef.field]: error }));
      toast.error(error);
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

  const handleBack = () => {
    if (currentStep === 0) return;
    setDirection(-1);
    setStep((currentStep - 1) as 0 | 1 | 2 | 3);
  };

  const handleChange = (val: string) => {
    if (!stepDef) return;
    setField(stepDef.field, val);
    if (errors[stepDef.field]) {
      setErrors((prev) => ({ ...prev, [stepDef.field]: '' }));
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* ── Global aurora glows ── */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          top: '-8%',
          left: '-5%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, hsl(var(--primary) / 0.28) 0%, transparent 68%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute"
        style={{
          bottom: '-14%',
          right: '-8%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, hsl(var(--brand-accent) / 0.22) 0%, transparent 68%)',
          filter: 'blur(68px)',
        }}
        animate={{ scale: [1, 1.12, 1], x: [0, -22, 0], y: [0, 16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* ── Main layout: split on desktop, stack on mobile ── */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">

        {/* ════════ LEFT PANEL — Brand / Photo ════════ */}
        <div className="relative hidden lg:flex lg:w-[45%] lg:flex-col lg:justify-end">
          {/* Photo fill */}
          <img
            src="https://images.pexels.com/photos/23918338/pexels-photo-23918338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Aurora borealis — northern lights glowing purple and teal over a dark sky"
            crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'var(--aurora-panel-overlay)',
            }}
          />
          {/* Content */}
          <div className="relative z-10 p-10 pb-14">
            {/* Logo */}
            <div className="mb-12">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
                    boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: 'hsl(var(--primary-foreground))' }}>
                    A
                  </span>
                </div>
                <span
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
                >
                  AuroraContact
                </span>
              </div>
            </div>

            {/* Tagline */}
            <div>
              <p
                className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: 'hsl(var(--brand-accent))' }}
              >
                A light-speed conversation
              </p>
              <h2
                className="text-4xl font-bold leading-[1.15] tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
              >
                We would love to
                <br />
                hear from you.
              </h2>
              <p
                className="mt-4 max-w-xs text-sm leading-relaxed"
                style={{ color: 'hsl(var(--muted-foreground) / 0.85)' }}
              >
                Fill in a few quick fields and your message will land with us instantly.
                We respond to every inquiry — usually within a day.
              </p>
            </div>

            {/* Stat strip */}
            <div
              className="mt-10 flex gap-6 rounded-xl px-5 py-4"
              style={{
                background: 'hsl(var(--card) / 0.25)',
                border: '1px solid hsl(var(--primary) / 0.18)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {[
                { value: entries.length.toString(), label: 'messages received' },
                { value: '< 24h', label: 'response time' },
                { value: '100%', label: 'private & secure' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-xl font-bold tabular-nums"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'hsl(var(--primary))',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[11px] leading-tight"
                    style={{ color: 'hsl(var(--muted-foreground) / 0.7)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════ RIGHT PANEL — Form ════════ */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 lg:px-12 lg:py-16">
          {/* Mobile logo */}
          <div className="mb-8 flex flex-col items-center gap-1 lg:hidden">
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
                  boxShadow: '0 0 16px hsl(var(--primary) / 0.4)',
                }}
              >
                <span className="text-xs font-bold" style={{ color: 'hsl(var(--primary-foreground))' }}>
                  A
                </span>
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
              >
                AuroraContact
              </span>
            </div>
            <p
              className="text-[11px] uppercase tracking-widest"
              style={{ color: 'hsl(var(--muted-foreground) / 0.6)' }}
            >
              A light-speed conversation
            </p>
          </div>

          <div className="w-full max-w-md">
            {/* Section heading */}
            <div className="mb-8">
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
              >
                Get in touch
              </h1>
              <p
                className="mt-1.5 text-sm leading-relaxed"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                Step {currentStep + 1} of {STEPS.length} — complete each field to send your message.
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
              className="relative overflow-hidden rounded-2xl p-7"
              style={{
                background:
                  'linear-gradient(145deg, hsl(var(--card) / 0.70) 0%, hsl(var(--card) / 0.45) 100%)',
                border: '1px solid hsl(var(--primary) / 0.18)',
                boxShadow:
                  '0 0 0 1px hsl(var(--primary) / 0.06), 0 0 50px hsl(var(--primary) / 0.18), 0 16px 48px hsl(280 50% 4% / 0.5)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute left-0 right-0 top-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
                  opacity: 0.7,
                }}
              />

              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.34,
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
                      isOptional={stepDef.isOptional}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Back button */}
            <AnimatePresence>
              {currentStep > 0 && (
                <motion.button
                  onClick={handleBack}
                  className="mt-4 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium"
                  style={{
                    background: 'transparent',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--muted-foreground))',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    transition: 'border-color 200ms ease, color 200ms ease',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  whileHover={{
                    borderColor: 'hsl(var(--primary) / 0.5)',
                    color: 'hsl(var(--foreground))',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  aria-label="Go back to previous step"
                >
                  ← Back
                </motion.button>
              )}
            </AnimatePresence>

            {/* Privacy footnote */}
            <p
              className="mt-8 text-center text-[11px] leading-relaxed"
              style={{ color: 'hsl(var(--muted-foreground) / 0.5)' }}
            >
              Your details are kept private and stored securely in your browser.
              <br />
              We never share your information with third parties.
            </p>
          </div>
        </div>
      </div>

      {/* ── Success overlay ── */}
      <AnimatePresence>
        {showSuccess && lastEntry && (
          <SuccessOverlay entry={lastEntry} onRestart={resetForm} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, labels }: ProgressIndicatorProps) {
  return (
    <div className="mb-8 w-full">
      {/* Step labels */}
      <div className="mb-3 flex items-center justify-between">
        {labels.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest transition-all duration-300"
              style={{
                color:
                  i < currentStep
                    ? 'hsl(var(--brand-accent))'
                    : i === currentStep
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--muted-foreground) / 0.5)',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Track */}
      <div
        className="relative h-[3px] w-full overflow-hidden rounded-full"
        style={{ background: 'hsl(var(--primary) / 0.12)' }}
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
          style={{
            width: `${((currentStep + 1) / totalSteps) * 100}%`,
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
            boxShadow: '0 0 10px hsl(var(--primary) / 0.6)',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
          }}
        />
      </div>

      {/* Step dots */}
      <div className="mt-2 flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-400 ${i === currentStep ? 'aurora-dot-active' : ''}`}
            style={{
              background:
                i < currentStep
                  ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))'
                  : i === currentStep
                  ? 'hsl(var(--primary))'
                  : 'hsl(var(--primary) / 0.18)',
              transform: i === currentStep ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.3, 0.64, 1), background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

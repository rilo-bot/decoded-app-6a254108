interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, labels }: ProgressIndicatorProps) {
  return (
    <div className="mb-8 w-full max-w-md">
      <div className="mb-3 flex items-center justify-between">
        {labels.map((label, i) => (
          <span
            key={label}
            className="text-xs font-medium transition-all duration-300"
            style={{
              color:
                i <= currentStep
                  ? 'hsl(var(--brand-accent))'
                  : 'hsl(var(--muted-foreground))',
              opacity: i === currentStep ? 1 : i < currentStep ? 0.8 : 0.45,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Track */}
      <div
        className="relative h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: 'hsl(var(--primary) / 0.15)' }}
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
      >
        {/* Filled segment */}
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep + 1) / totalSteps) * 100}%`,
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
            boxShadow: '0 0 8px hsl(var(--primary) / 0.5)',
          }}
        />
      </div>

      {/* Dots */}
      <div className="mt-2 flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full transition-all duration-300"
            style={{
              background:
                i < currentStep
                  ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))'
                  : i === currentStep
                  ? 'hsl(var(--primary))'
                  : 'hsl(var(--primary) / 0.2)',
              boxShadow:
                i === currentStep ? '0 0 8px hsl(var(--primary) / 0.7)' : 'none',
              transform: i === currentStep ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

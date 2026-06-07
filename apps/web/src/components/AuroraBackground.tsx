import { motion } from 'framer-motion';

export function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Primary bloom — upper left */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          top: '-12%',
          left: '-8%',
          width: '65vw',
          height: '65vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, hsl(var(--primary) / 0.32) 0%, hsl(var(--primary) / 0.10) 50%, transparent 72%)',
          filter: 'blur(56px)',
        }}
        animate={{ scale: [1, 1.09, 1], x: [0, 22, 0], y: [0, -14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Accent bloom — lower right */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          bottom: '-18%',
          right: '-12%',
          width: '75vw',
          height: '75vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, hsl(var(--brand-accent) / 0.26) 0%, hsl(var(--brand-accent) / 0.09) 50%, transparent 72%)',
          filter: 'blur(64px)',
        }}
        animate={{ scale: [1, 1.13, 1], x: [0, -26, 0], y: [0, 18, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
      />

      {/* Mid bridge glow */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          top: '38%',
          left: '32%',
          width: '48vw',
          height: '48vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, hsl(var(--primary) / 0.14) 0%, transparent 68%)',
          filter: 'blur(44px)',
        }}
        animate={{ scale: [1, 1.07, 1], x: [0, 14, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
      />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}

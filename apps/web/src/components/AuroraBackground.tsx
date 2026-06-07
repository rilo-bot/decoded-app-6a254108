import { motion } from 'framer-motion';

export function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Aurora orb 1 — primary bloom */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          top: '-10%',
          left: '-5%',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, hsl(var(--primary) / 0.28) 0%, hsl(var(--primary) / 0.10) 45%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 18, 0],
          y: [0, -12, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora orb 2 — accent bloom */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          bottom: '-15%',
          right: '-10%',
          width: '80vw',
          height: '80vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, hsl(var(--brand-accent) / 0.22) 0%, hsl(var(--brand-accent) / 0.08) 45%, transparent 70%)',
          filter: 'blur(56px)',
        }}
        animate={{
          scale: [1, 1.12, 1],
          x: [0, -22, 0],
          y: [0, 16, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Aurora orb 3 — mid bridge */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          top: '40%',
          left: '35%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, hsl(var(--primary) / 0.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.06, 1],
          x: [0, 12, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}

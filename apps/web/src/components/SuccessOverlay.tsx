import { motion } from 'framer-motion';
import { Check, Mail, Phone, User, MessageSquare, Sparkles } from 'lucide-react';
import { ContactEntry } from '@/types/contact';

interface SuccessOverlayProps {
  entry: ContactEntry;
  onRestart: () => void;
}

export function SuccessOverlay({ entry, onRestart }: SuccessOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background:
          'linear-gradient(135deg, hsl(var(--primary) / 0.92), hsl(var(--brand-accent) / 0.85))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Floating glow accents */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4"
        style={{
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, hsl(var(--primary-foreground) / 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4"
        style={{
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, hsl(var(--brand-accent) / 0.20) 0%, transparent 70%)',
          filter: 'blur(36px)',
        }}
      />

      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl p-8"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--card) / 0.18) 0%, hsl(var(--card) / 0.10) 100%)',
          border: '1px solid hsl(var(--primary-foreground) / 0.22)',
          boxShadow: '0 0 60px hsl(var(--primary) / 0.30), 0 0 120px hsl(var(--brand-accent) / 0.15)',
        }}
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.42, type: 'spring', bounce: 0.3, delay: 0.1 }}
      >
        {/* Check badge */}
        <div className="mb-6 flex justify-center">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: 'hsl(var(--primary-foreground) / 0.20)',
              boxShadow: '0 0 32px hsl(var(--primary-foreground) / 0.30)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, type: 'spring', bounce: 0.5 }}
          >
            <Check className="h-8 w-8" style={{ color: 'hsl(var(--primary-foreground))' }} aria-hidden="true" />
          </motion.div>
        </div>

        {/* Heading */}
        <div className="mb-2 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-4 w-4" style={{ color: 'hsl(var(--primary-foreground) / 0.85)' }} aria-hidden="true" />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'hsl(var(--primary-foreground) / 0.85)' }}
            >
              Message sent
            </span>
            <Sparkles className="h-4 w-4" style={{ color: 'hsl(var(--primary-foreground) / 0.85)' }} aria-hidden="true" />
          </div>

          <h2
            className="text-3xl font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'hsl(var(--primary-foreground))',
            }}
          >
            Thank you, {entry.name.split(' ')[0]}.
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'hsl(var(--primary-foreground) / 0.75)' }}>
            Your message is on its way. Here is a summary of what you shared.
          </p>
        </div>

        {/* Summary card */}
        <div
          className="mt-6 space-y-3 rounded-xl p-5"
          style={{
            background: 'hsl(var(--card) / 0.25)',
            border: '1px solid hsl(var(--primary-foreground) / 0.18)',
          }}
        >
          <SummaryRow icon={<User className="h-4 w-4" aria-hidden="true" />} label="Name" value={entry.name} />
          <SummaryRow icon={<Mail className="h-4 w-4" aria-hidden="true" />} label="Email" value={entry.email} />
          {entry.phone && (
            <SummaryRow icon={<Phone className="h-4 w-4" aria-hidden="true" />} label="Phone" value={entry.phone} />
          )}
          <SummaryRow
            icon={<MessageSquare className="h-4 w-4" aria-hidden="true" />}
            label="Message"
            value={entry.message}
            multiline
          />
        </div>

        {/* Restart CTA */}
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={onRestart}
            className="rounded-full px-8 py-3 text-sm font-semibold tracking-wide"
            style={{
              background: 'transparent',
              border: '1px solid hsl(var(--primary-foreground) / 0.5)',
              color: 'hsl(var(--primary-foreground))',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
            whileHover={{
              background: 'hsl(var(--primary-foreground) / 0.12)',
              borderColor: 'hsl(var(--primary-foreground) / 0.8)',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            Send another message
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  multiline?: boolean;
}

function SummaryRow({ icon, label, value, multiline = false }: SummaryRowProps) {
  return (
    <div className="flex gap-3">
      <div
        className="mt-0.5 flex-shrink-0"
        style={{ color: 'hsl(var(--primary-foreground) / 0.85)' }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(var(--primary-foreground) / 0.65)' }}>
          {label}
        </p>
        <p
          className={`mt-0.5 text-sm ${multiline ? 'whitespace-pre-wrap break-words' : 'truncate'}`}
          style={{ color: 'hsl(var(--primary-foreground))' }}
        >
          {value || '—'}
        </p>
      </div>
    </div>
  );
}

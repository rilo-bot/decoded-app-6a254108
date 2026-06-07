import { motion } from 'framer-motion';
import { Check, Mail, Phone, User, MessageSquare, ArrowRight } from 'lucide-react';
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
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        background:
          'linear-gradient(135deg, hsl(280 50% 6% / 0.94) 0%, hsl(170 30% 7% / 0.96) 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background aurora glows */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '10%',
          left: '15%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.22) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: '10%',
          right: '10%',
          width: '36vw',
          height: '36vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, hsl(var(--brand-accent) / 0.18) 0%, transparent 70%)',
          filter: 'blur(46px)',
        }}
      />

      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl"
        style={{
          background:
            'linear-gradient(145deg, hsl(var(--card) / 0.60) 0%, hsl(var(--card) / 0.35) 100%)',
          border: '1px solid hsl(var(--primary) / 0.28)',
          boxShadow:
            '0 0 0 1px hsl(var(--primary) / 0.08), 0 0 60px hsl(var(--primary) / 0.25), 0 24px 64px hsl(280 50% 4% / 0.7)',
        }}
        initial={{ scale: 0.9, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.44, type: 'spring', bounce: 0.25, delay: 0.08 }}
      >
        {/* Top accent stripe */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-accent)), hsl(var(--primary)))',
          }}
        />

        <div className="p-8">
          {/* Check badge */}
          <div className="mb-6 flex justify-center">
            <motion.div
              className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--brand-accent) / 0.18))',
                border: '1.5px solid hsl(var(--primary) / 0.4)',
                boxShadow: '0 0 40px hsl(var(--primary) / 0.35)',
              }}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
            >
              <Check
                className="h-8 w-8"
                style={{ color: 'hsl(var(--primary))' }}
                aria-hidden="true"
                strokeWidth={2.5}
              />
            </motion.div>
          </div>

          {/* Heading */}
          <div className="mb-6 text-center">
            <motion.p
              className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: 'hsl(var(--brand-accent))' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Message received
            </motion.p>
            <motion.h2
              className="text-3xl font-bold leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(90deg, hsl(var(--foreground)), hsl(var(--primary) / 0.9))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Thank you, {entry.name.split(' ')[0]}.
            </motion.h2>
            <motion.p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: 'hsl(var(--muted-foreground))' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Your submission is safely stored. Here is a summary of what you shared.
            </motion.p>
          </div>

          {/* Summary card */}
          <motion.div
            className="space-y-3.5 rounded-xl p-5"
            style={{
              background: 'hsl(var(--muted) / 0.3)',
              border: '1px solid hsl(var(--border) / 0.6)',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <SummaryRow
              icon={<User className="h-4 w-4" aria-hidden="true" />}
              label="Name"
              value={entry.name}
            />
            <Divider />
            <SummaryRow
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              label="Email"
              value={entry.email}
            />
            {entry.phone && (
              <>
                <Divider />
                <SummaryRow
                  icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                  label="Phone"
                  value={entry.phone}
                />
              </>
            )}
            <Divider />
            <SummaryRow
              icon={<MessageSquare className="h-4 w-4" aria-hidden="true" />}
              label="Message"
              value={entry.message}
              multiline
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-7 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.78 }}
          >
            <motion.button
              onClick={onRestart}
              className="flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold tracking-wide"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
                color: 'hsl(var(--primary-foreground))',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 20px hsl(var(--primary) / 0.38)',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              Send another
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Divider() {
  return (
    <div
      className="h-px w-full"
      style={{ background: 'hsl(var(--border) / 0.5)' }}
    />
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
        style={{ color: 'hsl(var(--primary) / 0.8)' }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: 'hsl(var(--muted-foreground) / 0.6)' }}
        >
          {label}
        </p>
        <p
          className={`mt-0.5 text-sm ${multiline ? 'whitespace-pre-wrap break-words' : 'truncate'}`}
          style={{ color: 'hsl(var(--foreground))' }}
        >
          {value || '—'}
        </p>
      </div>
    </div>
  );
}

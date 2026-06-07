import '@/styles/theme.css';
import '@/styles/brand.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import ContactForm from '@/pages/ContactForm';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route
          path="*"
          element={
            <div
              className="flex min-h-screen flex-col items-center justify-center gap-4 px-4"
              style={{ background: 'hsl(var(--background))' }}
            >
              {/* aurora glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 40%, hsl(var(--primary) / 0.20) 0%, transparent 65%)',
                }}
              />
              <h1
                className="relative text-8xl font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  background:
                    'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                404
              </h1>
              <p
                className="relative text-sm"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                This page drifted into the aurora.
              </p>
              <Link
                to="/"
                className="relative mt-2 rounded-full px-6 py-2.5 text-sm font-semibold"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
                  color: 'hsl(var(--primary-foreground))',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px hsl(var(--primary) / 0.35)',
                }}
              >
                Return home
              </Link>
            </div>
          }
        />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}

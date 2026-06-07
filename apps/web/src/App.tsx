import '@/styles/theme.css';
import { Routes, Route } from 'react-router-dom';
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
              className="flex min-h-screen flex-col items-center justify-center gap-4"
              style={{ background: 'hsl(var(--background))' }}
            >
              <h1
                className="text-7xl font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                404
              </h1>
              <p style={{ color: 'hsl(var(--muted-foreground))' }}>
                This page drifted into the aurora.
              </p>
              <a
                href="/"
                className="mt-2 rounded-full px-6 py-2.5 text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-accent)))',
                  color: 'hsl(var(--primary-foreground))',
                  textDecoration: 'none',
                }}
              >
                Return home
              </a>
            </div>
          }
        />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}

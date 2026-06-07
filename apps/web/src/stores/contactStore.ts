import { create } from 'zustand';
import { ContactEntry } from '@/types/contact';
import { apiUrl } from '@/lib/api';
import { toast } from 'sonner';

export type FormStep = 0 | 1 | 2 | 3;

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactState {
  currentStep: FormStep;
  values: FormValues;
  showSuccess: boolean;
  entries: ContactEntry[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

interface ContactActions {
  setStep: (step: FormStep) => void;
  setField: (field: keyof FormValues, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
  fetchContacts: () => Promise<void>;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export const useContactStore = create<ContactState & ContactActions>()(
  (set, get) => ({
    currentStep: 0,
    values: { ...initialValues },
    showSuccess: false,
    entries: [],
    loading: false,
    error: null,
    loaded: false,

    setStep: (step) => set({ currentStep: step }),

    setField: (field, value) =>
      set((state) => ({
        values: { ...state.values, [field]: value },
      })),

    submitForm: async () => {
      const { values } = get();
      try {
        const res = await fetch(apiUrl('/api/contacts'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            message: values.message,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const newEntry: ContactEntry = await res.json();
        set((state) => ({
          entries: [...state.entries, newEntry],
          showSuccess: true,
          error: null,
        }));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to submit form';
        set({ error: message });
        toast.error(message);
      }
    },

    resetForm: () =>
      set({
        currentStep: 0,
        values: { ...initialValues },
        showSuccess: false,
      }),

    fetchContacts: async () => {
      if (get().loading || get().loaded) return;
      set({ loading: true, error: null });
      try {
        const res = await fetch(apiUrl('/api/contacts'));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const entries = await res.json();
        set({ entries, loading: false, loaded: true });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load contacts';
        set({ loading: false, error: message });
        toast.error(message);
      }
    },
  })
);
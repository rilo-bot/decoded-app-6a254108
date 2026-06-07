import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContactEntry } from '@/types/contact';

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
}

interface ContactActions {
  setStep: (step: FormStep) => void;
  setField: (field: keyof FormValues, value: string) => void;
  submitForm: () => void;
  resetForm: () => void;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export const useContactStore = create<ContactState & ContactActions>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      values: { ...initialValues },
      showSuccess: false,
      entries: [],

      setStep: (step) => set({ currentStep: step }),

      setField: (field, value) =>
        set((state) => ({
          values: { ...state.values, [field]: value },
        })),

      submitForm: () => {
        const { values } = get();
        const newEntry: ContactEntry = {
          id: crypto.randomUUID(),
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
          createdAt: new Date(),
        };
        set((state) => ({
          entries: [...state.entries, newEntry],
          showSuccess: true,
        }));
      },

      resetForm: () =>
        set({
          currentStep: 0,
          values: { ...initialValues },
          showSuccess: false,
        }),
    }),
    {
      name: 'aurora-contact-storage',
    }
  )
);

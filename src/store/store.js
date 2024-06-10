import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useGlobalStore = create(
  persist(
    (set, get) => ({
      lang: 'en',
      changeLang: lang => set({ lang }),
      user: null,
      updateUser: user => set({ user }),
      cookies: {
        accepted: false,
        rejected: false,
      },
      updateCookiesChoice: ({ accepted, rejected }) =>
        set(state => ({ cookies: { ...state.cookies, accepted, rejected } })),
      loading: false,
      setLoading: val => set({ loading: val }),
      sessionID: '',
      setSessionID: val => set({ sessionID: val }),
      patient: {
        name: '',
        patientImage: null,
        dob: '',
        instructions: '',
        _product: '',
        _complementaryProduct: '',
        files: [],
      },
      setPatient: patient =>
        set(state => ({
          patient: { ...patient },
        })),
      resetPatient: () =>
        set(state => ({
          patient: {
            name: '',
            patientImage: null,
            dob: '',
            instructions: '',
            _product: '',
            _complementaryProduct: '',
            files: [],
          },
        })),
      newPlan: {},
      setPlanForPatient: ({ _patient, plan }) =>
        set(state => ({
          newPlan: {
            [_patient]: { ...plan },
          },
        })),
      resetPlanForPatient: ({ _patient }) =>
        set(state => ({
          newPlan: {
            [_patient]: null,
          },
        })),
    }),
    {
      name: 'plaini-link-storage',
      getStorage: () => createJSONStorage(() => localStorage),
    }
  )
);

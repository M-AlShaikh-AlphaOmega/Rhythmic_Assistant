import { create } from 'zustand';
import type { TremorAnalysis } from '../../shared/fft';

interface AssessmentState {
  isRecording: boolean;
  latestResult: TremorAnalysis | null;
  startRecording: () => void;
  stopRecording: () => void;
  setResult: (result: TremorAnalysis) => void;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  isRecording: false,
  latestResult: null,
  startRecording: () => set({ isRecording: true, latestResult: null }),
  stopRecording: () => set({ isRecording: false }),
  setResult: (result) => set({ latestResult: result }),
  reset: () => set({ isRecording: false, latestResult: null }),
}));

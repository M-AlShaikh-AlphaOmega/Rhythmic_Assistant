export interface DFTResult {
  real: Float32Array;
  imag: Float32Array;
  magnitude: Float32Array;
  frequency: Float32Array;
}

// O(N²) DFT — replace with Cooley-Tukey FFT in Phase 2
export function dft(signal: Float32Array, sampleRate: number): DFTResult {
  const N = signal.length;
  const real = new Float32Array(N);
  const imag = new Float32Array(N);
  const half = Math.floor(N / 2);
  const magnitude = new Float32Array(half);
  const frequency = new Float32Array(half);

  for (let k = 0; k < N; k++) {
    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      real[k] += signal[n] * Math.cos(angle);
      imag[k] -= signal[n] * Math.sin(angle);
    }
  }

  for (let k = 0; k < half; k++) {
    magnitude[k] = Math.sqrt(real[k] ** 2 + imag[k] ** 2) / N;
    frequency[k] = (k * sampleRate) / N;
  }

  return { real, imag, magnitude, frequency };
}

export const fft = dft;

export interface TremorAnalysis {
  dominantFrequency: number;
  magnitude: number;
  isTremor: boolean;
}

// Tremor band: 3–12 Hz; threshold calibrated in Phase 2
export function detectTremor(
  signal: Float32Array,
  sampleRate: number
): TremorAnalysis {
  const { magnitude, frequency } = fft(signal, sampleRate);

  let maxMagnitude = 0;
  let dominantFrequency = 0;

  for (let i = 0; i < frequency.length; i++) {
    if (frequency[i] >= 3 && frequency[i] <= 12 && magnitude[i] > maxMagnitude) {
      maxMagnitude = magnitude[i];
      dominantFrequency = frequency[i];
    }
  }

  return {
    dominantFrequency,
    magnitude: maxMagnitude,
    isTremor: maxMagnitude > 0.1,
  };
}

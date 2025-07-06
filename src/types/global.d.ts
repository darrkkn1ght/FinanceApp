// Global type declarations for React Native
declare global {
  function setTimeout(callback: (...args: unknown[]) => void, ms: number): number;
  function clearTimeout(id: number): void;
  function setInterval(callback: (...args: unknown[]) => void, ms: number): number;
  function clearInterval(id: number): void;
}

export {}; 
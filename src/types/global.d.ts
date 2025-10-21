export {};

declare global {
  interface Window {
    __SW_PENDING_SKILL?: string;
  }
}
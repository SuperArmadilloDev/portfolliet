export type Theme = 'light' | 'dark' | 'auto';

export const isValidTheme = (theme: string) : theme is Theme =>
  !!theme && (theme === 'light' || theme === 'dark' || theme === 'auto');
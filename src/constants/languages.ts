export interface Language {
  code: string;
  label: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'en - English' },
  { code: 'ja', label: 'ja - 日本語' },
  { code: 'es', label: 'es - Español' },
  { code: 'fr', label: 'fr - Français' },
  { code: 'de', label: 'de - Deutsch' },
  { code: 'zh', label: 'zh - 中文' },
  { code: 'ko', label: 'ko - 한국어' },
  { code: 'pt', label: 'pt - Português' },
];

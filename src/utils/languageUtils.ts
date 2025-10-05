export const LANGUAGES = [
  { code: 'all', name: 'All Languages' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
] as const;

export const getLanguageName = (languageCode: string): string => {
  const language = LANGUAGES.find(lang => lang.code === languageCode);
  if (language) {
    return language.name;
  }
  // If the language code isn't in our list, return the code in uppercase
  return languageCode.toUpperCase();
};
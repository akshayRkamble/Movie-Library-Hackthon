import { Select, Box } from '@chakra-ui/react';

import { LANGUAGES } from '../utils/languageUtils';

interface LanguageFilterProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageFilter = ({ selectedLanguage, onLanguageChange }: LanguageFilterProps) => {
  return (
    <Box width={{ base: "100%", md: "200px" }}>
      <Select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        bg="white"
        size="md"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};
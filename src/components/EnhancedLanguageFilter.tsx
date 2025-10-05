import { useState, useRef } from 'react';
import {
  Box,
  Input,
  List,
  ListItem,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  InputGroup,
  InputRightElement,
  Icon,
  useOutsideClick,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { LANGUAGES } from '../utils/languageUtils';

interface LanguageFilterProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageFilter = ({ selectedLanguage, onLanguageChange }: LanguageFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });

  const selectedLanguageName = LANGUAGES.find(lang => lang.code === selectedLanguage)?.name;

  const filteredLanguages = LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width={{ base: "100%", md: "250px" }} ref={ref}>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom"
        autoFocus={false}
      >
        <PopoverTrigger>
          <Box
            p={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            bg="white"
            cursor="pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Text>
              {selectedLanguageName || 'Select Language'}
              <Icon as={ChevronDownIcon} ml={2} />
            </Text>
          </Box>
        </PopoverTrigger>
        <PopoverContent maxH="400px">
          <PopoverBody p={0}>
            <VStack align="stretch" spacing={0}>
              <InputGroup size="md" p={2} borderBottom="1px solid" borderColor="gray.100">
                <Input
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <InputRightElement>
                  <SearchIcon color="gray.500" />
                </InputRightElement>
              </InputGroup>
              <Box overflowY="auto" maxH="300px">
                <List spacing={0}>
                  {filteredLanguages.map((lang) => (
                    <ListItem
                      key={lang.code}
                      px={4}
                      py={2}
                      cursor="pointer"
                      bg={selectedLanguage === lang.code ? 'teal.50' : 'transparent'}
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <Text>{lang.name}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
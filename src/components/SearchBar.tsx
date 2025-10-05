import { Input, InputGroup, Box, VStack, Text, useOutsideClick } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/movieService';
import { Movie } from '../types/movie';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onMovieSelect?: (movie: Movie) => void;
}

export const SearchBar = ({ onSearch, onMovieSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading } = useQuery(
    ['search', query],
    () => searchMovies(query),
    {
      enabled: query.length >= 2,
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        onSearch(query);
      }
    }, 300); // Debounce search for 300ms

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });

  const handleMovieSelect = (movie: Movie) => {
    setQuery(movie.title);
    setIsOpen(false);
    onMovieSelect?.(movie);
  };

  return (
    <Box position="relative" ref={ref} maxW="600px" mx="auto" my={6}>
      <InputGroup size="lg">
        <Input
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </InputGroup>

      {isOpen && query.length >= 2 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          maxH="400px"
          overflowY="auto"
          zIndex={10}
        >
          <VStack align="stretch" spacing={0}>
            {isLoading ? (
              <Box p={4}>
                <Text>Loading...</Text>
              </Box>
            ) : searchResults?.results.length ? (
              searchResults.results.map((movie) => (
                <Box
                  key={movie.id}
                  p={4}
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() => handleMovieSelect(movie)}
                >
                  <Text fontWeight="semibold">{movie.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {movie.release_date?.split('-')[0]}
                  </Text>
                </Box>
              ))
            ) : (
              <Box p={4}>
                <Text>No results found</Text>
              </Box>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};
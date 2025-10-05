import { useState, useMemo } from 'react';
import { Box, Heading, VStack, useToast, Text, Flex } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { InfiniteMovieGrid } from '../components/InfiniteMovieGrid';
import { SearchBar } from '../components/SearchBar';
import { LanguageFilter } from '../components/LanguageFilter';
import { RegionFilter } from '../components/RegionFilter';
import { getPopularMovies, searchMovies } from '../services/movieService';
import { Movie } from '../types/movie';
import { LANGUAGES } from '../utils/languageUtils';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const toast = useToast();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    ['movies', searchQuery, selectedRegion, selectedLanguage],
    ({ pageParam = 1 }) => (searchQuery 
      ? searchMovies(searchQuery, pageParam, selectedRegion) 
      : getPopularMovies(pageParam, selectedRegion)
    ),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to fetch movies',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedMovie(null);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchQuery(movie.title);
  };

  // Get all movies from all pages
  const allMovies = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  // Filter movies based on selected language
  const filteredMovies = useMemo(() => {
    if (selectedMovie) return [selectedMovie];
    
    let filtered = [...allMovies];
    
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter((movie: Movie) => movie.original_language === selectedLanguage);
    }
    
    return filtered;
  }, [allMovies, selectedMovie, selectedLanguage]);

  return (
    <VStack spacing={6} align="stretch">
      <Box textAlign="center" py={8}>
        <Heading size="2xl" mb={4}>
          Movie Library
        </Heading>
        <VStack spacing={4} width="100%">
          <Box width="100%" maxW="800px">
            <SearchBar 
              onSearch={handleSearch} 
              onMovieSelect={handleMovieSelect}
            />
          </Box>
          <Flex 
            direction={{ base: "column", md: "row" }} 
            gap={4} 
            justify="center" 
            align="center"
            width="100%"
            maxW="800px"
          >
            <Box flex="1">
              <RegionFilter
                selectedRegion={selectedRegion}
                onRegionChange={(region) => {
                  setSelectedRegion(region);
                  setSelectedLanguage('all'); // Reset language when region changes
                }}
              />
            </Box>
            <Box flex="1">
              <LanguageFilter
                selectedLanguage={selectedLanguage}
                onLanguageChange={(language) => {
                  setSelectedLanguage(language);
                  if (selectedMovie) {
                    setSelectedMovie(null);
                  }
                }}
              />
            </Box>
          </Flex>
        </VStack>
      </Box>
      
      {isLoading && !data ? (
        <Box textAlign="center">
          <Text fontSize="xl">Loading...</Text>
        </Box>
      ) : error ? (
        <Box textAlign="center">
          <Text fontSize="xl" color="red.500">Error loading movies</Text>
        </Box>
      ) : filteredMovies.length > 0 ? (
        <VStack spacing={4}>
          {selectedLanguage !== 'all' && (
            <Text color="gray.600">
              Showing {filteredMovies.length} movies in {
                LANGUAGES.find(lang => lang.code === selectedLanguage)?.name
              }
            </Text>
          )}
          <InfiniteMovieGrid
            movies={filteredMovies}
            isLoading={isFetchingNextPage}
            hasNextPage={!!hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </VStack>
      ) : (
        <Box textAlign="center" py={8}>
          <Text fontSize="xl" color="gray.500">
            No movies found for the selected filters.
            {searchQuery && ' Try searching with different keywords or changing the filters.'}
          </Text>
        </Box>
      )}
    </VStack>
  );
};
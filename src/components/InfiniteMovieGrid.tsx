import { useEffect, useRef } from 'react';
import { Box, SimpleGrid, Spinner, Center, Button } from '@chakra-ui/react';
import { MovieCard } from './MovieCard';
import { Movie } from '../types/movie';

interface InfiniteMovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export const InfiniteMovieGrid = ({
  movies,
  isLoading,
  hasNextPage,
  fetchNextPage,
}: InfiniteMovieGridProps) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasNextPage, isLoading, fetchNextPage]);

  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={6}
        padding={6}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>

      <Center p={6} ref={observerTarget}>
        {isLoading && <Spinner size="lg" />}
        {!isLoading && hasNextPage && (
          <Button onClick={fetchNextPage} colorScheme="teal">
            Load More Movies
          </Button>
        )}
      </Center>
    </Box>
  );
};
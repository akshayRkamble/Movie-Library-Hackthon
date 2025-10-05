import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { MovieGrid } from '../components/MovieGrid';
import { useWatchlist } from '../context/WatchlistContext';

export const WatchlistPage = () => {
  const { watchlist } = useWatchlist();

  return (
    <VStack spacing={6} align="stretch">
      <Box textAlign="center" py={8}>
        <Heading size="2xl" mb={4}>
          My Watchlist
        </Heading>
      </Box>
      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <Text textAlign="center" fontSize="xl" color="gray.500">
          Your watchlist is empty. Add some movies!
        </Text>
      )}
    </VStack>
  );
};
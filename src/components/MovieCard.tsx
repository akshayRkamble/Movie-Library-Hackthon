import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Tooltip,
  Flex,
  Spacer,
  Link,
} from '@chakra-ui/react';
import { Movie } from '../types/movie';
import { getLanguageName } from '../utils/languageUtils';
import { useWatchlist } from '../context/WatchlistContext';

interface MovieCardProps {
  movie: Movie;
}

const getReleaseStatus = (movie: Movie) => {
  // Check if movie is currently in theaters
  const isInTheaters = () => {
    if (!movie.release_dates?.results) return false;
    const usReleases = movie.release_dates.results.find(r => r.iso_3166_1 === 'US');
    if (!usReleases) return false;

    const theatricalRelease = usReleases.release_dates.find(d => d.type === 2); // type 2 is theatrical
    if (!theatricalRelease) return false;

    const releaseDate = new Date(theatricalRelease.release_date);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return releaseDate > threeMonthsAgo;
  };

  const releaseDate = new Date(movie.release_date);
  const now = new Date();

  if (movie.status === 'In Production') {
    return <Badge colorScheme="purple">In Production</Badge>;
  } else if (movie.status === 'Post Production') {
    return <Badge colorScheme="blue">Coming Soon</Badge>;
  } else if (isInTheaters()) {
    return <Badge colorScheme="red">In Theaters Now</Badge>;
  } else if (releaseDate > now) {
    return (
      <Badge colorScheme="orange">
        Releasing {releaseDate.toLocaleDateString()}
      </Badge>
    );
  } else if (movie.watch_providers?.results?.US?.flatrate) {
    return <Badge colorScheme="green">Available to Stream</Badge>;
  } else if (movie.watch_providers?.results?.US?.rent) {
    return <Badge colorScheme="yellow">Available to Rent</Badge>;
  } else {
    return <Badge colorScheme="gray">Released</Badge>;
  }
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.02)' }}
      bg="white"
      boxShadow="md"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        fallbackSrc="https://via.placeholder.com/500x750?text=No+Image"
        width="100%"
        height="auto"
      />

      <Box p="6">
        <VStack align="start" spacing={3}>
          <Flex width="100%" align="center" gap={2}>
            <Text fontWeight="bold" fontSize="xl" noOfLines={1}>
              {movie.title}
            </Text>
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              {new Date(movie.release_date).getFullYear()}
            </Text>
          </Flex>

          <VStack align="start" spacing={2}>
            <HStack>
              <Text fontSize="sm" fontWeight="bold" minWidth="70px">
                Genre:
              </Text>
              <HStack spacing={1} flexWrap="wrap">
                {movie.genres?.map((genre) => (
                  <Badge
                    key={genre.id}
                    colorScheme="teal"
                    variant="subtle"
                    fontSize="xs"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </HStack>
            </HStack>

            <HStack>
              <Text fontSize="sm" fontWeight="bold" minWidth="70px">
                Country:
              </Text>
              <Badge
                colorScheme="purple"
                variant="subtle"
                fontSize="xs"
              >
                {movie.production_countries?.[0]?.name || 'N/A'}
              </Badge>
            </HStack>

            <HStack>
              <Text fontSize="sm" fontWeight="bold" minWidth="70px">
                Language:
              </Text>
              <Badge
                colorScheme="blue"
                variant="subtle"
                fontSize="xs"
              >
                {getLanguageName(movie.original_language || '')}
              </Badge>
            </HStack>
          </VStack>

          <Text noOfLines={3} fontSize="sm" color="gray.600">
            {movie.overview}
          </Text>

          <HStack width="100%" spacing={4}>
            <Tooltip label="TMDB Rating">
              <HStack>
                <Text fontWeight="bold" color="yellow.500">
                  ⭐ {movie.vote_average.toFixed(1)}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  ({movie.vote_count?.toLocaleString()} votes)
                </Text>
              </HStack>
            </Tooltip>
            {movie.runtime && (
              <Text fontSize="sm" color="gray.500">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </Text>
            )}
          </HStack>

          {/* Release Status */}
          <Box width="100%">
            {getReleaseStatus(movie)}
          </Box>

          {/* Streaming Availability */}
          {movie.watch_providers?.results?.US && (
            <VStack align="start" width="100%" spacing={2}>
              {movie.watch_providers.results.US.flatrate && (
                <HStack>
                  <Badge colorScheme="green">Stream on</Badge>
                  <HStack spacing={1}>
                    {movie.watch_providers.results.US.flatrate.map((provider) => (
                      <Tooltip key={provider.provider_id} label={provider.provider_name}>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                          width="20px"
                          height="20px"
                          borderRadius="sm"
                        />
                      </Tooltip>
                    ))}
                  </HStack>
                </HStack>
              )}
              {movie.watch_providers.results.US.rent && (
                <HStack>
                  <Badge colorScheme="orange">Rent on</Badge>
                  <HStack spacing={1}>
                    {movie.watch_providers.results.US.rent.map((provider) => (
                      <Tooltip key={provider.provider_id} label={provider.provider_name}>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                          width="20px"
                          height="20px"
                          borderRadius="sm"
                        />
                      </Tooltip>
                    ))}
                  </HStack>
                </HStack>
              )}
            </VStack>
          )}

          <HStack width="100%" justify="space-between">
            {movie.imdb_id && (
              <Link
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                isExternal
                color="blue.500"
                fontSize="sm"
                fontWeight="medium"
              >
                View on IMDB
              </Link>
            )}
            <Button
              colorScheme={inWatchlist ? 'red' : 'teal'}
              onClick={handleWatchlistClick}
              size="sm"
            >
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
import { Box, Flex, Link as ChakraLink, Badge } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';

export const Navigation = () => {
  const { watchlist } = useWatchlist();

  return (
    <Box
      bg="teal.500"
      px={4}
      py={3}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
    >
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
        <ChakraLink as={RouterLink} to="/" color="white" fontWeight="bold">
          Home
        </ChakraLink>
        <Flex align="center">
          <ChakraLink as={RouterLink} to="/watchlist" color="white" fontWeight="bold">
            Watchlist
          </ChakraLink>
          {watchlist.length > 0 && (
            <Badge
              ml={2}
              borderRadius="full"
              px={2}
              py={1}
              bg="white"
              color="teal.500"
              fontWeight="bold"
            >
              {watchlist.length}
            </Badge>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
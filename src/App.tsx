import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WatchlistProvider } from './context/WatchlistContext';
import { HomePage } from './pages/HomePage';
import { WatchlistPage } from './pages/WatchlistPage';
import { Navigation } from './components/Navigation';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <WatchlistProvider>
          <Router>
            <Navigation />
            <Box pt="60px"> {/* Add padding to account for fixed navigation */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
              </Routes>
            </Box>
          </Router>
        </WatchlistProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
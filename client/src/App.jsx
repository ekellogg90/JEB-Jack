import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GameProvider } from './utils/GlobalState';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <GameProvider>
        <Navbar />
        <Outlet />
      </GameProvider>
    </ApolloProvider>
  )
}

export default App;

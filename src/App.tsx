import { PlayerProvider } from './providers/Player';
import { PlaylistProvider } from './providers/Playlist';
import { Layout } from './components/core';
import Router from './Router';

import './styles/globals.scss';
import './styles/fontiran.scss';
import './styles/materialIcons.scss';
import './App.scss';

function App() {
  return (
    <PlayerProvider>
      <PlaylistProvider>
        <div className="app">
          <Layout>
            <Router />
          </Layout>
        </div>
      </PlaylistProvider>
    </PlayerProvider>
  );
}

export default App;

import { Provider } from 'react-redux';

import { PlaylistProvider } from './providers/Playlist';
import { Layout } from './components/core';
import { store } from './store';
import Router from './Router';

import './styles/globals.scss';
import './styles/fontiran.scss';
import './styles/materialIcons.scss';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <PlaylistProvider>
        <div className="app">
          <Layout>
            <Router />
          </Layout>
        </div>
      </PlaylistProvider>
    </Provider>
  );
}

export default App;

import { Provider } from 'react-redux';

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
      <div className="app">
        <Layout>
          <Router />
        </Layout>
      </div>
    </Provider>
  );
}

export default App;

import { Provider } from 'react-redux';

import { Layout } from './components/core';
import { store } from './store';
import Router from './Router';

import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        {/* <div className="app-main"> */}
          <Layout>
            <Router />
          </Layout>
        {/* </div> */}
      </div>
    </Provider>
  );
}

export default App;

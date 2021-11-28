import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../app/store';
import { Layout } from '../app/components/core';

import '../styles/globals.scss';
import '../styles/fontiran.scss';
import '../styles/materialIcons.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

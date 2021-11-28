import Head from 'next/head';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import {
  State,
  Status
} from '../../slice';

import styles from './Layout.module.scss';

type ComponentProps = {
  children : JSX.Element
};

const defaultProps = {
  children : null
};

const Layout = ({ children }: ComponentProps): JSX.Element => {
  const state: State = useAppSelector((state: RootState): State => {
    return {
      status: state.global.status
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
      </Head>

      {children}
    </div>
  );
}
Layout.defaultProps = defaultProps;

export { Layout };

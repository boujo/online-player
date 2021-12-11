
import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import {
  State,
  Status
} from '../../slice';
import {
  Player
} from './';

import styles from './Layout.module.scss';

type ComponentProps = {
  children : JSX.Element
};

const defaultProps = {
  children : null
};

function Layout({ children }: ComponentProps): JSX.Element {
  const state: State = useAppSelector((state: RootState): State => {
    return {
      status: state.global.status,
      selectedKey: state.global.selectedKey
    }
  });

  return (
    <div className={styles.container}>
      {children}

      <Player
        fileKey={state.selectedKey}
      />
    </div>
  );
}
Layout.defaultProps = defaultProps;

export { Layout };

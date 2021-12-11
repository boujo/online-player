
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
      status       : state.global.status,
      selectedFile : state.global.selectedFile,
    }
  });

  return (
    <div className={styles.container}>
      {children}

      <Player
        fileInfo={state.selectedFile}
      />
    </div>
  );
}
Layout.defaultProps = defaultProps;

export { Layout };

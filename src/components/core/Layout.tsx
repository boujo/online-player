import { usePlayer } from '../../providers/Player';
import { Player } from './';

import styles from './Layout.module.scss';

type ComponentProps = {
  children: JSX.Element;
};

const defaultProps = {
  children: null,
};

function Layout({ children }: ComponentProps): JSX.Element {
  const { selectedFile } = usePlayer();

  return (
    <div className={styles.container}>
      {children}

      <Player fileInfo={selectedFile} />
    </div>
  );
}
Layout.defaultProps = defaultProps;

export { Layout };

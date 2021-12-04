
import styles from './Header.module.scss';

type ComponentProps = {
  onSelectDirectoryButtonClick: () => void
};

const defaultProps = {
  onSelectDirectoryButtonClick: () => {}
};

const Header = ({ onSelectDirectoryButtonClick }: ComponentProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.middle} />

      <div
        className={styles.selectDirectoryButton}
        onClick={onSelectDirectoryButtonClick}
      >
        Select Directory
      </div>
    </div>
  );
}
Header.defaultProps = defaultProps;

export { Header };

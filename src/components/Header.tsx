import { Link } from "react-router-dom";
import styles from './Header.module.scss';

type ComponentProps = {
  onSelectDirectoryButtonClick: () => void
};

const defaultProps = {
  onSelectDirectoryButtonClick: () => {}
};

const Header = ({ onSelectDirectoryButtonClick }: ComponentProps): JSX.Element => {
  const items = [
    { title: 'Tracks', route: '/tracks', icon: '' },
    { title: 'Albums', route: '/albums', icon: '' },
    { title: 'Artists', route: '/artists', icon: '' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        {items.map((item) => {
          return (
            <Link to={item.route} className={styles.navigationItem}>
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className={styles.middle} />

      <div
        className={styles.selectDirectoryButton}
        onClick={onSelectDirectoryButtonClick}
      >
        Select Directory
      </div>

      <div className={styles.moreButton}>
        <i className="material-icons">more_vert</i>
      </div>
    </div>
  );
}
Header.defaultProps = defaultProps;

export { Header };

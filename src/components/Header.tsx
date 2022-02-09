import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

type ComponentProps = {
  route: string;
  onSelectDirectoryButtonClick: () => void;
};

const defaultProps = {
  route: '',
  onSelectDirectoryButtonClick: () => {
    return null;
  },
};

const Header = ({
  route,
  onSelectDirectoryButtonClick,
}: ComponentProps): JSX.Element => {
  const items = [
    { title: 'Tracks', route: '/tracks', icon: 'music_note' },
    { title: 'Albums', route: '/albums', icon: 'album' },
    { title: 'Artists', route: '/artists', icon: 'person' },
    { title: 'Playlist', route: '/playlist', icon: 'queue_music' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        {items.map((item) => {
          return (
            <Link
              key={item.title}
              to={item.route}
              className={`${styles.navigationItem} ${
                route === item.route ? styles.selected : ''
              }`}
            >
              {/* {item.title} */}
              <i className="material-icons">{item.icon}</i>
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
};
Header.defaultProps = defaultProps;

export { Header };

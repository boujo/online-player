import { Link } from "react-router-dom";
import styles from './Sidebar.module.scss';

type ComponentProps = {
  route : string
};

const defaultProps = {
  route : ''
};

const Sidebar = ({ route }: ComponentProps): JSX.Element => {
  const items = [
    { title: 'Tracks', route: '/tracks', icon: 'music_note' },
    { title: 'Albums', route: '/albums', icon: 'album' },
    { title: 'Artists', route: '/artists', icon: 'person' },
    { title: 'Playlist', route: '/playlist', icon: 'queue_music' },
  ];

	return (
		<div className={styles.container}>
      {items.map((item) => {
        return (
          <Link
            key={item.title}
            to={item.route}
            className={`${styles.item} ${route === item.route ? styles.selected : ''}`}
          >
            <i className="material-icons">{item.icon}</i>

            <div className={styles.itemTitle}>
              {item.title}
            </div>
          </Link>
        );
      })}
		</div>
	);
}
Sidebar.defaultProps = defaultProps;

export { Sidebar };

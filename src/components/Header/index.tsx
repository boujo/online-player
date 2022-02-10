import { Link, useNavigate } from 'react-router-dom';
import { PropsType } from './types';
import styles from './styles.module.scss';

function Header({
  route,
  onSelectDirectoryButtonClick,
  backButton,
}: PropsType): JSX.Element {
  const navigate = useNavigate();

  const items = [
    { title: 'Tracks', route: '/tracks', icon: 'music_note' },
    { title: 'Albums', route: '/albums', icon: 'album' },
    { title: 'Artists', route: '/artists', icon: 'person' },
    { title: 'Playlist', route: '/playlist', icon: 'queue_music' },
  ];

  return (
    <div className={styles.container}>
      {backButton ? (
        <div
          className={styles.backButton}
          role="button"
          tabIndex={0}
          onClick={() => {
            navigate(-1);
          }}
        >
          <i className="material-icons">arrow_back</i>
        </div>
      ) : (
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
      )}

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

Header.defaultProps = {
  route: '',
  onSelectDirectoryButtonClick: () => {
    return null;
  },
  backButton: false,
};

export { Header };

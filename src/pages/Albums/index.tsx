import { useNavigate } from 'react-router-dom';
import { openDB } from 'idb';
import { Header, Sidebar, Loading } from '../../components';
import { Item } from './components';
import { useAlbums } from './hooks';

import styles from './styles.module.scss';

function Albums() {
  const navigate = useNavigate();
  const { list, loading } = useAlbums(openDB);

  return (
    <div className={styles.container}>
      <Header route="/albums" />

      <div className={styles.main}>
        <Sidebar route="/albums" />

        <div className={styles.right}>
          <div className={styles.list}>
            {list.map(function (item, index) {
              return (
                <Item
                  key={item.key}
                  index={index}
                  name={item.name}
                  cover={item.cover}
                  artist={item.artist}
                  onSelect={() => {
                    navigate(
                      `/albums/${item.key}/${item.name.replaceAll(' ', '-')}`
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <Loading size="large" />
        </div>
      ) : null}
    </div>
  );
}

export default Albums;

import { useNavigate } from 'react-router-dom';
import { openDB } from 'idb';
import { Header, Sidebar, Loading } from '../../components';
import { Item } from './components';
import { useArtists } from './hooks';

import styles from './index.module.scss';

function Artists() {
  const navigate = useNavigate();
  const { list, loading } = useArtists(openDB);

  return (
    <div className={styles.container}>
      <Header
        route="/artists"
        onSelectDirectoryButtonClick={() => {
          return null;
        }}
      />

      <div className={styles.main}>
        <Sidebar route="/artists" />

        <div className={styles.right}>
          <div className={styles.list}>
            {list.map(function (item, index) {
              return (
                <Item
                  key={item.key}
                  index={index}
                  name={item.name}
                  onSelect={() => {
                    navigate(
                      `/artists/${item.key}/${item.name.replaceAll(' ', '-')}`
                    );
                    // dispatch(selectedKeyChange({ key: item.key }));
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

export default Artists;

import { useParams } from "react-router-dom";
import { openDB } from "idb";
import {
  Header,
  Sidebar,
  Loading
} from '../../components';
import { Item } from './components';
import { useArtist } from './hooks';
import styles from './styles.module.scss';

const Artist = () => {
  const { key, name } = useParams<'key' | 'name'>();
  const { info, list, loading } = useArtist(openDB, key);

  const onSelectDirectoryButtonClick = () => {
  };

  return (
    <div className={styles.container}>
      <Header
        route="/tracks"
        onSelectDirectoryButtonClick={onSelectDirectoryButtonClick}
      />

      <div className={styles.main}>
        <Sidebar
          route="/tracks"
        />

        <div className={styles.right}>
          <div className={styles.header}>
            <div className={styles.cover}>
              {/* <img alt={info.name} src={info.cover} /> */}
            </div>

            <div className={styles.info}>
              <div className={styles.name}>{info.name}</div>
              <div className={styles.year}>year</div>
            </div>
          </div>

          <div
            className={styles.list}
            role="list"
          >
            {list.map(function(item, index) {
              return (
                <Item
                  key={item.key}
                  index={index}
                  name={item.name}
                  cover={item.cover}
                  artist={item.artist}
                  onSelect={() => {
                    // navigate(`/albums/${item.key}/${item.name.replaceAll(' ', '-')}`);
                    // dispatch(selectedKeyChange({ key: item.key }));
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {loading ?
        <div className={styles.loading}>
          <Loading size="large" />
        </div>
        :
        null
      }
    </div>
  );
}

export default Artist;

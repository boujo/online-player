import { useParams } from 'react-router-dom';
import { openDB } from 'idb';
import { Header, Sidebar, Loading, Image } from '../../components';
import { useAppDispatch } from '../../hooks';
import { selectedFileChange } from '../../slice';
import { Item } from './components';
import { useAlbum } from './hooks';
import styles from './styles.module.scss';

const Album = () => {
  const dispatch = useAppDispatch();

  const { key = '', name } = useParams<'key' | 'name'>();
  const { info, list, loading } = useAlbum(openDB, key);

  return (
    <div className={styles.container}>
      <Header backButton />

      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.cover}>
            <Image src={info.cover} type="album" alt={info.name} />
          </div>

          <div className={styles.info}>
            <div className={styles.name}>{info.name}</div>
            <div className={styles.artist}>{info.artist}</div>
          </div>
        </div>

        <div className={styles.list} role="list">
          {list.map(function (item, index) {
            console.log(item);
            return (
              <Item
                key={item.key}
                index={index}
                name={item.name}
                title={item.title}
                artist={item.artist}
                cover={item.cover}
                onSelect={() => {
                  dispatch(selectedFileChange({ key: item.key }));
                }}
              />
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <Loading size="large" />
        </div>
      ) : null}
    </div>
  );
};

export default Album;

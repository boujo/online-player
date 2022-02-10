import { useParams } from 'react-router-dom';
import { openDB } from 'idb';
import { Header, Image } from '../../components';
import { useAppDispatch } from '../../hooks';
import { selectedFileChange } from '../../slice';
import { Item } from './components';
import { useArtist } from './hooks';
import styles from './styles.module.scss';

const Artist = () => {
  const dispatch = useAppDispatch();

  const { key = '', name } = useParams<'key' | 'name'>();
  const { info, list, loading } = useArtist(openDB, key);

  return (
    <div className={styles.container}>
      <Header backButton />

      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.cover}>
            <Image src="" type="artist" alt={info.name} />
          </div>

          <div className={styles.info}>
            <div className={styles.name}>{info.name}</div>
          </div>
        </div>

        <div className={styles.list} role="list">
          {list.map(function (item, index) {
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
    </div>
  );
};

export default Artist;

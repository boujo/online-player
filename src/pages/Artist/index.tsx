import { useParams } from 'react-router-dom';
import { openDB } from 'idb';
import { Header, Sidebar, Loading, Image } from '../../components';
import { Item } from './components';
import { useArtist } from './hooks';
import styles from './styles.module.scss';

const Artist = () => {
  const { key = '', name } = useParams<'key' | 'name'>();
  const { info, list, loading } = useArtist(openDB, key);

  const onSelectDirectoryButtonClick = () => {
    return null;
  };

  return (
    <div className={styles.container}>
      <Header
        route="/tracks"
        onSelectDirectoryButtonClick={onSelectDirectoryButtonClick}
      />

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
                  // navigate(`/albums/${item.key}/${item.name.replaceAll(' ', '-')}`);
                  // dispatch(selectedKeyChange({ key: item.key }));
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

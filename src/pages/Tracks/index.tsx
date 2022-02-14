import { openDB, deleteDB } from 'idb';
import { Header, Sidebar, Loading } from '../../components';
import { usePlayer } from '../../providers/Player';
import { Item } from './components';
import { useFiles } from '../../hooks';
import { useTracks } from './hooks';

import styles from './index.module.scss';

const Tracks = () => {
  const { selectedFile, selectedFileChange } = usePlayer();
  const { list, loading } = useTracks(openDB);
  const { loading: loadingFiles, updateFiles } = useFiles(openDB, deleteDB);

  return (
    <div className={styles.container}>
      <Header route="/tracks" onSelectDirectoryButtonClick={updateFiles} />

      <div className={styles.main}>
        <Sidebar route="/tracks" />

        <div className={styles.right}>
          <div className={styles.list}>
            {list.map(function (item, index) {
              return (
                <Item
                  key={item.key}
                  index={index}
                  path={item.path}
                  name={item.name}
                  artist={item.artist}
                  title={item.title}
                  cover={item.cover}
                  selected={item.key === selectedFile.key}
                  color={selectedFile.dominantColor}
                  onSelect={() => {
                    selectedFileChange(item.key);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {loading || loadingFiles ? (
        <div className={styles.loading}>
          <Loading size="large" />
        </div>
      ) : null}
    </div>
  );
};

export default Tracks;

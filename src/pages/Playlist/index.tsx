import { useEffect } from 'react';
import { usePlaylist } from '../../providers/Playlist';
import { Header, Sidebar } from '../../components';
import { useAppDispatch } from '../../hooks';
import { selectedFileChange } from '../../slice';
import { Item } from './components';

import styles from './index.module.scss';

const Playlist = () => {
  // const dispatch = useAppDispatch();
  const { list } = usePlaylist();

  return (
    <div className={styles.container}>
      <Header route="/playlist" />

      <div className={styles.main}>
        <Sidebar route="/playlist" />

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
                  onSelect={() => {
                    // dispatch(selectedFileChange({ key: item.key }));
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;

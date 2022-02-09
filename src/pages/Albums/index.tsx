import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { openDB, deleteDB } from 'idb';

import { Header, Sidebar, Loading } from '../../components';
import { RootState } from '../../store';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { State as GlobalState } from '../../slice';
import { Item } from './components';
import { State, AlbumType, initial } from './slice';

import styles from './index.module.scss';

function Albums() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const state: State = useAppSelector((state: RootState): State => {
    return {
      loading: state.albums.loading,
      list: state.albums.list,
    };
  });

  const globalState: GlobalState = useAppSelector(
    (state: RootState): GlobalState => {
      return {
        status: state.global.status,
        selectedFile: state.global.selectedFile,
      };
    }
  );

  useEffect(() => {
    // on mount
    dispatch(initial({ openDB }));
  }, []);

  return (
    <div className={styles.container}>
      <Header
        route="/albums"
        // onSelectDirectoryButtonClick={onSelectDirectoryButtonClick}
      />

      <div className={styles.main}>
        <Sidebar route="/albums" />

        <div className={styles.right}>
          <div className={styles.list}>
            {state.list.map(function (item, index) {
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
                    // dispatch(selectedKeyChange({ key: item.key }));
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* {state.loading ?
        <div className={styles.loading}>
          <Loading size="large" />
        </div>
        :
        null
      } */}
    </div>
  );
}

export default Albums;

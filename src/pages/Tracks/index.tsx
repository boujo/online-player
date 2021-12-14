import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { openDB, deleteDB } from "idb";

import {
  Header,
  Loading
} from '../../components';
import { RootState } from '../../store';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks';
import {
  State as GlobalState,
  selectedFileChange,
} from '../../slice';
import {
  Item
} from './components';
import {
  State,
  ItemType,
  initial,
  updateFiles
} from './slice';

import styles from './index.module.scss';

const Tracks = () => {
  const dispatch = useAppDispatch();

  const state: State = useAppSelector((state: RootState): State => {
    return {
      loading : state.tracks.loading,
      list    : state.tracks.list
    }
  });

  const globalState: GlobalState = useAppSelector((state: RootState): GlobalState => {
    return {
      status       : state.global.status,
      selectedFile : state.global.selectedFile,
    }
  });

  useEffect(() => {
    // on mount
    dispatch(initial({ openDB }));

    return () => {
    }
  }, [])

  const onSelectDirectoryButtonClick = () => {
    dispatch(updateFiles({ openDB, deleteDB }));
  };

  return (
    <div className={styles.container}>
      <Header
        route="/tracks"
        onSelectDirectoryButtonClick={onSelectDirectoryButtonClick}
      />

      <div className={styles.main}>
        <div className={styles.left}>
          sidebar
        </div>

        <div className={styles.right}>
          <div className={styles.list}>
            {state.list.map(function(item, index) {
              return (
                <Item
                  key={item.key}
                  index={index}
                  path={item.path}
                  name={item.name}
                  artist={item.artist}
                  title={item.title}
                  cover={item.cover}
                  selected={item.key === globalState.selectedFile.key}
                  color={globalState.selectedFile.dominantColor}
                  onSelect={() => {
                    dispatch(selectedFileChange({ key: item.key }));
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {state.loading ?
        <div className={styles.loading}>
          <Loading size="large" />
        </div>
        :
        null
      }
    </div>
  );
}

export default Tracks;

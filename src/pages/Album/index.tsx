import { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { openDB, deleteDB } from "idb";

import {
  Header,
  Sidebar,
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
} from './slice';

import styles from './index.module.scss';

const Album = () => {
  const dispatch = useAppDispatch();
  const { id, name } = useParams();

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

export default Album;
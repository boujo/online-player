import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { openDB } from "idb";

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
  State as GlobalState
} from '../../slice';
import {
  Item
} from './components';
import {
  State,
  ArtistType,
  initial
} from './slice';

import styles from './index.module.scss';

function Artists() {
  const dispatch = useAppDispatch();

  const state: State = useAppSelector((state: RootState): State => {
    return {
      loading : state.artists.loading,
      list    : state.artists.list,
    }
  });

  const globalState: GlobalState = useAppSelector((state: RootState): GlobalState => {
    return {
      status       : state.global.status,
      selectedFile : state.global.selectedFile
    }
  });

  useEffect(() => {
    // on mount
    dispatch(initial({ openDB }));

    return () => {
    }
  }, [])

  return (
    <div className={styles.container}>
      <Header
        onSelectDirectoryButtonClick={() => {}}
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
                  name={item.name}
                  onSelect={() => {
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

export default Artists;
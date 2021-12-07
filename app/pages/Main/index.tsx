import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { openDB, deleteDB } from "idb";

import {
  Header,
  Player,
  Loading
} from '../../components';
import { RootState } from '../../store';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks';
import {
  Item
} from './components';
import {
  State,
  initial,
  updateFiles,
  selectFile
} from './slice';

import styles from './index.module.scss';

const Main: NextPage = () => {
  const dispatch = useAppDispatch();
  const selectState = (state: RootState): State => {
    return {
      loading       : state.main.loading,
      list          : state.main.list,
      selectedIndex : state.main.selectedIndex,
      selectedFile  : state.main.selectedFile
    }
  };
  const state: State = useAppSelector(selectState);

  // console.log(playerInfo)
  
  useEffect(() => {
    // on mount
    dispatch(initial({ openDB }));

    return () => {
    }
  }, [])

  const onSelectDirectoryButtonClick = () => {
    dispatch(updateFiles({ openDB, deleteDB }));
  };

  // const onSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const onSongChange = (path, index) => {
    dispatch(selectFile({ openDB, path, index }));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Main</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
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
                  key={item.path}
                  index={index}
                  path={item.path}
                  name={item.name}
                  artist={item.artist}
                  title={item.title}
                  cover={item.cover}
                  selected={index === state.selectedIndex}
                  onSelect={onSongChange}
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

      <Player
        file={state.selectedFile}
      />
    </div>
  );
}

export default Main;

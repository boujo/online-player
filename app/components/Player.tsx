import React, { useState, useEffect, useRef } from 'react';

import {
  usePlayer,
  PlayerStatus
} from '../hooks';

import styles from './Player.module.scss';

type ComponentProps = {
  fileKey : number
};

const defaultProps = {
  fileKey : 0
};

const Player = ({ fileKey }: ComponentProps): JSX.Element => {
  const audioRef = useRef(null);
  const rangeRef = useRef(null);

  const {
    playerUrl,
    playerInfo,
    playerStatus,
    playerPlay,
    playerPause,
    playerUpdateProgress,
    playerUpdateTime
  } = usePlayer(fileKey, audioRef, rangeRef);

  const onPlayButtonClick = () => {
    if (audioRef.current) {
      if (playerStatus === PlayerStatus.STOP) {
        playerPlay();
      } else if (playerStatus === PlayerStatus.PLAY) {
        playerPause();
      } else if (playerStatus === PlayerStatus.PAUSE) {
        playerPlay();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {playerInfo.cover ?
          <div className={styles.cover}>
            <img src={playerInfo.cover} alt="" />
          </div>
          :
          null
        }
        {playerInfo.artist ?
          <div className={styles.artist}>{playerInfo.artist}</div>
          :
          null
        }
        {playerInfo.name ?
          <div className={styles.name}>{playerInfo.name}</div>
          :
          null
        }
      </div>

      <div className={styles.range}>
        <input
          ref={rangeRef}
          type="range"
          min={0}
          max={100}
          onChange={playerUpdateProgress}
        />

        {/* <div className={styles.rangeFilled} /> */}
        {/* <Range
          onChange={playerUpdateProgress}
        /> */}
      </div>

      <div className={styles.buttonsContainer}>
        <audio
          ref={audioRef}
          onTimeUpdate={playerUpdateTime}
        >
          <source src={playerUrl} />
        </audio>

        <div
          className={styles.playButton}
          onClick={onPlayButtonClick}
        >
          {playerStatus === PlayerStatus.PLAY ?
            <i className="material-icons">pause</i>
            :
            <i className="material-icons">play_arrow</i>
          }
        </div>
      </div>
    </div>
  );
}
Player.defaultProps = defaultProps;

export { Player };

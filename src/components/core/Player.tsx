import React, { useState, useEffect, useRef } from 'react';
import {
  getFileInfo
} from '../../utils';

import styles from './Player.module.scss';

enum Status {
  // LOAD,
  STOP,
  PLAY,
  PAUSE
};

interface Info {
  name: string,
  url: string,
  album: string,
  artist: string,
  title: string,
  cover: string,
  dominantColor: { r: string, g: string, b: string }
};

type ComponentProps = {
  fileKey : number
};

const defaultProps = {
  fileKey : 0
};

const Player = ({ fileKey }: ComponentProps): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  const [ info, setInfo ] = useState<Info>({
    name: '', url: '', album: '', artist: '', title: '', cover: '', dominantColor: { r: '', g: '', b: '' }
  });
  const [ status, setStatus ] = useState<Status>(Status.STOP);
  const [ isExpand, setIsExpand ] = useState<boolean>(false);
  
  useEffect(() => {
    if (fileKey !== 0) {
      getInfo();
    }

    return () => {
    }
  }, [fileKey])

  useEffect(() => {
    if (fileKey !== 0) {
      loadAudio();
      playAudio();
      setStatus(Status.PLAY);
    }

    return () => {
    }
  }, [info])

  const getInfo = async () => {
    try {
      const fileInfo = await getFileInfo(fileKey);
      setInfo(fileInfo);
    } catch (err) {
      console.log(err);
    }
  }

  const loadAudio = () => {
    if (
      audioRef && audioRef.current &&
      rangeRef && rangeRef.current
    ) {
      audioRef.current.load();
      rangeRef.current.value = '0';
    }
  };

  const pauseAudio = () => {
    if (audioRef && audioRef.current) {
      audioRef.current.pause();
    }
  };

  const playAudio = () => {
    if (audioRef && audioRef.current && fileKey !== 0) {
      audioRef.current.play();
    }
  };

  const onUpdateProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef && audioRef.current && audioRef.current.currentTime) {
      const progress = Number(e.target.value);
      const duration = Number(audioRef.current.duration);
      const value = (progress / 100) * duration;
      audioRef.current.currentTime = value;
    }
  };

  const onAudioTimeUpdate = () => {
    if (
      rangeRef && rangeRef.current && rangeRef.current.value &&
      audioRef && audioRef.current && audioRef.current.currentTime && audioRef.current.duration
    ) {
      const currentTime = Number(audioRef.current.currentTime);
      const duration = Number(audioRef.current.duration);
      const progress = Math.floor((currentTime / duration) * 100);
      const value = Math.floor(Number(rangeRef.current.value)); // ex. Number(1.09) == 1.09 so need Math.floor
      if (value !== progress) {
        rangeRef.current.value = progress + '';
      }
    }
  };

  const onAudioEnded = () => {
    setStatus(Status.STOP);
  };

  const onPlayButtonClick = () => {
    playAudio();
    setStatus(Status.PLAY);
  }

  const onPauseButtonClick = () => {
    pauseAudio();
    setStatus(Status.PAUSE);
  }

  const onExpandButtonClick = () => {
    setIsExpand(true);
  };

  const onCollapseButtonClick = () => {
    setIsExpand(false);
  };

  let backgroundColor = '';
  if (info && info.dominantColor) {
    backgroundColor = `rgba(${info.dominantColor.r}, ${info.dominantColor.g}, ${info.dominantColor.b}, 0.5)`;
  }

  return (
    <div className={styles.container} style={{ top: `${isExpand ? '0px' : ''}` }}>
      <audio
        ref={audioRef}
        onTimeUpdate={onAudioTimeUpdate}
        onEnded={onAudioEnded}
      >
        <source src={info.url} />
      </audio>

      <div className={styles.small} style={{ visibility: `${isExpand ? 'hidden' : 'visible'}`, backgroundColor }}>
        {info.cover ?
          <div className={styles.smallCover}>
            <img src={info.cover} alt="" />
          </div>
          :
          <div className={styles.smallCoverPlaceholder}>
            <i className="material-icons">album</i>
          </div>
        }

        <div className={styles.smallInfo}>
          <div className={styles.smallTitle}>{info.title}</div>
          <div className={styles.smallArtist}>{info.artist}</div>
        </div>

        <div className={styles.smallButtonsContainer}>
          {status === Status.PLAY ?
            <div
              className={styles.smallPlayButton}
              onClick={onPauseButtonClick}
            >
              <i className="material-icons">pause</i>
            </div>
            :
            <div
              className={styles.smallPlayButton}
              onClick={onPlayButtonClick}
            >
              <i className="material-icons">play_arrow</i>
            </div>
          }
        </div>

        <div
          className={styles.smallExpandButton}
          onClick={onExpandButtonClick}
        >
          <i className="material-icons">expand_less</i>
        </div>
      </div>

      <div className={styles.main} style={{ visibility: `${isExpand ? 'visible' : 'hidden'}` }}>
        <div className={styles.header}>
          <div className={styles.headerLeft}></div>

          <div className={styles.headerText}>
            Now Playing
          </div>

          <div
            className={styles.headerCollapseButton}
            onClick={onCollapseButtonClick}
          >
            <i className="material-icons">expand_more</i>
          </div>
        </div>

        <div className={styles.info}>
          {info.cover ?
            <div className={styles.cover}>
              <img src={info.cover} alt="" />
            </div>
            :
            null
          }
          {info.artist ?
            <div className={styles.artist}>{info.artist}</div>
            :
            null
          }
          {info.name ?
            <div className={styles.name}>{info.name}</div>
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
            onChange={onUpdateProgress}
          />

          {/* <div className={styles.rangeFilled} /> */}
          {/* <Range
            onChange={playerUpdateProgress}
          /> */}
        </div>

        <div className={styles.buttonsContainer}>
          {status === Status.PLAY ?
            <div
              className={styles.playButton}
              onClick={onPauseButtonClick}
            >
              <i className="material-icons">pause</i>
            </div>
            :
            <div
              className={styles.playButton}
              onClick={onPlayButtonClick}
            >
              <i className="material-icons">play_arrow</i>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
Player.defaultProps = defaultProps;

export { Player };

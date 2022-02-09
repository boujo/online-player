import React, { useState, useEffect, useRef } from 'react';
import { SelectedFile } from '../../slice';

import styles from './Player.module.scss';

enum Status {
  STOP,
  PLAY,
  PAUSE,
}

type ComponentProps = {
  fileInfo: SelectedFile;
};

const defaultProps = {
  fileInfo: null,
};

const Player = ({ fileInfo }: ComponentProps): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const rangeFillRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>(Status.STOP);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  useEffect(() => {
    if (fileInfo && fileInfo.key !== -1) {
      loadAudio();
      playAudio();
      setStatus(Status.PLAY);
    }
  }, [fileInfo]);

  const loadAudio = () => {
    if (
      audioRef &&
      audioRef.current &&
      rangeRef &&
      rangeRef.current &&
      rangeFillRef &&
      rangeFillRef.current &&
      rangeFillRef.current.style
    ) {
      audioRef.current.load();
      rangeRef.current.value = '0';
      rangeFillRef.current.style.width = '0%';
    }
  };

  const pauseAudio = () => {
    if (audioRef && audioRef.current) {
      audioRef.current.pause();
    }
  };

  const playAudio = () => {
    if (audioRef && audioRef.current && fileInfo) {
      audioRef.current.play();
    }
  };

  const onUpdateProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (rangeFillRef && rangeFillRef.current && rangeFillRef.current.style) {
      const progress = Number(e.target.value);

      if (audioRef && audioRef.current && audioRef.current.currentTime) {
        const duration = Number(audioRef.current.duration);
        const value = (progress / 100) * duration;
        audioRef.current.currentTime = value;
        rangeFillRef.current.style.width = progress + '%';
      } else {
        rangeFillRef.current.style.width = progress + '%';
      }
    }
  };

  const onAudioTimeUpdate = () => {
    if (
      rangeRef &&
      rangeRef.current &&
      rangeRef.current.value &&
      rangeFillRef &&
      rangeFillRef.current &&
      rangeFillRef.current.style &&
      audioRef &&
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration
    ) {
      const currentTime = Number(audioRef.current.currentTime);
      const duration = Number(audioRef.current.duration);
      const progress = Math.floor((currentTime / duration) * 100);
      const value = Math.floor(Number(rangeRef.current.value)); // ex. Number(1.09) == 1.09 so need Math.floor
      if (value !== progress) {
        rangeRef.current.value = progress + '';
        rangeFillRef.current.style.width = progress + '%';
      }
    }
  };

  const onAudioEnded = () => {
    setStatus(Status.STOP);
  };

  const onPlayButtonClick = () => {
    playAudio();
    setStatus(Status.PLAY);
  };

  const onPauseButtonClick = () => {
    pauseAudio();
    setStatus(Status.PAUSE);
  };

  const onExpandButtonClick = () => {
    setIsExpand(true);
  };

  const onCollapseButtonClick = () => {
    setIsExpand(false);
  };

  let backgroundColor = '';
  if (fileInfo && fileInfo.dominantColor) {
    backgroundColor = `rgba(${fileInfo.dominantColor.r}, ${fileInfo.dominantColor.g}, ${fileInfo.dominantColor.b}, 0.5)`;
  }

  // let containerStyle = {};
  // if (fileInfo && fileInfo.key !== -1) {
  // if (isExpand) {
  //   // when player expanded, show whole player
  //   containerStyle = { top: '0px' };
  // }
  // } else {
  //   // when no music playing, no need to show player
  //   // containerStyle = { top: '100vh' };
  // }

  return (
    <div className={`${styles.container} ${isExpand ? styles.expand : ''}`}>
      <audio
        ref={audioRef}
        onTimeUpdate={onAudioTimeUpdate}
        onEnded={onAudioEnded}
      >
        <source src={fileInfo.url} />
      </audio>

      <div
        className={styles.small}
        style={{
          visibility: `${isExpand ? 'hidden' : 'visible'}`,
          backgroundColor,
        }}
      >
        {fileInfo.cover ? (
          <div className={styles.smallCover}>
            <img src={fileInfo.cover} alt="" />
          </div>
        ) : (
          <div className={styles.smallCoverPlaceholder}>
            <i className="material-icons">album</i>
          </div>
        )}

        <div className={styles.smallInfo}>
          <div className={styles.smallTitle}>{fileInfo.title}</div>
          <div className={styles.smallArtist}>{fileInfo.artist}</div>
        </div>

        <div className={styles.smallButtonsContainer}>
          {status === Status.PLAY ? (
            <div
              className={styles.smallPlayButton}
              onClick={onPauseButtonClick}
            >
              <i className="material-icons">pause</i>
            </div>
          ) : (
            <div className={styles.smallPlayButton} onClick={onPlayButtonClick}>
              <i className="material-icons">play_arrow</i>
            </div>
          )}
        </div>

        <div className={styles.smallExpandButton} onClick={onExpandButtonClick}>
          <i className="material-icons">expand_less</i>
        </div>
      </div>

      <div
        className={styles.main}
        style={{ visibility: `${isExpand ? 'visible' : 'hidden'}` }}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}></div>

          <div className={styles.headerText}>Now Playing</div>

          <div
            className={styles.headerCollapseButton}
            onClick={onCollapseButtonClick}
          >
            <i className="material-icons">expand_more</i>
          </div>
        </div>

        <div className={styles.info}>
          {fileInfo.cover ? (
            <div className={styles.cover}>
              <img src={fileInfo.cover} alt="" />
            </div>
          ) : null}
          {fileInfo.artist ? (
            <div className={styles.artist}>{fileInfo.artist}</div>
          ) : null}
          {fileInfo.name ? (
            <div className={styles.name}>{fileInfo.name}</div>
          ) : null}
        </div>

        <div className={styles.range}>
          <div className={styles.rangeTrack}>
            <div ref={rangeFillRef} className={styles.rangeFilled} />
          </div>

          <input
            ref={rangeRef}
            type="range"
            min={0}
            max={100}
            defaultValue={0}
            onChange={onUpdateProgress}
          />
        </div>

        <div className={styles.buttonsContainer}>
          {status === Status.PLAY ? (
            <div className={styles.playButton} onClick={onPauseButtonClick}>
              <i className="material-icons">pause</i>
            </div>
          ) : (
            <div className={styles.playButton} onClick={onPlayButtonClick}>
              <i className="material-icons">play_arrow</i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
Player.defaultProps = defaultProps;

export { Player };

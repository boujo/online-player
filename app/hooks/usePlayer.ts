import { useState, useEffect } from 'react';

export enum PlayerStatus {
  STOP,
  PLAY,
  PAUSE
};

const usePlayer = (playerRef, sliderRef) => {
  const [ url, setUrl ] = useState('');
  const [ info, setInfo ] = useState({});
  const [ status, setStatus ] = useState(PlayerStatus.STOP);

  // if for any reason status changed => player will update
  useEffect(() => {
    if (playerRef && playerRef.current) {
      if (status === PlayerStatus.PLAY) {
        playerRef.current.play();
      } else if (status === PlayerStatus.PAUSE) {
        playerRef.current.pause();
      } else if (status === PlayerStatus.STOP) {
        // playerRef.current.stop();
      }
    }
    return () => {
    }
  }, [status])

  useEffect(() => {
    playerRef.current.load();
    sliderRef.current.value = 0;

    return () => {
    }
  }, [url])

  const updateFile = (url, info) => {
    setUrl(url);
    setInfo(info);
  };

  const play = () => {
    setStatus(PlayerStatus.PLAY);
  };
  
  const pause = () => {
    setStatus(PlayerStatus.PAUSE);
  };

  const updateProgress = (e) => {
    if (playerRef.current && playerRef.current.currentTime) {
      const progress = parseInt(e.target.value);
      const value = (progress / 100) * parseInt(playerRef.current.duration);
      playerRef.current.currentTime = value;
    }
  };

  const updateTime = () => {
    if (
      sliderRef.current &&
      sliderRef.current.value &&
      playerRef.current &&
      playerRef.current.currentTime &&
      playerRef.current.duration
    ) {
      const progress = Math.floor((parseInt(playerRef.current.currentTime) / parseInt(playerRef.current.duration)) * 100);
      if (parseInt(sliderRef.current.value) !== progress) {
        sliderRef.current.value = progress;
      }
    }
  };

  return {
    playerUrl            : url,
    playerInfo           : info,
    playerStatus         : status,
    playerUpdateFile     : updateFile,
    playerPlay           : play,
    playerPause          : pause,
    playerUpdateProgress : updateProgress,
    playerUpdateTime     : updateTime
  };
};


export { usePlayer };
import { useState, useEffect } from 'react';

export enum PlayerStatus {
  STOP,
  PLAY,
  PAUSE
};

const usePlayer = (playerRef) => {
  const [ url, setUrl ] = useState('');
  const [ status, setStatus ] = useState(PlayerStatus.STOP);
  const [ progress, setProgress ] = useState(0);

  // if for any reason status changed => player will update
  useEffect(() => {
    console.log('status changed')
    if (playerRef && playerRef.current) {
      if (status === PlayerStatus.PLAY) {
        playerRef.current.play();
        console.log('play');

      } else if (status === PlayerStatus.PAUSE) {
        playerRef.current.pause();
        console.log('pause');
  
      } else if (status === PlayerStatus.STOP) {
        // playerRef.current.stop();
        // console.log('stop');
      }
    }
    return () => {
    }
  }, [status])

  useEffect(() => {
    playerRef.current.load();

    return () => {
    }
  }, [url])

  const updateUrl = (url) => {
    setUrl(url);
  };

  const play = () => {
    setStatus(PlayerStatus.PLAY);
  };
  
  const pause = () => {
    setStatus(PlayerStatus.PAUSE);
  };

  const updateTime = () => {
    const progress = (playerRef.current.currentTime / playerRef.current.duration) / 100;
    setProgress(progress);
  };

  return {
    playerUrl        : url,
    playerStatus     : status,
    playerProgress   : progress,
    playerUpdateUrl  : updateUrl,
    playerPlay       : play,
    playerPause      : pause,
    playerUpdateTime : updateTime
  };
};


export { usePlayer };
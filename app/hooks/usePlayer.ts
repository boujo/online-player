import { useState, useEffect } from 'react';
import jsmediatags from "jsmediatags";

export enum PlayerStatus {
  STOP,
  PLAY,
  PAUSE
};

const usePlayer = (file, playerRef, sliderRef) => {
  const [ url, setUrl ] = useState('');
  const [ info, setInfo ] = useState({});
  const [ status, setStatus ] = useState(PlayerStatus.STOP);

  useEffect(() => {
    if (file) {
      jsmediatags.read(file, {
        onSuccess: function(result) {
          // console.log(result)
          const { data, format } = result.tags.picture;
          let base64String = "";
          for (const i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }
          const cover = `data:${data.format};base64,${window.btoa(base64String)}`;
  
          setUrl(URL.createObjectURL(file));
          setInfo({
            name: file.name,
            album: result.tags.album,
            artist: result.tags.artist,
            cover
          })
        },
        onError: function(error) {
          console.log(':(', error.type, error.info);
        }
      });
    }

    return () => {
    }
  }, [file])

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
    playerPlay           : play,
    playerPause          : pause,
    playerUpdateProgress : updateProgress,
    playerUpdateTime     : updateTime
  };
};


export { usePlayer };
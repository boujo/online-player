import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { openDB } from 'idb';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { initial } from './slice';

import styles from './index.module.scss';

const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initial({ openDB }));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Link to="/tracks" className={styles.goToTracksButton}>
          Go to tracks page
          <i className="material-icons">music_note</i>
        </Link>
      </div>
    </div>
  );
};

export default Main;

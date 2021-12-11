import { Link } from "react-router-dom";

import styles from './index.module.scss';

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Link to='/tracks' className={styles.goToTracksButton}>
          Go to tracks page
          <i className="material-icons">music_note</i>
        </Link>
      </div>
    </div>
  );
}

export default Main;

import { Image } from '../../../components';
import styles from './Item.module.scss';

type ComponentProps = {
  index: number;
  name: string;
  cover: string;
  artist: string;
  onSelect: () => void;
};

const defaultProps = {
  index: -1,
  name: '',
  cover: '',
  artist: '',
  onSelect: () => {
    return null;
  },
};

const Item = ({
  index,
  name,
  cover,
  artist,
  onSelect,
}: ComponentProps): JSX.Element => {
  return (
    <div className={styles.container} onClick={onSelect}>
      <div className={styles.cover}>
        <Image src={cover} type="album" alt={name} />
      </div>

      <div className={styles.bottom}>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>

          <div className={styles.artist}>{artist}</div>
        </div>

        <div className={styles.moreButton}>
          <i className="material-icons">more_vert</i>
        </div>
      </div>
    </div>
  );
};
Item.defaultProps = defaultProps;

export { Item };

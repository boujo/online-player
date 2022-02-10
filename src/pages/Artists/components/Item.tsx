import { Image } from '../../../components';
import styles from './Item.module.scss';

type ComponentProps = {
  index: number;
  name: string;
  image: string;
  onSelect: () => void;
};

const defaultProps = {
  index: -1,
  name: '',
  image: '',
  onSelect: () => {
    return null;
  },
};

const Item = ({
  index,
  name,
  image,
  onSelect,
}: ComponentProps): JSX.Element => {
  return (
    <div className={styles.container} onClick={onSelect}>
      <div className={styles.cover}>
        <Image src="" type="artist" alt={name} />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{name}</div>

        <div className={styles.moreButton}>
          <i className="material-icons">more_vert</i>
        </div>
      </div>
    </div>
  );
};
Item.defaultProps = defaultProps;

export { Item };

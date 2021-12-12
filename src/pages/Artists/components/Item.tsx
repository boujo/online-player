
import styles from './Item.module.scss';

type ComponentProps = {
  index    : number,
  name     : string,
  image    : string,
  onSelect : () => void
};

const defaultProps = {
  index    : -1,
  name     : '',
  image    : '',
  onSelect : () => {}
};

const Item = ({ index, name, image, onSelect }: ComponentProps): JSX.Element => {
  return (
    <div
      className={styles.container}
      onClick={onSelect}
    >
      {image ?
        <div className={styles.image}>
          <img src={image} alt={name} />
        </div>
        :
        <div className={styles.imagePlaceholder}>
          <i className="material-icons">person</i>
        </div>
      }

      <div className={styles.info}>
        <div className={styles.name}>
          {name}
        </div>

        <div className={styles.moreButton}>
          <i className="material-icons">more_vert</i>
        </div>
      </div>
    </div>
  );
}
Item.defaultProps = defaultProps;

export { Item };

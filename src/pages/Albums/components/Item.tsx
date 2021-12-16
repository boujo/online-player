
import styles from './Item.module.scss';

type ComponentProps = {
  index    : number,
  name     : string,
  cover     : string,
  artist   : string,
  onSelect : () => void
};

const defaultProps = {
  index    : -1,
  name     : '',
  cover    : '',
  artist   : '',
  onSelect : () => {}
};

const Item = ({ index, name, cover, artist, onSelect }: ComponentProps): JSX.Element => {
  return (
    <div
      className={styles.container}
      onClick={onSelect}
    >
      {cover ?
        <div className={styles.cover}>
          <img src={cover} alt={name} />
        </div>
        :
        <div className={styles.imagePlaceholder}>
          <i className="material-icons">person</i>
        </div>
      }

      <div className={styles.bottom}>
        <div className={styles.info}>
          <div className={styles.name}>
            {name}
          </div>

          <div className={styles.artist}>
            {artist}
          </div>
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

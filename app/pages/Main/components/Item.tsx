
import styles from './Item.module.scss';

type ComponentProps = {
  index   : number,
  path    : string,
  name    : string,
  artist  : string,
  cover   : string,
  onSelect : () => void
};

const defaultProps = {
  index   : -1,
  path    : '',
  name    : '',
  artist  : '',
  cover   : '',
  onSelect : () => {}
};

const Item = ({ index, path, name, artist, cover, onSelect }: ComponentProps): JSX.Element => {
  return (
    <div
      className={styles.container}
      onClick={function() {
        onSelect(path, index);
      }}
    >

      {cover ?
        <div className={styles.image}>
          <img src={cover} alt={name} />
        </div>
        :
        <div className={styles.imagePlaceholder}>
          <i className="material-icons">image</i>
        </div>
      }

      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.artist}>{artist}</div>
      </div>

      <div className={styles.moreButton}>
        <i className="material-icons">more_vert</i>
      </div>
    </div>
  );
}
Item.defaultProps = defaultProps;

export { Item };

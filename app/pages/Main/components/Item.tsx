
import styles from './Item.module.scss';

type ComponentProps = {
  index    : number,
  path     : string,
  name     : string,
  artist   : string,
  cover    : string,
  title    : string,
  selected : boolean,
  onSelect : () => void
};

const defaultProps = {
  index    : -1,
  path     : '',
  name     : '',
  artist   : '',
  title    : '',
  cover    : '',
  selected : false,
  onSelect : () => {}
};

const Item = ({ index, path, name, artist, title, cover, selected, onSelect }: ComponentProps): JSX.Element => {
  return (
    <div
      className={`${styles.container} ${selected ? styles.selected : ''}`}
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
          <i className="material-icons">album</i>
        </div>
      }

      <div className={styles.info}>
        <div className={styles.name}>{title}</div>
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

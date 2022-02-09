import styles from './Item.module.scss';

type ComponentProps = {
  index: number;
  path: string;
  name: string;
  artist: string;
  cover: string;
  title: string;
  selected: boolean;
  color: { r: number; g: number; b: number };
  onSelect: () => void;
};

const defaultProps = {
  index: -1,
  path: '',
  name: '',
  artist: '',
  title: '',
  cover: '',
  selected: false,
  color: { r: 0, g: 0, b: 0 },
  onSelect: () => {
    return null;
  },
};

const Item = ({
  index,
  path,
  name,
  artist,
  title,
  cover,
  selected,
  color,
  onSelect,
}: ComponentProps): JSX.Element => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: selected
          ? `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`
          : '',
      }}
      onClick={onSelect}
    >
      {cover ? (
        <div className={styles.image}>
          <img src={cover} alt={name} />
        </div>
      ) : (
        <div className={styles.imagePlaceholder}>
          <i className="material-icons">album</i>
        </div>
      )}

      <div className={styles.info}>
        <div
          className={styles.name}
          style={{
            color: selected ? `rgb(${color.r}, ${color.g}, ${color.b})` : '',
          }}
        >
          {title}
        </div>

        <div
          className={styles.artist}
          style={{
            color: selected
              ? `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`
              : '',
          }}
        >
          {artist}
        </div>
      </div>

      <div className={styles.moreButton}>
        <i className="material-icons">more_vert</i>
      </div>
    </div>
  );
};
Item.defaultProps = defaultProps;

export { Item };

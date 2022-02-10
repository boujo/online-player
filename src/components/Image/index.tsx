import { PropsType } from './types';
import styles from './styles.module.scss';

function Image({ src, type, ...props }: PropsType): JSX.Element {
  if (src) {
    return <img src={src} {...props} />;
  }

  let placeholderIcon = '';
  switch (type) {
    case 'track':
      placeholderIcon = 'music_note';
      break;
    case 'album':
      placeholderIcon = 'album';
      break;
    case 'artist':
      placeholderIcon = 'person';
      break;
    default:
      placeholderIcon = 'person';
      break;
  }

  return (
    <div className={styles.placeholder} {...props}>
      <i className="material-icons">{placeholderIcon}</i>
    </div>
  );
}

Image.defaultProps = {
  src: '',
  type: 'track',
};

export { Image };

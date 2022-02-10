import { PropsType } from './types';
import styles from './styles.module.scss';

function Image({ src, type, className, ...props }: PropsType): JSX.Element {
  if (src) {
    return <img src={src} className={className} {...props} />;
  }

  let placeholderIcon = '';
  switch (type) {
    case 'track':
      placeholderIcon = 'person';
      break;
    case 'album':
      placeholderIcon = 'person';
      break;
    case 'artist':
      placeholderIcon = 'person';
      break;
    default:
      placeholderIcon = 'person';
      break;
  }

  return (
    <div className={`${styles.placeholder} ${className}`} {...props}>
      <i className="material-icons">{placeholderIcon}</i>
    </div>
  );
}

Image.defaultProps = {
  src: '',
  type: 'track',
};

export { Image };

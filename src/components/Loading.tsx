
import styles from './Loading.module.scss';

type ComponentProps = {
  size : 'small' | 'medium' | 'large'
};

const defaultProps = {
  size : 'medium'
};

const Loading = ({ size }: ComponentProps): JSX.Element => {
	return (
		<div className={styles.container}>
			<div className={`${styles.spinner} ${styles[size]}`} />
		</div>
	);
}
Loading.defaultProps = defaultProps;

export { Loading };

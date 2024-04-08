'use client';
import styles from './Home.module.scss';

export default function Home() {
	return (
		<div className={styles.sections}>
			<section className={styles.sky}>
				<div className={styles.title}>Мы открыты!</div>
				<div className={styles.option}>Где? - {`{where}`}</div>
				<div className={styles.option}>До скольки? - {`{until}`}</div>
				<img src='./gorilla-1.gif' alt='' width={150} className={styles.gif} />
			</section>
			<section className={styles.light_blue}></section>
			<section className={styles.light_green}></section>
			<section className={styles.green}></section>
		</div>
	);
}

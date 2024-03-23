import { LegacyRef, Ref, useContext, useEffect, useRef, useState } from 'react';
import styles from './CouponMenu.module.scss';
import { motion } from 'framer-motion';
import { profileContext } from '@/app/providers';

export default function CouponMenu({ isActive, setIsActive }: { isActive: boolean; setIsActive: (v: boolean) => void }) {
	const { profile } = useContext(profileContext);
	const [positions, setPositions] = useState({ 13: { Блины: 2 } });
	const menuRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		if (!profile?.coupones) return;
		let counter: any = {};
		for (const coupon of profile?.coupones) {
			if (!counter[coupon.id]) counter[coupon.id] = {};
			for (const pos of coupon.gives) {
				if (!counter[coupon.id][pos]) counter[coupon.id][pos] = 1;
				else counter[coupon.id][pos] += 1;
			}
		}
		setPositions(counter);
	}, [profile?.coupones]);

	useEffect(() => {
		const clickHandler = (e: MouseEvent) => {
			if (!menuRef.current?.contains(e.target as Node)) {
				setIsActive(false);
			}
		};
		document.addEventListener('mousedown', clickHandler);
		return () => removeEventListener('mousedown', clickHandler);
	}, []);

	return (
		<motion.div //
			initial={{ x: 360 }}
			animate={{ x: 0 }}
			exit={{ x: 360 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}
			className={styles.menu}
			ref={menuRef}
			style={!isActive ? { display: 'none' } : {}}
		>
			<div className={styles.header}>
				Ваши купоны <img onClick={() => setIsActive(false)} src='./x.svg' width={30}></img>
			</div>

			<div className={styles.coupons}>
				{profile?.coupones?.map(cp => (
					<div className={styles.coupon}>
						<div className={styles.coupon_title}>КУПОН</div>
						{Object.entries(positions).map(
							(p, i2) =>
								Number(p[0]) === cp.id && (
									<div className={styles.positions} key={i2}>
										<div className={styles.pos_title}>Вы получите:</div>

										{Object.entries(p[1]).map((product, i3) => (
											<div className={styles.position} key={i3}>
												{product[0]} x{product[1]}
											</div>
										))}
									</div>
								)
						)}
						<button className={styles.use_button}>Использовать</button>
						<div className={styles.desc}>Пожалуйста, используйте купон у кассы!</div>
					</div>
				))}
			</div>
		</motion.div>
	);
}

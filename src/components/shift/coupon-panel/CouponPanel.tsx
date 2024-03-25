import { useContext, useEffect, useState } from 'react';
import styles from './CouponPanel.module.scss';
import { ProfileContext } from '@/app/providers';
import useSubmitCoupon from '@/app/shift/hooks/useSubmitCoupon';
import useRejectCoupon from '@/app/shift/hooks/useRejectCoupon';

export default function CouponPanel() {
	const { profile } = useContext(ProfileContext);
	const [positions, setPositions] = useState({ 13: { Блины: 2 } });

	const { mutate: submit } = useSubmitCoupon();
	const { mutate: reject } = useRejectCoupon();

	useEffect(() => {
		const coupons = profile?.cashierProfile?.activeShift?.coupons;
		if (!coupons || !coupons.length) return;
		let counter: any = {};
		for (const coupon of coupons) {
			if (!counter[coupon.id]) counter[coupon.id] = {};
			for (const give of coupon.gives) {
				if (!counter[coupon.id][give]) counter[coupon.id][give] = 1;
				else counter[coupon.id][give] += 1;
			}
		}
		setPositions(counter);
	}, [profile?.cashierProfile?.activeShift?.coupons]);

	return (
		<div className={styles.body}>
			<div className={styles.list}>
				{profile?.cashierProfile?.activeShift?.coupons &&
					profile?.cashierProfile?.activeShift?.coupons.map(
						(c, i1) =>
							c.status === 'USING' && (
								<div className={styles.item} key={i1}>
									<div className={styles.header}>
										<div className={styles.title}>
											{c.user.firstName} {c.user.lastName}
										</div>
										<div className={styles.buttons}>
											<button onClick={() => submit(c.id)}>Одобрить</button>
											<button onClick={() => reject(c.id)}>Отклонить</button>
										</div>
									</div>
									{Object.entries(positions).map(
										(p, i2) =>
											Number(p[0]) === c.id && (
												<div className={styles.positions} key={i2}>
													{Object.entries(p[1]).map((product, i3) => (
														<div className={styles.position} key={i3}>
															{product[0]} x{product[1]}
														</div>
													))}
												</div>
											)
									)}
								</div>
							)
					)}
			</div>
		</div>
	);
}

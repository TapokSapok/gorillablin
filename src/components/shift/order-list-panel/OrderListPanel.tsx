'use client';

import { useContext, useEffect, useReducer, useState } from 'react';
import styles from './OrderListPanel.module.scss';
import { ProfileContext } from '@/app/providers';
import { IOrder } from '@/types/cashier.types';
import { motion } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/ru';

export default function OrderListPanel() {
	const { profile } = useContext(ProfileContext);
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [positions, setPositions] = useState({ 13: { Блины: 2 } });
	const [nowTimes, setNowTimes] = useState([{ id: 1, time: '123' }]);
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	useEffect(() => {
		const interval = window.setInterval(() => {
			forceUpdate();
		}, 5000);

		return () => window.clearInterval(interval);
	}, [orders]);

	useEffect(() => {
		let counter: any = {};
		for (const order of orders) {
			if (!counter[order.id]) counter[order.id] = {};
			for (const product of order.products) {
				if (!counter[order.id][product]) counter[order.id][product] = 1;
				else counter[order.id][product] += 1;
			}
		}
		setPositions(counter);
	}, [orders]);

	useEffect(() => {
		setOrders(profile?.cashierProfile?.activeShift?.orders.reverse() || []);
	}, [profile?.cashierProfile?.activeShift?.orders]);

	return (
		<div className={styles.body}>
			<div className={styles.list}>
				{orders.map((o, i) => (
					<div className={styles.item} key={i}>
						<div className={styles.item_header}>
							<div className={styles.amount}>Сумма: {o.amount}</div>
							<div className={styles.time_now}>
								{moment(o.createdAt).locale('ru').fromNow()} - {new Date(o.createdAt).toLocaleTimeString()}
							</div>
						</div>

						{Object.entries(positions).map(
							(p, i2) =>
								Number(p[0]) === o.id && (
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
				))}
			</div>
		</div>
	);
}

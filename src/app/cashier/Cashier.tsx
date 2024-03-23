'use client';
import Panel from '@/components/ui/panels/Panel';
import styles from './Cashier.module.scss';
import PageTransition from '../transition';
import { useContext, useEffect, useState } from 'react';
import { profileContext } from '../providers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cashierService } from '@/services/cashier.service';
import { ICashier, IShift } from '@/types/cashier.types';
import { IUser } from '@/types/user.types';
import OrderPanel from '@/components/ui/panels/shift-panel/OrderPanel';
import OrderListPanel from '@/components/ui/panels/order-list-panel/OrderListPanel';
import StatisticsPanel from '@/components/ui/panels/statistics-panel/StatisticsPanel';

export default function Cashier() {
	const { profile, setProfile } = useContext(profileContext);
	const [shiftFetched, setShiftFetched] = useState(false);

	const { mutate: getActiveShift, isPending } = useMutation({
		mutationKey: ['shift'],
		mutationFn: () => cashierService.activeShift(),
		onSuccess: data => {
			if (data.data) {
				// @ts-ignore
				setProfile({ ...profile, cashierProfile: { ...profile?.cashierProfile, activeShift: data.data } });
			}
		},
	});

	const { mutate } = useMutation({
		mutationKey: ['start-shift'],
		mutationFn: () => cashierService.startShift(),
		onSuccess: data => {
			if (data.data) {
				// @ts-ignore
				setProfile({ ...profile, cashierProfile: { ...profile?.cashierProfile, activeShift: data.data } });
			}
		},
	});

	useEffect(() => {
		if (profile && !shiftFetched) {
			getActiveShift();
			setShiftFetched(true);
		}
	}, [profile]);

	return (
		<PageTransition>
			{!profile?.cashierProfile?.activeShift && (
				<div className={styles.start_shift}>
					{!isPending && (
						<div className={styles.box}>
							<div className={styles.title}>Начать смену</div>
							<button
								className={styles.shift_button}
								onClick={() => {
									mutate();
								}}
							>
								Продолжить
							</button>
						</div>
					)}
				</div>
			)}
			<div className={styles.panels}>
				<div className={styles.side}>
					<Panel title='Сбор заказа'>
						<OrderPanel />
					</Panel>
				</div>
				<div className={styles.side}>
					<Panel title='Статистика'>
						<StatisticsPanel />
					</Panel>
					<Panel title='Купоны'></Panel>
					<Panel title='Выполненые заказы'>
						<OrderListPanel />
					</Panel>
				</div>
			</div>
		</PageTransition>
	);
}

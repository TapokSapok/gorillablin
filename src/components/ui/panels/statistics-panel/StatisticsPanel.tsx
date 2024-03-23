import { profileContext } from '@/app/providers';
import styles from './StatisticsPanel.module.scss';
import { useContext } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { useMutation } from '@tanstack/react-query';
import { cashierService } from '@/services/cashier.service';
import { toast } from 'sonner';

export default function StatisticsPanel() {
	const { profile, setProfile } = useContext(profileContext);

	const { mutate: endShift } = useMutation({
		mutationKey: ['end-shift'],
		mutationFn: () => cashierService.endShift(),
		onSuccess: () => {
			toast.success('Смена успешна закрыта');
			//@ts-ignore
			setProfile({ ...profile, cashierProfile: { ...profile?.cashierProfile, activeShift: null } });
		},
	});

	return (
		<div className={styles.body}>
			<div className={styles.row}>
				<div className={styles.header}>
					<div className={styles.shift_time}>
						Смена началась {moment(profile?.cashierProfile?.activeShift?.startTime).fromNow()}
						<span>({profile?.cashierProfile?.activeShift?.startTime && new Date(profile?.cashierProfile?.activeShift?.startTime).toLocaleTimeString()})</span>
					</div>
					<button className={styles.end_shift_button} onClick={() => endShift()}>
						Закончить смену
					</button>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.key}>
					Заказов за смену:
					<div className={styles.value}>{profile?.cashierProfile?.activeShift?.orderCount}</div>
				</div>
				<div className={styles.key}>
					Выручка за смену:
					<div className={styles.value}>{profile?.cashierProfile?.activeShift?.revenue} руб.</div>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.key}>
					Заказов за всё время:
					<div className={styles.value}>{profile?.cashierProfile?.totalOrderCount}</div>
				</div>
				<div className={styles.key}>
					Выручка за всё время:
					<div className={styles.value}>{profile?.cashierProfile?.totalRevenue} руб.</div>
				</div>
			</div>
		</div>
	);
}

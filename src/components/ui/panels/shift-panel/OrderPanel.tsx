'use client';
import { PRODUCTS } from '@/config';
import styles from './OrderPanel.module.scss';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { cashierService } from '@/services/cashier.service';
import { ICreateOrder, IOrder } from '@/types/cashier.types';
import { profileContext } from '@/app/providers';
import { toast } from 'sonner';

export default function OrderPanel() {
	const [cart, setCart] = useState<string[]>([]);
	const [, forceUpdate] = useReducer(x => x + 1, 0);
	const [amount, setAmount] = useState(0);
	const [positions, setPositions] = useState({ '': 1 });
	const { profile, setProfile } = useContext(profileContext);

	const { mutate: createOrder } = useMutation({
		mutationKey: ['create-order'],
		mutationFn: (data: ICreateOrder | any) => cashierService.createOrder(data),
		onSuccess: res => {
			toast.success('Заказ собран!');
			setCart([]);
			setProfile({
				...profile,
				cashierProfile: {
					...profile?.cashierProfile,
					//@ts-ignore
					activeShift: {
						...profile!.cashierProfile!.activeShift,
						orders: [...profile!.cashierProfile!.activeShift!.orders, res.data.order],
						orderCount: res.data.shift.orderCount,
						revenue: res.data.shift.revenue,
					},
					totalOrderCount: res.data.cashier.totalOrderCount,
					totalRevenue: res.data.cashier.totalRevenue,
				},
			});
		},
	});

	const cartUpdateFunction = () => {
		console.log(cart);
		let calcAmount = 0;

		for (let i = 0; i < cart.length; i++) {
			const product = PRODUCTS.find(p => p.title === cart[i]);
			if (product) {
				calcAmount += product.price;
			}
		}
		setAmount(calcAmount);

		setPositions(
			cart.reduce((obj: any, item) => {
				obj[item] = (obj[item] || 0) + 1;
				return obj;
			}, {})
		);
		forceUpdate();
	};

	useEffect(() => cartUpdateFunction(), [cart]);

	return (
		<div className={styles.shift_body}>
			<div className={styles.products}>
				<div className={styles.product_type}>
					<div className={styles.product_title}>Блины</div>
					<div className={styles.product_list}>
						{PRODUCTS.map(
							(pc, i) =>
								pc.type === 'pancake' && (
									<div className={styles.list_item} key={i}>
										<img src={pc.img} alt='' />
										<div className={styles.item_title}>
											{pc.title}: {pc.price}р.
										</div>
										<div className={styles.item_buttons}>
											<button
												className={styles.rem}
												onClick={() => {
													setCart(removeStringFromArray(cart, pc.title));
													cartUpdateFunction();
													// forceUpdate();
												}}
											>
												-
											</button>
											<div className={styles.count}>{cart.filter(p => p === pc.title).length}</div>
											<button
												className={styles.add}
												onClick={() => {
													setCart([...cart, pc.title]);
												}}
											>
												+
											</button>
										</div>
									</div>
								)
						)}
					</div>
				</div>
				<div className={styles.product_type}>
					<div className={styles.product_title}>Добавки</div>
					<div className={styles.product_list}>
						{PRODUCTS.map(
							(pc, i) =>
								pc.type === 'addition' && (
									<div className={styles.list_item} key={i}>
										<img src={pc.img} alt='' />
										<div className={styles.item_title}>
											{pc.title}: {pc.price}р.
										</div>
										<div className={styles.item_buttons}>
											<button
												className={styles.rem}
												onClick={() => {
													setCart(removeStringFromArray(cart, pc.title));
													forceUpdate();
												}}
											>
												-
											</button>
											<div className={styles.count}>{cart.filter(p => p === pc.title).length}</div>
											<button
												className={styles.add}
												onClick={() => {
													setCart([...cart, pc.title]);
												}}
											>
												+
											</button>
										</div>
									</div>
								)
						)}
					</div>
				</div>
			</div>
			<div className={styles.positions}>
				<span className={styles.title}>Позиции</span>
				{Object.entries(positions).map(pos => (
					<span className={styles.position} key={pos[0] + pos[1]}>
						{pos[0]}: {pos[1]}
					</span>
				))}
			</div>
			<div className={styles.amount}>Сумма: {amount} рублей</div>
			<button className={styles.order_button} onClick={() => amount && createOrder({ shiftId: profile?.cashierProfile!.activeShift!.id, products: cart })}>
				Собрать
			</button>
		</div>
	);
}

function removeStringFromArray(arr: string[], str: string) {
	const index = arr.indexOf(str);
	if (index !== -1) {
		arr.splice(index, 1);
	}
	return arr;
}

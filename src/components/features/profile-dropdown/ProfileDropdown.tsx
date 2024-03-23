'use client';
import { authService } from '@/services/auth.service';
import styles from './ProfileDropdown.module.scss';
import { removeAccessToken } from '@/services/access-token.service';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import useProfile from '@/hooks/useProfile';
import { useContext, useState } from 'react';
import { profileContext } from '@/app/providers';
import { toast } from 'sonner';
import { PAGES } from '@/config';
import CouponMenu from '../coupon-menu/CouponMenu';

export default function ProfileMenu({ isActive, setIsActive, setCouponMenu }: { isActive: boolean; setIsActive: (v: boolean) => void; setCouponMenu: (v: boolean) => void }) {
	if (!isActive) return null;
	const { push } = useRouter();
	const { profile, setProfile } = useContext(profileContext);

	return (
		<>
			<div className={styles.dropdown}>
				<button
					className={styles.item}
					onClick={() => {
						setIsActive(false);
						setCouponMenu(true);
					}}
				>
					<img src='./coupon.svg' alt='' />
					<div className={styles.item_title}>Мои купоны</div>
				</button>
				{profile?.adminProfile && (
					<button
						className={styles.item}
						onClick={() => {
							push(PAGES.CASHIER);
							setIsActive(false);
						}}
					>
						<img src='./shield.svg' alt='' />
						<div className={styles.item_title}>Панель админа</div>
					</button>
				)}
				{profile?.cashierProfile && (
					<button
						className={styles.item}
						onClick={() => {
							push(PAGES.CASHIER);
							setIsActive(false);
						}}
					>
						<img src='./store.svg' alt='' />
						<div className={styles.item_title}>Панель кассира</div>
					</button>
				)}
				<button
					className={styles.item}
					onClick={() => {
						setProfile(null);
						setIsActive(false);
						removeAccessToken();
						toast.success('Успешный выход из аккаунта');
						push(PAGES.AUTH);
					}}
				>
					<img src='./logout.svg' alt='' />
					<div className={styles.item_title}>Выйти из аккаунта</div>
				</button>
			</div>
		</>
	);
}

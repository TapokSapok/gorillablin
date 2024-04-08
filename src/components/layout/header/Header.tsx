"use client";
import styles from "./Header.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { IUser } from "@/types/user.types";
import ProfileMenu from "../profile-dropdown/ProfileDropdown";
import useProfile from "@/hooks/useProfile";
import { PAGES } from "@/config";
import { useRouter } from "next/navigation";
import { ProfileContext } from "@/app/providers";
import CouponMenu from "../coupon-menu/CouponMenu";
import Logo from "../logo/Logo";

export default function Header() {
  const profileRef = useRef<null | HTMLDivElement>(null);
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const [couponMenuIsActive, setCouponMenuIsActive] = useState(false);

  const { isLoading } = useProfile();
  const { profile } = useContext(ProfileContext);
  const router = useRouter();

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) {
        setDropdownIsActive(false);
      }
    };
    document.addEventListener("mousedown", clickHandler);
    return () => removeEventListener("mousedown", clickHandler);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.side}>
        <Logo />
      </div>
      <div className={styles.side}>
        {profile ? (
          <div className={styles.profile} ref={profileRef}>
            <div
              className={styles.name}
              onClick={() => setDropdownIsActive(!dropdownIsActive)}
            >
              {profile?.firstName} {profile?.lastName}
            </div>
            <ProfileMenu
              setCouponMenu={setCouponMenuIsActive}
              setIsActive={setDropdownIsActive}
              isActive={dropdownIsActive}
            />
            <CouponMenu
              setIsActive={setCouponMenuIsActive}
              isActive={couponMenuIsActive}
            />
          </div>
        ) : (
          <button
            className={styles.auth_button}
            onClick={() => router.push(PAGES.AUTH)}
          >
            Залогинься блинчик
          </button>
        )}
      </div>
    </header>
  );
}

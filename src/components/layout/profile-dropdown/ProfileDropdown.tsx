"use client";
import styles from "./ProfileDropdown.module.scss";
import { removeAccessToken } from "@/services/access-token.service";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ProfileContext } from "@/app/providers";
import { toast } from "sonner";
import { PAGES } from "@/config";
import DropdownItem from "./dropdown-item/DropdownItem";

export default function ProfileMenu({
  isActive,
  setIsActive,
  setCouponMenu,
}: {
  isActive: boolean;
  setIsActive: (v: boolean) => void;
  setCouponMenu: (v: boolean) => void;
}) {
  if (!isActive) return null;
  const { push } = useRouter();
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <>
      <div className={styles.dropdown}>
        <DropdownItem
          onClick={() => {
            setIsActive(false);
            setCouponMenu(true);
          }}
          img="/coupon.svg"
          title="Мои купоны"
        />
        {profile?.adminProfile && (
          <DropdownItem
            onClick={() => {
              push(PAGES.ADMIN);
              setIsActive(false);
            }}
            img="/shield.svg"
            title="Панель админа"
          />
        )}
        {profile?.cashierProfile && (
          <DropdownItem
            onClick={() => {
              push(PAGES.CASHIER);
              setIsActive(false);
            }}
            img="/store.svg"
            title="Панель кассира"
          />
        )}
        <DropdownItem
          onClick={() => {
            setProfile(null);
            setIsActive(false);
            removeAccessToken();
            toast.success("Успешный выход из аккаунта");
            push(PAGES.AUTH);
          }}
          img="/logout.svg"
          title="Выйти из аккаунта"
        />
      </div>
    </>
  );
}

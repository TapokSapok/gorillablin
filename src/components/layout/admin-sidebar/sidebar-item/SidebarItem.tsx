"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "./SidebarItem.module.scss";
import { PAGES } from "@/config";

export default function SidebarItem({
  title,
  img,
  route,
}: {
  title: string;
  img: string;
  route: string;
}) {
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={styles.item}
      onClick={() => push(PAGES.ADMIN + route)}
      data-active={pathname === PAGES.ADMIN + route}
    >
      <img src={img} width={20} />
      {title}
    </div>
  );
}

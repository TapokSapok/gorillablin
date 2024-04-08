import Link from "next/link";
import styles from "./Logo.module.scss";
import { PAGES } from "@/config";

export default function Logo() {
  return (
    <Link href={PAGES.MAIN} className={styles.logo}>
      Горилла блин
    </Link>
  );
}

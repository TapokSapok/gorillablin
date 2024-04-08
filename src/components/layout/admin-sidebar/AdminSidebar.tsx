import { ADMIN_SIDEBAR } from "@/config";
import styles from "./AdminSidebar.module.scss";
import SidebarItem from "./sidebar-item/SidebarItem";

export default function AdminSidebar() {
  return (
    <div className={styles.sidebar}>
      {ADMIN_SIDEBAR.map((item, i) => (
        <SidebarItem
          key={i}
          title={item.title}
          img={item.img}
          route={item.route}
        />
      ))}
    </div>
  );
}

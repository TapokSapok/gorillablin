import { IUser } from "@/types/user.types";
import styles from "./ListItem.module.scss";
import moment from "moment";
import "moment/locale/ru";

export default function ListItem({ user }: { user: IUser }) {
  return (
    <div className={styles.item}>
      <div className={styles.row}>
        <div className={styles.side}>
          {user.id}: {user.lastName} {user.firstName}
        </div>
        <div className={styles.side}>
          <div className={styles.roles}>
            {user.adminProfile && <img src="/shield.svg" />}
            {user.cashierProfile && <img src="/store.svg" />}
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.side}>{user.email}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.side}>
          {new Date(user.createdAt).toLocaleDateString()} -{" "}
          {moment(user.createdAt).fromNow()}
        </div>
      </div>
    </div>
  );
}

import Panel from "@/components/ui/panel/Panel";
import styles from "./UsersPanel.module.scss";
import { IUser } from "@/types/user.types";
import ListItem from "./list-item/ListItem";

export default function UsersPanel({ users }: { users?: IUser[] }) {
  return (
    <Panel title="Список пользователей" noFullHeight={true}>
      <div className={styles.list}>
        {users?.map((user, i) => <ListItem user={user} key={i} />)}
      </div>
      <div className={styles.pagination}></div>
    </Panel>
  );
}

import Panel from "@/components/ui/panel/Panel";
import styles from "./FiltersPanel.module.scss";
import Field from "@/components/ui/field/Field";
import { IUserFilters } from "@/app/admin/users/Users";

export default function FiltersPanel({
  setFilters,
  filters,
}: {
  setFilters: (v: IUserFilters) => void;
  filters: IUserFilters;
}) {
  return (
    <Panel title="Фильтры" style={{ height: "260px" }}>
      <div className={styles.filters}>
        <Field
          label="Имя"
          onChange={(v) => setFilters({ ...filters, firstName: v })}
        />
        <Field
          label="Фамилия"
          onChange={(v) => setFilters({ ...filters, lastName: v })}
        />
        <Field
          label="Админ"
          type="checkbox"
          inline={true}
          onChange={(v) => setFilters({ ...filters, adminProfile: v })}
        />
        <Field
          label="Кассир"
          type="checkbox"
          inline={true}
          onChange={(v) => setFilters({ ...filters, cashierProfile: v })}
        />
      </div>
    </Panel>
  );
}

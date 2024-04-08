import styles from "./Field.module.scss";

export default function Field({
  label,
  onChange,
  placeholder,
  type = "text",
  inline,
}: {
  type?: string;
  label?: string;
  placeholder?: string;
  onChange?: (v: any) => void;
  inline?: boolean;
}) {
  return (
    <div className={styles.field} data-inline={inline}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
}

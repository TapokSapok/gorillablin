import styles from "./DropdownItem.module.scss";

export default function DropdownItem({
  onClick,
  img,
  title,
}: {
  onClick: () => void;
  img: string;
  title: string;
}) {
  return (
    <button className={styles.item} onClick={onClick}>
      <img src={img} />
      <div className={styles.item_title}>{title}</div>
    </button>
  );
}

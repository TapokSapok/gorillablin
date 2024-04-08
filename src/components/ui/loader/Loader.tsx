"use client";
import styles from "./Loader.module.scss";

export function Loader({
  width,
  color,
  stroke,
}: {
  width?: number;
  color?: string;
  stroke?: number;
}) {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.spin}
      width={width}
    >
      <circle
        cx="400"
        strokeWidth={stroke}
        cy="400"
        fill="none"
        r="200"
        stroke={color ?? "currentColor"}
      />
    </svg>
  );
}

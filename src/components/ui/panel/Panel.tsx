"use client";
import { CSSProperties, PropsWithChildren, ReactNode, useState } from "react";
import styles from "./Panel.module.scss";

export default function Panel({
  title,
  children,
  allowClosing,
  style,
  noFullHeight,
}: PropsWithChildren<{
  title: string;
  allowClosing?: boolean;
  style?: CSSProperties;
  noFullHeight?: boolean;
}>) {
  const [closed, setClosed] = useState(false);

  return (
    <div
      className={styles.panel}
      style={
        !closed
          ? style ?? {
              height: "100%",
            }
          : {}
      }
    >
      <div
        className={styles.panel_header}
        onClick={() => allowClosing && setClosed(!closed)}
      >
        <div className={styles.panel_title}>{title}</div>
        {allowClosing && (
          <img
            src={closed ? "./arrow-up.svg" : "./arrow-down.svg"}
            alt=""
            width={20}
          />
        )}
      </div>
      {!closed && (
        <div
          className={styles.panel_body}
          style={!noFullHeight ? { height: "calc(100% - 49.5px)" } : {}}
        >
          {children}
        </div>
      )}
    </div>
  );
}

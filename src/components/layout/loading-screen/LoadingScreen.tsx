"use client";

import { PropsWithChildren, useContext, useEffect } from "react";
import styles from "./LoadingScreen.module.scss";
import { ProfileContext } from "@/app/providers";
import SecondLoader from "@/components/ui/second-loader/SecondLoader";
import { usePathname } from "next/navigation";

export default function LoadingScreen({ children }: PropsWithChildren<{}>) {
  const { profile } = useContext(ProfileContext);
  const pathname = usePathname();

  return (
    <div style={!profile ? { overflow: "hidden" } : {}}>
      {!profile && pathname !== "/auth" && (
        <div className={styles.screen}>
          <SecondLoader width={120} stroke={2} />
        </div>
      )}
      {children}
    </div>
  );
}

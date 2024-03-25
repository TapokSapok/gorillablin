'use client';
import { PropsWithChildren, ReactNode, useState } from 'react';
import styles from './Panel.module.scss';

export default function Panel({ title, children }: PropsWithChildren<{ title: string }>) {
	const [closed, setClosed] = useState(false);

	return (
		<div className={styles.panel} style={!closed ? { height: '100%' } : {}}>
			<div className={styles.panel_header} onClick={() => setClosed(!closed)}>
				<div className={styles.panel_title}>{title}</div>
				<img src={closed ? './arrow-up.svg' : './arrow-down.svg'} alt='' width={20} />
			</div>
			{!closed && <div className={styles.panel_body}>{children}</div>}
		</div>
	);
}

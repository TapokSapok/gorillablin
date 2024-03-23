import styles from './Field.module.scss';

export default function Field({ label, onChange, placeholder }: { label?: string; placeholder?: string; onChange?: (v: string) => void }) {
	return (
		<div className={styles.field}>
			{label && <label className={styles.label}>{label}</label>}
			<input type='text' onChange={e => onChange && onChange(e.target.value)} />
		</div>
	);
}

import styles from './styles.module.css'

type Props = {
    color: string;
    label: string;
    onClick: () => void;
}

export const SideMenuItem = ({color, label, onClick}: Props) =>{
    return(
        <div className={styles.container} onClick={onClick}>
            <span>{label}</span>
        </div>
    )
}
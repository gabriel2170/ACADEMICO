import styles from './styles.module.css';


type Props = {
    color: string;
    label: string;
    fill?:boolean;
    onClick: () => any;
}


export const Button1 = ({ color, label, fill, onClick }: Props) => {

    

    
    return (
        <div
            className={styles.container}
            style={{
                color: fill ? '#fff' : color,
                borderColor: color,
                backgroundColor: fill ? color : 'transparent',
            }}
            onClick={onClick}
        >
            {label}
        </div>
    );
}




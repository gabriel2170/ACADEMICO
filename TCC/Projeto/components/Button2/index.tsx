import { Icon } from '../Icon';
import styles from './styles.module.css';

type Props = {
    color: string;
    leftIcon?: string;
    rightIcon?: string;
    label: string;
    onClick?: () => void;
    fill?: boolean;
}

export const Button2 = ({ color, leftIcon, rightIcon, label, onClick, fill }: Props) => {
    return (
        <div className={styles.container} style={{ backgroundColor: fill ? color : '#f9f9fb' }} onClick={onClick}>

            <div className={styles.paymentArea}>
                {leftIcon &&
                    <div className={styles.leftSide} style={{ backgroundColor: fill ? 'rgba(0, 0, 0, .1' : '#fff' }}>
                        <Icon
                            color={fill ? '#fff' : color}
                            svg={leftIcon}
                            width={24}
                            height={24}
                            icon={'money'}
                        />
                    </div>
                }
                {rightIcon &&
                    <div className={styles.rightSide} style={{ backgroundColor: fill ? 'rgba(0, 0, 0, .1' : '#fff' }}>
                        <Icon
                            color={fill ? '#fff' : color}
                            svg={rightIcon}
                            width={24}
                            height={24}
                            icon={'card'}
                        />
                    </div>
                }

                <div className={styles.centerSide} style={{ color: fill ? '#fff' : '#1b1b1b' }}>{label}</div>

            </div>
        </div>
    );
}
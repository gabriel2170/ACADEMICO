import { useEffect, useState } from 'react';
import styles from './styles.module.css';




type Props = {
    color: string;
    count: number;
    onUpdateCount: (newCount: number) => void;
    min?: number;
    max?: number;
    small?: boolean;
}

export const Quantity = ({ color, count, onUpdateCount, min, max, small }: Props) => {

    const [canRemove, setCanRemove] = useState(false);
    const [canAdd, setCanAdd] = useState(false);

    useEffect(() => {
        setCanRemove((!min || (min && count > min)) ? true : false)
        setCanAdd((!max || (min && count < max)) ? true : false)
    }, [count, min, max]) // função para bloquear caso passe do max que é 10 ou do min que é 1

    const handleRemove = () => {
        if (canRemove) {      
            onUpdateCount(count - 1);                             
        }
    }

    const handleAdd = () => {
        if (canAdd) {       
            onUpdateCount(count + 1);
            
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.button}
                onClick={handleRemove}
                style={{
                    width: small ? 40 : 50,
                    height: small ? 40 : 50
                }}
            >-</div>

            <div className={styles.qt}
                style={{ fontSize: small ? 16 : 18 }}
            >{count}</div>

            <div className={styles.button}
                onClick={handleAdd}
                style={{
                    width: small ? 40 : 50,
                    height: small ? 40 : 50
                }}
            >+</div>
        </div>
    );
}
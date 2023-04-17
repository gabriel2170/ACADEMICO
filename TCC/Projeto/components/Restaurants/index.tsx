import styles from './styles.module.css';
import Image from 'next/image'
import Link from 'next/link';

export const Restaurants = () => {
    return (
        <div className={styles.images}>

            <div className={styles.title}>
                <h1>Restaurantes Parceiros</h1>
                <div className={styles.line}></div>
            </div>

            <Link href="/delivery1">
                <div className={styles.delivery}>
                    <img src="/tmp/Pizzaria/logo.png" width={"250px"} height={"250px"} />
                </div>
            </Link>

            <Link href="/delivery2">
                <div className={styles.delivery}>
                    <img src="/tmp/Cervejaria/logo.png" width={"250px"} height={"250px"} />
                </div>
            </Link>

            <Link href="/delivery3">
                <div className={styles.delivery}>
                    <img src="/tmp/Hamburgueria/logo.png" width={"250px"} height={"250px"} />
                </div>
            </Link>

            <Link href="/delivery4">
                <div className={styles.delivery}>
                    <img src="/tmp/Sorveteria/logo.png" width={"250px"} height={"250px"} />
                </div>
            </Link>
        </div>
    );
}
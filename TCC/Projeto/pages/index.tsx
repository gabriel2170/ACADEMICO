import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Restaurants } from '../components/Restaurants'
import styles from '../styles/HomePage.module.css'

const HomePage: NextPage = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.hero}>

          <div className={styles.header}>
            <ul>
              <li><a href="">Safe Home Delivery</a></li>
            </ul>
          </div>

          <div className={styles.bg}>
            <div className={styles.left} style={{}}>
              <Image src="/tmp/dish-left.png" width="250" height="250" />
            </div>
            <div className={styles.right} style={{}}>
              <Image src="/tmp/dish-right.png" width="250" height="250" />
            </div>
          </div>

        </div>

        <div className={styles.restaurants}>
          <Restaurants />
        </div>

      </div>
    </div >
  )
}

export default HomePage
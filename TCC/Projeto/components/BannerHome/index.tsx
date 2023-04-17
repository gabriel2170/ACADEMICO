import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import styles from './styles.module.css';
import 'swiper/css';

import React, { useRef, useState } from "react";


import "swiper/css/effect-fade";


export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                className={styles.swiper}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay:2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade]}
                loop={true}
                effect={"fade"}

                onSwiper={(swiper) => (swiper)}>

                <SwiperSlide className={styles.slide}> <img src="/tmp/entrega-gratis.png" /> </SwiperSlide>
                <SwiperSlide className={styles.slide}> <img src="/tmp/slide1.jpg" /> </SwiperSlide>
            </Swiper>
        </div>
    );
}
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller, Lazy, EffectCreative, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';

function Slider({ product }) {
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

    let params = {
        modules: [Controller, Navigation, Lazy, EffectCreative, Thumbs],
        preloadImages: false,
        slidesPerView: 1,
        lazy: true,
        navigation: {
            nextEl: '.slider-product-controls__arrows .slider-arrow__next',
            prevEl: '.slider-product-controls__arrows .slider-arrow__prev',
        },
        loop: false,
        grabCursor: true,
        effect: 'creative',
        speed: 800,
        thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null },
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        },
    };

    let thumbsParams = {
        modules: [Controller, Thumbs],
        slideToClickedSlide: true,
        spaceBetween: 10,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
    };

    return (
        <>
            {product && (
                <div className="product-modal__body modal-body">
                    <div className="modal-body__slider">
                        <div className="product-slider__slider">
                            <Swiper {...params} className="slider-product__body">
                                {product.images &&
                                    product.images.length > 0 &&
                                    product.images.map((item, index) => (
                                        <SwiperSlide
                                            key={`${item}_${index}`}
                                            className="slider-product__slide">
                                            <img className="swiper-lazy" src={item} alt="" />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>

                            <div className="slider-product-controls">
                                <div className="slider-product-controls__arrows slider-arrows">
                                    <button
                                        type="button"
                                        className="slider-arrow slider-arrow__prev icon-chevron__left"></button>
                                    <button
                                        type="button"
                                        className="slider-arrow slider-arrow__next icon-chevron__right"></button>
                                </div>
                            </div>
                        </div>

                        <div className="thumb-slider__slider">
                            <Swiper
                                {...thumbsParams}
                                onSwiper={setThumbsSwiper}
                                className="slider-product__body">
                                {product.images &&
                                    product.images.length > 0 &&
                                    product.images.map((item, index) => (
                                        <SwiperSlide
                                            key={`${item}_${index}`}
                                            className="slider-thumb__slide">
                                            <img className="swiper-lazy" src={item} alt="" />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>

                    <div className="modal-body__content">
                        <h4 className="product-name">{product.name}</h4>
                        <h4 className="product-price">{product.price} MDL</h4>

                        <p>{product.description}</p>
                        {/* <button className="add-cart button button__dark added">
                <div className="icon-done"></div>
                Добавить в корзину
            </button> */}
                    </div>
                </div>
            )}
        </>
    );
}

export default Slider;

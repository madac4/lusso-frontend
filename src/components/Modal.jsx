import React from 'react';
import Slider from './Slider';
import useLockBodyScroll from '../hooks/useBodyLock';

function Modal({ product, openModal, closeModal }) {
    useLockBodyScroll();
    return (
        <div className={openModal ? 'product-modal open' : 'product-modal'}>
            <Slider product={product} />

            <button
                type="button"
                onClick={closeModal}
                className="product-modal__close icon-close"></button>
        </div>
    );
}

export default Modal;

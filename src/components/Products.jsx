import React from 'react';
import { axiosInstance } from '../config';
import { slice } from 'lodash';

import Product from './Product';
import Modal from './Modal';

function Products({ products }) {
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [index, setIndex] = React.useState(12);
    const initialPosts = slice(products, 0, index);
    const [singleProduct, setSingleProduct] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);

    const loadMore = () => {
        setIndex(index + 12);
        if (index >= products.length) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    };

    // ? MODAL FUNCTIONS
    const getProductModal = async (id) => {
        const { data } = await axiosInstance.get(`/products/?id=${id}`);
        setSingleProduct(data);
        setOpenModal(true);
        console.log(data);
    };

    const closeModal = () => {
        setSingleProduct('');
        setOpenModal(false);
    };
    // ? MODAL FUNCTIONS

    return (
        <>
            <div
                className={
                    products.length > 0
                        ? 'catalog__body catalog-body catalog-grid'
                        : 'catalog__body catalog-body'
                }>
                {products.length > 0 ? (
                    initialPosts.map((product, i) => (
                        <Product
                            get={getProductModal}
                            key={`${product.name}_${i}`}
                            product={product}
                        />
                    ))
                ) : (
                    <div className="catalog-empty">
                        <h2>There are no products</h2>
                    </div>
                )}
            </div>
            {products.length > 12
                ? !isCompleted && (
                      <button onClick={loadMore} type="button" className="button button__dark">
                          Показать еще
                      </button>
                  )
                : ''}

            {singleProduct.length > 0 && (
                <Modal product={singleProduct[0]} openModal={openModal} closeModal={closeModal} />
            )}
        </>
    );
}

export default Products;

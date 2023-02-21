import React from 'react';

function Product({ product, get }) {
    return (
        <article onClick={() => get && get(product._id)} className="catalog-body__item product">
            <img
                src={product && product.images && product.images.length > 0 && product.images[0]}
                alt=""
            />
            <p>{product.name}</p>
            <h4>{product.price} MDL</h4>
        </article>
    );
}

export default Product;

import React from 'react';
import { axiosInstance } from '../config';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Products from '../components/Products';


function Catalog() {
    const [products, setProducts] = React.useState([]);
    const [showFilters, setShowFilters] = React.useState(false);
    const [filteredProducts, setFilteredProducts] = React.useState(null);

    const [filters, setFilters] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    const [activeCategory, setActiveCategory] = React.useState('');
    const [activeSubCategory, setActiveSubCategory] = React.useState('');
    const [currentBrands, setCurrentBrands] = React.useState([]);

    const [brandsArray, setBrandsArray] = React.useState([]);

    const navigate = useNavigate();

    // ? FETCH DATA
    React.useEffect(() => {
        const getCategories = async () => {
            const res = await axiosInstance.get(`/categories`);
            setCategories(res.data);
        };
        getCategories();
    }, []);

    const getSubcategory = async (item) => {
        if (item) {
            const { data } = await axiosInstance.get(`/subcategories/find/${item._id}`);
            setCurrentBrands(data.brands);
        }

    };
    React.useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await axiosInstance.get(`/products`);
                setProducts(data);
            } catch (error) {
                console.log(error);
                alert('Ошибка при получении каталога!');
                // navigate('/');
            }
        };
        getProducts();
    }, [navigate, filters]);
    // ? FETCH DATA

    const toggleFilters = () => {
        setShowFilters(!filters);
    };

    const clearFilters = () => {
        setFilters([]);
        setBrandsArray([]);
        setActiveCategory('');
        setActiveSubCategory('');
        setCurrentBrands([]);
        setFilteredProducts(products);
    };

    const handleFilters = (e, item) => {
        if (e.target.name !== 'brand') {
            setFilters({
                ...filters,
                [e.target.name]: e.target.value,
            });
        } else {
            if (e.target.checked) {
                setBrandsArray((current) => [...current, e.target.value]);
            } else {
                setBrandsArray((current) =>
                    current.filter((element) => element !== e.target.value),
                );
            }
        }
        if (e.target.name === 'category') {
            setActiveCategory(item);
        } else if (e.target.name === 'subcategory') {
            setActiveSubCategory(item);
            setBrandsArray([]);
            getSubcategory(item);
        }
    };

    React.useEffect(() => {
        if (filters.category && filters.brands && filters.brands.length > 0) {
            const checkedProducts =
                filters &&
                filters.brands &&
                Object.entries(filters.brands)
                    .filter((value) => value[1])
                    .map((item) => item[1]);

            const filtered =
                checkedProducts && products.filter(({ brand }) => checkedProducts.includes(brand));

            setFilteredProducts(filtered);
        }
    }, [filters.brands, products, filters]);

    React.useEffect(() => {
        if (
            filters.category &&
            !filters.subcategory &&
            filters.brands &&
            filters.brands.length === 0
        ) {
            const checkedProducts = Object.entries(filters)
                .filter((value) => value[1])
                .map((item) => item[1]);
            const filtered = products.filter(({ category }) => checkedProducts.includes(category));

            setFilteredProducts(filtered);
        }
    }, [filters, products]);

    

    React.useEffect(() => {
        if (filters.subcategory && filters.brands && filters.brands.length === 0) {
            const checkedProducts = Object.entries(filters)
                .filter((value) => value[1])
                .map((item) => item[1]);
            const filtered = products.filter(({ subcategory }) =>
                checkedProducts.includes(subcategory),
            );
            setFilteredProducts(filtered);
        }
    }, [filters.subcategory, filters.brands, products, filters]);
    React.useEffect(() => {
        setFilters({
            ...filters,
            brands: brandsArray,
        });
        // eslint-disable-next-line
    }, [brandsArray]);

    return (
        <div className="wrapper">
            <Header></Header>
            <main>
                <svg className="checkbox-symbol">
                    <symbol id="check" viewBox="0 0 12 10">
                        <polyline
                            points="1.5 6 4.5 9 10.5 1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"></polyline>
                    </symbol>
                </svg>
                <div className="page-introduction">
                    <img src="assets/img/catalog1.jpg" alt="" />
                    <img src="assets/img/catalog2.jpg" alt="" />
                </div>

                <div className="catalog">
                    <aside
                        className={
                            showFilters
                                ? 'catalog__sidebar catalog-sidebar open'
                                : 'catalog__sidebar catalog-sidebar'
                        }>
                        <div className="catalog-sidebar__filters filters-simple">
                            <h6>Категории</h6>
                            <button
                                name="categories"
                                onClick={clearFilters}
                                className={activeCategory === '' ? 'current' : ''}>
                                Все
                            </button>
                            {categories &&
                                categories.map((item) => (
                                    <button
                                        key={item._id}
                                        name="category"
                                        value={item._id}
                                        onClick={(e) => handleFilters(e, item)}
                                        className={
                                            activeCategory._id === item._id ? 'current' : ''
                                        }>
                                        {item.name}
                                    </button>
                                ))}
                        </div>
                        {activeCategory && activeCategory.subcategories.length > 0 && (
                            <div className="catalog-sidebar__filters filters-simple">
                                <h6>Субкатегории</h6>
                                {activeCategory.subcategories.map((item, i) => (
                                    <button
                                        key={item._id}
                                        name="subcategory"
                                        value={item._id}
                                        onClick={(e) => {
                                            handleFilters(e, item);
                                        }}
                                        className={
                                            activeSubCategory._id === item._id ? 'current' : ''
                                        }>
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        {activeCategory && activeCategory.brands.length > 0 && (
                            <div className="catalog-sidebar__filters filters-checkbox">
                                <h6>Бренд</h6>

                                {activeCategory.brands.map((item, i) => (
                                    <label key={item._id} className="checkbox-container">
                                        <input
                                            name="brand"
                                            value={item._id}
                                            className="checkbox-input"
                                            type="checkbox"
                                            onClick={handleFilters}
                                        />
                                        <span className="checkbox">
                                            <span>
                                                <svg width="12px" height="10px">
                                                    <use xlinkHref="#check"></use>
                                                </svg>
                                            </span>
                                            <span>{item.name}</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {currentBrands && currentBrands.length > 0 && (
                            <div className="catalog-sidebar__filters filters-checkbox">
                                <h6>Бренд</h6>

                                {currentBrands.map((item, i) => (
                                    <label key={item._id} className="checkbox-container">
                                        <input
                                            className="checkbox-input"
                                            type="checkbox"
                                            name="brand"
                                            value={item._id}
                                            onClick={handleFilters}
                                        />
                                        <span className="checkbox">
                                            <span>
                                                <svg width="12px" height="10px">
                                                    <use xlinkHref="#check"></use>
                                                </svg>
                                            </span>
                                            <span>{item.name}</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {/* <div className="catalog-sidebar__filters filters-checkbox">
                            <h6>В наличии</h6>

                            <label className="checkbox-container">
                                <input
                                    className="checkbox-input"
                                    name="inStock"
                                    onClick={(e) => {
                                        handleFilters(e);
                                    }}
                                    type="checkbox"
                                />
                                <span className="checkbox">
                                    <span>
                                        <svg width="12px" height="10px">
                                            <use xlinkHref="#check"></use>
                                        </svg>
                                    </span>
                                    <span>В наличии</span>
                                </span>
                            </label>
                        </div> */}
                        <button
                            className="icon-close close-filter"
                            onClick={toggleFilters}></button>
                    </aside>
                    <div className="catalog__container">
                        <button className="button button__dark open-filter" onClick={toggleFilters}>
                            Фильтры
                        </button>

                        <Products
                            products={filteredProducts ? filteredProducts : products}
                            filters={filters}
                        />
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Catalog;

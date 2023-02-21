import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';

import logo from '../assets/img/logos/logo.svg';

function Header(props) {
    const [burger, setBurger] = useState(false);
    const { width } = useWindowDimensions();

    const heroSection = document.querySelector('.hero');
    const toggleBurger = () => {
        setBurger(!burger);
    };

    return (
        <header
            className={
                props.isHidden
                    ? 'header sticky hidden'
                    : 'header sticky' && !heroSection
                    ? 'header sticky'
                    : 'header sticky p-fixed'
            }>
            <div className="header__container">
                <Link to="/" className="header__logo">
                    <img src={logo} alt="logo" />
                </Link>

                <nav className={burger ? 'header__nav active' : 'header__nav'}>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? 'current' : '')}
                                end>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/catalog"
                                className={({ isActive }) => (isActive ? 'current' : '')}>
                                Catalog
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => (isActive ? 'current' : '')}>
                                About us
                            </NavLink>
                        </li>
                    </ul>
                    {width <= 767 && (
                        <div className="header-contacts__socials">
                            <a
                                href="https://instagram.com/lusso.md?igshid=MDE2OWE1N2Q="
                                target="_blank"
                                rel="noreferrer">
                                <span className="icon-instagram"></span>
                            </a>
                            <a
                                href="https://m.facebook.com/LussoHomewareGifts/"
                                target="_blank"
                                rel="noreferrer">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM16.5635 15.6589V23.8197H13.1869V15.6592H11.5V12.8469H13.1869V11.1585C13.1869 8.86425 14.1395 7.5 16.8457 7.5H19.0988V10.3126H17.6905C16.637 10.3126 16.5673 10.7056 16.5673 11.4391L16.5635 12.8466H19.1147L18.8162 15.6589H16.5635Z"
                                        fill="black"
                                    />
                                </svg>
                            </a>
                        </div>
                    )}
                </nav>

                <div className="header__contacts header-contacts">
                    <a className="header-contacts__phone" href="tel:+37360257777">
                        (+373) 60 257 777
                    </a>
                    {width > 767 && (
                        <div className="header-contacts__socials">
                            <a
                                href="https://instagram.com/lusso.md?igshid=MDE2OWE1N2Q="
                                target="_blank"
                                rel="noreferrer">
                                <span className="icon-instagram"></span>
                            </a>
                            <a
                                href="https://m.facebook.com/LussoHomewareGifts/"
                                target="_blank"
                                rel="noreferrer">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM16.5635 15.6589V23.8197H13.1869V15.6592H11.5V12.8469H13.1869V11.1585C13.1869 8.86425 14.1395 7.5 16.8457 7.5H19.0988V10.3126H17.6905C16.637 10.3126 16.5673 10.7056 16.5673 11.4391L16.5635 12.8466H19.1147L18.8162 15.6589H16.5635Z"
                                        fill="black"
                                    />
                                </svg>
                            </a>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={toggleBurger}
                        className={burger ? 'burger active' : 'burger'}>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;

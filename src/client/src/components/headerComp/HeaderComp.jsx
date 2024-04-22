import React from 'react';

function HeaderComp({ onPageChange }) {
    const handleNavClick = (pageNumber) => {
        onPageChange(pageNumber);
    };
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="/" onClick={() => handleNavClick(1)}>Home</a></li>
                    <li><a href="/map">Map</a></li>
                    <li><a href="/" onClick={() => handleNavClick(2)}>Login</a></li>
                    <li><a href="/" onClick={() => handleNavClick(3)}>à propos</a></li>
                    <li><a href="/" onClick={() => handleNavClick(4)}>éditer</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default HeaderComp;

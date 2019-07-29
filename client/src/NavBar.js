import React from "react";

function NavBar() {
    return (
        <div className="itemls-container">
            <nav className="itemls-nav">
                <span className="itemls-title">Cake Villa </span><br/>
                <a href="/"> Cakes</a>
                <a href="/cart">Cart</a>
                <a href="/administrator">Administrator</a>
            </nav>
        </div>
    );
}

export default NavBar;
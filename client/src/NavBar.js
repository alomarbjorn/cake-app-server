import React from "react";
import { Link } from "@reach/router";

function NavBar() {
    return (
        <div className="itemls-container">
            <nav className="itemls-nav">
                <span className="itemls-title">Cake Villa </span><br/>
               <Link to="/">Cakes</Link>
               <Link to="/Cart">Cart</Link>
               <Link to="/Administrator">Administrator</Link>
            </nav>
        </div>
    );
}

export default NavBar;
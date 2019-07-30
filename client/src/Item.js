import React from "react";
import { Link } from "@reach/router";
function Item ({ ItemShowing }) {
    const { item_id, item_name, item_price } = ItemShowing;
   
    return (
        <div className="itemls-item">
            <div className="itemls-item-body">
                <div className="itemls-title">{item_name}</div>
                <p className="itemls-price">{item_price}</p>
            </div>
            <div className="itemls-item-footer">
            <Link to={`/Cart/${item_id}`} className="itemls-btn itemls-btn-item">
                     CheckOut
            </Link>
            </div>
        </div>
    );
}

export default Item;
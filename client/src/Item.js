import React from "react";

function Item ({ ItemShowing }) {
    const { id, item_name, item_price } = ItemShowing;
   
    return (
        <div className="itemls-item">
            <div className="itemls-item-body">
                <div className="itemls-title">{item_name}</div>
                <p className="itemls-price">{item_price}</p>
            </div>
            <div className="itemls-item-footer">
                <a href={`/item/${id}`} className="itemls-btn itemls-btn-price">
                    CheckOut
                </a>
            </div>
        </div>
    );
}

export default Item;
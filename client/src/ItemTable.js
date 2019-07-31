import React from "react";

function ItemTable({
    items,
    tableLoading,
    tableError,
    deleteSuccess,
    onEditItem,
    onDeleteItem
}) {
    if (tableLoading) {
        return <p className="itemls-table-loading">Loading movies...</p>;
    }

    return (
        <div className="itemls-table">
            {deleteSuccess && (
                <p className="itemls-alert mvls-alert-success">
                    Record deleted successfully.
                </p>
            )}
            {tableError && (
                <p className="itemls-alert itemls-alert-error">
                    Sorry, a server error occurred. Please retry.
                </p>
            )}
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Cake</th>
                        <th>Price</th>
                        
                    </tr>
                </thead>
                {items.length === 0 && (
                    <tbody>
                        <tr>
                            <td colSpan="8" className="itemls-no-data">
                                No data
                            </td>
                        </tr>
                    </tbody>
                )}
                {items.length > 0 && (
                    <tbody>
                        {items.map((item, index) => {
                            const {
                                item_id,
                                itemName,
                                itemPrice
                               
                            } = item;

                            return (
                                <tr key={item_id}>
                                    <td>{index + 1}</td>
                                    <td>{itemName}</td>
                                    <td>{itemPrice}</td>
                                    
                                    <td>
                                        <span
                                            className="itemls-table-link"
                                            onClick={onEditItem(item)}
                                        >
                                            Edit
                                        </span>
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <span
                                            className="itemls-table-link"
                                            onClick={onDeleteItem(
                                                item,
                                                items
                                            )}
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default ItemTable;
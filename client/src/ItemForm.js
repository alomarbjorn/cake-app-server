import React from "react";

function ItemForm({
    itemName,
    itemPrice,
    formSubmitting,
    validationErrors,
    formSuccess,
    formError,
    handleChange,
    resetFormState,
    handleSubmit
}) {
    const disabled =
        !itemName||
        !itemPrice 
        
        
 return (
    <form className="itemls-form" onSubmit={handleSubmit}>
            {formSuccess && (
                <p className="itemls-alert itemls-alert-success">
                    Form submitted successfully.
                </p>
            )}
            {formError && (
                <p className="mvls-alert mvls-alert-error">
                    Sorry, error submitting form. Please retry.
                </p>
            )}
            <div className="itemls-form-row">
                <div className="itemls-form-col">
                    <label htmlFor="title">Cake</label>
                    <div className="itemls-form-input-group">
                        <input
                            type="text"
                            name="Cake "
                            className={
                                validationErrors.itemName ? "has-error" : ""
                            }
                            autoComplete="off"
                            value={itemName}
                            onChange={handleChange}
                            disabled={formSubmitting}
                        />
                        {validationErrors.itemName && (
                            <span className="itemls-form-input-error">
                                {validationErrors.itemName}
                            </span>
                        )}
                    </div>
                </div>
                <div className="itemls-form-col">
                    <label htmlFor="itemPrice">Price</label>
                    <div className="itemls-form-input-group">
                        <input
                            type="number"
                            name="Price"
                            className={
                                validationErrors.itemPrice ? "has-error" : ""
                            }
                            autoComplete="off"
                            value={itemPrice}
                            onChange={handleChange}
                            disabled={formSubmitting}
                        />
                        {validationErrors.itemPrice && (
                            <span className="itemls-form-input-error">
                                {validationErrors.itemPrice}
                            </span>
                        )}
                    </div>
                </div>   
            </div>

            
            <button
                className="itemls-btn itemls-btn-form"
                type="Shop It"
                disabled={disabled || formSubmitting}
            >
                Shop It
            </button>
            <button
                className="itemls-btn itemls-btn-form"
                type="Reset"
                onClick={resetFormState}
                disabled={formSubmitting}
            >
                Reset
            </button>
        </form>
    );
}

export default ItemForm;



import React from "react";
import axios from "axios";
import ItemForm from "./ItemForm";
import ItemTable from "./ItemTable";

class ItemAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item_name: "",
            item_price: "",
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            items: [],
            tableLoading: false,
            tableError: false,
            deleteSuccess: false
        };
        this.resetFormState = this.resetFormState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }
    componentDidMount(){
        this.fetchItems();
    }
    fetchItems(){
        this.setState({ tableLoading: true, tableError: false});

        axios
        .get("/api/items")
            .then(response => {
                this.setState({
                    items: response.data.map(data => ({
                        ...data,
                        itemName: data.item_name,
                        itemPrice: data.item_price
                    })),
                    tableLoading: false,
                    tableError: false
                });
            })
            .catch(_error => {
                this.setState({
                    items: [],
                    tableLoading: false,
                    tableError: true
                });
            });
    
    }
    resetFormState() {
        this.setState({
            itemName:"",
            itemPrice: "",
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            deleteSuccess: false
        });
    }
    isValid() {
        const { validationErrors, isValid } = this.validateFormInput(
            this.state
        );

        if (!isValid) {
            this.setState({ validationErrors });
        }

        return isValid;
    }
    validateFormInput(data) {
        const validationErrors = {};
        const {
            itemName,
            itemPrice
        } = data;
        
        if (!itemName) {
            validationErrors.title = "This field is required";
        }
        if (!itemPrice) {
            validationErrors.title = "This field is required";
        }
        return {
            validationErrors,
            isValid: Object.keys(validationErrors).length === 0
        };
    }
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();

        const {
            editing,
            item_id,
            itemName,
            itemPrice
            
            
        } = this.state;
        if (this.isValid()) {
            this.setState({
                validationErrors: {},
                formSubmitting: true,
                formSuccess: false,
                formError: false
            });

            if (editing) {
                // Existing record - update
                axios
                    .put(`/api/items/${item_id}`, {
                        item_name: itemName,
                        item_price: itemPrice
                        
                        
                    })
                    .then(response => {
                        this.resetFormState();

                        const index = item_id.findIndex(c => c.id === item_id);

                        this.setState({
                            formSuccess: true,
                            items: [
                                ...item_id.slice(0, index),
                                {
                                    itemName,
                                    itemPrice
                                },
                                ...item_id.slice(index + 1)
                            ]
                        });
                    })
                    .catch(error => {
                        this.setState({
                            validationErrors: {},
                            formSubmitting: false,
                            formSuccess: false,
                            formError: true
                        });
                    });
            } else {
                // New record - Save
                axios
                .post("/api/items", {
                    
                    item_name: itemName,
                    item_price: itemPrice
                    
                })
                .then(response => {
                    this.resetFormState();
                    this.setState({
                        formSuccess: true,
                        items: [
                            ...item_id,
                            {
                                itemName,
                                itemPrice
                            }
                        ]
                    });
                })
                .catch(error => {
                    this.setState({
                        validationErrors: {},
                        formSubmitting: false,
                        formSuccess: false,
                        formError: true
                    });
                });
        }
    }
}
handleEditItem(item) {
    return () => {
        this.setState({
            ...item,
             editing: true
        });
    };
}
handleDeleteItem(item, items) {
    return () => {
        const { item_id, item_name,  } = item;

        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete '${item_name}'?`)) {
            axios
                .delete(`/api/items/${item_id}`)
                .then(response => {
                    const index = items.findIndex(c => c.id === item_id);

                    this.setState({
                        items: [
                            ...items.slice(0, index),
                            ...items.slice(index + 1)
                        ],
                        deleteSuccess: true,
                        tableError: false
                    });
                })
                    .catch(error => {
                        this.setState({
                            deleteSuccess: false,
                            tableError: true
                        });
                    });
            }
        };
    }
    render() {
        const {
            itemName,
            itemPrice,
            editing,
            formSubmitting,
            validationErrors,
            formSuccess,
            formError,
            items,
            tableLoading,
            tableError,
            deleteSuccess
        } = this.state;

        return (
            <div className="itemls-item-admin">
                <h1>Cakes</h1>
                <h3>{editing ? "Edit Item" : "Add Item"}</h3>
                <ItemForm
                    itemName={itemName}
                    itemPrice={itemPrice}
                    
                    formSubmitting={formSubmitting}
                    validationErrors={validationErrors}
                    formSuccess={formSuccess}
                    formError={formError}
                    handleChange={this.handleChange}
                    resetFormState={this.resetFormState}
                    handleSubmit={this.handleSubmit}
                />
                <ItemTable
                    items={items}
                    tableLoading={tableLoading}
                    tableError={tableError}
                    deleteSuccess={deleteSuccess}
                    onEditItem={this.handleEditItem}
                    onDeleteItem={this.handleDeleteItem}
                />
            </div>
        );
    }

}

export default ItemAdmin;
import React from "react";
import axios from "axios";
import Item from "./Item";
import Loading from "./Loading";
import Error from "./Error";

class ItemList extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
            ItemShowing: [],
             loading: false,
             error: false
           };
       }

       componentDidMount() {
               this.fetchItemShowing();
             }
        
             fetchItemShowing() {
                 this.setState({ loading: true, error: false });
        
                 axios
                     .get("/api/items")
                     .then(response => {
                         this.setState({
                             ItemShowing: response.data,
                             loading: false,
                             error: false
                         });
                         
                     })
                     .catch(error => {
                         this.setState({
                             ItemShowing: [],
                             loading: false,
                             error: true
                         });
                     });
             }
       render() {
        const { ItemShowing, loading, error } = this.state;
        
                 if (loading) {
                     return <Loading />;
                 }
        
            if (error) {
                     return <Error />;
        }

    return (
        <div className="item-container">
            <div className="itemls-item-list">
                {ItemShowing.map(m => (
                    <Item key={m.item_id} ItemShowing={m} />
                ))}
            </div>
        </div>
    );
    }
}
export default ItemList;
require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const app = express();

const pool = mysql.createPool({
    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    
    
     });

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get ("/api/items", (_req, res) => {
    pool.query("SELECT item_id, item_name, item_price FROM item", (error, rows) =>{
        if (error){
            return res.status(500).json({error});
        }
        res.json(rows);
    });
});

app.get ("/api/customer", (_req, res) => {
    pool.query("SELECT customer_name, address, phone_number FROM customers", (error, rows) =>{
        if (error){
            return res.status(500).json({error});
        }
        res.json(rows);
    });
});
 app.post("/api/items", (req, res) => {
     const item = {item_name,item_price} = req.body;

     if (
         
         !item_name ||
         !item_price 
        ) {
         return res.status(400).json({error: "Invalid payload"});
     }
     pool.query(
         "INSERT INTO item (item_name, item_price) VALUES (?, ?)",
         [item_name, item_price],
         (error, results) => {
             if (error) {
                 return res.status(500).json({ error});

             }
             res.json(results.insertId);
         }
     );
    });

app.put("/api/items/:item_id", (req, res) => {
    const {item_name, item_price} = req.body;
    
    if (!item_name || item_price){
        return res.status(400).json({error: "Invalid payload" });
    }

    pool.query(
        "UPDATE item SET item_name = ?, item_price = ? WHERE item_id = ?",
        [item_name, item_price, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({error});
            }
            res.json(results.changedRows);
        }
    );
});

app.delete("/api/items", (req, res) => {
    pool.query(
        "DELETE FROM item WHERE item_id = ?",
        [req.params.id],
        (error, results) => {
            if (error){
                return res.status(500).json({error});
            }
            res.json(results.affectedRows);
        }
    );
});

app.post("/api/customer", (req, res) => {
    const   {customer_name, address, phone_number,} = req.body;

    if (
        !customer_name ||
        !address ||
        !phone_number 
       ) {
        return res.status(400).json({error: "Invalid payload"});
    }
    pool.query(
        "INSERT INTO customers (customer_name, address, phone_number) VALUES (?, ?, ?)",
        [customer_name, address, phone_number],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error});

            }
            res.json(results.insertId);
        }
    );
   });

app.listen(9000, () => console.log("App listening on port 9000"));


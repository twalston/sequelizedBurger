const mysql = require("mysql"),
    inquirer = require("inquirer");
    require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Nascar2011",
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

function displayProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        // EASY WAY
        console.table(res)
        /* HARD WAY -----------------
        for (i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + "\nName: " + res[i].product_name +
                "\nPrice: " + res[i].price + "\n \n");
        }

        ---------------------------*/
        runQuery();
    });
}

function runQuery() {
    inquirer.prompt([{
            type: "input",
            name: "id",
            message: "Please enter the ID of the product you wish to purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "Please enter the quantity you wish to purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function(answers) {
        var item_id = answers.id;
        console.log("ANSWERS.ID: "+ item_id)
        //console.log("ANSWERS: " + JSON.stringify(answers))
        var query = "SELECT * FROM products WHERE item_id = ?";
        connection.query(query, [item_id], function(err, res) {
            console.log("query res: " + JSON.stringify(res) )
            console.log('ITEM ID: '+ res[0].item_id)
            if (err) throw err;
            // Make sure below math is working with UPDATE METHOD on line 78
            var id = res[0].item_id;
            var newQuant = res[0].stock_quantity - answers.quantity,
                orderPrice = res[0].price * answers.quantity;
            var totalSales = res[0].product_sales + orderPrice;
            if (res[0].stock_quantity < answers.quantity) {
                console.log("Insufficient Quantity!");
                connection.end();

                // { stock_quantity: newQuant, product_sales: totalSales }
              
            }

            connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQuant, id],
            function(err, res) {
                console.log('NEW QUANT: ' + newQuant)
                console.log('ID IN UPDATE: ' + id)
                console.log("Order successful! Total cost: $" + orderPrice);
                inquirer.prompt([{
                    name: "confirm",
                    type: "confirm",
                    message: "Make another purchase?"
                }]).then(function(answers) {
                    if (answers.confirm === true) {
                        displayProducts();
                    } else {
                        connection.end();
                    }
                })

            });



            displayProducts();
        });
    })

}
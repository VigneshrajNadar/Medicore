const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'apollo.db');
const db = new sqlite3.Database(dbFile);

// Sample orders data
const testOrders = [
  {
    user_id: 1,
    total_amount: 1250.50,
    status: 'delivered',
    payment_method: 'credit_card',
    shipping_address: '123 Apollo Street, Chennai, Tamil Nadu - 600001'
  },
  {
    user_id: 1,
    total_amount: 890.00,
    status: 'pending',
    payment_method: 'debit_card',
    shipping_address: '123 Apollo Street, Chennai, Tamil Nadu - 600001'
  },
  {
    user_id: 2,
    total_amount: 2100.75,
    status: 'shipped',
    payment_method: 'upi',
    shipping_address: '456 Medical Road, Bangalore, Karnataka - 560001'
  }
];

// Sample order items
const testOrderItems = [
  // Order 1 items
  { order_id: 1, product_name: 'Paracetamol 500mg', quantity: 2, price: 50.25 },
  { order_id: 1, product_name: 'Dolo 650mg', quantity: 1, price: 85.00 },
  { order_id: 1, product_name: 'Vitamin C Tablets', quantity: 3, price: 120.00 },
  { order_id: 1, product_name: 'Hand Sanitizer', quantity: 2, price: 75.00 },
  
  // Order 2 items
  { order_id: 2, product_name: 'Azithromycin 500mg', quantity: 1, price: 150.00 },
  { order_id: 2, product_name: 'Cough Syrup', quantity: 2, price: 120.00 },
  { order_id: 2, product_name: 'Face Mask', quantity: 10, price: 20.00 },
  { order_id: 2, product_name: 'Thermometer', quantity: 1, price: 280.00 },
  
  // Order 3 items
  { order_id: 3, product_name: 'Metformin 500mg', quantity: 4, price: 80.00 },
  { order_id: 3, product_name: 'Blood Pressure Monitor', quantity: 1, price: 1200.00 },
  { order_id: 3, product_name: 'Glucometer', quantity: 1, price: 800.75 }
];

// Function to seed orders and order items
const seedOrders = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing orders and order items
      db.run('DELETE FROM order_items', (err) => {
        if (err) return reject(err);
        
        db.run('DELETE FROM orders', (err) => {
          if (err) return reject(err);
          console.log('Cleared existing orders');

          // Insert orders
          const insertOrder = db.prepare(`
            INSERT INTO orders (user_id, total_amount, status, payment_method, shipping_address)
            VALUES (?, ?, ?, ?, ?)
          `);

          let ordersInserted = 0;
          let orderErrors = 0;

          testOrders.forEach((order, index) => {
            insertOrder.run([
              order.user_id,
              order.total_amount,
              order.status,
              order.payment_method,
              order.shipping_address
            ], function(err) {
              if (err) {
                console.error(`Error inserting order ${index + 1}:`, err);
                orderErrors++;
              } else {
                ordersInserted++;
                console.log(`Inserted order ${index + 1} with ID: ${this.lastID}`);
                
                // Insert order items for this order
                const insertItem = db.prepare(`
                  INSERT INTO order_items (order_id, product_name, quantity, price)
                  VALUES (?, ?, ?, ?)
                `);

                let itemsInserted = 0;
                let itemErrors = 0;
                const orderItems = testOrderItems.filter(item => item.order_id === index + 1);

                orderItems.forEach((item, itemIndex) => {
                  insertItem.run([
                    this.lastID,
                    item.product_name,
                    item.quantity,
                    item.price
                  ], (itemErr) => {
                    if (itemErr) {
                      console.error(`Error inserting order item ${itemIndex + 1} for order ${index + 1}:`, itemErr);
                      itemErrors++;
                    } else {
                      itemsInserted++;
                      console.log(`Inserted order item: ${item.product_name}`);
                    }

                    if (itemsInserted + itemErrors === orderItems.length) {
                      insertItem.finalize();
                    }
                  });
                });
              }

              if (ordersInserted + orderErrors === testOrders.length) {
                insertOrder.finalize();
                console.log(`Successfully seeded ${ordersInserted} orders`);
                if (orderErrors > 0) {
                  console.log(`Failed to insert ${orderErrors} orders`);
                }
                resolve();
              }
            });
          });
        });
      });
    });
  });
};

// Run the seeding
seedOrders().then(() => {
  console.log('Orders seeding completed!');
  
  // Show summary
  db.get('SELECT COUNT(*) as count FROM orders', (err, orderRow) => {
    if (!err) {
      console.log(`Total orders in database: ${orderRow.count}`);
    }
    
    db.get('SELECT COUNT(*) as count FROM order_items', (err, itemRow) => {
      if (!err) {
        console.log(`Total order items in database: ${itemRow.count}`);
      }
      
      db.close(() => {
        console.log('Database connection closed');
        process.exit(0);
      });
    });
  });
}).catch(err => {
  console.error('Error seeding orders:', err);
  db.close(() => {
    process.exit(1);
  });
});

const User      = 	require("./models/User");
const Product   =   require("./models/Product");
const mongoose 	= 	require("mongoose");
const bcrypt    =   require('bcryptjs');
const faker     =   require('faker');

var adminUser = {
    name: "Administrador", 
    email: "admin@admin.com",
    password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
    isAdmin: true
};

async function seedDB(){
    await User.deleteMany({}, function(err) { 
      console.log('Users removed') 
    });
    await Product.deleteMany({}, function(err) { 
      console.log('Products removed') 
    });
    // Create a Admin User
    await User.create(adminUser, function(e) {
	    if (e) {
	        throw e;
	    }
    });
    // Create 90 products
    for(let i = 0; i < 25; i++) {
        const product = new Product();
        product.category = faker.commerce.department();
        product.name = faker.commerce.productName();
        product.description = faker.hacker.phrase();
        product.cost_price = faker.commerce.price();
        product.sale_price = faker.commerce.price();
        product.quantity = 18;
        product.image = faker.image.image();
        await product.save(err => {
          if (err) { return next(err); }
        });
      }
      console.log("BD Seeded with 25 products and Admin User");
}

module.exports = seedDB;
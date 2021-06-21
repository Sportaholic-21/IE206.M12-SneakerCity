const {Category} = require("../models/categoryModel");
const { restart } = require('nodemon');
exports.getHome = async (req, res, next) => {
  try {
    // Render template
    const products = await (await Product.find().sort({createdDate: -1})).slice(0, 8);
    res.status(200).render("pages/home", { title: "Home", product: products});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAbout = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/about", { title: "About" });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getProducts = async (req, res, next) => {
  try {
    // Render template
    
    return res.status(200).render("pages/products", {
      title: "Products",
      
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.sortProducts = async (req, res, next) => {
  try{
    const q = req.query.q;
    var sort = [];
    if(q == "newest"){
      sort = await (Product.find().sort({createdDate: -1}));
    }
    if(q == "Lowest"){
      sort = await (Product.find().sort({price: 1}));
    }
    if(q == "Highest"){
      sort= await (Product.find().sort({price: -1}));
    }
    res.status(200).render("pages/products", {
      title: "Products", product: sort
    });
  } catch(err){
    return res.status(404).json({status: "fail", message: err});
  }
}

exports.searchProducts = async (req, res, next) =>{
  try{
    const q = req.query.q;
    const matchedProducts = await Product.find();
    var product =[];
    console.log(matchedProducts);
    console.log(q);
    for(i =0; i < matchedProducts.length; i++){
      if(matchedProducts[i].name.toUpperCase().includes(q.toUpperCase())){
        product.push(matchedProducts[i]);
      }
    }
    res.status(200).render("pages/products", {
      title: "Products", product: product
    });
   } catch (err){
       return res.status(400).json({status: "fail", message: err});
       }
  next();
};

exports.getVans = async (req, res, next) => {
  try {
    const product = await Product.find({"category.0.name" : "Vans"});
    // Render template
    res.status(200).render("pages/products", {
      title: "Vans",
      products: product,

    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPalladium = async (req, res, next) => {
  try {
    const product = await Product.find({"category.0.name" : "Palladium"});
      // Render template
      res.status(200).render("pages/products", {
        title: "Palladium",
        products: product,
      });
    } 
    catch (err) {
      res.status(404).json({ status: "fail", message: err });}

  next();
};

exports.getConverse = async (req, res, next) => {
  try {
    const product = await Product.find({"category.0.name" : "Converse"});
         // Render template
        res.status(200).render("pages/products", {
        title: "Converse",
        products: product,
    });
    
  } 
  catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
  next();
};

exports.getProduct = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/detail", {
      title: "Detail",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPolicy = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/return-policy", {
      title: "Policy",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAccount = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/account", {
      title: "Account",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getWishlist = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/wishlist", {
      title: "Wishlist",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getCart = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/cart", {
      title: "Cart",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPayment = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/payment", {
      title: "Payment",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.get404 = async (req, res, next) => {
  try {
    // Render template
    return res.status(404).render("pages/404", {
      title: "404",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

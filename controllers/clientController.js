const {Product} = require('../models/productModel');
const Cart = require("../models/cartModel");
const Wishlist = require("../models/wishlistModel");
const {Transaction} = require('../models/transactionModel');
const User = require("../models/userModel");
const dotenv = require("dotenv");
const APIFeatures = require("../utils/apiFeatures");
dotenv.config({ path: "./config.env" });


const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


const {Category} = require("../models/categoryModel");
exports.getHome = async (req, res, next) => {
  try {
    // Render template
    const products = await (await Product.find().sort({createdDate: -1})).slice(0, 8);
    return res.status(200).render("pages/home", { title: "Home", product: products});
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

exports.getFeedback = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/feedback", {
      title: "Feedback",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// get products
exports.getProducts = async (req, res, next) => {
  try {
    let filter = {}

    // get info for sending data to view
    brand = req.params.brand || null; 

    // get brand name
    if (brand) {
      filter = { "category.0.name": brand }
    }

    const limit = 12; // limit products on each page
  
    const page = req.query.page * 1 || 1; // convert string to number
    const searchQuery = req.query.search || null; // get search info
    const sortQuery = req.query.sort || null; // get search query

    const numProducts = await Product.countDocuments(filter); // total number of products

    // execute query
    const features = new APIFeatures(Product.find(filter), req.query)
    .search()
    .sort()
    .paginate(limit);
    
    const products = await features.query;

    // Render template
    return res.status(200).render("pages/products", {
      title: brand || "Products", 
      product: products,
      current: page,
      pages: Math.ceil(numProducts / limit),
      searchQuery: searchQuery,
      sortQuery: sortQuery
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getProduct = async (req, res, next) => {
  try {
    // Render template
    const slug = req.params.slug;
    const product = await Product.findOne({slug: slug}).exec();
    return res.status(200).render("pages/detail", {
      title: "Detail", product: product
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
    if (!req.session.wishlist) {
      return res.status(200).render("pages/wishlist", {
          title: "Wishlist",   
          products: null
        }
      );
    }

    var wishlistSession = new Wishlist(req.session.wishlist);
    var wishlist = wishlistSession.generateArr()
    let products = []
    for (i = 0; i < wishlist.length; i++) {
      const product = await Product.findOne({name: wishlist[i].item.name}).exec();
      products.push(product)
    }
    return res.status(200).render("pages/wishlist", {
      title: "Wishlist",
      products: products,
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getCart = async (req, res, next) => {
  try {
    if (!req.session.cart) {
      return res.status(200).render("pages/cart", {
          title: "Cart",   
          products: null
        }
      );
    }

    var cartSession = new Cart(req.session.cart);
    var cart = cartSession.generateArr();
    let products = []
    for (i = 0; i < cart.length; i++) {
      const product = await Product.findOne({name: cart[i].item.name}).exec();
      products.push(product)
    }
    return res.status(200).render("pages/cart", {
        title: "Cart",   
        products: products,
        totalPrice: cart.totalPrice,
      }
    );
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPayment = async (req, res, next) => {
  try {
    if (!req.session.cart.totalQty) {
      return res.redirect('/home');
    }

    var cart = new Cart(req.session.cart);

    return res.status(200).render("pages/payment", {
      title: "Checkout",
      total:  cart.totalPrice,
      products: cart.generateArr(),
      stripePublicKey: stripePublicKey
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

exports.postPaymentDone = async(req, res) => {
  //console.log(req.body.stripeTokenId)
  stripe.charges.create({
    amount: req.body.total,
    source: req.body.stripeTokenId,
    currency: 'usd',
  }).then(async function(){
    const trans = new Transaction({
      total: req.body.total,
      status: true
    })
    const newTrans = await trans.save()
    console.log('Charge Successful')
    res.json({ message: 'Successfully purchased items' })
  }).catch(function(err){
    console.log(err)
    res.status(500).end()
  })
}

exports.getLoginFirst = async(req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/login-first", { title: "Sign In"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }
  next();
}

exports.getPermissionDenied = async(req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/permission-denied", { title: "Sign In"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }
  next();
}

exports.getSignIn = async (req, res, next) => {
  try {
    
    // Render template
    return res.status(200).render("pages/signIn", { title: "Sign In"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getSignUp = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/signUp", { title: "Sign Up"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.logout = (req, res) => {
  req.logout();
  req.session.user = null;
  return res.redirect('back'); // redirect ve trang hien tai
}

exports.getOrder = (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/clientOrder", { title: "Order"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
}

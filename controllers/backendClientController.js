const {Product} = require("../models/productModel");
const Cart = require("../models/cartModel");
const Wishlist = require("../models/wishlistModel");

exports.addToCart = async (req, res, next) => {
  try {
    
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {items: {}});
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      cart.add(p, productId);
      req.session.cart = cart;
      req.session.save();
    });
    return res.send(cart);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};


exports.removeFromCart = async (req, res, next) => {
  try {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart);
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      cart.remove(p, productId);
      req.session.cart = cart;
      req.session.save();
    });
    return res.send(req.session.cart);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.updateCart = async (req, res, next) => {
  try {
    var productId = req.params.id;
    var newQty = req.body.newQty;
    
    var cart = new Cart(req.session.cart);
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      cart.updateQty(p, productId, newQty);
      req.session.cart = cart;
      req.session.save();
    });
    return res.send(req.session.cart);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.addToWishlist = async (req, res, next) => {
  try {
    
    var productId = req.params.id;
    var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist: {items: {}});
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      wishlist.add(p, productId);
      req.session.wishlist = wishlist;
      req.session.save();
    });
    return res.send(req.session.wishlist);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};


exports.removeFromWishlist = async (req, res, next) => {
  try {
    var productId = req.params.id;
    var wishlist = new Wishlist(req.session.wishlist);
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      wishlist.remove(productId);
      req.session.wishlist = wishlist;
      req.session.save();
    });
    return res.send(req.session.wishlist);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};
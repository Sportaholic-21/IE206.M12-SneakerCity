exports.getDashboard = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/dashboard", {
      title: "Dashboard",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// categories
exports.getCategories = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/category/category", {
      title: "Categories",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// orders
exports.getOrders = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/order/order", {
      title: "Orders",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// products
exports.getProducts = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/product/product", {
      title: "Products",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAddProduct = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/product/product-add", {
      title: "Add Product",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getEditProduct = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/product/product-edit", {
      title: "Edit Product",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// users
exports.getUsers = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/user/user", {
      title: "Users",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAddUser = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/user/user-add", {
      title: "Add User",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// Feedbacks
exports.getFeedbacks = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/feedback", {
      title: "Add User",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();

//~~~~~~~~PRODUCT~~~~~~~~
//Add -> POST
router.post("/product/add",adminController.postAddProduct);
//Update -> PUT
router.put("/product/edit/:id",adminController.putUpdateProduct);

//~~~~~~~~USER~~~~~~~~~~~~
router.post("/user/add", adminController.postAddUser)

//~~~~~~~~Category~~~~~~~~~
router.put("/category/edit/:id", adminController.putUpdateCate);
router.post("/category/add",adminController.postAddCate)
router.delete("/category/delete/", adminController.deleteCategory);

//~~~~~~~~ORDER~~~~~~~~~~~
router.route("/order/:id")
    .delete(adminController.deleteOrder)
    .patch(adminController.patchOrder) 
module.exports = router;

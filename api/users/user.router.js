// const Controller = require("./user.controller");
const {
    createUser,
    getUsers,
    getUsersByUserId,
    updateUser,
    deleteUser,
    login
} = require("./user.controller");
const express = require("express");
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUsersByUserId);
router.put("/", updateUser);
router.patch("/", updateUser);
router.delete("/", deleteUser);
router.post("/login", login);
module.exports = router;
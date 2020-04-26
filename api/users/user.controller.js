const {
    create,
    getUserByUserEmail,
    getUsersByUserId,
    getUsers,
    updateUser,
    deleteUser
} = require("./user.service");

const bcrypt = require("bcrypt");

const {
    hashSync,
    genSaltSync,
    compareSync
} = require("bcrypt");
const {
    sign
} = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Database connection Successful",
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                res.send('Email not found!!')
                console.log(err)

            }
            /* if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid Email or Password"
                });
            } */
            const result = bcrypt.compareSync(body.password, results.password);
            if (result) {
                results.password = null;
                const jsontoken = sign({
                    result: results
                }, process.env.JSONTOKEN, {
                    expiresIn: '1h'
                });
                return res.json({
                    success: 1,
                    message: 'Login Successfully',
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: 'invalid Email or Password Again!!!'
                });
            }



        });
    },
    getUsersByUserId: (req, res) => {
        const id = req.params.id;
        getUsersByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to Update any Record"
                });
            }
            return res.json({
                success: 1,
                message: "Updated Successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to delete or Record not Found"
                });
            }
            return res.json({
                success: 1,
                message: "User Deleted Successfully"
            });
        });
    }

};
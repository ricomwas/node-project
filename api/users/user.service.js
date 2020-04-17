const pool = require("../../config/database")

module.exports = {
    create: (data, callBack) => {
        pool.query(
            /*change the name of the table to insert to:*/
            `insert into test (first_name, last_name, gender, email, password, phone_number)
                        values($1, $2, $3, $4, $5, $6)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone_number,

            ],
            (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from test where email = $1`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUsersByUserId: (id, callBack) => {
        pool.query(
            `select test_id, first_name, last_name, gender, email, phone_number from test where test_id = $1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select test_id, first_name, last_name, gender, email, phone_number from test`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update test set first_name = $1, last_name = $2, gender = $3, email = $4, password = $5, phone_number = $6
             where test_id = $7`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone_number,
                data.test_id

            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from test where test_id = $1`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }


};
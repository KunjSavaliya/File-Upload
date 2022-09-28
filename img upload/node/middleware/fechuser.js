const jwt = require('jsonwebtoken');

const fetchuser = async (req, res, next) => {
    try {
        const data = jwt.verify(req.body.token, 'todo-app-super-shared-secret');
        // console.log("dtat",data)
        if (data) {
            res.status(200).send(true)
        }
    } catch (error) {
        res.status(401).send(false)
    }
};

module.exports = fetchuser;
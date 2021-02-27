const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register(req, res) {
        const user = new User(req.body);

        user
            .save()
            .then(() => {
                res.json({ msg: "success!", user: user});
            })
            .catch(err => res.status(400).json(err));
    },

    login(req, res) {
        User.findOne({ email: req.body.email})
            .then(user => {
                if (user === null) {
                    res.status(400).json({ msg: "invalid login attempt"});
                } else {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if(passwordIsValid) {
                                res
                                    .cookie(
                                        "usertoken",
                                        jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                                        {
                                            httpOnly: true
                                        }
                                    )
                                    .json({ msg: "Success!", _id: user._id});
                            } else {
                                res.status(400).json({ msg: "invalid login attempt" })
                            }
                        })
                        .catch(err => 
                            res.status(400).json({ msg: "invalid login attempt "})
                        );
                }
            })
            .catch(err => res.json(err));
    },

    logout(req, res) {
        res
            .cookie("usertoken", jwt.sign({ _id: ""}, process.env.JWT_SECRET), {
                httpOnly: true,
                maxAge: 0
            })
            .json({ message: "ok"});
    }
}
const User = require('../models/user.model');

const register = async (req, res) => {
  console.log("register")

  try {
    const user = await User.create(req.body);

    res.status(201).json({status: 'passed', message:"Successfully registered"});
  } catch (e) {
    return res.status(500).json({status: 'failed', message: e.message});
  }
};

const get = async (req, res) => {
  try {
    const user = await User.find().lean().exec();

    res.status(201).json({status: 'passed', user});
  } catch (e) {
    return res.status(500).json({status: "failed", message: e.message});
  }
};

module.exports = {register, get};

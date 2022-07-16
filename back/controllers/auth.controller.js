const UserModel = require('../models/user.model');

//  Inscription d'un user
module.exports.signUp = async (req, res) => {
  console.log('req.body:', req.body);
  const { email, password } = req.body;

  try {
    const user = await UserModel.create({ email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

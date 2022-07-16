const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//  Récupere tout les users sauf le password grace à select()
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};

//  Récupere un seul user via son id
module.exports.getOneUser = (req, res) => {
  //  Renvoi une erreur si id n'existe pas dans la DB
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log('ID unknwon : ' + err);
  }).select('-password');
};

//  Modifier un user
module.exports.updateUser = async (req, res) => {
  //  Renvoi une erreur si id n'existe pas dans la DB
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          prenom: req.body.prenom,
          nom: req.body.nom,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//  Supprimer un user
module.exports.deleteUser = async (req, res) => {
  //  Renvoi une erreur si id n'existe pas dans la DB
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: 'Successfully deleted. ' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

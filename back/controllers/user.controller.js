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
    res.status(200).json({ message: 'Successfully deleted.' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//  Follow un user
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send('ID unknown : ' + req.params.id);

  try {
    //  Ajouter à la liste des abonnés
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => {
        return res.status(201).send(docs);
      })
      .catch((err) => {
        return res.status(400).send({ message: err });
      });
    //  Ajouter à la liste des abonnement
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        //if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//  Unfollow un user
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send('ID unknown : ' + req.params.id);

  try {
    //  Supprimer de la liste des abonnés
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => {
        return res.status(201).send(docs);
      })
      .catch((err) => {
        return res.status(400).send({ message: err });
      });
    //  Supprimer de la liste des abonnement
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        //if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

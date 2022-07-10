const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);

// Envoi de l'image de profil à travailler 
module.exports.uploadProfil = async (req, res) => {

    try {
    //  erreur de format
        if (
            req.file.detectedMimeType != 'image/jpg' &&
            req.file.detectedMimeType != 'image/png' &&
            req.file.detectedMimeType != 'image/jpeg'
        )
        throw Error('invalid file');
// max size accepter
        if (req.file.size > 500000) throw Error('max size');
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }
    const fileName = req.body.name + '.jpg'; 
//  Destination
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

    try {
    // Envoi de l'image dans le serveur
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err })
            }
        )
          
            
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
/*
try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err }));
            
    } catch (err) {
        return res.status(500).send({ message: err });
    }
*/
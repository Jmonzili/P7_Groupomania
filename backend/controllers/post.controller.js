
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//  Lire les posts
module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data :', err);
    }).sort({ createdAt: -1 });
};

//  Créer un post
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel( {
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: []
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch {
        return res.status(400).send({ err });
    }
}

//  Modifier un post
module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send('ID unknown : ' + req.params.id);
    
    const updatedRecord = {
        message: req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error :", err);
        }
    )
}

//  Supprimer un post
module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send('ID unknown : ' + req.params.id);
    
    PostModel.findByIdAndDelete(req.params.id,(err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error :", err);
    })
}
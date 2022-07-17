const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

//  Envoi de la photo charger par le client dans le serveur
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/post');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

const upload = multer({ storage });

module.exports = { upload };

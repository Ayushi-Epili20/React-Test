const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

// any file or image is allowed, maximum size 5 MB
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

module.exports = upload

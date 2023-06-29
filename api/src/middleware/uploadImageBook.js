const multer = require("multer");

const MIMETYPES = ["image/jpg", "image/jpeg", "image/png", "image/svg"];

// Configurar multer para procesar los archivos enviados en la solicitud
const storage = multer.diskStorage({
  destination: "uploads/books/",
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetypes)) cb(null, true);
    else cb(new Error(`Only ${MIMETYPES.join(" ")} mimetypes are allowed`));
  },
  limits: {
    fieldSize: 4000000, //4mb
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Middleware para manejar la carga de archivos en la solicitud
const uploadImageBook = upload.single("bookPic");

module.exports = uploadImageBook;

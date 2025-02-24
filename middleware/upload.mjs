import multer from 'multer';
// setting up the multer engine

const storage = multer.diskStorage({})
const upload = multer({storage:storage})
export default upload;
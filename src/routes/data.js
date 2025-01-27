const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, importTasks, exportTasks } = require('../controllers/dataController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
const multer = require('multer');


const upload = multer({ dest: 'uploads/' });

router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);
router.post('/import', protect, upload.single('file'), importTasks);
router.get('/export', protect, exportTasks);

module.exports = router;
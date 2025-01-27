const Task = require('../models/data');
const { parseCSV, exportToCSV } = require('../utils/csvHandler');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await Task.create({
            title,
            description,
            status,
            createdBy: req.user.id,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task && task.createdBy.toString() === req.user.id) {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found or unauthorized' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task && task.createdBy.toString() === req.user.id) {
            await task.remove();
            res.json({ message: 'Task removed' });
        } else {
            res.status(404).json({ message: 'Task not found or unauthorized' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const importTasks = async (req, res) => {
    try {
        const tasks = await parseCSV(req.file.path, req.user.id);
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const exportTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id });
        const csvFile = await exportToCSV(tasks);
        res.download(csvFile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, importTasks, exportTasks };


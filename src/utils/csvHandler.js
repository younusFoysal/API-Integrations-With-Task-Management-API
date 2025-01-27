const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { Parser } = require('json2csv');
const Task = require('../models/data');

const parseCSV = async (filePath, userId) => {
    const tasks = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                tasks.push({ ...row, createdBy: userId });
            })
            .on('end', async () => {
                try {
                    const savedTasks = await Task.insertMany(tasks);
                    resolve(savedTasks);
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', (error) => reject(error));
    });
};

const exportToCSV = async (tasks) => {
    const fields = ['_id', 'title', 'description', 'status', 'createdBy'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(tasks);
    const filePath = path.join(__dirname, '../../exports/tasks.csv');
    fs.writeFileSync(filePath, csv);
    return filePath;
};

module.exports = { parseCSV, exportToCSV };
import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import questionsRoute from './routes/questionRoute.js';
import scoresRoute from './routes/scoreRoute.js';
import cors from 'cors';
// import fs from 'fs';
// import path from 'path';
// import { Question } from './models/questionModel.js';

config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://millionaire-game-odbs7pukc-johnnabil1s-projects.vercel.app', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
})); 
app.use('/questions',questionsRoute);
app.use('/scores', scoresRoute);

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('App connected to DB');
        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port: ${process.env.PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })

// Read questions from the JSON file
// const __dirname = path.resolve();
// const questionsFilePath = path.join(__dirname, 'questions.json');

// fs.readFile(questionsFilePath, 'utf-8', async (err, data) => {
//   if (err) {
//     console.error('Error reading the file:', err);
//     process.exit(1);
//   }

//   const questions = JSON.parse(data);

//   try {
//     // Insert questions into the database
//     await Question.insertMany(questions);
//     console.log('Questions successfully added to the database');
//   } catch (error) {
//     console.error('Error inserting questions into the database:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// });
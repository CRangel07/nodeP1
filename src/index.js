import express from 'express';
import morgan from 'morgan';
import indexRouter from './routes/index.routes.js';
import employeesRouter from './routes/employees.routes.js';
import {PORT} from './config.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes 
app.use(indexRouter);
app.use(employeesRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

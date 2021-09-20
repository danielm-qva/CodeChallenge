import expres from 'express';
import studenRoute from './routes/students.routes';
import cors from 'cors';

const app = expres();
app.use(expres.json());

const config = {
	'allowedHeaders': '*',
	'exposedHeaders': 'link,x-total-count'
}

app.use(cors(config));
app.use('/students', studenRoute);

export default app;
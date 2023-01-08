import express, {Request, Response} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import StudentRecords, {Student} from './models/student';

const student = new StudentRecords();
const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('common'));

app.get('/', (req: Request, res: Response) => {
    res.send('This is the homepage');
});

app.get('/student', async (req: Request, res: Response) => {
    try {
        const student1 = await student.create({name: 'Patrick Kabuga', course: 'Computer Science', academic_year: 'Sophomore'});
        const student2 = await student.create({name: 'Iddah Cheplangat', course: 'Information Technology', academic_year: 'Fresher'});
        
        const allStudents = await student.index();
        res.json(allStudents);
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
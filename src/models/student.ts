import client from '../database';

export type Student = {
    id?: number | string;
    name: string;
    course: string;
    academic_year: string
}

export default class StudentRecords {
    async index(): Promise<Student[]> {
        try {
            const sql = 'SELECT * FROM students';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot open student's records: Error-${error}`);
        }
    }

    async create(s: Student): Promise<Student> {
        try {
            const sql = 'INSERT INTO students (name, course, academic_year) VALUES ($1, $2, $3) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [s.name, s.course, s.academic_year]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Couldn't add student records: Error-${error}`);
        }
    }

    async show(id: string): Promise<Student> {
        try {
            const sql = 'SELECT * FROM students WHERE id = ($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot show student: Error-${error}`);
        }
    }

    async delete(id: string): Promise<Student> {
        try {
            const sql = 'DELETE FROM students WHERE id = ($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Couldn't delete the student's records: Error-${error}`);
        }
    }
}
// import { connect } from '@planetscale/database';

// const config = {
//   host: process.env.DATABASE_HOST,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
// };

// export const conn = connect(config);

// export interface QuizResult {
//   id?: number;
//   name: string;
//   enrollment_number: string;
//   course: string;
//   batch: string;
//   school: string;
//   score: number;
//   created_at?: Date;
// }

// export async function createResultsTable() {
//   try {
//     await conn.execute(`
//       CREATE TABLE IF NOT EXISTS results (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         enrollment_number VARCHAR(50) NOT NULL,
//         course VARCHAR(100) NOT NULL,
//         batch VARCHAR(100) NOT NULL,
//         school VARCHAR(255) NOT NULL,
//         score INT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//     console.log('Results table created successfully');
//   } catch (error) {
//     console.error('Error creating results table:', error);
//   }
// }

// export async function saveQuizResult(result: Omit<QuizResult, 'id' | 'created_at'>) {
//   try {
//     const { insertId } = await conn.execute(
//       `INSERT INTO results (name, enrollment_number, course, batch, school, score) 
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [result.name, result.enrollment_number, result.course, result.batch, result.school, result.score]
//     );
//     return insertId;
//   } catch (error) {
//     console.error('Error saving quiz result:', error);
//     throw error;
//   }
// }

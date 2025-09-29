import { Pool } from 'pg';

interface QuizResult {
  name: string;
  enrollment_number: string;
  course: string;
  batch: string;
  school: string;
  score: number;
}

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EIsUjH37fFez@ep-empty-firefly-adcac45z-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database table
export async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        enrollment_number VARCHAR(50) NOT NULL,
        course VARCHAR(100) NOT NULL,
        batch VARCHAR(100) NOT NULL,
        school VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database table initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    client.release();
  }
}

export async function saveQuizResult(result: QuizResult): Promise<number> {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO results (name, enrollment_number, course, batch, school, score)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    
    const values = [
      result.name,
      result.enrollment_number,
      result.course,
      result.batch,
      result.school,
      result.score
    ];
    
    const res = await client.query(query, values);
    return res.rows[0].id;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  } finally {
    client.release();
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { saveQuizResult, initDatabase } from '@/lib/database';
import { quizQuestions } from '@/lib/quizData';

export async function POST(request: NextRequest) {
  try {
    // Initialize database table if it doesn't exist
    await initDatabase();
    
    const body = await request.json();
    const { answers, userDetails } = body;

    // Calculate score
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    // Save to database
    const result = await saveQuizResult({
      name: userDetails.name,
      enrollment_number: userDetails.enrollmentNumber,
      course: userDetails.course,
      batch: userDetails.batch,
      school: userDetails.school,
      score: score
    });

    return NextResponse.json({
      success: true,
      score,
      totalQuestions: quizQuestions.length,
      percentage: Math.round((score / quizQuestions.length) * 100),
      passed: score >= 11, // 70% of 15 = 10.5, so 11 or more
      resultId: result
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}

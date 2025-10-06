'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions } from '@/lib/quizData';

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(new Array(15).fill(-1));
  interface UserDetails {
    name: string;
    enrollmentNumber: string;
    course: string;
    batch: string;
    school: string;
  }
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get user details from sessionStorage
    const storedDetails = sessionStorage.getItem('userDetails');
    if (!storedDetails) {
      router.push('/');
      return;
    }
    setUserDetails(JSON.parse(storedDetails));
  }, [router]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          userDetails
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Store result in sessionStorage and navigate to results
        sessionStorage.setItem('quizResult', JSON.stringify(result));
        router.push('/result');
      } else {
        alert('Failed to submit quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const answeredQuestions = answers.filter(answer => answer !== -1).length;
  const progressWidth = (answeredQuestions / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Swachhata Pakhwada Quiz</h1>
              <p className="text-gray-600">Welcome, {userDetails.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Questions: {quizQuestions.length}</p>
              <p className="text-sm text-gray-500">Answered: {answeredQuestions}/{quizQuestions.length}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* All Questions */}
        <div className="space-y-6">
          {quizQuestions.map((question, questionIndex) => (
            <div key={question.id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {questionIndex + 1}. {question.question}
              </h2>
              
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      answers[questionIndex] === optionIndex
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={optionIndex}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() => handleAnswerSelect(questionIndex, optionIndex)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[questionIndex] === optionIndex
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[questionIndex] === optionIndex && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || answeredQuestions < quizQuestions.length}
              className="px-12 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Please answer all questions before submitting. 
            You can change your answers at any time by selecting a different option.
          </p>
        </div>
      </div>
    </div>
  );
}

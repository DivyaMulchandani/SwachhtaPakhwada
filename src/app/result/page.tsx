'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface QuizResult {
  success: boolean;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  resultId: number;
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  interface UserDetails {
    name: string;
    enrollmentNumber: string;
    course: string;
    batch: string;
    school: string;
  }
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);

  useEffect(() => {
    // Get result and user details from sessionStorage
    const storedResult = sessionStorage.getItem('quizResult');
    const storedDetails = sessionStorage.getItem('userDetails');
    
    if (!storedResult || !storedDetails) {
      router.push('/');
      return;
    }
    
    setResult(JSON.parse(storedResult));
    setUserDetails(JSON.parse(storedDetails));
  }, [router]);

  const handleDownloadCertificate = async () => {
    if (!result || !userDetails) return;
    
    setIsGeneratingCertificate(true);
    try {
      const response = await fetch('/api/generate-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userDetails.name,
          course: userDetails.course,
          batch: userDetails.batch,
          score: result.score,
          totalQuestions: result.totalQuestions
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificate-${userDetails.name.replace(/\s+/g, '-')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to generate certificate. Please try again.');
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('An error occurred while generating the certificate.');
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  const handleRetakeQuiz = () => {
    sessionStorage.removeItem('quizResult');
    router.push('/quiz');
  };

  const handleNewQuiz = () => {
    sessionStorage.clear();
    router.push('/');
  };

  if (!result || !userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz Results
          </h1>
          <p className="text-xl text-gray-600">
            Congratulations on completing the quiz!
          </p>
        </div>

        {/* Result Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold mb-4 ${
              result.passed 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {result.score}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {result.passed ? 'Congratulations! You Passed!' : 'Better Luck Next Time'}
            </h2>
            <p className="text-lg text-gray-600">
              You scored {result.score} out of {result.totalQuestions} questions
            </p>
            <p className="text-lg text-gray-600">
              ({result.percentage}%)
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.score}</div>
              <div className="text-sm text-blue-800">Correct Answers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{result.totalQuestions - result.score}</div>
              <div className="text-sm text-gray-800">Incorrect Answers</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{result.percentage}%</div>
              <div className="text-sm text-green-800">Percentage</div>
            </div>
          </div>

          {/* User Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2 text-gray-600">{userDetails.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Enrollment Number:</span>
                <span className="ml-2 text-gray-600">{userDetails.enrollmentNumber}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Batch (Semester):</span>
                <span className="ml-2 text-gray-600">{userDetails.batch}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Course:</span>
                <span className="ml-2 text-gray-600">{userDetails.course}</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-700">School/University:</span>
                <span className="ml-2 text-gray-600">{userDetails.school}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            {result.passed ? (
              <div className="space-y-4">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    You are eligible for a certificate!
                  </div>
                </div>
                
                <button
                  onClick={handleDownloadCertificate}
                  disabled={isGeneratingCertificate}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mr-4"
                >
                  {isGeneratingCertificate ? 'Generating...' : 'Download Certificate'}
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  You need at least 70% to get a certificate
                </div>
              </div>
            )}

            <div className="space-x-4">
              <button
                onClick={handleRetakeQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Retake Quiz
              </button>
              
              <button
                onClick={handleNewQuiz}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Start New Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {/*<div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Your quiz results have been saved to our database</li>
            <li>• If you passed, you can download your certificate anytime</li>
            <li>• You can retake the quiz to improve your score</li>
            <li>• Contact support if you have any questions</li>
          </ul>
        </div>*/}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    course: '',
    batch: '',
    school: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in sessionStorage and navigate to quiz
    sessionStorage.setItem('userDetails', JSON.stringify(formData));
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Online Quiz Portal
          </h1>
          <p className="text-xl text-gray-600">
            Test your knowledge and earn a certificate
          </p>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Quiz Instructions
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <p><strong>Number of Questions:</strong> 15 Multiple Choice Questions</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <p><strong>Time Limit:</strong> No time limit - take your time to think</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <p><strong>Passing Criteria:</strong> 70% or higher (11 out of 15 questions correct)</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <p><strong>Certificate:</strong> Download your personalized certificate upon passing</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                5
              </div>
              <p><strong>Navigation:</strong> You can review and change your answers before submitting</p>
            </div>
          </div>
        </div>

        {/* Personal Details Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Personal Details
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="enrollmentNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Enrollment Number / Empolyee ID *
                </label>
                <input
                  type="text"
                  id="enrollmentNumber"
                  name="enrollmentNumber"
                  required
                  value={formData.enrollmentNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter your enrollment number"
                />
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                  Course 
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="Enter your course"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>

              <div>
                <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-2">
                  Batch (Semester) 
                </label>
                <input
                  type="text"
                  id="batch"
                  name="batch"
                  
                  value={formData.batch}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="e.g., 2024-2028, 3rd Sem, etc."
                />
              </div>
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
                School/Section Name *
              </label>
              <input
                type="text"
                id="school"
                name="school"
                required
                value={formData.school}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Enter your school/section name"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Start Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
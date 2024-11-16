// src/pages/VerificationFailure.js
import React from 'react';

function VerificationFailure() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-red-800">Verification Failed</h1>
        <p className="text-lg text-gray-700 mb-4">We could not verify your identity. Please try again.</p>
        <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Go to Home</a>
      </div>
    </div>
  );
}

export default VerificationFailure;

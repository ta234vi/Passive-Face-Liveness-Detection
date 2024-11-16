import React from 'react';
import UserEnroll from './userEnroll';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </header>
      <main className="w-full max-w-5xl mx-auto mt-10">
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">User Enrollment</h2>
          <UserEnroll />
        </section>
      </main>
      <footer className="w-full bg-blue-600 text-white py-4 mt-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center">&copy; 2024 Admin Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;

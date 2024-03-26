
'use client'

import React, { useState } from 'react';

const TodoForm = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    title: '',
    date: '',
    isCompleted: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are empty
    const { user_email, title, date } = formData;
    if (!user_email || !title || !date) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const res = await fetch('https://assessment-server-r6hy.onrender.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      console.log(json);
      // Reset form data after successful submission
      setFormData({ user_email: '', title: '', date: '', isCompleted: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        name="user_email"
        value={formData.user_email}
        onChange={handleChange}
        placeholder="User Email"
        className="flex-grow h-12 px-6 py-2 text-white bg-very-dark-desaturated-blue rounded-l-md focus:outline-none"
        required
      />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Add a new todo"
        className="flex-grow h-12 px-6 py-2 text-white bg-very-dark-desaturated-blue rounded-l-md focus:outline-none"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="flex-grow h-12 px-6 py-2 text-white bg-very-dark-desaturated-blue rounded-l-md focus:outline-none"
        required
      />
      {error && <span className="text-red-500">{error}</span>}
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-very-dark-grayish-blue-darker/60 rounded-r-md"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
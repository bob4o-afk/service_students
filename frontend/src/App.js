import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import Login from './Login';

const App = () => {
  const { keycloak } = useKeycloak();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (keycloak.authenticated) {
      fetchStudents();
    }
  }, [keycloak.authenticated]);

  const fetchStudents = async () => {
    try {
      const token = keycloak.token;
      const response = await axios.get('http://localhost:3000/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (keycloak.authenticated) {
      try {
        const token = keycloak.token;
        const response = await axios.post(
          'http://localhost:3000/api/students',
          { name, age },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          alert('Student added successfully');
          setName('');
          setAge('');
          fetchStudents(); // Fetch the updated list of students
        } else {
          alert('Failed to add student');
        }
      } catch (error) {
        console.error('Error adding student:', error);
      }
    }
  };

  if (!keycloak.authenticated) {
    return <Login />;
  }

  return (
    <div className="App">
      <h1>Student Management System</h1>
      <p>Welcome, {keycloak.tokenParsed.preferred_username}!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
      <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        <ul>
          {students.map((student, index) => (
            <li key={index}>{`${student.name}, ${student.age}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

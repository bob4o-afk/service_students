import React, { useState, useEffect  } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Login from './Login';

const App = () => {
  const { keycloak } = useKeycloak();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');


//   const [students, setStudents] = useState([]);
//     const [newStudent, setNewStudent] = useState('');
    
//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const fetchStudents = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/students');
//             const data = await response.json();
//             setStudents(data);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//         }
//     };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (keycloak.authenticated) {
      const token = keycloak.token;
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, age }),
      });
      if (response.ok) {
        alert('Student added successfully');
        setName('');
        setAge('');
      } else {
        alert('Failed to add student');
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
      {/* <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        <ul>
            {students.map((student, index) => (
                <li key={index}>{student.name}</li>
            ))}
        </ul>
    </div> */}
    </div>
  );
};

export default App;

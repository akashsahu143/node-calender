import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from './components/Calendar';

function App() {
  const [holidays, setHolidays] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:5000/api/holidays')
      .then(response => {
        setHolidays(response.data);
      })
      .catch(error => {
        console.error('Error fetching holidays:', error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>Indian Calendar 2024</h1>
      <p>Current Time: {currentTime.toLocaleTimeString()}</p>
      <Calendar holidays={holidays} />
    </div>
  );
}

export default App;

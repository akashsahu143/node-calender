const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Hardcoded Indian holidays and festivals with date and time (time in 24h format)
const holidays = [
  { name: 'Republic Day', date: '2024-01-26', time: '00:00' },
  { name: 'Holi', date: '2024-03-25', time: '00:00' },
  { name: 'Good Friday', date: '2024-03-29', time: '00:00' },
  { name: 'Eid-ul-Fitr', date: '2024-04-10', time: '00:00' },
  { name: 'Independence Day', date: '2024-08-15', time: '00:00' },
  { name: 'Ganesh Chaturthi', date: '2024-09-07', time: '00:00' },
  { name: 'Gandhi Jayanti', date: '2024-10-02', time: '00:00' },
  { name: 'Diwali', date: '2024-11-01', time: '00:00' },
  { name: 'Christmas', date: '2024-12-25', time: '00:00' }
];

app.get('/api/holidays', (req, res) => {
  res.json(holidays);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

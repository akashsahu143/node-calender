import React from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function Calendar({ holidays }) {
  const year = 2024;

  // Create a map for quick holiday lookup by date string
  const holidayMap = {};
  holidays.forEach(h => {
    holidayMap[h.date] = h;
  });

  // Helper to get number of days in a month
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get day of week for 1st of month (0=Sun, 6=Sat)
  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Render calendar for each month
  const renderMonth = (month) => {
    const days = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    const blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push(<td key={'b' + i}></td>);
    }

    const daysCells = [];
    for (let d = 1; d <= days; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const holiday = holidayMap[dateStr];
      daysCells.push(
        <td key={d} style={{ 
          backgroundColor: holiday ? '#ffcccb' : 'transparent',
          cursor: holiday ? 'pointer' : 'default'
        }} title={holiday ? `${holiday.name} at ${holiday.time}` : ''}>
          {d}
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysCells];
    const rows = [];
    let cells = [];

    totalSlots.forEach((cell, i) => {
      if (i % 7 !== 0) {
        cells.push(cell);
      } else {
        if (cells.length > 0) {
          rows.push(<tr key={i / 7}>{cells}</tr>);
        }
        cells = [cell];
      }
      if (i === totalSlots.length - 1) {
        rows.push(<tr key={'last'}>{cells}</tr>);
      }
    });

    return (
      <table border="1" style={{ margin: '10px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th colSpan="7" style={{ backgroundColor: '#ddd' }}>{monthNames[month]}</th>
          </tr>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {[...Array(12).keys()].map(month => (
        <div key={month} style={{ width: '300px' }}>
          {renderMonth(month)}
        </div>
      ))}
    </div>
  );
}

export default Calendar;

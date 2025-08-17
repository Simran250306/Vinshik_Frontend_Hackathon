import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    { id: 1, date: "2024-01-15", title: "Client Meeting", time: "10:00 AM", type: "meeting" },
    { id: 2, date: "2024-01-18", title: "Job Site Visit", time: "2:00 PM", type: "site-visit" },
    { id: 3, date: "2024-01-22", title: "Quote Due", time: "5:00 PM", type: "deadline" },
    { id: 4, date: "2024-01-25", title: "Material Delivery", time: "9:00 AM", type: "delivery" }
  ]);
  const navigate = useNavigate();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>📅 Calendar</h1>
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="calendar-container">
        <div className="calendar-controls">
          <button onClick={prevMonth} className="nav-btn">‹</button>
          <h2>{formatDate(currentDate)}</h2>
          <button onClick={nextMonth} className="nav-btn">›</button>
        </div>

        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {weekDays.map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="calendar-days">
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isToday = day && day.toDateString() === new Date().toDateString();
              const isSelected = selectedDate && day && day.toDateString() === selectedDate.toDateString();
              
              return (
                <div
                  key={index}
                  className={`calendar-day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => day && setSelectedDate(day)}
                >
                  {day && (
                    <>
                      <span className="day-number">{day.getDate()}</span>
                      <div className="day-events">
                        {dayEvents.slice(0, 2).map(event => (
                          <div key={event.id} className={`event-dot ${event.type}`} title={event.title}></div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="more-events">+{dayEvents.length - 2}</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="selected-date-info">
            <h3>Selected Date</h3>
            <p>{selectedDate ? selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'No date selected'}</p>
          </div>

          <div className="events-list">
            <h3>Events</h3>
            {selectedDate ? (
              getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="event-item">
                    <div className={`event-type ${event.type}`}></div>
                    <div className="event-details">
                      <h4>{event.title}</h4>
                      <p>{event.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-events">No events for this date</p>
              )
            ) : (
              <p className="no-events">Select a date to view events</p>
            )}
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button className="action-btn">+ Add Event</button>
            <button className="action-btn">📅 View All Events</button>
          </div>
        </div>
      </div>
    </div>
  );
}

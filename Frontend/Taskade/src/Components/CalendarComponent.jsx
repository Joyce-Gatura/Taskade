/* eslint-disable no-unused-vars */
// src/components/CalendarComponent.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend (dummy data for now)
    const dummyEvents = [
      { date: new Date(), title: '' },
    ];
    setEvents(dummyEvents);
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const addEvent = (eventDate, eventTitle) => {
    const newEvent = { date: eventDate, title: eventTitle };
    setEvents([...events, newEvent]);
    toast.success(`Event "${eventTitle}" added on ${eventDate.toDateString()}`);
  };

  const tileContent = ({ date, view }) => {
    const event = events.find(event => event.date.toDateString() === date.toDateString());
    return event ? <p>{event.title}</p> : null;
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={tileContent}
      />
      <button  onClick={() => addEvent(date, "")}>Add Event</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.title} on {event.date.toDateString()}</li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default CalendarComponent;


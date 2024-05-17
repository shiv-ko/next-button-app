import React from 'react';
import Event from '../todo/page';


interface EventDisplayProps {
    events: Event[];
}

const EventDisplay: React.FC<EventDisplayProps> = ({ events }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // 今日の日付のみを比較するため、時間は無視
  
    const todaysEvents = events.filter(event => {
      const eventDate = new Date(event.start);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    });
  
    return (
      <div>
        <h3>Today Events</h3>
        {todaysEvents.length > 0 ? (
          todaysEvents.map(event => (
            <div key={event.id}>
              <p>{event.title}</p>
              <small>{event.start.toString()}</small>
            </div>
          ))
        ) : (
          <p>No events today.</p>
        )}
      </div>
    );
  };
  
  export default EventDisplay;

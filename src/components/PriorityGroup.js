import React from 'react';
import '../App.css';

const PriorityGroup = ({ groupKey, groupedTickets, getPriorityName, getUserById, getPriorityIcon, priorityIcons, statusIcons }) => {
  return (
    <div>
      <div className='priority-info'>
        <img className="icon" src={priorityIcons[groupKey]} alt={groupKey} />
        <h2>{getPriorityName(groupKey)}</h2>
        <p className='jj'>{groupedTickets[groupKey].count}</p>
      </div>
      <div className=''>
        {groupedTickets[groupKey].tickets.map(ticket => (
          <div key={ticket.id} className="kanban-card">
            <div className='priority-cam-name'>
              <h4 className='jj'>{ticket.id}</h4>
              <p>{getUserById(ticket.userId)}</p>
            </div>
            <div className='priority-status-title'>
              <img
                src={statusIcons[ticket.status]}
                alt={ticket.status}
                className="icon"
              />
              <h4>{ticket.title}</h4>
            </div>
            <div className='priority-kan'>
              <div className='priority-tag'>
                <p className='jj'>{ticket.tag.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityGroup;

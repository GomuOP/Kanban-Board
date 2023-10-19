import React from 'react';
import '../App.css';

const StatusGroup = ({ groupKey, groupedTickets, getUserById, getPriorityIcon, statusIcons, statusNames }) => {
  return (
    <div>
      <div className='status-info'>
        <img className="icon" src={statusIcons[groupKey]} alt={groupKey} />
        <h2>{statusNames[groupKey]}</h2>
        <p className='jj'>{groupedTickets[groupKey].count}</p>
      </div>
      <div>
        {groupedTickets[groupKey].tickets.map(ticket => (
          <div key={ticket.id} className="kanban-card">
            <div className='status-cam-name'>
              <h4 className='jj'>{ticket.id}</h4>
              <p>{getUserById(ticket.userId)}</p>
            </div>
            <h4 className='status-title'>{ticket.title}</h4>
            <div className='status-image-tag'>
              <img
                src={getPriorityIcon(ticket.priority)}
                alt={`Priority ${ticket.priority}`}
                className="icon ii"
              />
              <div className='tag'>
                <p className='jj'>{ticket.tag.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusGroup;

import React from 'react';
import '../App.css';

function UserGroup({ groupKey, groupedTickets, getPriorityName, getUserById, getPriorityIcon, statusIcons }) {
  return (
    <div>
      <div className='user-info'>
        <h2>{getPriorityName(groupKey)}</h2>
        <p className='jj'>{groupedTickets[groupKey].count}</p>
      </div>
      <div>
        {groupedTickets[groupKey].tickets.map(ticket => (
          <div key={ticket.id} className="kanban-card">
            <h4 className='user-cam jj'>{ticket.id}</h4>
            <div className='user-img-title'>
              <img
                src={statusIcons[ticket.status]}
                alt={ticket.status}
                className="icon "
              />
              <h4>{ticket.title}</h4>
            </div>
            <div className='user-status-tag'>
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
}

export default UserGroup;

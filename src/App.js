import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.js';
import UserGroup from './components/UserGroup.js'; 
import PriorityGroup from './components/PriorityGroup.js'; 
import StatusGroup from './components/StatusGroup.js';
import './App.css';

//importing priority icons
import priorityIcon0 from './icons/0.png';
import priorityIcon1 from './icons/1.png';
import priorityIcon2 from './icons/2.png';
import priorityIcon3 from './icons/3.png';
import priorityIcon4 from './icons/4.png';

//importing status icons
import backlogIcon from './icons/backlog.png';
import inProgressIcon from './icons/inProgress.png';
import todoIcon from './icons/todo.png';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const [users, setUsers] = useState([]);

  // retrieves lastly searched grouping and sorting options
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'user');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');
  

  // naming priority icons from our local file
  const priorityIcons = {
    'Priority 0': priorityIcon0,
    'Priority 1': priorityIcon1,
    'Priority 2': priorityIcon2,
    'Priority 3': priorityIcon3,
    'Priority 4': priorityIcon4,
  };

  // declraing priority names to show on our kanban board
  const getPriorityName = (priorityKey) => {
    const priorityNames = {
      'Priority 0': 'No priority',
      'Priority 1': 'Low',
      'Priority 2': 'Medium',
      'Priority 3': 'High',
      'Priority 4': 'Urgent',
    };

    return priorityNames[priorityKey] || priorityKey;
  };

  // declraing our status icons from local file
  const statusIcons = {
    'Backlog': backlogIcon,
    'In progress': inProgressIcon, 
    'Todo': todoIcon,
  };

  // declraing status names to show on our kanban board
  const statusNames = {
    'Backlog': 'Backlog',
    'In progress': 'In Progress', 
    'Todo': 'To Do',
  };

  // function to get priority icons
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 0:
        return priorityIcon0;
      case 1:
        return priorityIcon1;
      case 2:
        return priorityIcon2;
      case 3:
        return priorityIcon3;
      case 4:
        return priorityIcon4;
      default:
        return null;
    }
  };
  // for fethcing person names from our userID in api key
  const getUserById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'User not found';
  };

  // retrieving data from api key and storing it in setTickets and setUsers
  useEffect(() => {
    const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

    axios.get(apiUrl)
      .then(response => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // retrieve unsorted data then sort them acc to our title and priority
  useEffect(() => {
    if (tickets.length > 0) {
      const grouped = {};

      for (const ticket of tickets) {
        let groupKey = '';

        if (grouping === 'user') {
          const user = users.find(user => user.id === ticket.userId);
          groupKey = user ? user.name : 'User not found';
        } else if (grouping === 'priority') {
          groupKey = `Priority ${ticket.priority}`;
        } else {
          groupKey = ticket[grouping];
        }

        if (!grouped[groupKey]) {
          grouped[groupKey] = {
            tickets: [],
            count: 0,
          };
        }

        grouped[groupKey].tickets.push(ticket);
        grouped[groupKey].count++;

        grouped[groupKey].tickets.sort((a, b) => {
          if (sorting === 'priority') {
            if (a.priority < b.priority) return 1;
            if (a.priority > b.priority) return -1;
            return 0;
          } else if (sorting === 'title') {
            return a.title.localeCompare(b.title);
          }
        });
      }

      setGroupedTickets(grouped);
    }
  }, [grouping, tickets, users, sorting]);

  // sorting based on decreasing priority/increasing names
  //  for eg: anoop--ramesh--shankar                                   --->inc names
  //          backlog--inProgress--Todo                                --->inc names
  //          urgent(4)--high(3)--medium(2)--low(1)--noPriority(0)     --->dec priority
  const sortedGroupKeys = Object.keys(groupedTickets).sort((a, b) => {
    if (grouping === 'priority') {
      return parseInt(b.split(' ')[1]) - parseInt(a.split(' ')[1]);
    }
    return a.localeCompare(b);
  });

  return (
    <div className="app">
      <Navbar
        grouping={grouping}
        sorting={sorting}
        onFilter={({ grouping, sorting }) => {
          setGrouping(grouping);
          setSorting(sorting);
        }}
      />
      {/*calling components acc to grouping option and making ticket card in respective groups*/}
      <div className="board">
        <div className='board-2' >
          {sortedGroupKeys.map(groupKey => (
            <div key={groupKey} className="group">
              {grouping === 'status' && (
                <StatusGroup
                  groupKey={groupKey}
                  groupedTickets={groupedTickets}
                  getUserById={getUserById}
                  getPriorityIcon={getPriorityIcon}
                  statusIcons={statusIcons}
                  statusNames={statusNames}
                />
              )}

              {grouping === 'priority' && (
                <PriorityGroup
                  groupKey={groupKey}
                  groupedTickets={groupedTickets}
                  getPriorityName={getPriorityName}
                  getUserById={getUserById}
                  getPriorityIcon={getPriorityIcon}
                  priorityIcons={priorityIcons} 
                  statusIcons={statusIcons}     
                />
              )}

              {grouping === 'user' && (
                <UserGroup
                  groupKey={groupKey}
                  groupedTickets={groupedTickets}
                  getPriorityName={getPriorityName}
                  getUserById={getUserById}
                  getPriorityIcon={getPriorityIcon}
                  statusIcons={statusIcons}  
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

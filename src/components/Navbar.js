import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fi'; 
import { ImEqualizer } from 'react-icons/im';
import { AiOutlineDown } from 'react-icons/ai';

import './Navbar.css'

function Navbar({ onFilter }) {
  const [grouping, setGrouping] = useState('user');       // initially set to user
  const [sorting, setSorting] = useState('priority');     // initially set to priority
  const [menuVisible, setMenuVisible] = useState(false);  // initially set to false

  // triggers when user selects different options in grouping
  const handleGroupingChange = (e) => {
    const selectedGrouping = e.target.value;
    setGrouping(selectedGrouping);
    onFilter({ grouping: selectedGrouping, sorting });
  };

  // triggers when user selects different options in grouping
  const handleSortingChange = (e) => {
    const selectedSorting = e.target.value;
    setSorting(selectedSorting);
    onFilter({ grouping, sorting: selectedSorting });
  };

  // toggles the visibility of our display button
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // save prefernces acc to local storage
  const saveStateToLocalStorage = () => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  };
  // invoking our saved preferences from local storage
  useEffect(() => {
    saveStateToLocalStorage();
  }, [grouping, sorting]);

  return (
    <div className="navbar">
      <div className="dropdown">
        <div className='display'> 
            <button onClick={toggleMenu} className="dropbtn">
              <ImEqualizer /> Display<AiOutlineDown/>
            </button>
        </div>
        
        {menuVisible && (
          <div className="dropdown-content">
            <div className='grouping'>
              <label>Grouping   </label>
              <select value={grouping} onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className='sorting'>
              <label> Sorting  </label>
              <select value={sorting} onChange={handleSortingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

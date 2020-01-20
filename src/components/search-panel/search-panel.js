import React from 'react';
import './search-panel.css';

const SearchPanel = () => {
  const searchText = 'type to search';

  return <input className='search-input' placeholder={searchText} />;
};

export default SearchPanel;

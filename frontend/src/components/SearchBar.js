import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch, placeholder = "Search drinks..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // If we're not on the shop page, navigate there with search
      if (window.location.pathname !== '/shop') {
        navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      } else {
        // If we're on shop page, trigger the search callback
        if (onSearch) {
          onSearch(searchTerm.trim());
        }
      }
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsExpanded(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus on input when expanding
      setTimeout(() => {
        const input = document.querySelector('.search-input');
        if (input) input.focus();
      }, 100);
    } else {
      handleClear();
    }
  };

  return (
    <div className={`search-bar ${isExpanded ? 'expanded' : ''}`}>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={!searchTerm.trim()}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {searchTerm && (
          <button type="button" className="clear-btn" onClick={handleClear}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </form>

      {/* Mobile search toggle */}
      <button className="search-toggle" onClick={toggleExpanded}>
        <FontAwesomeIcon icon={isExpanded ? faTimes : faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
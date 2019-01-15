import React from 'react';

import './pagination.css';

const Pagination = ({ number, currentPage, handlePagination }) => {
  return (
    <button
      key={ number }
      id={ number }
      className={ currentPage === number ? 'active btn' : 'inactive btn' }
      onClick={ handlePagination }
    >
      { number }
    </button>
  );
};

export default Pagination;
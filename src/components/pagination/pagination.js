import React from "react";

import "./pagination.css";

const Pagination = ({ number, currentPage, handlePagination }) => {
  return (
    <a
      key={number}
      id={number}
      className={currentPage === number ? "active" : "inactive"}
      onClick={handlePagination}
    >
      {number}
    </a>
  );
};

export default Pagination;
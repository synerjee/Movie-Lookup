import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function Pagination({ pages, movie }) {
  let current_page = pages[0];
  let final_page = pages[1];
  const page = '/result/' + movie + '/page/';
  let pageList = [];

  if (final_page < 7) {
    for (let i=1; i<= final_page; i++) {
      pageList.push(i);
    }
  }

  else {
    pageList.push(1);

    if (current_page <= 3) {
      pageList.push(2);
      pageList.push(3);
      pageList.push(4);
      pageList.push(0);
    }

    else if (current_page >= (final_page-2)) {
      pageList.push(0);
      pageList.push(final_page-3);
      pageList.push(final_page-2);
      pageList.push(final_page-1);
    }

    else {
      pageList.push(0);
      pageList.push(current_page-1);
      pageList.push(current_page);
      pageList.push(parseInt(current_page)+1);
      pageList.push(0);
    }

    pageList.push(final_page);
  }

  const renderList = pageList.map(num => {
    if (num < 1) {
      return (
        <li>...</li>
      )
    }

    else if (num == current_page) {
      return (
        <li><b>{num}</b></li>
      )
    }

    else {
      let pageLink = page + num;
      return (
        <li onClick={() => window.location.reload()}>
          <NavLink to={pageLink}>
            {num}
          </NavLink>
        </li>
      )
    }
  })

  return (
    <ul className="pagination">
      {renderList}
    </ul>
  )
}

export default withRouter(Pagination);

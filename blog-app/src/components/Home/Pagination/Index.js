import React from 'react'
import './styles.css'

export default function Pagination({totalBlogs, postPerPage, setCurrentPage, curentPage}) {

  let pages = [];
  for (let i=1; i <= Math.ceil(totalBlogs / postPerPage); i++){
    pages.push(i);
  }

  return (
    <div className='pagination'>
      {pages.map((page, i) => {
        return <button key={i} className={page === curentPage ? 'active' : ''} onClick={() =>setCurrentPage(page)}>{page}</button>;
      })}
    </div>
  )
}

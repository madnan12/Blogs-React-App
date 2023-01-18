import React from 'react';
import BlogItem from './BlogItem';
import './styles.css'

export default function BlogList({blogs}) {
  return (
    <div className='blogList-wrap'>
      {blogs.map(blog=>(
      <BlogItem blog={blog} key={blog.id} />))}
    </div>
  )
}

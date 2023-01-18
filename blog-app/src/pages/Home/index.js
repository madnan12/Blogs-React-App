import React, { useState } from 'react';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header';
import SearchBar from '../../components/Home/SearchBar';
import { blogList } from '../../config/data';
import Pagination from '../../components/Home/Pagination/Index';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';
import Axios from 'axios';





export default function Index() {
  const [dataSource, setDataSource] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true)

  // const [searchKey, setSearchKey] = useState('');

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(6)
  const [text, setText] = useState('')

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const blogs = blogList.slice(firstPostIndex, lastPostIndex)
  const [progress, setProgress] = useState(0)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setErrors] = useState(false)

  const fetchMoreData = () => {
    if (dataSource.length < 200) {
      setTimeout(() => {
        setDataSource(dataSource.concat(Array.from({ length: 20 })))
      }, 1000);
    } else {
      setHasMore(false)
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length == 0 || body.length == 0) {
      setErrors(true)
    } else {
      Axios.post('http://localhost:8000/postdata/', {
        title,
        body
      }).then(res => console.log('data posting'))
    }
  }

  // const postData = (e) => {
  //   e.preventDefault();
  //   Axios.post('http://localhost:8000/postdata/', {
  //     title,
  //     body
  //   }).then(res => console.log('data posting'))
  // }

  const handleChange = (e)=>{
    setText(e.target.value)
  }

  const style = {
    border: "1px solid green",
    margin: 12,

  }

  const handleSave = (e)=>{
    let newText = text.toUpperCase();
    setText(newText)
  }

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={100}
      // onLoaderFinished={() => setProgress(0)}
      />

      <Header />

      <SearchBar />
      <BlogList blogs={blogs} />
      <Pagination
        totalBlogs={blogList.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        curentPage={currentPage}
      />


      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        {error && title.length <= 0 ?
          <span class="label">Title is required</span> : ""}

        <br />
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        <br />

        {error && body.length <= 0 ?
          <span class="label">Body is required</span> : ""}

        <br />
        <button>Save</button>
        {/* <button onClick={postData}>Save</button> */}
      </form>



      <br /><br /><br /><br />

      <div className="form-group">
        <label htmlfor="exampleFormControlTextarea1">Change in Uppercase</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" value={text} onChange={handleChange}></textarea>
        <br />
        <button className="btn btn-outline-danger" onClick={handleSave}>Save</button>
      </div>

      <br /><br /><br /><br />

      <h2>Infinite Scroll </h2>
      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>You are all set!</p>}
      >
        {dataSource.map((item, i) => {
          return <div style={style}>This is line number {i + 1}</div>
        })}
      </InfiniteScroll>
    </div>
  )
}

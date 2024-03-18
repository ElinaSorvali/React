import React, {useState, useEffect } from 'react'
import './App.css'

const Posts = () => {

    //Komponentin tilan määritys
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json()) //muutetaan json data javascriptiksi
    .then(oliot => setPosts(oliot))
  },[]
  )

  return (
    <>
    <h2>Posts from typicode</h2>

    {
      posts && posts.map(p => 
        <div className='posts' key ={p.id}>
          <p><b>UserId: </b>{p.userId}</p>
          <p><b>Id:</b> {p.id}</p>
        <p><b>Title:</b><br></br> {p.title}</p>
        <p><b>Body:</b><br></br> {p.body}</p>
        </div>
        )
    }

    </>
  )
}

export default Posts

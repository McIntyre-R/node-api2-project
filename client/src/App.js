import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentForm from './form.js'
import Axios from 'axios';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

function App() {
  const [posts, setPosts] = useState([])

 
 
  useEffect(() => {
    getPost()
  },[])

  const getPost = () => {
    axios.get('http://localhost:4000/api/posts')
    .then( res => {
      console.log(res)
      setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const memberSubmit = (post) => {
    Axios.post('http://localhost:4000/api/posts', post)
    .then(res => getPost())
    .catch(err => console.log(err))
}
// window.location.reload(false)
  const deleteIt = (id) => {
    axios.delete(`http://localhost:4000/api/posts/${id}`)
    .then( res => getPost())
    .catch( err => console.log(err))
  }

  return (
    <div className='width'>
      <CommentForm submit={memberSubmit}/>
      {posts.map(post => {
      return(
      <Card body>
        <CardTitle>{post.title}</CardTitle>
        <CardText>{post.contents}</CardText>
        <Button onClick={() => deleteIt(post.id)}>Delete</Button>
      </Card>

      )})}
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post'

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseURL: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }

  
  componentDidMount() {
    axios.get(this.state.baseURL + '/posts')
      .then((res) => {
        this.setState({posts: res.data})
      });
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
      .then((res) => {
        this.setState({post: res.data})
      });
  
  }

  deletePost(id) {
    console.log(id)
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`) //check!!! 
      .then((res) => {
        this.setState({posts: res.data});
      });
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text})
      .then((res) => {
        this.setState({posts: res.data})
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map((post, i) => {
              return (
                <Post key={post.id} id={post.id} 
                text={post.text} data={post.date} 
                updatePostFn={this.updatePost} 
                deletePostFn={this.deletePost}
                
                 />          
              )
            })
          }
          
        </section>
      </div>
    );
  }
}

export default App;

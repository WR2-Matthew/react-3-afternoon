import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://swaggerhub.com/apis/DevMountain/social_mountain/1.0.0'
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount = () => {
    const { baseUrl } = this.state
    axios
      .get(`${baseUrl}`)
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(err => console.log(err))
  }

  updatePost(id, text) {
    const { baseUrl } = this.state
    axios
      .put(`${baseUrl}?id=${id}`, text)
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
  }

  deletePost(id) {
    const { baseUrl } = this.state
    axios
      .delete(`${baseUrl}?id=${id}`)
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
  }

  createPost(text) {
    const { baseUrl } = this.state
    axios
      .post(`${baseUrl}`, { text })
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
  }

  render() {
    const { posts } = this.state;
    console.log(posts, 'state')
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose
            createPostFunc={this.createPost}
          />

          {
            posts.map(e => {
              <Post
                key={e.id}
                text={e.text}
                date={e.date}
                id={e.id}
                update={this.updatePost}
                deletePost={this.deletePost}
              />
            })
          }

        </section>
      </div>
    );
  }
}

export default App;

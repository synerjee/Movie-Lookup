import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from './Pagination'

class Result extends Component {
  state =  {
    query: '',
    posts: [],
    pages: 1
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=[API_KEY]&language=en-US&query='+this.props.match.params.query+'&page='+this.props.match.params.page_no+'&include_adult=false').then(
      res => {
        this.setState({
          query: '',
          posts: res.data.results,
          pages: res.data.total_pages
        })
      }
    )
  }

  handleChange = (e) => {
    this.setState({
      posts: this.state.posts,
      pages: this.state.pages,
      query: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.props.history.push("/result/"+this.state.query+'/page/1')
  }

  render() {
    const { posts } = this.state;
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={ post.id }>
            <div className="card-content">
              <Link to={'/post/'+post.id}>
                <span className="card-title">{ post.original_title }</span>
              </Link>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">
        <p>No movies found!</p>
      </div>
    )

    const pages=[];
    pages[0] = this.props.match.params.page_no;
    pages[1] = this.state.pages;

    return (
      <div>
        <div className="Search">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <input type="text" onChange={this.handleChange} value={this.state.query} className="col s10"/>
              <button onClick={this.handleSubmit} className="col s2">Search</button>
            </div>
          </form>
        </div>

        <div className="container home">
          <h4>Results for '{this.props.match.params.query}'</h4>
          {postList}
        </div>

        <div className="center">
          <Pagination pages={pages} movie={this.props.match.params.query} />
        </div>
      </div>
    );
  }
}

export default Result;

import React, { Component } from 'react';
import Logo from '../tmdb.svg'

class Home extends Component {
  state = {
    query: ''
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  handleSubmit = () => {
    this.props.history.push('/result/'+this.state.query+'/page/1');
  }

  render() {
    return (
      <div className="Home">
        <h2 className="Title center"><strong>Movie Lookup</strong></h2><br/>

        <div className="Search">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <input type="text" onChange={this.handleChange} value={this.state.query} className="col s10"/>
              <button onClick={this.handleSubmit} className="col s2">Search</button>
            </div>
          </form>
        </div>

        <br/>
        <p className="center">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
        <br/>

        <img id="attribution" src= { Logo } alt="Attribution to TMDB" />
      </div>
    );
  }
}

export default Home;

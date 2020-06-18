import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import Result from './components/Result';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/result/:query/page/:page_no' component={Result} />
            <Route path='/post/:post_id' component={Post} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;

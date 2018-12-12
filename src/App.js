import React, { Component } from 'react';
import './App.css';
import Home from './componerts/pages/Home/Home';
import Store from './componerts/pages/Store/index';
import My from './componerts/pages/My/My.js';
import Search from './componerts/pages/Search/Search';
import Mall from './componerts/pages/Mall/Mall';
import  Detail from './componerts/pages/Detail';
import {Route,Redirect,Switch} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/store" component={Store} />
            <Route path="/mall" component={Mall} />
            <Route path="/my" component={My} />
            <Route path="/search" component={Search} />
            <Route path="/detail" component={Detail} />
            <Redirect from="/" to="/home" exact/>
            {/* <Redirect from="/mall" to="/mall/:" exact/> */}
            <Redirect to="/404"/>
          </Switch>
      </div>
    );
  }
}
// App = withRouter(App);
export default App;

// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCookie } from '../../utils/authentication';
import "./App.css";

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Containers
import Home from '../../containers/Home/Home';
import About from '../../containers/About/About';
import Login from '../../containers/Login/Login';
import Join from '../../containers/Join/Join';
import NotFound from '../../containers/Error/404';

// Actions
import { logout, getStatus } from "../../actions/authentication";

class App extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    let loginData = getCookie('uid');
    if (typeof loginData === "undefined") return;
    loginData = JSON.parse(atob(loginData));
    if (!loginData.isLoggedIn) return;
    
    this.props.getStatus().then((result) => {
      console.log('API Result');
    });
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <Router>
        <div>
          <Header isLoggedIn={this.props.isLoggedIn} onLogout={this.handleLogout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/join" component={Join} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatus: () => {
      return dispatch(getStatus());
    },
    logout: () => {
      return dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

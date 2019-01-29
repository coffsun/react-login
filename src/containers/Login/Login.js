import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/authentication';
import { setCookie } from '../../utils/authentication';
import './Login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthentication) {
      try {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        nextProps.history.replace(from);
      } catch (err) {
        nextProps.history.replace("/");
      }
    }
  }

  handleLogin(e) {
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.login(username.value, password.value)
      .then(() => {
        if (this.props.isAuthentication) {
          let loginData = {
            isLoggedIn: true,
            username: username.value
          };

          setCookie('uid', loginData);
                      
          this.props.history.push('/');
          username.value = password.value = '';
        }
      });
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleKeyPress(e) {
    if (e.charCode ===13 ){
      this.handleLogin();
    }
  }

  render() {
    return(
      <div className="container auth">
        <Link className="logo" to="/">Logo</Link>
        <div className="card">
          <div className="header blue white-text center">
            <div className="card-content">Login us</div>
          </div>

          <div>
            <div className="card-content">
              <div className="row">
                  
                <div>
                  <div className="input-field col s12">
                    <input
                    id="username"
                    type="text"
                    ref="username"
                    className="validate"
                    onChange={this.handleChange}
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                    id="password"
                    type="password"
                    ref="password"
                    className="validate"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>

                <button 
                  onClick={this.handleLogin}
                  className="waves-effect waves-light btn">LOGIN
                </button>

                <div className="right signup" >
                New Here? <Link to="/join">Create an account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthentication: state.authentication.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      return dispatch(login(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

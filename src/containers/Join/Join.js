import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { join } from '../../actions/authentication';
import './Join.css';

class Join extends React.Component {

  constructor(props) {
    super(props);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
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

  handleJoin(e) {
    e.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const passwordConfirm = this.refs.passwordConfirm;
    this.props.join(username.value, password.value, passwordConfirm.value)
      .then(() => {
        console.log('Join - success');
      }
    );
  }

  handleKeyPress(e) {
    if (e.charCode ===13 ){
      this.handleJoin();
    }
  }

  render() {
    return(
      <div className="container auth">
        <Link className="logo" to="/">Logo</Link>
        <div className="card">
          <div className="header black white-text center">
            <div className="card-content">Join us</div>
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
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                    id="password"
                    type="password"
                    ref="password"
                    className="validate"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                    id="password-confirm"
                    type="password"
                    ref="passwordConfirm"
                    className="validate"
                    onKeyPress={this.handleKeyPress}
                    />
                    <label htmlFor="password-confirm">Password Confirm</label>
                  </div>
                </div>

                <button 
                  onClick={this.handleJoin}
                  className="waves-effect waves-light btn">SIGN UP
                </button>
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
    isLoggedIn: state.authentication.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    join: (username, password) => {
      return dispatch(join(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);

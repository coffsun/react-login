import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import './Header.css';

class Header extends React.Component {

  render() {

    const pathname = this.props.history.location.pathname;
    const isLoginPage = pathname.indexOf("login") > -1;
    const isJoinPage = pathname.indexOf("join") > -1;
    
    const loginButton = (
      <li>
        <Link to="/login"><i className="material-icons">vpn_key</i></Link>
      </li>
    );

    const logoutButton = (
      <li>
        <button onClick={this.props.onLogout}><i className="material-icons">lock_open</i></button>
      </li>
    );

    return (
      !isLoginPage &&
      !isJoinPage &&
      (<div>
        <nav>
          <div className="nav-wrapper blue darken-1">
            <Link to="/" className="brand-logo center">Coffsun</Link>
            
            <div className="menu-btn left">
              <i className="material-icons">menu</i>
            </div>

            <div className="right">
              <ul>
                { this.props.isLoggedIn ? logoutButton : loginButton }
              </ul>
            </div>
          </div>
        </nav>
      </div>)
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => { console.error("logout function not defined") }
};

export default withRouter(Header);

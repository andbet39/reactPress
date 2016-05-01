import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { LoadingBar } from 'components';
import { SideBar } from 'components';
import { toggle } from 'redux/modules/sidebar';
import jQuery from 'jquery';
import {SearchForm} from 'components';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user, toggled: state.sidebar.toggled}),
  {logout, pushState: routeActions.push})
export default class Blog extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    toggled: PropTypes.bool,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    jQuery(window).scroll(()=>{
      const theta = jQuery(window).scrollTop() / 30 % Math.PI;
      jQuery('#navbutton').css({ transform: 'rotate(-' + theta + 'rad)' });
      jQuery('#sidebutton').css({ transform: 'rotate(-' + theta + 'rad)' });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  handleToggle = (event) =>{
    event.preventDefault();
    console.log('toggle sidebar');
    return this.props.dispatch(toggle());
  };
  render() {
    const {user, toggled} = this.props;
    const styles = require('./Blog.scss');

    let togClass = '';
    if (toggled) {
      togClass = styles.contentToggled;
    }
    return (
      <div className={styles.wrapper}>
        <SideBar/>
        <div className={styles.mainContent + ' ' + togClass}>
          <LoadingBar/>
          <Helmet {...config.app.head}/>
            <btn id="sidebutton" className={styles.toggleBtn} onClick={(event)=>this.handleToggle(event)}><i className="fa fa-bars fa-5" aria-hidden="true"></i></btn>
              {this.props.children}
         </div>
      </div>
    );
  }
}

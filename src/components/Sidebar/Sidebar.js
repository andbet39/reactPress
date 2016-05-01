import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {IndexLink} from 'react-router';
@connect(
  state => ({
    toggled: state.sidebar.toggled,
    post: state.post,
    location: state.routing.location
  }))
export default class SideBar extends Component {
  static propTypes ={
    toggled: PropTypes.bool,
    post: PropTypes.object,
    location: PropTypes.object
  };
  render() {
    const { toggled, post } = this.props;
    const styles = require('../../containers/Blog/Blog.scss');
    let togClass = '';
    if (toggled) {
      togClass = styles.toggled;
    }
    return (
      <nav className={'navbar ' + styles.sidebar + ' ' + togClass}>
        <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
          <div className={styles.brand}/>
          <img src="https://www.codetutorial.io/wordpress/wp-content/uploads/2015/07/logoCodenew.png" width="180px" alt=""/>
        </IndexLink>
      </nav>
    );
  }
}

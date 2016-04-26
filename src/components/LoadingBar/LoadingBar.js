import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';


@connect(state => ({ loading: state.posts.loading }))
export default class LoadingBar extends Component {
  static propTypes = {
    loading: PropTypes.bool
  }

  render() {
    require('react-loading-bar/dist/index.css');

    const {loading} = this.props;
    return (
      <div>
         <Loading show={ loading } color="red" />
      </div>
    );
  }
}

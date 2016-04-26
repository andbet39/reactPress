import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {isLoaded, load as load} from 'redux/modules/postinfo';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import * as postInfoActions from 'redux/modules/postinfo';


@asyncConnect([{
  deferred: true,
  promise: ({params, store: {dispatch, getState}}) => {
    return dispatch(load(params.postId));
  }
}])
@connect(
  state => ({
    postinfo: state.postinfo.data,
    error: state.postinfo.error,
    loading: state.postinfo.loading
  }),
  {...postInfoActions, initializeWithKey })
export default class PostInfo extends Component {
  static propTypes = {
    postinfo: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
  };


  render() {
    const {postinfo, error, loading} = this.props;

    return (
        <div>
          {postinfo.view}
        </div>
    );
  }
}

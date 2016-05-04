import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {isLoaded, load as load} from 'redux/modules/post';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import * as postActions from 'redux/modules/post';
import { Body } from 'components';
import { CodeHighLight } from 'components';
import { Title } from 'components';
import { Link} from 'react-scroll';

@asyncConnect([{
  deferred: true,
  promise: ({params, store: {dispatch, getState}}) => {
    if (!isLoaded(getState(), params.slug)) {
      return dispatch(load(params.slug));
    }
  }
}])
@connect(
  state => ({
    post: state.post.data,
    error: state.post.error,
    loading: state.post.loading
  }),
  {...postActions, initializeWithKey })
export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
  };


  render() {
    const {post, error, loading} = this.props;

    return (
        <div>
        {post &&
          <div>
          <Helmet title={post.title.rendered} />
          <Title title={post.title.rendered} />
          <Body sections={post.sections}/>
          </div>
        }
        </div>
    );
  }
}

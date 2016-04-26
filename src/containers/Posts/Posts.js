import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {isLoaded, loadpage } from 'redux/modules/posts';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import * as postActions from 'redux/modules/posts';
import { TitleLink } from 'components';
import { Excerpt } from 'components';
import { Pagination } from 'components';

@asyncConnect([{
  deferred: true,
  promise: ({params, store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      const page = params.page ? params.page : 1;
      return dispatch(loadpage(page));
    }
  }
}])
@connect(
  state => ({
    posts: state.posts.data,
    error: state.posts.error,
    loading: state.posts.loading,
    currentPage: state.posts.currentPage,
    maxPage: state.posts.total_pages
  }),
  {...postActions, initializeWithKey })
export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    currentPage: PropTypes.number,
    maxPage: PropTypes.string
  };

  handlePageSelect(page) {
    const { dispatch } = this.props;
    const urlpage = parseInt(page, 10);
    return dispatch(loadpage(urlpage));
  }

  render() {
    const styles = require('./posts.scss');
    const {posts, error, loading, maxPage, currentPage} = this.props;
    return (
        <div>
          {error &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            {error}
          </div>}
          <div className={'container row'}>
            <div className={'col-md-9'}>
            {posts && posts.length &&
              posts.map((post) =>
                <article>
                  <div className={styles.main + ' row'}>
                  <TitleLink key={post.id} link={post.slug} title={post.title.rendered}/>
                  <Excerpt key={post.id + 1000} text={post.excerpt.rendered} />
                  </div>
                </article>
              )
            }
            </div>
          </div>
          <Pagination maxPage={maxPage} curPage={currentPage} handlePageSelect={ (page) => this.handlePageSelect(page) }/>
          {loading &&
            <div>Loading...</div>
          }
        </div>
    );
  }
}

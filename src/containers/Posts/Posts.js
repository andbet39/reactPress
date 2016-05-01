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
import { SearchForm } from 'components';

@asyncConnect([{
  deferred: true,
  promise: ({params, store: {dispatch, getState}}) => {
    const page = params.page ? params.page : 1;
    if (!isLoaded(page, getState())) {
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
    maxPage: state.posts.total_pages,
    searchresult: state.algoliasearch.results
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
    maxPage: PropTypes.string,
    searchresult: PropTypes.array
  };

  render() {
    const styles = require('./posts.scss');
    const {posts, error, loading, maxPage, currentPage, searchresult} = this.props;
    return (
        <div className="container-fluid">
          {error &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            {error}
          </div>}
          <SearchForm/>
          {searchresult && searchresult.length &&
              searchresult.map((result)=>
                <div className={styles.postMain} >
                  <TitleLink key={result.objectID} link={result.permalink.replace('https:\/\/www.codetutorial.io', '')} title={result.post_title}/>
                </div>
              )
            }
            {!searchresult && posts && posts.length &&
              posts.map((post) =>
                  <div className={styles.postMain} >
                    <TitleLink key={post.id} link={post.slug} title={post.title.rendered}/>
                    <Excerpt key={post.id + 1000} text={post.excerpt.rendered} />
                  </div>
              )
            }
          {!searchresult &&
            <Pagination maxPage={maxPage} curPage={currentPage}/>
          }
          {loading &&
            <div>Loading...</div>
          }
        </div>
    );
  }
}

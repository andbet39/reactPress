/**
 * Created by Andrea on 07/05/2016.
 */
import React, {Component, PropTypes} from 'react';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import {setCurrent} from 'redux/modules/post';

@connect(
)
export default class Posts extends Component {
  static propTypes = {
    key: PropTypes.number,
    post: PropTypes.object,
    dispatch: PropTypes.func
  }

  createMarkup(string) {
    return { __html: string };
  }

  handleLink(event) {
    event.preventDefault();
    this.props.dispatch(setCurrent(this.props.post));
    this.props.dispatch(push('/' + this.props.post.slug));
  }

  render() {
    const { post } = this.props;
    const styles = require('./HomePost.scss');
    return (
        <a href="#" onClick={ (event) => this.handleLink(event)} className={'col-md-4 col-sm-12 ' + styles.postContainer }>
          <div className={styles.postImageContainer}>
              <img className={styles.postFeaturedImage + ' img-responsive'}src={post.featured_image_thumbnail_url}/>
          </div>
          <div className={styles.titleContainer}>
              <h1 className={styles.postTitle} dangerouslySetInnerHTML={this.createMarkup(post.title.rendered)}></h1>
          </div>
        </a>
    );
  }
}

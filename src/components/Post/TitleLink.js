import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import {setCurrent} from 'redux/modules/post';

@connect(
  )
export default class TitleLink extends Component {
  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    key: PropTypes.number,
    post: PropTypes.object,
    dispatch: PropTypes.func
  }

  createMarkup(string) {
    return { __html: string };
  }

  handleLink(event) {
    event.preventDefault();
    console.log(this.props.post);
    this.props.dispatch(setCurrent(this.props.post));
    this.props.dispatch(push('/' + this.props.post.slug));
  }

  render() {
    const { title, link } = this.props;
    const styles = require('./titleLink.scss');
    return (
      <div className={styles.postTitle}>
        <a href="#" onClick={ (event) => this.handleLink(event)}><h1 dangerouslySetInnerHTML={this.createMarkup(title)} ></h1></a>
      </div>
    );
  }
}

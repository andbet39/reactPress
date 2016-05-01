/**
 * Created by Andrea on 01/05/2016.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { searchPost, clearSearch } from 'redux/modules/algoliasearch';


@connect(
  state => ({
    results: state.algoliasearch.results,
    error: state.algoliasearch.error,
    searching: state.algoliasearch.searching
  }))
export default class SearchForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    results: PropTypes.array,
    error: PropTypes.string
  }

  changeContent = (event) => {
    if (event.target.value.length > 2) {
      this.props.dispatch(searchPost(event.target.value));
    }
    if (event.target.value.length === 0) {
      this.props.dispatch(clearSearch());
    }
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeContent}/>
      </div>
    );
  }
}

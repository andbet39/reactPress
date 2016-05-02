/**
 * Created by Andrea on 01/05/2016.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { searchPost, clearSearch } from 'redux/modules/algoliasearch';
import {debounce} from 'throttle-debounce';


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

  constructor() {
    super();
    this.callAlgolia = debounce(500, this.callAlgolia);
  }
  printChange(event) {
    this.callAlgolia(event.target.value);
  }
  callAlgolia(value) {
     if (value.length > 2) {
      this.props.dispatch(searchPost(event.target.value));
    }
    if (value.length === 0) {
      this.props.dispatch(clearSearch());
    }    // call ajax
  }

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.printChange.bind(this)} />
      </div>
    );
  }
}

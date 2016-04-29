import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import hljs from 'highlight.js';

export default class CodeHighLight extends Component {

  componentDidMount() {
    const xxx = jQuery('pre').each((inde, block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    require('highlight.js/styles/monokai.css');

    return false;
  }
}

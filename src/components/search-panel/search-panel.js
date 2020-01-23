import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    term: ''
  };

  onSearchPage = e => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchPage(term);
  };

  render() {
    return (
      <input
        className='search-input'
        placeholder='type to search'
        value={this.state.label}
        onChange={this.onSearchPage}
      />
    );
  }
}

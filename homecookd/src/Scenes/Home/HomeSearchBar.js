import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar'

class HomeSearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
render() {
  return(
    <SearchBar
      dataSource={this.state.dataSource}
      onChange={(value) => this.setState({dataSource: [ value, value+value, value+value+value]})}
      onRequestSearch={() => console.log('onRequestSearch')}
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    />
)
}
}
export default HomeSearchBar;

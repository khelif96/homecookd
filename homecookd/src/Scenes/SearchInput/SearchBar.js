import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

const style = {
  height: '50px',
  width: '500px',
  margin: '10px auto'
}

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlekeyChange = this.handlekeyChange.bind(this);
  }

  handleSearchChange(event){
    const value = event.target.value;
    this.setState({searchTerm: value})
  }

  handlekeyChange(event){
    if(event.charCode === 13){
      console.log(this.state.searchTerm); //send searchTerm to backend
    }
  }

  render() {
    return (
      <div>
        <Input onChange={this.handleSearchChange} onKeyPress={this.handlekeyChange} style={style}  icon='search' placeholder='Search...' />
      </div>

    )
  }
}

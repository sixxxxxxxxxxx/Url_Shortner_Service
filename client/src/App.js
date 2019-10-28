import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import validator from 'validator';


class App extends Component{
state = {
  url: '',
  link: ''
};

handleChange = (e) =>{
  
  this.setState({
    url: e.target.value
  })
}

handleSubmit = (e) =>{
  e.preventDefault();
  const validURL = validator.isURL(this.state.url,{
  require_protocol: true
});
if (!validURL) {
  alert("Ensure your url is correct and includes the http(s) protocol");
} else {
    console.log('URLs is: ', this.state.url);
    //post values
    axios.post('http://localhost:5000/api/shorten',{
      url: this.state.url
    })
    .then( res=>{
      console.log(res.data.hash);
      this.setState({
        link: 'http://localhost:5000/' + res.data.hash 
      })
    })
    .catch(err => console.log(err));
}
 
};
  render(){
    return(
      <div className="App">
        <header>
          <h1>Six.url</h1>
          <small>...we are here to help</small>
        </header>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <input class="url" type="text" name="url" placeholder="Enter a URL including its http(s) protocol" onChange={ this.handleChange }/>
            <input type="submit" value="shorten"/>
          </fieldset>
          <fieldset>
            <span id="result">{ this.state.link }</span>
          </fieldset>
        </form>
      
    </div>
    );
  }
}

export default App;

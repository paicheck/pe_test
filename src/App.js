import React, {Component} from "react";
import axios from "axios";

const peApi = 'https://react-interview-api.policyexpert.co.uk/feedback'

class App extends Component {

  state = {
      count:0
    , feedback:''
    , result:''
    , name:''
    , feedbackText:''

  };

  updateCount = () => {
    this.setState({count: this.state.count + 1})
  };

  getApiResult = async (e) => {
    const result = await axios.get(
      peApi);
      console.log('feedbackText', result.data.feedback.map((e) => e.feedbackText).join(', '))
  this.setState({
    // feedback: result.feedback.name
    name: result.data.feedback.map((e) => e.name)
  });
};

  posttoApi = async () => {
    try {
    const result = await axios.post(peApi, {name: this.state.name , //this.name
      feedback: this.state.feedbackText
    });

          // Assuming the API expects JSON data
          const response = await axios.post(peApi, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

    console.log('response',response)
    this.setState({result:result.data})
  } catch (e) {
    console.error('Error', e);
  }
  };

updateName = (e) => {
  console.log('dexter dexter');
  this.setState({name: e.target.value})
}


render() {
  console.log('test 123',this.state.count)
  console.log('test 456',this.state.feedback)
  console.log('test 789',this.state.result)
  console.log('test 101112',this.state.name)
  return (
<div>  
  <div>
      test
  </div>
  <button onClick={() => {this.updateCount(); this.getApiResult();this.posttoApi()}}> click </button>
  <p>{this.state.count}</p>
  <p>{peApi}</p>
  <p>{this.state.feedback}</p>
  <p>{this.state.result}</p>
  <p>{this.state.name}</p>

  <p> api response</p>
  <form onSubmit={this.posttoApi}>
    <label htmlFor="name">Name </label>
    <input 
    type="text" 
    id="name"
    value={this.state.name}
    // onChange={this.handleFormSubmit}
    onInput={(e) => this.setState({ name: e.target.value })}
    />
    <b></b>
    <label htmlFor="name">feedback </label>
    <input 
    type="text" 
    id="name"
    value={this.state.feedbackText}
    // onChange={this.handleFormSubmit}
    onInput={(e) => this.setState({ name: e.target.value })}
    />
          <b></b>
          <button type="submit">Submit</button>
  </form>
</div>  
  )
}
}

export default App;

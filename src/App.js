import React from 'react';
import './App.css';
import axios from 'axios';

const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=a92fd65580354b0d8cee1ae550fcefc4';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataToShow: [],
      isLoaded: false,
      searchTerm: '',
    }
  }

  fetchData = ()=> {
    axios.get(url)
      .then(response => {
        const res = response.data;
        console.log(res);

        const capture = res.articles;
      


        

        this.setState({
          dataToShow: capture,
          isLoaded: true,
        })


        
      })

  }

  onSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });

  }

  isSearched = (searchTerm) => (item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());

  }

  

 

  componentDidMount(){
    this.fetchData();
  }
  render(){
    return (
      <div className="App">
        <Search onChange={this.onSearchChange} >Search </Search>
        <p>This app was built by Andrew Nkhata in React.js</p>
        
        {
          this.state.isLoaded?
          this.state.dataToShow.filter(this.isSearched(this.state.searchTerm)).map(item => {
            return(
              <div className="card" key={item} onClick={item.url}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            )
          }):
          <div>
              <h1>Loading News from server...</h1>
              <p>Please wait...</p>
          </div>
          
        }
        
        
      </div>
    )

  }

}

const Search = (props) => {
  return(
    <form onSubmit={() => this.onSubmit}>
      <label>{props.children}</label>
      <input className="data" type="text" onChange={props.onChange} />
      <button type="submit" >search</button>
    </form>
  )
}

export default App;




import React from 'react';
import './App.css';
import axios from 'axios';

function Tasks({ tasks }) {
  return (
    <div className="task">
      <h1> Tareas </h1>
      {tasks && tasks.length > 0 && tasks.map(task => {
        return (
          <div className="task" key={task.id} >
            <h2>{task.title}</h2>
            <p>{task.body}</p>
          </div>
        )
      })}
    </div>
  )
}

class App extends React.Component {
  state = {
    tasks: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    axios({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET'
    })
      .then((response) => {
        this.setState({ tasks: response.data })
      })
      .catch((error) => {
        this.setState({ error: true })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    if (this.state.error) return <p>Ups! Something went wrong.</p>
    return (
      <div className="App">
        <Tasks tasks={this.state.tasks} />
      </div>
    );
  }

}



export default App;

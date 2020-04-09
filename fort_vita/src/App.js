import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core/'
// import { RestoreIcon, FavoriteIcon } from '@material-ui/icons/RestoreIcon'
// import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm'
import CreateWorkout from './components/CreateWorkout'
import API from './adapters/API'

class App extends React.Component {

  state = {
    user: null
  }

  componentDidMount() {
    this.validateToken()
  }

  validateToken = () => {
    if (localStorage.getItem("token")) {
      API.validateToken()
        .then((data) => {
          if (!data.error) {
            this.setUser(data)
          }
        })
    }
  }

  setUser = user => this.setState({ user })

  render() {
    return (
      <div>
        {
          !this.state.user && <LoginForm handleUser={this.setUser} />
        }
        {
          this.state.user && <CreateWorkout />
        }


      </div>
    );
  }
}

export default App;


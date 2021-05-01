import React, { Component } from 'react'
import { render} from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }

  componentDidMount() {
    fetch(`api/requests/${this.props.job}/${this.props.area}/${this.props.user}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.req
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    
  }
render(){
  console.log(this.state.items)
  if (this.state.isLoaded){
    return (
    <div>
      <p>Найдено вакансий - {this.state.items.count}</p>
      <p>Средняя зарплата - {this.state.items.sal}</p>
      <Link to='app'>Вернутся</Link>
    </div>)
  }
  else{
  return <h2>ZAGRUZKA</h2>
}
}
}

class Form extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleChange(e){
   this.props.getReq(e)
  }

  handleClick(e){
    fetch(`/api/requests/${this.props.user}`)
    alert('Письмо отправлено на вашу почту')
  }
  render(){
    return (
      <div>
      <label>Введите профессию<input name='job' onChange={this.handleChange}></input></label>
      <br></br>
      <label>Введите город<input name='area' onChange={this.handleChange}></input></label>
      <br></br>
      <Link to='get'>Принять</Link>
      <br/>
      <input value='Отправить данные' onClick={this.handleClick} type='button'/>
      <br/>
      </div>
    )
  }
}

class Reg extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  

  handleChange(e){
      this.props.getin(e)
  }

  render(){
    return( 
    <div>
      <label>Логин<input name='login' onChange={this.handleChange}></input></label>
      <br></br>
      <label>Пароль<input name='passw' onChange={this.handleChange}></input></label>
      <br></br>
      <Link to='acc'>Принять</Link>
    </div>)
  }
}

class Acc extends Component{
  constructor(props) {
    super(props);
    this.state = {
      get:[],
      isLoaded:false,
    };
  }

  componentDidMount() {
    fetch(`/api-token-auth/`, 
    {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({username:this.props.log, password:this.props.pas}) 
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            get: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render(){
    if ((this.state.get[0]) & (this.state.isLoaded)){
      this.props.getUser(this.state.get[1])
      return (
        <Redirect to={'/app'}/>
      )
    } 
    if(!(this.state.get[0]) & (this.state.isLoaded)){
      alert('Не верные имя пользователя или пароль')
      return(
      <Redirect to={'/'}/>)
      
  }
    if(!this.state.isLoaded){
      return <h2>zagruzka</h2>
    }
  }

  }


class M extends Component{
  constructor(props) {
    super(props);
    this.state = {
      log:'',
      pas:'',
      job:'',
      area:'',
      user:NaN
    };
    this.getin = this.getin.bind(this)
    this.getUser = this.getUser.bind(this)
    this.getReq = this.getReq.bind(this)
  }

  getUser(id){
    this.setState({user:id})
  }

  getin(e){
    if (e.target.name=='login'){
      this.setState({log:e.target.value})
    }
    else{
      this.setState({pas:e.target.value})
    }
  }

  getReq(e){
     if (e.target.name=='job'){
      this.setState({job:e.target.value})
    }
    else{
      this.setState({area:e.target.value})
    }
  }

  render(){
  return(
  <Router>
    <div>
        
      <Switch>
        <Route path="/get">
          <App user={this.state.user} job={this.state.job} area={this.state.area}/>
        </Route>
        <Route path="/app">
          <Form getReq={this.getReq} user={this.state.user} />
        </Route>
        <Route path="/acc">
          <Acc log = {this.state.log} pas = {this.state.pas} getUser={this.getUser}/>
        </Route>
        <Route path="/">
          <Reg getin = {this.getin}/>
        </Route>
        
      </Switch>
    </div>
  </Router>)
}}


      export default App;
      
const container = document.getElementById("app");
render(<M/>, 
container)
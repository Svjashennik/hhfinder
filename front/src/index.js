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
		      fetch(`api/requests/${this.props.job}/${this.props.area}`,
			          {
					        headers:{
							        "Authorization":`Token ${this.props.token}`
							      }
					      })
		        .then(res => res.json())
		        .then(
				        (result) => {
						this.props.sendres({us:result.req.usname, job:this.props.job, area:this.props.area, coun:result.req.count, sal:result.req.sal})
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
		  super(props)
		 
		  this.handleChange = this.handleChange.bind(this)
		  this.handleClick = this.handleClick.bind(this)
		    }

		


	  handleChange(e){
		     this.props.getReq(e)
		    }

	  handleClick(e){
		      fetch(`/api/requests/history`,
			          {
					        headers:{
							        "Authorization":`Token ${this.props.token}`
							      }
					      })
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
			      		  	
				<p id='webs' >{this.props.others} </p>

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
		      let way = true
		      fetch(`/api-token-auth/`, 
			          {
					        method:'POST',
					        headers: {
							        'Accept': 'application/json',
							        'Content-Type': 'application/json'
							      },
					        body:JSON.stringify({username:this.props.log, password:this.props.pas}) 
					      }).then(res => {
						            if (!res.ok){
								            way = false
								          }
						            return res.json()})
		        .then(
				        (result) => {
						          console.log(result)
						          this.setState({
								              isLoaded: true,
								              get: [way,result.token]
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
			      		data:null,
			            area:'',
			            user:'',
			      		others:'',
			          };
		      this.getin = this.getin.bind(this)
		      this.getUser = this.getUser.bind(this)
		      this.getReq = this.getReq.bind(this)
		  this.sendres = this.sendres.bind(this)
		    }
	
	 componentDidMount(){
		 let socket = new WebSocket('ws://18.216.226.20/ws/api/hist/')
                socket.onmessage  = (e) => {
	                  let res = JSON.parse(e.data).content
	                  this.setState({others:this.state.others + `${res.us} ${res.job} ${res.area} ${res.coun} ${res.sal}` })
	                                 }

		                this.setState({data:socket})
		         }

	sendres(res){
	this.state.data.send(JSON.stringify({us:res.us, job:res.job, area:res.area, coun:res.coun, sal:res.sal }))
	
	}

	  getUser(token){
		      this.setState({user:token})
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
			              <App token={this.state.user} job={this.state.job} area={this.state.area} sendres = {this.sendres} />
			            </Route>
			            <Route path="/app">
			              <Form getReq={this.getReq} token={this.state.user} others = {this.state.others} />
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

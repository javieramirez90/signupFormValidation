import React from 'react';
import './App.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));
  return valid;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName : '',
      email: '',
      password: null,
      formErrors:{
        firstName: "",
      lastName : "",
      email: "",
      password: "",
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(formValid(this.state.formErrors)){
      console.log(`
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lasttName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `)
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  }

  handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    let formErrors = this.state.formErrors

    console.log("Name: ", name)
    console.log("Value: ", value)
    switch(name) {
      case "firstName":
      formErrors.firstName = 
      value.length < 3 && value.length > 0 
      ? 'minimum 3 characters required' : "";
      break;
      case "lastName":
      formErrors.lastName = 
      value.length < 3 && value.length > 0 
      ? 'minimum 3 characters required' : "";
      break;
      case "email":
      formErrors.email = 
      emailRegex.test(value) && value.length > 0 
      ? '' : "Invalid email address";
      break;
      case "password":
      formErrors.password = 
      value.length < 8 && value.length > 0 
      ? 'minimum 8 characters required for password' : "";
      break;
      default:
       break;
    }
    this.setState({formErrors, [name]: value}, () => console.log(this.state))
  }


  render(){
    const { formErrors } = this.state
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" onChange={this.handleChange} className="" placeholder="First Name"  noValidate/>
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" onChange={this.handleChange} className="" placeholder="Last Name"  noValidate/>
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={this.handleChange} className="" placeholder="Email"  noValidate/>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={this.handleChange} className="" placeholder="Password"  noValidate/>
            </div>
            <div className="createAccount">
              <button type="submit">Create account</button>
              <small>Already have an account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;

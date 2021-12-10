import React, { useState, useEffect ,useReducer , useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
 import AuthContext from "../../context/authContext";

const emailReducer = (state , action)=>{
  if(action.type === 'User_Input'){
    return {
      value:  action.val,
      isValid: action.val.includes('@')
    }  
  }
  if(action.type === 'Input_Something'){
    return {value: state.value , isValid:state.value.includes('@')} // state yahan humko bilkul latest update deta hai react ki jo abi abi is me hui hai 
  }
  
  return {
   value:'',
   isValid:false
 }
} 
const passwordReducer = (state , action)=>{
  if(action.type === 'User_pass'){
    return{
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if(action.type === 'pass_valid'){
    return{
      value: state.value,
      isValid: state.value.trim() > 6
    }
  }
  return {
    value:'',
    isValid:false
  }
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState , dispatchEmail] = useReducer(emailReducer,{value:'',isValid: null})
  const [passwordState , dispatchPassword] = useReducer(passwordReducer,{value:'',isValid: null})
   
  const {isValid: emailIsValid } = emailState // yahan in dono ki validation ko nikal k variable me rakha ha ta k use kr saky
  const {isValid: passIsValid} = passwordState
  
  const Contxt = useContext(AuthContext)

  useEffect(() => {
    const cleanUp = setTimeout(() => {                                               // yahan hum timeout is lie laga rahy hai qk yahan ye useWEffect bar bar call ho 
      console.log("checking form validity");                                         // rha hai or agr server pr request lagti hai to application hang ho skti hai to yahan hum log clean up k sat  
      setFormIsValid(                                                                // return kr k code ko optimize kr skty hai is me clean up bar bar call hoga or humari app sahi rahy gi 
     // enteredEmail.includes("@") && enteredPassword.trim().length > 6
          emailIsValid && passIsValid
        );
    },500);
    return ()=>{
      console.log('clean up')
      clearTimeout(cleanUp)
    }
  }, [emailIsValid, passIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
      dispatchEmail({type: 'User_Input' , val: event.target.value })
    // setFormIsValid(                                 
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'User_pass' , val:event.target.value})

    // setFormIsValid(                                 
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type:'Input_Something'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'pass_valid'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    Contxt.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

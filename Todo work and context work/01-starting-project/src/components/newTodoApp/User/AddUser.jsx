import React,{useState} from 'react'
import Card from '../UI/Card'
import classes from './AddUser.module.css'
import Button from '../UI/Button'
import ErrorModel from '../UI/ErrorModel'



const AddUser = (props) => {

    const [enterName , setEnterName] = useState('')
    const [enterAge , setEnterAge] = useState('')
    const [error , setError] = useState()
    
    
    const formSubmitHandler = (e) => {
        e.preventDefault()

        if(enterName.trim().length === 0 || enterAge.trim().length === 0){
            setError({
                title:'invalid input',
                
                message:'please input the Name correctly'
                
            })
            
            return;

        }else if(+enterAge < 1){ // yahan plus is lie lagaya ta k isko pata lagy k ye as a number save ho qk wahan hum string me add kr rhy hai
            setError({
                title:'invalid age',
                message:'please input the Age correctly'
            })
            return
        }
        props.onAddUser(enterName , enterAge)
        console.log(enterName , enterAge)
        setEnterName('')
        setEnterAge('')
    }

 const userNameChangeHandler = (event)=>{
      setEnterName(event.target.value)
 }
 const ageChangeHandler = (event)=>{
    setEnterAge(event.target.value)
 }
 const errorHandler = ()=>{
     setError(null)
 }
    return (
        <div>
            { error && <ErrorModel title={error.title} message={error.message} onErrorHandle={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={formSubmitHandler}>
                    <label htmlFor="username">User Name</label>
                    <input id='username' type="text" value={enterName} onChange={userNameChangeHandler} />
                    <label htmlFor="age">Age</label>
                    <input id='age' type="number" value={enterAge} onChange={ageChangeHandler}/>
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </div>
    )
}

export default AddUser

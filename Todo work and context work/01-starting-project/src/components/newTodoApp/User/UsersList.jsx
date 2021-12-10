import React from 'react'
import Card from '../UI/Card'
import classes from './UserList.module.css'



const UsersList = (props) => {
    return (
        <div>
            <Card className={classes.users}>
                <ul>
                    {props.users.map((user,i) => (
                        <li key={i} >
                            {user.name} ({user.age} years old)
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    )
}

export default UsersList

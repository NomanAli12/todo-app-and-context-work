import React, { useState } from 'react';
import UsersList from './components/newTodoApp/User/UsersList';
import AddUser from './components/newTodoApp/User/AddUser'
import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
// import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import './App.css';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    { text: 'Do all exercises!', id: 'g1' },
    { text: 'Finish the course!', id: 'g2' }
  ]);

  const addGoalHandler = enteredText => {
    setCourseGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedGoals;
    });
  };

  const deleteItemHandler = goalId => {
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }
  const [usersList , setUsersList] = useState([])
  const addUserHandler = (uName ,uAge)=>{
    setUsersList((prevUserList)=>{
      return (
        [...prevUserList,{name:uName , age:uAge}]
      )
    })
  }

  return (
    <div>
      {/* <section id="goal-form">
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id="goals">
        {content}
       
      </section> */}
      <AddUser onAddUser={addUserHandler} /> 
      <UsersList users={usersList} />
    </div>
  );
};

export default App;

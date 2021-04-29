import { useState, Profiler } from "react";
import "./styles.css";

export default function App() {
  const api = `https://randomuser.me/api`;
  const [user, setUser] = useState([]);
  const addUserHandler = async () => {
    const userData = await fetch(api, {
      method: "GET"
    });
    const userJson = await userData.json();
    const newUser = [...user, userJson.results[0]];
    setUser(newUser);
  };
  return (
    <div className="app">
      <Button addUserHandler={addUserHandler} />
      <Profiler
        id="userlist"
        onRender={(id, phase, actualDuration) => {
          console.log({
            id,
            phase,
            actualDuration
          });
        }}
      >
        <UserList user={user} />
      </Profiler>
    </div>
  );
}

const Button = ({ addUserHandler }) => {
  return <button onClick={addUserHandler}>Add User</button>;
};

const UserList = (props) => {
  const { user } = props;
  return (
    <>
      <div className="user-list">
        {user.map((userObj, idx) => {
          return <UserObject key={idx} userObj={userObj} />;
        })}
      </div>
    </>
  );
};

const UserObject = ({ userObj }) => {
  return (
    <div className="user-object">
      {`${
        userObj.name.title + " " + userObj.name.first + " " + userObj.name.last
      }`}
      <ol>
        <li>{userObj.gender.toUpperCase()}</li>
        <li>{userObj.email}</li>
      </ol>
    </div>
  );
};

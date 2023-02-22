import {useEffect, useState} from 'react';
import {NavLink, Switch, Route, useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import User from './User';

function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { path, url } = useRouteMatch();
  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/users').then((res) => 
      setUsers(res.data)
    ).finally(() => setLoading(false));
  }, []);

  return (
    <div id='users__app__userslist'>
        <div className='title'>
          <h1>Users</h1>
        </div>
        {loading && <div>Loading...</div>}
        <div className='users__list'>
          <div className='users'>
            <ul>
              {
                users.map((user) => (
                  <li key={user.id}>
                    <NavLink activeClassName='active' to={`${url}/${user.id}`}>{user.name}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='users__detail'>
            <Switch>
              <Route exact path={path}>
                <h3>Please select a user.</h3>
              </Route>
              <Route path={`${path}/:id`} component={User} />
            </Switch>
          </div>
        </div>
    </div>
  );
}

export default Users;

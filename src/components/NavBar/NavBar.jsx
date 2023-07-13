import { Link } from 'react-router-dom';

import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to='/dashboard'>Dashboard</Link>
      &nbsp; | &nbsp;
      <Link to='/assets'>My Assets</Link>
      &nbsp; | &nbsp;
      <Link to='/add-asset'>Add Asset</Link>
      &nbsp; | &nbsp;
      <Link to='/profile'>Profile</Link>
      &nbsp; | &nbsp;
      Welcome, {user.name}
      &nbsp; | &nbsp;
      <Link to='' onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}

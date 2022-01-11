/* eslint-disable spaced-comment */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';

// import useUser from '../hooks/use-user';
// import LoggedInUserContext from '../context/logged-in-user';

export default function Dashboard(
  {
    /* user: loggedInUser*/
  }
) {
  // const { user } = useUser(loggedInUser.uid);

  useEffect(() => {
    document.title = 'Dashboard - Instagram';
  }, []);

  return (
    // <LoggedInUserContext.Provider value={{ user }}>
    <div className="bg-gray-background ">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between max-w-screen-lg mx-auto ">
        <Timeline />
        <Sidebar />
      </div>
    </div>
    // </LoggedInUserContext.Provider>
  );
}

// Dashboard.propTypes = {
//   user: PropTypes.object.isRequired
// };

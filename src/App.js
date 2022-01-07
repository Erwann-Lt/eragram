/* eslint-disable react/jsx-no-constructed-context-values */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

// import ProtectedRoute from './helpers/protected-route';
// import IsUserLoggedIn from './helpers/is-user-logged-in';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));
const Profile = lazy(() => import('./pages/profile'));

const App = function ({ children, ...rest }) {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} user={user} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            {/* <Route path={ROUTES.PROFILE} element={<Dashboard />} /> */}
            <Route
              {...rest}
              render={({ location }) => {
                if (user) {
                  return React.cloneElement(children, { user });
                }

                if (!user) {
                  return (
                    <Navigate
                      to={{
                        pathname: ROUTES.LOGIN,
                        state: { from: location }
                      }}
                    />
                  );
                }

                return null;
              }}
              path={ROUTES.DASHBOARD}
              element={<Dashboard />}
            />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;

// 10 h 16

//11 h 20

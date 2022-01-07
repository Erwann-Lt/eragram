/* eslint-disable react/function-component-definition */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByUserName } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUserName(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        history(ROUTES.NOT_FOUND);
        //  history.push(ROUTES.NOT_FOUND) not working
      }
    }

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}

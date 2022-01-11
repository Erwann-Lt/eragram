/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-duplicates */
import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';
import { getPhotos } from '../services/firebase';

// export default function usePhotos() {
//   const [photos, setPhotos] = useState(null);
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     async function getTimelinePhotos() {
//       if (user?.following?.length > 0) {
//         const followedUserPhotos = await getPhotos(user.userId, user.following);
//         followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
//         setPhotos(followedUserPhotos);
//       }
//       console.log('user', user)
//     }
//     getTimelinePhotos();
//   }, [user?.userId]);
//   return { photos };
// }

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);
  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    getTimelinePhotos();
  }, [userId]);
  return { photos };
}

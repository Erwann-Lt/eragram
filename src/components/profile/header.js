/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/function-component-definition */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import UserContext from '../../context/user';

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername
  }
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowingProfile(!!isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    console.log('isFollowingProfile', isFollowingProfile);
    console.log('followers', followers);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  return (
    <div className="grid grid-cols-2 gap-4 ml-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center gap-4  col-span-2">
        {user.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`$(user.username) profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        )}
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center  ">
            <p className="text-2xl mr-4">{profileUsername}</p>
            {activeBtnFollow && (
              <button
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowingProfile ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          <div className="container flex mt-4 ">
            {followers === undefined || following === undefined ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <p className="mr-10 ">
                  <span className="font-bold">{photosCount}</span> photos
                </p>
                <p className="mr-10 ">
                  <span className="font-bold">{followerCount}</span>{' '}
                  {followerCount === 1 ? 'follower' : 'followers'}
                </p>
                <p className="mr-10 ">
                  <span className="font-bold">{following.length}</span>{' '}
                  {following.length === 1 ? 'following' : 'followings'}
                </p>
              </>
            )}
          </div>
          <div className="container mt-4">
            <p className="font-medium">
              {!fullName ? <Skeleton count={1} height={24} /> : fullName}{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array
  }).isRequired
};

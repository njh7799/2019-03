import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import StyledFollowButton from './StyledFollowButton';
import FollowCheckingModal from '../FollowCheckingModal';

const FollowButton = ({ followStatus, className, username, myId, userId }) => {
  // folowStatus {0: 팔로우하고있지 않은 상태(팔로우하지 않을 때 삭제? 0?), 1: 비공개 계정에 요청한 상태, 2: 팔로우하고 있는 상태}
  const [currentFollowStatus, setCurrentFollowStatus] = useState(followStatus);
  const [isVisible, setIsVisible] = useState(false);

  const requestFollowingQuery = gql`
    mutation RequestFollowing($myId: Int!, $userId: Int!) {
      RequestFollowing(myId: $myId, userId: $userId) {
        from
        to
        status
        updatedAt
      }
    }
  `;
  const requestFollowingCancellationQuery = gql`
    mutation RequestFollowingCancellation($myId: Int!, $userId: Int!) {
      RequestFollowingCancellation(myId: $myId, userId: $userId) {
        from
        to
      }
    }
  `;

  const [requestFollowing] = useMutation(requestFollowingQuery);
  const [requestFollowingCancellation] = useMutation(
    requestFollowingCancellationQuery,
  );

  const onClick = () => setIsVisible(isVisible => !isVisible);

  const cancelFollowing = () => {
    requestFollowingCancellation({ variables: { myId, userId } });
    setCurrentFollowStatus(0);
    onClick();
  };

  const changeFollowStatus = () => {
    switch (currentFollowStatus) {
      case 0:
        requestFollowing({ variables: { myId, userId } });
        setCurrentFollowStatus(2);
        break;
      // case 1:
      //   setCurrentFollowStatus('팔로잉');
      //   setIsVisible(isVisible => !isVisible);
      //   break;
      case 2:
        setIsVisible(isVisible => !isVisible);
        break;
      default:
        throw new Error(
          `Current follow status is wrong : ${currentFollowStatus}`,
        );
    }
  };
  return (
    <>
      <StyledFollowButton
        status={currentFollowStatus}
        onClick={changeFollowStatus}
        className={className}
      >
        {currentFollowStatus === 0 ? '팔로우' : '팔로잉'}
      </StyledFollowButton>
      <FollowCheckingModal
        isVisible={isVisible}
        onClick={onClick}
        cancelFollowing={cancelFollowing}
        username={username}
      />
    </>
  );
};

FollowButton.defaultProps = {
  // 추후 삭제할 것
  followStatus: 0,
};

export default FollowButton;

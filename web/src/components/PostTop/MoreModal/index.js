import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ModalBackground, ModalWrapper, ModalContent } from './styles';
import StyledLink from '../../StyledLink';

const MoreModal = ({ isVisible, setIsVisible, writer, myInfo, post }) => {
  const clickClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;
  return (
    <ModalBackground onClick={clickClose}>
      <ModalWrapper>
        {writer.username !== myInfo.username && writer.isFollow && (
          <ModalContent followcancel>팔로우 취소</ModalContent>
        )}
        <StyledLink to={`/p/${post.postHash}`}>
          <ModalContent>게시물로 이동</ModalContent>
        </StyledLink>
        <CopyToClipboard text={`localhost:3000/p/${post.postHash}`}>
          <ModalContent>링크 복사하기</ModalContent>
        </CopyToClipboard>
        <ModalContent cancel onClick={clickClose}>
          취소
        </ModalContent>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default MoreModal;

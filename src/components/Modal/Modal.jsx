// import { Component } from 'react';
import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Overlay, ModalEl } from 'components/Modal/Modal.styled';

export const Modal = ({ url, tags, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalEl>
        <img src={url} alt={tags} />
      </ModalEl>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

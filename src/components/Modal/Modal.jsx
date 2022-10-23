import {  useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalBody, ModalOverlay } from './Modal.styled';

const Modal = ({ closeModal, data }) => {
  
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    if (!data) {
      window.removeEventListener(`keydown`, keyDown);
      return;
    }

    window.addEventListener('keydown', keyDown);
  }, [closeModal, data]);

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalBody>
        <img src={data.largeImageURL} alt={data.id} width="600px" />
      </ModalBody>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default Modal;

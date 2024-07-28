import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          {/* <button onClick={onClose} className="close-button">&times;</button> */}
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="button">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

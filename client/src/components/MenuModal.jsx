import React, { useRef } from 'react';
import './styles/MenuOver.css';
// import { Link } from 'react-router-dom';

const MenuModal = ({ isOpenModal, closeModalMenu }) => {
  const modalRef = useRef(null);

  const handleMouseLeave = (e) => {
    if (!modalRef.current.contains(e.relatedTarget)) {
      closeModalMenu();
    }
  };

  if (!isOpenModal) return null;

  return (
    <div
      className="m-overlay"
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="md"
        ref={modalRef}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bodyModal">

            <ul className='UL'/>
                <li className="LI">Profile</li>
                <div className="mt-1 max-w-screen-xl border-t border-solid border-gray-300 py-3 text-center text-gray-700 md:text-start"></div>
                <li className="LI">Dashboard</li>
                <div className="mt-1 max-w-screen-xl border-t border-solid border-gray-300 py-3 text-center text-gray-700 md:text-start"></div>
                <li className="LI">Create Trip</li>
                <div className="mt-1 max-w-screen-xl border-t border-solid border-gray-300 py-3 text-center text-gray-700 md:text-start"></div>
                <li className="LI">Settings</li>
                <div className="mt-1 max-w-screen-xl border-t border-solid border-gray-300 py-3 text-center text-gray-700 md:text-start"></div>
                <li className="LI">LogOut</li> 
            <ul/>

        </div>

      </div>
    </div>
  );
};

export default MenuModal;

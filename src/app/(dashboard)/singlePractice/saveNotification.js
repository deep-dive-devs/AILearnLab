import React from 'react';

const SaveNotification = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-8 rounded-md flex flex-col justify-center">
        <p className="text-green-500 text-lg font-semibold mb-2">You Saved!</p>
          <button onClick={onClose} className="p-2 bg-primary rounded-md text-white text-lg font-medium">OK</button>
      </div>
    </div>
  );
};

export default SaveNotification;

import React from 'react';

// Popup Component for displaying forms in modals with theme support
const Popup = ({ isOpen, onClose, title, children, theme }) => {
  if (!isOpen) return null; // If the popup is not open, render nothing

  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-75 flex items-center justify-center`}>
      {/* Modal container */}
      <div className={`bg-white ${theme === 'dark' ? 'dark:bg-gray-900 dark:text-white' : 'text-black'} rounded-lg shadow-lg p-6 max-w-md w-full`}>
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-red-500 font-bold">&times;</button>
        </div>

        {/* Modal content (Form content goes here) */}
        {children}

        {/* Close button */}
        <button onClick={onClose} className="bg-gray-300 text-black p-2 rounded-lg mt-4">Close</button>
      </div>
    </div>
  );
}

export default Popup;

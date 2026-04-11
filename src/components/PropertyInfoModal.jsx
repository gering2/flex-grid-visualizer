import { useState } from 'react';
import CssOutput from './CssOutput/CssOutput';

export default function PropertyInfoModal({ open, onClose, def }) {
  if (!open || !def) return null;
  return (
    <div
      className="fixed rounded-md inset-0 z-50 flex items-center justify-center bg-gradient-to-tr from-purple-100 
      via-pink-200 to-pink-400  bg-opacity-20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-14 max-w-4xl h-[700px] overflow-y-auto w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute cursor-pointer top-2 right-2 text-lg text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="mb-2 text-lg font-semibold text-gray-700">{def.label}</div>
        <div className="mb-2 text-gray-600">{def.definition}</div>
        <div >
         <CssOutput cssOutput={def.usage}></CssOutput> 
        </div>
      </div>
    </div>  
  );
}

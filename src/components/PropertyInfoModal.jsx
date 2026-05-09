import { useState } from 'react';
import CssOutput from './CssOutput/CssOutput';

export default function PropertyInfoModal({ open, onClose, def }) {
  if (!open || !def) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg border border-[var(--border)] p-6 sm:p-10 max-w-4xl h-[700px] overflow-hidden overflow-y-auto w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute cursor-pointer top-3 right-3 text-lg text-gray-400 hover:text-gray-600"
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

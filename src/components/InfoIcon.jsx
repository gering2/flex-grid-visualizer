import { useState } from 'react';
import CssOutput from './CssOutput/CssOutput';

export default function InfoIcon({ propertyKey, definitions }) {
  const [open, setOpen] = useState(false);
  const def = definitions[propertyKey];

  return (
    <span className="relative inline-block align-middle">
      <button
        type="button"
        aria-label="Show info"
        onClick={() => setOpen(true)}
        className=" hover:text-gray-600 hover:border-gray-400 w-4 w-4    flex justify-items-center items-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
        style={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
      >
           <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

      </button>
      {open === true && def && (
        <div
          className="fixed rounded-md  inset-0 z-50 flex items-center justify-center bg-gray-300     backdrop-blur-sm  "
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-14 max-w-4xl min-h-2xl w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute cursor-pointer top-2 right-2 text-lg text-gray-400 hover:text-gray-600"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-2 text-lg font-semibold text-gray-900">{def.label}</div>
            <div className="mb-2 text-gray-700">{def.definition}</div>
            <pre className="bg-[accent] rounded p-2 text-xs overflow-x-auto text-gray-800">
          <CssOutput cssOutput={def.usage}>    </CssOutput>
            </pre>
          </div>
        </div>
      )}
    </span>
  );
}

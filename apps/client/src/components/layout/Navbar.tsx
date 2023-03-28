import React, { useEffect, useRef, useState } from 'react';

import { HiBars3 } from 'react-icons/hi2';

import { Branding } from './Branding';
import { Navigation } from './Navigation';

export const Navbar = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  useEffect(() => {
    if (dropdownRef.current) {
      let sum = 0;
      Array.from(dropdownRef.current.childNodes).forEach((node) => {
        if (node instanceof HTMLElement) {
          sum += node.offsetHeight;
        }
      });
      setDropdownHeight(sum);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col bg-slate-900 text-slate-300 duration-700">
      <div className="flex w-full justify-between p-2">
        <Branding />
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <HiBars3 className="h-9 w-9" />
        </button>
      </div>
      <div
        className="overflow-hidden px-2 transition-all duration-500"
        ref={dropdownRef}
        style={{ height: isOpen ? dropdownHeight : 0 }}
      >
        <hr />
        <Navigation onClick={() => setIsOpen(false)} />
      </div>
    </div>
  );
};

'use client';
import { useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi2';

export default function CtaChoice() {
  const [active, setActive] = useState('project');

  return (
    <div className="flex justify-between items-center w-[70%] m-auto">
      <div className="flex flex-col items-center">
        <button className={`text-[30px] flex items-center ${active === 'project' ? 'underline' : ''}`} onClick={() => setActive('project')}>
          <HiOutlineArrowRight className={`mr-4 w-6 h-6 transition-opacity duration-300 ${active === 'project' ? 'opacity-100' : 'opacity-0'}`} />A project
        </button>
      </div>
      <div className="flex flex-col items-center">
        <button className={`text-[30px] flex items-center ${active === 'freelance' ? 'underline' : ''}`} onClick={() => setActive('freelance')}>
          <HiOutlineArrowRight className={`mr-4 w-6 h-6 transition-opacity duration-300 ${active === 'freelance' ? 'opacity-100' : 'opacity-0'}`} />A freelance
        </button>
      </div>
    </div>
  );
}

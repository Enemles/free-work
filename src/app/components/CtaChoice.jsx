'use client';
import { useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi2';

export default function CtaChoice({ onChange }) {
  const [active, setActive] = useState('project');

  const handleChoice = (choice) => {
    setActive(choice);
    onChange(choice);
  };

  return (
    <div className="flex justify-around items-center w-[70%] m-auto">
      <div className="flex flex-col items-center">
        <button className={`text-[30px] flex items-center ${active === 'project' ? 'underline' : ''}`} onClick={() => handleChoice('project')}>
          <HiOutlineArrowRight className={`mr-4 w-6 h-6 transition-opacity duration-300 ${active === 'project' ? 'opacity-100' : 'opacity-0'}`} />A project
        </button>
      </div>
      <div className="flex flex-col items-center">
        <button className={`text-[30px] flex items-center ${active === 'freelance' ? 'underline' : ''}`} onClick={() => handleChoice('freelance')}>
          <HiOutlineArrowRight className={`mr-4 w-6 h-6 transition-opacity duration-300 ${active === 'freelance' ? 'opacity-100' : 'opacity-0'}`} />A freelance
        </button>
      </div>
    </div>
  );
}

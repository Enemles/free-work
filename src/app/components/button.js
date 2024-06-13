"use client";

export default function Button({ text, href, btnStyle }) {
  const baseClasses =
    "text-[14px] rounded-[4px] text-center px-[16px] py-[6px] font-normal transition-all";

  const buttonClasses = {
    black: `${baseClasses} bg-[black] text-white border border-[black] hover:bg-[white] hover:text-[black]`,
    outline: `${baseClasses} bg-[white] text-[black] border border-[black] hover:bg-[black] hover:text-white`,
  };

  return (
    <a href={href} className={buttonClasses[btnStyle]}>
      {text}
    </a>
  );
}

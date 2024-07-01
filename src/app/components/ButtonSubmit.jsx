"use client";

export default function ButtonSubmit({ text, btnStyle }) {
  const baseClasses =
    "text-[14px] rounded-[4px] text-center px-[16px] py-[6px] font-normal transition-all w-fit";

  const buttonClasses = {
    black: `${baseClasses} bg-[black] text-[white] border border-[black] hover:bg-[white] hover:text-[black]`,
    outline: `${baseClasses} bg-[white] text-[black] border border-[black] hover:bg-[black] hover:text-[white]`,
  };

  return (
      <button type="submit" className={`button ${buttonClasses[btnStyle]}`}>
        {text}
      </button>
    );
}

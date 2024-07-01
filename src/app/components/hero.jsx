'use client';

export default function Hero({ text }) {
  return (
    <div className="mb-[80px] container">
      <h1 className="text-[60px] text-center">{text}</h1>
      <div className="h-[1px] relative top-[10px] translate-x-[-50%] left-[50%] bg-[black] w-[50%]"></div>
    </div>
  );
}

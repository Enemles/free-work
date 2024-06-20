"use client";
import Button from "./button.js";
import Search from "./search.js";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full p-4 mb-[100px] mt-[10px]">
      <div className="left">
        <a href="/" className="font-medium text-[22px] ">
          Freework.
        </a>
      </div>
      <div className="flex items-end gap-4 right">
        <Search />
        <Button text="Sign in" href="/sign-in" btnStyle="outline" />
        <Button text="Sign up" href="/sign-up" btnStyle="black" />
      </div>
    </header>
  );
}

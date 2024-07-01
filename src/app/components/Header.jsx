'use client';
import Link from 'next/link';
import Button from './Button';
import Search from './Search';
import { BiSolidUser } from 'react-icons/bi';
import { MdAddToPhotos } from "react-icons/md";

export default function Header({ session }) {
  return (
    <header className="flex items-center justify-between w-full p-4 mb-[100px] mt-[10px]">
      <div className="left">
        <a href="/" className="font-medium text-[22px] ">
          Freework.
        </a>
      </div>
      <div className="flex items-center gap-4 right ">
        <Search />
        {session ? (
          <>
            <Link href="/projects/create"><MdAddToPhotos /></Link>
            <Link href="/profile">
              <BiSolidUser className="text-[20px]" />
            </Link>
          </>
        ) : (
          <h1></h1>
        )}
        {session ? (
          <Button text="Logout" href="/api/auth/signout" btnStyle="outline" />
        ) : (
          <>
            <Button text="Sign in" href="/api/auth/signin" btnStyle="outline" />
          </>
        )}
      </div>
    </header>
  );
}

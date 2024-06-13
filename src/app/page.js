import Image from "next/image";
// import Users from "./users/page";
import Header from "./components/header.js";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Header />
      <div className="container">
        {/* <Users /> */}
      </div>
    </main>
  );
}

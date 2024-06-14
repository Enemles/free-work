import Image from 'next/image';
// import Users from "./users/page";
import Header from './components/header.js';
import Hero from './components/hero.js';
import CtaChoice from './components/cta-choice.js';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Header />
      <div className="container">
        <Hero text="I am looking for " />
        <CtaChoice />
      </div>
    </main>
  );
}

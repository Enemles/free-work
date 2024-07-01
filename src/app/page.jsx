'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserList from './components/UserList';
import Header from './components/Header';
import Hero from './components/Hero';
import CtaChoice from './components/CtaChoice';
import Projects from './components/Projects';
import Freelances from './components/Freelances';

export default function HomeClient({ session }) {
  const [activeChoice, setActiveChoice] = useState('project');

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Header session={session} />
      <nav>
        <ul>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          {/* <li>
            <Link href="/feed">Feed</Link>
          </li> */}
        </ul>
      </nav>
      <UserList />
      <Hero text="I am looking for " />
      <div>
        <CtaChoice onChange={setActiveChoice} />
        {activeChoice === 'project' ? <Projects /> : <Freelances />}
      </div>
    </main>
  );
}

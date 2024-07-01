'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserList from './UserList';
import Header from './Header';
import Hero from './Hero';
import CtaChoice from './CtaChoice';
import HomeProjects from './HomeProjects';
import HomeFreelances from './HomeFreelances';

export default function HomeClient({ session }) {
  const [activeChoice, setActiveChoice] = useState('project');

  // if (!session) {
  //   return <div>Loading...</div>;
  // }

  return (
    <main>
      <Header session={session} />
      <UserList />
      <Hero text="I am looking for " />
      <div>
        <CtaChoice onChange={setActiveChoice} />
        {activeChoice === 'project' ? <HomeProjects /> : <HomeFreelances />}
      </div>
    </main>
  );
}

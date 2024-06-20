import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Link from 'next/link'
import UserList from './components/UserList'
import { LoginButton, LogoutButton } from './auth'

export default async function Home() {
  const session = await getServerSession(authOptions)


  return (
    <main>
      {session ? (
        <>
          <LogoutButton />
          <h1>Bienvenue, {session.user.name}</h1>
        </>
      ) : (
        <LoginButton />
      )}

      <h1>Bienvenue sur le Réseau Social pour Freelances</h1>
      <nav>
        <ul>
          <li>
            <Link href="/profile">Profil</Link>
          </li>
          <li>
            <Link href="/projects">Projets</Link>
          </li>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
        </ul>
      </nav>
      <UserList />
    </main>
  )
}

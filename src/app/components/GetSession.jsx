import { getServerSession } from 'next-auth';
import {authOptions} from '../api/auth/[...nextauth]/route';
import HomeClient from './HomeClient';

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);

  return <HomeClient session={session} />;
}
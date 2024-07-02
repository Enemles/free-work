'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import { IoStar } from 'react-icons/io5';
import { FaPen } from 'react-icons/fa6';
import Button from '../components/button';
import Image from 'next/image';

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const defaultAvatar = '/images/default-avatar.png';

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    profilePictureUrl: '',
    role: '',
    followers: [],
    following: [],
  });
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await res.json();
      setProfile({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        bio: data.bio || '',
        location: data.location || '',
        profilePictureUrl: data.profilePictureUrl || '',
        role: data.role || '',
        followers: data.followers || [],
        following: data.following || [],
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProfile();
    }
  }, [session]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile({ ...profile, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch('/api/profile', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(profile),
  //     });
  //     if (!res.ok) {
  //       throw new Error('Failed to update profile');
  //     }
  //     const data = await res.json();
  //     setProfile({
  //       firstName: data.firstName || '',
  //       lastName: data.lastName || '',
  //       bio: data.bio || '',
  //       location: data.location || '',
  //       profilePictureUrl: data.profilePictureUrl || '',
  //       role: data.role || '',
  //       followers: data.followers || [],
  //       following: data.following || [],
  //     });
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const handleFollow = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to follow user');
      }
      fetchProfile();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}/unfollow`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to unfollow user');
      }
      fetchProfile();
    } catch (error) {
      setError(error.message);
    }
  };

  // if (!session) {
  //   return (
  //     <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
  //       <p>Vous devez être connecté pour accéder à cette page.</p>
  //       <Button text="Go back" href="/" btnStyle="outline" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Header session={session} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* <form className="container text-[black]" onSubmit={handleSubmit}> */}
      <div className="container ">
        <div className="relative flex flex-col items-center justify-center gap-5">
          <div className="absolute top-0 right-0">
            <button onClick={() => router.push(`/profile/custom-profile`)}>
              <FaPen className="text-[16px]" />
            </button>
          </div>
          <Image className="rounded-full margin-auto w-[100px]" src={profile.profilePictureUrl || defaultAvatar} alt="" width={50} height={50} />
          <div className="flex gap-4">
            <span className="text-[60px]">{profile.firstName}</span>
            <span className="text-[60px]">{profile.lastName || ''}</span>
          </div>
        </div>
        <div className="h-[1px] relative top-[10px] translate-x-[-50%] left-[50%] bg-[black] w-[50%] mb-[30px]"></div>
        <div className="container flex justify-around gap-5 mb-5">
          <div className="flex gap-4 mb-5">
            <span>{profile.followers.length} followers</span>
            <span>{profile.following.length} following</span>
          </div>
          <div>
            <span className="flex items-center gap-1">
              <IoStar /> <span className="font-medium">4.9 </span>
              <span className="font-thin text-[grey]">(166)</span>
            </span>
          </div>
        </div>
        <span className="block mb-5 text-center">
          {profile.bio ||
            'Single origin aftertaste to steamed id dark crema et mountain cream. Grinder roast a filter sit that fair siphon milk wings brewed frappuccino ut con. Trade wings a qui milk aftertaste doppio saucer qui espresso foam qui. Filter foam macchiato extraction kopi caffeine est lait that est grounds milk turkish. Café to mazagran redeye grinder rich shop froth trifecta pumpkin french.'}
        </span>
        <div className="w-full mx-auto mb-8">
          <div className="flex flex-col gap-6">
            <span className="text-[16px]">Skills</span>
            <div className="pb-3 overflow-x-scroll slider">
              <div className="flex gap-4 w-max">
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">HTML</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">CSS</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">JAVASCRIPT</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">REACT</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">Node.js</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">GitHub</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">SCSS</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">VUE.JS</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">MIAOU</div>
                <div className="w-fit p-3 px-8 text-center border-solid border-[1px] border-[black] rounded-[4px]">WAOUF</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            <span className="text-[16px]">Reviews</span>
            <div className="flex flex-col p-[20px] bg-[white] [box-shadow:0px_0px_60px_-20px_rgba(0,_0,_0,_0.4)] rounded-[10px]">
              <div className="flex w-[100%] gap-4 ">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="rounded-full w-[40px]" src={profile.profilePictureUrl || defaultAvatar} alt="" width={50} height={50} />
                  <div className="flex flex-col leading-none">
                    <span>Jame Brown</span>
                    <span className="text-[12px] text-[grey]">@jamebrown</span>
                  </div>
                  <div className="ml-5">
                    <span className="flex items-center gap-1">
                      <IoStar /> <span className="font-medium">4.9 </span>
                      <span className="font-thin text-[grey]">(166)</span>
                    </span>
                  </div>
                </div>
              </div>
              <span>
                Single ut whipped carajillo pumpkin mocha dark americano pot luwak acerbic variety cappuccino panna flavour. Single est beans java sit foam that instant skinny milk lungo mug in panna.
                Seasonal qui irish luwak irish con extra and aromatic cortado iced galão cinnamon. Breve percolator grinder java trade rich blue shop. Affogato coffee aftertaste extra robust sugar con
                half et.
              </span>
            </div>
            <div className="flex flex-col p-[20px] bg-[white] [box-shadow:0px_0px_60px_-20px_rgba(0,_0,_0,_0.4)] rounded-[10px]">
              <div className="flex w-[100%] gap-4 ">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="rounded-full w-[40px]" src={profile.profilePictureUrl || defaultAvatar} width={50} height={50} alt="" />
                  <div className="flex flex-col leading-none">
                    <span>Jame Brown</span>
                    <span className="text-[12px] text-[grey]">@jamebrown</span>
                  </div>
                  <div className="ml-5">
                    <span className="flex items-center gap-1">
                      <IoStar /> <span className="font-medium">4.9 </span>
                      <span className="font-thin text-[grey]">(166)</span>
                    </span>
                  </div>
                </div>
              </div>
              <span>
                Single ut whipped carajillo pumpkin mocha dark americano pot luwak acerbic variety cappuccino panna flavour. Single est beans java sit foam that instant skinny milk lungo mug in panna.
                Seasonal qui irish luwak irish con extra and aromatic cortado iced galão cinnamon. Breve percolator grinder java trade rich blue shop. Affogato coffee aftertaste extra robust sugar con
                half et.
              </span>
            </div>
            <div className="flex flex-col p-[20px] bg-[white] [box-shadow:0px_0px_60px_-20px_rgba(0,_0,_0,_0.4)] rounded-[10px]">
              <div className="flex w-[100%] gap-4 ">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="rounded-full w-[40px]" src={profile.profilePictureUrl || defaultAvatar} width={50} height={50} alt="" />
                  <div className="flex flex-col leading-none">
                    <span>Jame Brown</span>
                    <span className="text-[12px] text-[grey]">@jamebrown</span>
                  </div>
                  <div className="ml-5">
                    <span className="flex items-center gap-1">
                      <IoStar /> <span className="font-medium">4.9 </span>
                      <span className="font-thin text-[grey]">(166)</span>
                    </span>
                  </div>
                </div>
              </div>
              <span>
                Single ut whipped carajillo pumpkin mocha dark americano pot luwak acerbic variety cappuccino panna flavour. Single est beans java sit foam that instant skinny milk lungo mug in panna.
                Seasonal qui irish luwak irish con extra and aromatic cortado iced galão cinnamon. Breve percolator grinder java trade rich blue shop. Affogato coffee aftertaste extra robust sugar con
                half et.
              </span>
            </div>
          </div>
          <div className="p-4 m-auto mt-4 w-fit">
            <Button text="Voir plus" href="/" btnStyle="outline" />
          </div>
        </div>
        <div className="w-full mx-auto mb-8">
          <div className="flex flex-col gap-6">
            <span className="text-[16px]">Worked on </span>
          </div>
        </div>
        {/* <div>
          <label>Location</label>
          <input type="text" name="location" value={profile.location} onChange={handleChange} />
        </div> */}
        {/* <div>
          <label>Rôle</label>
          <select name="role" value={profile.role} onChange={handleChange}>
            <option value="">Sélectionner un rôle</option>
            <option value="freelance">Freelance</option>
            <option value="client">Client</option>
          </select>
        </div> */}
      </div>
      {/* <button type="submit">Enregistrer</button> */}
      {/* </form> */}

      {/* <div>
        <ul>
          {profile.followers.map((follower) => (
            <li key={follower.id}>
              <Link href={`/profile/${follower.id}`}>
                {follower.firstName} {follower.lastName}
              </Link>
              {profile.following.some((f) => f.id === follower.id) ? (
                <button onClick={() => handleUnfollow(follower.id)}>Arrêter de suivre</button>
              ) : (
                <button onClick={() => handleFollow(follower.id)}>Suivre</button>
              )}
            </li>
          ))}
        </ul>
      </div> */}

      <div>
        {/* <ul>
          {profile.following.map((following) => (
            <li key={following.id}>
              <Link href={`/profile/${following.id}`}>
                {following.firstName} {following.lastName}
              </Link>
              <button onClick={() => handleUnfollow(following.id)}>Arrêter de suivre</button>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Profile;

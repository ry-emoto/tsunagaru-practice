import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const session = useSession();
  return (
    <div>
      <p>{`こんにちは、${session.data?.user?.name}さん`}</p>
      <button onClick={() => signOut()}>
        <a>Log out</a>
      </button>
    </div>
  );
};

export default Home;

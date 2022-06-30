import { signIn } from 'next-auth/react';

const login = () => {
  return (
    <div>
      <div>
        <div>
          <button onClick={() => signIn('github', { callbackUrl: '/' })}>
            Sign in with GitHub
          </button>
        </div>
        <div>
          <button onClick={() => signIn()}>Sign in with Google</button>
        </div>
      </div>
      <p>or</p>
      <button onClick={() => signIn('credentials', { callbackUrl: '/' })}>
        ゲストログイン
      </button>
    </div>
  );
};

export default login;

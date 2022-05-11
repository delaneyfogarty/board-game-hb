import { useState } from 'react';
import { signIn, signUp, getUser } from './services/fetch-utils.js';

export default function AuthPage({ setEmail, setToken }) {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [{ email: signInEmail, password: signInPassword }, setSignInFormData] = useState({
    email: '',
    password: '',
  });
  // you'll need to track the form state of the email and password

  async function handleSignIn(e) {
    e.preventDefault();
    await signIn(signInEmail, signInPassword);
    const {
      access_token,
      user: { email },
    } = getUser();

    setEmail(email);
    setToken(access_token);
    // sign the user in using the form state

    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
  }

  async function handleSignUp(e) {
    e.preventDefault();
    // sign the user up using the form state
    await signUp(signUpEmail, signUpPassword);
    const {
      access_token,
      user: { email },
    } = getUser();

    setEmail(email);
    setToken(access_token);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
  }

  return (
    <div className="auth">
      <h1>
        <em>Boardzo</em>
      </h1>
      {/* on submit, sign the user in using the function defined above */}
      <form onSubmit={handleSignIn}>
        <label>
          Email
          {/* on change, update the form state for email */}
          <input
            required
            type="email"
            name="email"
            value={signInEmail}
            onChange={(e) => setSignInFormData({ email: e.target.value, password: signInPassword })}
          />
        </label>
        <label>
          Password
          {/* on change, update the form state for password */}
          <input
            required
            type="password"
            name="password"
            value={signInPassword}
            onChange={(e) => setSignInFormData({ email: signInEmail, password: e.target.value })}
          />
        </label>
        <button>Sign In</button>
        {/* on clicking sign up, sign the user up using the function defined above */}
      </form>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
        </label>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

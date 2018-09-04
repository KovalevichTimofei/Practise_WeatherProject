import React, { Fragment } from 'react';
import * as firebaseui from 'firebaseui';
import auth from '../../fb';

function Login() {
  const ui = new firebaseui.auth.AuthUI(auth());
  ui.start('#firebaseui-auth-container', {
    signInSuccessUrl: '/App',
    signInOptions: [
      auth.EmailAuthProvider.PROVIDER_ID,
      auth.TwitterAuthProvider.PROVIDER_ID,
      auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  });

  return (
    <Fragment>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container" />
    </Fragment>
  );
}

export default Login;

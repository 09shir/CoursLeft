import { Routes, Route } from "react-router-dom"
import './App.css';
import Page from './pages/Page';

import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json'

Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <div className="Page">
      {/* <Authenticator /> */}
      <Routes>
        <Route path="/" element={<Page signOut={signOut} user={user}/>}/>
      </Routes>
      {/* <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button> */}
    </div>

    // <Authenticator>
    //   {({ signOut, user }) => (
    //     <div className="App">
    //       <p>
    //         Hey {user.username}, welcome to my channel, with auth!
    //       </p>
    //       <button onClick={signOut}>Sign out</button>
    //     </div>
    //   )}
    // </Authenticator>
  );
}

export default withAuthenticator(App);

import { Routes, Route } from "react-router-dom"
import './App.css';
import Page from './pages/Page';

import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react'
import { Header } from "./components/authUI/Header";
import { Footer } from "./components/authUI/Footer";
import { SignInHeader } from "./components/authUI/SignInHeader";
import { SignInFooter } from "./components/authUI/SignInFooter";

import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json'

Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <div className="Page">
      <Routes>
        <Route path="/" element={<Page signOut={signOut} user={user}/>}/>
      </Routes>
    </div>
  );
}

export default withAuthenticator(App, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  }
});
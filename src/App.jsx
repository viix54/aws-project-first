import logo from './logo.svg';
import './App.css';

import { Amplify, graphqlOperation } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';

import awsconfig from './aws-exports';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { listSongs } from './graphql/queries';

import { signOut } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

Amplify.configure(awsconfig);

const clientGraphQL = generateClient();

function App() {
  const [songs, setSongs] = useState([]);

  const fetchSong = async () => {
    try {
      const songData = await clientGraphQL.graphql(listSongs);
      const songList = songData.data.listSong.items;
      console.log(`song list`, songList);
      setSongs(songList);
    } catch (error) {
      console.log(`error on fetching songs`, error);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  return (
    <Authenticator>
      <div className="App">
        <header className="App-header">
          <button onClick={signOut}>Sign Out</button>
          <h2>My App Content</h2>
        </header>
      </div>
    </Authenticator>
  );
}

export default App;

//or withAuthenticator(App)

import { useEffect } from 'react'
import { sessionState, useChatSession } from "@chainlit/react-client";
import { CHAINLIT_SERVER_HOST } from '../chainlit.config.ts';
import { useRecoilValue } from "recoil";
// import './App.css'
import {Playground} from './components/playground';

const userEnv = {};

function App() {
  const { connect } = useChatSession();
  const session = useRecoilValue(sessionState);
  useEffect(()=>{
    if (session?.socket.connected) {
      return;
    }
    fetch(`${CHAINLIT_SERVER_HOST}/custom-auth`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        connect({
          userEnv,
          accessToken: `Bearer: ${data.token}`,
        });
      });
  },[connect]);

  return (
    <div>
      <Playground/>
    </div>
  )
}

export default App

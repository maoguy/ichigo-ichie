import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChainlitAPI, ChainlitContext } from "@chainlit/react-client";
import { CHAINLIT_SERVER_HOST } from '../chainlit.config.ts';
import { RecoilRoot } from "recoil";

const CHAINLIT_SERVER = `${CHAINLIT_SERVER_HOST}/chainlit`;

const apiClient = new ChainlitAPI(CHAINLIT_SERVER, "webapp");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChainlitContext.Provider value={apiClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChainlitContext.Provider>
  </StrictMode>,
)

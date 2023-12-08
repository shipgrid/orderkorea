import React from 'react'
import App from './App.tsx'

import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
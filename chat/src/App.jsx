import { useState } from 'react'

import ChatApp from './components/Chatapp'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1
     className='app'
     >Chat Boat</h1>
      <ChatApp/>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='text-3xl text-black'> Team:  <span className='text-violet-700'>Stack</span></div>
    <Button variant ="ghost">All is well</Button>
    </>
  )
}

export default App

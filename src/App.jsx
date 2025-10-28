import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Background from './components/Background'
import AppRouter from './routes/AppRouter'
import './App.css'

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <AppRouter />
      </div>
    </div>
  )
}

export default App

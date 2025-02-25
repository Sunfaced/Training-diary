import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ExerciseTracker from './ExerciseTracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExerciseTracker />
  </StrictMode>,
)

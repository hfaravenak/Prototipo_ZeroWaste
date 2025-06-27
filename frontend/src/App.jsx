import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/HomeComponent'
import Image from './components/ImageComponent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/image' element={<Image />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

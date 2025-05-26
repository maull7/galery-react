import { BrowserRouter,Routes, Route } from "react-router-dom"
import Index from './pages/index'
import Gallery from './pages/gallery'
import About from './pages/about'


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

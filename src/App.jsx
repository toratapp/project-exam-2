import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/common/layout'
import HomePage from './components/pages/HomePage'
import ProfilePage from './components/pages/ProfilePage'
import CreatePostPage from './components/pages/CreatePostPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="create-post" element={<CreatePostPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

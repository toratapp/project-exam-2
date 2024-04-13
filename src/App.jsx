import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/common/layout'
import HomePage from './components/pages/HomePage'
import ProfilePage from './components/pages/ProfilePage'
import CreatePostPage from './components/pages/CreatePostPage'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="create-post" element={<CreatePostPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

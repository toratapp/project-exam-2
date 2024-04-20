import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/common/layout'
import HomePage from './components/pages/HomePage'
import MyProfilePage from './components/pages/MyProfilePage'
import CreatePostPage from './components/pages/CreatePostPage'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import EditProfilePage from './components/pages/EditProfilePage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile/:name" element={<MyProfilePage />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

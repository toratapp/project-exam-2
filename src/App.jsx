import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/common/layout'
import HomePage from './components/pages/HomePage'
import CreatePostPage from './components/pages/CreatePostPage'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import EditProfilePage from './components/pages/EditProfilePage'
import PostPage from './components/pages/PostPage'
import AllProfilesPage from './components/pages/AllProfilesPage'
import ProfilePage from './components/pages/ProfilePage'
import EditPostPage from './components/pages/EditPostPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/profiles/:name" element={<ProfilePage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="/profiles" element={<AllProfilesPage />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit-post" element={<EditPostPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

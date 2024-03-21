
import React from 'react'
import QuickAccessHolder from '@/app/components/quick-access/QuickAccessHolder'
import Posts from './components/Posts'


const ProfilePage = () => {

  return (
    <>
      <main><Posts></Posts></main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  )
}

export default ProfilePage
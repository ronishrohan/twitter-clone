import TopBar from './components/TopBar'
import CreatePost from './components/CreatePost'
import Post from './components/Post'


function page() {
  return<>
  <main className='size-full overflow-hidden h-[500vh]'>
    <TopBar></TopBar>
    <section className='font-roboto' >
      <CreatePost></CreatePost>
      <Post></Post>
    </section>
  </main>
  </>
}

export default page
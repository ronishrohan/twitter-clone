import TopBar from './components/TopBar'
import CreatePost from './components/CreatePost'


function page() {
  return<>
  <main className='size-full h-[500vh]'>
    <TopBar></TopBar>
    <section className='font-roboto' >
      <CreatePost></CreatePost>
    </section>
  </main>
  </>
}

export default page
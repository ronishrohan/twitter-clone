import TopBar from "./components/TopBar";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";

function page() {
  return (
    <>
      <main className="size-full overflow-x-clip">
        <section className="font-roboto">
          <TopBar></TopBar>
          <CreatePost></CreatePost>
          <Post>
            {`I've had it up to here with Next.js. It's like trying to navigate a
            maze blindfolded. Every step I take seems to lead me deeper into a
            tangled mess of confusion. And the worst part? It's not even clear
            what problem Next.js is supposed to solve. It's as if the creators
            wanted to make web development more complex for the sake of it. I've
            spent hours wrestling with Next.js, only to end up with a website
            that performs worse than one built with basic HTML and CSS. It's
            frustrating beyond belief. Honestly, whoever thought this was a good
            idea clearly has no understanding of user experience or developer
            sanity.`}
          </Post>
          <Post>
            {`Let's have a heart-to-heart about Next.js, shall we? It's akin to
            embarking on an odyssey without a map or compass. Every attempt to
            harness its supposed power feels like stepping into a labyrinth with
            no hope of finding the exit. I've spent more hours than I care to
            admit grappling with its intricacies, only to be met with
            frustration and confusion at every turn. It's as if the developers
            decided to throw every complexity imaginable into the mix, leaving
            mere mortals like myself scratching our heads in bewilderment. Is
            there a light at the end of this tunnel, or am I condemned to wander
            in Next.js purgatory forever?`}
          </Post>
          <Post>
            {`Next.js, oh Next.js, where do I even begin? It's like attempting to
            unravel a Gordian knot armed with nothing but a toothpick. I've
            delved deep into its documentation, hoping to unlock its mysteries,
            only to find myself drowning in a sea of arcane terminology and
            bewildering concepts. It's as if the very essence of simplicity has
            been banished from its realm, replaced instead by a cacophony of
            complexity and confusion. And don't even get me started on the
            endless rabbit holes of debugging – each one more tortuous than the
            last. Is there a method to this madness, or am I condemned to wander
            these labyrinthine corridors forevermore?`}
          </Post>
          <Post>
            {`Next.js, Next.js, wherefore art thou Next.js? It's like
            Shakespearean tragedy unfolding before my eyes, with each line of
            code serving as a tragic soliloquy lamenting its own existence. I've
            traversed the depths of its intricacies, only to find myself lost in
            a fog of ambiguity and frustration. It's as if the very fabric of
            logic and reason has been rent asunder, leaving behind a landscape
            devoid of coherence or comprehension. And yet, amidst the chaos,
            there remains a glimmer of hope – a faint whisper that perhaps, just
            perhaps, there is meaning to be found amidst the madness. But until
            that day dawns, I shall continue to navigate these treacherous
            waters, praying for a glimpse of clarity amidst the storm.`}
          </Post>
          <Post>
            {`Next.js, the enigma wrapped in a mystery, shrouded in confusion.
            It's like attempting to solve a Rubik's Cube blindfolded, with each
            twist and turn leading me further down the rabbit hole of
            bewilderment. I've poured over its documentation with the fervor of
            an ancient scholar deciphering cryptic runes, yet still, its secrets
            elude me. It's as if the very essence of simplicity has been
            distorted beyond recognition, leaving behind a tangled web of
            complexity and convolution. And the worst part? It seems I'm not
            alone in my plight, as fellow travelers in this coding wilderness
            echo my sentiments with a chorus of frustration and despair. Will we
            ever emerge from this labyrinth unscathed, or are we doomed to
            wander its corridors for all eternity?`}
          </Post>
          <Post>
            {`Next.js, oh how you confound and perplex me. It's like attempting to
            navigate a maze constructed by M.C. Escher himself, with each path
            leading to a dead end or an impossible staircase. I've sifted
            through your documentation with the diligence of an archaeologist
            unearthing ancient artifacts, yet still, your mysteries remain
            elusive. It's as if the very laws of logic and reason have been
            suspended within your domain, leaving me adrift in a sea of
            uncertainty and confusion. And yet, despite the countless hours
            spent grappling with your complexities, I refuse to concede defeat.
            For somewhere amidst the chaos, I cling to the hope that a moment of
            clarity awaits, like a beacon guiding me through the storm. Until
            then, I shall press on, determined to unravel the enigma that is`}
            Next.js.
          </Post>
        </section>
      </main>
    </>
  );
}

export default page;

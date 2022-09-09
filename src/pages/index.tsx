import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from "next/router";



const Home: NextPage = () => {
  const router = useRouter();

  return (
   <>
    <Head>
      <title>Ideas-AI</title>
    </Head>
   <div>
    Hello World
    </div> 
    <button onClick={() => router.push("/idea")}  >Try Now </button>
   </>
  )
}

export default Home

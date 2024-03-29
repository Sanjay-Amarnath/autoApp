import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from './auth/Login'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Auto kaaran</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      </Head>
      <main className={styles.main}>
        <Login/>
      </main>

    </div>
  )
}

import React , {useState, useEffect, useCallback} from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios, {AxiosError} from 'axios'





export default function Home(){
  const [contacts, setContacts] = useState<any | undefined>(undefined)

  const getContacts = useCallback(() => {
    try {
      const res: any = axios.get('http://localhost:1337/passenger')
      if(res.status == 200) {
        setContacts(res.data)
      }
    }catch(e) {
      const err = e as AxiosError
      console.warn(err)
    }
  }, [contacts])
  useEffect(() => {
    getContacts()
  }, [])

  return (
    <div className={styles.container}>
      <head className={styles.head}>
        <button>all</button>
        <button>visited</button>
      </head>

      <main className={styles.main}>
        <div className={styles.search}>
          <div>
            <Image src="/search.svg" width={50} height={50}/>
          </div>
          <input  placeholder='type to search...'/>
          {/* <Image src='/more.svg' width={50} height={50}/> */}
        </div>
        <div className={styles.contacts}>
          <div className={styles.single}>
            <div className={styles.logo}>
              <Image src="/person.svg" width={30} height={30}/>
            </div>
              <div className={styles.detail}>
                <text className='name'>adawd</text>
                <text className='phone'>adad</text>
                <text className='city'>adad</text>
              </div>
              <div className={styles.right}></div>
          </div>
        </div>
      </main>
    </div>
  )
}



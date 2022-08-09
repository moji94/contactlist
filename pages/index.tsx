import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import styles from '../styles/Home.module.css'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
    const router = useRouter()
    const [contacts, setContacts] = useState<any | undefined>(undefined)

    const getContacts = useCallback(async (): Promise<void> => {
        try {
            const res = await axios.get('http://localhost:1337/passenger')
            if (res.status == 200) {
                setContacts(res.data)
            }
        } catch (e) {
            const err = e as AxiosError
            console.warn(err)
        }
    }, [])

    useEffect(() => {
        getContacts()
    }, [getContacts])
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <button>all</button>
                <button>visited</button>
            </div>

            <main className={styles.main}>
                <div className={styles.search}>
                    <div>
                        <Image
                            src="/search.svg"
                            alt="SearchIcon"
                            width={50}
                            height={50}
                        />
                    </div>
                    <input placeholder="type to search..." />
                </div>
                <div className={styles.contacts}>
                    {contacts == undefined ? (
                        <></>
                    ) : (
                        <>
                            {contacts.items.map((data: any, index: number) => (
                                <SingleContact
                                    key={index}
                                    onClick={() => {
                                        router.push({
                                            pathname: '/singleContact',
                                            query: { data: data.id },
                                        })
                                    }}
                                >
                                    <div className="logo">
                                        <Image
                                            src={data.avatar}
                                            alt="PersonIcon"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <div className="detail">
                                        <span className="name">
                                            {data.name}
                                        </span>
                                        <span className="phone">
                                            {data.phone}
                                        </span>
                                        <span className="city">
                                            {data.address}
                                        </span>
                                    </div>
                                    <div className={styles.right}></div>
                                </SingleContact>
                            ))}
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

const SingleContact = styled.div`
    width: 90%;
    height: 70px;
    border: 1px solid black;
    margin-bottom: 2px;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div[class='logo'] {
        width: 50px;
        height: 50px;
        background-color: aliceblue;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    div[class='detail'] {
        width: 80%;
        height: 100%;
        border-width: 1px;
        border-color: red;
        border-style: solid;
        display: flex;
        flex-direction: column;
    }
`

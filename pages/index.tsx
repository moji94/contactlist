import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import styles from '../styles/Home.module.css'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
    const router = useRouter()
    const [val, setVal] = useState<any | undefined>(undefined)
    const [contacts, setContacts] = useState<any | undefined>(undefined)

    const getContacts = useCallback(async (): Promise<void> => {
        try {
            const res = await axios.get('http://localhost:1337/passenger')
            if (res.status == 200) {
                const id: number = res.data.id
                let get: string = window.localStorage.getItem(
                    '@contacts'
                ) as string
                let plus = JSON.parse(get)
                if (plus.hasOwnProperty(id)) {
                    const result: any = (id: number) => {}
                }
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

    const getcontbylim = useCallback(async (val: any): Promise<void> => {
        try {
            if (Number.isNaN(Number(val))) {
                console.log('string')
                const res = await axios.get(
                    `http://localhost:1337/passenger/?where={"name":{"contains":"${val}"}}&sort=createdAt DESC&limit=30`
                )
                if (res.status == 200) {
                    setContacts(res.data)
                }
            } else {
                const res = await axios.get(
                    `http://localhost:1337/passenger/?where={"phone":{"contains":${val}}}&sort=createdAt DESC&limit=30`
                )
                if (res.status == 200) {
                    setContacts(res.data)
                }
            }
        } catch (e) {
            const err = e as AxiosError
            console.warn(err)
        }
    }, [])
    useEffect(() => {
        getContacts()
    }, [setContacts])

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <button className={styles.btnl}>all</button>
                <button className={styles.btnr}>visited</button>
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

                    <input
                        placeholder="type to search..."
                        onChange={(event) => {
                            getcontbylim(event.target.value)
                        }}
                    />
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
                                            width={35}
                                            height={35}
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
    width: 95%;
    min-height: 80px;
    margin-bottom: 5px;
    flex-direction: row;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 10px;
    div[class='logo'] {
        width: 50px;
        height: 50px;
        background-color: #ccc;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    div[class='detail'] {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        padding-top: 2px;
        padding-left: 20px;
    }
    span[class='name'] {
        font-size: 23px;
    }
    span[class='name']:hover {
        color: red;
    }
    span[class='phone'] {
        font-size: 15px;
    }
    span[class='city'] {
        font-size: 14px;
    }
`

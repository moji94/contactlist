import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { viewsPlus } from '../utils/main'

export default function SingleContact(): JSX.Element {
    const router = useRouter()
    const [contact, setContact] = useState<any | undefined>(undefined)

    const getContact = useCallback(
        async (id: any): Promise<void> => {
            try {
                const res = await axios.get(
                    `http://localhost:1337/passenger/${id}`
                )
                if (res.status == 200) {
                    setContact(res.data)
                    viewsPlus(id)
                }
            } catch (e) {
                const err = e as AxiosError
                console.warn(err)
            }
        },
        [contact]
    )

    useEffect(() => {
        const id = router.query
        getContact(id.data)
    }, [setContact])

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.back} onClick={router.back}>
                    <Image
                        src={'/person.svg'}
                        alt="PersonIcon"
                        width={30}
                        height={30}
                    />
                </div>
            </div>
            <div className={styles.main}>
                {contact == undefined ? (
                    <></>
                ) : (
                    <>
                        <div className={styles.holder}>
                            <div className={styles.hpic}>
                                <Image
                                    src={contact.avatar}
                                    alt="contact'sAvatar"
                                    width={250}
                                    height={250}
                                />
                            </div>
                            <div className={styles.hdetail}>
                                <p>{contact.name}</p>
                                <span>{contact.phone}</span>
                                <span>{contact.address}</span>
                                <span>{contact.email}</span>
                            </div>
                            <div className={styles.hbio}>
                                <h2>note:</h2>
                                <p>{contact.note}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

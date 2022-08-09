import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import '../public/fonts/roboto/roboto.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    const storageCheck = (): void => {
        if (typeof window == 'object') {
            if (window.localStorage.getItem('@contacts') == null) {
                const views: Object = {}
                window.localStorage.setItem('@contacts', JSON.stringify(views))
            }
        }
    }
    useEffect(() => {
        storageCheck()
    }, [])

    return <Component {...pageProps} />
}

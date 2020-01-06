import * as React from 'react'
import App from 'next/app'
import Head from 'next/head'
import cookies from 'nookies'
import firebase from '../libraries/firebase'
import { setup } from '../libraries/notifications'

const loginCookieName = 'bin-bot-login'

class BinBotApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const allCookies = cookies.get(ctx, { path: '/' })
    const loggedIn = allCookies[loginCookieName] != null
    if (!loggedIn && ctx.res != null && ctx.pathname !== '/login') {
      ctx.res.writeHead(302, {
        Location: '/login',
      })
      ctx.res.end()
      return
    }

    if (loggedIn && ctx.res != null && ctx.pathname === '/login') {
      ctx.res.writeHead(302, {
        Location: '/',
      })
      ctx.res.end()
      return
    }

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount() {
    if (window !== undefined && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./firebase-messaging-sw.js')
        .then(function() {
          console.log('Service worker registered')
        })
    }
    setup()

    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        
      }
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    )
  }
}

export default BinBotApp

import idx from 'idx'
import getConfig from 'next/config'

export type Env = {
  firebase: {
    apiKey: string
    authDomain: string
    databaseURL: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    messagingPublicKey: string
  }
}

export default function(key: string): any {
  const { publicRuntimeConfig: config } = getConfig()

  return idx(config, _ => _[key])
}

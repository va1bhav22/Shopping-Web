import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, isSupported } from 'firebase/messaging'
const firebaseConfig = {
  apiKey: 'AIzaSyDwP0GMzFCBf0gudOCar2hsagnmD1Wx-1s',
  authDomain: 'prizen-business.firebaseapp.com',
  projectId: 'prizen-business',
  storageBucket: 'prizen-business.appspot.com',
  messagingSenderId: '628472754792',
  appId: '1:628472754792:web:3de06b3a98e2807f9181dd',
  measurementId: 'G-S1JR90ZQRH',
}
const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const messaging: any = (async () => {
  try {
    const isSupportedBrowser = await isSupported()
    if (isSupportedBrowser) {
      return getMessaging(app)
    }
    console.log('Firebase not supported this browser')
    return null
  } catch (err) {
    console.log(err)
    return null
  }
})()

import '../src/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import NavBar from '../src/components/NavBar'
import { AnimatePresence, motion } from 'framer-motion'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import ToastProvider from '../src/Components/dls/toast/ToastProvider'
import { Provider } from 'react-redux'
import store from '../src/store'

config.autoAddCss = false

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ToastProvider>
          <div className='min-h-screen'>
            <NavBar />
            <AnimatePresence initial={false} mode='wait'>
              <motion.div
                key={router.asPath}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='flex h-full min-h-[calc(100vh-3.75rem)] flex-col justify-center'
              >
                <Component key={router.asPath} {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </div>
        </ToastProvider>
      </SessionProvider>
    </Provider>
  )
}

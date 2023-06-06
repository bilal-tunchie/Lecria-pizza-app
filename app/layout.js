import '@styles/globals.css'
import '@styles/framework.css'
import '@styles/normalize.css'

import { Header } from './components'
import CartCont from './components/CartCont'
import BackDrop from './components/BackDrop'
import { StateContext } from '@app/context/StateContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'ليسريا بيتزا',
  description: 'بيتزا يحبه قلبك',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <div className="app">
          <Toaster toastOptions={{duration: 5000}} />
          <StateContext>
            <BackDrop />
            <main>
              <Header />
              {children}
            </main>
            <CartCont />
          </StateContext>
        </div>
      </body>
    </html>
  )
}

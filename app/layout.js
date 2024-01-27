import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/navbar'
import TanstackProvider from './providers/tanstackProvider'
import "./styles/globals.css"
import NextAuthProvider from './providers/sessionProvider'
import SideNavBar from './components/sideNavBar'



export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body>
      <NextAuthProvider>
        <TanstackProvider>

            <Navbar/>
            <SideNavBar/>
            {children}

        </TanstackProvider>
      </NextAuthProvider>
      <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/ping.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/trefoil.js"></script>
      
      </body>
    </html>
  )
}

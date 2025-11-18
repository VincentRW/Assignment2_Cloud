import '../styles/globals.css'
import { ThemeProvider } from '../context/ThemeContext' // This should work now

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
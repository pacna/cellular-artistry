// Next
import type { AppProps } from 'next/app'

// Styles
import '../styles/globals.scss'

// Third party
import { Provider } from 'react-redux'
import store from '../redux/store'

// Components
import { Header } from './../components/header';
import { TopNav } from '../components/top-nav';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  )
}
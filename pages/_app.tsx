import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
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
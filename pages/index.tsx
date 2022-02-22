import { Header } from '../components/header'
import { TopNav } from '../components/top-nav/top-nav.component'
import { GameOfLife } from '../components/game-of-life/game-of-life.component'

export default function HomePage (): JSX.Element {
  return (
    <div>
      <Header />

      <main>
        <TopNav />
        <GameOfLife />
      </main>
    </div>
  )
}

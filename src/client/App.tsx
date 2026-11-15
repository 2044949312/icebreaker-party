import { useEffect, useState } from 'react'
import { AllGames } from './views/AllGames'
import { Home } from './views/Home'
import { Host } from './views/Host'
import { Join } from './views/Join'
import { Phone } from './views/Phone'
import { parse, tokenFor, type Route } from './route'

export function App() {
  const [route, setRoute] = useState<Route>(() => parse())

  useEffect(() => {
    const on = () => setRoute(parse())
    window.addEventListener('popstate', on)
    return () => window.removeEventListener('popstate', on)
  }, [])

  switch (route.name) {
    case 'games':
      return <AllGames />
    case 'join':
      return <Join initialCode={route.code} />
    case 'host':
      return <Host key={route.code} code={route.code} token={tokenFor(route.code)} />
    case 'watch':
      return <Host key={route.code} code={route.code} token={null} watch />
    case 'phone':
      return <Phone key={route.code} code={route.code} token={tokenFor(route.code)} />
    default:
      return <Home />
  }
}

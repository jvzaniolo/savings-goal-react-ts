import { SavingGoal } from './components/SavingGoal'

import logoImg from './assets/icons/logo.svg'

export function App() {
  return (
    <div className="w-screen h-screen overflow-auto bg-background">
      <header className="py-6 px-14 bg-white">
        <img src={logoImg} alt="Origin" className="h-8" />
      </header>

      <main className="mt-8 sm:mt-12 flex flex-col items-center">
        <SavingGoal />
      </main>
    </div>
  )
}

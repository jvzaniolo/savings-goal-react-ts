import { Header } from './components/Header'
import { SavingGoal } from './components/SavingGoal'

export function App() {
  return (
    <div className="w-screen h-screen overflow-auto bg-background">
      <Header />
      <main className="mt-8 sm:mt-12 flex flex-col items-center">
        <SavingGoal />
      </main>
    </div>
  )
}

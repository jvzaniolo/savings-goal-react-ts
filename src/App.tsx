import { Header } from './layout/Header';
import { SavingGoal } from './components/SavingGoal';
import { SavingGoalProvider } from './contexts/SavingGoalContext';

export function App(): JSX.Element {
  return (
    <div className="w-screen h-screen overflow-auto bg-background">
      <Header />
      <main className="mt-8 sm:mt-12 flex flex-col items-center">
        <SavingGoalProvider>
          <SavingGoal />
        </SavingGoalProvider>
      </main>
    </div>
  );
}

import { Header } from './layout/Header';
import { SavingGoal } from './components/SavingGoal';
import { SavingGoalProvider } from './contexts/SavingGoalContext';

export function App(): JSX.Element {
  return (
    <div className="w-screen h-screen bg-background">
      <Header />
      <main className="flex justify-center">
        <SavingGoalProvider>
          <SavingGoal />
        </SavingGoalProvider>
      </main>
    </div>
  );
}

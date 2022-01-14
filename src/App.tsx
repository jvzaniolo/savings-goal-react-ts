import { Header } from './layout/Header';
import { SavingGoal } from './components/SavingGoal';
import { ReachDateProvider } from './contexts/ReachDateContext';

export function App(): JSX.Element {
  return (
    <div className="w-screen h-screen bg-background">
      <Header />
      <main className="flex justify-center">
        <ReachDateProvider>
          <SavingGoal />
        </ReachDateProvider>
      </main>
    </div>
  );
}

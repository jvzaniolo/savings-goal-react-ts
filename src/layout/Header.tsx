import logoImg from '../assets/icons/logo.svg';

export function Header(): JSX.Element {
  return (
    <header className="py-6 px-14 bg-white ">
      <img src={logoImg} alt="Origin" className="h-8" />
    </header>
  );
}

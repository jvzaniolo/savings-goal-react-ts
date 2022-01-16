import { Header } from './Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('should render the Header component', () => {
    const component = render(<Header />);
    expect(component).toMatchSnapshot();
  });

  it('should render the brand logo', () => {
    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});

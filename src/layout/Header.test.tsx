import { Header } from './Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('should render the brand logo', () => {
    render(<Header />);

    const logo = screen.getByTestId('logo');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo.svg');
    expect(logo).toHaveAttribute('alt');
  });
});

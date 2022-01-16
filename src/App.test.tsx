import { App } from './App';
import { render } from '@testing-library/react';

describe('App', () => {
  it('should render the App component', () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });
});

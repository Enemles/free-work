import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Hero from '../src/app/components/hero';

describe('Hero component', () => {
  it('renders the Hero form', () => {
    render(<Hero text="I am looking for "  />);
    expect(screen.getByText('I am looking for')).toBeInTheDocument();
  });
});

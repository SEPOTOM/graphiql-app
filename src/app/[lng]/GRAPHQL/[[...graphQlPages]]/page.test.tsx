import { render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import GraphQlClientPage from './page';

describe('GraphQlClientPage', () => {
  it('should  render page correctly', () => {
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
    (usePathname as Mock).mockReturnValue('en/GRAPHQL');
    const replace = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      replace,
    }));
    render(<GraphQlClientPage />);
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByLabelText('SDL URL')).toBeInTheDocument();
  });
});

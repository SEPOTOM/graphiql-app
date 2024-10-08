import { act, screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import { RestfullClient } from '@/components';
import { renderWithLng, renderWithUserAndLng } from '@/tests';

const replace = vi.fn();
(useRouter as Mock).mockImplementation(() => ({
  replace,
}));

afterEach(() => {
  replace.mockRestore();
});

describe('RestfullClient component', () => {
  it('renders correctly', () => {
    (usePathname as Mock).mockReturnValue('/en/GET');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());

    renderWithLng(<RestfullClient />);

    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('Response')).toBeInTheDocument();
    expect(screen.getByLabelText('URL')).toBeInTheDocument();
    expect(screen.getByLabelText('basic tabs')).toBeInTheDocument();
  });

  it('displays error if endpoint is empty', async () => {
    (usePathname as Mock).mockReturnValue('/en/GET/');

    const { user } = renderWithUserAndLng(<RestfullClient />);

    user.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(screen.getByText('Endpoint URL must be filled in')).toBeInTheDocument();
    });
  });

  it('handles network error and displays error message', async () => {
    (usePathname as Mock).mockReturnValue('/en/GET/endpoint');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error'))) as Mock;

    const { user } = renderWithUserAndLng(<RestfullClient />);

    await act(async () => {
      await user.click(screen.getByText('Send'));
    });

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });
});

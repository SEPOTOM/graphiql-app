import { screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import RestfullClientPage from './page';
import { renderWithLng } from '@/tests';

vi.mock('@/contexts/AuthContext/AuthContext', () => ({
  useAuth: () => ({ user: {}, status: 'authenticated' }),
}));

describe('RestfullClientPage', () => {
  it('should render component correctly', async () => {
    (usePathname as Mock).mockReturnValue('/en');
    const replace = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      replace,
    }));
    const mockedSearch = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockedSearch);

    renderWithLng(
      <RestfullClientPage
        params={{
          method: 'GET',
        }}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Method')).toBeInTheDocument();
      expect(screen.getByLabelText('URL')).toBeInTheDocument();
    });
  });
});

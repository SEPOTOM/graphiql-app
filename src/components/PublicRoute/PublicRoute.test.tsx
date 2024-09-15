import { Mock } from 'vitest';

import { useAuth } from '@/contexts';
import { PublicRoute } from '@/components';
import { renderWithLng } from '@/tests';

vi.mock('@/contexts/AuthContext/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('PublicRoute', () => {
  it('shows a loading message during authentication', () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'init' }));

    const { getByRole } = renderWithLng(<PublicRoute>Test message</PublicRoute>);

    expect(getByRole('paragraph')).toHaveTextContent(/loading/i);
  });

  it('shows a message during redirect if the user in authenticated', () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'authenticated' }));

    const { getByRole } = renderWithLng(<PublicRoute>Test message</PublicRoute>);

    expect(getByRole('paragraph')).toHaveTextContent(/redirect/i);
  });

  it("shows the nested content is the user isn't authenticated", () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'unauthenticated' }));

    const { getByText } = renderWithLng(<PublicRoute>Test message</PublicRoute>);

    expect(getByText('Test message')).toBeInTheDocument();
  });
});

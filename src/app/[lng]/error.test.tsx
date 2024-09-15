import { renderWithLng } from '@/tests';

import ErrorPage from './error';

describe('ErrorPage', () => {
  it('displays relevant content', async () => {
    const { findByRole, getByRole } = renderWithLng(<ErrorPage />);

    expect(await findByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});

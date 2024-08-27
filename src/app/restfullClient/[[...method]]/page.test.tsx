import { render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { Mock } from 'vitest';
import RestfullClientPage from './page';

describe('RestfullClientPage', () => {
  it('should  render component correctly', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient');
    const replace = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      replace,
    }));
    render(<RestfullClientPage />);
    expect(screen.getByLabelText('Method')).toBeInTheDocument();
    expect(screen.getByLabelText('URL')).toBeInTheDocument();
  });
});

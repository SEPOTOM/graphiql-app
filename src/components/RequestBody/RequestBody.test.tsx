import { screen } from '@testing-library/react';
import RequestBody from './RequestBody';
import { usePathname, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import { renderWithUserAndLng } from '@/tests';

describe('RequestBody Component', () => {
  it('displays the RequestBodyTypeSelector when bodyType is set to "raw"', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());
    const { user } = renderWithUserAndLng(<RequestBody />);

    await user.click(screen.getByLabelText('raw request body'));

    expect(screen.getByLabelText('Request body mode')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import RequestBody from './RequestBody';
import userEvent from '@testing-library/user-event';
import { usePathname, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import { LanguageProvider } from '@/contexts';

const user = userEvent.setup();

describe('RequestBody Component', () => {
  it('displays the RequestBodyTypeSelector when bodyType is set to "raw"', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());

    render(
      <LanguageProvider lang="en">
        <RequestBody />
      </LanguageProvider>
    );

    await user.click(screen.getByLabelText('raw request body'));

    expect(screen.getByLabelText('Request body mode')).toBeInTheDocument();
  });
});

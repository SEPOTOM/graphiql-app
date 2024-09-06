import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import EndpointInput from './EndpointInput';
import { LanguageProvider } from '@/contexts';
import { encodeToBase64 } from '@/services';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('EndpointInput component', () => {
  it('renders correctly with the initial endpoint selected based on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/en/PATCH/cXdlcnR5');
    render(
      <LanguageProvider lang="en">
        <EndpointInput />
      </LanguageProvider>
    );
    expect(screen.getByLabelText('URL')).toHaveValue('qwerty');
  });

  it('updates URL when a new endpoint is entered', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/en/GET');
    const user = userEvent.setup();

    const screen = render(
      <LanguageProvider lang="en">
        <EndpointInput />
      </LanguageProvider>
    );

    const input = screen.getByLabelText('URL');
    const endpoint = 'newEndpoint';

    await user.type(input, endpoint);

    endpoint.split('').forEach((letter) => {
      const encodedEndpoint = encodeToBase64(letter);
      const newPath = `/restfullClient/en/GET/${encodedEndpoint}`;
      expect(mockReplaceState).toHaveBeenCalledWith(null, '', newPath);
    });
  });

  it('decodes base64 encoded endpoint and displays it', () => {
    const encodedSegment = btoa('encodedEndpoint');
    (usePathname as Mock).mockReturnValue(`/restfullClient/en/GET/${encodedSegment}`);
    render(
      <LanguageProvider lang="en">
        <EndpointInput />
      </LanguageProvider>
    );
    expect(screen.getByLabelText('URL')).toHaveValue('encodedEndpoint');
  });
});

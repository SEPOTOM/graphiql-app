import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import EndpointInput from './EndpointInput';
import { LanguageProvider } from '@/contexts';
import { encodeToBase64 } from '@/services';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('EndpointInput component', () => {
  it('renders correctly with the initial endpoint selected based on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/en/PATCH/cXdlcnR5');
    render(
      <LanguageProvider lang="en">
        <EndpointInput />
      </LanguageProvider>
    );
    expect(screen.getByLabelText('URL')).toHaveValue('qwerty');
  });

  it('updates URL when a new endpoint is entered', async () => {
    (usePathname as Mock).mockReturnValue('/en/GET');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());
    const user = userEvent.setup();

    const screen = render(
      <LanguageProvider lang="en">
        <EndpointInput />
      </LanguageProvider>
    );

    const input = screen.getByLabelText('URL');
    const endpoint = 'newEndpoint';
    const calls = mockReplaceState.mock.calls;

    await user.type(input, endpoint);

    endpoint.split('').forEach((_, index) => {
      const partialEndpoint = endpoint.slice(0, index + 1);
      const encodedEndpoint = encodeToBase64(partialEndpoint);
      const expectedPath = `/en/GET/${encodedEndpoint}?`;

      expect(calls[index]).toEqual([null, '', expectedPath]);
    });

    expect(calls.length).toBe(endpoint.length);
  });

  it('decodes base64 encoded endpoint and displays it', () => {
    const encodedSegment = btoa('encodedEndpoint');
    (usePathname as Mock).mockReturnValue(`/en/GET/${encodedSegment}`);
    render(
      <LanguageProvider lang="en">
        <EndpointInput />
      </LanguageProvider>
    );
    expect(screen.getByLabelText('URL')).toHaveValue('encodedEndpoint');
  });
});

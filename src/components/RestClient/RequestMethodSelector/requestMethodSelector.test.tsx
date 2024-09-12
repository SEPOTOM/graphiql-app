import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services';
import { Method } from '@/types';
import RequestMethodSelector from './RequestMethodSelector';
import { LanguageProvider } from '@/contexts';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('RequestMethodSelector component', () => {
  it('renders correctly with the initial method selected based on the current URL', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru/PATCH');

    render(
      <LanguageProvider lang="en">
        <RequestMethodSelector />
      </LanguageProvider>
    );

    await waitFor(() => expect(screen.getByText(Method.Patch)).toBeInTheDocument());
  });

  it('component handles cases where the pathname does not contain a method segment', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/en');

    render(
      <LanguageProvider lang="en">
        <RequestMethodSelector />
      </LanguageProvider>
    );

    await waitFor(() => expect(screen.getByText(Method.Get)).toBeInTheDocument());
  });

  it('selecting a different method updates the state and URL', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru/GET');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());
    const mockGetNewMethodPath = vi.spyOn(services, 'getNewMethodPath');
    const newMethod = Method.Post;
    const user = userEvent.setup();

    render(
      <LanguageProvider lang="en">
        <RequestMethodSelector />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(Method.Get)).toBeInTheDocument();
    });

    user.click(screen.getByLabelText('Method'));
    await waitFor(() => {
      user.click(screen.getByText(newMethod));
    });

    await waitFor(() => {
      expect(screen.getByText(newMethod)).toBeInTheDocument();
    });
    expect(mockReplaceState).toHaveBeenCalledWith(null, '', '/restfullClient/ru/POST?');
    expect(mockGetNewMethodPath).toHaveBeenCalledWith('/restfullClient/ru/GET', newMethod, Object.values(Method));
    mockGetNewMethodPath.mockRestore();
  });
});

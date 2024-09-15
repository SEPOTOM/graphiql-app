import { screen, waitFor } from '@testing-library/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services';
import { Method } from '@/types';
import RequestMethodSelector from './RequestMethodSelector';
import { renderWithLng, renderWithUserAndLng } from '@/tests';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('RequestMethodSelector component', () => {
  it('renders correctly with the initial method selected based on the current URL', async () => {
    (usePathname as Mock).mockReturnValue('/en/PATCH');

    renderWithLng(<RequestMethodSelector />);

    await waitFor(() => expect(screen.getByText(Method.Patch)).toBeInTheDocument());
  });

  it('selecting a different method updates the state and URL', async () => {
    (usePathname as Mock).mockReturnValue('/en/GET');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());
    const mockGetNewMethodPath = vi.spyOn(services, 'getNewMethodPath');
    const newMethod = Method.Post;

    const { user } = renderWithUserAndLng(<RequestMethodSelector />);

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
    expect(mockReplaceState).toHaveBeenCalledWith(null, '', '/en/POST?');
    expect(mockGetNewMethodPath).toHaveBeenCalledWith('/en/GET', newMethod, Object.values(Method));
    mockGetNewMethodPath.mockRestore();
  });
});

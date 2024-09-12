import { render, waitFor } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import { RestfullClient } from '@/components';
import { LanguageProvider } from '@/contexts';

const replace = vi.fn();
(useRouter as Mock).mockImplementation(() => ({
  replace,
}));

afterEach(() => {
  replace.mockRestore();
});

describe('RestfullClient component', () => {
  it('should set the method to GET if the URL has no method', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient');
    const mockedSearch = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockedSearch);

    render(
      <LanguageProvider lang="en">
        <RestfullClient />
      </LanguageProvider>
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/restfullClient/GET'));
  });
  it('should replace an invalid segment with GET', async () => {
    const encodedSegment = btoa('qwerty');
    (usePathname as Mock).mockReturnValue(`/restfullClient/ru/${encodedSegment}`);
    const mockedSearch = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockedSearch);

    render(
      <LanguageProvider lang="en">
        <RestfullClient />
      </LanguageProvider>
    );
    await waitFor(() => expect(replace).toHaveBeenCalledWith(`/restfullClient/ru/GET/${encodedSegment}`));
  });
  it('should not change the URL if a valid method is present', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru/GET');
    const mockedSearch = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockedSearch);

    render(
      <LanguageProvider lang="en">
        <RestfullClient />
      </LanguageProvider>
    );

    expect(replace).not.toHaveBeenCalled();
  });
});

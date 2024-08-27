import { render } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { Mock } from 'vitest';
import RestfullClient from './RestfullClient';

const replace = vi.fn();
(useRouter as Mock).mockImplementation(() => ({
  replace,
}));

afterEach(() => {
  replace.mockRestore();
});

describe('RestfullClient component', () => {
  it('should set the method to GET if the URL has no method', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient');
    render(<RestfullClient />);
    expect(replace).toHaveBeenCalledWith('/restfullClient/GET');
  });
  it('should replace an invalid ыупьуте with GET', () => {
    const encodedSegment = btoa('qwerty');
    (usePathname as Mock).mockReturnValue(`/restfullClient/${encodedSegment}`);

    render(<RestfullClient />);
    expect(replace).toHaveBeenCalledWith(`/restfullClient/GET/${encodedSegment}`);
  });
  it('should not change the URL if a valid method is present', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/GET');

    render(<RestfullClient />);
    expect(replace).not.toHaveBeenCalled();
  });
});

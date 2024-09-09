import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestBodyToggle, { RequestBodyToggleProps } from './RequestBodyToggle';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import { LanguageProvider } from '@/contexts';

describe('RequestBodyTypeSelector', () => {
  const setup = (props: Partial<RequestBodyToggleProps> = {}) => {
    const defaultProps: RequestBodyToggleProps = {
      bodyType: 'none',
      handleChange: vi.fn(),
      ...props,
    };

    return render(
      <LanguageProvider lang="en">
        <RequestBodyToggle {...defaultProps} />
      </LanguageProvider>
    );
  };

  (usePathname as Mock).mockReturnValue('/restfullClient/en/');

  it('calls handleChange when a new mode is selected', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    setup({ handleChange });

    await user.click(screen.getByLabelText('raw request body'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders the correct ToggleButton', () => {
    setup();

    expect(screen.getByLabelText('no request body')).toBeInTheDocument();
    expect(screen.getByLabelText('raw request body')).toBeInTheDocument();
  });
});

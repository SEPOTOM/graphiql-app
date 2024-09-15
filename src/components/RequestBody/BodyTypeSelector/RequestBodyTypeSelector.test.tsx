import { screen, waitFor } from '@testing-library/react';
import RequestBodyTypeSelector, { RequestBodyTypeSelectorProps } from './RequestBodyTypeSelector';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import { renderWithUserAndLng } from '@/tests';

describe('RequestBodyTypeSelector', () => {
  const setup = (props: Partial<RequestBodyTypeSelectorProps> = {}) => {
    const defaultProps: RequestBodyTypeSelectorProps = {
      bodytype: 'json',
      handleChange: vi.fn(),
      ...props,
    };

    return renderWithUserAndLng(<RequestBodyTypeSelector {...defaultProps} />);
  };

  (usePathname as Mock).mockReturnValue('/restfullClient/en');

  it('renders with the correct mode selected', async () => {
    setup({ bodytype: 'text' });

    await waitFor(() => {
      const select = screen.getByLabelText('Request body mode');

      expect(select).toHaveValue('text');
    });
  });

  it('calls handleChange when a new mode is selected', async () => {
    const handleChange = vi.fn();
    const { user } = setup({ handleChange });

    const select = screen.getByLabelText('Request body mode');

    await user.selectOptions(select, 'text');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders the correct options', async () => {
    setup();

    await waitFor(() => {
      const options = screen.getAllByRole('option');

      expect(options).toHaveLength(2);
      expect(options[0]).toHaveValue('json');
      expect(options[1]).toHaveValue('text');
    });
  });
});

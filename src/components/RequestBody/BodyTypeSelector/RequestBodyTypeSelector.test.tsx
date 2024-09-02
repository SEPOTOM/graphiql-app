import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestBodyTypeSelector, { RequestBodyTypeSelectorProps } from './RequestBodyTypeSelector';

describe('RequestBodyTypeSelector', () => {
  const setup = (props: Partial<RequestBodyTypeSelectorProps> = {}) => {
    const defaultProps: RequestBodyTypeSelectorProps = {
      mode: 'json',
      handleChange: vi.fn(),
      ...props,
    };

    return render(<RequestBodyTypeSelector {...defaultProps} />);
  };

  it('renders with the correct mode selected', () => {
    setup({ mode: 'text' });
    const select = screen.getByLabelText('Reques body mode');

    expect(select).toHaveValue('text');
  });

  it('calls handleChange when a new mode is selected', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    setup({ handleChange });
    const select = screen.getByLabelText('Reques body mode');

    await user.selectOptions(select, 'text');

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders the correct options', () => {
    setup();
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue('json');
    expect(options[1]).toHaveValue('text');
  });
});

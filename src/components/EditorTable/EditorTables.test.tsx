import { screen, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import EditorTable from './EditorTable';
import { GraphQlHeadersEditor } from '@/types';
import { mockedGraphQlEditorsRow } from '@/tests/mocks/mocks';
import { renderWithLng, renderWithUserAndLng } from '@/tests';

const mockSetData = vi.fn();

describe('Editors row', () => {
  it('should render editors row', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');
    renderWithLng(
      <EditorTable
        heading={GraphQlHeadersEditor.HeadersEditorEN}
        currentEditorData={mockedGraphQlEditorsRow}
        setCurrentEditorData={mockSetData}
      />
    );

    await waitFor(() => {
      const keyInput = screen.getByPlaceholderText('KEY');
      expect(keyInput).toBeInTheDocument();

      const valueInput = screen.getByPlaceholderText('VALUE');
      expect(valueInput).toBeInTheDocument();

      const checkBox = screen.getByRole('checkbox');
      expect(checkBox).toBeInTheDocument();
    });
  });

  it('Inputs should be worked good', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');
    const { user } = renderWithUserAndLng(
      <EditorTable
        heading={GraphQlHeadersEditor.HeadersEditorEN}
        currentEditorData={mockedGraphQlEditorsRow}
        setCurrentEditorData={mockSetData}
      />
    );

    await waitFor(async () => {
      const keyInput = screen.getByPlaceholderText('KEY');
      await user.type(keyInput, 'h');
      await waitFor(async () => {
        expect(mockSetData).toHaveBeenCalled();
      });
      const valueInput = screen.getByPlaceholderText('VALUE');
      await user.type(valueInput, 'h');
      await waitFor(async () => {
        expect(mockSetData).toHaveBeenCalled();
      });
    });
  });

  it('Checkbox should be worked good', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');
    const { user } = renderWithUserAndLng(
      <EditorTable
        heading={GraphQlHeadersEditor.HeadersEditorEN}
        currentEditorData={mockedGraphQlEditorsRow}
        setCurrentEditorData={mockSetData}
      />
    );

    await waitFor(async () => {
      const checkBox = screen.getByRole('checkbox');
      await user.click(checkBox);
      await waitFor(async () => {
        expect(mockSetData).toHaveBeenCalled();
      });
    });
  });
});

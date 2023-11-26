import userEvent from '@testing-library/user-event';
import { cleanup, screen, render } from '@testing-library/react';
import TopSection from '../src/components/TopSection/TopSection';
import mockRouter from 'next-router-mock';
import PageNumbersSection from '../src/components/PageNumbersSection/PageNumbersSection';
import BookDetails from '../src/components/BookDetails/BookDetails';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
afterEach(cleanup);

describe('next-router-mock', () => {
  it('Ensure the router was updated', async () => {
    mockRouter.push("/");
    render(<TopSection />);

    const user = userEvent.setup();
    const inputElement: HTMLInputElement = screen.getByTestId('searchbox');
    await user.clear(inputElement);
    await user.type(inputElement, 'hello');
    expect(inputElement.value).toBe('hello');
    await user.click(screen.getByTestId('submitButton'));
    expect(mockRouter).toMatchObject({
      pathname: '/1',
    });
  });

  it('Details was closed', async () => {
    mockRouter.push("/curentPage/test-id");
    render(
      <BookDetails
        id={'test-id'}
        title={'test-title'}
        covers={[123]}
        curentPage={'curentPage'}
      />
    );
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button'));
    expect(mockRouter).toMatchObject({
      pathname: '/curentPage',
    });
  });

    it('The router was updated after PageNumbersSection clicking', async () => {
      mockRouter.push("/1");
      render(
        <PageNumbersSection
          numFound={'175'}
          curentPage={'1'}
          booksPerPage={'4'}
          searchQuery={'red'}
        />
      );
      const user = userEvent.setup();
      screen.queryByRole('radio', {name: /10/i});
      await  user.click(screen.getByRole('radio', {name: /10/i}));
      screen.getByRole('radio', {name: /10/i});
      expect(mockRouter).toMatchObject({
        pathname: '/10',
      });
  
    });
})
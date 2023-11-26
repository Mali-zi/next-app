import userEvent from '@testing-library/user-event';
import { cleanup, screen, render } from '@testing-library/react';
import TopSection from '../src/components/TopSection/TopSection';
import PageNumbersSection from '../src/components/PageNumbersSection/PageNumbersSection';
import ResultSection from '../src/components/ResultSection/ResultSection';
import BookDetails from '../src/components/BookDetails/BookDetails';
import Book from '../src/components/Book/Book';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

afterEach(cleanup);

describe('TopSection', () => {
  it('Display the correct number of options', () => {
    render(<TopSection />);
    expect(screen.getAllByRole('option').length).toBe(3);
  });

  it('Display the title', () => {
    render(<TopSection />);
    expect(screen.findByText(/For Conan Doyle fans/i));
  });

  it('Display the text input', async () => {
    render(<TopSection />);
    screen.getByTestId('searchbox');
  });

  it('Display the default value 10', () => {
    render(<TopSection />);
    expect(screen.getByTestId(/selectedNumber/i)).toHaveValue('4');
  });

  it('Allow user to change item number per page', () => {
    render(<TopSection />);
    userEvent.selectOptions(screen.getByRole('combobox'), '4');
    const selectedNum = screen.getByText('10') as HTMLInputElement;
    expect(selectedNum.value).toBe('10');

    const selectedOption = screen.getByText(/10/i);
    const numSelect = screen.getByTestId(/selectedNumber/i);
    userEvent.selectOptions(
      // Find the select element, like a real user would.
      numSelect,
      // Find and select 20, like a real user would.
      [selectedOption]
    );
  });

  it('The form is sent with the correct input values', async () => {
    const user = userEvent.setup();

    render(<TopSection />);

    const inputElement: HTMLInputElement = screen.getByTestId('searchbox');
    await user.clear(inputElement);
    await user.type(inputElement, 'hello');
    expect(inputElement.value).toBe('hello');
    await user.click(screen.getByTestId('submitButton'));
    expect(screen.getByText('Form submitted')).toBeInTheDocument();
  });

  it('Empty searchbox error shown', async () => {
    const user = userEvent.setup();

    render(<TopSection />);
    const inputElement: HTMLInputElement = screen.getByTestId('searchbox');

    await user.clear(inputElement);
    await user.click(screen.getByTestId('submitButton'));
    expect(screen.getByText(/The query isn't valid/i)).toBeInTheDocument();
  });
});

describe('PageNumbersSection', () => {
  it('PageNumbersSection mounts properly', () => {
    const wrapper = render(
      <PageNumbersSection
        numFound={'175'}
        curentPage={'1'}
        booksPerPage={'4'}
        searchQuery={'red'}
      />
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.findByText(/3/i));
  });
});

describe('ResultSection', () => {
  it('ResultSection mounts properly', () => {
    const wrapper = render(<ResultSection />);
    expect(wrapper).toBeTruthy();
  });
});

describe('ResultSection', () => {
  it('ResultSection mounts properly', () => {
    const wrapper = render(<ResultSection />);
    expect(wrapper).toBeTruthy();
  });
});

describe('BookDetails', () => {
  it('An additional details are rendered', async () => {
    const wrapper = render(
      <BookDetails
        id={'test-id'}
        title={'test-title'}
        covers={[123]}
        curentPage={'1'}
      />
    );
    expect(wrapper.findByText(/test-id/i));
  });
});

const testBook = {
  key: 'test-key',
  title: 'test-key',
};

describe('Book', () => {
  it('Book mounts properly', () => {
    const wrapper = render(<Book book={testBook} />);
    expect(wrapper).toBeTruthy();
    expect(screen.queryByText(/Author/)).toBeInTheDocument();
  });
});

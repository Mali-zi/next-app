import Home from '../src/pages/index';
import userEvent from '@testing-library/user-event';
import { cleanup, screen, render } from '@testing-library/react';
import TopSection from '../src/components/TopSection/TopSection';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

afterEach(cleanup);

const ExampleComponent = ({ href = '' }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)}>
      The current route is: ${router.asPath}
    </button>
  );
}

describe('TopSection', () => {
  it('mocks the useRouter hook', () => {
    // Set the initial url:
    mockRouter.push("/initial-path");
    const user = userEvent.setup();
    
    // Render the component:
    render(<ExampleComponent href="/foo?bar=baz" />);
    expect(screen.getByRole('button')).toHaveTextContent (
      /The current route/i
    );

    // Click the button:
    user.click(screen.getByRole('button'));
    
    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({ 
      asPath: "/foo?bar=baz",
      pathname: "/foo",
      query: { bar: "baz" },
    });
  });

  it('Display the correct number of options', () => {
    render(<TopSection />);
    expect(screen.getAllByRole('option').length).toBe(3);
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

import React, { ErrorInfo, ReactNode } from 'react';

interface GreeterDefaultProps {}
export interface GreeterProps extends GreeterDefaultProps {
  children: ReactNode | ReactNode[]; 
}
interface GreeterState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}


type DefaultProps = Readonly<GreeterDefaultProps>; 
type Props = Readonly<GreeterProps>;
type State = Readonly<GreeterState>;

export default class ErrorBoundary extends React.Component<Props, State> {
  public static readonly defaultProps: DefaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="d-flex flex-column text-center text-danger p-4 m-4">
          <h2>Ooops! Something went wrong</h2>
          <h3>Try to reload the page...</h3>
          <p>{this.state.error.name}</p>
          <p>{this.state.error.message}</p>
          <p>{this.state.error.toString()}</p>

          <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

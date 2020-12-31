import * as React from 'react';

const withErrorBoundary = (
  Wrapped: React.ComponentType,
  Text: React.ComponentType,
  textGeneration = null
) =>
  class extends React.Component<any, any> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
      console.error(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            //@ts-ignore
          <Text error>
            {textGeneration
                //@ts-ignore
              ? textGeneration(this.props)
              : 'Something went wrong.'}
          </Text>
        );
      }

      return <Wrapped {...this.props} />;
    }
  };
export default withErrorBoundary;

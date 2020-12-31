import * as React from 'react';
const withErrorBoundary = (Wrapped, Text, textGeneration = null) => class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        console.error(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (React.createElement(Text, { error: true }, textGeneration
                ? textGeneration(this.props)
                : 'Something went wrong.'));
        }
        return React.createElement(Wrapped, Object.assign({}, this.props));
    }
};
export default withErrorBoundary;
//# sourceMappingURL=withErrorBoundary.js.map
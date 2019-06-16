## Contributing ✨

Thank you for considering contributing to Embla Carousel, contributions are welcome!

- [Code Style](#code-style)
- [New Features](#new-features)

### Code style
All code contributions should follow the current `code style`. Embla Carousel is written with `function factories` that expose an object containing a set of public methods. Note that the public method object should be flat and frozen. Below is an example:

```typescript
// Declare parameter types
type Params = {
    parameter: number
}

// Declare public method types
export type FunctionFactory = {
    publicMethod: () => number
}

// Declare a function factory
export function FunctionFactory(params: Params): FunctionFactory {
    const { parameter } = params
    const privateVariable = 10
    
    function publicMethod() {
        return parameter + privateVariable;
    }
    
    const self: FunctionFactory = {
        publicMethod
    }
    return Object.freeze(self)
}
```

### New features
For any new features it's important to follow this checklist:
- **`Discuss:`** Open an issue before starting any significant work. Let's discuss to see how the proposed feature fits within Embla Carousels's vision.
- **`Prettier:`** Make sure your editor adheres to prettier configuration files.
- **`Code style:`** Follow the current code style as described [here](#code-style).
- **`Create a Pull Request:`** Make sure your branch name follows this pattern `feature/branchname-goes-here`.

Your code will be used as part of an open source product if merged. By submitting a Pull Request, **you are giving your consent** for your code to be integrated into Embla Carousel as part of an open source product. 

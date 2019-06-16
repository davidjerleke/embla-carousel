## Contributing ✨

Thank you for considering contributing to Embla Carousel, contributions are welcome!

- [Code style](#code-style)
- [New features](#new-features)
- [Bug reports](#bug-reports)

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
    return parameter + privateVariable
  }

  const self: FunctionFactory = {
    publicMethod,
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

### Bug reports

All bug reports require a reduced test case. Providing a test case is the best way to get any issue addressed. It helps us all to understand the problem. Without this, your issue **may be closed**. Please follow this checklist:

- **`Test case:`** Create one by forking the following [CodeSandbox](https://codesandbox.io/s/embla-carousel-loop-false-oyols).
- **`Demonstrate:`** Make sure the test case clearly demonstrates the issue.
- **`Do not:`** Provide a link to a production site. That's not a test case.

Your code will be used as part of an open source product if merged. By submitting a Pull Request, **you are giving your consent** for your code to be integrated into Embla Carousel as part of an open source product.

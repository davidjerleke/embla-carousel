## Contributing

Thank you for considering contributing to Embla Carousel, contributions are welcome! When contributing, your code will be used as part of an open source product if merged. By submitting a Pull Request, **you are giving your permission** for your code to be integrated into Embla Carousel as part of an open source product.

- [Bug reports](#bug-reports)
- [New features](#new-features)
- [Code style](#code-style)

### Bug reports

All bug reports require a reduced test case. Providing a test case is the best way to get any issue addressed. It helps us all to understand the problem. Without this, your issue **may be closed**. Please follow this checklist:

- **`Test case:`** Create one by forking one of the CodeSandboxes on the [examples page](https://davidcetinkaya.github.io/embla-carousel/examples). If applicable, choose the most relevant one.
- **`Demonstrate:`** Make sure the test case clearly demonstrates the issue.
- **`Do not:`** Provide a link to a production site. That's not a test case.
- **`Create a Pull Request:`** If you want to solve the bug, please make sure the branch name follows this pattern `bug/branchname-goes-here`.

### New features

For any new features it's important to follow this checklist:

- **`Discuss:`** Open an issue before starting any significant work. Let's discuss to see how the proposed feature fits within Embla Carousels's vision.
- **`Prettier:`** Make sure your editor adheres to prettier configuration files.
- **`Code style:`** Follow the current code style as described [here](#code-style).
- **`Create a Pull Request:`** Please make sure the branch name follows this pattern `feature/branchname-goes-here`.

### Code style

All code contributions should follow the current `code style`. Embla Carousel is written with `function factories` that expose an object containing a set of public methods. Note that the public method object should be flat. Below is an example:

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
  const anotherPrivateVariable = 20

  function publicMethod(): number {
    return parameter + privateVariable
  }

  function anotherPublicMethod(): number {
    return parameter + anotherPrivateVariable
  }

  const self: FunctionFactory = {
    publicMethod,
    anotherPublicMethod,
  }
  return self
}
```

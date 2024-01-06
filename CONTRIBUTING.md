## Contributing

Thank you for considering contributing to Embla Carousel, contributions are welcome! When contributing, your code will be used as part of an open source product if merged. By submitting a Pull Request, **you are giving your permission** for your code to be integrated into Embla Carousel as part of an open source product.

- [Bug reports](#bug-reports)
- [New features](#new-features)
- [Documentation](#documentation)
- [Code style](#code-style)

### Bug reports

All bug reports require a reduced test case. Providing a test case is the best way to get any issue addressed. It helps us all to understand the problem. Without this, your issue **may be closed**. Please follow this checklist:

- **`Test case:`** Create one by forking one of the CodeSandboxes on the [examples page](https://www.embla-carousel.com/examples/). If applicable, choose the most relevant one.
- **`Test case exceptions:`** In rare cases a CodeSandbox might not be possible to provide. If this is the case, make sure to provide an alternative source like a GitHub repository or similar.
- **`Demonstrate:`** Make sure the test case clearly demonstrates the issue.
- **`Do not:`** Provide a link to a production site. That's not a test case.
- **`Create a Pull Request:`** If you want to solve the bug yourself, please make sure the branch name follows this pattern `bug/branchname-goes-here`.

### New features

For any new features it's important to follow this checklist:

- **`Discuss:`** Open an issue before starting any significant work. Let's discuss to see how the proposed feature fits within Embla Carousels's vision.
- **`Prettier:`** Make sure your editor adheres to prettier configuration files.
- **`Code style:`** Follow the current code style as described [here](#code-style).
- **`Create a Pull Request:`** Please make sure the branch name follows this pattern `feature/branchname-goes-here`.

### Documentation

The documentation website is generated using [gatsby](https://github.com/gatsbyjs/gatsby). All the content of the docs lives inside [`/packages/embla-carousel-docs`](https://github.com/davidjerleke/embla-carousel/tree/master/packages/embla-carousel-docs).

> [!IMPORTANT]  
> Make sure your node version is equal to the one in [.nvmrc](https://github.com/davidjerleke/embla-carousel/blob/master/.nvmrc). You can use [`nvm`](https://github.com/nvm-sh/nvm) to easily install different node versions and switch between them with ease.

To develop the docs locally follow these steps:

- Run `yarn install`in the root directory to install dependencies.
- Run `yarn build` to build the docs (and all other packages).
- Run `yarn start` to start the dev environment of the docs at `localhost:8000`.
- Make sure the `.mdx` file you're working on has a header formatted like this:

```
---
title: [Page title here]
description: [Page description here].
order: [Page order here (a number)]
date: [Page last updated date (e.g. 2023-12-20)]
---
```

### Code style

All code contributions should follow the current `code style`. Please take your time to understand the current setup and don't introduce new styles that clearly deviates from the project `code style`.

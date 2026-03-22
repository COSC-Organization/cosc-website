# Contributing to COSC

Thank you for your interest in contributing! We welcome contributions from everyone, regardless of experience level. This guide will walk you through how to contribute to this repository.

> [Code of Conduct](./CODE_OF_CONDUCT.md) | [README](./README.md)

---

## Contribution Workflow

### 1. Fork the Repository

Click the **Fork** button on the top right of the [repository page](https://github.com/COSC-Organization/cosc-website.git) to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/cosc-website.git
cd cosc-website
```

### 3. Create a Branch

Always create a new branch for your changes — never work directly on `main`.
```bash
git checkout -b your-branch-name
```

Use a descriptive branch name, for example:
- `docs/update-readme`
- `fix/navbar-alignment`
- `feature/add-events-page`

### 4. Install Dependencies
```bash
npm install
```

### 5. Make Your Changes

Make your changes locally and test them by running the development server:
```bash
npm run dev
```

### 6. Commit Your Changes

Write clear, descriptive commit messages using the [Conventional Commits](https://www.conventionalcommits.org/) format:
```bash
git commit -m "type: short and clear description of what you changed, added or improved"
```

**Common types:**
| Type | Use when... |
|---|---|
| `feature` | Adding a new feature |
| `fix` | Fixing a bug |
| `docs` | Updating documentation |
| `style` | Formatting changes (no logic change) |
| `refactor` | Code restructuring |

**Examples:**
```
docs: add English contributing guide
fix: correct broken link in footer
feature: add events section to homepage
```

### 7. Push to Your Fork
```bash
git push origin your-branch-name
```

### 8. Open a Pull Request

Go to the original repository on GitHub. You will see a **"Compare & pull request"** banner — click it.

In your PR description:
- Reference the issue it closes: `Closes #issue-number`
- Briefly describe what you changed and why
- Keep PRs focused — one change per PR is ideal

---

## 🔧 Pre-commit Hooks

This project uses pre-commit hooks to maintain code quality. They run automatically when you commit.

| Tool | Purpose |
|---|---|
| [Husky](https://typicode.github.io/husky/) | Manages Git hooks |
| [Prettier](https://prettier.io/) | Automatic code formatting |
| [ESLint](https://eslint.org/) | Catches code errors and enforces style |

If your commit is blocked, it means Prettier or ESLint found an issue. Fix the reported errors and try committing again.

You can also run them manually:
```bash


# Lint code
npm run lint
```

---

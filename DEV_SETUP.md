# Buyer Web Developer Setup Guide

Hello Precious,

You have been added to the buyers repository.

Please accept the GitHub invite, then run:

```bash
git clone https://github.com/cycodedconcept/buyers-web.git
```

Enter the project folder:

```bash
cd buyers-web
```

Switch to the development branch:

```bash
git checkout develop
```

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## When You Make Changes

Before starting work, always pull the latest changes:

```bash
git pull origin develop
```

After making your changes, push like this:

```bash
git status
git add .
git commit -m "Describe work done"
git push origin develop
```

Please do not push directly to `main`.

Push only to the `develop` branch.

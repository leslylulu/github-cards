# GitHub Cards Generator

A web application that generates beautiful, customizable GitHub profile cards in various layouts. Display your GitHub stats, repositories, languages, and pull requests in a shareable card format.

![GitHub Cards Preview](/public/og-image.png)

## Features

- **Multiple Card Layouts**: Choose between Classic, Receipt, or Terminal layouts
- **Customization Options**: Toggle visibility of bio, stats, languages, repositories, and pull requests
- **Dark Mode Support**: Switch between light and dark themes
- **Download as Image**: Save your card as a PNG image for sharing
- **Responsive Design**: Works on both desktop and mobile devices

## API Usage

GitHub Cards is powered by the GitHub REST API, which provides free access to public GitHub data. The application uses several endpoints including:

- User information: `/users/{username}`
- Repositories: `/users/{username}/repos`
- Pull requests: `/search/issues?q=author:{username}+type:pr`

The API is rate-limited to 60 requests per hour for unauthenticated users, which is sufficient for basic usage of this application.

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yourusername/github-cards.git
cd github-cards
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [React](https://reactjs.org) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [html-to-image](https://www.npmjs.com/package/html-to-image) - Card image generation
- [React Icons](https://react-icons.github.io/react-icons/) - Icon components
- [TypeScript](https://www.typescriptlang.org) - Type safety

## Layouts

### Classic
![Classic Layout](/public/og-classic-layout.png)

### Receipt
![Receipt Layout](/public/og-receipt-layout.png)

### Terminal
![Terminal Layout](/public/og-terminal-layout.png)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any ideas for improvements.


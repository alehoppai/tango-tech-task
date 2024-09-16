# TANGO Tech Task: Dad Joke Search

This project is a Next.js application that allows users to search for dad jokes using the icanhazdadjoke API.

## TODO:
- Not all covered with unit tests properly (e.g. InputIndicator, and some cases for other tests)
- i18n is missing
- CI/CD for deploy is missing (however next build with export is working, checked on local nginx)
- Sometimes naming convention in tests isn't common for all test files 
- Popup might seem hard to understand because of animations timeout (especially when never dealt with onAnimationEnd)
- "Messy" components directory, each component might take it's own dir with index.ts for export required module parts.
- Accessibility and responsiveness not presented in this project :C.

## API

The application uses the following API endpoint:

```
GET https://icanhazdadjoke.com/search
Accept: text/plain
```

## Tech Stack

- Next.js
- TypeScript
- Vitest or Jest + @testing-library/react
- CSS (custom styles)
- Fetch API
- Hero Icons (React package)
- use-debounce

## Project Structure

```
/
├── app/
├── components/
├── hooks/
├── utils/
├── styles/
└── out/
```


### Components

- Input
- Popup
- List & ListItem
- ComboBox (combination of the above)

### Hooks

- `useGet`
  - Manages loading state, error handling, and data fetching
- `useJokes`
  - Manages jokes, selected joke, and search text state

### Utils

- Fetch utility pre-populated with header and API URL

## Styling

The application uses custom CSS with a dark mode theme. Utility classes similar to Tailwind CSS are implemented for:

- Color scheme (blue for outlines, hover, selected text, and borders)
- Dark blue for background
- Faded blue for selected background items
- Text truncation
- Border radius
- Padding
- Flex-based layout control

NIT: I don't like BEM approach, that's why I chosed this one.

## Development Choices

To align with the evaluation criteria focusing on expertise in HTML5, Web APIs, CSS, and external API calls, the following choices were made:

- Custom CSS instead of Tailwind
- Fetch API instead of Axios
- Custom fetch hook instead of TanStack Query

## Additional Dependencies

- Hero Icons (React package) for chevron and arrow path icons
- use-debounce for input debouncing

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

```
npm test
```

## Deploy

This project is configured for static site generation using Next.js's `export` feature. To deploy:

1. Build the project:
   ```
   npm run build
   ```

2. The exported static files will be in the `out` directory.

3. Deploy the contents of the `out` directory to your preferred static hosting service (e.g., Nginx, Apache, Vercel, Netlify, or Amazon S3).

For example, to deploy to an Nginx server:

1. Copy the contents of the `out` directory to your Nginx web root (e.g., `/var/www/html`).
2. Configure Nginx to serve the static files.
3. Restart Nginx.



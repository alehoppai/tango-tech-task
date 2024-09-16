# TANGO Tech Task: Dad Joke Search

This project is a Next.js application that allows users to search for dad jokes using the icanhazdadjoke API.

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

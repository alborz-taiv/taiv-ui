import type { Preview } from '@storybook/react-vite';
import '../.storybook/global.css';
import { create } from 'storybook/theming';

const preview: Preview = {
  parameters: {
    docs: {
      theme: create({
        base: 'light',
        fontBase: 'Poppins, sans-serif',
      }),
    },
    options: {
      showToolbar: false,
      storySort: {
        order: ['Getting Started', ['Introduction', 'Setup With Your Project', 'How to Contribute', 'Helpful Links'], 'Design', 'Hooks', 'Components', 'Typography', 'Layouts'],
        method: 'alphabetical',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

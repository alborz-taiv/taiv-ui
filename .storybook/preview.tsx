import type { Preview } from '@storybook/react-vite';
import '../.storybook/global.css';
import { create } from 'storybook/theming';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { NotificationProvider } from '../src/components/Info/Notifications/NotificationProvider/NotificationProvider';
import { ModalProvider } from '../src/components/Info/Modals/ModalProvider/ModalProvider';
import React from 'react';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return (
          <>
            <NotificationProvider />
            <Story />
          </>
        );
      }

      return (
        <ModalProvider>
          <NotificationProvider />
          <Story />
        </ModalProvider>
      );
    },
  ],
  parameters: {
    docs: {
      container: (props: any) => (
        <DocsContainer {...props}>
          <ModalProvider>
            <NotificationProvider />
            {props.children}
          </ModalProvider>
        </DocsContainer>
      ),
      theme: create({
        base: 'light',
        fontBase: 'Poppins, sans-serif',
      }),
    },
    options: {
      showToolbar: false,
      storySort: {
        order: ['Getting Started', ['Introduction', 'Setup', 'Frontend Standards', 'How to Contribute', 'Helpful Links'], 'Design', 'Hooks', 'Components', 'Typography', 'Layouts'],
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

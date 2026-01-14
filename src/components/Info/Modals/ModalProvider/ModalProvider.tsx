import React from 'react';
import { ModalsProvider } from '@mantine/modals';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalsProvider
      modalProps={{
        centered: true,
        overlayProps: {
          opacity: 0,
          blur: 4,
        },
        transitionProps: {
          transition: 'pop',
          duration: 200,
        },
      }}
    >
      {children}
    </ModalsProvider>
  );
};

import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: '<img src="../src/assets/text-logo.png" width="100" height="auto" alt="Taiv UI"/>',
    brandTarget: '_self',
    fontBase: 'Poppins, sans-serif',
  }),
});

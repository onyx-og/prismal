import { addons } from '@storybook/manager-api';
import Theme from './customTheme';

// window.STORYBOOK_GA_ID = "UA-000000-01"
// window.STORYBOOK_REACT_GA_OPTIONS = {}

addons.setConfig({
  theme: Theme,
});
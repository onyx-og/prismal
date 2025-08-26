import { addons } from '@storybook/manager-api';
import Theme from './customTheme';

window.STORYBOOK_GA_ID = "G-E5KWBPH17H"
window.STORYBOOK_REACT_GA_OPTIONS = {}

addons.setConfig({
  theme: Theme,
});
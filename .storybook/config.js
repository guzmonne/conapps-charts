import { configure } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

function loadStories() {
  require('../src/_stories');
}

setOptions({
  name: 'Conapps Charts',
  url: 'https://github.com/guzmonne/conapps-charts',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: true,
});

configure(loadStories, module);

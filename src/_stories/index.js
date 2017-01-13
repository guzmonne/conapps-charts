import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs'
import ChartStory from './ChartStory.js';

const stories = storiesOf('Storybook Knobs', module)

stories.addDecorator(withKnobs)

stories.add('BarChart', () => (
  <ChartStory />
))

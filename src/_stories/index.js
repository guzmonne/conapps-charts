import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs'
import LineChartStory from './LineChartStory.js';

const stories = storiesOf('Storybook Knobs', module)

stories.addDecorator(withKnobs)

stories
  .add('LineChart', () => (
    <LineChartStory />
  ))
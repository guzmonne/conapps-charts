import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs'
import LineChartTimeScaleStory from './LineChartTimeScaleStory.js';
import LineChartLinearScaleStory from './LineChartLinearScaleStory.js';

const lineChartStories = storiesOf('LineChart', module)

lineChartStories.addDecorator(withKnobs)

lineChartStories
  .add('LineChart with linear scale', () => (
    <LineChartLinearScaleStory />
  ))
  .add('LineChart with time scale', () => (
    <LineChartTimeScaleStory />
  ))

const barChartStories = storiesOf('BarChart', module)

barChartStories
  .add('BarChart with bandScale', () => (
    <button type="button">Hello, World!</button>
  ))
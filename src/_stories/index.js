import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs'
// LineChart Stories
import LineChartTimeScaleStory from './LineChartTimeScaleStory.js';
import LineChartLinearScaleStory from './LineChartLinearScaleStory.js';
// BarChart Stories
import BarChartStory from './BarChartStory.js'
import BarHistogramTimeScaleStory from './BarHistogramTimeScaleStory.js'
import BarHistogramLinearScaleStory from './BarHistogramLinearScaleStory.js'
import LineHistogramTimeScaleStory from './LineHistogramTimeScaleStory.js'

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

barChartStories.addDecorator(withKnobs)

barChartStories
  .add('BarChart with band scale', () => (
    <BarChartStory />
  ))

const histogramStories = storiesOf('Histogram', module)

histogramStories.addDecorator(withKnobs)

histogramStories
  .add('Bar histogram with time scale', () => (
    <BarHistogramTimeScaleStory />
  ))
  .add('Bar histogram with linear scale', () => (
    <BarHistogramLinearScaleStory />
  ))
  .add('Line histogram with time scale', () => (
    <LineHistogramTimeScaleStory />
  ))

import React from 'react'
import ReactDomServer from 'react-dom/server'
import AutoScalingText from '../auto-scaling-text'

test('renders', () => {
  ReactDomServer.renderToString(<AutoScalingText />)
})

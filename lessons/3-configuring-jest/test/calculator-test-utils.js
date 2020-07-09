import React from 'react'
import {ThemeProvider} from 'emotion-theming'
import {render as rtlRender} from '@testing-library/react'
import PropTypes from 'prop-types'
import * as themes from '../src/themes'

function render(ui, options = {theme: themes.dark}) {
  const Wrapper = ({children}) => {
    return <ThemeProvider theme={options.theme}>{children}</ThemeProvider>
  }

  Wrapper.propTypes = {
    children: PropTypes.node,
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

export {render}
export * from '@testing-library/react'

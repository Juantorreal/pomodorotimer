import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/themes/default'
import { GlobalStyle } from '../styles/themes/global'
import { Router } from './Router'

export function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={defaultTheme}>
       <Router/>


    <GlobalStyle/>
    </ThemeProvider>
    </BrowserRouter>


  )
}



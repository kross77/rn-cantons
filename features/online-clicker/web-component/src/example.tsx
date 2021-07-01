import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Clicker from './index'
import useClicker, { RenderOnly } from './useClicker'
import useConfig from './useConfig'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const App = () => {
  const clicker = useClicker({
    settingsTableName: 'navalny_clicks_settings',
    clickTableName: 'navalny_clicks',
  })
  return (
    <Wrapper className="clicker-wrapper">
      <Clicker couldClick={clicker.couldClick} click={clicker.click} total={clicker.total} totalUsers={1000} />
    </Wrapper>
  )
}

const Logic = () => {
  const config = useConfig()
  return (
    <RenderOnly
      condition={config !== null}
      preloader={
        <div>
          <h1>Preloading</h1>
        </div>
      }
    >
      <App />
    </RenderOnly>
  )
}

ReactDOM.render(<Logic />, document.getElementById('root'))

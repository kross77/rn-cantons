import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Clicker from './index'
import useClicker from "./useClicker";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const App = () => {
    const clicker = useClicker({
        settingsTableName: "navalny_clicks_settings",
        clickTableName: "navalny_clicks",
    })
  return (
    <Wrapper className="clicker-wrapper">
      <Clicker
        click={clicker.click}
        total={clicker.total}
        totalUsers={1000}
      />
    </Wrapper>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

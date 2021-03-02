import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TotalTitle = styled.h2``
const TotalUsers = styled.h2``
const ClickButton = styled.button``

interface OnlineClicker {
  click: () => void
  total: number
  totalUsers: number
}

const OnlineClicker = ({ click, total, totalUsers }: OnlineClicker) => {
  return (
    <Wrapper className="clicker-wrapper">
      <TotalTitle className="clicker-total-count">{total}</TotalTitle>
      <TotalUsers className="clicker-total-users">{totalUsers}</TotalUsers>
      <ClickButton className="clicker-button" onClick={click}>
        Click
      </ClickButton>
    </Wrapper>
  )
}

export default OnlineClicker

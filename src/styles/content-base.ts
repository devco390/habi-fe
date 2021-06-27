import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
export const Title = styled.h1`
  padding: 0;
  text-transform: capitalize;
`

export const WrapperAction = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 950px;
`
export const Filters = styled.div`
  padding-left: 1rem;
  padding-bottom: 1rem;
`
export const WrapperGrid = styled.div`
  padding: 1rem;
  height: 300px;
  width: 950px;
  &.orders {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
    overflow: auto;
    width: 850px;
  }
`

import styled from 'styled-components'

export const Wrapper = styled.form``

export const Content = styled.div`
  display: grid;
  grid-template-areas: 'control bill';
  grid-template-columns: 460px 460px;
  gap: 1.5rem;
  height: 400px;
  box-sizing: border-box;
`

export const WrapperControl = styled.div`
  grid-area: control;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
  border-radius: 1rem;
  padding: 1rem;
  > div {
    max-height: 312px;
    overflow: auto;
  }
  > h1 {
    padding: 1rem 0;
  }
`
export const WrapperBill = styled.div`
  grid-area: bill;
`

export const Actions = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem 0;
`

export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
`

import styled from 'styled-components'

export const Wrapper = styled.form``

export const WrapperInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
  padding: 1.5rem 0;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      padding-right: 1rem;
    }
  }
`

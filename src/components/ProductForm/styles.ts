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

export const WrapperGrid = styled.div`
  padding: 1rem;
  height: 300px;
`
export const TitleAdd = styled.h2`
  padding: 0 1rem;
`

export const WrapperChips = styled.div`
  padding: 0 1rem 1rem 1rem;
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`

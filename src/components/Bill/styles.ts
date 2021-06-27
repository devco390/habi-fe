import styled, { css } from 'styled-components'

export const Bill = styled.div`
  background: #ffffff;
  width: 100%;
  height: 100%;
  padding: 1rem;
`
export const BillInfo = styled.div`
  ${({ theme }) => css`
    ${theme.typography.extraSmall}
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #ccc dashed;
    padding: 0.5rem 0;
  `}
`
export const BillHeader = styled.div`
  ${({ theme }) => css`
    ${theme.typography.extraSmall}
  `}
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 60px 180px 1fr 1fr;
  &.header {
    padding: 0.5rem 0;
  }
`
export const BillBody = styled.div`
  padding: 1rem;
`
export const BillCategories = styled.div`
  max-height: 200px;
  overflow: auto;
  padding-bottom: 1rem;
`

export const BillProductsWrapper = styled.div`
  h2 {
    padding: 1rem 0 0.5rem 0;
  }
`

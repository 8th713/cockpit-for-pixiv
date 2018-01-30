import styled from 'styled-components'

export const Cell = styled.div`
  display: flex;

  .rtl > &:nth-child(odd) {
    grid-column: 2;
    justify-self: start;
    align-self: start;
  }

  .rtl > &:nth-child(even) {
    grid-column: 1;
    justify-self: end;
    align-self: start;
  }

  .ltr > &:nth-child(odd) {
    justify-self: end;
    align-self: start;
  }

  .ltr > &:nth-child(even) {
    justify-self: start;
    align-self: start;
  }
`

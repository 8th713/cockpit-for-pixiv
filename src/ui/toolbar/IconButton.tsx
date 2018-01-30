import styled from 'styled-components'

export const IconButton = styled.button`
  outline: none;
  cursor: pointer;
  user-select: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;

  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;

  background-color: transparent;
  color: inherit;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:disabled {
    background-image: none !important;
    color: rgba(255, 255, 255, 0.3);
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transform: scale(0);
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:focus::after {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(0.75);
  }
`

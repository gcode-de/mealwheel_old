import styled from "styled-components";

export default function Box() {
  return <StyledBox href=""></StyledBox>;
}

const StyledBox = styled.div`
  width: 42px;
  height: 42px;
  background-color: var(--color-component);
  box-shadow: 4px 8px 16px 0px rgb(0 0 0 / 20%);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

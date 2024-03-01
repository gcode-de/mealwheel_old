import styled from "styled-components";
import Link from "next/link";

export default function Box() {
  return <StyledBox></StyledBox>;
}

const StyledBox = styled(Link)`
  width: 42px;
  height: 42px;
  /* background-color: var(--color-background); */
  box-shadow: 4px 8px 16px 0px rgb(0 0 0 / 20%);
  border-radius: 100%;
`;

import styled from "styled-components";

export default function CardSkeleton() {
  return <StyledCardSkeleton></StyledCardSkeleton>;
}

const StyledCardSkeleton = styled.li`
  background-color: var(--color-lightgrey);
  list-style-type: none;
  width: 333px;
  height: 123px;
  margin: 1.25rem 0 0 0;
  border-radius: 20px;
  z-index: 2;
  border: 1px solid var(--color-lightgrey);
  opacity: 0.3;
  box-shadow: 0 0 8px rgb(0 0 0 / 50%);
`;

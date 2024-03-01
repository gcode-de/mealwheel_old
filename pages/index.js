import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import styled from "styled-components";
import useSWR from "swr";

export default function HomePage() {
  const { data, error, isLoading } = useSWR(`/api/recipes`);

  console.log(data);

  if (error) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <>
      <StyledHeader>
        <StyledH1>Meal Wheel 🥗</StyledH1>
        {/* <StyledHeaderDiv>
          <StyledButton>add recipe</StyledButton>
          <StyledButton>filter</StyledButton>
        </StyledHeaderDiv> */}
      </StyledHeader>
      <StyledArticle>
        <StyledUl>
          {data.map((recipe) => {
            return (
              <Fragment key={recipe._id}>
                <StyledLink href={`/recipe/${recipe._id}`}>
                  <StyledCard>
                    <StyledImage
                      src={recipe.imageLink}
                      alt={recipe.title}
                      height={123}
                      width={123}
                    />
                    <StyledDiv>
                      <StyledPTitle>{recipe.title}</StyledPTitle>
                      <StyledPDuration>
                        {recipe.duration} MIN |{" "}
                        {recipe.difficulty.toUpperCase()}
                      </StyledPDuration>
                    </StyledDiv>
                  </StyledCard>
                </StyledLink>
              </Fragment>
            );
          })}
        </StyledUl>
      </StyledArticle>
    </>
  );
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
`;

const StyledH1 = styled.h1`
  align-self: left;
  font-size: 40px;
  padding-bottom: 0;
  border-bottom: 1px var(--color-darkgrey) solid;
  color: var(--color-darkgrey);
  width: 330px;
  margin: 0;
`;

// const StyledHeaderDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 20.75rem;
// `;

// const StyledButton = styled.button`
//   border: none;
//   background-color: transparent;
//   color: var(--color-shadow);
//   font-weight: bold;
//   font-size: 14px;
// `;

const StyledArticle = styled.article``;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

const StyledImage = styled(Image)`
  border-radius: 20px 0px 0px 20px;
`;

const StyledCard = styled.li`
  background-color: var(--color-component);
  list-style-type: none;
  margin: 1.25rem 0 0 0;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  z-index: 2;
  /* border: black solid 1px; */
  box-shadow: 0px 4px 8px 0px rgb(0 0 0 / 25%);
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 210px;
  height: 7.5;
`;

const StyledPTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 0;
  margin-left: 1.5rem;
  margin-top: 0;
`;
const StyledPDuration = styled.p`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 0;
  margin-left: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--darkgrey);
`;

// --color-background: #F5F5F5;
//     --color-shadow: #000000;
//     --color-highlight: #DF3F3F;
//     --color-component: #FFFFFF;
//     --color-darkgrey: #4D4A4A;
//     --color-lightgrey: #928F8F;

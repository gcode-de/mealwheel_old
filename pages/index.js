import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function HomePage() {
  const { data, error, isLoading } = useSWR(`/api/recipes`, fetcher);

  console.log(data);

  if (error) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <>
      <header>
        <h1>Meal Wheel 🥗</h1>
      </header>
      <StyledArticle>
        <StyledUl>
          {data.map((recipe) => {
            return (
              <>
                <StyledCard key={recipe._id}>
                  <StyledImage
                    src={recipe.imageLink}
                    alt={recipe.title}
                    height={123}
                    width={123}
                  />
                  <StyledDiv>
                    <p>
                      {recipe.title}
                      <br />
                      {recipe.duration} MIN | {recipe.difficulty}
                    </p>
                  </StyledDiv>
                </StyledCard>
              </>
            );
          })}
        </StyledUl>
      </StyledArticle>
    </>
  );
}

const StyledArticle = styled.article``;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 20px 0px 0px 20px;
`;

const StyledCard = styled.li`
  background-color: --color-component;
  list-style-type: none;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  z-index: 2;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 11.75rem;
  height: 7.5;
`;

// --color-background: #F5F5F5;
//     --color-shadow: #000000;
//     --color-highlight: #DF3F3F;
//     --color-component: #FFFFFF;
//     --color-darkgrey: #4D4A4A;
//     --color-lightgrey: #928F8F;

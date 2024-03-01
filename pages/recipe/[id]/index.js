import Box from "@/components/Styled/Box";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import ArrowSmall from "@/public/icons/ArrowSmall.svg";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DetailPage() {
  const [content, setContent] = useState("instructions");
  const router = useRouter();
  const { id } = router.query;

  const {
    data: recipe,
    isLoading,
    error,
  } = useSWR(`/api/recipes/${id}`, fetcher);

  if (error) {
    return <h1>error</h1>;
  }
  if (!recipe) {
    return <h1>not found</h1>;
  }

  const {
    _id,
    title,
    instructions,
    imageLink,
    tags,
    youtubeLink,
    ingredients,
    duration,
    difficulty,
  } = recipe;
  difficulty.toUpperCase();
  return (
    <Wrapper>
      <StyledBox>
        <Link href="/">
          <ArrowSmall width={30} height={30} />
        </Link>
      </StyledBox>
      <StyledImage
        src={imageLink}
        width={400}
        height={300}
        alt={`recipe Image ${title}`}
      />
      <StyledArticle>
        <h1>{title}</h1>
        <p>
          {duration} MIN | {difficulty}
        </p>
        <Styledh2>ingredients:</Styledh2>
        <StyledList>
          {ingredients.map((ingredient) => (
            <StyledListItem key={_id}>
              <StyledP>
                {ingredient.quantity} {ingredient.unit}
              </StyledP>
              <StyledP>{ingredient.name}</StyledP>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledHyper>
          <StyledLink
            href="#instructions"
            onClick={() => setContent("instructions")}
          >
            instructions
          </StyledLink>
          <StyledLink href="#video" onClick={() => setContent("video")}>
            video
          </StyledLink>
        </StyledHyper>
        {content === "instructions" && (
          <StyledIngredients>{instructions}</StyledIngredients>
        )}
        {content === "video" && (
          <iframe src={youtubeLink} width={300} height={160}></iframe>
        )}
      </StyledArticle>
    </Wrapper>
  );
}

const StyledArticle = styled.article`
  background-color: var(--color-component);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px 40px 0 0;
  padding-left: 3rem;
  padding-right: 3rem;
  position: relative;
  top: -40px;
  z-index: 3;
  padding-bottom: 2rem;
`;
const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  position: relative;
`;
const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem;
  width: 100%;
  border: 1px solid var(--color-lightgrey);
  border-radius: 20px;
`;
const StyledIngredients = styled.article`
  border: 1px solid var(--color-lightgrey);
  border-radius: 20px;
  padding: 1rem;
`;
const StyledBox = styled.div`
  background-color: white;
  position: absolute;
  z-index: 2;
  top: 0.5rem;
  left: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  box-shadow: 4px 8px 16px 0px rgb(0 0 0 / 8%);
`;
const StyledHyper = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-darkgrey);
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-darkgrey);
  font-size: large;
  font-weight: bold;

  &:hover {
    color: var(--color-highlight);
  }
`;
const StyledImage = styled(Image)`
  position: relative;
  top: 0;
`;
const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0;
`;
const Styledh2 = styled.h2`
  font-size: large;
  text-align: left;
  width: 100%;
`;
const StyledP = styled.p`
  margin: 0;
`;

import Box from "@/components/Styled/Box";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import ArrowSmall from "@/public/icons/ArrowSmall.svg";
import styled from "styled-components";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DetailPage() {
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
          <Svg />
        </Link>
      </StyledBox>
      <Image
        src={imageLink}
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        alt={`recipe Image ${title}`}
      />
      <StyledArticle>
        <h1>{title}</h1>
        <p>
          {duration} MIN | {difficulty}
        </p>
        <StyledHyper>
          <StyledLink href="#indredients">ingredients</StyledLink>
          <StyledLink href="#instructions">instructions</StyledLink>
          <StyledLink href="#video">video</StyledLink>
        </StyledHyper>
        <h4 id="ingredients">ingredients:</h4>
        <StyledList>
          {ingredients.map((ingredient) => (
            <li key={_id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </StyledList>
        <h4 id="instructions">instructions:</h4>
        <article>{instructions}</article>
        <h4 id="video">video:</h4>
        <Link href={youtubeLink}>youtube</Link>
      </StyledArticle>
    </Wrapper>
  );
}
const Svg = styled(ArrowSmall)`
  width: 30px;
  height: 30px;
`;
const StyledArticle = styled.article`
  background-color: var(--color-component);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px 40px 0 0;
  padding-left: 3rem;
  padding-right: 3rem;
`;
const Wrapper = styled.div`
  margin: auto;
  width: 100%;
`;
const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const StyledBox = styled.div`
  background-color: white;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  box-shadow: 4px 8px 16px 0px rgb(0 0 0 / 20%);
`;
const StyledHyper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-darkgrey);
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-darkgrey);

  &:hover {
    color: var(--color-highlight);
  }
`;

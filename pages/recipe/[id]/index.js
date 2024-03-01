import Box from "@/components/Styled/Box";

import { useRouter } from "next/router";
import useSWR from "swr";
import ArrowSmall from "@/public/icons/ArrowSmall.svg";
import styled from "styled-components";

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
  console.log(recipe);
  const {
    title,
    instructions,
    imageLink,
    tags,
    youtubeLink,
    ingredients,
    duration,
    difficulty,
  } = recipe;

  return (
    <>
      <Box href="/">
        <Svg width={20} height={20} />
      </Box>
      {/* <Image /> */}
      <h1>{title}</h1>
    </>
  );
}
const Svg = styled(ArrowSmall)`
  width: 20px;
  height: 20px;
`;

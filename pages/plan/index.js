import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import CardSkeleton from "@/components/Styled/CardSkeleton";
import generateWeekdays from "@/helpers/generateWeekdays";
import assignRecipesToWeekdays from "@/helpers/assignRecipesToWeekdays";

export default function Plan({ userId }) {
  const router = useRouter();
  const weekOffset = Number(router.query.week) || 0;
  const [weekdays, setWeekdays] = useState();
  const [numberOfRandomRecipes, setNumberOfRandomRecipes] = useState(2);

  useEffect(() => {
    setWeekdays(generateWeekdays(weekOffset));
  }, [weekOffset]);

  const {
    data: randomRecipes,
    isLoading,
    error,
  } = useSWR(`/api/recipes/random/7`);
  const { data: user } = useSWR(`/api/users/${userId}`);
  const userRecipes = user?.recipeInteractions
    .filter((recipe) => recipe.hasCooked)
    .map((recipe) => recipe.recipe);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setRecipes((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSliderChange = (event) => {
    setNumberOfRandomRecipes(parseInt(event.target.value, 10));
  };

  if (error) {
    return <div>error</div>;
  }

  if (isLoading) {
    return (
      <>
        User:
        <StyledHeader>
          <StyledH1>Meals Plan 🥗</StyledH1>
        </StyledHeader>
        <StyledArticle>
          <StyledUl>
            Loading Recipes...
            <CardSkeleton amount={5} $isLoading />
          </StyledUl>
        </StyledArticle>
      </>
    );
  }

  return (
    <>
      <StyledHeader>
        <StyledH1>Weekly Plan 🥗</StyledH1>
        <div>
          <Link href={`/plan?week=${weekOffset - 1}`}>⬅︎</Link>
          <Link href={`/plan?week=0`}>today</Link>
          <Link href={`/plan?week=${weekOffset + 1}`}>➡︎</Link>
        </div>
        <button
          onClick={() => {
            assignRecipesToWeekdays(
              setWeekdays,
              userRecipes,
              randomRecipes,
              numberOfRandomRecipes
            );
          }}
        >
          create plan
        </button>
        {weekdays && (
          <div>
            <input
              type="range"
              min="0"
              max={weekdays.length}
              value={numberOfRandomRecipes}
              onChange={handleSliderChange}
            />
            <p>Random Recipes: {numberOfRandomRecipes}</p>
          </div>
        )}
        {/* <div>
          <button
            onClick={() => {
              numberOfRandomRecipes > 0 &&
                setNumberOfRandomRecipes((prevN) => prevN - 1);
            }}
          >
            -
          </button>
          Random Recipes: {numberOfRandomRecipes}
          <button
            onClick={() => {
              numberOfRandomRecipes < weekdays.length &&
                setNumberOfRandomRecipes((prevN) => prevN + 1);
            }}
          >
            +
          </button>
        </div> */}
      </StyledHeader>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* <SortableContext
          items={weekdays.map((weekday) => weekday.date)}
          strategy={verticalListSortingStrategy}
        > */}
        {weekdays &&
          weekdays.map((weekday, index) => (
            <SortableItem key={weekday.date} id={weekday.date}>
              <h2>{weekday.readableDate}</h2>
              {weekday.recipe ? (
                <StyledLink href={`/recipe/${weekday.recipe._id}`}>
                  <StyledCard>
                    <StyledImage
                      src={weekday.recipe.imageLink}
                      alt={weekday.recipe.title}
                      height={123}
                      width={123}
                    />
                    <StyledDiv>
                      <StyledPTitle>{weekday.recipe.title}</StyledPTitle>
                      <StyledPDuration>
                        {weekday.recipe.duration} MIN |{" "}
                        {weekday.recipe.difficulty.toUpperCase()}
                      </StyledPDuration>
                    </StyledDiv>
                  </StyledCard>
                </StyledLink>
              ) : (
                <CardSkeleton text={"click create plan"} />
              )}
            </SortableItem>
          ))}
        {/* </SortableContext> */}
      </DndContext>
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

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

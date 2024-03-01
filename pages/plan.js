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

export default function WeekView() {
  const weekDays = getCurrentWeekDays();
  const recipes = useRandomRecipes();

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

  return (
    <>
      <StyledHeader>
        <StyledH1>Weekly Plan 🥗</StyledH1>
      </StyledHeader>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* <SortableContext
          items={recipes.map((recipe) => recipe._id)}
          strategy={verticalListSortingStrategy}
        > */}
        {recipes.map((recipe, index) => (
          <SortableItem key={recipe._id} id={recipe._id}>
            <h2>{weekDays[index]}</h2>
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
                    {recipe.duration} MIN | {recipe.difficulty.toUpperCase()}
                  </StyledPDuration>
                </StyledDiv>
              </StyledCard>
            </StyledLink>
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

function getCurrentWeekDays() {
  const now = new Date();
  const firstDayOfWeek =
    now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1); // Korrektur für Sonntag als ersten Tag der Woche
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(now.setDate(firstDayOfWeek + index));
    return day.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  });
  return weekDays;
}

function useRandomRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const response = await fetch(
        "http://localhost:3000/api/recipes/random/10"
      );
      const data = await response.json();
      // Extrahieren Sie die ersten 7 Rezepte aus der Antwort
      const weeklyRecipes = data.slice(0, 7);
      setRecipes(weeklyRecipes);
    }

    fetchRecipes();
  }, []); // Leeres Dependency-Array, damit die Anfrage nur beim Mounten der Komponente ausgeführt wird

  return recipes;
}

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

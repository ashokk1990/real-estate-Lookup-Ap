import styled from "styled-components";

// Helper function to convert pixels to rems (remy)
/**
 *
 * @param px
 * @returns {string}
 */
const remy = px => `${px / 16}rem`;

/**
 * Styled Components created from Simple Div
 */
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0.5rem;
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  justify-content: center;
  justify-items: stretch;
  padding-right: ${remy(15)};
  padding-left: ${remy(15)};
  margin-right: auto;
  margin-left: auto;
  max-width: 100%;

  // Breakpoint for Mobile Phone
  @media screen and (max-width: ${remy(540)}) {
    max-width: ${remy(540)};
    grid-template-columns: repeat(1, 1fr);
  }

  // Breakpoint for tablets
  @media screen and (max-width: ${remy(800)}) and (min-width: ${remy(540)}) {
    max-width: ${remy(540)};
    grid-template-columns: repeat(3, 1fr);
  }

  // Breakpoint for small desktops
  @media (min-width: ${remy(800)}) {
    max-width: ${remy(720)};
  }

  // Breakpoint for medium desktops
  @media (min-width: ${remy(992)}) {
    max-width: ${remy(9600)};
  }

  // Breakpoint for large desktops and HD devices
  @media (min-width: ${remy(1200)}) {
    max-width: ${remy(1140)};
  }
`;

export const GridBox = styled.div`
  width: 100%;
  padding: 5px;
  box-shadow: 0px 8px 0 rgba(29, 27, 27, 0.12);
  border-radius: 4px;
  transition: transform 0.5s ease-in-out;
  font-size: ${remy(20)};
  color: white;
  background-color: palevioletred;
  transition: transform .2s;
  &:hover{
    transform: scale(1.15);
  }
`;

import styled from "styled-components";

export const CategoryContainer = styled.div`
  /* border: solid 1px black; */
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export const CategoryItem = styled.button`
  font-family: "Quicksand", sans-serif !important;
  letter-spacing: 2px;
  background-color: white;
  text-transform: uppercase;
  width: 12%;
  min-width: 120px;
  border: solid 3px white;
  color: black;
  padding: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-bottom: 8px;
  transition-duration: 1s;
  cursor: pointer;

  &:hover {
    border-bottom: #1890ff solid 3px;
  }
`;

import styled from "styled-components";

export const CategoryItem = styled.button`
  background-color: white;
  width: 100px;
  border: solid 2px white;
  border-radius: 5px;
  color: black;
  padding: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 0 16px 8px 1px;
  transition-duration: 0.4s;
  cursor: pointer;
  &:hover {
    border: #1890ff solid 2px;
  }
`;

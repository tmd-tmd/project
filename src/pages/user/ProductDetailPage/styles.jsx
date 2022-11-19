import styled from "styled-components";
import { Form } from "antd";

export const Wrapper = styled.div`
  padding: 16px 0;
`;

export const ProductContent = styled.div`
  & img {
    width: 100%;
    height: auto;
  }
`;

export const CustomForm = styled(Form)`
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
`;

import styled from "styled-components";

import { Radio } from "antd";

export const Wrapper = styled.div`
  padding: 16px;
`;

export const RadioButton = styled(Radio.Button)`
  width: 110px;
  height: 50px;
  line-height: 50px;
  /* box-shadow: 1px 1px 3px #d7a5a5; */
  border-radius: 3px;
  text-align: center;
  margin: 8px;
  font-weight: 600;
`;

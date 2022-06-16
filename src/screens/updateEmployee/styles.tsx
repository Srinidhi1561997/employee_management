import styled from "styled-components";
import { device } from "../../utils/constants";

const Container = styled.div`
  .inputBox {
    margin-bottom: 20px;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 20px;
    @media ${device.mobileXS} {
      margin-left: 5px;
      margin-right: 5px;
    }
    @media ${device.mobileS} {
      margin-left: 20px;
      margin-right: 20px;
    }

    @media ${device.tablet} {
      margin-bottom: 20px;
      margin-left: 50px;
      margin-right: 50px;
      margin-top: 20px;
    }
    @media ${device.laptop} {
      margin-bottom: 20px;
      margin-left: 50px;
      margin-right: 50px;
      margin-top: 20px;
    }
  }
  .OuterDiv {
    display: flex;
    flex-direction: row;
    @media ${device.mobileS} {
      flex-direction: column;
    }
    @media ${device.mobileXS} {
      flex-direction: column;
    }
    @media ${device.mobileL} {
      flex-direction: column;
    }
    @media ${device.tablet} {
      flex-direction: row;
    }
    @media ${device.laptop} {
      flex-direction: row;
    }
  }
  .InnerDiv {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // background-color: red;
    padding: 10px;
    @media ${device.mobileS} {
      width: 100%;
      // background-color: pink;
    }
    @media ${device.mobileXS} {
      width: 100%;
      // background-color: red;
    }
    @media ${device.tablet} {
      width: 50%;
    }
    @media ${device.laptop} {
      width: 50%;
    }
  }
  .ErrorDiv {
    display: flex;
    flex-direction: column;
    // background-color:cyan;
    width: 100%;
  }
`;
const OuterDiv = styled.div`
  display: flex;
  flex-direction: row;
  @media ${device.mobileS} {
    flex-direction: column;
  }
  @media ${device.mobileXS} {
    flex-direction: column;
  }
  @media ${device.mobileL} {
    flex-direction: column;
  }
  @media ${device.tablet} {
    flex-direction: row;
  }
  @media ${device.laptop} {
    flex-direction: row;
  }
`;
const InnerDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  @media ${device.mobileS} {
    width: 100%;
  }
  @media ${device.mobileXS} {
    width: 100%;
  }
  @media ${device.tablet} {
    width: 50%;
  }
  @media ${device.laptop} {
    width: 50%;
  }
`;
const InputTitle = styled.label`
  font-weight: bold;
  // margin-bottom: 5px;
  display: inline;
  align-self: center;
  justify-content: center;
  // background-color: cyan;
  width: 40%;
`;

const Input = styled.input`
  height: 45px;
  width: 250px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #cccccc;
  padding-left: 15px;
  font-size: 16px;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
  width: 100%;
`;
const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  // background-color:cyan;
  width: 100%;
`;
const ContainerSpan = styled.span`
  .ErrorSpan {
    color: red;
    padding: 0;
    width: 100%;
  }
  .SpanAsterisk {
    color: red;
    font-size: 18px;
  }
`;

const Button = styled.button`
  height: 45px;
  width: 250px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #cccccc;
  padding-left: 15px;
  font-size: 16px;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
  width: 100%;
  background-color: #009933;
  color: #fff;
`;
// const SpanAsterisk = styled.span`
//   color: red;
//   font-size: 18px;
// `;
export default {
  Container,
  InputTitle,
  Input,
  OuterDiv,
  InnerDiv,
  Button,
  ErrorDiv,
  ContainerSpan,
};

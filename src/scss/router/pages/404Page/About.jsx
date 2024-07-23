import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 20%;
  border: none;
  padding: 15px 5px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(70, 42, 171);
    color: white;
  }
`;

function About() {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 100,
        fontWeight: "bold",
        marginTop: 50,
      }}
    >
      Not Found Page
      <div>
        <a href="/">
          <StyledButton
            style={{
              width: "20%",
              border: "none",
              padding: "15px 5px",
              fontSize: 20,
              fontWeight: "bold",
              borderRadius: 20,
            }}
          >
            홈으로 돌아가기
          </StyledButton>
        </a>
      </div>
    </div>
  );
}

export default About;

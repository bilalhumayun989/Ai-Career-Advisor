import { useState } from "react";
import { shape, string } from "prop-types";
import Container from "./common/container";
import Button from "./common/button";
import styled from "styled-components";

const Outro = ({ outro: { title, description }, submitAnswers }) => {
  const [answers, setAnswers] = useState();

  const convertAnswersToDomEls = (obj) => {
    const firstLetterCapital = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    const domEls = [];
    for (const prop in obj) {
      if (typeof obj[prop] === "object") {
        domEls.push(<h3 key={prop}>{firstLetterCapital(prop) + ":"}</h3>);
        domEls.push(convertAnswersToDomEls(obj[prop]));
        continue;
      }
      domEls.push(
        <h4 key={prop}>{firstLetterCapital(prop) + ": " + obj[prop]}</h4>
      );
    }
    return domEls;
  };

  return (
    <Container>
      <StyledOutro>
        <header>
          <h1>{title}</h1>
          <h4>{description}</h4>
        </header>
        {answers && <main>{answers}</main>}
        <footer>
          <Button
            text="Submit"
            onClick={() => {
              const answers = submitAnswers();
              setAnswers(convertAnswersToDomEls(answers));
            }}
          />
        </footer>
      </StyledOutro>
    </Container>
  );
};

Outro.propTypes = {
  outro: shape({
    title: string.isRequired,
    description: string,
  }),
};

export default Outro;

const StyledOutro = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 3em 1em 3em 1em;

  header {
    display: flex;
    flex-direction: column;
    padding: 1em;
    text-align: center;
    gap: 10px;
    transition: all 3s ease-in-out 3s;

    h1,
    h4 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h1 {
      font-weight: 700;
    }

    h4 {
      font-size: 1.1em;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-height: 80%;
    text-align: start;
    padding: 1em 2.7em 1em 2.7em;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    overflow-y: scroll;

    h3,
    h4 {
      width: 100%;
    }

    h3 {
      font-weight: bold;
    }
  }

  footer {
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

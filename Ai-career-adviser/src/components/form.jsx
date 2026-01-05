import { createContext } from "react";
// import styled from "styled-components";

import formSchema from "../schemas/form-prop-types";

import useMultiStepForm from "../hooks/use-multi-step-form";

import Group from "./group";
import Button from "./common/button";
import Outro from "./outro";
import Container from "./common/container";

const AnswerContext = createContext();

const Form = ({ form }) => {
  const {
    group,
    onNext,
    onPrevious,
    onAnswer,
    currentGroupAnswers,
    isLastGroup,
    submitAnswers,
    canNext,
  } = useMultiStepForm(form);

  console.log(canNext);

  if (isLastGroup) {
    return <Outro outro={form.outro} submitAnswers={submitAnswers} />;
  }

  return (
    <Container>
      <StyledForm>
        <header>
          <h1>{form.title}</h1>
          {form?.description && <h5>{form.description}</h5>}
        </header>
        <main>
          <AnswerContext.Provider value={{ onAnswer, currentGroupAnswers }}>
            <Group group={group} />
          </AnswerContext.Provider>
        </main>
        <footer>
          <Button onClick={onPrevious} text="Previous" />
          <Button onClick={onNext} disabled={!canNext} text="Next" />
        </footer>
      </StyledForm>
    </Container>
  );
};

Form.propTypes = { form: formSchema };

export { AnswerContext };
export default Form;

const StyledForm = styled.main`
  height: 100%;
  width: 100%;

  header {
    min-height: 10%;
    max-height: 10%;

    h1,
    h5 {
      width: 100%;
      opacity: 0.7;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }

    h1 {
      opacity: 1;
    }
  }

  main {
    width: 100%;
    min-height: 80%;
    max-height: 80%;
    overflow-y: scroll;
  }

  footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding-bottom: 1em;
    min-height: 15%;
    max-height: 15%;
  }
`;

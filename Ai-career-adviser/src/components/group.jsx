import styled from "styled-components";
import QuestionList from "./question/question-list";
import groupSchema from "../schemas/group-prop-types";

const Group = ({ group }) => {
  const { title, description, questions } = group;
  return (
    <StyledGroup>
      <header>
        {title && <h3>{title}</h3>}
        {description && <h5>{description}</h5>}
      </header>
      <main>
        <QuestionList questions={questions} />
      </main>
    </StyledGroup>
  );
};

Group.propTypes = { group: groupSchema };

export default Group;

const StyledGroup = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 1em;

  header {
    min-height: 10%;
    max-height: 10%;
    max-width: 100%;
    text-align: center;

    h3,
    h5 {
      opacity: 0.7;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h3 {
      opacity: 1;
    }
  }

  main {
    width: 100%;
    max-width: 100%;
    min-height: 90%;
    max-height: 90%;
    display: flex;
    padding: 0.5em;
    flex-direction: column;
  }
`;

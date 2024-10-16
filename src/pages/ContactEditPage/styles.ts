import { Form } from 'react-router-dom';
import styled from 'styled-components';

export const ContactForm = styled(Form)`
  display: flex;
  max-width: 40rem;
  flex-direction: column;
  gap: 1rem;

  > p:first-child {
    margin: 0;
    padding: 0;

    > :nth-child(2) {
      margin-right: 1rem;
    }
  }

  > p:first-child,
  label {
    display: flex;
  }

  p:first-child span,
  label span {
    width: 8rem;
  }

  p:first-child input,
  label input,
  label textarea {
    flex-grow: 2;
  }
`;

import styled from 'styled-components';

export const Contact = styled.div`
  max-width: 40rem;
  display: flex;
`;

export const ContactImg = styled.img`
  width: 12rem;
  height: 12rem;
  background: #c8c8c8;
  margin-right: 2rem;
  border-radius: 1.5rem;
  object-fit: cover;
`;

export const ContactHeader = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  &:focus {
    outline: none;
    color: hsl(224, 98%, 58%);
  }
`;

export const ContactTwitter = styled.p`
  margin: 0;
`;

export const ContactTwitterLink = styled.a`
  display: flex;
  font-size: 1.5rem;
  color: #3992ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ContactNotes = styled.p`
  white-space: break-spaces;
`;

export const ContactControls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

export const ContactForm = styled.form``;

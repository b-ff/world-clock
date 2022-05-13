import React, {
  FC,
  FormEvent,
  FormEventHandler,
  ReactElement,
  RefObject,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";

type ClockFormType = {
  onSubmit: (location: string) => void;
};

export const ClockForm: FC<ClockFormType> = ({ onSubmit }): ReactElement => {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const formData = Object.fromEntries(
        new FormData(event.target as HTMLFormElement)
      );

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      onSubmit(formData.location as string);
      event.preventDefault();
    },
    [onSubmit]
  );

  return (
    <StyledClockForm onSubmit={handleSubmit}>
      <StyledFieldset>
        <StyledInput
          type="text"
          name="location"
          placeholder="Type location name..."
          ref={inputRef}
          required
        />
        <StyledSubmit>Add</StyledSubmit>
      </StyledFieldset>
    </StyledClockForm>
  );
};

const StyledClockForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 7rem 0;
`;

const StyledFieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
`;

const StyledInput = styled.input`
  padding: 1rem 1.25rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 0.35rem 0 0 0.35rem;
  box-shadow: inset 0.125rem 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.25);
  font-family: "Roboto";
  font-weight: 300;
  outline: none;

  &::placeholder {
    color: #ccc;
  }
`;

const StyledSubmit = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  background: transparent;
  border-radius: 0 0.35rem 0.35rem 0;
  box-shadow: inset -0.125rem -0.125rem 0.5rem 0 rgba(0, 0, 0, 0.125);
  color: #777;
  cursor: pointer;

  &:active {
    box-shadow: inset 0.125rem 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.125);
  }
`;

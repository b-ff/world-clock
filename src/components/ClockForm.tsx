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
  padding: 2rem 0;
`;

const StyledFieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
`;

const StyledInput = styled.input``;

const StyledSubmit = styled.button``;

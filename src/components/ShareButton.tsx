import React, { FC, ReactElement, useCallback } from "react";
import styled from "styled-components";
import { ILocation } from "../types";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { propFromTheme } from "../utils";

type ShareButtonProps = {
  locations: ILocation[];
};

export const ShareButton: FC<ShareButtonProps> = ({
  locations,
}): ReactElement => {
  const handleShareClick = useCallback(() => {
    const queryParams = new URLSearchParams({
      locations: locations.map(({ city }) => city.trim()).join(","),
    });

    window.location.search = `?${queryParams.toString()}`;
    navigator.clipboard.writeText(
      `${window.location.origin}/?${queryParams.toString()}`
    );
  }, [locations]);
  return (
    <StyledShareButton onClick={handleShareClick}>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </StyledShareButton>
  );
};

const StyledShareButton = styled.button`
  padding: 0.5em;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  background-color: ${propFromTheme("backgroundPrimaryColor")};
  color: ${propFromTheme("fontPrimaryColor")};
  border: 1px solid ${propFromTheme("fontPrimaryColor")};
  border-radius: 0.5em;
  cursor: pointer;
  opacity: 0.25;
  transition: opacity 0.3s ease-in-out;

  &:hover,
  &:active {
    opacity: 0.5;
  }
`;

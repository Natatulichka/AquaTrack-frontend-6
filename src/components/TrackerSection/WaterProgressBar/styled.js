import styled from 'styled-components';

export const StyledProgressBarSpan = styled.span`
  position: relative;
  z-index: 10;
  display: block;
  height: 6px;
  background-color: #9be1a0;
  border-radius: 10px;

  ${({ $percent }) =>
    $percent < 100 ? `width: ${$percent}%;` : `width: 100%;`}
`;

export const StyledProgressDot = styled.span`
  display: block;
  position: absolute;
  z-index: 20;
  top: 50%;
  transform: translate(-7px, -50%);
  background-color: #f0f0f0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #9be1a0;

  ${({ $percent }) => ($percent < 100 ? `left: ${$percent}%;` : `left: 100%;`)}
`;

export const StyledPercentOfDrinkingWater = styled.p`
  position: absolute;
  width: 26px;
  display: flex;
  justify-content: center;
  top: -18px;
  transform: translate(-14px);
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.8;
  color: #9be1a0;

  ${({ $percent }) => ($percent < 100 ? `left: ${$percent}%;` : `left: 100%;`)}
`;

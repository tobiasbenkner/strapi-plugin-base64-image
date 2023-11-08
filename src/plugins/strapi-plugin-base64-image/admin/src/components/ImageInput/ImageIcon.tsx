import { Flex, Icon } from "@strapi/design-system";
import { Picture } from "@strapi/icons";
import { lightTheme } from "@strapi/design-system";
import styled from "styled-components";


const IconBox = styled(Flex)`
  background-color: ${lightTheme.colors.primary100};
  border: 1px solid ${lightTheme.colors.primary200};

  svg > path {
    fill: ${lightTheme.colors.primary600};
  }
`;

export const ImageIcon = () => {
  return (
    <IconBox
      justifyContent="center"
      alignItems="center"
      width={7}
      height={6}
      hasRadius
      aria-hidden
    >
      <Icon as={Picture} />
    </IconBox>
  );
};

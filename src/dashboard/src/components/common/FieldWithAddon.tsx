import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface FieldWithAddonProps {
  id?: string;
  addonBefore?: string;
  addonAfter?: string;
  inline?: boolean;
  children?: ReactNode;
  className?: string;
}

const DefaultWrapper = styled.div<{ inline: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: ${({ inline }) => !inline && '1rem'};
`;

const WrapperWithBeforeAddon = styled(DefaultWrapper)`
  grid-template-columns: min-content 1fr;

  .ant-select-selector {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
`;

const WrapperWithAfterAddon = styled(DefaultWrapper)`
  grid-template-columns: 1fr min-content;

  .ant-select-selector {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
`;

const WrapperWithBothAddons = styled(DefaultWrapper)`
  grid-template-columns: min-content 1fr min-content;

  .ant-select-selector {
    border-radius: 0;
  }
`;

const addonBaseStyle = css`
  display: flex;
  align-items: center;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.04);
  padding: 0 11px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #434343;
`;

const AddonBefore = styled.span`
  ${addonBaseStyle}
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
`;

const AddonAfter = styled.span`
  ${addonBaseStyle}
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
`;

export function FieldWithAddon({
  addonBefore,
  addonAfter,
  inline = false,
  children,
}: FieldWithAddonProps) {
  function getWrapper() {
    if (addonBefore && addonAfter) {
      return WrapperWithBothAddons;
    } else if (addonBefore) {
      return WrapperWithBeforeAddon;
    } else if (addonAfter) {
      return WrapperWithAfterAddon;
    } else {
      return DefaultWrapper;
    }
  }

  const Wrapper = getWrapper();

  return (
    <Wrapper inline={inline}>
      {addonBefore && <AddonBefore>{addonBefore}</AddonBefore>}
      {children}
      {addonAfter && <AddonAfter>{addonAfter}</AddonAfter>}
    </Wrapper>
  );
}

import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  name?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.xs}px;
  width: 100%;
`;

const Label = styled.label`
  font-size: ${tokens.typography.small.size}px;
  font-weight: 500;
  color: ${tokens.colors.text_primary};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm}px;
  border: 1px solid ${tokens.colors.border};
  border-radius: ${tokens.radii.md}px;
  padding: ${tokens.spacing.sm}px ${tokens.spacing.md}px;
  background-color: ${tokens.colors.surface};
  &:focus-within {
    border-color: ${tokens.colors.primary};
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: ${tokens.typography.font_family};
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_primary};
  background: transparent;
  &:disabled {
    color: ${tokens.colors.text_secondary};
  }
`;

const ErrorText = styled.span`
  font-size: ${tokens.typography.caption.size}px;
  color: ${tokens.colors.error};
`;

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  icon,
  disabled = false,
  name,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper>
        {icon && <span>{icon}</span>}
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
        />
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
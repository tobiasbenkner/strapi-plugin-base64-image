export type Props = {
  name: string;
  value?: string | null;
  disabled?: boolean;
  error?: string;
  labelAction?: React.ReactNode;
  required?: boolean;
  onChange: (event: {
    target: { name: string; value?: string | null; type: string };
  }) => void;
  attribute: {
    type: string;
    customField: string;
    options: { width: number; height: number };
    required: boolean;
  };
};

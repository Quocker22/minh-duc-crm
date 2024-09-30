import { describe, expect, it } from 'vitest';

import { InputDateField } from '@/components/molecules/InputDateField';
import { render, screen } from '@/utils/test-utils';

describe('InputDateField Tests!', () => {
  it('Should render', () => {
    render(<InputDateField name={' '} />);

    expect(screen.getByTestId('input-date-field-element')).toBeDefined();
  });
});

import { describe, expect, it } from 'vitest';

import { CheckboxField } from '@/components/molecules/CheckboxField';
import { render, screen } from '@/utils/test-utils';

describe('CheckboxField Tests!', () => {
  it('Should render', () => {
    render(<CheckboxField name={''} />);

    expect(screen.getByTestId('checkbox-field-element')).toBeDefined();
  });
});

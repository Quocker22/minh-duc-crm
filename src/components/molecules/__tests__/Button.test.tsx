import { describe, expect, it } from 'vitest';

import { Button } from '@/components/molecules/Button';
import { render, screen } from '@/utils/test-utils';

describe('Button Tests!', () => {
  it('Should render', () => {
    render(<Button />);

    expect(screen.getByTestId('button-element')).toBeDefined();
  });
});

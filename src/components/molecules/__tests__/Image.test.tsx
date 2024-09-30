import { describe, expect, it } from 'vitest';

import { Image } from '@/components/molecules/Image';
import { render, screen } from '@/utils/test-utils';

describe('Image Tests!', () => {
  it('Should render', () => {
    render(<Image />);

    expect(screen.getByTestId('image-element')).toBeDefined();
  });
});

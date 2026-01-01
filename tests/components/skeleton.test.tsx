import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard } from '@/app/components/skeleton';

describe('Skeleton Component', () => {
  it('renders with default class', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeTruthy();
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = document.querySelector('.custom-class');
    expect(skeleton).toBeTruthy();
  });
});

describe('SkeletonText Component', () => {
  it('renders single line by default', () => {
    render(<SkeletonText />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(1);
  });

  it('renders multiple lines when specified', () => {
    render(<SkeletonText lines={3} />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(3);
  });
});

describe('SkeletonCircle Component', () => {
  it('renders with rounded-full class', () => {
    render(<SkeletonCircle />);
    const circle = document.querySelector('.rounded-full');
    expect(circle).toBeTruthy();
  });

  it('applies size classes correctly', () => {
    render(<SkeletonCircle size="lg" />);
    const circle = document.querySelector('.w-16');
    expect(circle).toBeTruthy();
  });
});

describe('SkeletonCard Component', () => {
  it('renders card structure', () => {
    render(<SkeletonCard />);
    const card = document.querySelector('.rounded-xl');
    expect(card).toBeTruthy();
  });

  it('contains skeleton elements', () => {
    render(<SkeletonCard />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});

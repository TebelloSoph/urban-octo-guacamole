# Spectator Testing Setup

This project uses [@ngneat/spectator](https://github.com/ngneat/spectator) for easier and more readable Angular testing.

## Installation

Spectator is already installed in this project:

```bash
npm install @ngneat/spectator --save-dev
```

## Additional Dependencies

Since this project uses zoneless change detection, we also needed:

```bash
npm install @angular/platform-browser-dynamic --save-dev
```

## Usage

### Basic Component Test

```typescript
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  let spectator: Spectator<MyComponent>;
  const createComponent = createComponentFactory({
    component: MyComponent,
    providers: [provideZonelessChangeDetection()] // Required for zoneless apps
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
```

### Key Features Used in This Project

1. **Component Creation**: `createComponentFactory()` simplifies component setup
2. **DOM Queries**: `spectator.query()` and `spectator.queryAll()` for easy element selection
3. **Component Access**: `spectator.component` provides direct access to component instance
4. **Zoneless Support**: Added `provideZonelessChangeDetection()` for Angular zoneless mode

## Examples

See the following test files for working examples:
- `src/app/app.spec.ts` - Basic app component testing
- `src/app/board/board.spec.ts` - Comprehensive chess board component testing with:
  - DOM queries
  - Component method testing
  - User interaction simulation
  - Data validation

## Benefits Over Standard Angular Testing

- Less boilerplate code
- More readable tests
- Better TypeScript inference
- Simplified DOM queries
- Cleaner test setup

## Running Tests

```bash
npm test
```

All 12 tests currently pass! ✅

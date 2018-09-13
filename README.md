# TypeScript import declarations

This repository contains an example project, which provides custom definitions for a module. It needs to extend the declarations from the top-level declaration index.d.ts within a separate file `foo.d.ts`.

## The issue

Importing declarations from a module within a file is not working and results in TypeScript emitting the following warning:

```
Could not find a declaration file for module 'foo/bar'. '.../foo/bar.js' implicitly has an 'any' type.
  Try `npm install @types/foo` if it exists or add a new declaration (.d.ts) file containing `declare module 'foo';`
```

```ts
import 'foo'; // This will cause TypeScript to fail declarations.

// This module should include all declarations from 'foo', as well as
// its own declarations for extended functionality.
declare module 'foo/bar' {
    export interface BarBuffer {}
}
```

## Expected behaviour

Say I have a module `foo`. This module by default has an interface defined in its `index`. The module also have a `bar` file, which exports the same interface, but different implementation.

```ts
import { Index } from 'foo'; // default implementation.
```

```ts
import { Index } from 'foo/bar'; // Same interface as `foo.Index`, different implementation.
```

When I import `foo`, I can use the default implementation. Importing `foo/bar` allows me go use different implementation. Both implementations has the same API, so the definitions should be the same.

```ts
// foo/index.d.ts
declare module 'foo' {
    export interface Index {}
}
```

```ts
// foo/bar.d.ts
import 'foo';

// This module should include all declarations from 'foo', as well as
// its own declarations for extended functionality.
declare module 'foo/bar' {
    export interface BarBuffer {}
}
```

Rather than having to maintain two declaration files with the same API, I'd like to import the initial interface from `index` in `bar` and extend extra functionality, that `bar` may have.

## Working example

The following will work, but is not maintainable for declarations that exports a large number of interfaces and types.

```ts
// foo/bar.d.ts
declare module 'foo/bar' {
  import * as foo from 'foo';
  
  // Export a class which extends from 'foo'.
  export class Foo extends foo.Foo {}

  export class Bar {
    constructor(bar: string);
    bar: string;
  }
}
```

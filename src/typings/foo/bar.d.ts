import 'foo'; // Comment this and compile

declare module 'foo/bar' {
  export class Bar {
    constructor(bar: string);
    bar: string;
  }
}

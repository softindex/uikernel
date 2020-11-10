declare module 'uikernel' {
  const x: any;
  export = x;
}

declare module 'uikernel/lib/common/utils' {
  export function decorate(model: any, decor: object): any;
}

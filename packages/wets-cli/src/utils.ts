export const formatPageName = (name: string) =>
  name.replace(/^[a-z]|\-[a-z]/g, x => x.replace('-', '').toUpperCase());

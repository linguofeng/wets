export function createContext<T>(defaultValue: T) {
  const context = {
    Provider: null as any,
    Consumer: null as any,
  };

  context.Provider = {};

  context.Consumer = {};

  return context;
}

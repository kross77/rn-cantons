const invariant = (condition: any, message: string) => {
  if (!condition) {
    throw new Error(`Invariant Error: ${message}`);
  }
};

export default invariant;

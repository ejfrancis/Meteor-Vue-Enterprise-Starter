export const Tracker = {
  autorun: (fn) => {
    fn();
    const mockComputation = {
      stop: () => {}
    };
    return mockComputation;
  }
};

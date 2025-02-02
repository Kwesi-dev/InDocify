const useShallowRouter = () => {
  const shallowRouter = (path: string) => {
    window.history.replaceState(null, "", path);
  };
  return shallowRouter;
};

export default useShallowRouter;

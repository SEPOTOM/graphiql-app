export const getNewURLPath = (currentPath: string, newSegment: string) => {
  const currentUrlSegments = currentPath.split('/');
  currentUrlSegments.splice(2, 1, newSegment);

  return currentUrlSegments.join('/');
};

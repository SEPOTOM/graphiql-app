export const getNewURLPath = (currentPath: string, newSegment: string) => {
  console.log('getNewURLPath called');
  // console.log('currentPath');
  // console.log(currentPath);
  const currentUrlSegments = currentPath.split('/');
  currentUrlSegments.splice(2, 1, newSegment);

  return currentUrlSegments.join('/');
};

export const getNewMethodPath = (currentPath: string, newSegment: string, methods: string[]) => {
  const currentUrlSegments = currentPath.split('/');
  const methodIndex = currentUrlSegments.findIndex((segment) => methods.includes(segment));
  methodIndex > 0 ? currentUrlSegments.splice(methodIndex, 1, newSegment) : currentUrlSegments.splice(2, 0, newSegment);

  return currentUrlSegments.join('/');
};

export const getNewURLPath = (currentPath: string, newSegment: string) => {
  const currentUrlSegments = currentPath.split('/');
  currentUrlSegments.splice(3, 1, newSegment);
  console.log(currentUrlSegments);
  return currentUrlSegments.join('/');
};

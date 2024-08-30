export const getNewMethodPath = (currentPath: string, newSegment: string, methods: string[]) => {
  const currentUrlSegments = currentPath.split('/');
  const methodIndex = currentUrlSegments.findIndex((segment) => methods.includes(segment));
  methodIndex > 0 ? currentUrlSegments.splice(methodIndex, 1, newSegment) : currentUrlSegments.splice(3, 0, newSegment);

  return currentUrlSegments.join('/');
};

export const getNewURLPath = (currentPath: string, newSegment: string) => {
  const currentUrlSegments = currentPath.split('/');
  currentUrlSegments.splice(4, 1, newSegment);

  return currentUrlSegments.join('/');
};

export const getNewBodyPath = (currentPath: string, newSegment: string) => {
  const currentUrlSegments = currentPath.split('/');
  if (currentUrlSegments.length < 5) {
    currentUrlSegments.splice(4, 1, '');
  }
  currentUrlSegments.splice(5, 1, newSegment);

  return currentUrlSegments.join('/');
};

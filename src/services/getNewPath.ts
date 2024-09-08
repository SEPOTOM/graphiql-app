import { SegmentIndex } from '@/types';

export const getNewMethodPath = (currentPath: string, newSegment: string, methods: string[]) => {
  const currentUrlSegments = currentPath.split('/');
  const methodIndex = currentUrlSegments.findIndex((segment) => methods.includes(segment));
  methodIndex > 0 ?
    currentUrlSegments.splice(methodIndex, 1, newSegment)
  : currentUrlSegments.splice(SegmentIndex.Method, 0, newSegment);

  return currentUrlSegments.join('/');
};

export const getNewURLPath = (currentPath: string, newSegment: string) => {
  const currentUrlSegments = currentPath.split('/');
  currentUrlSegments.splice(4, 1, newSegment);
  currentUrlSegments.splice(SegmentIndex.Endpoint, 1, newSegment);
  return currentUrlSegments.join('/');
};

export const getNewGraphQlURLPath = (currentPath: string, newSegment: string) => {
  const currentUrlSegments = currentPath.split('/');
  currentUrlSegments.splice(3, 1, newSegment);
  return currentUrlSegments.join('/');
};

export const getNewBodyPath = (currentPath: string, newSegment: string) => {
  const currentUrlSegments = currentPath.split('/');
  if (currentUrlSegments.length < SegmentIndex.Body) {
    currentUrlSegments.splice(SegmentIndex.Endpoint, 1, '');
  }
  currentUrlSegments.splice(SegmentIndex.Body, 1, newSegment);

  return currentUrlSegments.join('/');
};

export const getNewPathHeaders = (currentPath: string, newSegment: string) => {
  console.log(currentPath);
  console.log(newSegment);
  const currentUrlSegments = currentPath.split('?');
  currentUrlSegments.splice(1, 1, newSegment);
  return currentUrlSegments.join('?');
};

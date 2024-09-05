const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

export const isImagePath = (pathname: string): boolean =>
  imageExtensions.some((extension) => pathname.endsWith(extension));

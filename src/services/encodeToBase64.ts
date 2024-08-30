export function encodeToBase64(input: string) {
  const utf8String = new TextEncoder().encode(input);
  const latin1String = Array.from(utf8String)
    .map((byte) => String.fromCharCode(byte))
    .join('');
  return btoa(latin1String);
}
export function decodeFromBase64(encodedString: string) {
  const latin1String = atob(encodedString);
  const utf8Bytes = new Uint8Array(latin1String.split('').map((char) => char.charCodeAt(0)));
  return new TextDecoder().decode(utf8Bytes);
}

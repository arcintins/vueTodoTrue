export const generateRandomString = (length: number): string => {
  const characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength: number = characters.length;
  let result: string = '';

  const randomValues: Uint32Array = new Uint32Array(length);
  
  window.crypto.getRandomValues(randomValues);
  randomValues.forEach((value) => {
    result += characters.charAt(value % charactersLength);
  });
  return result;
}
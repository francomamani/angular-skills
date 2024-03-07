const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
export const generateId = (length: number): string => {
  let id = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    id += chars[index];
  }
  return id;
};

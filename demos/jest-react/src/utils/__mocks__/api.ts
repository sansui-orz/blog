export function getUserName(id: number): Promise<{ name: string; id: number; }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'test name',
        id: id,
      });
    }, 10);
  });
}
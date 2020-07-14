/** 一个假的api请求方法 */
export function getUserName(id: number): Promise<{ name: string; id: number; }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'mock name',
        id: id,
      });
    }, 1000);
  });
}
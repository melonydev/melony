export const tableQueryAction = (query: (params: any) => Promise<any>) => {
  return async (params: any) => {
    const data = await query(params);
    return data;
  };
};

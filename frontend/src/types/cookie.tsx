export type Cookie = {
  _id: number;
  text: string;
  category: string;
};

export type FormValues = {
  text: string;
  category: string;
};

export type ApiRes = {
  message: string;
  data: Cookie[];
};

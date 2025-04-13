"use client";

import { tableQueryAction } from "melony";

export const getPostsMockData = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await data.json();

  return json;
};

export const loginMockData = async (payload: {
  email: string;
  password: string;
}) => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await data.json();

  return json;
};

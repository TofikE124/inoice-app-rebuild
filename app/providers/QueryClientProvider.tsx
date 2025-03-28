"use client";
import { QueryClientProvider as Provider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { getQueryClient } from "../get-query-client";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <Provider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </Provider>
  );
};

export default QueryClientProvider;

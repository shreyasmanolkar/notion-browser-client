import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const ReactQueryProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

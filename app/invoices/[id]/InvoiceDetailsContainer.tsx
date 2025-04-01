"use client";

import InvoiceDetails from "@/app/components/InvoiceDetails/InvoiceDetails";
import InvoiceDetailsLoading from "@/app/components/InvoiceDetails/InvoiceDetailsLoading";
import { FullInvoice } from "@/app/types/invoice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const InvoiceDetailsContainer = ({ id }: { id: string }) => {
  const {
    data: invoice,
    isLoading,
    error,
  } = useQuery<FullInvoice>({
    queryKey: ["invoices", id],
    queryFn: () => axios.get(`/api/invoice/${id}`).then((res) => res.data),
  });

  if (isLoading) return <InvoiceDetailsLoading />;
  if (!invoice || error) return null;

  return <InvoiceDetails invoice={invoice} />;
};

export default InvoiceDetailsContainer;

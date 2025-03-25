import { FullInvoice } from "./types/invoice";

const dummyInvoice: FullInvoice = {
  id: "invoice_123",
  billFromId: "location_1",
  billToId: "location_2",
  billFrom: {
    id: "location_1",
    name: "Sender Company",
    email: "sender@example.com",
    streetAdress: "123 Sender St",
    city: "New York",
    postCode: "10001",
    country: "USA",
  },
  billTo: {
    id: "location_2",
    name: "Receiver Company",
    email: "receiver@example.com",
    streetAdress: "456 Receiver St",
    city: "San Francisco",
    postCode: "94103",
    country: "USA",
  },
  invoiceDate: new Date("2025-04-01"),
  paymentTerms: "NET_14_DAYS",
  projectDescription: "Web development services for client project.",
  status: "PENDING",
  items: [
    {
      id: "item_1",
      name: "Website Design",
      quantity: 1,
      price: 500.0,
      invoiceId: "invoice_123",
    },
    {
      id: "item_2",
      name: "Hosting Fee",
      quantity: 12,
      price: 10.0,
      invoiceId: "invoice_123",
    },
  ],
};

export default dummyInvoice;

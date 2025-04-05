import { invoiceSchema } from "@/app/schemas/invoiceSchema";
import { prisma } from "@/prisma/client";
import { PaymentTerms, Status } from "@prisma/client";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextResponse,
  { params: paramsPrmoise }: Props
) {
  const { id } = await paramsPrmoise;

  const invoice = await prisma.invoice.findUnique({
    include: { billFrom: true, billTo: true, items: true },
    where: {
      id,
    },
  });
  if (!invoice)
    return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
  return NextResponse.json(invoice, { status: 200 });
}

export async function PATCH(
  request: NextResponse,
  { params: paramsPrmoise }: Props
) {
  const { id } = await paramsPrmoise;

  // Find the existing invoice
  const invoice = await prisma.invoice.findUnique({
    include: { billFrom: true, billTo: true, items: true },
    where: { id },
  });

  if (!invoice)
    return NextResponse.json({ message: "Invoice not found" }, { status: 404 });

  // Parse the request body
  const body = await request.json();
  const validation = invoiceSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error?.errors, { status: 401 });

  // Destructure the validated data
  const {
    streetAdressFrom,
    cityFrom,
    postCodeFrom,
    countryFrom,
    clientNameTo,
    clientEmailTo,
    streetAdressTo,
    cityTo,
    postCodeTo,
    countryTo,
    date,
    paymentTerms,
    projectDescription,
    items,
    status,
  } = validation.data;

  // Update the invoice with the new data
  const editedInvoice = await prisma.invoice.update({
    where: { id },
    data: {
      invoiceDate: new Date(date),
      paymentTerms: paymentTerms as PaymentTerms,
      projectDescription,
      status: status as Status,
      billFrom: {
        update: {
          streetAdress: streetAdressFrom,
          city: cityFrom,
          postCode: postCodeFrom,
          country: countryFrom,
        },
      },
      billTo: {
        update: {
          name: clientNameTo,
          email: clientEmailTo,
          streetAdress: streetAdressTo,
          city: cityTo,
          postCode: postCodeTo,
          country: countryTo,
        },
      },
      items: {
        // Delete items that are not in the request
        deleteMany: {
          id: { notIn: items.map((item) => item.id || "") },
        },
        // Add new items
        create: items.filter((item) => !item.id), // Only add new items that don't have an ID
        // Update existing items
        update: items
          .filter((item) => item.id)
          .map((item) => ({
            where: { id: item.id },
            data: {
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            },
          })),
      },
    },
  });

  return NextResponse.json(editedInvoice);
}

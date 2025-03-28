import { invoiceSchema } from "@/app/schemas/invoiceSchema";
import { prisma } from "@/prisma/client";
import { PaymentTerms, Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type InvoiceSchemaType = z.infer<typeof invoiceSchema>;

export async function GET(request: NextResponse) {
  const invoices = await prisma.invoice.findMany({
    include: { billFrom: true, billTo: true, items: true },
  });
  return NextResponse.json(invoices, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as InvoiceSchemaType;

  const validation = invoiceSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const locationFrom = await prisma.location.create({
    data: {
      streetAdress: body.streetAdressFrom,
      city: body.cityFrom,
      postCode: body.postCodeFrom,
      country: body.countryFrom,
    },
  });

  const locationTo = await prisma.location.create({
    data: {
      name: body.clientNameTo,
      email: body.clientEmailTo,
      streetAdress: body.streetAdressTo,
      city: body.cityTo,
      postCode: body.postCodeTo,
      country: body.countryTo,
    },
  });

  const invoice = await prisma.invoice.create({
    data: {
      billFromId: locationFrom.id,
      billToId: locationTo.id,
      invoiceDate: body.date,
      paymentTerms: body.paymentTerms as PaymentTerms,
      projectDescription: body.projectDescription,
      status: (body.status || Status.PENDING) as Status,
    },
  });

  const itemsMapped = body.items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    invoiceId: invoice.id,
  }));

  await prisma.item.createMany({
    data: itemsMapped,
  });

  return NextResponse.json(invoice, { status: 200 });
}

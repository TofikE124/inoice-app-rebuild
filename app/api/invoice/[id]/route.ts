import { prisma } from "@/prisma/client";
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

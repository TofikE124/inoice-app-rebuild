"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentTerms, Status } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import LeftArrowIcon from "../../public/assets/icon-arrow-left.svg";
import DeleteIcon from "../../public/assets/icon-delete.svg";
import { invoiceSchema } from "../schemas/invoiceSchema";
import { getToastDefaultStyle } from "../toast/getToastDefaultStyle";
import { FullInvoice } from "../types/invoice";
import Button from "./Button";
import DatePicker from "./DatePicker";
import { Dropdown } from "./Dropdown";
import TextField from "./TextField";

type InvoiceFormProps = {
  isOpen?: boolean;
  onClose?: () => void;
  invoice?: FullInvoice;
};

type FormFields = z.infer<typeof invoiceSchema>;

const InvoiceForm = ({
  isOpen = false,
  onClose = () => {},
  invoice,
}: InvoiceFormProps) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(invoiceSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (invoice) {
      const { setValue } = methods;

      // Set form values one by one
      setValue("streetAdressFrom", invoice?.billFrom.streetAdress ?? "");
      setValue("cityFrom", invoice?.billFrom.city ?? "");
      setValue("postCodeFrom", invoice?.billFrom.postCode ?? "");
      setValue("countryFrom", invoice?.billFrom.country ?? "");

      setValue("clientNameTo", invoice?.billTo.name ?? "");
      setValue("clientEmailTo", invoice?.billTo.email ?? "");
      setValue("streetAdressTo", invoice?.billTo.streetAdress ?? "");
      setValue("cityTo", invoice?.billTo.city ?? "");
      setValue("postCodeTo", invoice?.billTo.postCode ?? "");
      setValue("countryTo", invoice?.billTo.country ?? "");

      setValue(
        "date",
        invoice.invoiceDate
          ? new Date(invoice?.invoiceDate).toISOString()
          : new Date().toISOString()
      );
      setValue("paymentTerms", invoice?.paymentTerms);
      setValue("projectDescription", invoice?.projectDescription ?? "");
      setValue("status", invoice?.status ?? "");
      setValue("items", invoice?.items ?? []);
    }
  }, [isOpen, invoice, methods]);

  const { handleSubmit, reset } = methods;
  const { theme } = useTheme();
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const sendInvoice = async (data: any) => {
    await axios.post("/api/invoice", { ...data, status: Status.PENDING });
    queryClient.refetchQueries({ queryKey: ["invoices"] });
  };

  const editInvoice = async (data: any) => {
    await axios.patch(`/api/invoice/${invoice?.id}`, data);
    queryClient.refetchQueries({ queryKey: ["invoices", invoice?.id] });
  };

  const closeForm = () => {
    onClose();
    setLoading(false);
    reset();
  };

  const onSubmit: SubmitHandler<FormFields> = async (
    data: FormFields,
    event?: React.BaseSyntheticEvent
  ) => {
    const e = event as { nativeEvent: { submitter: { name: string } } };
    const submitter = e?.nativeEvent.submitter.name;
    if (submitter == "save-send") {
      setLoading(true);

      if (invoice) {
        toast
          .promise(
            editInvoice(data),
            {
              loading: "Editing Invoice",
              success: <b>Invoice Edited</b>,
              error: <b>An Error Occurred</b>,
            },
            {
              style: getToastDefaultStyle(theme),
            }
          )
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            closeForm();
          });
      } else {
        toast
          .promise(
            sendInvoice(data),
            {
              loading: "Sending Invoice",
              success: <b>Invoice Sent</b>,
              error: <b>An Error Occurred</b>,
            },
            {
              style: getToastDefaultStyle(theme),
            }
          )
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            closeForm();
          });
      }
    }
    if (submitter == "save-draft") {
      setLoading(true);
      toast
        .promise(
          axios.post("/api/invoice", { ...data, status: Status.PENDING }),
          {
            loading: "Sending Invoice as Draft",
            success: <b>Invoice Sent as Draft</b>,
            error: <b>An Error Occurred</b>,
          },
          {
            style: getToastDefaultStyle(theme),
          }
        )
        .finally(() => {
          closeForm();
        });
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${
            isOpen
              ? "translate-x-0 opacity-100 visible"
              : "-translate-x-full opacity-0 invisible"
          } fixed transition-all duration-500 top-0 bottom-0 left-0 md:w-[80%] max-md:pt-[72px] max-md:right-0 max-lg:pt-[80px] lg:pl-[103px] bg-white dark:bg-deep-space rounded-r-[20px] z-20`}
        >
          <div className="px-6 overflow-y-scroll max-md:h-[60vh] md:h-[80vh] lg:h-screen pt-[33px] max-md:pb-[20vh] md:pt-[60px] lg:px-[56px]">
            <button
              onClick={onClose}
              className="text-rich-black dark:text-white heading-s-variant flex items-center gap-6 md:hidden"
            >
              <Image src={LeftArrowIcon} alt="Left Arrow Icon" />
              Go Back
            </button>

            <h1 className="max-md:mt-[26px] heading-m text-rich-black dark:text-white">
              {invoice ? (
                <>
                  Edit <span className="text-steel-blue">#</span>
                  {invoice.id.slice(0, 5).toUpperCase()}
                </>
              ) : (
                "New Invoice"
              )}
            </h1>
            <div className="grid grid-cols-2 gap-6 mt-[22px]">
              <InvoiceFormBillFrom />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <InvoiceFormBillTo />
            </div>
            <div className="mt-10 flex flex-col gap-6">
              <InvoiceDatePicker />
              <InvoicePaymentTerms />
            </div>
            <div className="mt-6">
              <InvoiceFormProjectDescription />
            </div>
            <div className="mt-[70px]">
              <InvoiceFormItemList />
            </div>
            <InvoiceFormFooter
              invoice={invoice}
              onClose={onClose}
              isLoading={isLoading}
            />
          </div>
        </form>
      </FormProvider>

      <InvoiceFormBlackOverlay
        disabled={isLoading}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

type InvoiceFormBlackOverlayProps = {
  isOpen?: boolean;
  onClose?: () => void;
  disabled?: boolean;
};

const InvoiceFormBlackOverlay = ({
  onClose = () => {},
  isOpen,
  disabled,
}: InvoiceFormBlackOverlayProps) => {
  const handleClick = () => {
    if (disabled) return;
    onClose();
  };

  return (
    <div
      className={`fixed ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      } transition-all duration-500 z-10 inset-0 bg-black/50`}
      onClick={handleClick}
    ></div>
  );
};

const InvoiceFormBillFrom = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <>
      <h3 className="heading-s text-deep-purple col-span-2">Bill From</h3>
      <TextField
        required
        {...register("streetAdressFrom")}
        errorMessage={errors.streetAdressFrom?.message}
        label="Street Address"
        className="col-span-2"
      />
      <TextField
        required
        {...register("cityFrom")}
        errorMessage={errors.cityFrom?.message}
        label="City"
      />
      <TextField
        required
        {...register("postCodeFrom")}
        errorMessage={errors.postCodeFrom?.message}
        label="Post Code"
      />
      <TextField
        required
        {...register("countryFrom")}
        errorMessage={errors.countryFrom?.message}
        label="Country"
        className="col-span-2"
      />
    </>
  );
};

const InvoiceFormBillTo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <>
      <h3 className="heading-s text-deep-purple col-span-2">Bill To</h3>
      <TextField
        required
        {...register("clientNameTo")}
        errorMessage={errors.clientNameTo?.message}
        label="Client's Name"
        className="col-span-2"
      />
      <TextField
        required
        {...register("clientEmailTo")}
        errorMessage={errors.clientEmailTo?.message}
        label="Client's Email"
        className="col-span-2"
      />
      <TextField
        required
        {...register("streetAdressTo")}
        errorMessage={errors.streetAdressTo?.message}
        label="Street Address"
        className="col-span-2"
      />
      <TextField
        required
        {...register("cityTo")}
        errorMessage={errors.cityTo?.message}
        label="City"
      />
      <TextField
        required
        {...register("postCodeTo")}
        errorMessage={errors.postCodeTo?.message}
        label="Post Code"
      />
      <TextField
        required
        {...register("countryTo")}
        errorMessage={errors.countryTo?.message}
        label="Country"
        className="col-span-2"
      />
    </>
  );
};

const InvoicePaymentTerms = () => {
  const {
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext<FormFields>();

  const paymentTermsMap: Record<PaymentTerms, { label: string }> = {
    NET_1_DAY: { label: "Net 1 Day" },
    NET_7_DAYS: { label: "Net 7 Days" },
    NET_14_DAYS: { label: "Net 14 Days" },
    NET_30_DAYS: { label: "Net 30 Days" },
  };

  return (
    <Dropdown.Root
      required
      errorMessage={errors.paymentTerms?.message}
      value={getValues("paymentTerms")}
      onValueChange={(value) => {
        setValue("paymentTerms", value as PaymentTerms, {
          shouldValidate: true,
        });
      }}
    >
      <Dropdown.Label>Payment Terms</Dropdown.Label>
      <Dropdown.Trigger placeholder="Choose Payment Terms" />
      <Dropdown.Content>
        <Dropdown.Item value={null}>Choose Payment Terms</Dropdown.Item>
        {Object.values(PaymentTerms).map((v) => (
          <Dropdown.Item key={v} value={v}>
            {paymentTermsMap[v].label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

const InvoiceDatePicker = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<FormFields>();
  const date = getValues("date");

  return (
    <DatePicker
      defaultValue={date ? new Date(date) : new Date()}
      errorMessage={errors.date?.message}
      onValueChange={(date) => setValue("date", date.toISOString())}
      label="Invoice Date"
    />
  );
};

const InvoiceFormProjectDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <TextField
      required
      {...register("projectDescription")}
      errorMessage={errors.projectDescription?.message}
      label="Project Description"
    />
  );
};

const InvoiceFormItemList = () => {
  const { control } = useFormContext<FormFields>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <>
      <h2 className="text-[18px] tracking-[-0.375px] font-bold text-[#777F98]">
        Item List
      </h2>
      {fields.length ? (
        <div className="space-y-[50px] ">
          {fields.map((field, index) => {
            return (
              <Item
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            );
          })}
        </div>
      ) : (
        <h3 className="heading-s-variant text-center py-4 tracking-[-0.375px] font-bold text-cool-gray">
          No Items Have Been Added Yet
        </h3>
      )}

      <div className="mt-[22px]">
        <Button
          onClick={() => append({ name: "", price: 0, quantity: 0 })}
          type="button"
          color="primary"
          className="w-full"
        >
          + Add New Item
        </Button>
      </div>
    </>
  );
};

type InvoiceFormFooterProps = {
  invoice?: FullInvoice;
  onClose?: () => void;
  isLoading: boolean;
};

const InvoiceFormFooter = ({
  invoice,
  onClose,
  isLoading,
}: InvoiceFormFooterProps) => {
  return (
    <div className="max-md:fixed left-0 right-0 bottom-0 z-20">
      <div className="relative bg-white dark:bg-slate-navy md:bg-transparent dark:md:bg-transparent flex items-center gap-2 max-md:px-6 max-md:py-6 md:mt-[55px] md:mb-8">
        <Button
          color="primary"
          className={invoice ? "ml-auto" : "mr-auto"}
          onClick={onClose}
          disabled={isLoading}
        >
          {invoice ? "Cancel" : "Discard"}
        </Button>
        {invoice ? null : (
          <Button
            type="submit"
            name="save-draft"
            color="secondary"
            disabled={isLoading}
          >
            Save as Draft
          </Button>
        )}

        <Button
          type="submit"
          name="save-send"
          color="deepPurple"
          disabled={isLoading}
        >
          {invoice ? "Save Changes" : "Save & Send"}
        </Button>
        <div className="md:hidden absolute left-0 right-0 transition-all duration-200 pointer-events-none bottom-full bg-gradient-to-b from-transparent to-black/10 h-[64px]"></div>
      </div>
    </div>
  );
};

type ItemProps = {
  index: number;
  onRemove?: () => void;
};

const Item = ({ index, onRemove = () => {} }: ItemProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormFields>();

  const quantity = watch(`items.${index}.quantity`);
  const price = watch(`items.${index}.price`);

  useEffect(() => {
    setValue(`items.${index}.quantity`, parseInt(quantity?.toString()) || 0);
    setValue(`items.${index}.price`, Number(price) || 0);
  }, [price, quantity]);

  return (
    <div className="grid grid-cols-[auto_auto_auto_1fr] gap-y-6 gap-x-4">
      <TextField
        required
        {...register(`items.${index}.name`)}
        errorMessage={(errors.items || [])[index]?.name?.message}
        label="Item Name"
        containerClassname="col-span-4"
      />
      <TextField
        required
        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
        errorMessage={(errors.items || [])[index]?.quantity?.message}
        label="Qty."
        className="max-w-[120px]"
        type="number"
      />
      <TextField
        required
        {...register(`items.${index}.price`, { valueAsNumber: true })}
        errorMessage={(errors.items || [])[index]?.price?.message}
        label="Price"
        className="max-w-[150px]"
        type="number"
      />
      <div className="flex flex-col">
        <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
          Total
        </p>
        <h3 className="heading-s-variant text-cool-gray my-auto">
          {(quantity * price).toFixed(2)}
        </h3>
      </div>
      <button
        onClick={onRemove}
        className="h-fit justify-self-end self-end mb-4 cursor-pointer p-2"
      >
        <Image src={DeleteIcon} alt="Delete Icon" />
      </button>
    </div>
  );
};

export default InvoiceForm;

"use client";

import {
  addDays,
  addMonths,
  isAfter,
  isBefore,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import DatepickerIcon from "../../public/assets/datepicker.svg";
import useClickOutside from "../hooks/useClickOutside";
import IconArrowLeft from "../svgs/IconArrowLeft";
import IconArrowRight from "../svgs/IconArrowRight";
import { formatDate } from "../helper/formateDate";

enum PLACEMENT {
  ABOVE,
  BELOW,
}

type DatePickerContextType = {
  date: Date;
  minDate?: Date;
  maxDate?: Date;
  changeDate: (newDate: Date) => void;
  isOpen: boolean;
  placement: PLACEMENT;
  openDatePicker: () => void;
  closeDatePicker: () => void;
  triggerDatePicker: () => void;
};

const DatePickerContext = createContext<DatePickerContextType | null>(null);

const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (!context) throw new Error("Can't use context outside of provider");
  return context;
};

type DatePickerProps = {
  label?: string;
  defaultValue?: Date;
  errorMessage?: string;
  onValueChange?: (newDate: Date) => void;
  minDate?: Date;
  maxDate?: Date;
};

const DatePicker = ({
  errorMessage,
  label,
  defaultValue,
  onValueChange = () => {},
  minDate,
  maxDate,
}: DatePickerProps) => {
  const [date, setDate] = useState(defaultValue || startOfDay(new Date()));
  const [isOpen, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PLACEMENT>(PLACEMENT.BELOW);
  const datePickerRef = useRef(null);

  const handleValueChangeRef = useRef<(newDate: Date) => void>(null);
  handleValueChangeRef.current = onValueChange;

  useClickOutside(datePickerRef, () => {
    if (isOpen) setOpen(false);
  });

  const openDatePicker = () => {
    const dropdownHeight = 150;
    setPlacement(getDropdownPosition(datePickerRef.current!, dropdownHeight));
    setOpen(true);
  };

  const closeDatePicker = () => {
    setOpen(false);
  };

  const triggerDatePicker = () => {
    if (isOpen) closeDatePicker();
    else openDatePicker();
  };

  const changeDate = (newDate: Date) => {
    if (isDateValid(newDate, minDate, maxDate)) setDate(newDate);
  };

  useEffect(() => {
    if (handleValueChangeRef.current) handleValueChangeRef.current(date);
  }, [date, handleValueChangeRef]);

  return (
    <div className="relative select-none z-20" ref={datePickerRef}>
      <DatePickerContext.Provider
        value={{
          date,
          minDate,
          maxDate,
          changeDate,
          isOpen,
          placement,
          openDatePicker,
          closeDatePicker,
          triggerDatePicker,
        }}
      >
        {label ? <DatePickerLabel label={label} /> : null}
        <DatePickerErrorMessage errorMessage={errorMessage} />
        <DatePickerTrigger />
        <DatePickerContent />
      </DatePickerContext.Provider>
    </div>
  );
};

type DatePickerLabelProps = {
  label: string;
};

const DatePickerErrorMessage = ({
  errorMessage,
}: {
  errorMessage?: string;
}) => {
  if (!errorMessage) return;
  return (
    <div className="">
      <p className="body-variant text-red-500">{errorMessage}</p>
    </div>
  );
};

const DatePickerLabel = ({ label }: DatePickerLabelProps) => {
  return (
    <p className="mb-2 body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
      {label}
    </p>
  );
};

const DatePickerTrigger = () => {
  const { date: value, triggerDatePicker } = useDatePickerContext();
  const formatedDate = formatDate(value);

  return (
    <div
      onClick={triggerDatePicker}
      className="py-4 px-5 dark-transition flex justify-between items-center cursor-pointer rounded-sm bg-white dark:bg-slate-navy border border-pale-lavender dark:border-midnight-slate hover:border-deep-purple focus:border-deep-purple"
    >
      <p className="heading-s-variant dark-transition text-rich-black dark:text-white">
        {formatedDate}
      </p>
      <Image src={DatepickerIcon} alt="Date Picker" />
    </div>
  );
};

const DatePickerContent = () => {
  const { isOpen, placement } = useDatePickerContext();

  return (
    <div
      className={`transition-all duration-300 ${
        isOpen
          ? "scale-100 opacity-100 visible"
          : "scale-[70%] opacity-0 invisible"
      } ${
        placement == PLACEMENT.ABOVE ? "bottom-full mb-4" : "top-full mt-4"
      } absolute z-10 w-[240px] md:w-[300px] left-0 bg-white dark:bg-midnight-slate shadow-primary-25 shadow-primary-placement pt-6 pb-[30px] px-5 rounded-lg`}
    >
      <DatePickerHeader />
      <DatePickerDayPicker />
    </div>
  );
};

const DatePickerHeader = () => {
  const { date, minDate, maxDate } = useDatePickerContext();

  const formattedDate = date.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  const leftDisabled =
    minDate &&
    isBefore(startOfMonth(subMonths(date, 1)), startOfMonth(minDate));
  const rightDisabled =
    maxDate && isAfter(startOfMonth(addMonths(date, 1)), startOfMonth(maxDate));

  return (
    <div className="flex justify-between items-center">
      <DatePickerLeftArrow disabled={leftDisabled} />
      <p className="heading-s-variant text-rich-black dark:text-pale-lavender">
        {formattedDate}
      </p>
      <DatePickerRightArrow disabled={rightDisabled} />
    </div>
  );
};

type DatePickerLeftArrowProps = {
  disabled?: boolean;
};

const DatePickerLeftArrow = ({
  disabled = false,
}: DatePickerLeftArrowProps) => {
  const { date: value, changeDate: setValue } = useDatePickerContext();
  const firstDayOfPrevMonth = startOfMonth(subMonths(value, 1));
  const handleClick = () => {
    setValue(firstDayOfPrevMonth);
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="cursor-pointer p-2 disabled:opacity-20 disabled:cursor-not-allowed"
    >
      <IconArrowLeft />
    </button>
  );
};

type DatePickerRightArrowProps = {
  disabled?: boolean;
};

const DatePickerRightArrow = ({
  disabled = false,
}: DatePickerRightArrowProps) => {
  const { date: value, changeDate: setValue } = useDatePickerContext();
  const firstDayOfNextMonth = startOfMonth(addMonths(value, 1));
  const handleClick = () => {
    setValue(firstDayOfNextMonth);
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="cursor-pointer p-2 disabled:opacity-20 disabled:cursor-not-allowed"
    >
      <IconArrowRight />
    </button>
  );
};

const DatePickerDayPicker = () => {
  const { date, minDate, maxDate } = useDatePickerContext();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1); // Sets day to 1
  const arr = Array.from({ length: 35 }, (_, i) => i);

  return (
    <div className="grid grid-cols-7 grid-rows-5 gap-4 mt-8">
      {arr.map((v, i) => {
        const currentDate = addDays(firstDay, i);
        return isDateValid(currentDate, minDate, maxDate) ? (
          <DatePickerDayItem
            key={i}
            date={currentDate}
            currentMonth={firstDay.getMonth()}
            selected={date.getTime() == currentDate.getTime()}
          />
        ) : null;
      })}
    </div>
  );
};

type DatePickerDayItemProps = {
  date: Date;
  currentMonth: number;
  selected: boolean;
};

const DatePickerDayItem = ({
  date,
  currentMonth,
  selected,
}: DatePickerDayItemProps) => {
  const { changeDate, closeDatePicker } = useDatePickerContext();
  const active = currentMonth == date.getMonth();

  const handleClick = () => {
    closeDatePicker();
    changeDate(date);
  };

  return (
    <div
      className={`size-8 rounded-full grid items-center cursor-pointer 
        ${
          selected
            ? "bg-deep-purple text-white"
            : "hover:border border-deep-purple text-rich-black dark:text-pale-lavender hover:text-deep-purple"
        }
      ${!active ? "opacity-20" : ""}    
      `}
      onClick={handleClick}
    >
      <p className={"heading-s-variant text-inherit text-center"}>
        {date.getDate()}
      </p>
    </div>
  );
};

const getDropdownPosition = (
  triggerElement: Element,
  dropdownHeight: number
) => {
  const rect = triggerElement.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  // const spaceAbove = rect.top;

  return spaceBelow >= dropdownHeight ? PLACEMENT.BELOW : PLACEMENT.ABOVE;
};

const isDateValid = (date: Date, minDate?: Date, maxDate?: Date) => {
  if (
    (minDate && isBefore(date, minDate)) ||
    (maxDate && isAfter(date, maxDate))
  )
    return false;
  return true;
};

export default DatePicker;

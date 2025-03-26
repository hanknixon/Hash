import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = PopoverPrimitive.Content;
const PopoverPortal = PopoverPrimitive.Portal;

const DatePicker = ({ date, setDate }) => {
  const footer = date ? (
    <p className="mt-4 text-center text-sm text-gray-400">
      You selected {format(date, 'PPP')}
    </p>
  ) : (
    <p className="mt-4 text-center text-sm text-gray-400">
      Please pick a date
    </p>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-600 bg-[#2D2B3D] px-3 py-2 text-left text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <span>{date ? format(date, 'PPP') : 'Pick a date'}</span>
          <CalendarIcon className="h-4 w-4 text-gray-400" />
        </motion.button>
      </PopoverTrigger>

      <AnimatePresence>
        <PopoverPortal>
          <PopoverContent>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="z-50 mt-2 rounded-lg border border-gray-600 bg-[#1E1C2E] p-4 shadow-lg"
            >
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                footer={footer}
                className="rounded-md border-gray-600 bg-[#1E1C2E] p-3 text-white"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium text-white",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-[#2D2B3D] hover:bg-purple-500 rounded-md transition-colors duration-200",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-gray-400 rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm relative p-0 hover:bg-purple-500 rounded-md transition-colors duration-200",
                  day: "h-8 w-8 p-0 font-normal",
                  day_selected: "bg-purple-500 text-white hover:bg-purple-600",
                  day_today: "bg-[#2D2B3D] text-white",
                  day_outside: "text-gray-600",
                  day_disabled: "text-gray-600",
                  day_range_middle: "aria-selected:bg-purple-500",
                  day_hidden: "invisible",
                }}
                fromDate={new Date()}
              />
            </motion.div>
          </PopoverContent>
        </PopoverPortal>
      </AnimatePresence>
    </Popover>
  );
};

export default DatePicker;
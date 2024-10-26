import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { FC } from "react";

import style from "./DateInput.module.scss";

type DateInputProps = {
    date: string | null;
    onChange: (date: Moment | null) => void;
};

export const DateInput: FC<DateInputProps> = ({ date, onChange }) => {
    const disablePastDates = (date: moment.Moment | null) => {
        if (!date) return false;

        return date.isBefore(moment(), "day");
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                value={date ? moment(date, moment.ISO_8601) : null}
                onChange={onChange}
                className={style.datePicker}
                shouldDisableDate={disablePastDates}
                format="DD.MM.YYYY"
            />
        </LocalizationProvider>
    );
};

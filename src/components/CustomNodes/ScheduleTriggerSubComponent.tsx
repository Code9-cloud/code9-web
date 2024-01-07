import {useState} from "react";
import {FormControl, InputLabel, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";

const enum Hours {
    ONE = '1',
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    TEN = '10',
    ELEVEN = '11',
    TWELVE = '12',
    THIRTEEN = '13',
    FOURTEEN = '14',
    FIFTEEN = '15',
    SIXTEEN = '16',
    SEVENTEEN = '17',
    EIGHTEEN = '18',
    NINETEEN = '19',
    TWENTY = '20',
    TWENTY_ONE = '21',
    TWENTY_TWO = '22',
    TWENTY_THREE = '23',
}

const enum Frequency {
    MINUTELY = 'minutes',
    HOURLY = 'hours',
    DAILY = 'day',
    WEEKLY = 'week',
    MONTHLY = 'month',
    YEARLY = 'year',
}

// const enum Days {
//     SUNDAY = 'Sunday',
//     MONDAY = 'Monday',
//     TUESDAY = 'Tuesday',
//     WEDNESDAY = 'Wednesday',
//     THURSDAY = 'Thursday',
//     FRIDAY = 'Friday',
//     SATURDAY = 'Saturday',
// }

// const enum Months {
//     JANUARY = 'January',
//     FEBRUARY = 'February',
//     MARCH = 'March',
//     APRIL = 'April',
//     MAY = 'May',
//     JUNE = 'June',
//     JULY = 'July',
//     AUGUST = 'August',
//     SEPTEMBER = 'September',
//     OCTOBER = 'October',
//     NOVEMBER = 'November',
//     DECEMBER = 'December',
// }

const enum Minutes {
    FIFTEEN = '15',
    THIRTY = '30',
    FOURTY_FIVE = '45',
}

// const MonthDays = {
//     [Months.JANUARY]: 31,
//     [Months.FEBRUARY]: 28,
//     [Months.MARCH]: 31,
//     [Months.APRIL]: 30,
//     [Months.MAY]: 31,
//     [Months.JUNE]: 30,
//     [Months.JULY]: 31,
//     [Months.AUGUST]: 31,
//     [Months.SEPTEMBER]: 30,
//     [Months.OCTOBER]: 31,
//     [Months.NOVEMBER]: 30,
//     [Months.DECEMBER]: 31,
// };

const ScheduleTriggerSubComponent = ({scheduleConfig, onScheduleConfigUpdate}: any) => {
    const [frequency, setFrequency] = useState(scheduleConfig.frequency || Frequency.DAILY);

    const handleChange = (event: any) => {
        setFrequency(event.target.value);
        onScheduleConfigUpdate({ ...scheduleConfig, frequency: event.target.value });
    };

    return (
        <div className={"nopan nodrag"} onClick={ev => {ev.stopPropagation();}} style={{paddingTop: '10px'}}>
            <InputLabel id="schedule-frequency-label">Schedule Frequency</InputLabel>
            <Select
                labelId="schedule-frequency-label"
                id="frequency"
                value={frequency}
                onChange={handleChange}
                fullWidth
            >
                <MenuItem value={Frequency.MINUTELY}>Every Minute</MenuItem>
                <MenuItem value={Frequency.HOURLY}>Every Hour</MenuItem>
                <MenuItem value={Frequency.DAILY}>Every Day</MenuItem>
            </Select>
        </div>
    );
}

export default ScheduleTriggerSubComponent;
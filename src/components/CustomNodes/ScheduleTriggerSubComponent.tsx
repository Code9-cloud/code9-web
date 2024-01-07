import {useState} from "react";
import {FormControl, InputLabel, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";

const enum Hours {
    ZERO = '0',
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

const enum Days {
    SUNDAY = 'Sunday',
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
}

const enum Months {
    JANUARY = 'January',
    FEBRUARY = 'February',
    MARCH = 'March',
    APRIL = 'April',
    MAY = 'May',
    JUNE = 'June',
    JULY = 'July',
    AUGUST = 'August',
    SEPTEMBER = 'September',
    OCTOBER = 'October',
    NOVEMBER = 'November',
    DECEMBER = 'December',
}

const enum Minutes {
    ZERO = '0',
    FIFTEEN = '15',
    THIRTY = '30',
    FOURTY_FIVE = '45',
}

const MonthDays = {
    [Months.JANUARY]: 31,
    [Months.FEBRUARY]: 28,
    [Months.MARCH]: 31,
    [Months.APRIL]: 30,
    [Months.MAY]: 31,
    [Months.JUNE]: 30,
    [Months.JULY]: 31,
    [Months.AUGUST]: 31,
    [Months.SEPTEMBER]: 30,
    [Months.OCTOBER]: 31,
    [Months.NOVEMBER]: 30,
    [Months.DECEMBER]: 31,
};

const ScheduleTriggerSubComponent = ({scheduleConfig, onScheduleConfigUpdate}: any) => {
    const [frequency, setFrequency] = useState(scheduleConfig.frequency || Frequency.DAILY);

    const hoursArray = Array.from({length: 24}, (_, i) => i+1);
    const minutesArray = Array.from({length: 60}, (_, i) => i);

    const handleChange = (event: any) => {
        setFrequency(event.target.value);
        onScheduleConfigUpdate({ ...scheduleConfig, frequency: event.target.value });
    };

    return (
        <div className={"nopan nodrag"} onClick={ev => {ev.stopPropagation();}}>
            <InputLabel id="schedule-frequency-label">Schedule Frequency</InputLabel>
            <Select
                labelId="schedule-frequency-label"
                id="frequency"
                value={frequency}
                onChange={handleChange}
            >
                <MenuItem value={Frequency.MINUTELY}>Every X Minutes</MenuItem>
                <MenuItem value={Frequency.HOURLY}>Every X Hours</MenuItem>
                <MenuItem value={Frequency.DAILY}>Every Day</MenuItem>
                <MenuItem value={Frequency.WEEKLY}>Every Week</MenuItem>
                <MenuItem value={Frequency.MONTHLY}>Every Month</MenuItem>
                <MenuItem value={Frequency.YEARLY}>Every Year</MenuItem>
            </Select>
            {frequency === Frequency.MINUTELY && <div>
                <InputLabel id="schedule-minutes-label">Minutes</InputLabel>
                <Select
                    labelId="schedule-minutes-label"
                    id="minutes"
                    value={scheduleConfig.minutes || Minutes.ZERO}
                    onChange={(ev) => {onScheduleConfigUpdate({ ...scheduleConfig, minutes: ev.target.value });}}
                >
                    <MenuItem value={Minutes.ZERO}>0</MenuItem>
                    <MenuItem value={Minutes.FIFTEEN}>15</MenuItem>
                    <MenuItem value={Minutes.THIRTY}>30</MenuItem>
                    <MenuItem value={Minutes.FOURTY_FIVE}>45</MenuItem>
                </Select>
            </div>}
            {frequency === Frequency.HOURLY && <div>
                <InputLabel id="schedule-hours-label">Hours</InputLabel>
                <Select
                    labelId="schedule-hours-label"
                    id="hours"
                    value={scheduleConfig.hours || 0}
                    onChange={(ev) => {onScheduleConfigUpdate({ ...scheduleConfig, hours: ev.target.value });}}
                >
                    {hoursArray.map((hour) => {
                        return <MenuItem value={hour}>{hour}</MenuItem>
                    })}
                </Select>
            </div>}
            {frequency === Frequency.DAILY && <div>
                <InputLabel id="schedule-time-label">Time of Day</InputLabel>
                <Select
                    labelId="schedule-hours-label"
                    id="hours"
                    value={scheduleConfig.hours || 0}
                    onChange={(ev) => {onScheduleConfigUpdate({ ...scheduleConfig, hours: ev.target.value });}}
                >
                    {hoursArray.map((hour) => {
                        return <MenuItem value={hour}>{hour}</MenuItem>
                    })}
                </Select>
                <Select label={"Minutes"} value={scheduleConfig.minutes || Minutes.ZERO} onChange={(ev) => {onScheduleConfigUpdate({ ...scheduleConfig, minutes: ev.target.value });}}>
                    {minutesArray.map((min) => {
                        return <MenuItem value={min}>{min}</MenuItem>
                    })}
                </Select>
            </div>}
            {frequency === Frequency.WEEKLY && <div>
                <InputLabel id="schedule-day-label">Day of Week</InputLabel>
                <Select
                    labelId="schedule-day-label"
                    id="day"
                    value={scheduleConfig.day || Days.SUNDAY}
                    onChange={(ev) => {onScheduleConfigUpdate({ ...scheduleConfig, day: ev.target.value });}}
                >
                    <MenuItem value={Days.SUNDAY}>Sunday</MenuItem>
                    <MenuItem value={Days.MONDAY}>Monday</MenuItem>
                    <MenuItem value={Days.TUESDAY}>Tuesday</MenuItem>
                    <MenuItem value={Days.WEDNESDAY}>Wednesday</MenuItem>
                    <MenuItem value={Days.THURSDAY}>Thursday</MenuItem>
                    <MenuItem value={Days.FRIDAY}>Friday</MenuItem>
                    <MenuItem value={Days.SATURDAY}>Saturday</MenuItem>
                </Select>
                <InputLabel id="schedule-time-label">Hour of Day</InputLabel>
                <Select label={"Hours"} value={scheduleConfig.hours || 0} onChange={(ev) => {onScheduleConfigUpdate({ ...scheduleConfig, hours: ev.target.value });}}>
                    {hoursArray.map((hour) => {
                        return <MenuItem value={hour}>{hour}</MenuItem>
                    })}
                </Select>
            </div>}
        </div>
    );
}

export default ScheduleTriggerSubComponent;
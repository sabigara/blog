import {
  DAY_IN_SECS,
  HOUR_IN_SECS,
  MIN_IN_SECS,
  MONTH_IN_SECS,
  WEEK_IN_SECS,
  YEAR_IN_SECS,
} from "@/constants/datetime";

const intlRelative = new Intl.RelativeTimeFormat("ja", {
  numeric: "always",
  style: "short",
});
const intlAbs = new Intl.DateTimeFormat("ja", {
  dateStyle: "long",
});

function ensureDate(date: Date | number | string) {
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
}

export function relativeTimeFormat(
  date: Date | number | string,
  base = new Date(),
) {
  const d = ensureDate(date);
  const diffInSecs = Math.floor((d.getTime() - base.getTime()) / 1000);
  const diffAbs = Math.abs(diffInSecs);

  let intlRes: string;
  if (diffAbs >= YEAR_IN_SECS) {
    const years = Math.round(diffInSecs / YEAR_IN_SECS);
    intlRes = intlRelative.format(years, "year");
  } else if (diffAbs >= MONTH_IN_SECS) {
    const months = Math.round(diffInSecs / MONTH_IN_SECS);
    intlRes = intlRelative.format(months, "month");
  } else if (diffAbs >= WEEK_IN_SECS) {
    const weeks = Math.round(diffInSecs / WEEK_IN_SECS);
    intlRes = intlRelative.format(weeks, "week");
  } else if (diffAbs >= DAY_IN_SECS) {
    const days = Math.round(diffInSecs / DAY_IN_SECS);
    intlRes = intlRelative.format(days, "days");
  } else if (diffAbs >= HOUR_IN_SECS) {
    const hours = Math.round(diffInSecs / HOUR_IN_SECS);
    intlRes = intlRelative.format(hours, "hour");
  } else {
    // 1分未満は１分として扱う
    const minutes = Math.min(
      Math.floor(diffInSecs / MIN_IN_SECS),
      diffInSecs <= 0 ? -1 : 1,
    );
    intlRes = intlRelative.format(minutes, "minute");
  }
  return refineIntlResult(intlRes);
}

function refineIntlResult(res: string) {
  return res.replaceAll(" ", "");
}

export function datetimeFormat(date: Date | number | string) {
  const d = ensureDate(date);
  return intlAbs.format(d);
}

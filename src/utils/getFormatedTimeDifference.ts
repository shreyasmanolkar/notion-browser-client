import moment, { Moment } from "moment";

const getFormattedTimeDifference = (createdAt: Date, currentTime: Moment) => {
  const now = currentTime;
  const updatedTime = moment(createdAt);

  const diffMinutes = now.diff(updatedTime, "minutes");
  const diffHours = now.diff(updatedTime, "hours");

  if (diffMinutes < 1) {
    return "just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} mins ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hrs ago`;
  } else {
    return updatedTime.format("MMM D");
  }
};

export default getFormattedTimeDifference;

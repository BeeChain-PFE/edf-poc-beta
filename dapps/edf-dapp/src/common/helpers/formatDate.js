export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [
    [
      [year, month, day].join("-"),
      " " + d.getHours() > 10 ? d.getHours() : "0" + d.getHours(),
    ].join("T"),
    d.getMinutes() > 10 ? d.getMinutes() : "0" + d.getMinutes(),
    d.getSeconds() > 10 ? d.getSeconds() : "0" + d.getMinutes(),
  ].join(":");
}

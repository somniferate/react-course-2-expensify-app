import moment from "moment";

const filter = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
}

const altFilter = {
    text: "rent",
    sortBy: "amount",
    startDate: moment(0),
    endDate: moment(0).add(2, "days")
}

export { filter, altFilter }
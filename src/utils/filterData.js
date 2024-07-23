const category = [
  { _id: 1, name: "수필" },
  { _id: 2, name: "소설" },
  { _id: 3, name: "경제" },
  { _id: 4, name: "문학" },
  { _id: 5, name: "공부" },
  { _id: 6, name: "자기계발" },
  { _id: 7, name: "외국어" },
  { _id: 8, name: "만화" },
];

const prices = [
  {
    _id: 0,
    name: "모두",
    array: [],
  },
  {
    _id: 1,
    name: "0 ~ 199원",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "200 ~ 249원",
    array: [200, 249],
  },
  {
    _id: 3,
    name: "250 ~ 279원",
    array: [250, 279],
  },
  {
    _id: 4,
    name: "280 ~ 299원",
    array: [280, 299],
  },
  {
    _id: 5,
    name: "300원 이상",
    array: [300, 1500000],
  },
];

export { category, prices };

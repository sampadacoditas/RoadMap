export const data = {
  id: "1",
  name: "Internet",
  attributes: {
    department: "Production",
    department1: "Production",
    department2: "Production",
    department3: "Production",
    department4: "Production",
  },
  children: [
    {
      id: "2",
      name: "HTML",
      attributes: {
        department: "Production",
        department1: "Production",
        department2: "Production",
        department3: "Production",
        department4: "Production",
      },
      children: [
        {
          id: "3",
          name: "CSS",

          children: [
            {
              id: "4",
              name: "Workers",
            },
          ],
        },
      ],
    },
    {
      id: "7",
      name: "Manager",

      children: [
        {
          id: "8",
          name: "For",

          children: [
            {
              id: "9",
              name: "Workers",
            },
          ],
        },
        {
          id: "10",
          name: "For",

          children: [
            {
              id: "11",
              name: "Workers",
            },
          ],
        },
      ],
    },
    {
      id: "12",
      name: "Manager",

      children: [
        {
          id: "13",
          name: "Sales Officer",

          children: [
            {
              id: "14",
              name: "Salespeople",
            },
          ],
        },
        {
          id: "15",
          name: "Sales Officer",

          children: [
            {
              id: "16",
              name: "Salespeople",
            },
          ],
        },
      ],
    },
  ],
};

// export const data = {
//   id: "1",
//   name: "Internet",
//   attributes: {
//     department: "Production",
//     department1: "Production",
//     department2: "Production",
//     department3: "Production",
//     department4: "Production",
//   },
//   children: [
//     {
//       id: "2",
//       name: "HTML",
//       attributes: {
//         department: "Production",
//         department1: "Production",
//         department2: "Production",
//         department3: "Production",
//         department4: "Production",
//       },
//       children: [
//         {
//           id: "3",
//           name: "CSS",
//           direction: "bottom",
//           children: [
//             {
//               id: "4",
//               name: "Workers",
//             },
//           ],
//         },
//         {
//           id: "4",
//           name: "CSS",
//           direction: "right",
//           children: [
//             {
//               id: "4",
//               name: "Workers",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

import Mino from "~/types/MinoType"

export const MinoTemplates: Mino[] = [
  {
    name: "I",
    color: "red",
    blocks: [
      [ [1, 1, 1, 1] ],
      [
        [1],
        [1],
        [1],
        [1]
      ]
    ]
  },

  {
    name: "O",
    color: "gold",
    blocks: [
      [
        [2, 2],
        [2, 2]
      ]
    ]
  },

  {
    name: "S",
    color: "magenta",
    blocks: [
      [
        [0, 3, 3],
        [3, 3, 0]
      ],
      [
        [3, 0],
        [3, 3],
        [0, 3]
      ]
    ]
  },

  {
    name: "Z",
    color: "lawngreen",
    blocks: [
      [
        [4, 4, 0],
        [0, 4, 4]
      ],
      [
        [0, 4],
        [4, 4],
        [4, 0]
      ]
    ]
  },

  {
    name: "J",
    color: "blue",
    blocks: [
      [
        [5, 5, 5],
        [0, 0, 5]
      ],
      [
        [5, 5],
        [5, 0],
        [5, 0]
      ],
      [
        [5, 0, 0],
        [5, 5, 5]
      ],
      [
        [0, 5],
        [0, 5],
        [5, 5]
      ]
    ]
  },

  {
    name: "L",
    color: "darkorange",
    blocks: [
      [
        [6, 6, 6],
        [6, 0, 0]
      ],
      [
        [6, 0],
        [6, 0],
        [6, 6]
      ],
      [
        [0, 0, 6],
        [6, 6, 6]
      ],
      [
        [6, 6],
        [0, 6],
        [0, 6]
      ]
    ]
  },

  {
    name: "T",
    color: "deepskyblue",
    blocks: [
      [
        [0, 7, 0],
        [7, 7, 7],
      ],
      [
        [0, 7],
        [7, 7],
        [0, 7]
      ],
      [
        [7, 7, 7],
        [0, 7, 0]
      ],
      [
        [7, 0],
        [7, 7],
        [7, 0]
      ]
    ]
  }
]
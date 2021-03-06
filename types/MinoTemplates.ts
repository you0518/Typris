import Mino from '@/types/MinoType'

export const MinoTemplates: Readonly<Mino[]> = [
  {
    name: 'I',
    color: '#D50000',
    stroke: '#B71C1C',
    blocks: [[[1, 1, 1, 1]], [[1], [1], [1], [1]]]
  },

  {
    name: 'O',
    color: '#AA00FF',
    stroke: '#4A148C',
    blocks: [
      [
        [2, 2],
        [2, 2]
      ]
    ]
  },

  {
    name: 'S',
    color: '#304FFE',
    stroke: '#1A237E',
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
    name: 'Z',
    color: '#00B8D4',
    stroke: '#006064',
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
    name: 'J',
    color: '#00C853',
    stroke: '#1B5E20',
    blocks: [
      [
        [5, 5, 5],
        [0, 0, 5]
      ],
      [
        [0, 5],
        [0, 5],
        [5, 5]
      ],
      [
        [5, 0, 0],
        [5, 5, 5]
      ],
      [
        [5, 5],
        [5, 0],
        [5, 0]
      ]
    ]
  },

  {
    name: 'L',
    color: '#FFAB00',
    stroke: '#FF6F00',
    blocks: [
      [
        [6, 6, 6],
        [6, 0, 0]
      ],
      [
        [6, 6],
        [0, 6],
        [0, 6]
      ],
      [
        [0, 0, 6],
        [6, 6, 6]
      ],
      [
        [6, 0],
        [6, 0],
        [6, 6]
      ]
    ]
  },

  {
    name: 'T',
    color: '#FFD600',
    stroke: '#F57F17',
    blocks: [
      [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0]
      ],
      [
        [0, 7, 0],
        [0, 7, 7],
        [0, 7, 0]
      ],
      [
        [0, 0, 0],
        [7, 7, 7],
        [0, 7, 0]
      ],
      [
        [0, 7, 0],
        [7, 7, 0],
        [0, 7, 0]
      ]
    ]
  }
]

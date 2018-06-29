var levels = [
  {
    width: 3,
    height: 3,
    tiles:[
      ['w', 'h', 'w'],
      ['g', 'b', 'g'],
      ['g', 'g', 'g']
    ],
    start: {x: 1, y: 2},
    creatorsBest: 1,
    creator: 'Travis'
  },
  {
    width: 6,
    height: 6,
    tiles:[
      ['w', 'h', 'w', 'w', 'w', 'w'],
      ['g', 'g', 'g', 'b', 'g', 'h'],
      ['g', 'g', 'g', 'w', 'g', 'g'],
      ['g', 'g', 'g', 'g', 'g', 'g'],
      ['w', 'w', 'g', 'g', 'w', 'b'],
      ['h', 'b', 'g', 'g', 'g', 'g']
    ],
    start: {x: 1, y: 1},
    creatorsBest: 20,
    creator: 'Travis'
  },
  {
    width: 6,
    height: 5,
    tiles:[
      ['w', 'g', 'g', 'w', 'g', 'g'],
      ['g', 'g', 'b', 'w', 'b', 'g'],
      ['h', 'g', 'h', 'b', 'g', 'h'],
      ['g', 'b', 'b', 'h', 'w', 'w'],
      ['w', 'g', 'h', 'g', 'b', 'h']
    ],
    start: {x: 1, y: 1},
    creatorsBest: 26,
    creator: 'TigerWar'
  },
  {
    width:14,
    height:4,
    tiles:[
      ['h','b','h','b','g','g','g','h','w','h','h','g','b','g'],
      ['b','g','h','w','g','w','g','g','w','g','w','g','g','h'],
      ['g','w','b','w','g','w','g','b','w','b','w','g','b','w'],
      ['h','b','h','b','g','w','g','g','b','h','h','g','g','w']
    ],
    start:{x:6,y:2},
    creatorsBest: 53,
    creator: 'TigerWar'
  },
  {
    width: 9,
    height: 5,
    tiles:[
      ['h', 'g', 'g', 'w', 'w', 'g', 'b', 'g', 'h'],
      ['w', 'b', 'g', 'g', 'w', 'g', 'g', 'g', 'w'],
      ['g', 'g', 'g', 'h', 'h', 'h', 'g', 'g', 'g'],
      ['b', 'g', 'b', 'b', 'w', 'h', 'b', 'b', 'g'],
      ['h', 'g', 'g', 'g', 'w', 'w', 'g', 'g', 'g']
    ],
    start: {x: 1, y: 2},
    creatorsBest: 58,
    creator: 'Travis'
  },
  {
    width:6,
    height:6,
    tiles:[
      ['w','g','g','h','w','g'],
      ['g','g','g','g','b','g'],
      ['b','w','b','h','w','g'],
      ['h','b','g','b','h','h'],
      ['g','w','b','w','g','w'],
      ['g','b','h','h','g','w']
    ],
    start:{x:2,y:3},
    creatorsBest: 39,
    creator: 'Travis'
  },
  {
    width:10,
    height:5,
    tiles:[
      ['g','g','h','w','g','g','g','g','g','g'],
      ['w','g','g','w','g','g','b','g','b','g'],
      ['h','g','g','b','g','g','w','h','w','h'],
      ['g','g','g','w','g','g','b','g','b','g'],
      ['w','g','h','w','g','g','g','g','g','g']],
    start:{x:2,y:2},
    creatorsBest: 87,
    creator: 'Travis'
  },
  {
    width: 7,
    height: 8,
    tiles:[
      ['g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['b', 'b', 'g', 'h', 'b', 'g', 'w'],
      ['h', 'g', 'b', 'g', 'b', 'g', 'w'],
      ['h', 'w', 'w', 'g', 'w', 'w', 'w'],
      ['b', 'g', 'g', 'g', 'g', 'g', 'g'],
      ['g', 'b', 'g', 'g', 'b', 'g', 'g'],
      ['h', 'h', 'h', 'w', 'g', 'b', 'g'],
      ['h', 'h', 'h', 'w', 'w', 'g', 'w']],
    start: {x: 5, y: 7},
    creatorsBest: 94,
    creator: 'Travis'
  },
  {
    width:20,
    height:12,
    tiles:[
      ['g','g','g','g','g','g','g','g','g','g','g','g','g','w','g','g','g','g','g','g'],
      ['g','g','g','g','g','g','g','g','w','g','w','g','g','w','g','g','w','w','w','g'],
      ['g','g','g','g','g','g','g','g','g','g','g','g','w','w','g','g','w','w','g','g'],
      ['g','g','g','g','g','w','w','w','g','w','g','g','g','h','b','g','w','w','g','g'],
      ['g','g','g','g','g','w','w','g','g','g','g','g','g','w','g','g','g','g','g','g'],
      ['g','g','g','b','g','w','w','w','g','w','g','w','g','w','g','w','g','w','g','w'],
      ['g','g','g','g','g','w','w','g','g','g','g','g','g','h','g','g','g','g','g','g'],
      ['g','g','w','w','w','g','g','w','g','g','g','g','g','w','g','g','g','g','g','g'],
      ['g','g','w','h','g','g','g','g','w','g','g','g','g','w','g','g','w','w','g','g'],
      ['g','g','w','w','w','g','g','g','g','w','g','g','g','g','g','g','g','b','g','g'],
      ['g','w','g','g','g','g','g','g','g','g','g','g','g','g','g','g','w','w','g','w'],
      ['w','w','g','g','g','g','g','g','g','g','w','g','g','w','g','g','g','g','g','g']
    ],
    start:{x:1,y:1},
    creatorsBest: 84,
    creator: 'Dubinois'
  },
  {
    width:8,
    height:7,
    tiles:[
      ['h','h','h','g','g','g','b','h'],
      ['h','b','h','g','b','h','w','w'],
      ['g','h','h','g','w','b','g','g'],
      ['w','g','w','g','w','g','b','g'],
      ['g','g','b','g','h','b','g','g'],
      ['g','b','g','b','g','g','b','g'],
      ['g','g','g','g','w','g','g','g']
    ],
    start:{x:3,y:1},
    creatorsBest: 115,
    creator: 'Travis'
  }
];

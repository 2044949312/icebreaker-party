// src/shared/games.ts
var GAMES = [
  {
    id: "spy",
    name: "\u8C01\u662F\u5367\u5E95",
    latin: "Who is the Spy",
    emoji: "\u{1F575}\uFE0F",
    tagline: "\u4E00\u53E5\u8BDD\u66B4\u9732\u4F60",
    desc: "\u6BCF\u4EBA\u62FF\u5230\u4E00\u4E2A\u8BCD\uFF0C\u53EA\u6709\u4E00\u4E2A\u4EBA\u4E0E\u4F17\u4E0D\u540C\u3002\u8F6E\u6D41\u7528\u4E00\u53E5\u8BDD\u63CF\u8FF0\u81EA\u5DF1\u7684\u8BCD\uFF0C\u65E2\u4E0D\u80FD\u660E\u8BF4\uFF0C\u53C8\u8981\u8BA9\u540C\u4F34\u8BA4\u51FA\u81EA\u5DF1\u3002\u6BCF\u8F6E\u6295\u7968\u6DD8\u6C70\u4E00\u4EBA\u3002",
    minPlayers: 4,
    maxPlayers: 12,
    bestPlayers: [6, 10],
    minutes: [8, 20],
    needs: {
      move: false,
      props: [],
      thinking: 2,
      chaos: 2,
      warmth: 1,
      rivalry: 2,
      talking: 2,
      shyFriendly: 1,
      phones: "each"
    },
    judgeModes: ["ai", "human"],
    judgeNote: "AI \u88C1\u5224\u8D1F\u8D23\u8BA1\u65F6\u3001\u62A5\u8F6E\u6B21\u3001\u7EDF\u8BA1\u7968\u6570\u5E76\u7ED3\u7B97\u80DC\u8D1F\uFF1B\u4EBA\u7C7B\u88C1\u5224\u5219\u7531\u4E00\u540D\u73A9\u5BB6\u624B\u52A8\u5F55\u5165\u6295\u7968\u7ED3\u679C\u3002",
    howTo: [
      "\u6BCF\u4EBA\u624B\u673A\u4E0A\u770B\u5230\u4E00\u4E2A\u8BCD\uFF0C\u5176\u4E2D\u5C11\u6570\u4EBA\u62FF\u5230\u7684\u662F\u8FD1\u4E49\u8BCD\uFF08\u5367\u5E95\uFF09\u3002",
      "\u6309\u5EA7\u4F4D\u987A\u5E8F\uFF0C\u6BCF\u4EBA\u8BF4\u4E00\u53E5\u63CF\u8FF0\u81EA\u5DF1\u8BCD\u7684\u8BDD\uFF0C\u4E0D\u80FD\u76F4\u63A5\u8BF4\u51FA\u8BCD\u672C\u8EAB\u3002",
      "\u4E00\u8F6E\u63CF\u8FF0\u7ED3\u675F\u540E\u6240\u6709\u4EBA\u6295\u7968\uFF0C\u5F97\u7968\u6700\u9AD8\u8005\u51FA\u5C40\u3002",
      "\u5E73\u6C11\u8981\u63EA\u51FA\u5367\u5E95\uFF1B\u5367\u5E95\u8981\u4F2A\u88C5\u5230\u5E73\u6C11\u81EA\u76F8\u6B8B\u6740\u3002"
    ],
    props: [],
    color: "#7c5cff"
  },
  {
    id: "twos",
    name: "\u4E24\u771F\u4E00\u5047",
    latin: "Two Truths and a Lie",
    emoji: "\u{1F3AD}",
    tagline: "\u6700\u7ECF\u5178\u7684\u4E92\u76F8\u8BA4\u8BC6",
    desc: "\u6BCF\u4EBA\u8BF4\u4E09\u4EF6\u5173\u4E8E\u81EA\u5DF1\u7684\u4E8B\uFF0C\u5176\u4E2D\u4E00\u4EF6\u662F\u7F16\u7684\u3002\u5176\u4ED6\u4EBA\u6295\u7968\u731C\u54EA\u6761\u662F\u5047\u3002\u6700\u9002\u5408\u5F7C\u6B64\u8FD8\u4E0D\u719F\u7684\u573A\u5408\uFF0C\u4E00\u8F6E\u4E0B\u6765\u8BDD\u9898\u5168\u6253\u5F00\u4E86\u3002",
    minPlayers: 3,
    maxPlayers: 16,
    bestPlayers: [5, 12],
    minutes: [6, 18],
    needs: {
      move: false,
      props: [],
      thinking: 1,
      chaos: 2,
      warmth: 2,
      rivalry: 1,
      talking: 2,
      shyFriendly: 2,
      phones: "each"
    },
    judgeModes: ["ai", "human"],
    judgeNote: "AI \u88C1\u5224\u7EDF\u8BA1\u6BCF\u4EBA\u88AB\u731C\u4E2D\u7684\u6BD4\u4F8B\uFF0C\u751F\u6210\u300C\u6700\u4F73\u6F14\u6280\u5956\u300D\u4E0E\u300C\u6700\u4F1A\u8BFB\u4EBA\u5956\u300D\u3002",
    howTo: [
      "\u6BCF\u4EBA\u5728\u624B\u673A\u4E0A\u5199\u4E09\u4EF6\u5173\u4E8E\u81EA\u5DF1\u7684\u4E8B\uFF0C\u5176\u4E2D\u4E00\u4EF6\u662F\u5047\u7684\u3002",
      "\u4E3B\u6301\u4EBA\u6309\u987A\u5E8F\u5FF5\u51FA\u67D0\u4E2A\u4EBA\u7684\u4E09\u6761\uFF0C\u672C\u4EBA\u4E0D\u52A8\u58F0\u8272\u3002",
      "\u6240\u6709\u4EBA\u6295\u7968\u731C\u54EA\u4E00\u6761\u662F\u5047\u7684\u3002",
      "\u731C\u5BF9\u7684\u4EBA\u5F97\u5206\uFF0C\u9A97\u8FC7\u5927\u5BB6\u7684\u4EBA\u5F97\u5206\u66F4\u9AD8\u3002"
    ],
    props: [],
    color: "#ff6b6b"
  },
  {
    id: "soup",
    name: "\u6D77\u9F9F\u6C64",
    latin: "Situation Puzzle",
    emoji: "\u{1F372}",
    tagline: "\u53EA\u80FD\u56DE\u7B54\u300C\u662F / \u4E0D\u662F\u300D",
    desc: "\u4E3B\u6301\u4EBA\u7ED9\u4E00\u6BB5\u79BB\u5947\u7684\u573A\u666F\uFF0C\u73A9\u5BB6\u63D0\u95EE\u8FD8\u539F\u771F\u76F8\uFF0C\u800C\u88C1\u5224\u53EA\u80FD\u56DE\u7B54\u300C\u662F\u300D\u300C\u4E0D\u662F\u300D\u6216\u300C\u90E8\u5206\u662F\u300D\u3002\u4E00\u7FA4\u4EBA\u56F4\u7740\u63A8\u7406\uFF0C\u8D8A\u95EE\u8D8A\u4E0A\u5934\u3002",
    minPlayers: 3,
    maxPlayers: 15,
    bestPlayers: [4, 9],
    minutes: [10, 25],
    needs: {
      move: false,
      props: [],
      thinking: 2,
      chaos: 1,
      warmth: 1,
      rivalry: 1,
      talking: 2,
      shyFriendly: 2,
      phones: "some"
    },
    judgeModes: ["ai", "human"],
    judgeNote: "\u8FD9\u9053\u9898\u5FC5\u987B\u6709\u88C1\u5224\u3002AI \u88C1\u5224\u6309\u5173\u952E\u8BCD\u56DE\u7B54\u300C\u662F/\u4E0D\u662F/\u90E8\u5206\u662F\u300D\uFF0C\u4EBA\u7C7B\u88C1\u5224\u62FF\u7740\u6C64\u5E95\u81EA\u5DF1\u5224\u65AD\u5E76\u70B9\u9009\u7B54\u6848\u3002",
    howTo: [
      "\u88C1\u5224\u62FF\u5230\u5B8C\u6574\u7684\u79BB\u5947\u771F\u76F8\uFF0C\u5176\u4ED6\u4EBA\u53EA\u770B\u5F97\u5230\u8868\u9762\u73B0\u8C61\u3002",
      "\u73A9\u5BB6\u8F6E\u6D41\u63D0\u95EE\uFF0C\u95EE\u9898\u5FC5\u987B\u662F\u80FD\u88AB\u56DE\u7B54\u300C\u662F/\u4E0D\u662F\u300D\u7684\u662F\u975E\u95EE\u53E5\u3002",
      "\u88C1\u5224\u56DE\u7B54\uFF0C\u73A9\u5BB6\u636E\u6B64\u62FC\u51FA\u771F\u76F8\u3002",
      "\u6709\u4EBA\u4E3E\u624B\u5BA3\u5E03\u300C\u6211\u77E5\u9053\u4E86\u300D\u5E76\u590D\u8FF0\uFF0C\u8BF4\u5BF9\u5373\u80DC\u3002"
    ],
    props: [],
    color: "#ffb347"
  },
  {
    id: "bomb",
    name: "\u6570\u5B57\u70B8\u5F39",
    latin: "Number Bomb",
    emoji: "\u{1F4A3}",
    tagline: "30 \u79D2\u5168\u573A\u5C16\u53EB",
    desc: "\u8303\u56F4\u5185\u85CF\u4E00\u4E2A\u6570\u5B57\uFF0C\u5927\u5BB6\u8F6E\u6D41\u731C\uFF0C\u8303\u56F4\u6BCF\u6B21\u88AB\u538B\u7F29\u3002\u8D8A\u9760\u540E\u8D8A\u7A92\u606F\uFF0C\u8E29\u4E2D\u7684\u4EBA\u63A5\u53D7\u60E9\u7F5A\u3002\u96F6\u95E8\u69DB\u3001\u8282\u594F\u6781\u5FEB\uFF0C\u6700\u9002\u5408\u51B7\u573A\u6025\u6551\u3002",
    minPlayers: 3,
    maxPlayers: 20,
    bestPlayers: [5, 14],
    minutes: [3, 12],
    needs: {
      move: false,
      props: [],
      thinking: 0,
      chaos: 2,
      warmth: 0,
      rivalry: 2,
      talking: 1,
      shyFriendly: 2,
      phones: "some"
    },
    judgeModes: ["ai"],
    judgeNote: "AI \u88C1\u5224\u5FC3\u91CC\u85CF\u597D\u6570\u5B57\uFF0C\u5B9E\u65F6\u538B\u7F29\u533A\u95F4\u5E76\u5728\u5927\u5C4F\u4E0A\u505A\u5FC3\u8DF3\u5012\u8BA1\u65F6\u3002",
    howTo: [
      "\u88C1\u5224\u5728 1 \u5230 100 \u4E4B\u95F4\u85CF\u4E00\u4E2A\u6570\u5B57\uFF0C\u8C01\u90FD\u4E0D\u77E5\u9053\u3002",
      "\u73A9\u5BB6\u8F6E\u6D41\u62A5\u6570\uFF0C\u62A5\u51FA\u7684\u6570\u4F1A\u628A\u533A\u95F4\u5939\u5F97\u66F4\u7A84\u3002",
      "\u533A\u95F4\u8D8A\u7A84\u8D8A\u5371\u9669\uFF0C\u62A5\u5230\u533A\u95F4\u7AEF\u70B9\u9644\u8FD1\u7684\u4EBA\u51E0\u4E4E\u5FC5\u70B8\u3002",
      "\u8E29\u4E2D\u6570\u5B57\u7684\u4EBA\u51FA\u5C40\u5E76\u63A5\u53D7\u60E9\u7F5A\uFF0C\u5927\u5C4F\u663E\u793A\u300C\u562D\u300D\u3002"
    ],
    props: [],
    color: "#ff4d4d"
  },
  {
    id: "seven",
    name: "\u9022\u4E03\u8FC7",
    latin: "Pass on Seven",
    emoji: "7\uFE0F\u20E3",
    tagline: "\u53CD\u5E94\u529B\u7684\u5BA1\u5224",
    desc: "\u4F9D\u6B21\u62A5\u6570\uFF0C\u9047\u5230 7 \u6216\u542B 7 \u7684\u6570\u4E0D\u80FD\u5FF5\u51FA\u6765\uFF0C\u8981\u62CD\u684C\u5B50\u558A\u8FC7\u3002\u6162\u534A\u62CD\u6216\u8005\u5634\u74E2\u7684\u76F4\u63A5\u6DD8\u6C70\uFF0C\u7EAF\u9760\u53CD\u5E94\uFF0C\u70ED\u573A\u6548\u7387\u6700\u9AD8\u3002",
    minPlayers: 4,
    maxPlayers: 24,
    bestPlayers: [6, 16],
    minutes: [3, 10],
    needs: {
      move: true,
      props: [],
      thinking: 0,
      chaos: 2,
      warmth: 0,
      rivalry: 2,
      talking: 1,
      shyFriendly: 2,
      phones: "none"
    },
    judgeModes: ["ai", "human"],
    judgeNote: "AI \u88C1\u5224\u6309\u8282\u594F\u63D0\u793A\u4E0B\u4E00\u4E2A\u8BE5\u62A5\u7684\u6570\u5E76\u8BB0\u5F55\u5931\u8BEF\uFF1B\u4EBA\u7C7B\u88C1\u5224\u73B0\u573A\u76EF\u7740\u8C01\u9519\u4E86\uFF0C\u5728\u624B\u673A\u4E0A\u8FDB\u5931\u8BEF\u540D\u5355\u3002",
    howTo: [
      "\u6240\u6709\u4EBA\u56F4\u6210\u4E00\u5708\u6309\u987A\u5E8F\u62A5\u6570\uFF0C\u4ECE 1 \u5F00\u59CB\u3002",
      "\u9047\u5230 7 \u7684\u500D\u6570\uFF0C\u6216\u6570\u5B57\u91CC\u542B 7\uFF0817\u300127\u300171\uFF09\uFF0C\u8981\u8DF3\u8FC7\u4E0D\u62A5\u6570\u3002",
      "\u62A5\u9519\u3001\u8BE5\u8FC7\u6CA1\u8FC7\u3001\u6216\u8005\u8D85\u8FC7\u4E09\u79D2\u6CA1\u63A5\u4E0A\u7684\uFF0C\u8BB0\u4E00\u6B21\u5931\u8BEF\u3002",
      "\u7D2F\u8BA1\u5931\u8BEF\u6700\u591A\u7684\u4EBA\u88AB\u6DD8\u6C70\u6216\u63A5\u53D7\u60E9\u7F5A\u3002"
    ],
    props: [],
    color: "#22c1c3"
  },
  {
    id: "story",
    name: "\u6545\u4E8B\u63A5\u9F99",
    latin: "Chain Story",
    emoji: "\u270D\uFE0F",
    tagline: "\u4E00\u4EBA\u4E00\u53E5\uFF0C\u8DD1\u504F\u624D\u662F\u7CBE\u9AD3",
    desc: "\u6BCF\u8F6E\u6BCF\u4EBA\u5077\u5077\u5199\u4E00\u53E5\u8BDD\uFF0C\u63A5\u5728\u524D\u9762\u7684\u60C5\u8282\u540E\u9762\uFF0CAI \u88C1\u5224\u4F1A\u5B9E\u65F6\u8BC4\u51FA\u300C\u6700\u795E\u8F6C\u6298\u300D\u548C\u300C\u6700\u4F1A\u5706\u573A\u300D\u3002\u6587\u5B57\u7248\u63A5\u9F99\uFF0C\u793E\u6050\u4E5F\u80FD\u653E\u98DE\u3002",
    minPlayers: 3,
    maxPlayers: 15,
    bestPlayers: [4, 10],
    minutes: [8, 20],
    needs: {
      move: false,
      props: [],
      thinking: 1,
      chaos: 2,
      warmth: 2,
      rivalry: 1,
      talking: 0,
      shyFriendly: 2,
      phones: "each"
    },
    judgeModes: ["ai"],
    judgeNote: "\u8FD9\u9053\u9898\u7684\u88C1\u5224\u5FC5\u987B\u7531 AI \u6765\u5F53\uFF1A\u5B83\u8BFB\u8FC7\u6240\u6709\u4EBA\u5199\u7684\u53E5\u5B50\uFF0C\u624D\u80FD\u8BC4\u51FA\u8C01\u63A5\u5F97\u6700\u5999\u3002",
    howTo: [
      "\u5927\u5C4F\u7ED9\u51FA\u6545\u4E8B\u7B2C\u4E00\u53E5\u548C\u4E00\u6761\u9690\u5F62\u89C4\u5219\u3002",
      "\u6BCF\u4EBA\u5728\u624B\u673A\u4E0A\u5077\u5077\u5199\u4E0B\u4E00\u53E5\uFF0C\u4E92\u76F8\u770B\u4E0D\u5230\u3002",
      "\u5168\u90E8\u63D0\u4EA4\u540E\uFF0C\u88C1\u5224\u6309\u987A\u5E8F\u628A\u53E5\u5B50\u4E32\u6210\u5B8C\u6574\u6545\u4E8B\u6717\u8BFB\u3002",
      "\u88C1\u5224\u6309\u8FDE\u8D2F\u5EA6\u3001\u8F6C\u6298\u3001\u89C4\u5219\u6267\u884C\u6253\u5206\u5E76\u53D1\u5956\u3002"
    ],
    props: [],
    color: "#4d96ff"
  },
  {
    id: "never",
    name: "\u6211\u6709\u4F60\u6CA1\u6709",
    latin: "Never Have I Ever",
    emoji: "\u{1F645}",
    tagline: "\u539F\u6765\u53EA\u6709\u4F60\u8FD9\u6837",
    desc: "\u6BCF\u4EBA\u8BF4\u4E00\u4EF6\u81EA\u5DF1\u505A\u8FC7\u3001\u8BA4\u4E3A\u522B\u4EBA\u591A\u534A\u6CA1\u505A\u8FC7\u7684\u4E8B\u3002\u505A\u8FC7\u7684\u4EBA\u6263\u5206\u3002\u4F1A\u53D1\u73B0\u5F88\u591A\u610F\u60F3\u4E0D\u5230\u7684\u4E00\u9762\uFF0C\u719F\u7EDC\u901F\u5EA6\u6700\u5FEB\u3002",
    minPlayers: 3,
    maxPlayers: 16,
    bestPlayers: [4, 10],
    minutes: [6, 15],
    needs: {
      move: false,
      props: [],
      thinking: 0,
      chaos: 2,
      warmth: 2,
      rivalry: 2,
      talking: 2,
      shyFriendly: 1,
      phones: "each"
    },
    judgeModes: ["ai", "human"],
    judgeNote: "AI \u88C1\u5224\u8BFB\u9898\u5E76\u7ED9\u51FA\u300C\u51B7\u95E8\u5EA6\u300D\u9884\u4F30\u548C\u7ED3\u7B97\uFF1B\u4EBA\u7C7B\u88C1\u5224\u73B0\u573A\u6570\u8C01\u4E3E\u624B\uFF0C\u76F4\u63A5\u5F55\u5165\u6263\u5206\u3002",
    howTo: [
      "\u6BCF\u4EBA\u5148\u6709 10 \u5206\u3002",
      "\u4E00\u8F6E\u4E00\u540D\u73A9\u5BB6\u8BF4\u4E00\u4EF6\u81EA\u5DF1\u505A\u8FC7\u7684\u4E8B\uFF0C\u53E5\u5F0F\u662F\u300C\u6211\u6709\u4F60\u6CA1\u6709\uFF1A\u2026\u2026\u300D\u3002",
      "\u73B0\u573A\u771F\u7684\u6CA1\u505A\u8FC7\u7684\u4EBA\u4E0D\u7528\u52A8\uFF0C\u505A\u8FC7\u7684\u4EBA\u6263\u5206\u3002",
      "\u5206\u6570\u6700\u4F4E\u7684\u4EBA\u63A5\u53D7\u60E9\u7F5A\uFF0C\u6700\u51B7\u95E8\u7684\u4E8B\u62FF\u52A0\u6210\u3002"
    ],
    props: [],
    color: "#a56cff"
  },
  {
    id: "mime",
    name: "\u4F60\u6BD4\u6211\u731C",
    latin: "Charades",
    emoji: "\u{1F938}",
    tagline: "\u80A2\u4F53\u5E9F\u7269\u7684\u72C2\u6B22",
    desc: "\u5927\u5C4F\u5012\u8BA1\u65F6\uFF0C\u4E00\u4E2A\u4EBA\u8FDE\u6BD4\u5212\u5E26\u8BF4\u5730\u6F14\uFF0C\u5176\u4ED6\u4EBA\u731C\u3002\u6BD4\u5212\u7684\u4EBA\u624B\u673A\u4E0A\u4E0D\u65AD\u6362\u8BCD\uFF0C\u731C\u5BF9\u70B9\u52FE\u8FDB\u4E0B\u4E00\u4E2A\u3002\u7AD9\u8D77\u6765\u75AF\u4E00\u4E0B\u7684\u6700\u5FEB\u65B9\u5F0F\u3002",
    minPlayers: 4,
    maxPlayers: 20,
    bestPlayers: [6, 16],
    minutes: [5, 15],
    needs: {
      move: true,
      props: [],
      thinking: 1,
      chaos: 2,
      warmth: 0,
      rivalry: 2,
      talking: 2,
      shyFriendly: 0,
      phones: "some"
    },
    judgeModes: ["ai", "human"],
    judgeNote: "AI \u88C1\u5224\u6309\u96BE\u5EA6\u7ED9\u5206\u5E76\u7EDF\u8BA1\u8FDE\u51FB\uFF1B\u4EBA\u7C7B\u88C1\u5224\u8D1F\u8D23\u73B0\u573A\u5224\u5B9A\u300C\u7B97\u4E0D\u7B97\u731C\u5BF9\u300D\u3002",
    howTo: [
      "\u4E00\u4EBA\u7AD9\u5230\u6700\u524D\u9762\u5F53\u6BD4\u5212\u8005\uFF0C\u53EA\u6709\u4ED6\u80FD\u770B\u5230\u8BCD\u3002",
      "\u8BA1\u65F6\u5F00\u59CB\uFF0C\u6BD4\u5212\u8005\u7528\u52A8\u4F5C\u6216\u63CF\u8FF0\u8BA9\u522B\u4EBA\u731C\uFF0C\u4E0D\u80FD\u8BF4\u51FA\u8BCD\u91CC\u7684\u5B57\u3002",
      "\u731C\u5BF9\u540E\u7531\u8BA1\u5206\u8005\u70B9\u300C\u5BF9\u4E86\u300D\uFF0C\u81EA\u52A8\u8DF3\u5230\u4E0B\u4E00\u4E2A\u8BCD\u3002",
      "\u653E\u5F03\u5F53\u524D\u8BCD\u8981\u6263\u65F6\u95F4\uFF0C\u65F6\u95F4\u5230\u6309\u731C\u4E2D\u6570\u7ED3\u7B97\u3002"
    ],
    props: [],
    color: "#f9a826"
  }
];
var GAME_BY_ID = Object.fromEntries(
  GAMES.map((g) => [g.id, g])
);

// src/shared/types.ts
var ROOM_CODE_LENGTH = 6;

// src/shared/judge.ts
var P = {
  open: [
    "\u88C1\u5224\u5C31\u4F4D\u3002\u8FD9\u5C40\u6211\u76EF\u7D27\u4E00\u70B9\uFF0C\u4F60\u4EEC\u968F\u610F\u3002",
    "\u6211\u6765\u5F53\u88C1\u5224\u3002\u89C4\u5219\u51B2\u7A81\u7684\u65F6\u5019\uFF0C\u4EE5\u73B0\u573A\u5F00\u5FC3\u4E3A\u51C6\u3002",
    "\u88C1\u5224\u8FD9\u8FB9\u51C6\u5907\u597D\u4E86\u3002\u8BB0\u4F4F\uFF1A\u8F93\u7684\u4EBA\u8D1F\u8D23\u60E9\u7F5A\uFF0C\u8D62\u7684\u4EBA\u8D1F\u8D23\u89E3\u91CA\u3002",
    "\u672C\u88C1\u5224\u4E0D\u504F\u8892\u4EFB\u4F55\u4EBA\u2014\u2014\u9664\u975E\u6709\u4EBA\u660E\u663E\u5728\u88C5\u3002"
  ],
  round: [
    "\u7B2C {round} \u8F6E\uFF0C\u5F00\u59CB\u3002",
    "\u7B2C {round} \u8F6E\u6765\u4E86\uFF0C\u8282\u594F\u6536\u7D27\u4E00\u70B9\u3002",
    "\u7B2C {round} \u8F6E\u3002\u8FD9\u4E00\u8F6E\u6211\u4E0D\u63A5\u53D7\u300C\u6211\u4E0D\u4F1A\u300D\u8FD9\u79CD\u56DE\u7B54\u3002"
  ],
  hurry: [
    "{name}\uFF0C\u5230\u4F60\u4E86\uFF0C\u522B\u8BA9\u5927\u5BB6\u7B49\u4F60\u4E00\u4E2A\u4EBA\u7684\u6C89\u9ED8\u3002",
    "\u65F6\u95F4\u4E0D\u591A\u4E86\uFF0C{name} \u7684\u60F3\u6CD5\u6211\u5148\u8BB0\u6210\u300C\u8FD8\u6CA1\u60F3\u597D\u300D\u3002",
    "{name} \u518D\u4E0D\u5F00\u53E3\uFF0C\u6211\u5C31\u5F53\u4F60\u81EA\u52A8\u5F03\u6743\u5566\u3002",
    "\u8FD8\u6709\u4EBA\u5728\u618B\u5927\u62DB\u5417\uFF1F{name} \u770B\u8D77\u6765\u5728\u618B\u3002",
    "\u5012\u8BA1\u65F6\u5F00\u59CB\u4E86\u3002\u614C\u662F\u6B63\u5E38\u7684\uFF0C\u614C\u8FD8\u80FD\u8BF4\u5BF9\u624D\u53EB\u672C\u4E8B\u3002"
  ],
  praise: [
    "{name} \u8FD9\u53E5\u6F02\u4EAE\uFF0C\u6211\u81EA\u5DF1\u90FD\u6CA1\u7ED5\u8FC7\u6765\u3002",
    "{name} \u8BF4\u5F97\u633A\u7A33\uFF0C\u7A33\u5F97\u53EF\u7591\u3002",
    "\u8BB0\u4E00\u4E0B\uFF1A{name} \u521A\u624D\u90A3\u6CE2\u662F\u6559\u79D1\u4E66\u7EA7\u522B\u7684\u3002",
    "{name} \u4E00\u5F00\u53E3\uFF0C\u6211\u5C31\u77E5\u9053\u8FD9\u8F6E\u6709\u4EBA\u8981\u5012\u9709\u4E86\u3002"
  ],
  suspect: [
    "{name} \u521A\u624D\u7684\u63CF\u8FF0\u6709\u70B9\u6CDB\uFF0C\u6211\u5148\u8BB0\u5728\u5C0F\u672C\u672C\u4E0A\u3002",
    "{name} \u8BF4\u5F97\u592A\u5B89\u5168\u4E86\uFF0C\u5B89\u5168\u5F97\u50CF\u4E0D\u77E5\u9053\u81EA\u5DF1\u662F\u4EC0\u4E48\u3002",
    "\u6709\u4EBA\u6CE8\u610F\u5230\u5417\uFF0C{name} \u8FD9\u8F6E\u628A\u8BDD\u9898\u63A8\u7ED9\u522B\u4EBA\u4E86\u3002"
  ],
  reveal: [
    "\u7968\u578B\u51FA\u6765\u4E86\u3002",
    "\u7ED3\u7B97\uFF0C\u6211\u4E0D\u505A\u4EFB\u4F55\u8868\u60C5\u3002",
    "\u5927\u5C4F\u89C1\u5206\u6653\u3002"
  ],
  out: [
    "{name} \u51FA\u5C40\u3002\u8D70\u4E4B\u524D\u7559\u4E00\u53E5\u9057\u8A00\u5427\uFF0C\u8FD9\u662F\u89C4\u77E9\u3002",
    "{name} \u88AB\u62AC\u8D70\u4E86\u3002\u623F\u95F4\u91CC\u7684\u7A7A\u6C14\u7A81\u7136\u5C31\u8BDA\u5B9E\u4E86\u3002",
    "{name} \u6DD8\u6C70\u3002\u4F60\u7684\u8BCD\u662F\u300C{word}\u300D\u3002"
  ],
  safe: [
    "\u8FD9\u8F6E\u5E73\u4E86\uFF0C\u8C01\u4E5F\u6CA1\u88AB\u62AC\u8D70\u3002\u5C34\u5C2C\u7684\u662F\u4F60\u4EEC\u3002",
    "\u7968\u6563\u4E86\uFF0C\u7B97\u4F60\u4EEC\u56E2\u7ED3\u3002"
  ],
  winGood: [
    "\u5E73\u6C11\u80DC\u5229\u3002\u5367\u5E95\u85CF\u5230\u6700\u540E\u4E5F\u6CA1\u85CF\u4F4F\u3002",
    "\u8FD9\u4E00\u5C40\u662F\u300C\u4E92\u76F8\u8BA4\u8BC6\u300D\u8D62\u4E86\u3002",
    "\u6B63\u4E49\u65B9\u83B7\u80DC\u2014\u2014\u867D\u7136\u8FC7\u7A0B\u975E\u5E38\u4E0D\u6B63\u4E49\u3002"
  ],
  winBad: [
    "\u5367\u5E95\u83B7\u80DC\u3002\u8BF4\u660E\u4F60\u4EEC\u5BF9\u5F7C\u6B64\u7684\u5224\u65AD\u7EA6\u7B49\u4E8E\u62BD\u7B7E\u3002",
    "\u5367\u5E95\u8D62\u4E86\u3002\u4ED6\u521A\u624D\u90A3\u53E5\u300C\u6211\u5E73\u5E38\u5728\u5BB6\u300D\u9A97\u8FC7\u4E86\u5168\u573A\u3002",
    "\u5C11\u6570\u6D3E\u80DC\u5229\u3002\u8FD9\u5C40\u4E4B\u540E\u4F60\u4EEC\u8981\u91CD\u65B0\u8BA4\u8BC6\u4E00\u4E0B\u4E86\u3002"
  ],
  award: [
    "{name} \u62FF\u5230\u300C{title}\u300D\u3002",
    "\u300C{title}\u300D\u2014\u2014{name}\uFF0C\u5F53\u4E4B\u65E0\u6127\u3002",
    "\u8FD9\u4E2A\u5956\u6211\u7ED9 {name}\uFF1A{title}\u3002"
  ],
  tie: [
    "\u5206\u6570\u6253\u5E73\uFF0C\u90A3\u5C31\u4EA4\u7ED9\u547D\u8FD0\u2014\u2014\u6216\u8005\u4EA4\u7ED9\u4E0B\u4E00\u8F6E\u3002",
    "\u5E76\u5217\u3002\u6211\u4E0D\u505A\u52A0\u8D5B\u88C1\u51B3\uFF0C\u4F60\u4EEC\u81EA\u5DF1\u5546\u91CF\u8C01\u8BF7\u5BA2\u3002"
  ],
  close: [
    "\u672C\u5C40\u7ED3\u675F\u3002\u611F\u8C22\u914D\u5408\uFF0C\u4E0B\u6B21\u51B7\u573A\u7684\u65F6\u5019\u8BB0\u5F97\u53EB\u6211\u3002",
    "\u88C1\u5224\u4E0B\u73ED\u3002\u60E9\u7F5A\u73AF\u8282\u4E0D\u8981\u8DF3\u8FC7\uFF0C\u90A3\u662F\u7CBE\u9AD3\u3002",
    "\u8FD9\u5C40\u6211\u5224\u5B8C\u4E86\u3002\u603B\u4F53\u8BC4\u4EF7\uFF1A\u4F60\u4EEC\u7684\u9ED8\u5951\u6BD4\u60F3\u8C61\u4E2D\u597D\uFF0C\u4E5F\u6BD4\u60F3\u8C61\u4E2D\u5435\u3002"
  ],
  timeout: [
    "{name} \u8D85\u65F6\uFF0C\u8FD9\u4E00\u624B\u6211\u6309\u5931\u8BEF\u8BB0\u4E86\u3002",
    "\u65F6\u95F4\u5230\u3002{name} \u7684\u72B9\u8C6B\u5DF2\u7ECF\u88AB\u5168\u573A\u542C\u89C1\u3002"
  ]
};
var lastUsed = {};
function roll(cat) {
  const pool = P[cat] ?? P.open;
  const used = lastUsed[cat] ?? [];
  const fresh = pool.filter((x) => !used.includes(x));
  const chosen = (fresh.length ? fresh : pool)[Math.floor(Math.random() * (fresh.length || pool.length))];
  lastUsed[cat] = [chosen, ...used].slice(0, Math.max(1, pool.length - 1));
  return chosen;
}
function judge(cat, vars = {}) {
  let s = roll(cat);
  for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}
var TITLES = [
  "\u6700\u4F73\u6F14\u6280\u5956",
  "\u6700\u4F1A\u8BFB\u4EBA\u5956",
  "\u795E\u8F6C\u6298\u5956",
  "\u6700\u5F3A\u5706\u573A\u5956",
  "\u51B7\u573A\u6025\u6551\u5956",
  "\u6700\u5F3A\u5927\u8111\u5956",
  "\u6700\u4F1A\u63D0\u95EE\u5956",
  "\u53CD\u5E94\u51A0\u519B",
  "\u80CC\u9505\u4FA0",
  "\u5168\u573A\u6700\u7A33"
];
function titleFor(rank) {
  return TITLES[Math.min(rank, TITLES.length - 1)];
}
function rankByScore(players) {
  const sorted = players.slice().sort((a, b) => b.score - a.score);
  let rank = 0;
  let prev = null;
  return sorted.map((p, i) => {
    if (p.score !== prev) rank = i;
    prev = p.score;
    return { player: p, rank, title: titleFor(rank) };
  });
}

// src/shared/engine/util.ts
var randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
var pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
var seated = (room) => room.players.slice().sort((a, b) => a.seat - b.seat);
var alive = (room) => seated(room).filter((p) => p.alive);
var byId = (room, id) => room.players.find((p) => p.id === id);
var nameOf = (room, id) => id && byId(room, id)?.name || "\u67D0\u4EBA";
var isRefereeAct = (room, actor) => !!actor && (actor.isHost || room.refereeId === actor.id);
function addScore(room, id, delta) {
  const p = byId(room, id);
  if (p) p.score = Math.max(0, p.score + delta);
}
var secondsLeft = (room, now) => room.deadlineAt == null ? null : Math.max(0, Math.ceil((room.deadlineAt - now) / 1e3));
function ev(room, kind, text) {
  room.seq += 1;
  room.events.push({ seq: room.seq, at: Date.now(), kind, text });
  if (room.events.length > 60) room.events.splice(0, room.events.length - 60);
}
function phase(room, next, opts) {
  room.phase = next;
  if (opts?.round !== void 0) room.round = opts.round;
  if (opts?.turn !== void 0) room.turn = opts.turn;
  room.deadlineAt = opts?.ms ? Date.now() + opts.ms : null;
  room.updatedAt = Date.now();
}
function retime(room, ms) {
  room.deadlineAt = Date.now() + ms;
}
function allSubmitted(room, ids, key, bag) {
  const store2 = room.data[bag]?.[key];
  if (!store2) return false;
  return ids.every((id) => store2[id] !== void 0 && store2[id] !== "" && store2[id] !== null);
}
function slot(room, key) {
  if (!room.data[key]) room.data[key] = {};
  return room.data[key];
}
var spy = (room) => slot(room, "spy");
var twos = (room) => slot(room, "twos");
var soup = (room) => slot(room, "soup");
var bomb = (room) => slot(room, "bomb");
var seven = (room) => slot(room, "seven");
var story = (room) => slot(room, "story");
var never = (room) => slot(room, "never");
var mime = (room) => slot(room, "mime");
function grams(text) {
  const clean = (text || "").replace(/\s+/g, "");
  const out = /* @__PURE__ */ new Set();
  const en = clean.toLowerCase().match(/[a-z]{2,}/g) ?? [];
  en.forEach((w) => out.add(w));
  for (let i = 0; i < clean.length - 1; i++) out.add(clean.slice(i, i + 2));
  if (clean.length === 1) out.add(clean);
  return out;
}
function overlap(a, b) {
  const ga = grams(a);
  let hit = 0;
  for (const g of grams(b)) if (ga.has(g)) hit += 1;
  return hit;
}
var clip = (s, n = 60) => {
  const t = (s || "").trim();
  return t.length > n ? t.slice(0, n) + "\u2026" : t;
};
var sanitize = (s, max = 200) => String(s ?? "").replace(/\r?\n/g, " ").trim().slice(0, max);

// src/shared/engine/bomb.ts
var HUNT_MS = 15e3;
var MAX_ROUND = 3;
var MIN_VALUE = 1;
var MAX_VALUE = 100;
var SAFE_POINTS = 1;
var PRESS_NORMAL = [
  "\u5B89\u5168\u3002\u533A\u95F4\u53C8\u7D27\u4E86\u4E00\u683C\uFF0C\u6982\u7387\u5C31\u5927\u4E86\u4E00\u683C\u3002",
  "\u6CA1\u70B8\uFF0C\u522B\u9AD8\u5174\u592A\u65E9\uFF0C\u4E0B\u4E00\u4E2A\u7EE7\u7EED\u3002",
  "\u6D3B\u7740\u7684\u4EBA\u6392\u961F\uFF0C\u522B\u63D2\u961F\u3002"
];
var PRESS_TIGHT = [
  "\u533A\u95F4\u53EA\u5269\u4E2A\u4F4D\u6570\u7684\u53EF\u80FD\u4E86\uFF0C\u73B0\u5728\u62A5\u6570\u7B49\u4E8E\u5728\u5200\u5C16\u4E0A\u6392\u961F\u3002",
  "\u5269\u4E0B\u7684\u6570\u4E00\u53EA\u624B\u6570\u5F97\u8FC7\u6765\uFF0C\u8C01\u5F00\u53E3\u8C01\u5FC3\u865A\u3002",
  "\u8FD9\u5DF2\u7ECF\u662F\u8FD1\u8DDD\u79BB\u63A5\u89E6\u4E86\uFF0C\u5C4F\u4F4F\u547C\u5438\u3002"
];
var PRESS_DEADLY = [
  "\u8FD9\u4E0D\u53EB\u731C\u6570\u5B57\uFF0C\u8FD9\u53EB\u62BD\u7B7E\u3002",
  "\u5C31\u5269\u8FD9\u4E48\u4E24\u4E09\u4E2A\u6570\uFF0C\u4E0B\u4E00\u5F20\u5634\u57FA\u672C\u9884\u5B9A\u60E9\u7F5A\u3002",
  "\u6211\u770B\u7740\u5927\u5C4F\u90FD\u66FF\u4E0B\u4E00\u4E2A\u4EBA\u6570\u624B\u5FC3\u51FA\u6C57\u3002"
];
function widthOf(d) {
  return Math.max(0, d.high - d.low);
}
function sizeOf(d) {
  return Math.max(0, d.high - d.low + 1);
}
function currentId(d) {
  return d.order[d.cursor] ?? null;
}
function currentName(room, d) {
  const p = byId(room, currentId(d) ?? "");
  return p?.name ?? "\u4E0B\u4E00\u4F4D";
}
function boomCount(d, id) {
  return d.booms[id] ?? 0;
}
function newRound(room) {
  const d = bomb(room);
  d.target = randInt(MIN_VALUE, MAX_VALUE);
  d.low = MIN_VALUE;
  d.high = MAX_VALUE;
  d.history = [];
  d.order = shuffle(room.players.map((p) => p.id));
  d.cursor = 0;
  d.loser = null;
  phase(room, "hunt", { ms: HUNT_MS, round: d.round });
  ev(
    room,
    "judge",
    `\u7B2C ${d.round} \u9897\u96F7\u5DF2\u7ECF\u57CB\u8FDB ${MIN_VALUE} \u5230 ${MAX_VALUE} \u4E4B\u95F4\uFF0C\u5168\u573A\u6CA1\u4EBA\u77E5\u9053\u662F\u54EA\u4E2A\u3002\u5148\u4ECE ${currentName(room, d)} \u5F00\u59CB\uFF0C15 \u79D2\u4E00\u4E2A\u3002`
  );
}
function advance(room) {
  const d = bomb(room);
  if (d.order.length === 0) {
    retime(room, HUNT_MS);
    return;
  }
  d.cursor = (d.cursor + 1) % d.order.length;
  retime(room, HUNT_MS);
}
function awardSafe(room) {
  const d = bomb(room);
  let safe = 0;
  for (const p of room.players) {
    if (p.id === d.loser) continue;
    addScore(room, p.id, SAFE_POINTS);
    safe += 1;
  }
  ev(
    room,
    "score",
    `${d.loser ? nameOf(room, d.loser) : "\u4E0A\u4E00\u4E2A\u4EBA"} \u8E29\u54CD\u4E86\u96F7\uFF0C\u5269\u4E0B ${safe} \u4E2A\u4EBA\u5B89\u5168\u8FC7\u5173\uFF0C\u5404 +${SAFE_POINTS}\u3002`
  );
}
function settleBoomBonus(room) {
  const d = bomb(room);
  for (const p of room.players) {
    addScore(room, p.id, Math.max(0, d.maxRound - boomCount(d, p.id)));
  }
}
function toOver(room) {
  const d = bomb(room);
  if (room.phase === "over") return;
  settleBoomBonus(room);
  phase(room, "over");
  const worst = worstBoomer(room, d);
  ev(
    room,
    "judge",
    `${d.round} \u8F6E\u6253\u5B8C\u4E86\u3002\u6700\u540E\u4E00\u8F6E\u7684\u96F7\u662F ${d.target}\uFF0C${worst ? `\u8E29\u5F97\u6700\u72E0\u7684\u662F ${worst.name}\uFF08${worst.n} \u6B21\uFF09\uFF0C\u60E9\u7F5A\u73AF\u8282\u5F52\u4ED6\u3002` : "\u5C45\u7136\u6CA1\u4EBA\u8E29\u54CD\uFF0C\u60E9\u7F5A\u73AF\u8282\u4F60\u4EEC\u81EA\u5DF1\u5546\u91CF\u3002"}`
  );
  ev(room, "judge", judge("close"));
}
function worstBoomer(room, d) {
  let target = null;
  for (const p of room.players) {
    const n = boomCount(d, p.id);
    if (n > 0 && (!target || n > target.n)) target = { name: p.name, n };
  }
  return target;
}
function boomsLine(room, d) {
  const rows = room.players.map((p) => ({ name: p.name, n: boomCount(d, p.id) })).sort((a, b) => b.n - a.n || a.name.localeCompare(b.name, "zh"));
  if (!rows.length) return "\u6CA1\u4EBA\u53C2\u4E0E\u62A5\u6570\u3002";
  return `\u8E29\u96F7\u699C\uFF1A${rows.map((r) => `${r.name} \xD7${r.n}`).join("\u3001")}\u3002`;
}
function hostHintFor(room) {
  const d = bomb(room);
  switch (room.phase) {
    case "lobby":
      return `\u5F00\u59CB\u540E\u7CFB\u7EDF\u5728 ${MIN_VALUE}~${MAX_VALUE} \u4E4B\u95F4\u968F\u673A\u57CB\u4E00\u4E2A\u6570\uFF0C\u6309\u6D17\u597D\u7684\u987A\u5E8F\u8F6E\u6D41\u62A5\uFF0C\u5171 ${MAX_ROUND} \u8F6E\u3002\u4EBA\u9F50\u4E86\u70B9\u5F00\u59CB\u3002`;
    case "hunt":
      return `\u7B2C ${d.round}/${d.maxRound} \u8F6E\uFF0C\u533A\u95F4 ${d.low}~${d.high}\uFF0C\u8FD8\u5269 ${sizeOf(d)} \u4E2A\u6570\uFF0C\u4E0B\u4E00\u4E2A\u662F ${currentName(room, d)}\u3002${widthOf(d) <= 2 ? "\u5DF2\u7ECF\u5F88\u60AC\u4E86\uFF0C\u76EF\u7D27\u4ED6\u3002" : "\u5361\u4F4F\u5C31\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8DF3\u8FC7\u8FD9\u4E2A\u4EBA\u3002"}`;
    case "boom":
      return `\u8FD9\u8F6E\u7684\u96F7\u662F ${d.target}\uFF0C\u88AB ${nameOf(room, d.loser)} \u8E29\u4E2D\u3002\u6309\u300C\u4E0B\u4E00\u6B65\u300D${d.round < d.maxRound ? `\u8FDB\u5165\u7B2C ${d.round + 1} \u8F6E` : "\u6536\u5C3E\u8FDB\u7ED3\u7B97"}\u3002`;
    case "over":
      return "\u7ED3\u7B97\u9875\u5DF2\u751F\u6210\uFF0C\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u7EE7\u7EED\u505C\u7559\u6216\u5F00\u65B0\u5C40\u3002";
    default:
      return "";
  }
}
var bombEngine = {
  id: "bomb",
  create(room) {
    const d = bomb(room);
    d.low = MIN_VALUE;
    d.high = MAX_VALUE;
    d.target = randInt(MIN_VALUE, MAX_VALUE);
    d.history = [];
    d.order = [];
    d.cursor = 0;
    d.round = 0;
    d.maxRound = MAX_ROUND;
    d.booms = {};
    d.loser = null;
    room.turn = 0;
    room.round = 0;
    phase(room, "lobby");
  },
  start(room) {
    const d = bomb(room);
    d.maxRound = MAX_ROUND;
    d.round = 1;
    d.booms = {};
    d.loser = null;
    room.turn = 0;
    ev(room, "judge", judge("open") + ` \u6211\u5728 ${MIN_VALUE} \u5230 ${MAX_VALUE} \u4E4B\u95F4\u57CB\u4E86\u4E00\u4E2A\u6570\uFF0C${MAX_ROUND} \u8F6E\uFF0C\u8C01\u8E29\u8C01\u4E0A\u60E9\u7F5A\u3002`);
    newRound(room);
  },
  act(room, actor, action, payload) {
    const d = bomb(room);
    if (action === "guess") {
      if (room.phase !== "hunt") return;
      if (actor.id !== currentId(d)) return;
      const raw = payload?.value;
      if (raw === null || raw === void 0 || raw === "") return;
      const value = Math.trunc(Number(raw));
      if (!Number.isFinite(value)) return;
      if (value < MIN_VALUE || value > MAX_VALUE || value < d.low || value > d.high) {
        ev(room, "info", `${actor.name} \u62A5\u7684 ${value} \u4E0D\u5728 ${d.low}~${d.high} \u91CC\uFF0C\u8FD9\u4E2A\u6570\u4E0D\u7B97\uFF0C\u91CD\u65B0\u62A5\u4E00\u4E2A\u3002`);
        return;
      }
      d.history.push({ by: actor.id, value });
      if (value === d.target) {
        d.booms[actor.id] = boomCount(d, actor.id) + 1;
        d.loser = actor.id;
        phase(room, "boom");
        ev(
          room,
          "judge",
          `\u562D\uFF01${actor.name} \u62A5\u7684 ${value} \u5C31\u662F\u90A3\u9897\u96F7\u3002\u7B2C ${d.round} \u8F6E\u7684\u96F7\u5728\u8FD9\u91CC\uFF0C\u8E29\u96F7\u8BB0\u8D26 +1\u3002`
        );
        return;
      }
      if (value < d.target) d.low = Math.max(d.low, value + 1);
      else d.high = Math.min(d.high, value - 1);
      d.cursor = d.order.length ? (d.cursor + 1) % d.order.length : 0;
      retime(room, HUNT_MS);
      const width = widthOf(d);
      const pressure = pick(width <= 2 ? PRESS_DEADLY : width <= 5 ? PRESS_TIGHT : PRESS_NORMAL);
      ev(
        room,
        "judge",
        `${actor.name} \u62A5 ${value}\uFF0C\u6CA1\u70B8\u3002\u533A\u95F4\u5939\u5230 ${d.low} ~ ${d.high}\uFF0C\u8FD8\u5269 ${sizeOf(d)} \u4E2A\u6570\u3002${pressure} \u8F6E\u5230 ${currentName(room, d)}\u3002`
      );
      return;
    }
  },
  next(room, actor) {
    const d = bomb(room);
    if (room.phase === "lobby") {
      this.start(room);
      return;
    }
    if (room.phase === "hunt") {
      ev(room, "judge", judge("hurry", { name: currentName(room, d) }));
      advance(room);
      return;
    }
    if (room.phase === "boom") {
      awardSafe(room);
      if (d.round < d.maxRound) {
        d.round += 1;
        newRound(room);
      } else {
        toOver(room);
      }
      return;
    }
  },
  tick(room, now) {
    if (room.phase !== "hunt") return;
    const d = bomb(room);
    const cur = byId(room, currentId(d) ?? "");
    if (!cur) {
      if (!d.order.some((id) => byId(room, id))) return;
      advance(room);
      ev(room, "info", "\u8FD9\u4F4D\u4E0D\u5728\u73B0\u573A\uFF0C\u5148\u8DF3\u8FC7\uFF0C\u7EE7\u7EED\u62A5\u6570\u3002");
      return;
    }
    if (room.deadlineAt === null || now < room.deadlineAt) return;
    room.turn += 1;
    ev(room, "judge", `${judge("timeout", { name: cur.name })} \u72B9\u8C6B\u4E0D\u7B97\u8E29\u96F7\uFF0C\u4F46\u5168\u623F\u95F4\u90FD\u542C\u89C1\u4E86\u3002`);
    advance(room);
  },
  publicData(room) {
    const d = bomb(room);
    const revealed = room.phase === "boom" || room.phase === "over";
    return {
      bomb: {
        low: d.low,
        high: d.high,
        size: sizeOf(d),
        width: widthOf(d),
        history: d.history,
        round: d.round,
        maxRound: d.maxRound,
        order: d.order,
        cursor: d.cursor,
        current: currentId(d),
        booms: d.booms,
        hesitations: room.turn,
        // 'hunt' 阶段雷和上一轮的输家都不给
        target: revealed ? d.target : null,
        loser: revealed ? d.loser : null,
        judgeMode: room.judgeMode
      }
    };
  },
  secretFor(_room, _me) {
    return {};
  },
  refereeExtra(room) {
    const d = bomb(room);
    return {
      target: d.target,
      range: `${d.low} ~ ${d.high}`,
      note: room.phase === "hunt" ? `\u7B2C ${d.round}/${d.maxRound} \u8F6E\uFF0C\u88C1\u5224\u5FC3\u91CC\u7684\u6570\u662F ${d.target}\uFF0C\u4E0B\u4E00\u4E2A\u62A5\u6570\u7684\u662F ${currentName(room, d)}\u3002\u672C\u5730\u88C1\u5224\u81EA\u5DF1\u4F1A\u5939\u7D27\u533A\u95F4\uFF0C\u4F60\u53EA\u7BA1\u8282\u594F\u3002` : room.phase === "boom" ? `\u8FD9\u8F6E\u7684\u96F7 ${d.target} \u5DF2\u88AB ${nameOf(room, d.loser)} \u8E29\u4E2D\uFF0C\u6309\u300C\u4E0B\u4E00\u6B65\u300D${d.round < d.maxRound ? "\u5F00\u4E0B\u4E00\u8F6E" : "\u8FDB\u7ED3\u7B97"}\u3002` : room.phase === "over" ? "\u672C\u5C40\u7ED3\u675F\uFF0C\u60E9\u7F5A\u73AF\u8282\u4E0D\u8981\u8DF3\u8FC7\u3002" : `\u5F00\u59CB\u540E\u81EA\u52A8\u57CB\u4E00\u4E2A ${MIN_VALUE}~${MAX_VALUE} \u7684\u6570\u3002`
    };
  },
  needs(room, me, view) {
    const d = bomb(room);
    const base = {
      prompt: null,
      input: "none",
      inputHint: "",
      submitted: false,
      hostHint: hostHintFor(room)
    };
    if (!me) return base;
    if (room.phase === "lobby") {
      return {
        ...base,
        prompt: "\u770B\u597D\u5927\u5C4F\u533A\u95F4\uFF0C\u8F6E\u5230\u4F60\u5C31\u76F4\u63A5\u62A5\u6570",
        inputHint: `\u5728 ${MIN_VALUE} \u5230 ${MAX_VALUE} \u4E4B\u95F4\u62A5\u4E00\u4E2A\u6574\u6570`
      };
    }
    if (room.phase === "hunt") {
      if (me.id === currentId(d)) {
        return {
          ...base,
          prompt: "\u8F6E\u5230\u4F60\u62A5\u6570\u4E86",
          input: "number",
          inputHint: `\u5728 ${d.low} \u5230 ${d.high} \u4E4B\u95F4\u62A5\u4E00\u4E2A\u6570`,
          submitted: false
        };
      }
      return {
        ...base,
        prompt: d.order.length ? "\u7B49\u8F6E\u5230\u4F60\uFF0C\u522B\u5E2E\u522B\u4EBA\u51FA\u4E3B\u610F" : "\u7B49\u5F85\u88C1\u5224\u6392\u62A5\u6570\u987A\u5E8F",
        inputHint: `\u5F53\u524D\u533A\u95F4 ${d.low} ~ ${d.high}`
      };
    }
    if (room.phase === "boom") {
      const hit = d.loser === me.id;
      return {
        ...base,
        prompt: hit ? `\u4F60\u8E29\u4E2D\u4E86 ${d.target}\uFF0C\u51C6\u5907\u63A5\u53D7\u60E9\u7F5A` : `\u606D\u559C\u4F60\u6D3B\u8FC7\u4E00\u8F6E\uFF0C\u96F7\u662F ${d.target}`,
        inputHint: hit ? "\u522B\u5B66\u522B\u4EBA\u600E\u4E48\u8EB2\uFF0C\u8FD9\u8F6E\u5DF2\u7ECF\u5B9A\u4E86" : "\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u5F00\u4E0B\u4E00\u8F6E"
      };
    }
    return { ...base, prompt: "\u672C\u5C40\u7ED3\u675F\uFF0C\u5927\u5C4F\u770B\u8E29\u96F7\u699C" };
  },
  finish(room) {
    const d = bomb(room);
    const ranked = rankByScore(room.players);
    const top = ranked[0]?.rank ?? 0;
    const winners = ranked.filter((r) => r.rank === top).map((r) => ({ name: r.player.name, score: r.player.score }));
    const safest = room.players.map((p) => ({ name: p.name, n: boomCount(d, p.id) })).sort((a, b) => a.n - b.n)[0];
    const worst = worstBoomer(room, d);
    return {
      title: "\u8E29\u96F7\u699C",
      lines: [
        `${d.round} \u8F6E\u5171\u57CB\u4E86 ${d.round} \u9897\u96F7\uFF0C\u6700\u540E\u4E00\u8F6E\u7684\u96F7\u662F ${d.target}\uFF0C${d.loser ? `\u7531 ${nameOf(room, d.loser)} \u8E29\u54CD\u3002` : "\u8FD8\u6CA1\u4EBA\u8E29\u54CD\u5C31\u88AB\u6536\u573A\u4E86\u3002"}\uFF08\u6BCF\u4E00\u8F6E\u7684\u96F7\u548C\u8E29\u96F7\u4EBA\u90FD\u8BB0\u5728\u5927\u5C4F\u4E8B\u4EF6\u6D41\u91CC\u3002\uFF09`,
        boomsLine(room, d),
        worst ? `\u6700\u8BE5\u63A5\u53D7\u60E9\u7F5A\u7684\u662F ${worst.name}\uFF08${worst.n} \u6B21\u8E29\u96F7\uFF09\u3002` : "\u5168\u573A\u96F6\u8E29\u96F7\uFF0C\u60E9\u7F5A\u73AF\u8282\u6539\u6210\u96C6\u4F53\u8868\u6F14\u4E00\u4E2A\u8282\u76EE\u3002",
        safest && safest.n === 0 ? `\u6700\u7A33\u7684\u662F ${safest.name}\uFF0C\u4E00\u6B21\u6CA1\u8E29\u3002\u5168\u573A\u72B9\u8C6B ${room.turn} \u6B21\uFF08\u72B9\u8C6B\u4E0D\u7B97\u8E29\u96F7\uFF09\u3002` : `\u5168\u573A\u72B9\u8C6B ${room.turn} \u6B21\uFF08\u72B9\u8C6B\u4E0D\u7B97\u8E29\u96F7\uFF09\u3002`
      ],
      winners,
      verdict: (worst ? `\u8FD9\u4E00\u5C40\u7684\u7ED3\u8BBA\u5F88\u7B80\u5355\uFF1A${worst.name} \u7684\u8FD0\u6C14\u6700\u5DEE\u3002` : "\u8FD9\u4E00\u5C40\u6CA1\u4EBA\u5012\u9709\uFF0C\u8BF4\u660E\u533A\u95F4\u6536\u5F97\u8FD8\u4E0D\u591F\u72E0\u3002") + " " + (safest && safest.n === 0 ? judge("award", { name: safest.name, title: "\u5168\u573A\u6700\u7A33" }) + " " : "") + judge("close")
    };
  }
};

// src/shared/content.ts
var SPY_PAIRS = [
  ["\u725B\u5976", "\u8C46\u6D46"],
  ["\u82F9\u679C", "\u68A8"],
  ["\u9999\u8549", "\u8292\u679C"],
  ["\u6A59\u5B50", "\u67DA\u5B50"],
  ["\u897F\u74DC", "\u54C8\u5BC6\u74DC"],
  ["\u8349\u8393", "\u6A31\u6843"],
  ["\u8461\u8404", "\u8354\u679D"],
  ["\u6843\u5B50", "\u674E\u5B50"],
  ["\u5496\u5561", "\u5976\u8336"],
  ["\u7EFF\u8336", "\u7EA2\u8336"],
  ["\u53EF\u4E50", "\u96EA\u78A7"],
  ["\u679C\u6C41", "\u6C7D\u6C34"],
  ["\u77FF\u6CC9\u6C34", "\u51C9\u767D\u5F00"],
  ["\u7C73\u996D", "\u9762\u6761"],
  ["\u9762\u5305", "\u9992\u5934"],
  ["\u5305\u5B50", "\u997A\u5B50"],
  ["\u7CBD\u5B50", "\u6C64\u5706"],
  ["\u86CB\u7CD5", "\u6708\u997C"],
  ["\u4E09\u660E\u6CBB", "\u996D\u56E2"],
  ["\u6C49\u5821", "\u8089\u5939\u998D"],
  ["\u706B\u9505", "\u9EBB\u8FA3\u70EB"],
  ["\u51B0\u6DC7\u6DCB", "\u5E03\u4E01"],
  ["\u85AF\u7247", "\u7206\u7C73\u82B1"],
  ["\u53E3\u9999\u7CD6", "\u68D2\u68D2\u7CD6"],
  ["\u6838\u6843", "\u82B1\u751F"],
  ["\u897F\u7EA2\u67FF", "\u9EC4\u74DC"],
  ["\u571F\u8C46", "\u7EA2\u85AF"],
  ["\u8611\u83C7", "\u6728\u8033"],
  ["\u8FA3\u6912", "\u80E1\u6912"],
  ["\u5927\u849C", "\u751F\u59DC"],
  ["\u9171\u6CB9", "\u918B"],
  ["\u76D0", "\u7CD6"],
  ["\u8702\u871C", "\u679C\u9171"],
  ["\u8C46\u8150", "\u8150\u7AF9"],
  ["\u732B", "\u72D7"],
  ["\u8001\u864E", "\u72EE\u5B50"],
  ["\u9CA8\u9C7C", "\u9CB8\u9C7C"],
  ["\u8774\u8776", "\u871C\u8702"],
  ["\u9E3D\u5B50", "\u9EBB\u96C0"],
  ["\u9E2D\u5B50", "\u9E45"],
  ["\u5154\u5B50", "\u4ED3\u9F20"],
  ["\u4E4C\u9F9F", "\u8717\u725B"],
  ["\u86C7", "\u8725\u8734"],
  ["\u718A\u732B", "\u8003\u62C9"],
  ["\u9A86\u9A7C", "\u5927\u8C61"],
  ["\u523A\u732C", "\u677E\u9F20"],
  ["\u73AB\u7470", "\u767E\u5408"],
  ["\u4ED9\u4EBA\u638C", "\u7EFF\u841D"],
  ["\u5411\u65E5\u8475", "\u90C1\u91D1\u9999"],
  ["\u6885\u82B1", "\u83CA\u82B1"],
  ["\u8001\u5E08", "\u6559\u7EC3"],
  ["\u533B\u751F", "\u62A4\u58EB"],
  ["\u8B66\u5BDF", "\u4FDD\u5B89"],
  ["\u5F8B\u5E08", "\u6CD5\u5B98"],
  ["\u4E3B\u64AD", "\u6F14\u5458"],
  ["\u670D\u52A1\u5458", "\u53A8\u5E08"],
  ["\u5FEB\u9012\u5458", "\u5916\u5356\u5458"],
  ["\u6D88\u9632\u5458", "\u6551\u751F\u5458"],
  ["\u6444\u5F71\u5E08", "\u753B\u5BB6"],
  ["\u7406\u53D1\u5E08", "\u5316\u5986\u5E08"],
  ["\u6BDB\u8863", "\u536B\u8863"],
  ["\u88D9\u5B50", "\u88E4\u5B50"],
  ["\u624B\u5957", "\u889C\u5B50"],
  ["\u8FD0\u52A8\u978B", "\u76AE\u978B"],
  ["\u5E3D\u5B50", "\u5934\u76D4"],
  ["\u56F4\u5DFE", "\u62AB\u80A9"],
  ["\u7761\u8863", "\u6CF3\u8863"],
  ["\u7259\u5237", "\u7259\u818F"],
  ["\u6D17\u53D1\u6C34", "\u6C90\u6D74\u9732"],
  ["\u6D17\u624B\u6DB2", "\u6D17\u6D01\u7CBE"],
  ["\u6BDB\u5DFE", "\u7EB8\u5DFE"],
  ["\u6795\u5934", "\u9760\u57AB"],
  ["\u88AB\u5B50", "\u6BEF\u5B50"],
  ["\u96E8\u4F1E", "\u96E8\u8863"],
  ["\u94A5\u5319", "\u95E8\u5361"],
  ["\u53F0\u706F", "\u591C\u706F"],
  ["\u8721\u70DB", "\u706F\u6CE1"],
  ["\u5145\u7535\u5668", "\u5145\u7535\u5B9D"],
  ["\u5439\u98CE\u673A", "\u5377\u53D1\u68D2"],
  ["\u626B\u5E1A", "\u62D6\u628A"],
  ["\u5438\u5C18\u5668", "\u626B\u5730\u673A\u5668\u4EBA"],
  ["\u51B0\u7BB1", "\u996E\u6C34\u673A"],
  ["\u6D17\u8863\u673A", "\u6D17\u7897\u673A"],
  ["\u70E4\u7BB1", "\u5FAE\u6CE2\u7089"],
  ["\u7A7A\u8C03", "\u98CE\u6247"],
  ["\u8863\u67DC", "\u4E66\u67DC"],
  ["\u6C99\u53D1", "\u5E8A\u57AB"],
  ["\u7897", "\u76D8\u5B50"],
  ["\u7B77\u5B50", "\u52FA\u5B50"],
  ["\u9505\u94F2", "\u6F0F\u52FA"],
  ["\u4FDD\u6E29\u676F", "\u5976\u74F6"],
  ["\u68B3\u5B50", "\u5243\u987B\u5200"],
  ["\u5A74\u513F\u8F66", "\u5B66\u6B65\u8F66"],
  ["\u624B\u673A", "\u5E73\u677F"],
  ["\u952E\u76D8", "\u9F20\u6807"],
  ["\u8033\u673A", "\u97F3\u54CD"],
  ["\u76F8\u673A", "\u671B\u8FDC\u955C"],
  ["\u7535\u8111", "\u7535\u89C6"],
  ["\u6295\u5F71\u4EEA", "\u6253\u5370\u673A"],
  ["\u7535\u68AF", "\u697C\u68AF"],
  ["\u516C\u4EA4\u8F66", "\u5730\u94C1"],
  ["\u81EA\u884C\u8F66", "\u7535\u52A8\u8F66"],
  ["\u51FA\u79DF\u8F66", "\u7F51\u7EA6\u8F66"],
  ["\u6ED1\u677F", "\u8F6E\u6ED1"],
  ["\u884C\u674E\u7BB1", "\u80CC\u5305"],
  ["\u5730\u56FE", "\u5BFC\u822A"],
  ["\u9AD8\u94C1", "\u98DE\u673A"],
  ["\u673A\u7968", "\u8239\u7968"],
  ["\u8EAB\u4EFD\u8BC1", "\u94F6\u884C\u5361"],
  ["\u62A4\u7167", "\u7B7E\u8BC1"],
  ["\u95E8\u7968", "\u4F18\u60E0\u5238"],
  ["\u7EA2\u7EFF\u706F", "\u6591\u9A6C\u7EBF"],
  ["\u52A0\u6CB9\u7AD9", "\u505C\u8F66\u573A"],
  ["\u56FE\u4E66\u9986", "\u4E66\u5E97"],
  ["\u535A\u7269\u9986", "\u7F8E\u672F\u9986"],
  ["\u516C\u56ED", "\u5E7F\u573A"],
  ["\u8D85\u5E02", "\u83DC\u5E02\u573A"],
  ["\u4FBF\u5229\u5E97", "\u5546\u573A"],
  ["\u9152\u5E97", "\u6C11\u5BBF"],
  ["\u533B\u9662", "\u836F\u5E97"],
  ["\u98DF\u5802", "\u5FEB\u9910\u5E97"],
  ["\u6559\u5BA4", "\u529E\u516C\u5BA4"],
  ["\u5065\u8EAB\u623F", "\u6E38\u6CF3\u9986"],
  ["\u4F53\u80B2\u9986", "\u64CD\u573A"],
  ["\u7406\u53D1\u5E97", "\u7F8E\u5BB9\u9662"],
  ["\u5267\u672C\u6740", "\u5BC6\u5BA4\u9003\u8131"],
  ["\u7535\u5F71", "\u7535\u89C6\u5267"],
  ["\u6F14\u5531\u4F1A", "\u8BDD\u5267"],
  ["\u76F8\u58F0", "\u5C0F\u54C1"],
  ["\u5531\u6B4C", "\u8DF3\u821E"],
  ["\u753B\u753B", "\u4E66\u6CD5"],
  ["\u94A2\u7434", "\u5409\u4ED6"],
  ["\u56F4\u68CB", "\u8C61\u68CB"],
  ["\u6251\u514B", "\u9EBB\u5C06"],
  ["\u79EF\u6728", "\u62FC\u56FE"],
  ["\u6BDB\u7ED2\u73A9\u5177", "\u624B\u529E"],
  ["\u9732\u8425", "\u91CE\u9910"],
  ["\u5E10\u7BF7", "\u7761\u888B"],
  ["\u98CE\u7B5D", "\u6C14\u7403"],
  ["\u6469\u5929\u8F6E", "\u65CB\u8F6C\u6728\u9A6C"],
  ["\u79CB\u5343", "\u6ED1\u68AF"],
  ["\u6E38\u6CF3\u5708", "\u6551\u751F\u8863"],
  ["\u9ED1\u677F", "\u767D\u677F"],
  ["\u7C89\u7B14", "\u9A6C\u514B\u7B14"],
  ["\u4E66\u5305", "\u7B14\u888B"],
  ["\u4F5C\u4E1A\u672C", "\u7B14\u8BB0\u672C"],
  ["\u94A2\u7B14", "\u94C5\u7B14"],
  ["\u6A61\u76AE", "\u5C3A\u5B50"],
  ["\u8BFE\u7A0B\u8868", "\u65E5\u5386"],
  ["\u5956\u72B6", "\u6210\u7EE9\u5355"],
  ["\u773C\u955C", "\u653E\u5927\u955C"],
  ["\u6625\u8282", "\u4E2D\u79CB\u8282"],
  ["\u7AEF\u5348\u8282", "\u5143\u5BB5\u8282"],
  ["\u5723\u8BDE\u8282", "\u5143\u65E6"],
  ["\u6691\u5047", "\u5BD2\u5047"],
  ["\u592A\u9633", "\u6708\u4EAE"],
  ["\u5F69\u8679", "\u6D41\u661F"],
  ["\u5723\u8BDE\u8001\u4EBA", "\u96EA\u4EBA"],
  ["\u5A5A\u793C", "\u6C42\u5A5A"],
  ["\u6BD5\u4E1A\u7167", "\u5168\u5BB6\u798F"],
  ["\u793C\u7269", "\u5FEB\u9012"],
  ["\u8865\u4E60\u73ED", "\u5174\u8DA3\u73ED"],
  ["\u5BB6\u957F\u4F1A", "\u8FD0\u52A8\u4F1A"],
  ["\u5916\u5356", "\u7F51\u8D2D"],
  ["\u5FAE\u4FE1", "QQ"],
  ["\u6DD8\u5B9D", "\u4EAC\u4E1C"],
  ["\u6296\u97F3", "\u5FEB\u624B"]
];
var SOUP_PUZZLES = [
  {
    id: "elevator-keys",
    title: "\u7535\u68AF\u952E\u4E4B\u8C1C",
    question: "\u6BCF\u5929\u65E9\u4E0A\uFF0C\u5C0F\u5468\u5728\u5199\u5B57\u697C\u7535\u68AF\u91CC\u6309\u4E0B 8 \u697C\uFF0C\u51FA\u7535\u68AF\u518D\u722C\u4E03\u5C42\u697C\u68AF\u53BB\u4E0A\u73ED\u3002\u53EF\u53EA\u8981\u5F53\u5929\u4E0B\u96E8\uFF0C\u4ED6\u5C31\u80FD\u4E00\u8DEF\u5750\u5230 15 \u697C\u3002\u6CA1\u4EBA\u66FF\u4ED6\u6309\u952E\uFF0C\u7535\u68AF\u4E5F\u6CA1\u574F\uFF0C\u4ED6\u66F4\u6CA1\u5237\u4EFB\u4F55\u95E8\u7981\u5361\u3002",
    truth: "\u5C0F\u5468\u662F\u6210\u5E74\u4EBA\uFF0C\u8EAB\u9AD8\u53EA\u6709\u4E00\u7C73\u4E8C\uFF0C\u591F\u4E0D\u5230\u9762\u677F\u4E0A\u6392\u90A3\u51E0\u4E2A\u6309\u94AE\uFF0C\u53EA\u597D\u5728 8 \u697C\u51FA\u6765\u8D70\u697C\u68AF\u3002\u4E0B\u96E8\u5929\u4ED6\u5FC5\u5E26\u957F\u67C4\u4F1E\uFF0C\u7528\u4F1E\u5C16\u4E00\u6233\u5C31\u80FD\u6309\u5230 15 \u697C\u3002\u540E\u6765\u884C\u653F\u628A\u8FD9\u6392\u6309\u94AE\u632A\u4F4E\u4E86\u5341\u516C\u5206\uFF0C\u4ED6\u7B2C\u4E00\u5929\u8FDB\u7535\u68AF\u5C31\u6309\u4E86 17 \u697C\uFF0C\u8BA9 17 \u697C\u7684\u540C\u4E8B\u8BEF\u4EE5\u4E3A\u4ED6\u7EC8\u4E8E\u5B66\u4F1A\u5237\u5361\u4E86\u3002",
    yes: ["\u8EAB\u9AD8", "\u4E2A\u5B50", "\u77EE\u4E2A\u5B50", "\u591F\u4E0D\u5230", "\u96E8\u4F1E", "\u957F\u67C4\u4F1E", "\u4E0B\u96E8", "\u6309\u94AE", "\u6309\u952E", "\u7535\u68AF", "\u697C\u68AF", "\u697C\u5C42", "\u516C\u53F8", "\u8EAB\u4F53"],
    no: ["\u7535\u68AF\u574F", "\u6709\u4EBA\u5E2E", "\u95E8\u7981", "\u5237\u5361", "\u505C\u7535", "\u8FD1\u89C6", "\u817F\u811A", "\u6B8B\u75BE", "\u5C0F\u5B69", "\u5973\u4EBA", "\u7F5A\u6B3E", "\u88C5\u4FEE", "\u8FD0\u52A8\u4F1A", "\u6076\u4F5C\u5267"],
    partial: ["\u5065\u5EB7", "\u5E74\u9F84", "\u529E\u516C", "\u4E60\u60EF"],
    hints: [
      "\u4ED6\u548C\u697C\u5C42\u9AD8\u4F4E\u4E4B\u95F4\u6709\u4E2A\u5F88\u5B9E\u9645\u7684\u56F0\u96BE\u3002",
      "\u8FD9\u4E2A\u56F0\u96BE\u548C\u300C\u591F\u4E0D\u591F\u5F97\u7740\u300D\u6709\u5173\u3002",
      "\u4E0B\u96E8\u5929\u4ED6\u624B\u4E0A\u591A\u4E86\u4E00\u6837\u4E1C\u897F\u3002",
      "\u90A3\u628A\u957F\u67C4\u4F1E\u5176\u5B9E\u5C31\u662F\u4ED6\u7684\u300C\u5EF6\u957F\u624B\u81C2\u300D\u3002"
    ],
    tags: ["\u65E5\u5E38\u53CD\u8F6C", "\u65E0\u5398\u5934", "\u8F7B\u63A8\u7406"]
  },
  {
    id: "table-three",
    title: "\u4E09\u53F7\u684C",
    question: "\u9762\u9986\u5899\u4E0A\u8D34\u7740\u4E00\u884C\u5B57\uFF1A\u672C\u5E97\u6CA1\u6709\u4E09\u53F7\u684C\uFF0C\u8BF7\u52FF\u5728\u4E09\u53F7\u684C\u70B9\u5355\u3002\u53EF\u987E\u5BA2\u8FDB\u95E8\u5168\u90FD\u5F80\u4E09\u53F7\u684C\u5750\uFF0C\u8001\u677F\u4E0D\u4F46\u4E0D\u529D\uFF0C\u8FD8\u4EB2\u81EA\u7AEF\u83DC\u8FC7\u53BB\uFF0C\u6536\u94B1\u65F6\u53C8\u628A\u90A3\u5F20\u5B57\u6761\u7FFB\u8FC7\u6765\u6263\u5728\u684C\u4E0A\u3002",
    truth: "\u4E09\u53F7\u684C\u9760\u6696\u6C14\uFF0C\u662F\u8001\u677F\u7559\u7ED9\u6DF1\u591C\u4E0B\u73ED\u7684\u73AF\u536B\u5DE5\u3001\u5916\u5356\u9A91\u624B\u548C\u4EE3\u9A7E\u5E08\u5085\u7684\u3002\u5B57\u6761\u662F\u7ED9\u81EA\u5BB6\u670D\u52A1\u5458\u770B\u7684\u2014\u2014\u5979\u603B\u5FCD\u4E0D\u4F4F\u95EE\u90A3\u684C\u70B9\u4EC0\u4E48\uFF0C\u5750\u5728\u90A3\u513F\u7684\u4EBA\u53CD\u800C\u4E0D\u597D\u610F\u601D\u8FDB\u95E8\u3002\u987E\u5BA2\u62A2\u7740\u5750\u4E09\u53F7\u684C\uFF0C\u662F\u56E0\u4E3A\u5750\u8FC7\u7684\u4EBA\u90FD\u5B66\u4E56\u4E86\uFF1A\u8D70\u65F6\u5728\u62BD\u5C49\u91CC\u538B\u51E0\u5F20\u96F6\u94B1\uFF0C\u66FF\u4E0B\u4E00\u4E2A\u4EBA\u628A\u9762\u94B1\u4ED8\u4E86\u3002",
    yes: ["\u9762\u9986", "\u73AF\u536B", "\u5916\u5356", "\u9A91\u624B", "\u4EE3\u9A7E", "\u6DF1\u591C", "\u514D\u8D39", "\u8BF7\u5BA2", "\u5EA7\u4F4D", "\u670D\u52A1\u5458", "\u5B57\u6761", "\u96F6\u94B1", "\u62BD\u5C49", "\u8001\u677F"],
    no: ["\u98CE\u6C34", "\u95F9\u9B3C", "\u6253\u6298", "\u4F1A\u5458", "\u9884\u7EA6", "\u536B\u751F", "\u8001\u9F20", "\u505C\u7535", "\u6D88\u9632", "\u7F5A\u6B3E", "\u6295\u8BC9", "\u62DB\u724C", "\u660E\u661F", "\u5305\u573A"],
    partial: ["\u89C4\u77E9", "\u6D3B\u52A8", "\u6148\u5584", "\u5458\u5DE5", "\u4FC3\u9500"],
    hints: [
      "\u90A3\u5F20\u5B57\u6761\u4E0D\u662F\u5199\u7ED9\u987E\u5BA2\u770B\u7684\u3002",
      "\u4E09\u53F7\u684C\u6709\u4E00\u4E2A\u56FA\u5B9A\u7684\u3001\u4E0D\u80FD\u660E\u8BF4\u7684\u4F7F\u7528\u8005\u3002",
      "\u90A3\u4E9B\u4EBA\u5728\u6DF1\u591C\u624D\u4F1A\u51FA\u73B0\u3002",
      "\u540E\u6765\u5750\u8FD9\u513F\u7684\u4EBA\u90FD\u4F1A\u5077\u5077\u7559\u4E0B\u70B9\u4EC0\u4E48\u3002"
    ],
    tags: ["\u65E0\u5398\u5934", "\u6E29\u60C5", "\u5E02\u4E95"]
  },
  {
    id: "office-lamp",
    title: "\u5341\u4E03\u697C\u7684\u706F",
    question: "\u5199\u5B57\u697C 17 \u697C\u6302\u7740\u300C\u95F2\u7F6E\u62DB\u79DF\u300D\u7684\u724C\u5B50\uFF0C\u6BCF\u5929\u51CC\u6668\u4E09\u70B9\u5374\u51C6\u65F6\u4EAE\u8D77\u4E00\u76CF\u706F\u3002\u4FDD\u5B89\u62AC\u5934\u770B\u4E00\u773C\u5C31\u7B11\uFF0C\u7B2C\u4E8C\u5929\u7167\u65E7\u5DE1\u697C\uFF0C\u4ECE\u4E0D\u4E0A\u53BB\u67E5\u770B\u3002\u76F4\u5230\u90A3\u5E74\u51AC\u5929\u706F\u8FDE\u7740\u4E24\u665A\u6CA1\u4EAE\uFF0C\u4ED6\u6025\u5F97\u649E\u5F00\u4E86\u697C\u68AF\u95E8\u3002",
    truth: "\u706F\u540E\u9762\u662F\u4E2A\u521A\u521B\u4E1A\u7684\u5E74\u8F7B\u4EBA\uFF0C\u767D\u5929\u89C1\u5BA2\u6237\uFF0C\u53EA\u6709\u540E\u534A\u591C\u624D\u6709\u6574\u5757\u65F6\u95F4\u5199\u4EE3\u7801\uFF0C\u5C31\u628A\u7A7A\u7F6E\u623F\u95F4\u5F53\u529E\u516C\u5BA4\u3002\u4ED6\u8DDF\u4FDD\u5B89\u7EA6\u5B9A\uFF1A\u706F\u4EAE\u5C31\u662F\u5E73\u5B89\u3002\u56E0\u4E3A\u7B2C\u4E00\u5E74\u4F53\u68C0\u62A5\u544A\u4E0A\u5199\u7740\u300C\u5FC3\u5F8B\u4E0D\u9F50\u300D\uFF0C\u4ED6\u6015\u81EA\u5DF1\u4E00\u4E2A\u4EBA\u51FA\u4E8B\u90FD\u6CA1\u4EBA\u77E5\u9053\u3002\u4FDD\u5B89\u5B88\u4E86\u8FD9\u4E2A\u6697\u53F7\u4E09\u5E74\uFF0C\u62DB\u79DF\u724C\u4E00\u76F4\u6CA1\u6458\u2014\u2014\u4ED6\u4E5F\u60F3\u8BA9\u90A3\u76CF\u706F\u6709\u4E2A\u5408\u6CD5\u7684\u7406\u7531\u4EAE\u7740\u3002",
    yes: ["\u521B\u4E1A", "\u52A0\u73ED", "\u7A0B\u5E8F\u5458", "\u5199\u4EE3\u7801", "\u529E\u516C\u5BA4", "\u7A7A\u623F", "\u4FDD\u5B89", "\u7EA6\u5B9A", "\u6697\u53F7", "\u62A5\u8B66", "\u5E73\u5B89", "\u5FC3\u810F", "\u4F53\u68C0", "\u62DB\u79DF"],
    no: ["\u95F9\u9B3C", "\u51F6\u6848", "\u5C38\u4F53", "\u7EB5\u706B", "\u5077\u4E1C\u897F", "\u7535\u8D39", "\u76D1\u63A7", "\u8D85\u81EA\u7136", "\u8B66\u5BDF\u529E\u6848", "\u7535\u68AF", "\u7075\u5F02", "\u503C\u73ED\u5BA4"],
    partial: ["\u72EC\u5C45", "\u5931\u7720", "\u81EA\u7531\u804C\u4E1A", "\u79DF\u7EA6", "\u5DE5\u4F5C"],
    hints: [
      "\u90A3\u76CF\u706F\u662F\u7ED9\u4E00\u4E2A\u4EBA\u770B\u7684\uFF0C\u4E0D\u662F\u7ED9\u697C\u91CC\u7684\u4EBA\u770B\u7684\u3002",
      "\u4EAE\u706F\u7684\u4EBA\u548C\u4FDD\u5B89\u4E4B\u95F4\u6709\u8FC7\u4E00\u53E5\u7EA6\u5B9A\u3002",
      "\u8FD9\u4E2A\u7EA6\u5B9A\u5173\u7CFB\u5230\u300C\u5B89\u5168\u300D\uFF0C\u4F46\u4E0D\u662F\u6709\u574F\u4EBA\u3002",
      "\u4ED6\u767D\u5929\u89C1\u5BA2\u6237\uFF0C\u53EA\u6709\u51CC\u6668\u624D\u6709\u6574\u5757\u65F6\u95F4\u5E72\u6D3B\u3002"
    ],
    tags: ["\u5FAE\u6050\u4F46\u5B89\u5168", "\u804C\u573A", "\u53CD\u8F6C"]
  },
  {
    id: "old-key",
    title: "\u4F1A\u7528\u94A5\u5319\u7684\u4EBA",
    question: "\u72EC\u5C45\u7684\u5C0F\u590F\u534A\u591C\u542C\u89C1\u81EA\u5BB6\u95E8\u9501\u88AB\u94A5\u5319\u8F6C\u52A8\u3002\u5979\u6CA1\u62A5\u8B66\uFF0C\u5F00\u95E8\u540E\u8FD8\u7AEF\u51FA\u4E86\u4E24\u7897\u9762\u3002\u7B2C\u4E8C\u5929\u5979\u505A\u7684\u7B2C\u4E00\u4EF6\u4E8B\uFF0C\u662F\u66FF\u90A3\u4F4D\u8001\u4EBA\u6362\u6389\u95E8\u724C\u53F7\u548C\u9501\uFF0C\u518D\u628A\u4E00\u5F20\u5361\u7247\u585E\u8FDB\u4ED6\u7684\u5916\u5957\u53E3\u888B\u3002",
    truth: "\u623F\u5B50\u662F\u5C0F\u590F\u4ECE\u623F\u4E1C\u624B\u91CC\u79DF\u7684\u3002\u623F\u4E1C\u7684\u7236\u4EB2\u516B\u5341\u5C81\uFF0C\u5E74\u8F7B\u65F6\u5728\u8FD9\u680B\u697C\u4F4F\u4E86\u4E09\u5341\u5E74\uFF0C\u8BB0\u6027\u4E00\u5E74\u5DEE\u4E00\u5E74\uFF0C\u6478\u51FA\u8001\u94A5\u5319\u5C31\u5F00\u95E8\u8FDB\u5C4B\uFF0C\u8FD8\u4EE5\u4E3A\u513F\u5B50\u4F4F\u5728\u91CC\u9762\u3002\u5C0F\u590F\u6CA1\u628A\u4ED6\u8D76\u51FA\u53BB\uFF0C\u800C\u662F\u50CF\u62DB\u5F85\u957F\u8F88\u90A3\u6837\u8BF7\u4ED6\u5403\u4E86\u7897\u9762\uFF0C\u518D\u548C\u623F\u4E1C\u4E00\u8D77\u6362\u9501\u6362\u95E8\u724C\u3002\u5361\u7247\u4E0A\u5199\u7740\u8001\u4EBA\u7684\u540D\u5B57\u3001\u4F4F\u5740\u548C\u513F\u5B50\u7535\u8BDD\u2014\u2014\u4ECE\u6B64\u4ED6\u515C\u91CC\u88C5\u7740\u56DE\u5BB6\u7684\u8DEF\u3002",
    yes: ["\u8001\u4EBA", "\u623F\u4E1C", "\u7236\u4EB2", "\u94A5\u5319", "\u8001\u623F\u5B50", "\u8BB0\u6027", "\u5065\u5FD8", "\u8D70\u9519", "\u6362\u9501", "\u95E8\u724C", "\u5361\u7247", "\u513F\u5B50", "\u72EC\u5C45", "\u5403\u9762"],
    no: ["\u5C0F\u5077", "\u5165\u5BA4", "\u62A2\u52AB", "\u5F3A\u76D7", "\u62A5\u8B66", "\u4EB2\u621A", "\u623F\u4E1C\u672C\u4EBA", "\u68A6\u6E38", "\u9189\u6C49", "\u590D\u5236\u94A5\u5319", "\u7075\u5F02", "\u95F9\u9B3C", "\u540C\u5C45"],
    partial: ["\u8BA4\u8BC6", "\u8001\u5E74", "\u5BB6\u4EBA", "\u75BE\u75C5", "\u90BB\u5C45"],
    hints: [
      "\u90A3\u628A\u94A5\u5319\u662F\u771F\u7684\uFF0C\u80FD\u5F00\u8FD9\u6247\u95E8\u3002",
      "\u5F00\u95E8\u7684\u4EBA\u4E0D\u662F\u574F\u4EBA\uFF0C\u4E5F\u4E0D\u4F4F\u5728\u8FD9\u680B\u697C\u73B0\u5728\u7684\u4F4D\u7F6E\u3002",
      "\u4ED6\u548C\u8FD9\u95F4\u623F\u5B50\u6709\u5F88\u8001\u7684\u7F18\u5206\u3002",
      "\u4ED6\u7684\u8BB0\u6027\u51FA\u4E86\u70B9\u95EE\u9898\uFF0C\u6240\u4EE5\u5361\u7247\u624D\u662F\u5173\u952E\u3002"
    ],
    tags: ["\u60AC\u7591", "\u6E29\u60C5", "\u5B89\u5168\u7ED3\u5C40"]
  },
  {
    id: "seaside-two",
    title: "\u4E24\u4E2A\u4EBA\u7684\u623F\u95F4",
    question: "\u6D77\u8FB9\u5C0F\u9547\u7684\u65C5\u9986\u91CC\uFF0C\u8001\u5468\u6BCF\u5E74\u90FD\u8BA2\u540C\u4E00\u95F4\u9760\u6D77\u7684\u53CC\u4EBA\u95F4\uFF0C\u53EA\u4F4F\u4E00\u665A\uFF0C\u7B2C\u4E8C\u5929\u4E00\u65E9\u5C31\u9000\u623F\u3002\u4ED6\u7684\u884C\u674E\u7BB1\u91CC\u6C38\u8FDC\u53EA\u653E\u4E24\u6837\u4E1C\u897F\uFF0C\u8001\u677F\u5A18\u5374\u4ECE\u4E0D\u50AC\u4ED6\u591A\u4F4F\uFF0C\u53CD\u800C\u628A\u6700\u597D\u7684\u90A3\u95F4\u66FF\u4ED6\u7559\u7740\u3002",
    truth: "\u53CC\u4EBA\u95F4\u662F\u7ED9\u4E24\u4E2A\u4EBA\u8BA2\u7684\u3002\u59BB\u5B50\u751F\u524D\u6700\u7231\u8FD9\u7247\u6D77\uFF0C\u8D70\u4E4B\u524D\u7B54\u5E94\u8FC7\u4ED6\u300C\u4EE5\u540E\u6BCF\u5E74\u66FF\u6211\u6765\u770B\u4E00\u6B21\u300D\u3002\u5934\u4E09\u5E74\u4ED6\u53EA\u5E26\u4E00\u5C01\u4FE1\u548C\u4E00\u5F20\u7167\u7247\uFF0C\u5FF5\u5B8C\u5C31\u56DE\u57CE\u3002\u7B2C\u56DB\u5E74\u4ED6\u628A\u5B59\u5973\u62B1\u8FDB\u4E86\u8FD9\u95F4\u623F\uFF0C\u884C\u674E\u7BB1\u7B2C\u4E00\u6B21\u88AB\u6253\u5F00\uFF0C\u91CC\u9762\u662F\u4E24\u4EF6\u5C0F\u6CF3\u8863\u3002\u8001\u677F\u5A18\u628A\u623F\u5361\u6362\u6210\u4E24\u5F20\uFF0C\u4ECE\u6B64\u4E0D\u518D\u8BF4\u300C\u5C31\u60A8\u4E00\u4E2A\u4EBA\u554A\u300D\u2014\u2014\u5979\u77E5\u9053\u8FD9\u95F4\u623F\u7EC8\u4E8E\u53C8\u4F4F\u6EE1\u4E86\u3002",
    yes: ["\u59BB\u5B50", "\u53BB\u4E16", "\u8001\u4F34", "\u5B59\u5973", "\u5973\u513F", "\u4FE1\u4EF6", "\u7167\u7247", "\u627F\u8BFA", "\u53CC\u4EBA\u95F4", "\u6D77\u8FB9", "\u65C5\u9986", "\u8001\u677F\u5A18", "\u623F\u5361", "\u4E60\u60EF"],
    no: ["\u4FBF\u5B9C", "\u4F1A\u5458", "\u5546\u52A1", "\u51FA\u5DEE", "\u79BB\u5A5A", "\u5916\u9047", "\u4F20\u9500", "\u9003\u5355", "\u88C5\u4FEE", "\u98CE\u6C34", "\u6C11\u5BBF", "\u7B2C\u4E8C\u5957", "\u7F51\u604B"],
    partial: ["\u5BB6\u4EBA", "\u7EAA\u5FF5", "\u65C5\u884C", "\u5B64\u72EC", "\u8001\u4EBA"],
    hints: [
      "\u4ED6\u8BA2\u53CC\u4EBA\u95F4\uFF0C\u4E0D\u662F\u4E3A\u4E86\u81EA\u5DF1\u7761\u3002",
      "\u884C\u674E\u7BB1\u91CC\u90A3\u4E24\u6837\u4E1C\u897F\u90FD\u4E0D\u662F\u751F\u6D3B\u7528\u54C1\u3002",
      "\u524D\u4E09\u5E74\u8FD9\u95F4\u623F\u91CC\u53EA\u6709\u4ED6\u4E00\u4E2A\u4EBA\uFF0C\u4F46\u4ED6\u8BF4\u300C\u4E24\u4F4D\u300D\u3002",
      "\u7B2C\u56DB\u5E74\u5E26\u6765\u7684\u4E1C\u897F\uFF0C\u8BA9\u8001\u677F\u5A18\u52A0\u4E86\u4E00\u5F20\u623F\u5361\u3002"
    ],
    tags: ["\u65C5\u884C", "\u5BB6\u5EAD\u6E29\u60C5", "\u50AC\u6CEA"]
  },
  {
    id: "two-birthdays",
    title: "\u8FC7\u4E24\u6B21\u7684\u751F\u65E5",
    question: "\u5C0F\u9648\u5728\u98DE\u673A\u4E0A\u8FC7\u4E86\u4E24\u6B21\u751F\u65E5\u3002\u7B2C\u4E00\u6B21\u4ED6\u5BF9\u7740\u7EB8\u676F\u86CB\u7CD5\u5439\u4E86\u6839\u8721\u70DB\uFF0C\u6CA1\u4EBA\u642D\u7406\u4ED6\uFF1B\u7B2C\u4E8C\u6B21\u6574\u4E2A\u673A\u8231\u4E00\u8D77\u7ED9\u4ED6\u5531\u751F\u65E5\u6B4C\uFF0C\u7A7A\u4E58\u8FD8\u7AEF\u6765\u4E00\u7897\u70ED\u6CE1\u9762\u3002\u4E24\u6B21\u4E4B\u95F4\u4ED6\u603B\u5171\u53EA\u7761\u4E86\u4E09\u4E2A\u5C0F\u65F6\u3002",
    truth: "\u4ED6\u5750\u7684\u662F\u8DE8\u592A\u5E73\u6D0B\u7684\u7EA2\u773C\u822A\u73ED\uFF0C\u8D77\u98DE\u90A3\u665A\u6B63\u597D\u662F\u4ED6\u751F\u65E5\u7684\u6DF1\u591C\uFF1B\u98DE\u673A\u8D8A\u8FC7\u56FD\u9645\u65E5\u671F\u53D8\u66F4\u7EBF\u540E\uFF0C\u843D\u5730\u65F6\u4ECD\u7136\u662F\u540C\u4E00\u5929\u3002\u7B2C\u4E00\u6B21\u5439\u8721\u70DB\u65F6\u4ED6\u968F\u53E3\u8BF4\u4E86\u4E00\u53E5\u300C\u90A3\u5C31\u5F53\u8FC7\u4E24\u56DE\u5427\u300D\uFF0C\u88AB\u4E58\u52A1\u957F\u8BB0\u5728\u4E86\u5FC3\u4E0A\uFF0C\u843D\u5730\u524D\u4E00\u5C0F\u65F6\u5E7F\u64AD\u91CC\u5FF5\u4E86\u4ED6\u7684\u540D\u5B57\u3002\u90A3\u7897\u6CE1\u9762\u662F\u4E58\u52A1\u957F\u81EA\u638F\u8170\u5305\u4E70\u7684\u2014\u2014\u5979\u81EA\u5DF1\u7684\u751F\u65E5\u4E5F\u5728\u540C\u4E00\u5929\u3002",
    yes: ["\u98DE\u673A", "\u822A\u73ED", "\u65F6\u5DEE", "\u65E5\u671F\u53D8\u66F4\u7EBF", "\u8DE8\u5929", "\u4E24\u6B21", "\u751F\u65E5", "\u7A7A\u4E58", "\u4E58\u52A1", "\u673A\u957F", "\u86CB\u7CD5", "\u7EA2\u773C", "\u843D\u5730", "\u8D77\u98DE"],
    no: ["\u53CC\u80DE\u80CE", "\u91CD\u540D", "\u86CB\u7CD5\u5E97", "\u8FDF\u5230", "\u7B7E\u8BC1", "\u505A\u68A6", "\u751F\u65E5\u793C\u7269", "\u6362\u5EA7\u4F4D", "\u673A\u573A", "\u8D3F\u8D42", "\u540C\u4E00\u5929", "\u540C\u4E8B"],
    partial: ["\u51FA\u56FD", "\u65F6\u95F4", "\u5DE5\u4F5C", "\u65C5\u884C", "\u5DE7\u5408"],
    hints: [
      "\u4E24\u6B21\u751F\u65E5\u662F\u771F\u7684\u4E24\u6B21\uFF0C\u4E0D\u662F\u6709\u4EBA\u8BB0\u9519\u4E86\u3002",
      "\u548C\u98DE\u673A\u7A97\u5916\u7684\u65F6\u95F4\u6709\u5173\u7CFB\u3002",
      "\u8FD9\u6761\u822A\u7EBF\u4F1A\u7A7F\u8FC7\u4E00\u6761\u7279\u522B\u7684\u300C\u7EBF\u300D\u3002",
      "\u7B2C\u4E8C\u6B21\u5E86\u795D\u662F\u673A\u7EC4\u4EBA\u5458\u7279\u610F\u5B89\u6392\u7684\u3002"
    ],
    tags: ["\u65C5\u884C", "\u65E0\u5398\u5934", "\u6E29\u6696\u7ED3\u5C40"]
  },
  {
    id: "duty-chart",
    title: "\u7A7A\u767D\u7684\u503C\u65E5\u8868",
    question: "\u6559\u5BA4\u540E\u5899\u7684\u503C\u65E5\u8868\u4E0A\u6709\u4E00\u680F\u4E09\u5E74\u6CA1\u5199\u8FC7\u540D\u5B57\uFF0C\u53EF\u90A3\u4E00\u680F\u7684\u6D3B\u6BCF\u5929\u90FD\u5E72\u5B8C\u4E86\u3002\u6BD5\u4E1A\u90A3\u5929\uFF0C\u5168\u73ED\u628A\u8FD9\u5F20\u8868\u4ECE\u5899\u4E0A\u53D6\u4E0B\u6765\u8D8A\u4F20\u8D8A\u5B89\u9759\uFF0C\u7B7E\u540D\u6700\u5C11\u7684\u540C\u5B66\u5374\u54ED\u5F97\u6700\u51F6\u3002",
    truth: "\u90A3\u680F\u5199\u7740\u300C\u64E6\u9ED1\u677F\u300D\uFF0C\u662F\u73ED\u4E3B\u4EFB\u7559\u7ED9\u5C0F\u541B\u7684\u3002\u5979\u4E0D\u6562\u5728\u540C\u5B66\u9762\u524D\u8BF4\u8BDD\uFF0C\u53EA\u80AF\u7B49\u6240\u6709\u4EBA\u90FD\u8D70\u4E86\u518D\u628A\u9ED1\u677F\u64E6\u51C0\uFF0C\u8FDE\u7C89\u7B14\u69FD\u90FD\u62A0\u5F97\u5E72\u5E72\u51C0\u51C0\u3002\u73ED\u4E3B\u4EFB\u628A\u540D\u5B57\u7A7A\u7740\uFF0C\u662F\u56E0\u4E3A\u4E00\u65E6\u5199\u4E0A\uFF0C\u5979\u5C31\u6210\u4E86\u300C\u88AB\u5B89\u6392\u7684\u4EBA\u300D\u3002\u6709\u5929\u76D1\u63A7\u91CC\u5927\u5BB6\u770B\u89C1\u5979\u628A\u81EA\u5DF1\u4E0D\u4F1A\u505A\u7684\u9898\u6284\u5728\u672C\u5B50\u4E0A\uFF0C\u4ECE\u6B64\u90A3\u680F\u518D\u6CA1\u4EBA\u8865\u540D\u5B57\uFF0C\u53EA\u5728\u671F\u672B\u65F6\u5168\u73ED\u7684\u7B7E\u540D\u6324\u5728\u4E00\u8D77\uFF0C\u6700\u7A7A\u7684\u90A3\u683C\u53CD\u800C\u6700\u6EE1\u3002",
    yes: ["\u503C\u65E5", "\u64E6\u9ED1\u677F", "\u9ED1\u677F", "\u73ED\u4E3B\u4EFB", "\u8001\u5E08", "\u5185\u5411", "\u6C89\u9ED8", "\u7A7A\u680F", "\u540D\u5B57", "\u6BD5\u4E1A", "\u76D1\u63A7", "\u540C\u5B66", "\u6559\u5BA4", "\u7B7E\u540D"],
    no: ["\u95F9\u9B3C", "\u8F6C\u5B66\u751F", "\u9003\u503C\u65E5", "\u7F5A\u6B3E", "\u751F\u75C5", "\u5BB6\u957F", "\u6210\u7EE9", "\u5956\u5B66\u91D1", "\u4F5C\u5F0A", "\u7A7A\u8C03", "\u4F53\u80B2\u751F", "\u7559\u7EA7"],
    partial: ["\u5B66\u751F", "\u4E60\u60EF", "\u5956\u52B1", "\u79D8\u5BC6", "\u5FC3\u7406"],
    hints: [
      "\u90A3\u680F\u6D3B\u6709\u4EBA\u505A\uFF0C\u53EA\u662F\u6CA1\u4EBA\u770B\u89C1\u3002",
      "\u7A7A\u7740\u540D\u5B57\u662F\u8001\u5E08\u6545\u610F\u5B89\u6392\u7684\u3002",
      "\u8FD9\u4E2A\u540C\u5B66\u6709\u4E00\u4E2A\u5F88\u5B89\u9759\u7684\u7279\u70B9\u3002",
      "\u7B7E\u540D\u6700\u5C11\u7684\u4EBA\uFF0C\u505A\u7684\u4E8B\u6700\u591A\u3002"
    ],
    tags: ["\u6821\u56ED", "\u6E29\u60C5", "\u53CD\u8F6C"]
  },
  {
    id: "zero-score",
    title: "\u6EE1\u5206\u7684\u96F6\u5206",
    question: "\u7269\u7406\u8001\u5E08\u628A\u4E00\u5F20\u5199\u7740 100 \u5206\u7684\u5377\u5B50\u5224\u6210 0 \u5206\uFF0C\u8FD8\u628A\u6574\u5F20\u7167\u7247\u53D1\u5230\u5BB6\u957F\u7FA4\u3002\u7FA4\u91CC\u4E0D\u4F46\u6CA1\u4EBA\u6297\u8BAE\uFF0C\u7B2C\u4E8C\u5929\u5B66\u6821\u6559\u7814\u7EC4\u8FD8\u8FDE\u591C\u628A\u671F\u672B\u9898\u5E93\u91CC\u7684\u4E00\u9053\u9898\u64A4\u4E86\u4E0B\u6765\u3002",
    truth: "\u90A3\u5F20\u5377\u662F\u8001\u5E08\u81EA\u5DF1\u505A\u7684\uFF0C\u7F72\u540D\u680F\u5199\u7740\u300C\u53C2\u8003\u7B54\u6848\u300D\u3002\u4ED6\u7167\u7740\u6559\u53C2\u7B97\uFF0C\u53D1\u73B0\u7B2C\u4E09\u95EE\u600E\u4E48\u90FD\u5F97\u4E0D\u5230\u6807\u51C6\u7B54\u6848\u2014\u2014\u662F\u51FA\u7248\u793E\u5370\u9519\u4E86\u4E00\u4E2A\u6570\u5B57\uFF0C\u5168\u5E02\u90FD\u5728\u7528\u8FD9\u672C\u3002\u5224 0 \u5206\u662F\u4E3A\u4E86\u8BA9\u8FD9\u5F20\u5377\u5B50\u88AB\u770B\u89C1\uFF0C\u53D1\u7FA4\u91CC\u662F\u60F3\u8BA9\u5B69\u5B50\u660E\u767D\uFF1A\u6743\u5A01\u4E5F\u53EF\u4EE5\u6000\u7591\u3002\u6559\u7814\u7EC4\u8FDE\u591C\u6838\u5BF9\uFF0C\u64A4\u9898\u3001\u6539\u5377\u3001\u53D1\u66F4\u6B63\u8BF4\u660E\uFF0C\u6CA1\u4EBA\u89C9\u5F97\u88AB\u5192\u72AF\u3002",
    yes: ["\u8001\u5E08", "\u7B54\u6848", "\u5370\u5237", "\u9519\u8BEF", "\u6559\u53C2", "\u6559\u6750", "\u51FA\u9898", "\u8BD5\u5377", "\u7269\u7406", "\u5BB6\u957F\u7FA4", "\u6559\u7814\u7EC4", "\u7F72\u540D", "\u53C2\u8003", "\u8D28\u7591"],
    no: ["\u4F5C\u5F0A", "\u6284\u88AD", "\u4F53\u7F5A", "\u62A5\u590D", "\u6253\u5206", "\u6392\u540D", "\u8865\u4E60", "\u6821\u957F", "\u5904\u5206", "\u5B66\u751F", "\u7F5A\u7AD9", "\u5956\u5B66\u91D1"],
    partial: ["\u6559\u5B66", "\u5206\u6570", "\u5B66\u6821", "\u5907\u8BFE"],
    hints: [
      "\u8FD9\u5F20\u5377\u5B50\u4E0D\u662F\u5B66\u751F\u5199\u7684\u3002",
      "\u5377\u5B50\u4E0A\u7684\u540D\u5B57\u680F\u5199\u5F97\u5F88\u7279\u522B\u3002",
      "\u8001\u5E08\u53D1\u73B0\u7684\u662F\u4E00\u4EF6\u300C\u4E66\u4E0A\u300D\u7684\u95EE\u9898\u3002",
      "\u88AB\u5F71\u54CD\u7684\u4E0D\u662F\u8FD9\u4E00\u4E2A\u73ED\uFF0C\u800C\u662F\u5168\u5E02\u3002"
    ],
    tags: ["\u6821\u56ED", "\u8F83\u771F", "\u6B63\u5411\u7ED3\u5C40"]
  },
  {
    id: "fourteenth-chair",
    title: "\u7B2C\u5341\u56DB\u628A\u6905\u5B50",
    question: "\u4F1A\u8BAE\u901A\u77E5\u5199\u7740\u300C13 \u4EBA\u53C2\u4F1A\u300D\uFF0C\u4F1A\u8BAE\u5BA4\u5374\u6446\u4E86 14 \u628A\u6905\u5B50\u3002\u4E3B\u6301\u4EBA\u6BCF\u6B21\u90FD\u8981\u628A\u7B2C 14 \u628A\u642C\u5230\u7A97\u8FB9\u6B63\u5BF9\u9633\u5149\u7684\u4F4D\u7F6E\uFF0C\u8FD8\u5BF9\u7740\u7A7A\u6905\u5B50\u8BF4\u4E00\u53E5\u300C\u6211\u4EEC\u5F00\u59CB\u5427\u300D\u3002\u884C\u653F\u65E2\u4E0D\u64A4\u6389\u4E5F\u4E0D\u591A\u52A0\uFF0C\u751A\u81F3\u7ED9\u5B83\u4E70\u4E86\u4E2A\u5750\u57AB\u3002",
    truth: "\u90A3\u628A\u6905\u5B50\u4EE3\u8868\u300C\u8FD8\u6CA1\u88AB\u8BF4\u670D\u7684\u4EBA\u300D\u3002\u8FD9\u5BB6\u516C\u53F8\u6709\u4E2A\u8001\u89C4\u77E9\uFF1A\u4EFB\u4F55\u5927\u51B3\u7B56\uFF0C\u684C\u4E0A\u5FC5\u987B\u7559\u4E00\u4E2A\u7A7A\u4F4D\uFF0C\u8C01\u90FD\u4E0D\u8BB8\u56E0\u4E3A\u5927\u5BB6\u90FD\u70B9\u5934\u5C31\u6536\u5DE5\u3002\u642C\u53BB\u7A97\u8FB9\uFF0C\u662F\u56E0\u4E3A\u521B\u59CB\u4EBA\u8BF4\u8FC7\u53CD\u5BF9\u8005\u7684\u4F4D\u7F6E\u4E0D\u8BE5\u5750\u5728\u9634\u5F71\u91CC\u3002\u5750\u57AB\u662F\u65B0\u4EBA\u81EA\u53D1\u51D1\u94B1\u4E70\u7684\u3002\u4E09\u5E74\u91CC\uFF0C\u6B63\u662F\u90A3\u628A\u7A7A\u6905\u5B50\u62E6\u4E0B\u8FC7\u4E00\u6B21\u4F1A\u6BC1\u6389\u6574\u6761\u4EA7\u54C1\u7EBF\u7684\u6539\u7248\u2014\u2014\u5F53\u65F6\u6709\u4EBA\u5B9E\u5728\u5FCD\u4E0D\u4F4F\uFF0C\u66FF\u5B83\u5F00\u4E86\u53E3\u3002",
    yes: ["\u7A7A\u4F4D", "\u6905\u5B50", "\u53CD\u5BF9", "\u89C4\u77E9", "\u5236\u5EA6", "\u51B3\u7B56", "\u4F1A\u8BAE", "\u63D0\u9192", "\u8BF4\u670D", "\u540C\u4E8B", "\u516C\u53F8", "\u9633\u5149", "\u4F20\u7EDF", "\u9879\u76EE"],
    no: ["\u8FF7\u4FE1", "\u95F9\u9B3C", "\u9884\u7559", "\u9886\u5BFC", "\u5BA2\u6237", "\u5EA7\u4F4D\u4E0D\u591F", "\u88C5\u4FEE", "\u6B8B\u75BE", "\u98CE\u6C34", "\u8FDF\u5230", "\u62DB\u8058", "\u5609\u5BBE"],
    partial: ["\u6587\u5316", "\u7BA1\u7406", "\u8001\u677F", "\u4EEA\u5F0F", "\u4F1A\u8BAE\u684C"],
    hints: [
      "\u90A3\u628A\u6905\u5B50\u4E0D\u662F\u7ED9\u4EFB\u4F55\u771F\u4EBA\u51C6\u5907\u7684\u3002",
      "\u5B83\u662F\u8FD9\u5BB6\u516C\u53F8\u7684\u4E00\u6761\u89C4\u77E9\u3002",
      "\u548C\u300C\u53D1\u8A00\u300D\u300C\u540C\u610F\u300D\u8FD9\u7C7B\u4E8B\u6709\u5173\u3002",
      "\u5B83\u66FF\u7684\u662F\u8FD8\u6CA1\u88AB\u8BF4\u670D\u7684\u90A3\u4E2A\u4EBA\u3002"
    ],
    tags: ["\u804C\u573A", "\u53CD\u8F6C", "\u8111\u6D1E"]
  },
  {
    id: "street-lamp-bowl",
    title: "\u95E8\u53E3\u90A3\u7897\u9762",
    question: "\u5DF7\u53E3\u65E9\u70B9\u94FA\u8001\u677F\u6BCF\u5929\u6E05\u6668\u4E94\u70B9\u716E\u4E00\u7897\u9762\uFF0C\u7AEF\u5230\u5E97\u95E8\u5916\u90A3\u76CF\u8DEF\u706F\u4E0B\u653E\u7740\uFF0C\u81EA\u5DF1\u4E00\u53E3\u4E0D\u5403\uFF0C\u4E5F\u4E0D\u8BB8\u4F19\u8BA1\u6536\u8D70\u3002\u8FD9\u6837\u5E72\u4E86\u4E09\u5E74\u3002\u76F4\u5230\u6709\u5929\u4ED6\u628A\u9762\u7AEF\u56DE\u5E97\u91CC\uFF0C\u56F4\u89C2\u7684\u8857\u574A\u4E00\u4E2A\u4E2A\u90FD\u7EA2\u4E86\u773C\u775B\u3002",
    truth: "\u5973\u513F\u662F\u591C\u73ED\u62A4\u58EB\uFF0C\u4E09\u5E74\u6765\u6BCF\u5929\u51CC\u6668\u4E94\u70B9\u4E0B\u73ED\u8DEF\u8FC7\u5E97\u95E8\u53E3\uFF0C\u80C3\u4E0D\u597D\uFF0C\u53EA\u5403\u5F97\u4E0B\u4E00\u7897\u6E05\u6C64\u9762\u3002\u8001\u677F\u4E0D\u558A\u5979\u8FDB\u5E97\u5750\uFF0C\u662F\u6015\u5979\u4E3A\u4E86\u966A\u4ED6\u591A\u7AD9\u90A3\u5341\u5206\u949F\uFF1B\u9762\u653E\u5728\u706F\u4E0B\uFF0C\u5979\u8D70\u8FC7\u5C31\u80FD\u7AEF\u8D70\u7EE7\u7EED\u8D76\u8DEF\u3002\u4E09\u5E74\u540E\u7684\u6E05\u660E\u524D\uFF0C\u5973\u513F\u628A\u8C03\u73ED\u7533\u8BF7\u4EA4\u4E86\u4E0A\u53BB\uFF0C\u4EE5\u540E\u90FD\u80FD\u5728\u5BB6\u5403\u65E9\u996D\u3002\u8001\u677F\u628A\u9762\u7AEF\u56DE\u5E97\u91CC\uFF0C\u5728\u95E8\u53E3\u6302\u4E86\u5757\u5C0F\u6728\u677F\uFF1A\u4ECA\u65E5\u4E00\u7897\uFF0C\u7559\u7ED9\u4E0B\u4E00\u4E2A\u4EBA\u3002",
    yes: ["\u5973\u513F", "\u62A4\u58EB", "\u591C\u73ED", "\u6E05\u6C64\u9762", "\u8DEF\u706F", "\u65E9\u9910", "\u5FC3\u75BC", "\u7AEF\u8D70", "\u8C03\u73ED", "\u5BB6\u91CC", "\u7236\u4EB2", "\u5B5D\u987A", "\u8857\u574A", "\u5B88\u5019"],
    no: ["\u95F9\u9B3C", "\u4F9B\u5949", "\u796D\u7940", "\u4E0A\u4F9B", "\u6D41\u6D6A", "\u4E5E\u4E10", "\u8FF7\u4FE1", "\u8FD8\u613F", "\u987E\u5BA2", "\u5269\u996D", "\u6E38\u620F", "\u8BD5\u5403", "\u5BA0\u7269", "\u5929\u6C14\u9884\u62A5"],
    partial: ["\u5BB6\u4EBA", "\u901D\u8005", "\u7EAA\u5FF5", "\u4E60\u60EF", "\u6148\u5584"],
    hints: [
      "\u8FD9\u7897\u9762\u662F\u6709\u7279\u5B9A\u7684\u4EBA\u5403\u7684\u3002",
      "\u90A3\u4E2A\u4EBA\u51FA\u73B0\u7684\u65F6\u95F4\u975E\u5E38\u56FA\u5B9A\u3002",
      "\u5979\u7684\u5DE5\u4F5C\u9700\u8981\u4E0A\u901A\u5BB5\u3002",
      "\u6700\u540E\u8001\u677F\u64A4\u6389\u8FD9\u7897\u9762\uFF0C\u662F\u56E0\u4E3A\u5979\u4E0D\u7528\u8D76\u591C\u73ED\u4E86\u3002"
    ],
    tags: ["\u5BB6\u5EAD\u6E29\u60C5", "\u65E5\u5E38\u53CD\u8F6C", "\u50AC\u6CEA"]
  },
  {
    id: "stopped-watch",
    title: "\u4E0D\u8D70\u7684\u624B\u8868",
    question: "\u5976\u5976\u6BCF\u5929\u4E0A\u5348\u5341\u70B9\u7ED9\u4E00\u5757\u4ECE\u4E0D\u8D70\u5B57\u7684\u65E7\u624B\u8868\u62E7\u53D1\u6761\uFF0C\u8FD8\u5728\u6B63\u5348\u300C\u542C\u89C1\u300D\u5B83\u54CD\u65F6\u558A\u5168\u5BB6\u5403\u996D\u3002\u5B59\u5B50\u5077\u5077\u628A\u8868\u4FEE\u597D\u4E86\u3002\u7B2C\u4E8C\u5929\u4E2D\u5348\u8868\u771F\u7684\u53EE\u94C3\u54CD\u8D77\u6765\uFF0C\u5976\u5976\u5374\u628A\u5B83\u6536\u8FDB\u62BD\u5C49\uFF0C\u4ECE\u6B64\u518D\u4E5F\u6CA1\u62E7\u8FC7\u3002",
    truth: "\u8868\u662F\u7237\u7237\u7684\u3002\u4ED6\u5728\u8C03\u5EA6\u5BA4\u5E72\u4E86\u4E09\u5341\u5E74\uFF0C\u5168\u9760\u8FD9\u5757\u8868\u558A\u4ED6\u4E0A\u5DE5\uFF1B\u4ED6\u8D70\u540E\uFF0C\u5976\u5976\u628A\u6BCF\u5929\u4E0A\u5F26\u5F53\u6210\u548C\u4ED6\u8BB2\u8BDD\u7684\u90A3\u4E24\u5206\u949F\u3002\u5B59\u5B50\u4FEE\u597D\u8868\u662F\u60F3\u8BA9\u7237\u7237\u300C\u56DE\u6765\u300D\uFF0C\u53EF\u8868\u771F\u7684\u54CD\u4E86\uFF0C\u5976\u5976\u624D\u660E\u767D\u81EA\u5DF1\u7B49\u7684\u4ECE\u6765\u4E0D\u662F\u90A3\u58F0\u94C3\uFF0C\u800C\u662F\u5F2F\u8170\u62E7\u53D1\u6761\u7684\u8FD9\u4E00\u4E0B\u2014\u2014\u90A3\u8BA9\u5979\u8FD8\u6709\u4E8B\u53EF\u4EE5\u66FF\u4ED6\u505A\u3002\u5979\u628A\u8868\u6536\u8FDB\u62BD\u5C49\uFF0C\u90A3\u5929\u4E00\u65E9\u81EA\u5DF1\u5750\u73ED\u8F66\u53BB\u4E86\u5893\u56ED\uFF0C\u51FA\u95E8\u524D\u8BF4\uFF1A\u4ECA\u5929\u4E0D\u7528\u8868\u53EB\u6211\u3002",
    yes: ["\u7237\u7237", "\u624B\u8868", "\u53D1\u6761", "\u4FEE\u8868", "\u53BB\u4E16", "\u6000\u5FF5", "\u4E0A\u5F26", "\u58F0\u97F3", "\u4E60\u60EF", "\u5B59\u5B50", "\u62BD\u5C49", "\u8C03\u5EA6", "\u62A5\u65F6", "\u5403\u996D"],
    no: ["\u574F\u4E86", "\u7535\u6C60", "\u8868\u9488", "\u95F9\u949F", "\u8FF7\u4FE1", "\u4E2D\u90AA", "\u95F9\u9B3C", "\u5356\u94B1", "\u751F\u6C14", "\u8BB0\u6027", "\u8001\u5E74\u75F4\u5446", "\u5F53\u94FA", "\u5C0F\u5077"],
    partial: ["\u8001\u4EBA", "\u5BB6\u4EBA", "\u65F6\u95F4", "\u793C\u7269", "\u5FC3\u7406"],
    hints: [
      "\u8868\u662F\u8C01\u7684\u4E0D\u91CD\u8981\uFF0C\u91CD\u8981\u7684\u662F\u8C01\u5728\u7528\u5B83\u3002",
      "\u62E7\u53D1\u6761\u8FD9\u4E2A\u52A8\u4F5C\u672C\u8EAB\u5C31\u662F\u7B54\u6848\u3002",
      "\u8868\u662F\u5BB6\u91CC\u4E00\u4F4D\u957F\u8F88\u7559\u4E0B\u7684\u3002",
      "\u4FEE\u597D\u4E4B\u540E\u5979\u4E0D\u518D\u62E7\uFF0C\u662F\u56E0\u4E3A\u5979\u51B3\u5B9A\u6362\u4E2A\u65B9\u5F0F\u5F80\u524D\u8D70\u3002"
    ],
    tags: ["\u5BB6\u5EAD\u6E29\u60C5", "\u5FAE\u6CEA", "\u6CBB\u6108"]
  },
  {
    id: "wrong-way",
    title: "\u9006\u884C\u7684\u8F66",
    question: "\u65E9\u9AD8\u5CF0\u6700\u5835\u7684\u90A3\u6761\u8DEF\u4E0A\uFF0C\u8001\u9648\u6BCF\u5929\u9006\u7740\u8F66\u6D41\u5F00\u4E00\u5C0F\u6BB5\u3002\u4EA4\u8B66\u770B\u89C1\u4E0D\u4F46\u6CA1\u62E6\uFF0C\u8FD8\u671D\u4ED6\u62AC\u624B\u793A\u610F\uFF1B\u4E24\u8FB9\u7684\u53F8\u673A\u4E5F\u4E0D\u6309\u5587\u53ED\uFF0C\u751A\u81F3\u6709\u8F66\u4E3B\u4E3B\u52A8\u5F80\u524D\u632A\u4E86\u534A\u4E2A\u8F66\u4F4D\u7ED9\u4ED6\u8BA9\u8DEF\u3002",
    truth: "\u90A3\u6761\u8DEF\u662F\u6F6E\u6C50\u8F66\u9053\uFF0C\u65E9\u9AD8\u5CF0\u8FDB\u57CE\u65B9\u5411\u591A\u5360\u4E00\u80A1\uFF0C\u9006\u884C\u7684\u534A\u6BB5\u6B63\u597D\u662F\u5F53\u5929\u5141\u8BB8\u7684\u5BF9\u5411\u3002\u8001\u9648\u5F00\u7684\u662F\u9053\u8DEF\u517B\u62A4\u8F66\uFF0C\u5FC5\u987B\u8D76\u5728\u4E03\u70B9\u534A\u653E\u884C\u524D\u628A\u9694\u79BB\u58A9\u548C\u8DEF\u9525\u4E00\u4E2A\u4E2A\u642C\u5230\u4F4D\u3002\u4EA4\u8B66\u62AC\u624B\u662F\u5728\u7ED9\u4ED6\u62A5\u65F6\uFF0C\u53F8\u673A\u632A\u8F66\u662F\u56E0\u4E3A\u90FD\u89C1\u8FC7\u4ED6\u5F2F\u7740\u8170\u642C\u8DEF\u9525\u2014\u2014\u642C\u5B8C\u8FD9\u4E00\u7A0B\uFF0C\u4ED6\u8FD8\u8981\u987A\u624B\u638F\u5F00\u5835\u4E86\u4E00\u591C\u7684\u4E0B\u6C34\u9053\u53E3\uFF0C\u518D\u56DE\u961F\u91CC\u8865\u4E24\u5C0F\u65F6\u89C9\u3002",
    yes: ["\u6F6E\u6C50", "\u8F66\u9053", "\u517B\u62A4", "\u8DEF\u653F", "\u73AF\u536B", "\u5783\u573E", "\u9694\u79BB\u58A9", "\u8DEF\u9525", "\u4EA4\u8B66", "\u65E9\u9AD8\u5CF0", "\u5355\u884C", "\u65BD\u5DE5", "\u5DE5\u4F5C", "\u9006\u884C"],
    no: ["\u7279\u6743", "\u5173\u7CFB\u6237", "\u8B66\u8F66", "\u6551\u62A4\u8F66", "\u8FDD\u7AE0", "\u7F5A\u6B3E", "\u9A7E\u7167", "\u9189\u9A7E", "\u6284\u8FD1\u8DEF", "\u6025\u4E8B", "\u751F\u75C5", "\u82F1\u96C4", "\u660E\u661F"],
    partial: ["\u8F66\u8F86", "\u53F8\u673A", "\u4E0A\u73ED", "\u9053\u8DEF", "\u65F6\u95F4"],
    hints: [
      "\u4ED6\u8FD9\u4E00\u6BB5\u9006\u884C\u662F\u5408\u6CD5\u7684\u3002",
      "\u8FD9\u6761\u8DEF\u5728\u65E9\u9AD8\u5CF0\u6709\u4E2A\u7279\u522B\u7684\u89C4\u5B9A\u3002",
      "\u4ED6\u7684\u8F66\u548C\u300C\u5F00\u8F66\u300D\u8FD9\u4EF6\u4E8B\u5173\u7CFB\u4E0D\u5927\uFF0C\u548C\u300C\u8DEF\u300D\u5173\u7CFB\u5F88\u5927\u3002",
      "\u4ED6\u6BCF\u5929\u8981\u5728\u4E03\u70B9\u534A\u653E\u884C\u524D\u628A\u8DEF\u4E0A\u7684\u4E1C\u897F\u6446\u597D\u3002"
    ],
    tags: ["\u65E5\u5E38\u53CD\u8F6C", "\u804C\u4E1A", "\u6B63\u80FD\u91CF"]
  }
];
var STORY_OPENINGS = [
  "\u4F1A\u8BAE\u5BA4\u7684\u95E8\u4E00\u5F00\uFF0C\u6240\u6709\u4EBA\u90FD\u6123\u4F4F\u4E86\u2014\u2014\u8001\u677F\u7275\u7740\u4E00\u5934\u5976\u725B\u8D70\u8FDB\u6765\u8BF4\uFF1A\u8FD9\u4F4D\u662F\u65B0\u6765\u7684\u8D22\u52A1\u603B\u76D1\u3002",
  "\u6211\u5728\u53BB\u5E74\u90A3\u4EF6\u65E7\u5916\u5957\u53E3\u888B\u91CC\u6478\u5230\u4E00\u5F20\u7EB8\u6761\uFF0C\u4E0A\u9762\u5199\u7740\u300C\u660E\u5929\u7684\u4F60\u4E00\u5B9A\u4F1A\u7528\u5230\u5B83\u300D\u3002",
  "\u4E1A\u4E3B\u7FA4\u7684\u7B2C\u4E00\u6761\u6D88\u606F\u662F\uFF1A\u8C01\u5BB6\u5C0F\u670B\u53CB\u8D70\u9519\u4E86\u697C\uFF0C\u6B63\u5728\u6211\u5BB6\u5403\u996D\uFF0C\u8FD8\u70B9\u4E86\u4E09\u4E2A\u83DC\u3002",
  "\u706B\u8F66\u542F\u52A8\u7684\u90A3\u4E00\u79D2\uFF0C\u7AD9\u53F0\u4E0A\u4E00\u76F4\u80CC\u5BF9\u7740\u6211\u7684\u4EBA\u5FFD\u7136\u558A\u51FA\u4E86\u6211\u7684\u540D\u5B57\u3002",
  "\u6211\u5988\u7B2C\u4E00\u6B21\u5411\u6211\u9053\u6B49\uFF0C\u662F\u5728\u5979\u628A\u6211\u623F\u95F4\u7684\u95E8\u6362\u6210\u5E26\u9501\u7684\u95E8\u4E4B\u540E\u3002",
  "\u6BD5\u4E1A\u805A\u4F1A\u4E0A\u73ED\u957F\u5BA3\u5E03\u4E86\u4E00\u6761\u89C4\u5219\uFF1A\u4ECA\u665A\u6BCF\u4E2A\u4EBA\u5FC5\u987B\u8BF4\u4E00\u4E2A\u8C0E\uFF0C\u88AB\u62C6\u7A7F\u7684\u4EBA\u4E70\u5355\u3002",
  "\u516C\u53F8\u697C\u4E0B\u90A3\u53F0\u574F\u4E86\u4E00\u5E74\u7684\u8D29\u5356\u673A\uFF0C\u4ECA\u5929\u65E9\u4E0A\u7A81\u7136\u5F00\u59CB\u627E\u96F6\u3002",
  "\u6211\u6309\u4E0B\u7535\u68AF\u7684 18 \u697C\uFF0C\u53EF\u8FD9\u680B\u697C\u660E\u660E\u53EA\u6709 17 \u5C42\u3002",
  "\u9762\u8BD5\u8FDB\u884C\u5230\u4E00\u534A\uFF0C\u9762\u8BD5\u5B98\u5FFD\u7136\u538B\u4F4E\u58F0\u97F3\u95EE\u6211\uFF1A\u4F60\u8BA4\u8BC6\u89D2\u843D\u90A3\u4F4D\u7A7F\u7EFF\u8863\u670D\u7684\u4EBA\u5417\uFF1F",
  "\u642C\u5BB6\u7B2C\u4E00\u665A\u6211\u6253\u5F00\u51B0\u7BB1\uFF0C\u91CC\u9762\u51BB\u7740\u4E00\u5757\u5199\u7740\u6211\u7231\u4EBA\u540D\u5B57\u7684\u86CB\u7CD5\u3002",
  "\u6210\u7EE9\u5355\u53D1\u4E0B\u6765\uFF0C\u5168\u73ED\u552F\u4E00\u7684\u6EE1\u5206\u4E0D\u662F\u4EFB\u4F55\u4E00\u4F4D\u540C\u5B66\u7684\u540D\u5B57\u3002",
  "\u6211\u7238\u9000\u4F11\u540E\u505A\u7684\u7B2C\u4E00\u4EF6\u4E8B\uFF0C\u662F\u6BCF\u5929\u5077\u5077\u628A\u6211\u7684\u95F9\u949F\u8C03\u5FEB\u5341\u5206\u949F\u3002",
  "\u5FEB\u9012\u5C0F\u54E5\u8FDE\u7740\u4E09\u5929\u9001\u6765\u540C\u4E00\u4E2A\u5305\u88F9\uFF0C\u7B2C\u56DB\u5929\u4ED6\u9012\u7ED9\u6211\u4E00\u4E2A\u7A7A\u7EB8\u7BB1\uFF0C\u8BF4\u300C\u5B83\u81EA\u5DF1\u8DD1\u56DE\u6765\u7684\u300D\u3002",
  "\u6211\u5BB6\u7684\u732B\u7B2C\u4E00\u6B21\u5F00\u53E3\u8BF4\u8BDD\uFF0C\u8BF4\u7684\u7B2C\u4E00\u53E5\u662F\u62B1\u6028\u6211\u7761\u5F97\u592A\u665A\u3002",
  "\u5DE5\u4F5C\u7FA4\u91CC\u83AB\u540D\u591A\u4E86\u4E00\u4E2A\u4EBA\uFF0C\u5934\u50CF\u662F\u4E00\u53EA\u624B\u8868\uFF0C\u6635\u79F0\u53EA\u6709\u4E24\u4E2A\u5B57\uFF1A\u522B\u614C\u3002",
  "\u5A5A\u793C\u8FDB\u884C\u5230\u4EA4\u6362\u6212\u6307\uFF0C\u53F8\u4EEA\u4ECE\u53E3\u888B\u91CC\u638F\u51FA\u4E24\u4E2A\u4E00\u6A21\u4E00\u6837\u7684\u6212\u6307\u76D2\u3002",
  "\u5F00\u5B66\u7B2C\u4E00\u5929\uFF0C\u8001\u5E08\u5728\u9ED1\u677F\u4E0A\u5199\u300C\u672C\u5B66\u671F\u672C\u73ED 41 \u4EBA\u300D\uFF0C\u53EF\u6211\u4EEC\u90FD\u6570\u8FC7\u662F 40\u3002",
  "\u6211\u5988\u5B66\u4F1A\u7528\u8868\u60C5\u5305\u4EE5\u540E\uFF0C\u5BB6\u5EAD\u7FA4\u91CC\u7684\u5BF9\u8BDD\u5F00\u59CB\u53D8\u5F97\u6DF1\u4E0D\u53EF\u6D4B\u3002",
  "\u6211\u5728\u4E8C\u624B\u5E73\u53F0\u4E70\u4E86\u5F20\u4E66\u684C\uFF0C\u62BD\u5C49\u6DF1\u5904\u7528\u94C5\u7B14\u753B\u7740\u4E00\u5F20\u5730\u56FE\uFF0C\u7EC8\u70B9\u5199\u7740\u300C\u5BA2\u5385\u300D\u3002",
  "\u623F\u4E1C\u8BF4\u8FD9\u5957\u623F\u4EC0\u4E48\u90FD\u597D\uFF0C\u552F\u4E00\u7684\u8981\u6C42\u662F\uFF1A\u522B\u78B0\u9633\u53F0\u90A3\u76C6\u7EFF\u841D\u3002"
];
var STORY_CONSTRAINTS = [
  "\u672C\u53E5\u5FC5\u987B\u5305\u542B\u4E00\u4E2A\u6570\u5B57\uFF0C\u4F46\u4E0D\u80FD\u662F\u5E74\u4EFD\u3002",
  "\u672C\u53E5\u5FC5\u987B\u4EE5\u95EE\u53E5\u7ED3\u5C3E\u3002",
  "\u672C\u53E5\u4E0D\u80FD\u51FA\u73B0\u4EFB\u4F55\u4EBA\u540D\uFF0C\u53EA\u80FD\u7528\u79F0\u547C\uFF08\u6BD4\u5982\u300C\u8001\u677F\u300D\u300C\u963F\u59E8\u300D\u300C\u961F\u957F\u300D\uFF09\u3002",
  "\u672C\u53E5\u5FC5\u987B\u63D0\u5230\u4E00\u79CD\u98DF\u7269\uFF0C\u5E76\u4E14\u5B83\u80FD\u88AB\u771F\u7684\u5403\u6389\u3002",
  "\u672C\u53E5\u5FC5\u987B\u4EE5\u300C\u540E\u6765\u624D\u77E5\u9053\u300D\u5F00\u5934\u3002",
  "\u672C\u53E5\u5FC5\u987B\u51FA\u73B0\u4E00\u79CD\u52A8\u7269\u6216\u690D\u7269\u3002",
  "\u672C\u53E5\u5FC5\u987B\u5148\u8BF4\u7ED3\u679C\uFF0C\u518D\u8865\u4E00\u53E5\u539F\u56E0\u3002",
  "\u672C\u53E5\u5FC5\u987B\u5305\u542B\u4E00\u53E5\u89D2\u8272\u8BF4\u51FA\u6765\u7684\u8BDD\uFF0C\u5E76\u7528\u5F15\u53F7\u6807\u51FA\u3002",
  "\u672C\u53E5\u5FC5\u987B\u628A\u5F53\u65F6\u7684\u5929\u6C14\u5199\u8FDB\u6765\u3002",
  "\u672C\u53E5\u4E0D\u80FD\u8D85\u8FC7 25 \u4E2A\u5B57\u3002",
  "\u672C\u53E5\u5FC5\u987B\u8BA9\u4E0A\u4E00\u8F6E\u51FA\u73B0\u7684\u67D0\u4E2A\u4E1C\u897F\u6D3E\u4E0A\u7528\u573A\u3002",
  "\u672C\u53E5\u5FC5\u987B\u5236\u9020\u4E00\u4E2A\u8BEF\u4F1A\uFF0C\u5E76\u4E14\u5F53\u573A\u4E0D\u8BB8\u89E3\u91CA\u6E05\u695A\u3002",
  "\u672C\u53E5\u5FC5\u987B\u6362\u4E00\u4E2A\u4EBA\u79F0\u6765\u8BB2\uFF08\u7B2C\u4E00\u4EBA\u79F0\u53D8\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u6216\u53CD\u8FC7\u6765\uFF09\u3002",
  "\u672C\u53E5\u4E0D\u80FD\u51FA\u73B0\u300C\u4E0D\u300D\u300C\u6CA1\u300D\u300C\u522B\u300D\u8FD9\u4E09\u4E2A\u5B57\u3002",
  "\u672C\u53E5\u5FC5\u987B\u7ED9\u51FA\u4E00\u4E2A\u5177\u4F53\u7684\u65F6\u95F4\u70B9\uFF08\u51E0\u70B9\u51E0\u5206\uFF09\u3002"
];
var MIME_WORDS = {
  easy: [
    "\u732B",
    "\u72D7",
    "\u5154\u5B50",
    "\u5927\u8C61",
    "\u7334\u5B50",
    "\u957F\u9888\u9E7F",
    "\u4F01\u9E45",
    "\u9E2D\u5B50",
    "\u516C\u9E21",
    "\u86C7",
    "\u9A6C",
    "\u732A",
    "\u8001\u9F20",
    "\u8774\u8776",
    "\u871C\u8702",
    "\u4E4C\u9F9F",
    "\u8783\u87F9",
    "\u9CA8\u9C7C",
    "\u7761\u89C9",
    "\u5237\u7259",
    "\u6D17\u8138",
    "\u5403\u996D",
    "\u559D\u6C34",
    "\u6E38\u6CF3",
    "\u8DD1\u6B65",
    "\u6253\u7BEE\u7403",
    "\u8E22\u8DB3\u7403",
    "\u6253\u6392\u7403",
    "\u6253\u7FBD\u6BDB\u7403",
    "\u6253\u4E52\u4E53\u7403",
    "\u4E3E\u91CD",
    "\u9493\u9C7C",
    "\u9A91\u81EA\u884C\u8F66",
    "\u5F00\u8F66",
    "\u6253\u7535\u8BDD",
    "\u770B\u4E66",
    "\u5199\u5B57",
    "\u5F39\u5409\u4ED6",
    "\u5F39\u94A2\u7434",
    "\u5531\u6B4C",
    "\u8DF3\u821E",
    "\u62CD\u7167",
    "\u7167\u955C\u5B50",
    "\u526A\u6307\u7532",
    "\u6253\u55B7\u568F",
    "\u54B3\u55FD",
    "\u53D1\u70E7",
    "\u5439\u5934\u53D1",
    "\u62D6\u5730",
    "\u626B\u5730",
    "\u667E\u8863\u670D",
    "\u6D17\u7897",
    "\u5207\u83DC",
    "\u7092\u83DC",
    "\u5305\u997A\u5B50",
    "\u62E7\u74F6\u76D6",
    "\u7CFB\u978B\u5E26",
    "\u6253\u4F1E",
    "\u8DF3\u7EF3",
    "\u6ED1\u51B0"
  ],
  mid: [
    "\u7259\u533B\u770B\u7259",
    "\u7406\u53D1\u526A\u5934\u53D1",
    "\u5316\u5986",
    "\u6324\u5730\u94C1",
    "\u6392\u961F\u4E70\u5976\u8336",
    "\u901B\u8D85\u5E02",
    "\u83DC\u5E02\u573A\u780D\u4EF7",
    "\u9732\u8425\u642D\u5E10\u7BF7",
    "\u91CE\u9910\u94FA\u684C\u5E03",
    "\u6D17\u6FA1\u6413\u80CC",
    "\u6253\u70B9\u6EF4",
    "\u91CF\u8840\u538B",
    "\u62CD\u8BC1\u4EF6\u7167",
    "\u4E0B\u697C\u9886\u5FEB\u9012",
    "\u9152\u5E97\u9000\u623F",
    "\u503C\u65E5\u64E6\u9ED1\u677F",
    "\u4E0A\u8BFE\u88AB\u70B9\u540D\u56DE\u7B54\u95EE\u9898",
    "\u5F00\u5BB6\u957F\u4F1A",
    "\u6C42\u5A5A\u4E0B\u8DEA",
    "\u5439\u751F\u65E5\u8721\u70DB",
    "\u642C\u5BB6\u642C\u7BB1\u5B50",
    "\u88C5\u4FEE\u5237\u5899",
    "\u5230\u5904\u627E\u94A5\u5319",
    "\u5835\u5728\u8DEF\u4E0A\u6309\u5587\u53ED",
    "\u5F00\u4F1A\u6253\u778C\u7761",
    "\u88AB\u868A\u5B50\u54AC",
    "\u8E29\u8FDB\u6C34\u5751",
    "\u624B\u673A\u53EA\u5269\u767E\u5206\u4E4B\u4E00\u7535\u91CF",
    "\u7FA4\u91CC\u62A2\u7EA2\u5305",
    "\u905B\u72D7\u88AB\u62D6\u7740\u8DD1",
    "\u9017\u5C0F\u732B",
    "\u62B1\u5A74\u513F\u54C4\u7761",
    "\u62FC\u79EF\u6728",
    "\u6253\u9EBB\u5C06",
    "\u4E0B\u8C61\u68CB",
    "\u8DF3\u5E7F\u573A\u821E",
    "\u6253\u592A\u6781",
    "\u505A\u745C\u4F3D",
    "\u4E3E\u54D1\u94C3",
    "\u5212\u8239",
    "\u5C04\u7BAD",
    "\u6253\u62F3\u51FB",
    "\u6D88\u9632\u5458\u6551\u706B",
    "\u4EA4\u8B66\u6307\u6325\u4EA4\u901A",
    "\u53A8\u5E08\u98A0\u52FA",
    "\u670D\u52A1\u5458\u7AEF\u76D8\u5B50",
    "\u5BFC\u6E38\u4E3E\u5C0F\u65D7",
    "\u73AF\u536B\u5DE5\u626B\u5927\u8857",
    "\u7A0B\u5E8F\u5458\u6572\u4EE3\u7801",
    "\u4E3B\u64AD\u5E26\u8D27"
  ],
  hard: [
    "\u62D6\u5EF6\u75C7",
    "\u5185\u5377",
    "\u5DF2\u8BFB\u4E0D\u56DE",
    "\u793E\u6050",
    "\u538B\u529B\u5927",
    "\u6D6A\u6F2B",
    "\u5C34\u5C2C",
    "\u81EA\u4FE1",
    "\u5931\u671B",
    "\u7EA0\u7ED3",
    "\u7075\u611F\u6765\u4E86",
    "\u627E\u501F\u53E3",
    "\u4E0A\u73ED\u6478\u9C7C",
    "\u8BA8\u4EF7\u8FD8\u4EF7",
    "\u63D2\u961F",
    "\u6253\u547C\u565C",
    "\u5047\u88C5\u6CA1\u770B\u89C1",
    "\u5F3A\u989C\u6B22\u7B11",
    "\u53CD\u590D\u68C0\u67E5\u95E8\u9501",
    "\u7535\u68AF\u91CC\u9047\u5230\u9886\u5BFC",
    "\u5BF9\u725B\u5F39\u7434",
    "\u4E95\u5E95\u4E4B\u86D9",
    "\u5B88\u682A\u5F85\u5154",
    "\u753B\u86C7\u6DFB\u8DB3",
    "\u63A9\u8033\u76D7\u94C3",
    "\u4EA1\u7F8A\u8865\u7262",
    "\u4E09\u5FC3\u4E8C\u610F",
    "\u624B\u821E\u8DB3\u8E48",
    "\u6293\u8033\u6320\u816E",
    "\u4E1C\u5F20\u897F\u671B",
    "\u6307\u9E7F\u4E3A\u9A6C",
    "\u4E00\u7BAD\u53CC\u96D5",
    "\u9E64\u7ACB\u9E21\u7FA4",
    "\u864E\u5934\u86C7\u5C3E",
    "\u9E21\u98DE\u72D7\u8DF3",
    "\u76F2\u4EBA\u6478\u8C61",
    "\u523B\u821F\u6C42\u5251",
    "\u671B\u6885\u6B62\u6E34",
    "\u81EA\u76F8\u77DB\u76FE",
    "\u4E00\u4E3E\u4E24\u5F97",
    "\u626B\u7801\u4ED8\u6B3E",
    "\u4EBA\u8138\u8BC6\u522B\u5931\u8D25",
    "\u89C6\u9891\u4F1A\u8BAE\u5FD8\u5173\u9EA6",
    "\u5BFC\u822A\u5E26\u7740\u7ED5\u8FDC\u8DEF",
    "\u5171\u4EAB\u5145\u7535\u5B9D",
    "\u5916\u5356\u8D85\u65F6",
    "\u4E8C\u624B\u5E73\u53F0\u9000\u8D27",
    "\u6295\u5C4F\u5230\u7535\u89C6",
    "\u71AC\u591C\u540E\u8865\u89C9",
    "\u7B2C\u4E00\u6B21\u7EA6\u4F1A"
  ]
};
var NEVER_STARTERS = [
  "\u6211\u4E00\u4E2A\u4EBA\u5750\u8FC7\u591C\u8F66\u53BB\u4E00\u4E2A\u8C01\u90FD\u4E0D\u8BA4\u8BC6\u7684\u57CE\u5E02\u3002",
  "\u6211\u8FDE\u7EED\u4E09\u5341\u5929\u6CA1\u70B9\u8FC7\u5916\u5356\u3002",
  "\u6211\u5728\u673A\u573A\u8BEF\u673A\u4E4B\u540E\u53CD\u800C\u5403\u4E0A\u4E86\u4E00\u987F\u597D\u996D\u3002",
  "\u6211\u505A\u8FC7\u4E00\u4EF6\u8BA9\u5BB6\u4EBA\u4EE5\u4E3A\u6211\u4E70\u4E86\u623F\u7684\u4E8B\u3002",
  "\u6211\u4E0A\u8BFE\u7761\u89C9\u88AB\u8001\u5E08\u53EB\u9192\uFF0C\u8FD8\u95EE\u4E86\u4E00\u53E5\u300C\u8BB2\u5B8C\u4E86\u5417\u300D\u3002",
  "\u6211\u628A\u6BD5\u4E1A\u7167\u4E0A\u7684\u4EBA\u8BA4\u9519\u4E86\u4E09\u4E2A\u3002",
  "\u6211\u88AB\u81EA\u5DF1\u7684\u9886\u5BFC\u5F53\u9762\u5938\u8FC7\uFF0C\u5938\u7684\u662F\u53E6\u4E00\u4E2A\u4EBA\u7684\u65B9\u6848\u3002",
  "\u6211\u9762\u8BD5\u7684\u65F6\u5019\u53EB\u9519\u4E86\u9762\u8BD5\u5B98\u7684\u540D\u5B57\uFF0C\u4E00\u76F4\u5230\u7ED3\u675F\u3002",
  "\u6211\u6709\u4E00\u9879\u5B8C\u5168\u6CA1\u7528\u7684\u7279\u957F\uFF0C\u6BD4\u5982\u80FD\u52A8\u8033\u6735\u3002",
  "\u6211\u4F1A\u7528\u4E24\u6839\u7B77\u5B50\u6572\u51FA\u4E00\u9996\u5B8C\u6574\u7684\u6B4C\u3002",
  "\u6211\u80FD\u95ED\u7740\u773C\u775B\u5728\u4E00\u5806\u889C\u5B50\u91CC\u914D\u51FA\u4E00\u5BF9\u3002",
  "\u6211\u8FDE\u7EED\u4E09\u5929\u7A7F\u540C\u4E00\u4EF6\u8863\u670D\u51FA\u95E8\uFF0C\u800C\u4E14\u6CA1\u4EBA\u53D1\u73B0\u3002",
  "\u6211\u5728\u5305\u623F\u91CC\u5531\u6B4C\uFF0C\u628A\u90BB\u5EA7\u7684\u964C\u751F\u4EBA\u5531\u54ED\u4E86\uFF0C\u539F\u56E0\u81F3\u4ECA\u4E0D\u660E\u3002",
  "\u6211\u7ED9\u81EA\u5DF1\u7F1D\u8FC7\u88AB\u5B50\u4E0A\u7684\u7834\u6D1E\uFF0C\u8BA4\u771F\u5F97\u50CF\u5728\u505A\u5916\u79D1\u624B\u672F\u3002",
  "\u6211\u6CA1\u5E26\u94B1\u4E5F\u5728\u5916\u9762\u5403\u8FC7\u4E00\u987F\u996D\uFF0C\u5E76\u4E14\u9053\u8FC7\u8C22\u3002",
  "\u6211\u5728\u5730\u94C1\u4E0A\u7761\u7740\uFF0C\u9760\u5230\u4E86\u964C\u751F\u4EBA\u80A9\u4E0A\uFF0C\u9192\u6765\u65F6\u4ED6\u9012\u7ED9\u6211\u4E00\u74F6\u6C34\u3002",
  "\u6211\u6536\u5230\u8FC7\u4E00\u6761\u53D1\u9519\u4EBA\u7684\u6D88\u606F\uFF0C\u5185\u5BB9\u975E\u5E38\u8981\u547D\u3002",
  "\u6211\u66FE\u4E3A\u4E86\u4E00\u4E2A\u7EA2\u5305\u8E72\u5230\u51CC\u6668\u5341\u4E8C\u70B9\u3002",
  "\u6211\u6709\u8FC7\u88AB\u72D7\u3001\u732B\u6216\u9E45\u8FFD\u7740\u7684\u7ECF\u5386\u3002",
  "\u6211\u575A\u6301\u8FC7\u4E00\u4EF6\u539F\u672C\u4EE5\u4E3A\u4E09\u5929\u5C31\u4F1A\u653E\u5F03\u7684\u5C0F\u4E8B\u3002"
];
var TWOS_ANGLES = [
  "\u6311\u4E00\u6B21\u5C0F\u65F6\u5019\u8BA9\u4F60\u81F3\u4ECA\u88AB\u5BB6\u4EBA\u8BEF\u89E3\u7684\u610F\u5916\u3002",
  "\u8BF4\u4E00\u4EF6\u4F60\u771F\u7684\u62FF\u5F97\u51FA\u624B\u3001\u4F46\u5E73\u65F6\u4E0D\u663E\u6446\u7684\u83DC\u6216\u624B\u827A\u3002",
  "\u8BB2\u4E00\u4E2A\u53EA\u6709\u4F60\u81EA\u5DF1\u77E5\u9053\u7684\u901A\u52E4\u8DEF\u4E0A\u7684\u5C0F\u4E8B\u6545\u3002",
  "\u627E\u4E00\u627E\u4F60\u88AB\u8001\u5E08\u3001\u9886\u5BFC\u6216\u8B66\u5BDF\u53EB\u4F4F\u8FC7\u7684\u4E00\u6B21\u7ECF\u5386\u3002",
  "\u5199\u4E0B\u4E00\u4EF6\u4F60\u575A\u6301\u4E86\u5F88\u4E45\u3001\u522B\u4EBA\u4E00\u542C\u5C31\u89C9\u5F97\u5947\u602A\u7684\u4E60\u60EF\u3002",
  "\u56DE\u5FC6\u4E00\u6B21\u82B1\u51A4\u6789\u94B1\u4E70\u56DE\u6765\u7684\u4E1C\u897F\uFF0C\u4EE5\u53CA\u5B83\u540E\u6765\u7684\u7528\u9014\u3002",
  "\u8BF4\u8BF4\u4F60\u548C\u67D0\u4E2A\u660E\u661F\u3001\u540C\u4E8B\u6216\u4EB2\u621A\u91CD\u540D\u7684\u6545\u4E8B\u3002",
  "\u6311\u4E00\u6B21\u4F60\u5728\u65C5\u884C\u4E2D\u8D70\u9519\u8DEF\u5374\u9047\u5230\u597D\u4E8B\u7684\u7ECF\u5386\u3002",
  "\u8BB2\u4E00\u4E2A\u4F60\u8003\u7838\u6216\u8005\u9762\u8BD5\u5931\u8D25\u4E4B\u540E\u53D1\u751F\u7684\u8F6C\u6298\u3002",
  "\u8BF4\u4F60\u66FE\u7ECF\u62E5\u6709\u8FC7\u3001\u73B0\u5728\u65E9\u5C31\u4E0D\u77E5\u53BB\u5411\u7684\u4E00\u4EF6\u6536\u85CF\u3002",
  "\u627E\u4E00\u6B21\u4F60\u88AB\u8FEB\u4E0A\u53F0\u3001\u9886\u5956\u6216\u5F53\u4F17\u53D1\u8A00\u7684\u573A\u9762\u3002",
  "\u5199\u4E00\u4EF6\u4F60\u5B66\u4F1A\u7684\u5947\u602A\u6280\u80FD\uFF0C\u6BD4\u5982\u4F1A\u52A8\u8033\u6735\u3001\u4F1A\u53E3\u54E8\u3002",
  "\u8BB2\u4E00\u4E2A\u4F60\u81F3\u4ECA\u6CA1\u6562\u544A\u8BC9\u5BB6\u4EBA\u7684\u5C0F\u79D8\u5BC6\uFF08\u5B89\u5168\u90A3\u79CD\uFF09\u3002",
  "\u8BF4\u4E00\u6B21\u4F60\u548C\u964C\u751F\u4EBA\u4E92\u76F8\u5E2E\u5FD9\u5230\u5C34\u5C2C\u7684\u7ECF\u8FC7\u3002",
  "\u6311\u4E00\u6B21\u4F60\u628A\u4E1C\u897F\u843D\u5728\u522B\u4EBA\u8F66\u4E0A\u3001\u5E97\u91CC\u6216\u98DE\u673A\u4E0A\u7684\u6545\u4E8B\u3002",
  "\u8BB2\u8BB2\u4F60\u7B2C\u4E00\u6B21\u505A\u67D0\u4EF6\u4EBA\u4EBA\u90FD\u65E9\u4F1A\u4E86\u7684\u4E8B\u7684\u5E74\u7EAA\u3002",
  "\u8BF4\u4E00\u4E2A\u4F60\u88AB\u8BA4\u9519\u6210\u522B\u4EBA\u3001\u6216\u8005\u8BA4\u9519\u522B\u4EBA\u7684\u77AC\u95F4\u3002",
  "\u5199\u4E00\u4EF6\u4F60\u575A\u6301\u7ED9\u67D0\u4EBA\u8FC7\u751F\u65E5\u3001\u9001\u793C\u7269\u7684\u5E74\u4EFD\u3002",
  "\u8BB2\u4E00\u6B21\u4F60\u5728\u8FD0\u52A8\u3001\u6BD4\u8D5B\u6216\u6E38\u620F\u91CC\u8D62\u5F97\u4E0D\u5149\u5F69\u6216\u8005\u8F93\u5F97\u5149\u8363\u3002",
  "\u8BF4\u4F60\u62E5\u6709\u8FC7\u4F46\u5DF2\u7ECF\u6212\u6389\u7684\u67D0\u6837\u65E5\u5E38\u5C0F\u763E\u3002"
];
var NUDGE_LINES = [
  "\u5148\u8BF4\u6700\u8868\u9762\u7684\u90A3\u4E00\u53E5\uFF0C\u5269\u4E0B\u7684\u4F1A\u81EA\u5DF1\u8DDF\u4E0A\u3002",
  "\u5361\u58F3\u5F88\u6B63\u5E38\uFF0C\u6DF1\u547C\u5438\uFF0C\u968F\u4FBF\u6311\u4E00\u4E2A\u8BCD\u5F00\u5934\u3002",
  "\u522B\u60F3\u627E\u6700\u597D\u73A9\u7684\uFF0C\u5148\u60F3\u7B2C\u4E00\u4E2A\u5192\u51FA\u6765\u7684\u3002",
  "\u8BF4\u7EC6\u8282\uFF1A\u51E0\u70B9\u3001\u5728\u54EA\u3001\u8C01\u5728\u65C1\u8FB9\u3002",
  "\u8D8A\u5177\u4F53\u8D8A\u597D\u7B11\uFF0C\u8D8A\u542B\u7CCA\u8D8A\u50CF\u7F16\u7684\u3002",
  "\u8BF4\u4E00\u534A\u4E5F\u884C\uFF0C\u5269\u4E0B\u7684\u8BA9\u5927\u5BB6\u731C\u3002",
  "\u60F3\u60F3\u90A3\u6B21\u6700\u5C34\u5C2C\u7684\uFF0C\u4E00\u822C\u5C31\u662F\u6700\u597D\u7684\u4E00\u6761\u3002",
  "\u4E0D\u7528\u89E3\u91CA\u539F\u56E0\uFF0C\u5148\u63CF\u8FF0\u73B0\u8C61\u5C31\u591F\u4E86\u3002",
  "\u624B\u4E0A\u6BD4\u5212\u8D77\u6765\uFF0C\u8111\u5B50\u91CC\u7684\u8BCD\u81EA\u5DF1\u4F1A\u5230\u3002",
  "\u8BF4\u4E2A\u5C0F\u5230\u4E0D\u53EF\u80FD\u6709\u4EBA\u731C\u4E2D\u7684\u4E8B\u3002",
  "\u5B9E\u5728\u6CA1\u6709\uFF0C\u5C31\u8BF4\u8BF4\u4F60\u4ECA\u5929\u662F\u600E\u4E48\u5230\u8FD9\u91CC\u7684\u3002",
  "\u4E09\u79D2\u5185\u8BF4\u51FA\u53E3\u7684\u90A3\u53E5\uFF0C\u901A\u5E38\u6700\u7075\u3002"
];

// src/shared/engine/mime.ts
var ROUND_MS = 6e4;
var WORDS_PER_ROUND = 18;
var SKIP_PENALTY_MS = 3e3;
var STREAK_FROM = 3;
var MAX_ROUND_WHEN_CROWDED = 4;
var CROWDED_FROM = 6;
var BASE_POINTS = { easy: 1, mid: 2, hard: 3 };
var DIFF_LABEL = { easy: "\u7B80\u5355", mid: "\u666E\u901A", hard: "\u786C\u6838" };
var LEVELS = [
  { value: "easy", label: "\u7B80\u5355" },
  { value: "mid", label: "\u666E\u901A" },
  { value: "hard", label: "\u786C\u6838" }
];
var asLevel = (v) => {
  const s = String(v ?? "");
  return MIME_WORDS[s] ? s : null;
};
function actorForRound(room, d, round = d.round) {
  const seats = seated(room);
  if (!seats.length) return null;
  return seats[Math.min(Math.max(1, round) - 1, seats.length - 1)].id;
}
function currentWord(d) {
  if (!d.list.length) return "";
  return d.list[Math.min(d.index, d.list.length - 1)];
}
var remainingMs = (room) => room.deadlineAt === null ? 0 : Math.max(0, room.deadlineAt - Date.now());
function usedSeconds(room, d) {
  return Math.max(0, Math.round((d.timeMs - remainingMs(room)) / 1e3));
}
function roundLog(d) {
  const n = Math.max(0, d.correct + d.skips);
  return d.log.slice(Math.max(0, d.log.length - n));
}
function wordCount(d, ok2) {
  return d.log.filter((x) => x.ok === ok2).length;
}
function beginRun(room, d) {
  d.list = shuffle(MIME_WORDS[d.difficulty] ?? []).slice(0, WORDS_PER_ROUND);
  d.index = 0;
  d.actorId = actorForRound(room, d);
  d.correct = 0;
  d.skips = 0;
  d.streak = 0;
  phase(room, "run", { ms: d.timeMs });
  const name = nameOf(room, d.actorId);
  ev(
    room,
    "judge",
    `\u7B2C ${d.round} \u8F6E\u5F00\u8DD1\uFF1A${name} \u4E0A\u53F0\uFF0C${DIFF_LABEL[d.difficulty]}\u96BE\u5EA6\uFF0C${d.list.length} \u4E2A\u8BCD\u3001${Math.round(d.timeMs / 1e3)} \u79D2\u3002${judge("hurry", { name })}`
  );
}
function endRound(room, d, why) {
  const actorId = d.actorId ?? "";
  ev(
    room,
    "score",
    `\u7B2C ${d.round} \u8F6E\u6536\u5DE5\uFF1A${nameOf(room, actorId)} \u8BA9\u5168\u573A\u731C\u4E2D ${d.correct} \u4E2A\uFF0C\u6362\u8BCD ${d.skips} \u6B21\uFF0C\u6700\u957F\u8FDE\u51FB ${d.bestStreak}\uFF0C\u4E2A\u4EBA\u603B\u5206 ${d.scores[actorId] ?? 0} \u5206\u3002${why}`
  );
  phase(room, "gap");
}
function gotoReady(room, d) {
  if (d.round < d.maxRound) {
    d.round += 1;
    d.actorId = actorForRound(room, d);
    phase(room, "ready");
    const name = nameOf(room, d.actorId);
    ev(room, "judge", `\u7B2C ${d.round} \u8F6E\u51C6\u5907\uFF0C\u4E0B\u4E00\u4F4D\u4E0A\u53F0\u7684\u662F ${name}\uFF0C\u5148\u628A\u96BE\u5EA6\u5B9A\u4E0B\u6765\u3002`);
    return;
  }
  phase(room, "over");
  ev(
    room,
    "score",
    `${wordCount(d, true)} \u4E2A\u8BCD\u88AB\u731C\u4E2D\u3001${wordCount(d, false)} \u4E2A\u8BCD\u88AB\u6362\u6389\uFF0C${d.round} \u4E2A\u4EBA\u90FD\u8F6E\u8FC7\u4E00\u6B21\u4E86\u3002${judge("close")}`
  );
}
function startMime(room) {
  const d = mime(room);
  const seats = seated(room);
  d.maxRound = seats.length > CROWDED_FROM ? MAX_ROUND_WHEN_CROWDED : Math.max(1, seats.length);
  d.round = 1;
  d.list = [];
  d.index = 0;
  d.correct = 0;
  d.skips = 0;
  d.streak = 0;
  d.bestStreak = 0;
  d.log = [];
  d.scores = {};
  d.timeMs = ROUND_MS;
  d.actorId = actorForRound(room, d);
  phase(room, "ready");
  ev(room, "judge", `\u7B2C 1 \u8F6E\uFF0C\u6BD4\u5212\u8005\u662F ${nameOf(room, d.actorId)}\uFF0C\u5148\u9009\u96BE\u5EA6\u3002${judge("open")}`);
  ev(room, "info", `\u4E00\u5171\u8F6E ${d.maxRound} \u4E2A\u4EBA\uFF0C\u6BCF\u4EBA ${Math.round(d.timeMs / 1e3)} \u79D2\u51B2\u8BCD\u3002`);
}
var mimeEngine = {
  id: "mime",
  create(room) {
    const d = mime(room);
    const seats = seated(room);
    d.difficulty = "mid";
    d.list = [];
    d.index = 0;
    d.actorId = null;
    d.correct = 0;
    d.skips = 0;
    d.streak = 0;
    d.bestStreak = 0;
    d.log = [];
    d.timeMs = ROUND_MS;
    d.round = 0;
    d.maxRound = seats.length > CROWDED_FROM ? MAX_ROUND_WHEN_CROWDED : Math.max(1, seats.length);
    d.scores = {};
    phase(room, "lobby");
  },
  start(room) {
    startMime(room);
  },
  act(room, actor, action, payload) {
    const d = mime(room);
    if (action === "setDifficulty") {
      if (room.phase !== "ready") return;
      if (!actor.isHost && actor.id !== actorForRound(room, d)) return;
      const level = asLevel(payload?.level);
      if (!level) return;
      d.difficulty = level;
      ev(room, "info", `${clip(actor.name, 12)} \u628A\u96BE\u5EA6\u5B9A\u6210\u300C${DIFF_LABEL[level]}\u300D\uFF0C\u4E00\u4E2A\u8BCD ${BASE_POINTS[level]} \u5206\u3002`);
      return;
    }
    if (action === "startRun") {
      if (!actor.isHost) return;
      if (room.phase === "lobby") {
        startMime(room);
        beginRun(room, d);
        return;
      }
      if (room.phase !== "ready") return;
      beginRun(room, d);
      return;
    }
    if (action === "wordCorrect") {
      if (room.phase !== "run") return;
      if (!actor.isHost && room.refereeId !== actor.id) return;
      const word = currentWord(d);
      if (!word) {
        endRound(room, d, "\u8BCD\u8868\u5DF2\u7ECF\u89C1\u5E95\u4E86\u3002");
        return;
      }
      const actorId = d.actorId ?? "";
      d.correct += 1;
      d.streak += 1;
      if (d.streak > d.bestStreak) d.bestStreak = d.streak;
      const gain = BASE_POINTS[d.difficulty] + (d.streak >= STREAK_FROM ? 1 : 0);
      d.scores[actorId] = (d.scores[actorId] ?? 0) + gain;
      addScore(room, actorId, gain);
      d.log.push({ word, ok: true, by: actorId, seconds: usedSeconds(room, d) });
      d.index += 1;
      const name = nameOf(room, actorId);
      ev(
        room,
        "score",
        `\u300C${word}\u300D\u731C\u4E2D\uFF01${judge("praise", { name })} ${name} +${gain} \u5206${d.streak >= STREAK_FROM ? `\uFF08\u8FDE\u51FB ${d.streak}\uFF09` : ""}\u3002`
      );
      if (d.index >= d.list.length) endRound(room, d, "\u8BCD\u63D0\u524D\u731C\u5B8C\uFF0C\u76F4\u63A5\u6362\u4EBA\u3002");
      return;
    }
    if (action === "wordSkip") {
      if (room.phase !== "run") return;
      if (!d.actorId || actor.id !== d.actorId) return;
      const word = currentWord(d);
      if (!word) return;
      d.skips += 1;
      d.streak = 0;
      d.log.push({ word, ok: false, by: d.actorId, seconds: usedSeconds(room, d) });
      d.index += 1;
      if (room.deadlineAt !== null) room.deadlineAt -= SKIP_PENALTY_MS;
      ev(
        room,
        "judge",
        `${clip(actor.name, 12)} \u6362\u6389\u300C${word}\u300D\uFF0C\u6263 3 \u79D2\uFF0C\u8FD8\u5269 ${Math.ceil(remainingMs(room) / 1e3)} \u79D2\u3002`
      );
      if (d.index >= d.list.length) {
        endRound(room, d, "\u8BCD\u8868\u731C\u5B8C\u4E86\u3002");
        return;
      }
      if (room.deadlineAt !== null && room.deadlineAt <= Date.now()) endRound(room, d, "\u65F6\u95F4\u88AB\u6263\u5149\u4E86\u3002");
      return;
    }
    if (action === "nudge") {
      if (room.phase === "lobby" || room.phase === "over") return;
      ev(room, "judge", `${clip(actor.name, 12)} \u8BF4\u6CA1\u601D\u8DEF\uFF1A${pick(NUDGE_LINES)}`);
      return;
    }
  },
  next(room, actor) {
    const d = mime(room);
    if (room.phase === "lobby") {
      startMime(room);
      return;
    }
    if (room.phase === "ready") {
      beginRun(room, d);
      return;
    }
    if (room.phase === "run") {
      endRound(room, d, "\u8FD9\u662F\u5927\u5C4F\u624B\u52A8\u63D0\u524D\u6536\u7684\u3002");
      return;
    }
    if (room.phase === "gap") {
      gotoReady(room, d);
      return;
    }
  },
  tick(room, now) {
    if (room.phase !== "run") return;
    if (room.deadlineAt === null || now < room.deadlineAt) return;
    endRound(room, mime(room), "\u65F6\u95F4\u5230\u3002");
  },
  /**
   * 脱敏要点：词表 list 在 run 阶段一个都不给，只给长度和进度；
   * log 在 run 阶段只给本轮尾部（这些词现场已经喊出来了），
   * 历史轮次的词等 gap/over 再放，防止和下一轮抽到的词撞车。
   */
  publicData(room) {
    const d = mime(room);
    const running = room.phase === "run";
    return {
      mime: {
        difficulty: d.difficulty,
        round: d.round,
        maxRound: d.maxRound,
        actorId: d.actorId,
        correct: d.correct,
        skips: d.skips,
        streak: d.streak,
        bestStreak: d.bestStreak,
        log: running ? roundLog(d) : d.log,
        scores: d.scores,
        timeMs: d.timeMs,
        listLength: d.list.length,
        index: d.index,
        list: running ? [] : d.list
      }
    };
  },
  /** 词只发给台上那个人，且只在 run 阶段 */
  secretFor(room, me) {
    const d = mime(room);
    if (room.phase !== "run") return {};
    if (!d.actorId || me.id !== d.actorId) return {};
    const word = currentWord(d);
    if (!word) return {};
    return { word, hint: "\u4E0D\u80FD\u8BF4\u51FA\u8BCD\u91CC\u7684\u4EFB\u4F55\u4E00\u4E2A\u5B57" };
  },
  /** 裁判必须看到当前词，否则没法判「算不算猜对」 */
  refereeExtra(room) {
    const d = mime(room);
    return {
      word: room.phase === "run" ? currentWord(d) : "",
      actor: nameOf(room, d.actorId ?? actorForRound(room, d)),
      remaining: Math.max(0, d.list.length - d.index),
      note: room.phase === "run" ? "\u7B54\u6848\u63A5\u8FD1\u5C31\u7B97\u731C\u5BF9\uFF0C\u70B9\u300C\u731C\u5BF9\u4E86\u300D\uFF1B\u6BD4\u5212\u8005\u628A\u8BCD\u91CC\u7684\u5B57\u5FF5\u51FA\u6765\u4E86\u5C31\u8BA9\u4ED6\u6362\u8BCD\uFF08\u81EA\u52A8\u6263 3 \u79D2\uFF09\u3002" : "\u4E0D\u5728\u51B2\u8BCD\u9636\u6BB5\uFF0C\u6CA1\u6709\u9700\u8981\u5224\u7684\u8BCD\u3002"
    };
  },
  needs(room, me, view) {
    const d = mime(room);
    const base = {
      prompt: null,
      input: "none",
      inputHint: "",
      submitted: false,
      hostHint: ""
    };
    const left = secondsLeft(room, view.serverNow);
    const lead = actorForRound(room, d);
    if (room.phase === "lobby") {
      base.hostHint = `\u4EBA\u5230\u9F50\u4E86\u70B9\u300C\u5F00\u59CB\u8FD9\u5C40\u300D\uFF0C\u7B2C\u4E00\u8F6E\u5148\u7531 ${clip(nameOf(room, lead), 12)} \u4E0A\u53F0\u9009\u96BE\u5EA6\u3002`;
      if (!me) return base;
      return { ...base, prompt: "\u7B49\u7740\uFF0C\u7B2C\u4E00\u4E2A\u4E0A\u53F0\u7684\u662F\u4ED6" };
    }
    if (room.phase === "ready") {
      base.hostHint = `\u7B2C ${d.round}/${d.maxRound} \u8F6E\uFF0C\u4E0A\u53F0\u7684\u662F ${clip(nameOf(room, lead), 12)}\u3002\u96BE\u5EA6\u5B9A\u597D\u540E\u70B9\u300C\u4E0B\u4E00\u6B65\u300D\u5F00\u8DD1\u3002`;
      if (!me) return base;
      if (me.id === lead) {
        return {
          ...base,
          prompt: `\u7B2C ${d.round} \u8F6E\u8F6E\u5230\u4F60\u4E0A\u53F0\uFF0C\u5148\u9009\u96BE\u5EA6`,
          input: "pick",
          options: LEVELS,
          valueKey: "level",
          inputHint: `\u96BE\u5EA6\u8D8A\u9AD8\u4E00\u4E2A\u8BCD\u8D8A\u503C\u94B1\uFF1A\u7B80\u5355 ${BASE_POINTS.easy} \u5206 / \u666E\u901A ${BASE_POINTS.mid} \u5206 / \u786C\u6838 ${BASE_POINTS.hard} \u5206\uFF0C\u8FDE\u51FB ${STREAK_FROM} \u4E2A\u4EE5\u4E0A\u6BCF\u4E2A\u518D\u52A0 1 \u5206`
        };
      }
      return {
        ...base,
        prompt: `\u8FD9\u8F6E\u7531 ${clip(nameOf(room, lead), 12)} \u4E0A\u53F0\uFF0C\u7B49\u4ED6\u9009\u96BE\u5EA6`,
        inputHint: isRefereeAct(room, me) ? "\u96BE\u5EA6\u5B9A\u597D\u540E\u70B9\u5927\u5C4F\u7684\u300C\u4E0B\u4E00\u6B65\u300D\u5F00\u8DD1" : ""
      };
    }
    if (room.phase === "run") {
      base.hostHint = `\u5012\u8BA1\u65F6 ${left ?? Math.ceil(d.timeMs / 1e3)} \u79D2\uFF0C\u53F0\u4E0A\u662F ${clip(nameOf(room, d.actorId), 12)}\uFF0C\u8FD8\u5269 ${Math.max(0, d.list.length - d.index)} \u4E2A\u8BCD\u3002\u731C\u5BF9\u4E86\u5C31\u70B9\u300C\u731C\u5BF9\u300D\uFF0C\u7B54\u9519\u4E0D\u7528\u7BA1\uFF0C\u65F6\u95F4\u5230\u81EA\u52A8\u6362\u4EBA\u3002`;
      if (!me) return base;
      if (d.actorId && me.id === d.actorId) {
        const opts = [{ value: "skip", label: "\u6362\u8BCD\uFF08\u6263 3 \u79D2\uFF09" }];
        if (isRefereeAct(room, me)) opts.unshift({ value: "correct", label: "\u731C\u5BF9\u4E86" });
        return {
          ...base,
          prompt: "\u8BCD\u53EA\u6709\u4F60\u770B\u5F97\u5230\uFF0C\u52A8\u5634\u52A8\u817F\u522B\u5FF5\u5B57",
          input: "pick",
          options: opts,
          valueKey: "value",
          inputHint: `\u5DF2\u731C\u4E2D ${d.correct} \u4E2A\uFF0C\u6362\u6389 ${d.skips} \u4E2A\uFF0C\u8FDE\u51FB ${d.streak}`
        };
      }
      if (isRefereeAct(room, me)) {
        return {
          ...base,
          prompt: "\u542C\u5230\u5BF9\u7684\u7B54\u6848\u5C31\u70B9\u300C\u731C\u5BF9\u4E86\u300D",
          input: "pick",
          options: [{ value: "correct", label: "\u731C\u5BF9\u4E86" }],
          valueKey: "value",
          inputHint: `\u672C\u8F6E\u5DF2\u731C\u4E2D ${d.correct} \u4E2A\uFF0C\u6362\u8BCD ${d.skips} \u6B21`
        };
      }
      return { ...base, prompt: "\u770B\u5927\u5C4F\uFF0C\u52A8\u5634\u52A8\u817F\u62A2\u7B54" };
    }
    if (room.phase === "gap") {
      base.hostHint = `\u672C\u8F6E\u6218\u62A5\u5728\u5927\u5C4F\u4E0A\uFF0C\u70B9\u300C\u4E0B\u4E00\u6B65\u300D${d.round < d.maxRound ? `\u6362 ${clip(nameOf(room, actorForRound(room, d, d.round + 1)), 12)} \u4E0A\u53F0` : "\u51FA\u7ED3\u7B97"}\u3002`;
      if (!me) return base;
      return { ...base, prompt: `\u521A\u624D ${clip(nameOf(room, d.actorId), 12)} \u731C\u4E2D ${d.correct} \u4E2A\uFF0C\u6B47\u53E3\u6C14` };
    }
    base.hostHint = "\u6240\u6709\u4EBA\u90FD\u8F6E\u8FC7\u4E86\uFF0C\u770B\u7ED3\u7B97\u9875\u3002";
    if (!me) return base;
    return { ...base, prompt: "\u672C\u5C40\u5DF2\u7ED3\u675F" };
  },
  /** 纯读：分数在 act 里已经落到 scores 和 player.score 上了 */
  finish(room) {
    const d = mime(room);
    const seats = seated(room);
    const agg = {};
    for (const it of d.log) {
      const a = agg[it.by] ?? { ok: 0, skip: 0 };
      if (it.ok) a.ok += 1;
      else a.skip += 1;
      agg[it.by] = a;
    }
    const played = Math.min(Math.max(d.round, 0), Math.max(d.maxRound, 0), seats.length);
    const acted = seats.slice(0, played).map((p) => p.id);
    for (const id of Object.keys(agg)) if (!acted.includes(id)) acted.push(id);
    const lines = [
      `\u5168\u573A\u4E00\u5171\u731C\u4E2D ${wordCount(d, true)} \u4E2A\u8BCD\uFF0C\u6362\u6389 ${wordCount(d, false)} \u4E2A\uFF0C\u6700\u957F\u8FDE\u51FB ${d.bestStreak}\u3002`
    ];
    for (const id of acted) {
      const a = agg[id] ?? { ok: 0, skip: 0 };
      lines.push(
        `${clip(nameOf(room, id), 12)}\uFF1A\u731C\u4E2D ${a.ok} \u4E2A\uFF0C\u6362\u8BCD ${a.skip} \u6B21\uFF0C\u62FF ${d.scores[id] ?? 0} \u5206\u3002`
      );
    }
    const ranked = Object.entries(d.scores).sort((a, b) => b[1] - a[1]);
    if (ranked.length) {
      lines.push(`\u603B\u5206\u6392\u884C\uFF1A${ranked.map(([id, s]) => `${clip(nameOf(room, id), 12)} ${s} \u5206`).join("\u3001")}\u3002`);
    }
    const top = ranked.length ? ranked[0][1] : 0;
    let winners = top > 0 ? ranked.filter(([, s]) => s === top).map(([id]) => ({ name: nameOf(room, id), score: byId(room, id)?.score ?? d.scores[id] ?? 0 })) : [];
    if (!winners.length) {
      const fallback = seats.slice().sort((a, b) => b.score - a.score)[0];
      if (fallback) winners = [{ name: fallback.name, score: fallback.score }];
    }
    return {
      title: "\u672C\u573A\u6BD4\u5212\u738B",
      lines,
      winners,
      verdict: (winners.length ? judge("award", { name: winners.map((w) => w.name).join("\u3001"), title: "\u53CD\u5E94\u51A0\u519B" }) + " " : "") + judge("close")
    };
  }
};

// src/shared/engine/never.ts
var WRITE_MS = 6e4;
var RAISE_MS = 3e4;
var START_SCORE = 10;
var CLAIM_MAX = 80;
var RAISE_PENALTY = -2;
var COLD_BONUS = 3;
var SOMEONE_RAISED_BONUS = 1;
var authorOf = (room) => {
  const d = never(room);
  return d.order[d.cursor] ?? null;
};
function shownAuthor(room) {
  const d = never(room);
  if (room.phase === "show") return d.order[d.cursor] ?? null;
  if (room.phase === "settle") {
    let last = null;
    for (const id of d.order) if (d.settled[id]) last = id;
    return last;
  }
  return null;
}
var raisedOf = (room, authorId) => {
  if (!authorId) return [];
  return (never(room).didIt[authorId] ?? []).filter((id) => !!byId(room, id));
};
var claimedOf = (room) => seated(room).filter((p) => !!never(room).claims[p.id]);
var nobodyClaimed = (room) => claimedOf(room).length === 0;
function nextClaimed(room, from) {
  const d = never(room);
  for (let i = Math.max(0, from); i < d.order.length; i++) {
    const id = d.order[i];
    if (d.claims[id]) {
      d.cursor = i;
      return id;
    }
  }
  d.cursor = d.order.length;
  return null;
}
function enterRaise(room, from, prelude) {
  const d = never(room);
  const id = nextClaimed(room, from);
  if (!id) {
    ev(room, "judge", prelude || "\u9898\u90FD\u95EE\u5B8C\u4E86\uFF0C\u672C\u5C40\u7ED3\u7B97\u3002");
    phase(room, "over");
    return;
  }
  room.round = d.cursor + 1;
  if (!d.didIt[id]) d.didIt[id] = [];
  phase(room, "show", { ms: RAISE_MS });
  if (prelude) ev(room, "info", prelude);
  ev(room, "info", `${nameOf(room, id)}\uFF1A\u300C${d.claims[id]}\u300D\u2014\u2014 \u771F\u505A\u8FC7\u7684\u4EBA\u5728\u624B\u673A\u4E0A\u70B9\u300C\u6211\u505A\u8FC7\u300D\uFF0C\u6CA1\u505A\u8FC7\u7684\u4E0D\u7528\u52A8\u3002`);
}
function forceFromWrite(room) {
  const d = never(room);
  const seats = seated(room);
  const missing = seats.filter((p) => !d.claims[p.id]);
  if (missing.length) {
    ev(room, "judge", `${clip(missing.map((p) => p.name).join("\u3001"), 60)} \u6CA1\u51FA\u9898\uFF0C\u8DF3\u8FC7\u4ED6\u4EEC\uFF0C\u4E00\u5206\u4E0D\u6263\u3002`);
  }
  if (nobodyClaimed(room)) {
    ev(room, "judge", "\u6CA1\u4EBA\u51FA\u9898\uFF0C\u90A3\u5C31\u4E0D\u6263\u5206\u4E86\uFF0C\u672C\u5C40\u7ED3\u675F\u3002");
    phase(room, "over");
    return;
  }
  d.cursor = 0;
  enterRaise(room, 0, "");
}
function settleClaim(room) {
  const d = never(room);
  const author = authorOf(room);
  const p = author ? byId(room, author) : void 0;
  if (!author || !p || !d.claims[author]) return;
  if (d.settled[author]) return;
  const raised = raisedOf(room, author);
  for (const id of raised) addScore(room, id, RAISE_PENALTY);
  const names = raised.map((id) => nameOf(room, id)).join("\u3001");
  if (!raised.length) {
    d.cold[author] = COLD_BONUS;
    addScore(room, author, COLD_BONUS);
    ev(room, "judge", `\u5168\u573A\u6CA1\u4EBA\u4E3E\u624B\u2014\u2014${p.name} \u8FD9\u9898\u62FF\u5230\u51B7\u95E8\u52A0\u6210 +3\u3002`);
  } else {
    addScore(room, author, SOMEONE_RAISED_BONUS);
    ev(
      room,
      "judge",
      `${raised.length} \u4EBA\u4E3E\u624B\uFF08${clip(names, 48)}\uFF09\uFF0C\u6BCF\u4EBA -2\uFF1B${p.name} \u8FD9\u9898\u4E0D\u51B7\u95E8\uFF0C+1\u3002`
    );
  }
  d.settled[author] = true;
  const lead = seated(room).slice().sort((a, b) => b.score - a.score)[0];
  ev(
    room,
    "score",
    `${p.name} \u73B0\u5728 ${p.score} \u5206${lead ? `\uFF0C\u6682\u65F6\u9886\u5148\u7684\u662F ${lead.name}\uFF08${lead.score} \u5206\uFF09` : ""}\u3002`
  );
  phase(room, "settle");
}
function ideaLines(room, n = 2) {
  const pool = NEVER_STARTERS;
  if (!pool.length) return [];
  const base = Math.max(0, room.round) * 3 % pool.length;
  const out = [];
  for (let i = 0; i < n && i < pool.length; i++) {
    const line = pool[(base + i * 7) % pool.length];
    if (line && !out.includes(line)) out.push(line);
  }
  return out;
}
var neverEngine = {
  id: "never",
  create(room) {
    const d = never(room);
    d.startScore = START_SCORE;
    for (const p of room.players) p.score = START_SCORE;
    d.claims = {};
    d.order = [];
    d.cursor = 0;
    d.didIt = {};
    d.settled = {};
    d.cold = {};
    phase(room, "lobby");
  },
  start(room) {
    const d = never(room);
    const seats = seated(room);
    d.startScore = START_SCORE;
    d.order = shuffle(seats.map((p) => p.id));
    d.cursor = 0;
    d.claims = {};
    d.didIt = {};
    d.settled = {};
    d.cold = {};
    for (const p of seats) {
      d.claims[p.id] = "";
      p.score = d.startScore;
    }
    room.round = 1;
    phase(room, "write", { ms: WRITE_MS });
    ev(room, "judge", `${judge("open")} \u6BCF\u4EBA ${d.startScore} \u5206\u8D77\u6B65\uFF0C\u505A\u8FC7\u4E00\u4EF6\u522B\u4EBA\u6CA1\u505A\u8FC7\u7684\u4E8B\u624D\u6709\u5E95\u6C14\u3002`);
    const ideas = ideaLines(room);
    if (ideas.length) {
      ev(room, "info", `\u7075\u611F\u53E5\u5F0F\uFF0C\u7167\u8FD9\u4E2A\u6837\u5B50\u9020\u81EA\u5DF1\u7684\u9898\uFF1A${ideas.join("\uFF1B")}\u3002`);
    }
  },
  act(room, actor, action, payload) {
    const d = never(room);
    if (action === "claim") {
      if (room.phase !== "write") return;
      if (d.claims[actor.id]) return;
      const text = sanitize(payload?.text, CLAIM_MAX);
      if (!text) return;
      d.claims[actor.id] = text;
      const seats = seated(room).map((p) => p.id);
      if (allSubmitted(room, seats, "claims", "never")) {
        d.cursor = 0;
        enterRaise(room, 0, `\u9898\u76EE\u6536\u9F50\uFF08${seats.length} \u9053\uFF09\uFF0C\u5F00\u59CB\u4E00\u9898\u4E00\u9898\u95EE\u3002`);
      }
      return;
    }
    if (action === "didIt") {
      if (room.phase !== "show") return;
      const author = authorOf(room);
      if (!author || author === actor.id) return;
      if (!d.claims[author]) return;
      const raw = payload?.ok ?? payload?.value;
      if (raw !== void 0 && raw !== null) {
        const s = String(raw).toLowerCase();
        if (s === "no" || s === "false" || s === "0") return;
      }
      if (!d.didIt[author]) d.didIt[author] = [];
      if (d.didIt[author].includes(actor.id)) return;
      d.didIt[author].push(actor.id);
      ev(room, "judge", `${actor.name} \u627F\u8BA4\u4E86\uFF1A\u4ED6\u505A\u8FC7\u3002`);
      return;
    }
  },
  next(room, actor) {
    const d = never(room);
    if (room.phase === "lobby") {
      this.start(room);
      return;
    }
    if (room.phase === "write") {
      forceFromWrite(room);
      return;
    }
    if (room.phase === "show") {
      const author = authorOf(room);
      const left = seated(room).filter((p) => p.id !== author && !raisedOf(room, author).includes(p.id));
      if (left.length) ev(room, "info", `\u8FD8\u6709 ${left.length} \u4E2A\u4EBA\u6CA1\u8868\u6001\uFF0C\u5148\u6309\u5DF2\u7ECF\u4E3E\u7684\u624B\u7ED3\u7B97\u3002`);
      settleClaim(room);
      return;
    }
    if (room.phase === "settle") {
      enterRaise(room, d.cursor + 1, "");
      return;
    }
  },
  tick(room, now) {
    if (room.deadlineAt === null || now < room.deadlineAt) return;
    if (room.phase === "write") {
      forceFromWrite(room);
      return;
    }
    if (room.phase === "show") {
      const author = authorOf(room);
      const count = raisedOf(room, author).length;
      ev(room, "judge", `\u4E3E\u624B\u65F6\u95F4\u5230\uFF0C${count} \u4EBA\u627F\u8BA4\u505A\u8FC7\uFF0C\u76F4\u63A5\u7ED3\u7B97\u3002`);
      settleClaim(room);
    }
  },
  publicData(room) {
    const d = never(room);
    const author = shownAuthor(room);
    const live = room.phase === "show" || room.phase === "settle";
    const afterLobby = room.phase !== "lobby" && room.phase !== "write";
    const raised = live ? raisedOf(room, author) : [];
    const seats = seated(room);
    return {
      never: {
        startScore: d.startScore,
        // 写题阶段绝对不给题目内容，只给「谁已出题」
        order: afterLobby ? d.order : [],
        cursor: d.cursor,
        written: seats.filter((p) => !!d.claims[p.id]).map((p) => ({ id: p.id, name: p.name })),
        pending: seats.filter((p) => !d.claims[p.id]).map((p) => p.name),
        authorId: live ? author : null,
        authorName: live && author ? nameOf(room, author) : "",
        claim: live && author ? d.claims[author] ?? "" : "",
        raised: raised.map((id) => nameOf(room, id)),
        raisedCount: raised.length,
        quietCount: live && author ? seats.filter((p) => p.id !== author && !raised.includes(p.id)).length : 0,
        settled: afterLobby ? d.settled : {},
        cold: room.phase === "over" ? d.cold : {},
        claims: room.phase === "over" ? d.claims : null
      }
    };
  },
  secretFor(room, me) {
    const d = never(room);
    const author = shownAuthor(room);
    const raised = raisedOf(room, author);
    return {
      claim: d.claims[me.id] ?? "",
      isMyTurn: !!author && author === me.id,
      raised: !!author && author !== me.id && raised.includes(me.id),
      settled: !!author && !!d.settled[author]
    };
  },
  refereeExtra(room) {
    const d = never(room);
    const author = shownAuthor(room);
    const raised = raisedOf(room, author);
    const seats = seated(room);
    return {
      author: author ? nameOf(room, author) : "",
      claim: author ? d.claims[author] ?? "" : "",
      raised: raised.map((id) => nameOf(room, id)),
      quiet: seats.filter((p) => p.id !== author && !raised.includes(p.id)).map((p) => p.name),
      cold: author ? d.cold[author] ?? 0 : 0,
      note: author ? "\u624B\u673A\u4E0A\u70B9\u300C\u6211\u505A\u8FC7\u300D\u624D\u7B97\u4E3E\u624B\uFF0C\u6CA1\u505A\u8FC7\u7684\u4E0D\u7528\u70B9\u3002\u6CA1\u4EBA\u4E3E\u624B\u5C31\u81EA\u52A8\u7ED9\u4F5C\u8005\u51B7\u95E8\u52A0\u6210 +3\uFF0C\u73B0\u573A\u770B\u7740\u529E\u3002" : "\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8DF3\u5230\u4E0B\u4E00\u4E2A\u4EBA\u3002"
    };
  },
  needs(room, me, view) {
    const d = never(room);
    const base = {
      prompt: null,
      input: "none",
      inputHint: "",
      submitted: false,
      hostHint: "\u7B49\u5F85\u73A9\u5BB6\u52A0\u5165\u540E\u70B9\u300C\u5F00\u59CB\u8FD9\u5C40\u300D\u3002"
    };
    if (!me) {
      return { ...base, hostHint: hostHintFor2(room) };
    }
    if (room.phase === "lobby") {
      return {
        ...base,
        prompt: `\u6BCF\u4EBA\u5148\u62FF ${d.startScore || START_SCORE} \u5206\uFF0C\u60F3\u4E00\u4EF6\u4F60\u771F\u7684\u505A\u8FC7\u7684\u4E8B`,
        hostHint: hostHintFor2(room)
      };
    }
    if (room.phase === "write") {
      const done = !!d.claims[me.id];
      return {
        ...base,
        prompt: done ? "\u5DF2\u4EA4\u9898\uFF0C\u7B49\u5176\u4ED6\u4EBA\u5199\u5B8C" : "\u51FA\u4E00\u9053\u300C\u6211\u6709\u4F60\u6CA1\u6709\u300D",
        input: done ? "none" : "text",
        inputHint: done ? "\u9898\u76EE\u4F1A\u5728\u8F6E\u5230\u4F60\u90A3\u9898\u65F6\u624D\u516C\u5F00\u3002" : "\u7528\u300C\u6211\u6709\u4F60\u6CA1\u6709\uFF1A\u2026\u2026\u300D\u7684\u53E5\u5F0F\uFF0C\u5199\u4E00\u4EF6\u4F60\u771F\u7684\u505A\u8FC7\u7684\u4E8B",
        submitted: done,
        hostHint: hostHintFor2(room)
      };
    }
    if (room.phase === "show") {
      const author = authorOf(room);
      if (author === me.id) {
        return {
          ...base,
          prompt: "\u5927\u5C4F\u5FF5\u7684\u662F\u4F60\u7684\u9898\uFF0C\u76EF\u7740\u8C01\u4E3E\u624B",
          inputHint: "\u672C\u4EBA\u4E0D\u70B9\u5BF9\u81EA\u5DF1\u7684\u9898\u3002",
          submitted: true,
          hostHint: hostHintFor2(room)
        };
      }
      const raised = raisedOf(room, author).includes(me.id);
      return {
        ...base,
        prompt: raised ? "\u4F60\u5DF2\u7ECF\u627F\u8BA4\u4E86\uFF0C\u7B49\u7ED3\u7B97" : "\u8FD9\u9898\u4F60\u505A\u8FC7\u5417\uFF1F",
        input: raised ? "none" : "pick",
        options: [
          { value: "yes", label: "\u6211\u505A\u8FC7\uFF08\u6263 2 \u5206\uFF09" },
          { value: "no", label: "\u6211\u6CA1\u6709" }
        ],
        valueKey: "ok",
        inputHint: raised ? "\u6263\u5206\u4F1A\u5728\u7ED3\u7B97\u65F6\u516C\u5E03\u3002" : "\u505A\u8FC7\u5C31\u70B9\u300C\u6211\u505A\u8FC7\u300D\uFF0C\u6CA1\u505A\u8FC7\u4EC0\u4E48\u90FD\u4E0D\u7528\u70B9\u3002",
        submitted: raised,
        hostHint: hostHintFor2(room)
      };
    }
    if (room.phase === "settle") {
      return {
        ...base,
        prompt: "\u5927\u5C4F\u770B\u7ED3\u7B97\uFF1A\u51E0\u4EBA\u4E3E\u624B\u3001\u8C01\u62FF\u4E86\u51B7\u95E8\u52A0\u6210",
        hostHint: hostHintFor2(room)
      };
    }
    return { ...base, prompt: "\u672C\u5C40\u5DF2\u7ED3\u675F", hostHint: hostHintFor2(room) };
  },
  finish(room) {
    const d = never(room);
    const ranked = rankByScore(room.players);
    const top = ranked[0];
    const bottom = ranked[ranked.length - 1];
    const winners = ranked.filter((r) => r.rank === 0).map((r) => ({ name: r.player.name, score: r.player.score }));
    const ids = seated(room).map((p) => p.id);
    const claims = ids.filter((id) => !!d.claims[id]);
    const skipped = ids.filter((id) => !d.claims[id]).map((id) => nameOf(room, id));
    const totalRaised = ids.reduce((n, id) => n + (d.didIt[id] ?? []).length, 0);
    const coldIds = Object.keys(d.cold).filter((id) => (d.cold[id] ?? 0) > 0);
    const coldest = coldIds.sort((a, b) => (d.cold[b] ?? 0) - (d.cold[a] ?? 0))[0];
    const allTied = top && bottom && top.player.score === bottom.player.score;
    const lines = [];
    lines.push(`${claims.length} \u9053\u9898\u95EE\u5B8C\uFF0C\u5168\u573A\u4E00\u5171\u4E3E\u4E86 ${totalRaised} \u6B21\u624B\u3002`);
    lines.push(
      coldest ? `\u6700\u51B7\u95E8\u7684\u4E00\u9898\u662F ${nameOf(room, coldest)} \u51FA\u7684\uFF1A\u300C${clip(d.claims[coldest] ?? "", 34)}\u300D\uFF0C\u73B0\u573A\u65E0\u4EBA\u4E3E\u624B\u3002` : "\u6CA1\u6709\u4E00\u9898\u771F\u6B63\u51B7\u573A\uFF0C\u4F60\u4EEC\u7684\u7ECF\u5386\u5176\u5B9E\u633A\u50CF\u3002"
    );
    lines.push(
      top ? `\u603B\u5206\u6700\u9AD8 ${top.player.name}\uFF1A${top.player.score} \u5206\uFF08\u8D77\u6B65 ${d.startScore || START_SCORE} \u5206\uFF09\uFF0C\u300C\u5168\u573A\u6700\u4F1A\u85CF\u5956\u300D\u5F52\u4ED6\u3002` : "\u6CA1\u4EBA\u62FF\u5206\uFF0C\u5956\u52B1\u5148\u53D1\u4E0D\u51FA\u53BB\u3002"
    );
    if (allTied) {
      lines.push(`\u5168\u5458\u90FD\u662F ${bottom ? bottom.player.score : d.startScore} \u5206\uFF0C\u60E9\u7F5A\u73AF\u8282\u4F60\u4EEC\u81EA\u5DF1\u77F3\u5934\u526A\u5200\u5E03\u3002`);
    } else if (bottom) {
      const losers = ranked.filter((r) => r.player.score === bottom.player.score).map((r) => r.player.name);
      lines.push(`${clip(losers.join("\u3001"), 48)} \u6389\u5230 ${bottom.player.score} \u5206\uFF0C\u60E9\u7F5A\u73AF\u8282\u5F52\u4ED6\u4EEC\u3002`);
    }
    if (skipped.length) {
      lines.push(`${clip(skipped.join("\u3001"), 48)} \u4E00\u9898\u6CA1\u51FA\uFF0C\u5168\u7A0B\u56F4\u89C2\u3002`);
    }
    return {
      title: `${claims.length} \u9053\u9898 \xB7 ${totalRaised} \u6B21\u4E3E\u624B`,
      lines,
      winners,
      verdict: (top ? judge("award", { name: top.player.name, title: "\u5168\u573A\u6700\u4F1A\u85CF\u5956" }) : judge("tie")) + " " + judge("close")
    };
  }
};
function hostHintFor2(room) {
  const d = never(room);
  switch (room.phase) {
    case "lobby":
      return `\u4EBA\u5230\u9F50\u4E86\u5C31\u70B9\u5F00\u59CB\uFF0C\u7CFB\u7EDF\u4F1A\u7ED9\u6BCF\u4EBA ${d.startScore || START_SCORE} \u5206\u5E76\u62BD\u7075\u611F\u53E5\u5F0F\u3002`;
    case "write": {
      const left = seated(room).filter((p) => !d.claims[p.id]).map((p) => p.name);
      return left.length ? `\u8FD8\u5DEE ${left.length} \u4E2A\u4EBA\u51FA\u9898\uFF1A${clip(left.join("\u3001"), 40)}\u3002\u7B49\u4E0D\u53CA\u5C31\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8DF3\u8FC7\u4ED6\u4EEC\u3002` : "\u9898\u76EE\u6536\u9F50\u4E86\uFF0C\u9A6C\u4E0A\u5F00\u59CB\u4E00\u9898\u4E00\u9898\u95EE\u3002";
    }
    case "show": {
      const author = authorOf(room);
      const raised = raisedOf(room, author).length;
      return `\u6B63\u5728\u95EE ${author ? nameOf(room, author) : "?"} \u7684\u9898\u3002\u5DF2\u6709 ${raised} \u4EBA\u627F\u8BA4\u505A\u8FC7\uFF0C\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u7ACB\u523B\u7ED3\u7B97\u3002`;
    }
    case "settle":
      return "\u770B\u5B8C\u6BD4\u5206\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u6362\u4E0B\u4E00\u4E2A\u4EBA\uFF0C\u6216\u8005\u7ED3\u675F\u672C\u5C40\u3002";
    case "over":
      return "\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u56DE\u5230\u7ED3\u7B97\u9875\u7EE7\u7EED\u505C\u7559\uFF0C\u6216\u5F00\u65B0\u5C40\u3002";
    default:
      return "";
  }
}

// src/shared/engine/seven.ts
var START_MS = 3e3;
var MIN_MS = 1200;
var MAX_MISTAKES = 3;
var isSevenish = (n) => n % 7 === 0 || String(n).includes("7");
function inCircle(room, d, id) {
  if (!id || !d.order.includes(id)) return false;
  if (d.struck.includes(id)) return false;
  const p = byId(room, id);
  return !!p && p.alive;
}
function circle(room, d) {
  return d.order.filter((id) => inCircle(room, d, id));
}
function currentId2(room, d) {
  const id = d.order[d.cursor];
  return inCircle(room, d, id) ? id : null;
}
function enterOver(room, d) {
  if (room.phase !== "run") return;
  const rest = circle(room, d);
  const survivor = rest.length === 1 ? rest[0] : null;
  for (const id of rest) addScore(room, id, id === survivor ? 5 : 3);
  for (const id of d.order) {
    const bonus = MAX_MISTAKES - 1 - (d.mistakes[id] ?? 0);
    if (bonus > 0) addScore(room, id, bonus);
  }
  phase(room, "over");
  ev(
    room,
    "score",
    survivor ? `\u6570\u5B57\u505C\u5728 ${d.count}\uFF0C\u5708\u91CC\u53EA\u5269 ${nameOf(room, survivor)} \u4E00\u4E2A\u4EBA\u8FD8\u7AD9\u7740\u3002${judge("award", { name: nameOf(room, survivor), title: "\u53CD\u5E94\u51A0\u519B" })}` : `\u6570\u5B57\u505C\u5728 ${d.count}\uFF0C\u8FD9\u4E00\u5708\u6CA1\u4EBA\u7B11\u5230\u6700\u540E\u3002`
  );
}
function stepCircle(room, d) {
  if (circle(room, d).length <= 1) {
    enterOver(room, d);
    return;
  }
  const n = d.order.length;
  let idx = d.cursor;
  for (let i = 0; i < n; i++) {
    idx = (idx + 1) % n;
    if (inCircle(room, d, d.order[idx])) {
      d.cursor = idx;
      break;
    }
  }
  retime(room, d.speedMs);
  const nextId = currentId2(room, d);
  const nx = nextId ? byId(room, nextId) : null;
  ev(room, "info", `\u8F6E\u5230 ${nx ? clip(nx.name, 12) : "\u4E0B\u4E00\u4F4D"}\uFF0C\u6570\u5B57 ${d.count}\u3002`);
}
function tighten(d) {
  d.speedMs = Math.max(MIN_MS, START_MS - Math.floor(d.count / 5) * 200);
}
function applyMiss(room, d, id, kind, how) {
  const name = nameOf(room, id);
  const expect = d.count;
  d.mistakes[id] = (d.mistakes[id] ?? 0) + 1;
  d.lastCall = { by: id, expect, kind, correct: false };
  if (how === "timeout") ev(room, "judge", judge("timeout", { name }) + ` \u6570\u5B57 ${expect} \u5C31\u8FD9\u4E48\u6ED1\u8FC7\u53BB\u4E86\u3002`);
  else if (how === "referee") ev(room, "judge", `\u88C1\u5224\u73B0\u573A\u5224\u7ED9 ${name} \u4E00\u6B21\u5931\u8BEF\uFF0C\u6570\u5B57 ${expect} \u4E0D\u7B97\u3002`);
  else ev(room, "judge", `\u6570\u5B57 ${expect}\uFF0C${name} \u5904\u7406\u9519\u4E86\u3002`);
  if (d.mistakes[id] >= MAX_MISTAKES) {
    d.struck.push(id);
    const p = byId(room, id);
    if (p) {
      p.alive = false;
      p.outReason = "\u4E09\u6B21\u5931\u8BEF";
    }
    ev(room, "judge", judge("out", { name, word: "\u4E09\u6B21\u5931\u8BEF" }) + ` ${name} \u4E09\u6B21\u5931\u8BEF\u6512\u6EE1\uFF0C\u79BB\u573A\uFF0C\u5708\u91CC\u5C11\u4E00\u4E2A\u4EBA\u3002`);
  }
  d.count += 1;
  stepCircle(room, d);
}
function startSeven(room) {
  const d = seven(room);
  for (const p of seated(room)) {
    p.alive = true;
    p.outReason = null;
  }
  d.order = seated(room).map((p) => p.id);
  d.cursor = 0;
  d.count = 1;
  d.mistakes = {};
  d.struck = [];
  d.lastCall = null;
  d.speedMs = START_MS;
  phase(room, "run", { ms: d.speedMs });
  const first = byId(room, d.order[0]);
  ev(
    room,
    "judge",
    `7 \u7684\u500D\u6570\u3001\u5E26 7 \u7684\u6570\u90FD\u4E0D\u8BB8\u5FF5\u51FA\u53E3\uFF0C\u62CD\u684C\u5B50\u558A\u300C\u8FC7\u300D\u3002\u6162\u534A\u62CD\u6216\u8005\u5634\u74E2\u8BB0\u4E00\u6B21\u5931\u8BEF\uFF0C\u4E09\u6B21\u5C31\u79BB\u573A\u3002${judge("open")}`
  );
  ev(room, "info", `\u73B0\u5728\u8BE5\u5904\u7406\u6570\u5B57 1\uFF0C${first ? clip(first.name, 12) : "\u7B2C\u4E00\u53F7"} \u5148\u6765\u3002`);
}
var sevenEngine = {
  id: "seven",
  create(room) {
    const d = seven(room);
    d.count = 1;
    d.order = seated(room).map((p) => p.id);
    d.cursor = 0;
    d.mistakes = {};
    d.struck = [];
    d.lastCall = null;
    d.speedMs = START_MS;
    phase(room, "lobby");
  },
  start(room) {
    startSeven(room);
  },
  act(room, actor, action, payload) {
    const d = seven(room);
    if (action === "call") {
      if (room.phase !== "run") return;
      if (actor.id !== currentId2(room, d)) return;
      const raw = payload?.kind;
      const kind = raw === "pass" ? "pass" : raw === "say" ? "say" : null;
      if (!kind) return;
      if (kind === "pass" === isSevenish(d.count)) {
        d.lastCall = { by: actor.id, expect: d.count, kind, correct: true };
        d.count += 1;
        tighten(d);
        stepCircle(room, d);
      } else {
        applyMiss(room, d, actor.id, kind, "wrong");
      }
      return;
    }
    if (action === "refereeMiss") {
      if (room.judgeMode !== "human" || room.refereeId !== actor.id) return;
      if (room.phase !== "run") return;
      const target = String(payload?.target ?? "");
      if (!inCircle(room, d, target)) return;
      applyMiss(room, d, target, isSevenish(d.count) ? "say" : "pass", "referee");
      return;
    }
  },
  next(room, actor) {
    const d = seven(room);
    if (room.phase === "lobby") {
      startSeven(room);
      return;
    }
    if (room.phase === "run") {
      const cur = currentId2(room, d);
      ev(room, "judge", `\u88C1\u5224\u653E\u8FC7 ${cur ? nameOf(room, cur) : "\u8FD9\u4E00\u4F4D"} \u7684\u300C\u6570\u5B57 ${d.count}\u300D\uFF0C\u8FD9\u4E00\u4E0B\u4E0D\u8BB0\u5931\u8BEF\u3002`);
      d.count += 1;
      tighten(d);
      stepCircle(room, d);
      return;
    }
  },
  tick(room, now) {
    if (room.phase !== "run") return;
    if (room.deadlineAt === null || now < room.deadlineAt) return;
    const d = seven(room);
    const cur = currentId2(room, d);
    if (!cur) {
      enterOver(room, d);
      return;
    }
    applyMiss(room, d, cur, "say", "timeout");
  },
  /**
   * 脱敏要点：isSevenish 是「答案」，run 阶段绝不进 publicData，
   * 否则手机上人人都能提前算；答案只在 lastCall.correct / lastCall.expect 里事后回放，
   * 实时小抄只走 refereeExtra。
   */
  publicData(room) {
    const d = seven(room);
    return {
      seven: {
        count: d.count,
        order: d.order,
        cursor: d.cursor,
        current: currentId2(room, d),
        mistakes: d.mistakes,
        struck: d.struck,
        lastCall: d.lastCall,
        speedMs: d.speedMs,
        aliveCount: circle(room, d).length
      }
    };
  },
  /** 逢七过没有任何私密信息：每个人看到的公开状态完全一致 */
  secretFor(_room, _me) {
    return {};
  },
  refereeExtra(room) {
    const d = seven(room);
    const nextSevenish = [];
    for (let i = 1; i <= 5; i++) {
      const n = d.count + i;
      nextSevenish.push({ n, hit: isSevenish(n) });
    }
    const cur = currentId2(room, d);
    return {
      expect: d.count,
      isSevenish: isSevenish(d.count),
      nextSevenish,
      note: room.phase === "run" ? `\u8BE5 ${cur ? nameOf(room, cur) : "\u6CA1\u4EBA"} \u5E94\u7B54\uFF1B\u8FD9\u4E2A\u6570${isSevenish(d.count) ? "\u8981\u62CD\u684C\u558A\u8FC7" : "\u8981\u7167\u5E38\u62A5\u51FA\u6765"}\u3002\u8C01\u6162\u534A\u62CD\u6216\u5634\u74E2\u5C31\u70B9\u300C\u8BB0\u5931\u8BEF\u300D\u3002` : "\u4E0D\u5728\u5E94\u7B54\u9636\u6BB5\uFF0C\u65E0\u9700\u76EF\u4EBA\u3002"
    };
  },
  needs(room, me, view) {
    const d = seven(room);
    const base = {
      prompt: null,
      input: "none",
      inputHint: "",
      submitted: false,
      hostHint: ""
    };
    const cur = currentId2(room, d);
    const left = secondsLeft(room, view.serverNow);
    if (room.phase === "lobby") {
      base.hostHint = `\u5EA7\u4F4D\u4E0A\u6709 ${d.order.length} \u4E2A\u4EBA\uFF0C\u4EBA\u9F50\u4E86\u70B9\u300C\u5F00\u59CB\u8FD9\u5C40\u300D\uFF0C\u4ECE\u6570\u5B57 1 \u5F00\u59CB\u3002`;
      if (!me) return base;
      return { ...base, prompt: "\u56F4\u6210\u4E00\u5708\uFF0C\u624B\u653E\u684C\u4E0A\u51C6\u5907\u62CD" };
    }
    if (room.phase === "over") {
      base.hostHint = `\u672C\u5C40\u5DF2\u7ECF\u7ED3\u675F\uFF0C\u6570\u5B57\u505C\u5728 ${d.count}\u3002\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u4E0D\u4F1A\u6539\u5206\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5F00\u4E0B\u4E00\u5C40\u3002`;
      if (!me) return base;
      return { ...base, prompt: "\u672C\u5C40\u7ED3\u675F\uFF0C\u770B\u699C\u5355" };
    }
    base.hostHint = `\u73B0\u5728\u5904\u7406\u6570\u5B57 ${d.count}\uFF0C\u5E94\u7B54\u4EBA\u662F ${cur ? clip(nameOf(room, cur), 12) : "\u6CA1\u4EBA"}\uFF0C\u65F6\u9650\u8FD8\u5269 ${left ?? Math.ceil(d.speedMs / 1e3)} \u79D2\u3002\u5361\u4F4F\u4E86\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u653E\u8FC7\uFF0C\u5634\u74E2\u4E86\u70B9\u300C\u8BB0\u5931\u8BEF\u300D\u3002`;
    if (!me) return base;
    if (!inCircle(room, d, me.id)) {
      return { ...base, prompt: "\u4F60\u5DF2\u7ECF\u88AB\u62AC\u51FA\u53BB\u4E86\uFF0C\u8FD9\u5C40\u5F53\u4E2A\u5408\u683C\u7684\u89C2\u4F17" };
    }
    if (me.id !== cur) {
      return { ...base, prompt: "\u76EF\u7D27\uFF0C\u4E0B\u4E00\u4E2A\u53EF\u80FD\u662F\u4F60" };
    }
    return {
      ...base,
      prompt: `\u8F6E\u5230\u4F60\u4E86\uFF0C${clip(nameOf(room, me.id), 12)}`,
      input: "pick",
      options: [
        { value: "say", label: "\u62A5\u6570" },
        { value: "pass", label: "\u62CD\u684C\u558A\u8FC7" }
      ],
      valueKey: "kind",
      inputHint: `\u6570\u5B57 ${d.count} \u2014\u2014 \u5FEB\u901F\u51B3\u5B9A`,
      submitted: false
    };
  },
  /** 纯读：分数在 enterOver 里就已经结清了 */
  finish(room) {
    const d = seven(room);
    const handled = Math.max(0, d.count - 1);
    const rest = circle(room, d);
    const ranked = d.order.slice().sort((a, b) => (d.mistakes[a] ?? 0) - (d.mistakes[b] ?? 0));
    const fewest = ranked.length ? d.mistakes[ranked[0]] ?? 0 : 0;
    const best = ranked.filter((id) => (d.mistakes[id] ?? 0) === fewest);
    let winners = best.map((id) => ({ name: nameOf(room, id), score: byId(room, id)?.score ?? 0 }));
    if (!winners.length) {
      const top = room.players.slice().sort((a, b) => b.score - a.score)[0];
      if (top) winners = [{ name: top.name, score: top.score }];
    }
    return {
      title: "\u53CD\u5E94\u5BA1\u5224",
      lines: [
        `\u4ECE 1 \u4E00\u8DEF\u6570\u5230 ${handled}\uFF0C\u4E00\u5171\u5904\u7406\u4E86 ${handled} \u4E2A\u6570\u5B57\u3002`,
        ranked.length ? `\u5931\u8BEF\u7EDF\u8BA1\uFF1A${ranked.map((id) => `${nameOf(room, id)} ${d.mistakes[id] ?? 0} \u6B21`).join("\u3001")}\u3002` : "\u6CA1\u4EBA\u53C2\u4E0E\u62A5\u6570\u3002",
        d.struck.length ? `\u79BB\u573A\u987A\u5E8F\uFF1A${d.struck.map((id) => nameOf(room, id)).join(" \u2192 ")}\u3002` : "\u5168\u7A0B\u6CA1\u4EBA\u6512\u6EE1\u4E09\u6B21\u5931\u8BEF\u3002",
        rest.length === 1 ? `\u7AD9\u5230\u6700\u540E\u7684\u662F ${nameOf(room, rest[0])}\u3002` : rest.length ? `\u6700\u540E\u8FD8\u7559\u5728\u5708\u91CC\u7684\uFF1A${rest.map((id) => nameOf(room, id)).join("\u3001")}\u3002` : "\u6240\u6709\u4EBA\u90FD\u88AB\u62AC\u8D70\u4E86\uFF0C\u8D62\u5BB6\u4F60\u4EEC\u81EA\u5DF1\u5435\u3002"
      ],
      winners,
      verdict: (winners.length ? judge("award", { name: winners.map((w) => w.name).join("\u3001"), title: "\u53CD\u5E94\u51A0\u519B" }) + " " : "") + judge("close")
    };
  }
};

// src/shared/engine/soup.ts
var ASK_MS = 20 * 60 * 1e3;
var URGE_BEFORE_MS = 12e4;
var URGE_ID = "__urge";
var URGE_BY = "__system";
var URGE_TEXT = "\uFF08\u7CFB\u7EDF\u63D0\u793A\uFF1A\u8FD8\u5269 2 \u5206\u949F\uFF09";
var SOLVE_RATIO = 0.3;
var ASK_MAX = 60;
var SOLVE_MAX = 200;
var SOLVE_POINTS = 6;
var ASK_POINTS_CAP = 5;
var ANSWER_LABEL = {
  yes: "\u662F",
  no: "\u4E0D\u662F",
  partial: "\u90E8\u5206\u662F",
  none: "\u8FD9\u4E0E\u771F\u76F8\u65E0\u5173",
  pending: "\u7B49\u88C1\u5224\u56DE\u7B54"
};
var VALID_ANSWERS = ["yes", "no", "partial", "none"];
var ASK_INPUT_HINT = "\u95EE\u4E00\u4E2A\u53EA\u80FD\u7528\u300C\u662F / \u4E0D\u662F\u300D\u56DE\u7B54\u7684\u95EE\u9898\uFF0C\u522B\u95EE\u300C\u662F\u8C01\u300D\u8FD9\u79CD\u5F00\u653E\u5F0F\u95EE\u9898";
var PUZZLE_BY_ID = new Map(
  SOUP_PUZZLES.map((p) => [p.id, p])
);
function puzzleOf(d) {
  return PUZZLE_BY_ID.get(d.puzzleId) ?? null;
}
function hitCount(text, words) {
  let n = 0;
  for (const w of words) if (w.length >= 2 && text.includes(w)) n += 1;
  return n;
}
function aiAnswer(text, p) {
  const groups = [
    { answer: "partial", n: hitCount(text, p.partial ?? []) },
    { answer: "no", n: hitCount(text, p.no ?? []) },
    { answer: "yes", n: hitCount(text, p.yes ?? []) }
  ];
  const max = Math.max(groups[0].n, groups[1].n, groups[2].n);
  if (max <= 0) return { answer: "none", vague: false };
  const tied = groups.filter((g) => g.n === max);
  return { answer: tied[0].answer, vague: tied.length > 1 };
}
function pendingQueue(d) {
  return d.queue.filter((q) => q.answer === "pending");
}
function realQuestionCount(d) {
  return d.queue.filter((q) => q.by !== URGE_BY).length;
}
function quietestName(room, d) {
  let target = null;
  let min = Infinity;
  for (const p of room.players) {
    const n = d.asked[p.id] ?? 0;
    if (n < min) {
      min = n;
      target = p;
    }
  }
  return target?.name ?? "\u8FD8\u6CA1\u5F00\u53E3\u7684\u90A3\u4F4D";
}
function toOver2(room, reason) {
  const d = soup(room);
  if (room.phase === "over") return;
  scoreSoup(room);
  phase(room, "over");
  if (reason === "solved") {
    ev(room, "judge", `${nameOf(room, d.solvedBy)} \u628A\u8FD9\u7897\u6C64\u8FD8\u539F\u4E86\u3002\u6C64\u5E95\uFF1A${clip(d.truth, 90)}`);
  } else if (reason === "timeout") {
    ev(room, "judge", "20 \u5206\u949F\u5230\u4E86\uFF0C\u6C64\u51C9\u4E86\u2014\u2014\u8FD9\u7897\u6CA1\u4EBA\u559D\u5B8C\u3002");
  } else {
    ev(room, "judge", d.solved ? "\u4E3B\u6301\u4EBA\u6536\u684C\uFF0C\u771F\u76F8\u5DF2\u7ECF\u8FD8\u539F\u3002" : "\u4E3B\u6301\u4EBA\u6536\u684C\uFF0C\u8FD9\u7897\u6C64\u5148\u8BB0\u300C\u6CA1\u559D\u5B8C\u300D\u3002");
  }
  ev(
    room,
    "score",
    d.solved ? `${nameOf(room, d.solvedBy)} +${SOLVE_POINTS}\uFF0C\u5176\u4F59\u6309\u63D0\u95EE\u6570\u5404\u62FF\u6700\u591A ${ASK_POINTS_CAP} \u5206\uFF1B${d.hintsUsed} \u4E2A\u63D0\u793A\u8BA9\u6BCF\u4EBA\u6263 ${d.hintsUsed} \u5206\u3002` : `\u6CA1\u4EBA\u731C\u4E2D\uFF0C\u5168\u5458\u6309\u63D0\u95EE\u6570\u8BA1\u5206\uFF1B\u63D0\u793A\u7528\u4E86 ${d.hintsUsed} \u4E2A\uFF0C\u6BCF\u4EBA\u6263 ${d.hintsUsed} \u5206\u3002`
  );
  ev(room, "judge", judge("close"));
}
function scoreSoup(room) {
  const d = soup(room);
  for (const p of room.players) {
    if (d.solved && d.solvedBy === p.id) addScore(room, p.id, SOLVE_POINTS);
    else addScore(room, p.id, Math.min(d.asked[p.id] ?? 0, ASK_POINTS_CAP));
    if (d.hintsUsed > 0) addScore(room, p.id, -d.hintsUsed);
  }
}
function hostHintFor3(room) {
  const d = soup(room);
  switch (room.phase) {
    case "lobby":
      return `\u672C\u9898\u300A${d.title || "\u672A\u9009\u9898"}\u300B\u3002\u73A9\u5BB6\u8F6E\u6D41\u63D0\u300C\u662F / \u4E0D\u662F\u300D\u7684\u95EE\u9898\uFF0C\u88C1\u5224\u53EA\u56DE\u7B54 \u662F / \u4E0D\u662F / \u90E8\u5206\u662F / \u4E0E\u771F\u76F8\u65E0\u5173\uFF1B\u6709\u4EBA\u4E3E\u624B\u590D\u8FF0\u771F\u76F8\uFF0C\u8BF4\u5BF9\u5373\u80DC\u3002\u4EBA\u9F50\u4E86\u70B9\u5F00\u59CB\u3002`;
    case "ask": {
      const parts = [`${realQuestionCount(d)} \u4E2A\u95EE\u9898\u5DF2\u95EE`, `\u63D0\u793A\u7528\u4E86 ${d.hintsUsed} \u4E2A`];
      if (room.judgeMode === "human") parts.push(`${pendingQueue(d).length} \u4E2A\u95EE\u9898\u7B49\u88C1\u5224\u70B9\u7B54\u6848`);
      if (d.declaredBy) parts.push(`${nameOf(room, d.declaredBy)} \u521A\u5BA3\u5E03\u8FC7\u590D\u8FF0`);
      parts.push(
        room.deadlineAt === null ? "\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u6536\u5C3E" : d.solved ? "\u5DF2\u8FD8\u539F\uFF0C\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8FDB\u7ED3\u7B97" : "\u6709\u4EBA\u5BA3\u5E03\u4E14\u8BF4\u5BF9\u4F1A\u81EA\u52A8\u7ED3\u675F\uFF1B\u89C9\u5F97\u5DEE\u4E0D\u591A\u5C31\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u6536\u5C3E"
      );
      return parts.join("\uFF1B") + "\u3002";
    }
    case "over":
      return "\u7ED3\u7B97\u9875\u5DF2\u751F\u6210\uFF0C\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u7EE7\u7EED\u505C\u7559\u6216\u5F00\u65B0\u5C40\u3002";
    default:
      return "";
  }
}
var soupEngine = {
  id: "soup",
  create(room) {
    const d = soup(room);
    const p = pick(SOUP_PUZZLES);
    d.puzzleId = p?.id ?? "";
    d.title = p?.title ?? "\u6CA1\u914D\u597D\u7684\u6C64";
    d.tags = p ? [...p.tags ?? []] : [];
    d.question = p?.question ?? "\u9898\u76EE\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u5F00\u4E00\u5C40\u3002";
    d.truth = p?.truth ?? "";
    d.queue = [];
    d.asked = {};
    d.hintsUsed = 0;
    d.declaredBy = null;
    d.declaredAnswer = "";
    d.solved = false;
    d.solvedBy = null;
    d.startedAt = 0;
    d.elapsedMs = 0;
    phase(room, "lobby");
  },
  start(room) {
    const d = soup(room);
    const now = Date.now();
    d.startedAt = now;
    room.startedAt = now;
    d.elapsedMs = 0;
    d.queue = [];
    d.asked = {};
    d.hintsUsed = 0;
    d.declaredBy = null;
    d.declaredAnswer = "";
    d.solved = false;
    d.solvedBy = null;
    ev(room, "info", `\u672C\u9898\u300A${d.title}\u300B${d.tags.length ? ` \xB7 ${d.tags.join(" / ")}` : ""}`);
    ev(room, "judge", `\u6C64\u9762\uFF1A${d.question}`);
    ev(room, "judge", judge("open") + " \u53EA\u80FD\u56DE\u7B54\u300C\u662F / \u4E0D\u662F / \u90E8\u5206\u662F / \u4E0E\u771F\u76F8\u65E0\u5173\u300D\uFF0C\u60F3\u6E05\u695A\u4E86\u518D\u4E3E\u624B\u5BA3\u5E03\u3002");
    phase(room, "ask", { ms: ASK_MS });
  },
  act(room, actor, action, payload) {
    const d = soup(room);
    if (room.phase !== "ask") return;
    if (action === "ask") {
      if (room.refereeId === actor.id) return;
      const text = sanitize(payload?.text, ASK_MAX);
      if (!text) return;
      d.asked[actor.id] = (d.asked[actor.id] ?? 0) + 1;
      const p = puzzleOf(d);
      const needHuman = room.judgeMode === "human" || !p;
      const auto = p ? aiAnswer(text, p) : { answer: "none", vague: false };
      const answer = needHuman ? "pending" : auto.answer;
      const item = {
        id: `${actor.id}-${d.queue.length}`,
        by: actor.id,
        byName: actor.name,
        text,
        answer,
        at: Date.now()
      };
      d.queue.push(item);
      if (answer === "pending") {
        ev(room, "info", `${actor.name} \u95EE\uFF1A${text}`);
      } else {
        ev(
          room,
          "judge",
          `${actor.name} \u95EE\uFF1A${text} \u2192 ${ANSWER_LABEL[answer]}${auto.vague ? "\uFF08\u88C1\u5224\u8868\u793A\u8FD9\u4E2A\u95EE\u9898\u8FD8\u4E0D\u8DB3\u4EE5\u5B9A\u65B9\u5411\uFF09" : ""}`
        );
      }
      return;
    }
    if (action === "answer") {
      if (room.judgeMode !== "human" || room.refereeId !== actor.id) return;
      const id = String(payload?.id ?? "");
      const raw = String(payload?.answer ?? "");
      if (!VALID_ANSWERS.includes(raw)) return;
      const item = d.queue.find((q) => q.id === id);
      if (!item || item.answer !== "pending") return;
      item.answer = raw;
      ev(room, "judge", `\u88C1\u5224\u56DE\u7B54 ${item.byName}\u300C${item.text}\u300D\u2014\u2014 ${ANSWER_LABEL[raw]}\u3002`);
      return;
    }
    if (action === "solve") {
      const text = sanitize(payload?.answer, SOLVE_MAX);
      if (!text) return;
      d.declaredBy = actor.id;
      d.declaredAnswer = text;
      if (room.judgeMode === "human") {
        ev(room, "judge", `${actor.name} \u4E3E\u624B\u5BA3\u5E03\u8FD8\u539F\u771F\u76F8\uFF0C\u7B49\u88C1\u5224\u5224\u5B9A\u300C\u8BF4\u5BF9\u4E86 / \u8FD8\u5DEE\u4E00\u70B9\u300D\u3002`);
        return;
      }
      const denom = Math.max(1, grams(d.truth).size);
      const ratio = overlap(d.truth, text) / denom;
      const percent = Math.round(ratio * 100);
      if (ratio >= SOLVE_RATIO) {
        d.solved = true;
        d.solvedBy = actor.id;
        ev(room, "judge", `${actor.name} \u7684\u590D\u8FF0\u548C\u6C64\u5E95\u91CD\u5408 ${percent}%\uFF0C\u591F\u4E0A\u4E86\u2014\u2014\u5224\u8FD8\u539F\u6210\u529F\u3002`);
        toOver2(room, "solved");
      } else {
        ev(
          room,
          "judge",
          `${actor.name} \u7684\u590D\u8FF0\u53EA\u91CD\u5408\u5230 ${percent}%\uFF1A\u63A5\u8FD1\u4E86\uFF0C\u4F46\u5173\u952E\u7684\u4E00\u73AF\u8FD8\u5DEE\u7740\u3002\u88C1\u5224\u53EF\u4EE5\u7ED9\u4E2A\u63D0\u793A\uFF0C\u6216\u8005\u63A5\u7740\u95EE\u3002`
        );
      }
      return;
    }
    if (action === "verdict") {
      if (room.judgeMode !== "human" || room.refereeId !== actor.id) return;
      if (!d.declaredBy) return;
      const ok2 = payload?.ok === true || payload?.ok === "true";
      if (ok2) {
        d.solved = true;
        d.solvedBy = d.declaredBy;
        ev(room, "judge", `\u88C1\u5224\u8BA4\u5B9A ${nameOf(room, d.declaredBy)} \u8BF4\u5BF9\u4E86\uFF0C\u6C64\u5E95\u63ED\u5F00\u3002`);
        toOver2(room, "solved");
      } else {
        ev(room, "judge", "\u88C1\u5224\u6447\u5934\uFF1A\u63A5\u8FD1\u4E86\uFF0C\u4F46\u5173\u952E\u7684\u4E00\u73AF\u8FD8\u5DEE\u7740\u3002\u63A5\u7740\u95EE\uFF0C\u522B\u505C\u3002");
      }
      return;
    }
    if (action === "hint") {
      if (!actor.isHost && room.refereeId !== actor.id) return;
      const list = puzzleOf(d)?.hints ?? [];
      if (!list.length) {
        ev(room, "info", "\u8FD9\u7897\u6C64\u6CA1\u51C6\u5907\u63D0\u793A\u3002");
        return;
      }
      d.hintsUsed += 1;
      const idx = Math.min(Math.max(1, d.hintsUsed), list.length) - 1;
      ev(room, "judge", `\u63D0\u793A ${d.hintsUsed}\uFF1A${list[idx]}\uFF08\u63D0\u793A\u6BCF\u591A\u7528\u4E00\u4E2A\uFF0C\u7ED3\u7B97\u65F6\u6BCF\u4EBA\u6263 1 \u5206\u3002\uFF09`);
      return;
    }
  },
  next(room, actor) {
    if (room.phase === "lobby") {
      this.start(room);
      return;
    }
    if (room.phase === "ask") {
      toOver2(room, "stop");
      return;
    }
  },
  tick(room, now) {
    if (room.phase !== "ask") return;
    const d = soup(room);
    const base = d.startedAt || room.startedAt;
    if (base) d.elapsedMs = Math.max(0, now - base);
    if (room.deadlineAt === null) return;
    if (now >= room.deadlineAt) {
      toOver2(room, "timeout");
      return;
    }
    if (now > room.deadlineAt - URGE_BEFORE_MS && !d.queue.some((q) => q.id === URGE_ID)) {
      d.queue.push({
        id: URGE_ID,
        by: URGE_BY,
        byName: "\u88C1\u5224",
        text: URGE_TEXT,
        answer: "none",
        at: Date.now()
      });
      ev(room, "judge", `\u8FD8\u5269\u6700\u540E 2 \u5206\u949F\uFF0C\u6CA1\u4EBA\u4E3E\u624B\u8FD9\u7897\u6C64\u5C31\u51C9\u900F\u4E86\u3002${judge("hurry", { name: quietestName(room, d) })}`);
    }
  },
  publicData(room) {
    const d = soup(room);
    const over = room.phase === "over";
    return {
      soup: {
        puzzleId: d.puzzleId,
        title: d.title,
        tags: d.tags,
        question: d.question,
        // 'ask' 阶段绝不出汤底；'over' 才揭开
        truth: over ? d.truth : "",
        solved: over ? d.solved : false,
        solvedBy: over ? d.solvedBy : null,
        // 问答全量公开，这是玩法本身要求
        queue: d.queue,
        asked: d.asked,
        hintsUsed: d.hintsUsed,
        declaredBy: d.declaredBy,
        declaredAnswer: d.declaredAnswer,
        elapsedMs: d.elapsedMs,
        questionCount: realQuestionCount(d),
        pendingCount: pendingQueue(d).length,
        judgeMode: room.judgeMode
      }
    };
  },
  secretFor(room, me) {
    const d = soup(room);
    return { asked: d.asked[me.id] ?? 0 };
  },
  refereeExtra(room) {
    const d = soup(room);
    const p = puzzleOf(d);
    return {
      truth: d.truth,
      hints: p?.hints ?? [],
      hintTotal: (p?.hints ?? []).length,
      pending: pendingQueue(d).map((q) => ({ id: q.id, by: q.by, byName: q.byName, text: q.text })),
      declaredBy: d.declaredBy,
      declaredName: d.declaredBy ? nameOf(room, d.declaredBy) : "",
      declaredAnswer: d.declaredAnswer,
      solved: d.solved,
      note: room.judgeMode === "ai" ? "\u672C\u5730\u5173\u952E\u8BCD\u88C1\u5224\u5DF2\u81EA\u52A8\u56DE\u7B54\uFF0C\u4F60\u53EA\u7528\u76EF\u8282\u594F\uFF1B\u5DEE\u4E0D\u591A\u5C31\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u6536\u5C3E\u3002" : "\u7167\u6C64\u5E95\u56DE\u7B54\uFF1A\u662F / \u4E0D\u662F / \u90E8\u5206\u662F / \u4E0E\u771F\u76F8\u65E0\u5173\u3002\u6709\u4EBA\u590D\u8FF0\u65F6\u70B9\u300C\u8BF4\u5BF9\u4E86 / \u8FD8\u5DEE\u4E00\u70B9\u300D\u3002"
    };
  },
  needs(room, me, view) {
    const d = soup(room);
    const base = {
      prompt: null,
      input: "none",
      inputHint: "",
      submitted: false,
      hostHint: hostHintFor3(room)
    };
    if (!me) return base;
    if (room.phase === "lobby") {
      return {
        ...base,
        prompt: "\u5927\u5C4F\u4E0A\u662F\u6C64\u9762\uFF0C\u5148\u60F3\u597D\u4F60\u7684\u7B2C\u4E00\u4E2A\u662F\u975E\u95EE\u9898",
        inputHint: "\u88C1\u5224\u53EA\u56DE\u7B54\u300C\u662F / \u4E0D\u662F / \u90E8\u5206\u662F / \u4E0E\u771F\u76F8\u65E0\u5173\u300D\uFF0C\u522B\u95EE\u5F00\u653E\u5F0F\u95EE\u9898"
      };
    }
    if (room.phase === "ask") {
      if (room.judgeMode === "human" && room.refereeId === me.id) {
        const n = pendingQueue(d).length;
        return {
          ...base,
          prompt: n ? `\u6709 ${n} \u4E2A\u95EE\u9898\u7B49\u4F60\u56DE\u7B54` : "\u6682\u65F6\u6CA1\u6709\u5F85\u7B54\u95EE\u9898",
          inputHint: "\u5728\u88C1\u5224\u9762\u677F\u4E0A\u70B9\u7B54\u6848\uFF1A\u662F / \u4E0D\u662F / \u90E8\u5206\u662F / \u4E0E\u771F\u76F8\u65E0\u5173"
        };
      }
      const mine = d.asked[me.id] ?? 0;
      return {
        ...base,
        prompt: d.declaredBy === me.id ? `\u4F60\u5DF2\u4E3E\u624B\u590D\u8FF0\uFF08\u5171\u95EE\u4E86 ${mine} \u4E2A\u95EE\u9898\uFF09\uFF0C\u7B49\u88C1\u5224\u5224\u5B9A` : `\u4F60\u5DF2\u7ECF\u95EE\u4E86 ${mine} \u4E2A\u95EE\u9898\uFF0C\u60F3\u6E05\u695A\u4E86\u5C31\u4E3E\u624B\u5BA3\u5E03`,
        input: "text",
        inputHint: ASK_INPUT_HINT
      };
    }
    if (room.phase === "over") {
      return { ...base, prompt: d.solved ? "\u672C\u5C40\u7ED3\u675F\uFF0C\u6C64\u5E95\u5DF2\u63ED\u5F00" : "\u672C\u5C40\u7ED3\u675F\uFF0C\u8FD9\u7897\u6C64\u6CA1\u4EBA\u559D\u5B8C" };
    }
    return base;
  },
  finish(room) {
    const d = soup(room);
    const ranked = rankByScore(room.players);
    const top = ranked[0]?.rank ?? 0;
    const winners = ranked.filter((r) => r.rank === top).map((r) => ({ name: r.player.name, score: r.player.score }));
    const askedList = Object.entries(d.asked).sort((a, b) => b[1] - a[1]);
    const timedOut = !d.solved && d.elapsedMs >= ASK_MS - 2e3;
    const bestName = askedList.length ? nameOf(room, askedList[0][0]) : "";
    const award = bestName ? " " + judge("award", { name: bestName, title: "\u6700\u4F1A\u63D0\u95EE\u5956" }) : "";
    return {
      title: d.solved ? "\u771F\u76F8\u8FD8\u539F" : timedOut ? "\u65F6\u95F4\u7528\u5C3D" : "\u6C64\u6CA1\u559D\u5B8C",
      lines: [
        `\u6C64\u5E95\uFF1A${d.truth || "\uFF08\u672C\u9898\u6CA1\u6709\u6C64\u5E95\uFF09"}`,
        d.solvedBy ? `\u7B2C\u4E00\u4E2A\u5BA3\u5E03\u5E76\u8FD8\u539F\u771F\u76F8\u7684\u662F ${nameOf(room, d.solvedBy)}\u3002` : d.declaredBy ? `${nameOf(room, d.declaredBy)} \u4E3E\u624B\u590D\u8FF0\u8FC7\uFF0C\u4F46\u6CA1\u80FD\u5BF9\u4E0A\u5173\u952E\u7684\u4E00\u73AF\u3002` : "\u5168\u7A0B\u6CA1\u4EBA\u4E3E\u624B\u5BA3\u5E03\u8FD8\u539F\u3002",
        `\u5171\u63D0\u95EE ${realQuestionCount(d)} \u4E2A\uFF0C\u7528\u4E86 ${d.hintsUsed} \u4E2A\u63D0\u793A\uFF0C\u8DD1\u4E86 ${Math.max(1, Math.round(d.elapsedMs / 6e4))} \u5206\u949F\u3002`,
        askedList.length ? `\u6700\u4F1A\u63D0\u95EE\uFF1A${askedList.slice(0, 3).map(([id, n]) => `${nameOf(room, id)}\uFF08${n} \u95EE\uFF09`).join("\u3001")}\u3002` : "\u5927\u5BB6\u5168\u7A0B\u9760\u731C\uFF0C\u4E00\u4E2A\u95EE\u9898\u90FD\u6CA1\u95EE\u3002"
      ],
      winners,
      verdict: (d.solved ? "\u771F\u76F8\u88AB\u4E00\u53E5\u4E00\u53E5\u95EE\u51FA\u6765\u4E86\uFF0C\u8FD9\u4E00\u5C40\u662F\u63A8\u7406\u8D62\u7684\u3002" : "\u6CA1\u4EBA\u628A\u8FD9\u7897\u6C64\u559D\u5B8C\uFF0C\u60E9\u7F5A\u73AF\u8282\u7167\u5E38\u6267\u884C\u3002") + award + " " + judge("close")
    };
  }
};

// src/shared/engine/spy.ts
var DESC_MS = 4e4;
var VOTE_MS = 3e4;
var MAX_ROUND2 = 6;
function idHasWord(room, id) {
  const d = spy(room);
  const mine = d.words[id];
  return mine !== void 0 && mine !== d.common;
}
function insidersOf(room) {
  const d = spy(room);
  return room.players.filter((p) => p.alive && d.words[p.id] && d.words[p.id] !== d.common);
}
function civiliansOf(room) {
  const d = spy(room);
  return room.players.filter((p) => p.alive && d.words[p.id] === d.common);
}
function isJudge(room, id) {
  return room.judgeMode === "human" && room.refereeId === id;
}
function inGame(room) {
  return alive(room).filter((p) => !isJudge(room, p.id));
}
function seatedInGame(room) {
  return seated(room).filter((p) => !isJudge(room, p.id));
}
function startDescribe(room) {
  const d = spy(room);
  d.order = shuffle(inGame(room).map((p) => p.id));
  d.descriptions = {};
  d.votes = {};
  d.tally = {};
  const first = byId(room, d.order[0]);
  phase(room, "describe", { ms: DESC_MS, turn: 0 });
  ev(room, "judge", judge("round", { round: room.round }) + `\u5148\u4ECE ${first?.name ?? "1 \u53F7"} \u5F00\u59CB\u3002`);
}
function settleVotes(room, forcedOut) {
  const d = spy(room);
  const voters = inGame(room).map((p2) => p2.id);
  const tally = {};
  for (const v of voters) {
    const t = d.votes[v];
    if (t && byId(room, t)) tally[t] = (tally[t] ?? 0) + 1;
  }
  d.tally = tally;
  const entries = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const top = entries[0]?.[1] ?? 0;
  const tied = entries.filter(([, n]) => n === top).length > 1 && top > 0;
  let outId = forcedOut ?? null;
  if (!outId && !tied) outId = entries[0]?.[0] ?? null;
  d.lastOut = outId;
  phase(room, "reveal");
  if (!outId) {
    ev(room, "judge", top === 0 ? "\u6CA1\u4EBA\u6295\u7968\uFF0C\u8FD9\u8F6E\u7B97\u4F60\u4EEC\u96C6\u4F53\u6C89\u9ED8\u3002" : judge("safe"));
    return;
  }
  d.eliminated.push(outId);
  const p = byId(room, outId);
  if (p) {
    p.alive = false;
    p.outReason = `\u7B2C ${room.round} \u8F6E\u88AB\u6295\u51FA`;
    const wasInsider = idHasWord(room, outId);
    if (wasInsider) {
      for (const v of voters) if (d.votes[v] === outId) addScore(room, v, 2);
      ev(room, "judge", `${p.name} \u51FA\u5C40\uFF0C\u8BCD\u662F\u300C${d.words[outId]}\u300D\u2014\u2014\u6B63\u662F\u5367\u5E95\u3002\u731C\u5BF9\u7684\u4EBA\u5404 +2\u3002`);
    } else {
      addScore(room, outId, 1);
      ev(room, "judge", judge("out", { name: p.name, word: d.words[outId] }) + ` \u4ED6\u662F\u5E73\u6C11\uFF0C\u4F60\u4EEC\u81EA\u5DF1\u4EBA\u6253\u81EA\u5DF1\u4EBA\u3002`);
    }
  }
}
function checkEnd(room) {
  const ins = insidersOf(room).length;
  const civ = civiliansOf(room).length;
  if (ins === 0) {
    spy(room).result = "civilians";
    return true;
  }
  if (ins >= civ) {
    spy(room).result = "insider";
    return true;
  }
  if (room.round >= MAX_ROUND2) {
    spy(room).result = "insider";
    return true;
  }
  return false;
}
var spyEngine = {
  id: "spy",
  create(room) {
    const d = spy(room);
    const [common, insider] = pick(SPY_PAIRS);
    d.common = common;
    d.insider = insider;
    d.insiderCount = room.players.length >= 8 ? 2 : 1;
    d.round = 0;
    d.order = [];
    d.descriptions = {};
    d.votes = {};
    d.tally = {};
    d.eliminated = [];
    d.lastOut = null;
    d.words = {};
    d.result = null;
    phase(room, "lobby");
  },
  start(room) {
    const d = spy(room);
    const order = seatedInGame(room);
    d.insiderCount = Math.max(1, Math.min(d.insiderCount, order.length - 2));
    const insiderSeats = shuffle(order.map((p) => p.id)).slice(0, d.insiderCount);
    for (const p of order) {
      d.words[p.id] = insiderSeats.includes(p.id) ? d.insider : d.common;
    }
    room.round = 1;
    ev(room, "judge", `${d.insiderCount} \u4E2A\u5367\u5E95\u85CF\u5728 ${order.length} \u4E2A\u4EBA\u91CC\u3002${judge("open")}`);
    startDescribe(room);
  },
  act(room, actor, action, payload) {
    const d = spy(room);
    if (action === "describe") {
      if (room.phase !== "describe") return;
      const currentId3 = d.order[room.turn];
      if (actor.id !== currentId3 || d.descriptions[actor.id] !== void 0) return;
      const text = sanitize(payload?.text, 80);
      if (!text) return;
      d.descriptions[actor.id] = text;
      const word = d.words[actor.id];
      if (word && text.includes(word)) {
        ev(room, "judge", `${actor.name} \u7684\u63CF\u8FF0\u91CC\u76F4\u63A5\u51FA\u73B0\u4E86\u8BCD\uFF0C\u88C1\u5224\u5224\u5B9A\u65E0\u6548\uFF0C\u8BF7\u91CD\u65B0\u63CF\u8FF0\u3002`);
        delete d.descriptions[actor.id];
        return;
      }
      const nextTurn = room.turn + 1;
      const livingOrder = d.order.filter((id) => byId(room, id)?.alive);
      if (nextTurn >= livingOrder.length) {
        ev(room, "judge", "\u63CF\u8FF0\u5B8C\u6BD5\uFF0C\u5F00\u59CB\u6295\u7968\u3002\u6BCF\u4EBA\u6295\u4E00\u4E2A\u4F60\u89C9\u5F97\u6700\u4E0D\u50CF\u540C\u7C7B\u7684\u4EBA\u3002");
        phase(room, "vote", { ms: VOTE_MS });
      } else {
        room.turn = nextTurn;
        const nx = byId(room, d.order[nextTurn]);
        ev(room, "info", `\u8F6E\u5230 ${nx?.name ?? "?"}\u3002`);
      }
      return;
    }
    if (action === "vote") {
      if (room.phase !== "vote") return;
      if (!actor.alive) return;
      const target = String(payload?.target ?? "");
      if (!byId(room, target) || !byId(room, target).alive || target === actor.id) return;
      d.votes[actor.id] = target;
      const voters = inGame(room).map((p) => p.id);
      if (allSubmitted(room, voters, "votes", "spy")) {
        settleVotes(room, null);
        if (checkEnd(room)) phase(room, "over");
      }
      return;
    }
    if (action === "refereeOut") {
      if (room.judgeMode !== "human" || room.refereeId !== actor.id) return;
      if (room.phase !== "vote" && room.phase !== "reveal") return;
      if (room.phase === "vote") {
        settleVotes(room, String(payload?.target ?? "") || null);
        if (checkEnd(room)) phase(room, "over");
      }
      return;
    }
  },
  next(room, actor) {
    const d = spy(room);
    if (room.phase === "lobby") {
      this.start(room);
      return;
    }
    if (room.phase === "describe") {
      const livingOrder = d.order.filter((id) => byId(room, id)?.alive);
      if (room.turn < livingOrder.length - 1) {
        const stuck = byId(room, livingOrder[room.turn]);
        if (stuck && d.descriptions[stuck.id] === void 0) {
          d.descriptions[stuck.id] = "\uFF08\u8DF3\u8FC7\uFF09";
          ev(room, "judge", judge("hurry", { name: stuck.name }));
        }
        room.turn += 1;
        return;
      }
      ev(room, "judge", "\u63CF\u8FF0\u73AF\u8282\u7ED3\u675F\uFF0C\u6295\u7968\u3002");
      phase(room, "vote", { ms: VOTE_MS });
      return;
    }
    if (room.phase === "vote") {
      settleVotes(room, null);
      if (checkEnd(room)) phase(room, "over");
      return;
    }
    if (room.phase === "reveal") {
      if (checkEnd(room)) {
        phase(room, "over");
        return;
      }
      room.round += 1;
      startDescribe(room);
      return;
    }
  },
  tick(room, now) {
    if (room.phase !== "describe" && room.phase !== "vote") return;
    if (room.deadlineAt === null || now < room.deadlineAt) return;
    if (room.phase === "describe") {
      const d = spy(room);
      const livingOrder = d.order.filter((id) => byId(room, id)?.alive);
      const cur = byId(room, livingOrder[room.turn]);
      if (cur && d.descriptions[cur.id] === void 0) {
        d.descriptions[cur.id] = "\uFF08\u8D85\u65F6\uFF09";
        ev(room, "judge", judge("timeout", { name: cur.name }));
      }
      if (room.turn >= livingOrder.length - 1) {
        phase(room, "vote", { ms: VOTE_MS });
      } else {
        room.turn += 1;
        phase(room, "describe", { ms: DESC_MS, turn: room.turn });
      }
      return;
    }
    if (room.phase === "vote") {
      const d = spy(room);
      for (const p of alive(room)) {
        if (d.votes[p.id] === void 0) {
          const targets = alive(room).filter((x) => x.id !== p.id);
          if (targets.length) d.votes[p.id] = targets[randInt(0, targets.length - 1)].id;
        }
      }
      settleVotes(room, null);
      if (checkEnd(room)) phase(room, "over");
    }
  },
  publicData(room) {
    const d = spy(room);
    const show = room.phase === "reveal" || room.phase === "over";
    const livingOrder = d.order.filter((id) => byId(room, id)?.alive);
    return {
      spy: {
        common: show ? d.common : "",
        insider: show ? d.insider : "",
        insiderCount: d.insiderCount,
        round: d.round,
        order: d.order,
        livingOrder,
        descriptions: show || room.phase === "vote" ? d.descriptions : pickMasked(d),
        votes: show ? d.votes : {},
        tally: show ? d.tally : {},
        eliminated: d.eliminated,
        lastOut: show ? d.lastOut : null,
        result: d.result,
        aliveCount: alive(room).length
      }
    };
  },
  secretFor(room, me) {
    const d = spy(room);
    const word = d.words[me.id];
    const out = {};
    if (word) out.word = word;
    if (room.phase === "over") {
      out.common = d.common;
      out.insider = d.insider;
      out.wasInsider = !!word && word !== d.common;
    }
    if (!me.alive && d.eliminated.includes(me.id)) out.eliminated = true;
    return out;
  },
  refereeExtra(room) {
    const d = spy(room);
    return {
      answer: `${d.common} / ${d.insider}`,
      insiderSeats: room.players.filter((p) => d.words[p.id] && d.words[p.id] !== d.common).map((p) => p.name),
      pending: alive(room).filter((p) => d.votes[p.id] === void 0).map((p) => p.name),
      note: d.result ? "" : "\u53EF\u4EE5\u624B\u52A8\u5224\u5B9A\u67D0\u4EBA\u51FA\u5C40\uFF0C\u6216\u66FF\u5927\u5BB6\u63A8\u8FDB\u8F6E\u6B21\u3002"
    };
  },
  needs(room, me, view) {
    const base = {
      prompt: null,
      input: "none",
      inputHint: "",
      submitted: false,
      hostHint: "\u7B49\u5F85\u73A9\u5BB6\u52A0\u5165\u540E\u70B9\u300C\u5F00\u59CB\u8FD9\u5C40\u300D\u3002"
    };
    if (!me) {
      return { ...base, hostHint: hostHintFor4(room) };
    }
    if (room.phase === "lobby") {
      return { ...base, prompt: "\u770B\u6E05\u81EA\u5DF1\u7684\u8BCD\uFF0C\u522B\u88AB\u65C1\u8FB9\u7684\u4EBA\u7784\u5230", hostHint: hostHintFor4(room) };
    }
    if (!me.alive) {
      return {
        ...base,
        prompt: "\u4F60\u5DF2\u7ECF\u51FA\u5C40\u4E86\uFF0C\u8FD9\u8F6E\u5F53\u4E2A\u5B89\u9759\u7684\u89C2\u4F17",
        hostHint: hostHintFor4(room)
      };
    }
    const d = spy(room);
    if (isJudge(room, me.id)) {
      const pending = inGame(room).filter((p) => d.votes[p.id] === void 0);
      return {
        ...base,
        prompt: room.phase === "vote" ? pending.length ? `\u8FD8\u6709 ${pending.length} \u4E2A\u4EBA\u6CA1\u6295\u7968\uFF1A${pending.map((p) => p.name).join("\u3001")}` : "\u7968\u9F50\u4E86\uFF0C\u7B49\u5927\u5C4F\u516C\u5E03\u7968\u578B" : "\u4F60\u662F\u672C\u5C40\u88C1\u5224\uFF0C\u4E0D\u53D1\u8BCD\u3001\u4E0D\u6295\u7968\uFF0C\u53EA\u7528\u6267\u6CD5",
        hostHint: hostHintFor4(room)
      };
    }
    if (room.phase === "describe") {
      const currentId3 = d.order[room.turn];
      const mine = currentId3 === me.id;
      const done = d.descriptions[me.id] !== void 0;
      return {
        ...base,
        prompt: mine ? "\u8F6E\u5230\u4F60\u4E86\uFF0C\u8BF4\u4E00\u53E5\u63CF\u8FF0" : done ? "\u4F60\u5DF2\u7ECF\u8BF4\u8FC7\u4E86\uFF0C\u7B49\u5176\u4ED6\u4EBA" : "\u7B49\u7740\uFF0C\u522B\u5267\u900F",
        input: mine && !done ? "textarea" : "none",
        inputHint: `\u4F60\u7684\u8BCD\u662F\u300C${d.words[me.id] ?? ""}\u300D\uFF0C\u7528\u4E00\u53E5\u8BDD\u63CF\u8FF0\u5B83\uFF0C\u4E0D\u80FD\u51FA\u73B0\u8FD9\u4E2A\u8BCD\u672C\u8EAB`,
        submitted: done,
        hostHint: hostHintFor4(room)
      };
    }
    if (room.phase === "vote") {
      const done = d.votes[me.id] !== void 0;
      const targets = (view.players ?? []).filter((p) => p.alive && p.id !== me.id && !isJudge(room, p.id));
      return {
        ...base,
        prompt: done ? "\u5DF2\u6295\u7968\uFF0C\u7B49\u7968\u578B\u516C\u5E03" : "\u6295\u4E00\u4E2A\u4F60\u89C9\u5F97\u6700\u4E0D\u50CF\u540C\u7C7B\u7684\u4EBA",
        input: done ? "none" : "pick",
        options: targets.map((p) => ({ value: p.id, label: p.name })),
        valueKey: "target",
        inputHint: "\u4E0D\u80FD\u6295\u81EA\u5DF1",
        submitted: done,
        hostHint: hostHintFor4(room)
      };
    }
    if (room.phase === "reveal") {
      return { ...base, prompt: "\u5927\u5C4F\u770B\u7ED3\u679C", hostHint: hostHintFor4(room) };
    }
    return { ...base, prompt: "\u672C\u5C40\u5DF2\u7ED3\u675F", hostHint: hostHintFor4(room) };
  },
  finish(room) {
    const d = spy(room);
    const sorted = room.players.slice().sort((a, b) => b.score - a.score);
    const winners = sorted.slice(0, Math.max(1, sorted.filter((p) => p.score === sorted[0]?.score).length));
    const result = d.result === "insider" ? "\u5367\u5E95\u65B9\u83B7\u80DC" : "\u5E73\u6C11\u65B9\u83B7\u80DC";
    const survived = room.players.filter((p) => d.words[p.id] !== d.common && p.alive);
    return {
      title: `${result} \xB7 \u5386\u65F6 ${d.round} \u8F6E`,
      lines: [
        `\u5927\u4F17\u8BCD\u300C${d.common}\u300D\uFF0C\u5367\u5E95\u8BCD\u300C${d.insider}\u300D\u3002`,
        survived.length ? `\u5367\u5E95 ${survived.map((p) => p.name).join("\u3001")} \u6D3B\u5230\u4E86\u6700\u540E\u3002` : "\u5367\u5E95\u88AB\u5168\u90E8\u63EA\u51FA\u6765\u4E86\u3002",
        d.eliminated.length ? `\u51FA\u5C40\u987A\u5E8F\uFF1A${d.eliminated.map((id) => nameOf(room, id)).join(" \u2192 ")}` : "\u5C45\u7136\u6CA1\u6709\u4EBA\u88AB\u6DD8\u6C70\u8FC7\u3002"
      ],
      winners: winners.map((p) => ({ name: p.name, score: p.score })),
      verdict: (d.result === "insider" ? judge("winBad") : judge("winGood")) + " " + judge("close")
    };
  }
};
function pickMasked(d) {
  const out = {};
  for (const id of d.order) {
    if (d.descriptions[id] !== void 0) out[id] = "\u2022\u2022\u2022\u2022";
  }
  return out;
}
function hostHintFor4(room) {
  switch (room.phase) {
    case "lobby":
      return "\u4EBA\u5230\u9F50\u4E86\u5C31\u70B9\u5F00\u59CB\uFF0C\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u53D1\u8BCD\u3002";
    case "describe": {
      const d = spy(room);
      const cur = byId(room, d.order[room.turn]);
      return `\u73B0\u5728\u7B49 ${cur ? clip(cur.name, 12) : "?"} \u63CF\u8FF0\u3002\u5361\u4F4F\u4E86\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8DF3\u8FC7\u3002`;
    }
    case "vote":
      return "\u6295\u7968\u4E2D\u3002\u6240\u6709\u4EBA\u6295\u5B8C\u4F1A\u81EA\u52A8\u516C\u5E03\uFF0C\u4E5F\u53EF\u4EE5\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u5F3A\u5236\u7ED3\u7B97\u3002";
    case "reveal":
      return "\u770B\u5B8C\u7ED3\u679C\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8FDB\u5165\u65B0\u4E00\u8F6E\uFF0C\u6216\u8005\u7ED3\u675F\u672C\u5C40\u3002";
    case "over":
      return "\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u56DE\u5230\u7ED3\u7B97\u9875\u7EE7\u7EED\u505C\u7559\uFF0C\u6216\u5F00\u65B0\u5C40\u3002";
    default:
      return "";
  }
}

// src/shared/engine/story.ts
var WRITE_MS2 = 6e4;
var LINE_MAX = 100;
var DRAFT_MAX = 200;
var MAX_ROUND3 = 3;
var MISSING_TEXT = "\uFF08\u6CA1\u4EA4\uFF09";
var MISSING_NOTE = "\u8FD9\u4E00\u8F6E\u4ED6\u9690\u8EAB\u4E86";
var TURN_WORDS = [
  "\u5C45\u7136",
  "\u6CA1\u60F3\u5230",
  "\u7ED3\u679C",
  "\u7A81\u7136",
  "\u5176\u5B9E",
  "\u540E\u6765",
  "\u4ECE\u6B64",
  "\u539F\u6765",
  "\u4E8E\u662F",
  "\u504F\u504F",
  "\u8C01\u77E5\u9053"
];
function constraintRule(constraint) {
  const c = constraint || "";
  if (c.includes("\u4E0D\u80FD\u51FA\u73B0")) return null;
  if (c.includes("\u6570\u5B57")) {
    return { label: "\u53E5\u5B50\u91CC\u6709\u6570\u5B57", test: (t) => /\d|[一二三四五六七八九十百]/.test(t) };
  }
  if (c.includes("\u95EE\u53F7") || c.includes("\u95EE\u53E5")) {
    return { label: "\u53E5\u5B50\u6536\u5728\u95EE\u53F7\u4E0A", test: (t) => /[？?]/.test(t.trim()) };
  }
  if (c.includes("\u56E0\u4E3A")) {
    return { label: "\u5199\u6E05\u4E86\u539F\u56E0", test: (t) => t.includes("\u56E0\u4E3A") };
  }
  if (c.includes("\u52A8\u4F5C") || c.includes("\u52A8\u8BCD")) {
    return { label: "\u52A8\u8BCD\u6536\u5C3E", test: (t) => /[了着过][。！？!?,，]?$/.test(t.trim()) };
  }
  if (c.includes("\u611F\u5B98")) {
    return { label: "\u6709\u611F\u5B98\u7EC6\u8282", test: (t) => /(看|听|闻|摸|尝|瞧|盯|触|smell)/i.test(t) };
  }
  return null;
}
function scoreRound(room) {
  const d = story(room);
  const rule = constraintRule(d.constraint);
  const judged = [];
  d.parts.forEach((part, i) => {
    if (part.round !== d.round || part.note) return;
    const reasons = [];
    let score = 1;
    const prev = i === 0 ? d.opening : d.parts[i - 1]?.text || d.opening;
    if (overlap(prev, part.text) >= 2) {
      score += 1;
      reasons.push("\u63A5\u4F4F\u4E86\u4E0A\u4E00\u53E5\u7684\u7EBF\u7D22");
    }
    if (TURN_WORDS.some((w) => part.text.includes(w))) {
      score += 1;
      reasons.push("\u8F6C\u6298\u6F02\u4EAE");
    }
    if (rule) {
      if (rule.test(part.text)) {
        score += 1;
        reasons.push(`\u89C4\u5219\u5230\u4F4D\uFF1A${rule.label}`);
      } else {
        reasons.push("\u89C4\u5219\u6CA1\u6267\u884C");
      }
    }
    const dup = d.parts.some((o, j) => j !== i && !!o.text && o.text !== MISSING_TEXT && overlap(o.text, part.text) >= 10);
    if (dup) {
      score -= 1;
      reasons.push("\u548C\u5DF2\u6709\u7684\u53E5\u5B50\u592A\u50CF");
    }
    part.score = Math.max(0, Math.min(4, score));
    part.note = reasons.length ? reasons.join("\uFF1B") : "\u5E73\u94FA\u76F4\u53D9\uFF0C\u628A\u6545\u4E8B\u5F80\u524D\u63A8\u4E86\u4E00\u6B65";
    d.scores[part.by] = (d.scores[part.by] ?? 0) + part.score;
    judged.push(part);
  });
  if (!judged.length) {
    ev(room, "judge", "\u8FD9\u4E00\u8F6E\u6CA1\u6709\u53EF\u8BC4\u7684\u53E5\u5B50\uFF0C\u6545\u4E8B\u539F\u5730\u505C\u4E86\u4E00\u4E0B\u3002");
    return;
  }
  const top = Math.max(...judged.map((p) => p.score));
  const tied = judged.filter((p) => p.score === top);
  const chosen = tied[randInt(0, tied.length - 1)];
  d.best[d.round] = chosen.by;
  addScore(room, chosen.by, 2);
  ev(room, "judge", judge("praise", { name: chosen.byName }));
  ev(
    room,
    "judge",
    judge("award", { name: chosen.byName, title: "\u795E\u8F6C\u6298\u5956" }) + (tied.length > 1 ? `\u672C\u8F6E ${tied.length} \u4EBA\u540C\u4E3A ${top} \u5206\uFF0C\u5E76\u5217\uFF0C\u6211\u968F\u673A\u70B9\u4E86\u4E00\u4E2A\u3002` : "")
  );
}
function closeRound(room, forced) {
  const d = story(room);
  if (forced) {
    const missing = [];
    for (const p of seated(room)) {
      if (!d.parts.some((x) => x.by === p.id && x.round === d.round)) {
        d.parts.push({
          by: p.id,
          byName: p.name,
          text: MISSING_TEXT,
          round: d.round,
          score: 0,
          note: MISSING_NOTE
        });
        missing.push(p);
      }
    }
    if (missing.length === 1) {
      ev(room, "judge", `${judge("timeout", { name: missing[0].name })}\u8FD9\u4E00\u8F6E\u7ED9\u4ED6\u8BB0\u4E00\u53E5\u300C\u9690\u8EAB\u300D\u3002`);
    } else if (missing.length) {
      ev(
        room,
        "judge",
        `${clip(missing.map((x) => x.name).join("\u3001"), 48)} \u8FD9\u8F6E\u6CA1\u4EA4\uFF0C\u5404\u8BB0\u4E00\u53E5\u300C\u9690\u8EAB\u300D\uFF0C\u4E0B\u4E00\u8F6E\u522B\u518D\u8DD1\u4E86\u3002`
      );
    }
  }
  scoreRound(room);
  phase(room, "read");
  ev(room, "info", `\u7B2C ${d.round} \u8F6E\u5199\u5B8C\uFF0C\u5927\u5C4F\u6309\u987A\u5E8F\u628A\u8FD9\u4E00\u6BB5\u5FF5\u51FA\u6765\u3002`);
}
function nextRound(room) {
  const d = story(room);
  d.round += 1;
  room.round = d.round;
  phase(room, "write", { ms: WRITE_MS2, round: d.round });
  const tail = d.parts.length ? d.parts[d.parts.length - 1].text : d.opening;
  ev(room, "judge", `${judge("round", { round: d.round })}\u63A5\u5728\u300C${clip(tail, 40)}\u300D\u540E\u9762\uFF0C\u53EA\u5199\u4E00\u53E5\u3002`);
}
function endStory(room) {
  const d = story(room);
  ev(room, "judge", `${d.maxRound} \u8F6E\u5199\u5B8C\u4E86\u3002\u88C1\u5224\u628A\u6574\u4E2A\u6545\u4E8B\u4ECE\u5934\u5FF5\u4E00\u904D\uFF0C\u7136\u540E\u53D1\u5956\u3002`);
  phase(room, "over");
}
var submittedThisRound = (room, id) => {
  const d = story(room);
  return d.parts.some((p) => p.by === id && p.round === d.round);
};
var storyEngine = {
  id: "story",
  create(room) {
    const d = story(room);
    d.opening = STORY_OPENINGS.length ? pick(STORY_OPENINGS) : "\u90A3\u5929\u65E9\u4E0A\uFF0C\u95F9\u949F\u6BD4\u5E73\u65F6\u65E9\u54CD\u4E86\u5341\u5206\u949F\u3002";
    d.constraint = STORY_CONSTRAINTS.length ? pick(STORY_CONSTRAINTS) : "\u672C\u53E5\u5FC5\u987B\u5305\u542B\u4E00\u4E2A\u6570\u5B57\uFF0C\u4F46\u4E0D\u80FD\u662F\u5E74\u4EFD\u3002";
    d.round = 0;
    d.maxRound = MAX_ROUND3;
    d.parts = [];
    d.drafts = {};
    d.scores = {};
    d.best = {};
    for (const p of seated(room)) d.scores[p.id] = 0;
    phase(room, "lobby");
  },
  start(room) {
    const d = story(room);
    const seats = seated(room);
    d.round = 1;
    d.maxRound = MAX_ROUND3;
    d.parts = [];
    d.drafts = {};
    d.best = {};
    d.scores = {};
    for (const p of seats) d.scores[p.id] = 0;
    room.round = 1;
    phase(room, "write", { ms: WRITE_MS2, round: 1 });
    ev(room, "judge", judge("open"));
    ev(room, "info", `\u5F00\u573A\u7B2C\u4E00\u53E5\uFF1A${d.opening}`);
    ev(room, "info", `\u9690\u5F62\u89C4\u5219\uFF1A${d.constraint}\uFF08\u53EA\u6709\u88C1\u5224\u4F1A\u9010\u53E5\u68C0\u67E5\u8FD9\u6761\uFF09`);
    ev(room, "info", `${seats.length} \u4E2A\u4EBA\u3001\u6BCF\u4EBA\u4E00\u53E5\u3001\u5171 ${d.maxRound} \u8F6E\u3002\u8FD9\u4E00\u8F6E\u5148\u5199\u7B2C 2 \u53E5\u3002`);
  },
  act(room, actor, action, payload) {
    const d = story(room);
    if (action === "draft") {
      if (room.phase !== "write") return;
      d.drafts[actor.id] = sanitize(payload?.text, DRAFT_MAX);
      return;
    }
    if (action === "line") {
      if (room.phase !== "write") return;
      if (submittedThisRound(room, actor.id)) return;
      const text = sanitize(payload?.text, LINE_MAX);
      if (!text) return;
      d.parts.push({
        by: actor.id,
        byName: actor.name,
        text,
        round: d.round,
        score: 0,
        note: ""
      });
      delete d.drafts[actor.id];
      ev(room, "info", `${actor.name} \u4EA4\u4E86\u4E00\u53E5\uFF08${d.parts.filter((p) => p.round === d.round).length}/${seated(room).length}\uFF09\u3002`);
      const left = seated(room).filter((p) => !submittedThisRound(room, p.id));
      if (!left.length) closeRound(room, false);
      return;
    }
  },
  next(room, actor) {
    const d = story(room);
    if (room.phase === "lobby") {
      this.start(room);
      return;
    }
    if (room.phase === "write") {
      closeRound(room, true);
      return;
    }
    if (room.phase === "read") {
      if (d.round < d.maxRound) nextRound(room);
      else endStory(room);
      return;
    }
  },
  tick(room, now) {
    if (room.phase !== "write") return;
    if (room.deadlineAt === null || now < room.deadlineAt) return;
    closeRound(room, true);
  },
  publicData(room) {
    const d = story(room);
    const started = room.phase !== "lobby";
    const open = room.phase === "read" || room.phase === "over";
    const seats = seated(room);
    return {
      story: {
        opening: started ? d.opening : "",
        constraint: started ? d.constraint : "",
        round: d.round,
        maxRound: d.maxRound,
        // 写阶段只能看到往轮的句子，本轮内容要等朗读才见光
        parts: open ? d.parts : d.parts.filter((p) => p.round < d.round),
        thisRound: open ? d.parts.filter((p) => p.round === d.round).map((p) => ({ id: p.by, name: p.byName })) : [],
        done: seats.filter((p) => submittedThisRound(room, p.id)).map((p) => ({ id: p.id, name: p.name })),
        pending: seats.filter((p) => !submittedThisRound(room, p.id)).map((p) => p.name),
        tail: started ? clip(d.parts.length ? d.parts[d.parts.length - 1].text : d.opening, 60) : "",
        scores: open ? d.scores : {},
        best: open ? d.best : {}
      }
    };
  },
  secretFor(room, me) {
    const d = story(room);
    return {
      draft: d.drafts[me.id] ?? "",
      mine: d.parts.filter((p) => p.by === me.id).map((p) => ({ round: p.round, text: p.text, score: p.score, note: p.note })),
      roundScore: d.scores[me.id] ?? 0
    };
  },
  refereeExtra(room) {
    const d = story(room);
    const thisRound = d.parts.filter((p) => p.round === d.round);
    const rule = constraintRule(d.constraint);
    return {
      round: d.round,
      maxRound: d.maxRound,
      constraint: d.constraint,
      machineChecked: rule ? rule.label : "\u8FD9\u6761\u89C4\u5219\u6CA1\u6CD5\u673A\u68C0\uFF0C\u672C\u8F6E\u4E0D\u53C2\u4E0E\u52A0\u5206\uFF0C\u53EA\u6309\u8FDE\u8D2F\u5EA6\u548C\u8F6C\u6298\u6253\u5206",
      lines: thisRound.map((p) => ({
        name: p.byName,
        text: p.text,
        score: p.score,
        note: p.note
      })),
      pending: seated(room).filter((p) => !submittedThisRound(room, p.id)).map((p) => p.name),
      best: d.best[d.round] ? nameOf(room, d.best[d.round]) : "",
      note: rule ? `\u88C1\u5224\u53EA\u6309\u5199\u6B7B\u7684\u89C4\u5219\u6253\u5206\uFF1A\u57FA\u7840 1 \u5206\uFF0C\u63A5\u4E0A\u4E0A\u4E00\u53E5 +1\uFF0C\u6709\u8F6C\u6298 +1\uFF0C\u300C${rule.label}\u300D+1\uFF0C\u649E\u8F66 -1\uFF0C\u6700\u9AD8 4 \u5206\u3002` : "\u88C1\u5224\u53EA\u6309\u5199\u6B7B\u7684\u89C4\u5219\u6253\u5206\uFF1A\u57FA\u7840 1 \u5206\uFF0C\u63A5\u4E0A\u4E0A\u4E00\u53E5 +1\uFF0C\u6709\u8F6C\u6298 +1\uFF0C\u649E\u8F66 -1\uFF0C\u6700\u9AD8 4 \u5206\u3002"
    };
  },
  needs(room, me, view) {
    const d = story(room);
    const base = {
      prompt: null,
      input: "none",
      inputHint: "",
      submitted: false,
      hostHint: "\u7B49\u5F85\u73A9\u5BB6\u52A0\u5165\u540E\u70B9\u300C\u5F00\u59CB\u8FD9\u5C40\u300D\u3002"
    };
    if (!me) {
      return { ...base, hostHint: hostHintFor5(room) };
    }
    if (room.phase === "lobby") {
      return {
        ...base,
        prompt: "\u5F00\u5C40\u540E\u5927\u5C4F\u7ED9\u4E00\u53E5\u5F00\u5934\u548C\u4E00\u6761\u9690\u5F62\u89C4\u5219",
        hostHint: hostHintFor5(room)
      };
    }
    if (room.phase === "write") {
      const done = submittedThisRound(room, me.id);
      const tail = d.parts.length ? d.parts[d.parts.length - 1].text : d.opening;
      return {
        ...base,
        prompt: done ? "\u5DF2\u4EA4\uFF0C\u7B49\u5176\u4ED6\u4EBA\u5199\u5B8C\u8FD9\u4E00\u8F6E" : `\u7B2C ${d.round}/${d.maxRound} \u8F6E\uFF1A\u5199\u4E00\u53E5\u8BDD\u63A5\u4E0A\u53BB`,
        input: done ? "none" : "textarea",
        inputHint: `\u9690\u5F62\u89C4\u5219\uFF1A${d.constraint}\u53EA\u5199\u4E00\u53E5\uFF0C\u63A5\u5728\u540E\u9762\u7684\u60C5\u8282\u4E0A\u3002\u5F53\u524D\u6700\u540E\u4E00\u53E5\uFF1A\u300C${clip(tail, 40)}\u300D`,
        submitted: done,
        hostHint: hostHintFor5(room)
      };
    }
    if (room.phase === "read") {
      return {
        ...base,
        prompt: "\u5927\u5C4F\u6717\u8BFB\uFF0C\u542C\u522B\u4EBA\u600E\u4E48\u5706",
        inputHint: "\u4F60\u672C\u8F6E\u7684\u5F97\u5206\u548C\u77ED\u8BC4\u5C31\u5728\u5927\u5C4F\u4E0A\u3002",
        hostHint: hostHintFor5(room)
      };
    }
    return { ...base, prompt: "\u672C\u5C40\u5DF2\u7ED3\u675F", hostHint: hostHintFor5(room) };
  },
  finish(room) {
    const d = story(room);
    const ranked = rankByScore(room.players);
    const top = ranked[0];
    const bottom = ranked[ranked.length - 1];
    const winners = ranked.filter((r) => r.rank === 0).map((r) => ({ name: r.player.name, score: r.player.score }));
    const played = d.parts.filter((p) => p.text !== MISSING_TEXT);
    const hidden = d.parts.filter((p) => p.text === MISSING_TEXT);
    const full = played.filter((p) => p.score >= 4);
    const bestLine = Object.entries(d.best).map(([round, id]) => {
      const part = d.parts.find((p) => p.round === Number(round) && p.by === id && p.text !== MISSING_TEXT);
      return `\u7B2C ${round} \u8F6E ${nameOf(room, id)}\uFF08${part ? part.score : 0} \u5206\uFF09`;
    }).join("\uFF1B");
    const maxScore = played.length ? Math.max(...played.map((p) => p.score)) : 0;
    const lines = [];
    lines.push(
      `\u5F00\u5934\u300C${clip(d.opening, 26)}\u300D\u540E\u9762\u63A5\u4E86 ${played.length} \u53E5\uFF0C\u9690\u5F62\u89C4\u5219\u662F\u300C${clip(d.constraint, 22)}\u300D`
    );
    lines.push(bestLine ? `\u795E\u8F6C\u6298\u5956\u5F52\u5C5E \u2014\u2014 ${bestLine}\u3002` : "\u4E09\u8F6E\u90FD\u6CA1\u8BC4\u51FA\u795E\u8F6C\u6298\uFF0C\u5927\u5BB6\u5199\u5F97\u592A\u4E00\u81F4\u4E86\u3002");
    lines.push(
      full.length ? `\u62FF\u6EE1 4 \u5206\u7684\u6709 ${clip([...new Set(full.map((p) => p.byName))].join("\u3001"), 48)}\u3002` : `\u5168\u573A\u5355\u53E5\u6700\u9AD8\u53EA\u6709 ${maxScore} \u5206\uFF0C\u88C1\u5224\u89C9\u5F97\u4F60\u4EEC\u8FD8\u80FD\u518D\u91CE\u4E00\u70B9\u3002`
    );
    lines.push(
      hidden.length ? `${clip([...new Set(hidden.map((p) => p.byName))].join("\u3001"), 48)} \u4E2D\u9014\u9690\u8EAB\u8FC7 ${hidden.length} \u6B21\u3002` : "\u6BCF\u4E00\u8F6E\u6240\u6709\u4EBA\u90FD\u4EA4\u4E0A\u4E86\uFF0C\u8FD9\u5F88\u96BE\u5F97\u3002"
    );
    if (top && bottom && top.player.score !== bottom.player.score) {
      lines.push(`\u603B\u5206\u6700\u9AD8 ${top.player.name}\uFF08${top.player.score} \u5206\uFF09\uFF0C\u6700\u4F4E ${bottom.player.name}\uFF08${bottom.player.score} \u5206\uFF09\u3002`);
    }
    return {
      title: `\u6545\u4E8B\u63A5\u9F99 \xB7 ${d.maxRound} \u8F6E ${played.length} \u53E5`,
      lines,
      winners,
      verdict: (top ? judge("award", { name: top.player.name, title: "\u6700\u5F3A\u5706\u573A\u5956" }) : judge("tie")) + " " + judge("close")
    };
  }
};
function hostHintFor5(room) {
  const d = story(room);
  switch (room.phase) {
    case "lobby":
      return "\u4EBA\u5230\u9F50\u4E86\u5C31\u70B9\u5F00\u59CB\uFF0C\u7CFB\u7EDF\u4F1A\u62BD\u5F00\u5934\u548C\u9690\u5F62\u89C4\u5219\u3002";
    case "write": {
      const left = seated(room).filter((p) => !submittedThisRound(room, p.id)).map((p) => p.name);
      return left.length ? `\u8FD8\u5DEE ${left.length} \u4E2A\u4EBA\uFF1A${clip(left.join("\u3001"), 40)}\u3002\u7B49\u4E0D\u53CA\u5C31\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u5F3A\u5236\u7ED3\u7B97\u3002` : "\u90FD\u4EA4\u9F50\u4E86\uFF0C\u9A6C\u4E0A\u8FDB\u5165\u6717\u8BFB\u3002";
    }
    case "read":
      return "\u5FF5\u5B8C\u8FD9\u4E00\u6BB5\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8FDB\u4E0B\u4E00\u8F6E\uFF0C\u6700\u540E\u4E00\u8F6E\u4E4B\u540E\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u7ED3\u7B97\u3002";
    case "over":
      return "\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u56DE\u5230\u7ED3\u7B97\u9875\u7EE7\u7EED\u505C\u7559\uFF0C\u6216\u5F00\u65B0\u5C40\u3002";
    default:
      return "";
  }
}

// src/shared/engine/twos.ts
var WRITE_MS3 = 9e4;
var VOTE_MS2 = 9e4;
var STATEMENT_MAX = 60;
var LABELS = ["\u7B2C\u4E00\u6761", "\u7B2C\u4E8C\u6761", "\u7B2C\u4E09\u6761"];
function cardOf(room, id) {
  if (!id) return null;
  return twos(room).cards[id] ?? null;
}
var writersOf = (room) => seated(room).filter((p) => !!twos(room).cards[p.id]);
var votersOf = (room, authorId) => seated(room).filter((p) => p.id !== authorId);
var votesOf = (room, authorId) => authorId ? twos(room).votes[authorId] ?? {} : {};
function tallyOf(card, votes) {
  const tally = [0, 0, 0];
  if (!card) return tally;
  for (const n of Object.values(votes)) {
    if (n === 0 || n === 1 || n === 2) tally[n] += 1;
  }
  return tally;
}
function skipEmpty(room, from) {
  const d = twos(room);
  for (let i = Math.max(0, from); i < d.order.length; i++) {
    const id = d.order[i];
    if (d.cards[id]) {
      d.cursor = i;
      return id;
    }
  }
  d.cursor = d.order.length;
  return null;
}
function enterShow(room, from, prelude) {
  const d = twos(room);
  const id = skipEmpty(room, from);
  if (!id) {
    ev(room, "judge", "\u6CA1\u6709\u53EF\u516C\u5F00\u7684\u4E09\u6761\u4E86\uFF0C\u8FD9\u5C40\u5C31\u5730\u6536\u644A\u3002");
    phase(room, "over");
    return;
  }
  room.round = d.cursor + 1;
  if (!d.votes[id]) d.votes[id] = {};
  phase(room, "show", { ms: VOTE_MS2 });
  if (prelude) ev(room, "info", prelude);
  ev(room, "info", `\u73B0\u5728\u516C\u5F00 ${nameOf(room, id)} \u7684\u4E09\u6761\uFF0C\u5176\u4ED6\u4EBA\u731C\u54EA\u4E00\u6761\u662F\u7F16\u7684\u3002`);
}
function openShow(room) {
  const d = twos(room);
  d.cursor = 0;
  const names = d.order.map((id) => nameOf(room, id)).join(" \u2192 ");
  enterShow(room, 0, `\u4E09\u6761\u6536\u9F50\u3002\u53D1\u8A00\u987A\u5E8F\uFF1A${names}\u3002`);
}
function forceFromWrite2(room) {
  const d = twos(room);
  const seats = seated(room);
  const missing = seats.filter((p) => !d.cards[p.id]);
  if (missing.length) {
    ev(room, "judge", `${clip(missing.map((p) => p.name).join("\u3001"), 60)} \u6CA1\u4EA4\u4E09\u6761\uFF0C\u8DF3\u8FC7\u4ED6\u4EEC\uFF0C\u5927\u5C4F\u4E0D\u5FF5\u6CA1\u5199\u7684\u4EBA\u3002`);
  }
  if (missing.length === seats.length) {
    ev(room, "judge", "\u4E00\u4E2A\u4EBA\u90FD\u6CA1\u5199\uFF0C\u90A3\u5C31\u4E0D\u731C\u4E86\uFF0C\u672C\u5C40\u7ED3\u675F\u3002");
    phase(room, "over");
    return;
  }
  d.waiting = writersOf(room).length;
  d.cursor = 0;
  enterShow(room, 0, "");
}
function settleAuthor(room) {
  const d = twos(room);
  const author = d.order[d.cursor];
  const card = cardOf(room, author);
  if (!author || !card) return;
  const votes = votesOf(room, author);
  const picked = Object.keys(votes).filter((id) => !!byId(room, id));
  const correctIds = picked.filter((id) => votes[id] === card.lieIndex);
  const fooled = picked.length - correctIds.length;
  const abstain = votersOf(room, author).length - picked.length;
  d.fooled[author] = fooled;
  d.revealed[author] = true;
  for (const id of correctIds) addScore(room, id, 2);
  addScore(room, author, fooled === 0 ? 5 : fooled);
  ev(
    room,
    "judge",
    `${nameOf(room, author)} \u7684\u5047\u8BDD\u662F${LABELS[card.lieIndex]}\u300C${clip(card.statements[card.lieIndex] ?? "", 40)}\u300D\uFF0C\u5171 ${fooled} \u4EBA\u4E0A\u5F53${abstain > 0 ? `\uFF0C${abstain} \u4EBA\u6CA1\u6765\u5F97\u53CA\u6295` : ""}\u3002`
  );
  const hitNames = correctIds.map((id) => nameOf(room, id)).join("\u3001");
  ev(
    room,
    "score",
    hitNames ? `\u731C\u4E2D\u7684 ${clip(hitNames, 48)} \u5404 +2\uFF1B${nameOf(room, author)} ${fooled === 0 ? "\u9A97\u8FC7\u5168\u573A +5" : `\u9A97\u5230 ${fooled} \u4EBA +${fooled}`}\u3002` : `\u6CA1\u4EBA\u731C\u4E2D\uFF0C${nameOf(room, author)} \u9A97\u8FC7\u5168\u573A +5\u3002`
  );
  phase(room, "reveal");
}
function readerStats(room) {
  const d = twos(room);
  const out = {};
  for (const author of d.order) {
    const card = d.cards[author];
    if (!card || !d.revealed[author]) continue;
    for (const [voter, index] of Object.entries(d.votes[author] ?? {})) {
      if (index === card.lieIndex) out[voter] = (out[voter] ?? 0) + 1;
    }
  }
  return out;
}
function angleHint(room) {
  const pool = TWOS_ANGLES;
  if (!pool.length) return "\u5199\u4E09\u6761\uFF0C\u6311\u4E00\u6761\u7F16\uFF1A\u7F16\u7684\u90A3\u6761\u8981\u50CF\u771F\u7684\uFF0C\u771F\u7684\u90A3\u6761\u8981\u50CF\u7F16\u7684\u3002";
  const base = Math.max(0, room.round - 1) * 3 % pool.length;
  const idx = [base, (base + 7) % pool.length, (base + 13) % pool.length];
  return `\u53EF\u4EE5\u8BD5\u8BD5\uFF1A${idx.map((i) => pool[i]).join(" / ")}\u3002`;
}
var twosEngine = {
  id: "twos",
  create(room) {
    const d = twos(room);
    d.cards = {};
    d.order = [];
    d.cursor = 0;
    d.votes = {};
    d.revealed = {};
    d.fooled = {};
    d.waiting = 0;
    phase(room, "lobby");
  },
  start(room) {
    const d = twos(room);
    const seats = seated(room);
    d.order = shuffle(seats.map((p) => p.id));
    d.cursor = 0;
    d.cards = {};
    d.votes = {};
    d.revealed = {};
    d.fooled = {};
    d.waiting = 0;
    for (const p of seats) d.cards[p.id] = null;
    room.round = 1;
    phase(room, "write", { ms: WRITE_MS3 });
    ev(room, "judge", `${judge("open")} \u6BCF\u4EBA\u4E09\u4EF6\u5173\u4E8E\u81EA\u5DF1\u7684\u4E8B\uFF0C\u5176\u4E2D\u4E00\u4EF6\u662F\u7F16\u7684\u3002`);
    ev(room, "info", `${seats.length} \u4E2A\u4EBA\u5168\u90E8\u4EA4\u9F50\u5C31\u81EA\u52A8\u5F00\u59CB\u4E92\u731C\u3002`);
  },
  act(room, actor, action, payload) {
    const d = twos(room);
    if (action === "write") {
      if (room.phase !== "write") return;
      if (d.cards[actor.id]) return;
      const raw = Array.isArray(payload?.statements) ? payload.statements : [];
      if (raw.length !== 3) return;
      const statements = raw.map((s) => sanitize(s, STATEMENT_MAX));
      if (statements.some((s) => !s)) return;
      const lie = Number(payload?.lieIndex);
      if (lie !== 0 && lie !== 1 && lie !== 2) return;
      d.cards[actor.id] = { statements, lieIndex: lie };
      d.waiting = writersOf(room).length;
      ev(room, "info", `${actor.name} \u4EA4\u4E86\u4E09\u6761\uFF08${d.waiting}/${seated(room).length}\uFF09\u3002`);
      if (writersOf(room).length === seated(room).length) openShow(room);
      return;
    }
    if (action === "vote") {
      if (room.phase !== "show") return;
      const author = d.order[d.cursor];
      if (!author || author === actor.id) return;
      if (!d.cards[author]) return;
      const index = Number(payload?.index);
      if (index !== 0 && index !== 1 && index !== 2) return;
      if (!d.votes[author]) d.votes[author] = {};
      if (d.votes[author][actor.id] !== void 0) return;
      d.votes[author][actor.id] = index;
      const left = votersOf(room, author).filter((p) => d.votes[author][p.id] === void 0);
      if (!left.length) settleAuthor(room);
      return;
    }
  },
  next(room, actor) {
    const d = twos(room);
    if (room.phase === "lobby") {
      this.start(room);
      return;
    }
    if (room.phase === "write") {
      forceFromWrite2(room);
      return;
    }
    if (room.phase === "show") {
      const author = d.order[d.cursor];
      const left = votersOf(room, author).filter((p) => votesOf(room, author)[p.id] === void 0);
      if (left.length) ev(room, "info", `\u8FD8\u6709 ${left.length} \u4E2A\u4EBA\u6CA1\u6295\uFF0C\u6309\u5DF2\u6536\u5230\u7684\u7968\u7ED3\u7B97\u3002`);
      settleAuthor(room);
      return;
    }
    if (room.phase === "reveal") {
      enterShow(room, d.cursor + 1, "");
      return;
    }
  },
  tick(room, now) {
    if (room.deadlineAt === null || now < room.deadlineAt) return;
    if (room.phase === "write") {
      forceFromWrite2(room);
      return;
    }
    if (room.phase === "show") {
      const d = twos(room);
      const author = d.order[d.cursor];
      const left = votersOf(room, author).filter((p) => votesOf(room, author)[p.id] === void 0);
      if (left.length) {
        ev(room, "judge", `${clip(left.map((x) => x.name).join("\u3001"), 48)} \u6295\u7968\u8D85\u65F6\uFF0C\u8FD9\u8F6E\u7B97\u5F03\u6743\u3002`);
      }
      settleAuthor(room);
    }
  },
  publicData(room) {
    const d = twos(room);
    const author = d.order[d.cursor] ?? null;
    const card = cardOf(room, author);
    const votes = votesOf(room, author);
    const isShow = room.phase === "show";
    const isReveal = room.phase === "reveal" || room.phase === "over";
    const showText = isShow || isReveal;
    const seats = seated(room);
    return {
      twos: {
        order: showText ? d.order : [],
        cursor: d.cursor,
        authorId: showText ? author : null,
        authorName: showText && author ? nameOf(room, author) : "",
        statements: showText && card ? card.statements : null,
        lieIndex: isReveal && card ? card.lieIndex : null,
        tally: isReveal && card ? tallyOf(card, votes) : null,
        votedCount: Object.keys(votes).length,
        votedNames: isReveal ? Object.keys(votes).map((id) => nameOf(room, id)) : [],
        written: seats.filter((p) => !!d.cards[p.id]).map((p) => ({ id: p.id, name: p.name })),
        skipped: showText ? seats.filter((p) => !d.cards[p.id]).map((p) => p.name) : [],
        waiting: d.waiting,
        fooled: isReveal ? d.fooled : {},
        revealed: isReveal ? d.revealed : {},
        cards: room.phase === "over" ? d.cards : null
      }
    };
  },
  secretFor(room, me) {
    const d = twos(room);
    const author = d.order[d.cursor] ?? null;
    const out = { card: d.cards[me.id] ?? null };
    if (author && author !== me.id) {
      const mine = votesOf(room, author)[me.id];
      out.myVote = mine === void 0 ? null : mine;
      out.myVoteLabel = mine === void 0 ? "" : LABELS[mine] ?? "";
    }
    if (room.phase === "over") {
      out.fooled = d.fooled[me.id] ?? null;
      out.guessedRight = readerStats(room)[me.id] ?? 0;
    }
    return out;
  },
  refereeExtra(room) {
    const d = twos(room);
    const author = d.order[d.cursor] ?? null;
    const card = cardOf(room, author);
    const votes = votesOf(room, author);
    const voters = votersOf(room, author);
    return {
      author: author ? nameOf(room, author) : "",
      lieIndex: card ? card.lieIndex : null,
      lieText: card ? card.statements[card.lieIndex] ?? "" : "",
      picks: voters.map((p) => ({
        name: p.name,
        pick: votes[p.id] === void 0 ? "\u8FD8\u6CA1\u6295" : LABELS[votes[p.id]] ?? "?",
        right: card ? votes[p.id] === card.lieIndex : false
      })),
      pending: voters.filter((p) => votes[p.id] === void 0).map((p) => p.name),
      note: card ? "\u7B54\u6848\u53EA\u5728\u4F60\u8FD9\u4E00\u5C4F\uFF0C\u522B\u5FF5\u51FA\u58F0\u3002\u7968\u6536\u9F50\u4F1A\u81EA\u52A8\u63ED\u6653\uFF0C\u5361\u4F4F\u5C31\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u63D0\u524D\u7ED3\u7B97\u3002" : "\u8FD9\u4E00\u4F4D\u6CA1\u5199\u4E09\u6761\uFF0C\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8DF3\u5230\u4E0B\u4E00\u4E2A\u4EBA\u3002"
    };
  },
  needs(room, me, view) {
    const d = twos(room);
    const base = {
      prompt: null,
      input: "none",
      inputHint: "",
      submitted: false,
      hostHint: "\u7B49\u5F85\u73A9\u5BB6\u52A0\u5165\u540E\u70B9\u300C\u5F00\u59CB\u8FD9\u5C40\u300D\u3002"
    };
    if (!me) {
      return { ...base, hostHint: hostHintFor6(room) };
    }
    if (room.phase === "lobby") {
      return {
        ...base,
        prompt: "\u63D0\u524D\u60F3\u597D\u4E09\u4EF6\u5173\u4E8E\u4F60\u7684\u4E8B\uFF0C\u5176\u4E2D\u4E00\u4EF6\u662F\u7F16\u7684",
        hostHint: hostHintFor6(room)
      };
    }
    if (room.phase === "write") {
      const done = !!d.cards[me.id];
      return {
        ...base,
        prompt: done ? "\u5DF2\u63D0\u4EA4\uFF0C\u7B49\u5176\u4ED6\u4EBA\u5199\u5B8C" : "\u5199\u4E0B\u4F60\u7684\u4E09\u6761\uFF0C\u5176\u4E2D\u4E00\u6761\u662F\u5047\u7684",
        input: done ? "none" : "three",
        inputHint: done ? "\u7B49\u5176\u4ED6\u4EBA\u4EA4\u9F50\u5C31\u5F00\u573A\u3002" : angleHint(room),
        submitted: done,
        hostHint: hostHintFor6(room)
      };
    }
    if (room.phase === "show") {
      const author = d.order[d.cursor] ?? null;
      if (author === me.id) {
        return {
          ...base,
          prompt: "\u8FD9\u4E09\u6761\u662F\u4F60\u7684\uFF0C\u5FF5\u7684\u65F6\u5019\u522B\u7B11\u573A",
          inputHint: "\u672C\u4EBA\u4E0D\u53C2\u4E0E\u81EA\u5DF1\u7684\u6295\u7968\uFF0C\u7B49\u7740\u770B\u8C01\u4E0A\u5F53\u3002",
          submitted: true,
          hostHint: hostHintFor6(room)
        };
      }
      const mine = votesOf(room, author)[me.id];
      const voted = mine !== void 0;
      return {
        ...base,
        prompt: voted ? "\u5DF2\u6295\u7968\uFF0C\u7B49\u5927\u5C4F\u63ED\u6653" : `\u731C ${nameOf(room, author)} \u7684\u54EA\u4E00\u6761\u662F\u7F16\u7684`,
        input: voted ? "none" : "pick",
        options: LABELS.map((label, value) => ({ value, label })),
        valueKey: "index",
        inputHint: voted ? "\u63ED\u6653\u7684\u65F6\u5019\u89C1\u5206\u6653\u3002" : "\u731C\u4E2D +2\uFF0C\u88AB\u4ED6\u9A97\u8FC7\u53BB\u7684\u4EBA\u66FF\u4ED6\u6570\u94B1\u3002",
        submitted: voted,
        hostHint: hostHintFor6(room)
      };
    }
    if (room.phase === "reveal") {
      return {
        ...base,
        prompt: "\u5927\u5C4F\u770B\u63ED\u6653\uFF1A\u5047\u7684\u90A3\u6761\u662F\u54EA\u6761\u3001\u51E0\u4E2A\u4EBA\u4E0A\u5F53",
        hostHint: hostHintFor6(room)
      };
    }
    return { ...base, prompt: "\u672C\u5C40\u5DF2\u7ED3\u675F", hostHint: hostHintFor6(room) };
  },
  finish(room) {
    const d = twos(room);
    const ranked = rankByScore(room.players);
    const top = ranked[0];
    const bottom = ranked[ranked.length - 1];
    const winners = ranked.filter((r) => r.rank === 0).map((r) => ({ name: r.player.name, score: r.player.score }));
    const revealedIds = d.order.filter((id) => d.revealed[id] && d.cards[id]);
    const actorBest = revealedIds.map((id) => ({ id, fooled: d.fooled[id] ?? 0 })).sort((a, b) => b.fooled - a.fooled)[0];
    const readerBest = Object.entries(readerStats(room)).sort((a, b) => b[1] - a[1])[0];
    const totalVotes = d.order.reduce((n, id) => n + Object.keys(d.votes[id] ?? {}).length, 0);
    const skipped = seated(room).filter((p) => !d.cards[p.id]).map((p) => p.name);
    const lines = [];
    lines.push(`\u63ED\u4E86 ${revealedIds.length} \u4E2A\u4EBA\u7684\u4E09\u6761\uFF0C\u4E00\u5171\u6536\u5230 ${totalVotes} \u5F20\u7968\u3002`);
    lines.push(
      actorBest && actorBest.fooled > 0 ? `${nameOf(room, actorBest.id)} \u4E00\u4E2A\u4EBA\u9A97\u5230 ${actorBest.fooled} \u4E2A\u4EBA\uFF0C\u5168\u573A\u6700\u4F1A\u85CF\u3002` : "\u6CA1\u4EBA\u88AB\u9A97\u5230\uFF0C\u4F60\u4EEC\u7684\u76F4\u89C9\u6709\u70B9\u5413\u4EBA\u3002"
    );
    lines.push(
      readerBest ? `${byId(room, readerBest[0])?.name ?? "\u67D0\u4EBA"} \u731C\u4E2D ${readerBest[1]} \u6761\u5047\u8BDD\uFF0C\u300C\u6700\u4F1A\u8BFB\u4EBA\u5956\u300D\u5F52\u4ED6\u3002` : "\u8FD9\u4E00\u573A\u6CA1\u4EBA\u731C\u4E2D\uFF0C\u8BFB\u4EBA\u8FD9\u9879\u80FD\u529B\u5EFA\u8BAE\u56DE\u7089\u3002"
    );
    lines.push(
      skipped.length ? `${clip(skipped.join("\u3001"), 48)} \u4E00\u76F4\u6CA1\u4EA4\u4E09\u6761\uFF0C\u5168\u7A0B\u5F53\u89C2\u4F17\u3002` : `\u6BCF\u4E2A\u4EBA\u90FD\u4EA4\u9F50\u4E86\u4E09\u6761${top ? `\uFF0C\u603B\u5206\u6700\u9AD8 ${top.player.name}\uFF08${top.player.score} \u5206\uFF09` : ""}\u3002`
    );
    if (bottom && top && bottom.player.score !== top.player.score) {
      lines.push(`\u57AB\u5E95\u7684\u662F ${bottom.player.name}\uFF08${bottom.player.score} \u5206\uFF09\uFF0C\u6309\u89C4\u77E9\u8BB2\u4E00\u4EF6\u771F\u4E8B\u5F53\u60E9\u7F5A\u3002`);
    }
    return {
      title: `\u4E24\u771F\u4E00\u5047 \xB7 \u63ED\u7A7F ${revealedIds.length} \u4EBA`,
      lines,
      winners,
      verdict: (actorBest && actorBest.fooled > 0 ? judge("award", { name: nameOf(room, actorBest.id), title: "\u6700\u4F73\u6F14\u6280\u5956" }) : judge("tie")) + " " + judge("close")
    };
  }
};
function hostHintFor6(room) {
  const d = twos(room);
  switch (room.phase) {
    case "lobby":
      return "\u4EBA\u5230\u9F50\u4E86\u5C31\u70B9\u5F00\u59CB\uFF0C\u5927\u5BB6\u5728\u624B\u673A\u4E0A\u5199\u4E09\u6761\u3002";
    case "write": {
      const left = seated(room).filter((p) => !d.cards[p.id]).map((p) => p.name);
      return left.length ? `\u8FD8\u5DEE ${left.length} \u4E2A\u4EBA\uFF1A${clip(left.join("\u3001"), 40)}\u3002\u5361\u4F4F\u4E86\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u8DF3\u8FC7\u4ED6\u4EEC\u3002` : "\u90FD\u4EA4\u9F50\u4E86\uFF0C\u9A6C\u4E0A\u8FDB\u5165\u4E92\u731C\u3002";
    }
    case "show": {
      const author = d.order[d.cursor] ?? null;
      const left = votersOf(room, author).filter((p) => votesOf(room, author)[p.id] === void 0);
      return `\u6B63\u5728\u731C ${author ? nameOf(room, author) : "?"} \u7684\u4E09\u6761\u3002\u8FD8\u5DEE ${left.length} \u4E2A\u4EBA\u6295\u7968\uFF0C\u4E5F\u53EF\u4EE5\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u63D0\u524D\u7ED3\u7B97\u3002`;
    }
    case "reveal":
      return "\u770B\u5B8C\u63ED\u6653\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u6362\u4E0B\u4E00\u4E2A\u4EBA\uFF0C\u6216\u8005\u7ED3\u675F\u672C\u5C40\u3002";
    case "over":
      return "\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u56DE\u5230\u7ED3\u7B97\u9875\u7EE7\u7EED\u505C\u7559\uFF0C\u6216\u5F00\u65B0\u5C40\u3002";
    default:
      return "";
  }
}

// src/shared/engine/index.ts
var ENGINES = {
  spy: spyEngine,
  twos: twosEngine,
  soup: soupEngine,
  bomb: bombEngine,
  seven: sevenEngine,
  story: storyEngine,
  never: neverEngine,
  mime: mimeEngine
};
var engineFor = (gameId) => ENGINES[gameId] ?? null;

// server/store.ts
var ROOM_TTL_MS = 3 * 60 * 60 * 1e3;
var serialize = (room) => JSON.stringify(room);
function memoryStore() {
  const rooms = /* @__PURE__ */ new Map();
  return {
    async load(code) {
      const room = rooms.get(code);
      if (!room) return null;
      const json2 = serialize(room);
      return { room: JSON.parse(json2), json: json2, expectedSeq: room.seq };
    },
    async insert(room) {
      rooms.set(room.code, room);
      return true;
    },
    async commit(loaded, room) {
      const current = rooms.get(room.code);
      if (!current || current.seq !== loaded.expectedSeq) return false;
      rooms.set(room.code, room);
      return true;
    },
    async remove(code) {
      rooms.delete(code);
    },
    async sweep(now) {
      for (const [code, room] of rooms) if (now - room.updatedAt > ROOM_TTL_MS) rooms.delete(code);
    },
    async count() {
      return rooms.size;
    },
    async all() {
      return [...rooms.values()];
    }
  };
}
var TABLE = "rooms";
function dbStore(db, fail) {
  const unwrap = (result) => {
    if (result?.error) fail("database_unavailable", 503);
    return result?.data;
  };
  return {
    async load(code) {
      const found = unwrap(
        await db.from(TABLE).select("code,seq,state").eq("code", code).limit(1)
      );
      const row = found?.[0];
      if (!row?.state) return null;
      const room = row.state;
      return { room, json: JSON.stringify(room), expectedSeq: row.seq };
    },
    async insert(room) {
      const result = await db.from(TABLE).insertIfAbsent(
        { code: room.code, seq: room.seq, state: room, updated_at: new Date(room.updatedAt).toISOString() },
        { onConflict: "code" }
      ).select("code");
      if (result?.error) fail("database_unavailable", 503);
      return !!result?.data?.length;
    },
    async commit(loaded, room) {
      const written = unwrap(
        await db.from(TABLE).update({ seq: room.seq, state: room, updated_at: new Date(room.updatedAt).toISOString() }).eq("code", room.code).eq("seq", loaded.expectedSeq).select("code")
      );
      return !!written?.length;
    },
    async remove(code) {
      unwrap(await db.from(TABLE).delete().eq("code", code).select("code"));
    },
    async sweep(now) {
      unwrap(
        await db.from(TABLE).delete().lt("updated_at", new Date(now - ROOM_TTL_MS).toISOString()).select("code")
      );
    },
    async count() {
      const result = await db.from(TABLE).select("code", { count: "exact" }).limit(1);
      if (result?.error) fail("database_unavailable", 503);
      return Number.isSafeInteger(result?.count) ? result.count : 0;
    }
  };
}

// server/rooms.ts
var CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
var TOKEN_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
var PLAYER_OFFLINE_MS = 45e3;
var PRESENCE_WRITE_MS = 1e4;
var CAS_ATTEMPTS = 4;
var store = memoryStore();
function useRoomStore(next) {
  store = next;
}
function randomPick(alphabet, length) {
  const limit = 256 - 256 % alphabet.length;
  let out = "";
  while (out.length < length) {
    const bytes = new Uint8Array(length * 2);
    crypto.getRandomValues(bytes);
    for (const b of bytes) {
      if (out.length >= length) break;
      if (b < limit) out += alphabet[b % alphabet.length];
    }
  }
  return out;
}
async function makeCode() {
  for (let attempt = 0; attempt < 40; attempt++) {
    const code = randomPick(CODE_CHARS, ROOM_CODE_LENGTH);
    if (!await store.load(code)) return code;
  }
  return randomPick(CODE_CHARS, ROOM_CODE_LENGTH);
}
var makeToken = () => randomPick(TOKEN_CHARS, 32);
function normalize(code) {
  return String(code ?? "").trim().toUpperCase().slice(0, ROOM_CODE_LENGTH);
}
function sanitizeName(name) {
  return String(name ?? "").replace(/\s+/g, " ").trim().slice(0, 12);
}
async function mutateRoom(code, fn) {
  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const loaded = await store.load(code);
    if (!loaded) return { ok: false, reason: "not_found" };
    const value = fn(loaded.room);
    if (JSON.stringify(loaded.room) === loaded.json) return { ok: true, value, room: loaded.room };
    loaded.room.seq = Math.max(loaded.room.seq, loaded.expectedSeq + 1);
    if (await store.commit(loaded, loaded.room)) return { ok: true, value, room: loaded.room };
  }
  return { ok: false, reason: "conflict" };
}
function advance2(room, now) {
  const engine = engineFor(room.gameId);
  if (!engine) return;
  try {
    engine.tick(room, now);
  } catch (err) {
    console.error("[tick]", room.code, room.gameId, err);
    room.seq += 1;
    room.events.push({ seq: room.seq, at: now, kind: "info", text: "\u88C1\u5224\u8FD9\u8FB9\u5361\u4E86\u4E00\u4E0B\uFF0C\u6309\u300C\u4E0B\u4E00\u6B65\u300D\u7EE7\u7EED\u3002" });
  }
  if (room.phase === "over" && !room.finished) {
    try {
      room.finished = engine.finish(room);
    } catch (err) {
      console.error("[finish]", room.code, err);
      room.finished = {
        title: "\u672C\u5C40\u7ED3\u675F",
        lines: [],
        winners: [],
        verdict: "\u7ED3\u7B97\u65F6\u88C1\u5224\u6253\u4E86\u4E2A\u76F9\uFF0C\u5206\u6570\u4EE5\u73B0\u573A\u8BB0\u5FC6\u4E3A\u51C6\u3002"
      };
    }
  }
}
async function createRoom(input) {
  const meta = GAME_BY_ID[input.gameId];
  if (!meta) throw new Error("unknown game");
  const engine = engineFor(input.gameId);
  if (!engine) throw new Error("engine missing");
  const code = await makeCode();
  const now = Date.now();
  const host = {
    id: makeToken(),
    name: sanitizeName(input.hostName) || "\u623F\u4E3B",
    seat: 1,
    isHost: true,
    connected: true,
    lastSeen: now,
    score: 0,
    alive: true,
    outReason: null
  };
  const room = {
    code,
    createdAt: now,
    updatedAt: now,
    seq: 1,
    gameId: input.gameId,
    profile: input.profile,
    judgeMode: meta.judgeModes.includes(input.judgeMode) ? input.judgeMode : meta.judgeModes[0],
    refereeId: null,
    phase: "lobby",
    round: 0,
    turn: 0,
    startedAt: null,
    deadlineAt: null,
    pausedMs: 0,
    players: [host],
    data: {},
    events: [],
    finished: null
  };
  engine.create(room);
  touch(room);
  if (!await store.insert(room)) throw new Error("code taken");
  return { room, host };
}
var loadRoom = (code) => store.load(normalize(code));
async function joinRoom(code, name) {
  const clean = sanitizeName(name);
  if (!clean) return null;
  const result = await mutateRoom(normalize(code), (room) => {
    if (room.phase !== "lobby") return null;
    const taken = new Set(room.players.map((p) => p.name));
    let finalName = clean;
    let n = 2;
    while (taken.has(finalName)) finalName = `${clean}${n++}`;
    const player = {
      id: makeToken(),
      name: finalName,
      seat: room.players.length + 1,
      isHost: false,
      connected: true,
      lastSeen: Date.now(),
      score: 0,
      alive: true,
      outReason: null
    };
    room.players.push(player);
    room.seq += 1;
    room.events.push({
      seq: room.seq,
      at: Date.now(),
      kind: "join",
      text: `${player.name} \u52A0\u5165\uFF0C\u73B0\u5728 ${room.players.length} \u4E2A\u4EBA`
    });
    touch(room);
    return { room, player };
  });
  return result.ok ? result.value : null;
}
function touch(room) {
  room.updatedAt = Date.now();
  if (room.events.length > 60) room.events.splice(0, room.events.length - 60);
}
function configureRoom(room, opts) {
  const meta = GAME_BY_ID[room.gameId];
  if (opts.judgeMode) {
    if (!meta.judgeModes.includes(opts.judgeMode)) return `${meta.name} \u4E0D\u652F\u6301\u8FD9\u79CD\u88C1\u5224\u65B9\u5F0F`;
    room.judgeMode = opts.judgeMode;
    if (opts.judgeMode === "ai") room.refereeId = null;
  }
  if (opts.refereeId !== void 0) {
    if (room.judgeMode !== "human") return "\u5F53\u524D\u662F AI \u88C1\u5224\uFF0C\u5148\u5207\u6362\u6210\u771F\u4EBA\u88C1\u5224";
    if (opts.refereeId === null) {
      room.refereeId = null;
    } else {
      const p = room.players.find((x) => x.id === opts.refereeId);
      if (!p) return "\u627E\u4E0D\u5230\u8FD9\u540D\u73A9\u5BB6";
      room.refereeId = p.id;
    }
  }
  if (room.judgeMode === "human" && !room.refereeId && room.phase === "lobby") {
    return "\u8FD8\u5DEE\u4E00\u6B65\uFF1A\u6307\u5B9A\u4E00\u540D\u771F\u4EBA\u88C1\u5224";
  }
  touch(room);
  return null;
}
function startRoom(room, hostToken) {
  if (!room.players.some((p) => p.id === hostToken && p.isHost)) return "\u53EA\u6709\u623F\u4E3B\u80FD\u5F00\u59CB\u8FD9\u5C40";
  const meta = GAME_BY_ID[room.gameId];
  if (room.players.length < meta.minPlayers) return `\u81F3\u5C11 ${meta.minPlayers} \u4E2A\u4EBA\u624D\u80FD\u5F00\u8FD9\u5C40`;
  if (room.judgeMode === "human" && !room.refereeId) return "\u8BF7\u5148\u6307\u5B9A\u4E00\u540D\u771F\u4EBA\u88C1\u5224";
  const engine = engineFor(room.gameId);
  if (!engine) return "\u6E38\u620F\u5F15\u64CE\u7F3A\u5931";
  room.startedAt = Date.now();
  room.seq += 1;
  engine.start(room);
  touch(room);
  return null;
}
function act(room, token, action, payload) {
  const engine = engineFor(room.gameId);
  const actor = room.players.find((p) => p.id === token);
  if (!engine || !actor) return "\u8EAB\u4EFD\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u52A0\u5165\u623F\u95F4";
  if (!/^[a-zA-Z][a-zA-Z0-9]{1,24}$/.test(action)) return "\u672A\u77E5\u64CD\u4F5C";
  engine.act(room, actor, action, payload ?? {});
  touch(room);
  return null;
}
function nextStep(room, token) {
  const engine = engineFor(room.gameId);
  if (!engine) return "\u6E38\u620F\u5F15\u64CE\u7F3A\u5931";
  const actor = token ? room.players.find((p) => p.id === token) ?? null : null;
  if (token && !actor) return "\u8EAB\u4EFD\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u52A0\u5165\u623F\u95F4";
  if (room.phase === "lobby") return startRoom(room, actor?.id ?? "");
  engine.next(room, actor);
  touch(room);
  return null;
}
function isRefereeViewer(room, me) {
  if (me && room.judgeMode === "human" && room.refereeId === me.id) return true;
  if (me?.isHost) return true;
  return false;
}
function buildView(room, token, asWatcher = false) {
  const meta = GAME_BY_ID[room.gameId];
  const engine = engineFor(room.gameId);
  if (!meta || !engine) return null;
  const now = Date.now();
  const me = token ? room.players.find((p) => p.id === token) ?? null : null;
  const role = asWatcher || !me ? "watcher" : me.isHost ? "host" : room.judgeMode === "human" && room.refereeId === me.id ? "referee" : "player";
  const players = room.players.map((p) => ({
    ...p,
    connected: now - p.lastSeen < PLAYER_OFFLINE_MS
  }));
  const view = {
    code: room.code,
    seq: room.seq,
    gameId: room.gameId,
    meta,
    phase: room.phase,
    round: room.round,
    turn: room.turn,
    deadlineAt: room.deadlineAt,
    serverNow: now,
    judgeMode: room.judgeMode,
    refereeId: room.refereeId,
    role,
    me: me ? players.find((p) => p.id === me.id) ?? null : null,
    players,
    events: room.events.slice(-14),
    finished: room.finished,
    publicData: engine.publicData(room),
    secret: me && !asWatcher ? engine.secretFor(room, me) : {},
    referee: isRefereeViewer(room, me) ? engine.refereeExtra(room) : null,
    needs: { prompt: null, input: "none", inputHint: "", submitted: false, hostHint: "" }
  };
  view.needs = engine.needs(room, role === "watcher" ? null : me, view);
  return view;
}
function markSeen(room, token, now = Date.now()) {
  if (!token) return;
  const p = room.players.find((x) => x.id === token);
  if (!p || now - p.lastSeen < PRESENCE_WRITE_MS) return;
  p.lastSeen = now;
}
var roomCount = () => store.count();

// server/api.ts
var ok = (body) => ({ status: 200, body });
var bad = (status, error) => ({ status, body: { error } });
function metaBody(origin, lan) {
  if (!origin) return ok({ base: null });
  const host = origin.split("//")[1]?.split(":")[0] ?? "";
  const isLocal = !host || host === "localhost" || host.startsWith("127.") || host === "::1";
  return ok({ base: isLocal && lan ? lan : origin });
}
async function health() {
  return ok({ ok: true, rooms: await roomCount() });
}
var clampProfile = (p) => ({
  count: Math.max(2, Math.min(30, Math.round(p?.count ?? 6))),
  minutes: Math.max(3, Math.min(90, Math.round(p?.minutes ?? 10))),
  setting: ["seated", "standing", "lounging"].includes(p?.setting) ? p.setting : "seated",
  vibes: Array.isArray(p?.vibes) ? p.vibes.filter((v) => ["laugh", "warm", "brain", "rival"].includes(v)).slice(0, 4) : [],
  intimacy: ["strangers", "colleagues", "friends", "family"].includes(p?.intimacy) ? p.intimacy : "friends",
  shyLevel: [0, 1, 2].includes(p?.shyLevel) ? p.shyLevel : 1,
  propsOk: !!p?.propsOk,
  phonePerPerson: !!p?.phonePerPerson,
  wantMove: !!p?.wantMove
});
async function createRoomRoute(b) {
  if (!b?.profile || typeof b.profile.count !== "number" || !GAME_BY_ID[b.gameId]) {
    return bad(400, "\u7F3A\u5C11\u623F\u95F4\u4FE1\u606F");
  }
  const input = {
    gameId: String(b.gameId),
    hostName: sanitizeName(b.hostName ?? ""),
    judgeMode: b.judgeMode === "human" ? "human" : "ai",
    profile: clampProfile(b.profile)
  };
  try {
    const { room, host } = await createRoom(input);
    return ok({ code: room.code, token: host.id, view: buildView(room, host.id) });
  } catch (e) {
    if (typeof e?.status === "number" && e.status >= 500) throw e;
    return bad(400, "\u5EFA\u623F\u5931\u8D25");
  }
}
async function joinRoute(b) {
  const code = normalize(b?.code);
  const result = await joinRoom(code, String(b?.name ?? ""));
  if (result) return ok({ code: result.room.code, token: result.player.id, view: buildView(result.room, result.player.id) });
  const loaded = await loadRoom(code);
  if (!loaded) return bad(404, "\u627E\u4E0D\u5230\u8FD9\u4E2A\u623F\u95F4\uFF0C\u68C0\u67E5\u4E00\u4E0B\u623F\u95F4\u53F7");
  if (loaded.room.phase !== "lobby") return bad(400, "\u8FD9\u5C40\u5DF2\u7ECF\u5F00\u59CB\u4E86\uFF0C\u7B49\u4E0B\u4E00\u5C40\u518D\u52A0\u5165\u5427");
  return bad(400, "\u540D\u5B57\u4E0D\u592A\u5BF9\uFF0C\u6362\u4E00\u4E2A\u8BD5\u8BD5");
}
async function viewRoute(code, token, watch = false) {
  const result = await mutateRoom(normalize(code), (room) => {
    const now = Date.now();
    advance2(room, now);
    markSeen(room, token, now);
    return buildView(room, token, watch);
  });
  if (!result.ok) return bad(404, result.reason === "conflict" ? "\u623F\u95F4\u592A\u6324\u4E86\uFF0C\u518D\u5237\u4E00\u6B21" : "\u623F\u95F4\u4E0D\u5B58\u5728\u6216\u5DF2\u7ED3\u675F");
  return ok({ view: result.value });
}
async function actionRoute(code, token, action, payload) {
  const size = JSON.stringify(payload ?? {}).length;
  if (size > 4e3) return bad(400, "\u8FD9\u6BB5\u5185\u5BB9\u592A\u957F\u4E86");
  const result = await mutateRoom(normalize(code), (room) => {
    advance2(room, Date.now());
    return act(room, token, action, payload);
  });
  if (!result.ok) return bad(404, result.reason === "conflict" ? "\u8FD9\u4E00\u6B65\u6CA1\u5199\u4E0A\uFF0C\u518D\u70B9\u4E00\u6B21" : "\u623F\u95F4\u4E0D\u5B58\u5728\u6216\u5DF2\u7ED3\u675F");
  return ok({ error: result.value, view: buildView(result.room, token) });
}
async function nextRoute(code, token, force = false) {
  const result = await mutateRoom(normalize(code), (room) => {
    advance2(room, Date.now());
    return force ? startRoom(room, token) : nextStep(room, token || null);
  });
  if (!result.ok) return bad(404, result.reason === "conflict" ? "\u8FD9\u4E00\u6B65\u6CA1\u5199\u4E0A\uFF0C\u518D\u70B9\u4E00\u6B21" : "\u623F\u95F4\u4E0D\u5B58\u5728\u6216\u5DF2\u7ED3\u675F");
  return ok({ error: result.value, view: buildView(result.room, token) });
}
async function configureRoute(code, token, opts) {
  const result = await mutateRoom(normalize(code), (room) => {
    if (!room.players.some((p) => p.id === token && p.isHost)) return { denied: true, error: null };
    return { denied: false, error: configureRoom(room, opts) };
  });
  if (!result.ok) return bad(404, result.reason === "conflict" ? "\u8FD9\u4E00\u6B65\u6CA1\u5199\u4E0A\uFF0C\u518D\u70B9\u4E00\u6B21" : "\u623F\u95F4\u4E0D\u5B58\u5728\u6216\u5DF2\u7ED3\u675F");
  if (result.value.denied) return bad(403, "\u53EA\u6709\u623F\u4E3B\u80FD\u8BBE\u7F6E\u88C1\u5224");
  return ok({ error: result.value.error, view: buildView(result.room, token) });
}

// server/function.ts
var json = (r) => Response.json(r.body, { status: r.status });
var readJson = async (request) => {
  const text = await request.text();
  if (text.length > 48e3) throw new Error("payload_too_large");
  if (!text) return {};
  return JSON.parse(text);
};
function application(deps) {
  const fail = (code, status) => {
    throw new deps.BackendError(code, status);
  };
  const store2 = dbStore(deps.db, fail);
  useRoomStore(store2);
  return async (ctx) => {
    const request = ctx?.request ?? ctx;
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/(?:functions\/v1\/)?(?:app|app-d[0-9a-f]{32})(\/.*)?$/);
    if (!match) return Response.json({ error: "not_found" }, { status: 404 });
    const path = match[1] ?? "/";
    const get = (name) => url.searchParams.get(name);
    if (request.method === "GET" && path === "/api/health") return json(await health());
    if (request.method === "GET" && path === "/api/meta") return json(metaBody(null));
    if (request.method === "POST" && path === "/api/rooms") {
      await store2.sweep(Date.now());
      return json(await createRoomRoute(await readJson(request)));
    }
    if (request.method === "POST" && path === "/api/join") {
      return json(await joinRoute(await readJson(request)));
    }
    const room = path.match(/^\/api\/rooms\/([^/]+)$/);
    if (room && request.method === "GET") {
      return json(await viewRoute(normalize(room[1]), get("token"), get("watch") === "1"));
    }
    const sub = path.match(/^\/api\/rooms\/([^/]+)\/(action|next|configure)$/);
    if (sub) {
      const code = normalize(sub[1]);
      const body = await readJson(request);
      const token = String(body?.token ?? "");
      if (sub[2] === "action") return json(await actionRoute(code, token, String(body?.action ?? ""), body?.payload));
      if (sub[2] === "next") return json(await nextRoute(code, token, !!body?.force));
      return json(
        await configureRoute(code, token, {
          judgeMode: body?.judgeMode === void 0 ? void 0 : body.judgeMode === "human" ? "human" : "ai",
          refereeId: body?.refereeId === void 0 ? void 0 : body.refereeId === null ? null : String(body.refereeId)
        })
      );
    }
    return Response.json({ error: "not_found" }, { status: 404 });
  };
}
export {
  application
};

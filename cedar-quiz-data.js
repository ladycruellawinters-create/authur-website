/* Public quiz fiction, not creature rules or character identities. Affinities match the six answer dimensions. */
(function(root) {
const data = {
  "edition": 2,
  "creatures": {
    "ghost": {
      "name": "Ghost",
      "accent": "#cc7889",
      "value": "Quiet company, lasting warmth",
      "affinity": [
        "d",
        "a",
        "a",
        "b",
        "d",
        "d"
      ],
      "description": "You notice the feeling of a place and the stories people leave behind. Your Cedar Hollow self would make space for gentle conversations, familiar comforts and friends who need someone to listen.",
      "detail": "Your neighbourly signature: making sure nobody feels forgotten.",
      "invitation": "A quiet corner where old stories and new friendships meet."
    },
    "werewolf": {
      "name": "Werewolf",
      "accent": "#c5a878",
      "value": "A loyal heart and a welcoming table",
      "affinity": [
        "b",
        "b",
        "b",
        "b",
        "b",
        "b"
      ],
      "description": "You are drawn to shared adventures and wholehearted friendships. Your Cedar Hollow self would make room for one more and check that everyone feels included.",
      "detail": "Your neighbourly signature: making a newcomer feel like an old friend.",
      "invitation": "A lively gathering where everyone looks out for one another."
    },
    "witch": {
      "name": "Witch",
      "accent": "#8cb99c",
      "value": "Curiosity with a thoughtful touch",
      "affinity": [
        "c",
        "b",
        "c",
        "c",
        "c",
        "b"
      ],
      "description": "You find joy in making things and noticing what others might miss. Your Cedar Hollow self would bring thoughtful little touches to town life, turning an ordinary day into something special.",
      "detail": "Your neighbourly signature: a handmade kindness with someone particular in mind.",
      "invitation": "A cosy afternoon creating something thoughtful for a friend."
    },
    "wizard": {
      "name": "Wizard",
      "accent": "#90aecb",
      "value": "One more question, one more discovery",
      "affinity": [
        "c",
        "c",
        "c",
        "c",
        "c",
        "c"
      ],
      "description": "You enjoy following an idea wherever it leads. Your Cedar Hollow self would be happiest with an interesting puzzle, an overflowing notebook and someone willing to ask another question.",
      "detail": "Your neighbourly signature: an explanation that begins with “I found something interesting…”",
      "invitation": "A table full of books and a fascinating puzzle to share."
    },
    "human": {
      "name": "Human",
      "accent": "#cc7889",
      "value": "Extraordinary kindness, everyday life",
      "affinity": [
        "b",
        "b",
        "b",
        "c",
        "b",
        "b"
      ],
      "description": "You value the things that make somewhere home: friendship, small routines and showing up for people. Your Cedar Hollow self would find plenty of wonder without needing supernatural powers of your own.",
      "detail": "Your neighbourly signature: making the everyday feel welcoming.",
      "invitation": "A familiar café table and a friend who is pleased to see you."
    },
    "genie": {
      "name": "Genie",
      "accent": "#c5a878",
      "value": "A generous imagination",
      "affinity": [
        "a",
        "b",
        "c",
        "c",
        "c",
        "a"
      ],
      "description": "You enjoy hearing what people hope for and imagining possibilities together. Your Cedar Hollow self would bring big ideas and a generous spirit to even the smallest town project.",
      "detail": "Your neighbourly signature: helping someone see a possibility they had overlooked.",
      "invitation": "An evening dreaming up something wonderful together."
    },
    "gnome": {
      "name": "Gnome",
      "accent": "#8cb99c",
      "value": "Small details, a steady heart",
      "affinity": [
        "d",
        "b",
        "c",
        "b",
        "b",
        "b"
      ],
      "description": "You appreciate a place that is cared for and a job done thoughtfully. Your Cedar Hollow self would notice the little things that help a neighbourhood flourish.",
      "detail": "Your neighbourly signature: the small, practical kindness everyone comes to rely on.",
      "invitation": "A comfortable spot and a satisfying little project."
    },
    "cat": {
      "name": "Cat",
      "accent": "#90aecb",
      "value": "Independent, with excellent taste in company",
      "affinity": [
        "d",
        "d",
        "a",
        "d",
        "d",
        "d"
      ],
      "description": "You like to choose your own pace and your own people. Your Cedar Hollow self would balance quiet independence with warm affection for the friends who understand you best.",
      "detail": "Your neighbourly signature: making time for someone because you want to be there.",
      "invitation": "A peaceful afternoon entirely on your own terms."
    },
    "magpie": {
      "name": "Magpie",
      "accent": "#cc7889",
      "value": "An eye for the unexpected",
      "affinity": [
        "d",
        "c",
        "d",
        "d",
        "c",
        "c"
      ],
      "description": "You notice the interesting detail others walk past. Your Cedar Hollow self would collect discoveries, conversation starters and little reasons to look at the familiar afresh.",
      "detail": "Your neighbourly signature: bringing back a story nobody else spotted.",
      "invitation": "A wander that turns up a delightful, unexpected find."
    },
    "fairy": {
      "name": "Fairy",
      "accent": "#c5a878",
      "value": "A little delight goes a long way",
      "affinity": [
        "c",
        "a",
        "c",
        "a",
        "c",
        "c"
      ],
      "description": "You enjoy colour, creativity and giving people a reason to smile. Your Cedar Hollow self would make room for playfulness, especially when everyday life has become a little too serious.",
      "detail": "Your neighbourly signature: turning a small gathering into a memorable occasion.",
      "invitation": "A colourful celebration with something playful to discover."
    },
    "pegasus": {
      "name": "Pegasus",
      "accent": "#8cb99c",
      "value": "An open horizon and an open heart",
      "affinity": [
        "d",
        "b",
        "d",
        "d",
        "b",
        "d"
      ],
      "description": "You are drawn to fresh air, possibility and adventures shared with people you trust. Your Cedar Hollow self would encourage friends to try something new while leaving them room to find their own way.",
      "detail": "Your neighbourly signature: an invitation to take a breath and explore.",
      "invitation": "An open path and a new view to enjoy with a friend."
    },
    "gorgon": {
      "name": "Gorgon",
      "accent": "#90aecb",
      "value": "Composure with a caring centre",
      "affinity": [
        "a",
        "d",
        "a",
        "b",
        "d",
        "a"
      ],
      "description": "You value your space and choose your friendships thoughtfully. Your Cedar Hollow self would offer a calm presence, honest boundaries and attention that makes a close friend feel truly seen.",
      "detail": "Your neighbourly signature: giving someone your undivided attention.",
      "invitation": "A thoughtful conversation with someone who respects your space."
    },
    "dragon": {
      "name": "Dragon",
      "accent": "#cc7889",
      "value": "A bold spirit with room for others",
      "affinity": [
        "a",
        "a",
        "a",
        "b",
        "a",
        "a"
      ],
      "description": "You bring conviction and a little grandeur to the things you care about. Your Cedar Hollow self would champion a favourite cause and encourage friends to take pride in themselves.",
      "detail": "Your neighbourly signature: standing wholeheartedly behind something worth caring about.",
      "invitation": "A bold new venture with something worth celebrating."
    },
    "vampire": {
      "name": "Vampire",
      "accent": "#c5a878",
      "value": "A little elegance after dark",
      "affinity": [
        "a",
        "a",
        "a",
        "a",
        "d",
        "a"
      ],
      "description": "You appreciate atmosphere, meaningful conversations and the pleasure of finding your people. Your Cedar Hollow self would turn a quiet evening into something worth remembering.",
      "detail": "Your neighbourly signature: making an ordinary evening feel like an occasion.",
      "invitation": "Good conversation in wonderfully dramatic surroundings."
    },
    "scarecrow": {
      "name": "Scarecrow",
      "accent": "#8cb99c",
      "value": "A familiar face, a reassuring presence",
      "affinity": [
        "d",
        "b",
        "b",
        "b",
        "b",
        "b"
      ],
      "description": "You appreciate steady routines, familiar places and being there when someone needs you. Your Cedar Hollow self would be the reassuring presence that helps the whole neighbourhood feel more like home.",
      "detail": "Your neighbourly signature: quietly making sure everyone has what they need.",
      "invitation": "A familiar gathering where there is always room for you."
    },
    "merfolk": {
      "name": "Merfolk",
      "accent": "#90aecb",
      "value": "Follow the current of your curiosity",
      "affinity": [
        "d",
        "c",
        "d",
        "d",
        "d",
        "d"
      ],
      "description": "You are drawn to room to think, new perspectives and discoveries that arrive when you wander. Your Cedar Hollow self would bring a refreshing outlook and stories from wherever your curiosity takes you.",
      "detail": "Your neighbourly signature: helping someone see a familiar problem from another angle.",
      "invitation": "A peaceful wander with a fresh perspective waiting around the corner."
    }
  },
  "questions": [
    [
      "You have a free evening in Cedar Hollow. What sounds best?",
      {
        "a": "A small gathering with wonderful conversation and a little atmosphere.",
        "b": "A lively evening with friends, with room for one more.",
        "c": "A creative project or an interesting book to get absorbed in.",
        "d": "A quiet wander or some time entirely at my own pace."
      }
    ],
    [
      "A new neighbour seems unsure at a town gathering. You…",
      {
        "a": "Give them a warm introduction and help them feel confident.",
        "b": "Offer a seat, a drink or whatever practical help they need.",
        "c": "Ask about their interests and find something to explore together.",
        "d": "Offer quiet company without putting them on the spot."
      }
    ],
    [
      "Your ideal home has…",
      {
        "a": "Plenty of character and a little dramatic flair.",
        "b": "Familiar comforts and space to welcome friends.",
        "c": "Books, handmade things and interesting finds.",
        "d": "An airy feeling and room to follow my own routines."
      }
    ],
    [
      "The spring festival needs help. What appeals most?",
      {
        "a": "Making the celebration feel special and memorable.",
        "b": "Doing the practical jobs that keep everyone comfortable.",
        "c": "Designing something thoughtful or finding a clever new idea.",
        "d": "Exploring what is happening and sharing the best discoveries."
      }
    ],
    [
      "An unexpected problem interrupts your plans. You tend to…",
      {
        "a": "Be direct and take a confident first step.",
        "b": "Check on everyone and work out what we can do together.",
        "c": "Look for a different approach or an overlooked detail.",
        "d": "Take a quiet moment to think before deciding."
      }
    ],
    [
      "What do you most enjoy bringing to a friendship?",
      {
        "a": "Encouragement, good conversation and a sense of occasion.",
        "b": "Comfort, reliability and the feeling of belonging.",
        "c": "Fresh ideas, discoveries and thoughtful little surprises.",
        "d": "Space to be yourself and an invitation to explore."
      }
    ]
  ]
};
if(typeof module!=="undefined" && module.exports) module.exports=data;
else root.CedarQuizData=data;
})(typeof window!=="undefined" ? window : globalThis);

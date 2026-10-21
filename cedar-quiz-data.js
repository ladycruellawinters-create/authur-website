/* Public, spoiler-free quiz content. Add results and balanced answer choices together. */
(function (root) {
  const data = {
    edition: 1,
    creatures: {
      vampire: {name: 'Vampire', accent: '#cc7889', value: 'A little elegance after dark', invitation: 'An evening of good conversation and wonderfully dramatic surroundings.', description: 'You appreciate atmosphere, meaningful conversations and the pleasure of finding your people. Your Cedar Hollow self would bring a little glamour to the everyday, turning a quiet evening into something worth remembering.', detail: 'Your neighbourly signature: an invitation that makes even a perfectly ordinary Tuesday feel like an occasion.'},
      werewolf: {name: 'Werewolf', accent: '#c5a878', value: 'A loyal heart and a welcoming table', invitation: 'A lively gathering where everyone has someone looking out for them.', description: 'You are drawn to shared adventures, wholehearted friendships and showing up when it matters. Your Cedar Hollow self would be the neighbour who makes room for one more and checks that everyone gets home feeling included.', detail: 'Your neighbourly signature: making a new arrival feel like an old friend before the evening is over.'},
      witch: {name: 'Witch', accent: '#8cb99c', value: 'Curiosity with a thoughtful touch', invitation: 'A cosy afternoon of books, small discoveries and something homemade.', description: 'You find joy in learning, making things and noticing what others might miss. Your Cedar Hollow self would bring thoughtful little touches to town life, with a fresh idea for making a familiar place feel special.', detail: 'Your neighbourly signature: remembering the tiny detail that turns a kind gesture into exactly what someone needed.'}
    },
    questions: [
      ['You have a free evening in Cedar Hollow. What sounds best?', {vampire: 'Dress up a little and settle into a long conversation after sunset.', werewolf: 'Gather a few friends and see where the evening takes us.', witch: 'Get comfortable with a book and a small project I have been meaning to try.'}],
      ['A new neighbour looks unsure at a town gathering. You…', {vampire: 'Find a shared interest and give them my full attention.', werewolf: 'Introduce them to the group and make sure there is a place beside me.', witch: 'Ask what would help them settle in and offer a thoughtful suggestion.'}],
      ['Your ideal home has…', {vampire: 'Character, rich colours and a wonderful corner for evening guests.', werewolf: 'A welcoming kitchen and plenty of room for people to drop by.', witch: 'Well-loved books, interesting finds and something growing on the windowsill.'}],
      ['The spring festival needs a little help. You volunteer to…', {vampire: 'Set the scene with beautiful decorations and a touch of theatrical flair.', werewolf: 'Bring everyone together and tackle the jobs that need a team.', witch: 'Make something by hand that visitors can take home and treasure.'}],
      ['Something unexpected interrupts your plans. What comes most naturally?', {vampire: 'Take a moment, keep my composure and find a graceful way forward.', werewolf: 'Check on everyone and work out what we can do together.', witch: 'Look closely at the problem and try a different approach.'}],
      ['What would you most like your neighbours to say about you?', {vampire: '“An evening with them is never forgettable.”', werewolf: '“You always know they are in your corner.”', witch: '“They put such care into the smallest things.”'}]
    ]
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else root.CedarQuizData = data;
})(typeof window !== 'undefined' ? window : globalThis);

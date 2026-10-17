const houses = {
  goch: { name: 'Goch', value: 'Courage', founder: 'Gwenllian Goch, Keeper of the Skies', colour: 'Red', accent: '#cc4e54', description: 'You’re drawn to courage: speaking up, taking a difficult first step, and standing beside someone who needs you. Goch honours the choice to act even when you feel afraid.' },
  talar: { name: 'Talar', value: 'Curiosity', founder: 'Seren Talar, Guardian of the Rivers', colour: 'Blue', accent: '#518fd4', description: 'You’re drawn to curiosity: asking another question, trying a fresh approach, and finding wonder in unfamiliar things. Talar honours the desire to keep discovering.' },
  derwen: { name: 'Derwen', value: 'Wisdom', founder: 'Emrys Derwen, Custodian of the Forests', colour: 'Green', accent: '#5baf7c', description: 'You’re drawn to wisdom: listening carefully, reflecting on what you learn, and considering the consequences before you choose. Derwen honours understanding that grows with patience.' },
  idris: { name: 'Idris', value: 'Strength', founder: 'Bran ap Idris, Father of the Mountain', colour: 'Grey', accent: '#a5a8ac', description: 'You’re drawn to strength: staying steady through difficulties, following through on a promise, and helping others carry a heavy day. Idris honours endurance and resilience, as well as strength of heart.' }
};
const questions = [
  ['Your first free afternoon at school is yours. What appeals most?', {
    goch: 'Try an activity that makes me nervous, with someone to guide me.',
    talar: 'Explore the permitted grounds and see what catches my interest.',
    derwen: 'Find a quiet corner and make sense of everything I’ve learned.',
    idris: 'Practise something difficult until I begin to get the hang of it.'
  }],
  ['A friend is struggling with a lesson. How would you help?', {
    goch: 'Speak up alongside them when they’re too worried to ask for help.',
    talar: 'Try a different method together and see what we discover.',
    derwen: 'Listen first, then work out which part they don’t understand.',
    idris: 'Stay with them through the practice, however long it takes.'
  }],
  ['You find an unfamiliar symbol in a book. What draws you in?', {
    goch: 'The challenge of tackling a subject I’ve always found intimidating.',
    talar: 'All the new questions it opens up.',
    derwen: 'Its context, history, and what it might really mean.',
    idris: 'The satisfaction of working patiently through a difficult puzzle.'
  }],
  ['Your group’s plan has gone wrong. What do you bring to the moment?', {
    goch: 'The willingness to make a difficult decision and take responsibility.',
    talar: 'An unexpected idea we haven’t tried yet.',
    derwen: 'A pause to understand what went wrong before we try again.',
    idris: 'A steady presence that helps everyone keep going.'
  }],
  ['Which compliment would mean the most to you?', {
    goch: '“You stood up for what mattered.”',
    talar: '“You helped me see something I’d never noticed.”',
    derwen: '“Your advice helped me understand.”',
    idris: '“I knew I could rely on you.”'
  }],
  ['You have a whole term to work on a project. Which would you choose?', {
    goch: 'Something that asks me to face a fear, one step at a time.',
    talar: 'An open-ended investigation with room for surprising discoveries.',
    derwen: 'A careful study that brings different ideas into focus.',
    idris: 'An ambitious practical task that rewards sustained effort.'
  }],
  ['After a setback, what helps you begin again?', {
    goch: 'Remembering that being afraid doesn’t mean I can’t act.',
    talar: 'Wondering whether a different path might lead somewhere interesting.',
    derwen: 'Reflecting on what the experience has taught me.',
    idris: 'Choosing one small, manageable step and following it with another.'
  }],
  ['What would you most like to offer your new school community?', {
    goch: 'A voice for people who find it difficult to speak up.',
    talar: 'Fresh questions and a sense of possibility.',
    derwen: 'Thoughtful judgement and a willingness to listen.',
    idris: 'Dependable support when things get difficult.'
  }]
];
const form = document.querySelector('#sorting-form');
const questionContainer = document.querySelector('#quiz-questions');
const tieForm = document.querySelector('#tie-form');
const tieOptions = document.querySelector('#tie-options');
const result = document.querySelector('#quiz-result');
const resetButton = document.querySelector('#quiz-reset');
const keys = Object.keys(houses);
let tiedHouses = [];
function option(name, value, text, index) {
  const label = document.createElement('label');
  label.className = 'quiz-option';
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = name;
  input.value = value;
  input.id = `${name}-${index}`;
  input.required = true;
  const copy = document.createElement('span');
  copy.textContent = text;
  label.append(input, copy);
  return label;
}
questions.forEach(([question, answers], index) => {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'quiz-question';
  const legend = document.createElement('legend');
  legend.textContent = `${index + 1}. ${question}`;
  fieldset.append(legend);
  // Rotate the order so each value occupies every position equally often.
  keys.slice(index % 4).concat(keys.slice(0, index % 4)).forEach((key, position) => {
    fieldset.append(option(`question-${index}`, key, answers[key], position));
  });
  questionContainer.append(fieldset);
});
form.querySelector('button').disabled = false;
function showResult(key) {
  const house = houses[key];
  if (!house) return;
  form.hidden = true;
  tieForm.hidden = true;
  result.style.setProperty('--house-accent', house.accent);
  document.querySelector('#result-heading').textContent = `${house.name} House`;
  document.querySelector('#result-value').textContent = house.value;
  document.querySelector('#result-description').textContent = house.description;
  document.querySelector('#result-founder').textContent = house.founder;
  document.querySelector('#result-colour').textContent = house.colour;
  result.hidden = false;
  resetButton.hidden = false;
  document.querySelector('#result-heading').focus();
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const answers = new FormData(form);
  const scores = Object.fromEntries(keys.map(key => [key, 0]));
  for (let i = 0; i < questions.length; i++) {
    const key = answers.get(`question-${i}`);
    if (!keys.includes(key)) return;
    scores[key]++;
  }
  const highest = Math.max(...Object.values(scores));
  tiedHouses = keys.filter(key => scores[key] === highest);
  if (tiedHouses.length === 1) {
    showResult(tiedHouses[0]);
    return;
  }
  tieForm.reset();
  tieOptions.querySelectorAll('label').forEach(label => label.remove());
  tiedHouses.forEach((key, index) => tieOptions.append(option('tie-value', key, houses[key].value, index)));
  form.hidden = true;
  result.hidden = true;
  tieForm.hidden = false;
  resetButton.hidden = false;
  document.querySelector('#tie-heading').focus();
});
tieForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!tieForm.reportValidity()) return;
  const key = new FormData(tieForm).get('tie-value');
  if (tiedHouses.includes(key)) showResult(key);
});
resetButton.addEventListener('click', () => {
  form.reset();
  tieForm.reset();
  tiedHouses = [];
  tieForm.hidden = true;
  result.hidden = true;
  resetButton.hidden = true;
  form.hidden = false;
  form.querySelector('input').focus();
});

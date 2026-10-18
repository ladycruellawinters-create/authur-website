const houses = {
  goch: { animal: 'Red kite', shield: 'assets/goch-house-shield.png', shieldAlt: 'Goch house shield: a black red kite on a red shield', name: 'Goch', value: 'Courage', founder: 'Gwenllian Goch, Keeper of the Skies', colour: 'Red', accent: '#cc4e54', description: 'You’re drawn to courage: speaking up, taking a difficult first step, and standing beside someone who needs you. Goch honours the choice to act even when you feel afraid.' },
  talar: { animal: 'Otter', shield: 'assets/talar-house-shield.png', shieldAlt: 'Talar house shield: a black otter on a blue shield', name: 'Talar', value: 'Curiosity', founder: 'Seren Talar, Guardian of the Rivers', colour: 'Blue', accent: '#518fd4', description: 'You’re drawn to curiosity: asking another question, trying a fresh approach, and finding wonder in unfamiliar things. Talar honours the desire to keep discovering.' },
  derwen: { animal: 'Stag', shield: 'assets/derwen-house-shield.png', shieldAlt: 'Derwen house shield: a black stag on a green shield', name: 'Derwen', value: 'Wisdom', founder: 'Emrys Derwen, Custodian of the Forests', colour: 'Green', accent: '#5baf7c', description: 'You’re drawn to wisdom: listening carefully, reflecting on what you learn, and considering the consequences before you choose. Derwen honours understanding that grows with patience.' },
  idris: { animal: 'Ram', shield: 'assets/idris-house-shield.png', shieldAlt: 'Idris house shield: a black ram on a grey shield', name: 'Idris', value: 'Strength', founder: 'Bran ap Idris, Father of the Mountain', colour: 'Grey', accent: '#a5a8ac', description: 'You’re drawn to strength: staying steady through difficulties, following through on a promise, and helping others carry a heavy day. Idris honours endurance and resilience, as well as strength of heart.' }
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
let currentHouse = null;
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
function showResult(key, { shared = false } = {}) {
  const house = houses[key];
  if (!house) return;
  currentHouse = key;
  document.querySelector('#result-kicker').textContent = shared ? 'SHARED HOUSE RESULT' : 'YOUR HOUSE';
  resetButton.textContent = shared ? 'Take the quiz to find your house' : 'Take the quiz again';
  document.querySelector('#share-status').textContent = '';
  document.querySelector('#manual-share').hidden = true;
  document.querySelector('#share-result').hidden = typeof navigator.share !== 'function';
  form.hidden = true;
  tieForm.hidden = true;
  result.style.setProperty('--house-accent', house.accent);
  document.querySelector('#result-heading').textContent = `${house.name} House`;
  const shield = document.querySelector('#result-shield');
  shield.hidden = !house.shield;
  if (house.shield) {
    shield.src = house.shield;
    shield.alt = house.shieldAlt;
  } else {
    shield.removeAttribute('src');
    shield.alt = '';
  }
  document.querySelector('#result-value').textContent = house.value;
  document.querySelector('#result-description').textContent = house.description;
  document.querySelector('#result-founder').textContent = house.founder;
  document.querySelector('#result-colour').textContent = house.colour;
  document.querySelector('#result-animal').textContent = house.animal;
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
  currentHouse = null;
  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete('house');
  history.replaceState(null, '', cleanUrl);
  document.querySelector('#share-status').textContent = '';
  document.querySelector('#manual-share').hidden = true;
  tieForm.hidden = true;
  result.hidden = true;
  const shield = document.querySelector('#result-shield');
  shield.hidden = true;
  shield.removeAttribute('src');
  shield.alt = '';
  resetButton.hidden = true;
  form.hidden = false;
  form.querySelector('input').focus();
});

function houseShareData(key) {
  const house = houses[key];
  const url = new URL('sorting-quiz.html', window.location.href);
  url.searchParams.set('house', key);
  return {
    title: `I belong to ${house.name} House | Mynydd Draig`,
    text: `I was sorted into ${house.name} House at Mynydd Draig! ${house.value} · ${house.animal} · ${house.colour} robe piping. Which house calls to you?`,
    url: url.href
  };
}
document.querySelector('#share-result').addEventListener('click', async () => {
  if (!currentHouse) return;
  const key = currentHouse;
  try {
    await navigator.share(houseShareData(key));
    if (currentHouse === key) document.querySelector('#share-status').textContent = 'Your sharing menu has closed.';
  } catch (error) {
    if (error.name !== 'AbortError' && currentHouse === key) {
      document.querySelector('#share-status').textContent = 'Sharing isn’t available here. Use “Copy result & link” or save your image instead.';
    }
  }
});
document.querySelector('#copy-result').addEventListener('click', async () => {
  if (!currentHouse) return;
  const key = currentHouse;
  const data = houseShareData(key);
  const text = `${data.text}\n\n${data.url}`;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    if (currentHouse === key) {
      document.querySelector('#manual-share').hidden = true;
      document.querySelector('#share-status').textContent = 'Result and link copied. Paste them into a message or social post.';
    }
  } catch {
    if (currentHouse !== key) return;
    document.querySelector('#manual-share').hidden = false;
    const field = document.querySelector('#share-copy-text');
    field.value = text;
    field.focus();
    field.select();
    document.querySelector('#share-status').textContent = 'Automatic copying isn’t available. Copy the selected text below.';
  }
});
function drawCardText(context, text, y, { size = 36, colour = '#eeeae0', maxWidth = 900, lineHeight = size * 1.35, serif = false } = {}) {
  context.fillStyle = colour;
  context.font = `${size}px ${serif ? 'Georgia' : 'Arial'}`;
  context.textAlign = 'center';
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (line && context.measureText(next).width > maxWidth) {
      context.fillText(line, 540, y);
      y += lineHeight;
      line = word;
    } else line = next;
  }
  if (line) context.fillText(line, 540, y);
  return y + lineHeight;
}
async function makeHouseCard(key) {
  const house = houses[key];
  const shield = new Image();
  shield.src = house.shield;
  await shield.decode();
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Image generation unavailable');
  const background = context.createLinearGradient(0, 0, 1080, 1350);
  background.addColorStop(0, '#24372e');
  background.addColorStop(1, '#101a18');
  context.fillStyle = background;
  context.fillRect(0, 0, 1080, 1350);
  context.strokeStyle = '#ceaf77';
  context.lineWidth = 2;
  context.strokeRect(35, 35, 1010, 1280);
  context.fillStyle = house.accent;
  context.fillRect(36, 36, 1008, 10);
  drawCardText(context, 'C. T. WINTERS · MYNYDD DRAIG', 105, { size: 26, colour: '#ceaf77' });
  drawCardText(context, 'I BELONG TO', 175, { size: 25, colour: '#b9c2b8' });
  drawCardText(context, `${house.name} House`, 280, { size: 100, serif: true });
  const shieldHeight = 650;
  const shieldWidth = shield.naturalWidth / shield.naturalHeight * shieldHeight;
  context.drawImage(shield, (1080 - shieldWidth) / 2, 295, shieldWidth, shieldHeight);
  drawCardText(context, house.value, 980, { size: 55, serif: true, colour: '#ceaf77' });
  drawCardText(context, house.founder, 1045, { size: 29, maxWidth: 920 });
  drawCardText(context, `${house.animal} · ${house.colour} robe piping`, 1120, { size: 30, colour: '#b9c2b8' });
  drawCardText(context, 'Which house calls to you?', 1210, { size: 35, serif: true });
  const quizUrl = new URL('sorting-quiz.html', window.location.href);
  drawCardText(context, quizUrl.host + quizUrl.pathname, 1270, { size: 20, maxWidth: 940, colour: '#ceaf77', lineHeight: 24 });
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Image unavailable')), 'image/png'));
}
document.querySelector('#download-result').addEventListener('click', async event => {
  if (!currentHouse) return;
  const key = currentHouse;
  const button = event.currentTarget;
  button.disabled = true;
  try {
    const blob = await makeHouseCard(key);
    if (currentHouse !== key) return;
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = `mynydd-draig-${key}-house.png`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
    document.querySelector('#share-status').textContent = 'Your result image is ready to save. Add it to a social post with your copied quiz link.';
  } catch {
    if (currentHouse === key) document.querySelector('#share-status').textContent = 'The image couldn’t be created. Please try again, or copy your result instead.';
  } finally {
    button.disabled = false;
  }
});
const sharedHouse = new URL(window.location.href).searchParams.get('house');
if (keys.includes(sharedHouse)) showResult(sharedHouse, { shared: true });

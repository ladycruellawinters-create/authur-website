(() => {
  const {creatures, questions} = window.CedarQuizData;
  const form = document.querySelector('#creature-form');
  const container = document.querySelector('#quiz-questions');
  const tieForm = document.querySelector('#tie-form');
  const result = document.querySelector('#quiz-result');
  const reset = document.querySelector('#quiz-reset');
  const keys = Object.keys(creatures);
  let current = null;
  let tied = [];
  function option(parent, name, key, text) {
    const label = document.createElement('label');
    label.className = 'quiz-option';
    const input = document.createElement('input');
    input.type = 'radio'; input.name = name; input.value = key; input.required = true;
    const span = document.createElement('span'); span.textContent = text;
    label.append(input, span); parent.append(label);
  }
  questions.forEach(([prompt, answers], index) => {
    const fieldset = document.createElement('fieldset'); fieldset.className = 'quiz-question';
    const legend = document.createElement('legend'); legend.textContent = `${index + 1}. ${prompt}`;
    fieldset.append(legend);
    // Rotate positions so a creature does not always occupy the same answer slot.
    const order = [...keys.slice(index % keys.length), ...keys.slice(0, index % keys.length)];
    order.forEach(key => option(fieldset, `question-${index}`, key, answers[key]));
    container.append(fieldset);
  });
  function progress() {
    const count = questions.filter((_, i) => form.querySelector(`input[name="question-${i}"]:checked`)).length;
    document.querySelector('#quiz-progress').textContent = `${count} of ${questions.length} answered.`;
    form.querySelector('button').disabled = count !== questions.length;
  }
  function show(key) {
    current = key;
    const creature = creatures[key];
    form.hidden = true; tieForm.hidden = true; result.hidden = false; reset.hidden = false;
    result.style.setProperty('--house-accent', creature.accent);
    for (const [id, value] of Object.entries({'result-heading': creature.name, 'result-value': creature.value, 'result-description': creature.description, 'result-detail': creature.detail})) document.getElementById(id).textContent = value;
    document.querySelector('#result-heading').focus();
  }
  form.addEventListener('change', progress);
  form.addEventListener('submit', event => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const scores = Object.fromEntries(keys.map(key => [key, 0]));
    const values = new FormData(form);
    questions.forEach((_, i) => scores[values.get(`question-${i}`)]++);
    const max = Math.max(...Object.values(scores));
    tied = keys.filter(key => scores[key] === max);
    if (tied.length === 1) return show(tied[0]);
    const options = document.querySelector('#tie-options');
    options.querySelectorAll('label').forEach(label => label.remove());
    tied.forEach(key => option(options, 'tie', key, creatures[key].invitation));
    form.hidden = true; tieForm.hidden = false; reset.hidden = false;
    document.querySelector('#tie-heading').focus();
  });
  tieForm.addEventListener('submit', event => {
    event.preventDefault(); if (!tieForm.reportValidity()) return;
    const key = new FormData(tieForm).get('tie'); if (tied.includes(key)) show(key);
  });
  reset.addEventListener('click', () => {
    form.reset(); tieForm.reset(); current = null; tied = [];
    result.hidden = true; tieForm.hidden = true; reset.hidden = true; form.hidden = false;
    document.querySelector('#share-status').textContent = '';
    document.querySelector('#manual-share').hidden = true;
    progress(); form.querySelector('input').focus();
  });
  document.querySelector('#copy-result').addEventListener('click', async () => {
    if (!current) return;
    const text = `I would be a ${creatures[current].name.toLowerCase()} in Cedar Hollow! Discover your supernatural side: https://ladycruellawinters-create.github.io/authur-website/cedar-quiz.html`;
    try {
      await navigator.clipboard.writeText(text);
      document.querySelector('#share-status').textContent = 'Copied! Your result and quiz link are ready to share.';
    } catch {
      document.querySelector('#manual-share').hidden = false;
      const area = document.querySelector('#share-copy-text'); area.value = text; area.focus(); area.select();
      document.querySelector('#share-status').textContent = 'Select and copy the text below to share your result.';
    }
  });
  form.hidden = false; progress();
})();

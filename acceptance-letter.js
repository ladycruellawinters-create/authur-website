const nameForm = document.querySelector('#letter-name-form');
const nameInput = document.querySelector('#student-name');
const recipient = document.querySelector('#letter-recipient');
const letterStatus = document.querySelector('#letter-status');
function updateLetterName() {
  const name = nameInput.value.replace(/\s+/g, ' ').trim();
  recipient.textContent = name || 'future student';
}
nameInput.addEventListener('input', () => {
  updateLetterName();
  letterStatus.textContent = '';
});
nameForm.addEventListener('submit', event => {
  event.preventDefault();
  updateLetterName();
  letterStatus.textContent = 'Your letter is ready to print or save as a PDF.';
});
document.querySelector('#personalise-letter').disabled = false;
const printButton = document.querySelector('#print-letter');
printButton.disabled = false;
printButton.addEventListener('click', async () => {
  updateLetterName();
  try {
    await document.querySelector('.school-crest').decode();
    window.print();
  } catch {
    letterStatus.textContent = 'The school crest hasn’t loaded yet. Please refresh and try printing again.';
  }
});

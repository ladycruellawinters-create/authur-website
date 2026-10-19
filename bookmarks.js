const bookmarkChoices = [...document.querySelectorAll('[data-bookmark]')];
const sheets = document.querySelector('#bookmark-print-sheets');
const printButton = document.querySelector('#print-bookmarks');
const selectionStatus = document.querySelector('#bookmark-selection-status');
function updateBookmarkSelection() {
  const selected = bookmarkChoices.filter(choice => choice.checked);
  sheets.replaceChildren();
  for (let index = 0; index < selected.length; index += 3) {
    const sheet = document.createElement('section');
    sheet.className = 'bookmark-print-page';
    for (const choice of selected.slice(index, index + 3)) {
      const image = choice.closest('.bookmark-card').querySelector('img').cloneNode();
      image.loading = 'eager';
      sheet.append(image);
    }
    sheets.append(sheet);
  }
  selectionStatus.textContent = `${selected.length} bookmark${selected.length === 1 ? '' : 's'} selected.`;
  printButton.disabled = selected.length === 0;
}
bookmarkChoices.forEach(choice => choice.addEventListener('change', updateBookmarkSelection));
document.querySelector('#select-all-bookmarks').addEventListener('click', () => {
  bookmarkChoices.forEach(choice => { choice.checked = true; });
  updateBookmarkSelection();
});
document.querySelector('#clear-bookmarks').addEventListener('click', () => {
  bookmarkChoices.forEach(choice => { choice.checked = false; });
  updateBookmarkSelection();
});
printButton.addEventListener('click', async () => {
  printButton.disabled = true;
  try {
    await Promise.all([...sheets.querySelectorAll('img')].map(image => image.decode()));
    window.print();
  } catch {
    selectionStatus.textContent = 'One of the images hasn’t loaded yet. Please refresh and try again, or download the complete PDF.';
  } finally {
    printButton.disabled = !bookmarkChoices.some(choice => choice.checked);
  }
});
printButton.hidden = false;
document.querySelector('.selection-actions').hidden = false;
updateBookmarkSelection();

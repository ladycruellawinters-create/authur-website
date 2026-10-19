const printMenu = document.querySelector('#print-menu');
printMenu.hidden = false;
printMenu.addEventListener('click', async () => {
  await document.fonts.ready;
  window.print();
});

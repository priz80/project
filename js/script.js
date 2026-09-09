// 1. Восстановить порядок книг в aside.
const booksContainer = document.querySelector('.books');
const books = Array.from(booksContainer.querySelectorAll('.book'));

books.sort((a, b) => {
  const titleA = a.querySelector('h2').textContent.trim();
  const titleB = b.querySelector('h2').textContent.trim();
  
  const numA = parseInt(titleA.match(/\d+/)[0]);
  const numB = parseInt(titleB.match(/\d+/)[0]);
  
  return numA - numB;
});

booksContainer.innerHTML = '';
books.forEach(book => booksContainer.appendChild(book));

// 2. Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundPosition = "center";

// 3. Исправить заголовок в книге 3
const book3 = books.find(book => book.querySelector('h2').textContent.includes('Книга 3'));
if (book3) {
  const h2 = book3.querySelector('h2');
  h2.innerHTML = `
            <a href="${h2.querySelector('a').href}"
               target="_blank">Книга 3. this и Прототипы Объектов</a></h2>`;
}

// 4. Удалить рекламу со страницы
const promo = document.querySelector('.adv');
if (promo) {
  promo.remove();
}

// 5. Восстановить порядок глав во второй и пятой книге

const book2 = books.find(book => book.querySelector('h2').textContent.includes('Книга 1'));
const book5 = books.find(book => book.querySelector('h2').textContent.includes('Книга 5'));

function sortListItems(listElement) {
  if (!listElement) return;
  const items = Array.from(listElement.children);
  items.sort((a, b) => {
    const extractNum = (text) => {
      const match = text.match(/(Глава|Приложение|Предисловие|Введение)\s*(\d+|[IVX]+)?/i);
      if (!match) return 0;
      
      const type = match[1].toLowerCase();
      const numStr = match[2];
      
      let num = 0;
      if (numStr && /^[IVX]+$/.test(numStr)) {
         num = 0;
      } else if (numStr) {
         num = parseInt(numStr);
      } else {
         return -1; 
      }
      
      const typeOrder = { 'введение': 0, 'предисловие': 1, 'приложение': 2, 'глава': 3 };
      return typeOrder[type] !== undefined ? typeOrder[type] : 99;
    };
    
    const textA = a.textContent.trim();
    const textB = b.textContent.trim();
    
    const valA = extractNum(textA);
    const valB = extractNum(textB);
    
    if (valA === valB) {
       const numA = parseFloat(textA.match(/\d+/)?.[0]) || 0;
       const numB = parseFloat(textB.match(/\d+/)?.[0]) || 0;
       return numA - numB;
    }
    
    return valA - valB;
  });
  
  listElement.innerHTML = '';
  items.forEach(item => listElement.appendChild(item));
}

if (book2) {
  sortListItems(book2.querySelector('ul'));
}
if (book5) {
  sortListItems(book5.querySelector('ul'));
}

// 6. В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const book6 = books.find(book => book.querySelector('h2').textContent.includes('Книга 6'));
if (book6) {
  const ul = book6.querySelector('ul');
  const newChapter = document.createElement('li');
  newChapter.textContent = 'Глава 8: За пределами ES6';
  
  const appendixA = book6.querySelector('li').parentElement.querySelector('li').nextElementSibling; 
  const appendixATarget = Array.from(ul.children).find(li => li.textContent.includes('Приложение A'));
  
  if (appendixATarget) {
    ul.insertBefore(newChapter, appendixATarget);
  } else {
    ul.appendChild(newChapter);
  }
}
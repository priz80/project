  function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;

    this.render = function (text) {
      let el;

      if (this.selector[0] === '.') {
        el = document.createElement('div');
        el.className = this.selector.slice(1);
      } else if (this.selector[0] === '#') {
        el = document.createElement('p');
        el.id = this.selector.slice(1);
      } else {
        console.error('selector должен начинаться с "." или "#"');
        return;
      }

      el.style.cssText = `
        height: ${this.height};
        width: ${this.width};
        background: ${this.bg};
        font-size: ${this.fontSize};
      `;

      el.textContent = text;

      document.body.appendChild(el);
      return el;
    };
  }

  const block = new DomElement('.block', '150px', '300px', 'lightcoral', '20px');
  const paragraph = new DomElement('#best', '100px', '250px', 'lightblue', '16px');

  block.render('Это div с классом "block"');
  paragraph.render('Это параграф с id "best"');

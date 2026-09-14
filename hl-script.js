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

    if (text) {
      el.textContent = text;
    }

    document.body.appendChild(el);
    return el;
  };
}

document.addEventListener('DOMContentLoaded', function () {
  const squareObj = new DomElement('#square', '100px', '100px', 'coral', '16px');
  const square = squareObj.render();

  square.style.position = 'absolute';
  square.style.top = '0px';
  square.style.left = '0px';

  const step = 10;

  function addKeydownHandler(callback) {
    document.addEventListener('keydown', callback);
  }

  addKeydownHandler(function (event) {
    const currentTop = parseInt(square.style.top, 10) || 0;
    const currentLeft = parseInt(square.style.left, 10) || 0;

    switch (event.key) {
      case 'ArrowUp':
        square.style.top = (currentTop - step) + 'px';
        break;
      case 'ArrowDown':
        square.style.top = (currentTop + step) + 'px';
        break;
      case 'ArrowLeft':
        square.style.left = (currentLeft - step) + 'px';
        break;
      case 'ArrowRight':
        square.style.left = (currentLeft + step) + 'px';
        break;
    }
  });
});

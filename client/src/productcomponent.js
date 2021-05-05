export class ProductComponent {
  element = null;
  nowNumber = 0;
  constructor(information) {
    this.element = document.createElement("div");
    this.element.setAttribute("class", "product");

    this.title = document.createElement("h1");
    this.title.setAttribute("class", "title");
    this.title.textContent = information.title;

    this.info = document.createElement("div");
    this.info.setAttribute("class", "detail");
    this.info.textContent = information.detail;

    this.img = document.createElement("div");
    this.img.setAttribute("class", "img");
    this.img.textContent = "사진";

    this.number = document.createElement("div");
    this.number.setAttribute("class", "number");
    this.number.textContent = `${information.number}명`;

    this.maxnum = information.number;
    this.nowNumber = 1;

    this.currentNumber = document.createElement("span");
    this.currentNumber.setAttribute("class", "current__number");
    this.currentNumber.textContent = this.nowNumber;

    this.button = document.createElement("button");
    this.button.setAttribute("class", "enter");
    this.button.value = "참가하기";
    this.button.style.backgroundColor = "red";

    this.date = document.createElement("div");
    this.date.setAttribute("class", "date");
    this.date.textContent = information.date;

    this.number.append(this.currentNumber);
    this.number.append(this.button);
    this.element.append(this.title);
    this.element.append(this.img);
    this.element.append(this.info);

    this.element.append(this.number);
    this.element.append(this.date);
  }

  attachTo(parent, position = "beforeend") {
    parent.insertAdjacentElement(position, this.element);
  }
}

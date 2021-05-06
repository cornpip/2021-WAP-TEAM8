export class ProductInformation {
  constructor(information) {
    this.title = information.title;
    this.detail = information.detail;
    this.number = information.number;
    this.participant = 1;
    this.date = information.date;
    this.state = "진행중";
  }
  get participant() {
    return this._participant;
  }

  set participant(value) {
    this._participant = value < 1 ? 1 : value;
  }

  insertToHTMl() {
    const product = this.makeHTMLElement("div", "product");
    const title = this.makeHTMLElement("h1", "title", this.title);
    const detail = this.makeHTMLElement("div", "detail", this.detail);
    const number = this.makeHTMLElement("div", "number", this.number);
    const participant = this.makeHTMLElement(
      "span",
      "participant",
      this.participant
    );
    const participateBtn = this.makeHTMLElement("input", "participateBtn");
    participateBtn.type = "button";
    participateBtn.value = "참가할게요";
    const date = this.makeHTMLElement("div", "date", this.date);
    number.append(participant);
    product.append(title, detail, number, date, participateBtn);
    return product;
  }

  makeHTMLElement(tagname, classname, innertext) {
    const html = document.createElement(tagname);
    html.setAttribute("class", classname);
    if (innertext) html.textContent = innertext;
    return html;
  }

  attachTo(parentNode, product) {
    this.element = parentNode.appendChild(product);
  }

  participateTo(participant) {
    const pnumber = parseInt(participant.innerText);
    const number = parseInt(this.number);
    pnumber < number
      ? (participant.innerText = String(++this.participant))
      : alert("꽉 찼습니다.");
  }
}

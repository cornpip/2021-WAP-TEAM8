export class ProductInformation {
  constructor(information) {
    this.title = information.title;
    this.detail = information.detail;
    this.number = information.inguser;
    this.participant = 1;
    this.date = information.date;
    this.state = "진행중";
    this.id = information.id;
  }

  get participant() {
    return this._participant;
  }

  set participant(value) {
    this._participant = value < 1 ? 1 : value;
  }

  insertToHTMl() {
    const product = this.makeHTMLElement("div", "product");
    const title = this.makeHTMLElement("h4", "title", this.title);
    const detail = this.makeHTMLElement("div", "detail", this.detail);
    const number = this.makeHTMLElement("div", "number", `${this.number}명`);
    const participant = this.makeHTMLElement(
      "span",
      "participant",
      `${this.participant}명`
    );
    const participateBtn = this.makeHTMLElement("input", "participateBtn");
    participateBtn.setAttribute("id", this.id);

    const image = this.makeHTMLElement("img", "image");

    const top = this.makeHTMLElement("div", "top");
    const middle = this.makeHTMLElement("div", "middle");
    const bottom = this.makeHTMLElement("div", "bottom");

    top.append(image);

    const content = this.makeHTMLElement("div", "content");
    const locate = this.makeHTMLElement("div", "locate", "대연동");

    content.append(title, detail);
    middle.append(content, locate);

    image.setAttribute("src", `/image/${this.id}`);
    console.log(`/image/${this.id}`);
    // image.setAttribute("src", `./image/${this.id}`);

    participateBtn.type = "button";
    participateBtn.value = "참가할게요";

    const ing = this.makeHTMLElement("div", "ing");
    ing.append(number, participant);

    bottom.append(participateBtn, ing);

    // const date = this.makeHTMLElement("div", "date", this.date);
    product.append(top, middle, bottom);
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
    console.log("click...", pnumber, number);
    pnumber < number
      ? (participant.innerText = String(++this.participant))
      : alert("꽉 찼습니다.");
  }
}

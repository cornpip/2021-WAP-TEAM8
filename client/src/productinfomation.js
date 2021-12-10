export class ProductInformation {
  constructor(information, needToPt = false) {
    this.title = information.title;
    this.detail = information.detail;
    if (!needToPt) {
      const titleLen = information.title.length;
      const detaillen = information.detail.length;
      if (titleLen > 11) {
        this.title = information.title.slice(0, 7) + "...";
      }
      if (detaillen > 26) {
        this.detail = information.detail.slice(0, 22) + "...";
      }
    }
    this.number = information.inguser;
    this.participant = information.nowuser;
    this.date = information.date;
    this.state = "진행중";
    this.id = information.id;
    this.place = information.place;
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
    const place = this.makeHTMLElement("div", "locate", this.place);

    content.append(title, place);
    middle.append(content, detail);

    let host = `http://118.223.255.68:5000/image/${this.id}`
    let local =  `http://localhost:5000/image/${this.id}`
    image.setAttribute("src", host);
    // image.setAttribute("src", `./image/${this.id}`);

    participateBtn.type = "button";
    participateBtn.value = "참가할게요";

    const ing = this.makeHTMLElement("div", "ing");
    ing.append(participant, "/", number);

    bottom.append(participateBtn,  ing);

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
}

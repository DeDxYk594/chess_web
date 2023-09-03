import * as me from "https://esm.run/melonjs@10.5";
import { viewportSize } from "./constants.js";

const scaleFactor = viewportSize / 700;
const luPoint = { x: 70 * scaleFactor, y: 70 * scaleFactor };
const boardSize = 560 * scaleFactor;

let boardImage = new Image();
boardImage.src = "assets/board.jpg";

let piecesImage = new Image();
piecesImage.src = "assets/pieces.png";

let figureUp = false;
let upFigurePos = null;

export class Board extends me.Renderable {
  constructor(x, y) {
    super(x, y, viewportSize, viewportSize);
    this.anchorPoint = (0, 0);
  }

  update(dt) {
    super.update(dt);
    return true;
  }

  draw(renderer) {
    if (figureUp) {
      let x = Math.round((upFigurePos.x - luPoint.x) / boardSize);
      let y = Math.round((upFigurePos.y - luPoint.y) / boardSize);
      console.log(x,y)
      renderer.setColor("green");
      let step = boardSize / 8;
      renderer.fillRect(luPoint.x + x * step, luPoint.y + y * step, step, step);
    }
    renderer.drawImage(boardImage, -1, -1, viewportSize, viewportSize);
    renderer.setColor("#ff0000");

    renderer.strokeRect(luPoint.x, luPoint.y, boardSize, boardSize);
  }
}

export class ChessPiece extends me.Draggable {
  constructor(x, y, settings) {
    super(x, y, settings.width, settings.height);
    this.dragged = true;
  }

  update(dt) {
    super.update(dt);
    return true;
  }

  draw(renderer) {
    let sz = Math.floor((20 * viewportSize) / 600); //TODO deprecated replace to scale factor

    renderer.drawImage(
      piecesImage,
      0,
      0,
      200,
      300,
      this.pos.x,
      this.pos.y,
      2 * sz,
      3 * sz
    );
  }

  dragStart(e) {
    super.dragStart(e);
    figureUp = true;
    upFigurePos = this.pos;
  }
  dragEnd(e) {
    super.dragEnd(e);
    figureUp = false;
  }
}

export class DropTarget extends me.DropTarget {
  /**
   * constructor
   */
  constructor(x, y, settings) {
    // call the parent constructor
    super(x, y, settings.width, settings.height);
    // set the color to white
    this.color = "red";
    // set the font we want to use
    this.font = new me.Text(0, 0, {
      font: "Verdana",
      size: 15,
      fillStyle: "black",
    });

    this.font.bold();
    // set the text
    this.text = 'Drop on me\n\nAnd I"ll turn green\n\ncheckmethod: overlap';
  }
  /**
   * update function
   */
  update(dt) {
    super.update(dt);
    return true;
  }
  /**
   * draw the square
   */
  draw(renderer) {}
  /**
   * drop overwrite function
   */
  drop(e) {
    // call the super function
    super.drop(e);
    // save a reference to this to use in the timeout
    var self = this;
    // indicate a succesful drop
    this.color = "green";
    // set the color back to red after a second
    window.setTimeout(function () {
      self.color = "red";
    }, 1000);
  }
}

export class DropTarget2 extends DropTarget {
  /**
   * constructor
   */
  constructor(x, y, settings) {
    // call the super constructor
    super(x, y, settings);
    // set the color to white
    this.color = "red";
    // set the font we want to use
    this.font = new me.Text(0, 0, {
      font: "Verdana",
      size: 15,
      fillStyle: "black",
    });
    this.font.bold();
    // set the text
    this.text = 'Drop on me\n\nAnd I"ll turn green\n\ncheckmethod: contains';
    // set the check method to "contains" (default is "overlap")
    this.setCheckMethod(this.CHECKMETHOD_CONTAINS);
  }
}

import * as me from "https://esm.run/melonjs@10.5";
import { viewportSize } from "./constants.js";

const scaleFactor = viewportSize / 700;
const luPoint = { x: 70 * scaleFactor, y: 70 * scaleFactor };
const boardSize = 560 * scaleFactor;
const step = boardSize / 8;
const shrinkX = 0.7,
  shrinkY = 1;

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
    renderer.drawImage(boardImage, -1, -1, viewportSize, viewportSize);
    renderer.setColor("#ff0000");

    renderer.strokeRect(luPoint.x, luPoint.y, boardSize, boardSize);
    if (figureUp) {
      let x = Math.ceil((8 * (upFigurePos.x - luPoint.x)) / boardSize) - 1;
      let y = Math.ceil((8 * (upFigurePos.y - luPoint.y)) / boardSize) - 1;
      renderer.setColor("green");
      renderer.fillRect(luPoint.x + x * step, luPoint.y + y * step, step, step);
    }
  }
}

export class ChessPiece extends me.Draggable {
  constructor(x, y, settings) {
    super(x, y, step, step);
    
    this.placeToPos(0,4)
  }

  update(dt) {
    super.update(dt);
    return true;
  }

  draw(renderer) {
    renderer.drawImage(
      piecesImage,
      14,
      50,
      180,
      270,
      this.pos.x + (step-step * shrinkX) / 2,
      this.pos.y + (step-step * shrinkY) / 2,
      step * shrinkX,
      step * shrinkY
    );

    /*renderer.setColor("green");renderer.strokeRect(this.pos.x, this.pos.y, this.width, this.height);*/
  }

  dragStart(e) {
    this.pos.x=e.clientX
    this.pos.y=e.clientY
    super.dragStart(e);
    figureUp = true;
    upFigurePos = this.pos;
  }

  placeToPos(x, y) {
    this.pos.x = luPoint.x + x * step + 33 * scaleFactor;
    this.pos.y = luPoint.y + y * step + 34 * scaleFactor;
  }

  dragEnd(e) {
    super.dragEnd(e);
    figureUp = false;
    let x = Math.ceil((8 * (upFigurePos.x - luPoint.x)) / boardSize) - 1;
    let y = Math.ceil((8 * (upFigurePos.y - luPoint.y)) / boardSize) - 1;
    this.placeToPos(x, y);
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

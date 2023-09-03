import * as me from "https://esm.run/melonjs@10.5";
import { ChessPiece, DropTarget, DropTarget2, Board } from "./render.js";
import { viewportSize } from "./constants.js";
import 

me.device.onReady(function () {
  // Initialize the video.
  if (
    !me.video.init(viewportSize-2, viewportSize-2, {
      scale: "auto",
      renderer: me.video.CANVAS,
    })
  ) {
    alert("Your browser does not support HTML5 canvas.");
    return;
  }

  // clear the background
  me.game.world.addChild(new Board(0, 0), 0);

  // add a few squares
  me.game.world.addChild(new ChessPiece(100, 100, { width: 100, height: 100 }), 1);

});

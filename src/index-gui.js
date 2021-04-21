import React from "react";
import GuiRenderer from "./renderer-gui";
import App from "./App";
import gui from "gui";

console.log("-------------------------------------------");
console.log("GuiRenderer", GuiRenderer);
console.log("-------------------------------------------");

const win = gui.Window.create({});
win.setContentSize({ width: 400, height: 400 });
win.center();
win.activate();

GuiRenderer.render(<App />, win);
if (!process.versions.yode) {
  gui.MessageLoop.run();
  process.exit(0);
}

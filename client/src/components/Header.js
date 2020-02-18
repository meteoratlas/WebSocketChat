import React, { useRef, useState } from "react";
import P5Wrapper from "react-p5-wrapper";

const Header = props => {
  function sketch(p) {
    p.setup = function() {
      p.createCanvas(1000, 200);
      p.background(40);
      p.fill(255);
      p.textFont("Lato");
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(64);
      p.text("Chat Program", p.width / 2, p.height / 2);
      p.stroke(255);
      p.strokeWeight(2);
      p.strokeCap(p.ROUND);
    };
    p.mouseDragged = function() {
      if (p.mouseIsPressed === true) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
      const mouseMove = {
        cx: p.mouseX,
        cy: p.mouseY,
        px: p.pmouseX,
        py: p.pmouseY
      };
      props.io.emit("onDraw", mouseMove);
    };
    props.io.on("reportDraw", ({ cx, cy, px, py }) => {
      p.line(cx, cy, px, py);
    });
  }

  return (
    <header>
      <P5Wrapper id="p5-wrapper" sketch={sketch} />
    </header>
  );
};

export default Header;

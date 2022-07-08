import * as THREE from "three";
import { Vector3 } from "three";

export default class WaterTexture {
  constructor({ debug, context }) {
    this.size = 64;
    this.width = this.height = this.size;
    this.points = []; // stores ripples
    this.radius = this.size * 0.1; //max size of ripples
    this.maxAge = 64;
    this.ctx = context;
    this.texture = new THREE.Texture(this.ctx.canvas);

    if (debug) {
      this.width = this.ctx.canvas.width;
      this.height = this.ctx.canvas.height;
      this.radius = this.width * 0.05;
    }
    if (!debug) document.querySelector("canvas").style.display = "none";
  }

  addPoint(point) {
    this.points.push({ x: point.x, y: point.y, age: 0 });
  }

  drawPoint(point) {
    //convert normalized position into canvas coord
    let pos = {
      x: point.x * this.width,
      y: point.y * this.height,
    };
    const radius = this.radius;

    //calc intensity based on age
    const pointIntensity = 1 - point.age / this.maxAge;

    //encode onto color channels
    const r = ((point.x + 1) / 2) * 255;
    const g = ((point.y + 1) / 2) * 255;
    const b = pointIntensity * 255;
    const color = `${r}, ${g}, ${b}`;

    //use shadow instead of gradient to fill it smooth. See difference here : https://stackoverflow.com/questions/10060242/html5-canvas-globalcompositeoperation-for-overlaying-gradients-not-adding-up-to/10166995#10166995
    const offset = this.width * 5;
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = radius * 1;
    this.ctx.shadowColor = `rgba(${color},${0.2 * pointIntensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  update() {
    this.clear();
    this.texture.needsUpdate = true;
    this.points = this.points.filter((point) => point.age < this.maxAge);
    this.points.forEach((point) => {
      point.age += 1;
      this.drawPoint(point);
    });
  }
}

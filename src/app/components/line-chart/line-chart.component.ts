import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { LineChartData } from '../../models/line-chart-data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  elementHeight!: number;
  elementWidth!: number;
  axisXStepLength!: number;
  axisXStepWidth!: number;
  curveViewBox: any = { x: 0, y: 0, w: 0, h: 0 };
  curve!: any;
  separators: any[] = [];
  axisYLabels: any[] = [];
  axisXLabels: any[] = [];
  axisXSecLabels: any[] = [];
  label: string = '';
  values: any[] = [];
  protected _index: number = 0;
  maxIndex: number = 0;
  dataModel!: LineChartData;
  color!: string;

  constructor(private cdRef: ChangeDetectorRef) { }

  @ViewChild('chartRender') elementView!: ElementRef;

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.update();
  }

  onResized(event: any): void {
    this.update();
  }

  get index() {
    return this._index;
  }

  set index(value: number) {
    this._index = Math.min(this.dataModel.values.length - this.axisXStepLength, Math.max(value, 0));
  }

  prev() {
    this.index = Math.max(this.index - this.axisXStepLength, 0);
    this.updateChart();
  }

  next() {
    this.index = Math.min(this.index + this.axisXStepLength, this.dataModel.values.length - this.axisXStepLength);
    this.updateChart();
  }

  isStart() {
    return this.index <= 0;
  }

  isEnd() {
    return this.index >= this.maxIndex;
  }

  initialize(dataModel: LineChartData) {
    this._index = 0;
    this.dataModel = dataModel;
    this.update();
  }

  update() {
    if (this.elementView !== undefined) {
      this.updateElement();
      this.updateCurveViewBox();
      this.updateChart();
      this.cdRef.detectChanges();
    }
  }

  private updateElement() {
    let rect = this.elementView.nativeElement.getBoundingClientRect();
    this.elementWidth = rect.width;
    this.elementHeight = rect.height;
  }

  private updateCurveViewBox() {
    let axesWidth = 48,
      marginTop = 8;

    //this.curveViewBox.x = axesWidth;
    //this.curveViewBox.y = marginTop;
    //this.curveViewBox.w = this.elementWidth - axesWidth;
    //this.curveViewBox.h = this.elementHeight - axesWidth - marginTop;
    this.curveViewBox.x = 1;
    this.curveViewBox.y = marginTop;
    this.curveViewBox.w = this.elementWidth - 1;
    this.curveViewBox.h = this.elementHeight - axesWidth - marginTop;
  }

  private updateChart() {
    if (this.dataModel !== undefined) {
      this.updateSteps();
      this.updateIndex();
      this.solveValueLabels();
      this.solveAxesLabels();
      this.solveSeparators();
      this.solveCurve(this.dataModel.values);
    }
  }

  private updateSteps() {
    let minXStepWidth = this.curveViewBox.w > 600 ? 90 : 60;
    this.axisXStepLength = Math.min(this.dataModel.values.length, Math.floor(this.curveViewBox.w / minXStepWidth));
    this.axisXStepWidth = this.curveViewBox.w / this.axisXStepLength;
  }

  private updateIndex() {
    this.maxIndex = this.dataModel.values.length - this.axisXStepLength;
  }

  private solveAxesLabels() {
    let min = Math.ceil(this.dataModel.min / this.dataModel.step + this.dataModel.offset) * this.dataModel.step;

    this.label = this.dataModel.label;
    this.color = this.dataModel.style;

    this.axisYLabels = [];
    for (let i = 0, j = min; j <= this.dataModel.max - this.dataModel.offset; i++, j += this.dataModel.step) {
      let p = this.positionTransform(-8, j);
      p.y += 5;
      this.axisYLabels[i] = {
        position: p,
        value: j
      }
    }

    this.axisXLabels = [];
    for (let i = 0; i < this.axisXStepLength; i++) {
      this.axisXLabels[i] = {
        position: {
          x: this.curveViewBox.x + i * this.axisXStepWidth + 6,
          y: this.curveViewBox.y + this.curveViewBox.h + 5
        },
        value: this.dataModel.values[this.index + i].label
      }
    }

    this.axisXSecLabels = [];
    for (let i = 0; i < this.axisXStepLength; i++) {
      this.axisXSecLabels[i] = {
        position: {
          x: this.curveViewBox.x + i * this.axisXStepWidth + 6,
          y: this.curveViewBox.y + this.curveViewBox.h + 5 + 20
        },
        value: this.dataModel.values[this.index + i].secLabel
      }
    }
  }

  private solveValueLabels() {
    this.values = [];
    for (let i = 0; i < this.axisXStepLength; i++) {
      let p = this.positionTransform(i * this.axisXStepWidth, this.dataModel.values[this.index + i].value);
      this.values[i] = {
        position: {
          x: p.x + 6,
          y: p.y - 8
        },
        value: this.dataModel.values[this.index + i].value
      }
    }
  }

  private solveSeparators() {
    this.separators = [];
    for (let i = 0; i < this.axisXStepLength + 1; i++) {
      this.separators[i] = {
        x: this.curveViewBox.x + i * this.axisXStepWidth - 1,
        y: 0,
        w: 1,
        h: this.curveViewBox.y + this.curveViewBox.h
      };
    }
  }

  private solveCurve(values: any[]) {
    let w = this.axisXStepWidth,
      l =  this.axisXStepLength,
      v0 = this.positionTransform(0, values[this.index].value),
      path = `M ${v0.x} ${v0.y} `;

    for (let i = 0; i < l; i++) {
      let ni = this.index + i < values.length - 1 ? i + 1 : i,
        v = values[this.index + i].value,
        nv = values[this.index + ni].value,
        v1 = this.positionTransform(this.lerp(w * i, w * (i + 1), .5), v),
        v2 = this.positionTransform(this.lerp(w * i, w * (i + 1), .5), nv),
        v3 = this.positionTransform(this.lerp(w * i, w * (i + 1), 1), nv);

      path += `C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${v3.x} ${v3.y} `;
    }

    this.curve = {
      'fill': `${path}V ${this.curveViewBox.h} H ${this.curveViewBox.x} Z`,
      'stroke': `${path}`
    }
  }

  private positionTransform(x: number, y: number) {
    let s = this.curveViewBox.h / (this.dataModel.max - this.dataModel.min);
    return {
      x: this.curveViewBox.x + x,
      y: this.curveViewBox.y + this.curveViewBox.h + (this.dataModel.min - y) * s
    }
  }

  private lerp(min: number, max: number, t: number) {
    return min + (max - min) * t;
  }
}

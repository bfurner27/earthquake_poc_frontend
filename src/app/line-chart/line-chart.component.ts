import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';

declare let Plotly: any;

export interface Coordinate {
  x: number,
  y: number,
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  @Input({ required: true }) coordinates!: Array<Coordinate>;
  @Input() title?: string;
  @Input() xTitle?: string;
  @Input() yTitle?: string;
  @ViewChild('chartRef') chartRef?: ElementRef;

  plotLineWait: number = 0;

  ngOnInit() {
    this.plotLine()
  }

  plotLine() {
    if (this.chartRef === undefined) {
      setTimeout(() => {
        ++this.plotLineWait;
        if (this.plotLineWait++ < 5) {
          this.plotLine();
        } else {
          console.error("Unable to display the plotly chart")
        }
      });
      return;
    }

    let x: number[] = this.coordinates.map((o) => o.x)
    let y: number[] = this.coordinates.map((o) => o.y)

    let trace = {
      x: x,
      y: y,
      type: 'scatter'
    };

    let layout = {
      title: this.title,
      font: {
        family: 'Source Sans 3',
      },
      margin: {
        t: 0,
        l: 50,
        b: 50,
        r: 0,
      },
      xaxis: {
        title: this.xTitle,
        font: {
          family: 'Source Sans 3',
        }
      },
      yaxis: {
        title: this.yTitle,
        font: {
          family: 'Source Sans 3',
        }
      }
    };

    let config = {
      displayModeBar: false,
    }

    Plotly?.newPlot(this.chartRef.nativeElement, [trace], layout, config);
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.plotLine()
  }
}

import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable, Subject } from 'rxjs';
import { ChartService } from '../services/chart.service';
import { IUser } from '../models/User';
import { IChartItem } from '../models/ChartItem';

@Component({
    selector: 'crypto',
  templateUrl: './crypto.component.html'
})
export class CryptoComponent implements OnInit {
    chart: any = null;
    constructor(private service: ChartService) {

    }

    renderGraph(): void {
        this.service.getCryptoData().subscribe(data => {
            this.chart = new Chart({
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Top 6 Crypto Performer in 2018'
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                },
            });
            series: []
            this.chart.options.series = data;
        }, error => {
            alert(JSON.stringify(error));
        });
    };

    ngOnInit(): void {
        this.renderGraph();
    }
}

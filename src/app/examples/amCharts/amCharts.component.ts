import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

let data = [{
  "year": "2016",
  "income": 23.5,
  "expenses": 21.1
}, {
  "year": "2017",
  "income": 26.2,
  "expenses": 30.5
}, {
  "year": "2018",
  "income": 30.1,
  "expenses": 34.9
}, {
  "year": "2019",
  "income": 29.5,
  "expenses": 31.1
}, {
  "year": "2020",
  "income": 30.6,
  "expenses": 28.2,
  "lineDash": "5,5",
}, {
  "year": "2021",
  "income": 34.1,
  "expenses": 32.9,
  "strokeWidth": 1,
  "columnDash": "5,5",
  "fillOpacity": 0.2,
  "additional": "(projection)"
}];

@Component({
  selector: 'app-amCharts',
  templateUrl: './amCharts.component.html',
  styleUrls: ['./amCharts.component.css']
})
export class AmChartsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.chartOne();
    this.chartThree();
    this.chartTwo();
  }

  chartOne() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];

    let label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = "right";
    label.verticalCenter = "middle";
    label.dx = -15;
    label.fontSize = 50;

    let playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = "middle";
    playButton.events.on("toggled", function (event) {
      if (event.target.isActive) {
        play();
      }
      else {
        stop();
      }
    }
    )

    let stepDuration = 4000;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "right";
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.label.textAlign = "end";
    labelBullet.label.dx = -10;

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    let year = 2003;
    label.text = year.toString();

    let interval;

    function play() {
      interval = setInterval(function () {
        nextYear();
      }, stepDuration)
      nextYear();
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
      }
    }

    function nextYear() {
      year++

      if (year > 2018) {
        year = 2003;
      }

      let newData = allData[year];
      let itemsWithNonZero = 0;
      for (var i = 0; i < chart.data.length; i++) {
        chart.data[i].MAU = newData[i].MAU;
        if (chart.data[i].MAU > 0) {
          itemsWithNonZero++;
        }
      }

      if (year == 2003) {
        series.interpolationDuration = stepDuration / 4;
        valueAxis.rangeChangeDuration = stepDuration / 4;
      }
      else {
        series.interpolationDuration = stepDuration;
        valueAxis.rangeChangeDuration = stepDuration;
      }

      chart.invalidateRawData();
      label.text = year.toString();

      categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
    }

    categoryAxis.sortBySeries = series;

    let allData = {
      "2003": [
        {
          "network": "Facebook",
          "MAU": 0
        },
        {
          "network": "Flickr",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },

        {
          "network": "Friendster",
          "MAU": 4470000
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 0
        },
        {
          "network": "Orkut",
          "MAU": 0
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 0
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 0
        },
        {
          "network": "WeChat",
          "MAU": 0
        },
        {
          "network": "Weibo",
          "MAU": 0
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 0
        }
      ],
      "2004": [
        {
          "network": "Facebook",
          "MAU": 0
        },
        {
          "network": "Flickr",
          "MAU": 3675135
        },
        {
          "network": "Friendster",
          "MAU": 5970054
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 980036
        },
        {
          "network": "Orkut",
          "MAU": 4900180
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 0
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 0
        },
        {
          "network": "WeChat",
          "MAU": 0
        },
        {
          "network": "Weibo",
          "MAU": 0
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 0
        }
      ],
      "2005": [
        {
          "network": "Facebook",
          "MAU": 0
        },
        {
          "network": "Flickr",
          "MAU": 7399354
        },
        {
          "network": "Friendster",
          "MAU": 7459742
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 9731610
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 19490059
        },
        {
          "network": "Orkut",
          "MAU": 9865805
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 0
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 0
        },
        {
          "network": "WeChat",
          "MAU": 0
        },
        {
          "network": "Weibo",
          "MAU": 0
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 1946322
        }
      ],
      "2006": [
        {
          "network": "Facebook",
          "MAU": 0
        },
        {
          "network": "Flickr",
          "MAU": 14949270
        },
        {
          "network": "Friendster",
          "MAU": 8989854
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 19932360
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 54763260
        },
        {
          "network": "Orkut",
          "MAU": 14966180
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 248309
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 0
        },
        {
          "network": "WeChat",
          "MAU": 0
        },
        {
          "network": "Weibo",
          "MAU": 0
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 19878248
        }
      ],
      "2007": [
        {
          "network": "Facebook",
          "MAU": 0
        },
        {
          "network": "Flickr",
          "MAU": 29299875
        },
        {
          "network": "Friendster",
          "MAU": 24253200
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 29533250
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 69299875
        },
        {
          "network": "Orkut",
          "MAU": 26916562
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 488331
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 0
        },
        {
          "network": "WeChat",
          "MAU": 0
        },
        {
          "network": "Weibo",
          "MAU": 0
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 143932250
        }
      ],
      "2008": [
        {
          "network": "Facebook",
          "MAU": 100000000
        },
        {
          "network": "Flickr",
          "MAU": 30000000
        },
        {
          "network": "Friendster",
          "MAU": 51008911
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 55045618
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 72408233
        },
        {
          "network": "Orkut",
          "MAU": 44357628
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 1944940
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 0
        },
        {
          "network": "WeChat",
          "MAU": 0
        },
        {
          "network": "Weibo",
          "MAU": 0
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 294493950
        }
      ],
      "2009": [
        {
          "network": "Facebook",
          "MAU": 276000000
        },
        {
          "network": "Flickr",
          "MAU": 41834525
        },
        {
          "network": "Friendster",
          "MAU": 28804331
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 57893524
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 70133095
        },
        {
          "network": "Orkut",
          "MAU": 47366905
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 3893524
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 0
        },
        {
          "network": "WeChat",
          "MAU": 0
        },
        {
          "network": "Weibo",
          "MAU": 0
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 413611440
        }
      ],
      "2010": [
        {
          "network": "Facebook",
          "MAU": 517750000
        },
        {
          "network": "Flickr",
          "MAU": 54708063
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 166029650
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 59953290
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 68046710
        },
        {
          "network": "Orkut",
          "MAU": 49941613
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 0
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 43250000
        },
        {
          "network": "WeChat",
          "MAU": 0
        },
        {
          "network": "Weibo",
          "MAU": 19532900
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 480551990
        }
      ],
      "2011": [
        {
          "network": "Facebook",
          "MAU": 766000000
        },
        {
          "network": "Flickr",
          "MAU": 66954600
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 170000000
        },
        {
          "network": "Google+",
          "MAU": 0
        },
        {
          "network": "Hi5",
          "MAU": 46610848
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 46003536
        },
        {
          "network": "Orkut",
          "MAU": 47609080
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 0
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 0
        },
        {
          "network": "Twitter",
          "MAU": 92750000
        },
        {
          "network": "WeChat",
          "MAU": 47818400
        },
        {
          "network": "Weibo",
          "MAU": 48691040
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 642669824
        }
      ],
      "2012": [
        {
          "network": "Facebook",
          "MAU": 979750000
        },
        {
          "network": "Flickr",
          "MAU": 79664888
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 170000000
        },
        {
          "network": "Google+",
          "MAU": 107319100
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 0
        },
        {
          "network": "MySpace",
          "MAU": 0
        },
        {
          "network": "Orkut",
          "MAU": 45067022
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 0
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 146890156
        },
        {
          "network": "Twitter",
          "MAU": 160250000
        },
        {
          "network": "WeChat",
          "MAU": 118123370
        },
        {
          "network": "Weibo",
          "MAU": 79195730
        },
        {
          "network": "Whatsapp",
          "MAU": 0
        },
        {
          "network": "YouTube",
          "MAU": 844638200
        }
      ],
      "2013": [
        {
          "network": "Facebook",
          "MAU": 1170500000
        },
        {
          "network": "Flickr",
          "MAU": 80000000
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 170000000
        },
        {
          "network": "Google+",
          "MAU": 205654700
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 117500000
        },
        {
          "network": "MySpace",
          "MAU": 0
        },
        {
          "network": "Orkut",
          "MAU": 0
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 0
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 293482050
        },
        {
          "network": "Twitter",
          "MAU": 223675000
        },
        {
          "network": "WeChat",
          "MAU": 196523760
        },
        {
          "network": "Weibo",
          "MAU": 118261880
        },
        {
          "network": "Whatsapp",
          "MAU": 300000000
        },
        {
          "network": "YouTube",
          "MAU": 1065223075
        }
      ],
      "2014": [
        {
          "network": "Facebook",
          "MAU": 1334000000
        },
        {
          "network": "Flickr",
          "MAU": 0
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 170000000
        },
        {
          "network": "Google+",
          "MAU": 254859015
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 250000000
        },
        {
          "network": "MySpace",
          "MAU": 0
        },
        {
          "network": "Orkut",
          "MAU": 0
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 135786956
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 388721163
        },
        {
          "network": "Twitter",
          "MAU": 223675000
        },
        {
          "network": "WeChat",
          "MAU": 444232415
        },
        {
          "network": "Weibo",
          "MAU": 154890345
        },
        {
          "network": "Whatsapp",
          "MAU": 498750000
        },
        {
          "network": "YouTube",
          "MAU": 1249451725
        }
      ],
      "2015": [
        {
          "network": "Facebook",
          "MAU": 1516750000
        },
        {
          "network": "Flickr",
          "MAU": 0
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 170000000
        },
        {
          "network": "Google+",
          "MAU": 298950015
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 400000000
        },
        {
          "network": "MySpace",
          "MAU": 0
        },
        {
          "network": "Orkut",
          "MAU": 0
        },
        {
          "network": "Pinterest",
          "MAU": 0
        },
        {
          "network": "Reddit",
          "MAU": 163346676
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 475923363
        },
        {
          "network": "Twitter",
          "MAU": 304500000
        },
        {
          "network": "WeChat",
          "MAU": 660843407
        },
        {
          "network": "Weibo",
          "MAU": 208716685
        },
        {
          "network": "Whatsapp",
          "MAU": 800000000
        },
        {
          "network": "YouTube",
          "MAU": 1328133360
        }
      ],
      "2016": [
        {
          "network": "Facebook",
          "MAU": 1753500000
        },
        {
          "network": "Flickr",
          "MAU": 0
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 398648000
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 550000000
        },
        {
          "network": "MySpace",
          "MAU": 0
        },
        {
          "network": "Orkut",
          "MAU": 0
        },
        {
          "network": "Pinterest",
          "MAU": 143250000
        },
        {
          "network": "Reddit",
          "MAU": 238972480
        },
        {
          "network": "Snapchat",
          "MAU": 238648000
        },
        {
          "network": "TikTok",
          "MAU": 0
        },
        {
          "network": "Tumblr",
          "MAU": 565796720
        },
        {
          "network": "Twitter",
          "MAU": 314500000
        },
        {
          "network": "WeChat",
          "MAU": 847512320
        },
        {
          "network": "Weibo",
          "MAU": 281026560
        },
        {
          "network": "Whatsapp",
          "MAU": 1000000000
        },
        {
          "network": "YouTube",
          "MAU": 1399053600
        }
      ],
      "2017": [
        {
          "network": "Facebook",
          "MAU": 2035750000
        },
        {
          "network": "Flickr",
          "MAU": 0
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 495657000
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 750000000
        },
        {
          "network": "MySpace",
          "MAU": 0
        },
        {
          "network": "Orkut",
          "MAU": 0
        },
        {
          "network": "Pinterest",
          "MAU": 195000000
        },
        {
          "network": "Reddit",
          "MAU": 297394200
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 239142500
        },
        {
          "network": "Tumblr",
          "MAU": 593783960
        },
        {
          "network": "Twitter",
          "MAU": 328250000
        },
        {
          "network": "WeChat",
          "MAU": 921742750
        },
        {
          "network": "Weibo",
          "MAU": 357569030
        },
        {
          "network": "Whatsapp",
          "MAU": 1333333333
        },
        {
          "network": "YouTube",
          "MAU": 1495657000
        }
      ],
      "2018": [
        {
          "network": "Facebook",
          "MAU": 2255250000
        },
        {
          "network": "Flickr",
          "MAU": 0
        },
        {
          "network": "Friendster",
          "MAU": 0
        },
        {
          "network": "Google Buzz",
          "MAU": 0
        },
        {
          "network": "Google+",
          "MAU": 430000000
        },
        {
          "network": "Hi5",
          "MAU": 0
        },
        {
          "network": "Instagram",
          "MAU": 1000000000
        },
        {
          "network": "MySpace",
          "MAU": 0
        },
        {
          "network": "Orkut",
          "MAU": 0
        },
        {
          "network": "Pinterest",
          "MAU": 246500000
        },
        {
          "network": "Reddit",
          "MAU": 355000000
        },
        {
          "network": "Snapchat",
          "MAU": 0
        },
        {
          "network": "TikTok",
          "MAU": 500000000
        },
        {
          "network": "Tumblr",
          "MAU": 624000000
        },
        {
          "network": "Twitter",
          "MAU": 329500000
        },
        {
          "network": "WeChat",
          "MAU": 1000000000
        },
        {
          "network": "Weibo",
          "MAU": 431000000
        },
        {
          "network": "Whatsapp",
          "MAU": 1433333333
        },
        {
          "network": "YouTube",
          "MAU": 1900000000
        }
      ]
    }

    chart.data = JSON.parse(JSON.stringify(allData[year]));
    categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

    series.events.on("inited", function () {
      setTimeout(function () {
        playButton.isActive = true; // this starts interval
      }, 2000)
    })
  }

  chartThree() {
    let chart = am4core.create("chartdiv3", am4charts.XYChart);
    chart.exporting.menu = new am4core.ExportMenu();

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Expenses";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;
  }

  chartTwo() {
    // Define icons
    let icon1 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTc2IiBoZWlnaHQ9Ijg4OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNODcuODIuMDY2djc2LjQzNmwtNC4wNjUgMi45ODR2NjUuNDE4bC0yLjkwNCAzLjQ0My0uNzc0IDYzLjEyMy01LjIyOCA1LjczOHY2MS45NzVsLTIuMzIzIDQuODItLjc3NCAxNzguNTgtOS42OCAyLjI5Ni0uNzc1IDEyOC41NC05LjEgMy4yMTR2MTE5LjU4OWwtNS42MTQgMS4xNDgtLjc3NCA4NC4wMS03LjU1IDEuMTQ4djQ5LjM1aC04LjMyNnYxMS4wMThoLTYuOTd2OC4yNjRILjd2MjAuNjU4aDE3NC40MzdWODcxLjE2aC0xNy40MjR2LTguMjY0aC0xMS4yM3YtOS42NGwtNy4zNTYtLjIzLS45NjgtNzMuNjgxLTcuNTUtLjkxOC45NjctOTguOTMtNy45MzgtMS44MzctLjc3NC0xMjIuMTE0LTYuOTctMS44MzYtMS4zNTUtMTM4LjE4Mi01LjYxNC03LjU3NFYzMDcuMTg3bC02LjAwMi05LjQxMXYuMjMtMzkuOTRsLTQuMjYtMy42NzMtLjc3NC0zNi45NTVoLS45Njh2LTQ2LjU5NmwtMy44NzItNi44ODZ2LTYwLjEzOWwtMy42NzgtMi45ODQtLjM4OC0yMS4xMTdWLjA2NmgtMS4xNjF6IiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=";
    let icon2 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTAzIiBoZWlnaHQ9IjU3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAzIDU3Ny45VjI4OC41YzAtMS4xLTEuMi0yLjEtMi4yLTIuMWgtOFYxODIuMWMwLTEtMS4xLTIuMS0yLjEtMi4xSDc0LjRWOTguNWMwLTEtMS0yLTIuMS0ySDU5LjJzLjEtMS45LjEtMy0xLjEtMS4xLTEuMS0xLjFWNDIuN2gtMi4xVjhoLTN2ODQuNGgtMlY0Ni44aC0xLjl2NDUuOEgzNC45di00N2gtMS4ydjQ2LjloLTIuOVYuNWgtNC4ydjkyaC01LjF2NGgtOC4xYy0xLjEgMC0yIDEtMiAydjE4OEgyLjJjLTEuMSAwLTIuMSAxLTIuMSAydjI4OS40SDEwM3oiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==";
    let icon3 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iODMiIGhlaWdodD0iNTU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zOS44Ljh2NTYuNWwtNS4xIDEuM3Y1aDN2M2gxLjh2MmgtMy44Yy0uOSAwLTIuMSAxLTIuMSAydjE2LjloLTRzLjkgMTUuOS45IDE2LjljMCAxIDEuMSAyIDIuMSAyaDF2MTYuOWgtNy4xYy0xIDAtMiAxLTIgMnY5aC04LjFjLTEuMSAwLTIgMS0yIDJ2MS45aC0ybDQuMSAzOC43aC0zbDMuOSAzNy45aC0zLjlsMy43IDM3LjdoLTMuOWw0LjQgMzcuN2gtNC4zbDMuOSAzNi44aC00bDQuMiAzNi45aC00LjNsNC40IDM4LjdoLTQuM2w0IDM5LjhzLTEuNy0uMS0yLjUgMGMtLjggMC0xLjEgMS4xLTEuMyAxLjgtLjIuNy0xMy4xIDExNS0xMy4xIDExNWw0MS0uMmguN2w0MSAuMlM3MC4yIDQ0NC45IDcwIDQ0NC4yYy0uMi0uNy0uNS0xLjgtMS4zLTEuOC0uOC0uMS0yLjUgMC0yLjUgMGw0LTM5LjhoLTQuM2w0LjQtMzguN0g2Nmw0LjItMzYuOWgtNGwzLjktMzYuOGgtNC4zbDQuNC0zNy43aC0zLjlsMy43LTM3LjdoLTMuOWwzLjktMzcuOWgtM2w0LjEtMzguN2gtMnYtMS45YzAtMS4xLS45LTItMi0ySDU5di05YzAtMS0xLTItMi0yaC03LjF2LTE2LjloMWMxIDAgMi4xLTEgMi4xLTJzLjktMTYuOS45LTE2LjloLTRWNzAuNmMwLTEtMS4xLTItMi4xLTJINDR2LTJoMS44di0zaDN2LTVsLTUuMS0xLjNWLjhoLTMuOXoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==";
    let icon4 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjQ5MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAuNy40djQwLjhoLTJ2NmgydjIuNWwtMSAzLjVoLTFjLTEgMC0yIDEtMiAydjJoLTFjLS45IDAtMiAxLTIgMnY1LjloLTFjLTEuMSAwLTIuMSAxLTIuMSAydjhoLTFjLTEgMC0yIDEtMiAyVjg2aC0xYy0xIDAtMi4xIDEtMi4xIDJ2MTYuOWgtMi4xYy0xIDAtMiAuOS0yIDJ2MjMuOWgtMmMtMSAwLTIgMS0yIDJ2NDAuN2gtMmMtMSAwLTIgMS0yIDJ2NTEuN2MwIC45LTIuMSAxLjItMi4xIDJ2MjY2LjJsMzEuOCAxaDFsMjguOC0uOWg1Ni4ybDI4LjguOWgxbDMxLjgtMVYyMjkuMmMwLS44LTIuMS0xLjEtMi4xLTJ2LTUxLjdjMC0xLTEtMi0yLTJoLTJ2LTQwLjdjMC0uOS0xLjEtMi0yLjEtMmgtMnYtMjMuOWMwLTEtMS4xLTItMi0yaC0yLjFWODhjMC0xLTEtMi0yLjEtMmgtMXYtOC45YzAtMS0xLTItMi0yaC0xdi04YzAtMS0xLTItMi0yaC0xLjF2LTUuOWMwLTEtMS4xLTItMi0yaC0xdi0yYzAtMS0xLTItMi0yaC0xbC0xLTMuNXYtMi41aDJ2LTZoLTJWLjRoLTMuOHY0MC44aC0ydjZoMnYyLjVsLTEgMy41aC0xYy0xIDAtMiAxLTIgMnYyaC0xYy0uOSAwLTIgMS0yIDJ2NS45aC0xYy0xLjEgMC0yLjEgMS0yLjEgMnY4aC0xYy0xIDAtMiAxLTIgMlY4NmgtMWMtMSAwLTIuMSAxLTIuMSAydjE2LjloLTIuMWMtMSAwLTIgLjktMiAydjIzLjloLTJjLTEgMC0yIDEtMiAydjQwLjdoLTJjLTEgMC0yIDEtMiAydjUxLjdjMCAuOS0yLjEgMS4yLTIuMSAydjczLjVINjV2LTczLjVjMC0uOC0yLjEtMS4xLTIuMS0ydi01MS43YzAtMS0xLTItMi0yaC0ydi00MC43YzAtLjktMS4xLTItMi4xLTJoLTJ2LTIzLjljMC0xLTEuMS0yLTItMmgtMi4xVjg4YzAtMS0xLTItMi4xLTJoLTF2LTguOWMwLTEtMS0yLTItMmgtMXYtOGMwLTEtMS0yLTItMmgtMS4xdi01LjljMC0xLTEuMS0yLTItMmgtMXYtMmMwLTEtMS0yLTItMmgtMWwtMS0zLjV2LTIuNWgydi02aC0yVi40aC0zLjh6TTY1IDMxMy42aDIzLjRsLjEuMUw2NSAzNTkuMXYtNDUuNXptMjYuNyAwaDIzLjZ2NDUuOGwtMjMuNi00NS44em0tMS43IDMuM2wyNS4yIDQ5Ljd2MTA2LjNINjVWMzY2LjJsMjUtNDkuM3oiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==";
    let icon5 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjQ4NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjkuOS4zdjQwSDY5Yy0uOCAwLTIuMSAxLjEtMi4xIDIuMXYyOC43YzAgMS4xLTEuMi45LTEuMiAyLjF2MjUuOWMwIC45LTEgMS4xLTEgMnY5LjRsLTcuMiAxOS40aC00Yy0xIDAtMi4xIDEtMi4xIDJ2NWgtM2MtMSAwLTIuMSAxLTIuMSAydjI3LjhoLTNjLTEgMC0yLjEuOS0yLjEgMnYzMy44YzAgMS40LTMgMi4xLTMgM3YxNjIuMWgtNWMtMSAwLTIuMSAxLTIuMSAydjM1LjhIMjBjLTEgMC0yLjEgMS0yLjEgMnY1My43SDIuN2MtMSAwLTIgMS0yIDJ2MjQuNWw3MS4xLjdoLjZsNzEuMS0uN3YtMjQuNWMwLTEtMS0yLTItMmgtMTUuMnYtNTMuN2MwLTEtMS0yLTIuMS0yaC0xMS4xdi0zNS44YzAtMS0xLTItMi4xLTJoLTVWMjA1LjVjMC0xLTMuMS0xLjYtMy4xLTN2LTMzLjhjMC0xLTEtMi0yLTJoLTN2LTI3LjhjMC0uOS0xLTItMi4xLTJoLTN2LTVjMC0xLTEtMi0yLTJoLTRsLTcuMi0xOS40di05LjRjMC0uOS0xLTEuMS0xLTJWNzMuMmMwLTEuMi0xLjItMS0xLjItMi4xVjQyLjRjMC0xLTEuMi0yLjEtMi4xLTIuMWgtLjlWLjNoLTQuNXoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==";

    // Create chart instance
    let chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
    chart.defaultState.transitionDuration = 5000;

    // Add data
    chart.data = [{
      "category": "Burj Khalifa",
      "height": 828,
      "ratio": 1 / 5.12,
      "icon": icon1
    }, {
      "category": "Willis Tower",
      "height": 527,
      "ratio": 1 / 5.06,
      "icon": icon2
    }, {
      "category": "Taipei 101",
      "height": 508,
      "ratio": 1 / 6.73,
      "icon": icon3
    }, {
      "category": "Petronas Towers",
      "height": 452,
      "ratio": 1 / 2.76,
      "icon": icon4
    }, {
      "category": "Empire State Building",
      "height": 449,
      "ratio": 1 / 3.41,
      "icon": icon5
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.fill = am4core.color("#ffffff");
    categoryAxis.renderer.labels.template.fillOpacity = 0.5;
    categoryAxis.renderer.inside = true;

    chart.paddingBottom = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 1000;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.grid.template.strokeDasharray = "4,4";
    valueAxis.renderer.minLabelPosition = 0.05;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "height";
    series.dataFields.categoryX = "category";
    series.columns.template.disabled = true;

    let bullet = series.bullets.push(new am4charts.Bullet());
    bullet.defaultState.properties.opacity = 0.5;

    let hoverState = bullet.states.create("hover");
    hoverState.properties.opacity = 0.9;

    let image = bullet.createChild(am4core.Image);
    image.horizontalCenter = "middle";
    image.verticalCenter = "top";

    image.propertyFields.href = "icon";
    image.height = am4core.percent(100);
    image.propertyFields.widthRatio = "ratio";

    bullet.events.on("positionchanged", function (event) {
      event.target.deepInvalidate();
    });

    let label = series.bullets.push(new am4charts.LabelBullet());
    label.label.text = "{height} metres";
    label.dy = -15;

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("#f0b24f"));
    gradient.addColor(am4core.color("#ca6c46"));
    gradient.addColor(am4core.color("#0c0524"));
    gradient.rotation = 90;
    chart.background.fill = gradient;
  }

}

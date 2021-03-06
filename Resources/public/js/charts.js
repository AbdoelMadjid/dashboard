var Chart = {};

Chart.scope = '';
Chart.perPage = 8;
Chart.page = 0;
Chart.indikator = [];

Chart.BulanIndonesia = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

Chart.buildScalarChart = function (data, selector, title, subtitle, xAxis, type, handler) {
    var option = {
        chart : {
            type: type
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories: xAxis
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y} %</b>'
        },
        plotOptions: {
            series: {
                point: {
                    events: handler
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        series: data
    };

    jQuery(selector).highcharts(option);
};

Chart.buildGaugeChart = function (data, selector, title, subtitle, startIndicator, yellowIndicator, greenIndicator, endIndicator, handler) {
    startIndicator = parseInt(startIndicator);
    yellowIndicator = parseInt(yellowIndicator);
    greenIndicator = parseInt(greenIndicator);
    endIndicator = parseInt(endIndicator);

    var option = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            events: handler
        },
        title: {
            text: title
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: startIndicator,
            max: endIndicator,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: subtitle
            },
            plotBands: [{
                from: startIndicator,
                to: yellowIndicator,
                color: '#DF5353'
            }, {
                from: yellowIndicator,
                to: greenIndicator,
                color: '#DDDF0D'
            }, {
                from: greenIndicator,
                to: endIndicator,
                color: '#55BF3B'
            }]
        },
        series: [data]
    };

    jQuery(selector).highcharts(option);
};

Chart.buildPieChart = function (data, selector, title, handler) {
    var option = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 1,
            plotShadow: false
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y} %</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
            series: {
                point: {
                    events: handler
                }
            }
        },
        series: [data]
    };

    jQuery(selector).highcharts(option);
};

Chart.buildCombinationChart = function (selector, title, xAxis, columnData, sparkLineData, pieData, handler) {
    var option = {
        title: {
            text: title
        },
        plotOptions: {
            series: {
                point: {
                    events: handler
                }
            }
        },
        xAxis: {
            categories: xAxis
        },
        series: [columnData, sparkLineData, pieData]
    };

    jQuery(selector).highcharts(option);
};

Chart.createBarChart = function (handler, data, selector, title, subtitle, type, tahun) {
    var output = [];

    if ('pertahun' === type) {
        output = Chart.processDataPerTahun(data);

        Chart.buildScalarChart([output['data']], selector, title, subtitle, output['tahun'], 'bar', handler);
    } else {
        output = Chart.processDataPerBulan(data);

        Chart.buildScalarChart(output, selector, title, subtitle, Chart.BulanIndonesia, 'bar', handler);
    }
};

Chart.createColumnChart = function (handler, data, selector, title, subtitle, type, tahun) {
    var output = [];

    if ('pertahun' === type) {
        output = Chart.processDataPerTahun(data);

        Chart.buildScalarChart([output['data']], selector, title, subtitle, output['tahun'], 'column', handler);
    } else {
        output = Chart.processDataPerBulan(data);

        Chart.buildScalarChart(output, selector, title, subtitle, Chart.BulanIndonesia, 'column', handler);
    }
};

Chart.createLineChart = function (handler, data, selector, title, subtitle, type, tahun) {
    var output = [];

    if ('pertahun' === type) {
        output = Chart.processDataPerTahun(data);

        Chart.buildScalarChart([output['data']], selector, title, subtitle, output['tahun'], 'line', handler);
    } else {
        output = Chart.processDataPerBulan(data);

        Chart.buildScalarChart(output, selector, title, subtitle, Chart.BulanIndonesia, 'line', handler);
    }
};

Chart.createAreaChart = function (handler, data, selector, title, subtitle, type, tahun) {
    var output = [];

    if ('pertahun' === type) {
        output = Chart.processDataPerTahun(data);

        Chart.buildScalarChart([output['data']], selector, title, subtitle, output['tahun'], 'area', handler);
    } else {
        output = Chart.processDataPerBulan(data);

        Chart.buildScalarChart(output, selector, title, subtitle, Chart.BulanIndonesia, 'area', handler);
    }
};

Chart.createGaugeChart = function (data, selector, title, handler) {
    Chart.scope = data['scope'];
    var now = new Date();
    var subtitle = 'TAHUN ' + now.getFullYear();
    var output = 0;
    var i = 0;

    jQuery.each(data['data'], function (key, value) {
        subtitle = 'TAHUN ' + key;
        jQuery.each(value, function (k, v) {
            if ('undefined' !== typeof v['value']) {
                output = output + parseInt(v['value']);
            }

            i++;
        });
    });

    i = 0 === i ? 1 : i;

    Chart.buildGaugeChart({
        name: 'Nilai rata-rata',
        data: [parseInt(output / i)],
        tooltip: {
            valueSuffix: ' %'
        }
    }, selector, title, subtitle, data['indikator']['indikator_merah'], data['indikator']['indikator_kuning'], data['indikator']['indikator_hijau'], 100, handler);
};

Chart.createPieChart = function (data, seletor, title, handler) {
    var temp = Chart.processDataPerBulan(data);
    var output = [];

    jQuery.each(temp[0]['data'], function (key, value) {
        output.push([Chart.BulanIndonesia[key], value]);
    });

    Chart.buildPieChart({
        type: 'pie',
        name: 'Total',
        data: output
    }, seletor, title + ' TAHUN ' + temp[0]['name'], handler);
};

Chart.processDataPerTahun = function (data) {
    var output = [];
    output['tahun'] = [];
    output['data'] = [];
    output['data']['name'] = 'Total';
    output['data']['data'] = [];

    jQuery.each(data['data'], function (key, value) {
        output['tahun'].push(key);
        var data = 0;

        jQuery.each(value, function (k, v) {
            data = data + parseInt(v['value']);
        });

        output['data']['data'].push(data);
    });

    return output;
};

Chart.processDataPerBulan = function (data, type) {
    Chart.scope = data['scope'];
    var output = [];
    var i = 0;

    jQuery.each(data['data'], function (key, value) {
        var data = [];
        output[i] = [];

        output[i]['name'] = key;
        output[i]['type'] = type;

        jQuery.each(value, function (k, v) {
            if ('undefined' !== typeof v['value']) {
                data.push(parseInt(v['value']));
            } else {
                data.push(0);
            }
        });

        output[i]['data'] = data;

        i++;
    });

    return output;
};

Chart.requestSingleChart = function (callback, indikator, scope, kode, tahun, bulan) {
    if ("undefined" === typeof scope) {
        scope = '0';
    }

    if ("undefined" === typeof kode) {
        kode = '0';
    }

    if ("undefined" === typeof tahun) {
        tahun = '0';
    }

    if ("undefined" === typeof bulan) {
        bulan = '0';
    }

    jQuery.ajax({
        url: '/api/chart/single/get/' + indikator + '/' + scope + '/' + kode + '/' + tahun + '/' + bulan,
        type:'GET',
        dataType: 'json',
        beforeSend: function( xhr ) {
            Chart.modalHelper.pleaseWait();
        }
    }).done (function (response) {
        if ('function' === typeof callback) {
            Chart.modalHelper.done();
            callback(response);
        }
    });
};

Chart.requestGroupChart = function (callback, indikator, scope, kode, tahun, bulan) {
    if ("undefined" === typeof scope) {
        scope = '0';
    }

    if ("undefined" === typeof kode) {
        kode = '0';
    }

    if ("undefined" === typeof tahun) {
        tahun = '0';
    }

    if ("undefined" === typeof bulan) {
        bulan = '0';
    }

    jQuery.ajax({
        url: '/api/chart/group/get/' + indikator + '/' + scope + '/' + kode + '/' + tahun + '/' + bulan,
        type:'GET',
        dataType: 'json',
        beforeSend: function( xhr ) {
            Chart.modalHelper.pleaseWait();
        }
    }).done (function (response) {
        if ('function' === typeof callback) {
            Chart.modalHelper.done();
            callback(response);
        }
    });
};

Chart.buildIndikatorList = function (indikators, limit, start) {
    var html = '';
    var length = indikators.length;

    if (0 > start) {
        start = 0;
    }

    for (var i = start; i < (limit + start); i++) {
        if (length > i) {
            html = html + '<button type="button" data="' + indikators[i].code + '" class="indikatorList btn btn-primary btn-lg btn-block">' + indikators[i].name + '</button>';
        }
    }

    var paging = '';
    if (0 === start) {
        paging = paging + '<button type="button" class="btn btn-lg btn-primary pull-left sebelum" disabled="disabled">Sebelumnya</button>';
    } else {
        paging = paging + '<button type="button" class="btn btn-lg btn-primary pull-left sebelum">Sebelumnya</button>';
    }

    if (length < (limit + start)) {
        paging = paging + '<button type="button" class="btn btn-lg btn-primary pull-right setelah" disabled="disabled">Selanjutnya</button>';
    } else {
        paging = paging + '<button type="button" class="btn btn-lg btn-primary pull-right setelah">Selanjutnya</button>';
    }

    jQuery('#block6').html(html);
    jQuery('#paging').html(paging);
    Chart.indikatorListClickHandler(indikators);
};

Chart.indikatorListClickHandler = function (indikators) {
    jQuery('.indikatorList').on('click', function () {
        var indikator = jQuery(this).attr('data');
        Chart.createMainChart(indikator, Chart.page);
    });

    jQuery('.sebelum').on('click', function () {
        Chart.page = Chart.page - Chart.perPage;

        Chart.buildIndikatorList(indikators, Chart.perPage, Chart.page);
    });

    jQuery('.setelah').on('click', function () {
        Chart.page = Chart.page + Chart.perPage;

        Chart.buildIndikatorList(indikators, Chart.perPage, Chart.page);
    });
};

Chart.createMainChart = function (indikator, start) {
    Chart.requestSingleChart(function (data) {
        Chart.createColumnChart({
            click: function (e) {
                alert('Under Constructions.');
            }
        }, data, '#block5', data['indikator']['name']);

        Chart.createGlobalIndikatorChart(indikator);
    }, indikator, 'nasional');
};

Chart.createGlobalIndikatorChart = function (indikator) {
    Chart.requestGroupChart(function (data) {
        var chart = Chart.processDataGlobal(data);

        Chart.buildScalarChart([chart['data']], '#block6', data['indikator']['name'], null, chart['indikator'], 'bar', {
            click: function (e) {
                Chart.requestSingleChart(function (data) {
                    Chart.createColumnChart({
                        click: function (e) {
                            alert('Under Constructions.');
                        }
                    }, data, '#block5', data['indikator']['name']);
                }, this.category, 'nasional');
            }
        });

    }, indikator, 'nasional');
};

Chart.processDataGlobal = function (data) {
    var output = [];
    output['indikator'] = [];
    output['data'] = [];
    output['data']['name'] = 'Data';
    output['data']['data'] = [];
    var total = 0;

    jQuery.each(data['indikator']['child'], function (key, value) {
        output['indikator'].push(value.code);
    });

    jQuery.each(data['data'], function (key, value) {
        var data = 0;
        jQuery.each(value, function (k, v) {
            total = Object.keys(v).length;
            jQuery.each(v, function (y, z) {
                if ('undefined' !== typeof z['value']) {
                    data = data + parseInt(z['value']);
                }
            });
        });

        output['data']['data'].push(Math.round(data / total));
    });

    return output;
};

Chart.modalHelper = Chart.modalHelper || (function () {
    return {
        pleaseWait: function() {
            jQuery('#loader').show();
        },
        done: function () {
            jQuery('#loader').hide();
        }
    };
})();
var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}

function fnSkinTotalSeason(){
    const skin_season_count= [
        {
            "label":"모공",
            "count": 210
        },
        {
            "label":"탄력",
            "count": 112
        },
        {
            "label":"주름",
            "count": 245
        },
        {
            "label":"미래주름",
            "count": 182
        },
        {
            "label":"멜라닌",
            "count": 95
        },
        {
            "label":"색소침착",
            "count": 87
        },
        {
            "label":"경피수분손실도",
            "count": 112
        },
        {
            "label":"포피린",
            "count": 134
        },
        {
            "label":"붉은기",
            "count": 157
        }
    ];

    const labels = skin_season_count.map(item => item.label);
    const data = skin_season_count.map(item => item.count);

    const dataConfig = {
        labels: labels,
        datasets: [{
            label: '차트 영역',
            data: data,
            backgroundColor: [
                '#4e73df',
                '#6a89c8',
                '#869fc3',
                '#a1b5be',
                '#bccbd9',
                '#d6e1f4',
                '#e1e7f0',
                '#edf3ec',
                '#f7f9f8'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: dataConfig,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Skin Season Analysis'
                }
            }
        },
    };

    const skinChart = new Chart(
        document.getElementById('skin_total_chart'),
        config
    );
}

function fnSkinTotalBar(){
    const skin_season_count= [
        {
            "label":"모공",
            "count": 210
        },
        {
            "label":"탄력",
            "count": 112
        },
        {
            "label":"주름",
            "count": 245
        },
        {
            "label":"미래주름",
            "count": 182
        },
        {
            "label":"멜라닌",
            "count": 95
        },
        {
            "label":"색소침착",
            "count": 87
        },
        {
            "label":"경피수분손실도",
            "count": 112
        },
        {
            "label":"포피린",
            "count": 134
        },
        {
            "label":"붉은기",
            "count": 157
        }
    ];

    // Sort skin_season_count in descending order based on count
    skin_season_count.sort((a, b) => b.count - a.count);

    const labels = skin_season_count.map(item => item.label);
    const counts = skin_season_count.map(item => item.count);

    // Calculate cumulative percentage
    let cumulativePercentage = 0;
    const cumulativeData = counts.map(count => {
        cumulativePercentage += count;
        return (cumulativePercentage / counts.reduce((a, b) => a + b, 0)) * 100;
    });

    const ctx = document.getElementById('skin_total_bar_chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '관리 항목 수',
                data: counts,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                yAxisID: 'y-axis-1'
            },
                {
                    label: '누적 %',
                    data: cumulativeData,
                    type: 'line',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    yAxisID: 'y-axis-2'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                'y-axis-1': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    ticks: {
                        stepSize: 200,
                    },
                    title: {
                        display: true,
                        text: '관리항목수'
                    }
                },
                'y-axis-2': {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20,
                    },
                    title: {
                        display: true,
                        text: '누적 %'
                    }
                }
            }
        }
    });
}


function fnSkinSeason(){
    const skin_season_count = [
        {
            "label":"봄",
            "data":[
                { "label": "모공", "count": 13 },
                { "label": "탄력", "count": 10 },
                { "label": "주름", "count": 14 },
                { "label": "미래주름", "count": 15 },
                { "label": "멜라닌", "count": 7 },
                { "label": "색소침착", "count": 5 },
                { "label": "경피수분손실도", "count": 13 },
                { "label": "포피린", "count": 11 },
                { "label": "붉은기", "count": 10 }]
        },
        {
            "label":"여름",
            "data":[
                { "label": "모공", "count": 15 },
                { "label": "탄력", "count": 11 },
                { "label": "주름", "count": 18 },
                { "label": "미래주름", "count": 17 },
                { "label": "멜라닌", "count": 10 },
                { "label": "색소침착", "count": 7 },
                { "label": "경피수분손실도", "count": 8 },
                { "label": "포피린", "count": 9 },
                { "label": "붉은기", "count": 5 }]
        },
        {
            "label":"가을",
            "data":[
                { "label": "모공", "count": 14 },
                { "label": "탄력", "count": 10 },
                { "label": "주름", "count": 21 },
                { "label": "미래주름", "count": 21 },
                { "label": "멜라닌", "count": 7 },
                { "label": "색소침착", "count": 6 },
                { "label": "경피수분손실도", "count": 7 },
                { "label": "포피린", "count": 9 },
                { "label": "붉은기", "count": 6 }]
        },
        {
            "label":"겨울",
            "data":[
                { "label": "모공", "count": 9 },
                { "label": "탄력", "count": 10 },
                { "label": "주름", "count": 23 },
                { "label": "미래주름", "count": 20 },
                { "label": "멜라닌", "count": 7 },
                { "label": "색소침착", "count": 3 },
                { "label": "경피수분손실도", "count": 13 },
                { "label": "포피린", "count": 8 },
                { "label": "붉은기", "count": 7 }]
        }
    ];

    const labels = skin_season_count[0].data.map(item => item.label);
    const datasets = skin_season_count.map(season => ({
        label: season.label,
        data: season.data.map(item => item.count),
        backgroundColor: [
            'rgba(25, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(25, 99, 132, 0.6)'
        ]
    }));

    const data = {
        labels: labels,
        datasets: datasets
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    max: 100,
                    ticks: {
                        callback: function(value, index, values) {
                            return value + "%";
                        }
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    anchor: 'center',
                    align: 'center',
                    formatter: function(value, context) {
                        return context.dataset.label + ", " + value + "%";
                    }
                }
            }
        }
    };

    const skinChart = new Chart(
        document.getElementById('skin_season_chart'),
        config
    );
}
$(document).ready(function () {

    fnSkinTotalSeason();

    fnSkinTotalBar();

    fnSkinSeason();
    console.log('statistics_skin_season page start -> ')
});

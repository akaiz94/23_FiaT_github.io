var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}


// 방문 고객 수/월
function fnVisitMonthChart(){
    const visit_month_count = [
        { date: 23.02, count: 1, visit: 45 },
        { date: 23.02, count: 2, visit: 4 },
        { date: 23.03, count: 1, visit: 53 },
        { date: 23.03, count: 2, visit: 3 },
        { date: 23.04, count: 1, visit: 75 },
        { date: 23.04, count: 2, visit: 5 },
        { date: 23.05, count: 1, visit: 62 },
        { date: 23.05, count: 2, visit: 3 },
        { date: 23.06, count: 1, visit: 61 },
        { date: 23.06, count: 2, visit: 5 },
        { date: 23.07, count: 1, visit: 60 },
        { date: 23.07, count: 2, visit: 10 },
        { date: 23.08, count: 1, visit: 70 },
        { date: 23.08, count: 2, visit: 2 },
        { date: 23.09, count: 1, visit: 45 },
        { date: 23.09, count: 2, visit: 4 },
        { date: 23.10, count: 1, visit: 44 },
        { date: 23.10, count: 2, visit: 15 },
        { date: 23.11, count: 1, visit: 54 },
        { date: 23.11, count: 2, visit: 16 },
        { date: 23.12, count: 1, visit: 65 },
        { date: 23.12, count: 2, visit: 10 },
        { date: 24.01, count: 1, visit: 34 },
        { date: 24.01, count: 2, visit: 11 },
        { date: 24.02, count: 1, visit: 58 },
        { date: 24.02, count: 2, visit: 15 }
    ];
    const dates = visit_month_count.map(item => item.date);
    const oneVisit = visit_month_count.filter(item => item.count === 1).map(item => item.visit);
    const twoVisit = visit_month_count.filter(item => item.count === 2).map(item => item.visit);
    const ctx = document.getElementById('visit_month_count_chart').getContext('2d');
    const visitMonthCountChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [
                {
                    label: '1회',
                    data: oneVisit,
                    backgroundColor: 'rgba(225, 194, 215, 0.6)',
                    stack: 'Stack 0',
                },
                {
                    label: '2회이상',
                    data: twoVisit,
                    backgroundColor: 'rgba(225, 194, 215, 1)',
                    stack: 'Stack 0',
                }
            ]
        },
        options: {
            indexAxis: 'x',
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '방문 고객 수/월',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '방문 고객 수/월',
                    font: {
                        size: 20
                    }
                },
                legend: {
                    position: 'top',
                }
            }
        }
    });
}


// 고객 분포 성별
function fnVisitSexChart(){
    const visit_sex_count = [
        {
            "sex": "M",
            "age": 10,
            "visit": 45
        },
        {
            "sex": "F",
            "age": 10,
            "visit": 90
        },
        {
            "sex": "M",
            "age": 20,
            "visit": 15
        },
        {
            "sex": "F",
            "age": 20,
            "visit": 59
        },
    ];
    const ctx = document.getElementById('visit_sex_count_chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: visit_sex_count.map(item => item.age),
            datasets: [{
                label: 'Visit Count',
                data: visit_sex_count.map(item => item.visit),
                backgroundColor: visit_sex_count.map(item => item.sex === 'M' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)'),
                borderColor: visit_sex_count.map(item => item.sex === 'M' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}







$(document).ready(function () {
    // 방문 고객 수/월
    fnVisitMonthChart()

    // 고객 분포 성별
    fnVisitSexChart()
});

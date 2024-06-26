var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 1000,
    startIndex: 0,
}
// Function to calculate linear regression
function calculateRegression(data) {
    const n = data.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    for (let i = 0; i < n; i++) {
        const x = data[i].x;
        const y = data[i].y;
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const equation = `y = ${slope.toFixed(4)}x + ${intercept.toFixed(2)}`;
    const rSquared = calculateRSquared(data, slope, intercept);
    const lineData = data.map((d) => ({ x: d.x, y: slope * d.x + intercept }));
    return { equation, rSquared, lineData };
}

// Function to calculate R-squared
function calculateRSquared(data, slope, intercept) {
    const n = data.length;
    let sumY = 0;
    let sumYSquared = 0;
    let sumResidualSquared = 0;
    for (let i = 0; i < n; i++) {
        const y = data[i].y;
        const yPred = slope * data[i].x + intercept;
        sumY += y;
        sumYSquared += y * y;
        sumResidualSquared += (y - yPred) * (y - yPred);
    }
    const ssTotal = sumYSquared - (sumY * sumY) / n;
    return 1 - sumResidualSquared / ssTotal;
}

// 탄력
function fnSkinElasticity(){
    const data = [
        { x: 20, y: 87 },
        { x: 25, y: 80 },
        { x: 30, y: 85 },
        { x: 35, y: 72 },
        { x: 40, y: 65 },
        { x: 45, y: 48 },
        { x: 50, y: 46 },
        { x: 55, y: 42 },
        { x: 60, y: 25 },
        { x: 65, y: 26 },
        { x: 70, y: 21 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('elasticity_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

}

// 주름
function fnSkinWrinkles(){
    const data = [
        { x: 20, y: 21 },
        { x: 25, y: 25 },
        { x: 30, y: 26 },
        { x: 35, y: 42 },
        { x: 40, y: 46 },
        { x: 45, y: 48 },
        { x: 50, y: 65 },
        { x: 55, y: 72 },
        { x: 60, y: 80 },
        { x: 65, y: 85 },
        { x: 70, y: 87 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('wrinkles_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


}

// 미래주름
function fnSkinFutureWrinkles(){
    const data = [
        { x: 20, y: 21 },
        { x: 25, y: 25 },
        { x: 30, y: 26 },
        { x: 35, y: 42 },
        { x: 40, y: 46 },
        { x: 45, y: 48 },
        { x: 50, y: 65 },
        { x: 55, y: 72 },
        { x: 60, y: 80 },
        { x: 65, y: 85 },
        { x: 70, y: 87 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('future_wrinkles_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


}

// 멜라닌
function fnMelanin(){
    const data = [
        { x: 20, y: 87 },
        { x: 25, y: 80 },
        { x: 30, y: 85 },
        { x: 35, y: 72 },
        { x: 40, y: 65 },
        { x: 45, y: 48 },
        { x: 50, y: 46 },
        { x: 55, y: 42 },
        { x: 60, y: 25 },
        { x: 65, y: 26 },
        { x: 70, y: 21 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('melanin_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


}
// 색소침착
function fnPigmentation(){
    const data = [
        { x: 20, y: 87 },
        { x: 25, y: 80 },
        { x: 30, y: 85 },
        { x: 35, y: 72 },
        { x: 40, y: 65 },
        { x: 45, y: 48 },
        { x: 50, y: 46 },
        { x: 55, y: 42 },
        { x: 60, y: 25 },
        { x: 65, y: 26 },
        { x: 70, y: 21 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('pigmentation_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


}
// 경피수분손실도
function fnMoistureLoss(){
    const data = [
        { x: 20, y: 21 },
        { x: 25, y: 25 },
        { x: 30, y: 26 },
        { x: 35, y: 42 },
        { x: 40, y: 46 },
        { x: 45, y: 48 },
        { x: 50, y: 65 },
        { x: 55, y: 72 },
        { x: 60, y: 80 },
        { x: 65, y: 85 },
        { x: 70, y: 87 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('moisture_loss_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


}
// 붉은기
function fnRedness(){
    const data = [
        { x: 20, y: 87 },
        { x: 25, y: 80 },
        { x: 30, y: 85 },
        { x: 35, y: 72 },
        { x: 40, y: 65 },
        { x: 45, y: 48 },
        { x: 50, y: 46 },
        { x: 55, y: 42 },
        { x: 60, y: 25 },
        { x: 65, y: 26 },
        { x: 70, y: 21 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('redness_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


}
// 모공
function fnPores(){
    const data = [
        { x: 20, y: 21 },
        { x: 25, y: 25 },
        { x: 30, y: 26 },
        { x: 35, y: 42 },
        { x: 40, y: 46 },
        { x: 45, y: 48 },
        { x: 50, y: 65 },
        { x: 55, y: 72 },
        { x: 60, y: 80 },
        { x: 65, y: 85 },
        { x: 70, y: 87 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('pores_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


}
// 포피린
function fnPorphyrin(){
    const data = [
        { x: 20, y: 87 },
        { x: 25, y: 80 },
        { x: 30, y: 85 },
        { x: 35, y: 72 },
        { x: 40, y: 65 },
        { x: 45, y: 48 },
        { x: 50, y: 46 },
        { x: 55, y: 42 },
        { x: 60, y: 25 },
        { x: 65, y: 26 },
        { x: 70, y: 21 },
    ];

    // Calculate regression line
    const regression = calculateRegression(data);

    // Create chart
    const ctx = document.getElementById('porphyrin_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data',
                    data: data,
                    backgroundColor: '#277da1',
                    pointRadius: 5,
                },
                {
                    label: regression.equation,
                    data: regression.lineData,
                    type: 'line',
                    borderColor: '#277da1',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        equation: {
                            type: 'line',
                            scaleID: 'y',
                            value: 105, // Adjust the position of the equation label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: regression.equation,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        rSquared: {
                            type: 'line',
                            scaleID: 'y',
                            value: 95, // Adjust the position of the R-squared label
                            borderColor: 'transparent',
                            borderWidth: 0,
                            label: {
                                content: `R² = ${regression.rSquared.toFixed(4)}`,
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


}

$(document).ready(function () {
    fnSkinElasticity(); // 탄력
    fnSkinWrinkles(); // 주름
    fnSkinFutureWrinkles(); // 미래주름

    // 멜라닌
    fnMelanin();
    // 색소침착
    fnPigmentation();
    // 경피수분손실도
    fnMoistureLoss();
    // 붉은기
    fnRedness();
    // 모공
    fnPores();
    // 포피린
    fnPorphyrin();
    console.log('statistics_skin_age page start -> ')
});

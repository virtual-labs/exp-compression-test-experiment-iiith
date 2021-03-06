'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // RAW DATA USED IN THE SIMULATION
    const stress = [0.8001, 1.6002, 2.4002, 3.2003, 4.0004, 4.8005, 5.6006, 6.4006, 7.2007, 8.0008, 8.8009, 9.6010, 10.4010, 11.2011, 12.0012, 12.8013, 13.6014, 14.4014, 15.2015, 16.0016, 16.8017, 17.5778];
    const strain = [0.8210101, 1.0262626, 1.180202, 1.2828283, 1.359798, 1.4367677, 1.4880808, 1.5393939, 1.6420202, 1.6933333, 1.7446465, 1.7959596, 1.8472727, 1.949899, 2.0525253, 2.1551515, 2.2577778, 2.360404, 2.5143434, 2.6169697, 2.8735354, 3.2327273];
    const load = [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 43940];
    const deformation = [0.4064, 0.508, 0.5842, 0.635, 0.6731, 0.7112, 0.7366, 0.762, 0.8128, 0.8382, 0.8636, 0.889, 0.9144, 0.9652, 1.016, 1.0668, 1.1176, 1.1684, 1.2446, 1.2954, 1.4224, 1.6002];

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', function() { restart(); });

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', function() { play(); });

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', function() { pause(); });

    const slider = document.getElementById('speed');
    const output = document.getElementById('demo_speed');
    output.innerHTML = (slider.value) / 4;
    slider.oninput = function() {
        output.innerHTML = (this.value) / 4;
        fps = originalfps * (output.innerHTML);
        restart();
    };

    function setAll() {
        upperPlate = [
            [plateStartX, upperPlateStartY],
            [plateStartX + plateWidth, upperPlateStartY],
            [plateStartX + plateWidth, upperPlateStartY + plateHeight],
            [plateStartX, upperPlateStartY + plateHeight],
        ];

        bottomPlate = [
            [plateStartX, bottomPlateStartY],
            [plateStartX + plateWidth, bottomPlateStartY],
            [plateStartX + plateWidth, bottomPlateStartY + plateHeight],
            [plateStartX, bottomPlateStartY + plateHeight],
        ];

        upperRod = [
            [plateStartX + rodWidth, upperPlateStartY],
            [plateStartX + rodWidth, upperPlateStartY - upperRodHeight],
            [plateStartX + plateWidth - rodWidth, upperPlateStartY - upperRodHeight],
            [plateStartX + plateWidth - rodWidth, upperPlateStartY],
        ];

        lowerRod = [
            [plateStartX + rodWidth, bottomPlateStartY + plateHeight],
            [plateStartX + rodWidth, bottomPlateStartY + lowerRodHeight + plateHeight],
            [plateStartX + plateWidth - rodWidth, bottomPlateStartY + lowerRodHeight + plateHeight],
            [plateStartX + plateWidth - rodWidth, bottomPlateStartY + plateHeight],
        ];

        box = [
            [plateStartX + plateWidth - boxWidth, boxStarty],
            [plateStartX + boxWidth, boxStarty],
            [plateStartX + boxWidth, bottomPlateStartY],
            [plateStartX + plateWidth - boxWidth, bottomPlateStartY],
        ];

        brokenBoxPart1 = [
            [plateStartX + plateWidth - boxWidth - gap / 2, boxStarty],
            [plateStartX + plateWidth - boxWidth + breakLength, boxStarty],
            [plateStartX + boxWidth - breakLength, bottomPlateStartY],
            [plateStartX + plateWidth - boxWidth - gap / 2, bottomPlateStartY],
        ];

        brokenBoxPart2 = [
            [plateStartX + plateWidth - boxWidth + breakLength + gap, boxStarty],
            [plateStartX + boxWidth + gap / 2, boxStarty],
            [plateStartX + boxWidth + gap / 2, bottomPlateStartY],
            [plateStartX + boxWidth - breakLength + gap, bottomPlateStartY],
        ];

        bench = [
            [0, canvas.height - benchHeight],
            [canvas.width, canvas.height - benchHeight],
            [canvas.width, canvas.height],
            [0, canvas.height],
        ]

        step = 0;

        document.getElementById("stress").innerHTML = "0.0 Mpa";
        document.getElementById("strain").innerHTML = "0.0";
        document.getElementById("load").innerHTML = "0.0 N";
        document.getElementById("deformation").innerHTML = "0.0 mm";
    }

    function restart() {
        window.clearTimeout(tmHandle);
        setAll();
        graph();
        play();
    }

    function play() {
        tmHandle = window.setTimeout(draw, 1000 / fps);
        pauseButton.removeAttribute("disabled");
        restartButton.removeAttribute("disabled");
        playButton.setAttribute("disabled", "true");
    }

    function pause() {
        window.clearTimeout(tmHandle);
        pauseButton.setAttribute("disabled", "true");
        playButton.removeAttribute("disabled");
    }

    function drawObject(ctx, obj, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(obj[0][0], obj[0][1]);

        for (let i = 0; i < obj.length; ++i) {
            const next = (i + 1) % obj.length;
            ctx.lineTo(obj[next][0], obj[next][1]);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    function move(tube, flag) {
        for (let i = 0; i < tube.length; ++i) {
            tube[i][1] += flag;
        }
    }

    let upperPlate = [];
    let bottomPlate = [];
    let upperRod = [];
    let lowerRod = [];
    let box = [];
    let brokenBoxPart1 = [];
    let brokenBoxPart2 = [];
    let bench = [];
    let tmHandle;
    let chart;
    let step = 0;



    const canvas = document.getElementById("main");
    canvas.width = 900;
    canvas.height = 1200;
    canvas.style = "border:3px solid;";
    const ctx = canvas.getContext("2d");
    const lineWidth = 1.5;
    const originalfps = 20;
    let fps = 20;


    const plateStartX = 250;
    const plateWidth = 400;
    const upperPlateStartY = 340;
    const bottomPlateStartY = 700;
    const plateHeight = 120;
    const rodWidth = 240;
    const upperRodHeight = 240;
    const lowerRodHeight = 360;
    const boxWidth = 320;
    const boxStarty = 500;
    const breakLength = 80;
    const gap = 10;
    const benchHeight = 100;

    setAll();
    drawStatic();
    graph();

    function drawStatic() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.font = "50px Arial";

        ctx.fillText("UTM Machine", 300, 70);
        ctx.fillText("Load", 620, upperPlate[1][1] - 110);
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(600, upperPlate[1][1] - 150);
        ctx.lineTo(600, upperPlate[1][1] - 50);
        ctx.lineTo(580, upperPlate[1][1] - 70);
        ctx.moveTo(600, upperPlate[1][1] - 50);
        ctx.lineTo(620, upperPlate[1][1] - 70);
        ctx.stroke();
        drawObject(ctx, upperPlate, data.colors.plate);
        drawObject(ctx, bottomPlate, data.colors.plate);
        drawObject(ctx, upperRod, data.colors.rod);
        drawObject(ctx, lowerRod, data.colors.rod);
        drawObject(ctx, bench, data.colors.bench);
    }

    function draw() {
        if (upperPlate[0][1] + plateHeight < boxStarty) {
            drawStatic();
            drawObject(ctx, box, data.colors.box);
            move(upperRod, 1);
            move(upperPlate, 1);
            tmHandle = window.setTimeout(draw, 1000 / fps);
        } else {
            updateChart();
        }

    }

    function graph() {

        chart = [{
            x: [0],
            y: [0],
            type: 'lines+markers'
        }];

        let layout = {
            title: {
                text: "Stress v/s Strain"
            },
            yaxis: {
                title: "Stress (MPa)"
            },
            xaxis: {
                title: "%Strain"
            }
        };
        Plotly.newPlot(chartContainer, chart, layout);
    }

    function updateChart() {

        let x = strain[step];
        let y = stress[step];

        document.getElementById("stress").innerHTML = y.toString() + " Mpa";
        document.getElementById("strain").innerHTML = x.toString();
        document.getElementById("load").innerHTML = load[step].toString() + " N";
        document.getElementById("deformation").innerHTML = deformation[step].toString() + " mm";
        if (step < load.length) {
            chart[0]['x'].push(x);
            chart[0]['y'].push(y);
            Plotly.redraw(chartContainer);
            step++;
        }
        if (step === load.length) {
            drawStatic();
            drawObject(ctx, brokenBoxPart1, data.colors.box);
            drawObject(ctx, brokenBoxPart2, data.colors.box);
            playButton.setAttribute("disabled", "true");
            pauseButton.setAttribute("disabled", "true");
            window.clearTimeout(tmHandle);
        } else {
            tmHandle = window.setTimeout(draw, 5000 / fps);
        }
    }
});
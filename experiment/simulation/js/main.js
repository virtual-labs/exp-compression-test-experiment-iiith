'use strict';

document.addEventListener('DOMContentLoaded', function(){

	// RAW DATA USED IN THE SIMULATION
	const stress = [0.8001,1.6002,2.4002,3.2003,4.0004,4.8005,5.6006,6.4006,7.2007,8.0008,8.8009,9.6010,10.4010,11.2011,12.0012,12.8013,13.6014,14.4014,15.2015,16.0016,16.8017,17.5778];
	const strain = [0.8210101,1.0262626,1.180202,1.2828283,1.359798,1.4367677,1.4880808,1.5393939,1.6420202,1.6933333,1.7446465,1.7959596,1.8472727,1.949899,2.0525253,2.1551515,2.2577778,2.360404,2.5143434,2.6169697,2.8735354,3.2327273];
	const load = [2000,4000,6000,8000,10000,12000,14000,16000,18000,20000,22000,24000,26000,28000,30000,32000,34000,36000,38000,40000,42000,43940];
	const deformation = [0.4064,0.508,0.5842,0.635,0.6731,0.7112,0.7366,0.762,0.8128,0.8382,0.8636,0.889,0.9144,0.9652,1.016,1.0668,1.1176,1.1684,1.2446,1.2954,1.4224,1.6002];
	const charts = [{xx:0.0,yy:0.0},{xx:0.8210101,yy:0.8001},{xx:1.0262626,yy:1.6002},{xx:1.180202,yy:2.4002},{xx:1.2828283,yy:3.2003},{xx:1.359798,yy:4.0004},{xx:1.436767,yy:4.8005},{xx:1.4880808,yy:5.6006},{xx:1.539393,yy:6.4006},{xx:1.6420202,yy:7.2007},{xx:1.693333,yy:8.0008},{xx:1.7446465,yy:8.8009},{xx:1.7959596,yy:9.6010},{xx:1.8472727,yy:10.4010},{xx:1.949899,yy:11.2011},{xx:2.0525253,yy:12.0012},{xx:2.1551515,yy:12.8013},{xx:2.2577778,yy:13.6014},{xx:2.360404,yy:14.4014},{xx:2.5143434,yy:15.2015},{xx:2.6169697,yy:16.0016},{xx:2.8735354,yy:16.8017},{xx:3.2327273,yy:17.5778}];


	const restartButton = document.getElementById('restart');
	restartButton.addEventListener('click', function() {restart();});

	function setall()
	{
		top = [
			[startx, starty],
			[startx + width1, starty],
			[startx + width1, starty + ht1],
			[startx , starty + ht1],

		];

		bottom = [
			[startx, bottom_starty],
			[startx + width1, bottom_starty],
			[startx + width1, bottom_starty + ht1],
			[startx , bottom_starty + ht1],

		];

		tube1 = [
			[startx + tube_width, starty],
			[startx + tube_width, starty - tube_ht1],
			[startx + width1 - tube_width, starty - tube_ht1],
			[startx + width1 - tube_width, starty],
		];

		tube2 = [
			[startx + tube_width, bottom_starty+ht1],
			[startx + tube_width, bottom_starty +tube_ht2 + ht1],
			[startx + width1 - tube_width, bottom_starty + tube_ht2 + ht1],
			[startx + width1 - tube_width, bottom_starty+ht1],
		];

		box = [
			[startx + width1-box_width, box_starty],
			[startx + box_width, box_starty],
			[startx + box_width, bottom_starty],
			[startx + width1-box_width, bottom_starty],
		];

		box_part1 = [
			[startx + width1-box_width - gap/2, box_starty],
			[startx + width1-box_width + break_length, box_starty],
			[startx + box_width - break_length, bottom_starty],
			[startx + width1-box_width - gap/2, bottom_starty],
		];

		box_part2 = [
			[startx + width1-box_width + break_length + gap, box_starty],
			[startx + box_width +gap/2, box_starty],
			[startx + box_width + gap/2, bottom_starty],
			[startx + box_width - break_length + gap, bottom_starty],
		];
	}
	function restart() 
	{ 
		window.clearTimeout(tmHandle); 
		window.clearTimeout(id);
		setall();
		chart.destroy();
		tmHandle = window.setTimeout(draw, 1000 / fps); 
	}

	function drawobj(ctx, obj ,color)
	{
		ctx.save();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(obj[0][0], obj[0][1]);

		for(let i = 0; i < obj.length; ++i)
		{
			const next = (i + 1) % obj.length;
			ctx.lineTo(obj[next][0], obj[next][1]);
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

	function move(tube,flag)
	{
		for(let i = 0; i < tube.length; ++i)
		{
			tube[i][1] +=flag;
		}
	}

	let top = [];
	let bottom = [];
	let tube1 = [];
	let tube2 = [];
	let id;
	let box = [];
	let box_part1 = [];
	let box_part2 = [];


	const canvas = document.getElementById("main");
	canvas.width = 900;
	canvas.height = 1200;
	canvas.style = "border:3px solid;";
	const ctx = canvas.getContext("2d");

	const fill = "#A9A9A9";
	const lineWidth = 1.5;
	const fps = 20;

	
	const startx = 250;
	const width1 = 400;
	const starty = 340;
	const bottom_starty = 700;
	const ht1 = 120;
	const tube_width = 240;
	const tube_ht1 = 180;
	const tube_ht2 = 360;
	const box_width = 320;
	const box_starty = 500;
	const break_length = 80;
	const gap = 10;
	
	setall();

	function drawstatic()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = fill;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		drawobj(ctx,top, "red");
		drawobj(ctx,bottom, "red");
		drawobj(ctx,tube1, "grey");
		drawobj(ctx,tube2, "grey");
	}
	function draw()
	{
		drawstatic();
		drawobj(ctx,box,"black");
		move(tube1 , 1);
		move(top,1);
		if(top[0][1] + ht1 < box_starty)
			tmHandle = window.setTimeout(draw, 1000 / fps);
		else
		{
			graph();
		}	
			
	}
	let chart;
	let tmHandle = window.setTimeout(draw, 1000 / fps);
	
	function graph() 
	{
		let dps = []; 
		chart = new CanvasJS.Chart("chartContainer", 
		{
			title :{
				text: "Stress v/s Strain" 
			},
			axisY: {
				includeZero: true,
				title: "Stress (MPa)"
			},
			axisX: {
				includeZero: true,
				title: "%Strain"
			},      
			data: [{
				type: "line",
				dataPoints: dps
			}]
		});
		let j=0;
		let xVal = 0;
		let yVal = 0; 
		let updateChart = function () 
		{
			xVal = charts[j].xx;            
			yVal = charts[j].yy;        
			dps.push({
						x: xVal,
						y: yVal
				});
			
	
			if (dps.length > 100)
				dps.shift();
			document.getElementById("stress").innerHTML = stress[j].toString() + " Mpa";
			document.getElementById("strain").innerHTML = strain[j].toString();
			document.getElementById("load").innerHTML = load[j].toString() + " N";
			document.getElementById("deformation").innerHTML = deformation[j].toString() + " mm";
			if(j<stress.length)
			{
				chart.render();
				j++;
				id = window.setTimeout(updateChart, 5000 / fps);
			}
			if(j == stress.length)
			{
				drawstatic();
				drawobj(ctx,box_part1, "black");
				drawobj(ctx,box_part2, "black");
			}
		};		
		let id = window.setTimeout(updateChart, 5000 / fps);
	}
})

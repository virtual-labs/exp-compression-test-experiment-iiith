var a;
var ui;
function yo()
{	graph();
	ui=0;
	var id11 = setInterval(frame11, 500);
  	var id12 = setInterval(frame12, 500);
  	var id13 = setInterval(frame13, 500);
  	var id14 = setInterval(frame14, 500);
  	var id15 = setInterval(frame15, 500);

function frame13()
{	//document.getElementById("bt3").innerHTML=ui;
	if(ui<22)
		{
			ui++;
		}
	else if(ui==22)
		{
			document.getElementById("ltrapeze").style.left=150 + 'px';
			document.getElementById("rtriangle").style.left=215 + 'px';
			document.getElementById("rrec").style.left=240 + 'px';
		}
}
var i=0;
  function frame11() {
  	len1=[0.8001,1.6002,2.4002,3.2003,4.0004,4.8005,5.6006,6.4006,7.2007,8.0008,8.8009,9.6010,10.4010,11.2011,12.0012,12.8013,13.6014,14.4014,15.2015,16.0016,16.8017,17.5778];
  	if(i==22){
  		clearInterval(id11);
  	}
  	else{
  	
  	document.getElementById("pstress").innerHTML=len1[i]+' MPa';}
  	i++;
  	
  }
var j=0;
  function frame12() {
  	len2=[0.8210101,1.0262626,1.180202,1.2828283,1.359798,1.4367677,1.4880808,1.5393939,1.6420202,1.6933333,1.7446465,1.7959596,1.8472727,1.949899,2.0525253,2.1551515,2.2577778,2.360404,2.5143434,2.6169697,2.8735354,3.2327273];
  	if(j==22){
  		clearInterval(id12);
  	}
  	else{
  	
  	document.getElementById("pstrain").innerHTML=len2[j];}
  	j++;
  	
  }
var l=0;
  function frame14() {
  	len4=[2000,4000,6000,8000,10000,12000,14000,16000,18000,20000,22000,24000,26000,28000,30000,32000,34000,36000,38000,40000,42000,43940];
  	if(l==22){
  		clearInterval(id14);
  	}
  	else{
  	
  	document.getElementById("pload").innerHTML=len4[l]+' N';}
  	l++;
  	
  }
var m=0;
  function frame15() {
  	len5=[0.4064,0.508,0.5842,0.635,0.6731,0.7112,0.7366,0.762,0.8128,0.8382,0.8636,0.889,0.9144,0.9652,1.016,1.0668,1.1176,1.1684,1.2446,1.2954,1.4224,1.6002];
  	if(m==22){
  		clearInterval(id15);
  	}
  	else{
  	
  	document.getElementById("pdeformation").innerHTML=len5[m]+' mm';}
  	m++;
  	
  }
}


function myfun1()
{	a=0;
	var elem1=document.getElementById("upa");
	var elem2=document.getElementById("upb");
	var elem3=document.getElementById("ltrapeze");
	var elem4=document.getElementById("rtriangle");
	var elem5=document.getElementById("rrec");
	var pos1=140;
	var pos2=250;
	var pos3=351;//655
	var pos4=418;//714
	var pos5=443;//739
	var id1 = setInterval(frame1, 100);
	var id2 = setInterval(frame2, 100);
	
	function frame1() {
 
    if (pos1 == 190) {
      clearInterval(id1);
    } else {
      pos1++; 
      elem1.style.top = pos1 + 'px'; 
    }
  }
  function frame2() {   
    if (pos2 == 300) {
      clearInterval(id2);
    	//frame3();
    	yo();
    } else {
      pos2++; 
      elem2.style.top = pos2 + 'px'; 
    }
  }
function frame3(){
elem3.style.left=pos3 + 'px';
elem4.style.left=pos4 + 'px';
elem5.style.left=pos5 + 'px';
	}


}

function myfun2()
{
	 var x = document.getElementById("chartContainer");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

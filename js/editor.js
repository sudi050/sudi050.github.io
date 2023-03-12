var data_backup
var img=new Image();
img.src="https://source.unsplash.com/random/300x300?cars";
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d",{willReadFrequently:true});
img.onload=()=>{
    ctx.drawImage(img,0,0,500,500);
    data_backup=ctx.getImageData(0,0,canvas.width,canvas.height).data;
};
const sleep=(milliseconds)=>{
    return new Promise(resolve=>setTimeout(resolve,milliseconds))
}
document.querySelectorAll(".slider").forEach((slider)=>{
    slider.addEventListener('input',function(e){
        console.log(e.target.value);
        var i=slider.id=="red"?0:slider.id=="green"?1:slider.id=="blue"?2:3;
        var imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
        var data=imageData.data;
        for(;i<data.length;i+=4){
            data[i]=data_backup[i]+parseInt(e.target.value);
        }
        ctx.putImageData(imageData,0,0);
    });
});

function add(){
    img.src=document.getElementById("title").value;
}


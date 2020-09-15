  let img1;
  let index=0;
  let imgs=[];
function preload()
{
  for(let i=0;i<6;i++)
  {  
    imgs[i] = loadImage((i+1)+".jpg");
  
  }

}
function setup()
{
  img1=new Img();
  createCanvas (300,300);

  img1.setupImg(index);
}
function draw()
{       
   if(index>6)
   {
    index=1;
    img1.setupImg(index);
    
   }
   if(frameCount%1200==0)
   {
   img1.setupImg(index);
   
   }
    
 
  
  fill(0,100);
  rect(0, 0, width, height);
  loadPixels();
  img1.update(); 
  img1.show();

}
class Img
{
  constructor()
  {
  this.image1=new Array();//图像像素数组
  this.img=createImage();        //图像指针
  this.x=0;
  this.y=0//像素位置
  this.cx=0;         //图像屏幕边缘差
  this.cy=0;
  }

 
  

   setupImg(IN)    //setupImg对象
  {
    
    this.img=imgs[IN];//读取图像
    index++;
    this.x=this.img.width/width;           //图像宽
    this.y=this.img.height/height;          //图像高
   // this.cx=(width-this.x)/2;        //图像屏幕边缘差
   // this.cy=(height-this.y)/2;

    for(let i=0;i<this.y;i++)
    { this.image1[i]=new Array();
      for(let j=0;j<this.x;j++)
      {this.image1[i][j]=new Array();
        for(let k=0;k<7;k++)
        {
        this.image1[i][j][k]=0;
        }
      }
    }
    for(let i=0;i<this.y;i++)
    {
      for(let j=0;j<this.x;j++)
      {
        this.image1[i][j][0]=red(this.img.get(j,i));  //读取图像像素信息
        this.image1[i][j][1]=green(this.img.get(j,i));
        this.image1[i][j][2]=blue(this.img.get(j,i));
        
        this.image1[i][j][4]=j;//x                   //读取像素位置信息
        this.image1[i][j][5]=i;//y
        
        this.image1[i][j][3]=                       //求出像素“重量”（y轴移动分量）
         map(this.image1[i][j][0]-this.image1[i][j][2],-255,255,0.2,-0.2)+map(this.image1[i][j][5],0,height,0.05,0.01);
        
        this.image1[i][j][6]=255; //像素透明度
      }
    }
  }
  
   update()//图像数据更新
  {
    for(let i=0;i<this.y;i++)
    {
      for(let j=0;j<this.x;j++)
      {
         
        this.image1[i][j][4]+=random(-0.2,0.2)+this.image1[i][j][3]/2+map(this.image1[i][j][5],0,height,0.08,0.01); //x方向平移分量
        this.image1[i][j][5]+=this.image1[i][j][3];                    //y轴平移分量
         
      }
     }
    

  }
   show()//显示像素
  {

    for(let i=0;i<this.y;i++)
    {
      for(let j=0;j<this.x;j++)
        
        { 

          let temp=color(this.image1[i][j][0],this.image1[i][j][1],this.image1[i][j][2],this.image1[i][j][6]);
          set( (this.image1[i][j][4]),(this.image1[i][j][5]),temp);
     
         // image1[i][j][6]-=0.2;
          
        }
    }
    updatePixels();
  }

}
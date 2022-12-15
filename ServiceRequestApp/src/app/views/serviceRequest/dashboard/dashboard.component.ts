import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { never, NEVER } from 'rxjs';
import domtoimage from 'dom-to-image';
/* in ES 5 */

//declare var fabric: any;
let canvas = new fabric.Canvas('tshirt-canvas');


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  value: any;
  canvas: fabric.Canvas | undefined;
  
  constructor() { }

  ngOnInit(): void {

    //this.logdefine();

    // this.canvas = new fabric.Canvas('tshirt-canvas');
    // var rect = new fabric.Rect({
    //   left: 100,
    //   top: 50,
    //   width: 200,
    //   height: 100,
    //   fill: '#e3e3e3',
    // });

    // var rectGroup = new fabric.Group([rect], {
    //   name: 'Rectangle',
    // });

    // this.canvas.add(rectGroup);

    // fabric.Image.fromURL('../../../../assets/images/batman.png', (img: any) => {
    //   let bounds = rectGroup.getBoundingRect();
      
    //   const scaleFactor = Math.min(
    //     Math.min(1, bounds.width / img.width),
    //     Math.min(1, bounds.height / img.height)
    //   );
    //   img.scale(scaleFactor);
   
    //   img.set({
    //     top: bounds.top + Math.max(bounds.height - img.height * scaleFactor, 0)/2,
    //     left: bounds.left + Math.max(bounds.width - img.width * scaleFactor, 0)/2,
    //   });
 
    //   rectGroup.addWithUpdate(img);
    //   canvas.renderAll();
    // });

  }

  imagerender(event: any){
    var node = document.getElementById('tshirt-custompicture');
    this.value = event.target.value;
    domtoimage.toPng(node!)
        .then(function (dataUrl: string) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
        })
        .catch(function (error: any) {
            console.error('oops, something went wrong!', error);
        });
  }

  selectColorHandler (event: any) {
    //update the ui
    this.value = event.target.value;

    this.addEventListener();

    this.value = null;
  }
  
  addEventListener() {
    if (document.body.contains(document.getElementById('tshirt-color'))) {
      document.getElementById('tshirt-div')!.style.backgroundColor = this.value;
    }

    this.value = null;
  }
  
  updateImg(event: any) {
    if (document.body.contains(document.getElementById('tshirt-design'))) {
      this.selectImgHandler(event);

      this.value = null;
      event = null;

      canvas.setBackgroundImage(event = "", canvas.renderAll.bind(canvas.clear()), {  });
    }    
    
  }

  // Simple Batman Picture in T-Shirt
  selectImgHandler(event: any){
    
    let canvas = new fabric.Canvas('tshirt-canvas');
    this.value = event.target.value;

    if(!this.value){
      canvas.clear();
    }
      // Create a new image that can be used in Fabric with the URL
    fabric.Image.fromURL(this.value, function(img: any) {

      // Define the image as background image of the Canvas
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          // Scale the image to the canvas size
          scaleX: canvas.width! / img.width,
          scaleY: canvas.height! / img.height
          
      });
      img.scaleToHeight(200);
      img.scaleToWidth(200); 
      canvas.centerObject(img);
      canvas.add(img);
      canvas.renderAll();
      img = new img();
      img.clear(img);
      canvas.clear();

    });

    this.value = null;
    canvas.clear();
  }

  UploadPicture(){

    // When the user clicks on upload a custom picture
      document.getElementById('tshirt-custompicture')!.addEventListener("change", function(e){
        var reader = new FileReader();
        const target = event!.target as HTMLInputElement;

        reader.onload = function (event){
            var imgObj = new Image() ;
            var valsar = event.target!.result ;
            var val1 = imgObj.src  || '{}';
            // When the picture loads, create the image in Fabric.js
            imgObj.onload = function () {
                var img = new fabric.Image(val1);
            
                img.scaleToHeight(300);
                img.scaleToWidth(300); 
                canvas.centerObject(img);
                canvas.add(img);
                canvas.renderAll();
            };
        };
      
        // If the user selected a picture, load it
        if(target!.files![0]){
            reader.readAsDataURL(target.files![0]);
        }
      }, false);

  }

    // onKeypressEvent(event: any){
  //           // When the user selects a picture that has been added and press the DEL key
  //   // The object will be removed !
  //   document.addEventListener("keydown", function(e) {
  //     var keyCode = e.keyCode;
    
  //     if(keyCode == 46){
  //         console.log("Removing selected element on Fabric.js on DELETE key !");
  //         canvas.remove(canvas.getActiveObject());
  //     }
  //   }, false);
  // }

    // selectImgHandlerAnimate(event: any){
  //   this.value = event.target.value;

  //   this.canvas = new fabric.Canvas('tshirt-canvas');
  //   var rect = new fabric.Rect({
  //     left: 50,
  //     top: 50,
  //     width: 100,
  //     height: 100,
  //     fill: '#e3e3e3',
  //   });

  //   var rectGroup = new fabric.Group([rect], {
  //     name: 'Rectangle',
  //   });

  //   this.canvas.add(rectGroup);

  //   fabric.Image.fromURL('../../../../assets/images/batman.png', (img: any) => {
  //     let bounds = rectGroup.getBoundingRect();
      
  //     const scaleFactor = Math.min(
  //       Math.min(1, bounds.width / img.width),
  //       Math.min(1, bounds.height / img.height)
  //     );
  //     img.scale(scaleFactor);
   
  //     img.set({
  //       top: bounds.top + Math.max(bounds.height - img.height * scaleFactor, 0)/2,
  //       left: bounds.left + Math.max(bounds.width - img.width * scaleFactor, 0)/2,
  //     });
 
  //     rectGroup.addWithUpdate(img);
  //     canvas.renderAll();
  //   });

  // }

  // updateTshirtImage(imageURL: any){
  //   // If the user doesn't pick an option of the select, clear the canvas
  //   if(!this.value){
  //     canvas.clear();
  // }
  //     // Create a new image that can be used in Fabric with the URL
  //   fabric.Image.fromURL(this.value, function(img: any) {
    
  //     // Define the image as background image of the Canvas
  //     canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
  //         // Scale the image to the canvas size
  //         scaleX: canvas.width! / img.width,
  //         scaleY: canvas.height! / img.height
  //     });
      
  //     img.scaleToHeight(200);
  //     img.scaleToWidth(200); 
  //     canvas.centerObject(img);
  //     canvas.add(img);
  //     canvas.renderAll();

  //     img.clear(img);
  //     canvas.clear();
  //   });

  //   this.value = null;
  //   canvas.clear();

  // }

    // logdefine()
  // {
  //   ( ($) => {
  //     $(document).getElementById("tshirt-color").addEventListener("change", () =>{
  //       $(document).getElementById("tshirt-div").style.backgroundColor = this.value;
  //     }, false);
  //   })(fabric);
  
  //   ( ($) => {
  //     $(document).getElementById("tshirt-design").addEventListener("change", () =>{
  //       this.updateTshirtImage(this.value);
  //     }, false);
  //   })(fabric);
    
  // }

}
  (function (){
    
  App.colorPicker = colorPicker
    
     function colorPicker(arg={}){
      let parent_elem = $('#tools-controller'),
      wd = Math.round((parent_elem.width()/2)+20);
      
      colorPickerOption = {
        container:'#iconic-menu-contents',
        format:'rgba',
        hideOnLeave: false,
        width: 200,
        sliderSize:11,
        height: 80,
        backgroundColor: 'transparent',
        crossSize:6,
        padding:5,
        borderWidth:0,
        shadow:false,
        value:'#204057ce',
        onChange: function(){ App.applyColor(this,this.format,APP.get('menu'),this) }
      };
      arg = arg;
      if(arg && typeof arg === "object"){
        for(let k in arg){
          if(arg.hasOwnProperty(k)) colorPickerOption[k] = arg[k];
        }
      }
      
      picker =  new JSColor('#colorPicker',colorPickerOption) 
      picker.show();
    }
  
    
  }());
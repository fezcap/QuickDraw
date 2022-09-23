  (function (){
    
    function layout (){
      let b = $('body');
      setInterval( () => {
        if(QD.sesStore.get('view') == 'main'){
          createTools( b.width(), b.height() );
          return;
        }
      }, 1);
    }
    
    function createTools(w, h){
      let w2 = (( w / 6 ) * 2 ).toFixed() - 8 ;
      h =  w2 -  ((( h / 5 ) / 4 ).toFixed()) ;
      h = w  > 360 ? h : h + h/2;
      
      let total_cell  = ( ( w / ( w2 / 2 ) ) / 2).toFixed(),
      len = QDTools.length,
      row_wrapper = '<div class="quick-draw-tools-wrapper">',
      print = row_wrapper,
      title_letter = '',
      count = 0,
      cell =   total_cell,
      row = len;
      
      $$.each(QDTools, (obj, i) => {
        count++;
        if(obj.item.indexOf(' ') > -1){
          item_split = obj.item.split(' ');
          title_letter = item_split[0][0] + item_split[1][0];
        }else{
          title_letter = obj.item[0] + obj.item[1];
        }
        
        print += `
          <div class="quick-draw-tool" onclick="App.quickDrawItem('${obj.item}', '${i}', this)" style="width:${w2}px; height:${h}px" >
            <div class="title-letter img">${title_letter.upper()}</div>
            <div class="tool-name">${obj.item.title()}</div>
          </div>
        `;
        
        if( count >= cell){
          print += `</div> ${row_wrapper}`;
          count = 0; 
        }
      });
      
      App.echo(`<div id="main"> ${print} </div>`);
    }
    
   this.PrintMainView = layout;
  }());
  
 (function(){
   const PIN = 'E123S';
   
   
   
    const APP = new createLocalStore('app','session');
    const PAGE = new createLocalStore('pages','local');
    
    const SETTING_DB = createDatabase({
      databaseName: 'settings',
      storeName: 'settings'
    });
    
   /*
    const MENU = new Store('menuItems','session');
    const WINDOW = new Store('window','session');
    const REDO = new Store('redo','session');
    const UNDO = new Store('undo','session');
    */
    
    let autoUpd = false,
    colorPallete = colorize(100);
    
    function init(){
      if(!isLandscapeMode()){
      // App.start()
        //display(HTML.portraitMode());
       // return;
      }
      load(); 
      
    }
    
    function load(opt){
      let cur_window = APP.get('page');
      
      try{
        if(cur_window == undefined){
          display(HTML.start());
        // App.start()
        }else{
          display(HTML[cur_window]());
          App.updatePage();
        }
        
        if(!autoUpd){ autoUpdate() }
        
        
      }catch(err){
        alert('Error detected:\n ' + err);
      }
   }
    
    function configPage(cb){
      setInterval( () => {
        
        let body = $('body'),
        body_w = body.width(),
        body_h = body.height();
        
        let home_elem = $('#home');
        home_elem.height( body_h - 1);
        home_W = home_elem.width();
        home_H = home_elem.height();
       
        
        
      
       cb();
      }, 1);
    }
    
    
    function tab(nam,pos,act){
      let elem = $(`.${nam}`),
      selected_elem = elem[pos];
      if(selected_elem === undefined) return;
      sel = $('#'+elem[pos].id);
      elem.removeClass(`active-${act}`);
      sel.addClass(`active-${act}`);
      return sel;
    }
    
    function addElement(opt,prop,Sto = APP){
      let store = Sto.get(prop);
      if(opt && typeof opt === "object"){ for(let k in opt){ if(opt.hasOwnProperty(k)){ store[k] = opt[k] } } }
      let elem = {}; elem[prop] = store;
      APP.put(elem);
    }
    
    function display(txt, sel, altTxt){
      if(txt && typeof txt === 'object'){
        let PANE_VIEW = {
          tool: t => $('#tools').html(t||altTxt),
          toolControl: t => $('#tools-controller').html(t||altTxt),
          footer: t => $('#footer').html(t||altTxt),
        };
        $$.each(txt, (k, v) => {
          if(!PANE_VIEW.hasOwnProperty(k)) return;
          return PANE_VIEW[k](v);
        });
      }
      else{ $(sel||'#QuickDraw').html(txt) }
      getAppKey();
    }
    
    function isLandscapeMode(){ 
      let orient = window.orientation;
      return orient == -90 || orient == 90 ? true : false ;
    }
    
    async function screen_rotate_n_fullscreen(){
      let fullScreenCheck = () => {
        if(document.fullscreenElement) {return;}
        return document.documentElement.requestFullscreen();
      };
      try { await fullScreenCheck() }
      catch (e){ /* alert(e) */}
      await screen.orientation.lock('landscape');
    }
    
    function autoUpdate(){
      setInterval( () => {
        autoUpd = true;
        
      },1);
    }
    
    function getAppKey(){
      $('button').on('click', function (){
        key = $(this).attr('id');
        
      });
    }
    
 /*******/   
 
    
 
 /*******/   
    
    
    
    const App = {
      start: function (){
        screen_rotate_n_fullscreen();
        APP.put({ 
          isStart: true,
          page: 'home',
          pageNum:0,
          tabElement: {}
        });
        display(HTML.home(QuickDraw));
        
        this.updatePage();
      },
      
      updatePage: function (){
        
       // this.loadMenu();
       // this.pageControl();
        //  moveMenuIcon()
         // movePage()
        configPage(() => { })
      },
      
      downloadDrawing: function(){
        let el = document.getElementById('drawingPage');
        html2canvas(el,{ allowTaint: true, useCORS: true })
        .then(function(canvas) {
          var newData = canvas.toDataURL().replace(/^data:image\/png/, "data:application/octet-stream");
          $('#download').attr({
            href:newData,
            download:'QuickDraw.jpg',
            target:'_blank'
          })
        });
      },
      
      footerContents: function(){
        return
      },
      
      gridlines: function (){
        let wrapper = $('.page'),
        grid = '', size = '10px';
        w = wrapper.width().toFixed();
        h = wrapper.height().toFixed();
        total_grid_width  = (((w/(9/2)).toFixed())/2).toFixed()-2;
        total_grid_height = ((((h/(9/2)).toFixed())/2).toFixed())-1;
       
        $$.each(`1-${total_grid_height}`, i => {
          grid += `<div class="grid-row" style="height:${size};display:flex">`;
          $$.each(`1-${total_grid_width}`, j => {
            if(j%2 == 0) grid += `<div class="grid-col grid-r-b" style=""></div>`;
            else grid += `<div class="grid-col grid-b-r" style=""></div>`;
          });
          grid +=' </div>';
        });
      //  wrapper.html(grid);
      },
      
      openMenu: function(){
        let menu_ele = $('#menu-contents-wrapper');
        
        menu_ele.fadeIn(250)
        .animate({height: '40%'},200,function(){
          let $this = $(this);
          
         el = moveItem('menu', {
            y: $this.offset().top-22,
            manual:true,
            element: function (el){
              el.addClass('open-menu')
              el.html(HTML.icon.cancel())
            }
          })
       
          
        })
        
      },
      
      loadMenu: function (arg,key,indx,elem){
        let tabOption = APP.getAll().tabElement.menu,
        print_menu_items = '',
        clas = 'main-menu-list',
        activeStyle = ' active-main-menu',
        index = -1;
        if(arg === true){
          addElement({ menu: { index: indx, id:key,/* offset: setTab(indx) */}},'tabElement');
          menuItems(indx);
        }
        else{
          $$.each(menuItems(), (k, callBack) => {
            index++;
            print_menu_items += $$.tag({ text:k.upper(), attr: { id:k, 'class': `transition ${clas}`, onclick: `App.loadMenu(true,'${k}',${index},this)` }});
          });
          display(print_menu_items,'.menu');
        //  setTab(tabOption ? tabOption.index : 0, tabOption ? tabOption.offset : 0);
          menuItems(tabOption ? tabOption.index : 0);
        }
        
        function setTab(n, old_offset,callBack){
          let sel = tab(clas, n, activeStyle),
          cur_offset = Math.round(sel.offset().left);
          if(old_offset && cur_offset > 500 ){
            sel.parent().animate({ scrollLeft: cur_offset-old_offset }, 0 )
          } return cur_offset;
        }
      },
      
      pageControl: function(key){
        display({footer:HTML.createBlankPagePane()});
        let page_window = $('#drawingWindow'),
        page = PAGE.getAll()
        
        if(!pageNum){
          alert(5)
          PAGE.put({numbering: 1})
        }
        pageNum =  page.numbering;
        
        const pageContrl = {
          add: function (){
            let pageId = $$.guid(true);
          //  pageNum++;
            //alert(pageNum)
           //PAGE.put({numbering: page.numbering})
           // pg++;
            
            function newPage(){
              page.html($$.tag({attr: {
                id:pageId, 'class': 'page',
                'style':`
                  
                  width:50%; height:90%;
                  background:${colorize(100)[$$.randNum(1,50)]}
                `
              }}));
            }
            
            
          },
          previous: function(){
            
          }
        }
        
        
       if(key) pageContrl[key]();
        
       // display(pg,'#page-numbering');
        
      },
      
      getSelectedTool: function(tool,typ, elem, nam, id, indx){
        elem = decrypt(elem);
        
        if( !APP.getAll()[tool] ){
          let item = {};
          item[tool] = {};
          APP.put(item);
        }else{
          addElement()  
        }
       
        
        
        
        let tool_manager = {
          newTool: function (){
            css(`
              #${id}{
              position:fixed;
              z-index:8000;
              margin:50px 100px;
                background:${colorize(100)[$$.randNum(2,80)]} !important
              }
             `);
            
            $('.page').append(elem)
          },
          
          editTool: function(){
            alert(typ)
          }
        }[typ]();
        
        
        if(indx !== 'null'){ menuItems(indx) }
      },
      
      pageSetting: function(type,val,subType){
      },
      
      applyColor: function(colr,type,key){
        let $this = this;
      
      },
      
      
    };//App
    
    
    function menuItems(index){
      let echo = { 'tool': null,toolsController:null},
      sel = '', altTxt = 'empty';
      
      const ITEM = {
        tool: function(self){
          let fill = '#555ddd',
          print_size = 100,
          shape_size = 28;
          
          let toolItems = Shapes
          
          /*// GENERATING TOOLS ITEMS //*/
          let print_tools ='', _index = -1;
          
          $$.each(toolItems, (k, v) => {
            let id = $$.guid(true), elem = ''; _index++ ;
            wrapper = t => $$.tag({ text: v(t), attr: {id: `tool-${k}`, 'class': 'tool-items'} } );
            default_attr = (s,w,h,el,typ,_indx=index) => `id="${id}" style="${s || ''} width:${w}px; height:${h}px" onclick="App.getSelectedTool('${self}','${typ || 'newTool'}', '${el || ''}', '${k}', '${id}', '${_indx}', ${_index})"`;
            randColr = colorize(1002)[$$.randNum(1,1000)];
            if(k == 'container'){
              elem = encrypt( v(default_attr(`background:${randColr};`, print_size, print_size, null, 'editTool',null)));
              print_tools += wrapper( default_attr(`background:${fill};`, shape_size, shape_size, elem,null,index));
            }else{
              elem = encrypt( v(default_attr(`fill:${randColr};`,print_size,print_size, null, 'editTool',null)));
              print_tools += wrapper( default_attr(`fill:${fill};`, shape_size, shape_size, elem,null,index));
            }
          });
         echo.tool = $$.tag({text: print_tools, attr: {id: 'tool-bar'}});
        },
        
        Text: function(){ 
          
          
        }
      };
      
      
      /*//////calling menu items //*/
      let ITEM_ARR = Object.keys(ITEM);
      selected_tool = ITEM_ARR[index];
      if(index == undefined) return ITEM;
      else ITEM[selected_tool](selected_tool);
      display(echo,sel,altTxt);
    }
    
    function colorPicker(arg){
      let parent_elem = $('#tools-controller'),
      wd = Math.round((parent_elem.width()/2)+20);
      
      colorPickerOption = {
        container:'#color-picker-container',
        format:'rgba',
        hideOnLeave: false,
        width: wd,
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
      arg = arg.colorPickerOption;
      if(arg && typeof arg === "object"){
        for(let k in arg){
          if(arg.hasOwnProperty(k)) colorPickerOption[k] = arg[k];
        }
      }
      
      picker =  new JSColor('#colorPicker',colorPickerOption) 
      picker.show();
    }
    
    function palette(typ){
      let col_palette = '#204057 #000000 #00ff00 #ff0000 #0000ff #ffffff #111111 #7d7d7d #870014 #ec1c23 #ff7e26 #fef100 #22b14b #00a1e7 #3f47cc #a349a4 #c3c3c3 #b87957 #feaec9 #ffc80d #eee3af #b5e61d #99d9ea #7092be #c8bfe7'.split(' '),
        colors = '',
      
      temp_palette = col_palette.concat(colorPallete);
      
      if(typ === true){
        $$.each(temp_palette,(v ,i)=> {
          colors += `${$$.tag({
            elem: 'button',
            attr: {
              id: v,
              onclick:`App.applyColor('${v}','hex','${APP.get("menu")}',this)`,
              style: ` background:${v}`,'class':`color-pallete`
            }
          })}`;
          if(i%2) colors += '<br>';
        });
        
        return colors;
      }else{
        return col_palette;
      }
    }
    
    function colorize(n){ 
      let colors = [],
      colorVal = 16777215, totalColor = n || 1, hex, singleHex,
      hexChars = '0123456789ABCDEF', hexChars_arr = hexChars.split('');
      for(let i = 0; i < totalColor; i++){
        hex = toHexGen( Math.round(Math.random() * colorVal) );
        for(let a = 0; a < hexChars_arr.length; a++) singleHex = hexChars_arr[ Math.round(Math.random()*16) ];
        while (hex.length<6) hex = `${hex}${singleHex}`;
        colors.push(`#${hex}`);
      }
      
      function toHexGen(n){
        let j,k,temp = '';
        if(n == 0) return n;
        while(n!=0){ j = n%16; n = (n-j)/16; temp += hexChars.charAt(j) }
        return temp;
      }
      return colors;
    }
    function premiumUsers(key,index){
      if(premium().includes(key)){
        return true;
      }
   }
   
    function premium(){
      return []
    }
    
   
  
  
  
    function minimize(txt,typ){ return txt.split(typ || '\n').map(t => t.trim()).join('') };
    function encrypt(c,p){ return CryptoJS.AES.encrypt(c,p||PIN).toString() };
    function decrypt(c,p){ return CryptoJS.AES.decrypt(c,p||PIN).toString(CryptoJS.enc.Utf8) };
    function css(s){
      let style = document.createElement('style');
      style.textContent = minimize(s);
      document.head.append(style);
    }
    
    
    function moveItem(id, obj){ 
      let elem = document.getElementById(id),
      el = $(elem), moveObj = {},
      startPosX = 0, deltaX = 0, 
      startPosY = 0, deltaY = 0,
      
      hm = new Hammer.Manager(elem);
      hm.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
      
       callBack('element',el,elem)
      
      if(obj.manual != undefined ){
        createMovement(obj.x || elem.offsetLeft, obj.y || elem.offsetTop);
        return;
      }
     
      hm.on('panstart', function(e){
        startPosX = elem.offsetLeft;
        startPosY = elem.offsetTop;
        callBack('onStart', startPosX, startPosY, e);
      })
      .on('panmove', function(e){
        deltaX = startPosX + e.deltaX;
        deltaY = startPosY + e.deltaY;
        createMovement(deltaX,deltaY,e);
      })
      .on('panend', function(e){
        if(typeof obj == 'object' && obj.elastic == true){
          moveObj.transition = `all ${obj.elasticSpeed || 0}s`;
          moveObj.top = startPosY + 'px';
          moveObj.left = startPosX + 'px';
        }
        el.css(moveObj);
        callBack('onEnd', moveObj.left, moveObj.top, e );
      });
      
      function createMovement(x, y, e){
        let direction = obj.direction || 'all',
        parW = el.parent().width(),
        parH = el.parent().height(),
        eleW = el.width(),
        eleH = el.height(),
        offsetX = el.offset().left,
        offsetY = el.offset().top,
        posX_diff = (offsetX - x) / 2,
        temp_posX = x + eleW,
        total_posX = (temp_posX + posX_diff),
        posY_diff = (offsetY - y) / 2,
        temp_posY = y + eleH,
        total_posY = (temp_posY + posY_diff);
        
        moveObj.left = `${x}px`;
        moveObj.top = `${y}px`;
        moveObj.transition = `all ${obj.movingSpeed || 0}s`;
        
        if(el.css('position') == 'auto' || el.css('position') == 'static') moveObj.position = 'absolute';
        if( total_posX + (obj.boundary || 0)  > parW  || total_posX - (obj.boundary || 0) < eleW) delete moveObj.left;
        if( total_posY + (obj.boundary || 0)  > parH  || total_posY - (obj.boundary || 0) < eleH) delete moveObj.top;
        if(direction.toLowerCase() == 'x') delete moveObj.top;
        if(direction.toLowerCase() == 'y') delete moveObj.left;
        
        el.css(moveObj);
        callBack('onMove', moveObj.left, moveObj.top, e);
      }
      
      function callBack(cb, x, y, e){
        if(typeof obj == 'object' && typeof obj[cb] == 'function'){
          obj[cb](x, y, e);
        }
      }
      return el;
    }
    
    
  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener("orientationchange", init, false);
  this.App = App;
  }());

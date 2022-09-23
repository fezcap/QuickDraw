  (function (){
    
    const PIN  = QD.pid;
    
    function checkInitScript(){
      QD.initScripts.fail(init)
      .done(function(){
        QD.includedScripts.fail(init).done(init);
      });
    }
    
    function init(){
      if(this.url){
        let failUrl = this.url.split('?')[0];
        alert(failUrl+' fail to load...');
        //stop if one or more miss or not load
        return;
      }
      
      //## start app if all libraries and other fully load //
      
      const STORE_NAME = 'QD_STORE';
     
      QD.locStore = new createLocalStore(STORE_NAME, 'local');
      QD.sesStore = new createLocalStore(STORE_NAME, 'session');
      QD.db = createDatabase({
        databaseName: 'QD_DATABASE',
        storeName: STORE_NAME
      });
      QD.includedScripts
      ready();
    }
    
    function ready(){
      if(QD.sesStore.get('isStart') == undefined){
        echo(Html.start());
        return;
      }
      App.updatePage();
    }
    
    const App = {
      start: function (typ){
        QD.sesStore.put({
          isStart: true,
          view: 'main'
        });
        rotate_fullscreen();
        this.updatePage();
      },
      
      updatePage: function (){
        let store = QD.sesStore.getAll(),
        view = store.view,
        toolIndex = store.toolIndex;
        
        if(view == 'main'){
          PrintMainView();
         
        } 
        if(toolIndex != undefined){
          this.quickDrawItem(store.toolName, store.toolIndex, store.toolEvent);
        }
        
      },
      
      quickDrawItem: function (item, indx, evt){
        let obj = QDTools[indx],
        itemSrc = obj.alt || item,
        getItem = QD.runJS([itemSrc],'tools/');
        getItem.fail(function (){
          alert(this.url)
        })
        .done(function (d){
          QD.sesStore.put({
            view: itemSrc,
            toolIndex: indx,
            toolEvent: evt,
            toolName: item
          });
          
          App[itemSrc](obj, itemSrc, indx);
         });
      }
   
    };
    
    function echo(txt, sel, altTxt){
      css(Style(), 'QDStyle');
      $(sel||'#QuickDraw').html(minimize(`${txt}`));
      //getAppKey();
    }
    
    function orientationChange(){
      
    }
    
      function isLandscapeMode(){ 
      let orient = window.orientation;
      return orient == -90 || orient == 90 ? true : false ;
    }
    
    async function rotate_fullscreen(){
      let fullScreenCheck = () => {
        if(document.fullscreenElement) {return;}
        return document.documentElement.requestFullscreen();
      };
      try { await fullScreenCheck() }
      catch (e){ /* alert(e) */}
      await screen.orientation.lock('landscape');
    }
  
    function encrypt(c,p){ return CryptoJS.AES.encrypt(c,p||PIN).toString() }
    function decrypt(c,p){ return CryptoJS.AES.decrypt(c,p||PIN).toString(CryptoJS.enc.Utf8) }
   
    function minimize(txt,typ){ return txt.split(typ || '\n').map(t => t.trim()).join('') }
    function css(s, id){
      let style = document.createElement('style');
      style.id = id;
      style.textContent = minimize(s);
      document.head.append(style);
    }
    
    function screenRotate (cb) {
      window.addEventListener("orientationchange", cb, false);
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
    
    function setTab(n, old_offset, diff){
          let sel = tab(clas, n, activeStyle),
          cur_offset = Math.round(sel.offset().left);
          if(old_offset && cur_offset > diff || 500 ){
            sel.parent().animate({ scrollLeft: cur_offset-old_offset }, 0 );
          } return cur_offset;
     }
     
    
    App.encrypt = encrypt;
    App.decrypt = decrypt;
    App.pin = PIN;
    App.tab = tab;
    App.css = css;
    App.echo = echo;
    App.isLandscapeMode = isLandscapeMode;
    App.screenRotate = screenRotate;
    App.colorA = '204056';
    App.colorB = '8aaa8a';
    
    checkInitScript('initialize');
    this.App = App;
  }());
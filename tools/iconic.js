  (function (){
alert($$)
    let _ = $$.guid(true).times(100),
    cls = 'iconic-menu-list',
    menuSvg = '<svg viewBox="0 0 24 24"><path d="M3 6h18v2.016H3V6zm0 6.984v-1.969h18v1.969H3zM3 18v-2.016h18V18H3z"/></svg>',
    iconicStore = elem => {
      let store = { iconic: elem };
      return QD.sesStore.put(store).getAll();
    };
    
    App.selectedMenuItem = function(k,v){
      v = this.decrypt(v);
      let layer = $('.layer'),
      store = QD.sesStore.getAll();
      
      layerId = store.layerId || 0;
      
      layer.eq(layerId).append(v);
      
      
      
     this.iconicMenu('style', 1, 0);
      
    };
    
    App.iconicMenu = function (k, indx, pos){
      let menuElem = {
        icons: function (obj){
          
          QD.runJS([obj.dataSrc])
          .fail(function () {
             alert('can not load icon s')
          })
          .done(function (){
            App.getSVGIcon(obj)
          });
        },
        
        style: function(){
          QD.runJS(['tools/stylish'])
          .fail(function () {
             alert('can not load stylish')
          })
          .done(function (){
            App.colorPicker()
            //App.creat(obj)
          });
          
        },
        
        home: function(){
          
        }
      },
      
      store = iconicStore({menu: {
        index: indx, item: k, pos: pos
      }}).iconic,
      obj = QDTools[pos];
      menuElem[k](obj, store);
      App.tab(cls, indx, 'iconic-menu');
    };
    
    App.iconic = function(obj, itemSrc, indx){
      let store = QD.sesStore.getAll().iconic,
      menuIndex = store ? store.menu.index : 0,
      data = Html[itemSrc](obj, indx).split('|');
      
      this.echo(data[1]);
      this.css(App[itemSrc + 'Css'](obj,));
      this.iconicMenu(data[0], menuIndex, indx);
      
    };
    
    Html.iconic = function(obj, indx){
      let list = 'icons style home'.split(' '),
      store = QD.sesStore.getAll().iconic,
      print_list = '',
      currentMenuItem = '';
      
      $$.each(list, (k, i) => {
        let list_elem = c => `<a id="${k}" onclick="App.iconicMenu('${k}', ${i}, ${indx} )" class="${c}">${k.title()}</a>`,
        indx = store ? store.menu.index : 0;
        
        if( i == indx ){
          iconicStore({menu: {
            index: indx,
            item: k
          }});
          currentMenuItem += k;
          print_list += list_elem( cls + ' active-iconic-menu' );
        } else {
          print_list += list_elem(cls);
        }
      });
      
      return `${currentMenuItem}|
        <div id="${_[1]}">
          <div id="title-bar">
            <div id="title-text">
              <h2> QuickDraw » <a>${obj.item.title()}<a> </h2>
            </div>
            <div class="menu"> ${menuSvg}</div>
          </div>
          
          <div id="${_[2]}">
            <div id="default-layer" class="layer"></div>
          </div>
          
          <div id="${_[3]}" class="iconicContent">
            
            <div id="icon-header">
              <div id="icon-tool">${print_list}</div>
              <div id="save-bar">
                <svg id="save" viewBox="0 0 17 17"><path d="M14.164 0H1.5C.673 0 0 .673 0 1.5v14c0 .827.673 1.5 1.5 1.5h14c.827 0 1.5-.673 1.5-1.5V2.776L14.164 0zM8 1v4h3V1h1v5H4V1h4zM3 16v-6h11v6H3zm13-.5a.5.5 0 0 1-.5.5H15V9H2v7h-.5a.5.5 0 0 1-.5-.5v-14a.5.5 0 0 1 .5-.5H3v6h10V1h.756L16 3.196V15.5z"/></svg>
                <a id="download" onclick="App.downloadDrawing(this)"><svg id="download-icon" viewBox="0 0 26 28"><path d="M20 21c0-.547-.453-1-1-1s-1 .453-1 1 .453 1 1 1 1-.453 1-1zm4 0c0-.547-.453-1-1-1s-1 .453-1 1 .453 1 1 1 1-.453 1-1zm2-3.5v5a1.5 1.5 0 0 1-1.5 1.5h-23A1.5 1.5 0 0 1 0 22.5v-5A1.5 1.5 0 0 1 1.5 16h7.266l2.109 2.125c.578.562 1.328.875 2.125.875s1.547-.313 2.125-.875L17.25 16h7.25a1.5 1.5 0 0 1 1.5 1.5zm-5.078-8.891a.984.984 0 0 1-.219 1.094l-7 7c-.187.203-.453.297-.703.297s-.516-.094-.703-.297l-7-7a.984.984 0 0 1-.219-1.094C5.234 8.25 5.594 8 6 8h4V1c0-.547.453-1 1-1h4c.547 0 1 .453 1 1v7h4c.406 0 .766.25.922.609z"/></svg></a>
                <svg id="exit" viewBox="0 0 24 28"><path d="M24 14c0 6.609-5.391 12-12 12S0 20.609 0 14c0-3.797 1.75-7.297 4.797-9.578a1.979 1.979 0 0 1 2.797.391 1.995 1.995 0 0 1-.391 2.797C5.172 9.141 4 11.469 4 14.001c0 4.406 3.594 8 8 8s8-3.594 8-8c0-2.531-1.172-4.859-3.203-6.391a1.995 1.995 0 0 1-.391-2.797 1.981 1.981 0 0 1 2.797-.391A11.877 11.877 0 0 1 24 14zM14 2v10c0 1.094-.906 2-2 2s-2-.906-2-2V2c0-1.094.906-2 2-2s2 .906 2 2z"/></svg>
              </div>
              <div class="menu">${menuSvg}</div>
            </div>
            <div id="iconic-menu-contents"></div>
               <input id="colorPicker" type="hidden">
        
          </div>
        </div>
      `;
    };
    
    App.iconicCss = function(){
      let css = App.CONST_CSS;
      return `
        #title-bar {
          width:100%;
          height: 42px;
          position: fixed;
          top: 0;
          display: flex;
          background:#${App.colorA};
          border-bottom: 1px solid #${App.colorA};
          box-shadow: 0 2px 14px #${App.colorA};
        }
        
       .menu{
          width:15%;
          ${css.middle}
        }
        
        .menu svg{
          fill: #${App.colorB};
          width: 38px;
          height: 38px;
          margin-top: 5px
        }
        
        #title-text{
          width: 85%;
        }
        
        #title-bar h2{
          color: #${App.colorB};
          font-family: ${FontName(8)};
          font-weight:light;
          margin-top: 1px;
          margin-left: 16px;
        }
        
        #title-bar h2 a{
          color: #00ff00;
        }
        
        #${_[1]} {
          width:100%;
          height: 100%;
          background:#f1f1f1;
          ${css.disabledSelection}
        }
        
        #${_[2]} {
          width: 100%;
          height: 38%;
          ${css.middle}
          position: fixed;
          top: 7%;
        }
        
        #${_[3]} {
          width:100%;
          height: 55%;
          position: fixed;
          bottom: 0;
          background:#${App.colorA};
        }
        
        #iconic-menu-contents{
          padding:8px;
          margin: 0 5px 0 5px;
          overflow:scroll;
          background: #eeeeee;
          box-shadow: 0 0 20px inset #204056;
        }
        
        .layer{
          width:290px;
          height:210px;
          position: absolute;
          box-shadow: 0 4px 8px #204056;
          padding: 1px;
          margin: 8px;
          border:0.3px solid #204056;
          ${css.middle}
        }
        
        #icon-header{
          width: 100%;
          height: 42px;
          background:#${App.colorA};
          display:flex
        }
       
        #icon-header .menu {
          display: none
        }
        
        #icon-tool{
          width: 70%;
          ${css.middle}
        }
        
        #save-bar{
          width: 30%;
          margin: 3px;
          text-align: center;
          background:#f3f3f3;
          border-radius:8px;
          box-shadow: 0 0 14px inset #${App.colorA};
          ${css.middle}
        }
        
        #save-bar svg{
          width: 23px;
          height: 23px;
          fill:#${App.colorA};
          ;
        }
        
        #save-bar a{
          margin: 6px 16px 0 16px;
        }
        
        #exit{
          fill:#dd0000 !important
        }
        
        #icon-tool > a{
          color: #${App.colorB};
          font-size:18px;
          padding: 6px 10px;
          font-family: prototype;
          letter-spacing: 1.2px;
        }
        
        .active-iconic-menu{
          font-size: 20px !important;
          margin-top:0px !important;
          color:#00ee00 !important;
          border-radius: 12px;
          box-shadow: 0 2px 14px #eeeeee;
          background-image: linear-gradient(#${App.colorA},#eeeeee);
        }
        
        @media only screen and (min-width: 600px){
          /* tablets */
          
          #${_[1]} {
            display: flex;
          }
          
          #${_[2]} {
            width: 45%;
            height: 100%;
          } 
          
          #${_[3]} {
            right: 0;
            width: 55%;
            height: 100%;
          }
          
          #title-bar{
            background: #${App.colorA}
          }
          
          #icon-header{
            border-bottom: 1px solid #${App.colorA};
          }
          
          #icon-tool{
            width: 60%
          }
          
          #save-bar{
            width: 32%
            border-top: 1px solid #${App.colorA};
            margin: 2px
          }
          
          #title-bar .menu{
            width: 8%
            display: none
          }
          
          #icon-header .menu {
            ${css.middle}
          }
          
          #icon-header .menu svg{
            margin-top: 2px
          }
          
          
        } /* end tablets */
        
        @media screen and (orientation:landscape) and (display-mode: fullscreen){
          /* fullscreen and landscape */
          
          #icon-header, #title-bar{
            height: 50px;
          }
          
        } /* end fullscreen and landscape */
        
        @media screen and (orientation:portrait) and (display-mode: fullscreen){
          /* fullscreen and portrait */
          
          #x${_[2]} {
            height: 35%;
           }
          
          #x${_[3]} {
            height: 65%;
          }
          
          #icon-header, #title-bar{
            height: 46px;
          }
          
        }/*end fullscreen and portrait */
      `;
    };
    
    }());
  

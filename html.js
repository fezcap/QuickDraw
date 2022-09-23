  (function (){
  
    html = {
      portraitMode: function(opt){
        return (`
          <div id="portrait-mode-container">
            <fieldset>
              
              <legend>QuickDraw</legend>
             
              <h2 id="screen-orientation-warning">
                Kindly Rotate Your Device To Landscape Mode.
              </h2>
              
              <div id="rotate-icon">
                <svg viewBox="0 0 24 24"><path d="M7.5 21.469l1.359-1.313 3.797 3.797L12 24C5.719 24 .562 19.125.047 12.984h1.5c.375 3.75 2.672 6.938 5.953 8.484zm7.313-.281l6.375-6.375-12-12-6.375 6.375zM10.219 1.734l12.047 12.047c.609.563.609 1.5 0 2.109l-6.375 6.375c-.563.609-1.5.609-2.109 0L1.735 10.218c-.609-.563-.609-1.5 0-2.109L8.11 1.734c.563-.609 1.5-.609 2.109 0zm6.281.797l-1.359 1.313L11.344.047 12 0c6.281 0 11.438 4.875 11.953 11.016h-1.5c-.375-3.75-2.672-6.938-5.953-8.484z"></path></svg>
              </div>
              
            </fieldset></div>
          
        `);
      },
      
      start: function (arg){
        let txt = arg == true ? 'RESUME' : 'START';
        return (`
          <div id="start-wrapper">
            <button id="init" onclick="App.start('${txt}',this)">START</button>
          </div>
        `);
      },
      
      preview: function (d){
        return (`
          <div id="preview">
          </div>
        `);
      },
      
      main: function (QuickDraw){
        return `
          <div id="main">
            ${QuickDraw}
          </div>
        `;
      },
      
      page: function (){
        return (`
          <!--
          <div id="drawing-home">
            <div id="page-env">
            <div id="page-wrapper">
              <div  class="page">
              <p id="p1">initial page</p>
              <p id="p2">initial page 22</p>
              </div>
            </div>
            </div>
          </div>
          
          <div id="menu" onclick="App.openMenu()"><svg baseProfile="full" viewBox="0 0 24.00 24.00"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg></div>
          <div id="menu-contents-wrapper">rear bumper</div>
            -->
          </div>
        `);
      },
      
      createBlankPagePane: function(){
        return `
          <div id="create-page-container">
            <div id="create-page-icons">
              <svg onclick="App.pageControl('previous')" viewBox="0 0 24 24"><path d="M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"/></svg>
              <svg onclick="App.pageControl('add')" viewBox="0 0 24 24"><path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"/></svg>
              <svg onclick="App.pageControl('next')" viewBox="0 0 24 24"><path d="M8.578 16.359l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z"/></svg>
              <svg onclick="App.pageControl('remove')" viewBox="0 0 24 24"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293a.999.999 0 1 1-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414L10.586 12 8.293 9.707a.999.999 0 1 1 1.414-1.414L12 10.586l2.293-2.293a.999.999 0 1 1 1.414 1.414L13.414 12l2.293 2.293z"/></svg>
            </div>
            <div id="page-numbering" onclick="App.pageControl('pageList')"></div>
          </div>
        `
      },
      
      colorPickerDialog : function (item){
       
        let output = 'HEX HEXA RGB RGBA'.split(' '),
        colorMode = 'HSV HVS HS HV'.split(' '),
        color_mode = '',
        output_mode = '',
        elem = (v,i,nam,cls) => `<button id="${v}" class="${cls}" onclick="App.getSelectedMenuItem('${v}','${i}','${nam}',this)">${v}</button>`;
        
        $$.each(colorMode, (v,i) => { 
          let cls = 'color-picker-mode',
          name = 'colorPickerMode';
          if(i == 0) color_mode += elem(v,i,name,cls+' active-color-picker-mode');
          else 
          color_mode += elem(v,i,name,cls);
        });
        
        $$.each(output, (v,i) => { 
          let cls = 'color-output-mode',
          name = 'colorPickerOutputMode';
          if(i == 0) output_mode += elem(v,i,name,cls+' active-color-picker-mode');
          else 
          output_mode += elem(v,i,name,cls);
        });
        
        
        return (`
         <div id="color-picker-container"></div>
         
         <div id="color-picker-output-mode-container"> ${output_mode} </div>
         <div id="color-picker-mode-container"> ${color_mode} </div>
         
          <hr>
          <div id="rgb-range-container">
            <input type="range" id="rgb-red" min="0" max="255" oninput="" value="0" />
            <input type="range" id="rgb-green" min="0" max="255" oninput="" value="0" />
            <input type="range" id="rgb-blue" min="0" max="255" oninput="" value="0" />
          </div>
          <input id="colorPicker" type="hidden">
        `);
      },
      
      
      premiumUserOnly: function(){
         //<div id="premium-container">premium</div>
             
        alert('only premium')
      },
      
      
      
      
        
        
         
    };
    
    function c(){
      
     return ` <div class="main">
    <h2 class="title">Color Generator</h2>
    <div class="color-box">
      color
    </div>
    <div class="code">
      <div class="col">
        <h4 id="rgb">rgb(0,0,0)</h4>
      </div>
      <div class="col">
        <h4 id="hex">#000000</h4>
      </div>
    </div>
    <!--// end color code -->
    <!-- range input -->
    <div class="range">
      <div class="box">
        <h2>R</h2>
      </div>
      <input type="range" id="red" class="red" min="0" max="255" oninput="color()" value="0" />
    </div>
    <div class="range">
      <div class="box g">
        <h2>G</h2>
      </div>
      <input type="range" id="green" class="green" min="0" max="255" oninput="color()" value="0" />
    </div>
    <div class="range">
      <div class="box b">
        <h2>B</h2>
      </div>
      <input type="range" id="blue" class="blue" min="0" max="255" oninput="color()" value="0" />
    </div>
  </div>
  <footer>
    <p>
      &copy;2021. Created by Everstrong
    </p>
  </footer>
  <script type="text/javascript">
    // Created by Qasim
    function color() {
      var red = $("#red").val();
      var green = $("#green").val();
      var blue = $("#blue").val();
      $(".red").html(red);
      $(".green").html(green);
      $(".blue").html(blue);
      var color = "rgb("+red+","+green+","+blue+")";
      $(".color-box").css("background", color);
      $(".menu-list").css({color:color});
      $(".color-box").css("border-color", color);
      $("#rgb").html("rgb("+red+","+green+","+blue+")");
      rhex = Number(red).toString(16);
      ghex = Number(green).toString(16);
      bhex = Number(blue).toString(16);
      var hex = "";
      if (rhex < 10)
        rhex = "0"+rhex;
      if (ghex < 10)
        ghex = "0"+ghex;
      if (bhex < 10)
        bhex = "0"+bhex;
      hex = "#"+rhex+ghex+bhex;
      hex = hex.toUpperCase();
      $("#hex").html(hex);
    }
  </script>`
  
  
    } 
    
    //////iconic///////
    
    let svg = {
      cancel: '<svg baseProfile="full" viewBox="0 0 24.00 24.00"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',
    };
    icon = {}
    for(let k in svg){
      let _icon = svg[k],
      _icon_data = _icon.split('<'),
      path = `<${_icon_data[2]}`;
      
      icon[k] =  attr => {
        let _attr = "svg",
        ATTR = _a => {
          for(let j in _a) _attr += ` ${j}="${_a[j]}" `;
          return `<${_icon_data[1].replace("svg",_attr)}<${_icon_data[2]}<${_icon_data[3]}`;
        };
        
        if(typeof attr == "object") return ATTR(attr);
        else if(attr === "path") return path;
        else return ATTR({});
      };
    }
    
    html.icon = icon
      
    this.Html = html;
  }());
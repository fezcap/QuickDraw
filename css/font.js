  (function(){
    
    let fonts = [
      'minstrels.ttf',
      'Closeness-Bold.ttf',
      'pdark.ttf',
      'prototype.ttf',
      'blackjack.otf',
      'stormfaze.ttf',
      'crashed_scoreboard.ttf',
      'MING____.ttf',
      'amita-regular.ttf',
      'BebasNeue-webfont.woff',
    ];
    
    let printFont = '',
    fontNames = [];
    
    for (let i = 0; i < fonts.length; i++){
      fnt = fonts[i].split('.')[0];
      fontNames[i] = fnt;
      printFont += `
        @font-face{
          font-family: "${fnt}";
          src: url("css/fonts/${fonts[i]}")
        }
      `;
    }
    
    function fontCss(){
      return printFont;
    }
    
    function fontName(n){
      if(n){
        return fontNames[n]
      }
      return fontNames;
    }
    
    this.FontCss = fontCss;
    this.FontName = fontName;
  }());
  (function (){
    
    const style = function (){
      var _ = css();
      
      return `
        *{
          box-sizing: border-box;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        *::-webkit-scrollbar {
          display: none;
        }
        
        html,body{
          width:100%;
          height: 100%;
          background: #204056;
        }
        
        h1,h2,h3,h4,h5,h6,ul,li,p,body{
          padding:0;
          margin:0;
        }
        
        a,input,button,textarea{
          outline:none;
          text-decoration:none;
          -webkit-tap-highlight-color: transparent;
        }
        
        svg{
          opacity: 1.0;
          width:22px;
          height:22px
        }
        
        #QuickDraw{
          width:100%;
          height:100%
        }
        
        #start-wrapper{
          background: #204056;
          width:100%;
          height:100%;
          position: fixed ;
          top:0;
          left:0;
          margin:0;
          padding:0;
          display: flex;
          align-items:center;
          justify-content:center;
        }
        
        #start-wrapper button{
          border: 1px ridge #00dd00;
          width:150px;
          height:150px;
          border-radius:50%;
          color:#006400;
          font-size: 36px;
          font-family: stormfaze;
          box-shadow: 0 0 50px #00ff00;
        }
        
        #main{
          width:100%;
          height:100%;
          background: #eee;
          position:fixed;
          top:0
        }
        
        .quick-draw-tools-wrapper{
          margin:22px 6px;
          box-shadow: 0 4px 8px #204056;
          display: flex
        }
        
        .quick-draw-tool{
          margin:4px;
          text-align: center;
        } 
        
        .quick-draw-tool:nth-child(2){
          margin-left: 0;
          margin-right: 0;
        }
        
        .quick-draw-tool:nth-child(3){
        }
        
        .quick-draw-tool > div:nth-child(1){
          font-size: 30px;
          font-family: prototype;
          font-weight: bold;
          letter-spacing: 2px;
          width:100%;
          height:75%;
          color: #8aaa8a;
          background: #204056;
          text-shadow: 0 2px 1px #444444;
          ${_.middle}
        }
        
        .quick-draw-tool > div:nth-child(2){
          background: #8aaa8a;
          color: #204056;
          height:25%;
          padding:0 1px;
          font-weight: bold;
          font-family: ${ FontName(8) };
          ${_.middle}
        }
        
        ${ FontCss() }
      `;
    };
    
    
  
    function css(){
      return {
        middle: `
          display:flex;
          align-items: center;
          justify-content: center;
        `,
        
        disabledSelection : `
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        `,
        
        transition : `
          -webkit-transition: all 0.6s;
          -o-transition: all 0.6s;
          -moz-transition: all 0.6s;
          transition: all 0.6s
        `
      };
    }
    App.CONST_CSS = css();
    this.Style = style;
  }());
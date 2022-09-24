  <?php
    function css($s=''){
      
      $style = "
        
        body{
          background:#f8f8f8;
        }
        
        *{
          box-sizing: border-box;
        }
              
        .disable-selection{
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        star123456{
          -webkit-transition: all 0.6s;
          -o-transition: all 0.6s;
          -moz-transition: all 0.6s;
          transition: all 0.6s
        }
        
        h1,h2,h3,h4,h5,h6,ul,li,body,p{
          padding:0;
          margin:0;
        }
        
        a,input,button{
          outline:none;
          text-decoration:none;
        }
        
        .hide{display:none}
        .show{display:block}
        .show-i-b{display:inline-block}
        .show-i{display:inline}
        
        .succ_msg{
          width:50%;
          margin:0 auto;
          border:2px solid #06C;
          padding:2px;
          color:#000;
          margin-top:10px;
          text-align:center;
        }
        
        .err_msg{
          width:50%;
          margin:0 auto;
          border:2px solid #F00;
          padding:2px;
          color:#000;
          margin-top:10px;
          text-align:center
        }
        
        #header-wrapper{
          position:fixed;
          top:0;
          z-index:999;
          width:100%;
          height:53px;
          display:flex;
          align-item:center;
          }
        
        .header{
          padding-top:1px;
          background:$D;
          border-bottom:1px solid $L;
          box-shadow: 0 5px 5px -1px rgba(0,0,0,0.5)
        }
  
        
        #site-name{
          letter-spacing:1.5px;
          margin-top:4px;
          font-size:26px;
          font-family: font25;
          font-weight:bold;
        }
        
        #site-name > a > span:nth-child(1){
          color:$W
        }
        
        #site-name > a > span:nth-child(2){
          color:$L
        }
        
        #slogan{
          color:$G;
          font-family:font5;
          font-size:12px;
          font-style:italic;
          font-weight:normal;
          margin-top:-8px
        }
        
        #header-wrapper > div{
         // border:1px solid red
        }
        
        #header-wrapper > div:nth-child(1){
          width:10%;
          margin-left:6px
        }
        
        #header-wrapper > div:nth-child(2){
          text-align:center;
          width:70%;
        }
       
        #header-wrapper > div:nth-child(3){
          width:10%;
        }
        
        #header-wrapper > div:nth-child(4){
          width:10%;
          margin-right:6px
        }
        
        #main{
          margin:4px;
          margin-top:3.8em;
          padding:2px;
          padding-top:16px;
        }
        
        .hd-icon{
          fill:$W;
          width:25px;
          height:25px;
          opacity:1;
          margin:12px 0 0 6px
        }
        
        #menu-icon-open{
          margin:10px 0 0 2px;
        }
        
        #search-icon{
          margin-left:2px;
        }
      
        #account-icon{
          margin-left:2px;
        }
      
        
        /* everything about menus style begin */
        #menu-wrapper{
          position:fixed;
          width:100%;
          overflow:scroll;
          background:#dfffe0;
          padding-top:16px;
          margin:-14px 0 18px 0;
          border-radius:0 0 8px 8px;
          border:3px solid $D;
          display:none;  
          box-shadow: 0 0 8px inset rgba(0,0,0,0.5)
        }
        
        #menu-content{
          position:fixed;
          width:98%;
          padding:0 8px 0 8px;
        }
        
        /* remove header-wrapper border and shadow */
        .hd{
          border-bottom:0;
        }
        
        .hd_hl{
          background:#dfffe0;
          position: relative;
          top:12px;
          //margin-top:5px;
          border-radius:8px 8px 0 0;
        }
        .col1{
          fill:#006530;
          width:30px;
          height: 30px;
         
        }
        
        /* everything about menus style end*/
      ";
      
      
      #########################
              
     
      #########################
       file_put_contents($s.'./css/styles.css',$style);
        //create_css_file($style);
      #########################
    }
    
  ?>
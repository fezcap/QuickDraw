  (function (){
    let lib = include('imirror crypto-js jscolor', 'lib/'),
    main = include('quick-draw-items main-view storage html');
    css = include('style font', 'css/');
    
    const SCRIPTS = [...lib, ...css,...main];
   
    let includedScripts = QD.runJS(SCRIPTS);
    
    function include(str, path) {
      let arr = str.indexOf(' ') > -1 ? str.split(' ') : [],
      output = ' ';
      for(let i = 0; i < arr.length; i++){
        if(arr[i].length){
          output += `${path || ''}${arr[i]}|`;
        }
      }
      return output.substr(0,output.length-1).split('|');
    }
    QD.includedScripts = includedScripts;
  }());

  (function() {
     
     let info=(t,s,r)=>{
      if(t!=$f){ 
        console.log(s)|alert(s)
        } return r;
    },
      
   $u, $n = null,sts='***',NPC=x=>{ return info(x,'Passcode not found.',sts)},RPC=y=>y,
    $t = true,
    $f = false,
    $nb = 'number',
    $a = 'array',
    $s = 'string',
    $o = 'object',
    $fn = 'function',
    $RN=x=>e.randNum(x||2,36),
    sym=`#@%&|!:/`,
    $match = (v,r,p) => v.match(new RegExp(r||`[${sym}]`,p||'g')),
       
    
    $toChars = t => t.split('').map((c) => c.charCodeAt(0)),
    UCDA = x => [[['32414e4l414i51', '2m45424i4l414i51', '35414i4348', '2h4g4i494c', '354151', '324l4e45', '324l4c51', '2h4l474l4j4k', '3b454g4k454d42454i', '37434k4f42454i', '364f4m454d42454i', '2k4543454d42454i'], ['32414e', '2m4542', '35414i', '2h4g4i', '354151', '324l4e', '324l4c', '2h4l47', '3b454g', '37434k', '364f4m', '2k4543']], [['3b4l4e444151', '354f4e444151', '3c4l454j444151', '3f45444e454j444151', '3c484l4i4j444151', '2m4i49444151', '3b414k4l4i444151'], ['3b4l4e', '354f4e', '3c4l45', '3f4544', '3c484l', '2m4i49', '3b414k']]],
    DWH = p => { let w, h; if (window.innerWidth !== $u && window.innerHeight !== $u) { w = window.innerWidth, h = window.innerHeight } else { w = document.documentElement.clientWidth, h = document.documentElement.clientHeight } if (p == 'W') { return w } else if (p == 'H') { return h } else if (p == 'R') { return w + '*' + h } else { return w + 'x' + h } },
    encDec={
      en:(t,p,rdx)=>{
        let rN=rdx||$RN(12),encr,
        sy='&',
        fx=rdx?sy:$n,
        enc = n => ("0"+Number(n).toString(rN)).substr(-2),
        pswd = c => $toChars(e.toStr(p)).reduce((a,b) => a^b,c),
        rPswd = p?e.randChar(fx)+''+e.toStr(p).split('').map($toChars).map(enc).join(''):'';
      
      
       if(t != $u && (e.len(t))){
          t=t.split('');
          if((p != $u||p!=$n) &&(e.len(e.toStr(p)))){ 
            encr = t.map($toChars).map(pswd).map(enc).join('') }
          else{ encr = t.map($toChars).map(enc).join('') }
        }
        
        let encArr = encr.cutCharAt(e.len(encr)/2),
        dv=rdx?9999:e.randNum(100,9999),
        rC1=e.randChar(fx),
        rC2=e.randChar(fx),
        rC3=e.randChar(fx);
        encArr.splice((rdx?1:e.randNum(0,e.len(encArr))),0,rC1,`${rN*dv}${rC3}${dv}${rPswd}`,rC2);
        return encArr.join('');
      },
      de:(enc,p,R,$i)=>{
        enc=enc.replaceAll(' ','');
        let pswd=c=>$toChars(e.toStr(p)).reduce((a,b)=>a^b,c),res;
         if(enc != $u && (e.len(enc))){
          let charSym = $match(enc),
          sLen =charSym!=$n?e.len(charSym):0;
          if(charSym != $n && (sLen == 4 || sLen==3)){
            let strArr = enc.split(new RegExp(`[${sym}]`)),
            chk1 = $match(enc,`^[${sym}]`),
            chk2 = $match(enc,`[${sym}]$`);
            
            if(sLen == 4){
              if(chk1 == $n && chk2 ==$n){ decr(strArr[0]+strArr[4],strArr[1],strArr[2],strArr[3]) }
              else{
                if(chk1 != $n) decr(strArr[4],strArr[1],strArr[2],strArr[3]);
                if(chk2 != $n) decr(strArr[0],strArr[1],strArr[2],strArr[3]);
              }
            }
            if(sLen == 3){
              if(chk1 == $n && chk2 ==$n){ decr(strArr[0]+strArr[3],strArr[1],strArr[2]) }
              else{
                if(chk1 != $n) decr(strArr[3],strArr[1],strArr[2]);
                if(chk2 != $n) decr(strArr[0],strArr[1],strArr[2]);
              }
            }
          }
          else{
          return  info($i,'Wrong format',$u);
          }
        } else { return $u }
      
        function decr(en,rdx,dsr,pcd){ 
          rdx = parseInt(rdx/(dsr-4));
          let txt = $match(en,'.{1,2}','g'),
          psw = pcd?$match(pcd,'.{1,2}','g'):pcd,
          $psw = (psw!=$u&&e.len(psw))?psw.map(h => parseInt(h,rdx)).map(c => String.fromCharCode(c)).join(''):$u;
         
         if(p===$t&&R===sts){res=RPC($psw||NPC($i))}else{
          if(p==$u && psw == $u){ res = txt.map(h => parseInt(h,rdx)).map(c => String.fromCharCode(c)).join('') }
          else{
            if(p != $u && psw != $u){
              if(p === $psw){ res = txt.map(h => parseInt(h,rdx)).map(pswd).map(c => String.fromCharCode(c)).join('') }
              else{ info($i,'Wrong passcode') }
            }
            if(p != $u && psw == $u){ info($i,'The encrypted string has no passcode. Remove the provided passcode!') }
            if(p == $u && psw != $u){ info($i,'The encrypted string has a passcode; provide the passcode!') }
          }
          }
        }
        
        return res;
      }
    },
    tg=o=>{
         if(e.typo(o)==$o){ let attr='',
          tag=o.elem||'div',sTag,eTag,
          elem=['img','input','br','hr'];
          $$.each(o.attr,(k,v)=>{ attr+=` ${k}="${v}"` });
          sTag=t=>`<${tag}${attr}${t==$t?'/':''}>`;
          eTag=t=>`${o.text||''}</${tag}>`;
          return (!elem.includes(tag))?sTag()+eTag():sTag($t);
        }else{return}
      
    };
    DI = dy => {
      var tx = 0,
        _td = 0,
        _cd = 0,
        _rd = 0,
        t = e,
        _tdArr = [],
        _cdArr = [],
        _md = [],
        curMnth = t.month(),
        curMnthNum = t.month('num'),
        mD = t.maxDay(t.pF(curMnthNum - 1));
      t.each('0-12', (i) => {
        tx++;
        var maxD = t.maxDay(i);
        _md.push(maxD);
        _tdArr.push(maxD)
      });
      e.each(_tdArr, (j, k) => { _td += j; if (k < curMnthNum) { _cd += j; if (k == (curMnthNum - 1)) { _cd = t.pF(_cd - (j - e.date())) } } else { _rd += j } });
      _rd = t.pF(_rd + (mD - t.date()));
      if (dy == 'L') { return _rd } else if (dy == 'P') { return _cd } else { return t.toStr(_md[curMnthNum - 1]) }
    },
     
    
    $Mi={
    
  },
  
    $iM =function(k,j) { 
      this.arg=arguments;
      this.param=k;
      let _= this;
      
    };
   
   $iM.prototype=$Mi;
   
    const stack = {
      storage : (k,v,s) => {v = e.typo(v)!=$o?v:JSON.stringify(v);
        s = { LS:localStorage, SS:sessionStorage }[s];
        Storage.prototype.S = function(k,o){ return this.setItem(k,JSON.stringify(o)) };
        Storage.prototype.G = function(k){ return JSON.parse(this.getItem(k))};
        let sL = e.len(s),stores = {},st = sts[0],
        P = () => stores[k],
        exist = (a,b) => (a||stores).hasOwnProperty(b||k),
        add = ($en,$p,$v) => { if($en === $t) s.S(V(e.encrypt(k,$p||$n)),V(e.encrypt($v,$p||$n))); else s.S(k,$v) },
        V = $v => `${sts[0]}${$v}${sts[0]}`,
        R = x => s.removeItem(x),
        fn = {
          setItem:(en,p) => {
            if(exist() && P().encr != $u ){
              R(V(P().encr));add(en,p,v);
            }else{ R(k); add(en,p,v) }
          },
          getItem:p => {
            if(exist()){
              if(P().pcd != sts){
                if(p == P().pcd){
                  return JSON.parse(P().val.replaceAll(`~`,''));
                }
                else{return $f}
              }else{ 
                return JSON.parse(P().val.replaceAll(`~`,''))}
            }else{return}
          },
          token:t => {
            if(exist() && t == sts) return P().pcd; else return $f
          },
          rToken : (o,n) => {
            if((exist() && o == P().pcd)&&(e.len(n))){
              R(V(P().encr)); add($t,n,P().val);
            }
          },
          delItem : p => {
            if(exist()){
              if(P().encr != $u){
                if(P().pcd != sts){
                  if(p == P().pcd){
                    R(V(P().encr));
                  }else{return}
                }else{ R(V(P().encr)) }
              }else{ R(k) }
            }
          },
          adItem : ($v,p,j) => {
            if(exist()){
              let vl = JSON.parse(P().val);
              if(e.typo(vl) != $o){
                let vlL = e.len(vl),
                pos = vl.lastIndexOf('~'),
                str='';
                e.each(`${pos+1}-${vlL}`,i=>{ str+=vl.charAt(i) });
                if($v != str){
                  if(P().encr != $u){
                    if(P().pcd != sts){
                      if(p == P().pcd){
                        R(V(P().encr)); add($t,p,`${vl}~${$v}`);
                      }
                    }else{ R(V(P().encr));add($t,p,`${vl}~${$v}`) }
                  }else{ R(k); add($f,$n,`${vl}~${$v}`) }
                }
              }else{
                let $add = (r,t,d) => {
                   vl[$v]=p;
                     R(r||V(P().encr));
                     add(t==$f?t:$t,d||$n,JSON.stringify(vl))
                       
                }
                ///
                
                
                  if(P().encr != $u){
                    if(P().pcd != sts){
                      if(j == P().pcd){
                        $add($n,$t,j)
                      }
                    }else{ 
                        $add()
                      }
                  }else{
                    $add(k,$f,$n)
                    //not encrypted
                    // R(k); add($f,$n,`${vl}~${$v}`)
                  }
                
                
                
                //
                
              }
            }
          },
          empti : x => s.clear()
        };
        (function(){
          e.each(`0-${sL}`,i => {
            let _k = s.key(i), _v = s.G(_k);
            if((_k[0] == st && _k[e.len(_k)-1] == st) && (_v[0] == st && _v[e.len(_v)-1] == st)){
              let k1 = _k.replaceAll(st,''),
              v1 = _v.replaceAll(st,''),
              pcd = e.decrypt(k1,$t,sts,$f),
              $k = e.decrypt(k1,((pcd != sts)?pcd:$n)),
              $v = e.decrypt(v1,((pcd != sts)?pcd:$n));
              stores[$k] = { key:$k,val:$v,pcd:pcd,encr:k1 }
            }else{ stores[_k] = { val:_v,key:_k } }
          });
        }());
        return fn;
      },
      
    };
    
  let $M = {
    storage : {
      SS:{
        setItem : (k,v,d,p) => stack.storage(k,v,'SS').setItem(d,p),
        getItem : (k,p) => stack.storage(k,$n,'SS').getItem(p),
        getPassword : (k,s) => stack.storage(k,$n,'SS').token(s),
        changePassword : (k,o,n) => stack.storage(k,$n,'SS').rToken(o,n),
        deleteItem: (k,p) => stack.storage(k,$n,'SS').delItem(p),
        addItem: (k,v,p,j) => stack.storage(k,$n,'SS').adItem(v,p,j),
        empty: x => stack.storage($n,$n,'SS').empti(),
      },
      LS:{
        addItem: (k,v,p,j) => stack.storage(k,$n,'LS').adItem(v,p,j),
        setItem : (k,v,d,p) => stack.storage(k,v,'LS').setItem(d,p),
        getItem : (k,p) => stack.storage(k,$n,'LS').getItem(p),
        getPassword : (k,s) => stack.storage(k,$n,'LS').token(s),
        changePassword : (k,o,n) => stack.storage(k,$n,'LS').rToken(o,n),
        deleteItem: (k,p) => stack.storage(k,$n,'LS').delItem(p),
        empty: x => stack.storage(x,$n,'LS').empti(),
        
      },
    },
      
        
    
    
    randChar:x=>{
      let $sym=((x)?x:sym).split('');
      return $sym[e.randNum(0,e.len($sym)-1)];
    },
    toChars: function(t,r=10) {
        return t.split('').map(c => e.toStr(c.charCodeAt(0),r));
      },
      typo: s => typeof s,
      len: l => (e.typo(l) == 'number') ? e.toStr(l).length : l.length,
      isArr: o => Array.isArray(o),
      pF: n => parseFloat(n),
      toStr: (t, r) => t.toString(r),
      str: String.prototype,
      arr: Array.prototype,
      obj: Object.prototype,
      extend: { str: s => { for (let k in s) { e.str[k] = s[k] } return s }, arr: a => { for (let k in a) { e.arr[k] = a[k] } return a }, },
      int: x => {
        let $i = '';
        e.each('0-10', i => { $i += i });
        return Number(`0${$i}`)
      },
      guid: (L, _al) => {
        let _L, cx, alp = e.alpha() + e.alpha($t);
        cx = (_al === $t) ? alp + e.int() : alp;
        let buf = [],
          cL = e.len(cx);
        if (L === $t) {
          let l = Math.round(Math.random() * 50),
            ll = Math.round(Math.random() * 10) + 3;
          _L = (l <= 4) ? l * ll : l
        } else { _L = L || 32 }
        let $buf, Ba = [],
          buf2 = "";
        e.each(`0-${_L}`, (i) => { buf[i] = cx.charAt(Math.floor(Math.random() * cL)) });
        $buf = buf.join('');
        let $x = t => {
          t = t || 1;
          e.each(`0-${t}`, q => { Ba.push(e.guid(L, _al)) });
          return Ba
        };
        e.str.times = x => $x(x);
        return $buf
      },
      isEmpty: o => {
        let t = e,
          _o = j => { let _c; for (let k in j) { _c = (j.hasOwnProperty(k)) ? $f : $t } return (_c === $u) ? $t : _c };
        if (t.typo(o) == $o && (!t.isArr(o))) { return _o(o) }
        if (t.typo(o) == $o && (t.isArr(o))) { return (t.len(o) < 1) ? $t : $f }
        if (t.typo(o) == $s) { return (t.len(o) < 1) ? $t : $f }
      },
      rgbToHex: (r, g, b, p) => {
        var t = e,
          map = t.int() + t.alpha(1, 6),
          hex = '' + map.substr(Math.floor(r / 16), 1) + map.substr((r % 16), 1) + map.substr(Math.floor(g / 16), 1) + map.substr((g % 16), 1) + map.substr(Math.floor(b / 16), 1) + map.substr((b % 16), 1);
        if (p === $t) { return "#" + hex } else if (t.typo(p) === $fn) { return p(e, hex, r, g, b) } else { return hex }
      },
      join: (j, ...v) => v.toString().split(',').join(j),
      hexToRGB: (h, t) => {
        let r, g, b, rgb, hex, P = (a) => parseInt(a, 16),
          S = (s, a, b) => s.substring(a, b);
        if (!h) { return } else {
          h = h.toString();
          if (h.charAt(0) == "#") { h = h.delChar('^') } r = S(h, 0, 2);
          g = S(h, 2, 4);
          b = S(h, 4, 6);
          rgb = e.join(',', P(r), P(g), P(b));
          hex = (t === $t || t === 'true') ? rgb.split(',') : `rgb(${rgb})`
        }
        return hex
      },
      charAtIsUpper: (c, p) => c.charAtIsUpper(p),
      adjustBrightness: (_c, a, l) => {
        let h = $f,
          i, z = 16,
          v = 255;
        if (_c[0] == "#") {
          _c = _c.slice(1);
          h = $t
        }
        i = (l == '-') ? l : '+';
        a = a || z;
        let P = p => parseInt(p, 16),
          S = (b, c) => _c.substring(b, c),
          s = (s, b) => (b == $t) ? '0' : '' + e.toStr(s, z),
          V = c => (e.len(s(c)) == 1) ? s(c, $t) : s(c),
          ev = v => eval(v + i + a);
        let R = P(S(0, 2)),
          G = P(S(2, 4)),
          B = P(S(4, 6));
        R = ev(R);
        G = ev(G);
        B = ev(B);
        if (R > v) R = v;
        else if (R < 0) R = 0;
        if (G > v) G = v;
        else if (G < 0) G = 0;
        if (B > v) B = v;
        else if (B < 0) B = 0;
        R = V(R);
        G = V(G);
        B = V(B);
        return ((h) ? "#" : "") + R + G + B
      },
      each: function() {
        let a = arguments,
          aL = e.len(a),
          a1 = a[0],
          a2 = a[1],
          a3 = a[2],
          t1 = e.typo(a1),
          t2 = e.typo(a2),
          t3 = e.typo(a3);
        if ((aL == 2) && (e.isArr(a1) && t2 == $fn)) { for (let i = 0; i < e.len(a1); i++) { a2.call(e, a1[i], i, a1) } } else if ((aL == 2) && ((t1 == $o && (!e.isArr(a1))) && t2 == $fn)) { for (let k in a1) { a2.call(e, k, a1[k], a1) } } else if ((aL == 3) && ((t1 == $s) && (t2 == $s && (a2)) && t3 == $fn)) { let z = a1.split(a2); for (let j = 0; j < e.len(z); j++) { a3.call(e, z[j], j, z) } } else if (aL == 2 && ((t1 == $s && a1.indexOf("-") > 0) && t2 == $fn)) {
          let n = a1.split('-'),
            n1 = e.pF(n[0]),
            n2 = e.pF(n[1]);
          if (n1 > n2) { for (let y = n1; y > n2; y--) { a2.call(e, y, (n1 - n2)) } } else { for (let l = n1; l < n2; l++) { a2.call(e, l, (n2 - n1)) } }
        } else { return e }
      },
      alpha: function() {
        let a = arguments,
          aL = e.len(a),
          r, alp = Array.from(Array(26), (k, i) => String.fromCharCode(i + 97)).join(''),
          capL = alp.upper(),
          R = (s, x, y) => { if (x > y) { return false } else { if (x - 1 == 0) { return s.delChar('$', e.len(s) - y); } else { return s.delChar('^', x - 1).delChar('$', e.len(s) - y) } } };
        if (aL == 0) { r = alp }
        if (aL == 1) { if (a[0] == $t || a[0] == 'true') { r = capL } else { r = alp.delChar('^', a[0] - 1) } }
        if (aL == 2) { if (a[0] === $t || a[0] === 'true') { r = capL.delChar('^', a[1] - 1) } else { r = R(alp, a[0], a[1]) } }
        if (aL == 3) { r = (a[0] === $t || a[0] === 'true') ? R(capL, a[1], a[2]) : R(alp, a[1], a[2]) }
        return r
      },
      randNum: (s, _e) => {
        let _r, Rd = x => Math.random(x),
          R = x => Math.round(x);
        if ((s) && (_e)) { if ((!isNaN(s)) && (!isNaN(_e))) { _r = (R(Rd() * (e.pF(_e - s))) + e.pF(s)) } } else if ((s) && (!_e)) { _r = R(Rd() * (e.pF(s))) } else { if ((s == 0) && (!isNaN(_e))) { _r = R(Rd() * (e.pF(_e))) } else { _r = Rd() } }
        return _r
      },
      now: p => p ? new Date(p) : new Date(),
      date: x => e.now().getDate(),
      monthNames: (t) => {
        let $mn = UCDA()[0],
          _l = e.len($mn),
          _str = "";
        e.each('0-' + _l, i => { e.each($mn[i], (j, jj) => { j.splitCharBy(2, k => { _str += e.toStr(k.charFrom(24)) }); if (jj != 11) { _str += "-" } }); if (i != 1) { _str += "--" } });
        var _mn = _str.split('--');
        _f = _mn[0], _a = _mn[1];
        _f = _f.split('-');
        _a = _a.split('-');
        return (t === 'abbr') ? _a : _f
      },
      dayNames: t => {
        let _d = UCDA()[1],
          _l = e.len(_d),
          _str = '';
        e.each('0-' + _l, (i, ii) => { e.each(_d[i], (j, jj) => { j.splitCharBy(2, (k, kk) => { _str += e.toStr(k.charFrom(24)) }); if (jj != 6) { _str += "-" } }); if (i != 1) { _str += "--" } });
        var _dn = _str.split('--'),
          _f = _dn[0],
          _a = _dn[1];
        _f = _f.split('-');
        _a = _a.split('-');
        return (t === 'abbr') ? _a : _f
      },
      day: function(p) {
        let n = e.now().getDay(),
          _d = '';
        if (p == "num") { _d = n } else if (p == "full" || p == "abbr") { _d = e.dayNames(p)[e.now().getDay()] } else { _d = e.dayNames()[e.now().getDay()] }
        return _d
      },
      month: function(p) {
        let nM = e.now().getMonth() + 1,
          $m;
        if (p == "num") { $M = nM } else if (p == "full" || p == "abbr") { $M = e.monthNames(p)[e.now().getMonth()] } else { $M = e.monthNames()[e.now().getMonth()] }
        return $M
      },
      sec: x => e.now().getSeconds(),
      min: x => e.now().getMinutes(),
      hour: (p) => { var $h = e.now().getHours(); if (p == 24) { $h = $h; if ($h == 0) { $h = 12 } } else { if (p == null || p == 12) { if ($h > 12) { $h = $h - 12 } if ($h == 0) { $h = 12 } } else { return } } return $h },
      year: x => e.now().getFullYear(),
      getDayName: (_d, _m, _y, _a) => {
        var nw = e.now(),
          mId = nw.getMonth(),
          mA = e.monthNames(),
          mA1 = '',
          mN = _m || mA[mId],
          dN = _d || nw.getDate(),
          yN = _y || e.year(),
          a = _a || 'full';
        mN = (e.typo(mN) == 'number') ? mA[mN - 1] : mN;
        mA = mA.upper();
        mN = new String(mN).upper();
        if (mA.indexOf(mN) != -1) { mN = mN } else { return } _nw = e.now(mN + dN + ',' + yN);
        return _dn = e.dayNames(a)[_nw.getDay()]
      },
      getMonthNum: (m) => { var $m = e.monthNames(); if (m) { return $m.indexOf(m.upper()) } },
      maxDay: (m, y) => {
        var mD, $nw = new Date();
        m = new String(m) || $nw.getMonth();
        y = y || $nw.getFullYear();
        if ((m == 3) || (m == 5) || (m == 8) || (m == 10)) { mD = 30 } else { mD = 31; if (m == 1) { if (y / 4 - parseInt(y / 4) != 0) { mD = 28 } else { mD = 29 } } }
        return mD
      },
      device: { type: f => { var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'; if (e.typo(f) == 'function') { f(r, navigator.userAgent) } else { return r } }, width: DWH('W'), height: DWH('H'), res: DWH('R') },
      dayLeft: x => DI('L'),
      dayPassed: x => DI('P'),
      dayMax: x => DI('M'),
   
      encrypt:(txt,psw,en)=>txt?encDec.en(txt,psw,en):$u,
      decrypt:(txt,psw,r,i)=>txt?encDec.de(txt,psw,r,i):$u,
    
      tag:o=>tg(o),
      splitCharBy:(n,s,f)=>e.toStr(s).splitCharBy(n,f)
    },
    strProto = {
      toChars: function(r=10) {
        return this.split('').map(c => e.toStr(c.charCodeAt(0),r));
      },
      mask: function(n, m, i) {
        let c = this,
          S = (s, a, b) => s.slice(a, b),
          R = (s, a, b) => s.replace(a, b);
        if (!c) { return } else {
          n = n || 4;
          m = m || '*';
          let tr, t, cc = c,
            num = n,
            ma = m;
          if (i == '^') {
            t = R(S(cc, 0, num), /./g, ma) + S(cc, num);
            tr = S(cc, 0, num)
          } else if (i == '$') {
            t = S(cc, 0, -num) + R(S(cc, -num), /./g, ma);
            tr = S(cc, -num)
          } else if (i == '*') {
            let tL = e.len(cc),
              mL = e.len(n),
              $b1, $nx, $b, $e;
            if (tL % 2 == 0) {
              $nx = (((tL + n) / 2) - n);
              $b = $nx;
              $e = Math.round($nx);
              $n1 = $nx
            } else {
              $nx = (((tL - n) + 1) / 2);
              $n1 = Math.round($nx);
              $b = Math.round($nx);
              $e = parseInt($nx - 1)
            }
            if (!$e) {
              t = S(cc, 0, $b) + R(S(cc, $b, $n1 + num), /./g, ma) + S(cc, tL);
              tr = S(cc, $nx, $nx + num)
            } else {
              if (e.toStr($e).indexOf('-') == 0) {
                t = S(cc, 0, $b) + R(S(cc, $b, $n1 + num), /./g, ma) + S(cc, tL);
                tr = S(cc, $nx, $nx + num)
              } else {
                t = S(cc, 0, $b) + R(S(cc, $b, $n1 + num), /./g, ma) + S(cc, -$e);
                tr = S(cc, $nx, $nx + num)
              }
            }
          } else {
            t = R(S(cc, 0, num), /./g, ma) + S(cc, num);
            tr = S(cc, num)
          }
          e.str.maskWord = function() { let d = this; return ((d == t) && (d.findChar(m, $t, $t) == num) && (d.findChar(m))) ? tr : $u };
          return t
        }
      },
      splitCharBy: function(a, f) {
        let s = this,
          ar, aR, _a, sL = e.len(s),
          r = sL % a;
        ar = s.match(new RegExp('.{' + e.pF(a) + '}', 'g'));
        _a = (r) ? r : $u;
        aR = (_a != $u) ? s.substr(-_a) : '';
        if ((a > sL) || (a == $n)) {
          ar = s;
          aR = ''
        }
        if (e.typo(f) == $fn) { e.each(ar, (i, v, b) => { f(i, aR, v, b) }) } else { e.obj.trash = function() { return (this == ar && e.len(this) == e.len(ar)) ? aR : $u }; return ar }
      },
      cutCharAt: function(n, i) {
        let t = this.extractChar(n, i),
          s = e.guid($t, $t),
          x = t.trash();
        return (i == '$' ? x + s + t : t + s + x).split(s)
      },
      lower: function(p) { return this.toLowerCase(p) },
      upper: function(p) { return this.toUpperCase(p) },
      extractChar: function(n, x) {
        let t = this;
        tp = '^';
        l = e.len(t);
        s1 = '';
        e.each('0-' + n, i => {
          if (x == '$') {
            p = e.pF(l - n);
            s1 += t.charAt(p + i);
            tp = ''
          } else { s1 += t.charAt(i) }
        });
        e.str.trash = function() { return (this == s1 && e.len(this) == e.len(s1)) ? t.delChar(tp, n) : $u };
        return s1
      },
      charAtIsUpper: function(p) { let c = this.charAt(p); return /[A-Z]|[\u0080-\u024F]/.test(c) && c === c.toUpperCase() },
      delChar: function(i, n) {
        let s = this;
        n = (n == 0) ? 1 : n;
        n = (n) ? n : 1;
        if (i) { if (i == '^') { return s.substring(n, e.len(s)) } if (i == '$') { return s.substring(0, e.len(s) - n) } } else { return s.substring(0, e.len(s) - n) }
      },
      findChar: function(c, t, ca) {
        let s = this,
          r, $C = c;
        if ((s) && (c)) {
          if (c == "*" || c == '.' || c == "+") { $C = "\\" + c }
          let i = (s.split(new RegExp($C, "gi")).length - 1),
            i2 = (s.split(new RegExp($C, "g")).length - 1);
          if (t == $t) { r = (ca == $t) ? i2 : i } else { if (t == $n && ca == $t) { r = (i2 == 0) ? $f : $t } else if (t === $t) { r = (i2 == 0) ? $f : $t } else { r = (i == 0) ? $f : $t } }
        }
        return r
      },
      title: function() { var s = this; if (s) { return s.replace(/\w\S*/g, function(t) { return t.charAt(0).upper() + t.substr(1).lower() }) } },
     
      charFrom: function(r) { return ((r == $u) || (r < 2 || r > 36)) ? 'Invalid radix' : String.fromCharCode(parseInt(this, e.pF(r)).toString(10)) },
     
     
      endWith: function(p) {
        var s = this;
        if (p == $u || p == $n) { return } else {
          s = e.toStr(s);
          p = e.toStr(p)
        }
        return s.indexOf(p, e.len(s) - e.len(p)) !== -1
      }
    },
    arrProto = {
      charFrom: function(r, s) {
        s = s || '';
        if ((r == $u) || (r < 2 || r > 36)) { return $u } else {
          var v = '';
          e.each(this, (j) => { v += String.fromCharCode(parseInt(j, e.pF(r)).toString(10)) + s });
          return (s) ? v.delChar('$') : v
        }
      },
      upper: function(p) {
        var arr = this;
        arr = [];
        e.each(this, i => { arr.push(i.toUpperCase(p)) });
        return arr
      },
      lower: function(p) {
        var arr = this;
        arr = [];
        e.loop(this, i => { arr.push(i.toLowerCase(p)) });
        return arr
      }
    },
   
 
   e=(o,o2)=> new $iM(o,o2);
   

  
  for (var k in $M) { e[k] = $M[k] } e.extend.str(strProto);
  e.extend.arr(arrProto);
  this.iMirror = e;
  this.$$ = e;
}());

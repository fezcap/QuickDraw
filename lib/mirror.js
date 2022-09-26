  (function (){
    let doc = document,
    win = window,
    $t = true,
    $f = false, $u,
    $num = 'number',
    $arr = 'array',
    $str = 'string',
    $obj = 'object',
    $fn = 'function',
    obj_html = {
      '&':'&amp;','<':'&lt;','>':'&gt;',
      "'": '&e#39;', '"': '&quot;'
    },
    lookup = [
      ['M', 1000],['CM', 900],['D', 500],['CD', 400],['C', 100],
      ['XC', 90],['L', 50],['XL', 40],['X',10],
      ['IX', 9],['V', 5],['IV', 4],['I', 1]
    ],
    
    /*/// private functions begins///*/
    UCDA = x => [[['32414e4l414i51', '2m45424i4l414i51', '35414i4348', '2h4g4i494c', '354151', '324l4e45', '324l4c51', '2h4l474l4j4k', '3b454g4k454d42454i', '37434k4f42454i', '364f4m454d42454i', '2k4543454d42454i'], ['32414e', '2m4542', '35414i', '2h4g4i', '354151', '324l4e', '324l4c', '2h4l47', '3b454g', '37434k', '364f4m', '2k4543']], [['3b4l4e444151', '354f4e444151', '3c4l454j444151', '3f45444e454j444151', '3c484l4i4j444151', '2m4i49444151', '3b414k4l4i444151'], ['3b4l4e', '354f4e', '3c4l45', '3f4544', '3c484l', '2m4i49', '3b414k']]],
    typo = t => typeof t,
    isFnc = f => typo(f) == $fn ? $t : $f,
    isArr = o => Array.isArray(o),
    pF = n => parseFloat(n),
    q = s => doc.querySelector(s),
    qa = s => doc.querySelectorAll(s),
    
    evtListener = function (sel, e, f, capt){ sel.addEventListener(e, f, capt) },
    
    deviceWH = function (arg) { 
      let w,h; 
      if (win.innerWidth !== $u && win.innerHeight !== $u) {
        w = win.innerWidth;
        h = win.innerHeight;
      }
      else {
        w = doc.documentElement.clientWidth;
        h = doc.documentElement.clientHeight;
      }
      return arg == 'w' ? w : h;
    };
    
    const DEVICE = {
      type: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      width: () => deviceWH('w'),
      height: () => deviceWH('h'),
      inLandscape: function(f){ 
        let orient = window.orientation;
        return orient == -90 || orient == 90 ? $t : $f;
      },
      resize: function (cb, capt){
        evtListener(win, 'resize', cb, capt);
        return $$;
      },
      setFullscreen: async function(f){
        let fs = () => {
          if(doc.fullscreenElement) { return }
          return doc.documentElement.requestFullscreen();
        };
        try{ await fs() 
          if(isFnc(f)) f.call(this, $t, $$);
        }
        catch (e){
          if(isFnc(f)) f.call(this, e, $$);
        }
      },
      lockLandscape: async function (){
        this.setFullscreen(async () => {
        await screen.orientation.lock('landscape');
      });
      },
      lockPortrait: async function (f){
        this.setFullscreen(async () => {
          await screen.orientation.lock('portrait');
          if(isFnc(f)) f.call(this, $t, $$);
        });
      },
      rotation: function(f) {
        win.addEventListener("orientationchange", cb, false);
      }
    },  //device
    
    DI = dy => {
      var tx = 0,_td = 0, _cd = 0, _rd = 0, t = $$,
        _tdArr = [], _cdArr = [], _md = [],
        curMnth = t.month(),
        curMnthNum = t.month('num'),
        mD = t.maxDay(t.pF(curMnthNum - 1));
      $$.each('0-12', (i) => {
        tx++;
        var maxD = $$.maxDay(i);
        _md.push(maxD); _tdArr.push(maxD);
      });
      $$.each(_tdArr, (j, k) => { _td += j; if (k < curMnthNum) { _cd += j; if (k == (curMnthNum - 1)) { _cd = $$.pF(_cd - (j - $$.date())) } } else { _rd += j } });
      _rd = $$.pF(_rd + (mD - $$.date()));
      if (dy == 'L') { return _rd } else if (dy == 'P') { return _cd } else { return $$.toStr(_md[curMnthNum - 1]) }
    };
    /*/// private functions and method end///*/
    
    INIT_$$ = {};
    
    INIT_MIRROR = {
      toRomanNumeral: function(n){
        return lookup.reduce( (acc, [k, v]) => {
          acc += k.repeat(Math.floor(n / v));
          n = n%v; return acc;
        }, '');
      },
      
      escapeHTML: function (str){
        return str.replace(/[&<>'"]/g, t => (obj_html[t] || t)
        );
      },
      smoothScroll: function (el){
        doc.q(el).scrollIntoView({behavior: 'smooth'});
        return this;
      },
      getImages: function (el, dup = $t){
        let img = [...(el || doc).getElementsByTagName('img')].map (img => img.getAttribut('src') );
        return dup ? img : [...new Set(img)];
      },
      colorCode: function (n, h){
        h = (h === $t || n === $t) ? '' : '#';
        let hex = c => h + this.toStr(Math.random() * 0xfffff * 1000000, 16).slice(0, 6),
        code = [];
        if(typo(n) == $num && n != 0){
          $$.each(`1-${n}`, i => { code.push(hex()) });
          return code;
        }
        return hex();
      },
      injectCss: function(txt, id){
        let s = doc.createElement('style');
        s.id = id; 
        s.type = 'text/css'; 
        s.textContent = txt;
        doc.head.appendChild(s);
        return s;
      },
      
      setQueryString: function (obj){
        u = $$.toStr(u||win.location);
      
      },
      queryString: function (u){
        u = $$.toStr(u||win.location);
        if(u.indexOf('?') == -1) return;
        let q = [...new URLSearchParams(u = u.split('?')[1])];
        return q.reduce((a, [k, v]) => ((a[k] = v), a),{});
      },
    
      injectJs: function(txt, id, p){
        p = p||'body';
        let s = doc.createElement('script');
        s.id = id;
        s.type = 'text/javascript'; 
        s.textContent = txt;
        doc[p].appendChild(s);
        return s;
      },
      
      dig: function(obj, t){
        if( t in obj ) return obj[t];
        return (
          Object.values(obj).reduce((acc, val) => {
            if(acc !== $u) return acc;
            if(typo(val) === $obj) return $$.dig(val, t);
          },$u)
        );
      },
      
      frequencies: function (arr){
       return arr.reduce( (a, v) => {
          a[v] = a[v] ? a[v]+1 : 1;
          return a;
        }, {});
      },
      
      tab: function(sel, indx, act, c, c1){
        let fn = (el,i) => { if(isFnc(c)) c.call($$, el, i) };
        if($$.isEmpty(sel) || $$.typo(sel) != $str) return;
        sel = $$.typo(sel) == $str ? ($$.isEmpty(sel.trim()) ? null : sel) : sel;
        if(sel === null) return;
        sel = doc.qa(`.${sel.trim()}`);
        $$.each(`0-${$$.len(sel)}`, i => {
          sel[i].classNamee = sel[i].className.replace(` ${act}`, '');
        });
        if($$.typo(indx) == $num && sel[indx] != $u){
          if(c === $t || c1 === $t) { sel[indx].click() }
          sel[indx].className += ` ${act}`;
          fn(sel[indx], indx);
        }else{
          if(indx.currentTarget != $u){
            indx.currentTarget.className += ` ${$$}`;
            fn(indx.currentTarget, indx);
          }
        }
        return $$;
      },
      
      
      
      
      device: DEVICE,
      isArr: isArr,
      typo: typo,
      pF: pF,
      extend: { 
        str: s => { for (let k in s) $$.str[k] = s[k];  return s }, 
        arr: a => { for (let k in a) $$.arr[k] = a[k]; return a }, 
      },
      str: String.prototype,
      arr: Array.prototype,
      toStr: (t, r) => t.toString(r),
      int: function(){
        let $i = '';
        $$.each('0-10', i => { $i += i });
        return 0+''+$$.pF($i);
      },
      
      keys: function(o){
        if(o === null || o === $u || typo(o) == $str || isArr(o)) return;
        return Object.keys(o);
      },
      
      isEmpty: function(o){
        if(o === null || o === $u) return $t;
        o = typo(o) == $obj && !isArr(o) ? $$.keys(o) : o;
        return isArr(o) || typo(o) == $str ? (($$.len(o) == 0) ? $t : $f ) : $u;
      },
      
      len: function (o) {
        return (typo(o) == $obj && !isArr(o) ? $$.keys(o) : typo(o) == $num ? $$.toStr(o) : o).length;
      },
      
      values: function (o = {}){
        let arr = [];
        $$.each($$.keys(o), k => { arr.push(o[k]) });
        return arr;
      },
      
      tag: function (o = {}){
        if(typo(o) == $obj){
          let attr = '', elem = o.elem ||'div', sTag, eTag,
          selfClose = ['img','input','br','hr'];
          $$.each(o.attr, (k, v) => { attr +=` ${k}="${v}"` });
          sTag = t => `<${ elem }${ attr }${ t == $t ? '/' : '' }>`;
          eTag = t => `${ o.text || '' }</${elem}>`;
          return (!selfClos$$.includes(elem)) ? sTag()+eTag() : sTag($t);
        }else{ return $$ }
      },
      
      each: function() {
        let a = arguments, 
        len = l => $$.len(l),
        aL = len(a), objConunt = -1;
        a1 = a[0], a2 = a[1], a3 = a[2],
        t1 = typo(a1), t2 = typo(a2), t3 = typo(a3);
        if ((aL == 2) && (isArr(a1) && t2 == $fn)) {
          for(let i = 0; i < len(a1); i++) a2.call($$, a1[i], i, a1);
        }
        else if ((aL == 2) && ((t1 == $obj && (!isArr(a1))) && t2 == $fn)) { 
          for(let k in a1) a2.call($$, k, a1[k], objConunt++, a1);
        }
        else if ((aL == 3) && ((t1 == $str) && (t2 == $str && a2) && t3 == $fn)) {
          let arr = a1.split(a2);
          for (let i = 0; i < len(arr); i++) a3.call($$, arr[i], i, arr);
        }
        else if (aL == 2 && ((t1 == $str && a1.indexOf("-") > -1) && t2 == $fn)) {
          let n = a1.split('-'),
          n1 = pF(n[0]), n2 = pF(n[1]);
          if(n1 > n2){
            for (let i = n1; i > n2; i--) a2.call($$, i, (n1 - n2), n1, n2);
          }else{ 
            for (let i = n1; i < n2; i++) a2.call($$, i, (n2 - n1), n1, n2);
          }
        } else { return $$ }
      },
      
      alpha: function() {
        let a = arguments,
        aL = $$.len(a),
        r, alp = Array.from(Array(26), (k, i) => String.fromCharCode(i + 97)).join(''),
        capL = alp.upper(),
        R = (s, x, y) => { 
          if (x > y)  return ;
          else if (x - 1 == 0)  return s.delChar('$', $$.len(s) - y);
          else return s.delChar('^', x - 1).delChar('$', $$.len(s) - y);
        };
        if (aL == 0) { r = alp }
        if (aL == 1) { if (a[0] === $t) { r = capL } else { r = alp.delChar('^', a[0] - 1) } }
        if (aL == 2) { if (a[0] === $t) { r = capL.delChar('^', a[1] - 1) } else { r = R(alp, a[0], a[1]) } }
        if (aL == 3) { r = (a[0] === $t) ? R(capL, a[1], a[2]) : R(alp, a[1], a[2]) }
        return r;
      },
      
      guid: (L, _al) => {
        let _L, cx, alp = $$.alpha() + $$.alpha($t);
        cx = (_al === $t) ? alp + $$.int() : alp;
        let buf = [],
          cL = $$.len(cx);
        if (L === $t) {
          let l = Math.round(Math.random() * 50),
            ll = Math.round(Math.random() * 10) + 3;
          _L = (l <= 4) ? l * ll : l;
        } else { _L = L || 32 }
        let $buf, Ba = [],
          buf2 = "";
        $$.each(`0-${_L}`, (i) => { buf[i] = cx.charAt(Math.floor(Math.random() * cL)) });
        $buf = buf.join('');
        let $x = t => {
          t = t || 1;
          $$.each(`0-${t}`, q => { Ba.push($$.guid(L, _al)) });
          return Ba;
        };
        $$.str.times = x => $x(x);
        return $buf;
      },
      splitCharBy: (n,s,f) => $$.toStr(s).splitCharBy(n,f),
      
      randNum: (s, _e) => {
        let _r, Rd = x => Math.random(x),
          R = x => Math.round(x);
        if ((s) && (_e)) { if ((!isNaN(s)) && (!isNaN(_e))) { _r = (R(Rd() * ($$.pF(_e - s))) + $$.pF(s)) } } else if ((s) && (!_e)) { _r = R(Rd() * ($$.pF(s))) } else { if ((s == 0) && (!isNaN(_e))) { _r = R(Rd() * ($$.pF(_e))) } else { _r = Rd() } }
        return _r
      },
      now: p => p ? new Date(p) : new Date(),
      date: x => $$.now().getDate(),
      monthNames: (t) => {
        let $mn = UCDA()[0],
          _l = $$.len($mn),
          _str = "";
        $$.each('0-' + _l, i => { $$.each($mn[i], (j, jj) => { j.splitCharBy(2, k => { _str += $$.toStr(k.charFrom(24)) }); if (jj != 11) { _str += "-" } }); if (i != 1) { _str += "--" } });
        var _mn = _str.split('--');
        _f = _mn[0], _a = _mn[1];
        _f = _f.split('-');
        _a = _a.split('-');
        return (t === 'abbr') ? _a : _f
      },
      dayNames: t => {
        let _d = UCDA()[1],
          _l = $$.len(_d),
          _str = '';
        $$.each('0-' + _l, (i, ii) => { $$.each(_d[i], (j, jj) => { j.splitCharBy(2, (k, kk) => { _str += $$.toStr(k.charFrom(24)) }); if (jj != 6) { _str += "-" } }); if (i != 1) { _str += "--" } });
        var _dn = _str.split('--'),
          _f = _dn[0],
          _a = _dn[1];
        _f = _f.split('-');
        _a = _a.split('-');
        return (t === 'abbr') ? _a : _f
      },
      day: function(p) {
        let n = $$.now().getDay(),
          _d = '';
        if (p == "num") { _d = n } else if (p == "full" || p == "abbr") { _d = $$.dayNames(p)[$$.now().getDay()] } else { _d = $$.dayNames()[$$.now().getDay()] }
        return _d
      },
      month: function(p) {
        let nM = $$.now().getMonth() + 1,
          $m;
        if (p == "num") { $M = nM } else if (p == "full" || p == "abbr") { $M = $$.monthNames(p)[$$.now().getMonth()] } else { $M = $$.monthNames()[$$.now().getMonth()] }
        return $M
      },
      sec: x => $$.now().getSeconds(),
      min: x => $$.now().getMinutes(),
      hour: (p) => { var $h = $$.now().getHours(); if (p == 24) { $h = $h; if ($h == 0) { $h = 12 } } else { if (p == null || p == 12) { if ($h > 12) { $h = $h - 12 } if ($h == 0) { $h = 12 } } else { return } } return $h },
      year: x => $$.now().getFullYear(),
      getDayName: (_d, _m, _y, _a) => {
        var nw = $$.now(),
          mId = nw.getMonth(),
          mA = $$.monthNames(),
          mA1 = '',
          mN = _m || mA[mId],
          dN = _d || nw.getDate(),
          yN = _y || $$.year(),
          a = _a || 'full';
        mN = ($$.typo(mN) == 'number') ? mA[mN - 1] : mN;
        mA = mA.upper();
        mN = new String(mN).upper();
        if (mA.indexOf(mN) != -1) { mN = mN } else { return } _nw = $$.now(mN + dN + ',' + yN);
        return _dn = $$.dayNames(a)[_nw.getDay()]
      },
      getMonthNum: (m) => { var $m = $$.monthNames(); if (m) { return $m.indexOf(m.upper()) } },
      maxDay: (m, y) => {
        var mD, $nw = new Date();
        m = new String(m) || $nw.getMonth();
        y = y || $nw.getFullYear();
        if ((m == 3) || (m == 5) || (m == 8) || (m == 10)) { mD = 30 } else { mD = 31; if (m == 1) { if (y / 4 - parseInt(y / 4) != 0) { mD = 28 } else { mD = 29 } } }
        return mD
      },
      dayLeft: x => DI('L'),
      dayPassed: x => DI('P'),
      dayMax: x => DI('M'),
         toChars: function(t,r=10) {
        return t.split('').map(c => $$.toStr(c.charCodeAt(0),r));
      },
      
      hexToRGB: (h, t, a) => {
        let r, g, b, rgb, hex, P = (a) => parseInt(a, 16),
          S = (s, a, b) => s.substring(a, b);
        if (!h) { return } else {
          h = h.toString();
          if (h.charAt(0) == "#") { h = h.delChar('^') } r = S(h, 0, 2);
          g = S(h, 2, 4);
          b = S(h, 4, 6);
          rgb = $$.join(',', P(r), P(g), P(b));
          hex = (t === $t) ? rgb.split(',') : t === 'A' ? `rgba(${rgb},${a})`:`rgb(${rgb})`;
        }
        return hex
      },
      join: (j, ...v) => v.toString().split(',').join(j),
      charAtIsUpper: (c, p) => c.charAtIsUpper(p),
      rgbToHex: (r, g, b, p) => {
          map = $$.int() + $$.alpha(1, 6),
          hex = '' + map.substr(Math.floor(r / 16), 1) + map.substr((r % 16), 1) + map.substr(Math.floor(g / 16), 1) + map.substr((g % 16), 1) + map.substr(Math.floor(b / 16), 1) + map.substr((b % 16), 1);
        if (p === $t) { return "#" + hex } else if ($$.typo(p) === $fn) { return p(e, hex, r, g, b) } else { return hex }
      },
    },//INIT_MIRROR
    
     STR_PROTOTYPE = {
      toChars: function(r = 10) {
        return this.split('').map(c => $$.toStr(c.charCodeAt(0),r));
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
            let tL = $$.len(cc),
              mL = $$.len(n),
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
              if ($$.toStr($e).indexOf('-') == 0) {
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
          $$.str.maskWord = function() { let d = this; return ((d == t) && (d.findChar(m, $t, $t) == num) && (d.findChar(m))) ? tr : $u };
          return t
        }
      },
      splitCharBy: function(a, f) {
        let s = this,
          ar, aR, _a, sL = $$.len(s),
          r = sL % a;
        ar = s.match(new RegExp('.{' + $$.pF(a) + '}', 'g'));
        _a = (r) ? r : $u;
        aR = (_a != $u) ? s.substr(-_a) : '';
        if ((a > sL) || (a == $n)) {
          ar = s;
          aR = ''
        }
        if ($$.typo(f) == $fn) { $$.each(ar, (i, v, b) => { f(i, aR, v, b) }) } else { $$.obj.trash = function() { return (this == ar && $$.len(this) == $$.len(ar)) ? aR : $u }; return ar }
      },
      cutCharAt: function(n, i) {
        let t = this.extractChar(n, i),
          s = $$.guid($t, $t),
          x = t.trash();
        return (i == '$' ? x + s + t : t + s + x).split(s)
      },
      lower: function(p) { return this.toLowerCase(p) },
      upper: function(p) { return this.toUpperCase(p) },
      extractChar: function(n, x) {
        let t = this;
        tp = '^';
        l = $$.len(t);
        s1 = '';
        $$.each('0-' + n, i => {
          if (x == '$') {
            p = $$.pF(l - n);
            s1 += t.charAt(p + i);
            tp = ''
          } else { s1 += t.charAt(i) }
        });
        $$.str.trash = function() { return (this == s1 && $$.len(this) == $$.len(s1)) ? t.delChar(tp, n) : $u };
        return s1
      },
      charAtIsUpper: function(p) { let c = this.charAt(p); return /[A-Z]|[\u0080-\u024F]/.test(c) && c === c.toUpperCase() },
      delChar: function(i, n) {
        let s = this;
        n = (n == 0) ? 1 : n;
        n = (n) ? n : 1;
        if (i) { if (i == '^') { return s.substring(n, $$.len(s)) } if (i == '$') { return s.substring(0, $$.len(s) - n) } } else { return s.substring(0, $$.len(s) - n) }
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
      charFrom: function(r) { return ((r == $u) || (r < 2 || r > 36)) ? 'Invalid radix' : String.fromCharCode(parseInt(this, $$.pF(r)).toString(10)) },
      endWith: function(p) {
        var s = this;
        if (p == $u || p == $n) { return } else {
          s = $$.toStr(s);
          p = $$.toStr(p)
        }
        return s.indexOf(p, $$.len(s) - $$.len(p)) !== -1
      }
    },
    
    ARR_PROTOTYPE = {
      charFrom: function(r, s) {
        s = s || '';
        if ((r == $u) || (r < 2 || r > 36)) { return $u } else {
          var v = '';
          $$.each(this, (j) => { v += String.fromCharCode(parseInt(j, $$.pF(r)).toString(10)) + s });
          return (s) ? v.delChar('$') : v
        }
      },
      upper:  function(p) {
        var arr = this;
        arr = [];
        $$.each(this, i => { arr.push(i.toUpperCase(p)) });
        return arr
      },
      lower: function(p) {
        var arr = this;
        arr = [];
        $$.each(this, i => { arr.push(i.toLowerCase(p)) });
        return arr
      }
    };
    
    ////////////
    
    function init_$$(arg){
      this.arg = arg;
      let _ = this;
     // new _$$(arg, this)
    }
    
    init_$$.prototype = INIT_$$;
    function $$ (){ return new init_$$(arguments) }
    for (var k in INIT_MIRROR) { $$[k] = INIT_MIRROR[k] }
    $$.extend.str(STR_PROTOTYPE);
    $$.extend.arr(ARR_PROTOTYPE);
    this.$$ = $$;
    this.mirror = $$;
  }());
  
    (function (){
    
    /*
     written by ubong Isaiah
     on: Sun, September 11, 2022
     email: isaiahubongemma@gmail.com
    */
    
    const OPEN_DATABASE = function (opt){
      
      if(typeof opt != 'object'){ return }
      if(!Object.keys(opt).length){ return }
      
      const  DB_NAME = opt.databaseName;
      const  DB_VERSION = opt.databaseVersion || 1;
      const  STORE_NAME = opt.storeName;
      const  STORE_KEY = opt.storeKey || 'id';
      
      if(DB_NAME.trim().length > 0 && STORE_NAME.trim().length){
        const REQUEST = indexedDB.open(DB_NAME, DB_VERSION);
        return DBUtility(REQUEST, STORE_NAME, STORE_KEY);
      }
      
      return 'invalid database configurations';
    };
    
    function DBUtility(request,storeName,storeKey){
      let dataStore = null;
      
      request.onsuccess = function(evt){
        dataStore = evt.target.result;
        if(typeof cb == 'function'){ cb(dataStore,evt) } 
      };
      
      request.onupgradeneeded = function(evt){
        let db = evt.target.result;
        if(db.objectStoreNames.contains(storeName)){
          db.deleteObjectStore(storeName);
        }
        db.createObjectStore(storeName, { keyPath: storeKey });
        alert('new store name successfully created ::: '+storeName);
      };
      
      let objStore = () => dataStore.transaction([storeName], "readwrite").objectStore(storeName);
      
      return {
        put: function (data,cb){
          if(typeof data != 'object'){ return }
          if(!Object.keys(data).length){ return }
          let request = objStore().add(data);
          request.onsuccess = cb;
          request.onerror = cb;
        },
        
        get: function(key, cb){
          let request = objStore().get(key);
          request.onsuccess = function (evt){ 
            if(typeof cb == 'function'){
              cb(request.result,evt);
            }
          };
        },
        
        getAll: function(cb){
          objStore().openCursor().onsuccess = function(evt) {
            let cursor = evt.target.result;
            if(typeof cb == 'function'){
              if(cursor){
                cb(cursor.value, cursor.key, cursor, evt);
               cursor.continue();
              }else{ cb(null,null) }
            }
          };
        },
        
        delete: function(key, cb){
          let request = objStore().delete(key);
          request.onsuccess = cb;
        },
        
        deleteAll: function(cb,ex){
          this.getAll((v,i) => {
            if(i !== ex){
             this.delete(i,cb);
            }
          });
        },
        
        clearStore: function(cb){
          let request = objStore().clear();
          request.onsuccess = function(evt){
            if(typeof cb == 'function'){
              cb(request,evt);
            }
          };
        },
        
        update: function(key, prop, val, cb){
          let request = objStore().get(key);
          request.onsuccess = function(evt){
            let res = request.result;
            res[prop] = val;
            let updateRequest = objStore().update(res);
            updateRequest.onsuccess = function(evt){
              if(typeof cb == 'function'){
                cb(updateRqequest.result, evt);
              }
            };
          };
        }
        
      };
    }
    ///////*indexedDB ends here*////////
    ///////////////
    //////*local and session storage begin here*/////////
    
    function Store(storageName,storageType){
      Storage.prototype.set_item = function(k, o) { return this.setItem(k, JSON.stringify(o)) };
      Storage.prototype.get_item = function(k) { return JSON.parse(this.getItem(k)) };
      const SET_STORAGE = () => { storageType.set_item(storageName,STORAGE) };
      if(storageName == null || storageName == undefined || storageName.trim().length == 0){ 
        return; 
      }
      if(storageType === 'local'){
        storageType = localStorage;
      } else if(storageType === 'session'){
        storageType = sessionStorage;
      } else{ 
        storageType = sessionStorage;
      }
      if(storageType.get_item(storageName) === null){
        storageType.set_item(storageName,{});
      }
      
      let STORAGE = storageType.get_item(storageName);
      
      this.put = function(data){
        if(STORAGE != null){
          if(data && typeof data === "object"){
            for(let k in data){
              if(data.hasOwnProperty(k)){
                STORAGE[k] = data[k];
              }
            }
          }
          
          SET_STORAGE();
          return this;
        }
      };
      
      this.clearAll = function (){
        storageType.removeItem(storageName);
        STORAGE = null;
        return this;
      };
      
      this.get = function(key){
        if(STORAGE != null){
          return STORAGE[key];
        }
      };
      
      this.delete = function (key){
        if(STORAGE != null){
          if(key.indexOf('.') != -1){
            key = key.split('.');
            let len = key.length,
            temp = 'STORAGE';
            for(let k = 0; k < len-1; k++ ){
              temp += `['${key[k]}']`;
            }
            delete eval(temp)[key[len-1]];
          }else{
            delete STORAGE[key];
          }
          SET_STORAGE();
        }
      };
      
    this.getAll = function (){
     if(STORAGE != null){
        return STORAGE;
      }
    };
  }
    ///////////////
    
    $$.localStore = function (sN,sT) { return new Store(sN, sT) };
    $$.database =function(arg){ return OPEN_DATABASE(arg)};
    $$.DB = $$.database;
  }());
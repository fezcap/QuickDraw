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
    this.createLocalStore = Store;
    this.createDB = OPEN_DATABASE;
    this.createDatabase = OPEN_DATABASE;
  }());
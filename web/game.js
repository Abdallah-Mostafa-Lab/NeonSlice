(()=>{var Up=Object.create;var Tu=Object.defineProperty;var Fp=Object.getOwnPropertyDescriptor;var Op=Object.getOwnPropertyNames;var Bp=Object.getPrototypeOf,kp=Object.prototype.hasOwnProperty;var sr=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var zp=(n,t)=>()=>{try{return t||n((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var Hp=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Op(t))!kp.call(n,s)&&s!==e&&Tu(n,s,{get:()=>t[s],enumerable:!(i=Fp(t,s))||i.enumerable});return n};var Vp=(n,t,e)=>(e=n!=null?Up(Bp(n)):{},Hp(t||!n||!n.__esModule?Tu(e,"default",{value:n,enumerable:!0}):e,n));var hp=zp((cp,lu)=>{(function(n){typeof cp=="object"&&typeof lu<"u"?lu.exports=n():typeof define=="function"&&define.amd?define([],n):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=n()})(function(){return(function n(t,e,i){function s(o,c){if(!e[o]){if(!t[o]){var l=typeof sr=="function"&&sr;if(!c&&l)return l(o,!0);if(r)return r(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var u=e[o]={exports:{}};t[o][0].call(u.exports,function(f){var d=t[o][1][f];return s(d||f)},u,u.exports,n,t,e,i)}return e[o].exports}for(var r=typeof sr=="function"&&sr,a=0;a<i.length;a++)s(i[a]);return s})({1:[function(n,t,e){"use strict";var i=n("./utils"),s=n("./support"),r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(a){for(var o,c,l,h,u,f,d,p=[],_=0,m=a.length,g=m,x=i.getTypeOf(a)!=="string";_<a.length;)g=m-_,l=x?(o=a[_++],c=_<m?a[_++]:0,_<m?a[_++]:0):(o=a.charCodeAt(_++),c=_<m?a.charCodeAt(_++):0,_<m?a.charCodeAt(_++):0),h=o>>2,u=(3&o)<<4|c>>4,f=1<g?(15&c)<<2|l>>6:64,d=2<g?63&l:64,p.push(r.charAt(h)+r.charAt(u)+r.charAt(f)+r.charAt(d));return p.join("")},e.decode=function(a){var o,c,l,h,u,f,d=0,p=0,_="data:";if(a.substr(0,_.length)===_)throw new Error("Invalid base64 input, it looks like a data url.");var m,g=3*(a=a.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(a.charAt(a.length-1)===r.charAt(64)&&g--,a.charAt(a.length-2)===r.charAt(64)&&g--,g%1!=0)throw new Error("Invalid base64 input, bad content length.");for(m=s.uint8array?new Uint8Array(0|g):new Array(0|g);d<a.length;)o=r.indexOf(a.charAt(d++))<<2|(h=r.indexOf(a.charAt(d++)))>>4,c=(15&h)<<4|(u=r.indexOf(a.charAt(d++)))>>2,l=(3&u)<<6|(f=r.indexOf(a.charAt(d++))),m[p++]=o,u!==64&&(m[p++]=c),f!==64&&(m[p++]=l);return m}},{"./support":30,"./utils":32}],2:[function(n,t,e){"use strict";var i=n("./external"),s=n("./stream/DataWorker"),r=n("./stream/Crc32Probe"),a=n("./stream/DataLengthProbe");function o(c,l,h,u,f){this.compressedSize=c,this.uncompressedSize=l,this.crc32=h,this.compression=u,this.compressedContent=f}o.prototype={getContentWorker:function(){var c=new s(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),l=this;return c.on("end",function(){if(this.streamInfo.data_length!==l.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),c},getCompressedWorker:function(){return new s(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(c,l,h){return c.pipe(new r).pipe(new a("uncompressedSize")).pipe(l.compressWorker(h)).pipe(new a("compressedSize")).withStreamInfo("compression",l)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(n,t,e){"use strict";var i=n("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},e.DEFLATE=n("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(n,t,e){"use strict";var i=n("./utils"),s=(function(){for(var r,a=[],o=0;o<256;o++){r=o;for(var c=0;c<8;c++)r=1&r?3988292384^r>>>1:r>>>1;a[o]=r}return a})();t.exports=function(r,a){return r!==void 0&&r.length?i.getTypeOf(r)!=="string"?(function(o,c,l,h){var u=s,f=h+l;o^=-1;for(var d=h;d<f;d++)o=o>>>8^u[255&(o^c[d])];return-1^o})(0|a,r,r.length,0):(function(o,c,l,h){var u=s,f=h+l;o^=-1;for(var d=h;d<f;d++)o=o>>>8^u[255&(o^c.charCodeAt(d))];return-1^o})(0|a,r,r.length,0):0}},{"./utils":32}],5:[function(n,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(n,t,e){"use strict";var i=null;i=typeof Promise<"u"?Promise:n("lie"),t.exports={Promise:i}},{lie:37}],7:[function(n,t,e){"use strict";var i=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",s=n("pako"),r=n("./utils"),a=n("./stream/GenericWorker"),o=i?"uint8array":"array";function c(l,h){a.call(this,"FlateWorker/"+l),this._pako=null,this._pakoAction=l,this._pakoOptions=h,this.meta={}}e.magic="\b\0",r.inherits(c,a),c.prototype.processChunk=function(l){this.meta=l.meta,this._pako===null&&this._createPako(),this._pako.push(r.transformTo(o,l.data),!1)},c.prototype.flush=function(){a.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new s[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var l=this;this._pako.onData=function(h){l.push({data:h,meta:l.meta})}},e.compressWorker=function(l){return new c("Deflate",l)},e.uncompressWorker=function(){return new c("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(n,t,e){"use strict";function i(u,f){var d,p="";for(d=0;d<f;d++)p+=String.fromCharCode(255&u),u>>>=8;return p}function s(u,f,d,p,_,m){var g,x,b=u.file,v=u.compression,w=m!==o.utf8encode,A=r.transformTo("string",m(b.name)),C=r.transformTo("string",o.utf8encode(b.name)),S=b.comment,I=r.transformTo("string",m(S)),T=r.transformTo("string",o.utf8encode(S)),P=C.length!==b.name.length,y=T.length!==S.length,k="",D="",z="",Y=b.dir,V=b.date,et={crc32:0,compressedSize:0,uncompressedSize:0};f&&!d||(et.crc32=u.crc32,et.compressedSize=u.compressedSize,et.uncompressedSize=u.uncompressedSize);var B=0;f&&(B|=8),w||!P&&!y||(B|=2048);var H=0,tt=0;Y&&(H|=16),_==="UNIX"?(tt=798,H|=(function(st,Jt){var Zt=st;return st||(Zt=Jt?16893:33204),(65535&Zt)<<16})(b.unixPermissions,Y)):(tt=20,H|=(function(st){return 63&(st||0)})(b.dosPermissions)),g=V.getUTCHours(),g<<=6,g|=V.getUTCMinutes(),g<<=5,g|=V.getUTCSeconds()/2,x=V.getUTCFullYear()-1980,x<<=4,x|=V.getUTCMonth()+1,x<<=5,x|=V.getUTCDate(),P&&(D=i(1,1)+i(c(A),4)+C,k+="up"+i(D.length,2)+D),y&&(z=i(1,1)+i(c(I),4)+T,k+="uc"+i(z.length,2)+z);var ht="";return ht+=`
\0`,ht+=i(B,2),ht+=v.magic,ht+=i(g,2),ht+=i(x,2),ht+=i(et.crc32,4),ht+=i(et.compressedSize,4),ht+=i(et.uncompressedSize,4),ht+=i(A.length,2),ht+=i(k.length,2),{fileRecord:l.LOCAL_FILE_HEADER+ht+A+k,dirRecord:l.CENTRAL_FILE_HEADER+i(tt,2)+ht+i(I.length,2)+"\0\0\0\0"+i(H,4)+i(p,4)+A+k+I}}var r=n("../utils"),a=n("../stream/GenericWorker"),o=n("../utf8"),c=n("../crc32"),l=n("../signature");function h(u,f,d,p){a.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=f,this.zipPlatform=d,this.encodeFileName=p,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}r.inherits(h,a),h.prototype.push=function(u){var f=u.meta.percent||0,d=this.entriesCount,p=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,a.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:d?(f+100*(d-p-1))/d:100}}))},h.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var f=this.streamFiles&&!u.file.dir;if(f){var d=s(u,f,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:d.fileRecord,meta:{percent:0}})}else this.accumulate=!0},h.prototype.closedSource=function(u){this.accumulate=!1;var f=this.streamFiles&&!u.file.dir,d=s(u,f,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(d.dirRecord),f)this.push({data:(function(p){return l.DATA_DESCRIPTOR+i(p.crc32,4)+i(p.compressedSize,4)+i(p.uncompressedSize,4)})(u),meta:{percent:100}});else for(this.push({data:d.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},h.prototype.flush=function(){for(var u=this.bytesWritten,f=0;f<this.dirRecords.length;f++)this.push({data:this.dirRecords[f],meta:{percent:100}});var d=this.bytesWritten-u,p=(function(_,m,g,x,b){var v=r.transformTo("string",b(x));return l.CENTRAL_DIRECTORY_END+"\0\0\0\0"+i(_,2)+i(_,2)+i(m,4)+i(g,4)+i(v.length,2)+v})(this.dirRecords.length,d,u,this.zipComment,this.encodeFileName);this.push({data:p,meta:{percent:100}})},h.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},h.prototype.registerPrevious=function(u){this._sources.push(u);var f=this;return u.on("data",function(d){f.processChunk(d)}),u.on("end",function(){f.closedSource(f.previous.streamInfo),f._sources.length?f.prepareNextSource():f.end()}),u.on("error",function(d){f.error(d)}),this},h.prototype.resume=function(){return!!a.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},h.prototype.error=function(u){var f=this._sources;if(!a.prototype.error.call(this,u))return!1;for(var d=0;d<f.length;d++)try{f[d].error(u)}catch{}return!0},h.prototype.lock=function(){a.prototype.lock.call(this);for(var u=this._sources,f=0;f<u.length;f++)u[f].lock()},t.exports=h},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(n,t,e){"use strict";var i=n("../compressions"),s=n("./ZipFileWorker");e.generateWorker=function(r,a,o){var c=new s(a.streamFiles,o,a.platform,a.encodeFileName),l=0;try{r.forEach(function(h,u){l++;var f=(function(m,g){var x=m||g,b=i[x];if(!b)throw new Error(x+" is not a valid compression method !");return b})(u.options.compression,a.compression),d=u.options.compressionOptions||a.compressionOptions||{},p=u.dir,_=u.date;u._compressWorker(f,d).withStreamInfo("file",{name:h,dir:p,date:_,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(c)}),c.entriesCount=l}catch(h){c.error(h)}return c}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(n,t,e){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var s=new i;for(var r in this)typeof this[r]!="function"&&(s[r]=this[r]);return s}}(i.prototype=n("./object")).loadAsync=n("./load"),i.support=n("./support"),i.defaults=n("./defaults"),i.version="3.10.2",i.loadAsync=function(s,r){return new i().loadAsync(s,r)},i.external=n("./external"),t.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(n,t,e){"use strict";var i=n("./utils"),s=n("./external"),r=n("./utf8"),a=n("./zipEntries"),o=n("./stream/Crc32Probe"),c=n("./nodejsUtils");function l(h){return new s.Promise(function(u,f){var d=h.decompressed.getContentWorker().pipe(new o);d.on("error",function(p){f(p)}).on("end",function(){d.streamInfo.crc32!==h.decompressed.crc32?f(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}t.exports=function(h,u){var f=this;return u=i.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:r.utf8decode}),c.isNode&&c.isStream(h)?s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):i.prepareContent("the loaded zip file",h,!0,u.optimizedBinaryString,u.base64).then(function(d){var p=new a(u);return p.load(d),p}).then(function(d){var p=[s.Promise.resolve(d)],_=d.files;if(u.checkCRC32)for(var m=0;m<_.length;m++)p.push(l(_[m]));return s.Promise.all(p)}).then(function(d){for(var p=d.shift(),_=p.files,m=0;m<_.length;m++){var g=_[m],x=g.fileNameStr,b=i.resolve(g.fileNameStr);f.file(b,g.decompressed,{binary:!0,optimizedBinaryString:!0,date:g.date,dir:g.dir,comment:g.fileCommentStr.length?g.fileCommentStr:null,unixPermissions:g.unixPermissions,dosPermissions:g.dosPermissions,createFolders:u.createFolders}),g.dir||(f.file(b).unsafeOriginalName=x)}return p.zipComment.length&&(f.comment=p.zipComment),f})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(n,t,e){"use strict";var i=n("../utils"),s=n("../stream/GenericWorker");function r(a,o){s.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(o)}i.inherits(r,s),r.prototype._bindStream=function(a){var o=this;(this._stream=a).pause(),a.on("data",function(c){o.push({data:c,meta:{percent:0}})}).on("error",function(c){o.isPaused?this.generatedError=c:o.error(c)}).on("end",function(){o.isPaused?o._upstreamEnded=!0:o.end()})},r.prototype.pause=function(){return!!s.prototype.pause.call(this)&&(this._stream.pause(),!0)},r.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=r},{"../stream/GenericWorker":28,"../utils":32}],13:[function(n,t,e){"use strict";var i=n("readable-stream").Readable;function s(r,a,o){i.call(this,a),this._helper=r;var c=this;r.on("data",function(l,h){c.push(l)||c._helper.pause(),o&&o(h)}).on("error",function(l){c.emit("error",l)}).on("end",function(){c.push(null)})}n("../utils").inherits(s,i),s.prototype._read=function(){this._helper.resume()},t.exports=s},{"../utils":32,"readable-stream":16}],14:[function(n,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(i,s){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(i,s);if(typeof i=="number")throw new Error('The "data" argument must not be a number');return new Buffer(i,s)},allocBuffer:function(i){if(Buffer.alloc)return Buffer.alloc(i);var s=new Buffer(i);return s.fill(0),s},isBuffer:function(i){return Buffer.isBuffer(i)},isStream:function(i){return i&&typeof i.on=="function"&&typeof i.pause=="function"&&typeof i.resume=="function"}}},{}],15:[function(n,t,e){"use strict";function i(b,v,w){var A,C=r.getTypeOf(v),S=r.extend(w||{},c);S.date=S.date||new Date,S.compression!==null&&(S.compression=S.compression.toUpperCase()),typeof S.unixPermissions=="string"&&(S.unixPermissions=parseInt(S.unixPermissions,8)),S.unixPermissions&&16384&S.unixPermissions&&(S.dir=!0),S.dosPermissions&&16&S.dosPermissions&&(S.dir=!0),S.dir&&(b=_(b)),S.createFolders&&(A=p(b))&&m.call(this,A,!0);var I=C==="string"&&S.binary===!1&&S.base64===!1;w&&w.binary!==void 0||(S.binary=!I),(v instanceof l&&v.uncompressedSize===0||S.dir||!v||v.length===0)&&(S.base64=!1,S.binary=!0,v="",S.compression="STORE",C="string");var T=null;T=v instanceof l||v instanceof a?v:f.isNode&&f.isStream(v)?new d(b,v):r.prepareContent(b,v,S.binary,S.optimizedBinaryString,S.base64);var P=new h(b,T,S);this.files[b]=P}var s=n("./utf8"),r=n("./utils"),a=n("./stream/GenericWorker"),o=n("./stream/StreamHelper"),c=n("./defaults"),l=n("./compressedObject"),h=n("./zipObject"),u=n("./generate"),f=n("./nodejsUtils"),d=n("./nodejs/NodejsStreamInputAdapter"),p=function(b){b.slice(-1)==="/"&&(b=b.substring(0,b.length-1));var v=b.lastIndexOf("/");return 0<v?b.substring(0,v):""},_=function(b){return b.slice(-1)!=="/"&&(b+="/"),b},m=function(b,v){return v=v!==void 0?v:c.createFolders,b=_(b),this.files[b]||i.call(this,b,null,{dir:!0,createFolders:v}),this.files[b]};function g(b){return Object.prototype.toString.call(b)==="[object RegExp]"}var x={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(b){var v,w,A;for(v in this.files)A=this.files[v],(w=v.slice(this.root.length,v.length))&&v.slice(0,this.root.length)===this.root&&b(w,A)},filter:function(b){var v=[];return this.forEach(function(w,A){b(w,A)&&v.push(A)}),v},file:function(b,v,w){if(arguments.length!==1)return b=this.root+b,i.call(this,b,v,w),this;if(g(b)){var A=b;return this.filter(function(S,I){return!I.dir&&A.test(S)})}var C=this.files[this.root+b];return C&&!C.dir?C:null},folder:function(b){if(!b)return this;if(g(b))return this.filter(function(C,S){return S.dir&&b.test(C)});var v=this.root+b,w=m.call(this,v),A=this.clone();return A.root=w.name,A},remove:function(b){b=this.root+b;var v=this.files[b];if(v||(b.slice(-1)!=="/"&&(b+="/"),v=this.files[b]),v&&!v.dir)delete this.files[b];else for(var w=this.filter(function(C,S){return S.name.slice(0,b.length)===b}),A=0;A<w.length;A++)delete this.files[w[A].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(b){var v,w={};try{if((w=r.extend(b||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:s.utf8encode})).type=w.type.toLowerCase(),w.compression=w.compression.toUpperCase(),w.type==="binarystring"&&(w.type="string"),!w.type)throw new Error("No output type specified.");r.checkSupport(w.type),w.platform!=="darwin"&&w.platform!=="freebsd"&&w.platform!=="linux"&&w.platform!=="sunos"||(w.platform="UNIX"),w.platform==="win32"&&(w.platform="DOS");var A=w.comment||this.comment||"";v=u.generateWorker(this,w,A)}catch(C){(v=new a("error")).error(C)}return new o(v,w.type||"string",w.mimeType)},generateAsync:function(b,v){return this.generateInternalStream(b).accumulate(v)},generateNodeStream:function(b,v){return(b=b||{}).type||(b.type="nodebuffer"),this.generateInternalStream(b).toNodejsStream(v)}};t.exports=x},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(n,t,e){"use strict";t.exports=n("stream")},{stream:void 0}],17:[function(n,t,e){"use strict";var i=n("./DataReader");function s(r){i.call(this,r);for(var a=0;a<this.data.length;a++)r[a]=255&r[a]}n("../utils").inherits(s,i),s.prototype.byteAt=function(r){return this.data[this.zero+r]},s.prototype.lastIndexOfSignature=function(r){for(var a=r.charCodeAt(0),o=r.charCodeAt(1),c=r.charCodeAt(2),l=r.charCodeAt(3),h=this.length-4;0<=h;--h)if(this.data[h]===a&&this.data[h+1]===o&&this.data[h+2]===c&&this.data[h+3]===l)return h-this.zero;return-1},s.prototype.readAndCheckSignature=function(r){var a=r.charCodeAt(0),o=r.charCodeAt(1),c=r.charCodeAt(2),l=r.charCodeAt(3),h=this.readData(4);return a===h[0]&&o===h[1]&&c===h[2]&&l===h[3]},s.prototype.readData=function(r){if(this.checkOffset(r),r===0)return[];var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./DataReader":18}],18:[function(n,t,e){"use strict";var i=n("../utils");function s(r){this.data=r,this.length=r.length,this.index=0,this.zero=0}s.prototype={checkOffset:function(r){this.checkIndex(this.index+r)},checkIndex:function(r){if(this.length<this.zero+r||r<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+r+"). Corrupted zip ?")},setIndex:function(r){this.checkIndex(r),this.index=r},skip:function(r){this.setIndex(this.index+r)},byteAt:function(){},readInt:function(r){var a,o=0;for(this.checkOffset(r),a=this.index+r-1;a>=this.index;a--)o=(o<<8)+this.byteAt(a);return this.index+=r,o},readString:function(r){return i.transformTo("string",this.readData(r))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var r=this.readInt(4);return new Date(Date.UTC(1980+(r>>25&127),(r>>21&15)-1,r>>16&31,r>>11&31,r>>5&63,(31&r)<<1))}},t.exports=s},{"../utils":32}],19:[function(n,t,e){"use strict";var i=n("./Uint8ArrayReader");function s(r){i.call(this,r)}n("../utils").inherits(s,i),s.prototype.readData=function(r){this.checkOffset(r);var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(n,t,e){"use strict";var i=n("./DataReader");function s(r){i.call(this,r)}n("../utils").inherits(s,i),s.prototype.byteAt=function(r){return this.data.charCodeAt(this.zero+r)},s.prototype.lastIndexOfSignature=function(r){return this.data.lastIndexOf(r)-this.zero},s.prototype.readAndCheckSignature=function(r){return r===this.readData(4)},s.prototype.readData=function(r){this.checkOffset(r);var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./DataReader":18}],21:[function(n,t,e){"use strict";var i=n("./ArrayReader");function s(r){i.call(this,r)}n("../utils").inherits(s,i),s.prototype.readData=function(r){if(this.checkOffset(r),r===0)return new Uint8Array(0);var a=this.data.subarray(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./ArrayReader":17}],22:[function(n,t,e){"use strict";var i=n("../utils"),s=n("../support"),r=n("./ArrayReader"),a=n("./StringReader"),o=n("./NodeBufferReader"),c=n("./Uint8ArrayReader");t.exports=function(l){var h=i.getTypeOf(l);return i.checkSupport(h),h!=="string"||s.uint8array?h==="nodebuffer"?new o(l):s.uint8array?new c(i.transformTo("uint8array",l)):new r(i.transformTo("array",l)):new a(l)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(n,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(n,t,e){"use strict";var i=n("./GenericWorker"),s=n("../utils");function r(a){i.call(this,"ConvertWorker to "+a),this.destType=a}s.inherits(r,i),r.prototype.processChunk=function(a){this.push({data:s.transformTo(this.destType,a.data),meta:a.meta})},t.exports=r},{"../utils":32,"./GenericWorker":28}],25:[function(n,t,e){"use strict";var i=n("./GenericWorker"),s=n("../crc32");function r(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}n("../utils").inherits(r,i),r.prototype.processChunk=function(a){this.streamInfo.crc32=s(a.data,this.streamInfo.crc32||0),this.push(a)},t.exports=r},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(n,t,e){"use strict";var i=n("../utils"),s=n("./GenericWorker");function r(a){s.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}i.inherits(r,s),r.prototype.processChunk=function(a){if(a){var o=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=o+a.data.length}s.prototype.processChunk.call(this,a)},t.exports=r},{"../utils":32,"./GenericWorker":28}],27:[function(n,t,e){"use strict";var i=n("../utils"),s=n("./GenericWorker");function r(a){s.call(this,"DataWorker");var o=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(c){o.dataIsReady=!0,o.data=c,o.max=c&&c.length||0,o.type=i.getTypeOf(c),o.isPaused||o._tickAndRepeat()},function(c){o.error(c)})}i.inherits(r,s),r.prototype.cleanUp=function(){s.prototype.cleanUp.call(this),this.data=null},r.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},r.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},r.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=null,o=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":a=this.data.substring(this.index,o);break;case"uint8array":a=this.data.subarray(this.index,o);break;case"array":case"nodebuffer":a=this.data.slice(this.index,o)}return this.index=o,this.push({data:a,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=r},{"../utils":32,"./GenericWorker":28}],28:[function(n,t,e){"use strict";function i(s){this.name=s||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(s){this.emit("data",s)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(s){this.emit("error",s)}return!0},error:function(s){return!this.isFinished&&(this.isPaused?this.generatedError=s:(this.isFinished=!0,this.emit("error",s),this.previous&&this.previous.error(s),this.cleanUp()),!0)},on:function(s,r){return this._listeners[s].push(r),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(s,r){if(this._listeners[s])for(var a=0;a<this._listeners[s].length;a++)this._listeners[s][a].call(this,r)},pipe:function(s){return s.registerPrevious(this)},registerPrevious:function(s){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=s.streamInfo,this.mergeStreamInfo(),this.previous=s;var r=this;return s.on("data",function(a){r.processChunk(a)}),s.on("end",function(){r.end()}),s.on("error",function(a){r.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var s=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),s=!0),this.previous&&this.previous.resume(),!s},flush:function(){},processChunk:function(s){this.push(s)},withStreamInfo:function(s,r){return this.extraStreamInfo[s]=r,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var s in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,s)&&(this.streamInfo[s]=this.extraStreamInfo[s])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var s="Worker "+this.name;return this.previous?this.previous+" -> "+s:s}},t.exports=i},{}],29:[function(n,t,e){"use strict";var i=n("../utils"),s=n("./ConvertWorker"),r=n("./GenericWorker"),a=n("../base64"),o=n("../support"),c=n("../external"),l=null;if(o.nodestream)try{l=n("../nodejs/NodejsStreamOutputAdapter")}catch{}function h(f,d){return new c.Promise(function(p,_){var m=[],g=f._internalType,x=f._outputType,b=f._mimeType;f.on("data",function(v,w){m.push(v),d&&d(w)}).on("error",function(v){m=[],_(v)}).on("end",function(){try{var v=(function(w,A,C){switch(w){case"blob":return i.newBlob(i.transformTo("arraybuffer",A),C);case"base64":return a.encode(A);default:return i.transformTo(w,A)}})(x,(function(w,A){var C,S=0,I=null,T=0;for(C=0;C<A.length;C++)T+=A[C].length;switch(w){case"string":return A.join("");case"array":return Array.prototype.concat.apply([],A);case"uint8array":for(I=new Uint8Array(T),C=0;C<A.length;C++)I.set(A[C],S),S+=A[C].length;return I;case"nodebuffer":return Buffer.concat(A);default:throw new Error("concat : unsupported type '"+w+"'")}})(g,m),b);p(v)}catch(w){_(w)}m=[]}).resume()})}function u(f,d,p){var _=d;switch(d){case"blob":case"arraybuffer":_="uint8array";break;case"base64":_="string"}try{this._internalType=_,this._outputType=d,this._mimeType=p,i.checkSupport(_),this._worker=f.pipe(new s(_)),f.lock()}catch(m){this._worker=new r("error"),this._worker.error(m)}}u.prototype={accumulate:function(f){return h(this,f)},on:function(f,d){var p=this;return f==="data"?this._worker.on(f,function(_){d.call(p,_.data,_.meta)}):this._worker.on(f,function(){i.delay(d,arguments,p)}),this},resume:function(){return i.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(f){if(i.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new l(this,{objectMode:this._outputType!=="nodebuffer"},f)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(n,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var i=new ArrayBuffer(0);try{e.blob=new Blob([i],{type:"application/zip"}).size===0}catch{try{var s=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);s.append(i),e.blob=s.getBlob("application/zip").size===0}catch{e.blob=!1}}}try{e.nodestream=!!n("readable-stream").Readable}catch{e.nodestream=!1}},{"readable-stream":16}],31:[function(n,t,e){"use strict";for(var i=n("./utils"),s=n("./support"),r=n("./nodejsUtils"),a=n("./stream/GenericWorker"),o=new Array(256),c=0;c<256;c++)o[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;o[254]=o[254]=1;function l(){a.call(this,"utf-8 decode"),this.leftOver=null}function h(){a.call(this,"utf-8 encode")}e.utf8encode=function(u){return s.nodebuffer?r.newBufferFrom(u,"utf-8"):(function(f){var d,p,_,m,g,x=f.length,b=0;for(m=0;m<x;m++)(64512&(p=f.charCodeAt(m)))==55296&&m+1<x&&(64512&(_=f.charCodeAt(m+1)))==56320&&(p=65536+(p-55296<<10)+(_-56320),m++),b+=p<128?1:p<2048?2:p<65536?3:4;for(d=s.uint8array?new Uint8Array(b):new Array(b),m=g=0;g<b;m++)(64512&(p=f.charCodeAt(m)))==55296&&m+1<x&&(64512&(_=f.charCodeAt(m+1)))==56320&&(p=65536+(p-55296<<10)+(_-56320),m++),p<128?d[g++]=p:(p<2048?d[g++]=192|p>>>6:(p<65536?d[g++]=224|p>>>12:(d[g++]=240|p>>>18,d[g++]=128|p>>>12&63),d[g++]=128|p>>>6&63),d[g++]=128|63&p);return d})(u)},e.utf8decode=function(u){return s.nodebuffer?i.transformTo("nodebuffer",u).toString("utf-8"):(function(f){var d,p,_,m,g=f.length,x=new Array(2*g);for(d=p=0;d<g;)if((_=f[d++])<128)x[p++]=_;else if(4<(m=o[_]))x[p++]=65533,d+=m-1;else{for(_&=m===2?31:m===3?15:7;1<m&&d<g;)_=_<<6|63&f[d++],m--;1<m?x[p++]=65533:_<65536?x[p++]=_:(_-=65536,x[p++]=55296|_>>10&1023,x[p++]=56320|1023&_)}return x.length!==p&&(x.subarray?x=x.subarray(0,p):x.length=p),i.applyFromCharCode(x)})(u=i.transformTo(s.uint8array?"uint8array":"array",u))},i.inherits(l,a),l.prototype.processChunk=function(u){var f=i.transformTo(s.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(s.uint8array){var d=f;(f=new Uint8Array(d.length+this.leftOver.length)).set(this.leftOver,0),f.set(d,this.leftOver.length)}else f=this.leftOver.concat(f);this.leftOver=null}var p=(function(m,g){var x;for((g=g||m.length)>m.length&&(g=m.length),x=g-1;0<=x&&(192&m[x])==128;)x--;return x<0||x===0?g:x+o[m[x]]>g?x:g})(f),_=f;p!==f.length&&(s.uint8array?(_=f.subarray(0,p),this.leftOver=f.subarray(p,f.length)):(_=f.slice(0,p),this.leftOver=f.slice(p,f.length))),this.push({data:e.utf8decode(_),meta:u.meta})},l.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=l,i.inherits(h,a),h.prototype.processChunk=function(u){this.push({data:e.utf8encode(u.data),meta:u.meta})},e.Utf8EncodeWorker=h},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(n,t,e){"use strict";var i=n("./support"),s=n("./base64"),r=n("./nodejsUtils"),a=n("./external");function o(d){return d}function c(d,p){for(var _=0;_<d.length;++_)p[_]=255&d.charCodeAt(_);return p}n("setimmediate"),e.newBlob=function(d,p){e.checkSupport("blob");try{return new Blob([d],{type:p})}catch{try{var _=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return _.append(d),_.getBlob(p)}catch{throw new Error("Bug : can't construct the Blob.")}}};var l={stringifyByChunk:function(d,p,_){var m=[],g=0,x=d.length;if(x<=_)return String.fromCharCode.apply(null,d);for(;g<x;)p==="array"||p==="nodebuffer"?m.push(String.fromCharCode.apply(null,d.slice(g,Math.min(g+_,x)))):m.push(String.fromCharCode.apply(null,d.subarray(g,Math.min(g+_,x)))),g+=_;return m.join("")},stringifyByChar:function(d){for(var p="",_=0;_<d.length;_++)p+=String.fromCharCode(d[_]);return p},applyCanBeUsed:{uint8array:(function(){try{return i.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return i.nodebuffer&&String.fromCharCode.apply(null,r.allocBuffer(1)).length===1}catch{return!1}})()}};function h(d){var p=65536,_=e.getTypeOf(d),m=!0;if(_==="uint8array"?m=l.applyCanBeUsed.uint8array:_==="nodebuffer"&&(m=l.applyCanBeUsed.nodebuffer),m)for(;1<p;)try{return l.stringifyByChunk(d,_,p)}catch{p=Math.floor(p/2)}return l.stringifyByChar(d)}function u(d,p){for(var _=0;_<d.length;_++)p[_]=d[_];return p}e.applyFromCharCode=h;var f={};f.string={string:o,array:function(d){return c(d,new Array(d.length))},arraybuffer:function(d){return f.string.uint8array(d).buffer},uint8array:function(d){return c(d,new Uint8Array(d.length))},nodebuffer:function(d){return c(d,r.allocBuffer(d.length))}},f.array={string:h,array:o,arraybuffer:function(d){return new Uint8Array(d).buffer},uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return r.newBufferFrom(d)}},f.arraybuffer={string:function(d){return h(new Uint8Array(d))},array:function(d){return u(new Uint8Array(d),new Array(d.byteLength))},arraybuffer:o,uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return r.newBufferFrom(new Uint8Array(d))}},f.uint8array={string:h,array:function(d){return u(d,new Array(d.length))},arraybuffer:function(d){return d.buffer},uint8array:o,nodebuffer:function(d){return r.newBufferFrom(d)}},f.nodebuffer={string:h,array:function(d){return u(d,new Array(d.length))},arraybuffer:function(d){return f.nodebuffer.uint8array(d).buffer},uint8array:function(d){return u(d,new Uint8Array(d.length))},nodebuffer:o},e.transformTo=function(d,p){if(p=p||"",!d)return p;e.checkSupport(d);var _=e.getTypeOf(p);return f[_][d](p)},e.resolve=function(d){for(var p=d.split("/"),_=[],m=0;m<p.length;m++){var g=p[m];g==="."||g===""&&m!==0&&m!==p.length-1||(g===".."?_.pop():_.push(g))}return _.join("/")},e.getTypeOf=function(d){if(typeof d=="string")return"string";var p=Object.prototype.toString.call(d);return p==="[object Array]"?"array":i.nodebuffer&&r.isBuffer(d)?"nodebuffer":i.uint8array&&p==="[object Uint8Array]"?"uint8array":i.arraybuffer&&p==="[object ArrayBuffer]"?"arraybuffer":void 0},e.checkSupport=function(d){if(!i[d.toLowerCase()])throw new Error(d+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(d){var p,_,m="";for(_=0;_<(d||"").length;_++)m+="\\x"+((p=d.charCodeAt(_))<16?"0":"")+p.toString(16).toUpperCase();return m},e.delay=function(d,p,_){setImmediate(function(){d.apply(_||null,p||[])})},e.inherits=function(d,p){function _(){}_.prototype=p.prototype,d.prototype=new _},e.extend=function(){var d,p,_={};for(d=0;d<arguments.length;d++)for(p in arguments[d])Object.prototype.hasOwnProperty.call(arguments[d],p)&&_[p]===void 0&&(_[p]=arguments[d][p]);return _},e.prepareContent=function(d,p,_,m,g){return a.Promise.resolve(p).then(function(x){return i.blob&&(x instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(x))!==-1)?Blob.prototype.arrayBuffer!==void 0?x.arrayBuffer():typeof FileReader<"u"?new a.Promise(function(b,v){var w=new FileReader;w.onload=function(A){b(A.target.result)},w.onerror=function(A){v(A.target.error)},w.readAsArrayBuffer(x)}):a.Promise.reject(new Error(d+" is a Blob, but we have no way of reading it.")):x}).then(function(x){var b=e.getTypeOf(x);return b?(b==="arraybuffer"?x=e.transformTo("uint8array",x):b==="string"&&(g?x=s.decode(x):_&&m!==!0&&(x=(function(v){return c(v,i.uint8array?new Uint8Array(v.length):new Array(v.length))})(x))),x):a.Promise.reject(new Error("Can't read the data of '"+d+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(n,t,e){"use strict";var i=n("./reader/readerFor"),s=n("./utils"),r=n("./signature"),a=n("./zipEntry"),o=n("./support");function c(l){this.files=[],this.loadOptions=l}c.prototype={checkSignature:function(l){if(!this.reader.readAndCheckSignature(l)){this.reader.index-=4;var h=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+s.pretty(h)+", expected "+s.pretty(l)+")")}},isSignature:function(l,h){var u=this.reader.index;this.reader.setIndex(l);var f=this.reader.readString(4)===h;return this.reader.setIndex(u),f},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var l=this.reader.readData(this.zipCommentLength),h=o.uint8array?"uint8array":"array",u=s.transformTo(h,l);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var l,h,u,f=this.zip64EndOfCentralSize-44;0<f;)l=this.reader.readInt(2),h=this.reader.readInt(4),u=this.reader.readData(h),this.zip64ExtensibleData[l]={id:l,length:h,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var l,h;for(l=0;l<this.files.length;l++)h=this.files[l],this.reader.setIndex(h.localHeaderOffset),this.checkSignature(r.LOCAL_FILE_HEADER),h.readLocalPart(this.reader),h.handleUTF8(),h.processAttributes()},readCentralDir:function(){var l;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER);)(l=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(l);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var l=this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);if(l<0)throw this.isSignature(0,r.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(l);var h=l;if(this.checkSignature(r.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===s.MAX_VALUE_16BITS||this.diskWithCentralDirStart===s.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===s.MAX_VALUE_16BITS||this.centralDirRecords===s.MAX_VALUE_16BITS||this.centralDirSize===s.MAX_VALUE_32BITS||this.centralDirOffset===s.MAX_VALUE_32BITS){if(this.zip64=!0,(l=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(l),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,r.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var f=h-u;if(0<f)this.isSignature(h,r.CENTRAL_FILE_HEADER)||(this.reader.zero=f);else if(f<0)throw new Error("Corrupted zip: missing "+Math.abs(f)+" bytes.")},prepareReader:function(l){this.reader=i(l)},load:function(l){this.prepareReader(l),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=c},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(n,t,e){"use strict";var i=n("./reader/readerFor"),s=n("./utils"),r=n("./compressedObject"),a=n("./crc32"),o=n("./utf8"),c=n("./compressions"),l=n("./support");function h(u,f){this.options=u,this.loadOptions=f}h.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var f,d;if(u.skip(22),this.fileNameLength=u.readInt(2),d=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(d),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((f=(function(p){for(var _ in c)if(Object.prototype.hasOwnProperty.call(c,_)&&c[_].magic===p)return c[_];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new r(this.compressedSize,this.uncompressedSize,this.crc32,f,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var f=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(f),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var f,d,p,_=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<_;)f=u.readInt(2),d=u.readInt(2),p=u.readData(d),this.extraFields[f]={id:f,length:d,value:p};u.setIndex(_)},handleUTF8:function(){var u=l.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var f=this.findExtraFieldUnicodePath();if(f!==null)this.fileNameStr=f;else{var d=s.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(d)}var p=this.findExtraFieldUnicodeComment();if(p!==null)this.fileCommentStr=p;else{var _=s.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(_)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var f=i(u.value);return f.readInt(1)!==1||a(this.fileName)!==f.readInt(4)?null:o.utf8decode(f.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var f=i(u.value);return f.readInt(1)!==1||a(this.fileComment)!==f.readInt(4)?null:o.utf8decode(f.readData(u.length-5))}return null}},t.exports=h},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(n,t,e){"use strict";function i(f,d,p){this.name=f,this.dir=p.dir,this.date=p.date,this.comment=p.comment,this.unixPermissions=p.unixPermissions,this.dosPermissions=p.dosPermissions,this._data=d,this._dataBinary=p.binary,this.options={compression:p.compression,compressionOptions:p.compressionOptions}}var s=n("./stream/StreamHelper"),r=n("./stream/DataWorker"),a=n("./utf8"),o=n("./compressedObject"),c=n("./stream/GenericWorker");i.prototype={internalStream:function(f){var d=null,p="string";try{if(!f)throw new Error("No output type specified.");var _=(p=f.toLowerCase())==="string"||p==="text";p!=="binarystring"&&p!=="text"||(p="string"),d=this._decompressWorker();var m=!this._dataBinary;m&&!_&&(d=d.pipe(new a.Utf8EncodeWorker)),!m&&_&&(d=d.pipe(new a.Utf8DecodeWorker))}catch(g){(d=new c("error")).error(g)}return new s(d,p,"")},async:function(f,d){return this.internalStream(f).accumulate(d)},nodeStream:function(f,d){return this.internalStream(f||"nodebuffer").toNodejsStream(d)},_compressWorker:function(f,d){if(this._data instanceof o&&this._data.compression.magic===f.magic)return this._data.getCompressedWorker();var p=this._decompressWorker();return this._dataBinary||(p=p.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(p,f,d)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof c?this._data:new r(this._data)}};for(var l=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],h=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<l.length;u++)i.prototype[l[u]]=h;t.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(n,t,e){(function(i){"use strict";var s,r,a=i.MutationObserver||i.WebKitMutationObserver;if(a){var o=0,c=new a(f),l=i.document.createTextNode("");c.observe(l,{characterData:!0}),s=function(){l.data=o=++o%2}}else if(i.setImmediate||i.MessageChannel===void 0)s="document"in i&&"onreadystatechange"in i.document.createElement("script")?function(){var d=i.document.createElement("script");d.onreadystatechange=function(){f(),d.onreadystatechange=null,d.parentNode.removeChild(d),d=null},i.document.documentElement.appendChild(d)}:function(){setTimeout(f,0)};else{var h=new i.MessageChannel;h.port1.onmessage=f,s=function(){h.port2.postMessage(0)}}var u=[];function f(){var d,p;r=!0;for(var _=u.length;_;){for(p=u,u=[],d=-1;++d<_;)p[d]();_=u.length}r=!1}t.exports=function(d){u.push(d)!==1||r||s()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(n,t,e){"use strict";var i=n("immediate");function s(){}var r={},a=["REJECTED"],o=["FULFILLED"],c=["PENDING"];function l(_){if(typeof _!="function")throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,_!==s&&d(this,_)}function h(_,m,g){this.promise=_,typeof m=="function"&&(this.onFulfilled=m,this.callFulfilled=this.otherCallFulfilled),typeof g=="function"&&(this.onRejected=g,this.callRejected=this.otherCallRejected)}function u(_,m,g){i(function(){var x;try{x=m(g)}catch(b){return r.reject(_,b)}x===_?r.reject(_,new TypeError("Cannot resolve promise with itself")):r.resolve(_,x)})}function f(_){var m=_&&_.then;if(_&&(typeof _=="object"||typeof _=="function")&&typeof m=="function")return function(){m.apply(_,arguments)}}function d(_,m){var g=!1;function x(w){g||(g=!0,r.reject(_,w))}function b(w){g||(g=!0,r.resolve(_,w))}var v=p(function(){m(b,x)});v.status==="error"&&x(v.value)}function p(_,m){var g={};try{g.value=_(m),g.status="success"}catch(x){g.status="error",g.value=x}return g}(t.exports=l).prototype.finally=function(_){if(typeof _!="function")return this;var m=this.constructor;return this.then(function(g){return m.resolve(_()).then(function(){return g})},function(g){return m.resolve(_()).then(function(){throw g})})},l.prototype.catch=function(_){return this.then(null,_)},l.prototype.then=function(_,m){if(typeof _!="function"&&this.state===o||typeof m!="function"&&this.state===a)return this;var g=new this.constructor(s);return this.state!==c?u(g,this.state===o?_:m,this.outcome):this.queue.push(new h(g,_,m)),g},h.prototype.callFulfilled=function(_){r.resolve(this.promise,_)},h.prototype.otherCallFulfilled=function(_){u(this.promise,this.onFulfilled,_)},h.prototype.callRejected=function(_){r.reject(this.promise,_)},h.prototype.otherCallRejected=function(_){u(this.promise,this.onRejected,_)},r.resolve=function(_,m){var g=p(f,m);if(g.status==="error")return r.reject(_,g.value);var x=g.value;if(x)d(_,x);else{_.state=o,_.outcome=m;for(var b=-1,v=_.queue.length;++b<v;)_.queue[b].callFulfilled(m)}return _},r.reject=function(_,m){_.state=a,_.outcome=m;for(var g=-1,x=_.queue.length;++g<x;)_.queue[g].callRejected(m);return _},l.resolve=function(_){return _ instanceof this?_:r.resolve(new this(s),_)},l.reject=function(_){var m=new this(s);return r.reject(m,_)},l.all=function(_){var m=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var g=_.length,x=!1;if(!g)return this.resolve([]);for(var b=new Array(g),v=0,w=-1,A=new this(s);++w<g;)C(_[w],w);return A;function C(S,I){m.resolve(S).then(function(T){b[I]=T,++v!==g||x||(x=!0,r.resolve(A,b))},function(T){x||(x=!0,r.reject(A,T))})}},l.race=function(_){var m=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var g=_.length,x=!1;if(!g)return this.resolve([]);for(var b=-1,v=new this(s);++b<g;)w=_[b],m.resolve(w).then(function(A){x||(x=!0,r.resolve(v,A))},function(A){x||(x=!0,r.reject(v,A))});var w;return v}},{immediate:36}],38:[function(n,t,e){"use strict";var i={};(0,n("./lib/utils/common").assign)(i,n("./lib/deflate"),n("./lib/inflate"),n("./lib/zlib/constants")),t.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(n,t,e){"use strict";var i=n("./zlib/deflate"),s=n("./utils/common"),r=n("./utils/strings"),a=n("./zlib/messages"),o=n("./zlib/zstream"),c=Object.prototype.toString,l=0,h=-1,u=0,f=8;function d(_){if(!(this instanceof d))return new d(_);this.options=s.assign({level:h,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},_||{});var m=this.options;m.raw&&0<m.windowBits?m.windowBits=-m.windowBits:m.gzip&&0<m.windowBits&&m.windowBits<16&&(m.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new o,this.strm.avail_out=0;var g=i.deflateInit2(this.strm,m.level,m.method,m.windowBits,m.memLevel,m.strategy);if(g!==l)throw new Error(a[g]);if(m.header&&i.deflateSetHeader(this.strm,m.header),m.dictionary){var x;if(x=typeof m.dictionary=="string"?r.string2buf(m.dictionary):c.call(m.dictionary)==="[object ArrayBuffer]"?new Uint8Array(m.dictionary):m.dictionary,(g=i.deflateSetDictionary(this.strm,x))!==l)throw new Error(a[g]);this._dict_set=!0}}function p(_,m){var g=new d(m);if(g.push(_,!0),g.err)throw g.msg||a[g.err];return g.result}d.prototype.push=function(_,m){var g,x,b=this.strm,v=this.options.chunkSize;if(this.ended)return!1;x=m===~~m?m:m===!0?4:0,typeof _=="string"?b.input=r.string2buf(_):c.call(_)==="[object ArrayBuffer]"?b.input=new Uint8Array(_):b.input=_,b.next_in=0,b.avail_in=b.input.length;do{if(b.avail_out===0&&(b.output=new s.Buf8(v),b.next_out=0,b.avail_out=v),(g=i.deflate(b,x))!==1&&g!==l)return this.onEnd(g),!(this.ended=!0);b.avail_out!==0&&(b.avail_in!==0||x!==4&&x!==2)||(this.options.to==="string"?this.onData(r.buf2binstring(s.shrinkBuf(b.output,b.next_out))):this.onData(s.shrinkBuf(b.output,b.next_out)))}while((0<b.avail_in||b.avail_out===0)&&g!==1);return x===4?(g=i.deflateEnd(this.strm),this.onEnd(g),this.ended=!0,g===l):x!==2||(this.onEnd(l),!(b.avail_out=0))},d.prototype.onData=function(_){this.chunks.push(_)},d.prototype.onEnd=function(_){_===l&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=_,this.msg=this.strm.msg},e.Deflate=d,e.deflate=p,e.deflateRaw=function(_,m){return(m=m||{}).raw=!0,p(_,m)},e.gzip=function(_,m){return(m=m||{}).gzip=!0,p(_,m)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(n,t,e){"use strict";var i=n("./zlib/inflate"),s=n("./utils/common"),r=n("./utils/strings"),a=n("./zlib/constants"),o=n("./zlib/messages"),c=n("./zlib/zstream"),l=n("./zlib/gzheader"),h=Object.prototype.toString;function u(d){if(!(this instanceof u))return new u(d);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},d||{});var p=this.options;p.raw&&0<=p.windowBits&&p.windowBits<16&&(p.windowBits=-p.windowBits,p.windowBits===0&&(p.windowBits=-15)),!(0<=p.windowBits&&p.windowBits<16)||d&&d.windowBits||(p.windowBits+=32),15<p.windowBits&&p.windowBits<48&&(15&p.windowBits)==0&&(p.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var _=i.inflateInit2(this.strm,p.windowBits);if(_!==a.Z_OK)throw new Error(o[_]);this.header=new l,i.inflateGetHeader(this.strm,this.header)}function f(d,p){var _=new u(p);if(_.push(d,!0),_.err)throw _.msg||o[_.err];return _.result}u.prototype.push=function(d,p){var _,m,g,x,b,v,w=this.strm,A=this.options.chunkSize,C=this.options.dictionary,S=!1;if(this.ended)return!1;m=p===~~p?p:p===!0?a.Z_FINISH:a.Z_NO_FLUSH,typeof d=="string"?w.input=r.binstring2buf(d):h.call(d)==="[object ArrayBuffer]"?w.input=new Uint8Array(d):w.input=d,w.next_in=0,w.avail_in=w.input.length;do{if(w.avail_out===0&&(w.output=new s.Buf8(A),w.next_out=0,w.avail_out=A),(_=i.inflate(w,a.Z_NO_FLUSH))===a.Z_NEED_DICT&&C&&(v=typeof C=="string"?r.string2buf(C):h.call(C)==="[object ArrayBuffer]"?new Uint8Array(C):C,_=i.inflateSetDictionary(this.strm,v)),_===a.Z_BUF_ERROR&&S===!0&&(_=a.Z_OK,S=!1),_!==a.Z_STREAM_END&&_!==a.Z_OK)return this.onEnd(_),!(this.ended=!0);w.next_out&&(w.avail_out!==0&&_!==a.Z_STREAM_END&&(w.avail_in!==0||m!==a.Z_FINISH&&m!==a.Z_SYNC_FLUSH)||(this.options.to==="string"?(g=r.utf8border(w.output,w.next_out),x=w.next_out-g,b=r.buf2string(w.output,g),w.next_out=x,w.avail_out=A-x,x&&s.arraySet(w.output,w.output,g,x,0),this.onData(b)):this.onData(s.shrinkBuf(w.output,w.next_out)))),w.avail_in===0&&w.avail_out===0&&(S=!0)}while((0<w.avail_in||w.avail_out===0)&&_!==a.Z_STREAM_END);return _===a.Z_STREAM_END&&(m=a.Z_FINISH),m===a.Z_FINISH?(_=i.inflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===a.Z_OK):m!==a.Z_SYNC_FLUSH||(this.onEnd(a.Z_OK),!(w.avail_out=0))},u.prototype.onData=function(d){this.chunks.push(d)},u.prototype.onEnd=function(d){d===a.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=d,this.msg=this.strm.msg},e.Inflate=u,e.inflate=f,e.inflateRaw=function(d,p){return(p=p||{}).raw=!0,f(d,p)},e.ungzip=f},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(n,t,e){"use strict";var i=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(a){for(var o=Array.prototype.slice.call(arguments,1);o.length;){var c=o.shift();if(c){if(typeof c!="object")throw new TypeError(c+"must be non-object");for(var l in c)c.hasOwnProperty(l)&&(a[l]=c[l])}}return a},e.shrinkBuf=function(a,o){return a.length===o?a:a.subarray?a.subarray(0,o):(a.length=o,a)};var s={arraySet:function(a,o,c,l,h){if(o.subarray&&a.subarray)a.set(o.subarray(c,c+l),h);else for(var u=0;u<l;u++)a[h+u]=o[c+u]},flattenChunks:function(a){var o,c,l,h,u,f;for(o=l=0,c=a.length;o<c;o++)l+=a[o].length;for(f=new Uint8Array(l),o=h=0,c=a.length;o<c;o++)u=a[o],f.set(u,h),h+=u.length;return f}},r={arraySet:function(a,o,c,l,h){for(var u=0;u<l;u++)a[h+u]=o[c+u]},flattenChunks:function(a){return[].concat.apply([],a)}};e.setTyped=function(a){a?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,s)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,r))},e.setTyped(i)},{}],42:[function(n,t,e){"use strict";var i=n("./common"),s=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch{s=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{r=!1}for(var a=new i.Buf8(256),o=0;o<256;o++)a[o]=252<=o?6:248<=o?5:240<=o?4:224<=o?3:192<=o?2:1;function c(l,h){if(h<65537&&(l.subarray&&r||!l.subarray&&s))return String.fromCharCode.apply(null,i.shrinkBuf(l,h));for(var u="",f=0;f<h;f++)u+=String.fromCharCode(l[f]);return u}a[254]=a[254]=1,e.string2buf=function(l){var h,u,f,d,p,_=l.length,m=0;for(d=0;d<_;d++)(64512&(u=l.charCodeAt(d)))==55296&&d+1<_&&(64512&(f=l.charCodeAt(d+1)))==56320&&(u=65536+(u-55296<<10)+(f-56320),d++),m+=u<128?1:u<2048?2:u<65536?3:4;for(h=new i.Buf8(m),d=p=0;p<m;d++)(64512&(u=l.charCodeAt(d)))==55296&&d+1<_&&(64512&(f=l.charCodeAt(d+1)))==56320&&(u=65536+(u-55296<<10)+(f-56320),d++),u<128?h[p++]=u:(u<2048?h[p++]=192|u>>>6:(u<65536?h[p++]=224|u>>>12:(h[p++]=240|u>>>18,h[p++]=128|u>>>12&63),h[p++]=128|u>>>6&63),h[p++]=128|63&u);return h},e.buf2binstring=function(l){return c(l,l.length)},e.binstring2buf=function(l){for(var h=new i.Buf8(l.length),u=0,f=h.length;u<f;u++)h[u]=l.charCodeAt(u);return h},e.buf2string=function(l,h){var u,f,d,p,_=h||l.length,m=new Array(2*_);for(u=f=0;u<_;)if((d=l[u++])<128)m[f++]=d;else if(4<(p=a[d]))m[f++]=65533,u+=p-1;else{for(d&=p===2?31:p===3?15:7;1<p&&u<_;)d=d<<6|63&l[u++],p--;1<p?m[f++]=65533:d<65536?m[f++]=d:(d-=65536,m[f++]=55296|d>>10&1023,m[f++]=56320|1023&d)}return c(m,f)},e.utf8border=function(l,h){var u;for((h=h||l.length)>l.length&&(h=l.length),u=h-1;0<=u&&(192&l[u])==128;)u--;return u<0||u===0?h:u+a[l[u]]>h?u:h}},{"./common":41}],43:[function(n,t,e){"use strict";t.exports=function(i,s,r,a){for(var o=65535&i|0,c=i>>>16&65535|0,l=0;r!==0;){for(r-=l=2e3<r?2e3:r;c=c+(o=o+s[a++]|0)|0,--l;);o%=65521,c%=65521}return o|c<<16|0}},{}],44:[function(n,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(n,t,e){"use strict";var i=(function(){for(var s,r=[],a=0;a<256;a++){s=a;for(var o=0;o<8;o++)s=1&s?3988292384^s>>>1:s>>>1;r[a]=s}return r})();t.exports=function(s,r,a,o){var c=i,l=o+a;s^=-1;for(var h=o;h<l;h++)s=s>>>8^c[255&(s^r[h])];return-1^s}},{}],46:[function(n,t,e){"use strict";var i,s=n("../utils/common"),r=n("./trees"),a=n("./adler32"),o=n("./crc32"),c=n("./messages"),l=0,h=4,u=0,f=-2,d=-1,p=4,_=2,m=8,g=9,x=286,b=30,v=19,w=2*x+1,A=15,C=3,S=258,I=S+C+1,T=42,P=113,y=1,k=2,D=3,z=4;function Y(M,rt){return M.msg=c[rt],rt}function V(M){return(M<<1)-(4<M?9:0)}function et(M){for(var rt=M.length;0<=--rt;)M[rt]=0}function B(M){var rt=M.state,Z=rt.pending;Z>M.avail_out&&(Z=M.avail_out),Z!==0&&(s.arraySet(M.output,rt.pending_buf,rt.pending_out,Z,M.next_out),M.next_out+=Z,rt.pending_out+=Z,M.total_out+=Z,M.avail_out-=Z,rt.pending-=Z,rt.pending===0&&(rt.pending_out=0))}function H(M,rt){r._tr_flush_block(M,0<=M.block_start?M.block_start:-1,M.strstart-M.block_start,rt),M.block_start=M.strstart,B(M.strm)}function tt(M,rt){M.pending_buf[M.pending++]=rt}function ht(M,rt){M.pending_buf[M.pending++]=rt>>>8&255,M.pending_buf[M.pending++]=255&rt}function st(M,rt){var Z,U,N=M.max_chain_length,G=M.strstart,lt=M.prev_length,ft=M.nice_match,$=M.strstart>M.w_size-I?M.strstart-(M.w_size-I):0,dt=M.window,xt=M.w_mask,F=M.prev,Pt=M.strstart+S,Gt=dt[G+lt-1],L=dt[G+lt];M.prev_length>=M.good_match&&(N>>=2),ft>M.lookahead&&(ft=M.lookahead);do if(dt[(Z=rt)+lt]===L&&dt[Z+lt-1]===Gt&&dt[Z]===dt[G]&&dt[++Z]===dt[G+1]){G+=2,Z++;do;while(dt[++G]===dt[++Z]&&dt[++G]===dt[++Z]&&dt[++G]===dt[++Z]&&dt[++G]===dt[++Z]&&dt[++G]===dt[++Z]&&dt[++G]===dt[++Z]&&dt[++G]===dt[++Z]&&dt[++G]===dt[++Z]&&G<Pt);if(U=S-(Pt-G),G=Pt-S,lt<U){if(M.match_start=rt,ft<=(lt=U))break;Gt=dt[G+lt-1],L=dt[G+lt]}}while((rt=F[rt&xt])>$&&--N!=0);return lt<=M.lookahead?lt:M.lookahead}function Jt(M){var rt,Z,U,N,G,lt,ft,$,dt,xt,F=M.w_size;do{if(N=M.window_size-M.lookahead-M.strstart,M.strstart>=F+(F-I)){for(s.arraySet(M.window,M.window,F,F,0),M.match_start-=F,M.strstart-=F,M.block_start-=F,rt=Z=M.hash_size;U=M.head[--rt],M.head[rt]=F<=U?U-F:0,--Z;);for(rt=Z=F;U=M.prev[--rt],M.prev[rt]=F<=U?U-F:0,--Z;);N+=F}if(M.strm.avail_in===0)break;if(lt=M.strm,ft=M.window,$=M.strstart+M.lookahead,dt=N,xt=void 0,xt=lt.avail_in,dt<xt&&(xt=dt),Z=xt===0?0:(lt.avail_in-=xt,s.arraySet(ft,lt.input,lt.next_in,xt,$),lt.state.wrap===1?lt.adler=a(lt.adler,ft,xt,$):lt.state.wrap===2&&(lt.adler=o(lt.adler,ft,xt,$)),lt.next_in+=xt,lt.total_in+=xt,xt),M.lookahead+=Z,M.lookahead+M.insert>=C)for(G=M.strstart-M.insert,M.ins_h=M.window[G],M.ins_h=(M.ins_h<<M.hash_shift^M.window[G+1])&M.hash_mask;M.insert&&(M.ins_h=(M.ins_h<<M.hash_shift^M.window[G+C-1])&M.hash_mask,M.prev[G&M.w_mask]=M.head[M.ins_h],M.head[M.ins_h]=G,G++,M.insert--,!(M.lookahead+M.insert<C)););}while(M.lookahead<I&&M.strm.avail_in!==0)}function Zt(M,rt){for(var Z,U;;){if(M.lookahead<I){if(Jt(M),M.lookahead<I&&rt===l)return y;if(M.lookahead===0)break}if(Z=0,M.lookahead>=C&&(M.ins_h=(M.ins_h<<M.hash_shift^M.window[M.strstart+C-1])&M.hash_mask,Z=M.prev[M.strstart&M.w_mask]=M.head[M.ins_h],M.head[M.ins_h]=M.strstart),Z!==0&&M.strstart-Z<=M.w_size-I&&(M.match_length=st(M,Z)),M.match_length>=C)if(U=r._tr_tally(M,M.strstart-M.match_start,M.match_length-C),M.lookahead-=M.match_length,M.match_length<=M.max_lazy_match&&M.lookahead>=C){for(M.match_length--;M.strstart++,M.ins_h=(M.ins_h<<M.hash_shift^M.window[M.strstart+C-1])&M.hash_mask,Z=M.prev[M.strstart&M.w_mask]=M.head[M.ins_h],M.head[M.ins_h]=M.strstart,--M.match_length!=0;);M.strstart++}else M.strstart+=M.match_length,M.match_length=0,M.ins_h=M.window[M.strstart],M.ins_h=(M.ins_h<<M.hash_shift^M.window[M.strstart+1])&M.hash_mask;else U=r._tr_tally(M,0,M.window[M.strstart]),M.lookahead--,M.strstart++;if(U&&(H(M,!1),M.strm.avail_out===0))return y}return M.insert=M.strstart<C-1?M.strstart:C-1,rt===h?(H(M,!0),M.strm.avail_out===0?D:z):M.last_lit&&(H(M,!1),M.strm.avail_out===0)?y:k}function Dt(M,rt){for(var Z,U,N;;){if(M.lookahead<I){if(Jt(M),M.lookahead<I&&rt===l)return y;if(M.lookahead===0)break}if(Z=0,M.lookahead>=C&&(M.ins_h=(M.ins_h<<M.hash_shift^M.window[M.strstart+C-1])&M.hash_mask,Z=M.prev[M.strstart&M.w_mask]=M.head[M.ins_h],M.head[M.ins_h]=M.strstart),M.prev_length=M.match_length,M.prev_match=M.match_start,M.match_length=C-1,Z!==0&&M.prev_length<M.max_lazy_match&&M.strstart-Z<=M.w_size-I&&(M.match_length=st(M,Z),M.match_length<=5&&(M.strategy===1||M.match_length===C&&4096<M.strstart-M.match_start)&&(M.match_length=C-1)),M.prev_length>=C&&M.match_length<=M.prev_length){for(N=M.strstart+M.lookahead-C,U=r._tr_tally(M,M.strstart-1-M.prev_match,M.prev_length-C),M.lookahead-=M.prev_length-1,M.prev_length-=2;++M.strstart<=N&&(M.ins_h=(M.ins_h<<M.hash_shift^M.window[M.strstart+C-1])&M.hash_mask,Z=M.prev[M.strstart&M.w_mask]=M.head[M.ins_h],M.head[M.ins_h]=M.strstart),--M.prev_length!=0;);if(M.match_available=0,M.match_length=C-1,M.strstart++,U&&(H(M,!1),M.strm.avail_out===0))return y}else if(M.match_available){if((U=r._tr_tally(M,0,M.window[M.strstart-1]))&&H(M,!1),M.strstart++,M.lookahead--,M.strm.avail_out===0)return y}else M.match_available=1,M.strstart++,M.lookahead--}return M.match_available&&(U=r._tr_tally(M,0,M.window[M.strstart-1]),M.match_available=0),M.insert=M.strstart<C-1?M.strstart:C-1,rt===h?(H(M,!0),M.strm.avail_out===0?D:z):M.last_lit&&(H(M,!1),M.strm.avail_out===0)?y:k}function Q(M,rt,Z,U,N){this.good_length=M,this.max_lazy=rt,this.nice_length=Z,this.max_chain=U,this.func=N}function at(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=m,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new s.Buf16(2*w),this.dyn_dtree=new s.Buf16(2*(2*b+1)),this.bl_tree=new s.Buf16(2*(2*v+1)),et(this.dyn_ltree),et(this.dyn_dtree),et(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new s.Buf16(A+1),this.heap=new s.Buf16(2*x+1),et(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new s.Buf16(2*x+1),et(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function vt(M){var rt;return M&&M.state?(M.total_in=M.total_out=0,M.data_type=_,(rt=M.state).pending=0,rt.pending_out=0,rt.wrap<0&&(rt.wrap=-rt.wrap),rt.status=rt.wrap?T:P,M.adler=rt.wrap===2?0:1,rt.last_flush=l,r._tr_init(rt),u):Y(M,f)}function Xt(M){var rt=vt(M);return rt===u&&(function(Z){Z.window_size=2*Z.w_size,et(Z.head),Z.max_lazy_match=i[Z.level].max_lazy,Z.good_match=i[Z.level].good_length,Z.nice_match=i[Z.level].nice_length,Z.max_chain_length=i[Z.level].max_chain,Z.strstart=0,Z.block_start=0,Z.lookahead=0,Z.insert=0,Z.match_length=Z.prev_length=C-1,Z.match_available=0,Z.ins_h=0})(M.state),rt}function Mt(M,rt,Z,U,N,G){if(!M)return f;var lt=1;if(rt===d&&(rt=6),U<0?(lt=0,U=-U):15<U&&(lt=2,U-=16),N<1||g<N||Z!==m||U<8||15<U||rt<0||9<rt||G<0||p<G)return Y(M,f);U===8&&(U=9);var ft=new at;return(M.state=ft).strm=M,ft.wrap=lt,ft.gzhead=null,ft.w_bits=U,ft.w_size=1<<ft.w_bits,ft.w_mask=ft.w_size-1,ft.hash_bits=N+7,ft.hash_size=1<<ft.hash_bits,ft.hash_mask=ft.hash_size-1,ft.hash_shift=~~((ft.hash_bits+C-1)/C),ft.window=new s.Buf8(2*ft.w_size),ft.head=new s.Buf16(ft.hash_size),ft.prev=new s.Buf16(ft.w_size),ft.lit_bufsize=1<<N+6,ft.pending_buf_size=4*ft.lit_bufsize,ft.pending_buf=new s.Buf8(ft.pending_buf_size),ft.d_buf=1*ft.lit_bufsize,ft.l_buf=3*ft.lit_bufsize,ft.level=rt,ft.strategy=G,ft.method=Z,Xt(M)}i=[new Q(0,0,0,0,function(M,rt){var Z=65535;for(Z>M.pending_buf_size-5&&(Z=M.pending_buf_size-5);;){if(M.lookahead<=1){if(Jt(M),M.lookahead===0&&rt===l)return y;if(M.lookahead===0)break}M.strstart+=M.lookahead,M.lookahead=0;var U=M.block_start+Z;if((M.strstart===0||M.strstart>=U)&&(M.lookahead=M.strstart-U,M.strstart=U,H(M,!1),M.strm.avail_out===0)||M.strstart-M.block_start>=M.w_size-I&&(H(M,!1),M.strm.avail_out===0))return y}return M.insert=0,rt===h?(H(M,!0),M.strm.avail_out===0?D:z):(M.strstart>M.block_start&&(H(M,!1),M.strm.avail_out),y)}),new Q(4,4,8,4,Zt),new Q(4,5,16,8,Zt),new Q(4,6,32,32,Zt),new Q(4,4,16,16,Dt),new Q(8,16,32,32,Dt),new Q(8,16,128,128,Dt),new Q(8,32,128,256,Dt),new Q(32,128,258,1024,Dt),new Q(32,258,258,4096,Dt)],e.deflateInit=function(M,rt){return Mt(M,rt,m,15,8,0)},e.deflateInit2=Mt,e.deflateReset=Xt,e.deflateResetKeep=vt,e.deflateSetHeader=function(M,rt){return M&&M.state?M.state.wrap!==2?f:(M.state.gzhead=rt,u):f},e.deflate=function(M,rt){var Z,U,N,G;if(!M||!M.state||5<rt||rt<0)return M?Y(M,f):f;if(U=M.state,!M.output||!M.input&&M.avail_in!==0||U.status===666&&rt!==h)return Y(M,M.avail_out===0?-5:f);if(U.strm=M,Z=U.last_flush,U.last_flush=rt,U.status===T)if(U.wrap===2)M.adler=0,tt(U,31),tt(U,139),tt(U,8),U.gzhead?(tt(U,(U.gzhead.text?1:0)+(U.gzhead.hcrc?2:0)+(U.gzhead.extra?4:0)+(U.gzhead.name?8:0)+(U.gzhead.comment?16:0)),tt(U,255&U.gzhead.time),tt(U,U.gzhead.time>>8&255),tt(U,U.gzhead.time>>16&255),tt(U,U.gzhead.time>>24&255),tt(U,U.level===9?2:2<=U.strategy||U.level<2?4:0),tt(U,255&U.gzhead.os),U.gzhead.extra&&U.gzhead.extra.length&&(tt(U,255&U.gzhead.extra.length),tt(U,U.gzhead.extra.length>>8&255)),U.gzhead.hcrc&&(M.adler=o(M.adler,U.pending_buf,U.pending,0)),U.gzindex=0,U.status=69):(tt(U,0),tt(U,0),tt(U,0),tt(U,0),tt(U,0),tt(U,U.level===9?2:2<=U.strategy||U.level<2?4:0),tt(U,3),U.status=P);else{var lt=m+(U.w_bits-8<<4)<<8;lt|=(2<=U.strategy||U.level<2?0:U.level<6?1:U.level===6?2:3)<<6,U.strstart!==0&&(lt|=32),lt+=31-lt%31,U.status=P,ht(U,lt),U.strstart!==0&&(ht(U,M.adler>>>16),ht(U,65535&M.adler)),M.adler=1}if(U.status===69)if(U.gzhead.extra){for(N=U.pending;U.gzindex<(65535&U.gzhead.extra.length)&&(U.pending!==U.pending_buf_size||(U.gzhead.hcrc&&U.pending>N&&(M.adler=o(M.adler,U.pending_buf,U.pending-N,N)),B(M),N=U.pending,U.pending!==U.pending_buf_size));)tt(U,255&U.gzhead.extra[U.gzindex]),U.gzindex++;U.gzhead.hcrc&&U.pending>N&&(M.adler=o(M.adler,U.pending_buf,U.pending-N,N)),U.gzindex===U.gzhead.extra.length&&(U.gzindex=0,U.status=73)}else U.status=73;if(U.status===73)if(U.gzhead.name){N=U.pending;do{if(U.pending===U.pending_buf_size&&(U.gzhead.hcrc&&U.pending>N&&(M.adler=o(M.adler,U.pending_buf,U.pending-N,N)),B(M),N=U.pending,U.pending===U.pending_buf_size)){G=1;break}G=U.gzindex<U.gzhead.name.length?255&U.gzhead.name.charCodeAt(U.gzindex++):0,tt(U,G)}while(G!==0);U.gzhead.hcrc&&U.pending>N&&(M.adler=o(M.adler,U.pending_buf,U.pending-N,N)),G===0&&(U.gzindex=0,U.status=91)}else U.status=91;if(U.status===91)if(U.gzhead.comment){N=U.pending;do{if(U.pending===U.pending_buf_size&&(U.gzhead.hcrc&&U.pending>N&&(M.adler=o(M.adler,U.pending_buf,U.pending-N,N)),B(M),N=U.pending,U.pending===U.pending_buf_size)){G=1;break}G=U.gzindex<U.gzhead.comment.length?255&U.gzhead.comment.charCodeAt(U.gzindex++):0,tt(U,G)}while(G!==0);U.gzhead.hcrc&&U.pending>N&&(M.adler=o(M.adler,U.pending_buf,U.pending-N,N)),G===0&&(U.status=103)}else U.status=103;if(U.status===103&&(U.gzhead.hcrc?(U.pending+2>U.pending_buf_size&&B(M),U.pending+2<=U.pending_buf_size&&(tt(U,255&M.adler),tt(U,M.adler>>8&255),M.adler=0,U.status=P)):U.status=P),U.pending!==0){if(B(M),M.avail_out===0)return U.last_flush=-1,u}else if(M.avail_in===0&&V(rt)<=V(Z)&&rt!==h)return Y(M,-5);if(U.status===666&&M.avail_in!==0)return Y(M,-5);if(M.avail_in!==0||U.lookahead!==0||rt!==l&&U.status!==666){var ft=U.strategy===2?(function($,dt){for(var xt;;){if($.lookahead===0&&(Jt($),$.lookahead===0)){if(dt===l)return y;break}if($.match_length=0,xt=r._tr_tally($,0,$.window[$.strstart]),$.lookahead--,$.strstart++,xt&&(H($,!1),$.strm.avail_out===0))return y}return $.insert=0,dt===h?(H($,!0),$.strm.avail_out===0?D:z):$.last_lit&&(H($,!1),$.strm.avail_out===0)?y:k})(U,rt):U.strategy===3?(function($,dt){for(var xt,F,Pt,Gt,L=$.window;;){if($.lookahead<=S){if(Jt($),$.lookahead<=S&&dt===l)return y;if($.lookahead===0)break}if($.match_length=0,$.lookahead>=C&&0<$.strstart&&(F=L[Pt=$.strstart-1])===L[++Pt]&&F===L[++Pt]&&F===L[++Pt]){Gt=$.strstart+S;do;while(F===L[++Pt]&&F===L[++Pt]&&F===L[++Pt]&&F===L[++Pt]&&F===L[++Pt]&&F===L[++Pt]&&F===L[++Pt]&&F===L[++Pt]&&Pt<Gt);$.match_length=S-(Gt-Pt),$.match_length>$.lookahead&&($.match_length=$.lookahead)}if($.match_length>=C?(xt=r._tr_tally($,1,$.match_length-C),$.lookahead-=$.match_length,$.strstart+=$.match_length,$.match_length=0):(xt=r._tr_tally($,0,$.window[$.strstart]),$.lookahead--,$.strstart++),xt&&(H($,!1),$.strm.avail_out===0))return y}return $.insert=0,dt===h?(H($,!0),$.strm.avail_out===0?D:z):$.last_lit&&(H($,!1),$.strm.avail_out===0)?y:k})(U,rt):i[U.level].func(U,rt);if(ft!==D&&ft!==z||(U.status=666),ft===y||ft===D)return M.avail_out===0&&(U.last_flush=-1),u;if(ft===k&&(rt===1?r._tr_align(U):rt!==5&&(r._tr_stored_block(U,0,0,!1),rt===3&&(et(U.head),U.lookahead===0&&(U.strstart=0,U.block_start=0,U.insert=0))),B(M),M.avail_out===0))return U.last_flush=-1,u}return rt!==h?u:U.wrap<=0?1:(U.wrap===2?(tt(U,255&M.adler),tt(U,M.adler>>8&255),tt(U,M.adler>>16&255),tt(U,M.adler>>24&255),tt(U,255&M.total_in),tt(U,M.total_in>>8&255),tt(U,M.total_in>>16&255),tt(U,M.total_in>>24&255)):(ht(U,M.adler>>>16),ht(U,65535&M.adler)),B(M),0<U.wrap&&(U.wrap=-U.wrap),U.pending!==0?u:1)},e.deflateEnd=function(M){var rt;return M&&M.state?(rt=M.state.status)!==T&&rt!==69&&rt!==73&&rt!==91&&rt!==103&&rt!==P&&rt!==666?Y(M,f):(M.state=null,rt===P?Y(M,-3):u):f},e.deflateSetDictionary=function(M,rt){var Z,U,N,G,lt,ft,$,dt,xt=rt.length;if(!M||!M.state||(G=(Z=M.state).wrap)===2||G===1&&Z.status!==T||Z.lookahead)return f;for(G===1&&(M.adler=a(M.adler,rt,xt,0)),Z.wrap=0,xt>=Z.w_size&&(G===0&&(et(Z.head),Z.strstart=0,Z.block_start=0,Z.insert=0),dt=new s.Buf8(Z.w_size),s.arraySet(dt,rt,xt-Z.w_size,Z.w_size,0),rt=dt,xt=Z.w_size),lt=M.avail_in,ft=M.next_in,$=M.input,M.avail_in=xt,M.next_in=0,M.input=rt,Jt(Z);Z.lookahead>=C;){for(U=Z.strstart,N=Z.lookahead-(C-1);Z.ins_h=(Z.ins_h<<Z.hash_shift^Z.window[U+C-1])&Z.hash_mask,Z.prev[U&Z.w_mask]=Z.head[Z.ins_h],Z.head[Z.ins_h]=U,U++,--N;);Z.strstart=U,Z.lookahead=C-1,Jt(Z)}return Z.strstart+=Z.lookahead,Z.block_start=Z.strstart,Z.insert=Z.lookahead,Z.lookahead=0,Z.match_length=Z.prev_length=C-1,Z.match_available=0,M.next_in=ft,M.input=$,M.avail_in=lt,Z.wrap=G,u},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(n,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(n,t,e){"use strict";t.exports=function(i,s){var r,a,o,c,l,h,u,f,d,p,_,m,g,x,b,v,w,A,C,S,I,T,P,y,k;r=i.state,a=i.next_in,y=i.input,o=a+(i.avail_in-5),c=i.next_out,k=i.output,l=c-(s-i.avail_out),h=c+(i.avail_out-257),u=r.dmax,f=r.wsize,d=r.whave,p=r.wnext,_=r.window,m=r.hold,g=r.bits,x=r.lencode,b=r.distcode,v=(1<<r.lenbits)-1,w=(1<<r.distbits)-1;t:do{g<15&&(m+=y[a++]<<g,g+=8,m+=y[a++]<<g,g+=8),A=x[m&v];e:for(;;){if(m>>>=C=A>>>24,g-=C,(C=A>>>16&255)===0)k[c++]=65535&A;else{if(!(16&C)){if((64&C)==0){A=x[(65535&A)+(m&(1<<C)-1)];continue e}if(32&C){r.mode=12;break t}i.msg="invalid literal/length code",r.mode=30;break t}S=65535&A,(C&=15)&&(g<C&&(m+=y[a++]<<g,g+=8),S+=m&(1<<C)-1,m>>>=C,g-=C),g<15&&(m+=y[a++]<<g,g+=8,m+=y[a++]<<g,g+=8),A=b[m&w];i:for(;;){if(m>>>=C=A>>>24,g-=C,!(16&(C=A>>>16&255))){if((64&C)==0){A=b[(65535&A)+(m&(1<<C)-1)];continue i}i.msg="invalid distance code",r.mode=30;break t}if(I=65535&A,g<(C&=15)&&(m+=y[a++]<<g,(g+=8)<C&&(m+=y[a++]<<g,g+=8)),u<(I+=m&(1<<C)-1)){i.msg="invalid distance too far back",r.mode=30;break t}if(m>>>=C,g-=C,(C=c-l)<I){if(d<(C=I-C)&&r.sane){i.msg="invalid distance too far back",r.mode=30;break t}if(P=_,(T=0)===p){if(T+=f-C,C<S){for(S-=C;k[c++]=_[T++],--C;);T=c-I,P=k}}else if(p<C){if(T+=f+p-C,(C-=p)<S){for(S-=C;k[c++]=_[T++],--C;);if(T=0,p<S){for(S-=C=p;k[c++]=_[T++],--C;);T=c-I,P=k}}}else if(T+=p-C,C<S){for(S-=C;k[c++]=_[T++],--C;);T=c-I,P=k}for(;2<S;)k[c++]=P[T++],k[c++]=P[T++],k[c++]=P[T++],S-=3;S&&(k[c++]=P[T++],1<S&&(k[c++]=P[T++]))}else{for(T=c-I;k[c++]=k[T++],k[c++]=k[T++],k[c++]=k[T++],2<(S-=3););S&&(k[c++]=k[T++],1<S&&(k[c++]=k[T++]))}break}}break}}while(a<o&&c<h);a-=S=g>>3,m&=(1<<(g-=S<<3))-1,i.next_in=a,i.next_out=c,i.avail_in=a<o?o-a+5:5-(a-o),i.avail_out=c<h?h-c+257:257-(c-h),r.hold=m,r.bits=g}},{}],49:[function(n,t,e){"use strict";var i=n("../utils/common"),s=n("./adler32"),r=n("./crc32"),a=n("./inffast"),o=n("./inftrees"),c=1,l=2,h=0,u=-2,f=1,d=852,p=592;function _(T){return(T>>>24&255)+(T>>>8&65280)+((65280&T)<<8)+((255&T)<<24)}function m(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new i.Buf16(320),this.work=new i.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function g(T){var P;return T&&T.state?(P=T.state,T.total_in=T.total_out=P.total=0,T.msg="",P.wrap&&(T.adler=1&P.wrap),P.mode=f,P.last=0,P.havedict=0,P.dmax=32768,P.head=null,P.hold=0,P.bits=0,P.lencode=P.lendyn=new i.Buf32(d),P.distcode=P.distdyn=new i.Buf32(p),P.sane=1,P.back=-1,h):u}function x(T){var P;return T&&T.state?((P=T.state).wsize=0,P.whave=0,P.wnext=0,g(T)):u}function b(T,P){var y,k;return T&&T.state?(k=T.state,P<0?(y=0,P=-P):(y=1+(P>>4),P<48&&(P&=15)),P&&(P<8||15<P)?u:(k.window!==null&&k.wbits!==P&&(k.window=null),k.wrap=y,k.wbits=P,x(T))):u}function v(T,P){var y,k;return T?(k=new m,(T.state=k).window=null,(y=b(T,P))!==h&&(T.state=null),y):u}var w,A,C=!0;function S(T){if(C){var P;for(w=new i.Buf32(512),A=new i.Buf32(32),P=0;P<144;)T.lens[P++]=8;for(;P<256;)T.lens[P++]=9;for(;P<280;)T.lens[P++]=7;for(;P<288;)T.lens[P++]=8;for(o(c,T.lens,0,288,w,0,T.work,{bits:9}),P=0;P<32;)T.lens[P++]=5;o(l,T.lens,0,32,A,0,T.work,{bits:5}),C=!1}T.lencode=w,T.lenbits=9,T.distcode=A,T.distbits=5}function I(T,P,y,k){var D,z=T.state;return z.window===null&&(z.wsize=1<<z.wbits,z.wnext=0,z.whave=0,z.window=new i.Buf8(z.wsize)),k>=z.wsize?(i.arraySet(z.window,P,y-z.wsize,z.wsize,0),z.wnext=0,z.whave=z.wsize):(k<(D=z.wsize-z.wnext)&&(D=k),i.arraySet(z.window,P,y-k,D,z.wnext),(k-=D)?(i.arraySet(z.window,P,y-k,k,0),z.wnext=k,z.whave=z.wsize):(z.wnext+=D,z.wnext===z.wsize&&(z.wnext=0),z.whave<z.wsize&&(z.whave+=D))),0}e.inflateReset=x,e.inflateReset2=b,e.inflateResetKeep=g,e.inflateInit=function(T){return v(T,15)},e.inflateInit2=v,e.inflate=function(T,P){var y,k,D,z,Y,V,et,B,H,tt,ht,st,Jt,Zt,Dt,Q,at,vt,Xt,Mt,M,rt,Z,U,N=0,G=new i.Buf8(4),lt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!T||!T.state||!T.output||!T.input&&T.avail_in!==0)return u;(y=T.state).mode===12&&(y.mode=13),Y=T.next_out,D=T.output,et=T.avail_out,z=T.next_in,k=T.input,V=T.avail_in,B=y.hold,H=y.bits,tt=V,ht=et,rt=h;t:for(;;)switch(y.mode){case f:if(y.wrap===0){y.mode=13;break}for(;H<16;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if(2&y.wrap&&B===35615){G[y.check=0]=255&B,G[1]=B>>>8&255,y.check=r(y.check,G,2,0),H=B=0,y.mode=2;break}if(y.flags=0,y.head&&(y.head.done=!1),!(1&y.wrap)||(((255&B)<<8)+(B>>8))%31){T.msg="incorrect header check",y.mode=30;break}if((15&B)!=8){T.msg="unknown compression method",y.mode=30;break}if(H-=4,M=8+(15&(B>>>=4)),y.wbits===0)y.wbits=M;else if(M>y.wbits){T.msg="invalid window size",y.mode=30;break}y.dmax=1<<M,T.adler=y.check=1,y.mode=512&B?10:12,H=B=0;break;case 2:for(;H<16;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if(y.flags=B,(255&y.flags)!=8){T.msg="unknown compression method",y.mode=30;break}if(57344&y.flags){T.msg="unknown header flags set",y.mode=30;break}y.head&&(y.head.text=B>>8&1),512&y.flags&&(G[0]=255&B,G[1]=B>>>8&255,y.check=r(y.check,G,2,0)),H=B=0,y.mode=3;case 3:for(;H<32;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}y.head&&(y.head.time=B),512&y.flags&&(G[0]=255&B,G[1]=B>>>8&255,G[2]=B>>>16&255,G[3]=B>>>24&255,y.check=r(y.check,G,4,0)),H=B=0,y.mode=4;case 4:for(;H<16;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}y.head&&(y.head.xflags=255&B,y.head.os=B>>8),512&y.flags&&(G[0]=255&B,G[1]=B>>>8&255,y.check=r(y.check,G,2,0)),H=B=0,y.mode=5;case 5:if(1024&y.flags){for(;H<16;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}y.length=B,y.head&&(y.head.extra_len=B),512&y.flags&&(G[0]=255&B,G[1]=B>>>8&255,y.check=r(y.check,G,2,0)),H=B=0}else y.head&&(y.head.extra=null);y.mode=6;case 6:if(1024&y.flags&&(V<(st=y.length)&&(st=V),st&&(y.head&&(M=y.head.extra_len-y.length,y.head.extra||(y.head.extra=new Array(y.head.extra_len)),i.arraySet(y.head.extra,k,z,st,M)),512&y.flags&&(y.check=r(y.check,k,st,z)),V-=st,z+=st,y.length-=st),y.length))break t;y.length=0,y.mode=7;case 7:if(2048&y.flags){if(V===0)break t;for(st=0;M=k[z+st++],y.head&&M&&y.length<65536&&(y.head.name+=String.fromCharCode(M)),M&&st<V;);if(512&y.flags&&(y.check=r(y.check,k,st,z)),V-=st,z+=st,M)break t}else y.head&&(y.head.name=null);y.length=0,y.mode=8;case 8:if(4096&y.flags){if(V===0)break t;for(st=0;M=k[z+st++],y.head&&M&&y.length<65536&&(y.head.comment+=String.fromCharCode(M)),M&&st<V;);if(512&y.flags&&(y.check=r(y.check,k,st,z)),V-=st,z+=st,M)break t}else y.head&&(y.head.comment=null);y.mode=9;case 9:if(512&y.flags){for(;H<16;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if(B!==(65535&y.check)){T.msg="header crc mismatch",y.mode=30;break}H=B=0}y.head&&(y.head.hcrc=y.flags>>9&1,y.head.done=!0),T.adler=y.check=0,y.mode=12;break;case 10:for(;H<32;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}T.adler=y.check=_(B),H=B=0,y.mode=11;case 11:if(y.havedict===0)return T.next_out=Y,T.avail_out=et,T.next_in=z,T.avail_in=V,y.hold=B,y.bits=H,2;T.adler=y.check=1,y.mode=12;case 12:if(P===5||P===6)break t;case 13:if(y.last){B>>>=7&H,H-=7&H,y.mode=27;break}for(;H<3;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}switch(y.last=1&B,H-=1,3&(B>>>=1)){case 0:y.mode=14;break;case 1:if(S(y),y.mode=20,P!==6)break;B>>>=2,H-=2;break t;case 2:y.mode=17;break;case 3:T.msg="invalid block type",y.mode=30}B>>>=2,H-=2;break;case 14:for(B>>>=7&H,H-=7&H;H<32;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if((65535&B)!=(B>>>16^65535)){T.msg="invalid stored block lengths",y.mode=30;break}if(y.length=65535&B,H=B=0,y.mode=15,P===6)break t;case 15:y.mode=16;case 16:if(st=y.length){if(V<st&&(st=V),et<st&&(st=et),st===0)break t;i.arraySet(D,k,z,st,Y),V-=st,z+=st,et-=st,Y+=st,y.length-=st;break}y.mode=12;break;case 17:for(;H<14;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if(y.nlen=257+(31&B),B>>>=5,H-=5,y.ndist=1+(31&B),B>>>=5,H-=5,y.ncode=4+(15&B),B>>>=4,H-=4,286<y.nlen||30<y.ndist){T.msg="too many length or distance symbols",y.mode=30;break}y.have=0,y.mode=18;case 18:for(;y.have<y.ncode;){for(;H<3;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}y.lens[lt[y.have++]]=7&B,B>>>=3,H-=3}for(;y.have<19;)y.lens[lt[y.have++]]=0;if(y.lencode=y.lendyn,y.lenbits=7,Z={bits:y.lenbits},rt=o(0,y.lens,0,19,y.lencode,0,y.work,Z),y.lenbits=Z.bits,rt){T.msg="invalid code lengths set",y.mode=30;break}y.have=0,y.mode=19;case 19:for(;y.have<y.nlen+y.ndist;){for(;Q=(N=y.lencode[B&(1<<y.lenbits)-1])>>>16&255,at=65535&N,!((Dt=N>>>24)<=H);){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if(at<16)B>>>=Dt,H-=Dt,y.lens[y.have++]=at;else{if(at===16){for(U=Dt+2;H<U;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if(B>>>=Dt,H-=Dt,y.have===0){T.msg="invalid bit length repeat",y.mode=30;break}M=y.lens[y.have-1],st=3+(3&B),B>>>=2,H-=2}else if(at===17){for(U=Dt+3;H<U;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}H-=Dt,M=0,st=3+(7&(B>>>=Dt)),B>>>=3,H-=3}else{for(U=Dt+7;H<U;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}H-=Dt,M=0,st=11+(127&(B>>>=Dt)),B>>>=7,H-=7}if(y.have+st>y.nlen+y.ndist){T.msg="invalid bit length repeat",y.mode=30;break}for(;st--;)y.lens[y.have++]=M}}if(y.mode===30)break;if(y.lens[256]===0){T.msg="invalid code -- missing end-of-block",y.mode=30;break}if(y.lenbits=9,Z={bits:y.lenbits},rt=o(c,y.lens,0,y.nlen,y.lencode,0,y.work,Z),y.lenbits=Z.bits,rt){T.msg="invalid literal/lengths set",y.mode=30;break}if(y.distbits=6,y.distcode=y.distdyn,Z={bits:y.distbits},rt=o(l,y.lens,y.nlen,y.ndist,y.distcode,0,y.work,Z),y.distbits=Z.bits,rt){T.msg="invalid distances set",y.mode=30;break}if(y.mode=20,P===6)break t;case 20:y.mode=21;case 21:if(6<=V&&258<=et){T.next_out=Y,T.avail_out=et,T.next_in=z,T.avail_in=V,y.hold=B,y.bits=H,a(T,ht),Y=T.next_out,D=T.output,et=T.avail_out,z=T.next_in,k=T.input,V=T.avail_in,B=y.hold,H=y.bits,y.mode===12&&(y.back=-1);break}for(y.back=0;Q=(N=y.lencode[B&(1<<y.lenbits)-1])>>>16&255,at=65535&N,!((Dt=N>>>24)<=H);){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if(Q&&(240&Q)==0){for(vt=Dt,Xt=Q,Mt=at;Q=(N=y.lencode[Mt+((B&(1<<vt+Xt)-1)>>vt)])>>>16&255,at=65535&N,!(vt+(Dt=N>>>24)<=H);){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}B>>>=vt,H-=vt,y.back+=vt}if(B>>>=Dt,H-=Dt,y.back+=Dt,y.length=at,Q===0){y.mode=26;break}if(32&Q){y.back=-1,y.mode=12;break}if(64&Q){T.msg="invalid literal/length code",y.mode=30;break}y.extra=15&Q,y.mode=22;case 22:if(y.extra){for(U=y.extra;H<U;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}y.length+=B&(1<<y.extra)-1,B>>>=y.extra,H-=y.extra,y.back+=y.extra}y.was=y.length,y.mode=23;case 23:for(;Q=(N=y.distcode[B&(1<<y.distbits)-1])>>>16&255,at=65535&N,!((Dt=N>>>24)<=H);){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if((240&Q)==0){for(vt=Dt,Xt=Q,Mt=at;Q=(N=y.distcode[Mt+((B&(1<<vt+Xt)-1)>>vt)])>>>16&255,at=65535&N,!(vt+(Dt=N>>>24)<=H);){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}B>>>=vt,H-=vt,y.back+=vt}if(B>>>=Dt,H-=Dt,y.back+=Dt,64&Q){T.msg="invalid distance code",y.mode=30;break}y.offset=at,y.extra=15&Q,y.mode=24;case 24:if(y.extra){for(U=y.extra;H<U;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}y.offset+=B&(1<<y.extra)-1,B>>>=y.extra,H-=y.extra,y.back+=y.extra}if(y.offset>y.dmax){T.msg="invalid distance too far back",y.mode=30;break}y.mode=25;case 25:if(et===0)break t;if(st=ht-et,y.offset>st){if((st=y.offset-st)>y.whave&&y.sane){T.msg="invalid distance too far back",y.mode=30;break}Jt=st>y.wnext?(st-=y.wnext,y.wsize-st):y.wnext-st,st>y.length&&(st=y.length),Zt=y.window}else Zt=D,Jt=Y-y.offset,st=y.length;for(et<st&&(st=et),et-=st,y.length-=st;D[Y++]=Zt[Jt++],--st;);y.length===0&&(y.mode=21);break;case 26:if(et===0)break t;D[Y++]=y.length,et--,y.mode=21;break;case 27:if(y.wrap){for(;H<32;){if(V===0)break t;V--,B|=k[z++]<<H,H+=8}if(ht-=et,T.total_out+=ht,y.total+=ht,ht&&(T.adler=y.check=y.flags?r(y.check,D,ht,Y-ht):s(y.check,D,ht,Y-ht)),ht=et,(y.flags?B:_(B))!==y.check){T.msg="incorrect data check",y.mode=30;break}H=B=0}y.mode=28;case 28:if(y.wrap&&y.flags){for(;H<32;){if(V===0)break t;V--,B+=k[z++]<<H,H+=8}if(B!==(4294967295&y.total)){T.msg="incorrect length check",y.mode=30;break}H=B=0}y.mode=29;case 29:rt=1;break t;case 30:rt=-3;break t;case 31:return-4;default:return u}return T.next_out=Y,T.avail_out=et,T.next_in=z,T.avail_in=V,y.hold=B,y.bits=H,(y.wsize||ht!==T.avail_out&&y.mode<30&&(y.mode<27||P!==4))&&I(T,T.output,T.next_out,ht-T.avail_out)?(y.mode=31,-4):(tt-=T.avail_in,ht-=T.avail_out,T.total_in+=tt,T.total_out+=ht,y.total+=ht,y.wrap&&ht&&(T.adler=y.check=y.flags?r(y.check,D,ht,T.next_out-ht):s(y.check,D,ht,T.next_out-ht)),T.data_type=y.bits+(y.last?64:0)+(y.mode===12?128:0)+(y.mode===20||y.mode===15?256:0),(tt==0&&ht===0||P===4)&&rt===h&&(rt=-5),rt)},e.inflateEnd=function(T){if(!T||!T.state)return u;var P=T.state;return P.window&&(P.window=null),T.state=null,h},e.inflateGetHeader=function(T,P){var y;return T&&T.state?(2&(y=T.state).wrap)==0?u:((y.head=P).done=!1,h):u},e.inflateSetDictionary=function(T,P){var y,k=P.length;return T&&T.state?(y=T.state).wrap!==0&&y.mode!==11?u:y.mode===11&&s(1,P,k,0)!==y.check?-3:I(T,P,k,k)?(y.mode=31,-4):(y.havedict=1,h):u},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(n,t,e){"use strict";var i=n("../utils/common"),s=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],r=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],a=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],o=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(c,l,h,u,f,d,p,_){var m,g,x,b,v,w,A,C,S,I=_.bits,T=0,P=0,y=0,k=0,D=0,z=0,Y=0,V=0,et=0,B=0,H=null,tt=0,ht=new i.Buf16(16),st=new i.Buf16(16),Jt=null,Zt=0;for(T=0;T<=15;T++)ht[T]=0;for(P=0;P<u;P++)ht[l[h+P]]++;for(D=I,k=15;1<=k&&ht[k]===0;k--);if(k<D&&(D=k),k===0)return f[d++]=20971520,f[d++]=20971520,_.bits=1,0;for(y=1;y<k&&ht[y]===0;y++);for(D<y&&(D=y),T=V=1;T<=15;T++)if(V<<=1,(V-=ht[T])<0)return-1;if(0<V&&(c===0||k!==1))return-1;for(st[1]=0,T=1;T<15;T++)st[T+1]=st[T]+ht[T];for(P=0;P<u;P++)l[h+P]!==0&&(p[st[l[h+P]]++]=P);if(w=c===0?(H=Jt=p,19):c===1?(H=s,tt-=257,Jt=r,Zt-=257,256):(H=a,Jt=o,-1),T=y,v=d,Y=P=B=0,x=-1,b=(et=1<<(z=D))-1,c===1&&852<et||c===2&&592<et)return 1;for(;;){for(A=T-Y,S=p[P]<w?(C=0,p[P]):p[P]>w?(C=Jt[Zt+p[P]],H[tt+p[P]]):(C=96,0),m=1<<T-Y,y=g=1<<z;f[v+(B>>Y)+(g-=m)]=A<<24|C<<16|S|0,g!==0;);for(m=1<<T-1;B&m;)m>>=1;if(m!==0?(B&=m-1,B+=m):B=0,P++,--ht[T]==0){if(T===k)break;T=l[h+p[P]]}if(D<T&&(B&b)!==x){for(Y===0&&(Y=D),v+=y,V=1<<(z=T-Y);z+Y<k&&!((V-=ht[z+Y])<=0);)z++,V<<=1;if(et+=1<<z,c===1&&852<et||c===2&&592<et)return 1;f[x=B&b]=D<<24|z<<16|v-d|0}}return B!==0&&(f[v+B]=T-Y<<24|64<<16|0),_.bits=D,0}},{"../utils/common":41}],51:[function(n,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(n,t,e){"use strict";var i=n("../utils/common"),s=0,r=1;function a(N){for(var G=N.length;0<=--G;)N[G]=0}var o=0,c=29,l=256,h=l+1+c,u=30,f=19,d=2*h+1,p=15,_=16,m=7,g=256,x=16,b=17,v=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],A=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],C=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],I=new Array(2*(h+2));a(I);var T=new Array(2*u);a(T);var P=new Array(512);a(P);var y=new Array(256);a(y);var k=new Array(c);a(k);var D,z,Y,V=new Array(u);function et(N,G,lt,ft,$){this.static_tree=N,this.extra_bits=G,this.extra_base=lt,this.elems=ft,this.max_length=$,this.has_stree=N&&N.length}function B(N,G){this.dyn_tree=N,this.max_code=0,this.stat_desc=G}function H(N){return N<256?P[N]:P[256+(N>>>7)]}function tt(N,G){N.pending_buf[N.pending++]=255&G,N.pending_buf[N.pending++]=G>>>8&255}function ht(N,G,lt){N.bi_valid>_-lt?(N.bi_buf|=G<<N.bi_valid&65535,tt(N,N.bi_buf),N.bi_buf=G>>_-N.bi_valid,N.bi_valid+=lt-_):(N.bi_buf|=G<<N.bi_valid&65535,N.bi_valid+=lt)}function st(N,G,lt){ht(N,lt[2*G],lt[2*G+1])}function Jt(N,G){for(var lt=0;lt|=1&N,N>>>=1,lt<<=1,0<--G;);return lt>>>1}function Zt(N,G,lt){var ft,$,dt=new Array(p+1),xt=0;for(ft=1;ft<=p;ft++)dt[ft]=xt=xt+lt[ft-1]<<1;for($=0;$<=G;$++){var F=N[2*$+1];F!==0&&(N[2*$]=Jt(dt[F]++,F))}}function Dt(N){var G;for(G=0;G<h;G++)N.dyn_ltree[2*G]=0;for(G=0;G<u;G++)N.dyn_dtree[2*G]=0;for(G=0;G<f;G++)N.bl_tree[2*G]=0;N.dyn_ltree[2*g]=1,N.opt_len=N.static_len=0,N.last_lit=N.matches=0}function Q(N){8<N.bi_valid?tt(N,N.bi_buf):0<N.bi_valid&&(N.pending_buf[N.pending++]=N.bi_buf),N.bi_buf=0,N.bi_valid=0}function at(N,G,lt,ft){var $=2*G,dt=2*lt;return N[$]<N[dt]||N[$]===N[dt]&&ft[G]<=ft[lt]}function vt(N,G,lt){for(var ft=N.heap[lt],$=lt<<1;$<=N.heap_len&&($<N.heap_len&&at(G,N.heap[$+1],N.heap[$],N.depth)&&$++,!at(G,ft,N.heap[$],N.depth));)N.heap[lt]=N.heap[$],lt=$,$<<=1;N.heap[lt]=ft}function Xt(N,G,lt){var ft,$,dt,xt,F=0;if(N.last_lit!==0)for(;ft=N.pending_buf[N.d_buf+2*F]<<8|N.pending_buf[N.d_buf+2*F+1],$=N.pending_buf[N.l_buf+F],F++,ft===0?st(N,$,G):(st(N,(dt=y[$])+l+1,G),(xt=w[dt])!==0&&ht(N,$-=k[dt],xt),st(N,dt=H(--ft),lt),(xt=A[dt])!==0&&ht(N,ft-=V[dt],xt)),F<N.last_lit;);st(N,g,G)}function Mt(N,G){var lt,ft,$,dt=G.dyn_tree,xt=G.stat_desc.static_tree,F=G.stat_desc.has_stree,Pt=G.stat_desc.elems,Gt=-1;for(N.heap_len=0,N.heap_max=d,lt=0;lt<Pt;lt++)dt[2*lt]!==0?(N.heap[++N.heap_len]=Gt=lt,N.depth[lt]=0):dt[2*lt+1]=0;for(;N.heap_len<2;)dt[2*($=N.heap[++N.heap_len]=Gt<2?++Gt:0)]=1,N.depth[$]=0,N.opt_len--,F&&(N.static_len-=xt[2*$+1]);for(G.max_code=Gt,lt=N.heap_len>>1;1<=lt;lt--)vt(N,dt,lt);for($=Pt;lt=N.heap[1],N.heap[1]=N.heap[N.heap_len--],vt(N,dt,1),ft=N.heap[1],N.heap[--N.heap_max]=lt,N.heap[--N.heap_max]=ft,dt[2*$]=dt[2*lt]+dt[2*ft],N.depth[$]=(N.depth[lt]>=N.depth[ft]?N.depth[lt]:N.depth[ft])+1,dt[2*lt+1]=dt[2*ft+1]=$,N.heap[1]=$++,vt(N,dt,1),2<=N.heap_len;);N.heap[--N.heap_max]=N.heap[1],(function(L,E){var q,J,nt,pt,yt,ot,ct=E.dyn_tree,bt=E.max_code,kt=E.stat_desc.static_tree,wt=E.stat_desc.has_stree,St=E.stat_desc.extra_bits,Ot=E.stat_desc.extra_base,Ht=E.stat_desc.max_length,Kt=0;for(pt=0;pt<=p;pt++)L.bl_count[pt]=0;for(ct[2*L.heap[L.heap_max]+1]=0,q=L.heap_max+1;q<d;q++)Ht<(pt=ct[2*ct[2*(J=L.heap[q])+1]+1]+1)&&(pt=Ht,Kt++),ct[2*J+1]=pt,bt<J||(L.bl_count[pt]++,yt=0,Ot<=J&&(yt=St[J-Ot]),ot=ct[2*J],L.opt_len+=ot*(pt+yt),wt&&(L.static_len+=ot*(kt[2*J+1]+yt)));if(Kt!==0){do{for(pt=Ht-1;L.bl_count[pt]===0;)pt--;L.bl_count[pt]--,L.bl_count[pt+1]+=2,L.bl_count[Ht]--,Kt-=2}while(0<Kt);for(pt=Ht;pt!==0;pt--)for(J=L.bl_count[pt];J!==0;)bt<(nt=L.heap[--q])||(ct[2*nt+1]!==pt&&(L.opt_len+=(pt-ct[2*nt+1])*ct[2*nt],ct[2*nt+1]=pt),J--)}})(N,G),Zt(dt,Gt,N.bl_count)}function M(N,G,lt){var ft,$,dt=-1,xt=G[1],F=0,Pt=7,Gt=4;for(xt===0&&(Pt=138,Gt=3),G[2*(lt+1)+1]=65535,ft=0;ft<=lt;ft++)$=xt,xt=G[2*(ft+1)+1],++F<Pt&&$===xt||(F<Gt?N.bl_tree[2*$]+=F:$!==0?($!==dt&&N.bl_tree[2*$]++,N.bl_tree[2*x]++):F<=10?N.bl_tree[2*b]++:N.bl_tree[2*v]++,dt=$,Gt=(F=0)===xt?(Pt=138,3):$===xt?(Pt=6,3):(Pt=7,4))}function rt(N,G,lt){var ft,$,dt=-1,xt=G[1],F=0,Pt=7,Gt=4;for(xt===0&&(Pt=138,Gt=3),ft=0;ft<=lt;ft++)if($=xt,xt=G[2*(ft+1)+1],!(++F<Pt&&$===xt)){if(F<Gt)for(;st(N,$,N.bl_tree),--F!=0;);else $!==0?($!==dt&&(st(N,$,N.bl_tree),F--),st(N,x,N.bl_tree),ht(N,F-3,2)):F<=10?(st(N,b,N.bl_tree),ht(N,F-3,3)):(st(N,v,N.bl_tree),ht(N,F-11,7));dt=$,Gt=(F=0)===xt?(Pt=138,3):$===xt?(Pt=6,3):(Pt=7,4)}}a(V);var Z=!1;function U(N,G,lt,ft){ht(N,(o<<1)+(ft?1:0),3),(function($,dt,xt,F){Q($),F&&(tt($,xt),tt($,~xt)),i.arraySet($.pending_buf,$.window,dt,xt,$.pending),$.pending+=xt})(N,G,lt,!0)}e._tr_init=function(N){Z||((function(){var G,lt,ft,$,dt,xt=new Array(p+1);for($=ft=0;$<c-1;$++)for(k[$]=ft,G=0;G<1<<w[$];G++)y[ft++]=$;for(y[ft-1]=$,$=dt=0;$<16;$++)for(V[$]=dt,G=0;G<1<<A[$];G++)P[dt++]=$;for(dt>>=7;$<u;$++)for(V[$]=dt<<7,G=0;G<1<<A[$]-7;G++)P[256+dt++]=$;for(lt=0;lt<=p;lt++)xt[lt]=0;for(G=0;G<=143;)I[2*G+1]=8,G++,xt[8]++;for(;G<=255;)I[2*G+1]=9,G++,xt[9]++;for(;G<=279;)I[2*G+1]=7,G++,xt[7]++;for(;G<=287;)I[2*G+1]=8,G++,xt[8]++;for(Zt(I,h+1,xt),G=0;G<u;G++)T[2*G+1]=5,T[2*G]=Jt(G,5);D=new et(I,w,l+1,h,p),z=new et(T,A,0,u,p),Y=new et(new Array(0),C,0,f,m)})(),Z=!0),N.l_desc=new B(N.dyn_ltree,D),N.d_desc=new B(N.dyn_dtree,z),N.bl_desc=new B(N.bl_tree,Y),N.bi_buf=0,N.bi_valid=0,Dt(N)},e._tr_stored_block=U,e._tr_flush_block=function(N,G,lt,ft){var $,dt,xt=0;0<N.level?(N.strm.data_type===2&&(N.strm.data_type=(function(F){var Pt,Gt=4093624447;for(Pt=0;Pt<=31;Pt++,Gt>>>=1)if(1&Gt&&F.dyn_ltree[2*Pt]!==0)return s;if(F.dyn_ltree[18]!==0||F.dyn_ltree[20]!==0||F.dyn_ltree[26]!==0)return r;for(Pt=32;Pt<l;Pt++)if(F.dyn_ltree[2*Pt]!==0)return r;return s})(N)),Mt(N,N.l_desc),Mt(N,N.d_desc),xt=(function(F){var Pt;for(M(F,F.dyn_ltree,F.l_desc.max_code),M(F,F.dyn_dtree,F.d_desc.max_code),Mt(F,F.bl_desc),Pt=f-1;3<=Pt&&F.bl_tree[2*S[Pt]+1]===0;Pt--);return F.opt_len+=3*(Pt+1)+5+5+4,Pt})(N),$=N.opt_len+3+7>>>3,(dt=N.static_len+3+7>>>3)<=$&&($=dt)):$=dt=lt+5,lt+4<=$&&G!==-1?U(N,G,lt,ft):N.strategy===4||dt===$?(ht(N,2+(ft?1:0),3),Xt(N,I,T)):(ht(N,4+(ft?1:0),3),(function(F,Pt,Gt,L){var E;for(ht(F,Pt-257,5),ht(F,Gt-1,5),ht(F,L-4,4),E=0;E<L;E++)ht(F,F.bl_tree[2*S[E]+1],3);rt(F,F.dyn_ltree,Pt-1),rt(F,F.dyn_dtree,Gt-1)})(N,N.l_desc.max_code+1,N.d_desc.max_code+1,xt+1),Xt(N,N.dyn_ltree,N.dyn_dtree)),Dt(N),ft&&Q(N)},e._tr_tally=function(N,G,lt){return N.pending_buf[N.d_buf+2*N.last_lit]=G>>>8&255,N.pending_buf[N.d_buf+2*N.last_lit+1]=255&G,N.pending_buf[N.l_buf+N.last_lit]=255&lt,N.last_lit++,G===0?N.dyn_ltree[2*lt]++:(N.matches++,G--,N.dyn_ltree[2*(y[lt]+l+1)]++,N.dyn_dtree[2*H(G)]++),N.last_lit===N.lit_bufsize-1},e._tr_align=function(N){ht(N,2,3),st(N,g,I),(function(G){G.bi_valid===16?(tt(G,G.bi_buf),G.bi_buf=0,G.bi_valid=0):8<=G.bi_valid&&(G.pending_buf[G.pending++]=255&G.bi_buf,G.bi_buf>>=8,G.bi_valid-=8)})(N)}},{"../utils/common":41}],53:[function(n,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(n,t,e){(function(i){(function(s,r){"use strict";if(!s.setImmediate){var a,o,c,l,h=1,u={},f=!1,d=s.document,p=Object.getPrototypeOf&&Object.getPrototypeOf(s);p=p&&p.setTimeout?p:s,a={}.toString.call(s.process)==="[object process]"?function(x){process.nextTick(function(){m(x)})}:(function(){if(s.postMessage&&!s.importScripts){var x=!0,b=s.onmessage;return s.onmessage=function(){x=!1},s.postMessage("","*"),s.onmessage=b,x}})()?(l="setImmediate$"+Math.random()+"$",s.addEventListener?s.addEventListener("message",g,!1):s.attachEvent("onmessage",g),function(x){s.postMessage(l+x,"*")}):s.MessageChannel?((c=new MessageChannel).port1.onmessage=function(x){m(x.data)},function(x){c.port2.postMessage(x)}):d&&"onreadystatechange"in d.createElement("script")?(o=d.documentElement,function(x){var b=d.createElement("script");b.onreadystatechange=function(){m(x),b.onreadystatechange=null,o.removeChild(b),b=null},o.appendChild(b)}):function(x){setTimeout(m,0,x)},p.setImmediate=function(x){typeof x!="function"&&(x=new Function(""+x));for(var b=new Array(arguments.length-1),v=0;v<b.length;v++)b[v]=arguments[v+1];var w={callback:x,args:b};return u[h]=w,a(h),h++},p.clearImmediate=_}function _(x){delete u[x]}function m(x){if(f)setTimeout(m,0,x);else{var b=u[x];if(b){f=!0;try{(function(v){var w=v.callback,A=v.args;switch(A.length){case 0:w();break;case 1:w(A[0]);break;case 2:w(A[0],A[1]);break;case 3:w(A[0],A[1],A[2]);break;default:w.apply(r,A)}})(b)}finally{_(x),f=!1}}}}function g(x){x.source===s&&typeof x.data=="string"&&x.data.indexOf(l)===0&&m(+x.data.slice(l.length))}})(typeof self>"u"?i===void 0?this:i:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});var mf=0,nh=1,gf=2;var na=1,_f=2,zs=3,Cn=0,Oe=1,De=2,Mi=0,Hs=1,ue=2,sh=3,rh=4,xf=5;var Zn=100,vf=101,yf=102,bf=103,Sf=104,Mf=200,wf=201,Ef=202,Tf=203,ah=204,oh=205,Af=206,Cf=207,Rf=208,If=209,Pf=210,Lf=211,Df=212,Nf=213,Uf=214,fo=0,po=1,mo=2,Ts=3,go=4,_o=5,xo=6,vo=7,lh=0,Ff=1,Of=2,ki=0,sa=1,ra=2,aa=3,oa=4,la=5,ca=6,ha=7;var ch=300,Rn=301,$n=302,Ko=303,jo=304,ua=306,As=1e3,qi=1001,yo=1002,We=1003,Bf=1004;var fa=1005;var Ze=1006,Qo=1007;var In=1008;var hi=1009,hh=1010,uh=1011,Vs=1012,tl=1013,zi=1014,wi=1015,$e=1016,el=1017,il=1018,Gs=1020,fh=35902,dh=35899,ph=1021,mh=1022,Ei=1023,Zi=1026,Pn=1027,nl=1028,sl=1029,Ln=1030,rl=1031;var al=1033,da=33776,pa=33777,ma=33778,ga=33779,ol=35840,ll=35841,cl=35842,hl=35843,ul=36196,fl=37492,dl=37496,pl=37488,ml=37489,_a=37490,gl=37491,_l=37808,xl=37809,vl=37810,yl=37811,bl=37812,Sl=37813,Ml=37814,wl=37815,El=37816,Tl=37817,Al=37818,Cl=37819,Rl=37820,Il=37821,Pl=36492,Ll=36494,Dl=36495,Nl=36283,Ul=36284,xa=36285,Fl=36286;var vr=2300,bo=2301,ho=2302,Xc=2303,qc=2400,Yc=2401,Zc=2402;var kf=3200;var Ol=0,zf=1,un="",Ae="srgb",yr="srgb-linear",br="linear",he="srgb";var uo=7680;var Hf=519,Vf=512,Gf=513,Wf=514,Bl=515,Xf=516,qf=517,kl=518,Yf=519,gh=35044,ai=35048;var _h="300 es",Fi=2e3,Cs=2001;function Gp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Wp(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Sr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Zf(){let n=Sr("canvas");return n.style.display="block",n}var Au={},Rs=null;function Mr(...n){let t="THREE."+n.shift();Rs?Rs("log",t,...n):console.log(t,...n)}function $f(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Yt(...n){n=$f(n);let t="THREE."+n.shift();if(Rs)Rs("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function $t(...n){n=$f(n);let t="THREE."+n.shift();if(Rs)Rs("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Xn(...n){let t=n.join(" ");t in Au||(Au[t]=!0,Yt(...n))}function Jf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Kf={[fo]:po,[mo]:xo,[go]:vo,[Ts]:_o,[po]:fo,[xo]:mo,[vo]:go,[_o]:Ts},$i=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cu=1234567,Ms=Math.PI/180,Is=180/Math.PI;function Yi(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(je[n&255]+je[n>>8&255]+je[n>>16&255]+je[n>>24&255]+"-"+je[t&255]+je[t>>8&255]+"-"+je[t>>16&15|64]+je[t>>24&255]+"-"+je[e&63|128]+je[e>>8&255]+"-"+je[e>>16&255]+je[e>>24&255]+je[i&255]+je[i>>8&255]+je[i>>16&255]+je[i>>24&255]).toLowerCase()}function re(n,t,e){return Math.max(t,Math.min(e,n))}function xh(n,t){return(n%t+t)%t}function Xp(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function qp(n,t,e){return n!==t?(e-n)/(t-n):0}function gr(n,t,e){return(1-e)*n+e*t}function Yp(n,t,e,i){return gr(n,t,1-Math.exp(-e*i))}function Zp(n,t=1){return t-Math.abs(xh(n,t*2)-t)}function $p(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Jp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Kp(n,t){return n+Math.floor(Math.random()*(t-n+1))}function jp(n,t){return n+Math.random()*(t-n)}function Qp(n){return n*(.5-Math.random())}function tm(n){n!==void 0&&(Cu=n);let t=Cu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function em(n){return n*Ms}function im(n){return n*Is}function nm(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function sm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function rm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function am(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),f=a((t-i)/2),d=r((i-t)/2),p=a((i-t)/2);switch(s){case"XYX":n.set(o*h,c*u,c*f,o*l);break;case"YZY":n.set(c*f,o*h,c*u,o*l);break;case"ZXZ":n.set(c*u,c*f,o*h,o*l);break;case"XZX":n.set(o*h,c*p,c*d,o*l);break;case"YXY":n.set(c*d,o*h,c*p,o*l);break;case"ZYZ":n.set(c*p,c*d,o*h,o*l);break;default:Yt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ui(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function _e(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ze={DEG2RAD:Ms,RAD2DEG:Is,generateUUID:Yi,clamp:re,euclideanModulo:xh,mapLinear:Xp,inverseLerp:qp,lerp:gr,damp:Yp,pingpong:Zp,smoothstep:$p,smootherstep:Jp,randInt:Kp,randFloat:jp,randFloatSpread:Qp,seededRandom:tm,degToRad:em,radToDeg:im,isPowerOfTwo:nm,ceilPowerOfTwo:sm,floorPowerOfTwo:rm,setQuaternionFromProperEuler:am,normalize:_e,denormalize:Ui},wh=class wh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};wh.prototype.isVector2=!0;var _t=wh,Xe=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],f=r[a+0],d=r[a+1],p=r[a+2],_=r[a+3];if(u!==_||c!==f||l!==d||h!==p){let m=c*f+l*d+h*p+u*_;m<0&&(f=-f,d=-d,p=-p,_=-_,m=-m);let g=1-o;if(m<.9995){let x=Math.acos(m),b=Math.sin(x);g=Math.sin(g*x)/b,o=Math.sin(o*x)/b,c=c*g+f*o,l=l*g+d*o,h=h*g+p*o,u=u*g+_*o}else{c=c*g+f*o,l=l*g+d*o,h=h*g+p*o,u=u*g+_*o;let x=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=x,l*=x,h*=x,u*=x}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[a],f=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+h*u+c*d-l*f,t[e+1]=c*p+h*f+l*u-o*d,t[e+2]=l*p+h*d+o*f-c*u,t[e+3]=h*p-o*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),u=o(r/2),f=c(i/2),d=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u+f*d*p;break;case"YZX":this._x=f*h*u+l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u-f*d*p;break;case"XZY":this._x=f*h*u-l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u+f*d*p;break;default:Yt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(i>o&&i>u){let d=2*Math.sqrt(1+i-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-i-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-i-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Eh=class Eh{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ru.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ru.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+c*l+a*u-o*h,this.y=i+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return xc.copy(this).projectOnVector(t),this.sub(xc)}reflect(t){return this.sub(xc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Eh.prototype.isVector3=!0;var O=Eh,xc=new O,Ru=new Xe,Th=class Th{constructor(t,e,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],p=i[8],_=s[0],m=s[3],g=s[6],x=s[1],b=s[4],v=s[7],w=s[2],A=s[5],C=s[8];return r[0]=a*_+o*x+c*w,r[3]=a*m+o*b+c*A,r[6]=a*g+o*v+c*C,r[1]=l*_+h*x+u*w,r[4]=l*m+h*b+u*A,r[7]=l*g+h*v+u*C,r[2]=f*_+d*x+p*w,r[5]=f*m+d*b+p*A,r[8]=f*g+d*v+p*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*r,d=l*r-a*c,p=e*u+i*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return t[0]=u*_,t[1]=(s*l-h*i)*_,t[2]=(o*i-s*a)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=d*_,t[7]=(i*c-l*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Xn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(vc.makeScale(t,e)),this}rotate(t){return Xn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(vc.makeRotation(-t)),this}translate(t,e){return Xn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(vc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Th.prototype.isMatrix3=!0;var Qt=Th,vc=new Qt,Iu=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pu=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function om(){let n={enabled:!0,workingColorSpace:yr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===he&&(s.r=ln(s.r),s.g=ln(s.g),s.b=ln(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===he&&(s.r=ws(s.r),s.g=ws(s.g),s.b=ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===un?br:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[yr]:{primaries:t,whitePoint:i,transfer:br,toXYZ:Iu,fromXYZ:Pu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:t,whitePoint:i,transfer:he,toXYZ:Iu,fromXYZ:Pu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}}),n}var se=om();function ln(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ws(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var rs,So=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{rs===void 0&&(rs=Sr("canvas")),rs.width=t.width,rs.height=t.height;let s=rs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=rs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Sr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ln(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ln(e[i]/255)*255):e[i]=ln(e[i]);return{data:e,width:t.width,height:t.height}}else return Yt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},lm=0,Ps=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:lm++}),this.uuid=Yi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(yc(s[a].image)):r.push(yc(s[a]))}else r=yc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function yc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?So.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Yt("Texture: Unable to serialize Texture."),{})}var cm=0,bc=new O,si=class n extends $i{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=qi,s=qi,r=Ze,a=In,o=Ei,c=hi,l=n.DEFAULT_ANISOTROPY,h=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=Yi(),this.name="",this.source=new Ps(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(bc).x}get height(){return this.source.getSize(bc).y}get depth(){return this.source.getSize(bc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Yt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Yt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ch)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case As:t.x=t.x-Math.floor(t.x);break;case qi:t.x=t.x<0?0:1;break;case yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case As:t.y=t.y-Math.floor(t.y);break;case qi:t.y=t.y<0?0:1;break;case yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};si.DEFAULT_IMAGE=null;si.DEFAULT_MAPPING=ch;si.DEFAULT_ANISOTROPY=1;var Ah=class Ah{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],p=c[9],_=c[2],m=c[6],g=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(p+m)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(l+1)/2,v=(d+1)/2,w=(g+1)/2,A=(h+f)/4,C=(u+_)/4,S=(p+m)/4;return b>v&&b>w?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=A/i,r=C/i):v>w?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=A/s,r=S/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=C/r,s=S/r),this.set(i,s,r,e),this}let x=Math.sqrt((m-p)*(m-p)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-p)/x,this.y=(u-_)/x,this.z=(f-h)/x,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ah.prototype.isVector4=!0;var Ce=Ah,Mo=class extends $i{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new si(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ps(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fe=class extends Mo{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},wr=class extends si{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var wo=class extends si{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Jo=class Jo{constructor(t,e,i,s,r,a,o,c,l,h,u,f,d,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,h,u,f,d,p,_,m)}set(t,e,i,s,r,a,o,c,l,h,u,f,d,p,_,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jo().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/as.setFromMatrixColumn(t,0).length(),r=1/as.setFromMatrixColumn(t,1).length(),a=1/as.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,d=a*u,p=o*h,_=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+p*l,e[5]=f-_*l,e[9]=-o*c,e[2]=_-f*l,e[6]=p+d*l,e[10]=a*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,p=l*h,_=l*u;e[0]=f+_*o,e[4]=p*o-d,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-p,e[6]=_+f*o,e[10]=a*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,p=l*h,_=l*u;e[0]=f-_*o,e[4]=-a*u,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let f=a*h,d=a*u,p=o*h,_=o*u;e[0]=c*h,e[4]=p*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-p,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let f=a*c,d=a*l,p=o*c,_=o*l;e[0]=c*h,e[4]=_-f*u,e[8]=p*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*u+p,e[10]=f-_*u}else if(t.order==="XZY"){let f=a*c,d=a*l,p=o*c,_=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hm,t,um)}lookAt(t,e,i){let s=this.elements;return ui.subVectors(t,e),ui.lengthSq()===0&&(ui.z=1),ui.normalize(),_n.crossVectors(i,ui),_n.lengthSq()===0&&(Math.abs(i.z)===1?ui.x+=1e-4:ui.z+=1e-4,ui.normalize(),_n.crossVectors(i,ui)),_n.normalize(),La.crossVectors(ui,_n),s[0]=_n.x,s[4]=La.x,s[8]=ui.x,s[1]=_n.y,s[5]=La.y,s[9]=ui.y,s[2]=_n.z,s[6]=La.z,s[10]=ui.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],p=i[2],_=i[6],m=i[10],g=i[14],x=i[3],b=i[7],v=i[11],w=i[15],A=s[0],C=s[4],S=s[8],I=s[12],T=s[1],P=s[5],y=s[9],k=s[13],D=s[2],z=s[6],Y=s[10],V=s[14],et=s[3],B=s[7],H=s[11],tt=s[15];return r[0]=a*A+o*T+c*D+l*et,r[4]=a*C+o*P+c*z+l*B,r[8]=a*S+o*y+c*Y+l*H,r[12]=a*I+o*k+c*V+l*tt,r[1]=h*A+u*T+f*D+d*et,r[5]=h*C+u*P+f*z+d*B,r[9]=h*S+u*y+f*Y+d*H,r[13]=h*I+u*k+f*V+d*tt,r[2]=p*A+_*T+m*D+g*et,r[6]=p*C+_*P+m*z+g*B,r[10]=p*S+_*y+m*Y+g*H,r[14]=p*I+_*k+m*V+g*tt,r[3]=x*A+b*T+v*D+w*et,r[7]=x*C+b*P+v*z+w*B,r[11]=x*S+b*y+v*Y+w*H,r[15]=x*I+b*k+v*V+w*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],_=t[7],m=t[11],g=t[15],x=c*d-l*f,b=o*d-l*u,v=o*f-c*u,w=a*d-l*h,A=a*f-c*h,C=a*u-o*h;return e*(_*x-m*b+g*v)-i*(p*x-m*w+g*A)+s*(p*b-_*w+g*C)-r*(p*v-_*A+m*C)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-i*(r*h-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],_=t[13],m=t[14],g=t[15],x=e*o-i*a,b=e*c-s*a,v=e*l-r*a,w=i*c-s*o,A=i*l-r*o,C=s*l-r*c,S=h*_-u*p,I=h*m-f*p,T=h*g-d*p,P=u*m-f*_,y=u*g-d*_,k=f*g-d*m,D=x*k-b*y+v*P+w*T-A*I+C*S;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/D;return t[0]=(o*k-c*y+l*P)*z,t[1]=(s*y-i*k-r*P)*z,t[2]=(_*C-m*A+g*w)*z,t[3]=(f*A-u*C-d*w)*z,t[4]=(c*T-a*k-l*I)*z,t[5]=(e*k-s*T+r*I)*z,t[6]=(m*v-p*C-g*b)*z,t[7]=(h*C-f*v+d*b)*z,t[8]=(a*y-o*T+l*S)*z,t[9]=(i*T-e*y-r*S)*z,t[10]=(p*A-_*v+g*x)*z,t[11]=(u*v-h*A-d*x)*z,t[12]=(o*I-a*P-c*S)*z,t[13]=(e*P-i*I+s*S)*z,t[14]=(_*b-p*w-m*x)*z,t[15]=(h*w-u*b+f*x)*z,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,f=r*l,d=r*h,p=r*u,_=a*h,m=a*u,g=o*u,x=c*l,b=c*h,v=c*u,w=i.x,A=i.y,C=i.z;return s[0]=(1-(_+g))*w,s[1]=(d+v)*w,s[2]=(p-b)*w,s[3]=0,s[4]=(d-v)*A,s[5]=(1-(f+g))*A,s[6]=(m+x)*A,s[7]=0,s[8]=(p+b)*C,s[9]=(m-x)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=as.set(s[0],s[1],s[2]).length(),o=as.set(s[4],s[5],s[6]).length(),c=as.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Pi.copy(this);let l=1/a,h=1/o,u=1/c;return Pi.elements[0]*=l,Pi.elements[1]*=l,Pi.elements[2]*=l,Pi.elements[4]*=h,Pi.elements[5]*=h,Pi.elements[6]*=h,Pi.elements[8]*=u,Pi.elements[9]*=u,Pi.elements[10]*=u,e.setFromRotationMatrix(Pi),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,s,r,a,o=Fi,c=!1){let l=this.elements,h=2*r/(e-t),u=2*r/(i-s),f=(e+t)/(e-t),d=(i+s)/(i-s),p,_;if(c)p=r/(a-r),_=a*r/(a-r);else if(o===Fi)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Cs)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Fi,c=!1){let l=this.elements,h=2/(e-t),u=2/(i-s),f=-(e+t)/(e-t),d=-(i+s)/(i-s),p,_;if(c)p=1/(a-r),_=a/(a-r);else if(o===Fi)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===Cs)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Jo.prototype.isMatrix4=!0;var te=Jo,as=new O,Pi=new te,hm=new O(0,0,0),um=new O(1,1,1),_n=new O,La=new O,ui=new O,Lu=new te,Du=new Xe,yi=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(re(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-re(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(re(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Yt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Lu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Lu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Du.setFromEuler(this),this.setFromQuaternion(Du,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yi.DEFAULT_ORDER="XYZ";var Ls=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},fm=0,Nu=new O,os=new Xe,nn=new te,Da=new O,rr=new O,dm=new O,pm=new Xe,Uu=new O(1,0,0),Fu=new O(0,1,0),Ou=new O(0,0,1),Bu={type:"added"},mm={type:"removed"},ls={type:"childadded",child:null},Sc={type:"childremoved",child:null},Be=class n extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=Yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new O,e=new yi,i=new Xe,s=new O(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new Qt}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ls,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(Uu,t)}rotateY(t){return this.rotateOnAxis(Fu,t)}rotateZ(t){return this.rotateOnAxis(Ou,t)}translateOnAxis(t,e){return Nu.copy(t).applyQuaternion(this.quaternion),this.position.add(Nu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uu,t)}translateY(t){return this.translateOnAxis(Fu,t)}translateZ(t){return this.translateOnAxis(Ou,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(nn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Da.copy(t):Da.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?nn.lookAt(rr,Da,this.up):nn.lookAt(Da,rr,this.up),this.quaternion.setFromRotationMatrix(nn),s&&(nn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(nn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?($t("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bu),ls.child=t,this.dispatchEvent(ls),ls.child=null):$t("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(mm),Sc.child=t,this.dispatchEvent(Sc),Sc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),nn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),nn.multiply(t.parent.matrixWorld)),t.applyMatrix4(nn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bu),ls.child=t,this.dispatchEvent(ls),ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,t,dm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,pm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Be.DEFAULT_UP=new O(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ee=class extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}},gm={type:"move"},Ds=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),g=this._getHandJoint(l,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;l.inputState.pinching&&f>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gm)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ee;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},jf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xn={h:0,s:0,l:0},Na={h:0,s:0,l:0};function Mc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var mt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=i,se.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=se.workingColorSpace){if(t=xh(t,1),e=re(e,0,1),i=re(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Mc(a,r,t+1/3),this.g=Mc(a,r,t),this.b=Mc(a,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Ae){function i(r){r!==void 0&&parseFloat(r)<1&&Yt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Yt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Yt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){let i=jf[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Yt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ln(t.r),this.g=ln(t.g),this.b=ln(t.b),this}copyLinearToSRGB(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return se.workingToColorSpace(Qe.copy(this),t),Math.round(re(Qe.r*255,0,255))*65536+Math.round(re(Qe.g*255,0,255))*256+Math.round(re(Qe.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(Qe.copy(this),e);let i=Qe.r,s=Qe.g,r=Qe.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=Ae){se.workingToColorSpace(Qe.copy(this),t);let e=Qe.r,i=Qe.g,s=Qe.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(xn),this.setHSL(xn.h+t,xn.s+e,xn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(xn),t.getHSL(Na);let i=gr(xn.h,Na.h,e),s=gr(xn.s,Na.s,e),r=gr(xn.l,Na.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qe=new mt;mt.NAMES=jf;var Er=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new mt(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Tr=class extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Li=new O,sn=new O,wc=new O,rn=new O,cs=new O,hs=new O,ku=new O,Ec=new O,Tc=new O,Ac=new O,Cc=new Ce,Rc=new Ce,Ic=new Ce,Xi=class n{constructor(t=new O,e=new O,i=new O){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Li.subVectors(t,e),s.cross(Li);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Li.subVectors(s,e),sn.subVectors(i,e),wc.subVectors(t,e);let a=Li.dot(Li),o=Li.dot(sn),c=Li.dot(wc),l=sn.dot(sn),h=sn.dot(wc),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-o*h)*f,p=(a*h-o*c)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,rn)===null?!1:rn.x>=0&&rn.y>=0&&rn.x+rn.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,rn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,rn.x),c.addScaledVector(a,rn.y),c.addScaledVector(o,rn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return Cc.setScalar(0),Rc.setScalar(0),Ic.setScalar(0),Cc.fromBufferAttribute(t,e),Rc.fromBufferAttribute(t,i),Ic.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Cc,r.x),a.addScaledVector(Rc,r.y),a.addScaledVector(Ic,r.z),a}static isFrontFacing(t,e,i,s){return Li.subVectors(i,e),sn.subVectors(t,e),Li.cross(sn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Li.subVectors(this.c,this.b),sn.subVectors(this.a,this.b),Li.cross(sn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;cs.subVectors(s,i),hs.subVectors(r,i),Ec.subVectors(t,i);let c=cs.dot(Ec),l=hs.dot(Ec);if(c<=0&&l<=0)return e.copy(i);Tc.subVectors(t,s);let h=cs.dot(Tc),u=hs.dot(Tc);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(i).addScaledVector(cs,a);Ac.subVectors(t,r);let d=cs.dot(Ac),p=hs.dot(Ac);if(p>=0&&d<=p)return e.copy(r);let _=d*l-c*p;if(_<=0&&l>=0&&p<=0)return o=l/(l-p),e.copy(i).addScaledVector(hs,o);let m=h*p-d*u;if(m<=0&&u-h>=0&&d-p>=0)return ku.subVectors(r,s),o=(u-h)/(u-h+(d-p)),e.copy(s).addScaledVector(ku,o);let g=1/(m+_+f);return a=_*g,o=f*g,e.copy(i).addScaledVector(cs,a).addScaledVector(hs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ji=class{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Di.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Di.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Di.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Di):Di.fromBufferAttribute(r,a),Di.applyMatrix4(t.matrixWorld),this.expandByPoint(Di);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ua.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ua.copy(i.boundingBox)),Ua.applyMatrix4(t.matrixWorld),this.union(Ua)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Di),Di.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ar),Fa.subVectors(this.max,ar),us.subVectors(t.a,ar),fs.subVectors(t.b,ar),ds.subVectors(t.c,ar),vn.subVectors(fs,us),yn.subVectors(ds,fs),Hn.subVectors(us,ds);let e=[0,-vn.z,vn.y,0,-yn.z,yn.y,0,-Hn.z,Hn.y,vn.z,0,-vn.x,yn.z,0,-yn.x,Hn.z,0,-Hn.x,-vn.y,vn.x,0,-yn.y,yn.x,0,-Hn.y,Hn.x,0];return!Pc(e,us,fs,ds,Fa)||(e=[1,0,0,0,1,0,0,0,1],!Pc(e,us,fs,ds,Fa))?!1:(Oa.crossVectors(vn,yn),e=[Oa.x,Oa.y,Oa.z],Pc(e,us,fs,ds,Fa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Di).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Di).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(an),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},an=[new O,new O,new O,new O,new O,new O,new O,new O],Di=new O,Ua=new Ji,us=new O,fs=new O,ds=new O,vn=new O,yn=new O,Hn=new O,ar=new O,Fa=new O,Oa=new O,Vn=new O;function Pc(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Vn.fromArray(n,r);let o=s.x*Math.abs(Vn.x)+s.y*Math.abs(Vn.y)+s.z*Math.abs(Vn.z),c=t.dot(Vn),l=e.dot(Vn),h=i.dot(Vn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Ue=new O,Ba=new _t,_m=0,fe=class extends $i{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_m++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=gh,this.updateRanges=[],this.gpuType=wi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ba.fromBufferAttribute(this,e),Ba.applyMatrix3(t),this.setXY(e,Ba.x,Ba.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ui(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=_e(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ui(e,this.array)),e}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ui(e,this.array)),e}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ui(e,this.array)),e}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ui(e,this.array)),e}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),i=_e(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),i=_e(i,this.array),s=_e(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),i=_e(i,this.array),s=_e(s,this.array),r=_e(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ar=class extends fe{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Cr=class extends fe{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ee=class extends fe{constructor(t,e,i){super(new Float32Array(t),e,i)}},xm=new Ji,or=new O,Lc=new O,Ki=class{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):xm.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;or.subVectors(t,this.center);let e=or.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(or,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Lc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(or.copy(t.center).add(Lc)),this.expandByPoint(or.copy(t.center).sub(Lc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},vm=0,vi=new te,Dc=new Be,ps=new O,fi=new Ji,lr=new Ji,Ge=new O,oe=class n extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=Yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gp(t)?Cr:Ar)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Qt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return vi.makeRotationFromQuaternion(t),this.applyMatrix4(vi),this}rotateX(t){return vi.makeRotationX(t),this.applyMatrix4(vi),this}rotateY(t){return vi.makeRotationY(t),this.applyMatrix4(vi),this}rotateZ(t){return vi.makeRotationZ(t),this.applyMatrix4(vi),this}translate(t,e,i){return vi.makeTranslation(t,e,i),this.applyMatrix4(vi),this}scale(t,e,i){return vi.makeScale(t,e,i),this.applyMatrix4(vi),this}lookAt(t){return Dc.lookAt(t),Dc.updateMatrix(),this.applyMatrix4(Dc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ee(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Yt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];fi.setFromBufferAttribute(r),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){let i=this.boundingSphere.center;if(fi.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];lr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ge.addVectors(fi.min,lr.min),fi.expandByPoint(Ge),Ge.addVectors(fi.max,lr.max),fi.expandByPoint(Ge)):(fi.expandByPoint(lr.min),fi.expandByPoint(lr.max))}fi.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ge.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ge));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ge.fromBufferAttribute(o,l),c&&(ps.fromBufferAttribute(t,l),Ge.add(ps)),s=Math.max(s,i.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){$t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new fe(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let S=0;S<i.count;S++)o[S]=new O,c[S]=new O;let l=new O,h=new O,u=new O,f=new _t,d=new _t,p=new _t,_=new O,m=new O;function g(S,I,T){l.fromBufferAttribute(i,S),h.fromBufferAttribute(i,I),u.fromBufferAttribute(i,T),f.fromBufferAttribute(r,S),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,T),h.sub(l),u.sub(l),d.sub(f),p.sub(f);let P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(P),o[S].add(_),o[I].add(_),o[T].add(_),c[S].add(m),c[I].add(m),c[T].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let S=0,I=x.length;S<I;++S){let T=x[S],P=T.start,y=T.count;for(let k=P,D=P+y;k<D;k+=3)g(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let b=new O,v=new O,w=new O,A=new O;function C(S){w.fromBufferAttribute(s,S),A.copy(w);let I=o[S];b.copy(I),b.sub(w.multiplyScalar(w.dot(I))).normalize(),v.crossVectors(A,I);let P=v.dot(c[S])<0?-1:1;a.setXYZW(S,b.x,b.y,b.z,P)}for(let S=0,I=x.length;S<I;++S){let T=x[S],P=T.start,y=T.count;for(let k=P,D=P+y;k<D;k+=3)C(t.getX(k+0)),C(t.getX(k+1)),C(t.getX(k+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new fe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new O,r=new O,a=new O,o=new O,c=new O,l=new O,h=new O,u=new O;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,p),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),d=0,p=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*h;for(let g=0;g<h;g++)f[p++]=l[d++]}return new fe(f,h,u)}if(this.index===null)return Yt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,i);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,i);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Eo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=gh,this.updateRanges=[],this.version=0,this.uuid=Yi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},ni=new O,Rr=class n{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)ni.fromBufferAttribute(this,e),ni.applyMatrix4(t),this.setXYZ(e,ni.x,ni.y,ni.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ni.fromBufferAttribute(this,e),ni.applyNormalMatrix(t),this.setXYZ(e,ni.x,ni.y,ni.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ni.fromBufferAttribute(this,e),ni.transformDirection(t),this.setXYZ(e,ni.x,ni.y,ni.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Ui(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=_e(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ui(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ui(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ui(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ui(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),i=_e(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),i=_e(i,this.array),s=_e(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),i=_e(i,this.array),s=_e(s,this.array),r=_e(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Mr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new fe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new n(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Mr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Nc=new O,ym=new O,bm=new Qt,Ni=class{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Nc.subVectors(i,e).cross(ym.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Nc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||bm.getNormalMatrix(t),s=this.coplanarPoint(Nc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Sm=0,Oi=class extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=Yi(),this.name="",this.type="Material",this.blending=Hs,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ah,this.blendDst=oh,this.blendEquation=Zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mt(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=uo,this.stencilZFail=uo,this.stencilZPass=uo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Yt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Yt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new mt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Ni().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new _t().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _t().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ke=class extends Oi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ms,cr=new O,gs=new O,_s=new O,xs=new _t,hr=new _t,Qf=new te,ka=new O,ur=new O,za=new O,zu=new _t,Uc=new _t,Hu=new _t,qe=class extends Be{constructor(t=new ke){if(super(),this.isSprite=!0,this.type="Sprite",ms===void 0){ms=new oe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Eo(e,5);ms.setIndex([0,1,2,0,2,3]),ms.setAttribute("position",new Rr(i,3,0,!1)),ms.setAttribute("uv",new Rr(i,2,3,!1))}this.geometry=ms,this.material=t,this.center=new _t(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&$t('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gs.setFromMatrixScale(this.matrixWorld),Qf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),_s.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gs.multiplyScalar(-_s.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;Ha(ka.set(-.5,-.5,0),_s,a,gs,s,r),Ha(ur.set(.5,-.5,0),_s,a,gs,s,r),Ha(za.set(.5,.5,0),_s,a,gs,s,r),zu.set(0,0),Uc.set(1,0),Hu.set(1,1);let o=t.ray.intersectTriangle(ka,ur,za,!1,cr);if(o===null&&(Ha(ur.set(-.5,.5,0),_s,a,gs,s,r),Uc.set(0,1),o=t.ray.intersectTriangle(ka,za,ur,!1,cr),o===null))return;let c=t.ray.origin.distanceTo(cr);c<t.near||c>t.far||e.push({distance:c,point:cr.clone(),uv:Xi.getInterpolation(cr,ka,ur,za,zu,Uc,Hu,new _t),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Ha(n,t,e,i,s,r){xs.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(hr.x=r*xs.x-s*xs.y,hr.y=s*xs.x+r*xs.y):hr.copy(xs),n.copy(t),n.x+=hr.x,n.y+=hr.y,n.applyMatrix4(Qf)}var on=new O,Fc=new O,Va=new O,Ga=new O,qn=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,on)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=on.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(on.copy(this.origin).addScaledVector(this.direction,e),on.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Fc.copy(t).add(e).multiplyScalar(.5),Va.copy(e).sub(t).normalize(),Ga.copy(this.origin).sub(Fc);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Va),o=Ga.dot(this.direction),c=-Ga.dot(Va),l=Ga.lengthSq(),h=Math.abs(1-a*a),u,f,d,p;if(h>0)if(u=a*c-o,f=a*o-c,p=r*h,u>=0)if(f>=-p)if(f<=p){let _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-p?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=p?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Fc).addScaledVector(Va,f),d}intersectSphere(t,e){if(t.radius<0)return null;on.subVectors(t.center,this.origin);let i=on.dot(this.direction),s=on.dot(on)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,on)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,u=t.x-a.x,f=t.y-a.y,d=t.z-a.z,p=e.x-a.x,_=e.y-a.y,m=e.z-a.z,g=i.x-a.x,x=i.y-a.y,b=i.z-a.z,v=Math.abs(c),w=Math.abs(l),A=Math.abs(h),C,S,I,T,P,y,k,D,z,Y,V,et;if(v>=w&&v>=A?(I=c,y=u,z=p,et=g,c>=0?(C=l,S=h,T=f,P=d,k=_,D=m,Y=x,V=b):(C=h,S=l,T=d,P=f,k=m,D=_,Y=b,V=x)):w>=A?(I=l,y=f,z=_,et=x,l>=0?(C=h,S=c,T=d,P=u,k=m,D=p,Y=b,V=g):(C=c,S=h,T=u,P=d,k=p,D=m,Y=g,V=b)):(I=h,y=d,z=m,et=b,h>=0?(C=c,S=l,T=u,P=f,k=p,D=_,Y=g,V=x):(C=l,S=c,T=f,P=u,k=_,D=p,Y=x,V=g)),I===0)return null;let B=C/I,H=S/I,tt=1/I,ht=T-B*y,st=P-H*y,Jt=k-B*z,Zt=D-H*z,Dt=Y-B*et,Q=V-H*et,at=Dt*Zt-Q*Jt,vt=ht*Q-st*Dt,Xt=Jt*st-Zt*ht;if(s){if(at<0||vt<0||Xt<0)return null}else if((at<0||vt<0||Xt<0)&&(at>0||vt>0||Xt>0))return null;let Mt=at+vt+Xt;if(Mt===0)return null;let M=tt*(at*y+vt*z+Xt*et);return(Mt>0?M<0:M>0)?null:this.at(M/Mt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},me=class extends Oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=lh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Vu=new te,Gn=new qn,Wa=new Ki,Gu=new O,Xa=new O,qa=new O,Ya=new O,Oc=new O,Za=new O,Wu=new O,$a=new O,Vt=class extends Be{constructor(t=new oe,e=new me){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Za.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(Oc.fromBufferAttribute(u,t),a?Za.addScaledVector(Oc,h):Za.addScaledVector(Oc.sub(e),h))}e.add(Za)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(r),Gn.copy(t.ray).recast(t.near),!(Wa.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(Wa,Gu)===null||Gn.origin.distanceToSquared(Gu)>(t.far-t.near)**2))&&(Vu.copy(r).invert(),Gn.copy(t.ray).applyMatrix4(Vu),!(i.boundingBox!==null&&Gn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Gn)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=f.length;p<_;p++){let m=f[p],g=a[m.materialIndex],x=Math.max(m.start,d.start),b=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=x,w=b;v<w;v+=3){let A=o.getX(v),C=o.getX(v+1),S=o.getX(v+2);s=Ja(this,g,t,i,l,h,u,A,C,S),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){let x=o.getX(m),b=o.getX(m+1),v=o.getX(m+2);s=Ja(this,a,t,i,l,h,u,x,b,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,_=f.length;p<_;p++){let m=f[p],g=a[m.materialIndex],x=Math.max(m.start,d.start),b=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=x,w=b;v<w;v+=3){let A=v,C=v+1,S=v+2;s=Ja(this,g,t,i,l,h,u,A,C,S),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){let x=m,b=m+1,v=m+2;s=Ja(this,a,t,i,l,h,u,x,b,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Mm(n,t,e,i,s,r,a,o){let c;if(t.side===Oe?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===Cn,o),c===null)return null;$a.copy(o),$a.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo($a);return l<e.near||l>e.far?null:{distance:l,point:$a.clone(),object:n}}function Ja(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,Xa),n.getVertexPosition(c,qa),n.getVertexPosition(l,Ya);let h=Mm(n,t,e,i,Xa,qa,Ya,Wu);if(h){let u=new O;Xi.getBarycoord(Wu,Xa,qa,Ya,u),s&&(h.uv=Xi.getInterpolatedAttribute(s,o,c,l,u,new _t)),r&&(h.uv1=Xi.getInterpolatedAttribute(r,o,c,l,u,new _t)),a&&(h.normal=Xi.getInterpolatedAttribute(a,o,c,l,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new O,materialIndex:0};Xi.getNormal(Xa,qa,Ya,f.normal),h.face=f,h.barycoord=u}return h}var Ir=class extends si{constructor(t=null,e=1,i=1,s,r,a,o,c,l=We,h=We,u,f){super(null,a,o,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pr=class extends fe{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},vs=new te,Xu=new te,Ka=[],qu=new Ji,wm=new te,fr=new Vt,dr=new Ki,oi=class extends Vt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Pr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,wm)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ji),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,vs),qu.copy(t.boundingBox).applyMatrix4(vs),this.boundingBox.union(qu)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,vs),dr.copy(t.boundingSphere).applyMatrix4(vs),this.boundingSphere.union(dr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(fr.geometry=this.geometry,fr.material=this.material,fr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dr.copy(this.boundingSphere),dr.applyMatrix4(i),t.ray.intersectsSphere(dr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,vs),Xu.multiplyMatrices(i,vs),fr.matrixWorld=Xu,fr.raycast(t,Ka);for(let a=0,o=Ka.length;a<o;a++){let c=Ka[a];c.instanceId=r,c.object=this,e.push(c)}Ka.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Pr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ir(new Float32Array(s*this.count),s,this.count,nl,wi));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;return r[c]=o,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Wn=new Ki,Em=new _t(.5,.5),ja=new O,Ns=class{constructor(t=new Ni,e=new Ni,i=new Ni,s=new Ni,r=new Ni,a=new Ni){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Fi,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],_=r[9],m=r[10],g=r[11],x=r[12],b=r[13],v=r[14],w=r[15];if(s[0].setComponents(l-a,d-h,g-p,w-x).normalize(),s[1].setComponents(l+a,d+h,g+p,w+x).normalize(),s[2].setComponents(l+o,d+u,g+_,w+b).normalize(),s[3].setComponents(l-o,d-u,g-_,w-b).normalize(),i)s[4].setComponents(c,f,m,v).normalize(),s[5].setComponents(l-c,d-f,g-m,w-v).normalize();else if(s[4].setComponents(l-c,d-f,g-m,w-v).normalize(),e===Fi)s[5].setComponents(l+c,d+f,g+m,w+v).normalize();else if(e===Cs)s[5].setComponents(c,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(t){Wn.center.set(0,0,0);let e=Em.distanceTo(t.center);return Wn.radius=.7071067811865476+e,Wn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ja.x=s.normal.x>0?t.max.x:t.min.x,ja.y=s.normal.y>0?t.max.y:t.min.y,ja.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ja)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var bi=class extends Oi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},To=new O,Ao=new O,Yu=new te,pr=new qn,Qa=new Ki,Bc=new O,Zu=new O,Us=class extends Be{constructor(t=new oe,e=new bi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)To.fromBufferAttribute(e,s-1),Ao.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=To.distanceTo(Ao);t.setAttribute("lineDistance",new ee(i,1))}else Yt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qa.copy(i.boundingSphere),Qa.applyMatrix4(s),Qa.radius+=r,t.ray.intersectsSphere(Qa)===!1)return;Yu.copy(s).invert(),pr.copy(t.ray).applyMatrix4(Yu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=d,m=p-1;_<m;_+=l){let g=h.getX(_),x=h.getX(_+1),b=to(this,t,pr,c,g,x,_);b&&e.push(b)}if(this.isLineLoop){let _=h.getX(p-1),m=h.getX(d),g=to(this,t,pr,c,_,m,p-1);g&&e.push(g)}}else{let d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let _=d,m=p-1;_<m;_+=l){let g=to(this,t,pr,c,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=to(this,t,pr,c,p-1,d,p-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function to(n,t,e,i,s,r,a){let o=n.geometry.attributes.position;if(To.fromBufferAttribute(o,s),Ao.fromBufferAttribute(o,r),e.distanceSqToSegment(To,Ao,Bc,Zu)>i)return;Bc.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Bc);if(!(l<t.near||l>t.far))return{distance:l,point:Zu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var $u=new O,Ju=new O,cn=class extends Us{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)$u.fromBufferAttribute(e,s),Ju.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+$u.distanceTo(Ju);t.setAttribute("lineDistance",new ee(i,1))}else Yt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Sn=class extends Oi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ku=new te,$c=new qn,eo=new Ki,io=new O,hn=class extends Be{constructor(t=new oe,e=new Sn){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),eo.copy(i.boundingSphere),eo.applyMatrix4(s),eo.radius+=r,t.ray.intersectsSphere(eo)===!1)return;Ku.copy(s).invert(),$c.copy(t.ray).applyMatrix4(Ku);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,u=i.attributes.position;if(l!==null){let f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let p=f,_=d;p<_;p++){let m=l.getX(p);io.fromBufferAttribute(u,m),ju(io,m,c,s,t,e,this)}}else{let f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let p=f,_=d;p<_;p++)io.fromBufferAttribute(u,p),ju(io,p,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ju(n,t,e,i,s,r,a){let o=$c.distanceSqToPoint(n);if(o<e){let c=new O;$c.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Lr=class extends si{constructor(t=[],e=Rn,i,s,r,a,o,c,l,h){super(t,e,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Si=class extends si{constructor(t,e,i,s,r,a,o,c,l){super(t,e,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Mn=class extends si{constructor(t,e,i=zi,s,r,a,o=We,c=We,l,h=Zi,u=1){if(h!==Zi&&h!==Pn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ps(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Co=class extends Mn{constructor(t,e=zi,i=Rn,s,r,a=We,o=We,c,l=Zi){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Dr=class extends si{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Le=class n extends oe{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,d=0;p("z","y","x",-1,-1,i,e,t,a,r,0),p("z","y","x",1,-1,i,e,-t,a,r,1),p("x","z","y",1,1,t,i,e,s,a,2),p("x","z","y",1,-1,t,i,-e,s,a,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new ee(l,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(u,2));function p(_,m,g,x,b,v,w,A,C,S,I){let T=v/C,P=w/S,y=v/2,k=w/2,D=A/2,z=C+1,Y=S+1,V=0,et=0,B=new O;for(let H=0;H<Y;H++){let tt=H*P-k;for(let ht=0;ht<z;ht++){let st=ht*T-y;B[_]=st*x,B[m]=tt*b,B[g]=D,l.push(B.x,B.y,B.z),B[_]=0,B[m]=0,B[g]=A>0?1:-1,h.push(B.x,B.y,B.z),u.push(ht/C),u.push(1-H/S),V+=1}}for(let H=0;H<S;H++)for(let tt=0;tt<C;tt++){let ht=f+tt+z*H,st=f+tt+z*(H+1),Jt=f+(tt+1)+z*(H+1),Zt=f+(tt+1)+z*H;c.push(ht,st,Zt),c.push(st,Jt,Zt),et+=6}o.addGroup(d,et,I),d+=et,f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Nr=class n extends oe{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new O,h=new _t;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=i+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(o,3)),this.setAttribute("uv",new ee(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},li=class n extends oe{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],p=0,_=[],m=i/2,g=0;x(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ee(u,3)),this.setAttribute("normal",new ee(f,3)),this.setAttribute("uv",new ee(d,2));function x(){let v=new O,w=new O,A=0,C=(e-t)/i;for(let S=0;S<=r;S++){let I=[],T=S/r,P=T*(e-t)+t;for(let y=0;y<=s;y++){let k=y/s,D=k*c+o,z=Math.sin(D),Y=Math.cos(D);w.x=P*z,w.y=-T*i+m,w.z=P*Y,u.push(w.x,w.y,w.z),v.set(z,C,Y).normalize(),f.push(v.x,v.y,v.z),d.push(k,1-T),I.push(p++)}_.push(I)}for(let S=0;S<s;S++)for(let I=0;I<r;I++){let T=_[I][S],P=_[I+1][S],y=_[I+1][S+1],k=_[I][S+1];(t>0||I!==0)&&(h.push(T,P,k),A+=3),(e>0||I!==r-1)&&(h.push(P,y,k),A+=3)}l.addGroup(g,A,0),g+=A}function b(v){let w=p,A=new _t,C=new O,S=0,I=v===!0?t:e,T=v===!0?1:-1;for(let y=1;y<=s;y++)u.push(0,m*T,0),f.push(0,T,0),d.push(.5,.5),p++;let P=p;for(let y=0;y<=s;y++){let D=y/s*c+o,z=Math.cos(D),Y=Math.sin(D);C.x=I*Y,C.y=m*T,C.z=I*z,u.push(C.x,C.y,C.z),f.push(0,T,0),A.x=z*.5+.5,A.y=Y*.5*T+.5,d.push(A.x,A.y),p++}for(let y=0;y<s;y++){let k=w+y,D=P+y;v===!0?h.push(D,D+1,k):h.push(D+1,D,k),S+=3}l.addGroup(g,S,v===!0?1:2),g+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ur=class n extends li{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fr=class n extends oe{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],a=[];o(s),l(i),h(),this.setAttribute("position",new ee(r,3)),this.setAttribute("normal",new ee(r.slice(),3)),this.setAttribute("uv",new ee(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){let b=new O,v=new O,w=new O;for(let A=0;A<e.length;A+=3)d(e[A+0],b),d(e[A+1],v),d(e[A+2],w),c(b,v,w,x)}function c(x,b,v,w){let A=w+1,C=[];for(let S=0;S<=A;S++){C[S]=[];let I=x.clone().lerp(v,S/A),T=b.clone().lerp(v,S/A),P=A-S;for(let y=0;y<=P;y++)y===0&&S===A?C[S][y]=I:C[S][y]=I.clone().lerp(T,y/P)}for(let S=0;S<A;S++)for(let I=0;I<2*(A-S)-1;I++){let T=Math.floor(I/2);I%2===0?(f(C[S][T+1]),f(C[S+1][T]),f(C[S][T])):(f(C[S][T+1]),f(C[S+1][T+1]),f(C[S+1][T]))}}function l(x){let b=new O;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(x),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function h(){let x=new O;for(let b=0;b<r.length;b+=3){x.x=r[b+0],x.y=r[b+1],x.z=r[b+2];let v=m(x)/2/Math.PI+.5,w=g(x)/Math.PI+.5;a.push(v,1-w)}p(),u()}function u(){for(let x=0;x<a.length;x+=6){let b=a[x+0],v=a[x+2],w=a[x+4],A=Math.max(b,v,w),C=Math.min(b,v,w);A>.9&&C<.1&&(b<.2&&(a[x+0]+=1),v<.2&&(a[x+2]+=1),w<.2&&(a[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function d(x,b){let v=x*3;b.x=t[v+0],b.y=t[v+1],b.z=t[v+2]}function p(){let x=new O,b=new O,v=new O,w=new O,A=new _t,C=new _t,S=new _t;for(let I=0,T=0;I<r.length;I+=9,T+=6){x.set(r[I+0],r[I+1],r[I+2]),b.set(r[I+3],r[I+4],r[I+5]),v.set(r[I+6],r[I+7],r[I+8]),A.set(a[T+0],a[T+1]),C.set(a[T+2],a[T+3]),S.set(a[T+4],a[T+5]),w.copy(x).add(b).add(v).divideScalar(3);let P=m(w);_(A,T+0,x,P),_(C,T+2,b,P),_(S,T+4,v,P)}}function _(x,b,v,w){w<0&&x.x===1&&(a[b]=x.x-1),v.x===0&&v.z===0&&(a[b]=w/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function g(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.detail)}};var no=new O,so=new O,kc=new O,ro=new Xi,Or=class extends oe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Ms*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:_,b:m,c:g}=ro;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),ro.getNormal(kc),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){let b=(x+1)%3,v=u[x],w=u[b],A=ro[h[x]],C=ro[h[b]],S=`${v}_${w}`,I=`${w}_${v}`;I in f&&f[I]?(kc.dot(f[I].normal)<=r&&(d.push(A.x,A.y,A.z),d.push(C.x,C.y,C.z)),f[I]=null):S in f||(f[S]={index0:l[x],index1:l[b],normal:kc.clone()})}}for(let p in f)if(f[p]){let{index0:_,index1:m}=f[p];no.fromBufferAttribute(o,_),so.fromBufferAttribute(o,m),d.push(no.x,no.y,no.z),d.push(so.x,so.y,so.z)}this.setAttribute("position",new ee(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},di=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Yt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);let h=i[s],f=i[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new _t:new O);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new O,s=[],r=[],a=[],o=new O,c=new te;for(let d=0;d<=t;d++){let p=d/t;s[d]=this.getTangentAt(p,new O)}r[0]=new O,a[0]=new O;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(re(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,p))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(re(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Fs=class extends di{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new _t){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ro=class extends Fs{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function vh(){let n=0,t=0,e=0,i=0;function s(r,a,o,c){n=r,t=o,e=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+u)+(c-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var Qu=new O,tf=new O,zc=new vh,Hc=new vh,Vc=new vh,Io=class extends di{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new O){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(tf.subVectors(s[0],s[1]).add(s[0]),l=tf);let u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Qu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Qu),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),p<1e-4&&(p=_),m<1e-4&&(m=_),zc.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,p,_,m),Hc.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,p,_,m),Vc.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,p,_,m)}else this.curveType==="catmullrom"&&(zc.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Hc.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Vc.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(zc.calc(c),Hc.calc(c),Vc.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function ef(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,c=n*o;return(2*e-2*i+r+a)*c+(-3*e+3*i-2*r-a)*o+r*n+e}function Tm(n,t){let e=1-n;return e*e*t}function Am(n,t){return 2*(1-n)*n*t}function Cm(n,t){return n*n*t}function _r(n,t,e,i){return Tm(n,t)+Am(n,e)+Cm(n,i)}function Rm(n,t){let e=1-n;return e*e*e*t}function Im(n,t){let e=1-n;return 3*e*e*n*t}function Pm(n,t){return 3*(1-n)*n*n*t}function Lm(n,t){return n*n*n*t}function xr(n,t,e,i,s){return Rm(n,t)+Im(n,e)+Pm(n,i)+Lm(n,s)}var Br=class extends di{constructor(t=new _t,e=new _t,i=new _t,s=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new _t){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(xr(t,s.x,r.x,a.x,o.x),xr(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Po=class extends di{constructor(t=new O,e=new O,i=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new O){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(xr(t,s.x,r.x,a.x,o.x),xr(t,s.y,r.y,a.y,o.y),xr(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},kr=class extends di{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Lo=class extends di{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},zr=class extends di{constructor(t=new _t,e=new _t,i=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new _t){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(_r(t,s.x,r.x,a.x),_r(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Do=class extends di{constructor(t=new O,e=new O,i=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new O){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(_r(t,s.x,r.x,a.x),_r(t,s.y,r.y,a.y),_r(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Hr=class extends di{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(ef(o,c.x,l.x,h.x,u.x),ef(o,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new _t().fromArray(s))}return this}},nf=Object.freeze({__proto__:null,ArcCurve:Ro,CatmullRomCurve3:Io,CubicBezierCurve:Br,CubicBezierCurve3:Po,EllipseCurve:Fs,LineCurve:kr,LineCurve3:Lo,QuadraticBezierCurve:zr,QuadraticBezierCurve3:Do,SplineCurve:Hr}),No=class extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new nf[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new nf[s.type]().fromJSON(s))}return this}},Vr=class extends No{constructor(t){super(),this.type="Path",this.currentPoint=new _t,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new kr(this.currentPoint.clone(),new _t(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new zr(this.currentPoint.clone(),new _t(t,e),new _t(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new Br(this.currentPoint.clone(),new _t(t,e),new _t(i,s),new _t(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Hr(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,a,o,c),this}absellipse(t,e,i,s,r,a,o,c){let l=new Fs(t,e,i,s,r,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Os=class extends Vr{constructor(t){super(t),this.uuid=Yi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new Vr().fromJSON(s))}return this}};function Dm(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=td(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(i&&(r=Bm(n,t,r,e)),n.length>80*e){o=n[0],c=n[1];let h=o,u=c;for(let f=e;f<s;f+=e){let d=n[f],p=n[f+1];d<o&&(o=d),p<c&&(c=p),d>h&&(h=d),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return Gr(r,a,e,o,c,l,0),a}function td(n,t,e,i,s){let r;if(s===$m(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=sf(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=sf(a/i|0,n[a],n[a+1],r);return r&&Bs(r,r.next)&&(Xr(r),r=r.next),r}function Yn(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Bs(e,e.next)||Re(e.prev,e,e.next)===0)){if(Xr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Gr(n,t,e,i,s,r,a){if(!n)return;!a&&r&&Gm(n,i,s,r);let o=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(r?Um(n,i,s,r):Nm(n)){t.push(c.i,n.i,l.i),Xr(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=Fm(Yn(n),t),Gr(n,t,e,i,s,r,2)):a===2&&Om(n,t,e,i,s,r):Gr(Yn(n),t,e,i,s,r,1);break}}}function Nm(n){let t=n.prev,e=n,i=n.next;if(Re(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,c=e.y,l=i.y,h=Math.min(s,r,a),u=Math.min(o,c,l),f=Math.max(s,r,a),d=Math.max(o,c,l),p=i.next;for(;p!==t;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&mr(s,o,r,c,a,l,p.x,p.y)&&Re(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Um(n,t,e,i){let s=n.prev,r=n,a=n.next;if(Re(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,f=a.y,d=Math.min(o,c,l),p=Math.min(h,u,f),_=Math.max(o,c,l),m=Math.max(h,u,f),g=Jc(d,p,t,e,i),x=Jc(_,m,t,e,i),b=n.prevZ,v=n.nextZ;for(;b&&b.z>=g&&v&&v.z<=x;){if(b.x>=d&&b.x<=_&&b.y>=p&&b.y<=m&&b!==s&&b!==a&&mr(o,h,c,u,l,f,b.x,b.y)&&Re(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=d&&v.x<=_&&v.y>=p&&v.y<=m&&v!==s&&v!==a&&mr(o,h,c,u,l,f,v.x,v.y)&&Re(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=g;){if(b.x>=d&&b.x<=_&&b.y>=p&&b.y<=m&&b!==s&&b!==a&&mr(o,h,c,u,l,f,b.x,b.y)&&Re(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=x;){if(v.x>=d&&v.x<=_&&v.y>=p&&v.y<=m&&v!==s&&v!==a&&mr(o,h,c,u,l,f,v.x,v.y)&&Re(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Fm(n,t){let e=n;do{let i=e.prev,s=e.next.next;!Bs(i,s)&&id(i,e,e.next,s)&&Wr(i,s)&&Wr(s,i)&&(t.push(i.i,e.i,s.i),Xr(e),Xr(e.next),e=n=s),e=e.next}while(e!==n);return Yn(e)}function Om(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qm(a,o)){let c=nd(a,o);a=Yn(a,a.next),c=Yn(c,c.next),Gr(a,t,e,i,s,r,0),Gr(c,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Bm(n,t,e,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,c=r<a-1?t[r+1]*i:n.length,l=td(n,o,c,i,!1);l===l.next&&(l.steiner=!0),s.push(Xm(l))}s.sort(km);for(let r=0;r<s.length;r++)e=zm(s[r],e);return e}function km(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function zm(n,t){let e=Hm(n,t);if(!e)return t;let i=nd(e,n);return Yn(i,i.next),Yn(e,e.next)}function Hm(n,t){let e=t,i=n.x,s=n.y,r=-1/0,a;if(Bs(n,e))return e;do{if(Bs(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=i&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;e=a;do{if(i>=e.x&&e.x>=c&&i!==e.x&&ed(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){let u=Math.abs(s-e.y)/(i-e.x);Wr(e,n)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Vm(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Vm(n,t){return Re(n.prev,n,t.prev)<0&&Re(t.next,n,n.next)<0}function Gm(n,t,e,i){let s=n;do s.z===0&&(s.z=Jc(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Wm(s)}function Wm(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function Jc(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Xm(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function ed(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function mr(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&ed(n,t,e,i,s,r,a,o)}function qm(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Ym(n,t)&&(Wr(n,t)&&Wr(t,n)&&Zm(n,t)&&(Re(n.prev,n,t.prev)||Re(n,t.prev,t))||Bs(n,t)&&Re(n.prev,n,n.next)>0&&Re(t.prev,t,t.next)>0)}function Re(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Bs(n,t){return n.x===t.x&&n.y===t.y}function id(n,t,e,i){let s=oo(Re(n,t,e)),r=oo(Re(n,t,i)),a=oo(Re(e,i,n)),o=oo(Re(e,i,t));return!!(s!==r&&a!==o||s===0&&ao(n,e,t)||r===0&&ao(n,i,t)||a===0&&ao(e,n,i)||o===0&&ao(e,t,i))}function ao(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function oo(n){return n>0?1:n<0?-1:0}function Ym(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&id(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Wr(n,t){return Re(n.prev,n,n.next)<0?Re(n,t,n.next)>=0&&Re(n,n.prev,t)>=0:Re(n,t,n.prev)<0||Re(n,n.next,t)<0}function Zm(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function nd(n,t){let e=Kc(n.i,n.x,n.y),i=Kc(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function sf(n,t,e,i){let s=Kc(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Xr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Kc(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $m(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var jc=class{static triangulate(t,e,i=2){return Dm(t,e,i)}},Es=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];rf(t),af(i,t);let a=t.length;e.forEach(rf);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,af(i,e[c]);let o=jc.triangulate(i,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function rf(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function af(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var qr=class n extends Fr{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var Yr=class n extends Fr{constructor(t=1,e=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},ci=class n extends oe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,u=t/o,f=e/c,d=[],p=[],_=[],m=[];for(let g=0;g<h;g++){let x=g*f-a;for(let b=0;b<l;b++){let v=b*u-r;p.push(v,-x,0),_.push(0,0,1),m.push(b/o),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let x=0;x<o;x++){let b=x+l*g,v=x+l*(g+1),w=x+1+l*(g+1),A=x+1+l*g;d.push(b,v,A),d.push(v,w,A)}this.setIndex(d),this.setAttribute("position",new ee(p,3)),this.setAttribute("normal",new ee(_,3)),this.setAttribute("uv",new ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Zr=class n extends oe{constructor(t=.5,e=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new O,p=new _t;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){let g=r+m/i*a;d.x=u*Math.cos(g),d.y=u*Math.sin(g),c.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,h.push(p.x,p.y)}u+=f}for(let _=0;_<s;_++){let m=_*(i+1);for(let g=0;g<i;g++){let x=g+m,b=x,v=x+i+1,w=x+i+2,A=x+1;o.push(b,v,A),o.push(v,w,A)}}this.setIndex(o),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(l,3)),this.setAttribute("uv",new ee(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},$r=class n extends oe{constructor(t=new Os([new _t(0,.5),new _t(-.5,-.5),new _t(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let i=[],s=[],r=[],a=[],o=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(i),this.setAttribute("position",new ee(s,3)),this.setAttribute("normal",new ee(r,3)),this.setAttribute("uv",new ee(a,2));function l(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,p=f.holes;Es.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){let x=p[m];Es.isClockWise(x)===!0&&(p[m]=x.reverse())}let _=Es.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){let x=p[m];d=d.concat(x)}for(let m=0,g=d.length;m<g;m++){let x=d[m];s.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let m=0,g=_.length;m<g;m++){let x=_[m],b=x[0]+u,v=x[1]+u,w=x[2]+u;i.push(b,v,w),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Jm(e,t)}static fromJSON(t,e){let i=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];i.push(a)}return new n(i,t.curveSegments)}};function Jm(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){let s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}var ji=class n extends oe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new O,f=new O,d=[],p=[],_=[],m=[];for(let g=0;g<=i;g++){let x=[],b=g/i,v=a+b*o,w=t*Math.cos(v),A=Math.sqrt(t*t-w*w),C=0;g===0&&a===0?C=.5/e:g===i&&c===Math.PI&&(C=-.5/e);for(let S=0;S<=e;S++){let I=S/e,T=s+I*r;u.x=-A*Math.cos(T),u.y=w,u.z=A*Math.sin(T),p.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(I+C,1-b),x.push(l++)}h.push(x)}for(let g=0;g<i;g++)for(let x=0;x<e;x++){let b=h[g][x+1],v=h[g][x],w=h[g+1][x],A=h[g+1][x+1];(g!==0||a>0)&&d.push(b,v,A),(g!==i-1||c<Math.PI)&&d.push(v,w,A)}this.setIndex(d),this.setAttribute("position",new ee(p,3)),this.setAttribute("normal",new ee(_,3)),this.setAttribute("uv",new ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Bi=class n extends oe{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let c=[],l=[],h=[],u=[],f=new O,d=new O,p=new O;for(let _=0;_<=i;_++){let m=a+_/i*o;for(let g=0;g<=s;g++){let x=g/s*r;d.x=(t+e*Math.cos(m))*Math.cos(x),d.y=(t+e*Math.cos(m))*Math.sin(x),d.z=e*Math.sin(m),l.push(d.x,d.y,d.z),f.x=t*Math.cos(x),f.y=t*Math.sin(x),p.subVectors(d,f).normalize(),h.push(p.x,p.y,p.z),u.push(g/s),u.push(_/i)}}for(let _=1;_<=i;_++)for(let m=1;m<=s;m++){let g=(s+1)*_+m-1,x=(s+1)*(_-1)+m-1,b=(s+1)*(_-1)+m,v=(s+1)*_+m;c.push(g,x,v),c.push(x,b,v)}this.setIndex(c),this.setAttribute("position",new ee(l,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Jn(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(of(s))s.isRenderTargetTexture?(Yt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(of(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function ei(n){let t={};for(let e=0;e<n.length;e++){let i=Jn(n[e]);for(let s in i)t[s]=i[s]}return t}function of(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Km(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function yh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var fn={clone:Jn,merge:ei},jm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ce=class extends Oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jm,this.fragmentShader=Qm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Jn(t.uniforms),this.uniformsGroups=Km(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new mt().setHex(s.value);break;case"v2":this.uniforms[i].value=new _t().fromArray(s.value);break;case"v3":this.uniforms[i].value=new O().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ce().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Qt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new te().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ks=class extends ce{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ri=class extends Oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ol,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Uo=class extends Oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Fo=class extends Oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ys(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Gc(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var wn=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];t:{e:{let a;i:{n:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break e}a=e.length;break i}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break e}a=i,i=0;break i}break t}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Oo=class extends wn{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qc,endingEnd:qc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Yc:r=t,o=2*e-i;break;case Zc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Yc:a=t,c=2*i-e;break;case Zc:a=1,c=i+s[1]-s[0];break;default:a=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(i-e)/(s-e),_=p*p,m=_*p,g=-f*m+2*f*_-f*p,x=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*p+1,b=(-1-d)*m+(1.5+d)*_+.5*p,v=d*m-d*_;for(let w=0;w!==o;++w)r[w]=g*a[h+w]+x*a[l+w]+b*a[c+w]+v*a[u+w];return r}},Bo=class extends wn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},ko=class extends wn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},zo=class extends wn{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(i-e)/(s-e),_=1-p;for(let m=0;m!==o;++m)r[m]=a[l+m]*_+a[c+m]*p;return r}let f=o*2,d=t-1;for(let p=0;p!==o;++p){let _=a[l+p],m=a[c+p],g=d*f+p*2,x=u[g],b=u[g+1],v=t*f+p*2,w=h[v],A=h[v+1],C=eg(i,e,x,w,s);r[p]=sd(C,_,b,A,m)}return r}};function sd(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function tg(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function eg(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=sd(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let c=tg(r,t,e,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var pi=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ys(e,this.TimeBufferType),this.values=ys(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ys(t.times,Array),values:ys(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Gc(t.settings)&&(i.settings={inTangents:ys(t.settings.inTangents,Array),outTangents:ys(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ko(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Bo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Oo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new zo(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case vr:e=this.InterpolantFactoryMethodDiscrete;break;case bo:e=this.InterpolantFactoryMethodLinear;break;case ho:e=this.InterpolantFactoryMethodSmooth;break;case Xc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Yt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vr;case this.InterpolantFactoryMethodLinear:return bo;case this.InterpolantFactoryMethodSmooth:return ho;case this.InterpolantFactoryMethodBezier:return Xc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Gc(this.settings)&&(lf(this.settings.inTangents,t),lf(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&($t("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&($t("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){$t("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){$t("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Wp(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){$t("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ho,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let u=o*i,f=u-i,d=u+i;for(let p=0;p!==i;++p){let _=e[u+p];if(_!==e[f+p]||_!==e[d+p]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let u=o*i,f=a*i;for(let d=0;d!==i;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Gc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function lf(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}pi.prototype.ValueTypeName="";pi.prototype.TimeBufferType=Float32Array;pi.prototype.ValueBufferType=Float32Array;pi.prototype.DefaultInterpolation=bo;var En=class extends pi{constructor(t,e,i){super(t,e,i)}};En.prototype.ValueTypeName="bool";En.prototype.ValueBufferType=Array;En.prototype.DefaultInterpolation=vr;En.prototype.InterpolantFactoryMethodLinear=void 0;En.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends pi{constructor(t,e,i,s){super(t,e,i,s)}};Ho.prototype.ValueTypeName="color";var Vo=class extends pi{constructor(t,e,i,s){super(t,e,i,s)}};Vo.prototype.ValueTypeName="number";var Go=class extends wn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)Xe.slerpFlat(r,0,a,l-o,a,l,c);return r}},Jr=class extends pi{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new Go(this.times,this.values,this.getValueSize(),t)}};Jr.prototype.ValueTypeName="quaternion";Jr.prototype.InterpolantFactoryMethodSmooth=void 0;var Tn=class extends pi{constructor(t,e,i){super(t,e,i)}};Tn.prototype.ValueTypeName="string";Tn.prototype.ValueBufferType=Array;Tn.prototype.DefaultInterpolation=vr;Tn.prototype.InterpolantFactoryMethodLinear=void 0;Tn.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends pi{constructor(t,e,i,s){super(t,e,i,s)}};Wo.prototype.ValueTypeName="vector";var Xo=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],p=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},rd=new Xo,qo=class{constructor(t){this.manager=t!==void 0?t:rd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};qo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Kr=class extends Be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new mt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},jr=class extends Kr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Wc=new te,cf=new O,hf=new O,Yo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ns,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;cf.setFromMatrixPosition(t.matrixWorld),e.position.copy(cf),hf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hf),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){Wc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Wc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Cs||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(Wc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},lo=new O,co=new Xe,Wi=new O,Qr=class extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=Fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(lo,co,Wi),Wi.x===1&&Wi.y===1&&Wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,Wi.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(lo,co,Wi),Wi.x===1&&Wi.y===1&&Wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,Wi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},bn=new O,uf=new _t,ff=new _t,ti=class extends Qr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ms*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Is*2*Math.atan(Math.tan(Ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bn.x,bn.y).multiplyScalar(-t/bn.z),bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bn.x,bn.y).multiplyScalar(-t/bn.z)}getViewSize(t,e){return this.getViewBounds(t,uf,ff),e.subVectors(ff,uf)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ms*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var An=class extends Qr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Qc=class extends Yo{constructor(){super(new An(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ta=class extends Kr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new Qc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var bs=-90,Ss=1,Zo=class extends Be{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ti(bs,Ss,t,e);s.layers=this.layers,this.add(s);let r=new ti(bs,Ss,t,e);r.layers=this.layers,this.add(r);let a=new ti(bs,Ss,t,e);a.layers=this.layers,this.add(a);let o=new ti(bs,Ss,t,e);o.layers=this.layers,this.add(o);let c=new ti(bs,Ss,t,e);c.layers=this.layers,this.add(c);let l=new ti(bs,Ss,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===Fi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Cs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},$o=class extends ti{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},ea=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=ig.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function ig(){this._document.hidden===!1&&this.reset()}var bh="\\[\\]\\.:\\/",ng=new RegExp("["+bh+"]","g"),Sh="[^"+bh+"]",sg="[^"+bh.replace("\\.","")+"]",rg=/((?:WC+[\/:])*)/.source.replace("WC",Sh),ag=/(WCOD+)?/.source.replace("WCOD",sg),og=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Sh),lg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Sh),cg=new RegExp("^"+rg+ag+og+lg+"$"),hg=["material","materials","bones","map"],th=class{constructor(t,e,i){let s=i||we.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},we=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(ng,"")}static parseTrackName(t){let e=cg.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);hg.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=i(o.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Yt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){$t("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){$t("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){$t("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){$t("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){$t("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;$t("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};we.Composite=th;we.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};we.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};we.prototype.GetterByBindingType=[we.prototype._getValue_direct,we.prototype._getValue_array,we.prototype._getValue_arrayElement,we.prototype._getValue_toArray];we.prototype.SetterByBindingTypeAndVersioning=[[we.prototype._setValue_direct,we.prototype._setValue_direct_setNeedsUpdate,we.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[we.prototype._setValue_array,we.prototype._setValue_array_setNeedsUpdate,we.prototype._setValue_array_setMatrixWorldNeedsUpdate],[we.prototype._setValue_arrayElement,we.prototype._setValue_arrayElement_setNeedsUpdate,we.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[we.prototype._setValue_fromArray,we.prototype._setValue_fromArray_setNeedsUpdate,we.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var qy=new Float32Array(1);var df=new te,ia=class{constructor(t,e,i=0,s=1/0){this.ray=new qn(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ls,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):$t("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return df.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(df),this}intersectObject(t,e=!0,i=[]){return eh(t,this,i,e),i.sort(pf),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)eh(t[s],this,i,e);return i.sort(pf),i}};function pf(n,t){return n.distance-t.distance}function eh(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)eh(r[a],t,e,!0)}}var Ch=class Ch{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Ch.prototype.isMatrix2=!0;var ih=Ch;function Mh(n,t,e,i){let s=ug(i);switch(e){case ph:return n*t;case nl:return n*t/s.components*s.byteLength;case sl:return n*t/s.components*s.byteLength;case Ln:return n*t*2/s.components*s.byteLength;case rl:return n*t*2/s.components*s.byteLength;case mh:return n*t*3/s.components*s.byteLength;case Ei:return n*t*4/s.components*s.byteLength;case al:return n*t*4/s.components*s.byteLength;case da:case pa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ma:case ga:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ll:case hl:return Math.max(n,16)*Math.max(t,8)/4;case ol:case cl:return Math.max(n,8)*Math.max(t,8)/2;case ul:case fl:case pl:case ml:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case dl:case _a:case gl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _l:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case vl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case yl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case bl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Sl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Ml:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case wl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case El:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Tl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Al:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Cl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Rl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Il:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Pl:case Ll:case Dl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Nl:case Ul:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xa:case Fl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ug(n){switch(n){case hi:case hh:return{byteLength:1,components:1};case Vs:case uh:case $e:return{byteLength:2,components:1};case el:case il:return{byteLength:2,components:4};case zi:case tl:case wi:return{byteLength:4,components:1};case fh:case dh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Yt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Ad(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function dg(n){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,c,l){let h=c.array,u=c.updateRanges;if(n.bindBuffer(l,o),u.length===0)n.bufferSubData(l,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){let p=u[f],_=u[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){let _=u[d];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var pg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,gg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_g=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Mg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ag=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Cg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ng=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ug=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Fg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Og=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,zg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$g=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Kg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,t0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,e0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,i0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,n0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,s0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,r0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,a0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,o0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,l0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,c0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,h0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,u0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,f0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,d0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,p0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,m0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,g0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,_0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,b0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,S0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,M0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,w0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,P0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,D0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,N0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,O0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,B0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,k0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,z0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,V0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,W0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,q0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Y0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Z0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,K0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,j0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Q0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,t_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,i_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,n_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,s_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,r_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,a_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,o_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,l_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,c_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,h_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,u_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,f_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,p_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,m_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,__=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,b_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,S_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,M_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,w_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,E_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,C_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,R_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,D_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,U_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,F_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,k_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,H_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,G_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,W_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,X_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,q_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Y_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ne={alphahash_fragment:pg,alphahash_pars_fragment:mg,alphamap_fragment:gg,alphamap_pars_fragment:_g,alphatest_fragment:xg,alphatest_pars_fragment:vg,aomap_fragment:yg,aomap_pars_fragment:bg,batching_pars_vertex:Sg,batching_vertex:Mg,begin_vertex:wg,beginnormal_vertex:Eg,bsdfs:Tg,iridescence_fragment:Ag,bumpmap_pars_fragment:Cg,clipping_planes_fragment:Rg,clipping_planes_pars_fragment:Ig,clipping_planes_pars_vertex:Pg,clipping_planes_vertex:Lg,color_fragment:Dg,color_pars_fragment:Ng,color_pars_vertex:Ug,color_vertex:Fg,common:Og,cube_uv_reflection_fragment:Bg,defaultnormal_vertex:kg,displacementmap_pars_vertex:zg,displacementmap_vertex:Hg,emissivemap_fragment:Vg,emissivemap_pars_fragment:Gg,colorspace_fragment:Wg,colorspace_pars_fragment:Xg,envmap_fragment:qg,envmap_common_pars_fragment:Yg,envmap_pars_fragment:Zg,envmap_pars_vertex:$g,envmap_physical_pars_fragment:a0,envmap_vertex:Jg,fog_vertex:Kg,fog_pars_vertex:jg,fog_fragment:Qg,fog_pars_fragment:t0,gradientmap_pars_fragment:e0,lightmap_pars_fragment:i0,lights_lambert_fragment:n0,lights_lambert_pars_fragment:s0,lights_pars_begin:r0,lights_toon_fragment:o0,lights_toon_pars_fragment:l0,lights_phong_fragment:c0,lights_phong_pars_fragment:h0,lights_physical_fragment:u0,lights_physical_pars_fragment:f0,lights_fragment_begin:d0,lights_fragment_maps:p0,lights_fragment_end:m0,lightprobes_pars_fragment:g0,logdepthbuf_fragment:_0,logdepthbuf_pars_fragment:x0,logdepthbuf_pars_vertex:v0,logdepthbuf_vertex:y0,map_fragment:b0,map_pars_fragment:S0,map_particle_fragment:M0,map_particle_pars_fragment:w0,metalnessmap_fragment:E0,metalnessmap_pars_fragment:T0,morphinstance_vertex:A0,morphcolor_vertex:C0,morphnormal_vertex:R0,morphtarget_pars_vertex:I0,morphtarget_vertex:P0,normal_fragment_begin:L0,normal_fragment_maps:D0,normal_pars_fragment:N0,normal_pars_vertex:U0,normal_vertex:F0,normalmap_pars_fragment:O0,clearcoat_normal_fragment_begin:B0,clearcoat_normal_fragment_maps:k0,clearcoat_pars_fragment:z0,iridescence_pars_fragment:H0,opaque_fragment:V0,packing:G0,premultiplied_alpha_fragment:W0,project_vertex:X0,dithering_fragment:q0,dithering_pars_fragment:Y0,roughnessmap_fragment:Z0,roughnessmap_pars_fragment:$0,shadowmap_pars_fragment:J0,shadowmap_pars_vertex:K0,shadowmap_vertex:j0,shadowmask_pars_fragment:Q0,skinbase_vertex:t_,skinning_pars_vertex:e_,skinning_vertex:i_,skinnormal_vertex:n_,specularmap_fragment:s_,specularmap_pars_fragment:r_,tonemapping_fragment:a_,tonemapping_pars_fragment:o_,transmission_fragment:l_,transmission_pars_fragment:c_,uv_pars_fragment:h_,uv_pars_vertex:u_,uv_vertex:f_,worldpos_vertex:d_,background_vert:p_,background_frag:m_,backgroundCube_vert:g_,backgroundCube_frag:__,cube_vert:x_,cube_frag:v_,depth_vert:y_,depth_frag:b_,distance_vert:S_,distance_frag:M_,equirect_vert:w_,equirect_frag:E_,linedashed_vert:T_,linedashed_frag:A_,meshbasic_vert:C_,meshbasic_frag:R_,meshlambert_vert:I_,meshlambert_frag:P_,meshmatcap_vert:L_,meshmatcap_frag:D_,meshnormal_vert:N_,meshnormal_frag:U_,meshphong_vert:F_,meshphong_frag:O_,meshphysical_vert:B_,meshphysical_frag:k_,meshtoon_vert:z_,meshtoon_frag:H_,points_vert:V_,points_frag:G_,shadow_vert:W_,shadow_frag:X_,sprite_vert:q_,sprite_frag:Y_},At={common:{diffuse:{value:new mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new mt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},tn={basic:{uniforms:ei([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:ei([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new mt(0)},envMapIntensity:{value:1}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:ei([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new mt(0)},specular:{value:new mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:ei([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:ei([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new mt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:ei([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:ei([At.points,At.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:ei([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:ei([At.common,At.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:ei([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:ei([At.sprite,At.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distance:{uniforms:ei([At.common,At.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distance_vert,fragmentShader:ne.distance_frag},shadow:{uniforms:ei([At.lights,At.fog,{color:{value:new mt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};tn.physical={uniforms:ei([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new mt(0)},specularColor:{value:new mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};var zl={r:0,b:0,g:0},Z_=new te,Cd=new Qt;Cd.set(-1,0,0,0,1,0,0,0,1);function $_(n,t,e,i,s,r){let a=new mt(0),o=s===!0?0:1,c,l,h=null,u=0,f=null;function d(x){let b=x.isScene===!0?x.background:null;if(b&&b.isTexture){let v=x.backgroundBlurriness>0;b=t.get(b,v)}return b}function p(x){let b=!1,v=d(x);v===null?m(a,o):v&&v.isColor&&(m(v,1),b=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(x,b){let v=d(b);v&&(v.isCubeTexture||v.mapping===ua)?(l===void 0&&(l=new Vt(new Le(1,1,1),new ce({name:"BackgroundCubeMaterial",uniforms:Jn(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Z_.makeRotationFromEuler(b.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Cd),l.material.toneMapped=se.getTransfer(v.colorSpace)!==he,(h!==v||u!==v.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,f=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Vt(new ci(2,2),new ce({name:"BackgroundMaterial",uniforms:Jn(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=se.getTransfer(v.colorSpace)!==he,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function m(x,b){x.getRGB(zl,yh(n)),e.buffers.color.setClear(zl.r,zl.g,zl.b,b,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,b=1){a.set(x),o=b,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(a,o)},render:p,addToRenderList:_,dispose:g}}function J_(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,a=!1;function o(P,y,k,D,z){let Y=!1,V=u(P,D,k,y);r!==V&&(r=V,l(r.object)),Y=d(P,D,k,z),Y&&p(P,D,k,z),z!==null&&t.update(z,n.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,v(P,y,k,D),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return n.createVertexArray()}function l(P){return n.bindVertexArray(P)}function h(P){return n.deleteVertexArray(P)}function u(P,y,k,D){let z=D.wireframe===!0,Y=i[y.id];Y===void 0&&(Y={},i[y.id]=Y);let V=P.isInstancedMesh===!0?P.id:0,et=Y[V];et===void 0&&(et={},Y[V]=et);let B=et[k.id];B===void 0&&(B={},et[k.id]=B);let H=B[z];return H===void 0&&(H=f(c()),B[z]=H),H}function f(P){let y=[],k=[],D=[];for(let z=0;z<e;z++)y[z]=0,k[z]=0,D[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:k,attributeDivisors:D,object:P,attributes:{},index:null}}function d(P,y,k,D){let z=r.attributes,Y=y.attributes,V=0,et=k.getAttributes();for(let B in et)if(et[B].location>=0){let tt=z[B],ht=Y[B];if(ht===void 0&&(B==="instanceMatrix"&&P.instanceMatrix&&(ht=P.instanceMatrix),B==="instanceColor"&&P.instanceColor&&(ht=P.instanceColor)),tt===void 0||tt.attribute!==ht||ht&&tt.data!==ht.data)return!0;V++}return r.attributesNum!==V||r.index!==D}function p(P,y,k,D){let z={},Y=y.attributes,V=0,et=k.getAttributes();for(let B in et)if(et[B].location>=0){let tt=Y[B];tt===void 0&&(B==="instanceMatrix"&&P.instanceMatrix&&(tt=P.instanceMatrix),B==="instanceColor"&&P.instanceColor&&(tt=P.instanceColor));let ht={};ht.attribute=tt,tt&&tt.data&&(ht.data=tt.data),z[B]=ht,V++}r.attributes=z,r.attributesNum=V,r.index=D}function _(){let P=r.newAttributes;for(let y=0,k=P.length;y<k;y++)P[y]=0}function m(P){g(P,0)}function g(P,y){let k=r.newAttributes,D=r.enabledAttributes,z=r.attributeDivisors;k[P]=1,D[P]===0&&(n.enableVertexAttribArray(P),D[P]=1),z[P]!==y&&(n.vertexAttribDivisor(P,y),z[P]=y)}function x(){let P=r.newAttributes,y=r.enabledAttributes;for(let k=0,D=y.length;k<D;k++)y[k]!==P[k]&&(n.disableVertexAttribArray(k),y[k]=0)}function b(P,y,k,D,z,Y,V){V===!0?n.vertexAttribIPointer(P,y,k,z,Y):n.vertexAttribPointer(P,y,k,D,z,Y)}function v(P,y,k,D){_();let z=D.attributes,Y=k.getAttributes(),V=y.defaultAttributeValues;for(let et in Y){let B=Y[et];if(B.location>=0){let H=z[et];if(H===void 0&&(et==="instanceMatrix"&&P.instanceMatrix&&(H=P.instanceMatrix),et==="instanceColor"&&P.instanceColor&&(H=P.instanceColor)),H!==void 0){let tt=H.normalized,ht=H.itemSize,st=t.get(H);if(st===void 0)continue;let Jt=st.buffer,Zt=st.type,Dt=st.bytesPerElement,Q=Zt===n.INT||Zt===n.UNSIGNED_INT||H.gpuType===tl;if(H.isInterleavedBufferAttribute){let at=H.data,vt=at.stride,Xt=H.offset;if(at.isInstancedInterleavedBuffer){for(let Mt=0;Mt<B.locationSize;Mt++)g(B.location+Mt,at.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Mt=0;Mt<B.locationSize;Mt++)m(B.location+Mt);n.bindBuffer(n.ARRAY_BUFFER,Jt);for(let Mt=0;Mt<B.locationSize;Mt++)b(B.location+Mt,ht/B.locationSize,Zt,tt,vt*Dt,(Xt+ht/B.locationSize*Mt)*Dt,Q)}else{if(H.isInstancedBufferAttribute){for(let at=0;at<B.locationSize;at++)g(B.location+at,H.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let at=0;at<B.locationSize;at++)m(B.location+at);n.bindBuffer(n.ARRAY_BUFFER,Jt);for(let at=0;at<B.locationSize;at++)b(B.location+at,ht/B.locationSize,Zt,tt,ht*Dt,ht/B.locationSize*at*Dt,Q)}}else if(V!==void 0){let tt=V[et];if(tt!==void 0)switch(tt.length){case 2:n.vertexAttrib2fv(B.location,tt);break;case 3:n.vertexAttrib3fv(B.location,tt);break;case 4:n.vertexAttrib4fv(B.location,tt);break;default:n.vertexAttrib1fv(B.location,tt)}}}}x()}function w(){I();for(let P in i){let y=i[P];for(let k in y){let D=y[k];for(let z in D){let Y=D[z];for(let V in Y)h(Y[V].object),delete Y[V];delete D[z]}}delete i[P]}}function A(P){if(i[P.id]===void 0)return;let y=i[P.id];for(let k in y){let D=y[k];for(let z in D){let Y=D[z];for(let V in Y)h(Y[V].object),delete Y[V];delete D[z]}}delete i[P.id]}function C(P){for(let y in i){let k=i[y];for(let D in k){let z=k[D];if(z[P.id]===void 0)continue;let Y=z[P.id];for(let V in Y)h(Y[V].object),delete Y[V];delete z[P.id]}}}function S(P){for(let y in i){let k=i[y],D=P.isInstancedMesh===!0?P.id:0,z=k[D];if(z!==void 0){for(let Y in z){let V=z[Y];for(let et in V)h(V[et].object),delete V[et];delete z[Y]}delete k[D],Object.keys(k).length===0&&delete i[y]}}}function I(){T(),a=!0,r!==s&&(r=s,l(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:T,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:S,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function K_(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),e.update(l,i,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];e.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function j_(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Ei&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let S=C===$e&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==hi&&C!==wi&&!S&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Yt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Yt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:x,maxVaryings:b,maxFragmentUniforms:v,maxSamples:w,samples:A}}function Q_(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Ni,o=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let p=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,g=n.get(u);if(!s||p===null||p.length===0||r&&!m)r?h(null):l();else{let x=r?0:i,b=x*4,v=g.clippingState||null;c.value=v,v=h(p,f,b,d);for(let w=0;w!==b;++w)v[w]=e[w];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,p){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,p!==!0||m===null){let g=d+_*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<g)&&(m=new Float32Array(g));for(let b=0,v=d;b!==_;++b,v+=4)a.copy(u[b]).applyMatrix4(x,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var Xs=4,tx=6,ex=20,ix=256,va=new An,ad=new mt,Rh=null,Ih=0,Ph=0,Lh=!1,nx=new O,Kn=new O,Vl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=nx}=r;Rh=this._renderer.getRenderTarget(),Ih=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),Lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ld(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Rh,Ih,Ph),this._renderer.xr.enabled=Lh,t.scissorTest=!1,Ws(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rn||t.mapping===$n?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Rh=this._renderer.getRenderTarget(),Ih=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),Lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:$e,format:Ei,colorSpace:yr,depthBuffer:!1},s=od(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=od(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=sx(r)),this._blurMaterial=ax(r,t,e),this._ggxMaterial=rx(r,t,e)}return s}_compileMaterial(t){let e=new Vt(new oe,t);this._renderer.compile(e,va)}_sceneToCubeUV(t,e,i,s,r){let c=new ti(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(ad),u.toneMapping=ki,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Vt(new Le,new me({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,g=!1,x=t.background;x?x.isColor&&(m.color.copy(x),t.background=null,g=!0):(m.color.copy(ad),g=!0);for(let b=0;b<6;b++){let v=b%3;v===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):v===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));let w=this._cubeSize;Ws(s,v*w,b>2?w:0,w,w),u.setRenderTarget(s),g&&u.render(_,c),u.render(t,c)}u.toneMapping=d,u.autoClear=f,t.background=x}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Rn||t.mapping===$n;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=cd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ld());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;Ws(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,va)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=l*1.25,d=u*f,{_lodMax:p}=this,_=this._sizeLods[i],m=3*_*(i>p-Xs?i-p+Xs:0),g=4*(this._cubeSize-_);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=p-e,Ws(r,m,g,3*_,2*_),s.setRenderTarget(r),s.render(o,va),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-i,Ws(t,m,g,3*_,2*_),s.setRenderTarget(t),s.render(o,va)}_blur(t,e,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-Xs?s-this._lodMax+Xs:0),f=4*(this._cubeSize-h);Ws(e,u,f,3*h,2*h),a.setRenderTarget(e),a.render(c,va)}};function sx(n){let t=[],e=[],i=n,s=n-Xs+1+tx;for(let r=0;r<s;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,f=6,d=3,p=new Float32Array(d*f*u),_=new Float32Array(d*f*u);for(let g=0;g<u;g++){let x=g%3*2/3-1,b=g>2?0:-1,v=[x,b,0,x+2/3,b,0,x+2/3,b+1,0,x,b,0,x+2/3,b+1,0,x,b+1,0];p.set(v,d*f*g);for(let w=0;w<f;w++){let A=h[w*2]*2-1,C=h[w*2+1]*2-1;g===0?Kn.set(1,C,A):g===1?Kn.set(-A,1,-C):g===2?Kn.set(-A,C,1):g===3?Kn.set(-1,C,-A):g===4?Kn.set(-A,-1,C):Kn.set(A,C,-1),Kn.toArray(_,(g*f+w)*d)}}let m=new oe;m.setAttribute("position",new fe(p,d)),m.setAttribute("outputDirection",new fe(_,d)),e.push(new Vt(m,null)),i>Xs&&i--}return{lodMeshes:e,sizeLods:t}}function od(n,t,e){let i=new Fe(n,t,e);return i.texture.mapping=ua,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ws(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function rx(n,t,e){return new ce({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ix,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function ax(n,t,e){return new ce({name:"SphericalGaussianBlur",defines:{SAMPLES:ex,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Xl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function ld(){return new ce({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function cd(){return new ce({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Xl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Gl=class extends Fe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Lr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Le(5,5,5),r=new ce({name:"CubemapFromEquirect",uniforms:Jn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Oe,blending:Mi});r.uniforms.tEquirect.value=e;let a=new Vt(s,r),o=e.minFilter;return e.minFilter===In&&(e.minFilter=Ze),new Zo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};function ox(n){let t=new WeakMap,e=new WeakMap,i=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Ko||d===jo)if(t.has(f)){let p=t.get(f).texture;return o(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let _=new Gl(p.height);return _.fromEquirectangularTexture(n,f),t.set(f,_),f.addEventListener("dispose",l),o(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let d=f.mapping,p=d===Ko||d===jo,_=d===Rn||d===$n;if(p||_){let m=e.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return i===null&&(i=new Vl(n)),m=p?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{let x=f.image;return p&&x&&x.height>0||_&&x&&c(x)?(i===null&&(i=new Vl(n)),m=p?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function o(f,d){return d===Ko?f.mapping=Rn:d===jo&&(f.mapping=$n),f}function c(f){let d=0,p=6;for(let _=0;_<p;_++)f[_]!==void 0&&d++;return d===p}function l(f){let d=f.target;d.removeEventListener("dispose",l);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function lx(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Xn("WebGLRenderer: "+i+" extension not supported."),s}}}function cx(n,t,e,i){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let p in f.attributes)t.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)t.update(f[d],n.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,p=u.attributes.position,_=0;if(p===void 0)return;if(d!==null){let x=d.array;_=d.version;for(let b=0,v=x.length;b<v;b+=3){let w=x[b+0],A=x[b+1],C=x[b+2];f.push(w,A,A,C,C,w)}}else{let x=p.array;_=p.version;for(let b=0,v=x.length/3-1;b<v;b+=3){let w=b+0,A=b+1,C=b+2;f.push(w,A,A,C,C,w)}}let m=new(p.count>=65535?Cr:Ar)(f,1);m.version=_;let g=r.get(u);g&&t.remove(g),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function hx(n,t,e){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){n.drawElements(i,f,r,u*a),e.update(f,i,1)}function l(u,f,d){d!==0&&(n.drawElementsInstanced(i,f,r,u*a,d),e.update(f,i,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,d);let _=0;for(let m=0;m<d;m++)_+=f[m];e.update(_,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function ux(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:$t("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function fx(n,t,e){let i=new WeakMap,s=new Ce;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(o);if(f===void 0||f.count!==u){let I=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",I)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],b=0;d===!0&&(b=1),p===!0&&(b=2),_===!0&&(b=3);let v=o.attributes.position.count*b,w=1;v>t.maxTextureSize&&(w=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let A=new Float32Array(v*w*4*u),C=new wr(A,v,w,u);C.type=wi,C.needsUpdate=!0;let S=b*4;for(let T=0;T<u;T++){let P=m[T],y=g[T],k=x[T],D=v*w*4*T;for(let z=0;z<P.count;z++){let Y=z*S;d===!0&&(s.fromBufferAttribute(P,z),A[D+Y+0]=s.x,A[D+Y+1]=s.y,A[D+Y+2]=s.z,A[D+Y+3]=0),p===!0&&(s.fromBufferAttribute(y,z),A[D+Y+4]=s.x,A[D+Y+5]=s.y,A[D+Y+6]=s.z,A[D+Y+7]=0),_===!0&&(s.fromBufferAttribute(k,z),A[D+Y+8]=s.x,A[D+Y+9]=s.y,A[D+Y+10]=s.z,A[D+Y+11]=k.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new _t(v,w)},i.set(o,f),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let p=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function dx(n,t,e,i,s){let r=new WeakMap;function a(l){let h=s.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var px={[sa]:"LINEAR_TONE_MAPPING",[ra]:"REINHARD_TONE_MAPPING",[aa]:"CINEON_TONE_MAPPING",[oa]:"ACES_FILMIC_TONE_MAPPING",[ca]:"AGX_TONE_MAPPING",[ha]:"NEUTRAL_TONE_MAPPING",[la]:"CUSTOM_TONE_MAPPING"};function mx(n,t,e,i,s,r){let a=new Fe(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new oe;l.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ee([0,2,0,0,2,0],2));let h=new ks({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Vt(l,h),f=new An(-1,1,1,-1,0,1),d=null,p=null,_=!1,m,g=null,x=[],b=!1;this.setSize=function(v,w){a.setSize(v,w),o!==null&&o.setSize(v,w),c!==null&&c.setSize(v,w);for(let A=0;A<x.length;A++){let C=x[A];C.setSize&&C.setSize(v,w)}},this.setEffects=function(v){x=v,b=x.length>0&&x[0].isRenderPass===!0;let w=a.width,A=a.height;x.length>0&&o===null&&(o=new Fe(w,A,{type:$e,depthBuffer:!1,stencilBuffer:!1}),c=new Fe(w,A,{type:$e,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<x.length;C++){let S=x[C];S.setSize&&S.setSize(w,A)}},this.begin=function(v,w){if(_||v.toneMapping===ki&&x.length===0)return!1;if(g=w,w!==null){let A=w.width,C=w.height;(a.width!==A||a.height!==C)&&this.setSize(A,C)}return b===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=ki,!0},this.hasRenderPass=function(){return b},this.end=function(v,w){v.toneMapping=m,_=!0;let A=a,C=o;for(let S=0;S<x.length;S++){let I=x[S];I.enabled!==!1&&(I.render(v,C,A,w),I.needsSwap!==!1&&(A=C,C=C===o?c:o))}if(d!==v.outputColorSpace||p!==v.toneMapping){d=v.outputColorSpace,p=v.toneMapping,h.defines={},se.getTransfer(d)===he&&(h.defines.SRGB_TRANSFER="");let S=px[p];S&&(h.defines[S]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=A.texture,v.setRenderTarget(g),v.render(u,f),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Rd=new si,Uh=new Mn(1,1),Id=new wr,Pd=new wo,Ld=new Lr,hd=[],ud=[],fd=new Float32Array(16),dd=new Float32Array(9),pd=new Float32Array(4);function Ys(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=hd[s];if(r===void 0&&(r=new Float32Array(s),hd[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function He(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ve(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ql(n,t){let e=ud[t];e===void 0&&(e=new Int32Array(t),ud[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function gx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function _x(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2fv(this.addr,t),Ve(e,t)}}function xx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;n.uniform3fv(this.addr,t),Ve(e,t)}}function vx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4fv(this.addr,t),Ve(e,t)}}function yx(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;pd.set(i),n.uniformMatrix2fv(this.addr,!1,pd),Ve(e,i)}}function bx(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;dd.set(i),n.uniformMatrix3fv(this.addr,!1,dd),Ve(e,i)}}function Sx(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;fd.set(i),n.uniformMatrix4fv(this.addr,!1,fd),Ve(e,i)}}function Mx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function wx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2iv(this.addr,t),Ve(e,t)}}function Ex(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3iv(this.addr,t),Ve(e,t)}}function Tx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4iv(this.addr,t),Ve(e,t)}}function Ax(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Cx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2uiv(this.addr,t),Ve(e,t)}}function Rx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3uiv(this.addr,t),Ve(e,t)}}function Ix(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4uiv(this.addr,t),Ve(e,t)}}function Px(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Uh.compareFunction=e.isReversedDepthBuffer()?kl:Bl,r=Uh):r=Rd,e.setTexture2D(t||r,s)}function Lx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Pd,s)}function Dx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Ld,s)}function Nx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Id,s)}function Ux(n){switch(n){case 5126:return gx;case 35664:return _x;case 35665:return xx;case 35666:return vx;case 35674:return yx;case 35675:return bx;case 35676:return Sx;case 5124:case 35670:return Mx;case 35667:case 35671:return wx;case 35668:case 35672:return Ex;case 35669:case 35673:return Tx;case 5125:return Ax;case 36294:return Cx;case 36295:return Rx;case 36296:return Ix;case 35678:case 36198:case 36298:case 36306:case 35682:return Px;case 35679:case 36299:case 36307:return Lx;case 35680:case 36300:case 36308:case 36293:return Dx;case 36289:case 36303:case 36311:case 36292:return Nx}}function Fx(n,t){n.uniform1fv(this.addr,t)}function Ox(n,t){let e=Ys(t,this.size,2);n.uniform2fv(this.addr,e)}function Bx(n,t){let e=Ys(t,this.size,3);n.uniform3fv(this.addr,e)}function kx(n,t){let e=Ys(t,this.size,4);n.uniform4fv(this.addr,e)}function zx(n,t){let e=Ys(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Hx(n,t){let e=Ys(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Vx(n,t){let e=Ys(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Gx(n,t){n.uniform1iv(this.addr,t)}function Wx(n,t){n.uniform2iv(this.addr,t)}function Xx(n,t){n.uniform3iv(this.addr,t)}function qx(n,t){n.uniform4iv(this.addr,t)}function Yx(n,t){n.uniform1uiv(this.addr,t)}function Zx(n,t){n.uniform2uiv(this.addr,t)}function $x(n,t){n.uniform3uiv(this.addr,t)}function Jx(n,t){n.uniform4uiv(this.addr,t)}function Kx(n,t,e){let i=this.cache,s=t.length,r=ql(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Uh:a=Rd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function jx(n,t,e){let i=this.cache,s=t.length,r=ql(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Pd,r[a])}function Qx(n,t,e){let i=this.cache,s=t.length,r=ql(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Ld,r[a])}function tv(n,t,e){let i=this.cache,s=t.length,r=ql(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Id,r[a])}function ev(n){switch(n){case 5126:return Fx;case 35664:return Ox;case 35665:return Bx;case 35666:return kx;case 35674:return zx;case 35675:return Hx;case 35676:return Vx;case 5124:case 35670:return Gx;case 35667:case 35671:return Wx;case 35668:case 35672:return Xx;case 35669:case 35673:return qx;case 5125:return Yx;case 36294:return Zx;case 36295:return $x;case 36296:return Jx;case 35678:case 36198:case 36298:case 36306:case 35682:return Kx;case 35679:case 36299:case 36307:return jx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return tv}}var Fh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ux(e.type)}},Oh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ev(e.type)}},Bh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Dh=/(\w+)(\])?(\[|\.)?/g;function md(n,t){n.seq.push(t),n.map[t.id]=t}function iv(n,t,e){let i=n.name,s=i.length;for(Dh.lastIndex=0;;){let r=Dh.exec(i),a=Dh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){md(e,l===void 0?new Fh(o,n,t):new Oh(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new Bh(o),md(e,u)),e=u}}}var qs=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);iv(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function gd(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var nv=37297,sv=0;function rv(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var _d=new Qt;function av(n){se._getMatrix(_d,se.workingColorSpace,n);let t=`mat3( ${_d.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(n)){case br:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return Yt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function xd(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+rv(n.getShaderSource(t),o)}else return r}function ov(n,t){let e=av(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var lv={[sa]:"Linear",[ra]:"Reinhard",[aa]:"Cineon",[oa]:"ACESFilmic",[ca]:"AgX",[ha]:"Neutral",[la]:"Custom"};function cv(n,t){let e=lv[t];return e===void 0?(Yt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Hl=new O;function hv(){se.getLuminanceCoefficients(Hl);let n=Hl.x.toFixed(4),t=Hl.y.toFixed(4),e=Hl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function uv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ba).join(`
`)}function fv(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function dv(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function ba(n){return n!==""}function vd(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function yd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var pv=/^[ \t]*#include +<([\w\d./]+)>/gm;function kh(n){return n.replace(pv,gv)}var mv=new Map;function gv(n,t){let e=ne[t];if(e===void 0){let i=mv.get(t);if(i!==void 0)e=ne[i],Yt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return kh(e)}var _v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bd(n){return n.replace(_v,xv)}function xv(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sd(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var vv={[na]:"SHADOWMAP_TYPE_PCF",[zs]:"SHADOWMAP_TYPE_VSM"};function yv(n){return vv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var bv={[Rn]:"ENVMAP_TYPE_CUBE",[$n]:"ENVMAP_TYPE_CUBE",[ua]:"ENVMAP_TYPE_CUBE_UV"};function Sv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":bv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Mv={[$n]:"ENVMAP_MODE_REFRACTION"};function wv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Mv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ev={[lh]:"ENVMAP_BLENDING_MULTIPLY",[Ff]:"ENVMAP_BLENDING_MIX",[Of]:"ENVMAP_BLENDING_ADD"};function Tv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ev[n.combine]||"ENVMAP_BLENDING_NONE"}function Av(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Cv(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=yv(e),l=Sv(e),h=wv(e),u=Tv(e),f=Av(e),d=uv(e),p=fv(r),_=s.createProgram(),m,g,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ba).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ba).join(`
`),g.length>0&&(g+=`
`)):(m=[Sd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ba).join(`
`),g=[Sd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ki?"#define TONE_MAPPING":"",e.toneMapping!==ki?ne.tonemapping_pars_fragment:"",e.toneMapping!==ki?cv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,ov("linearToOutputTexel",e.outputColorSpace),hv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ba).join(`
`)),a=kh(a),a=vd(a,e),a=yd(a,e),o=kh(o),o=vd(o,e),o=yd(o,e),a=bd(a),o=bd(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===_h?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_h?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let b=x+m+a,v=x+g+o,w=gd(s,s.VERTEX_SHADER,b),A=gd(s,s.FRAGMENT_SHADER,v);s.attachShader(_,w),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(n.debug.checkShaderErrors){let y=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(w)||"",D=s.getShaderInfoLog(A)||"",z=y.trim(),Y=k.trim(),V=D.trim(),et=!0,B=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,w,A);else{let H=xd(s,w,"vertex"),tt=xd(s,A,"fragment");$t("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+H+`
`+tt)}else z!==""?Yt("WebGLProgram: Program Info Log:",z):(Y===""||V==="")&&(B=!1);B&&(P.diagnostics={runnable:et,programLog:z,vertexShader:{log:Y,prefix:m},fragmentShader:{log:V,prefix:g}})}s.deleteShader(w),s.deleteShader(A),S=new qs(s,_),I=dv(s,_)}let S;this.getUniforms=function(){return S===void 0&&C(this),S};let I;this.getAttributes=function(){return I===void 0&&C(this),I};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(_,nv)),T},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=sv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=A,this}var Rv=0,zh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Hh(t),e.set(t,i)),i}},Hh=class{constructor(t){this.id=Rv++,this.code=t,this.usedTimes=0}};function Iv(n){return n===Ln||n===_a||n===xa}function Pv(n,t,e,i,s,r){let a=new Ls,o=new zh,c=new Set,l=[],h=new Map,u=i.logarithmicDepthBuffer,f=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return c.add(S),S===0?"uv":`uv${S}`}function _(S,I,T,P,y,k){let D=P.fog,z=y.geometry,Y=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?P.environment:null,V=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,et=t.get(S.envMap||Y,V),B=et&&et.mapping===ua?et.image.height:null,H=d[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&Yt("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let tt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ht=tt!==void 0?tt.length:0,st=0;z.morphAttributes.position!==void 0&&(st=1),z.morphAttributes.normal!==void 0&&(st=2),z.morphAttributes.color!==void 0&&(st=3);let Jt,Zt,Dt,Q;if(H){let be=tn[H];Jt=be.vertexShader,Zt=be.fragmentShader}else{Jt=S.vertexShader,Zt=S.fragmentShader;let be=o.getVertexShaderStage(S),de=o.getFragmentShaderStage(S);o.update(S,be,de),Dt=be.id,Q=de.id}let at=n.getRenderTarget(),vt=n.state.buffers.depth.getReversed(),Xt=y.isInstancedMesh===!0,Mt=y.isBatchedMesh===!0,M=!!S.map,rt=!!S.matcap,Z=!!et,U=!!S.aoMap,N=!!S.lightMap,G=!!S.bumpMap&&S.wireframe===!1,lt=!!S.normalMap,ft=!!S.displacementMap,$=!!S.emissiveMap,dt=!!S.metalnessMap,xt=!!S.roughnessMap,F=S.anisotropy>0,Pt=S.clearcoat>0,Gt=S.dispersion>0,L=S.retroreflectivity>0,E=S.iridescence>0,q=S.sheen>0,J=S.transmission>0,nt=F&&!!S.anisotropyMap,pt=Pt&&!!S.clearcoatMap,yt=Pt&&!!S.clearcoatNormalMap,ot=Pt&&!!S.clearcoatRoughnessMap,ct=E&&!!S.iridescenceMap,bt=E&&!!S.iridescenceThicknessMap,kt=q&&!!S.sheenColorMap,wt=q&&!!S.sheenRoughnessMap,St=!!S.specularMap,Ot=!!S.specularColorMap,Ht=!!S.specularIntensityMap,Kt=J&&!!S.transmissionMap,X=J&&!!S.thicknessMap,Et=!!S.gradientMap,ut=!!S.alphaMap,Tt=S.alphaTest>0,It=!!S.alphaHash,gt=!!S.extensions,Wt=ki;S.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Wt=n.toneMapping);let Bt={shaderID:H,shaderType:S.type,shaderName:S.name,vertexShader:Jt,fragmentShader:Zt,defines:S.defines,customVertexShaderID:Dt,customFragmentShaderID:Q,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Mt,batchingColor:Mt&&y._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&y.instanceColor!==null,instancingMorph:Xt&&y.morphTexture!==null,outputColorSpace:at===null?n.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:M,matcap:rt,envMap:Z,envMapMode:Z&&et.mapping,envMapCubeUVHeight:B,aoMap:U,lightMap:N,bumpMap:G,normalMap:lt,displacementMap:ft,emissiveMap:$,normalMapObjectSpace:lt&&S.normalMapType===zf,normalMapTangentSpace:lt&&S.normalMapType===Ol,packedNormalMap:lt&&S.normalMapType===Ol&&Iv(S.normalMap.format),metalnessMap:dt,roughnessMap:xt,anisotropy:F,anisotropyMap:nt,clearcoat:Pt,clearcoatMap:pt,clearcoatNormalMap:yt,clearcoatRoughnessMap:ot,dispersion:Gt,retroreflection:L,iridescence:E,iridescenceMap:ct,iridescenceThicknessMap:bt,sheen:q,sheenColorMap:kt,sheenRoughnessMap:wt,specularMap:St,specularColorMap:Ot,specularIntensityMap:Ht,transmission:J,transmissionMap:Kt,thicknessMap:X,gradientMap:Et,opaque:S.transparent===!1&&S.blending===Hs&&S.alphaToCoverage===!1,alphaMap:ut,alphaTest:Tt,alphaHash:It,combine:S.combine,mapUv:M&&p(S.map.channel),aoMapUv:U&&p(S.aoMap.channel),lightMapUv:N&&p(S.lightMap.channel),bumpMapUv:G&&p(S.bumpMap.channel),normalMapUv:lt&&p(S.normalMap.channel),displacementMapUv:ft&&p(S.displacementMap.channel),emissiveMapUv:$&&p(S.emissiveMap.channel),metalnessMapUv:dt&&p(S.metalnessMap.channel),roughnessMapUv:xt&&p(S.roughnessMap.channel),anisotropyMapUv:nt&&p(S.anisotropyMap.channel),clearcoatMapUv:pt&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:yt&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ct&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:wt&&p(S.sheenRoughnessMap.channel),specularMapUv:St&&p(S.specularMap.channel),specularColorMapUv:Ot&&p(S.specularColorMap.channel),specularIntensityMapUv:Ht&&p(S.specularIntensityMap.channel),transmissionMapUv:Kt&&p(S.transmissionMap.channel),thicknessMapUv:X&&p(S.thicknessMap.channel),alphaMapUv:ut&&p(S.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(lt||F),vertexNormals:!!z.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!z.attributes.uv&&(M||ut),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||z.attributes.normal===void 0&&lt===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:vt,skinning:y.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:st,numSunLights:I.sun.length,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numSunLightShadows:I.sunShadowMap.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:Wt,decodeVideoTexture:M&&S.map.isVideoTexture===!0&&se.getTransfer(S.map.colorSpace)===he,decodeVideoTextureEmissive:$&&S.emissiveMap.isVideoTexture===!0&&se.getTransfer(S.emissiveMap.colorSpace)===he,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===De,flipSided:S.side===Oe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:gt&&S.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&S.extensions.multiDraw===!0||Mt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Bt.vertexUv1s=c.has(1),Bt.vertexUv2s=c.has(2),Bt.vertexUv3s=c.has(3),c.clear(),Bt}function m(S){let I=[];if(S.shaderID?I.push(S.shaderID):(I.push(S.customVertexShaderID),I.push(S.customFragmentShaderID)),S.defines!==void 0)for(let T in S.defines)I.push(T),I.push(S.defines[T]);return S.isRawShaderMaterial===!1&&(g(I,S),x(I,S),I.push(n.outputColorSpace)),I.push(S.customProgramCacheKey),I.join()}function g(S,I){S.push(I.precision),S.push(I.outputColorSpace),S.push(I.envMapMode),S.push(I.envMapCubeUVHeight),S.push(I.mapUv),S.push(I.alphaMapUv),S.push(I.lightMapUv),S.push(I.aoMapUv),S.push(I.bumpMapUv),S.push(I.normalMapUv),S.push(I.displacementMapUv),S.push(I.emissiveMapUv),S.push(I.metalnessMapUv),S.push(I.roughnessMapUv),S.push(I.anisotropyMapUv),S.push(I.clearcoatMapUv),S.push(I.clearcoatNormalMapUv),S.push(I.clearcoatRoughnessMapUv),S.push(I.iridescenceMapUv),S.push(I.iridescenceThicknessMapUv),S.push(I.sheenColorMapUv),S.push(I.sheenRoughnessMapUv),S.push(I.specularMapUv),S.push(I.specularColorMapUv),S.push(I.specularIntensityMapUv),S.push(I.transmissionMapUv),S.push(I.thicknessMapUv),S.push(I.combine),S.push(I.fogExp2),S.push(I.sizeAttenuation),S.push(I.morphTargetsCount),S.push(I.morphAttributeCount),S.push(I.numSunLights),S.push(I.numDirLights),S.push(I.numPointLights),S.push(I.numSpotLights),S.push(I.numSpotLightMaps),S.push(I.numHemiLights),S.push(I.numRectAreaLights),S.push(I.numSunLightShadows),S.push(I.numDirLightShadows),S.push(I.numPointLightShadows),S.push(I.numSpotLightShadows),S.push(I.numSpotLightShadowsWithMaps),S.push(I.numLightProbes),S.push(I.shadowMapType),S.push(I.toneMapping),S.push(I.numClippingPlanes),S.push(I.numClipIntersection),S.push(I.depthPacking)}function x(S,I){a.disableAll(),I.instancing&&a.enable(0),I.instancingColor&&a.enable(1),I.instancingMorph&&a.enable(2),I.matcap&&a.enable(3),I.envMap&&a.enable(4),I.normalMapObjectSpace&&a.enable(5),I.normalMapTangentSpace&&a.enable(6),I.clearcoat&&a.enable(7),I.iridescence&&a.enable(8),I.alphaTest&&a.enable(9),I.vertexColors&&a.enable(10),I.vertexAlphas&&a.enable(11),I.vertexUv1s&&a.enable(12),I.vertexUv2s&&a.enable(13),I.vertexUv3s&&a.enable(14),I.vertexTangents&&a.enable(15),I.anisotropy&&a.enable(16),I.alphaHash&&a.enable(17),I.batching&&a.enable(18),I.dispersion&&a.enable(19),I.retroreflection&&a.enable(24),I.batchingColor&&a.enable(20),I.gradientMap&&a.enable(21),I.packedNormalMap&&a.enable(22),I.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),I.fog&&a.enable(0),I.useFog&&a.enable(1),I.flatShading&&a.enable(2),I.logarithmicDepthBuffer&&a.enable(3),I.reversedDepthBuffer&&a.enable(4),I.skinning&&a.enable(5),I.morphTargets&&a.enable(6),I.morphNormals&&a.enable(7),I.morphColors&&a.enable(8),I.premultipliedAlpha&&a.enable(9),I.shadowMapEnabled&&a.enable(10),I.doubleSided&&a.enable(11),I.flipSided&&a.enable(12),I.useDepthPacking&&a.enable(13),I.dithering&&a.enable(14),I.transmission&&a.enable(15),I.sheen&&a.enable(16),I.opaque&&a.enable(17),I.pointsUvs&&a.enable(18),I.decodeVideoTexture&&a.enable(19),I.decodeVideoTextureEmissive&&a.enable(20),I.alphaToCoverage&&a.enable(21),I.numLightProbeGrids>0&&a.enable(22),I.hasPositionAttribute&&a.enable(23),S.push(a.mask)}function b(S){let I=d[S.type],T;if(I){let P=tn[I];T=fn.clone(P.uniforms)}else T=S.uniforms;return T}function v(S,I){let T=h.get(I);return T!==void 0?++T.usedTimes:(T=new Cv(n,I,S,s),l.push(T),h.set(I,T)),T}function w(S){if(--S.usedTimes===0){let I=l.indexOf(S);l[I]=l[l.length-1],l.pop(),h.delete(S.cacheKey),S.destroy()}}function A(S){o.remove(S)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:b,acquireProgram:v,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:C}}function Lv(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Dv(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Md(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function wd(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,p,_,m,g){let x=n[t];return x===void 0?(x={id:f.id,object:f,geometry:d,material:p,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:g},n[t]=x):(x.id=f.id,x.object=f,x.geometry=d,x.material=p,x.materialVariant=a(f),x.groupOrder=_,x.renderOrder=f.renderOrder,x.z=m,x.group=g),t++,x}function c(f,d,p,_,m,g,x){x.reversedDepth===!0&&(m=-m);let b=o(f,d,p,_,m,g);p.transmission>0?i.push(b):p.transparent===!0?s.push(b):e.push(b)}function l(f,d,p,_,m,g){let x=o(f,d,p,_,m,g);p.transmission>0?i.unshift(x):p.transparent===!0?s.unshift(x):e.unshift(x)}function h(f,d){e.length>1&&e.sort(f||Dv),i.length>1&&i.sort(d||Md),s.length>1&&s.sort(d||Md)}function u(){for(let f=t,d=n.length;f<d;f++){let p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function Nv(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new wd,n.set(i,[a])):s>=r.length?(a=new wd,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Uv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new mt};break;case"SpotLight":e={position:new O,direction:new O,color:new mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new mt,groundColor:new mt};break;case"RectAreaLight":e={color:new mt,position:new O,halfWidth:new O,halfHeight:new O};break}return n[t.id]=e,e}}}function Fv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Ov=0;function Bv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function kv(n){let t=new Uv,e=Fv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);let s=new O,r=new te,a=new te;function o(l){let h=0,u=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let d=0,p=0,_=0,m=0,g=0,x=0,b=0,v=0,w=0,A=0,C=0,S=0,I=0,T=0;l.sort(Bv);for(let y=0,k=l.length;y<k;y++){let D=l[y],z=D.color,Y=D.intensity,V=D.distance,et=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ln?et=D.shadow.map.texture:et=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=z.r*Y,u+=z.g*Y,f+=z.b*Y;else if(D.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(D.sh.coefficients[B],Y);T++}else if(D.isSunLight){let B=t.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let H=D.shadow,tt=e.get(D);tt.shadowIntensity=H.intensity,tt.shadowBias=H.bias,tt.shadowNormalBias=H.normalBias,tt.shadowRadius=H.radius,tt.shadowMapSize.copy(H.mapSize).multiply(H.getFrameExtents()),i.sunShadow[p]=tt,i.sunShadowMap[p]=et;let ht=H.getViewportCount();for(let st=0;st<ht;st++)i.sunShadowMatrix[_+st]=H.getMatrix(st),i.sunShadowCascade[_+st]=H._cascadeData[st];_+=ht,p++}i.sun[d]=B,d++}else if(D.isDirectionalLight){let B=t.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let H=D.shadow,tt=e.get(D);tt.shadowIntensity=H.intensity,tt.shadowBias=H.bias,tt.shadowNormalBias=H.normalBias,tt.shadowRadius=H.radius,tt.shadowMapSize=H.mapSize,i.directionalShadow[m]=tt,i.directionalShadowMap[m]=et,i.directionalShadowMatrix[m]=D.shadow.matrix,w++}i.directional[m]=B,m++}else if(D.isSpotLight){let B=t.get(D);B.position.setFromMatrixPosition(D.matrixWorld),B.color.copy(z).multiplyScalar(Y),B.distance=V,B.coneCos=Math.cos(D.angle),B.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),B.decay=D.decay,i.spot[x]=B;let H=D.shadow;if(D.map&&(i.spotLightMap[S]=D.map,S++,H.updateMatrices(D),D.castShadow&&I++),i.spotLightMatrix[x]=H.matrix,D.castShadow){let tt=e.get(D);tt.shadowIntensity=H.intensity,tt.shadowBias=H.bias,tt.shadowNormalBias=H.normalBias,tt.shadowRadius=H.radius,tt.shadowMapSize=H.mapSize,i.spotShadow[x]=tt,i.spotShadowMap[x]=et,C++}x++}else if(D.isRectAreaLight){let B=t.get(D);B.color.copy(z).multiplyScalar(Y),B.halfWidth.set(D.width*.5,0,0),B.halfHeight.set(0,D.height*.5,0),i.rectArea[b]=B,b++}else if(D.isPointLight){let B=t.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),B.distance=D.distance,B.decay=D.decay,D.castShadow){let H=D.shadow,tt=e.get(D);tt.shadowIntensity=H.intensity,tt.shadowBias=H.bias,tt.shadowNormalBias=H.normalBias,tt.shadowRadius=H.radius,tt.shadowMapSize=H.mapSize,tt.shadowCameraNear=H.camera.near,tt.shadowCameraFar=H.camera.far,i.pointShadow[g]=tt,i.pointShadowMap[g]=et,i.pointShadowMatrix[g]=D.shadow.matrix,A++}i.point[g]=B,g++}else if(D.isHemisphereLight){let B=t.get(D);B.skyColor.copy(D.color).multiplyScalar(Y),B.groundColor.copy(D.groundColor).multiplyScalar(Y),i.hemi[v]=B,v++}}b>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let P=i.hash;(P.sunLength!==d||P.directionalLength!==m||P.pointLength!==g||P.spotLength!==x||P.rectAreaLength!==b||P.hemiLength!==v||P.numSunShadows!==p||P.numDirectionalShadows!==w||P.numPointShadows!==A||P.numSpotShadows!==C||P.numSpotMaps!==S||P.numLightProbes!==T)&&(i.sun.length=d,i.directional.length=m,i.spot.length=x,i.rectArea.length=b,i.point.length=g,i.hemi.length=v,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+S-I,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=T,P.sunLength=d,P.directionalLength=m,P.pointLength=g,P.spotLength=x,P.rectAreaLength=b,P.hemiLength=v,P.numSunShadows=p,P.numDirectionalShadows=w,P.numPointShadows=A,P.numSpotShadows=C,P.numSpotMaps=S,P.numLightProbes=T,i.version=Ov++)}function c(l,h){let u=0,f=0,d=0,p=0,_=0,m=0,g=h.matrixWorldInverse;for(let x=0,b=l.length;x<b;x++){let v=l[x];if(v.isSunLight){let w=i.sun[u];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(g),u++}else if(v.isDirectionalLight){let w=i.directional[f];w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),f++}else if(v.isSpotLight){let w=i.spot[p];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),p++}else if(v.isRectAreaLight){let w=i.rectArea[_];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),w.halfWidth.set(v.width*.5,0,0),w.halfHeight.set(0,v.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){let w=i.point[d];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){let w=i.hemi[m];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(g),m++}}}return{setup:o,setupView:c,state:i}}function Ed(n){let t=new kv(n),e=[],i=[],s=[];function r(f){u.camera=f,e.length=0,i.length=0,s.length=0}function a(f){e.push(f)}function o(f){i.push(f)}function c(f){s.push(f)}function l(){t.setup(e)}function h(f){t.setupView(e,f)}let u={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function zv(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Ed(n),t.set(s,[o])):r>=a.length?(o=new Ed(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Hv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Gv=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],Wv=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Td=new te,ya=new O,Nh=new O;function Xv(n,t,e){let i=new Ns,s=new _t,r=new _t,a=new Ce,o=new Uo,c=new Fo,l={},h=e.maxTextureSize,u={[Cn]:Oe,[Oe]:Cn,[De]:De},f=new ce({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:Hv,fragmentShader:Vv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new oe;p.setAttribute("position",new fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Vt(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=na;let g=this.type;this.render=function(A,C,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===_f&&(Yt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=na);let I=n.getRenderTarget(),T=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),y=n.state;y.setBlending(Mi),y.buffers.depth.getReversed()===!0?y.buffers.color.setClear(0,0,0,0):y.buffers.color.setClear(1,1,1,1),y.buffers.depth.setTest(!0),y.setScissorTest(!1);let k=g!==this.type;k&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(z=>z.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,z=A.length;D<z;D++){let Y=A[D],V=Y.shadow;if(V===void 0){Yt("WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let et=V.getFrameExtents();s.multiply(et),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/et.x),s.x=r.x*et.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/et.y),s.y=r.y*et.y,V.mapSize.y=r.y));let B=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=B,V.map===null||k===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===zs){if(Y.isPointLight){Yt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Fe(s.x,s.y,{format:Ln,type:$e,minFilter:Ze,magFilter:Ze,generateMipmaps:!1}),V.map.texture.name=Y.name+".shadowMap",V.map.depthTexture=new Mn(s.x,s.y,wi),V.map.depthTexture.name=Y.name+".shadowMapDepth",V.map.depthTexture.format=Zi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=We,V.map.depthTexture.magFilter=We}else Y.isPointLight?(V.map=new Gl(s.x),V.map.depthTexture=new Co(s.x,zi)):(V.map=new Fe(s.x,s.y),V.map.depthTexture=new Mn(s.x,s.y,zi)),V.map.depthTexture.name=Y.name+".shadowMap",V.map.depthTexture.format=Zi,this.type===na?(V.map.depthTexture.compareFunction=B?kl:Bl,V.map.depthTexture.minFilter=Ze,V.map.depthTexture.magFilter=Ze):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=We,V.map.depthTexture.magFilter=We);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let H=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();Y.isPointLight!==!0&&V.updateMatrices(Y,S);for(let tt=0;tt<H;tt++){let ht=V.getCamera(tt);if(Y.isPointLight){let st=V.camera,Jt=V.matrix,Zt=Y.distance||st.far;Zt!==st.far&&(st.far=Zt,st.updateProjectionMatrix()),ya.setFromMatrixPosition(Y.matrixWorld),st.position.copy(ya),Nh.copy(st.position),Nh.add(Gv[tt]),st.up.copy(Wv[tt]),st.lookAt(Nh),st.updateMatrixWorld(),Jt.makeTranslation(-ya.x,-ya.y,-ya.z),Td.multiplyMatrices(st.projectionMatrix,st.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Td,st.coordinateSystem,st.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,tt),n.clear();else{tt===0&&(n.setRenderTarget(V.map),n.clear());let st=V.getViewport(tt);a.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),y.viewport(a)}i=V.getFrustum(tt),v(C,S,ht,Y,this.type)}V.isPointLightShadow!==!0&&this.type===zs&&x(V,S),V.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(I,T,P)};function x(A,C){let S=t.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null?A.mapPass=new Fe(s.x,s.y,{format:Ln,type:$e}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(C,null,S,f,_,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(C,null,S,d,_,null)}function b(A,C,S,I){let T=null,P=S.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)T=P;else if(T=S.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let y=T.uuid,k=C.uuid,D=l[y];D===void 0&&(D={},l[y]=D);let z=D[k];z===void 0&&(z=T.clone(),D[k]=z,C.addEventListener("dispose",w)),T=z}if(T.visible=C.visible,T.wireframe=C.wireframe,I===zs?T.side=C.shadowSide!==null?C.shadowSide:C.side:T.side=C.shadowSide!==null?C.shadowSide:u[C.side],T.alphaMap=C.alphaMap,T.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,T.map=C.map,T.clipShadows=C.clipShadows,T.clippingPlanes=C.clippingPlanes,T.clipIntersection=C.clipIntersection,T.displacementMap=C.displacementMap,T.displacementScale=C.displacementScale,T.displacementBias=C.displacementBias,T.wireframeLinewidth=C.wireframeLinewidth,T.linewidth=C.linewidth,S.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let y=n.properties.get(T);y.light=S}return T}function v(A,C,S,I,T){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===zs)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,A.matrixWorld);let k=t.update(A),D=A.material;if(Array.isArray(D)){let z=k.groups;for(let Y=0,V=z.length;Y<V;Y++){let et=z[Y],B=D[et.materialIndex];if(B&&B.visible){let H=b(A,B,I,T);A.onBeforeShadow(n,A,C,S,k,H,et),n.renderBufferDirect(S,null,k,H,A,et),A.onAfterShadow(n,A,C,S,k,H,et)}}}else if(D.visible){let z=b(A,D,I,T);A.onBeforeShadow(n,A,C,S,k,z,null),n.renderBufferDirect(S,null,k,z,A,null),A.onAfterShadow(n,A,C,S,k,z,null)}}let y=A.children;for(let k=0,D=y.length;k<D;k++)v(y[k],C,S,I,T)}function w(A){A.target.removeEventListener("dispose",w);for(let S in l){let I=l[S],T=A.target.uuid;T in I&&(I[T].dispose(),delete I[T])}}}function qv(n,t){function e(){let X=!1,Et=new Ce,ut=null,Tt=new Ce(0,0,0,0);return{setMask:function(It){ut!==It&&!X&&(n.colorMask(It,It,It,It),ut=It)},setLocked:function(It){X=It},setClear:function(It,gt,Wt,Bt,be){be===!0&&(It*=Bt,gt*=Bt,Wt*=Bt),Et.set(It,gt,Wt,Bt),Tt.equals(Et)===!1&&(n.clearColor(It,gt,Wt,Bt),Tt.copy(Et))},reset:function(){X=!1,ut=null,Tt.set(-1,0,0,0)}}}function i(){let X=!1,Et=!1,ut=null,Tt=null,It=null;return{setReversed:function(gt){if(Et!==gt){let Wt=t.get("EXT_clip_control");gt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT),Et=gt;let Bt=It;It=null,this.setClear(Bt)}},getReversed:function(){return Et},setTest:function(gt){gt?at(n.DEPTH_TEST):vt(n.DEPTH_TEST)},setMask:function(gt){ut!==gt&&!X&&(n.depthMask(gt),ut=gt)},setFunc:function(gt){if(Et&&(gt=Kf[gt]),Tt!==gt){switch(gt){case fo:n.depthFunc(n.NEVER);break;case po:n.depthFunc(n.ALWAYS);break;case mo:n.depthFunc(n.LESS);break;case Ts:n.depthFunc(n.LEQUAL);break;case go:n.depthFunc(n.EQUAL);break;case _o:n.depthFunc(n.GEQUAL);break;case xo:n.depthFunc(n.GREATER);break;case vo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Tt=gt}},setLocked:function(gt){X=gt},setClear:function(gt){It!==gt&&(It=gt,Et&&(gt=1-gt),n.clearDepth(gt))},reset:function(){X=!1,ut=null,Tt=null,It=null,Et=!1}}}function s(){let X=!1,Et=null,ut=null,Tt=null,It=null,gt=null,Wt=null,Bt=null,be=null;return{setTest:function(de){X||(de?at(n.STENCIL_TEST):vt(n.STENCIL_TEST))},setMask:function(de){Et!==de&&!X&&(n.stencilMask(de),Et=de)},setFunc:function(de,Ii,Vi){(ut!==de||Tt!==Ii||It!==Vi)&&(n.stencilFunc(de,Ii,Vi),ut=de,Tt=Ii,It=Vi)},setOp:function(de,Ii,Vi){(gt!==de||Wt!==Ii||Bt!==Vi)&&(n.stencilOp(de,Ii,Vi),gt=de,Wt=Ii,Bt=Vi)},setLocked:function(de){X=de},setClear:function(de){be!==de&&(n.clearStencil(de),be=de)},reset:function(){X=!1,Et=null,ut=null,Tt=null,It=null,gt=null,Wt=null,Bt=null,be=null}}}let r=new e,a=new i,o=new s,c=new WeakMap,l=new WeakMap,h={},u={},f={},d=new WeakMap,p=[],_=null,m=!1,g=null,x=null,b=null,v=null,w=null,A=null,C=null,S=new mt(0,0,0),I=0,T=!1,P=null,y=null,k=null,D=null,z=null,Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,et=0,B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(B)[1]),V=et>=1):B.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),V=et>=2);let H=null,tt={},ht=n.getParameter(n.SCISSOR_BOX),st=n.getParameter(n.VIEWPORT),Jt=new Ce().fromArray(ht),Zt=new Ce().fromArray(st);function Dt(X,Et,ut,Tt){let It=new Uint8Array(4),gt=n.createTexture();n.bindTexture(X,gt),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Wt=0;Wt<ut;Wt++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(Et,0,n.RGBA,1,1,Tt,0,n.RGBA,n.UNSIGNED_BYTE,It):n.texImage2D(Et+Wt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,It);return gt}let Q={};Q[n.TEXTURE_2D]=Dt(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=Dt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=Dt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=Dt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),at(n.DEPTH_TEST),a.setFunc(Ts),G(!1),lt(nh),at(n.CULL_FACE),U(Mi);function at(X){h[X]!==!0&&(n.enable(X),h[X]=!0)}function vt(X){h[X]!==!1&&(n.disable(X),h[X]=!1)}function Xt(X,Et){return f[X]!==Et?(n.bindFramebuffer(X,Et),f[X]=Et,X===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Et),X===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Et),!0):!1}function Mt(X,Et){let ut=p,Tt=!1;if(X){ut=d.get(Et),ut===void 0&&(ut=[],d.set(Et,ut));let It=X.textures;if(ut.length!==It.length||ut[0]!==n.COLOR_ATTACHMENT0){for(let gt=0,Wt=It.length;gt<Wt;gt++)ut[gt]=n.COLOR_ATTACHMENT0+gt;ut.length=It.length,Tt=!0}}else ut[0]!==n.BACK&&(ut[0]=n.BACK,Tt=!0);Tt&&n.drawBuffers(ut)}function M(X){return _!==X?(n.useProgram(X),_=X,!0):!1}let rt={[Zn]:n.FUNC_ADD,[vf]:n.FUNC_SUBTRACT,[yf]:n.FUNC_REVERSE_SUBTRACT};rt[bf]=n.MIN,rt[Sf]=n.MAX;let Z={[Mf]:n.ZERO,[wf]:n.ONE,[Ef]:n.SRC_COLOR,[ah]:n.SRC_ALPHA,[Pf]:n.SRC_ALPHA_SATURATE,[Rf]:n.DST_COLOR,[Af]:n.DST_ALPHA,[Tf]:n.ONE_MINUS_SRC_COLOR,[oh]:n.ONE_MINUS_SRC_ALPHA,[If]:n.ONE_MINUS_DST_COLOR,[Cf]:n.ONE_MINUS_DST_ALPHA,[Lf]:n.CONSTANT_COLOR,[Df]:n.ONE_MINUS_CONSTANT_COLOR,[Nf]:n.CONSTANT_ALPHA,[Uf]:n.ONE_MINUS_CONSTANT_ALPHA};function U(X,Et,ut,Tt,It,gt,Wt,Bt,be,de){if(X===Mi){m===!0&&(vt(n.BLEND),m=!1);return}if(m===!1&&(at(n.BLEND),m=!0),X!==xf){if(X!==g||de!==T){if((x!==Zn||w!==Zn)&&(n.blendEquation(n.FUNC_ADD),x=Zn,w=Zn),de)switch(X){case Hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ue:n.blendFunc(n.ONE,n.ONE);break;case sh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:$t("WebGLState: Invalid blending: ",X);break}else switch(X){case Hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ue:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case sh:$t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rh:$t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$t("WebGLState: Invalid blending: ",X);break}b=null,v=null,A=null,C=null,S.set(0,0,0),I=0,g=X,T=de}return}It=It||Et,gt=gt||ut,Wt=Wt||Tt,(Et!==x||It!==w)&&(n.blendEquationSeparate(rt[Et],rt[It]),x=Et,w=It),(ut!==b||Tt!==v||gt!==A||Wt!==C)&&(n.blendFuncSeparate(Z[ut],Z[Tt],Z[gt],Z[Wt]),b=ut,v=Tt,A=gt,C=Wt),(Bt.equals(S)===!1||be!==I)&&(n.blendColor(Bt.r,Bt.g,Bt.b,be),S.copy(Bt),I=be),g=X,T=!1}function N(X,Et){X.side===De?vt(n.CULL_FACE):at(n.CULL_FACE);let ut=X.side===Oe;Et&&(ut=!ut),G(ut),X.blending===Hs&&X.transparent===!1?U(Mi):U(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);let Tt=X.stencilWrite;o.setTest(Tt),Tt&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),$(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?at(n.SAMPLE_ALPHA_TO_COVERAGE):vt(n.SAMPLE_ALPHA_TO_COVERAGE)}function G(X){P!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),P=X)}function lt(X){X!==mf?(at(n.CULL_FACE),X!==y&&(X===nh?n.cullFace(n.BACK):X===gf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):vt(n.CULL_FACE),y=X}function ft(X){X!==k&&(V&&n.lineWidth(X),k=X)}function $(X,Et,ut){X?(at(n.POLYGON_OFFSET_FILL),(D!==Et||z!==ut)&&(D=Et,z=ut,a.getReversed()&&(Et=-Et),n.polygonOffset(Et,ut))):vt(n.POLYGON_OFFSET_FILL)}function dt(X){X?at(n.SCISSOR_TEST):vt(n.SCISSOR_TEST)}function xt(X){X===void 0&&(X=n.TEXTURE0+Y-1),H!==X&&(n.activeTexture(X),H=X)}function F(X,Et,ut){ut===void 0&&(H===null?ut=n.TEXTURE0+Y-1:ut=H);let Tt=tt[ut];Tt===void 0&&(Tt={type:void 0,texture:void 0},tt[ut]=Tt),(Tt.type!==X||Tt.texture!==Et)&&(H!==ut&&(n.activeTexture(ut),H=ut),n.bindTexture(X,Et||Q[X]),Tt.type=X,Tt.texture=Et)}function Pt(){let X=tt[H];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Gt(){try{n.compressedTexImage2D(...arguments)}catch(X){$t("WebGLState:",X)}}function L(){try{n.compressedTexImage3D(...arguments)}catch(X){$t("WebGLState:",X)}}function E(){try{n.texSubImage2D(...arguments)}catch(X){$t("WebGLState:",X)}}function q(){try{n.texSubImage3D(...arguments)}catch(X){$t("WebGLState:",X)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(X){$t("WebGLState:",X)}}function nt(){try{n.compressedTexSubImage3D(...arguments)}catch(X){$t("WebGLState:",X)}}function pt(){try{n.texStorage2D(...arguments)}catch(X){$t("WebGLState:",X)}}function yt(){try{n.texStorage3D(...arguments)}catch(X){$t("WebGLState:",X)}}function ot(){try{n.texImage2D(...arguments)}catch(X){$t("WebGLState:",X)}}function ct(){try{n.texImage3D(...arguments)}catch(X){$t("WebGLState:",X)}}function bt(X){return u[X]!==void 0?u[X]:n.getParameter(X)}function kt(X,Et){u[X]!==Et&&(n.pixelStorei(X,Et),u[X]=Et)}function wt(X){Jt.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),Jt.copy(X))}function St(X){Zt.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),Zt.copy(X))}function Ot(X,Et){let ut=l.get(Et);ut===void 0&&(ut=new WeakMap,l.set(Et,ut));let Tt=ut.get(X);Tt===void 0&&(Tt=n.getUniformBlockIndex(Et,X.name),ut.set(X,Tt))}function Ht(X,Et){let Tt=l.get(Et).get(X);c.get(Et)!==Tt&&(n.uniformBlockBinding(Et,Tt,X.__bindingPointIndex),c.set(Et,Tt))}function Kt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},u={},H=null,tt={},f={},d=new WeakMap,p=[],_=null,m=!1,g=null,x=null,b=null,v=null,w=null,A=null,C=null,S=new mt(0,0,0),I=0,T=!1,P=null,y=null,k=null,D=null,z=null,Jt.set(0,0,n.canvas.width,n.canvas.height),Zt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:at,disable:vt,bindFramebuffer:Xt,drawBuffers:Mt,useProgram:M,setBlending:U,setMaterial:N,setFlipSided:G,setCullFace:lt,setLineWidth:ft,setPolygonOffset:$,setScissorTest:dt,activeTexture:xt,bindTexture:F,unbindTexture:Pt,compressedTexImage2D:Gt,compressedTexImage3D:L,texImage2D:ot,texImage3D:ct,pixelStorei:kt,getParameter:bt,updateUBOMapping:Ot,uniformBlockBinding:Ht,texStorage2D:pt,texStorage3D:yt,texSubImage2D:E,texSubImage3D:q,compressedTexSubImage2D:J,compressedTexSubImage3D:nt,scissor:wt,viewport:St,reset:Kt}}function Yv(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new _t,h=new WeakMap,u=new Set,f,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,E){return p?new OffscreenCanvas(L,E):Sr("canvas")}function m(L,E,q){let J=1,nt=Gt(L);if((nt.width>q||nt.height>q)&&(J=q/Math.max(nt.width,nt.height)),J<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let pt=Math.floor(J*nt.width),yt=Math.floor(J*nt.height);f===void 0&&(f=_(pt,yt));let ot=E?_(pt,yt):f;return ot.width=pt,ot.height=yt,ot.getContext("2d").drawImage(L,0,0,pt,yt),Yt("WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+pt+"x"+yt+")."),ot}else return"data"in L&&Yt("WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),L;return L}function g(L){return L.generateMipmaps}function x(L){n.generateMipmap(L)}function b(L){return L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?n.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(L,E,q,J,nt,pt=!1){if(L!==null){if(n[L]!==void 0)return n[L];Yt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let yt;J&&(yt=t.get("EXT_texture_norm16"),yt||Yt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ot=E;if(E===n.RED&&(q===n.FLOAT&&(ot=n.R32F),q===n.HALF_FLOAT&&(ot=n.R16F),q===n.UNSIGNED_BYTE&&(ot=n.R8),q===n.UNSIGNED_SHORT&&yt&&(ot=yt.R16_EXT),q===n.SHORT&&yt&&(ot=yt.R16_SNORM_EXT)),E===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.R8UI),q===n.UNSIGNED_SHORT&&(ot=n.R16UI),q===n.UNSIGNED_INT&&(ot=n.R32UI),q===n.BYTE&&(ot=n.R8I),q===n.SHORT&&(ot=n.R16I),q===n.INT&&(ot=n.R32I)),E===n.RG&&(q===n.FLOAT&&(ot=n.RG32F),q===n.HALF_FLOAT&&(ot=n.RG16F),q===n.UNSIGNED_BYTE&&(ot=n.RG8),q===n.UNSIGNED_SHORT&&yt&&(ot=yt.RG16_EXT),q===n.SHORT&&yt&&(ot=yt.RG16_SNORM_EXT)),E===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RG8UI),q===n.UNSIGNED_SHORT&&(ot=n.RG16UI),q===n.UNSIGNED_INT&&(ot=n.RG32UI),q===n.BYTE&&(ot=n.RG8I),q===n.SHORT&&(ot=n.RG16I),q===n.INT&&(ot=n.RG32I)),E===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RGB8UI),q===n.UNSIGNED_SHORT&&(ot=n.RGB16UI),q===n.UNSIGNED_INT&&(ot=n.RGB32UI),q===n.BYTE&&(ot=n.RGB8I),q===n.SHORT&&(ot=n.RGB16I),q===n.INT&&(ot=n.RGB32I)),E===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(ot=n.RGBA16UI),q===n.UNSIGNED_INT&&(ot=n.RGBA32UI),q===n.BYTE&&(ot=n.RGBA8I),q===n.SHORT&&(ot=n.RGBA16I),q===n.INT&&(ot=n.RGBA32I)),E===n.RGB&&(q===n.UNSIGNED_SHORT&&yt&&(ot=yt.RGB16_EXT),q===n.SHORT&&yt&&(ot=yt.RGB16_SNORM_EXT),q===n.UNSIGNED_INT_5_9_9_9_REV&&(ot=n.RGB9_E5),q===n.UNSIGNED_INT_10F_11F_11F_REV&&(ot=n.R11F_G11F_B10F)),E===n.RGBA){let ct=pt?br:se.getTransfer(nt);q===n.FLOAT&&(ot=n.RGBA32F),q===n.HALF_FLOAT&&(ot=n.RGBA16F),q===n.UNSIGNED_BYTE&&(ot=ct===he?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT&&yt&&(ot=yt.RGBA16_EXT),q===n.SHORT&&yt&&(ot=yt.RGBA16_SNORM_EXT),q===n.UNSIGNED_SHORT_4_4_4_4&&(ot=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(ot=n.RGB5_A1)}return(ot===n.R16F||ot===n.R32F||ot===n.RG16F||ot===n.RG32F||ot===n.RGBA16F||ot===n.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function w(L,E){let q;return L?E===null||E===zi||E===Gs?q=n.DEPTH24_STENCIL8:E===wi?q=n.DEPTH32F_STENCIL8:E===Vs&&(q=n.DEPTH24_STENCIL8,Yt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===zi||E===Gs?q=n.DEPTH_COMPONENT24:E===wi?q=n.DEPTH_COMPONENT32F:E===Vs&&(q=n.DEPTH_COMPONENT16),q}function A(L,E){return g(L)===!0||L.isFramebufferTexture&&L.minFilter!==We&&L.minFilter!==Ze?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function C(L){let E=L.target;E.removeEventListener("dispose",C),I(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&u.delete(E)}function S(L){let E=L.target;E.removeEventListener("dispose",S),P(E)}function I(L){let E=i.get(L);if(E.__webglInit===void 0)return;let q=L.source,J=d.get(q);if(J){let nt=J[E.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&T(L),Object.keys(J).length===0&&d.delete(q)}i.remove(L)}function T(L){let E=i.get(L);n.deleteTexture(E.__webglTexture);let q=L.source,J=d.get(q);delete J[E.__cacheKey],a.memory.textures--}function P(L){let E=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let nt=0;nt<E.__webglFramebuffer[J].length;nt++)n.deleteFramebuffer(E.__webglFramebuffer[J][nt]);else n.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)n.deleteFramebuffer(E.__webglFramebuffer[J]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let q=L.textures;for(let J=0,nt=q.length;J<nt;J++){let pt=i.get(q[J]);pt.__webglTexture&&(n.deleteTexture(pt.__webglTexture),a.memory.textures--),i.remove(q[J])}i.remove(L)}let y=0;function k(){y=0}function D(){return y}function z(L){y=L}function Y(){let L=y;return L>=s.maxTextures&&Yt("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),y+=1,L}function V(L){let E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function et(L,E){let q=i.get(L);if(L.isVideoTexture&&F(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&q.__version!==L.version){let J=L.image;if(J===null)Yt("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Yt("WebGLRenderer: Texture marked for update but image is incomplete");else{vt(q,L,E);return}}else L.isExternalTexture&&(q.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+E)}function B(L,E){let q=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){vt(q,L,E);return}else L.isExternalTexture&&(q.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+E)}function H(L,E){let q=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){vt(q,L,E);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+E)}function tt(L,E){let q=i.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&q.__version!==L.version){Xt(q,L,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+E)}let ht={[As]:n.REPEAT,[qi]:n.CLAMP_TO_EDGE,[yo]:n.MIRRORED_REPEAT},st={[We]:n.NEAREST,[Bf]:n.NEAREST_MIPMAP_NEAREST,[fa]:n.NEAREST_MIPMAP_LINEAR,[Ze]:n.LINEAR,[Qo]:n.LINEAR_MIPMAP_NEAREST,[In]:n.LINEAR_MIPMAP_LINEAR},Jt={[Vf]:n.NEVER,[Yf]:n.ALWAYS,[Gf]:n.LESS,[Bl]:n.LEQUAL,[Wf]:n.EQUAL,[kl]:n.GEQUAL,[Xf]:n.GREATER,[qf]:n.NOTEQUAL};function Zt(L,E){if(E.type===wi&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Ze||E.magFilter===Qo||E.magFilter===fa||E.magFilter===In||E.minFilter===Ze||E.minFilter===Qo||E.minFilter===fa||E.minFilter===In)&&Yt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(L,n.TEXTURE_WRAP_S,ht[E.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,ht[E.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,ht[E.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,st[E.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,st[E.minFilter]),E.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,Jt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===We||E.minFilter!==fa&&E.minFilter!==In||E.type===wi&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(L,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Dt(L,E){let q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",C));let J=E.source,nt=d.get(J);nt===void 0&&(nt={},d.set(J,nt));let pt=V(E);if(pt!==L.__cacheKey){nt[pt]===void 0&&(nt[pt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,q=!0),nt[pt].usedTimes++;let yt=nt[L.__cacheKey];yt!==void 0&&(nt[L.__cacheKey].usedTimes--,yt.usedTimes===0&&T(E)),L.__cacheKey=pt,L.__webglTexture=nt[pt].texture}return q}function Q(L,E,q){return Math.floor(Math.floor(L/q)/E)}function at(L,E,q,J){let pt=L.updateRanges;if(pt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,q,J,E.data);else{pt.sort((kt,wt)=>kt.start-wt.start);let yt=0;for(let kt=1;kt<pt.length;kt++){let wt=pt[yt],St=pt[kt],Ot=wt.start+wt.count,Ht=Q(St.start,E.width,4),Kt=Q(wt.start,E.width,4);St.start<=Ot+1&&Ht===Kt&&Q(St.start+St.count-1,E.width,4)===Ht?wt.count=Math.max(wt.count,St.start+St.count-wt.start):(++yt,pt[yt]=St)}pt.length=yt+1;let ot=e.getParameter(n.UNPACK_ROW_LENGTH),ct=e.getParameter(n.UNPACK_SKIP_PIXELS),bt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let kt=0,wt=pt.length;kt<wt;kt++){let St=pt[kt],Ot=Math.floor(St.start/4),Ht=Math.ceil(St.count/4),Kt=Ot%E.width,X=Math.floor(Ot/E.width),Et=Ht,ut=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Kt),e.pixelStorei(n.UNPACK_SKIP_ROWS,X),e.texSubImage2D(n.TEXTURE_2D,0,Kt,X,Et,ut,q,J,E.data)}L.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,ot),e.pixelStorei(n.UNPACK_SKIP_PIXELS,ct),e.pixelStorei(n.UNPACK_SKIP_ROWS,bt)}}function vt(L,E,q){let J=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=n.TEXTURE_3D);let nt=Dt(L,E),pt=E.source;e.bindTexture(J,L.__webglTexture,n.TEXTURE0+q);let yt=i.get(pt);if(pt.version!==yt.__version||nt===!0){if(e.activeTexture(n.TEXTURE0+q),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let ut=se.getPrimaries(se.workingColorSpace),Tt=E.colorSpace===un?null:se.getPrimaries(E.colorSpace),It=E.colorSpace===un||ut===Tt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,It)}e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment);let ct=m(E.image,!1,s.maxTextureSize);ct=Pt(E,ct);let bt=r.convert(E.format,E.colorSpace),kt=r.convert(E.type),wt=v(E.internalFormat,bt,kt,E.normalized,E.colorSpace,E.isVideoTexture);Zt(J,E);let St,Ot=E.mipmaps,Ht=E.isVideoTexture!==!0,Kt=yt.__version===void 0||nt===!0,X=pt.dataReady,Et=A(E,ct);if(E.isDepthTexture)wt=w(E.format===Pn,E.type),Kt&&(Ht?e.texStorage2D(n.TEXTURE_2D,1,wt,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,wt,ct.width,ct.height,0,bt,kt,null));else if(E.isDataTexture)if(Ot.length>0){Ht&&Kt&&e.texStorage2D(n.TEXTURE_2D,Et,wt,Ot[0].width,Ot[0].height);for(let ut=0,Tt=Ot.length;ut<Tt;ut++)St=Ot[ut],Ht?X&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,St.width,St.height,bt,kt,St.data):e.texImage2D(n.TEXTURE_2D,ut,wt,St.width,St.height,0,bt,kt,St.data);E.generateMipmaps=!1}else Ht?(Kt&&e.texStorage2D(n.TEXTURE_2D,Et,wt,ct.width,ct.height),X&&at(E,ct,bt,kt)):e.texImage2D(n.TEXTURE_2D,0,wt,ct.width,ct.height,0,bt,kt,ct.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ht&&Kt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Et,wt,Ot[0].width,Ot[0].height,ct.depth);for(let ut=0,Tt=Ot.length;ut<Tt;ut++)if(St=Ot[ut],E.format!==Ei)if(bt!==null)if(Ht){if(X)if(E.layerUpdates.size>0){let It=Mh(St.width,St.height,E.format,E.type);for(let gt of E.layerUpdates){let Wt=St.data.subarray(gt*It/St.data.BYTES_PER_ELEMENT,(gt+1)*It/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,gt,St.width,St.height,1,bt,Wt)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,St.width,St.height,ct.depth,bt,St.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ut,wt,St.width,St.height,ct.depth,0,St.data,0,0);else Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?X&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,St.width,St.height,ct.depth,bt,kt,St.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ut,wt,St.width,St.height,ct.depth,0,bt,kt,St.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Ht&&Kt&&e.texStorage2D(n.TEXTURE_2D,Et,wt,Ot[0].width,Ot[0].height);for(let ut=0,Tt=Ot.length;ut<Tt;ut++)St=Ot[ut],E.format!==Ei?bt!==null?Ht?X&&e.compressedTexSubImage2D(n.TEXTURE_2D,ut,0,0,St.width,St.height,bt,St.data):e.compressedTexImage2D(n.TEXTURE_2D,ut,wt,St.width,St.height,0,St.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?X&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,St.width,St.height,bt,kt,St.data):e.texImage2D(n.TEXTURE_2D,ut,wt,St.width,St.height,0,bt,kt,St.data)}else if(E.isDataArrayTexture)if(Ht){if(Kt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Et,wt,ct.width,ct.height,ct.depth),X)if(E.layerUpdates.size>0){let ut=Mh(ct.width,ct.height,E.format,E.type);for(let Tt of E.layerUpdates){let It=ct.data.subarray(Tt*ut/ct.data.BYTES_PER_ELEMENT,(Tt+1)*ut/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Tt,ct.width,ct.height,1,bt,kt,It)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,bt,kt,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,wt,ct.width,ct.height,ct.depth,0,bt,kt,ct.data);else if(E.isData3DTexture)Ht?(Kt&&e.texStorage3D(n.TEXTURE_3D,Et,wt,ct.width,ct.height,ct.depth),X&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,bt,kt,ct.data)):e.texImage3D(n.TEXTURE_3D,0,wt,ct.width,ct.height,ct.depth,0,bt,kt,ct.data);else if(E.isFramebufferTexture){if(Kt)if(Ht)e.texStorage2D(n.TEXTURE_2D,Et,wt,ct.width,ct.height);else{let ut=ct.width,Tt=ct.height;for(let It=0;It<Et;It++)e.texImage2D(n.TEXTURE_2D,It,wt,ut,Tt,0,bt,kt,null),ut>>=1,Tt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in n){let ut=n.canvas;if(ut.hasAttribute("layoutsubtree")||ut.setAttribute("layoutsubtree","true"),ct.parentNode!==ut){ut.appendChild(ct),u.add(E),ut.onpaint=Tt=>{let It=Tt.changedElements;for(let gt of u)It.includes(gt.image)&&(gt.needsUpdate=!0)},ut.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ct);else{let It=n.RGBA,gt=n.RGBA,Wt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,It,gt,Wt,ct)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ot.length>0){if(Ht&&Kt){let ut=Gt(Ot[0]);e.texStorage2D(n.TEXTURE_2D,Et,wt,ut.width,ut.height)}for(let ut=0,Tt=Ot.length;ut<Tt;ut++)St=Ot[ut],Ht?X&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,bt,kt,St):e.texImage2D(n.TEXTURE_2D,ut,wt,bt,kt,St);E.generateMipmaps=!1}else if(Ht){if(Kt){let ut=Gt(ct);e.texStorage2D(n.TEXTURE_2D,Et,wt,ut.width,ut.height)}X&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,bt,kt,ct)}else e.texImage2D(n.TEXTURE_2D,0,wt,bt,kt,ct);g(E)&&x(J),yt.__version=pt.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function Xt(L,E,q){if(E.image.length!==6)return;let J=Dt(L,E),nt=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+q);let pt=i.get(nt);if(nt.version!==pt.__version||J===!0){e.activeTexture(n.TEXTURE0+q);let yt=se.getPrimaries(se.workingColorSpace),ot=E.colorSpace===un?null:se.getPrimaries(E.colorSpace),ct=E.colorSpace===un||yt===ot?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let bt=E.isCompressedTexture||E.image[0].isCompressedTexture,kt=E.image[0]&&E.image[0].isDataTexture,wt=[];for(let gt=0;gt<6;gt++)!bt&&!kt?wt[gt]=m(E.image[gt],!0,s.maxCubemapSize):wt[gt]=kt?E.image[gt].image:E.image[gt],wt[gt]=Pt(E,wt[gt]);let St=wt[0],Ot=r.convert(E.format,E.colorSpace),Ht=r.convert(E.type),Kt=v(E.internalFormat,Ot,Ht,E.normalized,E.colorSpace),X=E.isVideoTexture!==!0,Et=pt.__version===void 0||J===!0,ut=nt.dataReady,Tt=A(E,St);Zt(n.TEXTURE_CUBE_MAP,E);let It;if(bt){X&&Et&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,Kt,St.width,St.height);for(let gt=0;gt<6;gt++){It=wt[gt].mipmaps;for(let Wt=0;Wt<It.length;Wt++){let Bt=It[Wt];E.format!==Ei?Ot!==null?X?ut&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Wt,0,0,Bt.width,Bt.height,Ot,Bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Wt,Kt,Bt.width,Bt.height,0,Bt.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Wt,0,0,Bt.width,Bt.height,Ot,Ht,Bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Wt,Kt,Bt.width,Bt.height,0,Ot,Ht,Bt.data)}}}else{if(It=E.mipmaps,X&&Et){It.length>0&&Tt++;let gt=Gt(wt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,Kt,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(kt){X?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,wt[gt].width,wt[gt].height,Ot,Ht,wt[gt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,Kt,wt[gt].width,wt[gt].height,0,Ot,Ht,wt[gt].data);for(let Wt=0;Wt<It.length;Wt++){let be=It[Wt].image[gt].image;X?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Wt+1,0,0,be.width,be.height,Ot,Ht,be.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Wt+1,Kt,be.width,be.height,0,Ot,Ht,be.data)}}else{X?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Ot,Ht,wt[gt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,Kt,Ot,Ht,wt[gt]);for(let Wt=0;Wt<It.length;Wt++){let Bt=It[Wt];X?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Wt+1,0,0,Ot,Ht,Bt.image[gt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Wt+1,Kt,Ot,Ht,Bt.image[gt])}}}g(E)&&x(n.TEXTURE_CUBE_MAP),pt.__version=nt.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function Mt(L,E,q,J,nt,pt){let yt=r.convert(q.format,q.colorSpace),ot=r.convert(q.type),ct=v(q.internalFormat,yt,ot,q.normalized,q.colorSpace),bt=i.get(E),kt=i.get(q);if(kt.__renderTarget=E,!bt.__hasExternalTextures){let wt=Math.max(1,E.width>>pt),St=Math.max(1,E.height>>pt);nt===n.TEXTURE_3D||nt===n.TEXTURE_2D_ARRAY?e.texImage3D(nt,pt,ct,wt,St,E.depth,0,yt,ot,null):e.texImage2D(nt,pt,ct,wt,St,0,yt,ot,null)}e.bindFramebuffer(n.FRAMEBUFFER,L),xt(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,nt,kt.__webglTexture,0,dt(E)):(nt===n.TEXTURE_2D||nt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,nt,kt.__webglTexture,pt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function M(L,E,q){if(n.bindRenderbuffer(n.RENDERBUFFER,L),E.depthBuffer){let J=E.depthTexture,nt=J&&J.isDepthTexture?J.type:null,pt=w(E.stencilBuffer,nt),yt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;xt(E)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt(E),pt,E.width,E.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt(E),pt,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,pt,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,yt,n.RENDERBUFFER,L)}else{let J=E.textures;for(let nt=0;nt<J.length;nt++){let pt=J[nt],yt=r.convert(pt.format,pt.colorSpace),ot=r.convert(pt.type),ct=v(pt.internalFormat,yt,ot,pt.normalized,pt.colorSpace);xt(E)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt(E),ct,E.width,E.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt(E),ct,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,ct,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function rt(L,E,q){let J=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let nt=i.get(E.depthTexture);if(nt.__renderTarget=E,(!nt.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),J){if(nt.__webglInit===void 0&&(nt.__webglInit=!0,E.depthTexture.addEventListener("dispose",C)),nt.__webglTexture===void 0){nt.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,nt.__webglTexture),Zt(n.TEXTURE_CUBE_MAP,E.depthTexture);let bt=r.convert(E.depthTexture.format),kt=r.convert(E.depthTexture.type),wt;E.depthTexture.format===Zi?wt=n.DEPTH_COMPONENT24:E.depthTexture.format===Pn&&(wt=n.DEPTH24_STENCIL8);for(let St=0;St<6;St++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,wt,E.width,E.height,0,bt,kt,null)}}else et(E.depthTexture,0);let pt=nt.__webglTexture,yt=dt(E),ot=J?n.TEXTURE_CUBE_MAP_POSITIVE_X+q:n.TEXTURE_2D,ct=E.depthTexture.format===Pn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(E.depthTexture.format===Zi)xt(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ct,ot,pt,0,yt):n.framebufferTexture2D(n.FRAMEBUFFER,ct,ot,pt,0);else if(E.depthTexture.format===Pn)xt(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ct,ot,pt,0,yt):n.framebufferTexture2D(n.FRAMEBUFFER,ct,ot,pt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Z(L){let E=i.get(L),q=L.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==L.depthTexture){let J=L.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){let nt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",nt)};J.addEventListener("dispose",nt),E.__depthDisposeCallback=nt}E.__boundDepthTexture=J}if(L.depthTexture&&!E.__autoAllocateDepthBuffer)if(q)for(let J=0;J<6;J++)rt(E.__webglFramebuffer[J],L,J);else{let J=L.texture.mipmaps;J&&J.length>0?rt(E.__webglFramebuffer[0],L,0):rt(E.__webglFramebuffer,L,0)}else if(q){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=n.createRenderbuffer(),M(E.__webglDepthbuffer[J],L,!1);else{let nt=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=E.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,pt),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,pt)}}else{let J=L.texture.mipmaps;if(J&&J.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),M(E.__webglDepthbuffer,L,!1);else{let nt=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,pt),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,pt)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function U(L,E,q){let J=i.get(L);E!==void 0&&Mt(J.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&Z(L)}function N(L){let E=L.texture,q=i.get(L),J=i.get(E);L.addEventListener("dispose",S);let nt=L.textures,pt=L.isWebGLCubeRenderTarget===!0,yt=nt.length>1;if(yt||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=E.version,a.memory.textures++),pt){q.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer[ot]=[];for(let ct=0;ct<E.mipmaps.length;ct++)q.__webglFramebuffer[ot][ct]=n.createFramebuffer()}else q.__webglFramebuffer[ot]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer=[];for(let ot=0;ot<E.mipmaps.length;ot++)q.__webglFramebuffer[ot]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(yt)for(let ot=0,ct=nt.length;ot<ct;ot++){let bt=i.get(nt[ot]);bt.__webglTexture===void 0&&(bt.__webglTexture=n.createTexture(),a.memory.textures++)}if(L.samples>0&&xt(L)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ot=0;ot<nt.length;ot++){let ct=nt[ot];q.__webglColorRenderbuffer[ot]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[ot]);let bt=r.convert(ct.format,ct.colorSpace),kt=r.convert(ct.type),wt=v(ct.internalFormat,bt,kt,ct.normalized,ct.colorSpace,L.isXRRenderTarget===!0),St=dt(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,St,wt,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.RENDERBUFFER,q.__webglColorRenderbuffer[ot])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),M(q.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(pt){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),Zt(n.TEXTURE_CUBE_MAP,E);for(let ot=0;ot<6;ot++)if(E.mipmaps&&E.mipmaps.length>0)for(let ct=0;ct<E.mipmaps.length;ct++)Mt(q.__webglFramebuffer[ot][ct],L,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ct);else Mt(q.__webglFramebuffer[ot],L,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);g(E)&&x(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let ot=0,ct=nt.length;ot<ct;ot++){let bt=nt[ot],kt=i.get(bt),wt=n.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(wt=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(wt,kt.__webglTexture),Zt(wt,bt),Mt(q.__webglFramebuffer,L,bt,n.COLOR_ATTACHMENT0+ot,wt,0),g(bt)&&x(wt)}e.unbindTexture()}else{let ot=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ot=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ot,J.__webglTexture),Zt(ot,E),E.mipmaps&&E.mipmaps.length>0)for(let ct=0;ct<E.mipmaps.length;ct++)Mt(q.__webglFramebuffer[ct],L,E,n.COLOR_ATTACHMENT0,ot,ct);else Mt(q.__webglFramebuffer,L,E,n.COLOR_ATTACHMENT0,ot,0);g(E)&&x(ot),e.unbindTexture()}L.depthBuffer&&Z(L)}function G(L){let E=L.textures;for(let q=0,J=E.length;q<J;q++){let nt=E[q];if(g(nt)){let pt=b(L),yt=i.get(nt).__webglTexture;e.bindTexture(pt,yt),x(pt),e.unbindTexture()}}}let lt=[],ft=[];function $(L){if(L.samples>0){if(xt(L)===!1){let E=L.textures,q=L.width,J=L.height,nt=n.COLOR_BUFFER_BIT,pt=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,yt=i.get(L),ot=E.length>1;if(ot)for(let bt=0;bt<E.length;bt++)e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer);let ct=L.texture.mipmaps;ct&&ct.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let bt=0;bt<E.length;bt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(nt|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(nt|=n.STENCIL_BUFFER_BIT)),ot){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,yt.__webglColorRenderbuffer[bt]);let kt=i.get(E[bt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,kt,0)}n.blitFramebuffer(0,0,q,J,0,0,q,J,nt,n.NEAREST),c===!0&&(lt.length=0,ft.length=0,lt.push(n.COLOR_ATTACHMENT0+bt),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(lt.push(pt),ft.push(pt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ft)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ot)for(let bt=0;bt<E.length;bt++){e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,yt.__webglColorRenderbuffer[bt]);let kt=i.get(E[bt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,kt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){let E=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function dt(L){return Math.min(s.maxSamples,L.samples)}function xt(L){let E=i.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function F(L){let E=a.render.frame;h.get(L)!==E&&(h.set(L,E),L.update())}function Pt(L,E){let q=L.colorSpace,J=L.format,nt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||q!==yr&&q!==un&&(se.getTransfer(q)===he?(J!==Ei||nt!==hi)&&Yt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$t("WebGLTextures: Unsupported texture color space:",q)),E}function Gt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=Y,this.resetTextureUnits=k,this.getTextureUnits=D,this.setTextureUnits=z,this.setTexture2D=et,this.setTexture2DArray=B,this.setTexture3D=H,this.setTextureCube=tt,this.rebindTextures=U,this.setupRenderTarget=N,this.updateRenderTargetMipmap=G,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=xt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Zv(n,t){function e(i,s=un){let r,a=se.getTransfer(s);if(i===hi)return n.UNSIGNED_BYTE;if(i===el)return n.UNSIGNED_SHORT_4_4_4_4;if(i===il)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===dh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===hh)return n.BYTE;if(i===uh)return n.SHORT;if(i===Vs)return n.UNSIGNED_SHORT;if(i===tl)return n.INT;if(i===zi)return n.UNSIGNED_INT;if(i===wi)return n.FLOAT;if(i===$e)return n.HALF_FLOAT;if(i===ph)return n.ALPHA;if(i===mh)return n.RGB;if(i===Ei)return n.RGBA;if(i===Zi)return n.DEPTH_COMPONENT;if(i===Pn)return n.DEPTH_STENCIL;if(i===nl)return n.RED;if(i===sl)return n.RED_INTEGER;if(i===Ln)return n.RG;if(i===rl)return n.RG_INTEGER;if(i===al)return n.RGBA_INTEGER;if(i===da||i===pa||i===ma||i===ga)if(a===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===da)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===da)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===pa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ol||i===ll||i===cl||i===hl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ol)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ll)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===cl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===hl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ul||i===fl||i===dl||i===pl||i===ml||i===_a||i===gl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ul||i===fl)return a===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===dl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===pl)return r.COMPRESSED_R11_EAC;if(i===ml)return r.COMPRESSED_SIGNED_R11_EAC;if(i===_a)return r.COMPRESSED_RG11_EAC;if(i===gl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===_l||i===xl||i===vl||i===yl||i===bl||i===Sl||i===Ml||i===wl||i===El||i===Tl||i===Al||i===Cl||i===Rl||i===Il)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===_l)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===vl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===yl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Sl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ml)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===wl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===El)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Tl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Al)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Cl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Rl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Il)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pl||i===Ll||i===Dl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Pl)return a===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ll)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Dl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Nl||i===Ul||i===xa||i===Fl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Nl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ul)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Gs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var $v=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Vh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Dr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ce({vertexShader:$v,fragmentShader:Jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Vt(new ci(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Gh=class extends $i{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,p=null,_=typeof XRWebGLBinding<"u",m=new Vh,g={},x=e.getContextAttributes(),b=null,v=null,w=[],A=[],C=new _t,S=null,I=null,T=new ti;T.viewport=new Ce;let P=new ti;P.viewport=new Ce;let y=[T,P],k=new $o,D=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let at=w[Q];return at===void 0&&(at=new Ds,w[Q]=at),at.getTargetRaySpace()},this.getControllerGrip=function(Q){let at=w[Q];return at===void 0&&(at=new Ds,w[Q]=at),at.getGripSpace()},this.getHand=function(Q){let at=w[Q];return at===void 0&&(at=new Ds,w[Q]=at),at.getHandSpace()};function Y(Q){let at=A.indexOf(Q.inputSource);if(at===-1)return;let vt=w[at];vt!==void 0&&(vt.update(Q.inputSource,Q.frame,l||a),vt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function V(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",et);for(let Q=0;Q<w.length;Q++){let at=A[Q];at!==null&&(A[Q]=null,w[Q].disconnect(at))}D=null,z=null,m.reset();for(let Q in g)delete g[Q];if(t.setRenderTarget(b),d=null,f=null,u=null,s=null,v=null,Dt.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(C.width,C.height,!1),I!==null){let Q=I.camera;Q.fov=I.fov,Q.zoom=I.zoom,Q.updateProjectionMatrix(),I=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&Yt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Yt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",V),s.addEventListener("inputsourceschange",et),x.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,Xt=null,Mt=null;x.depth&&(Mt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=x.stencil?Pn:Zi,Xt=x.stencil?Gs:zi);let M={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(M),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new Fe(f.textureWidth,f.textureHeight,{format:Ei,type:hi,depthTexture:new Mn(f.textureWidth,f.textureHeight,Xt,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let vt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Fe(d.framebufferWidth,d.framebufferHeight,{format:Ei,type:hi,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Dt.setContext(s),Dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function et(Q){for(let at=0;at<Q.removed.length;at++){let vt=Q.removed[at],Xt=A.indexOf(vt);Xt>=0&&(A[Xt]=null,w[Xt].disconnect(vt))}for(let at=0;at<Q.added.length;at++){let vt=Q.added[at],Xt=A.indexOf(vt);if(Xt===-1){for(let M=0;M<w.length;M++)if(M>=A.length){A.push(vt),Xt=M;break}else if(A[M]===null){A[M]=vt,Xt=M;break}if(Xt===-1)break}let Mt=w[Xt];Mt&&Mt.connect(vt)}}let B=new O,H=new O;function tt(Q,at,vt){B.setFromMatrixPosition(at.matrixWorld),H.setFromMatrixPosition(vt.matrixWorld);let Xt=B.distanceTo(H),Mt=at.projectionMatrix.elements,M=vt.projectionMatrix.elements,rt=Mt[14]/(Mt[10]-1),Z=Mt[14]/(Mt[10]+1),U=(Mt[9]+1)/Mt[5],N=(Mt[9]-1)/Mt[5],G=(Mt[8]-1)/Mt[0],lt=(M[8]+1)/M[0],ft=rt*G,$=rt*lt,dt=Xt/(-G+lt),xt=dt*-G;if(at.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(xt),Q.translateZ(dt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Mt[10]===-1)Q.projectionMatrix.copy(at.projectionMatrix),Q.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let F=rt+dt,Pt=Z+dt,Gt=ft-xt,L=$+(Xt-xt),E=U*Z/Pt*F,q=N*Z/Pt*F;Q.projectionMatrix.makePerspective(Gt,L,E,q,F,Pt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ht(Q,at){at===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(at.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let at=Q.near,vt=Q.far;m.texture!==null&&(m.depthNear>0&&(at=m.depthNear),m.depthFar>0&&(vt=m.depthFar)),k.near=P.near=T.near=at,k.far=P.far=T.far=vt,(D!==k.near||z!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),D=k.near,z=k.far),k.layers.mask=Q.layers.mask|6,T.layers.mask=k.layers.mask&-5,P.layers.mask=k.layers.mask&-3;let Xt=Q.parent,Mt=k.cameras;ht(k,Xt);for(let M=0;M<Mt.length;M++)ht(Mt[M],Xt);Mt.length===2?tt(k,T,P):k.projectionMatrix.copy(T.projectionMatrix),I===null&&Q.isPerspectiveCamera&&(I={camera:Q,fov:Q.fov,zoom:Q.zoom}),st(Q,k,Xt)};function st(Q,at,vt){vt===null?Q.matrix.copy(at.matrixWorld):(Q.matrix.copy(vt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(at.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(at.projectionMatrix),Q.projectionMatrixInverse.copy(at.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Is*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Q){c=Q,f!==null&&(f.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(Q){return g[Q]};let Jt=null;function Zt(Q,at){if(h=at.getViewerPose(l||a),p=at,h!==null){let vt=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Xt=!1;vt.length!==k.cameras.length&&(k.cameras.length=0,Xt=!0);for(let Z=0;Z<vt.length;Z++){let U=vt[Z],N=null;if(d!==null)N=d.getViewport(U);else{let lt=u.getViewSubImage(f,U);N=lt.viewport,Z===0&&(t.setRenderTargetTextures(v,lt.colorTexture,lt.depthStencilTexture),t.setRenderTarget(v))}let G=y[Z];G===void 0&&(G=new ti,G.layers.enable(Z),G.viewport=new Ce,y[Z]=G),G.matrix.fromArray(U.transform.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale),G.projectionMatrix.fromArray(U.projectionMatrix),G.projectionMatrixInverse.copy(G.projectionMatrix).invert(),G.viewport.set(N.x,N.y,N.width,N.height),Z===0&&(k.matrix.copy(G.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Xt===!0&&k.cameras.push(G)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=i.getBinding();let Z=u.getDepthInformation(vt[0]);Z&&Z.isValid&&Z.texture&&m.init(Z,s.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),u=i.getBinding();for(let Z=0;Z<vt.length;Z++){let U=vt[Z].camera;if(U){let N=g[U];N||(N=new Dr,g[U]=N);let G=u.getCameraImage(U);N.sourceTexture=G}}}}for(let vt=0;vt<w.length;vt++){let Xt=A[vt],Mt=w[vt];Xt!==null&&Mt!==void 0&&Mt.update(Xt,at,l||a)}Jt&&Jt(Q,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),p=null}let Dt=new Ad;Dt.setAnimationLoop(Zt),this.setAnimationLoop=function(Q){Jt=Q},this.dispose=function(){}}},Kv=new te,Dd=new Qt;Dd.set(-1,0,0,0,1,0,0,0,1);function jv(n,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,yh(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,x,b,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,v)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?c(m,g,x,b):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Oe&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Oe&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let x=t.get(g),b=x.envMap,v=x.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(Kv.makeRotationFromEuler(v)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Dd),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,x,b){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*x,m.scale.value=b*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,x){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Oe&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){let x=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Qv(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,w){let A=w.program;i.uniformBlockBinding(v,A)}function l(v,w){let A=s[v.id];A===void 0&&(m(v),A=h(v),s[v.id]=A,v.addEventListener("dispose",x));let C=w.program;i.updateUBOMapping(v,C);let S=t.render.frame;r[v.id]!==S&&(f(v),r[v.id]=S)}function h(v){let w=u();v.__bindingPointIndex=w;let A=n.createBuffer(),C=v.__size,S=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,C,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,A),A}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return $t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let w=s[v.id],A=v.uniforms,C=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let S=0,I=A.length;S<I;S++){let T=A[S];if(Array.isArray(T))for(let P=0,y=T.length;P<y;P++)d(T[P],S,P,C);else d(T,S,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(v,w,A,C){if(_(v,w,A,C)===!0){let S=v.__offset,I=v.value;if(Array.isArray(I)){let T=0;for(let P=0;P<I.length;P++){let y=I[P],k=g(y);p(y,v.__data,T),typeof y!="number"&&typeof y!="boolean"&&!y.isMatrix3&&!ArrayBuffer.isView(y)&&(T+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(I,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,v.__data)}}function p(v,w,A){typeof v=="number"||typeof v=="boolean"?w[0]=v:v.isMatrix3?(w[0]=v.elements[0],w[1]=v.elements[1],w[2]=v.elements[2],w[3]=0,w[4]=v.elements[3],w[5]=v.elements[4],w[6]=v.elements[5],w[7]=0,w[8]=v.elements[6],w[9]=v.elements[7],w[10]=v.elements[8],w[11]=0):ArrayBuffer.isView(v)?w.set(new v.constructor(v.buffer,v.byteOffset,w.length)):v.toArray(w,A)}function _(v,w,A,C){let S=v.value,I=w+"_"+A;if(C[I]===void 0)return typeof S=="number"||typeof S=="boolean"?C[I]=S:ArrayBuffer.isView(S)?C[I]=S.slice():C[I]=S.clone(),!0;{let T=C[I];if(typeof S=="number"||typeof S=="boolean"){if(T!==S)return C[I]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(T.equals(S)===!1)return T.copy(S),!0}}return!1}function m(v){let w=v.uniforms,A=0,C=16;for(let I=0,T=w.length;I<T;I++){let P=Array.isArray(w[I])?w[I]:[w[I]];for(let y=0,k=P.length;y<k;y++){let D=P[y],z=Array.isArray(D.value)?D.value:[D.value];for(let Y=0,V=z.length;Y<V;Y++){let et=z[Y],B=g(et),H=A%C,tt=H%B.boundary,ht=H+tt;A+=tt,ht!==0&&C-ht<B.storage&&(A+=C-ht),D.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=A,A+=B.storage}}}let S=A%C;return S>0&&(A+=C-S),v.__size=A,v.__cache={},this}function g(v){let w={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?Yt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(w.boundary=16,w.storage=v.byteLength):Yt("WebGLRenderer: Unsupported uniform value type.",v),w}function x(v){let w=v.target;w.removeEventListener("dispose",x);let A=a.indexOf(w.__bindingPointIndex);a.splice(A,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function b(){for(let v in s)n.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:c,update:l,dispose:b}}var ty=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Qi=null;function ey(){return Qi===null&&(Qi=new Ir(ty,16,16,Ln,$e),Qi.name="DFG_LUT",Qi.minFilter=Ze,Qi.magFilter=Ze,Qi.wrapS=qi,Qi.wrapT=qi,Qi.generateMipmaps=!1,Qi.needsUpdate=!0),Qi}var Wl=class{constructor(t={}){let{canvas:e=Zf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=hi}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let _=d,m=new Set([al,rl,sl]),g=new Set([hi,zi,Vs,Gs,el,il]),x=new Uint32Array(4),b=new Int32Array(4),v=new O,w=null,A=null,C=[],S=[],I=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ki,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,P=!1,y=null,k=null,D=null,z=null;this._outputColorSpace=Ae;let Y=0,V=0,et=null,B=-1,H=null,tt=new Ce,ht=new Ce,st=null,Jt=new mt(0),Zt=0,Dt=e.width,Q=e.height,at=1,vt=null,Xt=null,Mt=new Ce(0,0,Dt,Q),M=new Ce(0,0,Dt,Q),rt=!1,Z=new Ns,U=!1,N=!1,G=new te,lt=new O,ft=new Ce,$={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},dt=!1;function xt(){return et===null?at:1}let F=i;function Pt(R,W){return e.getContext(R,W)}let Gt,L,E,q,J,nt,pt,yt,ot,ct,bt,kt,wt,St,Ot,Ht,Kt,X,Et,ut,Tt,It,gt;try{let R={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",be,!1),e.addEventListener("webglcontextrestored",de,!1),e.addEventListener("webglcontextcreationerror",Ii,!1),F===null){let W="webgl2";if(F=Pt(W,R),F===null)throw Pt(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Wt()}catch(R){throw e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",Ii,!1),$t("WebGLRenderer: "+R.message),R}function Wt(){Gt=new lx(F),Gt.init(),Tt=new Zv(F,Gt),L=new j_(F,Gt,t,Tt),E=new qv(F,Gt),L.reversedDepthBuffer&&f&&E.buffers.depth.setReversed(!0),k=F.createFramebuffer(),D=F.createFramebuffer(),z=F.createFramebuffer(),q=new ux(F),J=new Lv,nt=new Yv(F,Gt,E,J,L,Tt,q),pt=new ox(T),yt=new dg(F),It=new J_(F,yt),ot=new cx(F,yt,q,It),ct=new dx(F,ot,yt,It,q),X=new fx(F,L,nt),Ot=new Q_(J),bt=new Pv(T,pt,Gt,L,It,Ot),kt=new jv(T,J),wt=new Nv,St=new zv(Gt),Kt=new $_(T,pt,E,ct,p,c),Ht=new Xv(T,ct,L),gt=new Qv(F,q,L,E),Et=new K_(F,Gt,q),ut=new hx(F,Gt,q),q.programs=bt.programs,T.capabilities=L,T.extensions=Gt,T.properties=J,T.renderLists=wt,T.shadowMap=Ht,T.state=E,T.info=q}_!==hi&&(I=new mx(_,e.width,e.height,o,s,r));let Bt=new Gh(T,F);this.xr=Bt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let R=Gt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Gt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return at},this.setPixelRatio=function(R){R!==void 0&&(at=R,this.setSize(Dt,Q,!1))},this.getSize=function(R){return R.set(Dt,Q)},this.setSize=function(R,W,it=!0){if(Bt.isPresenting){Yt("WebGLRenderer: Can't change size while VR device is presenting.");return}Dt=R,Q=W,e.width=Math.floor(R*at),e.height=Math.floor(W*at),it===!0&&(e.style.width=R+"px",e.style.height=W+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(Dt*at,Q*at).floor()},this.setDrawingBufferSize=function(R,W,it){Dt=R,Q=W,at=it,e.width=Math.floor(R*it),e.height=Math.floor(W*it),this.setViewport(0,0,R,W)},this.setEffects=function(R){if(_===hi){$t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let W=0;W<R.length;W++)if(R[W].isOutputPass===!0){Yt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(tt)},this.getViewport=function(R){return R.copy(Mt)},this.setViewport=function(R,W,it,K){R.isVector4?Mt.set(R.x,R.y,R.z,R.w):Mt.set(R,W,it,K),E.viewport(tt.copy(Mt).multiplyScalar(at).round())},this.getScissor=function(R){return R.copy(M)},this.setScissor=function(R,W,it,K){R.isVector4?M.set(R.x,R.y,R.z,R.w):M.set(R,W,it,K),E.scissor(ht.copy(M).multiplyScalar(at).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(R){E.setScissorTest(rt=R)},this.setOpaqueSort=function(R){vt=R},this.setTransparentSort=function(R){Xt=R},this.getClearColor=function(R){return R.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor(...arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha(...arguments)},this.clear=function(R=!0,W=!0,it=!0){let K=0;if(R){let j=!1;if(et!==null){let Rt=et.texture.format;j=m.has(Rt)}if(j){let Rt=et.texture.type,Nt=g.has(Rt),Ct=Kt.getClearColor(),Ut=Kt.getClearAlpha(),zt=Ct.r,ie=Ct.g,ae=Ct.b;Nt?(x[0]=zt,x[1]=ie,x[2]=ae,x[3]=Ut,F.clearBufferuiv(F.COLOR,0,x)):(b[0]=zt,b[1]=ie,b[2]=ae,b[3]=Ut,F.clearBufferiv(F.COLOR,0,b))}else K|=F.COLOR_BUFFER_BIT}W&&(K|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),it&&(K|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&F.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),y=R},this.dispose=function(){e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",Ii,!1),Kt.dispose(),wt.dispose(),St.dispose(),J.dispose(),pt.dispose(),ct.dispose(),It.dispose(),gt.dispose(),bt.dispose(),Bt.dispose(),Bt.removeEventListener("sessionstart",_u),Bt.removeEventListener("sessionend",xu),zn.stop()};function be(R){R.preventDefault(),Mr("WebGLRenderer: Context Lost."),P=!0}function de(){Mr("WebGLRenderer: Context Restored."),P=!1;let R=q.autoReset,W=Ht.enabled,it=Ht.autoUpdate,K=Ht.needsUpdate,j=Ht.type;Wt(),q.autoReset=R,Ht.enabled=W,Ht.autoUpdate=it,Ht.needsUpdate=K,Ht.type=j}function Ii(R){$t("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Vi(R){let W=R.target;W.removeEventListener("dispose",Vi),Cp(W)}function Cp(R){Rp(R),J.remove(R)}function Rp(R){let W=J.get(R).programs;W!==void 0&&(W.forEach(function(it){bt.releaseProgram(it)}),R.isShaderMaterial&&bt.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,it,K,j,Rt){W===null&&(W=$);let Nt=j.isMesh&&j.matrixWorld.determinantAffine()<0,Ct=Lp(R,W,it,K,j);E.setMaterial(K,Nt);let Ut=it.index,zt=1;if(K.wireframe===!0){if(Ut=ot.getWireframeAttribute(it),Ut===void 0)return;zt=2}let ie=it.drawRange,ae=it.attributes.position,Ft=ie.start*zt,pe=(ie.start+ie.count)*zt;Rt!==null&&(Ft=Math.max(Ft,Rt.start*zt),pe=Math.min(pe,(Rt.start+Rt.count)*zt)),Ut!==null?(Ft=Math.max(Ft,0),pe=Math.min(pe,Ut.count)):ae!=null&&(Ft=Math.max(Ft,0),pe=Math.min(pe,ae.count));let Ne=pe-Ft;if(Ne<0||Ne===1/0)return;It.setup(j,K,Ct,it,Ut);let Me,ye=Et;if(Ut!==null&&(Me=yt.get(Ut),ye=ut,ye.setIndex(Me)),j.isMesh)K.wireframe===!0?(E.setLineWidth(K.wireframeLinewidth*xt()),ye.setMode(F.LINES)):ye.setMode(F.TRIANGLES);else if(j.isLine){let Ke=K.linewidth;Ke===void 0&&(Ke=1),E.setLineWidth(Ke*xt()),j.isLineSegments?ye.setMode(F.LINES):j.isLineLoop?ye.setMode(F.LINE_LOOP):ye.setMode(F.LINE_STRIP)}else j.isPoints?ye.setMode(F.POINTS):j.isSprite&&ye.setMode(F.TRIANGLES);if(j.isBatchedMesh)if(Gt.get("WEBGL_multi_draw"))ye.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let Ke=j._multiDrawStarts,Lt=j._multiDrawCounts,ii=j._multiDrawCount,le=Ut?yt.get(Ut).bytesPerElement:1,xi=J.get(K).currentProgram.getUniforms();for(let Gi=0;Gi<ii;Gi++)xi.setValue(F,"_gl_DrawID",Gi),ye.render(Ke[Gi]/le,Lt[Gi])}else if(j.isInstancedMesh)ye.renderInstances(Ft,Ne,j.count);else if(it.isInstancedBufferGeometry){let Ke=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,Lt=Math.min(it.instanceCount,Ke);ye.renderInstances(Ft,Ne,Lt)}else ye.render(Ft,Ne)};function gu(R,W,it,K){y!==null&&R.isNodeMaterial&&y.setObject(K,R),U===!0&&Ot.setState(R,it,!1),R.transparent===!0&&R.side===De&&R.forceSinglePass===!1?(R.side=Oe,R.needsUpdate=!0,Pa(R,W,K),R.side=Cn,R.needsUpdate=!0,Pa(R,W,K),R.side=De):Pa(R,W,K)}this.compile=function(R,W,it=null){it===null&&(it=R),y!==null&&y.renderStart(R,W,it),A=St.get(it),A.init(W),S.push(A),it.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(A.pushLight(j),j.castShadow&&A.pushShadow(j))}),R!==it&&R.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(A.pushLight(j),j.castShadow&&A.pushShadow(j))}),A.setupLights(),y!==null&&y.updateLights(A.state.lightsArray),N=this.localClippingEnabled,U=Ot.init(this.clippingPlanes,N),U===!0&&Ot.setGlobalState(this.clippingPlanes,W),y!==null&&Ht.render(A.state.shadowsArray,it,W);let K=new Set;return R.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let Rt=j.material;if(Rt)if(Array.isArray(Rt))for(let Nt=0;Nt<Rt.length;Nt++){let Ct=Rt[Nt];gu(Ct,it,W,j),K.add(Ct)}else gu(Rt,it,W,j),K.add(Rt)}),A=S.pop(),y!==null&&y.renderEnd(),K},this.compileAsync=function(R,W,it=null){let K=this.compile(R,W,it);return new Promise(j=>{function Rt(){if(K.forEach(function(Nt){let Ut=J.get(Nt).currentProgram;(Ut===void 0||Ut.isReady())&&K.delete(Nt)}),K.size===0){j(R);return}setTimeout(Rt,10)}Gt.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let gc=null;function Ip(R){gc&&gc(R)}function _u(){zn.stop()}function xu(){zn.start()}let zn=new Ad;zn.setAnimationLoop(Ip),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(R){gc=R,Bt.setAnimationLoop(R),R===null?zn.stop():zn.start()},Bt.addEventListener("sessionstart",_u),Bt.addEventListener("sessionend",xu),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){$t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;y!==null&&y.renderStart(R,W);let it=Bt.enabled===!0&&Bt.isPresenting===!0,K=I!==null&&(et===null||it)&&I.begin(T,et);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Bt.enabled===!0&&Bt.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(Bt.cameraAutoUpdate===!0&&Bt.updateCamera(W),W=Bt.getCamera()),R.isScene===!0&&R.onBeforeRender(T,R,W,et),A=St.get(R,S.length),A.init(W),A.state.textureUnits=nt.getTextureUnits(),S.push(A),G.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Z.setFromProjectionMatrix(G,Fi,W.reversedDepth),N=this.localClippingEnabled,U=Ot.init(this.clippingPlanes,N),w=wt.get(R,C.length),w.init(),C.push(w),Bt.enabled===!0&&Bt.isPresenting===!0){let Nt=T.xr.getDepthSensingMesh();Nt!==null&&_c(Nt,W,-1/0,T.sortObjects)}_c(R,W,0,T.sortObjects),w.finish(),y!==null&&y.updateLights(A.state.lightsArray),T.sortObjects===!0&&w.sort(vt,Xt),dt=Bt.enabled===!1||Bt.isPresenting===!1||Bt.hasDepthSensing()===!1,dt&&Kt.addToRenderList(w,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),U===!0&&Ot.beginShadows();let j=A.state.shadowsArray;if(Ht.render(j,R,W),U===!0&&Ot.endShadows(),(K&&I.hasRenderPass())===!1){let Nt=w.opaque,Ct=w.transmissive;if(A.setupLights(),W.isArrayCamera){let Ut=W.cameras;if(Ct.length>0)for(let zt=0,ie=Ut.length;zt<ie;zt++){let ae=Ut[zt];yu(Nt,Ct,R,ae)}dt&&Kt.render(R);for(let zt=0,ie=Ut.length;zt<ie;zt++){let ae=Ut[zt];vu(w,R,ae,ae.viewport)}}else Ct.length>0&&yu(Nt,Ct,R,W),dt&&Kt.render(R),vu(w,R,W)}et!==null&&V===0&&(nt.updateMultisampleRenderTarget(et),nt.updateRenderTargetMipmap(et)),K&&I.end(T),R.isScene===!0&&R.onAfterRender(T,R,W),It.resetDefaultState(),B=-1,H=null,S.pop(),S.length>0?(A=S[S.length-1],nt.setTextureUnits(A.state.textureUnits),U===!0&&Ot.setGlobalState(T.clippingPlanes,A.state.camera)):A=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,y!==null&&y.renderEnd()};function _c(R,W,it,K){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)it=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLightProbeGrid)A.pushLightProbeGrid(R);else if(R.isLight)A.pushLight(R),R.castShadow&&A.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(Z)){K&&ft.setFromMatrixPosition(R.matrixWorld).applyMatrix4(G);let Nt=ct.update(R),Ct=R.material;Ct.visible&&w.push(R,Nt,Ct,it,ft.z,null,W)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(Z))){let Nt=ct.update(R),Ct=R.material;if(K&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ft.copy(R.boundingSphere.center)):(Nt.boundingSphere===null&&Nt.computeBoundingSphere(),ft.copy(Nt.boundingSphere.center)),ft.applyMatrix4(R.matrixWorld).applyMatrix4(G)),Array.isArray(Ct)){let Ut=Nt.groups;for(let zt=0,ie=Ut.length;zt<ie;zt++){let ae=Ut[zt],Ft=Ct[ae.materialIndex];Ft&&Ft.visible&&w.push(R,Nt,Ft,it,ft.z,ae,W)}}else Ct.visible&&w.push(R,Nt,Ct,it,ft.z,null,W)}}let Rt=R.children;for(let Nt=0,Ct=Rt.length;Nt<Ct;Nt++)_c(Rt[Nt],W,it,K)}function vu(R,W,it,K){let{opaque:j,transmissive:Rt,transparent:Nt}=R;A.setupLightsView(it),U===!0&&Ot.setGlobalState(T.clippingPlanes,it),K&&E.viewport(tt.copy(K)),j.length>0&&Ia(j,W,it),Rt.length>0&&Ia(Rt,W,it),Nt.length>0&&Ia(Nt,W,it),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function yu(R,W,it,K){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[K.id]===void 0){let Ft=Gt.has("EXT_color_buffer_half_float")||Gt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[K.id]=new Fe(1,1,{generateMipmaps:!0,type:Ft?$e:hi,minFilter:In,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:se.workingColorSpace})}let Rt=A.state.transmissionRenderTarget[K.id],Nt=K.viewport||tt;Rt.setSize(Nt.z*T.transmissionResolutionScale,Nt.w*T.transmissionResolutionScale);let Ct=T.getRenderTarget(),Ut=T.getActiveCubeFace(),zt=T.getActiveMipmapLevel();T.setRenderTarget(Rt),T.getClearColor(Jt),Zt=T.getClearAlpha(),Zt<1&&T.setClearColor(16777215,.5),T.clear(),dt&&Kt.render(it);let ie=T.toneMapping;T.toneMapping=ki;let ae=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),A.setupLightsView(K),U===!0&&Ot.setGlobalState(T.clippingPlanes,K),Ia(R,it,K),nt.updateMultisampleRenderTarget(Rt),nt.updateRenderTargetMipmap(Rt),Gt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let pe=0,Ne=W.length;pe<Ne;pe++){let Me=W[pe],{object:ye,geometry:Ke,material:Lt,group:ii}=Me;if(Lt.side===De&&ye.layers.test(K.layers)){let le=Lt.side;Lt.side=Oe,Lt.needsUpdate=!0,bu(ye,it,K,Ke,Lt,ii),Lt.side=le,Lt.needsUpdate=!0,Ft=!0}}Ft===!0&&(nt.updateMultisampleRenderTarget(Rt),nt.updateRenderTargetMipmap(Rt))}T.setRenderTarget(Ct,Ut,zt),T.setClearColor(Jt,Zt),ae!==void 0&&(K.viewport=ae),T.toneMapping=ie}function Ia(R,W,it){let K=W.isScene===!0?W.overrideMaterial:null;for(let j=0,Rt=R.length;j<Rt;j++){let Nt=R[j],{object:Ct,geometry:Ut,group:zt}=Nt,ie=Nt.material;ie.allowOverride===!0&&K!==null&&(ie=K),Ct.layers.test(it.layers)&&bu(Ct,W,it,Ut,ie,zt)}}function bu(R,W,it,K,j,Rt){y!==null&&j.isNodeMaterial&&y.setObject(R,j),R.onBeforeRender(T,W,it,K,j,Rt),R.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),j.onBeforeRender(T,W,it,K,R,Rt),j.transparent===!0&&j.side===De&&j.forceSinglePass===!1?(j.side=Oe,j.needsUpdate=!0,T.renderBufferDirect(it,W,K,j,R,Rt),j.side=Cn,j.needsUpdate=!0,T.renderBufferDirect(it,W,K,j,R,Rt),j.side=De):T.renderBufferDirect(it,W,K,j,R,Rt),R.onAfterRender(T,W,it,K,j,Rt)}function Pa(R,W,it){W.isScene!==!0&&(W=$);let K=J.get(R),j=A.state.lights,Rt=A.state.shadowsArray,Nt=j.state.version,Ct=bt.getParameters(R,j.state,Rt,W,it,A.state.lightProbeGridArray),Ut=bt.getProgramCacheKey(Ct),zt=K.programs;K.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?W.environment:null,K.fog=W.fog;let ie=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;K.envMap=pt.get(R.envMap||K.environment,ie),K.envMapRotation=K.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,zt===void 0&&(R.addEventListener("dispose",Vi),zt=new Map,K.programs=zt);let ae=zt.get(Ut);if(ae!==void 0){if(K.currentProgram===ae&&K.lightsStateVersion===Nt)return Mu(R,Ct),ae}else Ct.uniforms=bt.getUniforms(R),y!==null&&R.isNodeMaterial&&y.build(R,it,Ct),R.onBeforeCompile(Ct,T),ae=bt.acquireProgram(Ct,Ut),zt.set(Ut,ae),K.uniforms=Ct.uniforms;let Ft=K.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ft.clippingPlanes=Ot.uniform),Mu(R,Ct),K.needsLights=Np(R),K.lightsStateVersion=Nt,K.needsLights&&(Ft.ambientLightColor.value=j.state.ambient,Ft.lightProbe.value=j.state.probe,Ft.sunLights.value=j.state.sun,Ft.sunLightShadows.value=j.state.sunShadow,Ft.directionalLights.value=j.state.directional,Ft.directionalLightShadows.value=j.state.directionalShadow,Ft.spotLights.value=j.state.spot,Ft.spotLightShadows.value=j.state.spotShadow,Ft.rectAreaLights.value=j.state.rectArea,Ft.ltc_1.value=j.state.rectAreaLTC1,Ft.ltc_2.value=j.state.rectAreaLTC2,Ft.pointLights.value=j.state.point,Ft.pointLightShadows.value=j.state.pointShadow,Ft.hemisphereLights.value=j.state.hemi,Ft.sunShadowMatrix.value=j.state.sunShadowMatrix,Ft.sunShadowCascade.value=j.state.sunShadowCascade,Ft.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ft.spotLightMatrix.value=j.state.spotLightMatrix,Ft.spotLightMap.value=j.state.spotLightMap,Ft.pointShadowMatrix.value=j.state.pointShadowMatrix),K.lightProbeGrid=A.state.lightProbeGridArray.length>0,K.currentProgram=ae,K.uniformsList=null,ae}function Su(R){if(R.uniformsList===null){let W=R.currentProgram.getUniforms();R.uniformsList=qs.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function Mu(R,W){let it=J.get(R);it.outputColorSpace=W.outputColorSpace,it.batching=W.batching,it.batchingColor=W.batchingColor,it.instancing=W.instancing,it.instancingColor=W.instancingColor,it.instancingMorph=W.instancingMorph,it.skinning=W.skinning,it.morphTargets=W.morphTargets,it.morphNormals=W.morphNormals,it.morphColors=W.morphColors,it.morphTargetsCount=W.morphTargetsCount,it.numClippingPlanes=W.numClippingPlanes,it.numIntersection=W.numClipIntersection,it.vertexAlphas=W.vertexAlphas,it.vertexTangents=W.vertexTangents,it.toneMapping=W.toneMapping}function Pp(R,W){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;v.setFromMatrixPosition(W.matrixWorld);for(let it=0,K=R.length;it<K;it++){let j=R[it];if(j.texture!==null&&j.boundingBox.containsPoint(v))return j}return null}function Lp(R,W,it,K,j){W.isScene!==!0&&(W=$),nt.resetTextureUnits();let Rt=W.fog,Nt=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?W.environment:null,Ct=et===null?T.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:se.workingColorSpace,Ut=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,zt=pt.get(K.envMap||Nt,Ut),ie=K.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,ae=!!it.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ft=!!it.morphAttributes.position,pe=!!it.morphAttributes.normal,Ne=!!it.morphAttributes.color,Me=ki;K.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Me=T.toneMapping);let ye=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,Ke=ye!==void 0?ye.length:0,Lt=J.get(K),ii=A.state.lights;if(U===!0&&(N===!0||R!==H)){let Se=R===H&&K.id===B;Ot.setState(K,R,Se)}let le=!1;K.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==ii.state.version||Lt.outputColorSpace!==Ct||j.isBatchedMesh&&Lt.batching===!1||!j.isBatchedMesh&&Lt.batching===!0||j.isBatchedMesh&&Lt.batchingColor===!0&&j._colorsTexture===null||j.isBatchedMesh&&Lt.batchingColor===!1&&j._colorsTexture!==null||j.isInstancedMesh&&Lt.instancing===!1||!j.isInstancedMesh&&Lt.instancing===!0||j.isSkinnedMesh&&Lt.skinning===!1||!j.isSkinnedMesh&&Lt.skinning===!0||j.isInstancedMesh&&Lt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Lt.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Lt.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Lt.instancingMorph===!1&&j.morphTexture!==null||Lt.envMap!==zt||K.fog===!0&&Lt.fog!==Rt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==Ot.numPlanes||Lt.numIntersection!==Ot.numIntersection)||Lt.vertexAlphas!==ie||Lt.vertexTangents!==ae||Lt.morphTargets!==Ft||Lt.morphNormals!==pe||Lt.morphColors!==Ne||Lt.toneMapping!==Me||Lt.morphTargetsCount!==Ke||!!Lt.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(le=!0):(le=!0,Lt.__version=K.version);let xi=Lt.currentProgram;le===!0&&(xi=Pa(K,W,j),y&&K.isNodeMaterial&&y.onUpdateProgram(K,xi,Lt));let Gi=!1,pn=!1,ns=!1,ve=xi.getUniforms(),Pe=Lt.uniforms;if(E.useProgram(xi.program)&&(Gi=!0,pn=!0,ns=!0),K.id!==B&&(B=K.id,pn=!0),Lt.needsLights){let Se=Pp(A.state.lightProbeGridArray,j);Lt.lightProbeGrid!==Se&&(Lt.lightProbeGrid=Se,pn=!0)}if(Gi||H!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),ve.setValue(F,"projectionMatrix",R.projectionMatrix),ve.setValue(F,"viewMatrix",R.matrixWorldInverse);let gn=ve.map.cameraPosition;gn!==void 0&&gn.setValue(F,lt.setFromMatrixPosition(R.matrixWorld)),L.logarithmicDepthBuffer&&ve.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ve.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),H!==R&&(H=R,pn=!0,ns=!0)}if(Lt.needsLights&&(ii.state.sunShadowMap.length>0&&ve.setValue(F,"sunShadowMap",ii.state.sunShadowMap,nt),ii.state.directionalShadowMap.length>0&&ve.setValue(F,"directionalShadowMap",ii.state.directionalShadowMap,nt),ii.state.spotShadowMap.length>0&&ve.setValue(F,"spotShadowMap",ii.state.spotShadowMap,nt),ii.state.pointShadowMap.length>0&&ve.setValue(F,"pointShadowMap",ii.state.pointShadowMap,nt)),j.isSkinnedMesh){ve.setOptional(F,j,"bindMatrix"),ve.setOptional(F,j,"bindMatrixInverse");let Se=j.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),ve.setValue(F,"boneTexture",Se.boneTexture,nt))}j.isBatchedMesh&&(ve.setOptional(F,j,"batchingTexture"),ve.setValue(F,"batchingTexture",j._matricesTexture,nt),ve.setOptional(F,j,"batchingIdTexture"),ve.setValue(F,"batchingIdTexture",j._indirectTexture,nt),ve.setOptional(F,j,"batchingColorTexture"),j._colorsTexture!==null&&ve.setValue(F,"batchingColorTexture",j._colorsTexture,nt));let mn=it.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&X.update(j,it,xi),(pn||Lt.receiveShadow!==j.receiveShadow)&&(Lt.receiveShadow=j.receiveShadow,ve.setValue(F,"receiveShadow",j.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&W.environment!==null&&(Pe.envMapIntensity.value=W.environmentIntensity),Pe.dfgLUT!==void 0&&(Pe.dfgLUT.value=ey()),pn){if(ve.setValue(F,"toneMappingExposure",T.toneMappingExposure),Lt.needsLights&&Dp(Pe,ns),Rt&&K.fog===!0&&kt.refreshFogUniforms(Pe,Rt),kt.refreshMaterialUniforms(Pe,K,at,Q,A.state.transmissionRenderTarget[R.id]),Lt.needsLights&&Lt.lightProbeGrid){let Se=Lt.lightProbeGrid;Pe.probesSH.value=Se.texture,Pe.probesMin.value.copy(Se.boundingBox.min),Pe.probesMax.value.copy(Se.boundingBox.max),Pe.probesResolution.value.copy(Se.resolution)}qs.upload(F,Su(Lt),Pe,nt)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(qs.upload(F,Su(Lt),Pe,nt),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ve.setValue(F,"center",j.center),ve.setValue(F,"modelViewMatrix",j.modelViewMatrix),ve.setValue(F,"normalMatrix",j.normalMatrix),ve.setValue(F,"modelMatrix",j.matrixWorld),K.uniformsGroups!==void 0){let Se=K.uniformsGroups;for(let gn=0,ss=Se.length;gn<ss;gn++){let Eu=Se[gn];gt.update(Eu,xi),gt.bind(Eu,xi)}}return xi}function Dp(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.sunLights.needsUpdate=W,R.sunLightShadows.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function Np(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(R,W,it){let K=J.get(R);K.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),J.get(R.texture).__webglTexture=W,J.get(R.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:it,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,W){let it=J.get(R);it.__webglFramebuffer=W,it.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(R,W=0,it=0){et=R,Y=W,V=it;let K=null,j=!1,Rt=!1;if(R){let Ct=J.get(R);if(Ct.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(F.FRAMEBUFFER,Ct.__webglFramebuffer),tt.copy(R.viewport),ht.copy(R.scissor),st=R.scissorTest,E.viewport(tt),E.scissor(ht),E.setScissorTest(st),B=-1;return}else if(Ct.__webglFramebuffer===void 0)nt.setupRenderTarget(R);else if(Ct.__hasExternalTextures)nt.rebindTextures(R,J.get(R.texture).__webglTexture,J.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let ie=R.depthTexture;if(Ct.__boundDepthTexture!==ie){if(ie!==null&&J.has(ie)&&(R.width!==ie.image.width||R.height!==ie.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");nt.setupDepthRenderbuffer(R)}}let Ut=R.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(Rt=!0);let zt=J.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(zt[W])?K=zt[W][it]:K=zt[W],j=!0):R.samples>0&&nt.useMultisampledRTT(R)===!1?K=J.get(R).__webglMultisampledFramebuffer:Array.isArray(zt)?K=zt[it]:K=zt,tt.copy(R.viewport),ht.copy(R.scissor),st=R.scissorTest}else tt.copy(Mt).multiplyScalar(at).floor(),ht.copy(M).multiplyScalar(at).floor(),st=rt;if(it!==0&&(K=k),E.bindFramebuffer(F.FRAMEBUFFER,K)&&E.drawBuffers(R,K),E.viewport(tt),E.scissor(ht),E.setScissorTest(st),j){let Ct=J.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ct.__webglTexture,it)}else if(Rt){let Ct=W;for(let Ut=0;Ut<R.textures.length;Ut++){let zt=J.get(R.textures[Ut]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ut,zt.__webglTexture,it,Ct)}}else if(R!==null&&it!==0){let Ct=J.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ct.__webglTexture,it)}B=-1};function wu(R){let W=J.get(R);return(W.__readFormat!==R.format||W.__readType!==R.type)&&(W.__readFormat=R.format,W.__readType=R.type,W.__formatReadable=L.textureFormatReadable(R.format),W.__typeReadable=L.textureTypeReadable(R.type)),W}this.readRenderTargetPixels=function(R,W,it,K,j,Rt,Nt,Ct=0){if(!(R&&R.isWebGLRenderTarget)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=J.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ut=Ut[Nt]),Ut){E.bindFramebuffer(F.FRAMEBUFFER,Ut);try{let zt=R.textures[Ct],ie=zt.format,ae=zt.type;R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ct);let Ft=wu(zt);if(Ft.__formatReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ft.__typeReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-K&&it>=0&&it<=R.height-j&&F.readPixels(W,it,K,j,Tt.convert(ie),Tt.convert(ae),Rt)}finally{let zt=et!==null?J.get(et).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(R,W,it,K,j,Rt,Nt,Ct=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=J.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ut=Ut[Nt]),Ut)if(W>=0&&W<=R.width-K&&it>=0&&it<=R.height-j){E.bindFramebuffer(F.FRAMEBUFFER,Ut);let zt=R.textures[Ct],ie=zt.format,ae=zt.type;R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ct);let Ft=wu(zt);if(Ft.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ft.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let pe=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,pe),F.bufferData(F.PIXEL_PACK_BUFFER,Rt.byteLength,F.STREAM_READ),F.readPixels(W,it,K,j,Tt.convert(ie),Tt.convert(ae),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ne=et!==null?J.get(et).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,Ne);let Me=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Jf(F,Me,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,pe),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Rt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(pe),F.deleteSync(Me),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,W=null,it=0){let K=Math.pow(2,-it),j=Math.floor(R.image.width*K),Rt=Math.floor(R.image.height*K),Nt=W!==null?W.x:0,Ct=W!==null?W.y:0;nt.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,it,0,0,Nt,Ct,j,Rt),E.unbindTexture()},this.copyTextureToTexture=function(R,W,it=null,K=null,j=0,Rt=0){let Nt,Ct,Ut,zt,ie,ae,Ft,pe,Ne,Me=R.isCompressedTexture?R.mipmaps[Rt]:R.image;if(it!==null)Nt=it.max.x-it.min.x,Ct=it.max.y-it.min.y,Ut=it.isBox3?it.max.z-it.min.z:1,zt=it.min.x,ie=it.min.y,ae=it.isBox3?it.min.z:0;else{let Pe=Math.pow(2,-j);Nt=Math.floor(Me.width*Pe),Ct=Math.floor(Me.height*Pe),R.isDataArrayTexture?Ut=Me.depth:R.isData3DTexture?Ut=Math.floor(Me.depth*Pe):Ut=1,zt=0,ie=0,ae=0}K!==null?(Ft=K.x,pe=K.y,Ne=K.z):(Ft=0,pe=0,Ne=0);let ye=Tt.convert(W.format),Ke=Tt.convert(W.type),Lt;W.isData3DTexture?(nt.setTexture3D(W,0),Lt=F.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(nt.setTexture2DArray(W,0),Lt=F.TEXTURE_2D_ARRAY):(nt.setTexture2D(W,0),Lt=F.TEXTURE_2D),E.activeTexture(F.TEXTURE0),E.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,W.flipY),E.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),E.pixelStorei(F.UNPACK_ALIGNMENT,W.unpackAlignment);let ii=E.getParameter(F.UNPACK_ROW_LENGTH),le=E.getParameter(F.UNPACK_IMAGE_HEIGHT),xi=E.getParameter(F.UNPACK_SKIP_PIXELS),Gi=E.getParameter(F.UNPACK_SKIP_ROWS),pn=E.getParameter(F.UNPACK_SKIP_IMAGES);E.pixelStorei(F.UNPACK_ROW_LENGTH,Me.width),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Me.height),E.pixelStorei(F.UNPACK_SKIP_PIXELS,zt),E.pixelStorei(F.UNPACK_SKIP_ROWS,ie),E.pixelStorei(F.UNPACK_SKIP_IMAGES,ae);let ns=R.isDataArrayTexture||R.isData3DTexture,ve=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){let Pe=J.get(R),mn=J.get(W),Se=J.get(Pe.__renderTarget),gn=J.get(mn.__renderTarget);E.bindFramebuffer(F.READ_FRAMEBUFFER,Se.__webglFramebuffer),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let ss=0;ss<Ut;ss++)ns&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.get(R).__webglTexture,j,ae+ss),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.get(W).__webglTexture,Rt,Ne+ss)),F.blitFramebuffer(zt,ie,Nt,Ct,Ft,pe,Nt,Ct,F.DEPTH_BUFFER_BIT,F.NEAREST);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(j!==0||R.isRenderTargetTexture||J.has(R)){let Pe=J.get(R),mn=J.get(W);E.bindFramebuffer(F.READ_FRAMEBUFFER,D),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,z);for(let Se=0;Se<Ut;Se++)ns?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Pe.__webglTexture,j,ae+Se):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Pe.__webglTexture,j),ve?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,mn.__webglTexture,Rt,Ne+Se):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,mn.__webglTexture,Rt),j!==0?F.blitFramebuffer(zt,ie,Nt,Ct,Ft,pe,Nt,Ct,F.COLOR_BUFFER_BIT,F.NEAREST):ve?F.copyTexSubImage3D(Lt,Rt,Ft,pe,Ne+Se,zt,ie,Nt,Ct):F.copyTexSubImage2D(Lt,Rt,Ft,pe,zt,ie,Nt,Ct);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ve?R.isDataTexture||R.isData3DTexture?F.texSubImage3D(Lt,Rt,Ft,pe,Ne,Nt,Ct,Ut,ye,Ke,Me.data):W.isCompressedArrayTexture?F.compressedTexSubImage3D(Lt,Rt,Ft,pe,Ne,Nt,Ct,Ut,ye,Me.data):F.texSubImage3D(Lt,Rt,Ft,pe,Ne,Nt,Ct,Ut,ye,Ke,Me):R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Rt,Ft,pe,Nt,Ct,ye,Ke,Me.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Rt,Ft,pe,Me.width,Me.height,ye,Me.data):F.texSubImage2D(F.TEXTURE_2D,Rt,Ft,pe,Nt,Ct,ye,Ke,Me);E.pixelStorei(F.UNPACK_ROW_LENGTH,ii),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,le),E.pixelStorei(F.UNPACK_SKIP_PIXELS,xi),E.pixelStorei(F.UNPACK_SKIP_ROWS,Gi),E.pixelStorei(F.UNPACK_SKIP_IMAGES,pn),Rt===0&&W.generateMipmaps&&F.generateMipmap(Lt),E.unbindTexture()},this.initRenderTarget=function(R){J.get(R).__webglFramebuffer===void 0&&nt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?nt.setTextureCube(R,0):R.isData3DTexture?nt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?nt.setTexture2DArray(R,0):nt.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){Y=0,V=0,et=null,E.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}};var Te={NOTE:0,BOMB:1},Ti={LEFT:0,RIGHT:1},ge={UP:0,DOWN:1,LEFT:2,RIGHT:3,UP_LEFT:4,UP_RIGHT:5,DOWN_LEFT:6,DOWN_RIGHT:7,ANY:8},Nn=Math.SQRT1_2,Wh=[[0,1],[0,-1],[-1,0],[1,0],[-Nn,Nn],[Nn,Nn],[-Nn,-Nn],[Nn,-Nn],[0,0]];function Ud(n){let[t,e]=Wh[n]||[0,1];return t===0&&e===0?0:Math.atan2(-t,e)}var Nd=[ge.UP,ge.UP_RIGHT,ge.RIGHT,ge.DOWN_RIGHT,ge.DOWN,ge.DOWN_LEFT,ge.LEFT,ge.UP_LEFT];function Xh(n,t){let e=Nd.indexOf(n);return e<0?n:Nd[((e+t)%8+8)%8]}var Fd=n=>n===ge.ANY?ge.DOWN:Xh(n,4),mi={LANES:4,ROWS:3,LANE_W:.55,ROW_H:.5,BLOCK:.44},Zs=-.9,qh=.5,Od={Easy:10,Normal:10,Hard:10,Expert:12,ExpertPlus:16};var $s=class{constructor(t,e=[]){this.baseBpm=t,this.segs=[{beat:0,sec:0,bpm:t}];let i=e.filter(s=>s&&s.bpm>0&&s.beat>=0&&Number.isFinite(s.beat)).sort((s,r)=>s.beat-r.beat);for(let s of i){let r=this.segs[this.segs.length-1];if(s.beat<=r.beat){r.bpm=s.bpm;continue}let a=r.sec+(s.beat-r.beat)*60/r.bpm;this.segs.push({beat:s.beat,sec:a,bpm:s.bpm})}}_seg(t){let e=0,i=this.segs.length-1;for(;e<i;){let s=e+i+1>>1;this.segs[s].beat<=t?e=s:i=s-1}return this.segs[e]}beatToSec(t){let e=this._seg(t);return e.sec+(t-e.beat)*60/e.bpm}secToBeat(t){let e=0,i=this.segs.length-1;for(;e<i;){let r=e+i+1>>1;this.segs[r].sec<=t?e=r:i=r-1}let s=this.segs[e];return s.beat+(t-s.sec)*s.bpm/60}bpmAt(t){return this._seg(t).bpm}};function Bd(n,t,e=0){let i=60/t,s=4;for(;n*i*s>17.999;)s/=2;return s+=e,s<.25&&(s=.25),s*i}var xe=(n=0,t=0,e=0)=>({x:n,y:t,z:e}),Fn=(n,t)=>xe(n.x+t.x,n.y+t.y,n.z+t.z),Je=(n,t)=>xe(n.x-t.x,n.y-t.y,n.z-t.z),dn=(n,t)=>xe(n.x*t,n.y*t,n.z*t),Ie=(n,t)=>n.x*t.x+n.y*t.y+n.z*t.z,Js=(n,t)=>xe(n.y*t.z-n.z*t.y,n.z*t.x-n.x*t.z,n.x*t.y-n.y*t.x),Un=n=>Math.sqrt(Ie(n,n)),Yh=(n,t)=>Un(Je(n,t)),Yl=(n,t,e)=>xe(n.x+(t.x-n.x)*e,n.y+(t.y-n.y)*e,n.z+(t.z-n.z)*e);function jn(n){let t=Un(n);return t>1e-9?dn(n,1/t):xe(0,0,0)}function kd(n,t){let e=Un(n),i=Un(t);if(e<1e-9||i<1e-9)return 0;let s=Math.min(1,Math.max(-1,Ie(n,t)/(e*i)));return Math.acos(s)*180/Math.PI}var gi=(n,t,e)=>Math.min(e,Math.max(t,n));function iy(n,t,e){let i=Je(t,n),s=Ie(i,i),r=s>1e-12?gi(Ie(Je(e,n),i)/s,0,1):0;return Yh(e,Fn(n,dn(i,r)))}function zd(n,t,e,i,s,r,a,o=6){for(let c=0;c<=o;c++){let l=c/o,h=Yl(n,e,l),u=Yl(t,i,l);if(iy(h,u,Yl(s,r,l))<a)return l}return-1}function Hd(n,t,e,i=0){return n.x>t.x-i&&n.x<e.x+i&&n.y>t.y-i&&n.y<e.y+i&&n.z>t.z-i&&n.z<e.z+i}function Vd(n,t,e,i){let s=Je(t,n),r=Je(i,e),a=Je(n,e),o=Ie(s,s),c=Ie(r,r),l=Ie(r,a),h,u;if(o<1e-12&&c<1e-12)h=0,u=0;else if(o<1e-12)h=0,u=gi(l/c,0,1);else{let p=Ie(s,a);if(c<1e-12)u=0,h=gi(-p/o,0,1);else{let _=Ie(s,r),m=o*c-_*_;h=m>1e-12?gi((_*l-p*c)/m,0,1):0,u=(_*h+l)/c,u<0?(u=0,h=gi(-p/o,0,1)):u>1&&(u=1,h=gi((_-p)/o,0,1))}}let f=Fn(n,dn(s,h)),d=Fn(e,dn(r,u));return{dist:Yh(f,d),point:dn(Fn(f,d),.5)}}function ny(n){return n===0?{kind:"off",color:1}:n>=1&&n<=4?{kind:["on","flash","fade","on"][n-1],color:1}:n>=5&&n<=8?{kind:["on","flash","fade","on"][n-5],color:0}:n>=9&&n<=12?{kind:["on","flash","fade","on"][n-9],color:2}:{kind:"on",color:1}}function sy(n,t,e,i){if(t>=0&&t<=4){let{kind:s,color:r}=ny(e);return{time:n,group:t,kind:s,color:r,brightness:i>0?Math.min(i,2):1}}return t===12||t===13?{time:n,group:"laserSpeed",side:t===12?"left":"right",value:e}:t===8?{time:n,group:"ringSpin"}:t===9?{time:n,group:"ringZoom"}:null}function Gd(n,t){let e=[];if(Array.isArray(n._events))for(let s of n._events)e.push([s._time,s._type,s._value,s._floatValue??1]);if(Array.isArray(n.basicBeatmapEvents))for(let s of n.basicBeatmapEvents)e.push([s.b,s.et,s.i,s.f??1]);if(Array.isArray(n.basicEvents)){let s=n.basicEventsData||[];for(let r of n.basicEvents){let a=s[r.i??0]||{};e.push([r.b,a.t,a.i,a.f??1])}}let i=[];for(let[s,r,a,o]of e){if(!Number.isFinite(s)||s<0)continue;let c=sy(t(s),r,a,o);c&&i.push(c)}return i.sort((s,r)=>s.time-r.time),i}function Wd(n){return n.filter(t=>typeof t.group=="number").length>=16}function Zl({bpm:n,startSec:t=0,endSec:e,introSec:i=0}){let s=60/n,r=[],a=Math.ceil(t/s),o=Math.floor(e/s);for(let c=a;c<=o;c++){let l=c*s,h=Math.floor(c/4),u=Math.floor(h/8),f=(c%4+4)%4,d=u%2,p=1-d;if(l<i){f===0&&r.push({time:l,group:4,kind:"fade",color:d,brightness:.7});continue}if(h%8===7&&f>=2){if(f===2)for(let m=0;m<=4;m++)r.push({time:l,group:m,kind:"fade",color:2,brightness:.6});continue}if(r.push({time:l,group:0,kind:"flash",color:f%2?p:d,brightness:1}),r.push({time:l,group:4,kind:f===0?"flash":"on",color:d,brightness:f===0?1.2:.6}),f===0){r.push({time:l,group:1,kind:"flash",color:p,brightness:1}),r.push({time:l,group:"ringSpin"});let m=2+u%3*2;r.push({time:l,group:"laserSpeed",side:"left",value:m}),r.push({time:l,group:"laserSpeed",side:"right",value:m})}r.push({time:l+s/2,group:f%2?3:2,kind:"fade",color:f%2?1:0,brightness:1}),h%4===3&&f===3&&r.push({time:l,group:"ringZoom"})}return r.sort((c,l)=>c.time-l.time)}function Zh(n,t){if(!n)return 0;let e=Math.max(0,t-n.time),i=n.brightness??1;switch(n.kind){case"off":return 0;case"on":return i;case"flash":return i*(1+.8*Math.exp(-e*6));case"fade":return i*1.6*Math.exp(-e*2.2);default:return i}}var ry=100,Xd=60,$h=.4,ay=1,oy=.5,ly=.3,$l=class{constructor(){this.samples=[]}push(t,e,i){this.samples.push({t,dir:jn(Je(i,e))});let s=t-$h-.1;for(;this.samples.length>2&&this.samples[0].t<s;)this.samples.shift()}preSwingAngle(t){let e=this.samples;if(e.length<2)return 0;let i=e[e.length-1].t,s=0;for(let r=e.length-1;r>0;r--){let a=e[r-1],o=e[r];if(i-a.t>$h)break;let c=qd(a.dir,o.dir,t);if(c<0)break;let l=Math.max(o.t-a.t,1e-4);if(c/l<20&&s>5)break;s+=c}return s}};function qd(n,t,e){let i=Js(n,t),s=kd(n,t);return s<1e-6?0:Ie(i,e)>=0?s:-s}var Jl=class{constructor(t,e,i){this.startT=t,this.lastDir=e,this.lastT=t,this.axis=i,this.angle=0,this.done=!1}update(t,e,i){if(this.done)return!0;let s=jn(Je(i,e)),r=qd(this.lastDir,s,this.axis),a=Math.max(t-this.lastT,1e-4);return this.lastDir=s,this.lastT=t,r<0||r/a<20&&t-this.startT>.05?this.done=!0:this.angle+=r,(this.angle>=Xd||t-this.startT>$h)&&(this.done=!0),this.done}};function Yd({note:n,saberHand:t,base:e,tip:i,tipVel:s,center:r}){let a=jn(Je(i,e)),o=jn(Js(a,s));Un(o)<.5&&(o=xe(0,0,1));let c=s.x,l=s.y,h=Math.hypot(c,l),u=h>1e-6?{x:c/h,y:l/h}:{x:0,y:-1},f=Math.abs(Ie(Je(r,e),o)),d=Math.round(15*(1-gi(f/ly,0,1))),p=null;if(!(t<0||t===n.hand))p="WRONG COLOUR";else if(n.dir!==ge.ANY){let[m,g]=Wh[n.dir];h<ay?p="TOO SLOW":u.x*m+u.y*g<oy&&(p="WRONG WAY")}return{good:p===null,reason:p,axis:o,centerPts:d,swingDir:u,bladeDir:a}}function Zd(n){return Math.round(70*gi(n/ry,0,1))}function $d(n){return Math.round(30*gi(n/Xd,0,1))}var Sa=class{constructor(){this.reset()}reset(){this.value=1,this.progress=0}hit(){this.value>=8||(this.progress++,this.progress>=this.value*2&&(this.value*=2,this.progress=0))}miss(){this.value>1&&(this.value/=2),this.progress=0}get fill(){return this.value>=8?1:this.progress/(this.value*2)}};function Jd(n){let t=new Sa,e=0;for(let i=0;i<n;i++)e+=115*t.value,t.hit();return e}function Jh(n){return n>=.9?"SS":n>=.8?"S":n>=.65?"A":n>=.5?"B":n>=.35?"C":n>=.2?"D":"E"}var Qn={START:50,HIT:1,MISS:-15,BAD_CUT:-10,BOMB:-15,WALL_PER_SEC:-30};var Kh=(n,t=1)=>new me({color:n,transparent:!0,opacity:t,blending:ue,depthWrite:!1}),ts=class{constructor(t){this.world=t,this.group=new Ee,this.group.visible=!1,t.scene.add(this.group),this.showRings=!1,this.showTowers=!1,this.showSkyline=!0,this.water=!1}setActive(t){this.group.visible=t}update(){}},jh=class extends ts{constructor(t){super(t),this.showRings=!0,this.showTowers=!0}},Qh=class extends ts{constructor(t){super(t),this.showSkyline=!1,this.planetU={light:{value:new mt},rim:{value:new mt},time:{value:0}};let e=new Vt(new ji(24,48,32),new ce({uniforms:this.planetU,fog:!1,vertexShader:`varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main(){ vP = position; vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform vec3 light; uniform vec3 rim; uniform float time; varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main(){
          vec3 N = normalize(vN); vec3 V = normalize(vV);
          float lit = max(0.0, dot(N, normalize(vec3(-0.6, 0.5, 0.6))));
          float bands = 0.5 + 0.5 * sin(vP.y * 0.9 + sin(vP.x * 0.2 + time * 0.05) * 2.0);
          vec3 col = vec3(0.02, 0.015, 0.04) + light * lit * (0.25 + 0.2 * bands);
          float f = pow(1.0 - abs(dot(N, V)), 3.0);
          col += rim * f * 1.4;
          gl_FragColor = vec4(col, 1.0);
        }`}));e.position.set(14,10,-82),this.group.add(e),this.ringMat=Kh(16777215,.25),this.ringMat.side=De,this.ringMat.fog=!1;let i=new Vt(new Zr(30,40,96),this.ringMat);i.position.copy(e.position),i.rotation.set(-1.25,.25,.2),this.group.add(i),this.stationMat=Kh(16777215,1),this.station=new Vt(new Bi(36,.22,6,160),this.stationMat),this.station.position.set(0,-6,-42),this.station.rotation.set(.15,0,0),this.group.add(this.station);let s=new Vt(new Bi(36.6,.9,6,160),new ri({color:723220,metalness:.7,roughness:.4}));s.position.copy(this.station.position),s.rotation.copy(this.station.rotation),this.frame=s,this.group.add(s);let r=260;this.streakPos=new Float32Array(r*6),this.streakCol=new Float32Array(r*6),this.streaks=[];for(let o=0;o<r;o++){let c=Math.random()*Math.PI*2,l=7+Math.random()*30;this.streaks.push({x:Math.cos(c)*l,y:4+Math.sin(c)*l*.6,z:-Math.random()*110,s:.6+Math.random()*.8})}let a=new oe;a.setAttribute("position",new fe(this.streakPos,3).setUsage(ai)),a.setAttribute("color",new fe(this.streakCol,3).setUsage(ai)),this.lines=new cn(a,new bi({vertexColors:!0,transparent:!0,blending:ue,depthWrite:!1})),this.lines.frustumCulled=!1,this.group.add(this.lines)}update(t,{now:e,playing:i,speed:s,L:r,C:a,mix:o,wash:c,music:l,on:h,tempoScale:u=1}){this.planetU.light.value.copy(o).lerp(new mt(1,1,1),.5).multiplyScalar(.4+.6*c),this.planetU.rim.value.copy(a[4]).multiplyScalar(.3+.9*Math.min(1.5,r[4])*h(.4)),this.planetU.time.value=e,this.ringMat.color.copy(a[1]).lerp(new mt(1,1,1),.3),this.ringMat.opacity=.08+.2*Math.min(1.2,r[1]),this.stationMat.color.copy(a[1]).multiplyScalar((.2+Math.min(1.5,r[1]))*h(.3)),this.station.rotation.z+=t*.03,this.frame.rotation.z=this.station.rotation.z;let f=l?l.energy:.3,d=(i?s*1.6:4)*(1+f)*u*t,p=(i?2.5:.8)*(1+f*1.5),_=this.streakPos,m=this.streakCol,g=o;this.streaks.forEach((x,b)=>{x.z+=d*x.s,x.z>5&&(x.z-=115);let v=ze.smoothstep(x.z,-110,-60)*.8*h(.6);_.set([x.x,x.y,x.z,x.x,x.y,x.z-p*x.s],b*6),m.set([v*(.6+g.r*.4),v*(.6+g.g*.4),v*(.6+g.b*.4),0,0,0],b*6)}),this.lines.geometry.attributes.position.needsUpdate=!0,this.lines.geometry.attributes.color.needsUpdate=!0}},tu=class extends ts{constructor(t){super(t),this.showSkyline=!0;let e=120;this.u={colL:{value:new mt},colR:{value:new mt},level:{value:1},time:{value:0},eq:{value:0},spec:{value:new Float32Array(16)}};let i=new me({color:460301}),s=this.u;i.onBeforeCompile=u=>{Object.assign(u.uniforms,s),u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vW; varying vec3 vObjN;`).replace("#include <project_vertex>",`#include <project_vertex>
          { vec4 w = vec4(transformed, 1.0);
            #ifdef USE_INSTANCING
              w = instanceMatrix * w;
            #endif
            vW = (modelMatrix * w).xyz; vObjN = normal; }`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`#include <common>
          varying vec3 vW; varying vec3 vObjN;
          uniform vec3 colL; uniform vec3 colR; uniform float level; uniform float time; uniform float eq; uniform float spec[16];
          float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }`).replace("#include <opaque_fragment>",`
          {
            vec3 totalEmissiveRadiance = vec3(0.0);
            // Window grid on the side faces; roofs stay dark.
            if (abs(vObjN.y) < 0.5) {
              vec2 f = abs(vObjN.x) > 0.5 ? vec2(vW.z, vW.y) : vec2(vW.x, vW.y);
              vec2 cell = floor(f / vec2(1.4, 1.6));
              vec2 in_ = fract(f / vec2(1.4, 1.6));
              float win = step(0.25, in_.x) * step(in_.x, 0.75) * step(0.3, in_.y) * step(in_.y, 0.75);
              float r = h21(cell + floor(vW.x / 30.0));
              float on = step(0.55, r) * (0.75 + 0.25 * sin(time * (0.5 + r * 3.0) + r * 40.0));
              int bi = int(clamp(floor(abs(vW.z + 10.0) / 7.0), 0.0, 15.0));
              float eqLit = eq * step(vW.y, spec[bi] * 40.0);
              vec3 c = mix(colL, colR, step(0.0, vW.x));
              c = mix(c, vec3(1.0, 0.85, 0.6), 0.35);
              totalEmissiveRadiance += c * win * (on * level + eqLit * 1.5) * 0.9;
            }
            outgoingLight += totalEmissiveRadiance;
          }
          #include <opaque_fragment>`)},i.customProgramCacheKey=()=>"city-windows";let r=new oi(new Le(1,1,1),i,e),a=new te,o=3,c=()=>(o=o*16807%2147483647)/2147483647;for(let u=0;u<e;u++){let d=(u%2?1:-1)*(15+c()*50),p=-6-c()*105,_=3+c()*6,m=3+c()*6,g=6+Math.pow(c(),1.6)*38*(Math.abs(d)>30?1.3:1);a.compose(new O(d,g/2,p),new Xe,new O(_,g,m)),r.setMatrixAt(u,a)}r.frustumCulled=!1,this.group.add(r);let l=140;this.cars=[];for(let u=0;u<l;u++)this.cars.push({lane:u%2,z:-Math.random()*110,s:6+Math.random()*8});this.carPos=new Float32Array(l*3),this.carCol=new Float32Array(l*3);let h=new oe;h.setAttribute("position",new fe(this.carPos,3).setUsage(ai)),h.setAttribute("color",new fe(this.carCol,3).setUsage(ai)),this.traffic=new hn(h,new Sn({size:.35,map:Ye(),vertexColors:!0,transparent:!0,blending:ue,depthWrite:!1})),this.traffic.frustumCulled=!1,this.group.add(this.traffic)}update(t,{now:e,L:i,C:s,wash:r,music:a,on:o,tempoScale:c=1}){let l=this.u;l.colL.value.copy(s[2]),l.colR.value.copy(s[3]),l.level.value=(.35+.65*Math.min(1.3,r))*o(.7),l.time.value=e,l.eq.value=a?o(.7):0,a?l.spec.value.set(a.spectrum):l.spec.value.fill(0);let h=this.carPos,u=this.carCol;this.cars.forEach((f,d)=>{f.z+=(f.lane?f.s:-f.s)*c*t,f.z>4&&(f.z-=115),f.z<-111&&(f.z+=115);let p=f.lane?13.2:-13.2;h.set([p,.35,f.z],d*3);let _=ze.smoothstep(f.z,-110,-70)*o(.5);f.lane?u.set([_,_*.95,_*.85],d*3):u.set([_,_*.12,_*.15],d*3)}),this.traffic.geometry.attributes.position.needsUpdate=!0,this.traffic.geometry.attributes.color.needsUpdate=!0}},eu=class extends ts{constructor(t){super(t),this.showRings=!0,this.water=!0;let e=24;this.buoys=new oi(new ji(.12,12,8),Kh(16777215,1),e),this.buoys.frustumCulled=!1,this._b=[];for(let i=0;i<e;i++)this._b.push({x:(i%2?1:-1)*(3+i%4*2.2),z:-6-Math.floor(i/2)*7,ph:Math.random()*6}),this.buoys.setColorAt(i,new mt(0,0,0));this.group.add(this.buoys)}update(t,{now:e,L:i,C:s,on:r}){let a=new te,o=new mt;this._b.forEach((c,l)=>{a.makeTranslation(c.x,.12+Math.sin(e*1.3+c.ph)*.05,c.z),this.buoys.setMatrixAt(l,a);let h=c.x<0?2:3;o.copy(s[h]).multiplyScalar((.25+Math.min(1.4,i[h]+i[4]*.5))*r(.5)),this.buoys.setColorAt(l,o)}),this.buoys.instanceMatrix.needsUpdate=!0,this.buoys.instanceColor.needsUpdate=!0}},iu=class extends ts{constructor(t){super(t),this.showSkyline=!1,this.u={colL:{value:new mt},colR:{value:new mt},colRing:{value:new mt},time:{value:0},level:{value:1}};let e=new ce({uniforms:this.u,transparent:!0,blending:ue,depthWrite:!1,side:De,vertexShader:`varying vec3 vN; varying vec3 vV; varying vec3 vW;
        void main(){
          vec4 w = instanceMatrix * vec4(position, 1.0);
          vW = (modelMatrix * w).xyz;
          vec4 mv = viewMatrix * vec4(vW, 1.0);
          vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * mat3(instanceMatrix) * normal);
          vV = -mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`uniform vec3 colL; uniform vec3 colR; uniform vec3 colRing; uniform float time; uniform float level;
        varying vec3 vN; varying vec3 vV; varying vec3 vW;
        vec3 hue(float h){ return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0); }
        void main(){
          float ndv = abs(dot(normalize(vN), normalize(vV)));
          float edge = pow(1.0 - ndv, 3.5);
          vec3 base = mix(colL, colR, step(0.0, vW.x));
          // Light caught inside the crystal: slow vertical glints plus a rainbow split at the edges.
          float glint = pow(max(0.0, sin(vW.y * 0.7 - time * 1.6 + vW.z * 0.3)), 18.0);
          vec3 prism = hue(fract(ndv * 1.5 + vW.y * 0.04 + time * 0.05)) * edge * 0.35;
          vec3 c = base * (edge * 1.1 + glint * 0.8) + colRing * glint * 0.4 + prism * (0.4 + 0.6 * length(base));
          gl_FragColor = vec4(c * level, 1.0);
        }`}),i=28,s=new oi(new li(1,1.15,1,6),e,i),r=new te,a=11,o=()=>(a=a*16807%2147483647)/2147483647;for(let l=0;l<i;l++){let h=l%2?1:-1,u=Math.floor(l/2),f=9+o()*20,d=.9+o()*1.4,p=new Xe().setFromEuler(new yi((o()-.5)*.25,o()*3,h*(.05+o()*.15)));r.compose(new O(h*(7+o()*9),f/2-.5,-10-u*6.5),p,new O(d,f,d)),s.setMatrixAt(l,r)}s.frustumCulled=!1,this.group.add(s);let c=40;this.shards=new oi(new Yr(.18),e,c),this.shards.frustumCulled=!1,this._s=Array.from({length:c},()=>({x:(Math.random()-.5)*30,y:2+Math.random()*10,z:-8-Math.random()*70,r:Math.random()*6,sp:.2+Math.random()*.6})),this.group.add(this.shards)}update(t,{now:e,L:i,C:s,wash:r,on:a}){let o=this.u;o.colL.value.copy(s[2]).multiplyScalar(.2+Math.min(1.5,i[2]+i[0]*.4)),o.colR.value.copy(s[3]).multiplyScalar(.2+Math.min(1.5,i[3]+i[0]*.4)),o.colRing.value.copy(s[1]).multiplyScalar(Math.min(1.5,i[1])),o.time.value=e,o.level.value=(.25+.3*Math.min(1.2,r))*a(.6);let c=new te,l=new Xe;this._s.forEach((h,u)=>{h.r+=t*h.sp,l.setFromEuler(new yi(h.r,h.r*.7,0)),c.compose(new O(h.x,h.y+Math.sin(e*.5+h.r)*.3,h.z),l,new O(1,1,1)),this.shards.setMatrixAt(u,c)}),this.shards.instanceMatrix.needsUpdate=!0}},Kd={tunnel:jh,orbital:Qh,city:tu,liquid:eu,crystal:iu},jd={tunnel:"Neon Tunnel",orbital:"Orbital",city:"Synth City",liquid:"Liquid Grid",crystal:"Crystal Hall"};var jt={left:new mt(1,.13,.32),right:new mt(.12,.55,1),white:new mt(.95,.9,1),violet:new mt(.62,.25,1),bg:new mt(.012,.004,.035)},n1=[jt.left,jt.right,jt.white],Ma=null;function Ye(){if(Ma)return Ma;let n=document.createElement("canvas");n.width=n.height=128;let t=n.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.55)"),e.addColorStop(.6,"rgba(255,255,255,0.12)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Ma=new Si(n),Ma.colorSpace=Ae,Ma}var cy=new te().makeScale(1,-1,1),On=(n,t=1,e={})=>new me({color:n,transparent:!0,opacity:t,blending:ue,depthWrite:!1,...e}),es={envTop:{value:new mt(.01,.005,.02)},envHorizon:{value:new mt(.2,.1,.4)},envLeft:{value:new mt(.5,.05,.1)},envRight:{value:new mt(.05,.2,.5)},envFloor:{value:new mt(.01,.01,.02)}};function hy(n){return new ce({uniforms:{color:{value:new mt(1,1,1)},opacity:{value:n}},vertexShader:`varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform vec3 color; uniform float opacity; varying vec3 vN; varying vec3 vV;
      void main(){ float f = abs(dot(normalize(vN), normalize(vV))); gl_FragColor = vec4(color * pow(f, 3.0) * opacity, 1.0); }`,transparent:!0,blending:ue,depthWrite:!1,side:De})}var Kl=class{constructor(t){this.scene=t,t.background=jt.bg.clone(),t.fog=new Er(jt.bg.getHex(),6,50),this.hemi=new jr(9075967,328458,1),t.add(this.hemi),this.sun=new ta(16777215,.7),this.sun.position.set(1,3,2),t.add(this.sun),this.groupColor=Array.from({length:5},()=>new mt),this.groupLevel=new Float32Array(5),this.flashScale=1,this.low=!1,this.time=0,this.lightColors=[jt.left.clone(),jt.right.clone(),jt.white.clone()],this.opts={musicFx:!0,playFx:!0,runway:!0,flyby:!0,skyline:!0,introFx:!0,beatSync:!0,theme:"tunnel"},this.power=1,this.powerT=1,this.outroT=-1,this.combo=1,this.comboTarget=1,this.lowEnergy=0,this._grey=new mt(.35,.35,.4),this._setMenuShow(),this.reflections=[],this.mirrorRoot=new Ee,this.mirrorRoot.name="Reflections",t.add(this.mirrorRoot),this.bg=.5,this._mix=new mt,this.baseHorizon=new mt(.08,.02,.16),this.baseTop=new mt(0,0,.012),this._buildSky(),this._buildFloor(),this._buildRails(),this._buildRings(),this._buildLasers(),this._buildTowers(),this._buildDust(),this._buildHorizon(),this._buildHaze(),this._buildRunway(),this._buildFlyby(),this._buildSkyline(),this.themes={};for(let[e,i]of Object.entries(Kd))this.themes[e]=new i(this);this.setOptions(this.opts)}setOptions(t){Object.assign(this.opts,t);let e=this.themes?.[this.opts.theme]?this.opts.theme:"tunnel";for(let[a,o]of Object.entries(this.themes||{}))o.setActive(a===e);let i=this.themes?.[e],s=i?i.showRings:!0,r=i?i.showTowers:!0;for(let a of this.rings)a.g.visible=s;this.towers.visible=r&&!this.low,this.floorUniforms.water.value=i?.water?1:0,this.runway.visible=this.opts.runway,this.flyby.visible=this.opts.flyby&&!this.low,this.skyline.visible=this.opts.skyline&&!this.low&&(i?i.showSkyline:!0),this.opts.playFx||(this.comboTarget=1,this.lowEnergy=0),this._applyExtraLasers()}setStageColors(t,e){this.lightColors[0].copy(t||jt.left),this.lightColors[1].copy(e||jt.right)}setCombo(t){this.comboTarget=this.opts.playFx?.55+.45*(Math.log2(Math.max(1,t))/3):1,this._mult=t,this._applyExtraLasers()}setLowEnergy(t){this.lowEnergy=this.opts.playFx?Math.max(0,Math.min(1,t)):0}_applyExtraLasers(){if(!this.lasers)return;let t=!this.opts.playFx||(this._mult||8)>=4;for(let e of this.lasers)e.extra&&(e.pivot.visible=!this.low&&t)}startIntro(){this.powerT=this.opts.introFx?0:1,this.outroT=-1}startOutro(){this.opts.introFx&&(this.outroT=0,this.flashAll(2,1.5))}endOutro(){this.outroT=-1,this.powerT=1}ripple(t,e,i=1){if(this.low||!this.opts.playFx&&!this.themes[this.opts.theme]?.water)return;let s=this.floorUniforms,r=this._rip=((this._rip||0)+1)%6;s.rip.value[r].set(t,e,this.time),s.ripStrength.value[r]=i}setShow(t){this.events=t||[],this._resetShow()}_setMenuShow(){this.menuShow=Zl({bpm:96,startSec:0,endSec:600,introSec:0}),this.setShow(this.menuShow),this.menuMode=!0}useMenuShow(){this.menuMode||(this.setShow(this.menuShow),this.menuMode=!0)}useSongShow(t){this.menuMode=!1,this.setShow(t)}_resetShow(){this.next=0,this.last=new Array(5).fill(null),this.override=new Array(5).fill(null),this.laserSpeed={left:1.5,right:1.5},this.lastShowTime=-1/0}flashAll(t=2,e=1.4){for(let i=0;i<5;i++)this.override[i]={time:this.lastShowTime,kind:"fade",color:t,brightness:e}}kick(t=1){this.kickLevel=Math.min(1.5,(this.kickLevel||0)+t)}setQuality(t){this.low=t,this.dust.visible=!t,this.mirrorRoot.visible=!t;for(let e of this.haze)e.visible=!t;this.floorUniforms.reflect.value=t?0:1,this.setOptions({})}_advance(t){t<this.lastShowTime-.5&&this._resetShow(),this.lastShowTime=t;let e=this.events;for(;this.next<e.length&&e[this.next].time<=t;){let i=e[this.next++];if(typeof i.group=="number")this.last[i.group]=i;else if(i.group==="laserSpeed"){this.laserSpeed[i.side]=i.value;for(let s of this.lasers)s.side===i.side&&(s.phase=Math.random()*Math.PI*2)}else i.group==="ringSpin"?this._ringSpin(t):i.group==="ringZoom"&&(this.ringZoomTarget=this.ringZoomTarget===1?0:1)}for(let i=0;i<5;i++){let s=this.last[i],r=Zh(s,t),a=this.lightColors,o=s?a[s.color]:a[1],c=this.override[i];if(c){let l=Zh(c,t);l<.02?this.override[i]=null:l>r&&(r=l,o=a[c.color])}r>1&&(r=1+(r-1)*this.flashScale),this.groupLevel[i]=r,this.groupColor[i].copy(o),this.lowEnergy>0&&(this.groupColor[i].lerp(this._grey,.75*this.lowEnergy),Math.random()<.12*this.lowEnergy&&(this.groupLevel[i]*=.25))}}_buildSky(){this.skyUniforms={top:{value:new mt(0,0,.01)},horizon:{value:new mt(.08,.02,.16)},tint:{value:new mt(0,0,0)},time:{value:0}};let t=new Vt(new ji(95,32,16),new ce({uniforms:this.skyUniforms,side:Oe,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
          uniform vec3 top; uniform vec3 horizon; uniform vec3 tint; uniform float time; varying vec3 vDir;
          float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
          void main(){
            float h = clamp(vDir.y, -0.2, 1.0);
            vec3 col = mix(horizon + tint * 0.22, top, smoothstep(0.0, 0.5, h));
            // Below the horizon (seen through the glossy floor) the sky falls to black.
            if (vDir.y < 0.0) col = (horizon + tint * 0.22) * (1.0 - smoothstep(0.0, 0.12, -vDir.y)) * 0.5;
            // Stars: sparse cells, twinkling slowly.
            vec3 cell = floor(vDir * 160.0);
            float s = hash(cell);
            float star = step(0.9965, s) * smoothstep(0.02, 0.25, h) * (0.6 + 0.4 * sin(time * 1.5 + s * 60.0));
            col += vec3(0.8, 0.75, 1.0) * star * 0.7;
            gl_FragColor = vec4(col, 1.0);
          }`}));t.renderOrder=-10,this.scene.add(t)}_buildFloor(){this.floorUniforms={offset:{value:0},glow:{value:new mt(.3,.1,.6)},glowLevel:{value:.4},fogColor:{value:jt.bg.clone()},reflect:{value:1},time:{value:0},water:{value:0},kick:{value:0},rip:{value:Array.from({length:6},()=>new O(0,0,-100))},ripStrength:{value:new Float32Array(6)},ripColor:{value:new mt(.6,.5,1)}};let t=new Vt(new ci(90,100,1,1),new ce({uniforms:this.floorUniforms,transparent:!0,depthWrite:!0,vertexShader:"varying vec2 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:`
          uniform float offset; uniform vec3 glow; uniform float glowLevel; uniform vec3 fogColor; uniform float reflect; varying vec2 vW;
          uniform float time; uniform float water; uniform float kick; uniform vec3 rip[6]; uniform float ripStrength[6]; uniform vec3 ripColor;
          float gridLine(float x, float w){ float d = abs(fract(x - 0.5) - 0.5) / fwidth(x); return 1.0 - clamp(d - w, 0.0, 1.0); }
          void main(){
            vec2 g = vec2(vW.x / 1.0, (vW.y + offset) / 2.0);
            float line = max(gridLine(g.x, 0.5), gridLine(g.y, 0.5));
            float dist = length(vW);
            vec3 base = vec3(0.018, 0.01, 0.035);
            vec3 lineCol = vec3(0.45, 0.2, 0.95) * (0.35 + 0.65 * glowLevel);
            vec3 col = base + lineCol * line * 0.13 * (1.0 - water);
            // Liquid Grid: slow waves with shimmering highlights in the light colours.
            if (water > 0.5) {
              float w1 = sin(vW.x * 1.1 + time * 0.9 + sin(vW.y * 0.3 + time * 0.4) * 2.0);
              float w2 = sin(vW.y * 0.8 - time * 1.4 + vW.x * 0.35);
              float shimmer = pow(max(0.0, w1 * w2), 6.0);
              col = vec3(0.006, 0.01, 0.025) + glow * glowLevel * shimmer * 0.5 + ripColor * (w1 * 0.5 + 0.5) * 0.015;
            }
            // Ripples from cuts and kicks.
            for (int i = 0; i < 6; i++) {
              float age = time - rip[i].z;
              if (age > 0.0 && age < 1.8 && ripStrength[i] > 0.0) {
                float r = age * (4.0 + 2.0 * water);
                float ring = max(0.0, 1.0 - abs(distance(vW, rip[i].xy) - r) * 2.2);
                col += ripColor * ring * ring * (1.0 - age / 1.8) * 0.55 * ripStrength[i];
              }
            }
            // Glow pooled under the track, like a reflection of the stage lights.
            float track = exp(-abs(vW.x) * 1.6) * smoothstep(-90.0, -2.0, vW.y);
            col += glow * glowLevel * track * 0.32;
            float fog = smoothstep(12.0, 60.0, dist);
            // Glossy floor: partly see-through near the player, where the mirrored
            // stage below shows as a reflection; solid in the distance.
            float alpha = mix(0.88 - 0.1 * water, 0.991, smoothstep(3.0, 55.0, dist));
            alpha = mix(1.0, alpha, reflect);
            gl_FragColor = vec4(mix(col, fogColor, fog), alpha);
          }`}));t.rotation.x=-Math.PI/2,t.position.z=-40,t.renderOrder=-1,this.scene.add(t);let e=new Vt(new Le(2.4,.05,1.6),new ri({color:1380394,roughness:.35,metalness:.7}));e.position.set(0,.025,0),this.scene.add(e),this.platEdge=On(jt.violet.clone(),.9);for(let[i,s,r,a]of[[2.42,.02,0,-.8],[2.42,.02,0,.8],[.02,1.6,-1.2,0],[.02,1.6,1.2,0]]){let o=new Vt(new Le(i,.012,s),this.platEdge);o.position.set(r,.055,a),this.scene.add(o)}}_buildRails(){this.railMats=[];for(let[t,e]of[[-1.5,jt.left],[1.5,jt.right]]){let i=On(e.clone(),1),s=new Vt(new Le(.03,.03,80),i);s.position.set(t,.03,-40),this.scene.add(s);let r=new Vt(new ci(.6,80),On(e.clone(),.3,{map:Ye()}));r.rotation.x=-Math.PI/2,r.position.set(t,.035,-40),this.scene.add(r),this.railMats.push({mat:i,glow:r.material,base:e.clone()}),this._reflect(s)}}_buildRings(){this.rings=[],this.ringMat=On(jt.violet.clone(),1),this.ringFrameMat=new ri({color:657426,metalness:.6,roughness:.45});let t=new Bi(7,.05,4,4),e=new Bi(7.35,.4,4,4);for(let i=0;i<14;i++){let s=new Ee,r=new Vt(t,this.ringMat),a=new Vt(e,this.ringFrameMat);s.add(a,r),s.rotation.z=Math.PI/4,s.position.set(0,3,-16),this.scene.add(s),this._reflect(r),this.rings.push({g:s,rot:Math.PI/4,from:Math.PI/4,to:Math.PI/4,start:0,delay:i*.035})}this.ringZoom=0,this.ringZoomTarget=0}_ringSpin(t){let e=Math.random()<.5?-1:1,i=Math.PI/2*(1+Math.floor(Math.random()*2));for(let s of this.rings)s.from=s.rot,s.to=s.rot+e*i,s.start=t+s.delay}_buildLasers(){this.lasers=[];let t=new li(.035,.035,60,6,1,!0),e=new li(.45,.45,60,10,1,!0);t.translate(0,30,0),e.translate(0,30,0),this.laserMats={};let i=r=>(this.laserMats[r]||(this.laserMats[r]={core:On(16777215,1),halo:hy(.35)}),this.laserMats[r]),s=(r,a,o,c,l,h,u)=>{let f=i(r),d=new Ee;d.position.set(a,o,c);let p=new Vt(t,f.core);d.add(p,new Vt(e,f.halo)),this.scene.add(d),this._reflect(p),this.lasers.push({pivot:d,group:r,side:l,tilt:h,phase:Math.random()*6.28,extra:u})};for(let r=0;r<7;r++)s(0,(r-3)*3.2,-2,-62,null,(r-3)*.16,r%2===1);for(let r=0;r<4;r++)s(2,-6-r*1.4,0,-22-r*7,"left",0,r>=2),s(3,6+r*1.4,0,-22-r*7,"right",0,r>=2)}_buildTowers(){this.towerUniforms={uColL:{value:new mt},uColR:{value:new mt},uColRing:{value:new mt},uColC:{value:new mt},uTime:{value:0},uEq:{value:0},uSpec:{value:new Float32Array(16)}};let e=new ri({color:460046,metalness:.9,roughness:.22});uy(e,this.towerUniforms);let i=new oi(new Le(1,1,1),e,28),s=new oi(new Le(1.04,.06,1.04),On(16777215,.95),28);for(let a=0;a<28;a++)s.setColorAt(a,new mt(0,0,0));this.towerStripMesh=s,this._stripColor=new mt;let r=new te;for(let a=0;a<28;a++){let o=a%2?1:-1,c=Math.floor(a/2),l=6+c*37%11+c%3*2,h=2+c%3,u=o*(19+c%4*3.5),f=-16-c*5.5;r.compose(new O(u,l/2,f),new Xe,new O(h,l,h)),i.setMatrixAt(a,r),r.compose(new O(u,l,f),new Xe,new O(h,1,h)),s.setMatrixAt(a,r)}this.towers=new Ee,this.towers.add(i,s),this.towerStrip=s.material,this.scene.add(this.towers)}_buildDust(){let e=new Float32Array(780);for(let s=0;s<260;s++)e[s*3]=(Math.random()-.5)*14,e[s*3+1]=Math.random()*6,e[s*3+2]=-Math.random()*40;let i=new oe;i.setAttribute("position",new fe(e,3)),this.dustMat=new Sn({size:.04,map:Ye(),color:12166911,transparent:!0,opacity:.55,blending:ue,depthWrite:!1}),this.dust=new hn(i,this.dustMat),this.dust.frustumCulled=!1,this.scene.add(this.dust),this._dustPos=e}_buildHorizon(){this.horizonMat=new ke({map:Ye(),color:16777215,transparent:!0,opacity:.5,blending:ue,depthWrite:!1,fog:!1});let t=new qe(this.horizonMat);t.scale.set(48,26,1),t.position.set(0,3,-75),this.scene.add(t)}_buildHaze(){this.haze=[];for(let[t,e,i,s,r]of[[-20,3,24,11,1.1],[-42,4.5,40,18,1.2]]){let a=new qe(new ke({map:Ye(),color:16777215,transparent:!0,opacity:.08,blending:ue,depthWrite:!1,fog:!1}));a.scale.set(i,s,1),a.position.set(0,e,t),a.userData.k=r,this.scene.add(a),this.haze.push(a)}}_buildRunway(){let e=new oi(new Le(.1,.015,.55),On(16777215,1),60),i=new te;for(let s=0;s<60;s++){let r=s<30?-1:1,a=-2-s%30*2;i.makeTranslation(r*1.15,.02,a),e.setMatrixAt(s,i),e.setColorAt(s,new mt(0,0,0))}e.frustumCulled=!1,this.runway=e,this._runwayN=30,this.scene.add(e)}_updateRunway(t,e,i,s,r,a,o){if(!this.runway.visible)return;let c=this._runwayN,l=this._m4r||(this._m4r=new te),h=this._stripColor2||(this._stripColor2=new mt);if(r){let f=0;for(let d=Math.floor(t)-1;f<c;d++){let p=Zs-(r.beatToSec(d)-a)*o;if(p<-62)break;let _=(d%4+4)%4===0,m=ze.smoothstep(p,-62,-40)*(1-ze.smoothstep(p,-3.5,.3));for(let g of[0,1]){let x=g*c+f;l.makeTranslation(g?1.15:-1.15,.02,p),this.runway.setMatrixAt(x,l);let b=g?3:2;h.copy(e[b]).lerp(jt.white,.35).multiplyScalar((_?1.1:.55)*(.5+.7*Math.min(1.3,i[4]+i[b]*.5))*m*s(.1)),this.runway.setColorAt(x,h)}f++}for(;f<c;f++)for(let d of[0,1])l.makeScale(0,0,0),this.runway.setMatrixAt(d*c+f,l);this.runway.instanceMatrix.needsUpdate=!0,this.runway.instanceColor.needsUpdate=!0,this._runwayMoved=!0;return}let u=(t%1+1)%1;for(let f=0;f<c*2;f++){let d=f%c;this._runwayMoved&&(l.makeTranslation(f<c?-1.15:1.15,.02,-2-d*2),this.runway.setMatrixAt(f,l));let p=1-d/(c-1),_=u-(1-p),m=Math.exp(-_*_*60)+.08,g=f<c?2:3;h.copy(e[g]).lerp(jt.white,.3).multiplyScalar(m*(.4+.8*Math.min(1.3,i[4]+i[g]*.5))*s(.1)),this.runway.setColorAt(f,h)}this._runwayMoved&&(this.runway.instanceMatrix.needsUpdate=!0,this._runwayMoved=!1),this.runway.instanceColor.needsUpdate=!0}_buildFlyby(){let e=new oi(new Le(1,1,1),new ri({color:723220,metalness:.6,roughness:.5}),24),i=new oi(new Le(1,1,1),On(16777215,1),24);e.frustumCulled=i.frustumCulled=!1;for(let s=0;s<24;s++)i.setColorAt(s,new mt(0,0,0));this.flyby=new Ee,this.flyby.add(e,i),this.scene.add(this.flyby),this._fly={frame:e,glow:i,count:8,z:Array.from({length:8},(s,r)=>-12-r*12)}}_updateFlyby(t,e,i,s,r,a,o,c){if(!this.flyby.visible)return;let l=this._fly,h=this._m4||(this._m4=new te),u=new Xe,f=(e?i*.55:1.2)*t,d=13,p=13,_=.6,m=this._stripColor3||(this._stripColor3=new mt),g=0,x=4,b=i*.6;if(o){let v=o.secToBeat(c);x=o.bpmAt(v)>150?8:4,g=Math.ceil(v/x)-1}for(let v=0;v<l.count;v++){let w;if(o?w=-(o.beatToSec((g+v)*x)-c)*b:(l.z[v]+=f,l.z[v]>6&&(l.z[v]-=l.count*12),w=l.z[v]),o&&(w<-100||w>6)){h.makeScale(0,0,0);for(let C=0;C<3;C++)l.frame.setMatrixAt(v*3+C,h),l.glow.setMatrixAt(v*3+C,h);continue}[[new O(-d,p/2,w),new O(_,p,_)],[new O(d,p/2,w),new O(_,p,_)],[new O(0,p,w),new O(d*2+_,_,_)]].forEach(([C,S],I)=>{h.compose(C,u,S),l.frame.setMatrixAt(v*3+I,h);let T=C.clone(),P=S.clone();I<2?(T.x+=I===0?_/2+.01:-_/2-.01,P.x=.04):(T.y-=_/2+.01,P.y=.04),h.compose(T,u,P),l.glow.setMatrixAt(v*3+I,h);let y=ze.smoothstep(w,-96,-60)*(1-ze.smoothstep(w,-16,-5));m.copy(s[0]).multiplyScalar((.1+Math.min(1.4,r[0])*.5)*y*a(.6)),l.glow.setColorAt(v*3+I,m)})}l.frame.instanceMatrix.needsUpdate=!0,l.glow.instanceMatrix.needsUpdate=!0,l.glow.instanceColor.needsUpdate=!0}_buildSkyline(){let t=document.createElement("canvas");t.width=2048,t.height=256;let e=t.getContext("2d"),i=0,s=7,r=()=>(s=s*16807%2147483647)/2147483647;for(;i<t.width;){let o=20+r()*70,c=40+r()*170;e.fillStyle="#000",e.fillRect(i,t.height-c,o,c),e.fillStyle="rgba(255,255,255,0.9)";for(let l=t.height-c+8;l<t.height-6;l+=9)for(let h=i+4;h<i+o-4;h+=7)r()<.18&&e.fillRect(h,l,2,3);i+=o+r()*6}let a=new Si(t);a.wrapS=As,a.repeat.x=3,a.colorSpace=Ae,this.skylineMat=new me({map:a,transparent:!0,side:Oe,fog:!1,depthWrite:!1,color:16777215}),this.skyline=new Vt(new li(88,88,18,48,1,!0),this.skylineMat),this.skyline.position.y=5,this.skyline.renderOrder=-9,this.scene.add(this.skyline)}_updateSkyline(t,e,i,s){this.skyline.visible&&(this.skyline.rotation.y+=t*.006,this.skylineMat.color.copy(e).lerp(jt.white,.4).multiplyScalar((.25+.5*i)*s(.8)))}_reflect(t){let e=new Vt(t.geometry,t.material);e.matrixAutoUpdate=!1,e.renderOrder=-2,this.mirrorRoot.add(e),this.reflections.push({src:t,dst:e})}_updateReflections(){for(let t of this.reflections)t.src.updateWorldMatrix(!0,!1),t.dst.matrix.multiplyMatrices(cy,t.src.matrixWorld),t.dst.visible=t.src.visible&&t.src.parent?.visible!==!1}update(t,{showTime:e,now:i,playing:s,speed:r,beat:a=i*1.6,music:o=null,tempo:c=null}){let l=this.opts.beatSync&&c?c:null;this.time=i,this._advance(e);let h=this.groupLevel,u=this.groupColor,f=this.opts.musicFx&&o;f&&o.kick&&(this.kick(.5),this.themes[this.opts.theme]?.water&&this.ripple(0,-9,.7));let d=this.kickLevel=Math.max(0,(this.kickLevel||0)-t*3);this.powerT<1&&(this.powerT=Math.min(1,this.powerT+t/1.8)),this.outroT>=0&&(this.outroT+=t),this.power=this.outroT>=0?Math.max(.12,1-this.outroT/1.6):1;let p=D=>this.power*ze.smoothstep(this.powerT,D,D+.25);if(this.combo+=(this.comboTarget-this.combo)*Math.min(1,t*3),f){h[0]+=o.kickLevel*.35,h[4]+=o.kickLevel*.25;let D=1+.3*o.buildUp;for(let z=0;z<h.length;z++)h[z]*=D}h[0]*=p(.5)*this.combo,h[1]*=p(.3)*(.7+.3*this.combo),h[2]*=p(.55)*this.combo,h[3]*=p(.55)*this.combo,h[4]*=p(0),this._on=p,this.ringMat.color.copy(u[1]).multiplyScalar(.15+h[1]*.85+d*.2),this.ringZoom+=(this.ringZoomTarget-this.ringZoom)*Math.min(1,t*2.5);let _=1+.05*d,m=4.2-this.ringZoom*2.4;this.rings.forEach((D,z)=>{let Y=ze.clamp((e-D.start)/1.1,0,1),V=1-Math.pow(1-Y,3);D.rot=D.start>e?D.from:D.from+(D.to-D.from)*V,D.g.rotation.z=D.rot+z*.012,D.g.position.z=-16-z*m,D.g.scale.setScalar(_)});for(let D of this.lasers){let z=this.laserMats[D.group],Y=h[D.group];if(z.core.color.copy(u[D.group]).multiplyScalar(Y),z.halo.uniforms.color.value.copy(u[D.group]).multiplyScalar(Y),D.side){let V=this.laserSpeed[D.side]*.45*(f?1+1.2*o.buildUp:1);D.phase+=t*V;let et=D.side==="left"?1:-1;D.pivot.rotation.z=et*(.35+.45*Math.sin(D.phase)),D.pivot.rotation.x=-.25+.15*Math.cos(D.phase*.7)}else D.pivot.rotation.z=D.tilt+Math.sin(i*.4+D.phase)*.05,D.pivot.rotation.x=-.12}let g=h[4];this.horizonMat.color.copy(u[4]),this.horizonMat.opacity=.12+.45*Math.min(1.5,g),this.floorUniforms.glow.value.copy(u[4]),this.floorUniforms.glowLevel.value=.25+.75*Math.min(1.5,g)+d*.3,this.platEdge.color.copy(u[4]).lerp(jt.violet,.5).multiplyScalar(.5+.6*g);let x=Math.min(1.8,.45*h[0]+.2*h[1]+.25*Math.max(h[2],h[3])+.55*h[4]);this.bg+=(x-this.bg)*Math.min(1,t*10);let b=this._mix.setRGB(0,0,0),v=0;for(let D=0;D<h.length;D++)b.r+=u[D].r*h[D],b.g+=u[D].g*h[D],b.b+=u[D].b*h[D],v+=h[D];v>.001?b.multiplyScalar(1/v):b.copy(jt.violet);let w=this.bg;this.skyUniforms.horizon.value.copy(this.baseHorizon).multiplyScalar(.1+.5*w),this.skyUniforms.horizon.value.r+=b.r*.1*w,this.skyUniforms.horizon.value.g+=b.g*.1*w,this.skyUniforms.horizon.value.b+=b.b*.1*w,this.skyUniforms.top.value.copy(this.baseTop).lerp(b,.02*w),this.skyUniforms.tint.value.copy(b).multiplyScalar(.08*w),this.skyUniforms.time.value=i;let A=Math.min(1.4,w);this.scene.fog.color.copy(jt.bg).multiplyScalar(.25+.35*A),this.scene.fog.color.r+=b.r*.14*A,this.scene.fog.color.g+=b.g*.14*A,this.scene.fog.color.b+=b.b*.14*A,this.hemi.color.copy(b).multiplyScalar(.25+.9*A),this.hemi.intensity=.5+.8*A,this.sun.intensity=.25+.45*A;for(let D of this.haze)D.material.color.copy(b),D.material.opacity=(.03+.1*A)*D.userData.k;let C=es.envLeft.value.copy(u[2]).multiplyScalar(h[2]);C.r+=u[0].r*h[0]*.5,C.g+=u[0].g*h[0]*.5,C.b+=u[0].b*h[0]*.5;let S=es.envRight.value.copy(u[3]).multiplyScalar(h[3]);S.r+=u[0].r*h[0]*.5,S.g+=u[0].g*h[0]*.5,S.b+=u[0].b*h[0]*.5,es.envHorizon.value.copy(b).multiplyScalar(.12+.55*A),es.envTop.value.copy(b).multiplyScalar(.03*A),es.envFloor.value.copy(u[4]).multiplyScalar(.02+.12*h[4]),this.floorUniforms.fogColor.value.copy(this.scene.fog.color);for(let D of this.railMats){let z=(.55+.45*Math.min(1.4,h[0])+d*.3)*p(.15);D.mat.color.copy(D.base).multiplyScalar(z),D.glow.opacity=.18+.25*Math.min(1.4,h[0])}let I=this.towerStripMesh;for(let D=0;D<I.count;D++){let z=D%2?3:2;this._stripColor.copy(u[z]).multiplyScalar((.06+Math.min(1.6,h[z])*.9+d*.15)*p(.7)),I.setColorAt(D,this._stripColor)}I.instanceColor.needsUpdate=!0;let T=this.towerUniforms;T.uColL.value.copy(u[2]).multiplyScalar(h[2]),T.uColR.value.copy(u[3]).multiplyScalar(h[3]),T.uColRing.value.copy(u[1]).multiplyScalar(h[1]),T.uColC.value.copy(u[4]).multiplyScalar(h[4]),T.uTime.value=i,T.uEq.value=f?p(.7):0,f?T.uSpec.value.set(o.spectrum):T.uSpec.value.fill(0),this.low||this._updateReflections();let P=this.floorUniforms;P.time.value=i,P.kick.value=d,P.ripColor.value.copy(b).lerp(jt.white,.3),P.glowLevel.value*=p(0),this._updateRunway(a,u,h,p,l,e,r),this._updateFlyby(t,s,r,u,h,p,l,e),this._updateSkyline(t,b,A,p);let y=this.themes[this.opts.theme],k=l?ze.clamp(l.bpmAt(a)/120,.6,1.6):1;if(y&&y.update(t,{now:i,playing:s,speed:r,L:h,C:u,mix:b,wash:A,kick:d,music:f?o:null,on:p,low:this.low,tempoScale:k}),s&&(this.floorUniforms.offset.value+=t*r),!this.low){let D=this._dustPos,z=(s?r*.35:.4)*t;for(let Y=0;Y<D.length;Y+=3)D[Y+2]+=z,D[Y+2]>2&&(D[Y+2]-=42);this.dust.geometry.attributes.position.needsUpdate=!0,this.dustMat.color.copy(u[1]).lerp(jt.white,.6)}}};function uy(n,t){n.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vNsWorld;`).replace("#include <project_vertex>",`#include <project_vertex>
      {
        vec4 nsW = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          nsW = instanceMatrix * nsW;
        #endif
        vNsWorld = (modelMatrix * nsW).xyz;
      }`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vNsWorld;
uniform vec3 uColL; uniform vec3 uColR; uniform vec3 uColRing; uniform vec3 uColC; uniform float uTime; uniform float uEq; uniform float uSpec[16];`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      {
        vec3 V = normalize(vViewPosition);
        float fres = pow(1.0 - abs(dot(normalize(normal), V)), 3.0);
        vec3 laser = mix(uColL, uColR, step(0.0, vNsWorld.x));
        float s1 = pow(max(0.0, sin(vNsWorld.z * 0.35 + vNsWorld.y * 0.12 - uTime * 1.3)), 24.0);
        float s2 = pow(max(0.0, sin(vNsWorld.z * 0.21 - vNsWorld.y * 0.08 + uTime * 0.9 + 1.7)), 30.0);
        float low = smoothstep(7.0, 0.0, vNsWorld.y);
        vec3 refl = laser * (s1 + s2) * 0.9 + uColRing * (0.12 + 0.3 * low) * 0.4 + uColC * fres * 0.5;
        totalEmissiveRadiance += refl * (0.45 + fres) * 0.3;
        // Light bands on the towers, lit by the light cues: side lasers on each
        // side's towers, ring lights between them, centre lights as a base glow.
        float fy = fract(vNsWorld.y * 0.55);
        float band = smoothstep(0.0, 0.04, fy) * (1.0 - smoothstep(0.08, 0.12, fy));
        float fy2 = fract(vNsWorld.y * 0.55 + 0.5);
        float band2 = smoothstep(0.0, 0.03, fy2) * (1.0 - smoothstep(0.05, 0.08, fy2));
        float base = smoothstep(2.5, 0.0, vNsWorld.y);
        // Equaliser: each tower shows one frequency band; bands below the level glow.
        float k = clamp(floor((-vNsWorld.z - 16.0) / 5.5 + 0.5), 0.0, 13.0);
        int bi = int(k) + (vNsWorld.x > 0.0 ? 2 : 0);
        float level = uSpec[bi] * 24.0;
        float lit = uEq * (1.0 - smoothstep(level - 0.4, level + 0.2, vNsWorld.y));
        float bandBoost = 1.0 + lit * 2.2;
        vec3 eqCol = mix(laser + uColRing * 0.3, vec3(1.0), 0.15) * lit * 0.12;
        totalEmissiveRadiance += (laser * band * 1.6 + uColRing * band2 * 0.9) * bandBoost + uColC * base * 0.5 + eqCol;
      }`)},n.customProgramCacheKey=()=>"tower-glass"}var Qd=.2,nu=150,wa=class{constructor(t,e,i,s,r=1){this.holder=t,this.hand=e,this.color=i.clone(),this.length=r,this.inputSource=null,this.tracker=new $l,this.base=xe(),this.tip=xe(),this.prevBase=xe(),this.prevTip=xe(),this.vel=xe(),this._primed=!1,this.pivot=new Ee,t.add(this.pivot);let a=new Vt(new li(.013,.013,r,14,1,!0),new ce({uniforms:{color:{value:i.clone()}},vertexShader:`varying vec3 vN; varying vec3 vV;
          void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform vec3 color; varying vec3 vN; varying vec3 vV;
          void main(){
            float f = abs(dot(normalize(vN), normalize(vV)));
            vec3 c = mix(color * 1.15, vec3(1.0), smoothstep(0.55, 0.92, f));
            gl_FragColor = vec4(c, 1.0);
          }`}));a.rotation.x=-Math.PI/2,a.position.z=-r/2,this.pivot.add(a);let o=new Vt(new li(.028,.028,r,12,1,!0),new me({color:i,transparent:!0,opacity:.2,blending:ue,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.z=-r/2,this.pivot.add(o);let c=new ke({map:Ye(),color:i,transparent:!0,opacity:.14,blending:ue,depthWrite:!1});for(let f=1;f<=4;f++){let d=new qe(c);d.scale.set(.16,.16,1),d.position.z=-r*f/4.5,this.pivot.add(d)}let l=new qe(new ke({map:Ye(),color:i.clone().lerp(new mt(1,1,1),.4),transparent:!0,opacity:.32,blending:ue,depthWrite:!1}));l.scale.set(.09,.09,1),l.position.z=-r,this.pivot.add(l);let h=new Vt(new li(.019,.022,.2,12),new ri({color:1776420,metalness:.85,roughness:.3}));h.rotation.x=-Math.PI/2,h.position.z=.07,this.pivot.add(h);let u=new Vt(new Bi(.024,.005,6,16),new me({color:i}));u.position.z=-.03,this.pivot.add(u),this._buildTrail(s)}setTilt(t){this.pivot.rotation.x=ze.degToRad(t)}set visible(t){this.pivot.visible=t,this.trail.visible=t}_buildTrail(t){let e=nu,i=new Float32Array(e*2*3),s=new Float32Array(e*2),r=new Float32Array(e*2);for(let l=0;l<e;l++)r[l*2]=0,r[l*2+1]=1;let a=[];for(let l=0;l<e-1;l++){let h=l*2,u=h+1,f=h+2,d=h+3;a.push(h,u,f,u,d,f)}let o=new oe;o.setAttribute("position",new fe(i,3).setUsage(ai)),o.setAttribute("alpha",new fe(s,1).setUsage(ai)),o.setAttribute("edge",new fe(r,1)),o.setIndex(a),o.setDrawRange(0,0);let c=new ce({uniforms:{color:{value:this.color}},vertexShader:`attribute float alpha; attribute float edge; varying float vA; varying float vE;
        void main(){ vA = alpha; vE = edge; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 color; varying float vA; varying float vE;
        void main(){
          float a = vA * smoothstep(0.0, 1.0, vE);
          vec3 c = mix(color, vec3(1.0), 0.35 * vA * vE);
          gl_FragColor = vec4(c * a * 0.6, a * 0.6);
        }`,transparent:!0,depthWrite:!1,blending:ue,side:De});this.trail=new Vt(o,c),this.trail.frustumCulled=!1,t.add(this.trail),this._trailPos=i,this._trailAlpha=s,this._hist=[]}sample(t,e){this.pivot.updateWorldMatrix(!0,!1);let i=this.pivot.matrixWorld,s=new O(0,0,0).applyMatrix4(i),r=new O(0,0,-this.length).applyMatrix4(i),a=xe(s.x,s.y,s.z),o=xe(r.x,r.y,r.z);this._primed||(this.base=a,this.tip=o,this._primed=!0),this.prevBase=this.base,this.prevTip=this.tip,this.base=a,this.tip=o,e>0&&(this.vel=xe(this.vel.x+((o.x-this.prevTip.x)/e-this.vel.x)*.6,this.vel.y+((o.y-this.prevTip.y)/e-this.vel.y)*.6,this.vel.z+((o.z-this.prevTip.z)/e-this.vel.z)*.6)),this.tracker.push(t,a,o),this._updateTrail(s,r,t)}_updateTrail(t,e,i){let s=t.clone().lerp(e,.12),r=this._hist;for(r.push({t:i,lo:s,tip:e.clone()});r.length>2&&i-r[0].t>Qd;)r.shift();for(;r.length>48;)r.shift();let a=this._trailPos,o=this._trailAlpha,c=3,l=0,h=(p,_,m,g,x,b)=>{let v=x*x,w=v*x;return b.set(.5*(2*_.x+(-p.x+m.x)*x+(2*p.x-5*_.x+4*m.x-g.x)*v+(-p.x+3*_.x-3*m.x+g.x)*w),.5*(2*_.y+(-p.y+m.y)*x+(2*p.y-5*_.y+4*m.y-g.y)*v+(-p.y+3*_.y-3*m.y+g.y)*w),.5*(2*_.z+(-p.z+m.z)*x+(2*p.z-5*_.z+4*m.z-g.z)*v+(-p.z+3*_.z-3*m.z+g.z)*w)),b},u=this._tmpA||(this._tmpA=new O),f=this._tmpC||(this._tmpC=new O);for(let p=r.length-1;p>0&&l<nu-1;p--){let _=r[Math.min(r.length-1,p+1)],m=r[p],g=r[p-1],x=r[Math.max(0,p-2)];for(let b=0;b<c&&l<nu-1;b++){let v=b/c;h(_.lo,m.lo,g.lo,x.lo,v,u),h(_.tip,m.tip,g.tip,x.tip,v,f);let w=(i-(m.t+(g.t-m.t)*v))/Qd,A=Math.pow(Math.max(0,1-w),1.5);a[l*6]=u.x,a[l*6+1]=u.y,a[l*6+2]=u.z,a[l*6+3]=f.x,a[l*6+4]=f.y,a[l*6+5]=f.z,o[l*2]=A,o[l*2+1]=A,l++}}let d=this.trail.geometry;d.setDrawRange(0,Math.max(0,l-1)*6),d.attributes.position.needsUpdate=!0,d.attributes.alpha.needsUpdate=!0}pulse(t,e){let i=this.inputSource?.gamepad;if(i)try{let s=i.hapticActuators?.[0];s?.pulse?s.pulse(t,e):i.vibrationActuator?.playEffect?.("dual-rumble",{duration:e,strongMagnitude:t,weakMagnitude:t})}catch{}}};var Ea=new O;function Ai(n,t,e,i,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;Ea.copy(t),Ea[i]=0,Ea.normalize();let l=.5*a/(a+o),h=1-Ea.angleTo(n)/c;return Math.sign(Ea[e])===1?h*l:o/(a+o)+l+l*(1-h)}var jl=class n extends Le{constructor(t=1,e=1,i=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(t/2,e/2,i/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:i,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new O,l=new O,h=new O(t,e,i).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,p=u.length/6,_=new O,m=.5/a;for(let g=0,x=0;g<u.length;g+=3,x+=2)switch(c.fromArray(u,g),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[g+0]=h.x*Math.sign(c.x)+l.x*r,u[g+1]=h.y*Math.sign(c.y)+l.y*r,u[g+2]=h.z*Math.sign(c.z)+l.z*r,f[g+0]=l.x,f[g+1]=l.y,f[g+2]=l.z,Math.floor(g/p)){case 0:_.set(1,0,0),d[x+0]=Ai(_,l,"z","y",r,i),d[x+1]=1-Ai(_,l,"y","z",r,e);break;case 1:_.set(-1,0,0),d[x+0]=1-Ai(_,l,"z","y",r,i),d[x+1]=1-Ai(_,l,"y","z",r,e);break;case 2:_.set(0,1,0),d[x+0]=1-Ai(_,l,"x","z",r,t),d[x+1]=Ai(_,l,"z","x",r,i);break;case 3:_.set(0,-1,0),d[x+0]=1-Ai(_,l,"x","z",r,t),d[x+1]=1-Ai(_,l,"z","x",r,i);break;case 4:_.set(0,0,1),d[x+0]=1-Ai(_,l,"x","y",r,t),d[x+1]=1-Ai(_,l,"y","x",r,e);break;case 5:_.set(0,0,-1),d[x+0]=Ai(_,l,"x","y",r,t),d[x+1]=1-Ai(_,l,"y","x",r,e);break}}static fromJSON(t){return new n(t.width,t.height,t.depth,t.segments,t.radius)}};function tp(n,t,e){let i=(s,r,a)=>xe(s*n,r*t,a*e);return[[i(1,-1,-1),i(1,1,-1),i(1,1,1),i(1,-1,1)],[i(-1,-1,1),i(-1,1,1),i(-1,1,-1),i(-1,-1,-1)],[i(-1,1,-1),i(-1,1,1),i(1,1,1),i(1,1,-1)],[i(-1,-1,1),i(-1,-1,-1),i(1,-1,-1),i(1,-1,1)],[i(-1,-1,1),i(1,-1,1),i(1,1,1),i(-1,1,1)],[i(1,-1,-1),i(-1,-1,-1),i(-1,1,-1),i(1,1,-1)]]}function fy(n,t,e,i,s){let r=[];for(let a=0;a<n.length;a++){let o=n[a],c=n[(a+1)%n.length],l=(Ie(t,o)-e)*i,h=(Ie(t,c)-e)*i;if(l>=0&&r.push(o),l>=0!=h>=0){let u=l/(l-h),f=Fn(o,dn(Je(c,o),u));r.push(f),s.push(f)}}return r.length>=3?r:null}function dy(n,t,e){let i=[];for(let c of n)i.some(l=>Un(Je(c,l))<1e-6)||i.push(c);if(i.length<3)return null;let s=dn(i.reduce((c,l)=>Fn(c,l),xe()),1/i.length),r=Math.abs(t.x)<.9?xe(1,0,0):xe(0,1,0),a=jn(Js(t,r)),o=Js(t,a);return i.sort((c,l)=>{let h=Je(c,s),u=Je(l,s);return Math.atan2(Ie(h,o),Ie(h,a))-Math.atan2(Ie(u,o),Ie(u,a))}),e>0?i:i.reverse()}function ep(n,t,e){let i={};for(let[s,r]of[["front",1],["back",-1]]){let a=[],o=[];for(let l of n){let h=fy(l,t,e,r,a);h&&o.push(h)}if(!o.length){i[s]=null;continue}let c=dy(a,t,-r);c&&o.push(c),i[s]={faces:o,cap:c?o.length-1:-1}}return i}var js=mi.BLOCK/2,Ql=class{constructor(){this.bodyGeo=new jl(mi.BLOCK,mi.BLOCK,mi.BLOCK,4,.075);let t=new Os;t.moveTo(-.14,-.035),t.lineTo(.14,-.035),t.lineTo(0,.085),t.closePath(),this.arrowGeo=new $r(t),this.dotGeo=new Nr(.055,20),this.markMat=new me({color:16777215,fog:!1}),this.bodyMats=[jt.left,jt.right].map(e=>new ri({color:e.clone().multiplyScalar(.42),emissive:e,emissiveIntensity:.07,roughness:.16,metalness:.7,fog:!1})),this.bodyMats.forEach((e,i)=>py(e,[jt.left,jt.right][i])),this.arrowGlowMat=new me({color:16777215,transparent:!0,opacity:.35,blending:ue,depthWrite:!1}),this.reflMats=[jt.left,jt.right].map(e=>new me({color:e.clone().multiplyScalar(.55)})),this.capMats=[jt.left,jt.right].map(e=>new me({color:e.clone().lerp(new mt(1,1,1),.55)})),this.glowMats=[jt.left,jt.right].map(e=>new ke({map:Ye(),color:e,transparent:!0,opacity:.28,blending:ue,depthWrite:!1})),this.bombGeo=new qr(.19,1),this.bombMat=new ri({color:1513244,metalness:.9,roughness:.25,flatShading:!0}),this.spikeGeo=new Ur(.045,.14,6),this.bombGlow=new ke({map:Ye(),color:6950944,transparent:!0,opacity:.6,blending:ue,depthWrite:!1}),this.bombCapMat=new me({color:16738858}),this.wallMat=new me({color:16719952,transparent:!0,opacity:.16,depthWrite:!1,side:De,blending:ue}),this.wallEdgeMat=new bi({color:16728176}),this.unitBox=new Le(1,1,1),this.unitEdges=new Or(this.unitBox)}makeNote(t){let e=new Ee;if(t.kind===Te.BOMB){e.add(new Vt(this.bombGeo,this.bombMat));let r=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];for(let[o,c,l]of r){let h=new Vt(this.spikeGeo,this.bombMat);h.position.set(o*.2,c*.2,l*.2),h.quaternion.setFromUnitVectors(new O(0,1,0),new O(o,c,l)),e.add(h)}let a=new qe(this.bombGlow);return a.scale.set(.7,.7,1),e.add(a),e}e.add(new Vt(this.bodyGeo,this.bodyMats[t.hand]));let i=new Vt(t.dir===ge.ANY?this.dotGeo:this.arrowGeo,this.markMat);i.position.z=js+.002,e.add(i);let s=new qe(this.glowMats[t.hand]);return s.scale.set(.9,.9,1),s.position.z=-.05,e.add(s),e.userData.finalAngle=Ud(t.dir),e}makeReflection(t){let e=new Ee;return t.kind===Te.BOMB?e.add(new Vt(this.bombGeo,this.bombMat)):e.add(new Vt(this.bodyGeo,this.reflMats[t.hand])),e}makeWallReflection(){let t=new Vt(this.unitBox,this.wallMat);return t.renderOrder=-2,t}makeWall(){let t=new Ee;return t.add(new Vt(this.unitBox,this.wallMat)),t.add(new cn(this.unitEdges,this.wallEdgeMat)),t}slice(t,e,i,s){t.updateWorldMatrix(!0,!1);let r=new te().copy(t.matrixWorld).invert(),a=new O(i.x,i.y,i.z),o=a.clone().transformDirection(r),c=new O(s.x,s.y,s.z).applyMatrix4(r),l=xe(o.x,o.y,o.z),h=gi(Ie(l,xe(c.x,c.y,c.z)),-js*.75,js*.75),u=e.kind===Te.BOMB,f=tp(u?.17:js,u?.17:js,u?.17:js),{front:d,back:p}=ep(f,l,h),_=u?this.bombMat:this.bodyMats[e.hand],m=u?this.bombCapMat:this.capMats[e.hand],g=[];for(let[x,b]of[[d,1],[p,-1]]){if(!x)continue;let v=my(x.faces,x.cap);v.computeBoundingBox();let w=new O;v.boundingBox.getCenter(w),v.translate(-w.x,-w.y,-w.z);let A=new Vt(v,[_,m]);A.position.copy(w).applyMatrix4(t.matrixWorld),A.quaternion.setFromRotationMatrix(t.matrixWorld),A.userData.side=b,A.userData.normal=a.clone(),g.push(A)}return g}};function py(n,t){let e=t.clone().lerp(new mt(1,1,1),.35),i=t.clone().lerp(new mt(1,1,1),.25),s=t.clone(),r=t.clone().multiplyScalar(.42);n.onBeforeCompile=a=>{a.uniforms.rimColor={value:e},a.uniforms.tint={value:i},a.uniforms.selfColor={value:s},a.uniforms.floorColor={value:r},Object.assign(a.uniforms,es),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
      uniform vec3 rimColor; uniform vec3 tint; uniform vec3 selfColor; uniform vec3 floorColor;
      uniform vec3 envTop; uniform vec3 envHorizon; uniform vec3 envLeft; uniform vec3 envRight; uniform vec3 envFloor;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      {
        vec3 N = normalize(normal);
        vec3 V = normalize(vViewPosition);
        float ndv = abs(dot(N, V));
        float fres = 0.1 + 0.9 * pow(1.0 - ndv, 4.0);
        // Reflection direction in world space (inverse view rotation).
        vec3 Rw = normalize((vec4(reflect(-V, N), 0.0) * viewMatrix).xyz);
        float h = Rw.y;
        vec3 side = mix(envLeft, envRight, smoothstep(-0.6, 0.6, Rw.x));
        vec3 env = mix(envFloor, envHorizon, smoothstep(-0.35, 0.0, h));
        env = mix(env, envTop, smoothstep(0.05, 0.6, h));
        env += side * exp(-abs(h) * 5.0) * 1.3;                       // bright band of stage lights
        float strip = pow(max(0.0, cos(atan(Rw.x, -Rw.z) * 6.0)), 28.0) * smoothstep(0.8, 0.1, abs(h));
        env += side * strip * 1.6;                                     // reflected laser strips
        // Reflections keep the block's own hue: use the brightness of what is
        // reflected, coloured by the block, plus only a little of the true colour.
        float envL = dot(env, vec3(0.299, 0.587, 0.114));
        vec3 refl = selfColor * envL * 1.1 + env * 0.06;
        totalEmissiveRadiance += refl * (0.22 + 1.3 * fres);
        totalEmissiveRadiance += rimColor * pow(1.0 - ndv, 3.0) * 0.55;
        // Constant self-glow so the colour reads even with the stage lights off.
        totalEmissiveRadiance += selfColor * 0.16;
      }`).replace("#include <colorspace_fragment>",`#include <colorspace_fragment>
      {
        vec3 c = gl_FragColor.rgb;
        float l = max(dot(c, vec3(0.299, 0.587, 0.114)), 1e-4);
        float l2 = clamp((l - 0.3) * 1.5 + 0.3, 0.0, 1.0);
        c *= l2 / l;
        // If a channel overflows, scale the whole colour down so it stays saturated
        // instead of bleaching toward white.
        float m = max(c.r, max(c.g, c.b));
        if (m > 1.0) c /= m;
        gl_FragColor.rgb = max(c, floorColor);
      }`)},n.customProgramCacheKey=()=>"note-lacquer"}function my(n,t){let e=[],i=[],s=new oe,r=0,a=n.map((o,c)=>c).sort((o,c)=>(o===t)-(c===t));for(let o of a){let c=n[o],l=c[0];for(let h=1;h+1<c.length;h++){let u=c[h],f=c[h+1],d=u.x-l.x,p=u.y-l.y,_=u.z-l.z,m=f.x-l.x,g=f.y-l.y,x=f.z-l.z,b=p*x-_*g,v=_*m-d*x,w=d*g-p*m,A=Math.hypot(b,v,w)||1;b/=A,v/=A,w/=A;for(let C of[l,u,f])e.push(C.x,C.y,C.z),i.push(b,v,w);o!==t&&(r+=3)}}return s.setAttribute("position",new ee(e,3)),s.setAttribute("normal",new ee(i,3)),s.addGroup(0,r,0),s.addGroup(r,e.length/3-r,1),s}var Ci=600,su=.022,tc=class{constructor(t){this.pos=new Float32Array(Ci*3),this.vel=new Float32Array(Ci*3),this.col=new Float32Array(Ci*3),this.life=new Float32Array(Ci),this.maxLife=new Float32Array(Ci),this.baseSize=new Float32Array(Ci),this.next=0,this.linePos=new Float32Array(Ci*6),this.lineCol=new Float32Array(Ci*6);let e=new oe;e.setAttribute("position",new fe(this.linePos,3).setUsage(ai)),e.setAttribute("color",new fe(this.lineCol,3).setUsage(ai)),this.lines=new cn(e,new bi({vertexColors:!0,transparent:!0,blending:ue,depthWrite:!1})),this.lines.frustumCulled=!1,t.add(this.lines),this.headSize=new Float32Array(Ci),this.headCol=new Float32Array(Ci*3);let i=new oe;i.setAttribute("position",new fe(this.pos,3).setUsage(ai)),i.setAttribute("color",new fe(this.headCol,3).setUsage(ai)),i.setAttribute("size",new fe(this.headSize,1).setUsage(ai));let s=new ce({uniforms:{map:{value:Ye()},scale:{value:600}},vertexShader:`attribute float size; attribute vec3 color; varying vec3 vC;
        uniform float scale;
        void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = size * scale / max(0.1, -mv.z); gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform sampler2D map; varying vec3 vC;
        void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC * t.a, t.a); }`,transparent:!0,depthWrite:!1,blending:ue});this.points=new hn(i,s),this.points.frustumCulled=!1,t.add(this.points)}burst(t,e,i=28,s=3,r=null){for(let a=0;a<i;a++){let o=this.next;this.next=(this.next+1)%Ci,this.pos[o*3]=t.x,this.pos[o*3+1]=t.y,this.pos[o*3+2]=t.z;let c=Math.random()*Math.PI*2,l=Math.acos(Math.random()*2-1),h=s*(.4+Math.random()*1.2),u=Math.sin(l)*Math.cos(c)*h,f=Math.sin(l)*Math.sin(c)*h,d=Math.cos(l)*h;r&&(u+=r.x*s*.9,f+=r.y*s*.9,d+=r.z*s*.9),this.vel[o*3]=u,this.vel[o*3+1]=f,this.vel[o*3+2]=d;let p=.3+Math.random()*.5;this.col[o*3]=e.r+(1-e.r)*p,this.col[o*3+1]=e.g+(1-e.g)*p,this.col[o*3+2]=e.b+(1-e.b)*p,this.maxLife[o]=this.life[o]=.3+Math.random()*.45,this.baseSize[o]=.012+Math.random()*.014}}update(t){let e=Math.exp(-t*2.2),i=this.linePos,s=this.lineCol;for(let o=0;o<Ci;o++){let c=o*3,l=o*6;if(this.life[o]<=0){this.headSize[o]=0,s[l]=s[l+1]=s[l+2]=s[l+3]=s[l+4]=s[l+5]=0;continue}this.life[o]-=t,this.vel[c]*=e,this.vel[c+1]=this.vel[c+1]*e-5*t,this.vel[c+2]*=e,this.pos[c]+=this.vel[c]*t,this.pos[c+1]+=this.vel[c+1]*t,this.pos[c+2]+=this.vel[c+2]*t;let h=Math.max(0,this.life[o]/this.maxLife[o]);i[l]=this.pos[c],i[l+1]=this.pos[c+1],i[l+2]=this.pos[c+2],i[l+3]=this.pos[c]-this.vel[c]*su,i[l+4]=this.pos[c+1]-this.vel[c+1]*su,i[l+5]=this.pos[c+2]-this.vel[c+2]*su;let u=this.col[c]*h,f=this.col[c+1]*h,d=this.col[c+2]*h;s[l]=u,s[l+1]=f,s[l+2]=d,s[l+3]=u*.15,s[l+4]=f*.15,s[l+5]=d*.15,this.headCol[c]=u,this.headCol[c+1]=f,this.headCol[c+2]=d,this.headSize[o]=this.life[o]>0?this.baseSize[o]*(.4+.6*h):0}let r=this.lines.geometry.attributes;r.position.needsUpdate=!0,r.color.needsUpdate=!0;let a=this.points.geometry.attributes;a.position.needsUpdate=!0,a.color.needsUpdate=!0,a.size.needsUpdate=!0}};function gy(){let n=document.createElement("canvas");n.width=256,n.height=32;let t=n.getContext("2d"),e=t.createLinearGradient(0,0,256,0);e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.5,"rgba(255,255,255,1)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,256,32),t.globalCompositeOperation="destination-in";let i=t.createLinearGradient(0,0,0,32);i.addColorStop(0,"rgba(0,0,0,0)"),i.addColorStop(.5,"rgba(0,0,0,1)"),i.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=i,t.fillRect(0,0,256,32);let s=new Si(n);return s.colorSpace=Ae,s}function _y(){let n=document.createElement("canvas");n.width=n.height=128;let t=n.getContext("2d"),e=t.createRadialGradient(64,64,40,64,64,62);e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.6,"rgba(255,255,255,0.9)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);let i=new Si(n);return i.colorSpace=Ae,i}var ru=(n,t=16777215)=>new me({map:n,color:t,transparent:!0,opacity:0,blending:ue,depthWrite:!1,side:De}),ec=class{constructor(t){this.scene=t;let e=gy(),i=_y(),s=new ci(1,1);this.slashes=Array.from({length:10},()=>this._make(s,ru(e))),this.rings=Array.from({length:10},()=>this._make(s,ru(i))),this.bursts=Array.from({length:3},()=>this._make(s,ru(i))),this.flashes=Array.from({length:8},()=>{let r=new qe(new ke({map:Ye(),transparent:!0,opacity:0,blending:ue,depthWrite:!1}));return r.visible=!1,t.add(r),{obj:r,life:0,max:1}}),this._i={slash:0,ring:0,burst:0,flash:0}}_make(t,e){let i=new Vt(t,e);return i.visible=!1,i.renderOrder=15,this.scene.add(i),{obj:i,life:0,max:1}}_next(t,e){let i=t[this._i[e]];return this._i[e]=(this._i[e]+1)%t.length,i}cut(t,e,i,s=1){let r=this._next(this.slashes,"slash");r.obj.position.copy(t),r.obj.position.z+=.24,r.obj.rotation.set(0,0,Math.atan2(e.y,e.x)),r.obj.material.color.copy(i).lerp(new mt(1,1,1),.5),r.base=1.3*s,r.life=r.max=.22,r.obj.visible=!0;let a=this._next(this.rings,"ring");a.obj.position.copy(t),a.obj.rotation.set(0,0,0),a.obj.material.color.copy(i),a.base=.2,a.grow=1.6*s,a.life=a.max=.35,a.obj.visible=!0,this.flash(t,i,.9*s,.18)}flash(t,e,i=1,s=.2){let r=this._next(this.flashes,"flash");r.obj.position.copy(t),r.obj.material.color.copy(e),r.size=i,r.life=r.max=s,r.obj.visible=!0}burst(t,e=1.2){let i=this._next(this.bursts,"burst");i.obj.position.set(0,e,-2.5),i.obj.rotation.set(0,0,0),i.obj.material.color.copy(t),i.base=.5,i.grow=9,i.life=i.max=.9,i.obj.visible=!0}update(t){for(let e of this.slashes){if(e.life<=0)continue;e.life-=t;let i=Math.max(0,e.life/e.max);e.obj.scale.set(e.base*(1.4-.4*i),.09*(.4+i),1),e.obj.material.opacity=i,e.life<=0&&(e.obj.visible=!1)}for(let e of[this.rings,this.bursts])for(let i of e){if(i.life<=0)continue;i.life-=t;let s=Math.max(0,i.life/i.max),r=i.base+i.grow*(1-s*s);i.obj.scale.set(r,r,1),i.obj.material.opacity=s*.9,i.life<=0&&(i.obj.visible=!1)}for(let e of this.flashes){if(e.life<=0)continue;e.life-=t;let i=Math.max(0,e.life/e.max),s=e.size*(1.2-.4*i);e.obj.scale.set(s,s,1),e.obj.material.opacity=i,e.life<=0&&(e.obj.visible=!1)}}clear(){for(let t of[this.slashes,this.rings,this.bursts,this.flashes])for(let e of t)e.life=0,e.obj.visible=!1}};var ic=class{constructor(){this.spectrum=new Float32Array(16),this.bass=0,this.mid=0,this.high=0,this.energy=0,this.buildUp=0,this.kick=!1,this.kickLevel=0,this._bassAvg=0,this._longEnergy=0,this._sinceKick=1}update(t,e,i){let s=t.length;if(!s)return this;let r=e/2/s,a=(h,u)=>{let f=Math.max(0,Math.floor(h/r)),d=Math.min(s-1,Math.ceil(u/r)),p=0;for(let _=f;_<=d;_++)p+=t[_];return p/((d-f+1)*255)},o=1-Math.exp(-i*18);this.bass+=(a(40,160)-this.bass)*o,this.mid+=(a(250,2e3)-this.mid)*o,this.high+=(a(4e3,12e3)-this.high)*o;for(let h=0;h<16;h++){let u=40*Math.pow(350,h/16),f=40*Math.pow(350,(h+1)/16),d=Math.min(1,a(u,f)*1.25);this.spectrum[h]+=(d-this.spectrum[h])*(d>this.spectrum[h]?.6:1-Math.exp(-i*6))}let c=a(40,140);this._sinceKick+=i,this.kick=c>this._bassAvg*1.25+.06&&c>.25&&this._sinceKick>.18,this.kick&&(this._sinceKick=0,this.kickLevel=1),this.kickLevel*=Math.exp(-i*7),this._bassAvg+=(c-this._bassAvg)*(1-Math.exp(-i*4));let l=(this.bass+this.mid+this.high)/3;return this.energy+=(l-this.energy)*(1-Math.exp(-i*1.5)),this._longEnergy+=(l-this._longEnergy)*(1-Math.exp(-i*.15)),this.buildUp=Math.max(0,Math.min(1,(this.energy-this._longEnergy)*6)),this}reset(){this.spectrum.fill(0),this.bass=this.mid=this.high=this.energy=this.buildUp=this.kickLevel=0,this._bassAvg=this._longEnergy=0,this.kick=!1}};function ip(n){let e=new Float32Array(24);for(let l=0;l<n.length;l+=4){let h=n[l]/255,u=n[l+1]/255,f=n[l+2]/255,d=Math.max(h,u,f),p=Math.min(h,u,f),_=d===0?0:(d-p)/d;if(_<.25||d<.2)continue;let m,g=d-p;d===h?m=(u-f)/g%6:d===u?m=(f-h)/g+2:m=(h-u)/g+4,m=(m*60+360)%360,e[Math.floor(m/360*24)%24]+=_*d}let i=-1,s=0;for(let l=0;l<24;l++)e[l]>s&&(s=e[l],i=l);if(i<0||s<1)return null;let r=-1,a=0;for(let l=0;l<24;l++)Math.min(Math.abs(l-i),24-Math.abs(l-i))*15>=60&&e[l]>a&&(a=e[l],r=l);let o=(i+.5)*(360/24),c=r>=0&&a>s*.08?(r+.5)*(360/24):(o+180)%360;return{a:Ta(o,.85,1),b:Ta(c,.85,1)}}function Ta(n,t,e){let i=e*t,s=i*(1-Math.abs(n/60%2-1)),r=e-i,a=0,o=0,c=0;return n<60?[a,o]=[i,s]:n<120?[a,o]=[s,i]:n<180?[o,c]=[i,s]:n<240?[o,c]=[s,i]:n<300?[a,c]=[s,i]:[a,c]=[i,s],[a+r,o+r,c+r]}var Qs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var _i=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},xy=new An(-1,1,1,-1,0,1),au=class extends oe{constructor(){super(),this.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ee([0,2,0,0,2,0],2))}},vy=new au,Bn=class{constructor(t){this._mesh=new Vt(vy,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,xy)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var nc=class extends _i{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof ce?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=fn.clone(t.uniforms),this.material=new ce({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Bn(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Aa=class extends _i{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},sc=class extends _i{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var rc=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new _t);this._width=i.width,this._height=i.height,e=new Fe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$e}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new nc(Qs),this.copyPass.material.blending=Mi,this.timer=new ea}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Aa!==void 0&&(a instanceof Aa?i=!0:a instanceof sc&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new _t);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ac=class extends _i{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new mt}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var np={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new mt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var tr=class n extends _i{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new _t(t.x,t.y):new _t(256,256),this.clearColor=new mt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Fe(r,a,{type:$e,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let u=new Fe(r,a,{type:$e,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);let f=new Fe(r,a,{type:$e,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}let o=np;this.highPassUniforms=fn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ce({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new _t(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=fn.clone(Qs.uniforms),this.blendMaterial=new ce({uniforms:this.copyUniforms,vertexShader:Qs.vertexShader,fragmentShader:Qs.fragmentShader,premultipliedAlpha:!0,blending:ue,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new mt,this._oldClearAlpha=1,this._basic=new me,this._fsQuad=new Bn(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new _t(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){let e=[],i=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(i*i))/i);let s=[],r=[];for(let a=1;a<t;a+=2){let o=e[a],c=a+1<t?e[a+1]:0,l=o+c;s.push((a*o+(a+1)*c)/l),r.push(l)}return new ce({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new _t(.5,.5)},direction:{value:new _t(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new ce({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};tr.BlurDirectionX=new _t(1,0);tr.BlurDirectionY=new _t(0,1);var Ca={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var oc=class extends _i{constructor(){super(),this.isOutputPass=!0,this.uniforms=fn.clone(Ca.uniforms),this.material=new ks({name:Ca.name,uniforms:this.uniforms,vertexShader:Ca.vertexShader,fragmentShader:Ca.fragmentShader}),this._fsQuad=new Bn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},se.getTransfer(this._outputColorSpace)===he&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===sa?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ra?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===aa?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===oa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ca?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ha?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===la&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var lc='"Chakra Petch", "Segoe UI", Roboto, system-ui, sans-serif',qt={panel:"rgba(14, 8, 30, 0.92)",edge:"#8a4dff",text:"#f2ecff",dim:"#a99cc8",faint:"#5f5480",left:"#ff2152",right:"#1f8cff",gold:"#ffd166",button:"rgba(138, 77, 255, 0.16)",buttonHover:"rgba(138, 77, 255, 0.42)",good:"#4dffa6",bad:"#ff5470"},er=class{constructor(t,e,i,{interactive:s=!0,background:r=!0}={}){this.canvas=document.createElement("canvas"),this.canvas.width=t,this.canvas.height=e,this.g=this.canvas.getContext("2d"),this.tex=new Si(this.canvas),this.tex.colorSpace=Ae,this.tex.anisotropy=4;let a=i*e/t;this.mesh=new Vt(new ci(i,a),new me({map:this.tex,transparent:!0,depthWrite:!1})),this.mesh.renderOrder=10,this.interactive=s,this.background=r,this.buttons=[],this.hoverId=null,this.drawFn=null,this.dirty=!0}get visible(){return this.mesh.visible}set visible(t){this.mesh.visible=t}show(t){this.drawFn=t,this.hoverId=null,this.visible=!0,this.redraw()}redraw(){let t=this.g,e=this.canvas.width,i=this.canvas.height;t.clearRect(0,0,e,i),this.buttons=[],this.background&&(ou(t,4,4,e-8,i-8,28),t.fillStyle=qt.panel,t.fill(),t.lineWidth=4,t.strokeStyle=qt.edge,t.stroke()),this.drawFn&&this.drawFn(this),this.tex.needsUpdate=!0,this.dirty=!1}text(t,e,i,{size:s=36,color:r=qt.text,align:a="left",weight:o=500,maxWidth:c,baseline:l="alphabetic",spacing:h=0}={}){let u=this.g;u.font=`${o} ${s}px ${lc}`,u.fillStyle=r,u.textAlign=a,u.textBaseline=l,"letterSpacing"in u&&(u.letterSpacing=`${h}px`),u.fillText(String(t),e,i,c),"letterSpacing"in u&&(u.letterSpacing="0px")}fit(t,e,i,s=500){let r=this.g;r.font=`${s} ${i}px ${lc}`;let a=String(t);if(r.measureText(a).width<=e)return a;for(;a.length>1&&r.measureText(a+"\u2026").width>e;)a=a.slice(0,-1);return a+"\u2026"}button(t,e,i,s,r,a,o,{size:c=34,accent:l=qt.edge,selected:h=!1,disabled:u=!1,align:f="center",sub:d=null}={}){let p=this.g,_=this.hoverId===t&&!u;ou(p,e,i,s,r,16),p.fillStyle=h?sp(l,.45):_?qt.buttonHover:qt.button,p.fill(),p.lineWidth=h||_?4:2,p.strokeStyle=u?qt.faint:_||h?l:sp(l,.6),p.stroke();let m=f==="center"?e+s/2:e+24,g=u?qt.faint:qt.text;d?(this.text(a,m,i+r/2-4,{size:c,color:g,align:f,weight:600}),this.text(d,m,i+r/2+c*.75,{size:c*.62,color:qt.dim,align:f})):this.text(a,m,i+r/2,{size:c,color:g,align:f,weight:600,baseline:"middle"}),u||this.buttons.push({id:t,x:e,y:i,w:s,h:r,onClick:o})}rect(t,e,i,s,r,a=0){let o=this.g;a?(ou(o,t,e,i,s,a),o.fillStyle=r,o.fill()):(o.fillStyle=r,o.fillRect(t,e,i,s))}hitTest(t){let e=t.x*this.canvas.width,i=(1-t.y)*this.canvas.height;return this.buttons.find(s=>e>=s.x&&e<=s.x+s.w&&i>=s.y&&i<=s.y+s.h)||null}setHover(t){return t===this.hoverId?!1:(this.hoverId=t,this.redraw(),!0)}};function ou(n,t,e,i,s,r){n.beginPath(),n.moveTo(t+r,e),n.arcTo(t+i,e,t+i,e+s,r),n.arcTo(t+i,e+s,t,e+s,r),n.arcTo(t,e+s,t,e,r),n.arcTo(t,e,t+i,e,r),n.closePath()}function sp(n,t){let e=parseInt(n.slice(1),16);return`rgba(${e>>16&255}, ${e>>8&255}, ${e&255}, ${t})`}var cc=class{constructor(t,e=16){this.items=[];for(let i=0;i<e;i++){let s=document.createElement("canvas");s.width=256,s.height=96;let r=new Si(s);r.colorSpace=Ae;let a=new ke({map:r,transparent:!0,depthTest:!1,depthWrite:!1}),o=new qe(a);o.scale.set(.5,.1875,1),o.visible=!1,o.renderOrder=20,t.add(o),this.items.push({sprite:o,canvas:s,tex:r,life:0})}this.next=0}spawn(t,e,i,s=64,r=null){let a=this.items[this.next];this.next=(this.next+1)%this.items.length;let o=a.canvas.getContext("2d");o.clearRect(0,0,256,96),o.font=`700 ${s}px ${lc}`,o.textAlign="center",o.textBaseline="middle",o.lineWidth=8,o.strokeStyle="rgba(0,0,0,0.75)",o.strokeText(t,128,r?38:50,236),o.fillStyle=i,o.fillText(t,128,r?38:50,236),r&&(o.font=`500 24px ${lc}`,o.fillStyle="rgba(230,220,255,0.85)",o.fillText(r,128,80)),a.tex.needsUpdate=!0,a.sprite.position.set(e.x,e.y+.25,Math.min(e.z,-1.2)),a.sprite.visible=!0,a.sprite.material.opacity=1,a.life=.9}update(t){for(let e of this.items)e.life<=0||(e.life-=t,e.sprite.position.y+=t*.45,e.sprite.material.opacity=Math.min(1,e.life/.4),e.life<=0&&(e.sprite.visible=!1))}clear(){for(let t of this.items)t.life=0,t.sprite.visible=!1}};var rp=[{id:"neon-drive",title:"Neon Drive",artist:"Neon Slice synth",bpm:120,bars:40,loopBars:8,roots:[57,53,48,55],minor:[!0,!1,!1,!1],hatPattern:"offbeat",seed:7,hue:300},{id:"overclock",title:"Overclock",artist:"Neon Slice synth",bpm:140,bars:48,loopBars:8,roots:[50,46,53,48],minor:[!0,!1,!1,!1],hatPattern:"sixteenths",seed:21,hue:190}],hc=n=>440*Math.pow(2,(n-69)/12);function ap(n){let t=n>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296*2-1)}function op(n,t){let e=60/n.bpm,i=n.loopBars*4,s=Math.round(i*e*t),r=new Float32Array(s),a=ap(n.seed),o=_=>Math.round(_*t),c=(_,m)=>{r[(_%s+s)%s]+=m},l=_=>{let m=o(_),g=0;for(let x=0;x<.32*t;x++){let b=x/t;g+=2*Math.PI*(45+120*Math.exp(-b*30))/t,c(m+x,Math.sin(g)*Math.exp(-b*8)*.85)}},h=_=>{let m=o(_);for(let g=0;g<.2*t;g++){let x=g/t;c(m+g,a()*Math.exp(-x*18)*.3+Math.sin(2*Math.PI*185*x)*Math.exp(-x*28)*.28)}},u=(_,m)=>{let g=o(_),x=0;for(let b=0;b<.05*t;b++){let v=b/t,w=a();c(g+b,(w-x)*Math.exp(-v*80)*m),x=w}},f=(_,m,g)=>{let x=o(_),b=0;for(let v=0;v<m*t;v++){let w=v/t,A=2*(w*g%1)-1;b+=(A-b)*.18,c(x+v,b*Math.min(w/.005,1)*Math.exp(-w*4)*.32)}},d=(_,m,g)=>{let x=o(_);for(let b=0;b<m*t;b++){let v=b/t,w=2*Math.PI*g*v;c(x+b,(Math.sin(w)+.3*Math.sin(w*3)+.15*Math.sin(w*5))*Math.exp(-v*11)*.07)}},p=(_,m,g)=>{let x=o(_);for(let b=0;b<m*t;b++){let v=b/t,w=2*Math.PI*g*v;c(x+b,(Math.sin(w)+.5*Math.sin(w*1.003))*Math.sin(Math.PI*v/m)*.035)}};for(let _=0;_<i;_++){let m=_*e,g=Math.floor(_/8)%n.roots.length,x=n.roots[g],b=n.minor[g]?[0,3,7,12]:[0,4,7,12];if(l(m),_%2===1&&h(m),n.hatPattern==="sixteenths")for(let v=0;v<4;v++)u(m+v*e/4,v===2?.22:.1);else u(m,.08),u(m+e/2,.22);f(m,e*.45,hc(x-12)),f(m+e/2,e*.45,hc(x));for(let v=0;v<4;v++)d(m+v*e/4,e*.6,hc(x+12+b[(_*4+v)%4]));if(_%8===0)for(let v of[0,b[1],7])p(m,e*8,hc(x+v))}for(let _=0;_<s;_++){let m=r[_]*.9;r[_]=m/(1+Math.abs(m))}return r}function lp(n){let t=ap(99),e=(f,d)=>{let p=new Float32Array(Math.round(f*n));for(let _=0;_<p.length;_++)p[_]=d(_/n,_);return p},i=0,s=e(.2,f=>(i+=(t()-i)*(.7-.62*f/.2),i*Math.pow(Math.sin(Math.PI*f/.2),2)*.7+Math.sin(2*Math.PI*2400*f)*Math.exp(-f*90)*.35)),r=e(.3,f=>(f*95%1<.5?1:-1)*Math.exp(-f*9)*.35),a=0,o=e(.3,f=>(a+=2*Math.PI*(160-100*f/.3)/n,Math.sin(a)*Math.exp(-f*10)*.6)),c=0,l=e(.7,f=>{c+=(t()-c)*.12;let d=(c*2.5+Math.sin(2*Math.PI*55*f)*.5)*Math.exp(-f*5)*1.2;return d/(1+Math.abs(d))}),h=e(.05,f=>Math.sin(2*Math.PI*1500*f)*Math.exp(-f*120)*.8),u=e(.12,f=>Math.sin(2*Math.PI*(660+5500*f)*f)*Math.exp(-f*25)*.35);return{slice:s,bad:r,miss:o,bomb:l,click:h,blip:u}}var uc=class{constructor(){this.ctx=null,this.sfx={},this.source=null,this.songStart=0,this.offsetSec=0,this.musicGain=null,this.sfxGain=null,this.playing=!1}async init(){if(this.ctx){this.ctx.state==="suspended"&&await this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;this.ctx=new t({latencyHint:"interactive"}),this.musicGain=this.ctx.createGain(),this.sfxGain=this.ctx.createGain(),this.musicGain.connect(this.ctx.destination),this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=1024,this.analyser.smoothingTimeConstant=.45,this.musicIn=this.ctx.createGain(),this.musicIn.connect(this.musicGain),this.musicIn.connect(this.analyser),this._bins=new Uint8Array(this.analyser.frequencyBinCount),this.sfxGain.connect(this.ctx.destination);let e=lp(this.ctx.sampleRate);for(let[i,s]of Object.entries(e))this.sfx[i]=this.bufferFrom(s);this.ctx.state==="suspended"&&await this.ctx.resume()}bufferFrom(t){let e=this.ctx.createBuffer(1,t.length,this.ctx.sampleRate);return e.copyToChannel(t,0),e}setVolumes(t,e){this.ctx&&(this.musicGain.gain.value=t,this.sfxGain.gain.value=e)}heardTime(){let t=this.ctx;if(!t)return 0;if(t.getOutputTimestamp){let e=t.getOutputTimestamp();if(e&&e.performanceTime>0&&t.state==="running")return e.contextTime+(performance.now()-e.performanceTime)/1e3}return t.currentTime-(t.outputLatency||t.baseLatency||0)}songTime(){return this.heardTime()-this.songStart-this.offsetSec}playSong(t,{loop:e=!1,lead:i=.15}={}){this.stopSong();let s=this.ctx.createBufferSource();s.buffer=t,s.loop=e,s.connect(this.musicIn);let r=this.ctx.currentTime+i;s.start(r),this.source=s,this.songStart=r,this.playing=!0}stopSong(t=0){if(!this.source)return;let e=this.source;this.source=null,this.playing=!1;try{if(t>0){let i=this.ctx.createGain();e.disconnect(),e.connect(i),i.connect(this.musicIn),i.gain.setValueAtTime(1,this.ctx.currentTime),i.gain.linearRampToValueAtTime(0,this.ctx.currentTime+t),e.stop(this.ctx.currentTime+t+.05)}else e.stop()}catch{}}async pause(){this.ctx?.state==="running"&&await this.ctx.suspend()}async resume(){this.ctx?.state==="suspended"&&await this.ctx.resume()}play(t,e=1,i=0){let s=this.sfx[t];if(!s||!this.ctx)return;let r=this.ctx.createBufferSource();r.buffer=s;let a=this.ctx.createGain();a.gain.value=e,r.connect(a),a.connect(this.sfxGain),r.start(i||0)}bins(){return this.analyser?(this.analyser.getByteFrequencyData(this._bins),this._bins):null}async decode(t){return await this.ctx.decodeAudioData(t.slice(0))}};var fu=Vp(hp(),1);var is={Easy:{label:"Easy",njs:10,step:2,halfChance:0,doubleChance:0,diagChance:.1,anyChance:.15,bombChance:0,wallChance:0},Normal:{label:"Normal",njs:12,step:1,halfChance:0,doubleChance:.12,diagChance:.2,anyChance:.08,bombChance:.06,wallChance:.3},Hard:{label:"Hard",njs:14,step:1,halfChance:.3,doubleChance:.2,diagChance:.3,anyChance:.05,bombChance:.1,wallChance:.5},Expert:{label:"Expert",njs:16,step:1,halfChance:.55,doubleChance:.28,diagChance:.35,anyChance:.03,bombChance:.12,wallChance:.7}};function yy(n){let t=n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function by(n,t,e,i){if(n()<i.anyChance)return ge.ANY;let s=Fd(t),r=n();if(r<i.diagChance)s=Xh(s,n()<.5?1:-1);else if(r<i.diagChance+.12){let a=e===Ti.LEFT?ge.LEFT:ge.RIGHT;(t===ge.DOWN||t===ge.UP||t===ge.ANY)&&(s=a)}return s}function Sy(n,t){return n===ge.LEFT||n===ge.RIGHT?1:n===ge.UP_LEFT||n===ge.UP_RIGHT?t()<.7?0:1:n===ge.DOWN_LEFT||n===ge.DOWN_RIGHT?t()<.5?1:0:t()<.25?1:t()<.06?2:0}function up({bpm:n,bars:t,introBars:e=2,difficulty:i="Normal",seed:s=1}){let r=is[i]||is.Normal,a=yy(s*7919+Object.keys(is).indexOf(i)*104729),o=60/n,c=[],l=[],h=[ge.UP,ge.UP],u=0,f=t-e,d=[];for(let _=e;_<t;_+=8){if((_-e)/f<.2||a()>=r.wallChance)continue;let g=(_+2)*4,x=a()<.5?0:3,b=8;d.push({start:g,end:g+b,lane:x}),l.push({time:g*o,endTime:(g+b)*o,lane:x,width:1,row:0,height:5})}let p=(_,m)=>d.some(g=>g.lane===m&&_>=g.start-1&&_<g.end+.5);for(let _=e*4;_<t*4;_+=r.step){let m=Math.floor(_/4),g=(m-e)/f;if(m%8===7&&_%4>=3){i==="Expert"&&g>.3&&a()<.5&&l.push({time:(_-.25)*o,endTime:(_+.75)*o,lane:0,width:4,row:2,height:3});continue}let x=[0];a()<r.halfChance*(.5+g)&&(x=[0,.5]);for(let b of x){let v=(_+b)*o,A=b===0&&g>.1&&a()<r.doubleChance*(.6+g)?[Ti.LEFT,Ti.RIGHT]:[u++%2];for(let C of A){let S=by(a,h[C],C,r);h[C]=S;let I=C===Ti.LEFT?a()<.5?0:1:a()<.5?2:3;p(_+b,I)&&(I=C===Ti.LEFT?1:2),c.push({time:v,kind:Te.NOTE,hand:C,lane:I,row:Sy(S,a),dir:S})}}if(x.length===1&&g>.2&&a()<r.bombChance){let b=a()<.5?0:3;p(_+.5,b)||c.push({time:(_+.5)*o,kind:Te.BOMB,hand:-1,lane:b,row:2,dir:ge.ANY})}}return c.sort((_,m)=>_.time-m.time),l.sort((_,m)=>_.time-m.time),{notes:c,walls:l,njs:r.njs}}var My=["Standard","NoArrows","OneSaber","360Degree","90Degree","Lightshow"],fp=["Easy","Normal","Hard","Expert","ExpertPlus"];function wy(n,t){return fp.indexOf(n.name)-fp.indexOf(t.name)}function cu(n){var e;if(!n||typeof n!="object")throw new Error("Info.dat is not valid JSON.");if(typeof n.version=="string"&&n.version.startsWith("4")){let i=n.audio||{},s=n.song||{},r={};for(let a of n.difficultyBeatmaps||[])(r[e=a.characteristic]||(r[e]=[])).push({name:a.difficulty,label:a.difficulty==="ExpertPlus"?"Expert+":a.difficulty,file:a.beatmapDataFilename,njs:a.noteJumpMovementSpeed||0,offset:a.noteJumpStartBeatOffset||0,colors:pp(n.colorSchemes?.[a.beatmapColorSchemeIdx])});return dp({title:s.title||"Untitled",subTitle:s.subTitle||"",artist:s.author||"",mapper:(n.difficultyBeatmaps?.[0]?.beatmapAuthors?.mappers||[]).join(", "),bpm:i.bpm||120,songFile:i.songFilename,coverFile:n.coverImageFilename,previewStart:i.previewStartTime||0,byChar:r})}let t={};for(let i of n._difficultyBeatmapSets||[])t[i._beatmapCharacteristicName]=(i._difficultyBeatmaps||[]).map(s=>({name:s._difficulty,label:s._customData?._difficultyLabel||(s._difficulty==="ExpertPlus"?"Expert+":s._difficulty),file:s._beatmapFilename,njs:s._noteJumpMovementSpeed||0,offset:s._noteJumpStartBeatOffset||0,colors:Py(s._customData)||pp(n._colorSchemes?.[s._beatmapColorSchemeIdx]?.colorScheme)}));if(n._songName===void 0&&!Object.keys(t).length)throw new Error("This does not look like a Beat Saber Info.dat file.");return dp({title:n._songName||"Untitled",subTitle:n._songSubName||"",artist:n._songAuthorName||"",mapper:n._levelAuthorName||"",bpm:n._beatsPerMinute||120,songFile:n._songFilename,coverFile:n._coverImageFilename,previewStart:n._previewStartTime||0,byChar:t})}function dp(n){let t=Object.keys(n.byChar),e=My.find(s=>n.byChar[s]?.length)||t[0],i=(n.byChar[e]||[]).slice().sort(wy);for(let s of i)s.njs||(s.njs=Od[s.name]||12);if(delete n.byChar,!n.songFile)throw new Error("Info.dat does not name a song file.");if(!i.length)throw new Error("No playable difficulties found in Info.dat.");return{...n,characteristic:e,oneSaber:e==="OneSaber",difficulties:i}}function Ey(n){let t=n.version||n._version||"";return String(t).startsWith("4")?4:String(t).startsWith("3")||Array.isArray(n.colorNotes)?3:2}function hu(n){return n>=1e3?n/1e3-1:n<=-1e3?n/1e3+1:n}var Ty=n=>Math.min(3,Math.max(0,hu(n))),Ay=n=>Math.min(2,Math.max(0,hu(n)));function mp(n,t,e=[]){let i=Ey(n),s={notes:[],walls:[],bpmChanges:[...e]};i===2?Cy(n,s):i===3?Ry(n,s):Iy(n,s);let r=new $s(t,s.bpmChanges),a=s.notes.filter(l=>Number.isFinite(l.beat)&&l.beat>=0).map(l=>({time:r.beatToSec(l.beat),kind:l.kind,hand:l.kind===Te.BOMB?-1:l.hand,lane:Ty(l.x),row:Ay(l.y),dir:l.kind===Te.BOMB?8:l.d>=0&&l.d<=8?l.d:8})).sort((l,h)=>l.time-h.time),o=s.walls.filter(l=>l.w>0&&l.d>0&&l.h>0&&Number.isFinite(l.beat)).map(l=>{let h=hu(l.x);return{time:r.beatToSec(l.beat),endTime:r.beatToSec(l.beat+l.d),lane:h,width:l.w,row:Math.max(0,l.y),height:l.h}}).sort((l,h)=>l.time-h.time),c=Gd(n,l=>r.beatToSec(l));return{version:i,notes:a,walls:o,tempo:r,lights:c}}function Cy(n,t){for(let i of n._notes||[])i._type===0||i._type===1?t.notes.push({beat:i._time,kind:Te.NOTE,hand:i._type,x:i._lineIndex,y:i._lineLayer,d:i._cutDirection}):i._type===3&&t.notes.push({beat:i._time,kind:Te.BOMB,x:i._lineIndex,y:i._lineLayer});for(let i of n._obstacles||[]){let s=0,r=5;i._type===1?(s=2,r=3):(i._type===2||i._lineLayer!==void 0)&&(s=i._lineLayer??0,r=i._height??5),t.walls.push({beat:i._time,d:i._duration,x:i._lineIndex,w:i._width,y:s,h:r})}let e=n._customData?._BPMChanges||n._customData?._bpmChanges||n._BPMChanges||[];for(let i of e)t.bpmChanges.push({beat:i._time,bpm:i._BPM??i._bpm});for(let i of n._events||[])i._type===100&&i._floatValue>0&&t.bpmChanges.push({beat:i._time,bpm:i._floatValue})}function Ry(n,t){for(let e of n.colorNotes||[])t.notes.push({beat:e.b,kind:Te.NOTE,hand:e.c??0,x:e.x??0,y:e.y??0,d:e.d??0});for(let e of n.burstSliders||[])t.notes.push({beat:e.b,kind:Te.NOTE,hand:e.c??0,x:e.x??0,y:e.y??0,d:e.d??0});for(let e of n.bombNotes||[])t.notes.push({beat:e.b,kind:Te.BOMB,x:e.x??0,y:e.y??0});for(let e of n.obstacles||[])t.walls.push({beat:e.b,d:e.d,x:e.x??0,w:e.w,y:e.y??0,h:e.h});for(let e of n.bpmEvents||[])t.bpmChanges.push({beat:e.b,bpm:e.m})}function Iy(n,t){let e=n.colorNotesData||[];for(let a of n.colorNotes||[]){let o=e[a.i??0]||{};t.notes.push({beat:a.b,kind:Te.NOTE,hand:o.c??0,x:o.x??0,y:o.y??0,d:o.d??0})}let i=n.chainsData||[];for(let a of n.chains||[]){let o=i[a.i??0]||{};t.notes.push({beat:a.hb,kind:Te.NOTE,hand:o.c??0,x:o.x??0,y:o.y??0,d:o.d??0})}let s=n.bombNotesData||[];for(let a of n.bombNotes||[]){let o=s[a.i??0]||{};t.notes.push({beat:a.b,kind:Te.BOMB,x:o.x??0,y:o.y??0})}let r=n.obstaclesData||[];for(let a of n.obstacles||[]){let o=r[a.i??0]||{};t.walls.push({beat:a.b,d:o.d,x:o.x??0,w:o.w,y:o.y??0,h:o.h})}}function gp(n,t){let e=[],i=n?.songFrequency,s=n?.bpmData;if(!i||!Array.isArray(s)||s.length<2)return e;for(let r of s){let a=(r.ei-r.si)/i,o=r.eb-r.sb;a>0&&o>0&&e.push({beat:r.sb,bpm:o/a*60})}return e.length&&e[0].beat===0&&Math.abs(e[0].bpm-t)<.01&&e.shift(),e}function kn(n){if(!n)return null;if(typeof n=="string"){let t=n.replace("#","");return t.length<6?null:[0,2,4].map(e=>parseInt(t.slice(e,e+2),16)/255)}if(typeof n=="object"&&Number.isFinite(n.r)&&Number.isFinite(n.g)&&Number.isFinite(n.b)){let t=n.r>1||n.g>1||n.b>1;return[n.r,n.g,n.b].map(e=>Math.max(0,Math.min(1,t?e/255:e)))}return null}function _p(n){return!n.left&&!n.right&&!n.envLeft&&!n.envRight?null:{left:n.left||n.envLeft||null,right:n.right||n.envRight||null,envLeft:n.envLeft||n.left||null,envRight:n.envRight||n.right||null}}function Py(n){return n?_p({left:kn(n._colorLeft),right:kn(n._colorRight),envLeft:kn(n._envColorLeft),envRight:kn(n._envColorRight)}):null}function pp(n){return n?_p({left:kn(n.saberAColor),right:kn(n.saberBColor),envLeft:kn(n.environmentColor0),envRight:kn(n.environmentColor1)}):null}var Ly="neon-slice",du="maps";function Dy(){return new Promise((n,t)=>{let e;try{e=indexedDB.open(Ly,1)}catch(i){t(i);return}e.onupgradeneeded=()=>e.result.createObjectStore(du,{keyPath:"id"}),e.onsuccess=()=>n(e.result),e.onerror=()=>t(e.error)})}async function fc(n,t){let e=await Dy();return new Promise((i,s)=>{let r=e.transaction(du,n),a=t(r.objectStore(du));r.oncomplete=()=>i(a?.result??a),r.onerror=()=>s(r.error)})}var pc=class{constructor(t){this.audio=t,this.songs=[],this._loopCache=new Map;for(let e of rp)this.songs.push(this._builtIn(e))}_builtIn(t){return{id:t.id,title:t.title,artist:t.artist,mapper:"Generated",bpm:t.bpm,builtIn:!0,hue:t.hue,cover:null,difficulties:Object.keys(is).map(e=>({name:e,label:is[e].label,njs:is[e].njs,offset:0})),load:async e=>{if(!this._loopCache.has(t.id)){let s=op(t,this.audio.ctx.sampleRate);this._loopCache.set(t.id,this.audio.bufferFrom(s))}let i=up({bpm:t.bpm,bars:t.bars,introBars:2,difficulty:e,seed:t.seed});return{buffer:this._loopCache.get(t.id),loop:!0,notes:i.notes,walls:i.walls,njs:i.njs,njsOffset:0,bpm:t.bpm,duration:t.bars*4*60/t.bpm,tempo:new $s(t.bpm)}}}}async restore(){let t=[];try{t=await fc("readonly",e=>e.getAll())}catch{return}for(let e of t||[])try{await this._addZip(e.zip,e.id)}catch(i){console.warn("Skipping saved map",e.id,i)}}async importZip(t,e=!0){let i=await this._addZip(t);if(e)try{await fc("readwrite",s=>s.put({id:i.id,zip:t,added:Date.now()}))}catch{}return i}async remove(t){this.songs=this.songs.filter(e=>e.id!==t);try{await fc("readwrite",e=>e.delete(t))}catch{}}async importFolder(t,e=!0){let i=Array.from(t),s=c=>(c.webkitRelativePath||c.name).replace(/\\/g,"/"),r=i.filter(c=>/(^|\/)info\.dat$/i.test(s(c))),a=[],o=[];r.length||o.push("No Beat Saber maps found (no Info.dat in this folder or its sub-folders).");for(let c of r){let l=s(c).slice(0,-8),h=i.filter(d=>s(d).startsWith(l)&&!s(d).slice(l.length).includes("/")),u=h.map(d=>Ny(d,s(d))),f=h.reduce((d,p)=>d+p.size,0);try{let d=await this._addEntries(u,null,f,"folder");if(a.push(d),e){let p=new fu.default;for(let m of h)p.file(s(m).slice(l.length),m);let _=await p.generateAsync({type:"arraybuffer",compression:"STORE"});try{await fc("readwrite",m=>m.put({id:d.id,zip:_,added:Date.now()}))}catch{}}}catch(d){o.push(`${l.replace(/\/$/,"")}: ${d.message||d}`)}}return{added:a,errors:o}}async scanServerFolder(t=["Songs/","../Songs/"]){let e=[];for(let i of t){let s=null;try{let r=await fetch(i+"index.json",{cache:"no-store"});r.ok&&(s=(await r.json()).map(a=>typeof a=="string"?a:a.folder).filter(Boolean))}catch{}if(!s)try{let r=await fetch(i,{cache:"no-store"});if(!r.ok)continue;s=Fy(await r.text()).filter(a=>a.endsWith("/")).map(a=>decodeURIComponent(a.slice(0,-1)))}catch{continue}for(let r of s){let a=i+r.split("/").map(encodeURIComponent).join("/")+"/";try{let o=await this._addUrlFolder(a,r);o&&(o.fromFolder=!0,e.push(o),this.songs=this.songs.filter(c=>c===o||c.fromFolder||c.title!==o.title||c.mapper!==o.mapper))}catch(o){console.warn("Skipping",r,o)}}if(s.length)break}return e}async _addUrlFolder(t,e){let i=null,s=null;for(let l of["Info.dat","info.dat","INFO.DAT"]){let h=await fetch(t+l,{cache:"no-store"}).catch(()=>null);if(h?.ok){i=await h.text(),s=l;break}}if(!i)return null;let r=JSON.parse(dc(i)),a=cu(r),o=[a.songFile,a.coverFile,r.audio?.audioDataFilename,...a.difficulties.map(l=>l.file)].filter(Boolean),c=[{name:s,async:async()=>i}];for(let l of new Set(o))c.push(Uy(t+encodeURIComponent(l),l));return this._addEntries(c,`dir-${uu(e)}`,0,"folder")}async _addZip(t,e){let i=await fu.default.loadAsync(t),s=Object.values(i.files).filter(r=>!r.dir);return this._addEntries(s,e,t.byteLength,"zip")}async _addEntries(t,e,i,s){let r=t.find(x=>/(^|\/)info\.dat$/i.test(x.name));if(!r)throw new Error(`No Info.dat found in the ${s}. Is this a Beat Saber map?`);let a=r.name.slice(0,r.name.length-8),o=x=>{if(!x)return null;let b=(a+x).toLowerCase();return t.find(v=>v.name.toLowerCase()===b)||t.find(v=>v.name.toLowerCase().endsWith("/"+x.toLowerCase())||v.name.toLowerCase()===x.toLowerCase())},c=JSON.parse(dc(await r.async("string"))),l=cu(c),h=o(l.songFile);if(!h)throw new Error(`The song file "${l.songFile}" is missing from the ${s}.`);let u=l.difficulties.filter(x=>o(x.file));if(!u.length)throw new Error(`None of the difficulty files listed in Info.dat are in the ${s}.`);let f=null,d=o(l.coverFile);if(d){let x=await d.async("blob");f=URL.createObjectURL(x)}let p=e||`map-${uu(l.title)}-${uu(l.mapper)}-${i}`;this.songs=this.songs.filter(x=>x.id!==p);let _=null,m=c.audio?.audioDataFilename?o(c.audio.audioDataFilename):null,g={id:p,title:l.title,artist:l.artist,mapper:l.mapper,bpm:l.bpm,builtIn:!1,hue:Oy(l.title),cover:f,oneSaber:l.oneSaber,difficulties:u,load:async x=>{let b=u.find(S=>S.name===x)||u[0],v=JSON.parse(dc(await o(b.file).async("string"))),w=[];if(m)try{w=gp(JSON.parse(dc(await m.async("string"))),l.bpm)}catch{}let A=mp(v,l.bpm,w);_||(_=await this.audio.decode(await h.async("arraybuffer")));let C=A.notes.length?A.notes[A.notes.length-1].time:0;return{buffer:_,loop:!1,notes:A.notes,walls:A.walls,njs:b.njs,njsOffset:b.offset,bpm:l.bpm,duration:Math.max(_.duration,C+1),colors:b.colors||null,tempo:A.tempo,version:A.version}}};return this.songs.push(g),g}};function Ny(n,t){return{name:t,async:e=>e==="string"?n.text():e==="blob"?Promise.resolve(n):n.arrayBuffer()}}function Uy(n,t){return{name:t,async:async e=>{let i=await fetch(n);if(!i.ok)throw new Error(`Could not load ${t} (${i.status}).`);return e==="string"?i.text():e==="blob"?i.blob():i.arrayBuffer()}}}function Fy(n){let t=[],e=/href\s*=\s*"([^"]+)"/gi,i;for(;i=e.exec(n);){let s=i[1];s.startsWith("?")||s.startsWith("/")||s.startsWith("..")||/^[a-z]+:/i.test(s)||t.push(s)}return[...new Set(t)]}function dc(n){return n.charCodeAt(0)===65279?n.slice(1):n}function uu(n){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,30)}function Oy(n){let t=0;for(let e of String(n))t=t*31+e.charCodeAt(0)>>>0;return t%360}var xp="neon-slice-settings-v1",vp="neon-slice-best-v1",By={offsetMs:0,tiltDeg:0,noFail:!1,haptics:!0,music:.85,sfx:.8,lowFx:!1,softFlash:!1,theme:"tunnel",stageColors:"map",musicFx:!0,playFx:!0,runway:!0,flyby:!0,skyline:!0,introFx:!0,beatSync:!0},yp=["tunnel","orbital","city","liquid","crystal"],bp=["default","map","cover"],ky={default:"Default",map:"Map colours",cover:"Cover art"},zy=.28,Hy=.18,Vy=-3,Gy=100;function Sp(n,t){try{let e=JSON.parse(localStorage.getItem(n));return e&&typeof e=="object"?{...t,...e}:{...t}}catch{return{...t}}}function Mp(n,t){try{localStorage.setItem(n,JSON.stringify(t))}catch{}}var mc=class{constructor(t,e={}){this.hooks=e,this.settings=Sp(xp,By),this.best=Sp(vp,{});let i=new Wl({canvas:t,antialias:!0,powerPreference:"high-performance"});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight,!1),i.outputColorSpace=Ae,i.xr.enabled=!0,i.xr.setReferenceSpaceType("local-floor"),i.xr.setFoveation(1),this.renderer=i,this.scene=new Tr,this.camera=new ti(72,window.innerWidth/window.innerHeight,.05,120),this.camera.position.set(0,1.6,.35),this.scene.add(this.camera),window.addEventListener("resize",()=>this.onResize()),this.world=new Kl(this.scene),this.factory=new Ql,this.sparks=new tc(this.scene),this.music=new ic,this.settingsTab="general",this.effects=new ec(this.scene),this._buildBloom(),this._applyFx(),this.popups=new cc(this.scene),this.audio=new uc,this.library=new pc(this.audio),this.raycaster=new ia,this.state="idle",this.screen="songs",this.page=0,this.selectedSong=null,this.selectedDiff=null,this.xrMode=!1,this.track=new Ee,this.mirrorTrack=new Ee,this.mirrorTrack.scale.y=-1,this.scene.add(this.mirrorTrack),this.scene.add(this.track),this.activeNotes=[],this.activeWalls=[],this.debris=[],this.pendingCuts=[],this._buildUi(),this._buildSabers(),this._buildHud(),this._buildVignette(),this.lastT=performance.now()/1e3,i.setAnimationLoop((s,r)=>this.frame(r)),window.__neon=this}_buildUi(){this.menu=new er(1280,800,2),this.menu.mesh.position.set(0,1.45,-2.3),this.menu.visible=!1,this.scene.add(this.menu.mesh),this.panels=[this.menu]}_buildHud(){this.hudLeft=new er(512,360,.9,{interactive:!1}),this.hudLeft.mesh.position.set(-1.75,1.15,-2.4),this.hudLeft.mesh.rotation.y=.45,this.hudRight=new er(512,360,.9,{interactive:!1}),this.hudRight.mesh.position.set(1.75,1.15,-2.4),this.hudRight.mesh.rotation.y=-.45;for(let t of[this.hudLeft,this.hudRight])t.visible=!1,this.scene.add(t.mesh);this._hudKey=""}_buildVignette(){this.vignette=new Vt(new ji(.3,16,12),new me({color:16715824,transparent:!0,opacity:0,side:Oe,depthTest:!1,depthWrite:!1})),this.vignette.renderOrder=30,this.camera.add(this.vignette)}_buildSabers(){this.sabers=[],this.controllers=[];for(let e=0;e<2;e++){let i=this.renderer.xr.getController(e);this.scene.add(i);let s={ctrl:i,saber:null,source:null,laser:this._makeLaser(),cursor:this._makeCursor(),lastB:!1};i.add(s.laser),this.scene.add(s.cursor),i.addEventListener("connected",r=>this._onControllerConnected(s,r.data)),i.addEventListener("disconnected",()=>{s.saber&&(s.saber.visible=!1),s.source=null}),i.addEventListener("selectstart",()=>this._onTrigger(s)),this.controllers.push(s)}this.mouse=new _t(0,0),this.mouseRig=new Ee,this.scene.add(this.mouseRig),this.mouseSaber=new wa(this.mouseRig,-1,jt.violet,this.scene,1.2),this.mouseSaber.visible=!1;let t=this.renderer.domElement;t.addEventListener("pointermove",e=>{let i=t.getBoundingClientRect();this.mouse.set((e.clientX-i.left)/i.width*2-1,-((e.clientY-i.top)/i.height)*2+1)}),t.addEventListener("pointerdown",()=>{this.xrMode||this._onTrigger(null)}),window.addEventListener("keydown",e=>{this.xrMode||this.state==="idle"||((e.code==="Escape"||e.code==="KeyP")&&(this.togglePause(),e.preventDefault()),e.code==="Space"&&this.state==="calibrate"&&(this._calibTap(),e.preventDefault()))}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.state==="playing"&&this.pause()})}_makeLaser(){let t=new oe().setFromPoints([new O(0,0,0),new O(0,0,-1)]),e=new Us(t,new bi({color:14272767,transparent:!0,opacity:.7}));return e.scale.z=4,e.visible=!1,e}_makeCursor(){let t=new qe(new ke({map:Ye(),color:16777215,depthTest:!1,transparent:!0}));return t.scale.set(.05,.05,1),t.renderOrder=40,t.visible=!1,t}_onControllerConnected(t,e){if(t.source=e,e.targetRayMode!=="tracked-pointer")return;let i=e.handedness==="left"?Ti.LEFT:Ti.RIGHT;(!t.saber||t.saber.hand!==i)&&(t.saber&&(t.ctrl.remove(t.saber.pivot),this.scene.remove(t.saber.trail)),t.saber=new wa(t.ctrl,i,i===Ti.LEFT?jt.left:jt.right,this.scene),t.saber.setTilt(this.settings.tiltDeg)),t.saber.inputSource=e,t.saber.visible=!0}get activeSabers(){if(!this.xrMode)return[this.mouseSaber];let t=[];for(let e of this.controllers)if(e.saber&&e.source&&e.saber.pivot.visible){if(this.oneSaber&&e.saber.hand===Ti.LEFT)continue;t.push(e.saber)}return t}onResize(){this.renderer.xr.isPresenting||(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.composer?.setSize(window.innerWidth,window.innerHeight))}_buildBloom(){try{let t=new _t(window.innerWidth,window.innerHeight);this.composer=new rc(this.renderer),this.composer.addPass(new ac(this.scene,this.camera)),this.bloom=new tr(t,.75,.45,.62),this.composer.addPass(this.bloom),this.composer.addPass(new oc),this.composer.setSize(t.x,t.y)}catch(t){console.warn("Bloom unavailable",t),this.composer=null}}_applyFx(){let t=this.settings;this.world.setQuality(t.lowFx),this.world.flashScale=t.softFlash?.25:1,this.world.setOptions({theme:t.theme,musicFx:t.musicFx,playFx:t.playFx,runway:t.runway,flyby:t.flyby,skyline:t.skyline,introFx:t.introFx,beatSync:t.beatSync})}async _coverPalette(t){if(t._palette!==void 0)return t._palette;let e=null;if(t.cover)try{let i=new Image;i.src=t.cover,await i.decode();let s=document.createElement("canvas");s.width=s.height=40;let r=s.getContext("2d",{willReadFrequently:!0});r.drawImage(i,0,0,40,40),e=ip(r.getImageData(0,0,40,40).data)}catch{e=null}return!e&&t.hue!==void 0&&(e={a:Ta(t.hue%360,.85,1),b:Ta((t.hue+150)%360,.85,1)}),t._palette=e,e}async _applyStageColors(t,e){let i=this.settings.stageColors,s=null,r=null,a=o=>o?new mt(o[0],o[1],o[2]):null;if(i==="map"&&e.colors)s=a(e.colors.envLeft||e.colors.left),r=a(e.colors.envRight||e.colors.right);else if(i==="cover"){let o=await this._coverPalette(t);o&&(s=a(o.a),r=a(o.b))}this.world.setStageColors(s,r)}async startDesktop(){await this.audio.init(),this._applyVolumes(),this.xrMode=!1,this.mouseSaber.visible=!0,this.mouseSaber.setTilt(0),this.openMenu("songs")}async startXR(){await this.audio.init(),this._applyVolumes();let t=await navigator.xr.requestSession("immersive-vr",{optionalFeatures:["local-floor","bounded-floor","hand-tracking"]});t.addEventListener("end",()=>this._onSessionEnd()),t.addEventListener("visibilitychange",()=>{t.visibilityState!=="visible"&&this.state==="playing"&&this.pause()}),await this.renderer.xr.setSession(t);try{let e=t.supportedFrameRates;if(e&&t.updateTargetFrameRate){let i=[90,72].find(s=>Array.from(e).includes(s));i&&await t.updateTargetFrameRate(i)}}catch{}this.xrMode=!0,this.mouseSaber.visible=!1,this.openMenu("songs")}_onSessionEnd(){this.xrMode=!1,this._stopSong(),this._setIdle(),this.hooks.onExitToPage?.()}exitToPage(){let t=this.renderer.xr.getSession();if(t){t.end();return}this._stopSong(),this._setIdle(),this.hooks.onExitToPage?.()}_setIdle(){this.state="idle",this.menu.visible=!1,this.hudLeft.visible=this.hudRight.visible=!1,this.mouseSaber.visible=!1}_applyVolumes(){this.audio.setVolumes(this.settings.music,this.settings.sfx)}_saveSettings(){this._applyFx(),Mp(xp,this.settings),this.audio.offsetSec=this.settings.offsetMs/1e3;for(let t of this.controllers)t.saber?.setTilt(this.settings.tiltDeg);this._applyVolumes()}_onTrigger(t){if(this.state==="calibrate"){this._clickUi(t)||this._calibTap();return}this.menu.visible&&this._clickUi(t)}_rayFor(t){if(t){t.ctrl.updateMatrixWorld(!0);let e=t.ctrl.matrixWorld,i=new O().setFromMatrixPosition(e),s=new O(0,0,-1).transformDirection(e);this.raycaster.set(i,s)}else this.raycaster.setFromCamera(this.mouse,this.camera);return this.raycaster}_pointAt(t){if(!this.menu.visible)return null;let e=this._rayFor(t).intersectObject(this.menu.mesh,!1)[0];return e?{hit:e,button:this.menu.hitTest(e.uv)}:null}_clickUi(t){let e=this._pointAt(t);return e?.button?(this.audio.play("blip",.6),e.button.onClick(),!0):!1}_updatePointers(){let t=this.menu.visible,e=null;if(this.xrMode)for(let i of this.controllers){let s=t&&!!i.source;if(i.laser.visible=s,i.cursor.visible=!1,!s)continue;let r=this._pointAt(i);r?(i.laser.scale.z=r.hit.distance,i.cursor.position.copy(r.hit.point),i.cursor.visible=!0,r.button&&(e=r.button.id)):i.laser.scale.z=4}else if(t){let i=this._pointAt(null);i?.button&&(e=i.button.id),this.renderer.domElement.style.cursor=e?"pointer":"default"}t&&this.menu.setHover(e)}_pollButtons(){if(this.xrMode)for(let t of this.controllers){let e=t.source?.gamepad;if(!e)continue;let i=!!e.buttons[5]?.pressed;i&&!t.lastB&&this.togglePause(),t.lastB=i}}_updateMouseSaber(){this.raycaster.setFromCamera(this.mouse,this.camera);let t=this.raycaster.ray.origin,e=this.raycaster.ray.direction,i=t.clone().addScaledVector(e,1.6),s=t.clone().addScaledVector(e,.35).add(new O(0,-.3,0));this.mouseRig.position.copy(s),this.mouseRig.lookAt(s.clone().multiplyScalar(2).sub(i)),this.mouseRig.updateMatrixWorld(!0)}openMenu(t="songs"){this.world.useMenuShow(),this.state="menu",this.screen=t,this.hudLeft.visible=this.hudRight.visible=!1,this.menu.show(e=>this._drawMenu(e))}_redrawMenu(){this.menu.visible&&this.menu.redraw()}_drawMenu(t){this.screen==="songs"?this._drawSongs(t):this.screen==="song"?this._drawSong(t):this.screen==="settings"&&this._drawSettings(t)}_header(t,e,i){t.text(e,64,104,{size:64,weight:700,spacing:2}),i&&t.text(i,66,148,{size:28,color:qt.dim})}_drawSongs(t){this._header(t,"NEON SLICE","Choose a song"),t.button("settings",920,60,296,76,"Settings",()=>this.openMenu("settings"));let e=this.library.songs,i=4,s=Math.max(1,Math.ceil(e.length/i));this.page=Math.min(this.page,s-1),e.slice(this.page*i,this.page*i+i).forEach((o,c)=>{let l=186+c*128,h=this._bestFor(o.id);t.button(`song-${o.id}`,64,l,1152,112,"",()=>{this.selectedSong=o,this.selectedDiff=o.difficulties[Math.min(1,o.difficulties.length-1)].name,this.openMenu("song")},{accent:`#${new mt().setHSL(o.hue/360,.9,.6).getHexString()}`}),this._drawCover(t,o,80,l+12,88),t.text(t.fit(o.title,640,38,600),196,l+50,{size:38,weight:600}),t.text(t.fit(`${o.artist||"Unknown artist"}  \xB7  mapped by ${o.mapper||"unknown"}`,640,26),196,l+88,{size:26,color:qt.dim}),t.text(`${Math.round(o.bpm)} BPM`,1190,l+50,{size:28,color:qt.dim,align:"right"}),t.text(h?`Best ${h.toLocaleString()}`:o.builtIn?"Built-in":"Imported",1190,l+88,{size:24,color:h?qt.gold:qt.faint,align:"right"})}),s>1&&(t.button("prev",64,704,180,64,"\u2039 Prev",()=>{this.page=(this.page-1+s)%s,this._redrawMenu()}),t.text(`${this.page+1} / ${s}`,340,746,{size:28,color:qt.dim,align:"center"}),t.button("next",436,704,180,64,"Next \u203A",()=>{this.page=(this.page+1)%s,this._redrawMenu()}));let a=this.xrMode?"Import Beat Saber maps on the page before entering VR":"Import Beat Saber maps from the start page";t.text(a,1216,746,{size:24,color:qt.faint,align:"right"})}_drawCover(t,e,i,s,r){let a=t.g;if(e.cover&&(e._img||(e._img=new Image,e._img.onload=()=>this._redrawMenu(),e._img.src=e.cover),e._img.complete&&e._img.naturalWidth)){a.save(),a.beginPath(),a.roundRect?a.roundRect(i,s,r,r,12):a.rect(i,s,r,r),a.clip(),a.drawImage(e._img,i,s,r,r),a.restore();return}let o=a.createLinearGradient(i,s,i+r,s+r);o.addColorStop(0,`hsl(${e.hue}, 90%, 55%)`),o.addColorStop(1,`hsl(${(e.hue+60)%360}, 90%, 30%)`),t.rect(i,s,r,r,o,12),t.text(e.title.slice(0,1).toUpperCase(),i+r/2,s+r/2+2,{size:52,weight:700,align:"center",baseline:"middle"})}_drawSong(t){let e=this.selectedSong;if(!e){this.screen="songs",this._drawSongs(t);return}t.button("back",64,48,180,70,"\u2039 Back",()=>this.openMenu("songs")),this._drawCover(t,e,64,150,200),t.text(t.fit(e.title,860,56,700),300,200,{size:56,weight:700}),t.text(t.fit(e.artist||"Unknown artist",860,32),300,248,{size:32,color:qt.dim}),t.text(t.fit(`Mapped by ${e.mapper||"unknown"}  \xB7  ${Math.round(e.bpm)} BPM`,860,28),300,296,{size:28,color:qt.faint}),t.text("DIFFICULTY",64,410,{size:24,color:qt.dim,spacing:4});let i=e.difficulties.length,s=Math.min(260,(1152-(i-1)*16)/i);e.difficulties.forEach((r,a)=>{let o=this._bestFor(e.id,r.name);t.button(`diff-${r.name}`,64+a*(s+16),430,s,110,r.label,()=>{this.selectedDiff=r.name,this._redrawMenu()},{selected:this.selectedDiff===r.name,size:34,sub:o?`Best ${o.toLocaleString()}`:`NJS ${r.njs}`,accent:qt.gold})}),t.button("play",64,600,520,120,"Play",()=>this.startSong(e,this.selectedDiff),{size:52,accent:qt.good}),e.builtIn||t.text("Arcs are not shown. Chain heads play as normal notes.",620,670,{size:24,color:qt.faint})}_drawSettings(t){let e=this.settings;t.button("back",64,48,180,70,"\u2039 Back",()=>this.openMenu("songs")),t.text("SETTINGS",290,104,{size:56,weight:700,spacing:2});let i=(a,o,c)=>t.button(`tab-${a}`,c,48,200,70,o,()=>{this.settingsTab=a,this._redrawMenu()},{selected:this.settingsTab===a,accent:qt.edge,size:30});i("general","General",760),i("visuals","Visuals",976);let s=a=>()=>{a(),this._saveSettings(),this._redrawMenu()};if(this.settingsTab==="visuals"){let a=(l,h,u,f,d,p,_)=>{t.text(u,64,l+46,{size:34,weight:600}),_&&t.text(_,64,l+82,{size:22,color:qt.faint}),t.button(`${h}-prev`,620,l,90,76,"\u2039",d,{size:44}),t.text(f,890,l+50,{size:34,align:"center",weight:600}),t.button(`${h}-next`,1082,l,90,76,"\u203A",p,{size:44})},o=(l,h,u)=>s(()=>{e[l]=h[(h.indexOf(e[l])+u+h.length)%h.length]});a(150,"theme","Environment",jd[e.theme]||"Neon Tunnel",o("theme",yp,-1),o("theme",yp,1)),a(250,"stagecol","Stage colours",ky[e.stageColors],o("stageColors",bp,-1),o("stageColors",bp,1),"Lights only. Notes and sabers stay red and blue.");let c=(l,h,u,f,d,p=!1)=>{let _=p?!e[d]:!!e[d];t.button(l,h,u,540,72,`${f}: ${_?"On":"Off"}`,s(()=>{e[d]=!e[d]}),{selected:_,accent:qt.gold,size:28})};c("musicfx",64,352,"Music-reactive","musicFx"),c("playfx",632,352,"Play-reactive","playFx"),c("runway",64,434,"Runway lights","runway"),c("flyby",632,434,"Fly-by arches","flyby"),c("beatsync",64,516,"Beat-synced motion","beatSync"),c("skyline",632,516,"Far skyline","skyline"),c("intro",64,598,"Intro & outro","introFx"),t.button("lowfx",632,598,540,72,`Effects: ${e.lowFx?"Low":"Full"}`,s(()=>e.lowFx=!e.lowFx),{selected:!e.lowFx,accent:qt.gold,size:28}),t.button("flash",64,680,540,72,`Light flashes: ${e.softFlash?"Soft":"Full"}`,s(()=>e.softFlash=!e.softFlash),{selected:!e.softFlash,accent:qt.gold,size:28}),t.text("Changes show live behind this panel.",632,726,{size:22,color:qt.faint});return}let r=(a,o,c,l,h,u)=>{t.text(o,64,a+46,{size:34,weight:600}),u&&t.text(u,64,a+82,{size:22,color:qt.faint}),t.button(`${o}-dec`,760,a,96,76,"\u2212",l,{size:44}),t.text(c,966,a+50,{size:36,align:"center",weight:600}),t.button(`${o}-inc`,1076,a,96,76,"+",h,{size:44})};r(160,"Audio offset",`${e.offsetMs} ms`,s(()=>e.offsetMs-=5),s(()=>e.offsetMs+=5),"Raise it if notes arrive before the beat"),t.button("calibrate",470,160,260,76,"Calibrate",()=>this.startCalibration(),{size:30,accent:qt.gold}),r(270,"Saber angle",`${e.tiltDeg}\xB0`,s(()=>e.tiltDeg=Math.max(-45,e.tiltDeg-5)),s(()=>e.tiltDeg=Math.min(45,e.tiltDeg+5)),"Tilts the blade up or down from the controller"),r(380,"Music volume",`${Math.round(e.music*100)}%`,s(()=>e.music=Math.max(0,+(e.music-.1).toFixed(2))),s(()=>e.music=Math.min(1,+(e.music+.1).toFixed(2)))),r(490,"Effects volume",`${Math.round(e.sfx*100)}%`,s(()=>e.sfx=Math.max(0,+(e.sfx-.1).toFixed(2))),s(()=>e.sfx=Math.min(1,+(e.sfx+.1).toFixed(2)))),t.button("nofail",64,620,540,80,`No fail: ${e.noFail?"On":"Off"}`,s(()=>e.noFail=!e.noFail),{selected:e.noFail,accent:qt.gold,size:30}),t.button("haptics",632,620,540,80,`Vibration: ${e.haptics?"On":"Off"}`,s(()=>e.haptics=!e.haptics),{selected:e.haptics,accent:qt.gold,size:30})}_bestFor(t,e){if(e)return this.best[`${t}:${e}`]||0;let i=0;for(let[s,r]of Object.entries(this.best))s.startsWith(t+":")&&(i=Math.max(i,r));return i}async startSong(t,e){this.menu.show(l=>{this._header(l,"Loading\u2026",t.title)});let i;try{i=await t.load(e)}catch(l){console.error(l),this.menu.show(h=>{this._header(h,"Could not load this song",String(l.message||l).slice(0,80)),h.button("back",64,600,300,90,"\u2039 Back",()=>this.openMenu("songs"))});return}this.current={song:t,diffName:e,data:i},this.oneSaber=!!t.oneSaber,this._resetRun();let s=this.camera.getWorldPosition(new O);this.gridX=this.xrMode?s.x:0,this.rowY0=ze.clamp(s.y*.5,.55,1.05),this.speed=i.njs,this.travel=Bd(i.njs,i.bpm,i.njsOffset),this.beatLen=60/i.bpm,this.tempo=i.tempo||null,this.notes=i.notes,this.walls=i.walls,this.noteCount=this.notes.filter(l=>l.kind===Te.NOTE).length,this.maxScore=Jd(this.noteCount);let r=this.notes.length?this.notes[this.notes.length-1].time:0,a=this.walls.reduce((l,h)=>Math.max(l,h.endTime),0);this.songEnd=Math.max(r,a)+1.5,i.loop||(this.songEnd=Math.min(Math.max(this.songEnd,2),i.duration+.5));let o=this.notes.length?this.notes[0].time:2,c=i.lights&&Wd(i.lights)?i.lights:Zl({bpm:i.bpm,startSec:0,endSec:this.songEnd+2,introSec:Math.max(0,o-.6)});this.world.useSongShow(c),await this._applyStageColors(t,i),this.world.startIntro(),this.world.setCombo(1),this.world.setLowEnergy(0),this.music.reset(),this._worldMult=1,this.effects.clear(),this._lastMult=1,this.audio.offsetSec=this.settings.offsetMs/1e3,this.audio.playSong(i.buffer,{loop:i.loop,lead:.3}),this.menu.visible=!1,this.hudLeft.visible=this.hudRight.visible=!0,this.state="playing",this._hudKey=""}_resetRun(){this._clearTrack(),this.score=0,this.combo=0,this.maxCombo=0,this.health=Qn.START,this.hits=0,this.misses=0,this.badCuts=0,this.cutScoreSum=0,this.mult=new Sa,this.nextNote=0,this.nextWall=0,this.failed=!1,this.popups.clear()}_clearTrack(){for(let t of this.activeNotes)this._removeNote(t);for(let t of this.activeWalls)this._removeWall(t);this.activeNotes=[],this.activeWalls=[],this.pendingCuts=[],this.popups.clear()}_stopSong(){this.audio.stopSong(.4),this._clearTrack(),this.audio.resume()}pause(){this.state==="playing"&&(this.state="paused",this.audio.pause(),this.menu.show(t=>{this._header(t,"PAUSED",this.current?.song.title),t.button("resume",64,240,560,110,"Resume",()=>this.resume(),{size:44,accent:qt.good}),t.button("restart",64,370,560,100,"Restart",()=>{this.audio.resume(),this.startSong(this.current.song,this.current.diffName)}),t.button("quit",64,490,560,100,"Song list",()=>{this._stopSong(),this.openMenu("songs")}),t.button("page",64,610,560,100,this.xrMode?"Exit VR":"Back to start page",()=>this.exitToPage()),t.text(this.xrMode?"Press B or Y to resume":"Press Esc to resume",680,300,{size:30,color:qt.dim})}))}async resume(){this.state==="paused"&&(this.menu.visible=!1,await this.audio.resume(),this.state="playing")}togglePause(){this.state==="playing"?this.pause():this.state==="paused"&&this.resume()}_finish(t){if(this.failed=t,t||(this.world.flashAll(2,1.6),this.effects.burst(jt.white,1.4)),this.audio.stopSong(t?.2:1.5),this._clearTrack(),this.hudLeft.visible=this.hudRight.visible=!1,this.world.setLowEnergy(0),!t&&this.settings.introFx){this.state="outro",this.world.startOutro(),setTimeout(()=>{this.state==="outro"&&(this.world.endOutro(),this._showResults(t))},1700);return}this._showResults(t)}_showResults(t){this.state="results";let e=this.maxScore?this.score/this.maxScore:0,i=t?"FAILED":Jh(e),s=`${this.current.song.id}:${this.current.diffName}`,r=!t&&this.score>(this.best[s]||0);r&&(this.best[s]=this.score,Mp(vp,this.best));let a=this.hits?Math.round(this.cutScoreSum/this.hits):0,o=this.noteCount?Math.round(100*this.hits/this.noteCount):0,c=this.current.song.difficulties.find(l=>l.name===this.current.diffName)?.label||this.current.diffName;this.menu.show(l=>{this._header(l,this.current.song.title,`${c}${this.settings.noFail?"  \xB7  No fail":""}`),l.text(i,64,330,{size:t?110:170,weight:700,color:t?qt.bad:qt.gold});let h=(u,f,d,p)=>{l.text(d,u,f,{size:24,color:qt.dim,spacing:3}),l.text(p,u,f+48,{size:44,weight:600})};h(480,210,"SCORE",this.score.toLocaleString()+(r?"  NEW BEST":"")),h(480,320,"SCORE %",`${(e*100).toFixed(1)}%`),h(860,320,"AVG CUT",`${a} / 115`),h(480,430,"NOTES HIT",`${this.hits} / ${this.noteCount}  (${o}%)`),h(860,430,"MAX COMBO",String(this.maxCombo)),h(480,540,"MISSED",String(this.misses)),h(860,540,"BAD CUTS",String(this.badCuts)),l.button("again",64,660,400,96,"Play again",()=>this.startSong(this.current.song,this.current.diffName),{accent:qt.good}),l.button("list",488,660,400,96,"Song list",()=>this.openMenu("songs"))})}startCalibration(){this.world.useMenuShow(),this._clearTrack();let t=60/Gy,e=Math.round(8*t*this.audio.ctx.sampleRate),i=this.audio.sfx.click.getChannelData(0),s=this.audio.ctx.createBuffer(1,e*4,this.audio.ctx.sampleRate),r=s.getChannelData(0),a=e/8;for(let o=0;o<32;o++){let c=Math.round(o*a);for(let l=0;l<i.length&&c+l<r.length;l++)r[c+l]+=i[l]*(o%4===0?1:.6)}this.calib={taps:[],beatLen:t,lastSpawn:-1},this.state="calibrate",this.rowY0=ze.clamp(this.camera.getWorldPosition(new O).y*.5,.55,1.05),this.gridX=0,this.speed=10,this.travel=1.2,this.audio.offsetSec=this.settings.offsetMs/1e3,this.audio.playSong(s,{loop:!0,lead:.3}),this._calibMarker(),this._drawCalib()}_calibMarker(){this.calibLine||(this.calibLine=new Vt(new ci(2.4,.03),new me({color:16777215,transparent:!0,opacity:.6})),this.calibLine.rotation.x=-Math.PI/2,this.scene.add(this.calibLine))}_drawCalib(){let t=this.calib;this.menu.show(e=>{this._header(e,"CALIBRATE","Tap the trigger on every click"),e.text("Blocks should cross the white line exactly on the click.",64,230,{size:30}),e.text(`Taps: ${t.taps.length} / 12`,64,300,{size:34,weight:600}),t.suggested!==void 0&&e.text(`Measured: ${t.suggested} ms`,420,300,{size:34,color:qt.gold,weight:600}),e.text("Offset",64,430,{size:34,weight:600}),e.button("c-dec",300,380,110,80,"\u2212",()=>{this.settings.offsetMs-=5,this._saveSettings(),this._drawCalib()},{size:44}),e.text(`${this.settings.offsetMs} ms`,530,432,{size:40,weight:600,align:"center"}),e.button("c-inc",650,380,110,80,"+",()=>{this.settings.offsetMs+=5,this._saveSettings(),this._drawCalib()},{size:44}),e.button("c-reset",800,380,330,80,"Restart taps",()=>{t.taps=[],t.suggested=void 0,this._drawCalib()},{size:30}),e.button("c-done",64,640,400,96,"Done",()=>this._endCalibration(),{accent:qt.good}),e.text(this.xrMode?"Point away from this panel and pull the trigger to tap":"Press Space to tap",500,700,{size:26,color:qt.faint})}),this.menu.mesh.position.set(0,2.25,-2.6),this.menu.mesh.scale.setScalar(.7)}_calibTap(){let t=this.calib;if(!t)return;let e=this.audio.heardTime()-this.audio.songStart,i=e-Math.round(e/t.beatLen)*t.beatLen;if(t.taps.push(i),t.taps.length>12&&t.taps.shift(),t.taps.length>=6){let s=t.taps.slice().sort((a,o)=>a-o),r=s[Math.floor(s.length/2)];t.suggested=Math.round(r*1e3/5)*5,t.taps.length===12&&(this.settings.offsetMs=t.suggested,this._saveSettings())}this._drawCalib()}_endCalibration(){this.calib=null,this.audio.stopSong(.1),this._clearTrack(),this.calibLine&&(this.scene.remove(this.calibLine),this.calibLine=null),this.menu.mesh.position.set(0,1.45,-2.3),this.menu.mesh.scale.setScalar(1),this.openMenu("settings")}_updateCalibration(t){let e=this.calib;this.calibLine&&this.calibLine.position.set(0,.06,Zs);let i=Math.ceil((t+this.travel)/e.beatLen);if(i>e.lastSpawn){e.lastSpawn=i;let s=i%2;this._spawnNote({time:i*e.beatLen,kind:Te.NOTE,hand:s,lane:s?2:1,row:0,dir:8,calib:!0})}for(let s=this.activeNotes.length-1;s>=0;s--){let r=this.activeNotes[s];this._placeNote(r,t),r.obj.position.z>qh&&(this._removeNote(r),this.activeNotes.splice(s,1))}}_laneX(t){return this.gridX+(t-1.5)*mi.LANE_W}_rowY(t){return this.rowY0+t*mi.ROW_H}_spawnNote(t){let e=this.factory.makeNote(t);this.track.add(e);let i={note:t,obj:e,prev:null,cur:null,spin:(Math.random()<.5?-1:1)*Math.PI};this.settings.lowFx||(i.mirror=this.factory.makeReflection(t),this.mirrorTrack.add(i.mirror)),this._placeNote(i,this.audio.songTime()),i.prev=i.cur,this.activeNotes.push(i)}_removeNote(t){this.track.remove(t.obj),t.mirror&&this.mirrorTrack.remove(t.mirror)}_removeWall(t){this.track.remove(t.obj),t.mirror&&this.mirrorTrack.remove(t.mirror)}_placeNote(t,e){let i=t.note,s=i.time-e,r=Zs-s*this.speed,a=1-s/this.travel,o=ze.smootherstep(a,0,.3),c=ze.lerp(.1,this._rowY(i.row),o);t.obj.position.set(this._laneX(i.lane),c,r);let l=.55+.45*o;t.obj.scale.set(l,l,l),i.kind===Te.BOMB?t.obj.rotation.set(e*1.3,e*.9,0):t.obj.rotation.set(0,0,t.obj.userData.finalAngle+(1-o)*t.spin),t.prev=t.cur,t.cur=xe(t.obj.position.x,t.obj.position.y,r),t.mirror&&(t.mirror.position.copy(t.obj.position),t.mirror.rotation.copy(t.obj.rotation),t.mirror.scale.copy(t.obj.scale))}_spawnWall(t){let e=this.factory.makeWall(),i=this._laneX(t.lane)-mi.LANE_W/2,s=i+t.width*mi.LANE_W,r=t.row<=0?0:this._rowY(t.row)-mi.ROW_H/2,a=Math.min(this._rowY(Math.min(t.row,2))-mi.ROW_H/2+t.height*mi.ROW_H,3.2),o=Math.max(.05,(t.endTime-t.time)*this.speed);e.scale.set(s-i,Math.max(.05,a-r),o);let c={wall:t,obj:e,x0:i,x1:s,y0:r,y1:a,depth:o};return this.track.add(e),this.settings.lowFx||(c.mirror=this.factory.makeWallReflection(),this.mirrorTrack.add(c.mirror)),this.activeWalls.push(c),c}_updateSong(t,e,i){for(;this.nextNote<this.notes.length&&this.notes[this.nextNote].time-this.travel<=t;)this._spawnNote(this.notes[this.nextNote++]);for(;this.nextWall<this.walls.length&&this.walls[this.nextWall].time-this.travel<=t;)this._spawnWall(this.walls[this.nextWall++]);let s=this.activeSabers;for(let o=this.activeNotes.length-1;o>=0;o--){let c=this.activeNotes[o];this._placeNote(c,t);let l=!1;if(c.cur.z>Vy){let h=this._findHit(c,s);h&&(this._onCut(c,h,e),l=!0)}if(!l&&c.cur.z>qh&&(c.note.kind===Te.NOTE&&this._onMiss(c),l=!0),this.state!=="playing")return;l&&(this._removeNote(c),this.activeNotes.splice(o,1))}let r=this.camera.getWorldPosition(new O),a=!1;for(let o=this.activeWalls.length-1;o>=0;o--){let c=this.activeWalls[o],l=-(c.wall.time-t)*this.speed,h=l-c.depth/2;c.obj.position.set((c.x0+c.x1)/2,(c.y0+c.y1)/2,h),c.mirror&&(c.mirror.position.copy(c.obj.position),c.mirror.scale.copy(c.obj.scale)),this.xrMode&&Hd(r,xe(c.x0,c.y0,l-c.depth),xe(c.x1,c.y1,l),.05)&&(a=!0),l-c.depth>2&&(this._removeWall(c),this.activeWalls.splice(o,1))}if(this.vignette.material.opacity+=((a?.45:0)-this.vignette.material.opacity)*Math.min(1,i*12),a&&!this._wasInWall&&this._log({ev:"wall",t:+t.toFixed(3)}),this._wasInWall=a,a){if(this._damage(Qn.WALL_PER_SEC*i),this.combo>0&&(this.combo=0,this.mult.miss()),Math.floor(e*10)!==Math.floor((e-i)*10))for(let o of s)this._haptic(o,.3,60);if(this.state!=="playing")return}this.mult.value!==this._worldMult&&(this._worldMult=this.mult.value,this.world.setCombo(this.mult.value)),this.world.setLowEnergy(this.health<25&&!this.settings.noFail?(25-this.health)/25:0),this._updateHud(),t>this.songEnd&&this.nextNote>=this.notes.length&&this.activeNotes.length===0&&this._finish(!1)}_findHit(t,e){let i=t.note,s=i.kind===Te.BOMB?Hy:zy,r=t.prev||t.cur,a=e.slice().sort((o,c)=>(c.hand===i.hand)-(o.hand===i.hand));for(let o of a)if(zd(o.prevBase,o.prevTip,o.base,o.tip,r,t.cur,s)>=0)return o;return null}_onCut(t,e,i){let s=t.note,r=t.cur,a=Yd({note:s,saberHand:e.hand,base:e.base,tip:e.tip,tipVel:e.vel,center:r}),o=new O(r.x,r.y,r.z);if(this._log({ev:"cut",t:+this.audio.songTime().toFixed(3),noteT:s.time,hand:s.hand,saber:e.hand,dir:s.dir,reason:a.reason,swing:[+a.swingDir.x.toFixed(2),+a.swingDir.y.toFixed(2)],speed:+Math.hypot(e.vel.x,e.vel.y).toFixed(2),z:+r.z.toFixed(2)}),this._spawnDebris(t,s,a,e),s.kind===Te.BOMB){this.audio.play("bomb",.9),this.sparks.burst(o,new mt(1,.45,.15),this.settings.lowFx?30:70,4),this.effects.flash(o,new mt(1,.4,.1),2.2,.35),this.effects.cut(o,a.swingDir,new mt(1,.45,.15),1.4),this._haptic(e,1,200),this.badCuts++,this._breakCombo(),this.popups.spawn("BOMB",o,"#ff8a3d"),this._damage(Qn.BOMB);return}let c=s.hand===Ti.LEFT?jt.left:jt.right,l=new O(a.swingDir.x,a.swingDir.y,0);if(this.sparks.burst(o,c,this.settings.lowFx?14:30,2.6,l),!a.good){this.audio.play("bad",.8),this.effects.flash(o,new mt(1,.2,.25),1.2,.25),this._haptic(e,1,120),this.badCuts++,this._breakCombo(),this.popups.spawn(a.reason==="TOO SLOW"?"TOO SLOW":"BAD CUT",o,qt.bad,52,a.reason==="TOO SLOW"?null:a.reason.toLowerCase()),this._damage(Qn.BAD_CUT);return}this.audio.play("slice",.9),this._haptic(e,.6,35),this.world.kick(.4),this.effects.cut(o,a.swingDir,c,1),this.settings.playFx&&this.world.ripple(o.x,o.z,1);let h=e.tracker.preSwingAngle(a.axis),u=this.mult.value;this.mult.hit(),this.hits++,this.combo++,this._milestones(c),this.maxCombo=Math.max(this.maxCombo,this.combo),this.health=Math.min(100,this.health+Qn.HIT),this.pendingCuts.push({saber:e,pos:o,multiplier:u,prePts:Zd(h),centerPts:a.centerPts,post:new Jl(i,a.bladeDir,a.axis)})}_milestones(t){if(this.mult.value>this._lastMult&&(this._lastMult=this.mult.value,this.effects.burst(jt.violet,1),this.mult.value===8&&this.world.flashAll(2,1.2)),this.mult.value<this._lastMult&&(this._lastMult=this.mult.value),this.combo>0&&this.combo%50===0){this.world.flashAll(this.combo%100===0?2:t===jt.left?0:1,1.5),this.effects.burst(jt.white,1.3),this.popups.spawn(`${this.combo} COMBO`,new O(0,this.rowY0+1.4,-2.2),qt.gold,54);for(let e of this.activeSabers)this._haptic(e,.4,80)}}_checkClash(t){let e=this.activeSabers;if(e.length<2)return;let i=Vd(e[0].base,e[0].tip,e[1].base,e[1].tip);if(i.dist<.035&&t-(this._lastClash||0)>.06){this._lastClash=t;let s=new O(i.point.x,i.point.y,i.point.z);this.sparks.burst(s,jt.white,8,1.8),this.effects.flash(s,jt.white,.35,.1);for(let r of e)this._haptic(r,.25,20)}}_updatePendingCuts(t){for(let e=this.pendingCuts.length-1;e>=0;e--){let i=this.pendingCuts[e];if(!i.post.update(t,i.saber.base,i.saber.tip))continue;let s=$d(i.post.angle),r=i.prePts+s+i.centerPts;this.score+=r*i.multiplier,this.cutScoreSum+=r;let a=r>=115?qt.gold:r>=100?"#ffffff":r>=80?"#c9bdf0":"#8f84ad";this.popups.spawn(String(r),i.pos,a,r>=110?72:60,`${i.prePts} + ${s} + ${i.centerPts}`),this.pendingCuts.splice(e,1)}}_log(t){(this.debugLog||(this.debugLog=[])).push(t),this.debugLog.length>300&&this.debugLog.shift()}_onMiss(t){this._log({ev:"miss",t:+this.audio.songTime().toFixed(3),noteT:t.note.time,hand:t.note.hand,lane:t.note.lane,row:t.note.row}),this.misses++,this._breakCombo(),this.audio.play("miss",.5);let e=t.cur;this.popups.spawn("MISS",new O(e.x,e.y,Zs),qt.bad),this._damage(Qn.MISS)}_breakCombo(){this.combo=0,this.mult.miss()}_damage(t){this.health=Math.max(0,Math.min(100,this.health+t)),this.health<=0&&!this.settings.noFail&&this.state==="playing"&&this._finish(!0)}_haptic(t,e,i){this.settings.haptics&&t.pulse(e,i)}_spawnDebris(t,e,i,s){let r=this.factory.slice(t.obj,e,i.axis,s.base);for(let a of r){this.scene.add(a);let o=a.userData.side,c=a.userData.normal,l=c.clone().multiplyScalar(o*1.4).add(new O(i.swingDir.x,i.swingDir.y,0).multiplyScalar(1.6)).add(new O(0,.4,this.speed*.25)),h=new O(i.swingDir.x,i.swingDir.y,0).cross(c).normalize();h.lengthSq()<.5&&h.set(1,0,0),this.debris.push({mesh:a,vel:l,spinAxis:h,spin:o*(6+Math.random()*6),life:1})}}_updateDebris(t){for(let e=this.debris.length-1;e>=0;e--){let i=this.debris[e];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),i.mesh.geometry.dispose(),this.debris.splice(e,1);continue}i.vel.y-=7*t,i.mesh.position.addScaledVector(i.vel,t),i.mesh.rotateOnWorldAxis(i.spinAxis,i.spin*t);let s=Math.min(1,i.life/.35);i.mesh.scale.setScalar(s)}}_updateHud(){let t=this.maxScore?this.score/this.maxScore:0,e=`${this.score}|${this.combo}|${this.mult.value}|${this.mult.progress}|${Math.round(this.health)}`;e!==this._hudKey&&(this._hudKey=e,this.hudLeft.show(i=>{i.text("SCORE",40,70,{size:28,color:qt.dim,spacing:4}),i.text(this.score.toLocaleString(),40,150,{size:76,weight:700}),i.text(`${(t*100).toFixed(1)}%`,40,230,{size:44,weight:600,color:qt.gold}),i.text(this.failed?"":Jh(t),470,230,{size:56,weight:700,align:"right",color:qt.gold}),i.text("ENERGY",40,292,{size:22,color:qt.dim,spacing:4}),i.rect(40,306,432,22,"rgba(255,255,255,0.12)",11);let s=this.health/100;i.rect(40,306,Math.max(22,432*s),22,s<.25?qt.bad:qt.good,11)}),this.hudRight.show(i=>{i.text("COMBO",40,70,{size:28,color:qt.dim,spacing:4}),i.text(String(this.combo),40,160,{size:92,weight:700});let s=i.g,r=380,a=190,o=90;s.lineWidth=16,s.strokeStyle="rgba(255,255,255,0.12)",s.beginPath(),s.arc(r,a,o,0,Math.PI*2),s.stroke(),s.strokeStyle=qt.edge,s.beginPath(),s.arc(r,a,o,-Math.PI/2,-Math.PI/2+Math.PI*2*this.mult.fill),s.stroke(),i.text(`\xD7${this.mult.value}`,r,a+4,{size:64,weight:700,align:"center",baseline:"middle"})}))}frame(){let t=performance.now()/1e3,e=Math.min(.05,Math.max(0,t-this.lastT));this.lastT=t,!this.xrMode&&this.state!=="idle"&&this._updateMouseSaber();for(let l of this.activeSabers)l.sample(t,e);this.xrMode&&this._checkClash(t),this._pollButtons(),this._updatePointers();let i=.6;if(this.state==="playing"){let l=this.audio.songTime();this._updateSong(l,t,e),i=(l%this.beatLen+this.beatLen)%this.beatLen/this.beatLen}else if(this.state==="calibrate"){let l=this.audio.songTime();this._updateCalibration(l),this.calib&&(i=(l/this.calib.beatLen%1+1)%1)}else i=t*1%1;this._updatePendingCuts(t),this._updateDebris(e),this.sparks.update(e),this.popups.update(e),this.effects.update(e);let r=this.state==="playing"||this.state==="paused"||this.state==="calibrate"||this.state==="outro"?this.audio.songTime():t%600,a=null;if((this.state==="playing"||this.state==="outro")&&this.settings.musicFx){let l=this.audio.bins();l&&(a=this.music.update(l,this.audio.ctx.sampleRate,e))}let o=(this.state==="playing"||this.state==="paused"||this.state==="outro")&&this.tempo,c=o?this.tempo.secToBeat(r):t*1.6;this.world.update(e,{showTime:r,now:t,playing:this.state==="playing",speed:this.speed||10,beat:c,music:a,tempo:o?this.tempo:null}),this.state!=="playing"&&this.vignette.material.opacity>0&&(this.vignette.material.opacity=0),this.composer&&!this.renderer.xr.isPresenting&&!this.settings.lowFx?this.composer.render(e):this.renderer.render(this.scene,this.camera)}};var Ri=n=>document.getElementById(n),Hi=new mc(Ri("scene"),{onExitToPage:()=>Ep()}),wp=Ri("status");function en(n,t=""){wp.textContent=n,wp.dataset.kind=t}function Ep(){document.body.classList.remove("in-game"),Ri("start").hidden=!1,nr()}function Tp(){document.body.classList.add("in-game"),Ri("start").hidden=!0}var Ra=Ri("enter-vr");async function Wy(){let n=Ri("vr-note");if(!window.isSecureContext){Ra.disabled=!0,n.textContent="VR needs a secure (https) page. Open this game from an https address.";return}if(!navigator.xr){Ra.disabled=!0,n.textContent="This browser has no WebXR. On Quest 3, open this page in the Meta Quest Browser.";return}try{let t=await navigator.xr.isSessionSupported("immersive-vr");Ra.disabled=!t;let e=window.self!==window.top,i=/OculusBrowser|Quest/i.test(navigator.userAgent);t?n.textContent="Put on your headset and press Enter VR.":i||e?n.textContent="VR is blocked while this page is embedded. Open the self-hosted copy of Neon Slice to play in VR.":n.textContent="No VR headset found. Open this page in the Meta Quest Browser on your headset."}catch{Ra.disabled=!0,n.textContent='This page is not allowed to start VR here. Use the self-hosted copy (see "Playing on Quest").'}}Wy();Ra.addEventListener("click",async()=>{try{Tp(),await Hi.startXR()}catch(n){console.error(n),Ep(),en(`Could not start VR: ${n.message||n}`,"error")}});Ri("play-desktop").addEventListener("click",async()=>{Tp(),await Hi.startDesktop()});var pu=Ri("map-folder");pu.addEventListener("change",async()=>{let n=Array.from(pu.files||[]);if(pu.value="",!n.length)return;await Hi.audio.init(),en(`Scanning ${n.length} files\u2026`);let{added:t,errors:e}=await Hi.library.importFolder(n);t.length?en(`Added ${t.length} ${t.length===1?"song":"songs"}: ${t.map(i=>i.title).join(", ")}.${e.length?` Skipped ${e.length}: ${e[0]}`:""}`,"ok"):en(e[0]||"No maps found in that folder.","error"),nr(),Hi._redrawMenu()});var mu=Ri("map-file");mu.addEventListener("change",async()=>{let n=Array.from(mu.files||[]);mu.value="",n.length&&await Ap(n)});var ir=Ri("import");ir.addEventListener("dragover",n=>{n.preventDefault(),ir.classList.add("drag")});ir.addEventListener("dragleave",()=>ir.classList.remove("drag"));ir.addEventListener("drop",async n=>{n.preventDefault(),ir.classList.remove("drag");let t=Array.from(n.dataTransfer?.files||[]).filter(e=>/\.zip$/i.test(e.name));t.length&&await Ap(t)});async function Ap(n){await Hi.audio.init();let t=0;for(let e of n){en(`Importing ${e.name}\u2026`);try{let i=await Hi.library.importZip(await e.arrayBuffer());t++,en(`Added "${i.title}".`,"ok")}catch(i){console.error(i),en(`${e.name}: ${i.message||i}`,"error")}}t>1&&en(`Added ${t} maps.`,"ok"),nr()}function nr(){let n=Ri("library");n.replaceChildren();let t=Hi.library.songs.filter(e=>!e.builtIn);Ri("library-empty").hidden=t.length>0,t.sort((e,i)=>(i.fromFolder?1:0)-(e.fromFolder?1:0));for(let e of t){let i=document.createElement("li"),s=document.createElement(e.cover?"img":"span");s.className="cover",e.cover?(s.src=e.cover,s.alt=""):(s.style.setProperty("--h",e.hue),s.textContent=e.title.slice(0,1));let r=document.createElement("div");r.className="meta";let a=document.createElement("strong");a.textContent=e.title;let o=document.createElement("span");if(o.textContent=`${e.artist||"Unknown artist"} \xB7 ${e.difficulties.map(l=>l.label).join(", ")}`,r.append(a,o),e.fromFolder){let l=document.createElement("span");l.className="note",l.textContent="Songs folder",i.append(s,r,l),n.append(i);continue}let c=document.createElement("button");c.type="button",c.className="ghost",c.textContent="Remove",c.setAttribute("aria-label",`Remove ${e.title}`),c.addEventListener("click",async()=>{await Hi.library.remove(e.id),nr(),en(`Removed "${e.title}".`)}),i.append(s,r,c),n.append(i)}}Hi.library.restore().then(()=>Hi.library.scanServerFolder()).then(n=>{nr(),n.length&&en(`Loaded ${n.length} ${n.length===1?"song":"songs"} from the Songs folder.`,"ok")});nr();})();

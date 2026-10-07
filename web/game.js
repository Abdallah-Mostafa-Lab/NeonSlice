(()=>{var gm=Object.create;var Ju=Object.defineProperty;var _m=Object.getOwnPropertyDescriptor;var xm=Object.getOwnPropertyNames;var vm=Object.getPrototypeOf,ym=Object.prototype.hasOwnProperty;var dr=(s=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(s,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):s)(function(s){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+s+'" is not supported')});var bm=(s,t)=>()=>{try{return t||s((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var Sm=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of xm(t))!ym.call(s,n)&&n!==e&&Ju(s,n,{get:()=>t[n],enumerable:!(i=_m(t,n))||i.enumerable});return s};var Mm=(s,t,e)=>(e=s!=null?gm(vm(s)):{},Sm(t||!s||!s.__esModule?Ju(e,"default",{value:s,enumerable:!0}):e,s));var Op=bm((Bp,Lu)=>{(function(s){typeof Bp=="object"&&typeof Lu<"u"?Lu.exports=s():typeof define=="function"&&define.amd?define([],s):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=s()})(function(){return(function s(t,e,i){function n(a,l){if(!e[a]){if(!t[a]){var c=typeof dr=="function"&&dr;if(!l&&c)return c(a,!0);if(r)return r(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var u=e[a]={exports:{}};t[a][0].call(u.exports,function(d){var f=t[a][1][d];return n(f||d)},u,u.exports,s,t,e,i)}return e[a].exports}for(var r=typeof dr=="function"&&dr,o=0;o<i.length;o++)n(i[o]);return n})({1:[function(s,t,e){"use strict";var i=s("./utils"),n=s("./support"),r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(o){for(var a,l,c,h,u,d,f,m=[],_=0,p=o.length,g=p,y=i.getTypeOf(o)!=="string";_<o.length;)g=p-_,c=y?(a=o[_++],l=_<p?o[_++]:0,_<p?o[_++]:0):(a=o.charCodeAt(_++),l=_<p?o.charCodeAt(_++):0,_<p?o.charCodeAt(_++):0),h=a>>2,u=(3&a)<<4|l>>4,d=1<g?(15&l)<<2|c>>6:64,f=2<g?63&c:64,m.push(r.charAt(h)+r.charAt(u)+r.charAt(d)+r.charAt(f));return m.join("")},e.decode=function(o){var a,l,c,h,u,d,f=0,m=0,_="data:";if(o.substr(0,_.length)===_)throw new Error("Invalid base64 input, it looks like a data url.");var p,g=3*(o=o.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(o.charAt(o.length-1)===r.charAt(64)&&g--,o.charAt(o.length-2)===r.charAt(64)&&g--,g%1!=0)throw new Error("Invalid base64 input, bad content length.");for(p=n.uint8array?new Uint8Array(0|g):new Array(0|g);f<o.length;)a=r.indexOf(o.charAt(f++))<<2|(h=r.indexOf(o.charAt(f++)))>>4,l=(15&h)<<4|(u=r.indexOf(o.charAt(f++)))>>2,c=(3&u)<<6|(d=r.indexOf(o.charAt(f++))),p[m++]=a,u!==64&&(p[m++]=l),d!==64&&(p[m++]=c);return p}},{"./support":30,"./utils":32}],2:[function(s,t,e){"use strict";var i=s("./external"),n=s("./stream/DataWorker"),r=s("./stream/Crc32Probe"),o=s("./stream/DataLengthProbe");function a(l,c,h,u,d){this.compressedSize=l,this.uncompressedSize=c,this.crc32=h,this.compression=u,this.compressedContent=d}a.prototype={getContentWorker:function(){var l=new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")),c=this;return l.on("end",function(){if(this.streamInfo.data_length!==c.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),l},getCompressedWorker:function(){return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},a.createWorkerFrom=function(l,c,h){return l.pipe(new r).pipe(new o("uncompressedSize")).pipe(c.compressWorker(h)).pipe(new o("compressedSize")).withStreamInfo("compression",c)},t.exports=a},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(s,t,e){"use strict";var i=s("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},e.DEFLATE=s("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(s,t,e){"use strict";var i=s("./utils"),n=(function(){for(var r,o=[],a=0;a<256;a++){r=a;for(var l=0;l<8;l++)r=1&r?3988292384^r>>>1:r>>>1;o[a]=r}return o})();t.exports=function(r,o){return r!==void 0&&r.length?i.getTypeOf(r)!=="string"?(function(a,l,c,h){var u=n,d=h+c;a^=-1;for(var f=h;f<d;f++)a=a>>>8^u[255&(a^l[f])];return-1^a})(0|o,r,r.length,0):(function(a,l,c,h){var u=n,d=h+c;a^=-1;for(var f=h;f<d;f++)a=a>>>8^u[255&(a^l.charCodeAt(f))];return-1^a})(0|o,r,r.length,0):0}},{"./utils":32}],5:[function(s,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(s,t,e){"use strict";var i=null;i=typeof Promise<"u"?Promise:s("lie"),t.exports={Promise:i}},{lie:37}],7:[function(s,t,e){"use strict";var i=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",n=s("pako"),r=s("./utils"),o=s("./stream/GenericWorker"),a=i?"uint8array":"array";function l(c,h){o.call(this,"FlateWorker/"+c),this._pako=null,this._pakoAction=c,this._pakoOptions=h,this.meta={}}e.magic="\b\0",r.inherits(l,o),l.prototype.processChunk=function(c){this.meta=c.meta,this._pako===null&&this._createPako(),this._pako.push(r.transformTo(a,c.data),!1)},l.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},l.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},l.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var c=this;this._pako.onData=function(h){c.push({data:h,meta:c.meta})}},e.compressWorker=function(c){return new l("Deflate",c)},e.uncompressWorker=function(){return new l("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(s,t,e){"use strict";function i(u,d){var f,m="";for(f=0;f<d;f++)m+=String.fromCharCode(255&u),u>>>=8;return m}function n(u,d,f,m,_,p){var g,y,x=u.file,v=u.compression,S=p!==a.utf8encode,E=r.transformTo("string",p(x.name)),R=r.transformTo("string",a.utf8encode(x.name)),M=x.comment,C=r.transformTo("string",p(M)),T=r.transformTo("string",a.utf8encode(M)),P=R.length!==x.name.length,b=T.length!==M.length,B="",H="",z="",Y=x.dir,V=x.date,j={crc32:0,compressedSize:0,uncompressedSize:0};d&&!f||(j.crc32=u.crc32,j.compressedSize=u.compressedSize,j.uncompressedSize=u.uncompressedSize);var O=0;d&&(O|=8),S||!P&&!b||(O|=2048);var k=0,it=0;Y&&(k|=16),_==="UNIX"?(it=798,k|=(function(nt,Ht){var Yt=nt;return nt||(Yt=Ht?16893:33204),(65535&Yt)<<16})(x.unixPermissions,Y)):(it=20,k|=(function(nt){return 63&(nt||0)})(x.dosPermissions)),g=V.getUTCHours(),g<<=6,g|=V.getUTCMinutes(),g<<=5,g|=V.getUTCSeconds()/2,y=V.getUTCFullYear()-1980,y<<=4,y|=V.getUTCMonth()+1,y<<=5,y|=V.getUTCDate(),P&&(H=i(1,1)+i(l(E),4)+R,B+="up"+i(H.length,2)+H),b&&(z=i(1,1)+i(l(C),4)+T,B+="uc"+i(z.length,2)+z);var q="";return q+=`
\0`,q+=i(O,2),q+=v.magic,q+=i(g,2),q+=i(y,2),q+=i(j.crc32,4),q+=i(j.compressedSize,4),q+=i(j.uncompressedSize,4),q+=i(E.length,2),q+=i(B.length,2),{fileRecord:c.LOCAL_FILE_HEADER+q+E+B,dirRecord:c.CENTRAL_FILE_HEADER+i(it,2)+q+i(C.length,2)+"\0\0\0\0"+i(k,4)+i(m,4)+E+B+C}}var r=s("../utils"),o=s("../stream/GenericWorker"),a=s("../utf8"),l=s("../crc32"),c=s("../signature");function h(u,d,f,m){o.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=d,this.zipPlatform=f,this.encodeFileName=m,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}r.inherits(h,o),h.prototype.push=function(u){var d=u.meta.percent||0,f=this.entriesCount,m=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,o.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:f?(d+100*(f-m-1))/f:100}}))},h.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var d=this.streamFiles&&!u.file.dir;if(d){var f=n(u,d,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:f.fileRecord,meta:{percent:0}})}else this.accumulate=!0},h.prototype.closedSource=function(u){this.accumulate=!1;var d=this.streamFiles&&!u.file.dir,f=n(u,d,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(f.dirRecord),d)this.push({data:(function(m){return c.DATA_DESCRIPTOR+i(m.crc32,4)+i(m.compressedSize,4)+i(m.uncompressedSize,4)})(u),meta:{percent:100}});else for(this.push({data:f.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},h.prototype.flush=function(){for(var u=this.bytesWritten,d=0;d<this.dirRecords.length;d++)this.push({data:this.dirRecords[d],meta:{percent:100}});var f=this.bytesWritten-u,m=(function(_,p,g,y,x){var v=r.transformTo("string",x(y));return c.CENTRAL_DIRECTORY_END+"\0\0\0\0"+i(_,2)+i(_,2)+i(p,4)+i(g,4)+i(v.length,2)+v})(this.dirRecords.length,f,u,this.zipComment,this.encodeFileName);this.push({data:m,meta:{percent:100}})},h.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},h.prototype.registerPrevious=function(u){this._sources.push(u);var d=this;return u.on("data",function(f){d.processChunk(f)}),u.on("end",function(){d.closedSource(d.previous.streamInfo),d._sources.length?d.prepareNextSource():d.end()}),u.on("error",function(f){d.error(f)}),this},h.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},h.prototype.error=function(u){var d=this._sources;if(!o.prototype.error.call(this,u))return!1;for(var f=0;f<d.length;f++)try{d[f].error(u)}catch{}return!0},h.prototype.lock=function(){o.prototype.lock.call(this);for(var u=this._sources,d=0;d<u.length;d++)u[d].lock()},t.exports=h},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(s,t,e){"use strict";var i=s("../compressions"),n=s("./ZipFileWorker");e.generateWorker=function(r,o,a){var l=new n(o.streamFiles,a,o.platform,o.encodeFileName),c=0;try{r.forEach(function(h,u){c++;var d=(function(p,g){var y=p||g,x=i[y];if(!x)throw new Error(y+" is not a valid compression method !");return x})(u.options.compression,o.compression),f=u.options.compressionOptions||o.compressionOptions||{},m=u.dir,_=u.date;u._compressWorker(d,f).withStreamInfo("file",{name:h,dir:m,date:_,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(l)}),l.entriesCount=c}catch(h){l.error(h)}return l}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(s,t,e){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var n=new i;for(var r in this)typeof this[r]!="function"&&(n[r]=this[r]);return n}}(i.prototype=s("./object")).loadAsync=s("./load"),i.support=s("./support"),i.defaults=s("./defaults"),i.version="3.10.2",i.loadAsync=function(n,r){return new i().loadAsync(n,r)},i.external=s("./external"),t.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(s,t,e){"use strict";var i=s("./utils"),n=s("./external"),r=s("./utf8"),o=s("./zipEntries"),a=s("./stream/Crc32Probe"),l=s("./nodejsUtils");function c(h){return new n.Promise(function(u,d){var f=h.decompressed.getContentWorker().pipe(new a);f.on("error",function(m){d(m)}).on("end",function(){f.streamInfo.crc32!==h.decompressed.crc32?d(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}t.exports=function(h,u){var d=this;return u=i.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:r.utf8decode}),l.isNode&&l.isStream(h)?n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):i.prepareContent("the loaded zip file",h,!0,u.optimizedBinaryString,u.base64).then(function(f){var m=new o(u);return m.load(f),m}).then(function(f){var m=[n.Promise.resolve(f)],_=f.files;if(u.checkCRC32)for(var p=0;p<_.length;p++)m.push(c(_[p]));return n.Promise.all(m)}).then(function(f){for(var m=f.shift(),_=m.files,p=0;p<_.length;p++){var g=_[p],y=g.fileNameStr,x=i.resolve(g.fileNameStr);d.file(x,g.decompressed,{binary:!0,optimizedBinaryString:!0,date:g.date,dir:g.dir,comment:g.fileCommentStr.length?g.fileCommentStr:null,unixPermissions:g.unixPermissions,dosPermissions:g.dosPermissions,createFolders:u.createFolders}),g.dir||(d.file(x).unsafeOriginalName=y)}return m.zipComment.length&&(d.comment=m.zipComment),d})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(s,t,e){"use strict";var i=s("../utils"),n=s("../stream/GenericWorker");function r(o,a){n.call(this,"Nodejs stream input adapter for "+o),this._upstreamEnded=!1,this._bindStream(a)}i.inherits(r,n),r.prototype._bindStream=function(o){var a=this;(this._stream=o).pause(),o.on("data",function(l){a.push({data:l,meta:{percent:0}})}).on("error",function(l){a.isPaused?this.generatedError=l:a.error(l)}).on("end",function(){a.isPaused?a._upstreamEnded=!0:a.end()})},r.prototype.pause=function(){return!!n.prototype.pause.call(this)&&(this._stream.pause(),!0)},r.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=r},{"../stream/GenericWorker":28,"../utils":32}],13:[function(s,t,e){"use strict";var i=s("readable-stream").Readable;function n(r,o,a){i.call(this,o),this._helper=r;var l=this;r.on("data",function(c,h){l.push(c)||l._helper.pause(),a&&a(h)}).on("error",function(c){l.emit("error",c)}).on("end",function(){l.push(null)})}s("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(s,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(i,n){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(i,n);if(typeof i=="number")throw new Error('The "data" argument must not be a number');return new Buffer(i,n)},allocBuffer:function(i){if(Buffer.alloc)return Buffer.alloc(i);var n=new Buffer(i);return n.fill(0),n},isBuffer:function(i){return Buffer.isBuffer(i)},isStream:function(i){return i&&typeof i.on=="function"&&typeof i.pause=="function"&&typeof i.resume=="function"}}},{}],15:[function(s,t,e){"use strict";function i(x,v,S){var E,R=r.getTypeOf(v),M=r.extend(S||{},l);M.date=M.date||new Date,M.compression!==null&&(M.compression=M.compression.toUpperCase()),typeof M.unixPermissions=="string"&&(M.unixPermissions=parseInt(M.unixPermissions,8)),M.unixPermissions&&16384&M.unixPermissions&&(M.dir=!0),M.dosPermissions&&16&M.dosPermissions&&(M.dir=!0),M.dir&&(x=_(x)),M.createFolders&&(E=m(x))&&p.call(this,E,!0);var C=R==="string"&&M.binary===!1&&M.base64===!1;S&&S.binary!==void 0||(M.binary=!C),(v instanceof c&&v.uncompressedSize===0||M.dir||!v||v.length===0)&&(M.base64=!1,M.binary=!0,v="",M.compression="STORE",R="string");var T=null;T=v instanceof c||v instanceof o?v:d.isNode&&d.isStream(v)?new f(x,v):r.prepareContent(x,v,M.binary,M.optimizedBinaryString,M.base64);var P=new h(x,T,M);this.files[x]=P}var n=s("./utf8"),r=s("./utils"),o=s("./stream/GenericWorker"),a=s("./stream/StreamHelper"),l=s("./defaults"),c=s("./compressedObject"),h=s("./zipObject"),u=s("./generate"),d=s("./nodejsUtils"),f=s("./nodejs/NodejsStreamInputAdapter"),m=function(x){x.slice(-1)==="/"&&(x=x.substring(0,x.length-1));var v=x.lastIndexOf("/");return 0<v?x.substring(0,v):""},_=function(x){return x.slice(-1)!=="/"&&(x+="/"),x},p=function(x,v){return v=v!==void 0?v:l.createFolders,x=_(x),this.files[x]||i.call(this,x,null,{dir:!0,createFolders:v}),this.files[x]};function g(x){return Object.prototype.toString.call(x)==="[object RegExp]"}var y={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(x){var v,S,E;for(v in this.files)E=this.files[v],(S=v.slice(this.root.length,v.length))&&v.slice(0,this.root.length)===this.root&&x(S,E)},filter:function(x){var v=[];return this.forEach(function(S,E){x(S,E)&&v.push(E)}),v},file:function(x,v,S){if(arguments.length!==1)return x=this.root+x,i.call(this,x,v,S),this;if(g(x)){var E=x;return this.filter(function(M,C){return!C.dir&&E.test(M)})}var R=this.files[this.root+x];return R&&!R.dir?R:null},folder:function(x){if(!x)return this;if(g(x))return this.filter(function(R,M){return M.dir&&x.test(R)});var v=this.root+x,S=p.call(this,v),E=this.clone();return E.root=S.name,E},remove:function(x){x=this.root+x;var v=this.files[x];if(v||(x.slice(-1)!=="/"&&(x+="/"),v=this.files[x]),v&&!v.dir)delete this.files[x];else for(var S=this.filter(function(R,M){return M.name.slice(0,x.length)===x}),E=0;E<S.length;E++)delete this.files[S[E].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(x){var v,S={};try{if((S=r.extend(x||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:n.utf8encode})).type=S.type.toLowerCase(),S.compression=S.compression.toUpperCase(),S.type==="binarystring"&&(S.type="string"),!S.type)throw new Error("No output type specified.");r.checkSupport(S.type),S.platform!=="darwin"&&S.platform!=="freebsd"&&S.platform!=="linux"&&S.platform!=="sunos"||(S.platform="UNIX"),S.platform==="win32"&&(S.platform="DOS");var E=S.comment||this.comment||"";v=u.generateWorker(this,S,E)}catch(R){(v=new o("error")).error(R)}return new a(v,S.type||"string",S.mimeType)},generateAsync:function(x,v){return this.generateInternalStream(x).accumulate(v)},generateNodeStream:function(x,v){return(x=x||{}).type||(x.type="nodebuffer"),this.generateInternalStream(x).toNodejsStream(v)}};t.exports=y},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(s,t,e){"use strict";t.exports=s("stream")},{stream:void 0}],17:[function(s,t,e){"use strict";var i=s("./DataReader");function n(r){i.call(this,r);for(var o=0;o<this.data.length;o++)r[o]=255&r[o]}s("../utils").inherits(n,i),n.prototype.byteAt=function(r){return this.data[this.zero+r]},n.prototype.lastIndexOfSignature=function(r){for(var o=r.charCodeAt(0),a=r.charCodeAt(1),l=r.charCodeAt(2),c=r.charCodeAt(3),h=this.length-4;0<=h;--h)if(this.data[h]===o&&this.data[h+1]===a&&this.data[h+2]===l&&this.data[h+3]===c)return h-this.zero;return-1},n.prototype.readAndCheckSignature=function(r){var o=r.charCodeAt(0),a=r.charCodeAt(1),l=r.charCodeAt(2),c=r.charCodeAt(3),h=this.readData(4);return o===h[0]&&a===h[1]&&l===h[2]&&c===h[3]},n.prototype.readData=function(r){if(this.checkOffset(r),r===0)return[];var o=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,o},t.exports=n},{"../utils":32,"./DataReader":18}],18:[function(s,t,e){"use strict";var i=s("../utils");function n(r){this.data=r,this.length=r.length,this.index=0,this.zero=0}n.prototype={checkOffset:function(r){this.checkIndex(this.index+r)},checkIndex:function(r){if(this.length<this.zero+r||r<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+r+"). Corrupted zip ?")},setIndex:function(r){this.checkIndex(r),this.index=r},skip:function(r){this.setIndex(this.index+r)},byteAt:function(){},readInt:function(r){var o,a=0;for(this.checkOffset(r),o=this.index+r-1;o>=this.index;o--)a=(a<<8)+this.byteAt(o);return this.index+=r,a},readString:function(r){return i.transformTo("string",this.readData(r))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var r=this.readInt(4);return new Date(Date.UTC(1980+(r>>25&127),(r>>21&15)-1,r>>16&31,r>>11&31,r>>5&63,(31&r)<<1))}},t.exports=n},{"../utils":32}],19:[function(s,t,e){"use strict";var i=s("./Uint8ArrayReader");function n(r){i.call(this,r)}s("../utils").inherits(n,i),n.prototype.readData=function(r){this.checkOffset(r);var o=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,o},t.exports=n},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(s,t,e){"use strict";var i=s("./DataReader");function n(r){i.call(this,r)}s("../utils").inherits(n,i),n.prototype.byteAt=function(r){return this.data.charCodeAt(this.zero+r)},n.prototype.lastIndexOfSignature=function(r){return this.data.lastIndexOf(r)-this.zero},n.prototype.readAndCheckSignature=function(r){return r===this.readData(4)},n.prototype.readData=function(r){this.checkOffset(r);var o=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,o},t.exports=n},{"../utils":32,"./DataReader":18}],21:[function(s,t,e){"use strict";var i=s("./ArrayReader");function n(r){i.call(this,r)}s("../utils").inherits(n,i),n.prototype.readData=function(r){if(this.checkOffset(r),r===0)return new Uint8Array(0);var o=this.data.subarray(this.zero+this.index,this.zero+this.index+r);return this.index+=r,o},t.exports=n},{"../utils":32,"./ArrayReader":17}],22:[function(s,t,e){"use strict";var i=s("../utils"),n=s("../support"),r=s("./ArrayReader"),o=s("./StringReader"),a=s("./NodeBufferReader"),l=s("./Uint8ArrayReader");t.exports=function(c){var h=i.getTypeOf(c);return i.checkSupport(h),h!=="string"||n.uint8array?h==="nodebuffer"?new a(c):n.uint8array?new l(i.transformTo("uint8array",c)):new r(i.transformTo("array",c)):new o(c)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(s,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(s,t,e){"use strict";var i=s("./GenericWorker"),n=s("../utils");function r(o){i.call(this,"ConvertWorker to "+o),this.destType=o}n.inherits(r,i),r.prototype.processChunk=function(o){this.push({data:n.transformTo(this.destType,o.data),meta:o.meta})},t.exports=r},{"../utils":32,"./GenericWorker":28}],25:[function(s,t,e){"use strict";var i=s("./GenericWorker"),n=s("../crc32");function r(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}s("../utils").inherits(r,i),r.prototype.processChunk=function(o){this.streamInfo.crc32=n(o.data,this.streamInfo.crc32||0),this.push(o)},t.exports=r},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(s,t,e){"use strict";var i=s("../utils"),n=s("./GenericWorker");function r(o){n.call(this,"DataLengthProbe for "+o),this.propName=o,this.withStreamInfo(o,0)}i.inherits(r,n),r.prototype.processChunk=function(o){if(o){var a=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=a+o.data.length}n.prototype.processChunk.call(this,o)},t.exports=r},{"../utils":32,"./GenericWorker":28}],27:[function(s,t,e){"use strict";var i=s("../utils"),n=s("./GenericWorker");function r(o){n.call(this,"DataWorker");var a=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,o.then(function(l){a.dataIsReady=!0,a.data=l,a.max=l&&l.length||0,a.type=i.getTypeOf(l),a.isPaused||a._tickAndRepeat()},function(l){a.error(l)})}i.inherits(r,n),r.prototype.cleanUp=function(){n.prototype.cleanUp.call(this),this.data=null},r.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},r.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},r.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var o=null,a=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":o=this.data.substring(this.index,a);break;case"uint8array":o=this.data.subarray(this.index,a);break;case"array":case"nodebuffer":o=this.data.slice(this.index,a)}return this.index=a,this.push({data:o,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=r},{"../utils":32,"./GenericWorker":28}],28:[function(s,t,e){"use strict";function i(n){this.name=n||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(n){this.emit("data",n)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(n){this.emit("error",n)}return!0},error:function(n){return!this.isFinished&&(this.isPaused?this.generatedError=n:(this.isFinished=!0,this.emit("error",n),this.previous&&this.previous.error(n),this.cleanUp()),!0)},on:function(n,r){return this._listeners[n].push(r),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(n,r){if(this._listeners[n])for(var o=0;o<this._listeners[n].length;o++)this._listeners[n][o].call(this,r)},pipe:function(n){return n.registerPrevious(this)},registerPrevious:function(n){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=n.streamInfo,this.mergeStreamInfo(),this.previous=n;var r=this;return n.on("data",function(o){r.processChunk(o)}),n.on("end",function(){r.end()}),n.on("error",function(o){r.error(o)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var n=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),n=!0),this.previous&&this.previous.resume(),!n},flush:function(){},processChunk:function(n){this.push(n)},withStreamInfo:function(n,r){return this.extraStreamInfo[n]=r,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var n in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,n)&&(this.streamInfo[n]=this.extraStreamInfo[n])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var n="Worker "+this.name;return this.previous?this.previous+" -> "+n:n}},t.exports=i},{}],29:[function(s,t,e){"use strict";var i=s("../utils"),n=s("./ConvertWorker"),r=s("./GenericWorker"),o=s("../base64"),a=s("../support"),l=s("../external"),c=null;if(a.nodestream)try{c=s("../nodejs/NodejsStreamOutputAdapter")}catch{}function h(d,f){return new l.Promise(function(m,_){var p=[],g=d._internalType,y=d._outputType,x=d._mimeType;d.on("data",function(v,S){p.push(v),f&&f(S)}).on("error",function(v){p=[],_(v)}).on("end",function(){try{var v=(function(S,E,R){switch(S){case"blob":return i.newBlob(i.transformTo("arraybuffer",E),R);case"base64":return o.encode(E);default:return i.transformTo(S,E)}})(y,(function(S,E){var R,M=0,C=null,T=0;for(R=0;R<E.length;R++)T+=E[R].length;switch(S){case"string":return E.join("");case"array":return Array.prototype.concat.apply([],E);case"uint8array":for(C=new Uint8Array(T),R=0;R<E.length;R++)C.set(E[R],M),M+=E[R].length;return C;case"nodebuffer":return Buffer.concat(E);default:throw new Error("concat : unsupported type '"+S+"'")}})(g,p),x);m(v)}catch(S){_(S)}p=[]}).resume()})}function u(d,f,m){var _=f;switch(f){case"blob":case"arraybuffer":_="uint8array";break;case"base64":_="string"}try{this._internalType=_,this._outputType=f,this._mimeType=m,i.checkSupport(_),this._worker=d.pipe(new n(_)),d.lock()}catch(p){this._worker=new r("error"),this._worker.error(p)}}u.prototype={accumulate:function(d){return h(this,d)},on:function(d,f){var m=this;return d==="data"?this._worker.on(d,function(_){f.call(m,_.data,_.meta)}):this._worker.on(d,function(){i.delay(f,arguments,m)}),this},resume:function(){return i.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(d){if(i.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new c(this,{objectMode:this._outputType!=="nodebuffer"},d)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(s,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var i=new ArrayBuffer(0);try{e.blob=new Blob([i],{type:"application/zip"}).size===0}catch{try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);n.append(i),e.blob=n.getBlob("application/zip").size===0}catch{e.blob=!1}}}try{e.nodestream=!!s("readable-stream").Readable}catch{e.nodestream=!1}},{"readable-stream":16}],31:[function(s,t,e){"use strict";for(var i=s("./utils"),n=s("./support"),r=s("./nodejsUtils"),o=s("./stream/GenericWorker"),a=new Array(256),l=0;l<256;l++)a[l]=252<=l?6:248<=l?5:240<=l?4:224<=l?3:192<=l?2:1;a[254]=a[254]=1;function c(){o.call(this,"utf-8 decode"),this.leftOver=null}function h(){o.call(this,"utf-8 encode")}e.utf8encode=function(u){return n.nodebuffer?r.newBufferFrom(u,"utf-8"):(function(d){var f,m,_,p,g,y=d.length,x=0;for(p=0;p<y;p++)(64512&(m=d.charCodeAt(p)))==55296&&p+1<y&&(64512&(_=d.charCodeAt(p+1)))==56320&&(m=65536+(m-55296<<10)+(_-56320),p++),x+=m<128?1:m<2048?2:m<65536?3:4;for(f=n.uint8array?new Uint8Array(x):new Array(x),p=g=0;g<x;p++)(64512&(m=d.charCodeAt(p)))==55296&&p+1<y&&(64512&(_=d.charCodeAt(p+1)))==56320&&(m=65536+(m-55296<<10)+(_-56320),p++),m<128?f[g++]=m:(m<2048?f[g++]=192|m>>>6:(m<65536?f[g++]=224|m>>>12:(f[g++]=240|m>>>18,f[g++]=128|m>>>12&63),f[g++]=128|m>>>6&63),f[g++]=128|63&m);return f})(u)},e.utf8decode=function(u){return n.nodebuffer?i.transformTo("nodebuffer",u).toString("utf-8"):(function(d){var f,m,_,p,g=d.length,y=new Array(2*g);for(f=m=0;f<g;)if((_=d[f++])<128)y[m++]=_;else if(4<(p=a[_]))y[m++]=65533,f+=p-1;else{for(_&=p===2?31:p===3?15:7;1<p&&f<g;)_=_<<6|63&d[f++],p--;1<p?y[m++]=65533:_<65536?y[m++]=_:(_-=65536,y[m++]=55296|_>>10&1023,y[m++]=56320|1023&_)}return y.length!==m&&(y.subarray?y=y.subarray(0,m):y.length=m),i.applyFromCharCode(y)})(u=i.transformTo(n.uint8array?"uint8array":"array",u))},i.inherits(c,o),c.prototype.processChunk=function(u){var d=i.transformTo(n.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(n.uint8array){var f=d;(d=new Uint8Array(f.length+this.leftOver.length)).set(this.leftOver,0),d.set(f,this.leftOver.length)}else d=this.leftOver.concat(d);this.leftOver=null}var m=(function(p,g){var y;for((g=g||p.length)>p.length&&(g=p.length),y=g-1;0<=y&&(192&p[y])==128;)y--;return y<0||y===0?g:y+a[p[y]]>g?y:g})(d),_=d;m!==d.length&&(n.uint8array?(_=d.subarray(0,m),this.leftOver=d.subarray(m,d.length)):(_=d.slice(0,m),this.leftOver=d.slice(m,d.length))),this.push({data:e.utf8decode(_),meta:u.meta})},c.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=c,i.inherits(h,o),h.prototype.processChunk=function(u){this.push({data:e.utf8encode(u.data),meta:u.meta})},e.Utf8EncodeWorker=h},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(s,t,e){"use strict";var i=s("./support"),n=s("./base64"),r=s("./nodejsUtils"),o=s("./external");function a(f){return f}function l(f,m){for(var _=0;_<f.length;++_)m[_]=255&f.charCodeAt(_);return m}s("setimmediate"),e.newBlob=function(f,m){e.checkSupport("blob");try{return new Blob([f],{type:m})}catch{try{var _=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return _.append(f),_.getBlob(m)}catch{throw new Error("Bug : can't construct the Blob.")}}};var c={stringifyByChunk:function(f,m,_){var p=[],g=0,y=f.length;if(y<=_)return String.fromCharCode.apply(null,f);for(;g<y;)m==="array"||m==="nodebuffer"?p.push(String.fromCharCode.apply(null,f.slice(g,Math.min(g+_,y)))):p.push(String.fromCharCode.apply(null,f.subarray(g,Math.min(g+_,y)))),g+=_;return p.join("")},stringifyByChar:function(f){for(var m="",_=0;_<f.length;_++)m+=String.fromCharCode(f[_]);return m},applyCanBeUsed:{uint8array:(function(){try{return i.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return i.nodebuffer&&String.fromCharCode.apply(null,r.allocBuffer(1)).length===1}catch{return!1}})()}};function h(f){var m=65536,_=e.getTypeOf(f),p=!0;if(_==="uint8array"?p=c.applyCanBeUsed.uint8array:_==="nodebuffer"&&(p=c.applyCanBeUsed.nodebuffer),p)for(;1<m;)try{return c.stringifyByChunk(f,_,m)}catch{m=Math.floor(m/2)}return c.stringifyByChar(f)}function u(f,m){for(var _=0;_<f.length;_++)m[_]=f[_];return m}e.applyFromCharCode=h;var d={};d.string={string:a,array:function(f){return l(f,new Array(f.length))},arraybuffer:function(f){return d.string.uint8array(f).buffer},uint8array:function(f){return l(f,new Uint8Array(f.length))},nodebuffer:function(f){return l(f,r.allocBuffer(f.length))}},d.array={string:h,array:a,arraybuffer:function(f){return new Uint8Array(f).buffer},uint8array:function(f){return new Uint8Array(f)},nodebuffer:function(f){return r.newBufferFrom(f)}},d.arraybuffer={string:function(f){return h(new Uint8Array(f))},array:function(f){return u(new Uint8Array(f),new Array(f.byteLength))},arraybuffer:a,uint8array:function(f){return new Uint8Array(f)},nodebuffer:function(f){return r.newBufferFrom(new Uint8Array(f))}},d.uint8array={string:h,array:function(f){return u(f,new Array(f.length))},arraybuffer:function(f){return f.buffer},uint8array:a,nodebuffer:function(f){return r.newBufferFrom(f)}},d.nodebuffer={string:h,array:function(f){return u(f,new Array(f.length))},arraybuffer:function(f){return d.nodebuffer.uint8array(f).buffer},uint8array:function(f){return u(f,new Uint8Array(f.length))},nodebuffer:a},e.transformTo=function(f,m){if(m=m||"",!f)return m;e.checkSupport(f);var _=e.getTypeOf(m);return d[_][f](m)},e.resolve=function(f){for(var m=f.split("/"),_=[],p=0;p<m.length;p++){var g=m[p];g==="."||g===""&&p!==0&&p!==m.length-1||(g===".."?_.pop():_.push(g))}return _.join("/")},e.getTypeOf=function(f){if(typeof f=="string")return"string";var m=Object.prototype.toString.call(f);return m==="[object Array]"?"array":i.nodebuffer&&r.isBuffer(f)?"nodebuffer":i.uint8array&&m==="[object Uint8Array]"?"uint8array":i.arraybuffer&&m==="[object ArrayBuffer]"?"arraybuffer":void 0},e.checkSupport=function(f){if(!i[f.toLowerCase()])throw new Error(f+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(f){var m,_,p="";for(_=0;_<(f||"").length;_++)p+="\\x"+((m=f.charCodeAt(_))<16?"0":"")+m.toString(16).toUpperCase();return p},e.delay=function(f,m,_){setImmediate(function(){f.apply(_||null,m||[])})},e.inherits=function(f,m){function _(){}_.prototype=m.prototype,f.prototype=new _},e.extend=function(){var f,m,_={};for(f=0;f<arguments.length;f++)for(m in arguments[f])Object.prototype.hasOwnProperty.call(arguments[f],m)&&_[m]===void 0&&(_[m]=arguments[f][m]);return _},e.prepareContent=function(f,m,_,p,g){return o.Promise.resolve(m).then(function(y){return i.blob&&(y instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(y))!==-1)?Blob.prototype.arrayBuffer!==void 0?y.arrayBuffer():typeof FileReader<"u"?new o.Promise(function(x,v){var S=new FileReader;S.onload=function(E){x(E.target.result)},S.onerror=function(E){v(E.target.error)},S.readAsArrayBuffer(y)}):o.Promise.reject(new Error(f+" is a Blob, but we have no way of reading it.")):y}).then(function(y){var x=e.getTypeOf(y);return x?(x==="arraybuffer"?y=e.transformTo("uint8array",y):x==="string"&&(g?y=n.decode(y):_&&p!==!0&&(y=(function(v){return l(v,i.uint8array?new Uint8Array(v.length):new Array(v.length))})(y))),y):o.Promise.reject(new Error("Can't read the data of '"+f+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(s,t,e){"use strict";var i=s("./reader/readerFor"),n=s("./utils"),r=s("./signature"),o=s("./zipEntry"),a=s("./support");function l(c){this.files=[],this.loadOptions=c}l.prototype={checkSignature:function(c){if(!this.reader.readAndCheckSignature(c)){this.reader.index-=4;var h=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+n.pretty(h)+", expected "+n.pretty(c)+")")}},isSignature:function(c,h){var u=this.reader.index;this.reader.setIndex(c);var d=this.reader.readString(4)===h;return this.reader.setIndex(u),d},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var c=this.reader.readData(this.zipCommentLength),h=a.uint8array?"uint8array":"array",u=n.transformTo(h,c);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var c,h,u,d=this.zip64EndOfCentralSize-44;0<d;)c=this.reader.readInt(2),h=this.reader.readInt(4),u=this.reader.readData(h),this.zip64ExtensibleData[c]={id:c,length:h,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var c,h;for(c=0;c<this.files.length;c++)h=this.files[c],this.reader.setIndex(h.localHeaderOffset),this.checkSignature(r.LOCAL_FILE_HEADER),h.readLocalPart(this.reader),h.handleUTF8(),h.processAttributes()},readCentralDir:function(){var c;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER);)(c=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(c);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var c=this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);if(c<0)throw this.isSignature(0,r.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(c);var h=c;if(this.checkSignature(r.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){if(this.zip64=!0,(c=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(c),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,r.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var d=h-u;if(0<d)this.isSignature(h,r.CENTRAL_FILE_HEADER)||(this.reader.zero=d);else if(d<0)throw new Error("Corrupted zip: missing "+Math.abs(d)+" bytes.")},prepareReader:function(c){this.reader=i(c)},load:function(c){this.prepareReader(c),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=l},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(s,t,e){"use strict";var i=s("./reader/readerFor"),n=s("./utils"),r=s("./compressedObject"),o=s("./crc32"),a=s("./utf8"),l=s("./compressions"),c=s("./support");function h(u,d){this.options=u,this.loadOptions=d}h.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var d,f;if(u.skip(22),this.fileNameLength=u.readInt(2),f=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(f),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((d=(function(m){for(var _ in l)if(Object.prototype.hasOwnProperty.call(l,_)&&l[_].magic===m)return l[_];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+n.pretty(this.compressionMethod)+" unknown (inner file : "+n.transformTo("string",this.fileName)+")");this.decompressed=new r(this.compressedSize,this.uncompressedSize,this.crc32,d,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var d=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(d),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=i(this.extraFields[1].value);this.uncompressedSize===n.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===n.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===n.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===n.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var d,f,m,_=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<_;)d=u.readInt(2),f=u.readInt(2),m=u.readData(f),this.extraFields[d]={id:d,length:f,value:m};u.setIndex(_)},handleUTF8:function(){var u=c.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=a.utf8decode(this.fileName),this.fileCommentStr=a.utf8decode(this.fileComment);else{var d=this.findExtraFieldUnicodePath();if(d!==null)this.fileNameStr=d;else{var f=n.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(f)}var m=this.findExtraFieldUnicodeComment();if(m!==null)this.fileCommentStr=m;else{var _=n.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(_)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var d=i(u.value);return d.readInt(1)!==1||o(this.fileName)!==d.readInt(4)?null:a.utf8decode(d.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var d=i(u.value);return d.readInt(1)!==1||o(this.fileComment)!==d.readInt(4)?null:a.utf8decode(d.readData(u.length-5))}return null}},t.exports=h},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(s,t,e){"use strict";function i(d,f,m){this.name=d,this.dir=m.dir,this.date=m.date,this.comment=m.comment,this.unixPermissions=m.unixPermissions,this.dosPermissions=m.dosPermissions,this._data=f,this._dataBinary=m.binary,this.options={compression:m.compression,compressionOptions:m.compressionOptions}}var n=s("./stream/StreamHelper"),r=s("./stream/DataWorker"),o=s("./utf8"),a=s("./compressedObject"),l=s("./stream/GenericWorker");i.prototype={internalStream:function(d){var f=null,m="string";try{if(!d)throw new Error("No output type specified.");var _=(m=d.toLowerCase())==="string"||m==="text";m!=="binarystring"&&m!=="text"||(m="string"),f=this._decompressWorker();var p=!this._dataBinary;p&&!_&&(f=f.pipe(new o.Utf8EncodeWorker)),!p&&_&&(f=f.pipe(new o.Utf8DecodeWorker))}catch(g){(f=new l("error")).error(g)}return new n(f,m,"")},async:function(d,f){return this.internalStream(d).accumulate(f)},nodeStream:function(d,f){return this.internalStream(d||"nodebuffer").toNodejsStream(f)},_compressWorker:function(d,f){if(this._data instanceof a&&this._data.compression.magic===d.magic)return this._data.getCompressedWorker();var m=this._decompressWorker();return this._dataBinary||(m=m.pipe(new o.Utf8EncodeWorker)),a.createWorkerFrom(m,d,f)},_decompressWorker:function(){return this._data instanceof a?this._data.getContentWorker():this._data instanceof l?this._data:new r(this._data)}};for(var c=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],h=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<c.length;u++)i.prototype[c[u]]=h;t.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(s,t,e){(function(i){"use strict";var n,r,o=i.MutationObserver||i.WebKitMutationObserver;if(o){var a=0,l=new o(d),c=i.document.createTextNode("");l.observe(c,{characterData:!0}),n=function(){c.data=a=++a%2}}else if(i.setImmediate||i.MessageChannel===void 0)n="document"in i&&"onreadystatechange"in i.document.createElement("script")?function(){var f=i.document.createElement("script");f.onreadystatechange=function(){d(),f.onreadystatechange=null,f.parentNode.removeChild(f),f=null},i.document.documentElement.appendChild(f)}:function(){setTimeout(d,0)};else{var h=new i.MessageChannel;h.port1.onmessage=d,n=function(){h.port2.postMessage(0)}}var u=[];function d(){var f,m;r=!0;for(var _=u.length;_;){for(m=u,u=[],f=-1;++f<_;)m[f]();_=u.length}r=!1}t.exports=function(f){u.push(f)!==1||r||n()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(s,t,e){"use strict";var i=s("immediate");function n(){}var r={},o=["REJECTED"],a=["FULFILLED"],l=["PENDING"];function c(_){if(typeof _!="function")throw new TypeError("resolver must be a function");this.state=l,this.queue=[],this.outcome=void 0,_!==n&&f(this,_)}function h(_,p,g){this.promise=_,typeof p=="function"&&(this.onFulfilled=p,this.callFulfilled=this.otherCallFulfilled),typeof g=="function"&&(this.onRejected=g,this.callRejected=this.otherCallRejected)}function u(_,p,g){i(function(){var y;try{y=p(g)}catch(x){return r.reject(_,x)}y===_?r.reject(_,new TypeError("Cannot resolve promise with itself")):r.resolve(_,y)})}function d(_){var p=_&&_.then;if(_&&(typeof _=="object"||typeof _=="function")&&typeof p=="function")return function(){p.apply(_,arguments)}}function f(_,p){var g=!1;function y(S){g||(g=!0,r.reject(_,S))}function x(S){g||(g=!0,r.resolve(_,S))}var v=m(function(){p(x,y)});v.status==="error"&&y(v.value)}function m(_,p){var g={};try{g.value=_(p),g.status="success"}catch(y){g.status="error",g.value=y}return g}(t.exports=c).prototype.finally=function(_){if(typeof _!="function")return this;var p=this.constructor;return this.then(function(g){return p.resolve(_()).then(function(){return g})},function(g){return p.resolve(_()).then(function(){throw g})})},c.prototype.catch=function(_){return this.then(null,_)},c.prototype.then=function(_,p){if(typeof _!="function"&&this.state===a||typeof p!="function"&&this.state===o)return this;var g=new this.constructor(n);return this.state!==l?u(g,this.state===a?_:p,this.outcome):this.queue.push(new h(g,_,p)),g},h.prototype.callFulfilled=function(_){r.resolve(this.promise,_)},h.prototype.otherCallFulfilled=function(_){u(this.promise,this.onFulfilled,_)},h.prototype.callRejected=function(_){r.reject(this.promise,_)},h.prototype.otherCallRejected=function(_){u(this.promise,this.onRejected,_)},r.resolve=function(_,p){var g=m(d,p);if(g.status==="error")return r.reject(_,g.value);var y=g.value;if(y)f(_,y);else{_.state=a,_.outcome=p;for(var x=-1,v=_.queue.length;++x<v;)_.queue[x].callFulfilled(p)}return _},r.reject=function(_,p){_.state=o,_.outcome=p;for(var g=-1,y=_.queue.length;++g<y;)_.queue[g].callRejected(p);return _},c.resolve=function(_){return _ instanceof this?_:r.resolve(new this(n),_)},c.reject=function(_){var p=new this(n);return r.reject(p,_)},c.all=function(_){var p=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var g=_.length,y=!1;if(!g)return this.resolve([]);for(var x=new Array(g),v=0,S=-1,E=new this(n);++S<g;)R(_[S],S);return E;function R(M,C){p.resolve(M).then(function(T){x[C]=T,++v!==g||y||(y=!0,r.resolve(E,x))},function(T){y||(y=!0,r.reject(E,T))})}},c.race=function(_){var p=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var g=_.length,y=!1;if(!g)return this.resolve([]);for(var x=-1,v=new this(n);++x<g;)S=_[x],p.resolve(S).then(function(E){y||(y=!0,r.resolve(v,E))},function(E){y||(y=!0,r.reject(v,E))});var S;return v}},{immediate:36}],38:[function(s,t,e){"use strict";var i={};(0,s("./lib/utils/common").assign)(i,s("./lib/deflate"),s("./lib/inflate"),s("./lib/zlib/constants")),t.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(s,t,e){"use strict";var i=s("./zlib/deflate"),n=s("./utils/common"),r=s("./utils/strings"),o=s("./zlib/messages"),a=s("./zlib/zstream"),l=Object.prototype.toString,c=0,h=-1,u=0,d=8;function f(_){if(!(this instanceof f))return new f(_);this.options=n.assign({level:h,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},_||{});var p=this.options;p.raw&&0<p.windowBits?p.windowBits=-p.windowBits:p.gzip&&0<p.windowBits&&p.windowBits<16&&(p.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new a,this.strm.avail_out=0;var g=i.deflateInit2(this.strm,p.level,p.method,p.windowBits,p.memLevel,p.strategy);if(g!==c)throw new Error(o[g]);if(p.header&&i.deflateSetHeader(this.strm,p.header),p.dictionary){var y;if(y=typeof p.dictionary=="string"?r.string2buf(p.dictionary):l.call(p.dictionary)==="[object ArrayBuffer]"?new Uint8Array(p.dictionary):p.dictionary,(g=i.deflateSetDictionary(this.strm,y))!==c)throw new Error(o[g]);this._dict_set=!0}}function m(_,p){var g=new f(p);if(g.push(_,!0),g.err)throw g.msg||o[g.err];return g.result}f.prototype.push=function(_,p){var g,y,x=this.strm,v=this.options.chunkSize;if(this.ended)return!1;y=p===~~p?p:p===!0?4:0,typeof _=="string"?x.input=r.string2buf(_):l.call(_)==="[object ArrayBuffer]"?x.input=new Uint8Array(_):x.input=_,x.next_in=0,x.avail_in=x.input.length;do{if(x.avail_out===0&&(x.output=new n.Buf8(v),x.next_out=0,x.avail_out=v),(g=i.deflate(x,y))!==1&&g!==c)return this.onEnd(g),!(this.ended=!0);x.avail_out!==0&&(x.avail_in!==0||y!==4&&y!==2)||(this.options.to==="string"?this.onData(r.buf2binstring(n.shrinkBuf(x.output,x.next_out))):this.onData(n.shrinkBuf(x.output,x.next_out)))}while((0<x.avail_in||x.avail_out===0)&&g!==1);return y===4?(g=i.deflateEnd(this.strm),this.onEnd(g),this.ended=!0,g===c):y!==2||(this.onEnd(c),!(x.avail_out=0))},f.prototype.onData=function(_){this.chunks.push(_)},f.prototype.onEnd=function(_){_===c&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=n.flattenChunks(this.chunks)),this.chunks=[],this.err=_,this.msg=this.strm.msg},e.Deflate=f,e.deflate=m,e.deflateRaw=function(_,p){return(p=p||{}).raw=!0,m(_,p)},e.gzip=function(_,p){return(p=p||{}).gzip=!0,m(_,p)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(s,t,e){"use strict";var i=s("./zlib/inflate"),n=s("./utils/common"),r=s("./utils/strings"),o=s("./zlib/constants"),a=s("./zlib/messages"),l=s("./zlib/zstream"),c=s("./zlib/gzheader"),h=Object.prototype.toString;function u(f){if(!(this instanceof u))return new u(f);this.options=n.assign({chunkSize:16384,windowBits:0,to:""},f||{});var m=this.options;m.raw&&0<=m.windowBits&&m.windowBits<16&&(m.windowBits=-m.windowBits,m.windowBits===0&&(m.windowBits=-15)),!(0<=m.windowBits&&m.windowBits<16)||f&&f.windowBits||(m.windowBits+=32),15<m.windowBits&&m.windowBits<48&&(15&m.windowBits)==0&&(m.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var _=i.inflateInit2(this.strm,m.windowBits);if(_!==o.Z_OK)throw new Error(a[_]);this.header=new c,i.inflateGetHeader(this.strm,this.header)}function d(f,m){var _=new u(m);if(_.push(f,!0),_.err)throw _.msg||a[_.err];return _.result}u.prototype.push=function(f,m){var _,p,g,y,x,v,S=this.strm,E=this.options.chunkSize,R=this.options.dictionary,M=!1;if(this.ended)return!1;p=m===~~m?m:m===!0?o.Z_FINISH:o.Z_NO_FLUSH,typeof f=="string"?S.input=r.binstring2buf(f):h.call(f)==="[object ArrayBuffer]"?S.input=new Uint8Array(f):S.input=f,S.next_in=0,S.avail_in=S.input.length;do{if(S.avail_out===0&&(S.output=new n.Buf8(E),S.next_out=0,S.avail_out=E),(_=i.inflate(S,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&R&&(v=typeof R=="string"?r.string2buf(R):h.call(R)==="[object ArrayBuffer]"?new Uint8Array(R):R,_=i.inflateSetDictionary(this.strm,v)),_===o.Z_BUF_ERROR&&M===!0&&(_=o.Z_OK,M=!1),_!==o.Z_STREAM_END&&_!==o.Z_OK)return this.onEnd(_),!(this.ended=!0);S.next_out&&(S.avail_out!==0&&_!==o.Z_STREAM_END&&(S.avail_in!==0||p!==o.Z_FINISH&&p!==o.Z_SYNC_FLUSH)||(this.options.to==="string"?(g=r.utf8border(S.output,S.next_out),y=S.next_out-g,x=r.buf2string(S.output,g),S.next_out=y,S.avail_out=E-y,y&&n.arraySet(S.output,S.output,g,y,0),this.onData(x)):this.onData(n.shrinkBuf(S.output,S.next_out)))),S.avail_in===0&&S.avail_out===0&&(M=!0)}while((0<S.avail_in||S.avail_out===0)&&_!==o.Z_STREAM_END);return _===o.Z_STREAM_END&&(p=o.Z_FINISH),p===o.Z_FINISH?(_=i.inflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===o.Z_OK):p!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(S.avail_out=0))},u.prototype.onData=function(f){this.chunks.push(f)},u.prototype.onEnd=function(f){f===o.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=n.flattenChunks(this.chunks)),this.chunks=[],this.err=f,this.msg=this.strm.msg},e.Inflate=u,e.inflate=d,e.inflateRaw=function(f,m){return(m=m||{}).raw=!0,d(f,m)},e.ungzip=d},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(s,t,e){"use strict";var i=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(o){for(var a=Array.prototype.slice.call(arguments,1);a.length;){var l=a.shift();if(l){if(typeof l!="object")throw new TypeError(l+"must be non-object");for(var c in l)l.hasOwnProperty(c)&&(o[c]=l[c])}}return o},e.shrinkBuf=function(o,a){return o.length===a?o:o.subarray?o.subarray(0,a):(o.length=a,o)};var n={arraySet:function(o,a,l,c,h){if(a.subarray&&o.subarray)o.set(a.subarray(l,l+c),h);else for(var u=0;u<c;u++)o[h+u]=a[l+u]},flattenChunks:function(o){var a,l,c,h,u,d;for(a=c=0,l=o.length;a<l;a++)c+=o[a].length;for(d=new Uint8Array(c),a=h=0,l=o.length;a<l;a++)u=o[a],d.set(u,h),h+=u.length;return d}},r={arraySet:function(o,a,l,c,h){for(var u=0;u<c;u++)o[h+u]=a[l+u]},flattenChunks:function(o){return[].concat.apply([],o)}};e.setTyped=function(o){o?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,n)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,r))},e.setTyped(i)},{}],42:[function(s,t,e){"use strict";var i=s("./common"),n=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch{n=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{r=!1}for(var o=new i.Buf8(256),a=0;a<256;a++)o[a]=252<=a?6:248<=a?5:240<=a?4:224<=a?3:192<=a?2:1;function l(c,h){if(h<65537&&(c.subarray&&r||!c.subarray&&n))return String.fromCharCode.apply(null,i.shrinkBuf(c,h));for(var u="",d=0;d<h;d++)u+=String.fromCharCode(c[d]);return u}o[254]=o[254]=1,e.string2buf=function(c){var h,u,d,f,m,_=c.length,p=0;for(f=0;f<_;f++)(64512&(u=c.charCodeAt(f)))==55296&&f+1<_&&(64512&(d=c.charCodeAt(f+1)))==56320&&(u=65536+(u-55296<<10)+(d-56320),f++),p+=u<128?1:u<2048?2:u<65536?3:4;for(h=new i.Buf8(p),f=m=0;m<p;f++)(64512&(u=c.charCodeAt(f)))==55296&&f+1<_&&(64512&(d=c.charCodeAt(f+1)))==56320&&(u=65536+(u-55296<<10)+(d-56320),f++),u<128?h[m++]=u:(u<2048?h[m++]=192|u>>>6:(u<65536?h[m++]=224|u>>>12:(h[m++]=240|u>>>18,h[m++]=128|u>>>12&63),h[m++]=128|u>>>6&63),h[m++]=128|63&u);return h},e.buf2binstring=function(c){return l(c,c.length)},e.binstring2buf=function(c){for(var h=new i.Buf8(c.length),u=0,d=h.length;u<d;u++)h[u]=c.charCodeAt(u);return h},e.buf2string=function(c,h){var u,d,f,m,_=h||c.length,p=new Array(2*_);for(u=d=0;u<_;)if((f=c[u++])<128)p[d++]=f;else if(4<(m=o[f]))p[d++]=65533,u+=m-1;else{for(f&=m===2?31:m===3?15:7;1<m&&u<_;)f=f<<6|63&c[u++],m--;1<m?p[d++]=65533:f<65536?p[d++]=f:(f-=65536,p[d++]=55296|f>>10&1023,p[d++]=56320|1023&f)}return l(p,d)},e.utf8border=function(c,h){var u;for((h=h||c.length)>c.length&&(h=c.length),u=h-1;0<=u&&(192&c[u])==128;)u--;return u<0||u===0?h:u+o[c[u]]>h?u:h}},{"./common":41}],43:[function(s,t,e){"use strict";t.exports=function(i,n,r,o){for(var a=65535&i|0,l=i>>>16&65535|0,c=0;r!==0;){for(r-=c=2e3<r?2e3:r;l=l+(a=a+n[o++]|0)|0,--c;);a%=65521,l%=65521}return a|l<<16|0}},{}],44:[function(s,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(s,t,e){"use strict";var i=(function(){for(var n,r=[],o=0;o<256;o++){n=o;for(var a=0;a<8;a++)n=1&n?3988292384^n>>>1:n>>>1;r[o]=n}return r})();t.exports=function(n,r,o,a){var l=i,c=a+o;n^=-1;for(var h=a;h<c;h++)n=n>>>8^l[255&(n^r[h])];return-1^n}},{}],46:[function(s,t,e){"use strict";var i,n=s("../utils/common"),r=s("./trees"),o=s("./adler32"),a=s("./crc32"),l=s("./messages"),c=0,h=4,u=0,d=-2,f=-1,m=4,_=2,p=8,g=9,y=286,x=30,v=19,S=2*y+1,E=15,R=3,M=258,C=M+R+1,T=42,P=113,b=1,B=2,H=3,z=4;function Y(w,ot){return w.msg=l[ot],ot}function V(w){return(w<<1)-(4<w?9:0)}function j(w){for(var ot=w.length;0<=--ot;)w[ot]=0}function O(w){var ot=w.state,Z=ot.pending;Z>w.avail_out&&(Z=w.avail_out),Z!==0&&(n.arraySet(w.output,ot.pending_buf,ot.pending_out,Z,w.next_out),w.next_out+=Z,ot.pending_out+=Z,w.total_out+=Z,w.avail_out-=Z,ot.pending-=Z,ot.pending===0&&(ot.pending_out=0))}function k(w,ot){r._tr_flush_block(w,0<=w.block_start?w.block_start:-1,w.strstart-w.block_start,ot),w.block_start=w.strstart,O(w.strm)}function it(w,ot){w.pending_buf[w.pending++]=ot}function q(w,ot){w.pending_buf[w.pending++]=ot>>>8&255,w.pending_buf[w.pending++]=255&ot}function nt(w,ot){var Z,U,N=w.max_chain_length,G=w.strstart,ct=w.prev_length,ft=w.nice_match,K=w.strstart>w.w_size-C?w.strstart-(w.w_size-C):0,pt=w.window,vt=w.w_mask,F=w.prev,Lt=w.strstart+M,Xt=pt[G+ct-1],L=pt[G+ct];w.prev_length>=w.good_match&&(N>>=2),ft>w.lookahead&&(ft=w.lookahead);do if(pt[(Z=ot)+ct]===L&&pt[Z+ct-1]===Xt&&pt[Z]===pt[G]&&pt[++Z]===pt[G+1]){G+=2,Z++;do;while(pt[++G]===pt[++Z]&&pt[++G]===pt[++Z]&&pt[++G]===pt[++Z]&&pt[++G]===pt[++Z]&&pt[++G]===pt[++Z]&&pt[++G]===pt[++Z]&&pt[++G]===pt[++Z]&&pt[++G]===pt[++Z]&&G<Lt);if(U=M-(Lt-G),G=Lt-M,ct<U){if(w.match_start=ot,ft<=(ct=U))break;Xt=pt[G+ct-1],L=pt[G+ct]}}while((ot=F[ot&vt])>K&&--N!=0);return ct<=w.lookahead?ct:w.lookahead}function Ht(w){var ot,Z,U,N,G,ct,ft,K,pt,vt,F=w.w_size;do{if(N=w.window_size-w.lookahead-w.strstart,w.strstart>=F+(F-C)){for(n.arraySet(w.window,w.window,F,F,0),w.match_start-=F,w.strstart-=F,w.block_start-=F,ot=Z=w.hash_size;U=w.head[--ot],w.head[ot]=F<=U?U-F:0,--Z;);for(ot=Z=F;U=w.prev[--ot],w.prev[ot]=F<=U?U-F:0,--Z;);N+=F}if(w.strm.avail_in===0)break;if(ct=w.strm,ft=w.window,K=w.strstart+w.lookahead,pt=N,vt=void 0,vt=ct.avail_in,pt<vt&&(vt=pt),Z=vt===0?0:(ct.avail_in-=vt,n.arraySet(ft,ct.input,ct.next_in,vt,K),ct.state.wrap===1?ct.adler=o(ct.adler,ft,vt,K):ct.state.wrap===2&&(ct.adler=a(ct.adler,ft,vt,K)),ct.next_in+=vt,ct.total_in+=vt,vt),w.lookahead+=Z,w.lookahead+w.insert>=R)for(G=w.strstart-w.insert,w.ins_h=w.window[G],w.ins_h=(w.ins_h<<w.hash_shift^w.window[G+1])&w.hash_mask;w.insert&&(w.ins_h=(w.ins_h<<w.hash_shift^w.window[G+R-1])&w.hash_mask,w.prev[G&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=G,G++,w.insert--,!(w.lookahead+w.insert<R)););}while(w.lookahead<C&&w.strm.avail_in!==0)}function Yt(w,ot){for(var Z,U;;){if(w.lookahead<C){if(Ht(w),w.lookahead<C&&ot===c)return b;if(w.lookahead===0)break}if(Z=0,w.lookahead>=R&&(w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+R-1])&w.hash_mask,Z=w.prev[w.strstart&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=w.strstart),Z!==0&&w.strstart-Z<=w.w_size-C&&(w.match_length=nt(w,Z)),w.match_length>=R)if(U=r._tr_tally(w,w.strstart-w.match_start,w.match_length-R),w.lookahead-=w.match_length,w.match_length<=w.max_lazy_match&&w.lookahead>=R){for(w.match_length--;w.strstart++,w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+R-1])&w.hash_mask,Z=w.prev[w.strstart&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=w.strstart,--w.match_length!=0;);w.strstart++}else w.strstart+=w.match_length,w.match_length=0,w.ins_h=w.window[w.strstart],w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+1])&w.hash_mask;else U=r._tr_tally(w,0,w.window[w.strstart]),w.lookahead--,w.strstart++;if(U&&(k(w,!1),w.strm.avail_out===0))return b}return w.insert=w.strstart<R-1?w.strstart:R-1,ot===h?(k(w,!0),w.strm.avail_out===0?H:z):w.last_lit&&(k(w,!1),w.strm.avail_out===0)?b:B}function Nt(w,ot){for(var Z,U,N;;){if(w.lookahead<C){if(Ht(w),w.lookahead<C&&ot===c)return b;if(w.lookahead===0)break}if(Z=0,w.lookahead>=R&&(w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+R-1])&w.hash_mask,Z=w.prev[w.strstart&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=w.strstart),w.prev_length=w.match_length,w.prev_match=w.match_start,w.match_length=R-1,Z!==0&&w.prev_length<w.max_lazy_match&&w.strstart-Z<=w.w_size-C&&(w.match_length=nt(w,Z),w.match_length<=5&&(w.strategy===1||w.match_length===R&&4096<w.strstart-w.match_start)&&(w.match_length=R-1)),w.prev_length>=R&&w.match_length<=w.prev_length){for(N=w.strstart+w.lookahead-R,U=r._tr_tally(w,w.strstart-1-w.prev_match,w.prev_length-R),w.lookahead-=w.prev_length-1,w.prev_length-=2;++w.strstart<=N&&(w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+R-1])&w.hash_mask,Z=w.prev[w.strstart&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=w.strstart),--w.prev_length!=0;);if(w.match_available=0,w.match_length=R-1,w.strstart++,U&&(k(w,!1),w.strm.avail_out===0))return b}else if(w.match_available){if((U=r._tr_tally(w,0,w.window[w.strstart-1]))&&k(w,!1),w.strstart++,w.lookahead--,w.strm.avail_out===0)return b}else w.match_available=1,w.strstart++,w.lookahead--}return w.match_available&&(U=r._tr_tally(w,0,w.window[w.strstart-1]),w.match_available=0),w.insert=w.strstart<R-1?w.strstart:R-1,ot===h?(k(w,!0),w.strm.avail_out===0?H:z):w.last_lit&&(k(w,!1),w.strm.avail_out===0)?b:B}function et(w,ot,Z,U,N){this.good_length=w,this.max_lazy=ot,this.nice_length=Z,this.max_chain=U,this.func=N}function at(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=p,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new n.Buf16(2*S),this.dyn_dtree=new n.Buf16(2*(2*x+1)),this.bl_tree=new n.Buf16(2*(2*v+1)),j(this.dyn_ltree),j(this.dyn_dtree),j(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new n.Buf16(E+1),this.heap=new n.Buf16(2*y+1),j(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new n.Buf16(2*y+1),j(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function yt(w){var ot;return w&&w.state?(w.total_in=w.total_out=0,w.data_type=_,(ot=w.state).pending=0,ot.pending_out=0,ot.wrap<0&&(ot.wrap=-ot.wrap),ot.status=ot.wrap?T:P,w.adler=ot.wrap===2?0:1,ot.last_flush=c,r._tr_init(ot),u):Y(w,d)}function $t(w){var ot=yt(w);return ot===u&&(function(Z){Z.window_size=2*Z.w_size,j(Z.head),Z.max_lazy_match=i[Z.level].max_lazy,Z.good_match=i[Z.level].good_length,Z.nice_match=i[Z.level].nice_length,Z.max_chain_length=i[Z.level].max_chain,Z.strstart=0,Z.block_start=0,Z.lookahead=0,Z.insert=0,Z.match_length=Z.prev_length=R-1,Z.match_available=0,Z.ins_h=0})(w.state),ot}function wt(w,ot,Z,U,N,G){if(!w)return d;var ct=1;if(ot===f&&(ot=6),U<0?(ct=0,U=-U):15<U&&(ct=2,U-=16),N<1||g<N||Z!==p||U<8||15<U||ot<0||9<ot||G<0||m<G)return Y(w,d);U===8&&(U=9);var ft=new at;return(w.state=ft).strm=w,ft.wrap=ct,ft.gzhead=null,ft.w_bits=U,ft.w_size=1<<ft.w_bits,ft.w_mask=ft.w_size-1,ft.hash_bits=N+7,ft.hash_size=1<<ft.hash_bits,ft.hash_mask=ft.hash_size-1,ft.hash_shift=~~((ft.hash_bits+R-1)/R),ft.window=new n.Buf8(2*ft.w_size),ft.head=new n.Buf16(ft.hash_size),ft.prev=new n.Buf16(ft.w_size),ft.lit_bufsize=1<<N+6,ft.pending_buf_size=4*ft.lit_bufsize,ft.pending_buf=new n.Buf8(ft.pending_buf_size),ft.d_buf=1*ft.lit_bufsize,ft.l_buf=3*ft.lit_bufsize,ft.level=ot,ft.strategy=G,ft.method=Z,$t(w)}i=[new et(0,0,0,0,function(w,ot){var Z=65535;for(Z>w.pending_buf_size-5&&(Z=w.pending_buf_size-5);;){if(w.lookahead<=1){if(Ht(w),w.lookahead===0&&ot===c)return b;if(w.lookahead===0)break}w.strstart+=w.lookahead,w.lookahead=0;var U=w.block_start+Z;if((w.strstart===0||w.strstart>=U)&&(w.lookahead=w.strstart-U,w.strstart=U,k(w,!1),w.strm.avail_out===0)||w.strstart-w.block_start>=w.w_size-C&&(k(w,!1),w.strm.avail_out===0))return b}return w.insert=0,ot===h?(k(w,!0),w.strm.avail_out===0?H:z):(w.strstart>w.block_start&&(k(w,!1),w.strm.avail_out),b)}),new et(4,4,8,4,Yt),new et(4,5,16,8,Yt),new et(4,6,32,32,Yt),new et(4,4,16,16,Nt),new et(8,16,32,32,Nt),new et(8,16,128,128,Nt),new et(8,32,128,256,Nt),new et(32,128,258,1024,Nt),new et(32,258,258,4096,Nt)],e.deflateInit=function(w,ot){return wt(w,ot,p,15,8,0)},e.deflateInit2=wt,e.deflateReset=$t,e.deflateResetKeep=yt,e.deflateSetHeader=function(w,ot){return w&&w.state?w.state.wrap!==2?d:(w.state.gzhead=ot,u):d},e.deflate=function(w,ot){var Z,U,N,G;if(!w||!w.state||5<ot||ot<0)return w?Y(w,d):d;if(U=w.state,!w.output||!w.input&&w.avail_in!==0||U.status===666&&ot!==h)return Y(w,w.avail_out===0?-5:d);if(U.strm=w,Z=U.last_flush,U.last_flush=ot,U.status===T)if(U.wrap===2)w.adler=0,it(U,31),it(U,139),it(U,8),U.gzhead?(it(U,(U.gzhead.text?1:0)+(U.gzhead.hcrc?2:0)+(U.gzhead.extra?4:0)+(U.gzhead.name?8:0)+(U.gzhead.comment?16:0)),it(U,255&U.gzhead.time),it(U,U.gzhead.time>>8&255),it(U,U.gzhead.time>>16&255),it(U,U.gzhead.time>>24&255),it(U,U.level===9?2:2<=U.strategy||U.level<2?4:0),it(U,255&U.gzhead.os),U.gzhead.extra&&U.gzhead.extra.length&&(it(U,255&U.gzhead.extra.length),it(U,U.gzhead.extra.length>>8&255)),U.gzhead.hcrc&&(w.adler=a(w.adler,U.pending_buf,U.pending,0)),U.gzindex=0,U.status=69):(it(U,0),it(U,0),it(U,0),it(U,0),it(U,0),it(U,U.level===9?2:2<=U.strategy||U.level<2?4:0),it(U,3),U.status=P);else{var ct=p+(U.w_bits-8<<4)<<8;ct|=(2<=U.strategy||U.level<2?0:U.level<6?1:U.level===6?2:3)<<6,U.strstart!==0&&(ct|=32),ct+=31-ct%31,U.status=P,q(U,ct),U.strstart!==0&&(q(U,w.adler>>>16),q(U,65535&w.adler)),w.adler=1}if(U.status===69)if(U.gzhead.extra){for(N=U.pending;U.gzindex<(65535&U.gzhead.extra.length)&&(U.pending!==U.pending_buf_size||(U.gzhead.hcrc&&U.pending>N&&(w.adler=a(w.adler,U.pending_buf,U.pending-N,N)),O(w),N=U.pending,U.pending!==U.pending_buf_size));)it(U,255&U.gzhead.extra[U.gzindex]),U.gzindex++;U.gzhead.hcrc&&U.pending>N&&(w.adler=a(w.adler,U.pending_buf,U.pending-N,N)),U.gzindex===U.gzhead.extra.length&&(U.gzindex=0,U.status=73)}else U.status=73;if(U.status===73)if(U.gzhead.name){N=U.pending;do{if(U.pending===U.pending_buf_size&&(U.gzhead.hcrc&&U.pending>N&&(w.adler=a(w.adler,U.pending_buf,U.pending-N,N)),O(w),N=U.pending,U.pending===U.pending_buf_size)){G=1;break}G=U.gzindex<U.gzhead.name.length?255&U.gzhead.name.charCodeAt(U.gzindex++):0,it(U,G)}while(G!==0);U.gzhead.hcrc&&U.pending>N&&(w.adler=a(w.adler,U.pending_buf,U.pending-N,N)),G===0&&(U.gzindex=0,U.status=91)}else U.status=91;if(U.status===91)if(U.gzhead.comment){N=U.pending;do{if(U.pending===U.pending_buf_size&&(U.gzhead.hcrc&&U.pending>N&&(w.adler=a(w.adler,U.pending_buf,U.pending-N,N)),O(w),N=U.pending,U.pending===U.pending_buf_size)){G=1;break}G=U.gzindex<U.gzhead.comment.length?255&U.gzhead.comment.charCodeAt(U.gzindex++):0,it(U,G)}while(G!==0);U.gzhead.hcrc&&U.pending>N&&(w.adler=a(w.adler,U.pending_buf,U.pending-N,N)),G===0&&(U.status=103)}else U.status=103;if(U.status===103&&(U.gzhead.hcrc?(U.pending+2>U.pending_buf_size&&O(w),U.pending+2<=U.pending_buf_size&&(it(U,255&w.adler),it(U,w.adler>>8&255),w.adler=0,U.status=P)):U.status=P),U.pending!==0){if(O(w),w.avail_out===0)return U.last_flush=-1,u}else if(w.avail_in===0&&V(ot)<=V(Z)&&ot!==h)return Y(w,-5);if(U.status===666&&w.avail_in!==0)return Y(w,-5);if(w.avail_in!==0||U.lookahead!==0||ot!==c&&U.status!==666){var ft=U.strategy===2?(function(K,pt){for(var vt;;){if(K.lookahead===0&&(Ht(K),K.lookahead===0)){if(pt===c)return b;break}if(K.match_length=0,vt=r._tr_tally(K,0,K.window[K.strstart]),K.lookahead--,K.strstart++,vt&&(k(K,!1),K.strm.avail_out===0))return b}return K.insert=0,pt===h?(k(K,!0),K.strm.avail_out===0?H:z):K.last_lit&&(k(K,!1),K.strm.avail_out===0)?b:B})(U,ot):U.strategy===3?(function(K,pt){for(var vt,F,Lt,Xt,L=K.window;;){if(K.lookahead<=M){if(Ht(K),K.lookahead<=M&&pt===c)return b;if(K.lookahead===0)break}if(K.match_length=0,K.lookahead>=R&&0<K.strstart&&(F=L[Lt=K.strstart-1])===L[++Lt]&&F===L[++Lt]&&F===L[++Lt]){Xt=K.strstart+M;do;while(F===L[++Lt]&&F===L[++Lt]&&F===L[++Lt]&&F===L[++Lt]&&F===L[++Lt]&&F===L[++Lt]&&F===L[++Lt]&&F===L[++Lt]&&Lt<Xt);K.match_length=M-(Xt-Lt),K.match_length>K.lookahead&&(K.match_length=K.lookahead)}if(K.match_length>=R?(vt=r._tr_tally(K,1,K.match_length-R),K.lookahead-=K.match_length,K.strstart+=K.match_length,K.match_length=0):(vt=r._tr_tally(K,0,K.window[K.strstart]),K.lookahead--,K.strstart++),vt&&(k(K,!1),K.strm.avail_out===0))return b}return K.insert=0,pt===h?(k(K,!0),K.strm.avail_out===0?H:z):K.last_lit&&(k(K,!1),K.strm.avail_out===0)?b:B})(U,ot):i[U.level].func(U,ot);if(ft!==H&&ft!==z||(U.status=666),ft===b||ft===H)return w.avail_out===0&&(U.last_flush=-1),u;if(ft===B&&(ot===1?r._tr_align(U):ot!==5&&(r._tr_stored_block(U,0,0,!1),ot===3&&(j(U.head),U.lookahead===0&&(U.strstart=0,U.block_start=0,U.insert=0))),O(w),w.avail_out===0))return U.last_flush=-1,u}return ot!==h?u:U.wrap<=0?1:(U.wrap===2?(it(U,255&w.adler),it(U,w.adler>>8&255),it(U,w.adler>>16&255),it(U,w.adler>>24&255),it(U,255&w.total_in),it(U,w.total_in>>8&255),it(U,w.total_in>>16&255),it(U,w.total_in>>24&255)):(q(U,w.adler>>>16),q(U,65535&w.adler)),O(w),0<U.wrap&&(U.wrap=-U.wrap),U.pending!==0?u:1)},e.deflateEnd=function(w){var ot;return w&&w.state?(ot=w.state.status)!==T&&ot!==69&&ot!==73&&ot!==91&&ot!==103&&ot!==P&&ot!==666?Y(w,d):(w.state=null,ot===P?Y(w,-3):u):d},e.deflateSetDictionary=function(w,ot){var Z,U,N,G,ct,ft,K,pt,vt=ot.length;if(!w||!w.state||(G=(Z=w.state).wrap)===2||G===1&&Z.status!==T||Z.lookahead)return d;for(G===1&&(w.adler=o(w.adler,ot,vt,0)),Z.wrap=0,vt>=Z.w_size&&(G===0&&(j(Z.head),Z.strstart=0,Z.block_start=0,Z.insert=0),pt=new n.Buf8(Z.w_size),n.arraySet(pt,ot,vt-Z.w_size,Z.w_size,0),ot=pt,vt=Z.w_size),ct=w.avail_in,ft=w.next_in,K=w.input,w.avail_in=vt,w.next_in=0,w.input=ot,Ht(Z);Z.lookahead>=R;){for(U=Z.strstart,N=Z.lookahead-(R-1);Z.ins_h=(Z.ins_h<<Z.hash_shift^Z.window[U+R-1])&Z.hash_mask,Z.prev[U&Z.w_mask]=Z.head[Z.ins_h],Z.head[Z.ins_h]=U,U++,--N;);Z.strstart=U,Z.lookahead=R-1,Ht(Z)}return Z.strstart+=Z.lookahead,Z.block_start=Z.strstart,Z.insert=Z.lookahead,Z.lookahead=0,Z.match_length=Z.prev_length=R-1,Z.match_available=0,w.next_in=ft,w.input=K,w.avail_in=ct,Z.wrap=G,u},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(s,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(s,t,e){"use strict";t.exports=function(i,n){var r,o,a,l,c,h,u,d,f,m,_,p,g,y,x,v,S,E,R,M,C,T,P,b,B;r=i.state,o=i.next_in,b=i.input,a=o+(i.avail_in-5),l=i.next_out,B=i.output,c=l-(n-i.avail_out),h=l+(i.avail_out-257),u=r.dmax,d=r.wsize,f=r.whave,m=r.wnext,_=r.window,p=r.hold,g=r.bits,y=r.lencode,x=r.distcode,v=(1<<r.lenbits)-1,S=(1<<r.distbits)-1;t:do{g<15&&(p+=b[o++]<<g,g+=8,p+=b[o++]<<g,g+=8),E=y[p&v];e:for(;;){if(p>>>=R=E>>>24,g-=R,(R=E>>>16&255)===0)B[l++]=65535&E;else{if(!(16&R)){if((64&R)==0){E=y[(65535&E)+(p&(1<<R)-1)];continue e}if(32&R){r.mode=12;break t}i.msg="invalid literal/length code",r.mode=30;break t}M=65535&E,(R&=15)&&(g<R&&(p+=b[o++]<<g,g+=8),M+=p&(1<<R)-1,p>>>=R,g-=R),g<15&&(p+=b[o++]<<g,g+=8,p+=b[o++]<<g,g+=8),E=x[p&S];i:for(;;){if(p>>>=R=E>>>24,g-=R,!(16&(R=E>>>16&255))){if((64&R)==0){E=x[(65535&E)+(p&(1<<R)-1)];continue i}i.msg="invalid distance code",r.mode=30;break t}if(C=65535&E,g<(R&=15)&&(p+=b[o++]<<g,(g+=8)<R&&(p+=b[o++]<<g,g+=8)),u<(C+=p&(1<<R)-1)){i.msg="invalid distance too far back",r.mode=30;break t}if(p>>>=R,g-=R,(R=l-c)<C){if(f<(R=C-R)&&r.sane){i.msg="invalid distance too far back",r.mode=30;break t}if(P=_,(T=0)===m){if(T+=d-R,R<M){for(M-=R;B[l++]=_[T++],--R;);T=l-C,P=B}}else if(m<R){if(T+=d+m-R,(R-=m)<M){for(M-=R;B[l++]=_[T++],--R;);if(T=0,m<M){for(M-=R=m;B[l++]=_[T++],--R;);T=l-C,P=B}}}else if(T+=m-R,R<M){for(M-=R;B[l++]=_[T++],--R;);T=l-C,P=B}for(;2<M;)B[l++]=P[T++],B[l++]=P[T++],B[l++]=P[T++],M-=3;M&&(B[l++]=P[T++],1<M&&(B[l++]=P[T++]))}else{for(T=l-C;B[l++]=B[T++],B[l++]=B[T++],B[l++]=B[T++],2<(M-=3););M&&(B[l++]=B[T++],1<M&&(B[l++]=B[T++]))}break}}break}}while(o<a&&l<h);o-=M=g>>3,p&=(1<<(g-=M<<3))-1,i.next_in=o,i.next_out=l,i.avail_in=o<a?a-o+5:5-(o-a),i.avail_out=l<h?h-l+257:257-(l-h),r.hold=p,r.bits=g}},{}],49:[function(s,t,e){"use strict";var i=s("../utils/common"),n=s("./adler32"),r=s("./crc32"),o=s("./inffast"),a=s("./inftrees"),l=1,c=2,h=0,u=-2,d=1,f=852,m=592;function _(T){return(T>>>24&255)+(T>>>8&65280)+((65280&T)<<8)+((255&T)<<24)}function p(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new i.Buf16(320),this.work=new i.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function g(T){var P;return T&&T.state?(P=T.state,T.total_in=T.total_out=P.total=0,T.msg="",P.wrap&&(T.adler=1&P.wrap),P.mode=d,P.last=0,P.havedict=0,P.dmax=32768,P.head=null,P.hold=0,P.bits=0,P.lencode=P.lendyn=new i.Buf32(f),P.distcode=P.distdyn=new i.Buf32(m),P.sane=1,P.back=-1,h):u}function y(T){var P;return T&&T.state?((P=T.state).wsize=0,P.whave=0,P.wnext=0,g(T)):u}function x(T,P){var b,B;return T&&T.state?(B=T.state,P<0?(b=0,P=-P):(b=1+(P>>4),P<48&&(P&=15)),P&&(P<8||15<P)?u:(B.window!==null&&B.wbits!==P&&(B.window=null),B.wrap=b,B.wbits=P,y(T))):u}function v(T,P){var b,B;return T?(B=new p,(T.state=B).window=null,(b=x(T,P))!==h&&(T.state=null),b):u}var S,E,R=!0;function M(T){if(R){var P;for(S=new i.Buf32(512),E=new i.Buf32(32),P=0;P<144;)T.lens[P++]=8;for(;P<256;)T.lens[P++]=9;for(;P<280;)T.lens[P++]=7;for(;P<288;)T.lens[P++]=8;for(a(l,T.lens,0,288,S,0,T.work,{bits:9}),P=0;P<32;)T.lens[P++]=5;a(c,T.lens,0,32,E,0,T.work,{bits:5}),R=!1}T.lencode=S,T.lenbits=9,T.distcode=E,T.distbits=5}function C(T,P,b,B){var H,z=T.state;return z.window===null&&(z.wsize=1<<z.wbits,z.wnext=0,z.whave=0,z.window=new i.Buf8(z.wsize)),B>=z.wsize?(i.arraySet(z.window,P,b-z.wsize,z.wsize,0),z.wnext=0,z.whave=z.wsize):(B<(H=z.wsize-z.wnext)&&(H=B),i.arraySet(z.window,P,b-B,H,z.wnext),(B-=H)?(i.arraySet(z.window,P,b-B,B,0),z.wnext=B,z.whave=z.wsize):(z.wnext+=H,z.wnext===z.wsize&&(z.wnext=0),z.whave<z.wsize&&(z.whave+=H))),0}e.inflateReset=y,e.inflateReset2=x,e.inflateResetKeep=g,e.inflateInit=function(T){return v(T,15)},e.inflateInit2=v,e.inflate=function(T,P){var b,B,H,z,Y,V,j,O,k,it,q,nt,Ht,Yt,Nt,et,at,yt,$t,wt,w,ot,Z,U,N=0,G=new i.Buf8(4),ct=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!T||!T.state||!T.output||!T.input&&T.avail_in!==0)return u;(b=T.state).mode===12&&(b.mode=13),Y=T.next_out,H=T.output,j=T.avail_out,z=T.next_in,B=T.input,V=T.avail_in,O=b.hold,k=b.bits,it=V,q=j,ot=h;t:for(;;)switch(b.mode){case d:if(b.wrap===0){b.mode=13;break}for(;k<16;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if(2&b.wrap&&O===35615){G[b.check=0]=255&O,G[1]=O>>>8&255,b.check=r(b.check,G,2,0),k=O=0,b.mode=2;break}if(b.flags=0,b.head&&(b.head.done=!1),!(1&b.wrap)||(((255&O)<<8)+(O>>8))%31){T.msg="incorrect header check",b.mode=30;break}if((15&O)!=8){T.msg="unknown compression method",b.mode=30;break}if(k-=4,w=8+(15&(O>>>=4)),b.wbits===0)b.wbits=w;else if(w>b.wbits){T.msg="invalid window size",b.mode=30;break}b.dmax=1<<w,T.adler=b.check=1,b.mode=512&O?10:12,k=O=0;break;case 2:for(;k<16;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if(b.flags=O,(255&b.flags)!=8){T.msg="unknown compression method",b.mode=30;break}if(57344&b.flags){T.msg="unknown header flags set",b.mode=30;break}b.head&&(b.head.text=O>>8&1),512&b.flags&&(G[0]=255&O,G[1]=O>>>8&255,b.check=r(b.check,G,2,0)),k=O=0,b.mode=3;case 3:for(;k<32;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}b.head&&(b.head.time=O),512&b.flags&&(G[0]=255&O,G[1]=O>>>8&255,G[2]=O>>>16&255,G[3]=O>>>24&255,b.check=r(b.check,G,4,0)),k=O=0,b.mode=4;case 4:for(;k<16;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}b.head&&(b.head.xflags=255&O,b.head.os=O>>8),512&b.flags&&(G[0]=255&O,G[1]=O>>>8&255,b.check=r(b.check,G,2,0)),k=O=0,b.mode=5;case 5:if(1024&b.flags){for(;k<16;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}b.length=O,b.head&&(b.head.extra_len=O),512&b.flags&&(G[0]=255&O,G[1]=O>>>8&255,b.check=r(b.check,G,2,0)),k=O=0}else b.head&&(b.head.extra=null);b.mode=6;case 6:if(1024&b.flags&&(V<(nt=b.length)&&(nt=V),nt&&(b.head&&(w=b.head.extra_len-b.length,b.head.extra||(b.head.extra=new Array(b.head.extra_len)),i.arraySet(b.head.extra,B,z,nt,w)),512&b.flags&&(b.check=r(b.check,B,nt,z)),V-=nt,z+=nt,b.length-=nt),b.length))break t;b.length=0,b.mode=7;case 7:if(2048&b.flags){if(V===0)break t;for(nt=0;w=B[z+nt++],b.head&&w&&b.length<65536&&(b.head.name+=String.fromCharCode(w)),w&&nt<V;);if(512&b.flags&&(b.check=r(b.check,B,nt,z)),V-=nt,z+=nt,w)break t}else b.head&&(b.head.name=null);b.length=0,b.mode=8;case 8:if(4096&b.flags){if(V===0)break t;for(nt=0;w=B[z+nt++],b.head&&w&&b.length<65536&&(b.head.comment+=String.fromCharCode(w)),w&&nt<V;);if(512&b.flags&&(b.check=r(b.check,B,nt,z)),V-=nt,z+=nt,w)break t}else b.head&&(b.head.comment=null);b.mode=9;case 9:if(512&b.flags){for(;k<16;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if(O!==(65535&b.check)){T.msg="header crc mismatch",b.mode=30;break}k=O=0}b.head&&(b.head.hcrc=b.flags>>9&1,b.head.done=!0),T.adler=b.check=0,b.mode=12;break;case 10:for(;k<32;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}T.adler=b.check=_(O),k=O=0,b.mode=11;case 11:if(b.havedict===0)return T.next_out=Y,T.avail_out=j,T.next_in=z,T.avail_in=V,b.hold=O,b.bits=k,2;T.adler=b.check=1,b.mode=12;case 12:if(P===5||P===6)break t;case 13:if(b.last){O>>>=7&k,k-=7&k,b.mode=27;break}for(;k<3;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}switch(b.last=1&O,k-=1,3&(O>>>=1)){case 0:b.mode=14;break;case 1:if(M(b),b.mode=20,P!==6)break;O>>>=2,k-=2;break t;case 2:b.mode=17;break;case 3:T.msg="invalid block type",b.mode=30}O>>>=2,k-=2;break;case 14:for(O>>>=7&k,k-=7&k;k<32;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if((65535&O)!=(O>>>16^65535)){T.msg="invalid stored block lengths",b.mode=30;break}if(b.length=65535&O,k=O=0,b.mode=15,P===6)break t;case 15:b.mode=16;case 16:if(nt=b.length){if(V<nt&&(nt=V),j<nt&&(nt=j),nt===0)break t;i.arraySet(H,B,z,nt,Y),V-=nt,z+=nt,j-=nt,Y+=nt,b.length-=nt;break}b.mode=12;break;case 17:for(;k<14;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if(b.nlen=257+(31&O),O>>>=5,k-=5,b.ndist=1+(31&O),O>>>=5,k-=5,b.ncode=4+(15&O),O>>>=4,k-=4,286<b.nlen||30<b.ndist){T.msg="too many length or distance symbols",b.mode=30;break}b.have=0,b.mode=18;case 18:for(;b.have<b.ncode;){for(;k<3;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}b.lens[ct[b.have++]]=7&O,O>>>=3,k-=3}for(;b.have<19;)b.lens[ct[b.have++]]=0;if(b.lencode=b.lendyn,b.lenbits=7,Z={bits:b.lenbits},ot=a(0,b.lens,0,19,b.lencode,0,b.work,Z),b.lenbits=Z.bits,ot){T.msg="invalid code lengths set",b.mode=30;break}b.have=0,b.mode=19;case 19:for(;b.have<b.nlen+b.ndist;){for(;et=(N=b.lencode[O&(1<<b.lenbits)-1])>>>16&255,at=65535&N,!((Nt=N>>>24)<=k);){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if(at<16)O>>>=Nt,k-=Nt,b.lens[b.have++]=at;else{if(at===16){for(U=Nt+2;k<U;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if(O>>>=Nt,k-=Nt,b.have===0){T.msg="invalid bit length repeat",b.mode=30;break}w=b.lens[b.have-1],nt=3+(3&O),O>>>=2,k-=2}else if(at===17){for(U=Nt+3;k<U;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}k-=Nt,w=0,nt=3+(7&(O>>>=Nt)),O>>>=3,k-=3}else{for(U=Nt+7;k<U;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}k-=Nt,w=0,nt=11+(127&(O>>>=Nt)),O>>>=7,k-=7}if(b.have+nt>b.nlen+b.ndist){T.msg="invalid bit length repeat",b.mode=30;break}for(;nt--;)b.lens[b.have++]=w}}if(b.mode===30)break;if(b.lens[256]===0){T.msg="invalid code -- missing end-of-block",b.mode=30;break}if(b.lenbits=9,Z={bits:b.lenbits},ot=a(l,b.lens,0,b.nlen,b.lencode,0,b.work,Z),b.lenbits=Z.bits,ot){T.msg="invalid literal/lengths set",b.mode=30;break}if(b.distbits=6,b.distcode=b.distdyn,Z={bits:b.distbits},ot=a(c,b.lens,b.nlen,b.ndist,b.distcode,0,b.work,Z),b.distbits=Z.bits,ot){T.msg="invalid distances set",b.mode=30;break}if(b.mode=20,P===6)break t;case 20:b.mode=21;case 21:if(6<=V&&258<=j){T.next_out=Y,T.avail_out=j,T.next_in=z,T.avail_in=V,b.hold=O,b.bits=k,o(T,q),Y=T.next_out,H=T.output,j=T.avail_out,z=T.next_in,B=T.input,V=T.avail_in,O=b.hold,k=b.bits,b.mode===12&&(b.back=-1);break}for(b.back=0;et=(N=b.lencode[O&(1<<b.lenbits)-1])>>>16&255,at=65535&N,!((Nt=N>>>24)<=k);){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if(et&&(240&et)==0){for(yt=Nt,$t=et,wt=at;et=(N=b.lencode[wt+((O&(1<<yt+$t)-1)>>yt)])>>>16&255,at=65535&N,!(yt+(Nt=N>>>24)<=k);){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}O>>>=yt,k-=yt,b.back+=yt}if(O>>>=Nt,k-=Nt,b.back+=Nt,b.length=at,et===0){b.mode=26;break}if(32&et){b.back=-1,b.mode=12;break}if(64&et){T.msg="invalid literal/length code",b.mode=30;break}b.extra=15&et,b.mode=22;case 22:if(b.extra){for(U=b.extra;k<U;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}b.length+=O&(1<<b.extra)-1,O>>>=b.extra,k-=b.extra,b.back+=b.extra}b.was=b.length,b.mode=23;case 23:for(;et=(N=b.distcode[O&(1<<b.distbits)-1])>>>16&255,at=65535&N,!((Nt=N>>>24)<=k);){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if((240&et)==0){for(yt=Nt,$t=et,wt=at;et=(N=b.distcode[wt+((O&(1<<yt+$t)-1)>>yt)])>>>16&255,at=65535&N,!(yt+(Nt=N>>>24)<=k);){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}O>>>=yt,k-=yt,b.back+=yt}if(O>>>=Nt,k-=Nt,b.back+=Nt,64&et){T.msg="invalid distance code",b.mode=30;break}b.offset=at,b.extra=15&et,b.mode=24;case 24:if(b.extra){for(U=b.extra;k<U;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}b.offset+=O&(1<<b.extra)-1,O>>>=b.extra,k-=b.extra,b.back+=b.extra}if(b.offset>b.dmax){T.msg="invalid distance too far back",b.mode=30;break}b.mode=25;case 25:if(j===0)break t;if(nt=q-j,b.offset>nt){if((nt=b.offset-nt)>b.whave&&b.sane){T.msg="invalid distance too far back",b.mode=30;break}Ht=nt>b.wnext?(nt-=b.wnext,b.wsize-nt):b.wnext-nt,nt>b.length&&(nt=b.length),Yt=b.window}else Yt=H,Ht=Y-b.offset,nt=b.length;for(j<nt&&(nt=j),j-=nt,b.length-=nt;H[Y++]=Yt[Ht++],--nt;);b.length===0&&(b.mode=21);break;case 26:if(j===0)break t;H[Y++]=b.length,j--,b.mode=21;break;case 27:if(b.wrap){for(;k<32;){if(V===0)break t;V--,O|=B[z++]<<k,k+=8}if(q-=j,T.total_out+=q,b.total+=q,q&&(T.adler=b.check=b.flags?r(b.check,H,q,Y-q):n(b.check,H,q,Y-q)),q=j,(b.flags?O:_(O))!==b.check){T.msg="incorrect data check",b.mode=30;break}k=O=0}b.mode=28;case 28:if(b.wrap&&b.flags){for(;k<32;){if(V===0)break t;V--,O+=B[z++]<<k,k+=8}if(O!==(4294967295&b.total)){T.msg="incorrect length check",b.mode=30;break}k=O=0}b.mode=29;case 29:ot=1;break t;case 30:ot=-3;break t;case 31:return-4;default:return u}return T.next_out=Y,T.avail_out=j,T.next_in=z,T.avail_in=V,b.hold=O,b.bits=k,(b.wsize||q!==T.avail_out&&b.mode<30&&(b.mode<27||P!==4))&&C(T,T.output,T.next_out,q-T.avail_out)?(b.mode=31,-4):(it-=T.avail_in,q-=T.avail_out,T.total_in+=it,T.total_out+=q,b.total+=q,b.wrap&&q&&(T.adler=b.check=b.flags?r(b.check,H,q,T.next_out-q):n(b.check,H,q,T.next_out-q)),T.data_type=b.bits+(b.last?64:0)+(b.mode===12?128:0)+(b.mode===20||b.mode===15?256:0),(it==0&&q===0||P===4)&&ot===h&&(ot=-5),ot)},e.inflateEnd=function(T){if(!T||!T.state)return u;var P=T.state;return P.window&&(P.window=null),T.state=null,h},e.inflateGetHeader=function(T,P){var b;return T&&T.state?(2&(b=T.state).wrap)==0?u:((b.head=P).done=!1,h):u},e.inflateSetDictionary=function(T,P){var b,B=P.length;return T&&T.state?(b=T.state).wrap!==0&&b.mode!==11?u:b.mode===11&&n(1,P,B,0)!==b.check?-3:C(T,P,B,B)?(b.mode=31,-4):(b.havedict=1,h):u},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(s,t,e){"use strict";var i=s("../utils/common"),n=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],r=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],a=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(l,c,h,u,d,f,m,_){var p,g,y,x,v,S,E,R,M,C=_.bits,T=0,P=0,b=0,B=0,H=0,z=0,Y=0,V=0,j=0,O=0,k=null,it=0,q=new i.Buf16(16),nt=new i.Buf16(16),Ht=null,Yt=0;for(T=0;T<=15;T++)q[T]=0;for(P=0;P<u;P++)q[c[h+P]]++;for(H=C,B=15;1<=B&&q[B]===0;B--);if(B<H&&(H=B),B===0)return d[f++]=20971520,d[f++]=20971520,_.bits=1,0;for(b=1;b<B&&q[b]===0;b++);for(H<b&&(H=b),T=V=1;T<=15;T++)if(V<<=1,(V-=q[T])<0)return-1;if(0<V&&(l===0||B!==1))return-1;for(nt[1]=0,T=1;T<15;T++)nt[T+1]=nt[T]+q[T];for(P=0;P<u;P++)c[h+P]!==0&&(m[nt[c[h+P]]++]=P);if(S=l===0?(k=Ht=m,19):l===1?(k=n,it-=257,Ht=r,Yt-=257,256):(k=o,Ht=a,-1),T=b,v=f,Y=P=O=0,y=-1,x=(j=1<<(z=H))-1,l===1&&852<j||l===2&&592<j)return 1;for(;;){for(E=T-Y,M=m[P]<S?(R=0,m[P]):m[P]>S?(R=Ht[Yt+m[P]],k[it+m[P]]):(R=96,0),p=1<<T-Y,b=g=1<<z;d[v+(O>>Y)+(g-=p)]=E<<24|R<<16|M|0,g!==0;);for(p=1<<T-1;O&p;)p>>=1;if(p!==0?(O&=p-1,O+=p):O=0,P++,--q[T]==0){if(T===B)break;T=c[h+m[P]]}if(H<T&&(O&x)!==y){for(Y===0&&(Y=H),v+=b,V=1<<(z=T-Y);z+Y<B&&!((V-=q[z+Y])<=0);)z++,V<<=1;if(j+=1<<z,l===1&&852<j||l===2&&592<j)return 1;d[y=O&x]=H<<24|z<<16|v-f|0}}return O!==0&&(d[v+O]=T-Y<<24|64<<16|0),_.bits=H,0}},{"../utils/common":41}],51:[function(s,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(s,t,e){"use strict";var i=s("../utils/common"),n=0,r=1;function o(N){for(var G=N.length;0<=--G;)N[G]=0}var a=0,l=29,c=256,h=c+1+l,u=30,d=19,f=2*h+1,m=15,_=16,p=7,g=256,y=16,x=17,v=18,S=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],E=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],R=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],M=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],C=new Array(2*(h+2));o(C);var T=new Array(2*u);o(T);var P=new Array(512);o(P);var b=new Array(256);o(b);var B=new Array(l);o(B);var H,z,Y,V=new Array(u);function j(N,G,ct,ft,K){this.static_tree=N,this.extra_bits=G,this.extra_base=ct,this.elems=ft,this.max_length=K,this.has_stree=N&&N.length}function O(N,G){this.dyn_tree=N,this.max_code=0,this.stat_desc=G}function k(N){return N<256?P[N]:P[256+(N>>>7)]}function it(N,G){N.pending_buf[N.pending++]=255&G,N.pending_buf[N.pending++]=G>>>8&255}function q(N,G,ct){N.bi_valid>_-ct?(N.bi_buf|=G<<N.bi_valid&65535,it(N,N.bi_buf),N.bi_buf=G>>_-N.bi_valid,N.bi_valid+=ct-_):(N.bi_buf|=G<<N.bi_valid&65535,N.bi_valid+=ct)}function nt(N,G,ct){q(N,ct[2*G],ct[2*G+1])}function Ht(N,G){for(var ct=0;ct|=1&N,N>>>=1,ct<<=1,0<--G;);return ct>>>1}function Yt(N,G,ct){var ft,K,pt=new Array(m+1),vt=0;for(ft=1;ft<=m;ft++)pt[ft]=vt=vt+ct[ft-1]<<1;for(K=0;K<=G;K++){var F=N[2*K+1];F!==0&&(N[2*K]=Ht(pt[F]++,F))}}function Nt(N){var G;for(G=0;G<h;G++)N.dyn_ltree[2*G]=0;for(G=0;G<u;G++)N.dyn_dtree[2*G]=0;for(G=0;G<d;G++)N.bl_tree[2*G]=0;N.dyn_ltree[2*g]=1,N.opt_len=N.static_len=0,N.last_lit=N.matches=0}function et(N){8<N.bi_valid?it(N,N.bi_buf):0<N.bi_valid&&(N.pending_buf[N.pending++]=N.bi_buf),N.bi_buf=0,N.bi_valid=0}function at(N,G,ct,ft){var K=2*G,pt=2*ct;return N[K]<N[pt]||N[K]===N[pt]&&ft[G]<=ft[ct]}function yt(N,G,ct){for(var ft=N.heap[ct],K=ct<<1;K<=N.heap_len&&(K<N.heap_len&&at(G,N.heap[K+1],N.heap[K],N.depth)&&K++,!at(G,ft,N.heap[K],N.depth));)N.heap[ct]=N.heap[K],ct=K,K<<=1;N.heap[ct]=ft}function $t(N,G,ct){var ft,K,pt,vt,F=0;if(N.last_lit!==0)for(;ft=N.pending_buf[N.d_buf+2*F]<<8|N.pending_buf[N.d_buf+2*F+1],K=N.pending_buf[N.l_buf+F],F++,ft===0?nt(N,K,G):(nt(N,(pt=b[K])+c+1,G),(vt=S[pt])!==0&&q(N,K-=B[pt],vt),nt(N,pt=k(--ft),ct),(vt=E[pt])!==0&&q(N,ft-=V[pt],vt)),F<N.last_lit;);nt(N,g,G)}function wt(N,G){var ct,ft,K,pt=G.dyn_tree,vt=G.stat_desc.static_tree,F=G.stat_desc.has_stree,Lt=G.stat_desc.elems,Xt=-1;for(N.heap_len=0,N.heap_max=f,ct=0;ct<Lt;ct++)pt[2*ct]!==0?(N.heap[++N.heap_len]=Xt=ct,N.depth[ct]=0):pt[2*ct+1]=0;for(;N.heap_len<2;)pt[2*(K=N.heap[++N.heap_len]=Xt<2?++Xt:0)]=1,N.depth[K]=0,N.opt_len--,F&&(N.static_len-=vt[2*K+1]);for(G.max_code=Xt,ct=N.heap_len>>1;1<=ct;ct--)yt(N,pt,ct);for(K=Lt;ct=N.heap[1],N.heap[1]=N.heap[N.heap_len--],yt(N,pt,1),ft=N.heap[1],N.heap[--N.heap_max]=ct,N.heap[--N.heap_max]=ft,pt[2*K]=pt[2*ct]+pt[2*ft],N.depth[K]=(N.depth[ct]>=N.depth[ft]?N.depth[ct]:N.depth[ft])+1,pt[2*ct+1]=pt[2*ft+1]=K,N.heap[1]=K++,yt(N,pt,1),2<=N.heap_len;);N.heap[--N.heap_max]=N.heap[1],(function(L,A){var $,J,rt,gt,bt,lt,ht=A.dyn_tree,St=A.max_code,Vt=A.stat_desc.static_tree,Et=A.stat_desc.has_stree,Mt=A.stat_desc.extra_bits,kt=A.stat_desc.extra_base,Wt=A.stat_desc.max_length,te=0;for(gt=0;gt<=m;gt++)L.bl_count[gt]=0;for(ht[2*L.heap[L.heap_max]+1]=0,$=L.heap_max+1;$<f;$++)Wt<(gt=ht[2*ht[2*(J=L.heap[$])+1]+1]+1)&&(gt=Wt,te++),ht[2*J+1]=gt,St<J||(L.bl_count[gt]++,bt=0,kt<=J&&(bt=Mt[J-kt]),lt=ht[2*J],L.opt_len+=lt*(gt+bt),Et&&(L.static_len+=lt*(Vt[2*J+1]+bt)));if(te!==0){do{for(gt=Wt-1;L.bl_count[gt]===0;)gt--;L.bl_count[gt]--,L.bl_count[gt+1]+=2,L.bl_count[Wt]--,te-=2}while(0<te);for(gt=Wt;gt!==0;gt--)for(J=L.bl_count[gt];J!==0;)St<(rt=L.heap[--$])||(ht[2*rt+1]!==gt&&(L.opt_len+=(gt-ht[2*rt+1])*ht[2*rt],ht[2*rt+1]=gt),J--)}})(N,G),Yt(pt,Xt,N.bl_count)}function w(N,G,ct){var ft,K,pt=-1,vt=G[1],F=0,Lt=7,Xt=4;for(vt===0&&(Lt=138,Xt=3),G[2*(ct+1)+1]=65535,ft=0;ft<=ct;ft++)K=vt,vt=G[2*(ft+1)+1],++F<Lt&&K===vt||(F<Xt?N.bl_tree[2*K]+=F:K!==0?(K!==pt&&N.bl_tree[2*K]++,N.bl_tree[2*y]++):F<=10?N.bl_tree[2*x]++:N.bl_tree[2*v]++,pt=K,Xt=(F=0)===vt?(Lt=138,3):K===vt?(Lt=6,3):(Lt=7,4))}function ot(N,G,ct){var ft,K,pt=-1,vt=G[1],F=0,Lt=7,Xt=4;for(vt===0&&(Lt=138,Xt=3),ft=0;ft<=ct;ft++)if(K=vt,vt=G[2*(ft+1)+1],!(++F<Lt&&K===vt)){if(F<Xt)for(;nt(N,K,N.bl_tree),--F!=0;);else K!==0?(K!==pt&&(nt(N,K,N.bl_tree),F--),nt(N,y,N.bl_tree),q(N,F-3,2)):F<=10?(nt(N,x,N.bl_tree),q(N,F-3,3)):(nt(N,v,N.bl_tree),q(N,F-11,7));pt=K,Xt=(F=0)===vt?(Lt=138,3):K===vt?(Lt=6,3):(Lt=7,4)}}o(V);var Z=!1;function U(N,G,ct,ft){q(N,(a<<1)+(ft?1:0),3),(function(K,pt,vt,F){et(K),F&&(it(K,vt),it(K,~vt)),i.arraySet(K.pending_buf,K.window,pt,vt,K.pending),K.pending+=vt})(N,G,ct,!0)}e._tr_init=function(N){Z||((function(){var G,ct,ft,K,pt,vt=new Array(m+1);for(K=ft=0;K<l-1;K++)for(B[K]=ft,G=0;G<1<<S[K];G++)b[ft++]=K;for(b[ft-1]=K,K=pt=0;K<16;K++)for(V[K]=pt,G=0;G<1<<E[K];G++)P[pt++]=K;for(pt>>=7;K<u;K++)for(V[K]=pt<<7,G=0;G<1<<E[K]-7;G++)P[256+pt++]=K;for(ct=0;ct<=m;ct++)vt[ct]=0;for(G=0;G<=143;)C[2*G+1]=8,G++,vt[8]++;for(;G<=255;)C[2*G+1]=9,G++,vt[9]++;for(;G<=279;)C[2*G+1]=7,G++,vt[7]++;for(;G<=287;)C[2*G+1]=8,G++,vt[8]++;for(Yt(C,h+1,vt),G=0;G<u;G++)T[2*G+1]=5,T[2*G]=Ht(G,5);H=new j(C,S,c+1,h,m),z=new j(T,E,0,u,m),Y=new j(new Array(0),R,0,d,p)})(),Z=!0),N.l_desc=new O(N.dyn_ltree,H),N.d_desc=new O(N.dyn_dtree,z),N.bl_desc=new O(N.bl_tree,Y),N.bi_buf=0,N.bi_valid=0,Nt(N)},e._tr_stored_block=U,e._tr_flush_block=function(N,G,ct,ft){var K,pt,vt=0;0<N.level?(N.strm.data_type===2&&(N.strm.data_type=(function(F){var Lt,Xt=4093624447;for(Lt=0;Lt<=31;Lt++,Xt>>>=1)if(1&Xt&&F.dyn_ltree[2*Lt]!==0)return n;if(F.dyn_ltree[18]!==0||F.dyn_ltree[20]!==0||F.dyn_ltree[26]!==0)return r;for(Lt=32;Lt<c;Lt++)if(F.dyn_ltree[2*Lt]!==0)return r;return n})(N)),wt(N,N.l_desc),wt(N,N.d_desc),vt=(function(F){var Lt;for(w(F,F.dyn_ltree,F.l_desc.max_code),w(F,F.dyn_dtree,F.d_desc.max_code),wt(F,F.bl_desc),Lt=d-1;3<=Lt&&F.bl_tree[2*M[Lt]+1]===0;Lt--);return F.opt_len+=3*(Lt+1)+5+5+4,Lt})(N),K=N.opt_len+3+7>>>3,(pt=N.static_len+3+7>>>3)<=K&&(K=pt)):K=pt=ct+5,ct+4<=K&&G!==-1?U(N,G,ct,ft):N.strategy===4||pt===K?(q(N,2+(ft?1:0),3),$t(N,C,T)):(q(N,4+(ft?1:0),3),(function(F,Lt,Xt,L){var A;for(q(F,Lt-257,5),q(F,Xt-1,5),q(F,L-4,4),A=0;A<L;A++)q(F,F.bl_tree[2*M[A]+1],3);ot(F,F.dyn_ltree,Lt-1),ot(F,F.dyn_dtree,Xt-1)})(N,N.l_desc.max_code+1,N.d_desc.max_code+1,vt+1),$t(N,N.dyn_ltree,N.dyn_dtree)),Nt(N),ft&&et(N)},e._tr_tally=function(N,G,ct){return N.pending_buf[N.d_buf+2*N.last_lit]=G>>>8&255,N.pending_buf[N.d_buf+2*N.last_lit+1]=255&G,N.pending_buf[N.l_buf+N.last_lit]=255&ct,N.last_lit++,G===0?N.dyn_ltree[2*ct]++:(N.matches++,G--,N.dyn_ltree[2*(b[ct]+c+1)]++,N.dyn_dtree[2*k(G)]++),N.last_lit===N.lit_bufsize-1},e._tr_align=function(N){q(N,2,3),nt(N,g,C),(function(G){G.bi_valid===16?(it(G,G.bi_buf),G.bi_buf=0,G.bi_valid=0):8<=G.bi_valid&&(G.pending_buf[G.pending++]=255&G.bi_buf,G.bi_buf>>=8,G.bi_valid-=8)})(N)}},{"../utils/common":41}],53:[function(s,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(s,t,e){(function(i){(function(n,r){"use strict";if(!n.setImmediate){var o,a,l,c,h=1,u={},d=!1,f=n.document,m=Object.getPrototypeOf&&Object.getPrototypeOf(n);m=m&&m.setTimeout?m:n,o={}.toString.call(n.process)==="[object process]"?function(y){process.nextTick(function(){p(y)})}:(function(){if(n.postMessage&&!n.importScripts){var y=!0,x=n.onmessage;return n.onmessage=function(){y=!1},n.postMessage("","*"),n.onmessage=x,y}})()?(c="setImmediate$"+Math.random()+"$",n.addEventListener?n.addEventListener("message",g,!1):n.attachEvent("onmessage",g),function(y){n.postMessage(c+y,"*")}):n.MessageChannel?((l=new MessageChannel).port1.onmessage=function(y){p(y.data)},function(y){l.port2.postMessage(y)}):f&&"onreadystatechange"in f.createElement("script")?(a=f.documentElement,function(y){var x=f.createElement("script");x.onreadystatechange=function(){p(y),x.onreadystatechange=null,a.removeChild(x),x=null},a.appendChild(x)}):function(y){setTimeout(p,0,y)},m.setImmediate=function(y){typeof y!="function"&&(y=new Function(""+y));for(var x=new Array(arguments.length-1),v=0;v<x.length;v++)x[v]=arguments[v+1];var S={callback:y,args:x};return u[h]=S,o(h),h++},m.clearImmediate=_}function _(y){delete u[y]}function p(y){if(d)setTimeout(p,0,y);else{var x=u[y];if(x){d=!0;try{(function(v){var S=v.callback,E=v.args;switch(E.length){case 0:S();break;case 1:S(E[0]);break;case 2:S(E[0],E[1]);break;case 3:S(E[0],E[1],E[2]);break;default:S.apply(r,E)}})(x)}finally{_(y),d=!1}}}}function g(y){y.source===n&&typeof y.data=="string"&&y.data.indexOf(c)===0&&p(+y.data.slice(c.length))}})(typeof self>"u"?i===void 0?this:i:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});var kf=0,yh=1,zf=2;var fo=1,Hf=2,Zs=3,In=0,Oe=1,Ie=2,Ai=0,Ks=1,ue=2,bh=3,Sh=4,Vf=5;var jn=100,Gf=101,Wf=102,Xf=103,qf=104,Yf=200,$f=201,Zf=202,Kf=203,Mh=204,wh=205,Jf=206,jf=207,Qf=208,td=209,ed=210,id=211,nd=212,sd=213,rd=214,Ea=0,Ta=1,Aa=2,Ps=3,Ra=4,Ca=5,Ia=6,Pa=7,Eh=0,od=1,ad=2,Hi=0,po=1,mo=2,go=3,_o=4,xo=5,vo=6,yo=7;var Th=300,Pn=301,Qn=302,ol=303,al=304,bo=306,Ls=1e3,$i=1001,La=1002,Xe=1003,ld=1004;var So=1005;var Ze=1006,ll=1007;var Ln=1008;var fi=1009,Ah=1010,Rh=1011,Js=1012,cl=1013,Vi=1014,Ri=1015,Je=1016,hl=1017,ul=1018,js=1020,Ch=35902,Ih=35899,Ph=1021,Lh=1022,Ci=1023,Ki=1026,Nn=1027,fl=1028,dl=1029,Dn=1030,pl=1031;var ml=1033,Mo=33776,wo=33777,Eo=33778,To=33779,gl=35840,_l=35841,xl=35842,vl=35843,yl=36196,bl=37492,Sl=37496,Ml=37488,wl=37489,Ao=37490,El=37491,Tl=37808,Al=37809,Rl=37810,Cl=37811,Il=37812,Pl=37813,Ll=37814,Nl=37815,Dl=37816,Ul=37817,Fl=37818,Bl=37819,Ol=37820,kl=37821,zl=36492,Hl=36494,Vl=36495,Gl=36283,Wl=36284,Ro=36285,Xl=36286;var Rr=2300,Na=2301,Ma=2302,ah=2303,lh=2400,ch=2401,hh=2402;var cd=3200;var ql=0,hd=1,fn="",Ae="srgb",Cr="srgb-linear",Ir="linear",me="srgb";var wa=7680;var ud=519,fd=512,dd=513,pd=514,Yl=515,md=516,gd=517,$l=518,_d=519,Nh=35044,hi=35048;var Dh="300 es",Oi=2e3,Ns=2001;function wm(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Em(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Pr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function xd(){let s=Pr("canvas");return s.style.display="block",s}var ju={},Ds=null;function Lr(...s){let t="THREE."+s.shift();Ds?Ds("log",t,...s):console.log(t,...s)}function vd(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Zt(...s){s=vd(s);let t="THREE."+s.shift();if(Ds)Ds("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Kt(...s){s=vd(s);let t="THREE."+s.shift();if(Ds)Ds("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Zn(...s){let t=s.join(" ");t in ju||(ju[t]=!0,Zt(...s))}function yd(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var bd={[Ea]:Ta,[Aa]:Ia,[Ra]:Pa,[Ps]:Ca,[Ta]:Ea,[Ia]:Aa,[Pa]:Ra,[Ca]:Ps},Ji=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,o=n.length;r<o;r++)n[r].call(this,t);t.target=null}}},ti=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qu=1234567,Rs=Math.PI/180,Us=180/Math.PI;function Zi(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ti[s&255]+ti[s>>8&255]+ti[s>>16&255]+ti[s>>24&255]+"-"+ti[t&255]+ti[t>>8&255]+"-"+ti[t>>16&15|64]+ti[t>>24&255]+"-"+ti[e&63|128]+ti[e>>8&255]+"-"+ti[e>>16&255]+ti[e>>24&255]+ti[i&255]+ti[i>>8&255]+ti[i>>16&255]+ti[i>>24&255]).toLowerCase()}function ae(s,t,e){return Math.max(t,Math.min(e,s))}function Uh(s,t){return(s%t+t)%t}function Tm(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function Am(s,t,e){return s!==t?(e-s)/(t-s):0}function Er(s,t,e){return(1-e)*s+e*t}function Rm(s,t,e,i){return Er(s,t,1-Math.exp(-e*i))}function Cm(s,t=1){return t-Math.abs(Uh(s,t*2)-t)}function Im(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Pm(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Lm(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Nm(s,t){return s+Math.random()*(t-s)}function Dm(s){return s*(.5-Math.random())}function Um(s){s!==void 0&&(Qu=s);let t=Qu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Fm(s){return s*Rs}function Bm(s){return s*Us}function Om(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function km(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function zm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Hm(s,t,e,i,n){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),d=o((t-i)/2),f=r((i-t)/2),m=o((i-t)/2);switch(n){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*m,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*m,a*c);break;case"ZYZ":s.set(l*m,l*f,a*h,a*c);break;default:Zt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function Bi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ye(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Le={DEG2RAD:Rs,RAD2DEG:Us,generateUUID:Zi,clamp:ae,euclideanModulo:Uh,mapLinear:Tm,inverseLerp:Am,lerp:Er,damp:Rm,pingpong:Cm,smoothstep:Im,smootherstep:Pm,randInt:Lm,randFloat:Nm,randFloatSpread:Dm,seededRandom:Um,degToRad:Fm,radToDeg:Bm,isPowerOfTwo:Om,ceilPowerOfTwo:km,floorPowerOfTwo:zm,setQuaternionFromProperEuler:Hm,normalize:ye,denormalize:Bi},Hh=class Hh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*n+t.x,this.y=r*n+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Hh.prototype.isVector2=!0;var xt=Hh,qe=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,o,a){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3],d=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(u!==_||l!==d||c!==f||h!==m){let p=l*d+c*f+h*m+u*_;p<0&&(d=-d,f=-f,m=-m,_=-_,p=-p);let g=1-a;if(p<.9995){let y=Math.acos(p),x=Math.sin(y);g=Math.sin(g*y)/x,a=Math.sin(a*y)/x,l=l*g+d*a,c=c*g+f*a,h=h*g+m*a,u=u*g+_*a}else{l=l*g+d*a,c=c*g+f*a,h=h*g+m*a,u=u*g+_*a;let y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,r,o){let a=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(n/2),u=a(r/2),d=l(i/2),f=l(n/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:Zt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-n)*f}else if(i>a&&i>u){let f=2*Math.sqrt(1+i-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(n+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-i-u);this._w=(r-c)/f,this._x=(n+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-a);this._w=(o-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ae(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+n*c-r*l,this._y=n*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-n*a,this._w=o*h-i*a-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,n=-n,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Vh=class Vh{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(tf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(tf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*n-a*i),h=2*(a*e-r*n),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=n+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=n*l-r*a,this.y=r*o-i*l,this.z=i*a-n*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Dc.copy(this).projectOnVector(t),this.sub(Dc)}reflect(t){return this.sub(Dc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Vh.prototype.isVector3=!0;var D=Vh,Dc=new D,tf=new qe,Gh=class Gh{constructor(t,e,i,n,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,o,a,l,c)}set(t,e,i,n,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],m=i[8],_=n[0],p=n[3],g=n[6],y=n[1],x=n[4],v=n[7],S=n[2],E=n[5],R=n[8];return r[0]=o*_+a*y+l*S,r[3]=o*p+a*x+l*E,r[6]=o*g+a*v+l*R,r[1]=c*_+h*y+u*S,r[4]=c*p+h*x+u*E,r[7]=c*g+h*v+u*R,r[2]=d*_+f*y+m*S,r[5]=d*p+f*x+m*E,r[8]=d*g+f*v+m*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+n*r*c-n*o*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+i*d+n*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=u*_,t[1]=(n*c-h*i)*_,t[2]=(a*i-n*o)*_,t[3]=d*_,t[4]=(h*e-n*l)*_,t[5]=(n*r-a*e)*_,t[6]=f*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-n*c,n*l,-n*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Zn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Uc.makeScale(t,e)),this}rotate(t){return Zn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Uc.makeRotation(-t)),this}translate(t,e){return Zn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Uc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Gh.prototype.isMatrix3=!0;var ie=Gh,Uc=new ie,ef=new ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nf=new ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vm(){let s={enabled:!0,workingColorSpace:Cr,spaces:{},convert:function(n,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===me&&(n.r=cn(n.r),n.g=cn(n.g),n.b=cn(n.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===me&&(n.r=Cs(n.r),n.g=Cs(n.g),n.b=Cs(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===fn?Ir:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,o){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return Zn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return Zn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Cr]:{primaries:t,whitePoint:i,transfer:Ir,toXYZ:ef,fromXYZ:nf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:t,whitePoint:i,transfer:me,toXYZ:ef,fromXYZ:nf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}}),s}var oe=Vm();function cn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Cs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var hs,Da=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{hs===void 0&&(hs=Pr("canvas")),hs.width=t.width,hs.height=t.height;let n=hs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=hs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Pr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let o=0;o<r.length;o++)r[o]=cn(r[o]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(cn(e[i]/255)*255):e[i]=cn(e[i]);return{data:e,width:t.width,height:t.height}}else return Zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Gm=0,Fs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?r.push(Fc(n[o].image)):r.push(Fc(n[o]))}else r=Fc(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function Fc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Da.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Zt("Texture: Unable to serialize Texture."),{})}var Wm=0,Bc=new D,li=class s extends Ji{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=$i,n=$i,r=Ze,o=Ln,a=Ci,l=fi,c=s.DEFAULT_ANISOTROPY,h=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=Zi(),this.name="",this.source=new Fs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Bc).x}get height(){return this.source.getSize(Bc).y}get depth(){return this.source.getSize(Bc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Zt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Zt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Th)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ls:t.x=t.x-Math.floor(t.x);break;case $i:t.x=t.x<0?0:1;break;case La:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ls:t.y=t.y-Math.floor(t.y);break;case $i:t.y=t.y<0?0:1;break;case La:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};li.DEFAULT_IMAGE=null;li.DEFAULT_MAPPING=Th;li.DEFAULT_ANISOTROPY=1;var Wh=class Wh{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*n+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*n+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*n+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*n+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,v=(f+1)/2,S=(g+1)/2,E=(h+d)/4,R=(u+_)/4,M=(m+p)/4;return x>v&&x>S?x<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(x),n=E/i,r=R/i):v>S?v<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(v),i=E/n,r=M/n):S<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(S),i=R/r,n=M/r),this.set(i,n,r,e),this}let y=Math.sqrt((p-m)*(p-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-m)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this.w=ae(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this.w=ae(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Wh.prototype.isVector4=!0;var Re=Wh,Ua=class extends Ji{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},r=new li(n),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new Fs(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Be=class extends Ua{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Nr=class extends li{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Fa=class extends li{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var rl=class rl{constructor(t,e,i,n,r,o,a,l,c,h,u,d,f,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,o,a,l,c,h,u,d,f,m,_,p)}set(t,e,i,n,r,o,a,l,c,h,u,d,f,m,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=n,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rl().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/us.setFromMatrixColumn(t,0).length(),r=1/us.setFromMatrixColumn(t,1).length(),o=1/us.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,m=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,m=c*h,_=c*u;e[0]=d+_*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,m=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,m=a*h,_=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-_*u}else if(t.order==="XZY"){let d=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xm,t,qm)}lookAt(t,e,i){let n=this.elements;return pi.subVectors(t,e),pi.lengthSq()===0&&(pi.z=1),pi.normalize(),vn.crossVectors(i,pi),vn.lengthSq()===0&&(Math.abs(i.z)===1?pi.x+=1e-4:pi.z+=1e-4,pi.normalize(),vn.crossVectors(i,pi)),vn.normalize(),Xo.crossVectors(pi,vn),n[0]=vn.x,n[4]=Xo.x,n[8]=pi.x,n[1]=vn.y,n[5]=Xo.y,n[9]=pi.y,n[2]=vn.z,n[6]=Xo.z,n[10]=pi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],m=i[2],_=i[6],p=i[10],g=i[14],y=i[3],x=i[7],v=i[11],S=i[15],E=n[0],R=n[4],M=n[8],C=n[12],T=n[1],P=n[5],b=n[9],B=n[13],H=n[2],z=n[6],Y=n[10],V=n[14],j=n[3],O=n[7],k=n[11],it=n[15];return r[0]=o*E+a*T+l*H+c*j,r[4]=o*R+a*P+l*z+c*O,r[8]=o*M+a*b+l*Y+c*k,r[12]=o*C+a*B+l*V+c*it,r[1]=h*E+u*T+d*H+f*j,r[5]=h*R+u*P+d*z+f*O,r[9]=h*M+u*b+d*Y+f*k,r[13]=h*C+u*B+d*V+f*it,r[2]=m*E+_*T+p*H+g*j,r[6]=m*R+_*P+p*z+g*O,r[10]=m*M+_*b+p*Y+g*k,r[14]=m*C+_*B+p*V+g*it,r[3]=y*E+x*T+v*H+S*j,r[7]=y*R+x*P+v*z+S*O,r[11]=y*M+x*b+v*Y+S*k,r[15]=y*C+x*B+v*V+S*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],_=t[7],p=t[11],g=t[15],y=l*f-c*d,x=a*f-c*u,v=a*d-l*u,S=o*f-c*h,E=o*d-l*h,R=o*u-a*h;return e*(_*y-p*x+g*v)-i*(m*y-p*S+g*E)+n*(m*x-_*S+g*R)-r*(m*v-_*E+p*R)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-i*(r*h-a*l)+n*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],_=t[13],p=t[14],g=t[15],y=e*a-i*o,x=e*l-n*o,v=e*c-r*o,S=i*l-n*a,E=i*c-r*a,R=n*c-r*l,M=h*_-u*m,C=h*p-d*m,T=h*g-f*m,P=u*p-d*_,b=u*g-f*_,B=d*g-f*p,H=y*B-x*b+v*P+S*T-E*C+R*M;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/H;return t[0]=(a*B-l*b+c*P)*z,t[1]=(n*b-i*B-r*P)*z,t[2]=(_*R-p*E+g*S)*z,t[3]=(d*E-u*R-f*S)*z,t[4]=(l*T-o*B-c*C)*z,t[5]=(e*B-n*T+r*C)*z,t[6]=(p*v-m*R-g*x)*z,t[7]=(h*R-d*v+f*x)*z,t[8]=(o*b-a*T+c*M)*z,t[9]=(i*T-e*b-r*M)*z,t[10]=(m*E-_*v+g*y)*z,t[11]=(u*v-h*E-f*y)*z,t[12]=(a*C-o*P-l*M)*z,t[13]=(e*P-i*C+n*M)*z,t[14]=(_*x-m*S-p*y)*z,t[15]=(h*S-u*x+d*y)*z,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-n*l,c*l+n*a,0,c*a+n*l,h*a+i,h*l-n*o,0,c*l-n*a,h*l+n*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,o){return this.set(1,i,r,0,t,1,o,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,_=o*h,p=o*u,g=a*u,y=l*c,x=l*h,v=l*u,S=i.x,E=i.y,R=i.z;return n[0]=(1-(_+g))*S,n[1]=(f+v)*S,n[2]=(m-x)*S,n[3]=0,n[4]=(f-v)*E,n[5]=(1-(d+g))*E,n[6]=(p+y)*E,n[7]=0,n[8]=(m+x)*R,n[9]=(p-y)*R,n[10]=(1-(d+_))*R,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=us.set(n[0],n[1],n[2]).length(),a=us.set(n[4],n[5],n[6]).length(),l=us.set(n[8],n[9],n[10]).length();r<0&&(o=-o),Di.copy(this);let c=1/o,h=1/a,u=1/l;return Di.elements[0]*=c,Di.elements[1]*=c,Di.elements[2]*=c,Di.elements[4]*=h,Di.elements[5]*=h,Di.elements[6]*=h,Di.elements[8]*=u,Di.elements[9]*=u,Di.elements[10]*=u,e.setFromRotationMatrix(Di),i.x=o,i.y=a,i.z=l,this}makePerspective(t,e,i,n,r,o,a=Oi,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(i-n),d=(e+t)/(e-t),f=(i+n)/(i-n),m,_;if(l)m=r/(o-r),_=o*r/(o-r);else if(a===Oi)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Ns)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,o,a=Oi,l=!1){let c=this.elements,h=2/(e-t),u=2/(i-n),d=-(e+t)/(e-t),f=-(i+n)/(i-n),m,_;if(l)m=1/(o-r),_=o/(o-r);else if(a===Oi)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===Ns)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};rl.prototype.isMatrix4=!0;var jt=rl,us=new D,Di=new jt,Xm=new D(0,0,0),qm=new D(1,1,1),vn=new D,Xo=new D,pi=new D,sf=new jt,rf=new qe,wi=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],o=n[4],a=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ae(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ae(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return sf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sf,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rf.setFromEuler(this),this.setFromQuaternion(rf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wi.DEFAULT_ORDER="XYZ";var Bs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Ym=0,of=new D,fs=new qe,sn=new jt,qo=new D,pr=new D,$m=new D,Zm=new qe,af=new D(1,0,0),lf=new D(0,1,0),cf=new D(0,0,1),hf={type:"added"},Km={type:"removed"},ds={type:"childadded",child:null},Oc={type:"childremoved",child:null},ke=class s extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new D,e=new wi,i=new qe,n=new D(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new jt},normalMatrix:{value:new ie}}),this.matrix=new jt,this.matrixWorld=new jt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(af,t)}rotateY(t){return this.rotateOnAxis(lf,t)}rotateZ(t){return this.rotateOnAxis(cf,t)}translateOnAxis(t,e){return of.copy(t).applyQuaternion(this.quaternion),this.position.add(of.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(af,t)}translateY(t){return this.translateOnAxis(lf,t)}translateZ(t){return this.translateOnAxis(cf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(sn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?qo.copy(t):qo.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sn.lookAt(pr,qo,this.up):sn.lookAt(qo,pr,this.up),this.quaternion.setFromRotationMatrix(sn),n&&(sn.extractRotation(n.matrixWorld),fs.setFromRotationMatrix(sn),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Kt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(hf),ds.child=t,this.dispatchEvent(ds),ds.child=null):Kt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Km),Oc.child=t,this.dispatchEvent(Oc),Oc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(hf),ds.child=t,this.dispatchEvent(ds),ds.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,t,$m),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,Zm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(a=>({...a})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));n.material=a}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];n.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=n,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ke.DEFAULT_UP=new D(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pe=class extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}},Jm={type:"move"},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,i),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jm)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new pe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},Yo={h:0,s:0,l:0};function kc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var dt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=oe.workingColorSpace){if(t=Uh(t,1),e=ae(e,0,1),i=ae(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=kc(o,r,t+1/3),this.g=kc(o,r,t),this.b=kc(o,r,t-1/3)}return oe.colorSpaceToWorking(this,n),this}setStyle(t,e=Ae){function i(r){r!==void 0&&parseFloat(r)<1&&Zt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Zt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Zt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){let i=Sd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Zt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=cn(t.r),this.g=cn(t.g),this.b=cn(t.b),this}copyLinearToSRGB(t){return this.r=Cs(t.r),this.g=Cs(t.g),this.b=Cs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return oe.workingToColorSpace(ei.copy(this),t),Math.round(ae(ei.r*255,0,255))*65536+Math.round(ae(ei.g*255,0,255))*256+Math.round(ae(ei.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(ei.copy(this),e);let i=ei.r,n=ei.g,r=ei.b,o=Math.max(i,n,r),a=Math.min(i,n,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(ei.copy(this),e),t.r=ei.r,t.g=ei.g,t.b=ei.b,t}getStyle(t=Ae){oe.workingToColorSpace(ei.copy(this),t);let e=ei.r,i=ei.g,n=ei.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(yn),this.setHSL(yn.h+t,yn.s+e,yn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(yn),t.getHSL(Yo);let i=Er(yn.h,Yo.h,e),n=Er(yn.s,Yo.s,e),r=Er(yn.l,Yo.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ei=new dt;dt.NAMES=Sd;var Dr=class s{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new dt(t),this.near=e,this.far=i}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ur=class extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ui=new D,rn=new D,zc=new D,on=new D,ps=new D,ms=new D,uf=new D,Hc=new D,Vc=new D,Gc=new D,Wc=new Re,Xc=new Re,qc=new Re,Yi=class s{constructor(t=new D,e=new D,i=new D){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Ui.subVectors(t,e),n.cross(Ui);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){Ui.subVectors(n,e),rn.subVectors(i,e),zc.subVectors(t,e);let o=Ui.dot(Ui),a=Ui.dot(rn),l=Ui.dot(zc),c=rn.dot(rn),h=rn.dot(zc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(t,e,i,n,r,o,a,l){return this.getBarycoord(t,e,i,n,on)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,on.x),l.addScaledVector(o,on.y),l.addScaledVector(a,on.z),l)}static getInterpolatedAttribute(t,e,i,n,r,o){return Wc.setScalar(0),Xc.setScalar(0),qc.setScalar(0),Wc.fromBufferAttribute(t,e),Xc.fromBufferAttribute(t,i),qc.fromBufferAttribute(t,n),o.setScalar(0),o.addScaledVector(Wc,r.x),o.addScaledVector(Xc,r.y),o.addScaledVector(qc,r.z),o}static isFrontFacing(t,e,i,n){return Ui.subVectors(i,e),rn.subVectors(t,e),Ui.cross(rn).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ui.subVectors(this.c,this.b),rn.subVectors(this.a,this.b),Ui.cross(rn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,o,a;ps.subVectors(n,i),ms.subVectors(r,i),Hc.subVectors(t,i);let l=ps.dot(Hc),c=ms.dot(Hc);if(l<=0&&c<=0)return e.copy(i);Vc.subVectors(t,n);let h=ps.dot(Vc),u=ms.dot(Vc);if(h>=0&&u<=h)return e.copy(n);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(ps,o);Gc.subVectors(t,r);let f=ps.dot(Gc),m=ms.dot(Gc);if(m>=0&&f<=m)return e.copy(r);let _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(i).addScaledVector(ms,a);let p=h*m-f*u;if(p<=0&&u-h>=0&&f-m>=0)return uf.subVectors(r,n),a=(u-h)/(u-h+(f-m)),e.copy(n).addScaledVector(uf,a);let g=1/(p+_+d);return o=_*g,a=d*g,e.copy(i).addScaledVector(ps,o).addScaledVector(ms,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ji=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Fi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Fi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Fi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Fi):Fi.fromBufferAttribute(r,o),Fi.applyMatrix4(t.matrixWorld),this.expandByPoint(Fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$o.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),$o.copy(i.boundingBox)),$o.applyMatrix4(t.matrixWorld),this.union($o)}let n=t.children;for(let r=0,o=n.length;r<o;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Fi),Fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(mr),Zo.subVectors(this.max,mr),gs.subVectors(t.a,mr),_s.subVectors(t.b,mr),xs.subVectors(t.c,mr),bn.subVectors(_s,gs),Sn.subVectors(xs,_s),Xn.subVectors(gs,xs);let e=[0,-bn.z,bn.y,0,-Sn.z,Sn.y,0,-Xn.z,Xn.y,bn.z,0,-bn.x,Sn.z,0,-Sn.x,Xn.z,0,-Xn.x,-bn.y,bn.x,0,-Sn.y,Sn.x,0,-Xn.y,Xn.x,0];return!Yc(e,gs,_s,xs,Zo)||(e=[1,0,0,0,1,0,0,0,1],!Yc(e,gs,_s,xs,Zo))?!1:(Ko.crossVectors(bn,Sn),e=[Ko.x,Ko.y,Ko.z],Yc(e,gs,_s,xs,Zo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(an),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},an=[new D,new D,new D,new D,new D,new D,new D,new D],Fi=new D,$o=new ji,gs=new D,_s=new D,xs=new D,bn=new D,Sn=new D,Xn=new D,mr=new D,Zo=new D,Ko=new D,qn=new D;function Yc(s,t,e,i,n){for(let r=0,o=s.length-3;r<=o;r+=3){qn.fromArray(s,r);let a=n.x*Math.abs(qn.x)+n.y*Math.abs(qn.y)+n.z*Math.abs(qn.z),l=t.dot(qn),c=e.dot(qn),h=i.dot(qn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Fe=new D,Jo=new xt,jm=0,de=class extends Ji{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:jm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Nh,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Jo.fromBufferAttribute(this,e),Jo.applyMatrix3(t),this.setXY(e,Jo.x,Jo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Bi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ye(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array),n=ye(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array),n=ye(n,this.array),r=ye(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Fr=class extends de{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Br=class extends de{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ee=class extends de{constructor(t,e,i){super(new Float32Array(t),e,i)}},Qm=new ji,gr=new D,$c=new D,Qi=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Qm.setFromPoints(t).getCenter(i);let n=0;for(let r=0,o=t.length;r<o;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gr.subVectors(t,this.center);let e=gr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(gr,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($c.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gr.copy(t.center).add($c)),this.expandByPoint(gr.copy(t.center).sub($c))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},t0=0,Mi=new jt,Zc=new ke,vs=new D,mi=new ji,_r=new ji,We=new D,se=class s extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wm(t)?Br:Fr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ie().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Mi.makeRotationFromQuaternion(t),this.applyMatrix4(Mi),this}rotateX(t){return Mi.makeRotationX(t),this.applyMatrix4(Mi),this}rotateY(t){return Mi.makeRotationY(t),this.applyMatrix4(Mi),this}rotateZ(t){return Mi.makeRotationZ(t),this.applyMatrix4(Mi),this}translate(t,e,i){return Mi.makeTranslation(t,e,i),this.applyMatrix4(Mi),this}scale(t,e,i){return Mi.makeScale(t,e,i),this.applyMatrix4(Mi),this}lookAt(t){return Zc.lookAt(t),Zc.updateMatrix(),this.applyMatrix4(Zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vs).negate(),this.translate(vs.x,vs.y,vs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let o=t[n];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ee(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ji);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];mi.setFromBufferAttribute(r),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,mi.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,mi.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(mi.min),this.boundingBox.expandByPoint(mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Kt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let i=this.boundingSphere.center;if(mi.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];_r.setFromBufferAttribute(a),this.morphTargetsRelative?(We.addVectors(mi.min,_r.min),mi.expandByPoint(We),We.addVectors(mi.max,_r.max),mi.expandByPoint(We)):(mi.expandByPoint(_r.min),mi.expandByPoint(_r.max))}mi.getCenter(i);let n=0;for(let r=0,o=t.count;r<o;r++)We.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(We));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)We.fromBufferAttribute(a,c),l&&(vs.fromBufferAttribute(t,c),We.add(vs)),n=Math.max(n,i.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Kt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Kt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new de(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let M=0;M<i.count;M++)a[M]=new D,l[M]=new D;let c=new D,h=new D,u=new D,d=new xt,f=new xt,m=new xt,_=new D,p=new D;function g(M,C,T){c.fromBufferAttribute(i,M),h.fromBufferAttribute(i,C),u.fromBufferAttribute(i,T),d.fromBufferAttribute(r,M),f.fromBufferAttribute(r,C),m.fromBufferAttribute(r,T),h.sub(c),u.sub(c),f.sub(d),m.sub(d);let P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(P),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[M].add(_),a[C].add(_),a[T].add(_),l[M].add(p),l[C].add(p),l[T].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let M=0,C=y.length;M<C;++M){let T=y[M],P=T.start,b=T.count;for(let B=P,H=P+b;B<H;B+=3)g(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let x=new D,v=new D,S=new D,E=new D;function R(M){S.fromBufferAttribute(n,M),E.copy(S);let C=a[M];x.copy(C),x.sub(S.multiplyScalar(S.dot(C))).normalize(),v.crossVectors(E,C);let P=v.dot(l[M])<0?-1:1;o.setXYZW(M,x.x,x.y,x.z,P)}for(let M=0,C=y.length;M<C;++M){let T=y[M],P=T.start,b=T.count;for(let B=P,H=P+b;B<H;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new de(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let n=new D,r=new D,o=new D,a=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let d=0,f=t.count;d<f;d+=3){let m=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);n.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(n,r),h.cross(u),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),a.add(h),l.add(h),c.add(h),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)n.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(n,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let g=0;g<h;g++)d[m++]=c[f++]}return new de(d,h,u)}if(this.index===null)return Zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let a in n){let l=n[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Or=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Nh,this.updateRanges=[],this.version=0,this.uuid=Zi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,r=this.stride;n<r;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},ai=new D,ks=class s{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)ai.fromBufferAttribute(this,e),ai.applyMatrix4(t),this.setXYZ(e,ai.x,ai.y,ai.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ai.fromBufferAttribute(this,e),ai.applyNormalMatrix(t),this.setXYZ(e,ai.x,ai.y,ai.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ai.fromBufferAttribute(this,e),ai.transformDirection(t),this.setXYZ(e,ai.x,ai.y,ai.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Bi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ye(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ye(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ye(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ye(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ye(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Bi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Bi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Bi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Bi(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array),n=ye(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array),n=ye(n,this.array),r=ye(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Lr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return new de(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Lr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Kc=new D,e0=new D,i0=new ie,$e=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=Kc.subVectors(i,e).cross(e0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(Kc),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||i0.getNormalMatrix(t),n=this.coplanarPoint(Kc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},n0=0,ki=class extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Ks,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mh,this.blendDst=wh,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dt(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ud,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wa,this.stencilZFail=wa,this.stencilZPass=wa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Zt(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Zt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=n(t.textures),o=n(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new dt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new $e().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new xt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ze=class extends ki{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new dt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ys,xr=new D,bs=new D,Ss=new D,Ms=new xt,vr=new xt,Md=new jt,jo=new D,yr=new D,Qo=new D,ff=new xt,Jc=new xt,df=new xt,He=class extends ke{constructor(t=new ze){if(super(),this.isSprite=!0,this.type="Sprite",ys===void 0){ys=new se;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Or(e,5);ys.setIndex([0,1,2,0,2,3]),ys.setAttribute("position",new ks(i,3,0,!1)),ys.setAttribute("uv",new ks(i,2,3,!1))}this.geometry=ys,this.material=t,this.center=new xt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Kt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bs.setFromMatrixScale(this.matrixWorld),Md.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bs.multiplyScalar(-Ss.z);let i=this.material.rotation,n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));let o=this.center;ta(jo.set(-.5,-.5,0),Ss,o,bs,n,r),ta(yr.set(.5,-.5,0),Ss,o,bs,n,r),ta(Qo.set(.5,.5,0),Ss,o,bs,n,r),ff.set(0,0),Jc.set(1,0),df.set(1,1);let a=t.ray.intersectTriangle(jo,yr,Qo,!1,xr);if(a===null&&(ta(yr.set(-.5,.5,0),Ss,o,bs,n,r),Jc.set(0,1),a=t.ray.intersectTriangle(jo,Qo,yr,!1,xr),a===null))return;let l=t.ray.origin.distanceTo(xr);l<t.near||l>t.far||e.push({distance:l,point:xr.clone(),uv:Yi.getInterpolation(xr,jo,yr,Qo,ff,Jc,df,new xt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function ta(s,t,e,i,n,r){Ms.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(vr.x=r*Ms.x-n*Ms.y,vr.y=n*Ms.x+r*Ms.y):vr.copy(Ms),s.copy(t),s.x+=vr.x,s.y+=vr.y,s.applyMatrix4(Md)}var ln=new D,jc=new D,ea=new D,ia=new D,Kn=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ln.copy(this.origin).addScaledVector(this.direction,e),ln.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){jc.copy(t).add(e).multiplyScalar(.5),ea.copy(e).sub(t).normalize(),ia.copy(this.origin).sub(jc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ea),a=ia.dot(this.direction),l=-ia.dot(ea),c=ia.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(jc).addScaledVector(ea,d),f}intersectSphere(t,e){if(t.radius<0)return null;ln.subVectors(t.center,this.origin);let i=ln.dot(this.direction),n=ln.dot(ln)-i*i,r=t.radius*t.radius;if(n>r)return null;let o=Math.sqrt(r-n),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,n=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,n=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||r>n||((r>i||isNaN(i))&&(i=r),(o<n||isNaN(n))&&(n=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,ln)!==null}intersectTriangle(t,e,i,n,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,d=t.y-o.y,f=t.z-o.z,m=e.x-o.x,_=e.y-o.y,p=e.z-o.z,g=i.x-o.x,y=i.y-o.y,x=i.z-o.z,v=Math.abs(l),S=Math.abs(c),E=Math.abs(h),R,M,C,T,P,b,B,H,z,Y,V,j;if(v>=S&&v>=E?(C=l,b=u,z=m,j=g,l>=0?(R=c,M=h,T=d,P=f,B=_,H=p,Y=y,V=x):(R=h,M=c,T=f,P=d,B=p,H=_,Y=x,V=y)):S>=E?(C=c,b=d,z=_,j=y,c>=0?(R=h,M=l,T=f,P=u,B=p,H=m,Y=x,V=g):(R=l,M=h,T=u,P=f,B=m,H=p,Y=g,V=x)):(C=h,b=f,z=p,j=x,h>=0?(R=l,M=c,T=u,P=d,B=m,H=_,Y=g,V=y):(R=c,M=l,T=d,P=u,B=_,H=m,Y=y,V=g)),C===0)return null;let O=R/C,k=M/C,it=1/C,q=T-O*b,nt=P-k*b,Ht=B-O*z,Yt=H-k*z,Nt=Y-O*j,et=V-k*j,at=Nt*Yt-et*Ht,yt=q*et-nt*Nt,$t=Ht*nt-Yt*q;if(n){if(at<0||yt<0||$t<0)return null}else if((at<0||yt<0||$t<0)&&(at>0||yt>0||$t>0))return null;let wt=at+yt+$t;if(wt===0)return null;let w=it*(at*b+yt*z+$t*j);return(wt>0?w<0:w>0)?null:this.at(w/wt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ge=class extends ki{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Eh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},pf=new jt,Yn=new Kn,na=new Qi,mf=new D,sa=new D,ra=new D,oa=new D,Qc=new D,aa=new D,gf=new D,la=new D,Ft=class extends ke{constructor(t=new se,e=new ge){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let a=this.morphTargetInfluences;if(r&&a){aa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Qc.fromBufferAttribute(u,t),o?aa.addScaledVector(Qc,h):aa.addScaledVector(Qc.sub(e),h))}e.add(aa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),na.copy(i.boundingSphere),na.applyMatrix4(r),Yn.copy(t.ray).recast(t.near),!(na.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(na,mf)===null||Yn.origin.distanceToSquared(mf)>(t.far-t.near)**2))&&(pf.copy(r).invert(),Yn.copy(t.ray).applyMatrix4(pf),!(i.boundingBox!==null&&Yn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Yn)))}_computeIntersections(t,e,i){let n,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){let p=d[m],g=o[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,S=x;v<S;v+=3){let E=a.getX(v),R=a.getX(v+1),M=a.getX(v+2);n=ca(this,g,t,i,c,h,u,E,R,M),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let y=a.getX(p),x=a.getX(p+1),v=a.getX(p+2);n=ca(this,o,t,i,c,h,u,y,x,v),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){let p=d[m],g=o[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,S=x;v<S;v+=3){let E=v,R=v+1,M=v+2;n=ca(this,g,t,i,c,h,u,E,R,M),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{let m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let y=p,x=p+1,v=p+2;n=ca(this,o,t,i,c,h,u,y,x,v),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}}};function s0(s,t,e,i,n,r,o,a){let l;if(t.side===Oe?l=i.intersectTriangle(o,r,n,!0,a):l=i.intersectTriangle(n,r,o,t.side===In,a),l===null)return null;la.copy(a),la.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(la);return c<e.near||c>e.far?null:{distance:c,point:la.clone(),object:s}}function ca(s,t,e,i,n,r,o,a,l,c){s.getVertexPosition(a,sa),s.getVertexPosition(l,ra),s.getVertexPosition(c,oa);let h=s0(s,t,e,i,sa,ra,oa,gf);if(h){let u=new D;Yi.getBarycoord(gf,sa,ra,oa,u),n&&(h.uv=Yi.getInterpolatedAttribute(n,a,l,c,u,new xt)),r&&(h.uv1=Yi.getInterpolatedAttribute(r,a,l,c,u,new xt)),o&&(h.normal=Yi.getInterpolatedAttribute(o,a,l,c,u,new D),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new D,materialIndex:0};Yi.getNormal(sa,ra,oa,d.normal),h.face=d,h.barycoord=u}return h}var kr=class extends li{constructor(t=null,e=1,i=1,n,r,o,a,l,c=Xe,h=Xe,u,d){super(null,o,a,l,c,h,n,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zs=class extends de{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ws=new jt,_f=new jt,ha=[],xf=new ji,r0=new jt,br=new Ft,Sr=new Qi,Ke=class extends Ft{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new zs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,r0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ji),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ws),xf.copy(t.boundingBox).applyMatrix4(ws),this.boundingBox.union(xf)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ws),Sr.copy(t.boundingSphere).applyMatrix4(ws),this.boundingSphere.union(Sr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=n[o+a]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(br.geometry=this.geometry,br.material=this.material,br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sr.copy(this.boundingSphere),Sr.applyMatrix4(i),t.ray.intersectsSphere(Sr)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,ws),_f.multiplyMatrices(i,ws),br.matrixWorld=_f,br.raycast(t,ha);for(let o=0,a=ha.length;o<a;o++){let l=ha[o];l.instanceId=r,l.object=this,e.push(l)}ha.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new zs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new kr(new Float32Array(n*this.count),n,this.count,fl,Ri));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=n*t;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},$n=new Qi,o0=new xt(.5,.5),ua=new D,Hs=class{constructor(t=new $e,e=new $e,i=new $e,n=new $e,r=new $e,o=new $e){this.planes=[t,e,i,n,r,o]}set(t,e,i,n,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Oi,i=!1){let n=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],_=r[9],p=r[10],g=r[11],y=r[12],x=r[13],v=r[14],S=r[15];if(n[0].setComponents(c-o,f-h,g-m,S-y).normalize(),n[1].setComponents(c+o,f+h,g+m,S+y).normalize(),n[2].setComponents(c+a,f+u,g+_,S+x).normalize(),n[3].setComponents(c-a,f-u,g-_,S-x).normalize(),i)n[4].setComponents(l,d,p,v).normalize(),n[5].setComponents(c-l,f-d,g-p,S-v).normalize();else if(n[4].setComponents(c-l,f-d,g-p,S-v).normalize(),e===Oi)n[5].setComponents(c+l,f+d,g+p,S+v).normalize();else if(e===Ns)n[5].setComponents(l,d,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$n.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$n.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($n)}intersectsSprite(t){$n.center.set(0,0,0);let e=o0.distanceTo(t.center);return $n.radius=.7071067811865476+e,$n.applyMatrix4(t.matrixWorld),this.intersectsSphere($n)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(ua.x=n.normal.x>0?t.max.x:t.min.x,ua.y=n.normal.y>0?t.max.y:t.min.y,ua.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(ua)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ei=class extends ki{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ba=new D,Oa=new D,vf=new jt,Mr=new Kn,fa=new Qi,th=new D,yf=new D,Vs=class extends ke{constructor(t=new se,e=new Ei){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)Ba.fromBufferAttribute(e,n-1),Oa.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=Ba.distanceTo(Oa);t.setAttribute("lineDistance",new ee(i,1))}else Zt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fa.copy(i.boundingSphere),fa.applyMatrix4(n),fa.radius+=r,t.ray.intersectsSphere(fa)===!1)return;vf.copy(n).invert(),Mr.copy(t.ray).applyMatrix4(vf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=c){let g=h.getX(_),y=h.getX(_+1),x=da(this,t,Mr,l,g,y,_);x&&e.push(x)}if(this.isLineLoop){let _=h.getX(m-1),p=h.getX(f),g=da(this,t,Mr,l,_,p,m-1);g&&e.push(g)}}else{let f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=c){let g=da(this,t,Mr,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=da(this,t,Mr,l,m-1,f,m-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function da(s,t,e,i,n,r,o){let a=s.geometry.attributes.position;if(Ba.fromBufferAttribute(a,n),Oa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ba,Oa,th,yf)>i)return;th.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(th);if(!(c<t.near||c>t.far))return{distance:c,point:yf.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var bf=new D,Sf=new D,hn=class extends Vs{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)bf.fromBufferAttribute(e,n),Sf.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+bf.distanceTo(Sf);t.setAttribute("lineDistance",new ee(i,1))}else Zt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var wn=class extends ki{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Mf=new jt,uh=new Kn,pa=new Qi,ma=new D,un=class extends ke{constructor(t=new se,e=new wn){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),pa.copy(i.boundingSphere),pa.applyMatrix4(n),pa.radius+=r,t.ray.intersectsSphere(pa)===!1)return;Mf.copy(n).invert(),uh.copy(t.ray).applyMatrix4(Mf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,_=f;m<_;m++){let p=c.getX(m);ma.fromBufferAttribute(u,p),wf(ma,p,l,n,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,_=f;m<_;m++)ma.fromBufferAttribute(u,m),wf(ma,m,l,n,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function wf(s,t,e,i,n,r,o){let a=uh.distanceSqToPoint(s);if(a<e){let l=new D;uh.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var zr=class extends li{constructor(t=[],e=Pn,i,n,r,o,a,l,c,h){super(t,e,i,n,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ti=class extends li{constructor(t,e,i,n,r,o,a,l,c){super(t,e,i,n,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var En=class extends li{constructor(t,e,i=Vi,n,r,o,a=Xe,l=Xe,c,h=Ki,u=1){if(h!==Ki&&h!==Nn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,n,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Fs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ka=class extends En{constructor(t,e=Vi,i=Pn,n,r,o=Xe,a=Xe,l,c=Ki){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,n,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Hr=class extends li{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Pe=class s extends se{constructor(t=1,e=1,i=1,n=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:o};let a=this;n=Math.floor(n),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,i,e,t,o,r,0),m("z","y","x",1,-1,i,e,-t,o,r,1),m("x","z","y",1,1,t,i,e,n,o,2),m("x","z","y",1,-1,t,i,-e,n,o,3),m("x","y","z",1,-1,t,e,i,n,r,4),m("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(u,2));function m(_,p,g,y,x,v,S,E,R,M,C){let T=v/R,P=S/M,b=v/2,B=S/2,H=E/2,z=R+1,Y=M+1,V=0,j=0,O=new D;for(let k=0;k<Y;k++){let it=k*P-B;for(let q=0;q<z;q++){let nt=q*T-b;O[_]=nt*y,O[p]=it*x,O[g]=H,c.push(O.x,O.y,O.z),O[_]=0,O[p]=0,O[g]=E>0?1:-1,h.push(O.x,O.y,O.z),u.push(q/R),u.push(1-k/M),V+=1}}for(let k=0;k<M;k++)for(let it=0;it<R;it++){let q=d+it+z*k,nt=d+it+z*(k+1),Ht=d+(it+1)+z*(k+1),Yt=d+(it+1)+z*k;l.push(q,nt,Yt),l.push(nt,Ht,Yt),j+=6}a.addGroup(f,j,C),f+=j,d+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Vr=class s extends se{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new D,h=new xt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=i+u/e*n;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ee(o,3)),this.setAttribute("normal",new ee(a,3)),this.setAttribute("uv",new ee(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ui=class s extends se{constructor(t=1,e=1,i=1,n=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],u=[],d=[],f=[],m=0,_=[],p=i/2,g=0;y(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ee(u,3)),this.setAttribute("normal",new ee(d,3)),this.setAttribute("uv",new ee(f,2));function y(){let v=new D,S=new D,E=0,R=(e-t)/i;for(let M=0;M<=r;M++){let C=[],T=M/r,P=T*(e-t)+t;for(let b=0;b<=n;b++){let B=b/n,H=B*l+a,z=Math.sin(H),Y=Math.cos(H);S.x=P*z,S.y=-T*i+p,S.z=P*Y,u.push(S.x,S.y,S.z),v.set(z,R,Y).normalize(),d.push(v.x,v.y,v.z),f.push(B,1-T),C.push(m++)}_.push(C)}for(let M=0;M<n;M++)for(let C=0;C<r;C++){let T=_[C][M],P=_[C+1][M],b=_[C+1][M+1],B=_[C][M+1];(t>0||C!==0)&&(h.push(T,P,B),E+=3),(e>0||C!==r-1)&&(h.push(P,b,B),E+=3)}c.addGroup(g,E,0),g+=E}function x(v){let S=m,E=new xt,R=new D,M=0,C=v===!0?t:e,T=v===!0?1:-1;for(let b=1;b<=n;b++)u.push(0,p*T,0),d.push(0,T,0),f.push(.5,.5),m++;let P=m;for(let b=0;b<=n;b++){let H=b/n*l+a,z=Math.cos(H),Y=Math.sin(H);R.x=C*Y,R.y=p*T,R.z=C*z,u.push(R.x,R.y,R.z),d.push(0,T,0),E.x=z*.5+.5,E.y=Y*.5*T+.5,f.push(E.x,E.y),m++}for(let b=0;b<n;b++){let B=S+b,H=P+b;v===!0?h.push(H,H+1,B):h.push(H+1,H,B),M+=3}c.addGroup(g,M,v===!0?1:2),g+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Gr=class s extends ui{constructor(t=1,e=1,i=32,n=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,n,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Wr=class s extends se{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};let r=[],o=[];a(n),c(i),h(),this.setAttribute("position",new ee(r,3)),this.setAttribute("normal",new ee(r.slice(),3)),this.setAttribute("uv",new ee(o,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let x=new D,v=new D,S=new D;for(let E=0;E<e.length;E+=3)f(e[E+0],x),f(e[E+1],v),f(e[E+2],S),l(x,v,S,y)}function l(y,x,v,S){let E=S+1,R=[];for(let M=0;M<=E;M++){R[M]=[];let C=y.clone().lerp(v,M/E),T=x.clone().lerp(v,M/E),P=E-M;for(let b=0;b<=P;b++)b===0&&M===E?R[M][b]=C:R[M][b]=C.clone().lerp(T,b/P)}for(let M=0;M<E;M++)for(let C=0;C<2*(E-M)-1;C++){let T=Math.floor(C/2);C%2===0?(d(R[M][T+1]),d(R[M+1][T]),d(R[M][T])):(d(R[M][T+1]),d(R[M+1][T+1]),d(R[M+1][T]))}}function c(y){let x=new D;for(let v=0;v<r.length;v+=3)x.x=r[v+0],x.y=r[v+1],x.z=r[v+2],x.normalize().multiplyScalar(y),r[v+0]=x.x,r[v+1]=x.y,r[v+2]=x.z}function h(){let y=new D;for(let x=0;x<r.length;x+=3){y.x=r[x+0],y.y=r[x+1],y.z=r[x+2];let v=p(y)/2/Math.PI+.5,S=g(y)/Math.PI+.5;o.push(v,1-S)}m(),u()}function u(){for(let y=0;y<o.length;y+=6){let x=o[y+0],v=o[y+2],S=o[y+4],E=Math.max(x,v,S),R=Math.min(x,v,S);E>.9&&R<.1&&(x<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),S<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,x){let v=y*3;x.x=t[v+0],x.y=t[v+1],x.z=t[v+2]}function m(){let y=new D,x=new D,v=new D,S=new D,E=new xt,R=new xt,M=new xt;for(let C=0,T=0;C<r.length;C+=9,T+=6){y.set(r[C+0],r[C+1],r[C+2]),x.set(r[C+3],r[C+4],r[C+5]),v.set(r[C+6],r[C+7],r[C+8]),E.set(o[T+0],o[T+1]),R.set(o[T+2],o[T+3]),M.set(o[T+4],o[T+5]),S.copy(y).add(x).add(v).divideScalar(3);let P=p(S);_(E,T+0,y,P),_(R,T+2,x,P),_(M,T+4,v,P)}}function _(y,x,v,S){S<0&&y.x===1&&(o[x]=y.x-1),v.x===0&&v.z===0&&(o[x]=S/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function g(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}};var ga=new D,_a=new D,eh=new D,xa=new Yi,Xr=class extends se{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let n=Math.pow(10,4),r=Math.cos(Rs*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:_,b:p,c:g}=xa;if(_.fromBufferAttribute(a,c[0]),p.fromBufferAttribute(a,c[1]),g.fromBufferAttribute(a,c[2]),xa.getNormal(eh),u[0]=`${Math.round(_.x*n)},${Math.round(_.y*n)},${Math.round(_.z*n)}`,u[1]=`${Math.round(p.x*n)},${Math.round(p.y*n)},${Math.round(p.z*n)}`,u[2]=`${Math.round(g.x*n)},${Math.round(g.y*n)},${Math.round(g.z*n)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){let x=(y+1)%3,v=u[y],S=u[x],E=xa[h[y]],R=xa[h[x]],M=`${v}_${S}`,C=`${S}_${v}`;C in d&&d[C]?(eh.dot(d[C].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(R.x,R.y,R.z)),d[C]=null):M in d||(d[M]={index0:c[y],index1:c[x],normal:eh.clone()})}}for(let m in d)if(d[m]){let{index0:_,index1:p}=d[m];ga.fromBufferAttribute(a,_),_a.fromBufferAttribute(a,p),f.push(ga.x,ga.y,ga.z),f.push(_a.x,_a.y,_a.z)}this.setAttribute("position",new ee(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},gi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Zt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,n=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(n),e.push(r),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),n=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(n=Math.floor(a+(l-a)/2),c=i[n]-o,c<0)a=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===o)return n/(r-1);let h=i[n],d=i[n+1]-h,f=(o-h)/d;return(n+f)/(r-1)}getTangent(t,e){let n=t-1e-4,r=t+1e-4;n<0&&(n=0),r>1&&(r=1);let o=this.getPoint(n),a=this.getPoint(r),l=e||(o.isVector2?new xt:new D);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new D,n=[],r=[],o=[],a=new D,l=new jt;for(let f=0;f<=t;f++){let m=f/t;n[f]=this.getTangentAt(m,new D)}r[0]=new D,o[0]=new D;let c=Number.MAX_VALUE,h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],a),o[0].crossVectors(n[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(n[f-1],n[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(ae(n[f-1].dot(n[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(n[f],r[f])}if(e===!0){let f=Math.acos(ae(r[0].dot(r[t]),-1,1));f/=t,n[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(n[m],f*m)),o[m].crossVectors(n[m],r[m])}return{tangents:n,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Gs=class extends gi{constructor(t=0,e=0,i=1,n=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new xt){let i=e,n=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(o?r=0:r=n),this.aClockwise===!0&&!o&&(r===n?r=-n:r=r-n);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},za=class extends Gs{constructor(t,e,i,n,r,o){super(t,e,i,i,n,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Fh(){let s=0,t=0,e=0,i=0;function n(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){n(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,n(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+i*a}}}var Ef=new D,Tf=new D,ih=new Fh,nh=new Fh,sh=new Fh,Ws=class extends gi{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new D){let i=e,n=this.points,r=n.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=n[(a-1)%r]:(Tf.subVectors(n[0],n[1]).add(n[0]),c=Tf);let u=n[a%r],d=n[(a+1)%r];if(this.closed||a+2<r?h=n[(a+2)%r]:(Ef.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=Ef),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),ih.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,_,p),nh.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,_,p),sh.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(ih.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),nh.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),sh.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(ih.calc(l),nh.calc(l),sh.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(new D().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Af(s,t,e,i,n){let r=(i-t)*.5,o=(n-e)*.5,a=s*s,l=s*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*s+e}function a0(s,t){let e=1-s;return e*e*t}function l0(s,t){return 2*(1-s)*s*t}function c0(s,t){return s*s*t}function Tr(s,t,e,i){return a0(s,t)+l0(s,e)+c0(s,i)}function h0(s,t){let e=1-s;return e*e*e*t}function u0(s,t){let e=1-s;return 3*e*e*s*t}function f0(s,t){return 3*(1-s)*s*s*t}function d0(s,t){return s*s*s*t}function Ar(s,t,e,i,n){return h0(s,t)+u0(s,e)+f0(s,i)+d0(s,n)}var qr=class extends gi{constructor(t=new xt,e=new xt,i=new xt,n=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new xt){let i=e,n=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ar(t,n.x,r.x,o.x,a.x),Ar(t,n.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ha=class extends gi{constructor(t=new D,e=new D,i=new D,n=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new D){let i=e,n=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ar(t,n.x,r.x,o.x,a.x),Ar(t,n.y,r.y,o.y,a.y),Ar(t,n.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Yr=class extends gi{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Va=class extends gi{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$r=class extends gi{constructor(t=new xt,e=new xt,i=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new xt){let i=e,n=this.v0,r=this.v1,o=this.v2;return i.set(Tr(t,n.x,r.x,o.x),Tr(t,n.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Zr=class extends gi{constructor(t=new D,e=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new D){let i=e,n=this.v0,r=this.v1,o=this.v2;return i.set(Tr(t,n.x,r.x,o.x),Tr(t,n.y,r.y,o.y),Tr(t,n.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Kr=class extends gi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){let i=e,n=this.points,r=(n.length-1)*t,o=Math.floor(r),a=r-o,l=n[o===0?o:o-1],c=n[o],h=n[o>n.length-2?n.length-1:o+1],u=n[o>n.length-3?n.length-1:o+2];return i.set(Af(a,l.x,c.x,h.x,u.x),Af(a,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(n.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(new xt().fromArray(n))}return this}},fh=Object.freeze({__proto__:null,ArcCurve:za,CatmullRomCurve3:Ws,CubicBezierCurve:qr,CubicBezierCurve3:Ha,EllipseCurve:Gs,LineCurve:Yr,LineCurve3:Va,QuadraticBezierCurve:$r,QuadraticBezierCurve3:Zr,SplineCurve:Kr}),Ga=class extends gi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fh[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),n=this.getCurveLengths(),r=0;for(;r<n.length;){if(n[r]>=i){let o=n[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,n=this.curves.length;i<n;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let n=0,r=this.curves;n<r.length;n++){let o=r[n],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let n=t.curves[e];this.curves.push(n.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let n=this.curves[e];t.curves.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let n=t.curves[e];this.curves.push(new fh[n.type]().fromJSON(n))}return this}},Jr=class extends Ga{constructor(t){super(),this.type="Path",this.currentPoint=new xt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Yr(this.currentPoint.clone(),new xt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,n){let r=new $r(this.currentPoint.clone(),new xt(t,e),new xt(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(t,e,i,n,r,o){let a=new qr(this.currentPoint.clone(),new xt(t,e),new xt(i,n),new xt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Kr(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,n,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,n,r,o),this}absarc(t,e,i,n,r,o){return this.absellipse(t,e,i,i,n,r,o),this}ellipse(t,e,i,n,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,n,r,o,a,l),this}absellipse(t,e,i,n,r,o,a,l){let c=new Gs(t,e,i,n,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Xs=class extends Jr{constructor(t){super(t),this.uuid=Zi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,n=this.holes.length;i<n;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let n=t.holes[e];this.holes.push(n.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let n=this.holes[e];t.holes.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let n=t.holes[e];this.holes.push(new Jr().fromJSON(n))}return this}};function p0(s,t,e=2){let i=t&&t.length,n=i?t[0]*e:s.length,r=wd(s,0,n,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=v0(s,t,r,e)),s.length>80*e){a=s[0],l=s[1];let h=a,u=l;for(let d=e;d<n;d+=e){let f=s[d],m=s[d+1];f<a&&(a=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return jr(r,o,e,a,l,c,0),o}function wd(s,t,e,i,n){let r;if(n===I0(s,t,e,i)>0)for(let o=t;o<e;o+=i)r=Rf(o/i|0,s[o],s[o+1],r);else for(let o=e-i;o>=t;o-=i)r=Rf(o/i|0,s[o],s[o+1],r);return r&&qs(r,r.next)&&(to(r),r=r.next),r}function Jn(s,t){if(!s)return s;t||(t=s);let e=s,i;do if(i=!1,!e.steiner&&(qs(e,e.next)||Ce(e.prev,e,e.next)===0)){if(to(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function jr(s,t,e,i,n,r,o){if(!s)return;!o&&r&&w0(s,i,n,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?g0(s,i,n,r):m0(s)){t.push(l.i,s.i,c.i),to(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=_0(Jn(s),t),jr(s,t,e,i,n,r,2)):o===2&&x0(s,t,e,i,n,r):jr(Jn(s),t,e,i,n,r,1);break}}}function m0(s){let t=s.prev,e=s,i=s.next;if(Ce(t,e,i)>=0)return!1;let n=t.x,r=e.x,o=i.x,a=t.y,l=e.y,c=i.y,h=Math.min(n,r,o),u=Math.min(a,l,c),d=Math.max(n,r,o),f=Math.max(a,l,c),m=i.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&wr(n,a,r,l,o,c,m.x,m.y)&&Ce(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function g0(s,t,e,i){let n=s.prev,r=s,o=s.next;if(Ce(n,r,o)>=0)return!1;let a=n.x,l=r.x,c=o.x,h=n.y,u=r.y,d=o.y,f=Math.min(a,l,c),m=Math.min(h,u,d),_=Math.max(a,l,c),p=Math.max(h,u,d),g=dh(f,m,t,e,i),y=dh(_,p,t,e,i),x=s.prevZ,v=s.nextZ;for(;x&&x.z>=g&&v&&v.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=p&&x!==n&&x!==o&&wr(a,h,l,u,c,d,x.x,x.y)&&Ce(x.prev,x,x.next)>=0||(x=x.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=p&&v!==n&&v!==o&&wr(a,h,l,u,c,d,v.x,v.y)&&Ce(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;x&&x.z>=g;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=p&&x!==n&&x!==o&&wr(a,h,l,u,c,d,x.x,x.y)&&Ce(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=p&&v!==n&&v!==o&&wr(a,h,l,u,c,d,v.x,v.y)&&Ce(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function _0(s,t){let e=s;do{let i=e.prev,n=e.next.next;!qs(i,n)&&Td(i,e,e.next,n)&&Qr(i,n)&&Qr(n,i)&&(t.push(i.i,e.i,n.i),to(e),to(e.next),e=s=n),e=e.next}while(e!==s);return Jn(e)}function x0(s,t,e,i,n,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&A0(o,a)){let l=Ad(o,a);o=Jn(o,o.next),l=Jn(l,l.next),jr(o,t,e,i,n,r,0),jr(l,t,e,i,n,r,0);return}a=a.next}o=o.next}while(o!==s)}function v0(s,t,e,i){let n=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*i,l=r<o-1?t[r+1]*i:s.length,c=wd(s,a,l,i,!1);c===c.next&&(c.steiner=!0),n.push(T0(c))}n.sort(y0);for(let r=0;r<n.length;r++)e=b0(n[r],e);return e}function y0(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let i=(s.next.y-s.y)/(s.next.x-s.x),n=(t.next.y-t.y)/(t.next.x-t.x);e=i-n}return e}function b0(s,t){let e=S0(s,t);if(!e)return t;let i=Ad(e,s);return Jn(i,i.next),Jn(e,e.next)}function S0(s,t){let e=t,i=s.x,n=s.y,r=-1/0,o;if(qs(s,e))return e;do{if(qs(s,e.next))return e.next;if(n<=e.y&&n>=e.next.y&&e.next.y!==e.y){let u=e.x+(n-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=i&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===i))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Ed(n<c?i:r,n,l,c,n<c?r:i,n,e.x,e.y)){let u=Math.abs(n-e.y)/(i-e.x);Qr(e,s)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&M0(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function M0(s,t){return Ce(s.prev,s,t.prev)<0&&Ce(t.next,s,s.next)<0}function w0(s,t,e,i){let n=s;do n.z===0&&(n.z=dh(n.x,n.y,t,e,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,E0(n)}function E0(s){let t,e=1;do{let i=s,n;s=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(n=i,i=i.nextZ,a--):(n=o,o=o.nextZ,l--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;i=o}r.nextZ=null,e*=2}while(t>1);return s}function dh(s,t,e,i,n){return s=(s-e)*n|0,t=(t-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function T0(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ed(s,t,e,i,n,r,o,a){return(n-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(n-o)*(i-a)}function wr(s,t,e,i,n,r,o,a){return!(s===o&&t===a)&&Ed(s,t,e,i,n,r,o,a)}function A0(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!R0(s,t)&&(Qr(s,t)&&Qr(t,s)&&C0(s,t)&&(Ce(s.prev,s,t.prev)||Ce(s,t.prev,t))||qs(s,t)&&Ce(s.prev,s,s.next)>0&&Ce(t.prev,t,t.next)>0)}function Ce(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function qs(s,t){return s.x===t.x&&s.y===t.y}function Td(s,t,e,i){let n=ya(Ce(s,t,e)),r=ya(Ce(s,t,i)),o=ya(Ce(e,i,s)),a=ya(Ce(e,i,t));return!!(n!==r&&o!==a||n===0&&va(s,e,t)||r===0&&va(s,i,t)||o===0&&va(e,s,i)||a===0&&va(e,t,i))}function va(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function ya(s){return s>0?1:s<0?-1:0}function R0(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Td(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Qr(s,t){return Ce(s.prev,s,s.next)<0?Ce(s,t,s.next)>=0&&Ce(s,s.prev,t)>=0:Ce(s,t,s.prev)<0||Ce(s,s.next,t)<0}function C0(s,t){let e=s,i=!1,n=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&n<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==s);return i}function Ad(s,t){let e=ph(s.i,s.x,s.y),i=ph(t.i,t.x,t.y),n=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=n,n.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Rf(s,t,e,i){let n=ph(s,t,e);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function to(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ph(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function I0(s,t,e,i){let n=0;for(let r=t,o=e-i;r<e;r+=i)n+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return n}var mh=class{static triangulate(t,e,i=2){return p0(t,e,i)}},Is=class s{static area(t){let e=t.length,i=0;for(let n=e-1,r=0;r<e;n=r++)i+=t[n].x*t[r].y-t[r].x*t[n].y;return i*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let i=[],n=[],r=[];Cf(t),If(i,t);let o=t.length;e.forEach(Cf);for(let l=0;l<e.length;l++)n.push(o),o+=e[l].length,If(i,e[l]);let a=mh.triangulate(i,n);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Cf(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function If(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var eo=class s extends Wr{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var io=class s extends Wr{constructor(t=1,e=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},ni=class s extends se{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(n),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],_=[],p=[];for(let g=0;g<h;g++){let y=g*d-o;for(let x=0;x<c;x++){let v=x*u-r;m.push(v,-y,0),_.push(0,0,1),p.push(x/a),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<a;y++){let x=y+c*g,v=y+c*(g+1),S=y+1+c*(g+1),E=y+1+c*g;f.push(x,v,E),f.push(v,S,E)}this.setIndex(f),this.setAttribute("position",new ee(m,3)),this.setAttribute("normal",new ee(_,3)),this.setAttribute("uv",new ee(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},no=class s extends se{constructor(t=.5,e=1,i=32,n=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:o},i=Math.max(3,i),n=Math.max(1,n);let a=[],l=[],c=[],h=[],u=t,d=(e-t)/n,f=new D,m=new xt;for(let _=0;_<=n;_++){for(let p=0;p<=i;p++){let g=r+p/i*o;f.x=u*Math.cos(g),f.y=u*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<n;_++){let p=_*(i+1);for(let g=0;g<i;g++){let y=g+p,x=y,v=y+i+1,S=y+i+2,E=y+1;a.push(x,v,E),a.push(v,S,E)}}this.setIndex(a),this.setAttribute("position",new ee(l,3)),this.setAttribute("normal",new ee(c,3)),this.setAttribute("uv",new ee(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},so=class s extends se{constructor(t=new Xs([new xt(0,.5),new xt(-.5,-.5),new xt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let i=[],n=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new ee(n,3)),this.setAttribute("normal",new ee(r,3)),this.setAttribute("uv",new ee(o,2));function c(h){let u=n.length/3,d=h.extractPoints(e),f=d.shape,m=d.holes;Is.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,g=m.length;p<g;p++){let y=m[p];Is.isClockWise(y)===!0&&(m[p]=y.reverse())}let _=Is.triangulateShape(f,m);for(let p=0,g=m.length;p<g;p++){let y=m[p];f=f.concat(y)}for(let p=0,g=f.length;p<g;p++){let y=f[p];n.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let p=0,g=_.length;p<g;p++){let y=_[p],x=y[0]+u,v=y[1]+u,S=y[2]+u;i.push(x,v,S),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return P0(e,t)}static fromJSON(t,e){let i=[];for(let n=0,r=t.shapes.length;n<r;n++){let o=e[t.shapes[n]];i.push(o)}return new s(i,t.curveSegments)}};function P0(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,i=s.length;e<i;e++){let n=s[e];t.shapes.push(n.uuid)}else t.shapes.push(s.uuid);return t}var tn=class s extends se{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new D,d=new D,f=[],m=[],_=[],p=[];for(let g=0;g<=i;g++){let y=[],x=g/i,v=o+x*a,S=t*Math.cos(v),E=Math.sqrt(t*t-S*S),R=0;g===0&&o===0?R=.5/e:g===i&&l===Math.PI&&(R=-.5/e);for(let M=0;M<=e;M++){let C=M/e,T=n+C*r;u.x=-E*Math.cos(T),u.y=S,u.z=E*Math.sin(T),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(C+R,1-x),y.push(c++)}h.push(y)}for(let g=0;g<i;g++)for(let y=0;y<e;y++){let x=h[g][y+1],v=h[g][y],S=h[g+1][y],E=h[g+1][y+1];(g!==0||o>0)&&f.push(x,v,E),(g!==i-1||l<Math.PI)&&f.push(v,S,E)}this.setIndex(f),this.setAttribute("position",new ee(m,3)),this.setAttribute("normal",new ee(_,3)),this.setAttribute("uv",new ee(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var zi=class s extends se{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],u=[],d=new D,f=new D,m=new D;for(let _=0;_<=i;_++){let p=o+_/i*a;for(let g=0;g<=n;g++){let y=g/n*r;f.x=(t+e*Math.cos(p))*Math.cos(y),f.y=(t+e*Math.cos(p))*Math.sin(y),f.z=e*Math.sin(p),c.push(f.x,f.y,f.z),d.x=t*Math.cos(y),d.y=t*Math.sin(y),m.subVectors(f,d).normalize(),h.push(m.x,m.y,m.z),u.push(g/n),u.push(_/i)}}for(let _=1;_<=i;_++)for(let p=1;p<=n;p++){let g=(n+1)*_+p-1,y=(n+1)*(_-1)+p-1,x=(n+1)*(_-1)+p,v=(n+1)*_+p;l.push(g,y,v),l.push(y,x,v)}this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var Ys=class s extends se{constructor(t=new Zr(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:n,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new D,l=new D,c=new xt,h=new D,u=[],d=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new ee(u,3)),this.setAttribute("normal",new ee(d,3)),this.setAttribute("uv",new ee(f,2));function _(){for(let x=0;x<e;x++)p(x);p(r===!1?e:0),y(),g()}function p(x){h=t.getPointAt(x/e,h);let v=o.normals[x],S=o.binormals[x];for(let E=0;E<=n;E++){let R=E/n*Math.PI*2,M=Math.sin(R),C=-Math.cos(R);l.x=C*v.x+M*S.x,l.y=C*v.y+M*S.y,l.z=C*v.z+M*S.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+i*l.x,a.y=h.y+i*l.y,a.z=h.z+i*l.z,u.push(a.x,a.y,a.z)}}function g(){for(let x=1;x<=e;x++)for(let v=1;v<=n;v++){let S=(n+1)*(x-1)+(v-1),E=(n+1)*x+(v-1),R=(n+1)*x+v,M=(n+1)*(x-1)+v;m.push(S,E,M),m.push(E,R,M)}}function y(){for(let x=0;x<=e;x++)for(let v=0;v<=n;v++)c.x=x/e,c.y=v/n,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new s(new fh[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function ts(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Pf(n))n.isRenderTargetTexture?(Zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Pf(n[0])){let r=[];for(let o=0,a=n.length;o<a;o++)r[o]=n[o].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function si(s){let t={};for(let e=0;e<s.length;e++){let i=ts(s[e]);for(let n in i)t[n]=i[n]}return t}function Pf(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function L0(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Bh(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var dn={clone:ts,merge:si},N0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,D0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ce=class extends ki{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=N0,this.fragmentShader=D0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ts(t.uniforms),this.uniformsGroups=L0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let o=this.uniforms[n].value;o&&o.isTexture?e.uniforms[n]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[n]={type:"m4",value:o.toArray()}:e.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new dt().setHex(n.value);break;case"v2":this.uniforms[i].value=new xt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new D().fromArray(n.value);break;case"v4":this.uniforms[i].value=new Re().fromArray(n.value);break;case"m3":this.uniforms[i].value=new ie().fromArray(n.value);break;case"m4":this.uniforms[i].value=new jt().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},$s=class extends ce{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ci=class extends ki{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ql,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Wa=class extends ki{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Xa=class extends ki{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Es(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function rh(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var Tn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];t:{e:{let o;i:{n:if(!(t<n)){for(let a=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=n,n=e[++i],t<n)break e}o=e.length;break i}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break e}o=i,i=0;break i}break t}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let o=0;o!==n;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},qa=class extends Tn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:lh,endingEnd:lh}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,o=t+1,a=n[r],l=n[o];if(a===void 0)switch(this.getSettings_().endingStart){case ch:r=t,a=2*e-i;break;case hh:r=n.length-2,a=e+n[r]-n[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ch:o=t,l=2*i-e;break;case hh:o=1,l=i+n[1]-n[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(i-e)/(n-e),_=m*m,p=_*m,g=-d*p+2*d*_-d*m,y=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*m+1,x=(-1-f)*p+(1.5+f)*_+.5*m,v=f*p-f*_;for(let S=0;S!==a;++S)r[S]=g*o[h+S]+y*o[c+S]+x*o[l+S]+v*o[u+S];return r}},Ya=class extends Tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(n-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},$a=class extends Tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},Za=class extends Tn{interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(i-e)/(n-e),_=1-m;for(let p=0;p!==a;++p)r[p]=o[c+p]*_+o[l+p]*m;return r}let d=a*2,f=t-1;for(let m=0;m!==a;++m){let _=o[c+m],p=o[l+m],g=f*d+m*2,y=u[g],x=u[g+1],v=t*d+m*2,S=h[v],E=h[v+1],R=F0(i,e,y,S,n);r[m]=Rd(R,_,x,E,p)}return r}};function Rd(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function U0(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function F0(s,t,e,i,n){let r=(s-t)/(n-t);for(let o=0;o<8;o++){let a=Rd(r,t,e,i,n)-s;if(Math.abs(a)<1e-10)break;let l=U0(r,t,e,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var _i=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Es(e,this.TimeBufferType),this.values=Es(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Es(t.times,Array),values:Es(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),rh(t.settings)&&(i.settings={inTangents:Es(t.settings.inTangents,Array),outTangents:Es(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new $a(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ya(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new qa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Za(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Rr:e=this.InterpolantFactoryMethodDiscrete;break;case Na:e=this.InterpolantFactoryMethodLinear;break;case Ma:e=this.InterpolantFactoryMethodSmooth;break;case ah:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Zt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rr;case this.InterpolantFactoryMethodLinear:return Na;case this.InterpolantFactoryMethodSmooth:return Ma;case this.InterpolantFactoryMethodBezier:return ah}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;rh(this.settings)&&(Lf(this.settings.inTangents,t),Lf(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,o=n-1;for(;r!==n&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==n){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Kt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Kt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){Kt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Kt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(n!==void 0&&Em(n))for(let a=0,l=n.length;a!==l;++a){let c=n[a];if(isNaN(c)){Kt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===Ma,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(n)l=!0;else{let u=a*i,d=u-i,f=u+i;for(let m=0;m!==i;++m){let _=e[u+m];if(_!==e[d+m]||_!==e[f+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*i,d=o*i;for(let f=0;f!==i;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,rh(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Lf(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}_i.prototype.ValueTypeName="";_i.prototype.TimeBufferType=Float32Array;_i.prototype.ValueBufferType=Float32Array;_i.prototype.DefaultInterpolation=Na;var An=class extends _i{constructor(t,e,i){super(t,e,i)}};An.prototype.ValueTypeName="bool";An.prototype.ValueBufferType=Array;An.prototype.DefaultInterpolation=Rr;An.prototype.InterpolantFactoryMethodLinear=void 0;An.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends _i{constructor(t,e,i,n){super(t,e,i,n)}};Ka.prototype.ValueTypeName="color";var Ja=class extends _i{constructor(t,e,i,n){super(t,e,i,n)}};Ja.prototype.ValueTypeName="number";var ja=class extends Tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(n-e),c=t*a;for(let h=c+a;c!==h;c+=4)qe.slerpFlat(r,0,o,c-a,o,c,l);return r}},ro=class extends _i{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new ja(this.times,this.values,this.getValueSize(),t)}};ro.prototype.ValueTypeName="quaternion";ro.prototype.InterpolantFactoryMethodSmooth=void 0;var Rn=class extends _i{constructor(t,e,i){super(t,e,i)}};Rn.prototype.ValueTypeName="string";Rn.prototype.ValueBufferType=Array;Rn.prototype.DefaultInterpolation=Rr;Rn.prototype.InterpolantFactoryMethodLinear=void 0;Rn.prototype.InterpolantFactoryMethodSmooth=void 0;var Qa=class extends _i{constructor(t,e,i,n){super(t,e,i,n)}};Qa.prototype.ValueTypeName="vector";var tl=class{constructor(t,e,i){let n=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,r===!1&&n.onStart!==void 0&&n.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,n.onProgress!==void 0&&n.onProgress(h,o,a),o===a&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Cd=new tl,el=class{constructor(t){this.manager=t!==void 0?t:Cd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};el.DEFAULT_MATERIAL_NAME="__DEFAULT";var oo=class extends ke{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new dt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},ao=class extends oo{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},oh=new jt,Nf=new D,Df=new D,il=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.mapType=fi,this.map=null,this.mapPass=null,this.matrix=new jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hs,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Nf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nf),Df.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Df),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){oh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(oh,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=n?n.z/r.x:1,a=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;t.coordinateSystem===Ns||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(oh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ba=new D,Sa=new qe,qi=new D,lo=class extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jt,this.projectionMatrix=new jt,this.projectionMatrixInverse=new jt,this.coordinateSystem=Oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ba,Sa,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ba,Sa,qi.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ba,Sa,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ba,Sa,qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Mn=new D,Uf=new xt,Ff=new xt,ii=class extends lo{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Us*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Us*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Mn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Mn.x,Mn.y).multiplyScalar(-t/Mn.z),Mn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Mn.x,Mn.y).multiplyScalar(-t/Mn.z)}getViewSize(t,e){return this.getViewBounds(t,Uf,Ff),e.subVectors(Ff,Uf)}setViewOffset(t,e,i,n,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Rs*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*n/l,e-=o.offsetY*i/c,n*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Cn=class extends lo{constructor(t=-1,e=1,i=1,n=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,o=i+t,a=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},gh=class extends il{constructor(){super(new Cn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},co=class extends oo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new gh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Ts=-90,As=1,nl=class extends ke{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new ii(Ts,As,t,e);n.layers=this.layers,this.add(n);let r=new ii(Ts,As,t,e);r.layers=this.layers,this.add(r);let o=new ii(Ts,As,t,e);o.layers=this.layers,this.add(o);let a=new ii(Ts,As,t,e);a.layers=this.layers,this.add(a);let l=new ii(Ts,As,t,e);l.layers=this.layers,this.add(l);let c=new ii(Ts,As,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Oi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ns)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,n),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,n),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,n),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},sl=class extends ii{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},ho=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=B0.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function B0(){this._document.hidden===!1&&this.reset()}var Oh="\\[\\]\\.:\\/",O0=new RegExp("["+Oh+"]","g"),kh="[^"+Oh+"]",k0="[^"+Oh.replace("\\.","")+"]",z0=/((?:WC+[\/:])*)/.source.replace("WC",kh),H0=/(WCOD+)?/.source.replace("WCOD",k0),V0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kh),G0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kh),W0=new RegExp("^"+z0+H0+V0+G0+"$"),X0=["material","materials","bones","map"],_h=class{constructor(t,e,i){let n=i||Te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Te=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(O0,"")}static parseTrackName(t){let e=W0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);X0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Zt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Kt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Kt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Kt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Kt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Kt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[n];if(o===void 0){let c=e.nodeName;Kt("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=_h;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Vb=new Float32Array(1);var Bf=new jt,uo=class{constructor(t,e,i=0,n=1/0){this.ray=new Kn(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new Bs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Kt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Bf.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bf),this}intersectObject(t,e=!0,i=[]){return xh(t,this,i,e),i.sort(Of),i}intersectObjects(t,e=!0,i=[]){for(let n=0,r=t.length;n<r;n++)xh(t[n],this,i,e);return i.sort(Of),i}};function Of(s,t){return s.distance-t.distance}function xh(s,t,e,i){let n=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)xh(r[o],t,e,!0)}}var Xh=class Xh{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};Xh.prototype.isMatrix2=!0;var vh=Xh;function zh(s,t,e,i){let n=q0(i);switch(e){case Ph:return s*t;case fl:return s*t/n.components*n.byteLength;case dl:return s*t/n.components*n.byteLength;case Dn:return s*t*2/n.components*n.byteLength;case pl:return s*t*2/n.components*n.byteLength;case Lh:return s*t*3/n.components*n.byteLength;case Ci:return s*t*4/n.components*n.byteLength;case ml:return s*t*4/n.components*n.byteLength;case Mo:case wo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Eo:case To:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case _l:case vl:return Math.max(s,16)*Math.max(t,8)/4;case gl:case xl:return Math.max(s,8)*Math.max(t,8)/2;case yl:case bl:case Ml:case wl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Sl:case Ao:case El:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Tl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Al:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Rl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Cl:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Il:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Pl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ll:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Nl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Dl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ul:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Fl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Bl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ol:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case kl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case zl:case Hl:case Vl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Gl:case Wl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ro:case Xl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function q0(s){switch(s){case fi:case Ah:return{byteLength:1,components:1};case Js:case Rh:case Je:return{byteLength:2,components:1};case hl:case ul:return{byteLength:2,components:4};case Vi:case cl:case Ri:return{byteLength:4,components:1};case Ch:case Ih:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Jd(){let s=null,t=!1,e=null,i=null;function n(r,o){i=s.requestAnimationFrame(n),e(r,o)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function J0(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let _=u[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:n,remove:r,update:o}}var j0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Q0=`#ifdef USE_ALPHAHASH
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
#endif`,tg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,eg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ig=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ng=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sg=`#ifdef USE_AOMAP
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
#endif`,rg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,og=`#ifdef USE_BATCHING
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
#endif`,ag=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ug=`#ifdef USE_IRIDESCENCE
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
#endif`,fg=`#ifdef USE_BUMPMAP
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
#endif`,dg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_g=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,vg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,bg=`#define PI 3.141592653589793
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
} // validated`,Sg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mg=`vec3 transformedNormal = objectNormal;
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
#endif`,wg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Eg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ag=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ig=`#ifdef USE_ENVMAP
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
#endif`,Pg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Lg=`#ifdef USE_ENVMAP
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
#endif`,Ng=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dg=`#ifdef USE_ENVMAP
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
#endif`,Ug=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Og=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kg=`#ifdef USE_GRADIENTMAP
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
}`,zg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Wg=`#ifdef USE_ENVMAP
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
#endif`,Xg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$g=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zg=`PhysicalMaterial material;
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
#endif`,Kg=`uniform sampler2D dfgLUT;
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
}`,Jg=`
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
#endif`,jg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,t_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,e_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,i_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,n_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,r_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,o_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,a_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,l_=`#if defined( USE_POINTS_UV )
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
#endif`,c_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,h_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,u_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,f_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,d_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,p_=`#ifdef USE_MORPHTARGETS
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
#endif`,m_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,__=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,x_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,y_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,b_=`#ifdef USE_NORMALMAP
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
#endif`,S_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,M_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,w_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,E_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,T_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,A_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,R_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,C_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,I_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,P_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,L_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,N_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,D_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,U_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B_=`float getShadowMask() {
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
}`,O_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,k_=`#ifdef USE_SKINNING
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
#endif`,z_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,H_=`#ifdef USE_SKINNING
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
#endif`,V_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,G_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,W_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,X_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,q_=`#ifdef USE_TRANSMISSION
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
#endif`,Y_=`#ifdef USE_TRANSMISSION
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
#endif`,$_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,K_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,j_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Q_=`uniform sampler2D t2D;
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
}`,tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ex=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sx=`#include <common>
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
}`,rx=`#if DEPTH_PACKING == 3200
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
}`,ox=`#define DISTANCE
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
}`,ax=`#define DISTANCE
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
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hx=`uniform float scale;
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
}`,ux=`uniform vec3 diffuse;
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
}`,fx=`#include <common>
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
}`,dx=`uniform vec3 diffuse;
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
}`,px=`#define LAMBERT
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
}`,mx=`#define LAMBERT
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
}`,gx=`#define MATCAP
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
}`,_x=`#define MATCAP
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
}`,xx=`#define NORMAL
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
}`,vx=`#define NORMAL
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
}`,yx=`#define PHONG
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
}`,bx=`#define PHONG
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
}`,Sx=`#define STANDARD
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
}`,Mx=`#define STANDARD
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
}`,wx=`#define TOON
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
}`,Ex=`#define TOON
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
}`,Tx=`uniform float size;
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
}`,Ax=`uniform vec3 diffuse;
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
}`,Rx=`#include <common>
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
}`,Cx=`uniform vec3 color;
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
}`,Ix=`uniform float rotation;
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
}`,Px=`uniform vec3 diffuse;
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
}`,re={alphahash_fragment:j0,alphahash_pars_fragment:Q0,alphamap_fragment:tg,alphamap_pars_fragment:eg,alphatest_fragment:ig,alphatest_pars_fragment:ng,aomap_fragment:sg,aomap_pars_fragment:rg,batching_pars_vertex:og,batching_vertex:ag,begin_vertex:lg,beginnormal_vertex:cg,bsdfs:hg,iridescence_fragment:ug,bumpmap_pars_fragment:fg,clipping_planes_fragment:dg,clipping_planes_pars_fragment:pg,clipping_planes_pars_vertex:mg,clipping_planes_vertex:gg,color_fragment:_g,color_pars_fragment:xg,color_pars_vertex:vg,color_vertex:yg,common:bg,cube_uv_reflection_fragment:Sg,defaultnormal_vertex:Mg,displacementmap_pars_vertex:wg,displacementmap_vertex:Eg,emissivemap_fragment:Tg,emissivemap_pars_fragment:Ag,colorspace_fragment:Rg,colorspace_pars_fragment:Cg,envmap_fragment:Ig,envmap_common_pars_fragment:Pg,envmap_pars_fragment:Lg,envmap_pars_vertex:Ng,envmap_physical_pars_fragment:Wg,envmap_vertex:Dg,fog_vertex:Ug,fog_pars_vertex:Fg,fog_fragment:Bg,fog_pars_fragment:Og,gradientmap_pars_fragment:kg,lightmap_pars_fragment:zg,lights_lambert_fragment:Hg,lights_lambert_pars_fragment:Vg,lights_pars_begin:Gg,lights_toon_fragment:Xg,lights_toon_pars_fragment:qg,lights_phong_fragment:Yg,lights_phong_pars_fragment:$g,lights_physical_fragment:Zg,lights_physical_pars_fragment:Kg,lights_fragment_begin:Jg,lights_fragment_maps:jg,lights_fragment_end:Qg,lightprobes_pars_fragment:t_,logdepthbuf_fragment:e_,logdepthbuf_pars_fragment:i_,logdepthbuf_pars_vertex:n_,logdepthbuf_vertex:s_,map_fragment:r_,map_pars_fragment:o_,map_particle_fragment:a_,map_particle_pars_fragment:l_,metalnessmap_fragment:c_,metalnessmap_pars_fragment:h_,morphinstance_vertex:u_,morphcolor_vertex:f_,morphnormal_vertex:d_,morphtarget_pars_vertex:p_,morphtarget_vertex:m_,normal_fragment_begin:g_,normal_fragment_maps:__,normal_pars_fragment:x_,normal_pars_vertex:v_,normal_vertex:y_,normalmap_pars_fragment:b_,clearcoat_normal_fragment_begin:S_,clearcoat_normal_fragment_maps:M_,clearcoat_pars_fragment:w_,iridescence_pars_fragment:E_,opaque_fragment:T_,packing:A_,premultiplied_alpha_fragment:R_,project_vertex:C_,dithering_fragment:I_,dithering_pars_fragment:P_,roughnessmap_fragment:L_,roughnessmap_pars_fragment:N_,shadowmap_pars_fragment:D_,shadowmap_pars_vertex:U_,shadowmap_vertex:F_,shadowmask_pars_fragment:B_,skinbase_vertex:O_,skinning_pars_vertex:k_,skinning_vertex:z_,skinnormal_vertex:H_,specularmap_fragment:V_,specularmap_pars_fragment:G_,tonemapping_fragment:W_,tonemapping_pars_fragment:X_,transmission_fragment:q_,transmission_pars_fragment:Y_,uv_pars_fragment:$_,uv_pars_vertex:Z_,uv_vertex:K_,worldpos_vertex:J_,background_vert:j_,background_frag:Q_,backgroundCube_vert:tx,backgroundCube_frag:ex,cube_vert:ix,cube_frag:nx,depth_vert:sx,depth_frag:rx,distance_vert:ox,distance_frag:ax,equirect_vert:lx,equirect_frag:cx,linedashed_vert:hx,linedashed_frag:ux,meshbasic_vert:fx,meshbasic_frag:dx,meshlambert_vert:px,meshlambert_frag:mx,meshmatcap_vert:gx,meshmatcap_frag:_x,meshnormal_vert:xx,meshnormal_frag:vx,meshphong_vert:yx,meshphong_frag:bx,meshphysical_vert:Sx,meshphysical_frag:Mx,meshtoon_vert:wx,meshtoon_frag:Ex,points_vert:Tx,points_frag:Ax,shadow_vert:Rx,shadow_frag:Cx,sprite_vert:Ix,sprite_frag:Px},Rt={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},envMapRotation:{value:new ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},nn={basic:{uniforms:si([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:si([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new dt(0)},envMapIntensity:{value:1}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:si([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:si([Rt.common,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.roughnessmap,Rt.metalnessmap,Rt.fog,Rt.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:si([Rt.common,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.gradientmap,Rt.fog,Rt.lights,{emissive:{value:new dt(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:si([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:si([Rt.points,Rt.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:si([Rt.common,Rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:si([Rt.common,Rt.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:si([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:si([Rt.sprite,Rt.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ie}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distance:{uniforms:si([Rt.common,Rt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distance_vert,fragmentShader:re.distance_frag},shadow:{uniforms:si([Rt.lights,Rt.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};nn.physical={uniforms:si([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};var Zl={r:0,b:0,g:0},Lx=new jt,jd=new ie;jd.set(-1,0,0,0,1,0,0,0,1);function Nx(s,t,e,i,n,r){let o=new dt(0),a=n===!0?0:1,l,c,h=null,u=0,d=null;function f(y){let x=y.isScene===!0?y.background:null;if(x&&x.isTexture){let v=y.backgroundBlurriness>0;x=t.get(x,v)}return x}function m(y){let x=!1,v=f(y);v===null?p(o,a):v&&v.isColor&&(p(v,1),x=!0);let S=s.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||x)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(y,x){let v=f(x);v&&(v.isCubeTexture||v.mapping===bo)?(c===void 0&&(c=new Ft(new Pe(1,1,1),new ce({name:"BackgroundCubeMaterial",uniforms:ts(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Lx.makeRotationFromEuler(x.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(jd),c.material.toneMapped=oe.getTransfer(v.colorSpace)!==me,(h!==v||u!==v.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ft(new ni(2,2),new ce({name:"BackgroundMaterial",uniforms:ts(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=oe.getTransfer(v.colorSpace)!==me,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,d=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(Zl,Bh(s)),e.buffers.color.setClear(Zl.r,Zl.g,Zl.b,x,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,x=1){o.set(y),a=x,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,p(o,a)},render:m,addToRenderList:_,dispose:g}}function Dx(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=d(null),r=n,o=!1;function a(P,b,B,H,z){let Y=!1,V=u(P,H,B,b);r!==V&&(r=V,c(r.object)),Y=f(P,H,B,z),Y&&m(P,H,B,z),z!==null&&t.update(z,s.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,v(P,b,B,H),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return s.createVertexArray()}function c(P){return s.bindVertexArray(P)}function h(P){return s.deleteVertexArray(P)}function u(P,b,B,H){let z=H.wireframe===!0,Y=i[b.id];Y===void 0&&(Y={},i[b.id]=Y);let V=P.isInstancedMesh===!0?P.id:0,j=Y[V];j===void 0&&(j={},Y[V]=j);let O=j[B.id];O===void 0&&(O={},j[B.id]=O);let k=O[z];return k===void 0&&(k=d(l()),O[z]=k),k}function d(P){let b=[],B=[],H=[];for(let z=0;z<e;z++)b[z]=0,B[z]=0,H[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:B,attributeDivisors:H,object:P,attributes:{},index:null}}function f(P,b,B,H){let z=r.attributes,Y=b.attributes,V=0,j=B.getAttributes();for(let O in j)if(j[O].location>=0){let it=z[O],q=Y[O];if(q===void 0&&(O==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),O==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),it===void 0||it.attribute!==q||q&&it.data!==q.data)return!0;V++}return r.attributesNum!==V||r.index!==H}function m(P,b,B,H){let z={},Y=b.attributes,V=0,j=B.getAttributes();for(let O in j)if(j[O].location>=0){let it=Y[O];it===void 0&&(O==="instanceMatrix"&&P.instanceMatrix&&(it=P.instanceMatrix),O==="instanceColor"&&P.instanceColor&&(it=P.instanceColor));let q={};q.attribute=it,it&&it.data&&(q.data=it.data),z[O]=q,V++}r.attributes=z,r.attributesNum=V,r.index=H}function _(){let P=r.newAttributes;for(let b=0,B=P.length;b<B;b++)P[b]=0}function p(P){g(P,0)}function g(P,b){let B=r.newAttributes,H=r.enabledAttributes,z=r.attributeDivisors;B[P]=1,H[P]===0&&(s.enableVertexAttribArray(P),H[P]=1),z[P]!==b&&(s.vertexAttribDivisor(P,b),z[P]=b)}function y(){let P=r.newAttributes,b=r.enabledAttributes;for(let B=0,H=b.length;B<H;B++)b[B]!==P[B]&&(s.disableVertexAttribArray(B),b[B]=0)}function x(P,b,B,H,z,Y,V){V===!0?s.vertexAttribIPointer(P,b,B,z,Y):s.vertexAttribPointer(P,b,B,H,z,Y)}function v(P,b,B,H){_();let z=H.attributes,Y=B.getAttributes(),V=b.defaultAttributeValues;for(let j in Y){let O=Y[j];if(O.location>=0){let k=z[j];if(k===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(k=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(k=P.instanceColor)),k!==void 0){let it=k.normalized,q=k.itemSize,nt=t.get(k);if(nt===void 0)continue;let Ht=nt.buffer,Yt=nt.type,Nt=nt.bytesPerElement,et=Yt===s.INT||Yt===s.UNSIGNED_INT||k.gpuType===cl;if(k.isInterleavedBufferAttribute){let at=k.data,yt=at.stride,$t=k.offset;if(at.isInstancedInterleavedBuffer){for(let wt=0;wt<O.locationSize;wt++)g(O.location+wt,at.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let wt=0;wt<O.locationSize;wt++)p(O.location+wt);s.bindBuffer(s.ARRAY_BUFFER,Ht);for(let wt=0;wt<O.locationSize;wt++)x(O.location+wt,q/O.locationSize,Yt,it,yt*Nt,($t+q/O.locationSize*wt)*Nt,et)}else{if(k.isInstancedBufferAttribute){for(let at=0;at<O.locationSize;at++)g(O.location+at,k.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let at=0;at<O.locationSize;at++)p(O.location+at);s.bindBuffer(s.ARRAY_BUFFER,Ht);for(let at=0;at<O.locationSize;at++)x(O.location+at,q/O.locationSize,Yt,it,q*Nt,q/O.locationSize*at*Nt,et)}}else if(V!==void 0){let it=V[j];if(it!==void 0)switch(it.length){case 2:s.vertexAttrib2fv(O.location,it);break;case 3:s.vertexAttrib3fv(O.location,it);break;case 4:s.vertexAttrib4fv(O.location,it);break;default:s.vertexAttrib1fv(O.location,it)}}}}y()}function S(){C();for(let P in i){let b=i[P];for(let B in b){let H=b[B];for(let z in H){let Y=H[z];for(let V in Y)h(Y[V].object),delete Y[V];delete H[z]}}delete i[P]}}function E(P){if(i[P.id]===void 0)return;let b=i[P.id];for(let B in b){let H=b[B];for(let z in H){let Y=H[z];for(let V in Y)h(Y[V].object),delete Y[V];delete H[z]}}delete i[P.id]}function R(P){for(let b in i){let B=i[b];for(let H in B){let z=B[H];if(z[P.id]===void 0)continue;let Y=z[P.id];for(let V in Y)h(Y[V].object),delete Y[V];delete z[P.id]}}}function M(P){for(let b in i){let B=i[b],H=P.isInstancedMesh===!0?P.id:0,z=B[H];if(z!==void 0){for(let Y in z){let V=z[Y];for(let j in V)h(V[j].object),delete V[j];delete z[Y]}delete B[H],Object.keys(B).length===0&&delete i[b]}}}function C(){T(),o=!0,r!==n&&(r=n,c(r.object))}function T(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:a,reset:C,resetDefaultState:T,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfObject:M,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function Ux(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,i,1)}this.setMode=n,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Fx(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(R){return!(R!==Ci&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let M=R===Je&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==fi&&R!==Ri&&!M&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Zt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=s.getParameter(s.MAX_SAMPLES),E=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:v,maxSamples:S,samples:E}}function Bx(s){let t=this,e=null,i=0,n=!1,r=!1,o=new $e,a=new ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,g=s.get(u);if(!n||m===null||m.length===0||r&&!p)r?h(null):c();else{let y=r?0:i,x=y*4,v=g.clippingState||null;l.value=v,v=h(m,d,x,f);for(let S=0;S!==x;++S)v[S]=e[S];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,m){let _=u!==null?u.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<g)&&(p=new Float32Array(g));for(let x=0,v=f;x!==_;++x,v+=4)o.copy(u[x]).applyMatrix4(y,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var tr=4,Ox=6,kx=20,zx=256,Co=new Cn,Id=new dt,qh=null,Yh=0,$h=0,Zh=!1,Hx=new D,es=new D,Jl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:o=256,position:a=Hx}=r;qh=this._renderer.getRenderTarget(),Yh=this._renderer.getActiveCubeFace(),$h=this._renderer.getActiveMipmapLevel(),Zh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ld(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(qh,Yh,$h),this._renderer.xr.enabled=Zh,t.scissorTest=!1,Qs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pn||t.mapping===Qn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qh=this._renderer.getRenderTarget(),Yh=this._renderer.getActiveCubeFace(),$h=this._renderer.getActiveMipmapLevel(),Zh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:Je,format:Ci,colorSpace:Cr,depthBuffer:!1},n=Pd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pd(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Vx(r)),this._blurMaterial=Wx(r,t,e),this._ggxMaterial=Gx(r,t,e)}return n}_compileMaterial(t){let e=new Ft(new se,t);this._renderer.compile(e,Co)}_sceneToCubeUV(t,e,i,n,r){let l=new ii(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Id),u.toneMapping=Hi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ft(new Pe,new ge({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,p=_.material,g=!1,y=t.background;y?y.isColor&&(p.color.copy(y),t.background=null,g=!0):(p.color.copy(Id),g=!0);for(let x=0;x<6;x++){let v=x%3;v===0?(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[x],r.y,r.z)):v===1?(l.up.set(0,0,c[x]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[x],r.z)):(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[x]));let S=this._cubeSize;Qs(n,v*S,x>2?S:0,S,S),u.setRenderTarget(n),g&&u.render(_,l),u.render(t,l)}u.toneMapping=f,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===Pn||t.mapping===Qn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ld());let r=n?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Qs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Co)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:m}=this,_=this._sizeLods[i],p=3*_*(i>m-tr?i-m+tr:0),g=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=m-e,Qs(r,p,g,3*_,2*_),n.setRenderTarget(r),n.render(a,Co),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,Qs(t,p,g,3*_,2*_),n.setRenderTarget(t),n.render(a,Co)}_blur(t,e,i,n){let r=this._pingPongRenderTarget,o=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,n,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[n];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],u=3*h*(n>this._lodMax-tr?n-this._lodMax+tr:0),d=4*(this._cubeSize-h);Qs(e,u,d,3*h,2*h),o.setRenderTarget(e),o.render(l,Co)}};function Vx(s){let t=[],e=[],i=s,n=s-tr+1+Ox;for(let r=0;r<n;r++){let o=Math.pow(2,i);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,m=new Float32Array(f*d*u),_=new Float32Array(f*d*u);for(let g=0;g<u;g++){let y=g%3*2/3-1,x=g>2?0:-1,v=[y,x,0,y+2/3,x,0,y+2/3,x+1,0,y,x,0,y+2/3,x+1,0,y,x+1,0];m.set(v,f*d*g);for(let S=0;S<d;S++){let E=h[S*2]*2-1,R=h[S*2+1]*2-1;g===0?es.set(1,R,E):g===1?es.set(-E,1,-R):g===2?es.set(-E,R,1):g===3?es.set(-1,R,-E):g===4?es.set(-E,-1,R):es.set(E,R,-1),es.toArray(_,(g*d+S)*f)}}let p=new se;p.setAttribute("position",new de(m,f)),p.setAttribute("outputDirection",new de(_,f)),e.push(new Ft(p,null)),i>tr&&i--}return{lodMeshes:e,sizeLods:t}}function Pd(s,t,e){let i=new Be(s,t,e);return i.texture.mapping=bo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qs(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function Gx(s,t,e){return new ce({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:tc(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Wx(s,t,e){return new ce({name:"SphericalGaussianBlur",defines:{SAMPLES:kx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:tc(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Ld(){return new ce({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tc(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Nd(){return new ce({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function tc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var jl=class extends Be{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new zr(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Pe(5,5,5),r=new ce({name:"CubemapFromEquirect",uniforms:ts(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Oe,blending:Ai});r.uniforms.tEquirect.value=e;let o=new Ft(n,r),a=e.minFilter;return e.minFilter===Ln&&(e.minFilter=Ze),new nl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,n);t.setRenderTarget(r)}};function Xx(s){let t=new WeakMap,e=new WeakMap,i=null;function n(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===ol||f===al)if(t.has(d)){let m=t.get(d).texture;return a(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let _=new jl(m.height);return _.fromEquirectangularTexture(s,d),t.set(d,_),d.addEventListener("dispose",c),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,m=f===ol||f===al,_=f===Pn||f===Qn;if(m||_){let p=e.get(d),g=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new Jl(s)),p=m?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),p.texture;if(p!==void 0)return p.texture;{let y=d.image;return m&&y&&y.height>0||_&&y&&l(y)?(i===null&&(i=new Jl(s)),p=m?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function a(d,f){return f===ol?d.mapping=Pn:f===al&&(d.mapping=Qn),d}function l(d){let f=0,m=6;for(let _=0;_<m;_++)d[_]!==void 0&&f++;return f===m}function c(d){let f=d.target;f.removeEventListener("dispose",c);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:u}}function qx(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&Zn("WebGLRenderer: "+i+" extension not supported."),n}}}function Yx(s,t,e,i){let n={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete n[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return n[d.id]===!0||(d.addEventListener("dispose",o),n[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)t.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,m=u.attributes.position,_=0;if(m===void 0)return;if(f!==null){let y=f.array;_=f.version;for(let x=0,v=y.length;x<v;x+=3){let S=y[x+0],E=y[x+1],R=y[x+2];d.push(S,E,E,R,R,S)}}else{let y=m.array;_=m.version;for(let x=0,v=y.length/3-1;x<v;x+=3){let S=x+0,E=x+1,R=x+2;d.push(S,E,E,R,R,S)}}let p=new(m.count>=65535?Br:Fr)(d,1);p.version=_;let g=r.get(u);g&&t.remove(g),r.set(u,p)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function $x(s,t,e){let i;function n(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){s.drawElements(i,d,r,u*o),e.update(d,i,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(i,d,r,u*o,f),e.update(d,i,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,f);let _=0;for(let p=0;p<f;p++)_+=d[p];e.update(_,i,1)}this.setMode=n,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Zx(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:Kt("WebGLInfo: Unknown draw mode:",o);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Kx(s,t,e){let i=new WeakMap,n=new Re;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let C=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",C)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],x=0;f===!0&&(x=1),m===!0&&(x=2),_===!0&&(x=3);let v=a.attributes.position.count*x,S=1;v>t.maxTextureSize&&(S=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let E=new Float32Array(v*S*4*u),R=new Nr(E,v,S,u);R.type=Ri,R.needsUpdate=!0;let M=x*4;for(let T=0;T<u;T++){let P=p[T],b=g[T],B=y[T],H=v*S*4*T;for(let z=0;z<P.count;z++){let Y=z*M;f===!0&&(n.fromBufferAttribute(P,z),E[H+Y+0]=n.x,E[H+Y+1]=n.y,E[H+Y+2]=n.z,E[H+Y+3]=0),m===!0&&(n.fromBufferAttribute(b,z),E[H+Y+4]=n.x,E[H+Y+5]=n.y,E[H+Y+6]=n.z,E[H+Y+7]=0),_===!0&&(n.fromBufferAttribute(B,z),E[H+Y+8]=n.x,E[H+Y+9]=n.y,E[H+Y+10]=n.z,E[H+Y+11]=B.itemSize===4?n.w:1)}}d={count:u,texture:R,size:new xt(v,S)},i.set(a,d),a.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Jx(s,t,e,i,n){let r=new WeakMap;function o(c){let h=n.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var jx={[po]:"LINEAR_TONE_MAPPING",[mo]:"REINHARD_TONE_MAPPING",[go]:"CINEON_TONE_MAPPING",[_o]:"ACES_FILMIC_TONE_MAPPING",[vo]:"AGX_TONE_MAPPING",[yo]:"NEUTRAL_TONE_MAPPING",[xo]:"CUSTOM_TONE_MAPPING"};function Qx(s,t,e,i,n,r){let o=new Be(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new se;c.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ee([0,2,0,0,2,0],2));let h=new $s({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Ft(c,h),d=new Cn(-1,1,1,-1,0,1),f=null,m=null,_=!1,p,g=null,y=[],x=!1;this.setSize=function(v,S){o.setSize(v,S),a!==null&&a.setSize(v,S),l!==null&&l.setSize(v,S);for(let E=0;E<y.length;E++){let R=y[E];R.setSize&&R.setSize(v,S)}},this.setEffects=function(v){y=v,x=y.length>0&&y[0].isRenderPass===!0;let S=o.width,E=o.height;y.length>0&&a===null&&(a=new Be(S,E,{type:Je,depthBuffer:!1,stencilBuffer:!1}),l=new Be(S,E,{type:Je,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<y.length;R++){let M=y[R];M.setSize&&M.setSize(S,E)}},this.begin=function(v,S){if(_||v.toneMapping===Hi&&y.length===0)return!1;if(g=S,S!==null){let E=S.width,R=S.height;(o.width!==E||o.height!==R)&&this.setSize(E,R)}return x===!1&&v.setRenderTarget(o),p=v.toneMapping,v.toneMapping=Hi,!0},this.hasRenderPass=function(){return x},this.end=function(v,S){v.toneMapping=p,_=!0;let E=o,R=a;for(let M=0;M<y.length;M++){let C=y[M];C.enabled!==!1&&(C.render(v,R,E,S),C.needsSwap!==!1&&(E=R,R=R===a?l:a))}if(f!==v.outputColorSpace||m!==v.toneMapping){f=v.outputColorSpace,m=v.toneMapping,h.defines={},oe.getTransfer(f)===me&&(h.defines.SRGB_TRANSFER="");let M=jx[m];M&&(h.defines[M]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,v.setRenderTarget(g),v.render(u,d),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Qd=new li,jh=new En(1,1),tp=new Nr,ep=new Fa,ip=new zr,Dd=[],Ud=[],Fd=new Float32Array(16),Bd=new Float32Array(9),Od=new Float32Array(4);function ir(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=Dd[n];if(r===void 0&&(r=new Float32Array(n),Dd[n]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ve(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Ge(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function ec(s,t){let e=Ud[t];e===void 0&&(e=new Int32Array(t),Ud[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function tv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ev(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;s.uniform2fv(this.addr,t),Ge(e,t)}}function iv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;s.uniform3fv(this.addr,t),Ge(e,t)}}function nv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;s.uniform4fv(this.addr,t),Ge(e,t)}}function sv(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ve(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,i))return;Od.set(i),s.uniformMatrix2fv(this.addr,!1,Od),Ge(e,i)}}function rv(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ve(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,i))return;Bd.set(i),s.uniformMatrix3fv(this.addr,!1,Bd),Ge(e,i)}}function ov(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ve(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,i))return;Fd.set(i),s.uniformMatrix4fv(this.addr,!1,Fd),Ge(e,i)}}function av(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function lv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;s.uniform2iv(this.addr,t),Ge(e,t)}}function cv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;s.uniform3iv(this.addr,t),Ge(e,t)}}function hv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;s.uniform4iv(this.addr,t),Ge(e,t)}}function uv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function fv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;s.uniform2uiv(this.addr,t),Ge(e,t)}}function dv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;s.uniform3uiv(this.addr,t),Ge(e,t)}}function pv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;s.uniform4uiv(this.addr,t),Ge(e,t)}}function mv(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(jh.compareFunction=e.isReversedDepthBuffer()?$l:Yl,r=jh):r=Qd,e.setTexture2D(t||r,n)}function gv(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||ep,n)}function _v(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||ip,n)}function xv(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||tp,n)}function vv(s){switch(s){case 5126:return tv;case 35664:return ev;case 35665:return iv;case 35666:return nv;case 35674:return sv;case 35675:return rv;case 35676:return ov;case 5124:case 35670:return av;case 35667:case 35671:return lv;case 35668:case 35672:return cv;case 35669:case 35673:return hv;case 5125:return uv;case 36294:return fv;case 36295:return dv;case 36296:return pv;case 35678:case 36198:case 36298:case 36306:case 35682:return mv;case 35679:case 36299:case 36307:return gv;case 35680:case 36300:case 36308:case 36293:return _v;case 36289:case 36303:case 36311:case 36292:return xv}}function yv(s,t){s.uniform1fv(this.addr,t)}function bv(s,t){let e=ir(t,this.size,2);s.uniform2fv(this.addr,e)}function Sv(s,t){let e=ir(t,this.size,3);s.uniform3fv(this.addr,e)}function Mv(s,t){let e=ir(t,this.size,4);s.uniform4fv(this.addr,e)}function wv(s,t){let e=ir(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ev(s,t){let e=ir(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Tv(s,t){let e=ir(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Av(s,t){s.uniform1iv(this.addr,t)}function Rv(s,t){s.uniform2iv(this.addr,t)}function Cv(s,t){s.uniform3iv(this.addr,t)}function Iv(s,t){s.uniform4iv(this.addr,t)}function Pv(s,t){s.uniform1uiv(this.addr,t)}function Lv(s,t){s.uniform2uiv(this.addr,t)}function Nv(s,t){s.uniform3uiv(this.addr,t)}function Dv(s,t){s.uniform4uiv(this.addr,t)}function Uv(s,t,e){let i=this.cache,n=t.length,r=ec(e,n);Ve(i,r)||(s.uniform1iv(this.addr,r),Ge(i,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=jh:o=Qd;for(let a=0;a!==n;++a)e.setTexture2D(t[a]||o,r[a])}function Fv(s,t,e){let i=this.cache,n=t.length,r=ec(e,n);Ve(i,r)||(s.uniform1iv(this.addr,r),Ge(i,r));for(let o=0;o!==n;++o)e.setTexture3D(t[o]||ep,r[o])}function Bv(s,t,e){let i=this.cache,n=t.length,r=ec(e,n);Ve(i,r)||(s.uniform1iv(this.addr,r),Ge(i,r));for(let o=0;o!==n;++o)e.setTextureCube(t[o]||ip,r[o])}function Ov(s,t,e){let i=this.cache,n=t.length,r=ec(e,n);Ve(i,r)||(s.uniform1iv(this.addr,r),Ge(i,r));for(let o=0;o!==n;++o)e.setTexture2DArray(t[o]||tp,r[o])}function kv(s){switch(s){case 5126:return yv;case 35664:return bv;case 35665:return Sv;case 35666:return Mv;case 35674:return wv;case 35675:return Ev;case 35676:return Tv;case 5124:case 35670:return Av;case 35667:case 35671:return Rv;case 35668:case 35672:return Cv;case 35669:case 35673:return Iv;case 5125:return Pv;case 36294:return Lv;case 36295:return Nv;case 36296:return Dv;case 35678:case 36198:case 36298:case 36306:case 35682:return Uv;case 35679:case 36299:case 36307:return Fv;case 35680:case 36300:case 36308:case 36293:return Bv;case 36289:case 36303:case 36311:case 36292:return Ov}}var Qh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=vv(e.type)}},tu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=kv(e.type)}},eu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,o=n.length;r!==o;++r){let a=n[r];a.setValue(t,e[a.id],i)}}},Kh=/(\w+)(\])?(\[|\.)?/g;function kd(s,t){s.seq.push(t),s.map[t.id]=t}function zv(s,t,e){let i=s.name,n=i.length;for(Kh.lastIndex=0;;){let r=Kh.exec(i),o=Kh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===n){kd(e,c===void 0?new Qh(a,s,t):new tu(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new eu(a),kd(e,u)),e=u}}}var er=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);zv(a,l,this)}let n=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(o):r.push(o);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let o=t[n];o.id in e&&i.push(o)}return i}};function zd(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var Hv=37297,Vv=0;function Gv(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=n;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Hd=new ie;function Wv(s){oe._getMatrix(Hd,oe.workingColorSpace,s);let t=`mat3( ${Hd.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(s)){case Ir:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return Zt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Vd(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Gv(s.getShaderSource(t),a)}else return r}function Xv(s,t){let e=Wv(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var qv={[po]:"Linear",[mo]:"Reinhard",[go]:"Cineon",[_o]:"ACESFilmic",[vo]:"AgX",[yo]:"Neutral",[xo]:"Custom"};function Yv(s,t){let e=qv[t];return e===void 0?(Zt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Kl=new D;function $v(){oe.getLuminanceCoefficients(Kl);let s=Kl.x.toFixed(4),t=Kl.y.toFixed(4),e=Kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Po).join(`
`)}function Kv(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Jv(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Po(s){return s!==""}function Gd(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wd(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var jv=/^[ \t]*#include +<([\w\d./]+)>/gm;function iu(s){return s.replace(jv,ty)}var Qv=new Map;function ty(s,t){let e=re[t];if(e===void 0){let i=Qv.get(t);if(i!==void 0)e=re[i],Zt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return iu(e)}var ey=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xd(s){return s.replace(ey,iy)}function iy(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function qd(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var ny={[fo]:"SHADOWMAP_TYPE_PCF",[Zs]:"SHADOWMAP_TYPE_VSM"};function sy(s){return ny[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ry={[Pn]:"ENVMAP_TYPE_CUBE",[Qn]:"ENVMAP_TYPE_CUBE",[bo]:"ENVMAP_TYPE_CUBE_UV"};function oy(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":ry[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var ay={[Qn]:"ENVMAP_MODE_REFRACTION"};function ly(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":ay[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var cy={[Eh]:"ENVMAP_BLENDING_MULTIPLY",[od]:"ENVMAP_BLENDING_MIX",[ad]:"ENVMAP_BLENDING_ADD"};function hy(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":cy[s.combine]||"ENVMAP_BLENDING_NONE"}function uy(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function fy(s,t,e,i){let n=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=sy(e),c=oy(e),h=ly(e),u=hy(e),d=uy(e),f=Zv(e),m=Kv(r),_=n.createProgram(),p,g,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Po).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Po).join(`
`),g.length>0&&(g+=`
`)):(p=[qd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Po).join(`
`),g=[qd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hi?"#define TONE_MAPPING":"",e.toneMapping!==Hi?re.tonemapping_pars_fragment:"",e.toneMapping!==Hi?Yv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,Xv("linearToOutputTexel",e.outputColorSpace),$v(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Po).join(`
`)),o=iu(o),o=Gd(o,e),o=Wd(o,e),a=iu(a),a=Gd(a,e),a=Wd(a,e),o=Xd(o),a=Xd(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===Dh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Dh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let x=y+p+o,v=y+g+a,S=zd(n,n.VERTEX_SHADER,x),E=zd(n,n.FRAGMENT_SHADER,v);n.attachShader(_,S),n.attachShader(_,E),e.index0AttributeName!==void 0?n.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(_,0,"position"),n.linkProgram(_);function R(P){if(s.debug.checkShaderErrors){let b=n.getProgramInfoLog(_)||"",B=n.getShaderInfoLog(S)||"",H=n.getShaderInfoLog(E)||"",z=b.trim(),Y=B.trim(),V=H.trim(),j=!0,O=!0;if(n.getProgramParameter(_,n.LINK_STATUS)===!1)if(j=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,_,S,E);else{let k=Vd(n,S,"vertex"),it=Vd(n,E,"fragment");Kt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(_,n.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+k+`
`+it)}else z!==""?Zt("WebGLProgram: Program Info Log:",z):(Y===""||V==="")&&(O=!1);O&&(P.diagnostics={runnable:j,programLog:z,vertexShader:{log:Y,prefix:p},fragmentShader:{log:V,prefix:g}})}n.deleteShader(S),n.deleteShader(E),M=new er(n,_),C=Jv(n,_)}let M;this.getUniforms=function(){return M===void 0&&R(this),M};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=n.getProgramParameter(_,Hv)),T},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=E,this}var dy=0,nu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new su(t),e.set(t,i)),i}},su=class{constructor(t){this.id=dy++,this.code=t,this.usedTimes=0}};function py(s){return s===Dn||s===Ao||s===Ro}function my(s,t,e,i,n,r){let o=new Bs,a=new nu,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(M){return l.add(M),M===0?"uv":`uv${M}`}function _(M,C,T,P,b,B){let H=P.fog,z=b.geometry,Y=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,V=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,j=t.get(M.envMap||Y,V),O=j&&j.mapping===bo?j.image.height:null,k=f[M.type];M.precision!==null&&(d=i.getMaxPrecision(M.precision),d!==M.precision&&Zt("WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));let it=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,q=it!==void 0?it.length:0,nt=0;z.morphAttributes.position!==void 0&&(nt=1),z.morphAttributes.normal!==void 0&&(nt=2),z.morphAttributes.color!==void 0&&(nt=3);let Ht,Yt,Nt,et;if(k){let Me=nn[k];Ht=Me.vertexShader,Yt=Me.fragmentShader}else{Ht=M.vertexShader,Yt=M.fragmentShader;let Me=a.getVertexShaderStage(M),_e=a.getFragmentShaderStage(M);a.update(M,Me,_e),Nt=Me.id,et=_e.id}let at=s.getRenderTarget(),yt=s.state.buffers.depth.getReversed(),$t=b.isInstancedMesh===!0,wt=b.isBatchedMesh===!0,w=!!M.map,ot=!!M.matcap,Z=!!j,U=!!M.aoMap,N=!!M.lightMap,G=!!M.bumpMap&&M.wireframe===!1,ct=!!M.normalMap,ft=!!M.displacementMap,K=!!M.emissiveMap,pt=!!M.metalnessMap,vt=!!M.roughnessMap,F=M.anisotropy>0,Lt=M.clearcoat>0,Xt=M.dispersion>0,L=M.retroreflectivity>0,A=M.iridescence>0,$=M.sheen>0,J=M.transmission>0,rt=F&&!!M.anisotropyMap,gt=Lt&&!!M.clearcoatMap,bt=Lt&&!!M.clearcoatNormalMap,lt=Lt&&!!M.clearcoatRoughnessMap,ht=A&&!!M.iridescenceMap,St=A&&!!M.iridescenceThicknessMap,Vt=$&&!!M.sheenColorMap,Et=$&&!!M.sheenRoughnessMap,Mt=!!M.specularMap,kt=!!M.specularColorMap,Wt=!!M.specularIntensityMap,te=J&&!!M.transmissionMap,X=J&&!!M.thicknessMap,Tt=!!M.gradientMap,ut=!!M.alphaMap,At=M.alphaTest>0,Pt=!!M.alphaHash,_t=!!M.extensions,qt=Hi;M.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(qt=s.toneMapping);let zt={shaderID:k,shaderType:M.type,shaderName:M.name,vertexShader:Ht,fragmentShader:Yt,defines:M.defines,customVertexShaderID:Nt,customFragmentShaderID:et,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:wt,batchingColor:wt&&b._colorsTexture!==null,instancing:$t,instancingColor:$t&&b.instanceColor!==null,instancingMorph:$t&&b.morphTexture!==null,outputColorSpace:at===null?s.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:w,matcap:ot,envMap:Z,envMapMode:Z&&j.mapping,envMapCubeUVHeight:O,aoMap:U,lightMap:N,bumpMap:G,normalMap:ct,displacementMap:ft,emissiveMap:K,normalMapObjectSpace:ct&&M.normalMapType===hd,normalMapTangentSpace:ct&&M.normalMapType===ql,packedNormalMap:ct&&M.normalMapType===ql&&py(M.normalMap.format),metalnessMap:pt,roughnessMap:vt,anisotropy:F,anisotropyMap:rt,clearcoat:Lt,clearcoatMap:gt,clearcoatNormalMap:bt,clearcoatRoughnessMap:lt,dispersion:Xt,retroreflection:L,iridescence:A,iridescenceMap:ht,iridescenceThicknessMap:St,sheen:$,sheenColorMap:Vt,sheenRoughnessMap:Et,specularMap:Mt,specularColorMap:kt,specularIntensityMap:Wt,transmission:J,transmissionMap:te,thicknessMap:X,gradientMap:Tt,opaque:M.transparent===!1&&M.blending===Ks&&M.alphaToCoverage===!1,alphaMap:ut,alphaTest:At,alphaHash:Pt,combine:M.combine,mapUv:w&&m(M.map.channel),aoMapUv:U&&m(M.aoMap.channel),lightMapUv:N&&m(M.lightMap.channel),bumpMapUv:G&&m(M.bumpMap.channel),normalMapUv:ct&&m(M.normalMap.channel),displacementMapUv:ft&&m(M.displacementMap.channel),emissiveMapUv:K&&m(M.emissiveMap.channel),metalnessMapUv:pt&&m(M.metalnessMap.channel),roughnessMapUv:vt&&m(M.roughnessMap.channel),anisotropyMapUv:rt&&m(M.anisotropyMap.channel),clearcoatMapUv:gt&&m(M.clearcoatMap.channel),clearcoatNormalMapUv:bt&&m(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&m(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ht&&m(M.iridescenceMap.channel),iridescenceThicknessMapUv:St&&m(M.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&m(M.sheenColorMap.channel),sheenRoughnessMapUv:Et&&m(M.sheenRoughnessMap.channel),specularMapUv:Mt&&m(M.specularMap.channel),specularColorMapUv:kt&&m(M.specularColorMap.channel),specularIntensityMapUv:Wt&&m(M.specularIntensityMap.channel),transmissionMapUv:te&&m(M.transmissionMap.channel),thicknessMapUv:X&&m(M.thicknessMap.channel),alphaMapUv:ut&&m(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ct||F),vertexNormals:!!z.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!z.attributes.uv&&(w||ut),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||z.attributes.normal===void 0&&ct===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:yt,skinning:b.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:nt,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&T.length>0,shadowMapType:s.shadowMap.type,toneMapping:qt,decodeVideoTexture:w&&M.map.isVideoTexture===!0&&oe.getTransfer(M.map.colorSpace)===me,decodeVideoTextureEmissive:K&&M.emissiveMap.isVideoTexture===!0&&oe.getTransfer(M.emissiveMap.colorSpace)===me,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ie,flipSided:M.side===Oe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:_t&&M.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&M.extensions.multiDraw===!0||wt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return zt.vertexUv1s=l.has(1),zt.vertexUv2s=l.has(2),zt.vertexUv3s=l.has(3),l.clear(),zt}function p(M){let C=[];if(M.shaderID?C.push(M.shaderID):(C.push(M.customVertexShaderID),C.push(M.customFragmentShaderID)),M.defines!==void 0)for(let T in M.defines)C.push(T),C.push(M.defines[T]);return M.isRawShaderMaterial===!1&&(g(C,M),y(C,M),C.push(s.outputColorSpace)),C.push(M.customProgramCacheKey),C.join()}function g(M,C){M.push(C.precision),M.push(C.outputColorSpace),M.push(C.envMapMode),M.push(C.envMapCubeUVHeight),M.push(C.mapUv),M.push(C.alphaMapUv),M.push(C.lightMapUv),M.push(C.aoMapUv),M.push(C.bumpMapUv),M.push(C.normalMapUv),M.push(C.displacementMapUv),M.push(C.emissiveMapUv),M.push(C.metalnessMapUv),M.push(C.roughnessMapUv),M.push(C.anisotropyMapUv),M.push(C.clearcoatMapUv),M.push(C.clearcoatNormalMapUv),M.push(C.clearcoatRoughnessMapUv),M.push(C.iridescenceMapUv),M.push(C.iridescenceThicknessMapUv),M.push(C.sheenColorMapUv),M.push(C.sheenRoughnessMapUv),M.push(C.specularMapUv),M.push(C.specularColorMapUv),M.push(C.specularIntensityMapUv),M.push(C.transmissionMapUv),M.push(C.thicknessMapUv),M.push(C.combine),M.push(C.fogExp2),M.push(C.sizeAttenuation),M.push(C.morphTargetsCount),M.push(C.morphAttributeCount),M.push(C.numSunLights),M.push(C.numDirLights),M.push(C.numPointLights),M.push(C.numSpotLights),M.push(C.numSpotLightMaps),M.push(C.numHemiLights),M.push(C.numRectAreaLights),M.push(C.numSunLightShadows),M.push(C.numDirLightShadows),M.push(C.numPointLightShadows),M.push(C.numSpotLightShadows),M.push(C.numSpotLightShadowsWithMaps),M.push(C.numLightProbes),M.push(C.shadowMapType),M.push(C.toneMapping),M.push(C.numClippingPlanes),M.push(C.numClipIntersection),M.push(C.depthPacking)}function y(M,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.retroreflection&&o.enable(24),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),C.hasPositionAttribute&&o.enable(23),M.push(o.mask)}function x(M){let C=f[M.type],T;if(C){let P=nn[C];T=dn.clone(P.uniforms)}else T=M.uniforms;return T}function v(M,C){let T=h.get(C);return T!==void 0?++T.usedTimes:(T=new fy(s,C,M,n),c.push(T),h.set(C,T)),T}function S(M){if(--M.usedTimes===0){let C=c.indexOf(M);c[C]=c[c.length-1],c.pop(),h.delete(M.cacheKey),M.destroy()}}function E(M){a.remove(M)}function R(){a.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:x,acquireProgram:v,releaseProgram:S,releaseShaderCache:E,programs:c,dispose:R}}function gy(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function i(o){s.delete(o)}function n(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function _y(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Yd(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function $d(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,m,_,p,g){let y=s[t];return y===void 0?(y={id:d.id,object:d,geometry:f,material:m,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:g},s[t]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=m,y.materialVariant=o(d),y.groupOrder=_,y.renderOrder=d.renderOrder,y.z=p,y.group=g),t++,y}function l(d,f,m,_,p,g,y){y.reversedDepth===!0&&(p=-p);let x=a(d,f,m,_,p,g);m.transmission>0?i.push(x):m.transparent===!0?n.push(x):e.push(x)}function c(d,f,m,_,p,g){let y=a(d,f,m,_,p,g);m.transmission>0?i.unshift(y):m.transparent===!0?n.unshift(y):e.unshift(y)}function h(d,f){e.length>1&&e.sort(d||_y),i.length>1&&i.sort(f||Yd),n.length>1&&n.sort(f||Yd)}function u(){for(let d=t,f=s.length;d<f;d++){let m=s[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:u,sort:h}}function xy(){let s=new WeakMap;function t(i,n){let r=s.get(i),o;return r===void 0?(o=new $d,s.set(i,[o])):n>=r.length?(o=new $d,r.push(o)):o=r[n],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function vy(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new D,color:new dt};break;case"SpotLight":e={position:new D,direction:new D,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":e={color:new dt,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function yy(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var by=0;function Sy(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function My(s){let t=new vy,e=yy(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);let n=new D,r=new jt,o=new jt;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,m=0,_=0,p=0,g=0,y=0,x=0,v=0,S=0,E=0,R=0,M=0,C=0,T=0;c.sort(Sy);for(let b=0,B=c.length;b<B;b++){let H=c[b],z=H.color,Y=H.intensity,V=H.distance,j=null;if(H.shadow&&H.shadow.map&&(H.shadow.map.texture.format===Dn?j=H.shadow.map.texture:j=H.shadow.map.depthTexture||H.shadow.map.texture),H.isAmbientLight)h+=z.r*Y,u+=z.g*Y,d+=z.b*Y;else if(H.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(H.sh.coefficients[O],Y);T++}else if(H.isSunLight){let O=t.get(H);if(O.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){let k=H.shadow,it=e.get(H);it.shadowIntensity=k.intensity,it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize.copy(k.mapSize).multiply(k.getFrameExtents()),i.sunShadow[m]=it,i.sunShadowMap[m]=j;let q=k.getViewportCount();for(let nt=0;nt<q;nt++)i.sunShadowMatrix[_+nt]=k.getMatrix(nt),i.sunShadowCascade[_+nt]=k._cascadeData[nt];_+=q,m++}i.sun[f]=O,f++}else if(H.isDirectionalLight){let O=t.get(H);if(O.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){let k=H.shadow,it=e.get(H);it.shadowIntensity=k.intensity,it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,i.directionalShadow[p]=it,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=H.shadow.matrix,S++}i.directional[p]=O,p++}else if(H.isSpotLight){let O=t.get(H);O.position.setFromMatrixPosition(H.matrixWorld),O.color.copy(z).multiplyScalar(Y),O.distance=V,O.coneCos=Math.cos(H.angle),O.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),O.decay=H.decay,i.spot[y]=O;let k=H.shadow;if(H.map&&(i.spotLightMap[M]=H.map,M++,k.updateMatrices(H),H.castShadow&&C++),i.spotLightMatrix[y]=k.matrix,H.castShadow){let it=e.get(H);it.shadowIntensity=k.intensity,it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,i.spotShadow[y]=it,i.spotShadowMap[y]=j,R++}y++}else if(H.isRectAreaLight){let O=t.get(H);O.color.copy(z).multiplyScalar(Y),O.halfWidth.set(H.width*.5,0,0),O.halfHeight.set(0,H.height*.5,0),i.rectArea[x]=O,x++}else if(H.isPointLight){let O=t.get(H);if(O.color.copy(H.color).multiplyScalar(H.intensity),O.distance=H.distance,O.decay=H.decay,H.castShadow){let k=H.shadow,it=e.get(H);it.shadowIntensity=k.intensity,it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,it.shadowCameraNear=k.camera.near,it.shadowCameraFar=k.camera.far,i.pointShadow[g]=it,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=H.shadow.matrix,E++}i.point[g]=O,g++}else if(H.isHemisphereLight){let O=t.get(H);O.skyColor.copy(H.color).multiplyScalar(Y),O.groundColor.copy(H.groundColor).multiplyScalar(Y),i.hemi[v]=O,v++}}x>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Rt.LTC_FLOAT_1,i.rectAreaLTC2=Rt.LTC_FLOAT_2):(i.rectAreaLTC1=Rt.LTC_HALF_1,i.rectAreaLTC2=Rt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let P=i.hash;(P.sunLength!==f||P.directionalLength!==p||P.pointLength!==g||P.spotLength!==y||P.rectAreaLength!==x||P.hemiLength!==v||P.numSunShadows!==m||P.numDirectionalShadows!==S||P.numPointShadows!==E||P.numSpotShadows!==R||P.numSpotMaps!==M||P.numLightProbes!==T)&&(i.sun.length=f,i.directional.length=p,i.spot.length=y,i.rectArea.length=x,i.point.length=g,i.hemi.length=v,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.directionalShadowMatrix.length=S,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+M-C,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=T,P.sunLength=f,P.directionalLength=p,P.pointLength=g,P.spotLength=y,P.rectAreaLength=x,P.hemiLength=v,P.numSunShadows=m,P.numDirectionalShadows=S,P.numPointShadows=E,P.numSpotShadows=R,P.numSpotMaps=M,P.numLightProbes=T,i.version=by++)}function l(c,h){let u=0,d=0,f=0,m=0,_=0,p=0,g=h.matrixWorldInverse;for(let y=0,x=c.length;y<x;y++){let v=c[y];if(v.isSunLight){let S=i.sun[u];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(g),u++}else if(v.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(v.matrixWorld),n.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(g),d++}else if(v.isSpotLight){let S=i.spot[m];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(v.matrixWorld),n.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let S=i.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let S=i.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let S=i.hemi[p];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(g),p++}}}return{setup:a,setupView:l,state:i}}function Zd(s){let t=new My(s),e=[],i=[],n=[];function r(d){u.camera=d,e.length=0,i.length=0,n.length=0}function o(d){e.push(d)}function a(d){i.push(d)}function l(d){n.push(d)}function c(){t.setup(e)}function h(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function wy(s){let t=new WeakMap;function e(n,r=0){let o=t.get(n),a;return o===void 0?(a=new Zd(s),t.set(n,[a])):r>=o.length?(a=new Zd(s),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var Ey=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ty=`uniform sampler2D shadow_pass;
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
}`,Ay=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],Ry=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Kd=new jt,Io=new D,Jh=new D;function Cy(s,t,e){let i=new Hs,n=new xt,r=new xt,o=new Re,a=new Wa,l=new Xa,c={},h=e.maxTextureSize,u={[In]:Oe,[Oe]:In,[Ie]:Ie},d=new ce({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:Ey,fragmentShader:Ty}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new se;m.setAttribute("position",new de(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ft(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fo;let g=this.type;this.render=function(E,R,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===Hf&&(Zt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fo);let C=s.getRenderTarget(),T=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),b=s.state;b.setBlending(Ai),b.buffers.depth.getReversed()===!0?b.buffers.color.setClear(0,0,0,0):b.buffers.color.setClear(1,1,1,1),b.buffers.depth.setTest(!0),b.setScissorTest(!1);let B=g!==this.type;B&&R.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(z=>z.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,z=E.length;H<z;H++){let Y=E[H],V=Y.shadow;if(V===void 0){Zt("WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;n.copy(V.mapSize);let j=V.getFrameExtents();n.multiply(j),r.copy(V.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/j.x),n.x=r.x*j.x,V.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/j.y),n.y=r.y*j.y,V.mapSize.y=r.y));let O=s.state.buffers.depth.getReversed();if(V.camera._reversedDepth=O,V.map===null||B===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Zs){if(Y.isPointLight){Zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Be(n.x,n.y,{format:Dn,type:Je,minFilter:Ze,magFilter:Ze,generateMipmaps:!1}),V.map.texture.name=Y.name+".shadowMap",V.map.depthTexture=new En(n.x,n.y,Ri),V.map.depthTexture.name=Y.name+".shadowMapDepth",V.map.depthTexture.format=Ki,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xe,V.map.depthTexture.magFilter=Xe}else Y.isPointLight?(V.map=new jl(n.x),V.map.depthTexture=new ka(n.x,Vi)):(V.map=new Be(n.x,n.y),V.map.depthTexture=new En(n.x,n.y,Vi)),V.map.depthTexture.name=Y.name+".shadowMap",V.map.depthTexture.format=Ki,this.type===fo?(V.map.depthTexture.compareFunction=O?$l:Yl,V.map.depthTexture.minFilter=Ze,V.map.depthTexture.magFilter=Ze):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xe,V.map.depthTexture.magFilter=Xe);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==n.x||V.map.height!==n.y)&&V.map.setSize(n.x,n.y);let k=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();Y.isPointLight!==!0&&V.updateMatrices(Y,M);for(let it=0;it<k;it++){let q=V.getCamera(it);if(Y.isPointLight){let nt=V.camera,Ht=V.matrix,Yt=Y.distance||nt.far;Yt!==nt.far&&(nt.far=Yt,nt.updateProjectionMatrix()),Io.setFromMatrixPosition(Y.matrixWorld),nt.position.copy(Io),Jh.copy(nt.position),Jh.add(Ay[it]),nt.up.copy(Ry[it]),nt.lookAt(Jh),nt.updateMatrixWorld(),Ht.makeTranslation(-Io.x,-Io.y,-Io.z),Kd.multiplyMatrices(nt.projectionMatrix,nt.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Kd,nt.coordinateSystem,nt.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)s.setRenderTarget(V.map,it),s.clear();else{it===0&&(s.setRenderTarget(V.map),s.clear());let nt=V.getViewport(it);o.set(r.x*nt.x,r.y*nt.y,r.x*nt.z,r.y*nt.w),b.viewport(o)}i=V.getFrustum(it),v(R,M,q,Y,this.type)}V.isPointLightShadow!==!0&&this.type===Zs&&y(V,M),V.needsUpdate=!1}g=this.type,p.needsUpdate=!1,s.setRenderTarget(C,T,P)};function y(E,R){let M=t.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new Be(n.x,n.y,{format:Dn,type:Je}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(R,null,M,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(R,null,M,f,_,null)}function x(E,R,M,C){let T=null,P=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)T=P;else if(T=M.isPointLight===!0?l:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let b=T.uuid,B=R.uuid,H=c[b];H===void 0&&(H={},c[b]=H);let z=H[B];z===void 0&&(z=T.clone(),H[B]=z,R.addEventListener("dispose",S)),T=z}if(T.visible=R.visible,T.wireframe=R.wireframe,C===Zs?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:u[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,M.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let b=s.properties.get(T);b.light=M}return T}function v(E,R,M,C,T){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&T===Zs)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);let B=t.update(E),H=E.material;if(Array.isArray(H)){let z=B.groups;for(let Y=0,V=z.length;Y<V;Y++){let j=z[Y],O=H[j.materialIndex];if(O&&O.visible){let k=x(E,O,C,T);E.onBeforeShadow(s,E,R,M,B,k,j),s.renderBufferDirect(M,null,B,k,E,j),E.onAfterShadow(s,E,R,M,B,k,j)}}}else if(H.visible){let z=x(E,H,C,T);E.onBeforeShadow(s,E,R,M,B,z,null),s.renderBufferDirect(M,null,B,z,E,null),E.onAfterShadow(s,E,R,M,B,z,null)}}let b=E.children;for(let B=0,H=b.length;B<H;B++)v(b[B],R,M,C,T)}function S(E){E.target.removeEventListener("dispose",S);for(let M in c){let C=c[M],T=E.target.uuid;T in C&&(C[T].dispose(),delete C[T])}}}function Iy(s,t){function e(){let X=!1,Tt=new Re,ut=null,At=new Re(0,0,0,0);return{setMask:function(Pt){ut!==Pt&&!X&&(s.colorMask(Pt,Pt,Pt,Pt),ut=Pt)},setLocked:function(Pt){X=Pt},setClear:function(Pt,_t,qt,zt,Me){Me===!0&&(Pt*=zt,_t*=zt,qt*=zt),Tt.set(Pt,_t,qt,zt),At.equals(Tt)===!1&&(s.clearColor(Pt,_t,qt,zt),At.copy(Tt))},reset:function(){X=!1,ut=null,At.set(-1,0,0,0)}}}function i(){let X=!1,Tt=!1,ut=null,At=null,Pt=null;return{setReversed:function(_t){if(Tt!==_t){let qt=t.get("EXT_clip_control");_t?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT),Tt=_t;let zt=Pt;Pt=null,this.setClear(zt)}},getReversed:function(){return Tt},setTest:function(_t){_t?at(s.DEPTH_TEST):yt(s.DEPTH_TEST)},setMask:function(_t){ut!==_t&&!X&&(s.depthMask(_t),ut=_t)},setFunc:function(_t){if(Tt&&(_t=bd[_t]),At!==_t){switch(_t){case Ea:s.depthFunc(s.NEVER);break;case Ta:s.depthFunc(s.ALWAYS);break;case Aa:s.depthFunc(s.LESS);break;case Ps:s.depthFunc(s.LEQUAL);break;case Ra:s.depthFunc(s.EQUAL);break;case Ca:s.depthFunc(s.GEQUAL);break;case Ia:s.depthFunc(s.GREATER);break;case Pa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}At=_t}},setLocked:function(_t){X=_t},setClear:function(_t){Pt!==_t&&(Pt=_t,Tt&&(_t=1-_t),s.clearDepth(_t))},reset:function(){X=!1,ut=null,At=null,Pt=null,Tt=!1}}}function n(){let X=!1,Tt=null,ut=null,At=null,Pt=null,_t=null,qt=null,zt=null,Me=null;return{setTest:function(_e){X||(_e?at(s.STENCIL_TEST):yt(s.STENCIL_TEST))},setMask:function(_e){Tt!==_e&&!X&&(s.stencilMask(_e),Tt=_e)},setFunc:function(_e,Ni,Wi){(ut!==_e||At!==Ni||Pt!==Wi)&&(s.stencilFunc(_e,Ni,Wi),ut=_e,At=Ni,Pt=Wi)},setOp:function(_e,Ni,Wi){(_t!==_e||qt!==Ni||zt!==Wi)&&(s.stencilOp(_e,Ni,Wi),_t=_e,qt=Ni,zt=Wi)},setLocked:function(_e){X=_e},setClear:function(_e){Me!==_e&&(s.clearStencil(_e),Me=_e)},reset:function(){X=!1,Tt=null,ut=null,At=null,Pt=null,_t=null,qt=null,zt=null,Me=null}}}let r=new e,o=new i,a=new n,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,m=[],_=null,p=!1,g=null,y=null,x=null,v=null,S=null,E=null,R=null,M=new dt(0,0,0),C=0,T=!1,P=null,b=null,B=null,H=null,z=null,Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,O=s.getParameter(s.VERSION);O.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(O)[1]),V=j>=1):O.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),V=j>=2);let k=null,it={},q=s.getParameter(s.SCISSOR_BOX),nt=s.getParameter(s.VIEWPORT),Ht=new Re().fromArray(q),Yt=new Re().fromArray(nt);function Nt(X,Tt,ut,At){let Pt=new Uint8Array(4),_t=s.createTexture();s.bindTexture(X,_t),s.texParameteri(X,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(X,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let qt=0;qt<ut;qt++)X===s.TEXTURE_3D||X===s.TEXTURE_2D_ARRAY?s.texImage3D(Tt,0,s.RGBA,1,1,At,0,s.RGBA,s.UNSIGNED_BYTE,Pt):s.texImage2D(Tt+qt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Pt);return _t}let et={};et[s.TEXTURE_2D]=Nt(s.TEXTURE_2D,s.TEXTURE_2D,1),et[s.TEXTURE_CUBE_MAP]=Nt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[s.TEXTURE_2D_ARRAY]=Nt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),et[s.TEXTURE_3D]=Nt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(s.DEPTH_TEST),o.setFunc(Ps),G(!1),ct(yh),at(s.CULL_FACE),U(Ai);function at(X){h[X]!==!0&&(s.enable(X),h[X]=!0)}function yt(X){h[X]!==!1&&(s.disable(X),h[X]=!1)}function $t(X,Tt){return d[X]!==Tt?(s.bindFramebuffer(X,Tt),d[X]=Tt,X===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=Tt),X===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=Tt),!0):!1}function wt(X,Tt){let ut=m,At=!1;if(X){ut=f.get(Tt),ut===void 0&&(ut=[],f.set(Tt,ut));let Pt=X.textures;if(ut.length!==Pt.length||ut[0]!==s.COLOR_ATTACHMENT0){for(let _t=0,qt=Pt.length;_t<qt;_t++)ut[_t]=s.COLOR_ATTACHMENT0+_t;ut.length=Pt.length,At=!0}}else ut[0]!==s.BACK&&(ut[0]=s.BACK,At=!0);At&&s.drawBuffers(ut)}function w(X){return _!==X?(s.useProgram(X),_=X,!0):!1}let ot={[jn]:s.FUNC_ADD,[Gf]:s.FUNC_SUBTRACT,[Wf]:s.FUNC_REVERSE_SUBTRACT};ot[Xf]=s.MIN,ot[qf]=s.MAX;let Z={[Yf]:s.ZERO,[$f]:s.ONE,[Zf]:s.SRC_COLOR,[Mh]:s.SRC_ALPHA,[ed]:s.SRC_ALPHA_SATURATE,[Qf]:s.DST_COLOR,[Jf]:s.DST_ALPHA,[Kf]:s.ONE_MINUS_SRC_COLOR,[wh]:s.ONE_MINUS_SRC_ALPHA,[td]:s.ONE_MINUS_DST_COLOR,[jf]:s.ONE_MINUS_DST_ALPHA,[id]:s.CONSTANT_COLOR,[nd]:s.ONE_MINUS_CONSTANT_COLOR,[sd]:s.CONSTANT_ALPHA,[rd]:s.ONE_MINUS_CONSTANT_ALPHA};function U(X,Tt,ut,At,Pt,_t,qt,zt,Me,_e){if(X===Ai){p===!0&&(yt(s.BLEND),p=!1);return}if(p===!1&&(at(s.BLEND),p=!0),X!==Vf){if(X!==g||_e!==T){if((y!==jn||S!==jn)&&(s.blendEquation(s.FUNC_ADD),y=jn,S=jn),_e)switch(X){case Ks:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ue:s.blendFunc(s.ONE,s.ONE);break;case bh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Kt("WebGLState: Invalid blending: ",X);break}else switch(X){case Ks:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ue:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case bh:Kt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sh:Kt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Kt("WebGLState: Invalid blending: ",X);break}x=null,v=null,E=null,R=null,M.set(0,0,0),C=0,g=X,T=_e}return}Pt=Pt||Tt,_t=_t||ut,qt=qt||At,(Tt!==y||Pt!==S)&&(s.blendEquationSeparate(ot[Tt],ot[Pt]),y=Tt,S=Pt),(ut!==x||At!==v||_t!==E||qt!==R)&&(s.blendFuncSeparate(Z[ut],Z[At],Z[_t],Z[qt]),x=ut,v=At,E=_t,R=qt),(zt.equals(M)===!1||Me!==C)&&(s.blendColor(zt.r,zt.g,zt.b,Me),M.copy(zt),C=Me),g=X,T=!1}function N(X,Tt){X.side===Ie?yt(s.CULL_FACE):at(s.CULL_FACE);let ut=X.side===Oe;Tt&&(ut=!ut),G(ut),X.blending===Ks&&X.transparent===!1?U(Ai):U(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);let At=X.stencilWrite;a.setTest(At),At&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),K(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?at(s.SAMPLE_ALPHA_TO_COVERAGE):yt(s.SAMPLE_ALPHA_TO_COVERAGE)}function G(X){P!==X&&(X?s.frontFace(s.CW):s.frontFace(s.CCW),P=X)}function ct(X){X!==kf?(at(s.CULL_FACE),X!==b&&(X===yh?s.cullFace(s.BACK):X===zf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):yt(s.CULL_FACE),b=X}function ft(X){X!==B&&(V&&s.lineWidth(X),B=X)}function K(X,Tt,ut){X?(at(s.POLYGON_OFFSET_FILL),(H!==Tt||z!==ut)&&(H=Tt,z=ut,o.getReversed()&&(Tt=-Tt),s.polygonOffset(Tt,ut))):yt(s.POLYGON_OFFSET_FILL)}function pt(X){X?at(s.SCISSOR_TEST):yt(s.SCISSOR_TEST)}function vt(X){X===void 0&&(X=s.TEXTURE0+Y-1),k!==X&&(s.activeTexture(X),k=X)}function F(X,Tt,ut){ut===void 0&&(k===null?ut=s.TEXTURE0+Y-1:ut=k);let At=it[ut];At===void 0&&(At={type:void 0,texture:void 0},it[ut]=At),(At.type!==X||At.texture!==Tt)&&(k!==ut&&(s.activeTexture(ut),k=ut),s.bindTexture(X,Tt||et[X]),At.type=X,At.texture=Tt)}function Lt(){let X=it[k];X!==void 0&&X.type!==void 0&&(s.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Xt(){try{s.compressedTexImage2D(...arguments)}catch(X){Kt("WebGLState:",X)}}function L(){try{s.compressedTexImage3D(...arguments)}catch(X){Kt("WebGLState:",X)}}function A(){try{s.texSubImage2D(...arguments)}catch(X){Kt("WebGLState:",X)}}function $(){try{s.texSubImage3D(...arguments)}catch(X){Kt("WebGLState:",X)}}function J(){try{s.compressedTexSubImage2D(...arguments)}catch(X){Kt("WebGLState:",X)}}function rt(){try{s.compressedTexSubImage3D(...arguments)}catch(X){Kt("WebGLState:",X)}}function gt(){try{s.texStorage2D(...arguments)}catch(X){Kt("WebGLState:",X)}}function bt(){try{s.texStorage3D(...arguments)}catch(X){Kt("WebGLState:",X)}}function lt(){try{s.texImage2D(...arguments)}catch(X){Kt("WebGLState:",X)}}function ht(){try{s.texImage3D(...arguments)}catch(X){Kt("WebGLState:",X)}}function St(X){return u[X]!==void 0?u[X]:s.getParameter(X)}function Vt(X,Tt){u[X]!==Tt&&(s.pixelStorei(X,Tt),u[X]=Tt)}function Et(X){Ht.equals(X)===!1&&(s.scissor(X.x,X.y,X.z,X.w),Ht.copy(X))}function Mt(X){Yt.equals(X)===!1&&(s.viewport(X.x,X.y,X.z,X.w),Yt.copy(X))}function kt(X,Tt){let ut=c.get(Tt);ut===void 0&&(ut=new WeakMap,c.set(Tt,ut));let At=ut.get(X);At===void 0&&(At=s.getUniformBlockIndex(Tt,X.name),ut.set(X,At))}function Wt(X,Tt){let At=c.get(Tt).get(X);l.get(Tt)!==At&&(s.uniformBlockBinding(Tt,At,X.__bindingPointIndex),l.set(Tt,At))}function te(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},k=null,it={},d={},f=new WeakMap,m=[],_=null,p=!1,g=null,y=null,x=null,v=null,S=null,E=null,R=null,M=new dt(0,0,0),C=0,T=!1,P=null,b=null,B=null,H=null,z=null,Ht.set(0,0,s.canvas.width,s.canvas.height),Yt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:yt,bindFramebuffer:$t,drawBuffers:wt,useProgram:w,setBlending:U,setMaterial:N,setFlipSided:G,setCullFace:ct,setLineWidth:ft,setPolygonOffset:K,setScissorTest:pt,activeTexture:vt,bindTexture:F,unbindTexture:Lt,compressedTexImage2D:Xt,compressedTexImage3D:L,texImage2D:lt,texImage3D:ht,pixelStorei:Vt,getParameter:St,updateUBOMapping:kt,uniformBlockBinding:Wt,texStorage2D:gt,texStorage3D:bt,texSubImage2D:A,texSubImage3D:$,compressedTexSubImage2D:J,compressedTexSubImage3D:rt,scissor:Et,viewport:Mt,reset:te}}function Py(s,t,e,i,n,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,h=new WeakMap,u=new Set,d,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,A){return m?new OffscreenCanvas(L,A):Pr("canvas")}function p(L,A,$){let J=1,rt=Xt(L);if((rt.width>$||rt.height>$)&&(J=$/Math.max(rt.width,rt.height)),J<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let gt=Math.floor(J*rt.width),bt=Math.floor(J*rt.height);d===void 0&&(d=_(gt,bt));let lt=A?_(gt,bt):d;return lt.width=gt,lt.height=bt,lt.getContext("2d").drawImage(L,0,0,gt,bt),Zt("WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+gt+"x"+bt+")."),lt}else return"data"in L&&Zt("WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),L;return L}function g(L){return L.generateMipmaps}function y(L){s.generateMipmap(L)}function x(L){return L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?s.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(L,A,$,J,rt,gt=!1){if(L!==null){if(s[L]!==void 0)return s[L];Zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let bt;J&&(bt=t.get("EXT_texture_norm16"),bt||Zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let lt=A;if(A===s.RED&&($===s.FLOAT&&(lt=s.R32F),$===s.HALF_FLOAT&&(lt=s.R16F),$===s.UNSIGNED_BYTE&&(lt=s.R8),$===s.UNSIGNED_SHORT&&bt&&(lt=bt.R16_EXT),$===s.SHORT&&bt&&(lt=bt.R16_SNORM_EXT)),A===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(lt=s.R8UI),$===s.UNSIGNED_SHORT&&(lt=s.R16UI),$===s.UNSIGNED_INT&&(lt=s.R32UI),$===s.BYTE&&(lt=s.R8I),$===s.SHORT&&(lt=s.R16I),$===s.INT&&(lt=s.R32I)),A===s.RG&&($===s.FLOAT&&(lt=s.RG32F),$===s.HALF_FLOAT&&(lt=s.RG16F),$===s.UNSIGNED_BYTE&&(lt=s.RG8),$===s.UNSIGNED_SHORT&&bt&&(lt=bt.RG16_EXT),$===s.SHORT&&bt&&(lt=bt.RG16_SNORM_EXT)),A===s.RG_INTEGER&&($===s.UNSIGNED_BYTE&&(lt=s.RG8UI),$===s.UNSIGNED_SHORT&&(lt=s.RG16UI),$===s.UNSIGNED_INT&&(lt=s.RG32UI),$===s.BYTE&&(lt=s.RG8I),$===s.SHORT&&(lt=s.RG16I),$===s.INT&&(lt=s.RG32I)),A===s.RGB_INTEGER&&($===s.UNSIGNED_BYTE&&(lt=s.RGB8UI),$===s.UNSIGNED_SHORT&&(lt=s.RGB16UI),$===s.UNSIGNED_INT&&(lt=s.RGB32UI),$===s.BYTE&&(lt=s.RGB8I),$===s.SHORT&&(lt=s.RGB16I),$===s.INT&&(lt=s.RGB32I)),A===s.RGBA_INTEGER&&($===s.UNSIGNED_BYTE&&(lt=s.RGBA8UI),$===s.UNSIGNED_SHORT&&(lt=s.RGBA16UI),$===s.UNSIGNED_INT&&(lt=s.RGBA32UI),$===s.BYTE&&(lt=s.RGBA8I),$===s.SHORT&&(lt=s.RGBA16I),$===s.INT&&(lt=s.RGBA32I)),A===s.RGB&&($===s.UNSIGNED_SHORT&&bt&&(lt=bt.RGB16_EXT),$===s.SHORT&&bt&&(lt=bt.RGB16_SNORM_EXT),$===s.UNSIGNED_INT_5_9_9_9_REV&&(lt=s.RGB9_E5),$===s.UNSIGNED_INT_10F_11F_11F_REV&&(lt=s.R11F_G11F_B10F)),A===s.RGBA){let ht=gt?Ir:oe.getTransfer(rt);$===s.FLOAT&&(lt=s.RGBA32F),$===s.HALF_FLOAT&&(lt=s.RGBA16F),$===s.UNSIGNED_BYTE&&(lt=ht===me?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT&&bt&&(lt=bt.RGBA16_EXT),$===s.SHORT&&bt&&(lt=bt.RGBA16_SNORM_EXT),$===s.UNSIGNED_SHORT_4_4_4_4&&(lt=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(lt=s.RGB5_A1)}return(lt===s.R16F||lt===s.R32F||lt===s.RG16F||lt===s.RG32F||lt===s.RGBA16F||lt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function S(L,A){let $;return L?A===null||A===Vi||A===js?$=s.DEPTH24_STENCIL8:A===Ri?$=s.DEPTH32F_STENCIL8:A===Js&&($=s.DEPTH24_STENCIL8,Zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Vi||A===js?$=s.DEPTH_COMPONENT24:A===Ri?$=s.DEPTH_COMPONENT32F:A===Js&&($=s.DEPTH_COMPONENT16),$}function E(L,A){return g(L)===!0||L.isFramebufferTexture&&L.minFilter!==Xe&&L.minFilter!==Ze?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function R(L){let A=L.target;A.removeEventListener("dispose",R),C(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&u.delete(A)}function M(L){let A=L.target;A.removeEventListener("dispose",M),P(A)}function C(L){let A=i.get(L);if(A.__webglInit===void 0)return;let $=L.source,J=f.get($);if(J){let rt=J[A.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&T(L),Object.keys(J).length===0&&f.delete($)}i.remove(L)}function T(L){let A=i.get(L);s.deleteTexture(A.__webglTexture);let $=L.source,J=f.get($);delete J[A.__cacheKey],o.memory.textures--}function P(L){let A=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(A.__webglFramebuffer[J]))for(let rt=0;rt<A.__webglFramebuffer[J].length;rt++)s.deleteFramebuffer(A.__webglFramebuffer[J][rt]);else s.deleteFramebuffer(A.__webglFramebuffer[J]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[J])}else{if(Array.isArray(A.__webglFramebuffer))for(let J=0;J<A.__webglFramebuffer.length;J++)s.deleteFramebuffer(A.__webglFramebuffer[J]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let J=0;J<A.__webglColorRenderbuffer.length;J++)A.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[J]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}let $=L.textures;for(let J=0,rt=$.length;J<rt;J++){let gt=i.get($[J]);gt.__webglTexture&&(s.deleteTexture(gt.__webglTexture),o.memory.textures--),i.remove($[J])}i.remove(L)}let b=0;function B(){b=0}function H(){return b}function z(L){b=L}function Y(){let L=b;return L>=n.maxTextures&&Zt("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+n.maxTextures),b+=1,L}function V(L){let A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function j(L,A){let $=i.get(L);if(L.isVideoTexture&&F(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&$.__version!==L.version){let J=L.image;if(J===null)Zt("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Zt("WebGLRenderer: Texture marked for update but image is incomplete");else{yt($,L,A);return}}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+A)}function O(L,A){let $=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){yt($,L,A);return}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+A)}function k(L,A){let $=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){yt($,L,A);return}e.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+A)}function it(L,A){let $=i.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&$.__version!==L.version){$t($,L,A);return}e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+A)}let q={[Ls]:s.REPEAT,[$i]:s.CLAMP_TO_EDGE,[La]:s.MIRRORED_REPEAT},nt={[Xe]:s.NEAREST,[ld]:s.NEAREST_MIPMAP_NEAREST,[So]:s.NEAREST_MIPMAP_LINEAR,[Ze]:s.LINEAR,[ll]:s.LINEAR_MIPMAP_NEAREST,[Ln]:s.LINEAR_MIPMAP_LINEAR},Ht={[fd]:s.NEVER,[_d]:s.ALWAYS,[dd]:s.LESS,[Yl]:s.LEQUAL,[pd]:s.EQUAL,[$l]:s.GEQUAL,[md]:s.GREATER,[gd]:s.NOTEQUAL};function Yt(L,A){if(A.type===Ri&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===Ze||A.magFilter===ll||A.magFilter===So||A.magFilter===Ln||A.minFilter===Ze||A.minFilter===ll||A.minFilter===So||A.minFilter===Ln)&&Zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(L,s.TEXTURE_WRAP_S,q[A.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,q[A.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,q[A.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,nt[A.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,nt[A.minFilter]),A.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,Ht[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Xe||A.minFilter!==So&&A.minFilter!==Ln||A.type===Ri&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){let $=t.get("EXT_texture_filter_anisotropic");s.texParameterf(L,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,n.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function Nt(L,A){let $=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",R));let J=A.source,rt=f.get(J);rt===void 0&&(rt={},f.set(J,rt));let gt=V(A);if(gt!==L.__cacheKey){rt[gt]===void 0&&(rt[gt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,$=!0),rt[gt].usedTimes++;let bt=rt[L.__cacheKey];bt!==void 0&&(rt[L.__cacheKey].usedTimes--,bt.usedTimes===0&&T(A)),L.__cacheKey=gt,L.__webglTexture=rt[gt].texture}return $}function et(L,A,$){return Math.floor(Math.floor(L/$)/A)}function at(L,A,$,J){let gt=L.updateRanges;if(gt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,A.width,A.height,$,J,A.data);else{gt.sort((Vt,Et)=>Vt.start-Et.start);let bt=0;for(let Vt=1;Vt<gt.length;Vt++){let Et=gt[bt],Mt=gt[Vt],kt=Et.start+Et.count,Wt=et(Mt.start,A.width,4),te=et(Et.start,A.width,4);Mt.start<=kt+1&&Wt===te&&et(Mt.start+Mt.count-1,A.width,4)===Wt?Et.count=Math.max(Et.count,Mt.start+Mt.count-Et.start):(++bt,gt[bt]=Mt)}gt.length=bt+1;let lt=e.getParameter(s.UNPACK_ROW_LENGTH),ht=e.getParameter(s.UNPACK_SKIP_PIXELS),St=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,A.width);for(let Vt=0,Et=gt.length;Vt<Et;Vt++){let Mt=gt[Vt],kt=Math.floor(Mt.start/4),Wt=Math.ceil(Mt.count/4),te=kt%A.width,X=Math.floor(kt/A.width),Tt=Wt,ut=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,te),e.pixelStorei(s.UNPACK_SKIP_ROWS,X),e.texSubImage2D(s.TEXTURE_2D,0,te,X,Tt,ut,$,J,A.data)}L.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,lt),e.pixelStorei(s.UNPACK_SKIP_PIXELS,ht),e.pixelStorei(s.UNPACK_SKIP_ROWS,St)}}function yt(L,A,$){let J=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(J=s.TEXTURE_3D);let rt=Nt(L,A),gt=A.source;e.bindTexture(J,L.__webglTexture,s.TEXTURE0+$);let bt=i.get(gt);if(gt.version!==bt.__version||rt===!0){if(e.activeTexture(s.TEXTURE0+$),(typeof ImageBitmap<"u"&&A.image instanceof ImageBitmap)===!1){let ut=oe.getPrimaries(oe.workingColorSpace),At=A.colorSpace===fn?null:oe.getPrimaries(A.colorSpace),Pt=A.colorSpace===fn||ut===At?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt)}e.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment);let ht=p(A.image,!1,n.maxTextureSize);ht=Lt(A,ht);let St=r.convert(A.format,A.colorSpace),Vt=r.convert(A.type),Et=v(A.internalFormat,St,Vt,A.normalized,A.colorSpace,A.isVideoTexture);Yt(J,A);let Mt,kt=A.mipmaps,Wt=A.isVideoTexture!==!0,te=bt.__version===void 0||rt===!0,X=gt.dataReady,Tt=E(A,ht);if(A.isDepthTexture)Et=S(A.format===Nn,A.type),te&&(Wt?e.texStorage2D(s.TEXTURE_2D,1,Et,ht.width,ht.height):e.texImage2D(s.TEXTURE_2D,0,Et,ht.width,ht.height,0,St,Vt,null));else if(A.isDataTexture)if(kt.length>0){Wt&&te&&e.texStorage2D(s.TEXTURE_2D,Tt,Et,kt[0].width,kt[0].height);for(let ut=0,At=kt.length;ut<At;ut++)Mt=kt[ut],Wt?X&&e.texSubImage2D(s.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,St,Vt,Mt.data):e.texImage2D(s.TEXTURE_2D,ut,Et,Mt.width,Mt.height,0,St,Vt,Mt.data);A.generateMipmaps=!1}else Wt?(te&&e.texStorage2D(s.TEXTURE_2D,Tt,Et,ht.width,ht.height),X&&at(A,ht,St,Vt)):e.texImage2D(s.TEXTURE_2D,0,Et,ht.width,ht.height,0,St,Vt,ht.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Wt&&te&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Tt,Et,kt[0].width,kt[0].height,ht.depth);for(let ut=0,At=kt.length;ut<At;ut++)if(Mt=kt[ut],A.format!==Ci)if(St!==null)if(Wt){if(X)if(A.layerUpdates.size>0){let Pt=zh(Mt.width,Mt.height,A.format,A.type);for(let _t of A.layerUpdates){let qt=Mt.data.subarray(_t*Pt/Mt.data.BYTES_PER_ELEMENT,(_t+1)*Pt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ut,0,0,_t,Mt.width,Mt.height,1,St,qt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ut,0,0,0,Mt.width,Mt.height,ht.depth,St,Mt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ut,Et,Mt.width,Mt.height,ht.depth,0,Mt.data,0,0);else Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?X&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,ut,0,0,0,Mt.width,Mt.height,ht.depth,St,Vt,Mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ut,Et,Mt.width,Mt.height,ht.depth,0,St,Vt,Mt.data);A.layerUpdates.size>0&&A.clearLayerUpdates()}else{Wt&&te&&e.texStorage2D(s.TEXTURE_2D,Tt,Et,kt[0].width,kt[0].height);for(let ut=0,At=kt.length;ut<At;ut++)Mt=kt[ut],A.format!==Ci?St!==null?Wt?X&&e.compressedTexSubImage2D(s.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,St,Mt.data):e.compressedTexImage2D(s.TEXTURE_2D,ut,Et,Mt.width,Mt.height,0,Mt.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?X&&e.texSubImage2D(s.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,St,Vt,Mt.data):e.texImage2D(s.TEXTURE_2D,ut,Et,Mt.width,Mt.height,0,St,Vt,Mt.data)}else if(A.isDataArrayTexture)if(Wt){if(te&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Tt,Et,ht.width,ht.height,ht.depth),X)if(A.layerUpdates.size>0){let ut=zh(ht.width,ht.height,A.format,A.type);for(let At of A.layerUpdates){let Pt=ht.data.subarray(At*ut/ht.data.BYTES_PER_ELEMENT,(At+1)*ut/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,At,ht.width,ht.height,1,St,Vt,Pt)}A.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,St,Vt,ht.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Et,ht.width,ht.height,ht.depth,0,St,Vt,ht.data);else if(A.isData3DTexture)Wt?(te&&e.texStorage3D(s.TEXTURE_3D,Tt,Et,ht.width,ht.height,ht.depth),X&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,St,Vt,ht.data)):e.texImage3D(s.TEXTURE_3D,0,Et,ht.width,ht.height,ht.depth,0,St,Vt,ht.data);else if(A.isFramebufferTexture){if(te)if(Wt)e.texStorage2D(s.TEXTURE_2D,Tt,Et,ht.width,ht.height);else{let ut=ht.width,At=ht.height;for(let Pt=0;Pt<Tt;Pt++)e.texImage2D(s.TEXTURE_2D,Pt,Et,ut,At,0,St,Vt,null),ut>>=1,At>>=1}}else if(A.isHTMLTexture){if("texElementImage2D"in s){let ut=s.canvas;if(ut.hasAttribute("layoutsubtree")||ut.setAttribute("layoutsubtree","true"),ht.parentNode!==ut){ut.appendChild(ht),u.add(A),ut.onpaint=At=>{let Pt=At.changedElements;for(let _t of u)Pt.includes(_t.image)&&(_t.needsUpdate=!0)},ut.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ht);else{let Pt=s.RGBA,_t=s.RGBA,qt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Pt,_t,qt,ht)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(kt.length>0){if(Wt&&te){let ut=Xt(kt[0]);e.texStorage2D(s.TEXTURE_2D,Tt,Et,ut.width,ut.height)}for(let ut=0,At=kt.length;ut<At;ut++)Mt=kt[ut],Wt?X&&e.texSubImage2D(s.TEXTURE_2D,ut,0,0,St,Vt,Mt):e.texImage2D(s.TEXTURE_2D,ut,Et,St,Vt,Mt);A.generateMipmaps=!1}else if(Wt){if(te){let ut=Xt(ht);e.texStorage2D(s.TEXTURE_2D,Tt,Et,ut.width,ut.height)}X&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,St,Vt,ht)}else e.texImage2D(s.TEXTURE_2D,0,Et,St,Vt,ht);g(A)&&y(J),bt.__version=gt.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function $t(L,A,$){if(A.image.length!==6)return;let J=Nt(L,A),rt=A.source;e.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+$);let gt=i.get(rt);if(rt.version!==gt.__version||J===!0){e.activeTexture(s.TEXTURE0+$);let bt=oe.getPrimaries(oe.workingColorSpace),lt=A.colorSpace===fn?null:oe.getPrimaries(A.colorSpace),ht=A.colorSpace===fn||bt===lt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);let St=A.isCompressedTexture||A.image[0].isCompressedTexture,Vt=A.image[0]&&A.image[0].isDataTexture,Et=[];for(let _t=0;_t<6;_t++)!St&&!Vt?Et[_t]=p(A.image[_t],!0,n.maxCubemapSize):Et[_t]=Vt?A.image[_t].image:A.image[_t],Et[_t]=Lt(A,Et[_t]);let Mt=Et[0],kt=r.convert(A.format,A.colorSpace),Wt=r.convert(A.type),te=v(A.internalFormat,kt,Wt,A.normalized,A.colorSpace),X=A.isVideoTexture!==!0,Tt=gt.__version===void 0||J===!0,ut=rt.dataReady,At=E(A,Mt);Yt(s.TEXTURE_CUBE_MAP,A);let Pt;if(St){X&&Tt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,At,te,Mt.width,Mt.height);for(let _t=0;_t<6;_t++){Pt=Et[_t].mipmaps;for(let qt=0;qt<Pt.length;qt++){let zt=Pt[qt];A.format!==Ci?kt!==null?X?ut&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt,0,0,zt.width,zt.height,kt,zt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt,te,zt.width,zt.height,0,zt.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?ut&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt,0,0,zt.width,zt.height,kt,Wt,zt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt,te,zt.width,zt.height,0,kt,Wt,zt.data)}}}else{if(Pt=A.mipmaps,X&&Tt){Pt.length>0&&At++;let _t=Xt(Et[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,At,te,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(Vt){X?ut&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Et[_t].width,Et[_t].height,kt,Wt,Et[_t].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,te,Et[_t].width,Et[_t].height,0,kt,Wt,Et[_t].data);for(let qt=0;qt<Pt.length;qt++){let Me=Pt[qt].image[_t].image;X?ut&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt+1,0,0,Me.width,Me.height,kt,Wt,Me.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt+1,te,Me.width,Me.height,0,kt,Wt,Me.data)}}else{X?ut&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,kt,Wt,Et[_t]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,te,kt,Wt,Et[_t]);for(let qt=0;qt<Pt.length;qt++){let zt=Pt[qt];X?ut&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt+1,0,0,kt,Wt,zt.image[_t]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt+1,te,kt,Wt,zt.image[_t])}}}g(A)&&y(s.TEXTURE_CUBE_MAP),gt.__version=rt.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function wt(L,A,$,J,rt,gt){let bt=r.convert($.format,$.colorSpace),lt=r.convert($.type),ht=v($.internalFormat,bt,lt,$.normalized,$.colorSpace),St=i.get(A),Vt=i.get($);if(Vt.__renderTarget=A,!St.__hasExternalTextures){let Et=Math.max(1,A.width>>gt),Mt=Math.max(1,A.height>>gt);rt===s.TEXTURE_3D||rt===s.TEXTURE_2D_ARRAY?e.texImage3D(rt,gt,ht,Et,Mt,A.depth,0,bt,lt,null):e.texImage2D(rt,gt,ht,Et,Mt,0,bt,lt,null)}e.bindFramebuffer(s.FRAMEBUFFER,L),vt(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,rt,Vt.__webglTexture,0,pt(A)):(rt===s.TEXTURE_2D||rt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,rt,Vt.__webglTexture,gt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function w(L,A,$){if(s.bindRenderbuffer(s.RENDERBUFFER,L),A.depthBuffer){let J=A.depthTexture,rt=J&&J.isDepthTexture?J.type:null,gt=S(A.stencilBuffer,rt),bt=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;vt(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,pt(A),gt,A.width,A.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,pt(A),gt,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,gt,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,bt,s.RENDERBUFFER,L)}else{let J=A.textures;for(let rt=0;rt<J.length;rt++){let gt=J[rt],bt=r.convert(gt.format,gt.colorSpace),lt=r.convert(gt.type),ht=v(gt.internalFormat,bt,lt,gt.normalized,gt.colorSpace);vt(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,pt(A),ht,A.width,A.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,pt(A),ht,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,ht,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ot(L,A,$){let J=A.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let rt=i.get(A.depthTexture);if(rt.__renderTarget=A,(!rt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),J){if(rt.__webglInit===void 0&&(rt.__webglInit=!0,A.depthTexture.addEventListener("dispose",R)),rt.__webglTexture===void 0){rt.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,rt.__webglTexture),Yt(s.TEXTURE_CUBE_MAP,A.depthTexture);let St=r.convert(A.depthTexture.format),Vt=r.convert(A.depthTexture.type),Et;A.depthTexture.format===Ki?Et=s.DEPTH_COMPONENT24:A.depthTexture.format===Nn&&(Et=s.DEPTH24_STENCIL8);for(let Mt=0;Mt<6;Mt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,Et,A.width,A.height,0,St,Vt,null)}}else j(A.depthTexture,0);let gt=rt.__webglTexture,bt=pt(A),lt=J?s.TEXTURE_CUBE_MAP_POSITIVE_X+$:s.TEXTURE_2D,ht=A.depthTexture.format===Nn?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(A.depthTexture.format===Ki)vt(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ht,lt,gt,0,bt):s.framebufferTexture2D(s.FRAMEBUFFER,ht,lt,gt,0);else if(A.depthTexture.format===Nn)vt(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ht,lt,gt,0,bt):s.framebufferTexture2D(s.FRAMEBUFFER,ht,lt,gt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Z(L){let A=i.get(L),$=L.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==L.depthTexture){let J=L.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),J){let rt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,J.removeEventListener("dispose",rt)};J.addEventListener("dispose",rt),A.__depthDisposeCallback=rt}A.__boundDepthTexture=J}if(L.depthTexture&&!A.__autoAllocateDepthBuffer)if($)for(let J=0;J<6;J++)ot(A.__webglFramebuffer[J],L,J);else{let J=L.texture.mipmaps;J&&J.length>0?ot(A.__webglFramebuffer[0],L,0):ot(A.__webglFramebuffer,L,0)}else if($){A.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[J]),A.__webglDepthbuffer[J]===void 0)A.__webglDepthbuffer[J]=s.createRenderbuffer(),w(A.__webglDepthbuffer[J],L,!1);else{let rt=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=A.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,gt),s.framebufferRenderbuffer(s.FRAMEBUFFER,rt,s.RENDERBUFFER,gt)}}else{let J=L.texture.mipmaps;if(J&&J.length>0?e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),w(A.__webglDepthbuffer,L,!1);else{let rt=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,gt),s.framebufferRenderbuffer(s.FRAMEBUFFER,rt,s.RENDERBUFFER,gt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function U(L,A,$){let J=i.get(L);A!==void 0&&wt(J.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&Z(L)}function N(L){let A=L.texture,$=i.get(L),J=i.get(A);L.addEventListener("dispose",M);let rt=L.textures,gt=L.isWebGLCubeRenderTarget===!0,bt=rt.length>1;if(bt||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=A.version,o.memory.textures++),gt){$.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(A.mipmaps&&A.mipmaps.length>0){$.__webglFramebuffer[lt]=[];for(let ht=0;ht<A.mipmaps.length;ht++)$.__webglFramebuffer[lt][ht]=s.createFramebuffer()}else $.__webglFramebuffer[lt]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){$.__webglFramebuffer=[];for(let lt=0;lt<A.mipmaps.length;lt++)$.__webglFramebuffer[lt]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(bt)for(let lt=0,ht=rt.length;lt<ht;lt++){let St=i.get(rt[lt]);St.__webglTexture===void 0&&(St.__webglTexture=s.createTexture(),o.memory.textures++)}if(L.samples>0&&vt(L)===!1){$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let lt=0;lt<rt.length;lt++){let ht=rt[lt];$.__webglColorRenderbuffer[lt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[lt]);let St=r.convert(ht.format,ht.colorSpace),Vt=r.convert(ht.type),Et=v(ht.internalFormat,St,Vt,ht.normalized,ht.colorSpace,L.isXRRenderTarget===!0),Mt=pt(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt,Et,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.RENDERBUFFER,$.__webglColorRenderbuffer[lt])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),w($.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(gt){e.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),Yt(s.TEXTURE_CUBE_MAP,A);for(let lt=0;lt<6;lt++)if(A.mipmaps&&A.mipmaps.length>0)for(let ht=0;ht<A.mipmaps.length;ht++)wt($.__webglFramebuffer[lt][ht],L,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ht);else wt($.__webglFramebuffer[lt],L,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(A)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let lt=0,ht=rt.length;lt<ht;lt++){let St=rt[lt],Vt=i.get(St),Et=s.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Et=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Et,Vt.__webglTexture),Yt(Et,St),wt($.__webglFramebuffer,L,St,s.COLOR_ATTACHMENT0+lt,Et,0),g(St)&&y(Et)}e.unbindTexture()}else{let lt=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(lt=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(lt,J.__webglTexture),Yt(lt,A),A.mipmaps&&A.mipmaps.length>0)for(let ht=0;ht<A.mipmaps.length;ht++)wt($.__webglFramebuffer[ht],L,A,s.COLOR_ATTACHMENT0,lt,ht);else wt($.__webglFramebuffer,L,A,s.COLOR_ATTACHMENT0,lt,0);g(A)&&y(lt),e.unbindTexture()}L.depthBuffer&&Z(L)}function G(L){let A=L.textures;for(let $=0,J=A.length;$<J;$++){let rt=A[$];if(g(rt)){let gt=x(L),bt=i.get(rt).__webglTexture;e.bindTexture(gt,bt),y(gt),e.unbindTexture()}}}let ct=[],ft=[];function K(L){if(L.samples>0){if(vt(L)===!1){let A=L.textures,$=L.width,J=L.height,rt=s.COLOR_BUFFER_BIT,gt=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,bt=i.get(L),lt=A.length>1;if(lt)for(let St=0;St<A.length;St++)e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer);let ht=L.texture.mipmaps;ht&&ht.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let St=0;St<A.length;St++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(rt|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(rt|=s.STENCIL_BUFFER_BIT)),lt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,bt.__webglColorRenderbuffer[St]);let Vt=i.get(A[St]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Vt,0)}s.blitFramebuffer(0,0,$,J,0,0,$,J,rt,s.NEAREST),l===!0&&(ct.length=0,ft.length=0,ct.push(s.COLOR_ATTACHMENT0+St),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(ct.push(gt),ft.push(gt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ft)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ct))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),lt)for(let St=0;St<A.length;St++){e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,bt.__webglColorRenderbuffer[St]);let Vt=i.get(A[St]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,Vt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&l){let A=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function pt(L){return Math.min(n.maxSamples,L.samples)}function vt(L){let A=i.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function F(L){let A=o.render.frame;h.get(L)!==A&&(h.set(L,A),L.update())}function Lt(L,A){let $=L.colorSpace,J=L.format,rt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||$!==Cr&&$!==fn&&(oe.getTransfer($)===me?(J!==Ci||rt!==fi)&&Zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Kt("WebGLTextures: Unsupported texture color space:",$)),A}function Xt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=B,this.getTextureUnits=H,this.setTextureUnits=z,this.setTexture2D=j,this.setTexture2DArray=O,this.setTexture3D=k,this.setTextureCube=it,this.rebindTextures=U,this.setupRenderTarget=N,this.updateRenderTargetMipmap=G,this.updateMultisampleRenderTarget=K,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=vt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Ly(s,t){function e(i,n=fn){let r,o=oe.getTransfer(n);if(i===fi)return s.UNSIGNED_BYTE;if(i===hl)return s.UNSIGNED_SHORT_4_4_4_4;if(i===ul)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Ch)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Ih)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ah)return s.BYTE;if(i===Rh)return s.SHORT;if(i===Js)return s.UNSIGNED_SHORT;if(i===cl)return s.INT;if(i===Vi)return s.UNSIGNED_INT;if(i===Ri)return s.FLOAT;if(i===Je)return s.HALF_FLOAT;if(i===Ph)return s.ALPHA;if(i===Lh)return s.RGB;if(i===Ci)return s.RGBA;if(i===Ki)return s.DEPTH_COMPONENT;if(i===Nn)return s.DEPTH_STENCIL;if(i===fl)return s.RED;if(i===dl)return s.RED_INTEGER;if(i===Dn)return s.RG;if(i===pl)return s.RG_INTEGER;if(i===ml)return s.RGBA_INTEGER;if(i===Mo||i===wo||i===Eo||i===To)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Mo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Mo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===wo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Eo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===To)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===gl||i===_l||i===xl||i===vl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===gl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_l)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===vl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yl||i===bl||i===Sl||i===Ml||i===wl||i===Ao||i===El)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===yl||i===bl)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Sl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ml)return r.COMPRESSED_R11_EAC;if(i===wl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ao)return r.COMPRESSED_RG11_EAC;if(i===El)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Tl||i===Al||i===Rl||i===Cl||i===Il||i===Pl||i===Ll||i===Nl||i===Dl||i===Ul||i===Fl||i===Bl||i===Ol||i===kl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Tl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Al)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Rl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Il)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ll)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Nl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Dl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ul)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Fl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Bl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ol)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===kl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zl||i===Hl||i===Vl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===zl)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Hl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Gl||i===Wl||i===Ro||i===Xl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Gl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Wl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ro)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===js?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var Ny=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dy=`
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

}`,ru=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Hr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ce({vertexShader:Ny,fragmentShader:Dy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ft(new ni(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ou=class extends Ji{constructor(t,e){super();let i=this,n=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,_=typeof XRWebGLBinding<"u",p=new ru,g={},y=e.getContextAttributes(),x=null,v=null,S=[],E=[],R=new xt,M=null,C=null,T=new ii;T.viewport=new Re;let P=new ii;P.viewport=new Re;let b=[T,P],B=new sl,H=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let at=S[et];return at===void 0&&(at=new Os,S[et]=at),at.getTargetRaySpace()},this.getControllerGrip=function(et){let at=S[et];return at===void 0&&(at=new Os,S[et]=at),at.getGripSpace()},this.getHand=function(et){let at=S[et];return at===void 0&&(at=new Os,S[et]=at),at.getHandSpace()};function Y(et){let at=E.indexOf(et.inputSource);if(at===-1)return;let yt=S[at];yt!==void 0&&(yt.update(et.inputSource,et.frame,c||o),yt.dispatchEvent({type:et.type,data:et.inputSource}))}function V(){n.removeEventListener("select",Y),n.removeEventListener("selectstart",Y),n.removeEventListener("selectend",Y),n.removeEventListener("squeeze",Y),n.removeEventListener("squeezestart",Y),n.removeEventListener("squeezeend",Y),n.removeEventListener("end",V),n.removeEventListener("inputsourceschange",j);for(let et=0;et<S.length;et++){let at=E[et];at!==null&&(E[et]=null,S[et].disconnect(at))}H=null,z=null,p.reset();for(let et in g)delete g[et];if(t.setRenderTarget(x),f=null,d=null,u=null,n=null,v=null,Nt.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(R.width,R.height,!1),C!==null){let et=C.camera;et.fov=C.fov,et.zoom=C.zoom,et.updateProjectionMatrix(),C=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){r=et,i.isPresenting===!0&&Zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){a=et,i.isPresenting===!0&&Zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(et){c=et},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(n,e)),u},this.getFrame=function(){return m},this.getSession=function(){return n},this.setSession=async function(et){if(n=et,n!==null){if(x=t.getRenderTarget(),n.addEventListener("select",Y),n.addEventListener("selectstart",Y),n.addEventListener("selectend",Y),n.addEventListener("squeeze",Y),n.addEventListener("squeezestart",Y),n.addEventListener("squeezeend",Y),n.addEventListener("end",V),n.addEventListener("inputsourceschange",j),y.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,$t=null,wt=null;y.depth&&(wt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=y.stencil?Nn:Ki,$t=y.stencil?js:Vi);let w={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(w),n.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new Be(d.textureWidth,d.textureHeight,{format:Ci,type:fi,depthTexture:new En(d.textureWidth,d.textureHeight,$t,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let yt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,e,yt),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Be(f.framebufferWidth,f.framebufferHeight,{format:Ci,type:fi,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await n.requestReferenceSpace(a),Nt.setContext(n),Nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function j(et){for(let at=0;at<et.removed.length;at++){let yt=et.removed[at],$t=E.indexOf(yt);$t>=0&&(E[$t]=null,S[$t].disconnect(yt))}for(let at=0;at<et.added.length;at++){let yt=et.added[at],$t=E.indexOf(yt);if($t===-1){for(let w=0;w<S.length;w++)if(w>=E.length){E.push(yt),$t=w;break}else if(E[w]===null){E[w]=yt,$t=w;break}if($t===-1)break}let wt=S[$t];wt&&wt.connect(yt)}}let O=new D,k=new D;function it(et,at,yt){O.setFromMatrixPosition(at.matrixWorld),k.setFromMatrixPosition(yt.matrixWorld);let $t=O.distanceTo(k),wt=at.projectionMatrix.elements,w=yt.projectionMatrix.elements,ot=wt[14]/(wt[10]-1),Z=wt[14]/(wt[10]+1),U=(wt[9]+1)/wt[5],N=(wt[9]-1)/wt[5],G=(wt[8]-1)/wt[0],ct=(w[8]+1)/w[0],ft=ot*G,K=ot*ct,pt=$t/(-G+ct),vt=pt*-G;if(at.matrixWorld.decompose(et.position,et.quaternion,et.scale),et.translateX(vt),et.translateZ(pt),et.matrixWorld.compose(et.position,et.quaternion,et.scale),et.matrixWorldInverse.copy(et.matrixWorld).invert(),wt[10]===-1)et.projectionMatrix.copy(at.projectionMatrix),et.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let F=ot+pt,Lt=Z+pt,Xt=ft-vt,L=K+($t-vt),A=U*Z/Lt*F,$=N*Z/Lt*F;et.projectionMatrix.makePerspective(Xt,L,A,$,F,Lt),et.projectionMatrixInverse.copy(et.projectionMatrix).invert()}}function q(et,at){at===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(at.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(n===null)return;let at=et.near,yt=et.far;p.texture!==null&&(p.depthNear>0&&(at=p.depthNear),p.depthFar>0&&(yt=p.depthFar)),B.near=P.near=T.near=at,B.far=P.far=T.far=yt,(H!==B.near||z!==B.far)&&(n.updateRenderState({depthNear:B.near,depthFar:B.far}),H=B.near,z=B.far),B.layers.mask=et.layers.mask|6,T.layers.mask=B.layers.mask&-5,P.layers.mask=B.layers.mask&-3;let $t=et.parent,wt=B.cameras;q(B,$t);for(let w=0;w<wt.length;w++)q(wt[w],$t);wt.length===2?it(B,T,P):B.projectionMatrix.copy(T.projectionMatrix),C===null&&et.isPerspectiveCamera&&(C={camera:et,fov:et.fov,zoom:et.zoom}),nt(et,B,$t)};function nt(et,at,yt){yt===null?et.matrix.copy(at.matrixWorld):(et.matrix.copy(yt.matrixWorld),et.matrix.invert(),et.matrix.multiply(at.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(at.projectionMatrix),et.projectionMatrixInverse.copy(at.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=Us*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(et){l=et,d!==null&&(d.fixedFoveation=et),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=et)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(B)},this.getCameraTexture=function(et){return g[et]};let Ht=null;function Yt(et,at){if(h=at.getViewerPose(c||o),m=at,h!==null){let yt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let $t=!1;yt.length!==B.cameras.length&&(B.cameras.length=0,$t=!0);for(let Z=0;Z<yt.length;Z++){let U=yt[Z],N=null;if(f!==null)N=f.getViewport(U);else{let ct=u.getViewSubImage(d,U);N=ct.viewport,Z===0&&(t.setRenderTargetTextures(v,ct.colorTexture,ct.depthStencilTexture),t.setRenderTarget(v))}let G=b[Z];G===void 0&&(G=new ii,G.layers.enable(Z),G.viewport=new Re,b[Z]=G),G.matrix.fromArray(U.transform.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale),G.projectionMatrix.fromArray(U.projectionMatrix),G.projectionMatrixInverse.copy(G.projectionMatrix).invert(),G.viewport.set(N.x,N.y,N.width,N.height),Z===0&&(B.matrix.copy(G.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),$t===!0&&B.cameras.push(G)}let wt=n.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&_){u=i.getBinding();let Z=u.getDepthInformation(yt[0]);Z&&Z.isValid&&Z.texture&&p.init(Z,n.renderState)}if(wt&&wt.includes("camera-access")&&_){t.state.unbindTexture(),u=i.getBinding();for(let Z=0;Z<yt.length;Z++){let U=yt[Z].camera;if(U){let N=g[U];N||(N=new Hr,g[U]=N);let G=u.getCameraImage(U);N.sourceTexture=G}}}}for(let yt=0;yt<S.length;yt++){let $t=E[yt],wt=S[yt];$t!==null&&wt!==void 0&&wt.update($t,at,c||o)}Ht&&Ht(et,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),m=null}let Nt=new Jd;Nt.setAnimationLoop(Yt),this.setAnimationLoop=function(et){Ht=et},this.dispose=function(){}}},Uy=new jt,np=new ie;np.set(-1,0,0,0,1,0,0,0,1);function Fy(s,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,Bh(s)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function n(p,g,y,x,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),u(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),d(p,g),g.isMeshPhysicalMaterial&&f(p,g,v)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?l(p,g,y,x):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Oe&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Oe&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let y=t.get(g),x=y.envMap,v=y.envMapRotation;x&&(p.envMap.value=x,p.envMapRotation.value.setFromMatrix4(Uy.makeRotationFromEuler(v)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(np),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,y,x){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*y,p.scale.value=x*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,y){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Oe&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let y=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function By(s,t,e,i){let n={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){let E=S.program;i.uniformBlockBinding(v,E)}function c(v,S){let E=n[v.id];E===void 0&&(p(v),E=h(v),n[v.id]=E,v.addEventListener("dispose",y));let R=S.program;i.updateUBOMapping(v,R);let M=t.render.frame;r[v.id]!==M&&(d(v),r[v.id]=M)}function h(v){let S=u();v.__bindingPointIndex=S;let E=s.createBuffer(),R=v.__size,M=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,R,M),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,E),E}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Kt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let S=n[v.id],E=v.uniforms,R=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let M=0,C=E.length;M<C;M++){let T=E[M];if(Array.isArray(T))for(let P=0,b=T.length;P<b;P++)f(T[P],M,P,R);else f(T,M,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,S,E,R){if(_(v,S,E,R)===!0){let M=v.__offset,C=v.value;if(Array.isArray(C)){let T=0;for(let P=0;P<C.length;P++){let b=C[P],B=g(b);m(b,v.__data,T),typeof b!="number"&&typeof b!="boolean"&&!b.isMatrix3&&!ArrayBuffer.isView(b)&&(T+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(C,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,M,v.__data)}}function m(v,S,E){typeof v=="number"||typeof v=="boolean"?S[0]=v:v.isMatrix3?(S[0]=v.elements[0],S[1]=v.elements[1],S[2]=v.elements[2],S[3]=0,S[4]=v.elements[3],S[5]=v.elements[4],S[6]=v.elements[5],S[7]=0,S[8]=v.elements[6],S[9]=v.elements[7],S[10]=v.elements[8],S[11]=0):ArrayBuffer.isView(v)?S.set(new v.constructor(v.buffer,v.byteOffset,S.length)):v.toArray(S,E)}function _(v,S,E,R){let M=v.value,C=S+"_"+E;if(R[C]===void 0)return typeof M=="number"||typeof M=="boolean"?R[C]=M:ArrayBuffer.isView(M)?R[C]=M.slice():R[C]=M.clone(),!0;{let T=R[C];if(typeof M=="number"||typeof M=="boolean"){if(T!==M)return R[C]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(T.equals(M)===!1)return T.copy(M),!0}}return!1}function p(v){let S=v.uniforms,E=0,R=16;for(let C=0,T=S.length;C<T;C++){let P=Array.isArray(S[C])?S[C]:[S[C]];for(let b=0,B=P.length;b<B;b++){let H=P[b],z=Array.isArray(H.value)?H.value:[H.value];for(let Y=0,V=z.length;Y<V;Y++){let j=z[Y],O=g(j),k=E%R,it=k%O.boundary,q=k+it;E+=it,q!==0&&R-q<O.storage&&(E+=R-q),H.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=E,E+=O.storage}}}let M=E%R;return M>0&&(E+=R-M),v.__size=E,v.__cache={},this}function g(v){let S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?Zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):Zt("WebGLRenderer: Unsupported uniform value type.",v),S}function y(v){let S=v.target;S.removeEventListener("dispose",y);let E=o.indexOf(S.__bindingPointIndex);o.splice(E,1),s.deleteBuffer(n[S.id]),delete n[S.id],delete r[S.id]}function x(){for(let v in n)s.deleteBuffer(n[v]);o=[],n={},r={}}return{bind:l,update:c,dispose:x}}var Oy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),en=null;function ky(){return en===null&&(en=new kr(Oy,16,16,Dn,Je),en.name="DFG_LUT",en.minFilter=Ze,en.magFilter=Ze,en.wrapS=$i,en.wrapT=$i,en.generateMipmaps=!1,en.needsUpdate=!0),en}var Ql=class{constructor(t={}){let{canvas:e=xd(),context:i=null,depth:n=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=fi}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;let _=f,p=new Set([ml,pl,dl]),g=new Set([fi,Vi,Js,js,hl,ul]),y=new Uint32Array(4),x=new Int32Array(4),v=new D,S=null,E=null,R=[],M=[],C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,P=!1,b=null,B=null,H=null,z=null;this._outputColorSpace=Ae;let Y=0,V=0,j=null,O=-1,k=null,it=new Re,q=new Re,nt=null,Ht=new dt(0),Yt=0,Nt=e.width,et=e.height,at=1,yt=null,$t=null,wt=new Re(0,0,Nt,et),w=new Re(0,0,Nt,et),ot=!1,Z=new Hs,U=!1,N=!1,G=new jt,ct=new D,ft=new Re,K={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pt=!1;function vt(){return j===null?at:1}let F=i;function Lt(I,W){return e.getContext(I,W)}let Xt,L,A,$,J,rt,gt,bt,lt,ht,St,Vt,Et,Mt,kt,Wt,te,X,Tt,ut,At,Pt,_t;try{let I={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Me,!1),e.addEventListener("webglcontextrestored",_e,!1),e.addEventListener("webglcontextcreationerror",Ni,!1),F===null){let W="webgl2";if(F=Lt(W,I),F===null)throw Lt(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}qt()}catch(I){throw e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",_e,!1),e.removeEventListener("webglcontextcreationerror",Ni,!1),Kt("WebGLRenderer: "+I.message),I}function qt(){Xt=new qx(F),Xt.init(),At=new Ly(F,Xt),L=new Fx(F,Xt,t,At),A=new Iy(F,Xt),L.reversedDepthBuffer&&d&&A.buffers.depth.setReversed(!0),B=F.createFramebuffer(),H=F.createFramebuffer(),z=F.createFramebuffer(),$=new Zx(F),J=new gy,rt=new Py(F,Xt,A,J,L,At,$),gt=new Xx(T),bt=new J0(F),Pt=new Dx(F,bt),lt=new Yx(F,bt,$,Pt),ht=new Jx(F,lt,bt,Pt,$),X=new Kx(F,L,rt),kt=new Bx(J),St=new my(T,gt,Xt,L,Pt,kt),Vt=new Fy(T,J),Et=new xy,Mt=new wy(Xt),te=new Nx(T,gt,A,ht,m,l),Wt=new Cy(T,ht,L),_t=new By(F,$,L,A),Tt=new Ux(F,Xt,$),ut=new $x(F,Xt,$),$.programs=St.programs,T.capabilities=L,T.extensions=Xt,T.properties=J,T.renderLists=Et,T.shadowMap=Wt,T.state=A,T.info=$}_!==fi&&(C=new Qx(_,e.width,e.height,a,n,r));let zt=new ou(T,F);this.xr=zt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let I=Xt.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){let I=Xt.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return at},this.setPixelRatio=function(I){I!==void 0&&(at=I,this.setSize(Nt,et,!1))},this.getSize=function(I){return I.set(Nt,et)},this.setSize=function(I,W,st=!0){if(zt.isPresenting){Zt("WebGLRenderer: Can't change size while VR device is presenting.");return}Nt=I,et=W,e.width=Math.floor(I*at),e.height=Math.floor(W*at),st===!0&&(e.style.width=I+"px",e.style.height=W+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,I,W)},this.getDrawingBufferSize=function(I){return I.set(Nt*at,et*at).floor()},this.setDrawingBufferSize=function(I,W,st){Nt=I,et=W,at=st,e.width=Math.floor(I*st),e.height=Math.floor(W*st),this.setViewport(0,0,I,W)},this.setEffects=function(I){if(_===fi){Kt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(I){for(let W=0;W<I.length;W++)if(I[W].isOutputPass===!0){Zt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(I||[])},this.getCurrentViewport=function(I){return I.copy(it)},this.getViewport=function(I){return I.copy(wt)},this.setViewport=function(I,W,st,Q){I.isVector4?wt.set(I.x,I.y,I.z,I.w):wt.set(I,W,st,Q),A.viewport(it.copy(wt).multiplyScalar(at).round())},this.getScissor=function(I){return I.copy(w)},this.setScissor=function(I,W,st,Q){I.isVector4?w.set(I.x,I.y,I.z,I.w):w.set(I,W,st,Q),A.scissor(q.copy(w).multiplyScalar(at).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(I){A.setScissorTest(ot=I)},this.setOpaqueSort=function(I){yt=I},this.setTransparentSort=function(I){$t=I},this.getClearColor=function(I){return I.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor(...arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha(...arguments)},this.clear=function(I=!0,W=!0,st=!0){let Q=0;if(I){let tt=!1;if(j!==null){let It=j.texture.format;tt=p.has(It)}if(tt){let It=j.texture.type,Ut=g.has(It),Ct=te.getClearColor(),Bt=te.getClearAlpha(),Gt=Ct.r,ne=Ct.g,le=Ct.b;Ut?(y[0]=Gt,y[1]=ne,y[2]=le,y[3]=Bt,F.clearBufferuiv(F.COLOR,0,y)):(x[0]=Gt,x[1]=ne,x[2]=le,x[3]=Bt,F.clearBufferiv(F.COLOR,0,x))}else Q|=F.COLOR_BUFFER_BIT}W&&(Q|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),st&&(Q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&F.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(I){I.setRenderer(this),b=I},this.dispose=function(){e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",_e,!1),e.removeEventListener("webglcontextcreationerror",Ni,!1),te.dispose(),Et.dispose(),Mt.dispose(),J.dispose(),gt.dispose(),ht.dispose(),Pt.dispose(),_t.dispose(),St.dispose(),zt.dispose(),zt.removeEventListener("sessionstart",Vu),zt.removeEventListener("sessionend",Gu),Wn.stop()};function Me(I){I.preventDefault(),Lr("WebGLRenderer: Context Lost."),P=!0}function _e(){Lr("WebGLRenderer: Context Restored."),P=!1;let I=$.autoReset,W=Wt.enabled,st=Wt.autoUpdate,Q=Wt.needsUpdate,tt=Wt.type;qt(),$.autoReset=I,Wt.enabled=W,Wt.autoUpdate=st,Wt.needsUpdate=Q,Wt.type=tt}function Ni(I){Kt("WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function Wi(I){let W=I.target;W.removeEventListener("dispose",Wi),cm(W)}function cm(I){hm(I),J.remove(I)}function hm(I){let W=J.get(I).programs;W!==void 0&&(W.forEach(function(st){St.releaseProgram(st)}),I.isShaderMaterial&&St.releaseShaderCache(I))}this.renderBufferDirect=function(I,W,st,Q,tt,It){W===null&&(W=K);let Ut=tt.isMesh&&tt.matrixWorld.determinantAffine()<0,Ct=dm(I,W,st,Q,tt);A.setMaterial(Q,Ut);let Bt=st.index,Gt=1;if(Q.wireframe===!0){if(Bt=lt.getWireframeAttribute(st),Bt===void 0)return;Gt=2}let ne=st.drawRange,le=st.attributes.position,Ot=ne.start*Gt,xe=(ne.start+ne.count)*Gt;It!==null&&(Ot=Math.max(Ot,It.start*Gt),xe=Math.min(xe,(It.start+It.count)*Gt)),Bt!==null?(Ot=Math.max(Ot,0),xe=Math.min(xe,Bt.count)):le!=null&&(Ot=Math.max(Ot,0),xe=Math.min(xe,le.count));let Ue=xe-Ot;if(Ue<0||Ue===1/0)return;Pt.setup(tt,Q,Ct,st,Bt);let Ee,Se=Tt;if(Bt!==null&&(Ee=bt.get(Bt),Se=ut,Se.setIndex(Ee)),tt.isMesh)Q.wireframe===!0?(A.setLineWidth(Q.wireframeLinewidth*vt()),Se.setMode(F.LINES)):Se.setMode(F.TRIANGLES);else if(tt.isLine){let Qe=Q.linewidth;Qe===void 0&&(Qe=1),A.setLineWidth(Qe*vt()),tt.isLineSegments?Se.setMode(F.LINES):tt.isLineLoop?Se.setMode(F.LINE_LOOP):Se.setMode(F.LINE_STRIP)}else tt.isPoints?Se.setMode(F.POINTS):tt.isSprite&&Se.setMode(F.TRIANGLES);if(tt.isBatchedMesh)if(Xt.get("WEBGL_multi_draw"))Se.renderMultiDraw(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount);else{let Qe=tt._multiDrawStarts,Dt=tt._multiDrawCounts,oi=tt._multiDrawCount,fe=Bt?bt.get(Bt).bytesPerElement:1,Si=J.get(Q).currentProgram.getUniforms();for(let Xi=0;Xi<oi;Xi++)Si.setValue(F,"_gl_DrawID",Xi),Se.render(Qe[Xi]/fe,Dt[Xi])}else if(tt.isInstancedMesh)Se.renderInstances(Ot,Ue,tt.count);else if(st.isInstancedBufferGeometry){let Qe=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,Dt=Math.min(st.instanceCount,Qe);Se.renderInstances(Ot,Ue,Dt)}else Se.render(Ot,Ue)};function Hu(I,W,st,Q){b!==null&&I.isNodeMaterial&&b.setObject(Q,I),U===!0&&kt.setState(I,st,!1),I.transparent===!0&&I.side===Ie&&I.forceSinglePass===!1?(I.side=Oe,I.needsUpdate=!0,Wo(I,W,Q),I.side=In,I.needsUpdate=!0,Wo(I,W,Q),I.side=Ie):Wo(I,W,Q)}this.compile=function(I,W,st=null){st===null&&(st=I),b!==null&&b.renderStart(I,W,st),E=Mt.get(st),E.init(W),M.push(E),st.traverseVisible(function(tt){tt.isLight&&tt.layers.test(W.layers)&&(E.pushLight(tt),tt.castShadow&&E.pushShadow(tt))}),I!==st&&I.traverseVisible(function(tt){tt.isLight&&tt.layers.test(W.layers)&&(E.pushLight(tt),tt.castShadow&&E.pushShadow(tt))}),E.setupLights(),b!==null&&b.updateLights(E.state.lightsArray),N=this.localClippingEnabled,U=kt.init(this.clippingPlanes,N),U===!0&&kt.setGlobalState(this.clippingPlanes,W),b!==null&&Wt.render(E.state.shadowsArray,st,W);let Q=new Set;return I.traverse(function(tt){if(!(tt.isMesh||tt.isPoints||tt.isLine||tt.isSprite))return;let It=tt.material;if(It)if(Array.isArray(It))for(let Ut=0;Ut<It.length;Ut++){let Ct=It[Ut];Hu(Ct,st,W,tt),Q.add(Ct)}else Hu(It,st,W,tt),Q.add(It)}),E=M.pop(),b!==null&&b.renderEnd(),Q},this.compileAsync=function(I,W,st=null){let Q=this.compile(I,W,st);return new Promise(tt=>{function It(){if(Q.forEach(function(Ut){let Bt=J.get(Ut).currentProgram;(Bt===void 0||Bt.isReady())&&Q.delete(Ut)}),Q.size===0){tt(I);return}setTimeout(It,10)}Xt.get("KHR_parallel_shader_compile")!==null?It():setTimeout(It,10)})};let Lc=null;function um(I){Lc&&Lc(I)}function Vu(){Wn.stop()}function Gu(){Wn.start()}let Wn=new Jd;Wn.setAnimationLoop(um),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(I){Lc=I,zt.setAnimationLoop(I),I===null?Wn.stop():Wn.start()},zt.addEventListener("sessionstart",Vu),zt.addEventListener("sessionend",Gu),this.render=function(I,W){if(W!==void 0&&W.isCamera!==!0){Kt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;b!==null&&b.renderStart(I,W);let st=zt.enabled===!0&&zt.isPresenting===!0,Q=C!==null&&(j===null||st)&&C.begin(T,j);if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),zt.enabled===!0&&zt.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(zt.cameraAutoUpdate===!0&&zt.updateCamera(W),W=zt.getCamera()),I.isScene===!0&&I.onBeforeRender(T,I,W,j),E=Mt.get(I,M.length),E.init(W),E.state.textureUnits=rt.getTextureUnits(),M.push(E),G.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Z.setFromProjectionMatrix(G,Oi,W.reversedDepth),N=this.localClippingEnabled,U=kt.init(this.clippingPlanes,N),S=Et.get(I,R.length),S.init(),R.push(S),zt.enabled===!0&&zt.isPresenting===!0){let Ut=T.xr.getDepthSensingMesh();Ut!==null&&Nc(Ut,W,-1/0,T.sortObjects)}Nc(I,W,0,T.sortObjects),S.finish(),b!==null&&b.updateLights(E.state.lightsArray),T.sortObjects===!0&&S.sort(yt,$t),pt=zt.enabled===!1||zt.isPresenting===!1||zt.hasDepthSensing()===!1,pt&&te.addToRenderList(S,I),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),U===!0&&kt.beginShadows();let tt=E.state.shadowsArray;if(Wt.render(tt,I,W),U===!0&&kt.endShadows(),(Q&&C.hasRenderPass())===!1){let Ut=S.opaque,Ct=S.transmissive;if(E.setupLights(),W.isArrayCamera){let Bt=W.cameras;if(Ct.length>0)for(let Gt=0,ne=Bt.length;Gt<ne;Gt++){let le=Bt[Gt];Xu(Ut,Ct,I,le)}pt&&te.render(I);for(let Gt=0,ne=Bt.length;Gt<ne;Gt++){let le=Bt[Gt];Wu(S,I,le,le.viewport)}}else Ct.length>0&&Xu(Ut,Ct,I,W),pt&&te.render(I),Wu(S,I,W)}j!==null&&V===0&&(rt.updateMultisampleRenderTarget(j),rt.updateRenderTargetMipmap(j)),Q&&C.end(T),I.isScene===!0&&I.onAfterRender(T,I,W),Pt.resetDefaultState(),O=-1,k=null,M.pop(),M.length>0?(E=M[M.length-1],rt.setTextureUnits(E.state.textureUnits),U===!0&&kt.setGlobalState(T.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,b!==null&&b.renderEnd()};function Nc(I,W,st,Q){if(I.visible===!1)return;if(I.layers.test(W.layers)){if(I.isGroup)st=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(W);else if(I.isLightProbeGrid)E.pushLightProbeGrid(I);else if(I.isLight)E.pushLight(I),I.castShadow&&E.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||I.intersectsFrustum(Z)){Q&&ft.setFromMatrixPosition(I.matrixWorld).applyMatrix4(G);let Ut=ht.update(I),Ct=I.material;Ct.visible&&S.push(I,Ut,Ct,st,ft.z,null,W)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||I.intersectsFrustum(Z))){let Ut=ht.update(I),Ct=I.material;if(Q&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),ft.copy(I.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),ft.copy(Ut.boundingSphere.center)),ft.applyMatrix4(I.matrixWorld).applyMatrix4(G)),Array.isArray(Ct)){let Bt=Ut.groups;for(let Gt=0,ne=Bt.length;Gt<ne;Gt++){let le=Bt[Gt],Ot=Ct[le.materialIndex];Ot&&Ot.visible&&S.push(I,Ut,Ot,st,ft.z,le,W)}}else Ct.visible&&S.push(I,Ut,Ct,st,ft.z,null,W)}}let It=I.children;for(let Ut=0,Ct=It.length;Ut<Ct;Ut++)Nc(It[Ut],W,st,Q)}function Wu(I,W,st,Q){let{opaque:tt,transmissive:It,transparent:Ut}=I;E.setupLightsView(st),U===!0&&kt.setGlobalState(T.clippingPlanes,st),Q&&A.viewport(it.copy(Q)),tt.length>0&&Go(tt,W,st),It.length>0&&Go(It,W,st),Ut.length>0&&Go(Ut,W,st),A.buffers.depth.setTest(!0),A.buffers.depth.setMask(!0),A.buffers.color.setMask(!0),A.setPolygonOffset(!1)}function Xu(I,W,st,Q){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[Q.id]===void 0){let Ot=Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[Q.id]=new Be(1,1,{generateMipmaps:!0,type:Ot?Je:fi,minFilter:Ln,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let It=E.state.transmissionRenderTarget[Q.id],Ut=Q.viewport||it;It.setSize(Ut.z*T.transmissionResolutionScale,Ut.w*T.transmissionResolutionScale);let Ct=T.getRenderTarget(),Bt=T.getActiveCubeFace(),Gt=T.getActiveMipmapLevel();T.setRenderTarget(It),T.getClearColor(Ht),Yt=T.getClearAlpha(),Yt<1&&T.setClearColor(16777215,.5),T.clear(),pt&&te.render(st);let ne=T.toneMapping;T.toneMapping=Hi;let le=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),E.setupLightsView(Q),U===!0&&kt.setGlobalState(T.clippingPlanes,Q),Go(I,st,Q),rt.updateMultisampleRenderTarget(It),rt.updateRenderTargetMipmap(It),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let xe=0,Ue=W.length;xe<Ue;xe++){let Ee=W[xe],{object:Se,geometry:Qe,material:Dt,group:oi}=Ee;if(Dt.side===Ie&&Se.layers.test(Q.layers)){let fe=Dt.side;Dt.side=Oe,Dt.needsUpdate=!0,qu(Se,st,Q,Qe,Dt,oi),Dt.side=fe,Dt.needsUpdate=!0,Ot=!0}}Ot===!0&&(rt.updateMultisampleRenderTarget(It),rt.updateRenderTargetMipmap(It))}T.setRenderTarget(Ct,Bt,Gt),T.setClearColor(Ht,Yt),le!==void 0&&(Q.viewport=le),T.toneMapping=ne}function Go(I,W,st){let Q=W.isScene===!0?W.overrideMaterial:null;for(let tt=0,It=I.length;tt<It;tt++){let Ut=I[tt],{object:Ct,geometry:Bt,group:Gt}=Ut,ne=Ut.material;ne.allowOverride===!0&&Q!==null&&(ne=Q),Ct.layers.test(st.layers)&&qu(Ct,W,st,Bt,ne,Gt)}}function qu(I,W,st,Q,tt,It){b!==null&&tt.isNodeMaterial&&b.setObject(I,tt),I.onBeforeRender(T,W,st,Q,tt,It),I.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),tt.onBeforeRender(T,W,st,Q,I,It),tt.transparent===!0&&tt.side===Ie&&tt.forceSinglePass===!1?(tt.side=Oe,tt.needsUpdate=!0,T.renderBufferDirect(st,W,Q,tt,I,It),tt.side=In,tt.needsUpdate=!0,T.renderBufferDirect(st,W,Q,tt,I,It),tt.side=Ie):T.renderBufferDirect(st,W,Q,tt,I,It),I.onAfterRender(T,W,st,Q,tt,It)}function Wo(I,W,st){W.isScene!==!0&&(W=K);let Q=J.get(I),tt=E.state.lights,It=E.state.shadowsArray,Ut=tt.state.version,Ct=St.getParameters(I,tt.state,It,W,st,E.state.lightProbeGridArray),Bt=St.getProgramCacheKey(Ct),Gt=Q.programs;Q.environment=I.isMeshStandardMaterial||I.isMeshLambertMaterial||I.isMeshPhongMaterial?W.environment:null,Q.fog=W.fog;let ne=I.isMeshStandardMaterial||I.isMeshLambertMaterial&&!I.envMap||I.isMeshPhongMaterial&&!I.envMap;Q.envMap=gt.get(I.envMap||Q.environment,ne),Q.envMapRotation=Q.environment!==null&&I.envMap===null?W.environmentRotation:I.envMapRotation,Gt===void 0&&(I.addEventListener("dispose",Wi),Gt=new Map,Q.programs=Gt);let le=Gt.get(Bt);if(le!==void 0){if(Q.currentProgram===le&&Q.lightsStateVersion===Ut)return $u(I,Ct),le}else Ct.uniforms=St.getUniforms(I),b!==null&&I.isNodeMaterial&&b.build(I,st,Ct),I.onBeforeCompile(Ct,T),le=St.acquireProgram(Ct,Bt),Gt.set(Bt,le),Q.uniforms=Ct.uniforms;let Ot=Q.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Ot.clippingPlanes=kt.uniform),$u(I,Ct),Q.needsLights=mm(I),Q.lightsStateVersion=Ut,Q.needsLights&&(Ot.ambientLightColor.value=tt.state.ambient,Ot.lightProbe.value=tt.state.probe,Ot.sunLights.value=tt.state.sun,Ot.sunLightShadows.value=tt.state.sunShadow,Ot.directionalLights.value=tt.state.directional,Ot.directionalLightShadows.value=tt.state.directionalShadow,Ot.spotLights.value=tt.state.spot,Ot.spotLightShadows.value=tt.state.spotShadow,Ot.rectAreaLights.value=tt.state.rectArea,Ot.ltc_1.value=tt.state.rectAreaLTC1,Ot.ltc_2.value=tt.state.rectAreaLTC2,Ot.pointLights.value=tt.state.point,Ot.pointLightShadows.value=tt.state.pointShadow,Ot.hemisphereLights.value=tt.state.hemi,Ot.sunShadowMatrix.value=tt.state.sunShadowMatrix,Ot.sunShadowCascade.value=tt.state.sunShadowCascade,Ot.directionalShadowMatrix.value=tt.state.directionalShadowMatrix,Ot.spotLightMatrix.value=tt.state.spotLightMatrix,Ot.spotLightMap.value=tt.state.spotLightMap,Ot.pointShadowMatrix.value=tt.state.pointShadowMatrix),Q.lightProbeGrid=E.state.lightProbeGridArray.length>0,Q.currentProgram=le,Q.uniformsList=null,le}function Yu(I){if(I.uniformsList===null){let W=I.currentProgram.getUniforms();I.uniformsList=er.seqWithValue(W.seq,I.uniforms)}return I.uniformsList}function $u(I,W){let st=J.get(I);st.outputColorSpace=W.outputColorSpace,st.batching=W.batching,st.batchingColor=W.batchingColor,st.instancing=W.instancing,st.instancingColor=W.instancingColor,st.instancingMorph=W.instancingMorph,st.skinning=W.skinning,st.morphTargets=W.morphTargets,st.morphNormals=W.morphNormals,st.morphColors=W.morphColors,st.morphTargetsCount=W.morphTargetsCount,st.numClippingPlanes=W.numClippingPlanes,st.numIntersection=W.numClipIntersection,st.vertexAlphas=W.vertexAlphas,st.vertexTangents=W.vertexTangents,st.toneMapping=W.toneMapping}function fm(I,W){if(I.length===0)return null;if(I.length===1)return I[0].texture!==null?I[0]:null;v.setFromMatrixPosition(W.matrixWorld);for(let st=0,Q=I.length;st<Q;st++){let tt=I[st];if(tt.texture!==null&&tt.boundingBox.containsPoint(v))return tt}return null}function dm(I,W,st,Q,tt){W.isScene!==!0&&(W=K),rt.resetTextureUnits();let It=W.fog,Ut=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?W.environment:null,Ct=j===null?T.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:oe.workingColorSpace,Bt=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,Gt=gt.get(Q.envMap||Ut,Bt),ne=Q.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,le=!!st.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Ot=!!st.morphAttributes.position,xe=!!st.morphAttributes.normal,Ue=!!st.morphAttributes.color,Ee=Hi;Q.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ee=T.toneMapping);let Se=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,Qe=Se!==void 0?Se.length:0,Dt=J.get(Q),oi=E.state.lights;if(U===!0&&(N===!0||I!==k)){let we=I===k&&Q.id===O;kt.setState(Q,I,we)}let fe=!1;Q.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==oi.state.version||Dt.outputColorSpace!==Ct||tt.isBatchedMesh&&Dt.batching===!1||!tt.isBatchedMesh&&Dt.batching===!0||tt.isBatchedMesh&&Dt.batchingColor===!0&&tt._colorsTexture===null||tt.isBatchedMesh&&Dt.batchingColor===!1&&tt._colorsTexture!==null||tt.isInstancedMesh&&Dt.instancing===!1||!tt.isInstancedMesh&&Dt.instancing===!0||tt.isSkinnedMesh&&Dt.skinning===!1||!tt.isSkinnedMesh&&Dt.skinning===!0||tt.isInstancedMesh&&Dt.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&Dt.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&Dt.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&Dt.instancingMorph===!1&&tt.morphTexture!==null||Dt.envMap!==Gt||Q.fog===!0&&Dt.fog!==It||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==kt.numPlanes||Dt.numIntersection!==kt.numIntersection)||Dt.vertexAlphas!==ne||Dt.vertexTangents!==le||Dt.morphTargets!==Ot||Dt.morphNormals!==xe||Dt.morphColors!==Ue||Dt.toneMapping!==Ee||Dt.morphTargetsCount!==Qe||!!Dt.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(fe=!0):(fe=!0,Dt.__version=Q.version);let Si=Dt.currentProgram;fe===!0&&(Si=Wo(Q,W,tt),b&&Q.isNodeMaterial&&b.onUpdateProgram(Q,Si,Dt));let Xi=!1,gn=!1,ls=!1,be=Si.getUniforms(),De=Dt.uniforms;if(A.useProgram(Si.program)&&(Xi=!0,gn=!0,ls=!0),Q.id!==O&&(O=Q.id,gn=!0),Dt.needsLights){let we=fm(E.state.lightProbeGridArray,tt);Dt.lightProbeGrid!==we&&(Dt.lightProbeGrid=we,gn=!0)}if(Xi||k!==I){A.buffers.depth.getReversed()&&I.reversedDepth!==!0&&(I._reversedDepth=!0,I.updateProjectionMatrix()),be.setValue(F,"projectionMatrix",I.projectionMatrix),be.setValue(F,"viewMatrix",I.matrixWorldInverse);let xn=be.map.cameraPosition;xn!==void 0&&xn.setValue(F,ct.setFromMatrixPosition(I.matrixWorld)),L.logarithmicDepthBuffer&&be.setValue(F,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&be.setValue(F,"isOrthographic",I.isOrthographicCamera===!0),k!==I&&(k=I,gn=!0,ls=!0)}if(Dt.needsLights&&(oi.state.sunShadowMap.length>0&&be.setValue(F,"sunShadowMap",oi.state.sunShadowMap,rt),oi.state.directionalShadowMap.length>0&&be.setValue(F,"directionalShadowMap",oi.state.directionalShadowMap,rt),oi.state.spotShadowMap.length>0&&be.setValue(F,"spotShadowMap",oi.state.spotShadowMap,rt),oi.state.pointShadowMap.length>0&&be.setValue(F,"pointShadowMap",oi.state.pointShadowMap,rt)),tt.isSkinnedMesh){be.setOptional(F,tt,"bindMatrix"),be.setOptional(F,tt,"bindMatrixInverse");let we=tt.skeleton;we&&(we.boneTexture===null&&we.computeBoneTexture(),be.setValue(F,"boneTexture",we.boneTexture,rt))}tt.isBatchedMesh&&(be.setOptional(F,tt,"batchingTexture"),be.setValue(F,"batchingTexture",tt._matricesTexture,rt),be.setOptional(F,tt,"batchingIdTexture"),be.setValue(F,"batchingIdTexture",tt._indirectTexture,rt),be.setOptional(F,tt,"batchingColorTexture"),tt._colorsTexture!==null&&be.setValue(F,"batchingColorTexture",tt._colorsTexture,rt));let _n=st.morphAttributes;if((_n.position!==void 0||_n.normal!==void 0||_n.color!==void 0)&&X.update(tt,st,Si),(gn||Dt.receiveShadow!==tt.receiveShadow)&&(Dt.receiveShadow=tt.receiveShadow,be.setValue(F,"receiveShadow",tt.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&W.environment!==null&&(De.envMapIntensity.value=W.environmentIntensity),De.dfgLUT!==void 0&&(De.dfgLUT.value=ky()),gn){if(be.setValue(F,"toneMappingExposure",T.toneMappingExposure),Dt.needsLights&&pm(De,ls),It&&Q.fog===!0&&Vt.refreshFogUniforms(De,It),Vt.refreshMaterialUniforms(De,Q,at,et,E.state.transmissionRenderTarget[I.id]),Dt.needsLights&&Dt.lightProbeGrid){let we=Dt.lightProbeGrid;De.probesSH.value=we.texture,De.probesMin.value.copy(we.boundingBox.min),De.probesMax.value.copy(we.boundingBox.max),De.probesResolution.value.copy(we.resolution)}er.upload(F,Yu(Dt),De,rt)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(er.upload(F,Yu(Dt),De,rt),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&be.setValue(F,"center",tt.center),be.setValue(F,"modelViewMatrix",tt.modelViewMatrix),be.setValue(F,"normalMatrix",tt.normalMatrix),be.setValue(F,"modelMatrix",tt.matrixWorld),Q.uniformsGroups!==void 0){let we=Q.uniformsGroups;for(let xn=0,cs=we.length;xn<cs;xn++){let Ku=we[xn];_t.update(Ku,Si),_t.bind(Ku,Si)}}return Si}function pm(I,W){I.ambientLightColor.needsUpdate=W,I.lightProbe.needsUpdate=W,I.sunLights.needsUpdate=W,I.sunLightShadows.needsUpdate=W,I.directionalLights.needsUpdate=W,I.directionalLightShadows.needsUpdate=W,I.pointLights.needsUpdate=W,I.pointLightShadows.needsUpdate=W,I.spotLights.needsUpdate=W,I.spotLightShadows.needsUpdate=W,I.rectAreaLights.needsUpdate=W,I.hemisphereLights.needsUpdate=W}function mm(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(I,W,st){let Q=J.get(I);Q.__autoAllocateDepthBuffer=I.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),J.get(I.texture).__webglTexture=W,J.get(I.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:st,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(I,W){let st=J.get(I);st.__webglFramebuffer=W,st.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(I,W=0,st=0){j=I,Y=W,V=st;let Q=null,tt=!1,It=!1;if(I){let Ct=J.get(I);if(Ct.__useDefaultFramebuffer!==void 0){A.bindFramebuffer(F.FRAMEBUFFER,Ct.__webglFramebuffer),it.copy(I.viewport),q.copy(I.scissor),nt=I.scissorTest,A.viewport(it),A.scissor(q),A.setScissorTest(nt),O=-1;return}else if(Ct.__webglFramebuffer===void 0)rt.setupRenderTarget(I);else if(Ct.__hasExternalTextures)rt.rebindTextures(I,J.get(I.texture).__webglTexture,J.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){let ne=I.depthTexture;if(Ct.__boundDepthTexture!==ne){if(ne!==null&&J.has(ne)&&(I.width!==ne.image.width||I.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");rt.setupDepthRenderbuffer(I)}}let Bt=I.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(It=!0);let Gt=J.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Gt[W])?Q=Gt[W][st]:Q=Gt[W],tt=!0):I.samples>0&&rt.useMultisampledRTT(I)===!1?Q=J.get(I).__webglMultisampledFramebuffer:Array.isArray(Gt)?Q=Gt[st]:Q=Gt,it.copy(I.viewport),q.copy(I.scissor),nt=I.scissorTest}else it.copy(wt).multiplyScalar(at).floor(),q.copy(w).multiplyScalar(at).floor(),nt=ot;if(st!==0&&(Q=B),A.bindFramebuffer(F.FRAMEBUFFER,Q)&&A.drawBuffers(I,Q),A.viewport(it),A.scissor(q),A.setScissorTest(nt),tt){let Ct=J.get(I.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ct.__webglTexture,st)}else if(It){let Ct=W;for(let Bt=0;Bt<I.textures.length;Bt++){let Gt=J.get(I.textures[Bt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Bt,Gt.__webglTexture,st,Ct)}}else if(I!==null&&st!==0){let Ct=J.get(I.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ct.__webglTexture,st)}O=-1};function Zu(I){let W=J.get(I);return(W.__readFormat!==I.format||W.__readType!==I.type)&&(W.__readFormat=I.format,W.__readType=I.type,W.__formatReadable=L.textureFormatReadable(I.format),W.__typeReadable=L.textureTypeReadable(I.type)),W}this.readRenderTargetPixels=function(I,W,st,Q,tt,It,Ut,Ct=0){if(!(I&&I.isWebGLRenderTarget)){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=J.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Ut!==void 0&&(Bt=Bt[Ut]),Bt){A.bindFramebuffer(F.FRAMEBUFFER,Bt);try{let Gt=I.textures[Ct],ne=Gt.format,le=Gt.type;I.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ct);let Ot=Zu(Gt);if(Ot.__formatReadable===!1){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ot.__typeReadable===!1){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=I.width-Q&&st>=0&&st<=I.height-tt&&F.readPixels(W,st,Q,tt,At.convert(ne),At.convert(le),It)}finally{let Gt=j!==null?J.get(j).__webglFramebuffer:null;A.bindFramebuffer(F.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(I,W,st,Q,tt,It,Ut,Ct=0){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=J.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Ut!==void 0&&(Bt=Bt[Ut]),Bt)if(W>=0&&W<=I.width-Q&&st>=0&&st<=I.height-tt){A.bindFramebuffer(F.FRAMEBUFFER,Bt);let Gt=I.textures[Ct],ne=Gt.format,le=Gt.type;I.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ct);let Ot=Zu(Gt);if(Ot.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ot.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xe=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,xe),F.bufferData(F.PIXEL_PACK_BUFFER,It.byteLength,F.STREAM_READ),F.readPixels(W,st,Q,tt,At.convert(ne),At.convert(le),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ue=j!==null?J.get(j).__webglFramebuffer:null;A.bindFramebuffer(F.FRAMEBUFFER,Ue);let Ee=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await yd(F,Ee,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,xe),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,It),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(xe),F.deleteSync(Ee),It}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(I,W=null,st=0){let Q=Math.pow(2,-st),tt=Math.floor(I.image.width*Q),It=Math.floor(I.image.height*Q),Ut=W!==null?W.x:0,Ct=W!==null?W.y:0;rt.setTexture2D(I,0),F.copyTexSubImage2D(F.TEXTURE_2D,st,0,0,Ut,Ct,tt,It),A.unbindTexture()},this.copyTextureToTexture=function(I,W,st=null,Q=null,tt=0,It=0){let Ut,Ct,Bt,Gt,ne,le,Ot,xe,Ue,Ee=I.isCompressedTexture?I.mipmaps[It]:I.image;if(st!==null)Ut=st.max.x-st.min.x,Ct=st.max.y-st.min.y,Bt=st.isBox3?st.max.z-st.min.z:1,Gt=st.min.x,ne=st.min.y,le=st.isBox3?st.min.z:0;else{let De=Math.pow(2,-tt);Ut=Math.floor(Ee.width*De),Ct=Math.floor(Ee.height*De),I.isDataArrayTexture?Bt=Ee.depth:I.isData3DTexture?Bt=Math.floor(Ee.depth*De):Bt=1,Gt=0,ne=0,le=0}Q!==null?(Ot=Q.x,xe=Q.y,Ue=Q.z):(Ot=0,xe=0,Ue=0);let Se=At.convert(W.format),Qe=At.convert(W.type),Dt;W.isData3DTexture?(rt.setTexture3D(W,0),Dt=F.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(rt.setTexture2DArray(W,0),Dt=F.TEXTURE_2D_ARRAY):(rt.setTexture2D(W,0),Dt=F.TEXTURE_2D),A.activeTexture(F.TEXTURE0),A.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,W.flipY),A.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),A.pixelStorei(F.UNPACK_ALIGNMENT,W.unpackAlignment);let oi=A.getParameter(F.UNPACK_ROW_LENGTH),fe=A.getParameter(F.UNPACK_IMAGE_HEIGHT),Si=A.getParameter(F.UNPACK_SKIP_PIXELS),Xi=A.getParameter(F.UNPACK_SKIP_ROWS),gn=A.getParameter(F.UNPACK_SKIP_IMAGES);A.pixelStorei(F.UNPACK_ROW_LENGTH,Ee.width),A.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ee.height),A.pixelStorei(F.UNPACK_SKIP_PIXELS,Gt),A.pixelStorei(F.UNPACK_SKIP_ROWS,ne),A.pixelStorei(F.UNPACK_SKIP_IMAGES,le);let ls=I.isDataArrayTexture||I.isData3DTexture,be=W.isDataArrayTexture||W.isData3DTexture;if(I.isDepthTexture){let De=J.get(I),_n=J.get(W),we=J.get(De.__renderTarget),xn=J.get(_n.__renderTarget);A.bindFramebuffer(F.READ_FRAMEBUFFER,we.__webglFramebuffer),A.bindFramebuffer(F.DRAW_FRAMEBUFFER,xn.__webglFramebuffer);for(let cs=0;cs<Bt;cs++)ls&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.get(I).__webglTexture,tt,le+cs),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.get(W).__webglTexture,It,Ue+cs)),F.blitFramebuffer(Gt,ne,Ut,Ct,Ot,xe,Ut,Ct,F.DEPTH_BUFFER_BIT,F.NEAREST);A.bindFramebuffer(F.READ_FRAMEBUFFER,null),A.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(tt!==0||I.isRenderTargetTexture||J.has(I)){let De=J.get(I),_n=J.get(W);A.bindFramebuffer(F.READ_FRAMEBUFFER,H),A.bindFramebuffer(F.DRAW_FRAMEBUFFER,z);for(let we=0;we<Bt;we++)ls?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,De.__webglTexture,tt,le+we):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,De.__webglTexture,tt),be?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,_n.__webglTexture,It,Ue+we):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,_n.__webglTexture,It),tt!==0?F.blitFramebuffer(Gt,ne,Ut,Ct,Ot,xe,Ut,Ct,F.COLOR_BUFFER_BIT,F.NEAREST):be?F.copyTexSubImage3D(Dt,It,Ot,xe,Ue+we,Gt,ne,Ut,Ct):F.copyTexSubImage2D(Dt,It,Ot,xe,Gt,ne,Ut,Ct);A.bindFramebuffer(F.READ_FRAMEBUFFER,null),A.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else be?I.isDataTexture||I.isData3DTexture?F.texSubImage3D(Dt,It,Ot,xe,Ue,Ut,Ct,Bt,Se,Qe,Ee.data):W.isCompressedArrayTexture?F.compressedTexSubImage3D(Dt,It,Ot,xe,Ue,Ut,Ct,Bt,Se,Ee.data):F.texSubImage3D(Dt,It,Ot,xe,Ue,Ut,Ct,Bt,Se,Qe,Ee):I.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,It,Ot,xe,Ut,Ct,Se,Qe,Ee.data):I.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,It,Ot,xe,Ee.width,Ee.height,Se,Ee.data):F.texSubImage2D(F.TEXTURE_2D,It,Ot,xe,Ut,Ct,Se,Qe,Ee);A.pixelStorei(F.UNPACK_ROW_LENGTH,oi),A.pixelStorei(F.UNPACK_IMAGE_HEIGHT,fe),A.pixelStorei(F.UNPACK_SKIP_PIXELS,Si),A.pixelStorei(F.UNPACK_SKIP_ROWS,Xi),A.pixelStorei(F.UNPACK_SKIP_IMAGES,gn),It===0&&W.generateMipmaps&&F.generateMipmap(Dt),A.unbindTexture()},this.initRenderTarget=function(I){J.get(I).__webglFramebuffer===void 0&&rt.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?rt.setTextureCube(I,0):I.isData3DTexture?rt.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?rt.setTexture2DArray(I,0):rt.setTexture2D(I,0),A.unbindTexture()},this.resetState=function(){Y=0,V=0,j=null,A.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var he={NOTE:0,BOMB:1,LINK:2},xi={LEFT:0,RIGHT:1},Qt={UP:0,DOWN:1,LEFT:2,RIGHT:3,UP_LEFT:4,UP_RIGHT:5,DOWN_LEFT:6,DOWN_RIGHT:7,ANY:8},Fn=Math.SQRT1_2,is=[[0,1],[0,-1],[-1,0],[1,0],[-Fn,Fn],[Fn,Fn],[-Fn,-Fn],[Fn,-Fn],[0,0]];function rp(s){let[t,e]=is[s]||[0,1];return t===0&&e===0?0:Math.atan2(-t,e)}var sp=[Qt.UP,Qt.UP_RIGHT,Qt.RIGHT,Qt.DOWN_RIGHT,Qt.DOWN,Qt.DOWN_LEFT,Qt.LEFT,Qt.UP_LEFT];function au(s,t){let e=sp.indexOf(s);return e<0?s:sp[((e+t)%8+8)%8]}var ic=s=>s===Qt.ANY?Qt.DOWN:au(s,4),ri={LANES:4,ROWS:3,LANE_W:.55,ROW_H:.5,BLOCK:.44},Bn=-.9,lu=.5,op={Easy:10,Normal:10,Hard:10,Expert:12,ExpertPlus:16};var nr=class{constructor(t,e=[]){this.baseBpm=t,this.segs=[{beat:0,sec:0,bpm:t}];let i=e.filter(n=>n&&n.bpm>0&&n.beat>=0&&Number.isFinite(n.beat)).sort((n,r)=>n.beat-r.beat);for(let n of i){let r=this.segs[this.segs.length-1];if(n.beat<=r.beat){r.bpm=n.bpm;continue}let o=r.sec+(n.beat-r.beat)*60/r.bpm;this.segs.push({beat:n.beat,sec:o,bpm:n.bpm})}}_seg(t){let e=0,i=this.segs.length-1;for(;e<i;){let n=e+i+1>>1;this.segs[n].beat<=t?e=n:i=n-1}return this.segs[e]}beatToSec(t){let e=this._seg(t);return e.sec+(t-e.beat)*60/e.bpm}secToBeat(t){let e=0,i=this.segs.length-1;for(;e<i;){let r=e+i+1>>1;this.segs[r].sec<=t?e=r:i=r-1}let n=this.segs[e];return n.beat+(t-n.sec)*n.bpm/60}bpmAt(t){return this._seg(t).bpm}};function ap(s,t,e){let i=60/t,n=4;for(;s*i*n>17.999;)n/=2;return e/i-n}function nc(s,t,e=0){let i=60/t,n=4;for(;s*i*n>17.999;)n/=2;return n+=e,n<.25&&(n=.25),n*i}var ve=(s=0,t=0,e=0)=>({x:s,y:t,z:e}),kn=(s,t)=>ve(s.x+t.x,s.y+t.y,s.z+t.z),je=(s,t)=>ve(s.x-t.x,s.y-t.y,s.z-t.z),pn=(s,t)=>ve(s.x*t,s.y*t,s.z*t),Ne=(s,t)=>s.x*t.x+s.y*t.y+s.z*t.z,sr=(s,t)=>ve(s.y*t.z-s.z*t.y,s.z*t.x-s.x*t.z,s.x*t.y-s.y*t.x),On=s=>Math.sqrt(Ne(s,s)),cu=(s,t)=>On(je(s,t)),sc=(s,t,e)=>ve(s.x+(t.x-s.x)*e,s.y+(t.y-s.y)*e,s.z+(t.z-s.z)*e);function ns(s){let t=On(s);return t>1e-9?pn(s,1/t):ve(0,0,0)}function lp(s,t){let e=On(s),i=On(t);if(e<1e-9||i<1e-9)return 0;let n=Math.min(1,Math.max(-1,Ne(s,t)/(e*i)));return Math.acos(n)*180/Math.PI}var vi=(s,t,e)=>Math.min(e,Math.max(t,s));function hu(s,t,e){let i=je(t,s),n=Ne(i,i),r=n>1e-12?vi(Ne(je(e,s),i)/n,0,1):0;return cu(e,kn(s,pn(i,r)))}function cp(s,t,e,i,n,r,o,a=6){for(let l=0;l<=a;l++){let c=l/a,h=sc(s,e,c),u=sc(t,i,c);if(hu(h,u,sc(n,r,c))<o)return c}return-1}function hp(s,t,e,i=0){return s.x>t.x-i&&s.x<e.x+i&&s.y>t.y-i&&s.y<e.y+i&&s.z>t.z-i&&s.z<e.z+i}function up(s,t,e,i){let n=je(t,s),r=je(i,e),o=je(s,e),a=Ne(n,n),l=Ne(r,r),c=Ne(r,o),h,u;if(a<1e-12&&l<1e-12)h=0,u=0;else if(a<1e-12)h=0,u=vi(c/l,0,1);else{let m=Ne(n,o);if(l<1e-12)u=0,h=vi(-m/a,0,1);else{let _=Ne(n,r),p=a*l-_*_;h=p>1e-12?vi((_*c-m*l)/p,0,1):0,u=(_*h+c)/l,u<0?(u=0,h=vi(-m/a,0,1)):u>1&&(u=1,h=vi((_-m)/a,0,1))}}let d=kn(s,pn(n,h)),f=kn(e,pn(r,u));return{dist:cu(d,f),point:pn(kn(d,f),.5)}}function zy(s){return s===0?{kind:"off",color:1}:s>=1&&s<=4?{kind:["on","flash","fade","on"][s-1],color:1}:s>=5&&s<=8?{kind:["on","flash","fade","on"][s-5],color:0}:s>=9&&s<=12?{kind:["on","flash","fade","on"][s-9],color:2}:{kind:"on",color:1}}function Hy(s,t,e,i){if(t>=0&&t<=4){let{kind:n,color:r}=zy(e);return{time:s,group:t,kind:n,color:r,brightness:i>0?Math.min(i,2):1}}return t===12||t===13?{time:s,group:"laserSpeed",side:t===12?"left":"right",value:e}:t===8?{time:s,group:"ringSpin"}:t===9?{time:s,group:"ringZoom"}:null}function fp(s,t){let e=[];if(Array.isArray(s._events))for(let n of s._events)e.push([n._time,n._type,n._value,n._floatValue??1]);if(Array.isArray(s.basicBeatmapEvents))for(let n of s.basicBeatmapEvents)e.push([n.b,n.et,n.i,n.f??1]);if(Array.isArray(s.basicEvents)){let n=s.basicEventsData||[];for(let r of s.basicEvents){let o=n[r.i??0]||{};e.push([r.b,o.t,o.i,o.f??1])}}let i=[];for(let[n,r,o,a]of e){if(!Number.isFinite(n)||n<0)continue;let l=Hy(t(n),r,o,a);l&&i.push(l)}return i.sort((n,r)=>n.time-r.time),i}function dp(s){return s.filter(t=>typeof t.group=="number").length>=16}function rc({bpm:s,startSec:t=0,endSec:e,introSec:i=0}){let n=60/s,r=[],o=Math.ceil(t/n),a=Math.floor(e/n);for(let l=o;l<=a;l++){let c=l*n,h=Math.floor(l/4),u=Math.floor(h/8),d=(l%4+4)%4,f=u%2,m=1-f;if(c<i){d===0&&r.push({time:c,group:4,kind:"fade",color:f,brightness:.7});continue}if(h%8===7&&d>=2){if(d===2)for(let p=0;p<=4;p++)r.push({time:c,group:p,kind:"fade",color:2,brightness:.6});continue}if(r.push({time:c,group:0,kind:"flash",color:d%2?m:f,brightness:1}),r.push({time:c,group:4,kind:d===0?"flash":"on",color:f,brightness:d===0?1.2:.6}),d===0){r.push({time:c,group:1,kind:"flash",color:m,brightness:1}),r.push({time:c,group:"ringSpin"});let p=2+u%3*2;r.push({time:c,group:"laserSpeed",side:"left",value:p}),r.push({time:c,group:"laserSpeed",side:"right",value:p})}r.push({time:c+n/2,group:d%2?3:2,kind:"fade",color:d%2?1:0,brightness:1}),h%4===3&&d===3&&r.push({time:c,group:"ringZoom"})}return r.sort((l,c)=>l.time-c.time)}function uu(s,t){if(!s)return 0;let e=Math.max(0,t-s.time),i=s.brightness??1;switch(s.kind){case"off":return 0;case"on":return i;case"flash":return i*(1+.8*Math.exp(-e*6));case"fade":return i*1.6*Math.exp(-e*2.2);default:return i}}var Vy=["Standard","NoArrows","OneSaber","360Degree","90Degree","Lightshow"],pp=["Easy","Normal","Hard","Expert","ExpertPlus"];function Gy(s,t){return pp.indexOf(s.name)-pp.indexOf(t.name)}function mu(s){var e;if(!s||typeof s!="object")throw new Error("Info.dat is not valid JSON.");if(typeof s.version=="string"&&s.version.startsWith("4")){let i=s.audio||{},n=s.song||{},r={};for(let o of s.difficultyBeatmaps||[])(r[e=o.characteristic]||(r[e]=[])).push({name:o.difficulty,label:o.difficulty==="ExpertPlus"?"Expert+":o.difficulty,file:o.beatmapDataFilename,njs:o.noteJumpMovementSpeed||0,offset:o.noteJumpStartBeatOffset||0,colors:gp(s.colorSchemes?.[o.beatmapColorSchemeIdx])});return mp({title:n.title||"Untitled",subTitle:n.subTitle||"",artist:n.author||"",mapper:(s.difficultyBeatmaps?.[0]?.beatmapAuthors?.mappers||[]).join(", "),bpm:i.bpm||120,songFile:i.songFilename,coverFile:s.coverImageFilename,previewStart:i.previewStartTime||0,previewDuration:i.previewDuration||0,byChar:r})}let t={};for(let i of s._difficultyBeatmapSets||[])t[i._beatmapCharacteristicName]=(i._difficultyBeatmaps||[]).map(n=>({name:n._difficulty,label:n._customData?._difficultyLabel||(n._difficulty==="ExpertPlus"?"Expert+":n._difficulty),file:n._beatmapFilename,njs:n._noteJumpMovementSpeed||0,offset:n._noteJumpStartBeatOffset||0,colors:Zy(n._customData)||gp(s._colorSchemes?.[n._beatmapColorSchemeIdx]?.colorScheme)}));if(s._songName===void 0&&!Object.keys(t).length)throw new Error("This does not look like a Beat Saber Info.dat file.");return mp({title:s._songName||"Untitled",subTitle:s._songSubName||"",artist:s._songAuthorName||"",mapper:s._levelAuthorName||"",bpm:s._beatsPerMinute||120,songFile:s._songFilename,coverFile:s._coverImageFilename,previewStart:s._previewStartTime||0,previewDuration:s._previewDuration||0,byChar:t})}function mp(s){let t=Object.keys(s.byChar),e=Vy.find(n=>s.byChar[n]?.length)||t[0],i=(s.byChar[e]||[]).slice().sort(Gy);for(let n of i)n.njs||(n.njs=op[n.name]||12);if(delete s.byChar,!s.songFile)throw new Error("Info.dat does not name a song file.");if(!i.length)throw new Error("No playable difficulties found in Info.dat.");return{...s,characteristic:e,oneSaber:e==="OneSaber",difficulties:i}}function Wy(s){let t=s.version||s._version||"";return String(t).startsWith("4")?4:String(t).startsWith("3")||Array.isArray(s.colorNotes)?3:2}function Gi(s){return s>=1e3?s/1e3-1:s<=-1e3?s/1e3+1:s}var du=s=>Math.min(3,Math.max(0,Gi(s))),pu=s=>Math.min(2,Math.max(0,Gi(s)));function _p(s,t,e=[]){let i=Wy(s),n={notes:[],walls:[],arcs:[],chains:[],bpmChanges:[...e]};i===2?qy(s,n):i===3?Yy(s,n):$y(s,n);let r=new nr(t,n.bpmChanges),o=n.notes.filter(h=>Number.isFinite(h.beat)&&h.beat>=0).map(h=>({time:r.beatToSec(h.beat),kind:h.kind,hand:h.kind===he.BOMB?-1:h.hand,lane:du(h.x),row:pu(h.y),dir:h.kind===he.BOMB?8:h.d>=0&&h.d<=8?h.d:8})).sort((h,u)=>h.time-u.time);for(let h of n.chains){if(!Number.isFinite(h.b))continue;let u=fu(o,r.beatToSec(h.b),h.c,h.x,h.y);if(u?u.chainHead=!0:o.push({time:r.beatToSec(h.b),kind:he.NOTE,hand:h.c,lane:du(h.x),row:pu(h.y),dir:oc(h.d),chainHead:!0}),!(!Number.isFinite(h.tb)||h.tb<=h.b))for(let d of Xy(h))o.push({time:r.beatToSec(d.beat),kind:he.LINK,hand:h.c,lane:d.x,row:d.y,dir:8,tangent:d.tangent})}o.sort((h,u)=>h.time-u.time);let a=[];for(let h of n.arcs){if(!Number.isFinite(h.b)||!Number.isFinite(h.tb)||h.tb<=h.b)continue;let u={time:r.beatToSec(h.b),endTime:r.beatToSec(h.tb),hand:h.c===1?1:0,x0:Gi(h.x),y0:Gi(h.y),d0:oc(h.d),m0:h.mu??1,x1:Gi(h.tx),y1:Gi(h.ty),d1:oc(h.tc),m1:h.tmu??1},d=fu(o,u.time,u.hand,h.x,h.y);d&&(d.arcHead=!0);let f=fu(o,u.endTime,u.hand,h.tx,h.ty);f&&(f.arcTail=!0),a.push(u)}a.sort((h,u)=>h.time-u.time);let l=n.walls.filter(h=>h.w>0&&h.d>0&&h.h>0&&Number.isFinite(h.beat)).map(h=>{let u=Gi(h.x);return{time:r.beatToSec(h.beat),endTime:r.beatToSec(h.beat+h.d),lane:u,width:h.w,row:Math.max(0,h.y),height:h.h}}).sort((h,u)=>h.time-u.time),c=fp(s,h=>r.beatToSec(h));return{version:i,notes:o,walls:l,arcs:a,tempo:r,lights:c}}var oc=s=>s>=0&&s<=8?s:8;function fu(s,t,e,i,n){let r=du(i),o=pu(n);return s.find(a=>a.kind===he.NOTE&&a.hand===e&&Math.abs(a.time-t)<.002&&Math.abs(a.lane-r)<.01&&Math.abs(a.row-o)<.01)||null}function Xy(s){let t=Math.max(2,Math.round(s.sc??3)),e=Number.isFinite(s.s)&&s.s>0?s.s:1,i=Gi(s.x),n=Gi(s.y),r=Gi(s.tx),o=Gi(s.ty),[a,l]=is[oc(s.d)]||[0,0],c=Math.hypot(r-i,o-n),h=i+a*c/2,u=n+l*c/2,d=m=>({x:(1-m)*(1-m)*i+2*(1-m)*m*h+m*m*r,y:(1-m)*(1-m)*n+2*(1-m)*m*u+m*m*o}),f=[];for(let m=1;m<t;m++){let _=m/(t-1),p=_*e,g=d(p),y=d(Math.min(1,p+.01)),x=d(Math.max(0,p-.01)),v=y.x-x.x,S=y.y-x.y,E=Math.hypot(v,S)||1;Math.hypot(y.x-x.x,y.y-x.y)<1e-6&&(v=a||0,S=l||-1),f.push({beat:s.b+(s.tb-s.b)*_,x:g.x,y:g.y,tangent:[v/E,S/E]})}return f}function gu(s,t,e=2.2){let[i,n]=is[s.d0]||[0,0],[r,o]=is[s.d1]||[0,0],a=s.x0,l=s.y0,c=s.x0+i*s.m0*e,h=s.y0+n*s.m0*e,u=s.x1-r*s.m1*e,d=s.y1-o*s.m1*e,f=s.x1,m=s.y1,_=1-t;return{x:_*_*_*a+3*_*_*t*c+3*_*t*t*u+t*t*t*f,y:_*_*_*l+3*_*_*t*h+3*_*t*t*d+t*t*t*m}}function qy(s,t){for(let i of s._notes||[])i._type===0||i._type===1?t.notes.push({beat:i._time,kind:he.NOTE,hand:i._type,x:i._lineIndex,y:i._lineLayer,d:i._cutDirection}):i._type===3&&t.notes.push({beat:i._time,kind:he.BOMB,x:i._lineIndex,y:i._lineLayer});for(let i of s._obstacles||[]){let n=0,r=5;i._type===1?(n=2,r=3):(i._type===2||i._lineLayer!==void 0)&&(n=i._lineLayer??0,r=i._height??5),t.walls.push({beat:i._time,d:i._duration,x:i._lineIndex,w:i._width,y:n,h:r})}for(let i of s._sliders||[])t.arcs.push({b:i._headTime,c:i._colorType,x:i._headLineIndex,y:i._headLineLayer,d:i._headCutDirection,mu:i._headControlPointLengthMultiplier,tb:i._tailTime,tx:i._tailLineIndex,ty:i._tailLineLayer,tc:i._tailCutDirection,tmu:i._tailControlPointLengthMultiplier});let e=s._customData?._BPMChanges||s._customData?._bpmChanges||s._BPMChanges||[];for(let i of e)t.bpmChanges.push({beat:i._time,bpm:i._BPM??i._bpm});for(let i of s._events||[])i._type===100&&i._floatValue>0&&t.bpmChanges.push({beat:i._time,bpm:i._floatValue})}function Yy(s,t){for(let e of s.colorNotes||[])t.notes.push({beat:e.b,kind:he.NOTE,hand:e.c??0,x:e.x??0,y:e.y??0,d:e.d??0});for(let e of s.burstSliders||[])t.chains.push({b:e.b,c:e.c??0,x:e.x??0,y:e.y??0,d:e.d??0,tb:e.tb,tx:e.tx??0,ty:e.ty??0,sc:e.sc,s:e.s});for(let e of s.sliders||[])t.arcs.push({b:e.b,c:e.c??0,x:e.x??0,y:e.y??0,d:e.d??0,mu:e.mu,tb:e.tb,tx:e.tx??0,ty:e.ty??0,tc:e.tc??0,tmu:e.tmu});for(let e of s.bombNotes||[])t.notes.push({beat:e.b,kind:he.BOMB,x:e.x??0,y:e.y??0});for(let e of s.obstacles||[])t.walls.push({beat:e.b,d:e.d,x:e.x??0,w:e.w,y:e.y??0,h:e.h});for(let e of s.bpmEvents||[])t.bpmChanges.push({beat:e.b,bpm:e.m})}function $y(s,t){let e=s.colorNotesData||[];for(let a of s.colorNotes||[]){let l=e[a.i??0]||{};t.notes.push({beat:a.b,kind:he.NOTE,hand:l.c??0,x:l.x??0,y:l.y??0,d:l.d??0})}let i=s.chainsData||[];for(let a of s.chains||[]){let l=e[a.i??0]||{},c=i[a.ci??0]||{};t.chains.push({b:a.hb,c:l.c??0,x:l.x??0,y:l.y??0,d:l.d??0,tb:a.tb,tx:c.tx??0,ty:c.ty??0,sc:c.c,s:c.s})}let n=s.arcsData||[];for(let a of s.arcs||[]){let l=e[a.hi??0]||{},c=e[a.ti??0]||{},h=n[a.ai??0]||{};t.arcs.push({b:a.hb,c:l.c??0,x:l.x??0,y:l.y??0,d:l.d??0,mu:h.m,tb:a.tb,tx:c.x??0,ty:c.y??0,tc:c.d??0,tmu:h.tm})}let r=s.bombNotesData||[];for(let a of s.bombNotes||[]){let l=r[a.i??0]||{};t.notes.push({beat:a.b,kind:he.BOMB,x:l.x??0,y:l.y??0})}let o=s.obstaclesData||[];for(let a of s.obstacles||[]){let l=o[a.i??0]||{};t.walls.push({beat:a.b,d:l.d,x:l.x??0,w:l.w,y:l.y??0,h:l.h})}}function xp(s,t){let e=[],i=s?.songFrequency,n=s?.bpmData;if(!i||!Array.isArray(n)||n.length<2)return e;for(let r of n){let o=(r.ei-r.si)/i,a=r.eb-r.sb;o>0&&a>0&&e.push({beat:r.sb,bpm:a/o*60})}return e.length&&e[0].beat===0&&Math.abs(e[0].bpm-t)<.01&&e.shift(),e}function zn(s){if(!s)return null;if(typeof s=="string"){let t=s.replace("#","");return t.length<6?null:[0,2,4].map(e=>parseInt(t.slice(e,e+2),16)/255)}if(typeof s=="object"&&Number.isFinite(s.r)&&Number.isFinite(s.g)&&Number.isFinite(s.b)){let t=s.r>1||s.g>1||s.b>1;return[s.r,s.g,s.b].map(e=>Math.max(0,Math.min(1,t?e/255:e)))}return null}function vp(s){return!s.left&&!s.right&&!s.envLeft&&!s.envRight?null:{left:s.left||s.envLeft||null,right:s.right||s.envRight||null,envLeft:s.envLeft||s.left||null,envRight:s.envRight||s.right||null}}function Zy(s){return s?vp({left:zn(s._colorLeft),right:zn(s._colorRight),envLeft:zn(s._envColorLeft),envRight:zn(s._envColorRight)}):null}function gp(s){return s?vp({left:zn(s.saberAColor),right:zn(s.saberBColor),envLeft:zn(s.environmentColor0),envRight:zn(s.environmentColor1)}):null}var Ky=100,yp=60,_u=.4,Jy=1,jy=.5,Qy=.3,ac=class{constructor(){this.samples=[]}push(t,e,i){this.samples.push({t,dir:ns(je(i,e))});let n=t-_u-.1;for(;this.samples.length>2&&this.samples[0].t<n;)this.samples.shift()}preSwingAngle(t){let e=this.samples;if(e.length<2)return 0;let i=e[e.length-1].t,n=0;for(let r=e.length-1;r>0;r--){let o=e[r-1],a=e[r];if(i-o.t>_u)break;let l=bp(o.dir,a.dir,t);if(l<0)break;let c=Math.max(a.t-o.t,1e-4);if(l/c<20&&n>5)break;n+=l}return n}};function bp(s,t,e){let i=sr(s,t),n=lp(s,t);return n<1e-6?0:Ne(i,e)>=0?n:-n}var lc=class{constructor(t,e,i){this.startT=t,this.lastDir=e,this.lastT=t,this.axis=i,this.angle=0,this.done=!1}update(t,e,i){if(this.done)return!0;let n=ns(je(i,e)),r=bp(this.lastDir,n,this.axis),o=Math.max(t-this.lastT,1e-4);return this.lastDir=n,this.lastT=t,r<0||r/o<20&&t-this.startT>.05?this.done=!0:this.angle+=r,(this.angle>=yp||t-this.startT>_u)&&(this.done=!0),this.done}};function Sp({note:s,saberHand:t,base:e,tip:i,tipVel:n,center:r}){let o=ns(je(i,e)),a=ns(sr(o,n));On(a)<.5&&(a=ve(0,0,1));let l=n.x,c=n.y,h=Math.hypot(l,c),u=h>1e-6?{x:l/h,y:c/h}:{x:0,y:-1},d=Math.abs(Ne(je(r,e),a)),f=Math.round(15*(1-vi(d/Qy,0,1))),m=null;if(!(t<0||t===s.hand))m="WRONG COLOUR";else if(s.dir!==Qt.ANY){let[p,g]=is[s.dir];h<Jy?m="TOO SLOW":u.x*p+u.y*g<jy&&(m="WRONG WAY")}return{good:m===null,reason:m,axis:a,centerPts:f,swingDir:u,bladeDir:o}}function Mp(s){return Math.round(70*vi(s/Ky,0,1))}function wp(s){return Math.round(30*vi(s/yp,0,1))}var Lo=class{constructor(){this.reset()}reset(){this.value=1,this.progress=0}hit(){this.value>=8||(this.progress++,this.progress>=this.value*2&&(this.value*=2,this.progress=0))}miss(){this.value>1&&(this.value/=2),this.progress=0}get fill(){return this.value>=8?1:this.progress/(this.value*2)}};function xu(s){return s.kind===2?20:s.chainHead?85:115}function Ep(s){let t=new Lo,e=0;for(let i of s)e+=xu(i)*t.value,t.hit();return e}function vu(s){return s>=.9?"SS":s>=.8?"S":s>=.65?"A":s>=.5?"B":s>=.35?"C":s>=.2?"D":"E"}var mn={START:50,HIT:1,MISS:-15,BAD_CUT:-10,BOMB:-15,WALL_PER_SEC:-30};function Ap(s,t=!1){let e=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new se,c=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Tp(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);let m=Tp(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function Tp(s){let t,e,i,n=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new de(o,e,i),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){let _=h.getComponent(d,m);a.setComponent(d+u,m,_)}}else o.set(h.array,l);l+=h.count*e}return n!==void 0&&(a.gpuType=n),a}var yu=(s,t=1)=>new ge({color:s,transparent:!0,opacity:t,blending:ue,depthWrite:!1}),Hn=class{constructor(t){this.world=t,this.group=new pe,this.group.visible=!1,t.scene.add(this.group),this.showRings=!1,this.showTowers=!1,this.showSkyline=!0,this.water=!1}setActive(t){this.group.visible=t}update(){}},bu=class extends Hn{constructor(t){super(t),this.showRings=!0,this.showTowers=!0}},Su=class extends Hn{constructor(t){super(t),this.showSkyline=!1,this.planetU={light:{value:new dt},rim:{value:new dt},time:{value:0}};let e=new Ft(new tn(24,48,32),new ce({uniforms:this.planetU,fog:!1,vertexShader:`varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main(){ vP = position; vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform vec3 light; uniform vec3 rim; uniform float time; varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main(){
          vec3 N = normalize(vN); vec3 V = normalize(vV);
          float lit = max(0.0, dot(N, normalize(vec3(-0.6, 0.5, 0.6))));
          float bands = 0.5 + 0.5 * sin(vP.y * 0.9 + sin(vP.x * 0.2 + time * 0.05) * 2.0);
          vec3 col = vec3(0.02, 0.015, 0.04) + light * lit * (0.25 + 0.2 * bands);
          float f = pow(1.0 - abs(dot(N, V)), 3.0);
          col += rim * f * 1.4;
          gl_FragColor = vec4(col, 1.0);
        }`}));e.position.set(14,10,-82),this.group.add(e),this.ringMat=yu(16777215,.25),this.ringMat.side=Ie,this.ringMat.fog=!1;let i=new Ft(new no(30,40,96),this.ringMat);i.position.copy(e.position),i.rotation.set(-1.25,.25,.2),this.group.add(i),this.stationMat=yu(16777215,1),this.station=new Ft(new zi(36,.22,6,160),this.stationMat),this.station.position.set(0,-6,-42),this.station.rotation.set(.15,0,0),this.group.add(this.station);let n=new Ft(new zi(36.6,.9,6,160),new ci({color:723220,metalness:.7,roughness:.4}));n.position.copy(this.station.position),n.rotation.copy(this.station.rotation),this.frame=n,this.group.add(n);let r=260;this.streakPos=new Float32Array(r*6),this.streakCol=new Float32Array(r*6),this.streaks=[];for(let a=0;a<r;a++){let l=Math.random()*Math.PI*2,c=7+Math.random()*30;this.streaks.push({x:Math.cos(l)*c,y:4+Math.sin(l)*c*.6,z:-Math.random()*110,s:.6+Math.random()*.8})}let o=new se;o.setAttribute("position",new de(this.streakPos,3).setUsage(hi)),o.setAttribute("color",new de(this.streakCol,3).setUsage(hi)),this.lines=new hn(o,new Ei({vertexColors:!0,transparent:!0,blending:ue,depthWrite:!1})),this.lines.frustumCulled=!1,this.group.add(this.lines)}update(t,{now:e,playing:i,speed:n,L:r,C:o,mix:a,wash:l,music:c,on:h,amb:u=1,tempoScale:d=1}){this.planetU.light.value.copy(a).lerp(new dt(1,1,1),.5).multiplyScalar(.4*u+.6*l),this.planetU.rim.value.copy(o[4]).multiplyScalar(.3*u+.9*Math.min(1.5,r[4])*h(.4)),this.planetU.time.value=e,this.ringMat.color.copy(o[1]).lerp(new dt(1,1,1),.3),this.ringMat.opacity=.08*u+.2*Math.min(1.2,r[1]),this.stationMat.color.copy(o[1]).multiplyScalar((.2*u+Math.min(1.5,r[1]))*h(.3)),this.station.rotation.z+=t*.03,this.frame.rotation.z=this.station.rotation.z;let f=c?c.energy:.3,m=(i?n*1.6:4)*(1+f)*d*t,_=(i?2.5:.8)*(1+f*1.5),p=this.streakPos,g=this.streakCol,y=a;this.streaks.forEach((x,v)=>{x.z+=m*x.s,x.z>5&&(x.z-=115);let S=Le.smoothstep(x.z,-110,-60)*.8*h(.6)*u;p.set([x.x,x.y,x.z,x.x,x.y,x.z-_*x.s],v*6),g.set([S*(.6+y.r*.4),S*(.6+y.g*.4),S*(.6+y.b*.4),0,0,0],v*6)}),this.lines.geometry.attributes.position.needsUpdate=!0,this.lines.geometry.attributes.color.needsUpdate=!0}},Mu=class extends Hn{constructor(t){super(t),this.showSkyline=!0;let e=120;this.u={colL:{value:new dt},colR:{value:new dt},level:{value:1},time:{value:0},eq:{value:0},spec:{value:new Float32Array(16)}};let i=new ge({color:460301}),n=this.u;i.onBeforeCompile=u=>{Object.assign(u.uniforms,n),u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
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
          #include <opaque_fragment>`)},i.customProgramCacheKey=()=>"city-windows";let r=new Ke(new Pe(1,1,1),i,e),o=new jt,a=3,l=()=>(a=a*16807%2147483647)/2147483647;for(let u=0;u<e;u++){let f=(u%2?1:-1)*(15+l()*50),m=-6-l()*105,_=3+l()*6,p=3+l()*6,g=6+Math.pow(l(),1.6)*38*(Math.abs(f)>30?1.3:1);o.compose(new D(f,g/2,m),new qe,new D(_,g,p)),r.setMatrixAt(u,o)}r.frustumCulled=!1,this.group.add(r);let c=140;this.cars=[];for(let u=0;u<c;u++)this.cars.push({lane:u%2,z:-Math.random()*110,s:6+Math.random()*8});this.carPos=new Float32Array(c*3),this.carCol=new Float32Array(c*3);let h=new se;h.setAttribute("position",new de(this.carPos,3).setUsage(hi)),h.setAttribute("color",new de(this.carCol,3).setUsage(hi)),this.traffic=new un(h,new wn({size:.35,map:Ye(),vertexColors:!0,transparent:!0,blending:ue,depthWrite:!1})),this.traffic.frustumCulled=!1,this.group.add(this.traffic)}update(t,{now:e,L:i,C:n,wash:r,music:o,on:a,amb:l=1,tempoScale:c=1}){let h=this.u;h.colL.value.copy(n[2]),h.colR.value.copy(n[3]),h.level.value=(.35*l+.65*Math.min(1.3,r))*a(.7),h.time.value=e,h.eq.value=o?a(.7):0,o?h.spec.value.set(o.spectrum):h.spec.value.fill(0);let u=this.carPos,d=this.carCol;this.cars.forEach((f,m)=>{f.z+=(f.lane?f.s:-f.s)*c*t,f.z>4&&(f.z-=115),f.z<-111&&(f.z+=115);let _=f.lane?13.2:-13.2;u.set([_,.35,f.z],m*3);let p=Le.smoothstep(f.z,-110,-70)*a(.5)*l;f.lane?d.set([p,p*.95,p*.85],m*3):d.set([p,p*.12,p*.15],m*3)}),this.traffic.geometry.attributes.position.needsUpdate=!0,this.traffic.geometry.attributes.color.needsUpdate=!0}},wu=class extends Hn{constructor(t){super(t),this.showRings=!0,this.water=!0;let e=24;this.buoys=new Ke(new tn(.12,12,8),yu(16777215,1),e),this.buoys.frustumCulled=!1,this._b=[];for(let i=0;i<e;i++)this._b.push({x:(i%2?1:-1)*(3+i%4*2.2),z:-6-Math.floor(i/2)*7,ph:Math.random()*6}),this.buoys.setColorAt(i,new dt(0,0,0));this.group.add(this.buoys)}update(t,{now:e,L:i,C:n,on:r,amb:o=1}){let a=new jt,l=new dt;this._b.forEach((c,h)=>{a.makeTranslation(c.x,.12+Math.sin(e*1.3+c.ph)*.05,c.z),this.buoys.setMatrixAt(h,a);let u=c.x<0?2:3;l.copy(n[u]).multiplyScalar((.25*o+Math.min(1.4,i[u]+i[4]*.5))*r(.5)),this.buoys.setColorAt(h,l)}),this.buoys.instanceMatrix.needsUpdate=!0,this.buoys.instanceColor.needsUpdate=!0}},Eu=class extends Hn{constructor(t){super(t),this.showSkyline=!1,this.u={colL:{value:new dt},colR:{value:new dt},colRing:{value:new dt},time:{value:0},level:{value:1}};let e=new ce({uniforms:this.u,transparent:!0,blending:ue,depthWrite:!1,side:Ie,vertexShader:`varying vec3 vN; varying vec3 vV; varying vec3 vW;
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
        }`}),i=28,n=new Ke(new ui(1,1.15,1,6),e,i),r=new jt,o=11,a=()=>(o=o*16807%2147483647)/2147483647;for(let c=0;c<i;c++){let h=c%2?1:-1,u=Math.floor(c/2),d=9+a()*20,f=.9+a()*1.4,m=new qe().setFromEuler(new wi((a()-.5)*.25,a()*3,h*(.05+a()*.15)));r.compose(new D(h*(7+a()*9),d/2-.5,-10-u*6.5),m,new D(f,d,f)),n.setMatrixAt(c,r)}n.frustumCulled=!1,this.group.add(n);let l=40;this.shards=new Ke(new io(.18),e,l),this.shards.frustumCulled=!1,this._s=Array.from({length:l},()=>({x:(Math.random()-.5)*30,y:2+Math.random()*10,z:-8-Math.random()*70,r:Math.random()*6,sp:.2+Math.random()*.6})),this.group.add(this.shards)}update(t,{now:e,L:i,C:n,wash:r,on:o,amb:a=1}){let l=this.u;l.colL.value.copy(n[2]).multiplyScalar(.2*a+Math.min(1.5,i[2]+i[0]*.4)),l.colR.value.copy(n[3]).multiplyScalar(.2*a+Math.min(1.5,i[3]+i[0]*.4)),l.colRing.value.copy(n[1]).multiplyScalar(Math.min(1.5,i[1])),l.time.value=e,l.level.value=(.25*a+.3*Math.min(1.2,r))*o(.6);let c=new jt,h=new qe;this._s.forEach((u,d)=>{u.r+=t*u.sp,h.setFromEuler(new wi(u.r,u.r*.7,0)),c.compose(new D(u.x,u.y+Math.sin(e*.5+u.r)*.3,u.z),h,new D(1,1,1)),this.shards.setMatrixAt(d,c)}),this.shards.instanceMatrix.needsUpdate=!0}},Tu=class extends Hn{constructor(t){super(t),this.showRings=!1,this.showTowers=!1,this.showSkyline=!1,this.isVoid=!0;let e=new pe;e.scale.z=-1,this.group.add(e);let i=new Pe(1,1,1),n=Math.PI/180,r=(f,m=[0,0,0],_=[0,0,0],p=[1,1,1])=>{let g=new pe;return g.position.set(...m),g.rotation.set(_[0]*n,_[1]*n,_[2]*n,"YXZ"),g.scale.set(...p),f.add(g),g},o=(f=1)=>new ge({color:0,transparent:!0,opacity:f,blending:ue,depthWrite:!1,fog:!1,side:Ie});this.mats=[0,1,2,3,4].map(()=>({core:o(),halo:o(.07)})),this.guide=[2,3,4].map(f=>({g:f,core:o(),halo:o(.07)}));let a=(f,m,_,p,g,y=4)=>{let x=r(f,_,p,g);x.add(new Ft(i,m.core));let v=new Ft(i,m.halo);return v.scale.set(y,1,y),x.add(v),x},l=[[e,"left"],[r(e,[0,0,0],[0,0,0],[-1,1,1]),"right"]];this.structMat=new ge({color:131587,fog:!1,side:Ie});let c=(f,m,_,p)=>{let g=new Ft(i,this.structMat),y=r(f,m,p,_);return y.add(g),y};for(let[f]of l){c(f,[-10,-.25,1],[.5,.5,1e3]),c(f,[-2.75,-50.4,6.25],[.5,100,.5]),c(f,[-5.5,-49.6,6.05],[.25,100,.5]),c(f,[-2.75,-2,256.4],[.3,.4,500],[0,0,22.5]);let m=r(f,[-8,2,18]);c(m,[-31,-65.5,2],[10,151,4]),c(m,[-31,-86,10],[10,200,4]),c(m,[-31.5,10,10],[5.5,4,40]),c(m,[-36,12.84,20],[20,3.5,6]),c(m,[-27,11,10],[1,1,50]),c(m,[-27,9,10],[1,1,50]),c(m,[-31,34,10],[1,40,1])}a(e,this.guide[0],[-10,.0375,0],[90,0,0],[.076,1e3,.076],3),a(e,this.guide[1],[10,.0375,0],[90,0,0],[.076,1e3,.076],3);for(let f of[-5.5,5.5])a(e,this.guide[2],[f,.25,256.2],[90,0,0],[.076,500,.076],3);let h=[];for(let[f]of l){let m=r(f,[0,0,41]);for(let _ of[0,15,30,45,65]){let p=r(m,[-4,-1,_],[0,0,-15]);a(p,this.mats[0],[0,1e3,0],[0,0,0],[.15,2e3,.15])}h.push(m)}this.spinners=[];for(let[f,m]of l){let _=r(f,[-20,0,31]);for(let p of[0,6,12,18]){let g=a(_,this.mats[m==="left"?2:3],[10.1,0,p],[0,0,-50],[.15,500,.15]);this.spinners.push({n:g,side:m,start:0,dir:1})}h.push(_)}this.spin={left:{cue:0,t0:0,speed:0},right:{cue:0,t0:0,speed:0}};for(let[f,m]of l){let _=r(f,[-8,2,18]),p=this.mats[m==="left"?2:3];a(_,p,[-26,-7,2],[0,0,0],[.3,32,.3],6),a(_,p,[-26,-3,10],[0,0,0],[.3,32,.3],6)}this.rings=[];let u=15;this.ringCore=new Ke(i,o(),u*4),this.ringHalo=new Ke(i,o(.07),u*4);for(let f of[this.ringCore,this.ringHalo])f.frustumCulled=!1,e.add(f);for(let f=0;f<u;f++){let m=Math.exp(-(4+14*f)/170);for(let _=0;_<4;_++)this.ringCore.setColorAt(f*4+_,new dt(m,m,m)),this.ringHalo.setColorAt(f*4+_,new dt(m,m,m));this.rings.push({z:4+14*f})}this.ringEv={cue:0,t0:-1e9,from:-45,to:-45,fromStep:0,step:0},this._m=new jt,this._m2=new jt,this._s=new jt,this._tmp=new dt,this.lastT=0,this._buildMirror(e,l,h);let d=new Set(this.spinners.flatMap(f=>[f.n,f.m]));this._bake(d)}_bake(t){this.group.updateMatrixWorld(!0);let e=new jt().copy(this.group.matrixWorld).invert(),i=new Map,n=r=>{if(!t.has(r)){r.isMesh&&!r.isInstancedMesh&&r.geometry.index!==void 0&&r.renderOrder!==-1&&(i.has(r.material)||i.set(r.material,[]),i.get(r.material).push(r));for(let o of[...r.children])n(o)}};n(this.group);for(let[r,o]of i){if(o.length<2)continue;let a=o.map(c=>{let h=c.geometry.clone();return h.applyMatrix4(new jt().multiplyMatrices(e,c.matrixWorld)),h}),l=new Ft(Ap(a),r);l.renderOrder=o[0].renderOrder,l.frustumCulled=!1;for(let c of o)c.parent.remove(c);this.group.add(l)}}_buildMirror(t,e,i){let a=[new $e(new D(-1,0,0),9.75),new $e(new D(1,0,0),9.75),new $e(new D(0,-1,0),0),new $e(new D(0,0,1),306),new $e(new D(0,0,-1),1)];this.mirrorMats=new Map;let l=f=>{if(!this.mirrorMats.has(f)){let m=f.clone();m.clippingPlanes=a,this.mirrorMats.set(f,m)}return this.mirrorMats.get(f)},c=new pe;c.scale.y=-1;let h=new pe;h.scale.z=-1,c.add(h),this.group.add(c);let u={[t.uuid]:h};for(let[f]of e){if(f===t)continue;let m=new pe;m.scale.copy(f.scale),h.add(m),u[f.uuid]=m}for(let f of i){let m=f.clone();m.traverse(p=>{p.isMesh&&(p.material=l(p.material),p.renderOrder=-2)});let _=[];m.traverse(p=>{p.isMesh&&p.material.opacity<1&&_.push(p)});for(let p of _)p.parent.remove(p);u[f.parent.uuid].add(m);for(let p of this.spinners)p.n.parent===f&&(p.m=m.children[f.children.indexOf(p.n)])}for(let f of[this.ringCore,this.ringHalo]){let m=new Ke(f.geometry,l(f.material),f.count);m.instanceMatrix=f.instanceMatrix,m.instanceColor=f.instanceColor,m.frustumCulled=!1,m.renderOrder=-2,h.add(m)}let d=new Ft(new ni(9.75*2,307).rotateX(-Math.PI/2).translate(0,0,-305/2),new ce({transparent:!0,depthWrite:!0,fog:!1,vertexShader:"varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:"varying vec3 vW; void main(){ float d = length(vW.xz); gl_FragColor = vec4(0.0, 0.0, 0.0, mix(0.72, 0.9, smoothstep(4.0, 120.0, d))); }"}));d.renderOrder=-1,this.group.add(d)}_ringAngle(t,e){let i=this.ringEv,n=Math.max(0,t-i.t0-e/60),r=1-Math.pow(2,-n*4);return{angle:i.from+(i.to-i.from)*r,step:i.fromStep+(i.step-i.fromStep)*r}}update(t,{L:e,C:i,on:n,showTime:r=0,mix:o,wash:a=0}){let l=this.world,c=r;if(l.showEpoch!==this.epoch||c<this.lastT-.5){this.epoch=l.showEpoch,this.spin.left.cue=l.laserCue?.left??0,this.spin.right.cue=l.laserCue?.right??0,this.spin.left.speed=this.spin.right.speed=0;for(let p of this.spinners)p.start=0;this.ringEv={cue:l.ringCue||0,t0:-1e9,from:-45,to:-45,fromStep:0,step:0}}this.lastT=c;for(let p of["left","right"]){let g=this.spin[p],y=l.laserCue?.[p]??0;if(y!==g.cue){g.cue=y,g.t0=c,g.speed=l.laserSpeed?.[p]??0;for(let x of this.spinners)x.side===p&&(x.start=g.speed>0?Math.random()*360:0,x.dir=Math.random()<.5?-1:1)}}for(let p of this.spinners){let g=this.spin[p.side],y=p.start+p.dir*g.speed*20*Math.max(0,c-g.t0);p.n.rotation.set(0,y*Math.PI/180,-50*Math.PI/180,"YXZ"),p.m&&p.m.rotation.copy(p.n.rotation)}if((l.ringCue||0)!==this.ringEv.cue){let p=this._ringAngle(l.ringCueTime??c,0),g=Math.random()<.5;this.ringEv={cue:l.ringCue||0,t0:l.ringCueTime??c,from:p.angle,to:this.ringEv.to+(g?-45:45),fromStep:p.step,step:(Math.random()*2-1)*5}}let h=Math.PI/180,u=this._m,d=this._m2,f=this._s;this.rings.forEach((p,g)=>{let{angle:y,step:x}=this._ringAngle(c,g),v=(y+x*g)*h;for(let S=0;S<4;S++){let E=S<2,R=S%2?-51.5:51.5;u.makeRotationZ(v).setPosition(0,3,p.z),d.makeTranslation(E?R:0,E?0:R,0),u.multiply(d),E||u.multiply(d.makeRotationZ(Math.PI/2)),this.ringCore.setMatrixAt(g*4+S,d.copy(u).multiply(f.makeScale(.5,17.5,.4))),this.ringHalo.setMatrixAt(g*4+S,d.copy(u).multiply(f.makeScale(1.6,17.5,1.6)))}}),this.ringCore.instanceMatrix.needsUpdate=!0,this.ringHalo.instanceMatrix.needsUpdate=!0;let m=p=>Math.min(1.6,e[p]),_=(p,g,y=null)=>{let x=m(g);if(p.core.color.copy(i[g]).lerp(tb,.25).multiplyScalar(x),p.halo.color.copy(i[g]).multiplyScalar(x),y){let S=Math.max(0,1-x)*n(.2);p.core.color.r+=y.r*S,p.core.color.g+=y.g*S,p.core.color.b+=y.b*S,p.halo.color.r+=y.r*S*.5,p.halo.color.g+=y.g*S*.5,p.halo.color.b+=y.b*S*.5}let v=p.core.color.r+p.core.color.g+p.core.color.b>.004;p.core.visible=p.halo.visible=v};for(let p=0;p<5;p++)_(this.mats[p],p);for(let p of this.guide)_(p,p.g,eb);_({core:this.ringCore.material,halo:this.ringHalo.material},1);for(let[p,g]of this.mirrorMats)g.color.copy(p.color),g.visible=p.visible;o&&this.structMat.color.setRGB(8e-4,8e-4,.0012).lerp(this._tmp.copy(o).multiplyScalar(.012),Math.min(1,a*.5))}},tb=new dt(1,1,1),eb=new dt(.05,.05,.08),Rp={tunnel:bu,orbital:Su,city:Mu,liquid:wu,crystal:Eu,void:Tu},Cp={tunnel:"Neon Tunnel",orbital:"Orbital",city:"Synth City",liquid:"Liquid Grid",crystal:"Crystal Hall",void:"Void"};var Jt={left:new dt(1,.13,.32),right:new dt(.12,.55,1),white:new dt(.95,.9,1),violet:new dt(.62,.25,1),bg:new dt(.012,.004,.035)},iw=[Jt.left,Jt.right,Jt.white],No=null;function Ye(){if(No)return No;let s=document.createElement("canvas");s.width=s.height=128;let t=s.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.55)"),e.addColorStop(.6,"rgba(255,255,255,0.12)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),No=new Ti(s),No.colorSpace=Ae,No}var ib=new jt().makeScale(1,-1,1),Vn=(s,t=1,e={})=>new ge({color:s,transparent:!0,opacity:t,blending:ue,depthWrite:!1,...e}),ss={envTop:{value:new dt(.01,.005,.02)},envHorizon:{value:new dt(.2,.1,.4)},envLeft:{value:new dt(.5,.05,.1)},envRight:{value:new dt(.05,.2,.5)},envFloor:{value:new dt(.01,.01,.02)}};function nb(s){return new ce({uniforms:{color:{value:new dt(1,1,1)},opacity:{value:s}},vertexShader:`varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform vec3 color; uniform float opacity; varying vec3 vN; varying vec3 vV;
      void main(){ float f = abs(dot(normalize(vN), normalize(vV))); gl_FragColor = vec4(color * pow(f, 3.0) * opacity, 1.0); }`,transparent:!0,blending:ue,depthWrite:!1,side:Ie})}var cc=class{constructor(t){this.scene=t,t.background=Jt.bg.clone(),t.fog=new Dr(Jt.bg.getHex(),6,50),this.hemi=new ao(9075967,328458,1),t.add(this.hemi),this.sun=new co(16777215,.7),this.sun.position.set(1,3,2),t.add(this.sun),this.groupColor=Array.from({length:5},()=>new dt),this.groupLevel=new Float32Array(5),this.flashScale=1,this.low=!1,this.time=0,this.lightColors=[Jt.left.clone(),Jt.right.clone(),Jt.white.clone()],this.opts={musicFx:!0,playFx:!0,runway:!0,flyby:!0,skyline:!0,introFx:!0,beatSync:!0,theme:"tunnel"},this.power=1,this.powerT=1,this.outroT=-1,this.combo=1,this.comboTarget=1,this.dark=0,this.darkTarget=0,this.lowEnergy=0,this._grey=new dt(.35,.35,.4),this._setMenuShow(),this.reflections=[],this.mirrorRoot=new pe,this.mirrorRoot.name="Reflections",t.add(this.mirrorRoot),this.bg=.5,this._mix=new dt,this.baseHorizon=new dt(.08,.02,.16),this.baseTop=new dt(0,0,.012),this._buildSky(),this._buildFloor(),this._buildRails(),this._buildRings(),this._buildLasers(),this._buildTowers(),this._buildDust(),this._buildHorizon(),this._buildHaze(),this._buildRunway(),this._buildFlyby(),this._buildSkyline(),this.themes={};for(let[e,i]of Object.entries(Rp))this.themes[e]=new i(this);this.setOptions(this.opts)}setOptions(t){Object.assign(this.opts,t);let e=this.themes?.[this.opts.theme]?this.opts.theme:"tunnel";for(let[o,a]of Object.entries(this.themes||{}))a.setActive(o===e);let i=this.themes?.[e],n=i?i.showRings:!0,r=i?i.showTowers:!0;for(let o of this.rings)o.g.visible=n;this.towers.visible=r&&!this.low,this.floorUniforms.water.value=i?.water?1:0,this.voidMode=!!i?.isVoid,this.runway.visible=this.opts.runway,this.flyby.visible=this.opts.flyby&&!this.low&&!this.voidMode,this.skyline.visible=this.opts.skyline&&!this.low&&(i?i.showSkyline:!0)&&!this.voidMode,this.dust.visible=!this.low&&!this.voidMode,this.floor.visible=!this.voidMode,this.horizonSprite.visible=!this.voidMode;for(let o of this.railMats)for(let a of o.objs)a.visible=!this.voidMode;this.opts.playFx||(this.comboTarget=1,this.lowEnergy=0),this._applyExtraLasers()}setStageColors(t,e){this.lightColors[0].copy(t||Jt.left),this.lightColors[1].copy(e||Jt.right)}setCombo(t){this.comboTarget=this.opts.playFx?.55+.45*(Math.log2(Math.max(1,t))/3):1,this._mult=t,this._applyExtraLasers()}setMapLights(t){this.darkTarget=Math.max(0,Math.min(1,Number(t)||0))}setLowEnergy(t){this.lowEnergy=this.opts.playFx?Math.max(0,Math.min(1,t)):0}_applyExtraLasers(){if(!this.lasers)return;let t=!this.opts.playFx||(this._mult||8)>=4;for(let e of this.lasers)e.pivot.visible=!this.voidMode&&(!e.extra||!this.low&&t)}startIntro(){this.powerT=this.opts.introFx?0:1,this.outroT=-1}startOutro(){this.opts.introFx&&(this.outroT=0,this.flashAll(2,1.5))}endOutro(){this.outroT=-1,this.powerT=1}ripple(t,e,i=1){if(this.low||!this.opts.playFx&&!this.themes[this.opts.theme]?.water)return;let n=this.floorUniforms,r=this._rip=((this._rip||0)+1)%6;n.rip.value[r].set(t,e,this.time),n.ripStrength.value[r]=i}setShow(t){this.events=t||[],this._resetShow()}_setMenuShow(){this.menuShow=rc({bpm:96,startSec:0,endSec:600,introSec:0}),this.setShow(this.menuShow),this.menuMode=!0}useMenuShow(){this.menuMode||(this.setShow(this.menuShow),this.menuMode=!0)}useSongShow(t){this.menuMode=!1,this.setShow(t)}_resetShow(){this.next=0,this.last=new Array(5).fill(null),this.override=new Array(5).fill(null),this.laserSpeed={left:1.5,right:1.5},this.laserCue=this.laserCue||{left:0,right:0},this.lastShowTime=-1/0,this.showEpoch=(this.showEpoch||0)+1}flashAll(t=2,e=1.4){for(let i=0;i<5;i++)this.override[i]={time:this.lastShowTime,kind:"fade",color:t,brightness:e}}kick(t=1){this.kickLevel=Math.min(1.5,(this.kickLevel||0)+t)}setQuality(t){this.low=t,this.dust.visible=!t&&!this.voidMode,this.mirrorRoot.visible=!t;for(let e of this.haze)e.visible=!t;this.floorUniforms.reflect.value=t?0:1,this.setOptions({})}_advance(t){t<this.lastShowTime-.5&&this._resetShow(),this.lastShowTime=t;let e=this.events;for(;this.next<e.length&&e[this.next].time<=t;){let i=e[this.next++];if(typeof i.group=="number")this.last[i.group]=i;else if(i.group==="laserSpeed"){this.laserSpeed[i.side]=i.value,this.laserCue[i.side]++;for(let n of this.lasers)n.side===i.side&&(n.phase=Math.random()*Math.PI*2)}else i.group==="ringSpin"?this._ringSpin(t):i.group==="ringZoom"&&(this.ringZoomTarget=this.ringZoomTarget===1?0:1)}for(let i=0;i<5;i++){let n=this.last[i],r=uu(n,t),o=this.lightColors,a=n?o[n.color]:o[1],l=this.override[i];if(l){let c=uu(l,t);c<.02?this.override[i]=null:c>r&&(r=c,a=o[l.color])}r>1&&(r=1+(r-1)*this.flashScale),this.groupLevel[i]=r,this.groupColor[i].copy(a),this.lowEnergy>0&&(this.groupColor[i].lerp(this._grey,.75*this.lowEnergy),Math.random()<.12*this.lowEnergy&&(this.groupLevel[i]*=.25))}}_buildSky(){this.skyUniforms={top:{value:new dt(0,0,.01)},horizon:{value:new dt(.08,.02,.16)},tint:{value:new dt(0,0,0)},time:{value:0},amb:{value:1},stars:{value:.7}};let t=new Ft(new tn(95,32,16),new ce({uniforms:this.skyUniforms,side:Oe,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
          uniform vec3 top; uniform vec3 horizon; uniform vec3 tint; uniform float time; uniform float amb; uniform float stars; varying vec3 vDir;
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
            col += vec3(0.8, 0.75, 1.0) * star * stars;
            gl_FragColor = vec4(col, 1.0);
          }`}));t.renderOrder=-10,this.scene.add(t)}_buildFloor(){this.floorUniforms={offset:{value:0},glow:{value:new dt(.3,.1,.6)},glowLevel:{value:.4},fogColor:{value:Jt.bg.clone()},reflect:{value:1},time:{value:0},water:{value:0},kick:{value:0},rip:{value:Array.from({length:6},()=>new D(0,0,-100))},ripStrength:{value:new Float32Array(6)},ripColor:{value:new dt(.6,.5,1)},amb:{value:1},grid:{value:1},gridTint:{value:0},gridColor:{value:new dt(.45,.2,.95)}};let t=new Ft(new ni(90,100,1,1),new ce({uniforms:this.floorUniforms,transparent:!0,depthWrite:!0,vertexShader:"varying vec2 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:`
          uniform float offset; uniform vec3 glow; uniform float glowLevel; uniform vec3 fogColor; uniform float reflect; varying vec2 vW;
          uniform float time; uniform float water; uniform float kick; uniform vec3 rip[6]; uniform float ripStrength[6]; uniform vec3 ripColor; uniform float amb; uniform float grid; uniform float gridTint; uniform vec3 gridColor;
          float gridLine(float x, float w){ float d = abs(fract(x - 0.5) - 0.5) / fwidth(x); return 1.0 - clamp(d - w, 0.0, 1.0); }
          void main(){
            vec2 g = vec2(vW.x / 1.0, (vW.y + offset) / 2.0);
            float line = max(gridLine(g.x, 0.5), gridLine(g.y, 0.5));
            float dist = length(vW);
            vec3 base = vec3(0.018, 0.01, 0.035) * amb;
            vec3 lineCol = mix(vec3(0.45, 0.2, 0.95), gridColor, gridTint) * (0.35 * amb + 0.65 * glowLevel);
            vec3 col = base + lineCol * line * 0.13 * (1.0 - water) * grid;
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
          }`}));t.rotation.x=-Math.PI/2,t.position.z=-40,t.renderOrder=-1,this.scene.add(t),this.floor=t;let e=new Ft(new Pe(2.4,.05,1.6),new ci({color:1380394,roughness:.35,metalness:.7}));e.position.set(0,.025,0),this.scene.add(e),this.platEdge=Vn(Jt.violet.clone(),.9);for(let[i,n,r,o]of[[2.42,.02,0,-.8],[2.42,.02,0,.8],[.02,1.6,-1.2,0],[.02,1.6,1.2,0]]){let a=new Ft(new Pe(i,.012,n),this.platEdge);a.position.set(r,.055,o),this.scene.add(a)}}_buildRails(){this.railMats=[];for(let[t,e]of[[-1.5,Jt.left],[1.5,Jt.right]]){let i=Vn(e.clone(),1),n=new Ft(new Pe(.03,.03,80),i);n.position.set(t,.03,-40),this.scene.add(n);let r=new Ft(new ni(.6,80),Vn(e.clone(),.3,{map:Ye()}));r.rotation.x=-Math.PI/2,r.position.set(t,.035,-40),this.scene.add(r),this.railMats.push({mat:i,glow:r.material,base:e.clone(),objs:[n,r]}),this._reflect(n)}}_buildRings(){this.rings=[],this.ringMat=Vn(Jt.violet.clone(),1),this.ringFrameMat=new ci({color:657426,metalness:.6,roughness:.45});let t=new zi(7,.05,4,4),e=new zi(7.35,.4,4,4);for(let i=0;i<14;i++){let n=new pe,r=new Ft(t,this.ringMat),o=new Ft(e,this.ringFrameMat);n.add(o,r),n.rotation.z=Math.PI/4,n.position.set(0,3,-16),this.scene.add(n),this._reflect(r),this.rings.push({g:n,rot:Math.PI/4,from:Math.PI/4,to:Math.PI/4,start:0,delay:i*.035})}this.ringZoom=0,this.ringZoomTarget=0}_ringSpin(t){this.ringCue=(this.ringCue||0)+1,this.ringCueTime=t;let e=Math.random()<.5?-1:1,i=Math.PI/2*(1+Math.floor(Math.random()*2));for(let n of this.rings)n.from=n.rot,n.to=n.rot+e*i,n.start=t+n.delay}_buildLasers(){this.lasers=[];let t=new ui(.035,.035,60,6,1,!0),e=new ui(.45,.45,60,10,1,!0);t.translate(0,30,0),e.translate(0,30,0),this.laserMats={};let i=r=>(this.laserMats[r]||(this.laserMats[r]={core:Vn(16777215,1),halo:nb(.35)}),this.laserMats[r]),n=(r,o,a,l,c,h,u)=>{let d=i(r),f=new pe;f.position.set(o,a,l);let m=new Ft(t,d.core);f.add(m,new Ft(e,d.halo)),this.scene.add(f),this._reflect(m),this.lasers.push({pivot:f,group:r,side:c,tilt:h,phase:Math.random()*6.28,extra:u})};for(let r=0;r<7;r++)n(0,(r-3)*3.2,-2,-62,null,(r-3)*.16,r%2===1);for(let r=0;r<4;r++)n(2,-6-r*1.4,0,-22-r*7,"left",0,r>=2),n(3,6+r*1.4,0,-22-r*7,"right",0,r>=2)}_buildTowers(){this.towerUniforms={uColL:{value:new dt},uColR:{value:new dt},uColRing:{value:new dt},uColC:{value:new dt},uTime:{value:0},uEq:{value:0},uSpec:{value:new Float32Array(16)}};let e=new ci({color:460046,metalness:.9,roughness:.22});sb(e,this.towerUniforms);let i=new Ke(new Pe(1,1,1),e,28),n=new Ke(new Pe(1.04,.06,1.04),Vn(16777215,.95),28);for(let o=0;o<28;o++)n.setColorAt(o,new dt(0,0,0));this.towerStripMesh=n,this._stripColor=new dt;let r=new jt;for(let o=0;o<28;o++){let a=o%2?1:-1,l=Math.floor(o/2),c=6+l*37%11+l%3*2,h=2+l%3,u=a*(19+l%4*3.5),d=-16-l*5.5;r.compose(new D(u,c/2,d),new qe,new D(h,c,h)),i.setMatrixAt(o,r),r.compose(new D(u,c,d),new qe,new D(h,1,h)),n.setMatrixAt(o,r)}this.towers=new pe,this.towers.add(i,n),this.towerStrip=n.material,this.scene.add(this.towers)}_buildDust(){let e=new Float32Array(780);for(let n=0;n<260;n++)e[n*3]=(Math.random()-.5)*14,e[n*3+1]=Math.random()*6,e[n*3+2]=-Math.random()*40;let i=new se;i.setAttribute("position",new de(e,3)),this.dustMat=new wn({size:.04,map:Ye(),color:12166911,transparent:!0,opacity:.55,blending:ue,depthWrite:!1}),this.dust=new un(i,this.dustMat),this.dust.frustumCulled=!1,this.scene.add(this.dust),this._dustPos=e}_buildHorizon(){this.horizonMat=new ze({map:Ye(),color:16777215,transparent:!0,opacity:.5,blending:ue,depthWrite:!1,fog:!1});let t=new He(this.horizonMat);t.scale.set(48,26,1),t.position.set(0,3,-75),this.scene.add(t),this.horizonSprite=t}_buildHaze(){this.haze=[];for(let[t,e,i,n,r]of[[-20,3,24,11,1.1],[-42,4.5,40,18,1.2]]){let o=new He(new ze({map:Ye(),color:16777215,transparent:!0,opacity:.08,blending:ue,depthWrite:!1,fog:!1}));o.scale.set(i,n,1),o.position.set(0,e,t),o.userData.k=r,this.scene.add(o),this.haze.push(o)}}_buildRunway(){let e=new Ke(new Pe(.1,.015,.55),Vn(16777215,1),60),i=new jt;for(let n=0;n<60;n++){let r=n<30?-1:1,o=-2-n%30*2;i.makeTranslation(r*1.15,.02,o),e.setMatrixAt(n,i),e.setColorAt(n,new dt(0,0,0))}e.frustumCulled=!1,this.runway=e,this._runwayN=30,this.scene.add(e)}_runwayGain(t,e,i,n){let r=Math.min(1.3,t[4]+t[e]*.5);return this.voidMode?.35+.75*r:i+n*r}_updateRunway(t,e,i,n,r,o,a){if(!this.runway.visible)return;let l=this._runwayN,c=this._m4r||(this._m4r=new jt),h=this._stripColor2||(this._stripColor2=new dt);if(r){let d=0;for(let f=Math.floor(t)-1;d<l;f++){let m=Bn-(r.beatToSec(f)-o)*a;if(m<-62)break;let _=(f%4+4)%4===0,p=Le.smoothstep(m,-62,-40)*(1-Le.smoothstep(m,-3.5,.3));for(let g of[0,1]){let y=g*l+d;c.makeTranslation(g?1.15:-1.15,.02,m),this.runway.setMatrixAt(y,c);let x=g?3:2;h.copy(e[x]).lerp(Jt.white,.35).multiplyScalar((_?1.1:.55)*this._runwayGain(i,x,.5,.7)*p*n(.1)),this.runway.setColorAt(y,h)}d++}for(;d<l;d++)for(let f of[0,1])c.makeScale(0,0,0),this.runway.setMatrixAt(f*l+d,c);this.runway.instanceMatrix.needsUpdate=!0,this.runway.instanceColor.needsUpdate=!0,this._runwayMoved=!0;return}let u=(t%1+1)%1;for(let d=0;d<l*2;d++){let f=d%l;this._runwayMoved&&(c.makeTranslation(d<l?-1.15:1.15,.02,-2-f*2),this.runway.setMatrixAt(d,c));let m=1-f/(l-1),_=u-(1-m),p=Math.exp(-_*_*60)+.08,g=d<l?2:3;h.copy(e[g]).lerp(Jt.white,.3).multiplyScalar(p*this._runwayGain(i,g,.4,.8)*n(.1)),this.runway.setColorAt(d,h)}this._runwayMoved&&(this.runway.instanceMatrix.needsUpdate=!0,this._runwayMoved=!1),this.runway.instanceColor.needsUpdate=!0}_buildFlyby(){let e=new Ke(new Pe(1,1,1),new ci({color:723220,metalness:.6,roughness:.5}),24),i=new Ke(new Pe(1,1,1),Vn(16777215,1),24);e.frustumCulled=i.frustumCulled=!1;for(let n=0;n<24;n++)i.setColorAt(n,new dt(0,0,0));this.flyby=new pe,this.flyby.add(e,i),this.scene.add(this.flyby),this._fly={frame:e,glow:i,count:8,z:Array.from({length:8},(n,r)=>-12-r*12)}}_updateFlyby(t,e,i,n,r,o,a,l){if(!this.flyby.visible)return;let c=this._fly,h=this._m4||(this._m4=new jt),u=new qe,d=(e?i*.55:1.2)*t,f=13,m=13,_=.6,p=this._stripColor3||(this._stripColor3=new dt),g=0,y=4,x=i*.6;if(a){let v=a.secToBeat(l);y=a.bpmAt(v)>150?8:4,g=Math.ceil(v/y)-1}for(let v=0;v<c.count;v++){let S;if(a?S=-(a.beatToSec((g+v)*y)-l)*x:(c.z[v]+=d,c.z[v]>6&&(c.z[v]-=c.count*12),S=c.z[v]),a&&(S<-100||S>6)){h.makeScale(0,0,0);for(let R=0;R<3;R++)c.frame.setMatrixAt(v*3+R,h),c.glow.setMatrixAt(v*3+R,h);continue}[[new D(-f,m/2,S),new D(_,m,_)],[new D(f,m/2,S),new D(_,m,_)],[new D(0,m,S),new D(f*2+_,_,_)]].forEach(([R,M],C)=>{h.compose(R,u,M),c.frame.setMatrixAt(v*3+C,h);let T=R.clone(),P=M.clone();C<2?(T.x+=C===0?_/2+.01:-_/2-.01,P.x=.04):(T.y-=_/2+.01,P.y=.04),h.compose(T,u,P),c.glow.setMatrixAt(v*3+C,h);let b=Le.smoothstep(S,-96,-60)*(1-Le.smoothstep(S,-16,-5));p.copy(n[0]).multiplyScalar((.1+Math.min(1.4,r[0])*.5)*b*o(.6)),c.glow.setColorAt(v*3+C,p)})}c.frame.instanceMatrix.needsUpdate=!0,c.glow.instanceMatrix.needsUpdate=!0,c.glow.instanceColor.needsUpdate=!0}_buildSkyline(){let t=document.createElement("canvas");t.width=2048,t.height=256;let e=t.getContext("2d"),i=0,n=7,r=()=>(n=n*16807%2147483647)/2147483647;for(;i<t.width;){let a=20+r()*70,l=40+r()*170;e.fillStyle="#000",e.fillRect(i,t.height-l,a,l),e.fillStyle="rgba(255,255,255,0.9)";for(let c=t.height-l+8;c<t.height-6;c+=9)for(let h=i+4;h<i+a-4;h+=7)r()<.18&&e.fillRect(h,c,2,3);i+=a+r()*6}let o=new Ti(t);o.wrapS=Ls,o.repeat.x=3,o.colorSpace=Ae,this.skylineMat=new ge({map:o,transparent:!0,side:Oe,fog:!1,depthWrite:!1,color:16777215}),this.skyline=new Ft(new ui(88,88,18,48,1,!0),this.skylineMat),this.skyline.position.y=5,this.skyline.renderOrder=-9,this.scene.add(this.skyline)}_updateSkyline(t,e,i,n){this.skyline.visible&&(this.skyline.rotation.y+=t*.006,this.skylineMat.color.copy(e).lerp(Jt.white,.4).multiplyScalar((.25+.5*i)*n(.8)))}_reflect(t){let e=new Ft(t.geometry,t.material);e.matrixAutoUpdate=!1,e.renderOrder=-2,this.mirrorRoot.add(e),this.reflections.push({src:t,dst:e})}_updateReflections(){for(let t of this.reflections)t.src.updateWorldMatrix(!0,!1),t.dst.matrix.multiplyMatrices(ib,t.src.matrixWorld),t.dst.visible=t.src.visible&&t.src.parent?.visible!==!1}update(t,{showTime:e,now:i,playing:n,speed:r,beat:o=i*1.6,music:a=null,tempo:l=null}){let c=this.opts.beatSync&&l?l:null;this.time=i,this._advance(e);let h=this.groupLevel,u=this.groupColor;this.dark+=(this.darkTarget-this.dark)*Math.min(1,t*2.5);let d=this.voidMode?1:this.dark,f=1-d,m=this.opts.musicFx&&a&&this.darkTarget<.5;m&&a.kick&&(this.kick(.5),this.themes[this.opts.theme]?.water&&this.ripple(0,-9,.7));let _=this.kickLevel=Math.max(0,(this.kickLevel||0)-t*3);this.powerT<1&&(this.powerT=Math.min(1,this.powerT+t/1.8)),this.outroT>=0&&(this.outroT+=t),this.power=this.outroT>=0?Math.max(.12,1-this.outroT/1.6):1;let p=q=>this.power*Le.smoothstep(this.powerT,q,q+.25);if(this.combo+=(this.comboTarget-this.combo)*Math.min(1,t*3),m){h[0]+=a.kickLevel*.35,h[4]+=a.kickLevel*.25;let q=1+.3*a.buildUp;for(let nt=0;nt<h.length;nt++)h[nt]*=q}let g=1+(this.combo-1)*f;h[0]*=p(.5)*g,h[1]*=p(.3)*(.7+.3*g),h[2]*=p(.55)*g,h[3]*=p(.55)*g,h[4]*=p(0),this._on=p,this.ringMat.color.copy(u[1]).multiplyScalar(.15*f+h[1]*.85+_*.2),this.ringZoom+=(this.ringZoomTarget-this.ringZoom)*Math.min(1,t*2.5);let y=1+.05*_,x=4.2-this.ringZoom*2.4;this.rings.forEach((q,nt)=>{let Ht=Le.clamp((e-q.start)/1.1,0,1),Yt=1-Math.pow(1-Ht,3);q.rot=q.start>e?q.from:q.from+(q.to-q.from)*Yt,q.g.rotation.z=q.rot+nt*.012,q.g.position.z=-16-nt*x,q.g.scale.setScalar(y)});for(let q of this.lasers){let nt=this.laserMats[q.group],Ht=h[q.group];if(nt.core.color.copy(u[q.group]).multiplyScalar(Ht),nt.halo.uniforms.color.value.copy(u[q.group]).multiplyScalar(Ht),q.side){let Yt=this.laserSpeed[q.side]*.45*(m?1+1.2*a.buildUp:1);q.phase+=t*Yt;let Nt=q.side==="left"?1:-1;q.pivot.rotation.z=Nt*(.35+.45*Math.sin(q.phase)),q.pivot.rotation.x=-.25+.15*Math.cos(q.phase*.7)}else q.pivot.rotation.z=q.tilt+Math.sin(i*.4+q.phase)*.05,q.pivot.rotation.x=-.12}let v=h[4];this.horizonMat.color.copy(u[4]),this.horizonMat.opacity=.12*f+.45*Math.min(1.5,v),this.floorUniforms.glow.value.copy(u[4]),this.floorUniforms.glowLevel.value=.25*f+.75*Math.min(1.5,v)+_*.3,this.floorUniforms.amb.value=this.voidMode?0:.12+.88*f,this.floorUniforms.grid.value=1,this.floorUniforms.gridTint.value=this.voidMode?1:0,this.platEdge.color.copy(u[4]).lerp(Jt.violet,.5).multiplyScalar((this.voidMode?.1:.15)+.35*f+.6*v);let S=Math.min(1.8,.45*h[0]+.2*h[1]+.25*Math.max(h[2],h[3])+.55*h[4]);this.bg+=(S-this.bg)*Math.min(1,t*10);let E=this._mix.setRGB(0,0,0),R=0;for(let q=0;q<h.length;q++)E.r+=u[q].r*h[q],E.g+=u[q].g*h[q],E.b+=u[q].b*h[q],R+=h[q];R>.001?E.multiplyScalar(1/R):E.copy(Jt.violet);let M=this.bg;this.voidMode&&(this.floorUniforms.glow.value.copy(E),this.floorUniforms.gridColor.value.copy(E),this.floorUniforms.glowLevel.value=.55*Math.min(1.5,M)),this.skyUniforms.horizon.value.copy(this.baseHorizon).multiplyScalar((.1+.5*M)*f);let C=.1*M*f+(this.voidMode?.015:.06)*M*d;this.skyUniforms.horizon.value.r+=E.r*C,this.skyUniforms.horizon.value.g+=E.g*C,this.skyUniforms.horizon.value.b+=E.b*C,this.skyUniforms.top.value.copy(this.baseTop).lerp(E,.02*M).multiplyScalar(f),this.skyUniforms.tint.value.copy(E).multiplyScalar((this.voidMode?.025:.08)*M),this.skyUniforms.amb.value=f,this.skyUniforms.stars.value=this.voidMode?0:.15+.55*f,this.skyUniforms.time.value=i;let T=Math.min(1.4,M);this.scene.fog.color.copy(Jt.bg).multiplyScalar((.25+.35*T)*f);let P=f+(this.voidMode?.08:.3)*d,b=.14*T*P;this.scene.fog.color.r+=E.r*b,this.scene.fog.color.g+=E.g*b,this.scene.fog.color.b+=E.b*b,this.hemi.color.copy(E).multiplyScalar(.25+.9*T*P),this.hemi.intensity=.5+.8*T*P,this.sun.intensity=.25+.45*T*P;for(let q of this.haze)q.material.color.copy(E),q.material.opacity=(.03*f+(this.voidMode?.012:.1)*T)*q.userData.k;let B=ss.envLeft.value.copy(u[2]).multiplyScalar(h[2]);B.r+=u[0].r*h[0]*.5,B.g+=u[0].g*h[0]*.5,B.b+=u[0].b*h[0]*.5;let H=ss.envRight.value.copy(u[3]).multiplyScalar(h[3]);H.r+=u[0].r*h[0]*.5,H.g+=u[0].g*h[0]*.5,H.b+=u[0].b*h[0]*.5,ss.envHorizon.value.copy(E).multiplyScalar(.12*f+.55*T),ss.envTop.value.copy(E).multiplyScalar(.03*T),ss.envFloor.value.copy(u[4]).multiplyScalar(.02*f+.12*h[4]),this.floorUniforms.fogColor.value.copy(this.scene.fog.color);for(let q of this.railMats){let nt=((this.voidMode?0:.1)+.45*f+.45*Math.min(1.4,h[0])+_*.3)*p(.15);q.mat.color.copy(q.base).multiplyScalar(nt),q.glow.opacity=.18*f+.25*Math.min(1.4,h[0])}let z=this.towerStripMesh;for(let q=0;q<z.count;q++){let nt=q%2?3:2;this._stripColor.copy(u[nt]).multiplyScalar((.06*f+Math.min(1.6,h[nt])*.9+_*.15)*p(.7)),z.setColorAt(q,this._stripColor)}z.instanceColor.needsUpdate=!0;let Y=this.towerUniforms,V=.3+.7*f;Y.uColL.value.copy(u[2]).multiplyScalar(h[2]*V),Y.uColR.value.copy(u[3]).multiplyScalar(h[3]*V),Y.uColRing.value.copy(u[1]).multiplyScalar(h[1]*V),Y.uColC.value.copy(u[4]).multiplyScalar(h[4]*V),Y.uTime.value=i,Y.uEq.value=m?p(.7):0,m?Y.uSpec.value.set(a.spectrum):Y.uSpec.value.fill(0),this.low||this._updateReflections();let j=this.floorUniforms;j.time.value=i,j.kick.value=_,j.ripColor.value.copy(E).lerp(Jt.white,.3),j.glowLevel.value*=p(0);let O=q=>p(q)*f;this._updateRunway(o,u,h,this.voidMode?p:O,c,e,r),this._updateFlyby(t,n,r,u,h,O,c,e),this._updateSkyline(t,E,T,O);let k=this.themes[this.opts.theme],it=c?Le.clamp(c.bpmAt(o)/120,.6,1.6):1;if(k&&k.update(t,{now:i,showTime:e,playing:n,speed:r,L:h,C:u,mix:E,wash:T,kick:_,music:m?a:null,on:p,amb:f,low:this.low,tempoScale:it}),n&&(this.floorUniforms.offset.value+=t*r),!this.low){let q=this._dustPos,nt=(n?r*.35:.4)*t;for(let Ht=0;Ht<q.length;Ht+=3)q[Ht+2]+=nt,q[Ht+2]>2&&(q[Ht+2]-=42);this.dust.geometry.attributes.position.needsUpdate=!0,this.dustMat.color.copy(u[1]).lerp(Jt.white,.6)}}};function sb(s,t){s.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
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
      }`)},s.customProgramCacheKey=()=>"tower-glass"}var rb=.2,hc=320,rs={off:0,short:.12,normal:.2,long:.32},Do=class{constructor(t,e,i,n,r=1){this.holder=t,this.hand=e,this.color=i.clone(),this.length=r,this.inputSource=null,this.tracker=new ac,this.base=ve(),this.tip=ve(),this.prevBase=ve(),this.prevTip=ve(),this.vel=ve(),this._primed=!1,this.pivot=new pe,t.add(this.pivot);let o=new Ft(new ui(.013,.013,r,14,1,!0),new ce({uniforms:{color:{value:i.clone()}},vertexShader:`varying vec3 vN; varying vec3 vV;
          void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform vec3 color; varying vec3 vN; varying vec3 vV;
          void main(){
            float f = abs(dot(normalize(vN), normalize(vV)));
            vec3 c = mix(color * 1.15, vec3(1.0), smoothstep(0.55, 0.92, f));
            gl_FragColor = vec4(c, 1.0);
          }`}));o.rotation.x=-Math.PI/2,o.position.z=-r/2,this.pivot.add(o);let a=new Ft(new ui(.028,.028,r,12,1,!0),new ge({color:i,transparent:!0,opacity:.2,blending:ue,depthWrite:!1}));a.rotation.x=-Math.PI/2,a.position.z=-r/2,this.pivot.add(a);let l=new ze({map:Ye(),color:i,transparent:!0,opacity:.14,blending:ue,depthWrite:!1});for(let d=1;d<=4;d++){let f=new He(l);f.scale.set(.16,.16,1),f.position.z=-r*d/4.5,this.pivot.add(f)}let c=new He(new ze({map:Ye(),color:i.clone().lerp(new dt(1,1,1),.4),transparent:!0,opacity:.32,blending:ue,depthWrite:!1}));c.scale.set(.09,.09,1),c.position.z=-r,this.pivot.add(c);let h=new Ft(new ui(.019,.022,.2,12),new ci({color:1776420,metalness:.85,roughness:.3}));h.rotation.x=-Math.PI/2,h.position.z=.07,this.pivot.add(h);let u=new Ft(new zi(.024,.005,6,16),new ge({color:i}));u.position.z=-.03,this.pivot.add(u),this._buildTrail(n)}setTilt(t){this.pivot.rotation.x=Le.degToRad(t)}set visible(t){this.pivot.visible=t,this.trail.visible=t}_buildTrail(t){let e=hc,i=new Float32Array(e*2*3),n=new Float32Array(e*2),r=new Float32Array(e*2);for(let c=0;c<e;c++)r[c*2]=0,r[c*2+1]=1;let o=[];for(let c=0;c<e-1;c++){let h=c*2,u=h+1,d=h+2,f=h+3;o.push(h,u,d,u,f,d)}let a=new se;a.setAttribute("position",new de(i,3).setUsage(hi)),a.setAttribute("alpha",new de(n,1).setUsage(hi)),a.setAttribute("edge",new de(r,1)),a.setIndex(o),a.setDrawRange(0,0);let l=new ce({uniforms:{color:{value:this.color}},vertexShader:`attribute float alpha; attribute float edge; varying float vA; varying float vE;
        void main(){ vA = alpha; vE = edge; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 color; varying float vA; varying float vE;
        void main(){
          // Fades along its length (vA) and in toward the hand (vE), brightest at the tip edge.
          float a = vA * vA * (0.25 + 0.75 * smoothstep(0.0, 1.0, vE));
          vec3 c = mix(color, vec3(1.0), 0.45 * vA * vE * vE);
          gl_FragColor = vec4(c * a * 0.62, a * 0.62);
        }`,transparent:!0,depthWrite:!1,blending:ue,side:Ie});this.trail=new Ft(a,l),this.trail.frustumCulled=!1,t.add(this.trail),this._trailPos=i,this._trailAlpha=n,this._hist=[]}sample(t,e){this.pivot.updateWorldMatrix(!0,!1);let i=this.pivot.matrixWorld,n=new D(0,0,0).applyMatrix4(i),r=new D(0,0,-this.length).applyMatrix4(i),o=ve(n.x,n.y,n.z),a=ve(r.x,r.y,r.z);this._primed||(this.base=o,this.tip=a,this._primed=!0),this.prevBase=this.base,this.prevTip=this.tip,this.base=o,this.tip=a,e>0&&(this.vel=ve(this.vel.x+((a.x-this.prevTip.x)/e-this.vel.x)*.6,this.vel.y+((a.y-this.prevTip.y)/e-this.vel.y)*.6,this.vel.z+((a.z-this.prevTip.z)/e-this.vel.z)*.6)),this.tracker.push(t,o,a),this._updateTrail(n,r,t)}setTrailSeconds(t){this.trailSeconds=t,t||(this._hist=[],this.trail.geometry.setDrawRange(0,0))}_updateTrail(t,e,i){let n=this.trailSeconds??rb;if(!n)return;let r=this._hist,o=e.clone().sub(t),a=o.length()||1;for(o.divideScalar(a),r.push({t:i,base:t.clone(),dir:o,len:a});r.length>2&&i-r[0].t>n;)r.shift();for(;r.length>64;)r.shift();let l=this._trailPos,c=this._trailAlpha,h=0,u=(p,g,y,x,v,S)=>{let E=v*v,R=E*v;return S.set(.5*(2*g.x+(-p.x+y.x)*v+(2*p.x-5*g.x+4*y.x-x.x)*E+(-p.x+3*g.x-3*y.x+x.x)*R),.5*(2*g.y+(-p.y+y.y)*v+(2*p.y-5*g.y+4*y.y-x.y)*E+(-p.y+3*g.y-3*y.y+x.y)*R),.5*(2*g.z+(-p.z+y.z)*v+(2*p.z-5*g.z+4*y.z-x.z)*E+(-p.z+3*g.z-3*y.z+x.z)*R)),S},d=this._tmpB||(this._tmpB=new D),f=this._tmpD||(this._tmpD=new D),m=(p,g)=>{let y=Math.pow(Math.max(0,1-p),1.6),x=.12*g,v=g;l[h*6]=d.x+f.x*x,l[h*6+1]=d.y+f.y*x,l[h*6+2]=d.z+f.z*x,l[h*6+3]=d.x+f.x*v,l[h*6+4]=d.y+f.y*v,l[h*6+5]=d.z+f.z*v,c[h*2]=y,c[h*2+1]=y,h++};for(let p=r.length-1;p>0&&h<hc-1;p--){let g=r[Math.min(r.length-1,p+1)],y=r[p],x=r[p-1],v=r[Math.max(0,p-2)],S=Math.acos(Math.max(-1,Math.min(1,y.dir.dot(x.dir))))*57.3,E=Math.max(2,Math.min(14,Math.ceil(S/3)));for(let R=0;R<E&&h<hc-1;R++){let M=R/E;u(g.base,y.base,x.base,v.base,M,d),u(g.dir,y.dir,x.dir,v.dir,M,f).normalize();let C=y.len+(x.len-y.len)*M;m((i-(y.t+(x.t-y.t)*M))/n,C)}}if(r.length&&h<hc){let p=r[0];d.copy(p.base),f.copy(p.dir),m((i-p.t)/n,p.len)}let _=this.trail.geometry;_.setDrawRange(0,Math.max(0,h-1)*6),_.attributes.position.needsUpdate=!0,_.attributes.alpha.needsUpdate=!0}pulse(t,e){let i=this.inputSource?.gamepad;if(!i)return!1;try{let n=i.hapticActuators?.[0];if(n?.pulse)return n.pulse(t,e),!0;if(i.vibrationActuator?.playEffect)return i.vibrationActuator.playEffect("dual-rumble",{duration:e,strongMagnitude:t,weakMagnitude:t}),!0}catch{}return!1}};var Uo=new D;function Ii(s,t,e,i,n,r){let o=2*Math.PI*n/4,a=Math.max(r-2*n,0),l=Math.PI/4;Uo.copy(t),Uo[i]=0,Uo.normalize();let c=.5*o/(o+a),h=1-Uo.angleTo(s)/l;return Math.sign(Uo[e])===1?h*c:a/(o+a)+c+c*(1-h)}var Fo=class s extends Pe{constructor(t=1,e=1,i=1,n=2,r=.1){let o=n*2+1;if(r=Math.min(t/2,e/2,i/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:i,segments:n,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new D,c=new D,h=new D(t,e,i).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,m=u.length/6,_=new D,p=.5/o;for(let g=0,y=0;g<u.length;g+=3,y+=2)switch(l.fromArray(u,g),c.copy(l),c.x-=Math.sign(c.x)*p,c.y-=Math.sign(c.y)*p,c.z-=Math.sign(c.z)*p,c.normalize(),u[g+0]=h.x*Math.sign(l.x)+c.x*r,u[g+1]=h.y*Math.sign(l.y)+c.y*r,u[g+2]=h.z*Math.sign(l.z)+c.z*r,d[g+0]=c.x,d[g+1]=c.y,d[g+2]=c.z,Math.floor(g/m)){case 0:_.set(1,0,0),f[y+0]=Ii(_,c,"z","y",r,i),f[y+1]=1-Ii(_,c,"y","z",r,e);break;case 1:_.set(-1,0,0),f[y+0]=1-Ii(_,c,"z","y",r,i),f[y+1]=1-Ii(_,c,"y","z",r,e);break;case 2:_.set(0,1,0),f[y+0]=1-Ii(_,c,"x","z",r,t),f[y+1]=Ii(_,c,"z","x",r,i);break;case 3:_.set(0,-1,0),f[y+0]=1-Ii(_,c,"x","z",r,t),f[y+1]=1-Ii(_,c,"z","x",r,i);break;case 4:_.set(0,0,1),f[y+0]=1-Ii(_,c,"x","y",r,t),f[y+1]=1-Ii(_,c,"y","x",r,e);break;case 5:_.set(0,0,-1),f[y+0]=Ii(_,c,"x","y",r,t),f[y+1]=1-Ii(_,c,"y","x",r,e);break}}static fromJSON(t){return new s(t.width,t.height,t.depth,t.segments,t.radius)}};function Ip(s,t,e){let i=(n,r,o)=>ve(n*s,r*t,o*e);return[[i(1,-1,-1),i(1,1,-1),i(1,1,1),i(1,-1,1)],[i(-1,-1,1),i(-1,1,1),i(-1,1,-1),i(-1,-1,-1)],[i(-1,1,-1),i(-1,1,1),i(1,1,1),i(1,1,-1)],[i(-1,-1,1),i(-1,-1,-1),i(1,-1,-1),i(1,-1,1)],[i(-1,-1,1),i(1,-1,1),i(1,1,1),i(-1,1,1)],[i(1,-1,-1),i(-1,-1,-1),i(-1,1,-1),i(1,1,-1)]]}function ob(s,t,e,i,n){let r=[];for(let o=0;o<s.length;o++){let a=s[o],l=s[(o+1)%s.length],c=(Ne(t,a)-e)*i,h=(Ne(t,l)-e)*i;if(c>=0&&r.push(a),c>=0!=h>=0){let u=c/(c-h),d=kn(a,pn(je(l,a),u));r.push(d),n.push(d)}}return r.length>=3?r:null}function ab(s,t,e){let i=[];for(let l of s)i.some(c=>On(je(l,c))<1e-6)||i.push(l);if(i.length<3)return null;let n=pn(i.reduce((l,c)=>kn(l,c),ve()),1/i.length),r=Math.abs(t.x)<.9?ve(1,0,0):ve(0,1,0),o=ns(sr(t,r)),a=sr(t,o);return i.sort((l,c)=>{let h=je(l,n),u=je(c,n);return Math.atan2(Ne(h,a),Ne(h,o))-Math.atan2(Ne(u,a),Ne(u,o))}),e>0?i:i.reverse()}function Pp(s,t,e){let i={};for(let[n,r]of[["front",1],["back",-1]]){let o=[],a=[];for(let c of s){let h=ob(c,t,e,r,o);h&&a.push(h)}if(!a.length){i[n]=null;continue}let l=ab(o,t,-r);l&&a.push(l),i[n]={faces:a,cap:l?a.length-1:-1}}return i}var os=ri.BLOCK/2,uc=class{constructor(){this.bodyGeo=new Fo(ri.BLOCK,ri.BLOCK,ri.BLOCK,4,.075);let t=new Xs;t.moveTo(-.14,-.035),t.lineTo(.14,-.035),t.lineTo(0,.085),t.closePath(),this.arrowGeo=new so(t),this.dotGeo=new Vr(.055,20),this.markMat=new ge({color:16777215,fog:!1}),this.bodyMats=[Jt.left,Jt.right].map(e=>new ci({color:e.clone().multiplyScalar(.42),emissive:e,emissiveIntensity:.07,roughness:.16,metalness:.7,fog:!1})),this.bodyMats.forEach((e,i)=>lb(e,[Jt.left,Jt.right][i])),this.arrowGlowMat=new ge({color:16777215,transparent:!0,opacity:.35,blending:ue,depthWrite:!1}),this.reflMats=[Jt.left,Jt.right].map(e=>new ge({color:e.clone().multiplyScalar(.55)})),this.capMats=[Jt.left,Jt.right].map(e=>new ge({color:e.clone().lerp(new dt(1,1,1),.55)})),this.glowMats=[Jt.left,Jt.right].map(e=>new ze({map:Ye(),color:e,transparent:!0,opacity:.28,blending:ue,depthWrite:!1})),this.bombGeo=new eo(.19,1),this.bombMat=new ci({color:1513244,metalness:.9,roughness:.25,flatShading:!0}),this.spikeGeo=new Gr(.045,.14,6),this.bombGlow=new ze({map:Ye(),color:6950944,transparent:!0,opacity:.6,blending:ue,depthWrite:!1}),this.bombCapMat=new ge({color:16738858}),this.wallMat=new ge({color:16719952,transparent:!0,opacity:.16,depthWrite:!1,side:Ie,blending:ue}),this.wallEdgeMat=new Ei({color:16728176}),this.unitBox=new Pe(1,1,1),this.unitEdges=new Xr(this.unitBox)}makeNote(t){let e=new pe;if(t.kind===he.BOMB){e.add(new Ft(this.bombGeo,this.bombMat));let r=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];for(let[a,l,c]of r){let h=new Ft(this.spikeGeo,this.bombMat);h.position.set(a*.2,l*.2,c*.2),h.quaternion.setFromUnitVectors(new D(0,1,0),new D(a,l,c)),e.add(h)}let o=new He(this.bombGlow);return o.scale.set(.7,.7,1),e.add(o),e}e.add(new Ft(this.bodyGeo,this.bodyMats[t.hand]));let i=new Ft(t.dir===Qt.ANY?this.dotGeo:this.arrowGeo,this.markMat);i.position.z=os+.002,e.add(i);let n=new He(this.glowMats[t.hand]);return n.scale.set(.9,.9,1),n.position.z=-.05,e.add(n),e.userData.finalAngle=rp(t.dir),e}makeLink(t){this.linkGeo||(this.linkGeo=new Fo(ri.BLOCK,ri.BLOCK*.3,ri.BLOCK,3,.04));let e=new pe;e.add(new Ft(this.linkGeo,this.bodyMats[t.hand]));let i=new Ft(this.dotGeo,this.markMat);i.position.z=os+.002,i.scale.setScalar(.8),e.add(i);let n=new He(this.glowMats[t.hand]);n.scale.set(.6,.6,1),n.position.z=-.05,e.add(n);let[r,o]=t.tangent||[0,-1];return e.userData.finalAngle=Math.atan2(-r,o),e}makeArc(t,e){if(!this.arcMats){let c=(h,u)=>new ce({uniforms:{color:{value:h},opacity:{value:u}},vertexShader:`varying float vZ;
          void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vZ = w.z; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`uniform vec3 color; uniform float opacity; varying float vZ;
          void main(){ float f = smoothstep(-0.4, -2.2, vZ); gl_FragColor = vec4(color * opacity * f, opacity * f); }`,transparent:!0,depthWrite:!1,blending:ue});this.arcMats=[Jt.left,Jt.right].map(h=>({core:c(h.clone().lerp(new dt(1,1,1),.25),.7),glow:c(h.clone(),.14)}))}let i=new Ws(t),n=Math.min(160,Math.max(24,t.length*2)),r=new pe,o=this.arcMats[e],a=new Ft(new Ys(i,n,.022,6,!1),o.core.clone()),l=new Ft(new Ys(i,n,.075,8,!1),o.glow.clone());return a.renderOrder=l.renderOrder=2,r.add(l,a),r.userData.mats=[a.material,l.material],r}makeReflection(t){let e=new pe;return t.kind===he.BOMB?e.add(new Ft(this.bombGeo,this.bombMat)):e.add(new Ft(this.bodyGeo,this.reflMats[t.hand])),e}makeWallReflection(){let t=new Ft(this.unitBox,this.wallMat);return t.renderOrder=-2,t}makeWall(){let t=new pe;return t.add(new Ft(this.unitBox,this.wallMat)),t.add(new hn(this.unitEdges,this.wallEdgeMat)),t}slice(t,e,i,n){t.updateWorldMatrix(!0,!1);let r=new jt().copy(t.matrixWorld).invert(),o=new D(i.x,i.y,i.z),a=o.clone().transformDirection(r),l=new D(n.x,n.y,n.z).applyMatrix4(r),c=ve(a.x,a.y,a.z),h=vi(Ne(c,ve(l.x,l.y,l.z)),-os*.75,os*.75),u=e.kind===he.BOMB,d=Ip(u?.17:os,u?.17:os,u?.17:os),{front:f,back:m}=Pp(d,c,h),_=u?this.bombMat:this.bodyMats[e.hand],p=u?this.bombCapMat:this.capMats[e.hand],g=[];for(let[y,x]of[[f,1],[m,-1]]){if(!y)continue;let v=cb(y.faces,y.cap);v.computeBoundingBox();let S=new D;v.boundingBox.getCenter(S),v.translate(-S.x,-S.y,-S.z);let E=new Ft(v,[_,p]);E.position.copy(S).applyMatrix4(t.matrixWorld),E.quaternion.setFromRotationMatrix(t.matrixWorld),E.userData.side=x,E.userData.normal=o.clone(),g.push(E)}return g}};function lb(s,t){let e=t.clone().lerp(new dt(1,1,1),.35),i=t.clone().lerp(new dt(1,1,1),.25),n=t.clone(),r=t.clone().multiplyScalar(.42);s.onBeforeCompile=o=>{o.uniforms.rimColor={value:e},o.uniforms.tint={value:i},o.uniforms.selfColor={value:n},o.uniforms.floorColor={value:r},Object.assign(o.uniforms,ss),o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
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
      }`)},s.customProgramCacheKey=()=>"note-lacquer"}function cb(s,t){let e=[],i=[],n=new se,r=0,o=s.map((a,l)=>l).sort((a,l)=>(a===t)-(l===t));for(let a of o){let l=s[a],c=l[0];for(let h=1;h+1<l.length;h++){let u=l[h],d=l[h+1],f=u.x-c.x,m=u.y-c.y,_=u.z-c.z,p=d.x-c.x,g=d.y-c.y,y=d.z-c.z,x=m*y-_*g,v=_*p-f*y,S=f*g-m*p,E=Math.hypot(x,v,S)||1;x/=E,v/=E,S/=E;for(let R of[c,u,d])e.push(R.x,R.y,R.z),i.push(x,v,S);a!==t&&(r+=3)}}return n.setAttribute("position",new ee(e,3)),n.setAttribute("normal",new ee(i,3)),n.addGroup(0,r,0),n.addGroup(r,e.length/3-r,1),n}var Pi=600,Au=.022,fc=class{constructor(t){this.pos=new Float32Array(Pi*3),this.vel=new Float32Array(Pi*3),this.col=new Float32Array(Pi*3),this.life=new Float32Array(Pi),this.maxLife=new Float32Array(Pi),this.baseSize=new Float32Array(Pi),this.next=0,this.linePos=new Float32Array(Pi*6),this.lineCol=new Float32Array(Pi*6);let e=new se;e.setAttribute("position",new de(this.linePos,3).setUsage(hi)),e.setAttribute("color",new de(this.lineCol,3).setUsage(hi)),this.lines=new hn(e,new Ei({vertexColors:!0,transparent:!0,blending:ue,depthWrite:!1})),this.lines.frustumCulled=!1,t.add(this.lines),this.headSize=new Float32Array(Pi),this.headCol=new Float32Array(Pi*3);let i=new se;i.setAttribute("position",new de(this.pos,3).setUsage(hi)),i.setAttribute("color",new de(this.headCol,3).setUsage(hi)),i.setAttribute("size",new de(this.headSize,1).setUsage(hi));let n=new ce({uniforms:{map:{value:Ye()},scale:{value:600}},vertexShader:`attribute float size; attribute vec3 color; varying vec3 vC;
        uniform float scale;
        void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = size * scale / max(0.1, -mv.z); gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform sampler2D map; varying vec3 vC;
        void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC * t.a, t.a); }`,transparent:!0,depthWrite:!1,blending:ue});this.points=new un(i,n),this.points.frustumCulled=!1,t.add(this.points)}burst(t,e,i=28,n=3,r=null){for(let o=0;o<i;o++){let a=this.next;this.next=(this.next+1)%Pi,this.pos[a*3]=t.x,this.pos[a*3+1]=t.y,this.pos[a*3+2]=t.z;let l=Math.random()*Math.PI*2,c=Math.acos(Math.random()*2-1),h=n*(.4+Math.random()*1.2),u=Math.sin(c)*Math.cos(l)*h,d=Math.sin(c)*Math.sin(l)*h,f=Math.cos(c)*h;r&&(u+=r.x*n*.9,d+=r.y*n*.9,f+=r.z*n*.9),this.vel[a*3]=u,this.vel[a*3+1]=d,this.vel[a*3+2]=f;let m=.3+Math.random()*.5;this.col[a*3]=e.r+(1-e.r)*m,this.col[a*3+1]=e.g+(1-e.g)*m,this.col[a*3+2]=e.b+(1-e.b)*m,this.maxLife[a]=this.life[a]=.3+Math.random()*.45,this.baseSize[a]=.012+Math.random()*.014}}update(t){let e=Math.exp(-t*2.2),i=this.linePos,n=this.lineCol;for(let a=0;a<Pi;a++){let l=a*3,c=a*6;if(this.life[a]<=0){this.headSize[a]=0,n[c]=n[c+1]=n[c+2]=n[c+3]=n[c+4]=n[c+5]=0;continue}this.life[a]-=t,this.vel[l]*=e,this.vel[l+1]=this.vel[l+1]*e-5*t,this.vel[l+2]*=e,this.pos[l]+=this.vel[l]*t,this.pos[l+1]+=this.vel[l+1]*t,this.pos[l+2]+=this.vel[l+2]*t;let h=Math.max(0,this.life[a]/this.maxLife[a]);i[c]=this.pos[l],i[c+1]=this.pos[l+1],i[c+2]=this.pos[l+2],i[c+3]=this.pos[l]-this.vel[l]*Au,i[c+4]=this.pos[l+1]-this.vel[l+1]*Au,i[c+5]=this.pos[l+2]-this.vel[l+2]*Au;let u=this.col[l]*h,d=this.col[l+1]*h,f=this.col[l+2]*h;n[c]=u,n[c+1]=d,n[c+2]=f,n[c+3]=u*.15,n[c+4]=d*.15,n[c+5]=f*.15,this.headCol[l]=u,this.headCol[l+1]=d,this.headCol[l+2]=f,this.headSize[a]=this.life[a]>0?this.baseSize[a]*(.4+.6*h):0}let r=this.lines.geometry.attributes;r.position.needsUpdate=!0,r.color.needsUpdate=!0;let o=this.points.geometry.attributes;o.position.needsUpdate=!0,o.color.needsUpdate=!0,o.size.needsUpdate=!0}};function hb(){let s=document.createElement("canvas");s.width=256,s.height=32;let t=s.getContext("2d"),e=t.createLinearGradient(0,0,256,0);e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.5,"rgba(255,255,255,1)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,256,32),t.globalCompositeOperation="destination-in";let i=t.createLinearGradient(0,0,0,32);i.addColorStop(0,"rgba(0,0,0,0)"),i.addColorStop(.5,"rgba(0,0,0,1)"),i.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=i,t.fillRect(0,0,256,32);let n=new Ti(s);return n.colorSpace=Ae,n}function ub(){let s=document.createElement("canvas");s.width=s.height=128;let t=s.getContext("2d"),e=t.createRadialGradient(64,64,40,64,64,62);e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.6,"rgba(255,255,255,0.9)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);let i=new Ti(s);return i.colorSpace=Ae,i}var Ru=(s,t=16777215)=>new ge({map:s,color:t,transparent:!0,opacity:0,blending:ue,depthWrite:!1,side:Ie}),dc=class{constructor(t){this.scene=t;let e=hb(),i=ub(),n=new ni(1,1);this.slashes=Array.from({length:10},()=>this._make(n,Ru(e))),this.rings=Array.from({length:10},()=>this._make(n,Ru(i))),this.bursts=Array.from({length:3},()=>this._make(n,Ru(i))),this.flashes=Array.from({length:8},()=>{let r=new He(new ze({map:Ye(),transparent:!0,opacity:0,blending:ue,depthWrite:!1}));return r.visible=!1,t.add(r),{obj:r,life:0,max:1}}),this._i={slash:0,ring:0,burst:0,flash:0}}_make(t,e){let i=new Ft(t,e);return i.visible=!1,i.renderOrder=15,this.scene.add(i),{obj:i,life:0,max:1}}_next(t,e){let i=t[this._i[e]];return this._i[e]=(this._i[e]+1)%t.length,i}cut(t,e,i,n=1){let r=this._next(this.slashes,"slash");r.obj.position.copy(t),r.obj.position.z+=.24,r.obj.rotation.set(0,0,Math.atan2(e.y,e.x)),r.obj.material.color.copy(i).lerp(new dt(1,1,1),.5),r.base=1.3*n,r.life=r.max=.22,r.obj.visible=!0;let o=this._next(this.rings,"ring");o.obj.position.copy(t),o.obj.rotation.set(0,0,0),o.obj.material.color.copy(i),o.base=.2,o.grow=1.6*n,o.life=o.max=.35,o.obj.visible=!0,this.flash(t,i,.9*n,.18)}flash(t,e,i=1,n=.2){let r=this._next(this.flashes,"flash");r.obj.position.copy(t),r.obj.material.color.copy(e),r.size=i,r.life=r.max=n,r.obj.visible=!0}burst(t,e=1.2){let i=this._next(this.bursts,"burst");i.obj.position.set(0,e,-2.5),i.obj.rotation.set(0,0,0),i.obj.material.color.copy(t),i.base=.5,i.grow=9,i.life=i.max=.9,i.obj.visible=!0}update(t){for(let e of this.slashes){if(e.life<=0)continue;e.life-=t;let i=Math.max(0,e.life/e.max);e.obj.scale.set(e.base*(1.4-.4*i),.09*(.4+i),1),e.obj.material.opacity=i,e.life<=0&&(e.obj.visible=!1)}for(let e of[this.rings,this.bursts])for(let i of e){if(i.life<=0)continue;i.life-=t;let n=Math.max(0,i.life/i.max),r=i.base+i.grow*(1-n*n);i.obj.scale.set(r,r,1),i.obj.material.opacity=n*.9,i.life<=0&&(i.obj.visible=!1)}for(let e of this.flashes){if(e.life<=0)continue;e.life-=t;let i=Math.max(0,e.life/e.max),n=e.size*(1.2-.4*i);e.obj.scale.set(n,n,1),e.obj.material.opacity=i,e.life<=0&&(e.obj.visible=!1)}}clear(){for(let t of[this.slashes,this.rings,this.bursts,this.flashes])for(let e of t)e.life=0,e.obj.visible=!1}};var pc=class{constructor(){this.spectrum=new Float32Array(16),this.bass=0,this.mid=0,this.high=0,this.energy=0,this.buildUp=0,this.kick=!1,this.kickLevel=0,this._bassAvg=0,this._longEnergy=0,this._sinceKick=1}update(t,e,i){let n=t.length;if(!n)return this;let r=e/2/n,o=(h,u)=>{let d=Math.max(0,Math.floor(h/r)),f=Math.min(n-1,Math.ceil(u/r)),m=0;for(let _=d;_<=f;_++)m+=t[_];return m/((f-d+1)*255)},a=1-Math.exp(-i*18);this.bass+=(o(40,160)-this.bass)*a,this.mid+=(o(250,2e3)-this.mid)*a,this.high+=(o(4e3,12e3)-this.high)*a;for(let h=0;h<16;h++){let u=40*Math.pow(350,h/16),d=40*Math.pow(350,(h+1)/16),f=Math.min(1,o(u,d)*1.25);this.spectrum[h]+=(f-this.spectrum[h])*(f>this.spectrum[h]?.6:1-Math.exp(-i*6))}let l=o(40,140);this._sinceKick+=i,this.kick=l>this._bassAvg*1.25+.06&&l>.25&&this._sinceKick>.18,this.kick&&(this._sinceKick=0,this.kickLevel=1),this.kickLevel*=Math.exp(-i*7),this._bassAvg+=(l-this._bassAvg)*(1-Math.exp(-i*4));let c=(this.bass+this.mid+this.high)/3;return this.energy+=(c-this.energy)*(1-Math.exp(-i*1.5)),this._longEnergy+=(c-this._longEnergy)*(1-Math.exp(-i*.15)),this.buildUp=Math.max(0,Math.min(1,(this.energy-this._longEnergy)*6)),this}reset(){this.spectrum.fill(0),this.bass=this.mid=this.high=this.energy=this.buildUp=this.kickLevel=0,this._bassAvg=this._longEnergy=0,this.kick=!1}};function Lp(s){let e=new Float32Array(24);for(let c=0;c<s.length;c+=4){let h=s[c]/255,u=s[c+1]/255,d=s[c+2]/255,f=Math.max(h,u,d),m=Math.min(h,u,d),_=f===0?0:(f-m)/f;if(_<.25||f<.2)continue;let p,g=f-m;f===h?p=(u-d)/g%6:f===u?p=(d-h)/g+2:p=(h-u)/g+4,p=(p*60+360)%360,e[Math.floor(p/360*24)%24]+=_*f}let i=-1,n=0;for(let c=0;c<24;c++)e[c]>n&&(n=e[c],i=c);if(i<0||n<1)return null;let r=-1,o=0;for(let c=0;c<24;c++)Math.min(Math.abs(c-i),24-Math.abs(c-i))*15>=60&&e[c]>o&&(o=e[c],r=c);let a=(i+.5)*(360/24),l=r>=0&&o>n*.08?(r+.5)*(360/24):(a+180)%360;return{a:Bo(a,.85,1),b:Bo(l,.85,1)}}function Bo(s,t,e){let i=e*t,n=i*(1-Math.abs(s/60%2-1)),r=e-i,o=0,a=0,l=0;return s<60?[o,a]=[i,n]:s<120?[o,a]=[n,i]:s<180?[a,l]=[i,n]:s<240?[a,l]=[n,i]:s<300?[o,l]=[n,i]:[o,l]=[i,n],[o+r,a+r,l+r]}var or={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var yi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},fb=new Cn(-1,1,1,-1,0,1),Cu=class extends se{constructor(){super(),this.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ee([0,2,0,0,2,0],2))}},db=new Cu,Gn=class{constructor(t){this._mesh=new Ft(db,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,fb)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var mc=class extends yi{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof ce?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=dn.clone(t.uniforms),this.material=new ce({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Gn(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Oo=class extends yi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let n=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}},gc=class extends yi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var _c=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new xt);this._width=i.width,this._height=i.height,e=new Be(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Je}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new mc(or),this.copyPass.material.blending=Ai,this.timer=new ho}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let n=0,r=this.passes.length;n<r;n++){let o=this.passes[n];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Oo!==void 0&&(o instanceof Oo?i=!0:o instanceof gc&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new xt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var xc=class extends yi{constructor(t,e,i=null,n=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new dt}render(t,e,i){let n=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=n}};var Np={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new dt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var ar=class s extends yi{constructor(t,e=1,i,n){super(),this.strength=e,this.radius=i,this.threshold=n,this.resolution=t!==void 0?new xt(t.x,t.y):new xt(256,256),this.clearColor=new dt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Be(r,o,{type:Je,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let u=new Be(r,o,{type:Je,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);let d=new Be(r,o,{type:Je,depthBuffer:!1});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}let a=Np;this.highPassUniforms=dn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ce({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new xt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=dn.clone(or.uniforms),this.blendMaterial=new ce({uniforms:this.copyUniforms,vertexShader:or.vertexShader,fragmentShader:or.fragmentShader,premultipliedAlpha:!0,blending:ue,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new dt,this._oldClearAlpha=1,this._basic=new ge,this._fsQuad=new Gn(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),n=Math.round(e/2);this.renderTargetBright.setSize(i,n);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,n),this.renderTargetsVertical[r].setSize(i,n),this.separableBlurMaterials[r].uniforms.invSize.value=new xt(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(t,e,i,n,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){let e=[],i=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(i*i))/i);let n=[],r=[];for(let o=1;o<t;o+=2){let a=e[o],l=o+1<t?e[o+1]:0,c=a+l;n.push((o*a+(o+1)*l)/c),r.push(c)}return new ce({defines:{KERNEL_PAIRS:n.length},uniforms:{colorTexture:{value:null},invSize:{value:new xt(.5,.5)},direction:{value:new xt(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:n},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}};ar.BlurDirectionX=new xt(1,0);ar.BlurDirectionY=new xt(0,1);var ko={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var vc=class extends yi{constructor(){super(),this.isOutputPass=!0,this.uniforms=dn.clone(ko.uniforms),this.material=new $s({name:ko.name,uniforms:this.uniforms,vertexShader:ko.vertexShader,fragmentShader:ko.fragmentShader}),this._fsQuad=new Gn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},oe.getTransfer(this._outputColorSpace)===me&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===po?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===mo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===go?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===_o?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===vo?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===yo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===xo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var lr='"Chakra Petch", "Segoe UI", Roboto, system-ui, sans-serif',mt={panel:"rgba(14, 8, 30, 0.92)",edge:"#8a4dff",text:"#f2ecff",dim:"#a99cc8",faint:"#5f5480",left:"#ff2152",right:"#1f8cff",gold:"#ffd166",button:"rgba(138, 77, 255, 0.16)",buttonHover:"rgba(138, 77, 255, 0.42)",good:"#4dffa6",bad:"#ff5470"},cr=class{constructor(t,e,i,{interactive:n=!0,background:r=!0}={}){this.canvas=document.createElement("canvas"),this.canvas.width=t,this.canvas.height=e,this.g=this.canvas.getContext("2d"),this.tex=new Ti(this.canvas),this.tex.colorSpace=Ae,this.tex.anisotropy=4;let o=i*e/t;this.mesh=new Ft(new ni(i,o),new ge({map:this.tex,transparent:!0,depthWrite:!1})),this.mesh.renderOrder=10,this.interactive=n,this.background=r,this.buttons=[],this.hoverId=null,this.drawFn=null,this.dirty=!0}get visible(){return this.mesh.visible}set visible(t){this.mesh.visible=t}show(t){this.drawFn=t,this.hoverId=null,this.visible=!0,this.redraw()}redraw(){let t=this.g,e=this.canvas.width,i=this.canvas.height;t.clearRect(0,0,e,i),this.buttons=[],this.background&&(Iu(t,4,4,e-8,i-8,28),t.fillStyle=mt.panel,t.fill(),t.lineWidth=4,t.strokeStyle=mt.edge,t.stroke()),this.drawFn&&this.drawFn(this),this.tex.needsUpdate=!0,this.dirty=!1}text(t,e,i,{size:n=36,color:r=mt.text,align:o="left",weight:a=500,maxWidth:l,baseline:c="alphabetic",spacing:h=0}={}){let u=this.g;u.font=`${a} ${n}px ${lr}`,u.fillStyle=r,u.textAlign=o,u.textBaseline=c,"letterSpacing"in u&&(u.letterSpacing=`${h}px`),u.fillText(String(t),e,i,l),"letterSpacing"in u&&(u.letterSpacing="0px")}fit(t,e,i,n=500){let r=this.g;r.font=`${n} ${i}px ${lr}`;let o=String(t);if(r.measureText(o).width<=e)return o;for(;o.length>1&&r.measureText(o+"\u2026").width>e;)o=o.slice(0,-1);return o+"\u2026"}button(t,e,i,n,r,o,a,{size:l=34,accent:c=mt.edge,selected:h=!1,disabled:u=!1,align:d="center",sub:f=null}={}){let m=this.g,_=this.hoverId===t&&!u;Iu(m,e,i,n,r,16),m.fillStyle=h?Dp(c,.45):_?mt.buttonHover:mt.button,m.fill(),m.lineWidth=h||_?4:2,m.strokeStyle=u?mt.faint:_||h?c:Dp(c,.6),m.stroke();let p=d==="center"?e+n/2:e+24,g=u?mt.faint:mt.text;f?(this.text(o,p,i+r/2-4,{size:l,color:g,align:d,weight:600}),this.text(f,p,i+r/2+l*.75,{size:l*.62,color:mt.dim,align:d})):this.text(o,p,i+r/2,{size:l,color:g,align:d,weight:600,baseline:"middle"}),u||this.buttons.push({id:t,x:e,y:i,w:n,h:r,onClick:a})}rect(t,e,i,n,r,o=0){let a=this.g;o?(Iu(a,t,e,i,n,o),a.fillStyle=r,a.fill()):(a.fillStyle=r,a.fillRect(t,e,i,n))}hitTest(t){let e=t.x*this.canvas.width,i=(1-t.y)*this.canvas.height;return this.buttons.find(n=>e>=n.x&&e<=n.x+n.w&&i>=n.y&&i<=n.y+n.h)||null}setHover(t){return t===this.hoverId?!1:(this.hoverId=t,this.redraw(),!0)}};function Iu(s,t,e,i,n,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+i,e,t+i,e+n,r),s.arcTo(t+i,e+n,t,e+n,r),s.arcTo(t,e+n,t,e,r),s.arcTo(t,e,t+i,e,r),s.closePath()}function Dp(s,t){let e=parseInt(s.slice(1),16);return`rgba(${e>>16&255}, ${e>>8&255}, ${e&255}, ${t})`}var yc=class{constructor(t,e=16){this.items=[];for(let i=0;i<e;i++){let n=document.createElement("canvas");n.width=256,n.height=96;let r=new Ti(n);r.colorSpace=Ae;let o=new ze({map:r,transparent:!0,depthTest:!1,depthWrite:!1}),a=new He(o);a.scale.set(.5,.1875,1),a.visible=!1,a.renderOrder=20,t.add(a),this.items.push({sprite:a,canvas:n,tex:r,life:0})}this.next=0}spawn(t,e,i,n=64,r=null){let o=this.items[this.next];this.next=(this.next+1)%this.items.length;let a=o.canvas.getContext("2d");a.clearRect(0,0,256,96),a.font=`700 ${n}px ${lr}`,a.textAlign="center",a.textBaseline="middle",a.lineWidth=8,a.strokeStyle="rgba(0,0,0,0.75)",a.strokeText(t,128,r?38:50,236),a.fillStyle=i,a.fillText(t,128,r?38:50,236),r&&(a.font=`500 24px ${lr}`,a.fillStyle="rgba(230,220,255,0.85)",a.fillText(r,128,80)),o.tex.needsUpdate=!0,o.sprite.position.set(e.x,e.y+.25,Math.min(e.z,-1.2)),o.sprite.visible=!0,o.sprite.material.opacity=1,o.life=.9}update(t){for(let e of this.items)e.life<=0||(e.life-=t,e.sprite.position.y+=t*.45,e.sprite.material.opacity=Math.min(1,e.life/.4),e.life<=0&&(e.sprite.visible=!1))}clear(){for(let t of this.items)t.life=0,t.sprite.visible=!1}};var Up=[{id:"neon-drive",title:"Neon Drive",artist:"Neon Slice synth",bpm:120,bars:40,loopBars:8,roots:[57,53,48,55],minor:[!0,!1,!1,!1],hatPattern:"offbeat",seed:7,hue:300},{id:"overclock",title:"Overclock",artist:"Neon Slice synth",bpm:140,bars:48,loopBars:8,roots:[50,46,53,48],minor:[!0,!1,!1,!1],hatPattern:"sixteenths",seed:21,hue:190}],bc=s=>440*Math.pow(2,(s-69)/12);function Sc(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296*2-1)}function Pu(s,t){let e=60/s.bpm,i=s.loopBars*4,n=Math.round(i*e*t),r=new Float32Array(n),o=Sc(s.seed),a=_=>Math.round(_*t),l=(_,p)=>{r[(_%n+n)%n]+=p},c=_=>{let p=a(_),g=0;for(let y=0;y<.32*t;y++){let x=y/t;g+=2*Math.PI*(45+120*Math.exp(-x*30))/t,l(p+y,Math.sin(g)*Math.exp(-x*8)*.85)}},h=_=>{let p=a(_);for(let g=0;g<.2*t;g++){let y=g/t;l(p+g,o()*Math.exp(-y*18)*.3+Math.sin(2*Math.PI*185*y)*Math.exp(-y*28)*.28)}},u=(_,p)=>{let g=a(_),y=0;for(let x=0;x<.05*t;x++){let v=x/t,S=o();l(g+x,(S-y)*Math.exp(-v*80)*p),y=S}},d=(_,p,g)=>{let y=a(_),x=0;for(let v=0;v<p*t;v++){let S=v/t,E=2*(S*g%1)-1;x+=(E-x)*.18,l(y+v,x*Math.min(S/.005,1)*Math.exp(-S*4)*.32)}},f=(_,p,g)=>{let y=a(_);for(let x=0;x<p*t;x++){let v=x/t,S=2*Math.PI*g*v;l(y+x,(Math.sin(S)+.3*Math.sin(S*3)+.15*Math.sin(S*5))*Math.exp(-v*11)*.07)}},m=(_,p,g)=>{let y=a(_);for(let x=0;x<p*t;x++){let v=x/t,S=2*Math.PI*g*v;l(y+x,(Math.sin(S)+.5*Math.sin(S*1.003))*Math.sin(Math.PI*v/p)*.035)}};for(let _=0;_<i;_++){let p=_*e,g=Math.floor(_/8)%s.roots.length,y=s.roots[g],x=s.minor[g]?[0,3,7,12]:[0,4,7,12];if(c(p),_%2===1&&h(p),s.hatPattern==="sixteenths")for(let v=0;v<4;v++)u(p+v*e/4,v===2?.22:.1);else u(p,.08),u(p+e/2,.22);d(p,e*.45,bc(y-12)),d(p+e/2,e*.45,bc(y));for(let v=0;v<4;v++)f(p+v*e/4,e*.6,bc(y+12+x[(_*4+v)%4]));if(_%8===0)for(let v of[0,x[1],7])m(p,e*8,bc(y+v))}for(let _=0;_<n;_++){let p=r[_]*.9;r[_]=p/(1+Math.abs(p))}return r}function Fp(s){let t=Sc(99),e=(x,v)=>{let S=new Float32Array(Math.round(x*s));for(let E=0;E<S.length;E++)S[E]=v(E/s,E);return S},i=0,n=e(.2,x=>(i+=(t()-i)*(.7-.62*x/.2),i*Math.pow(Math.sin(Math.PI*x/.2),2)*.7+Math.sin(2*Math.PI*2400*x)*Math.exp(-x*90)*.35)),r=e(.3,x=>(x*95%1<.5?1:-1)*Math.exp(-x*9)*.35),o=0,a=e(.3,x=>(o+=2*Math.PI*(160-100*x/.3)/s,Math.sin(o)*Math.exp(-x*10)*.6)),l=0,c=e(.7,x=>{l+=(t()-l)*.12;let v=(l*2.5+Math.sin(2*Math.PI*55*x)*.5)*Math.exp(-x*5)*1.2;return v/(1+Math.abs(v))}),h=e(.05,x=>Math.sin(2*Math.PI*1500*x)*Math.exp(-x*120)*.8),u=e(.12,x=>Math.sin(2*Math.PI*(660+5500*x)*x)*Math.exp(-x*25)*.35),d=(x,v)=>{let S=Sc(v),E=pb(s),R=0,M=0,C=0;return e(.24,T=>{let P=S()*2-1,b=P*Math.exp(-T*900)*.9,B=1600+5200*Math.exp(-T*28),H=E(P,B,2.2)*Math.exp(-T*22)*1.5;R+=2*Math.PI*x*(1-.18*Math.min(1,T*12))/s,M+=2*Math.PI*x*2.76/s;let z=(Math.sin(R)*.22+Math.sin(M)*.07)*Math.exp(-T*26);C+=2*Math.PI*(120-60*Math.min(1,T*20))/s;let Y=Math.sin(C)*Math.exp(-T*38)*.38,V=(b+H+z+Y)*.75;return V/(1+Math.abs(V)*.6)})},f=d(1180,11),m=d(1320,23),_=d(1060,37),p=0,g=Sc(5),y=e(.09,x=>(p+=2*Math.PI*2650/s,(Math.sin(p)*.3+(g()*2-1)*.25*Math.exp(-x*400))*Math.exp(-x*55)));return{slice:n,bad:r,miss:a,bomb:c,click:h,blip:u,hit0:f,hit1:m,hit2:_,link:y}}function pb(s){let t=0,e=0,i=0,n=0;return(r,o,a)=>{let l=2*Math.PI*Math.min(o,s*.45)/s,c=Math.sin(l)/(2*a),h=1+c,u=c/h,d=-c/h,f=-2*Math.cos(l)/h,m=(1-c)/h,_=u*r+d*e-f*i-m*n;return e=t,t=r,n=i,i=_,_}}var Mc=class{constructor(){this.ctx=null,this.sfx={},this.source=null,this.songStart=0,this.offsetSec=0,this.musicGain=null,this.sfxGain=null,this.playing=!1}async init(){if(this.ctx){this.ctx.state==="suspended"&&await this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;this.ctx=new t({latencyHint:"interactive"}),this.musicGain=this.ctx.createGain(),this.sfxGain=this.ctx.createGain(),this.musicGain.connect(this.ctx.destination),this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=1024,this.analyser.smoothingTimeConstant=.45,this.musicIn=this.ctx.createGain(),this.musicIn.connect(this.musicGain),this.musicIn.connect(this.analyser),this._bins=new Uint8Array(this.analyser.frequencyBinCount),this.sfxGain.connect(this.ctx.destination);let e=Fp(this.ctx.sampleRate);for(let[i,n]of Object.entries(e))this.sfx[i]=this.bufferFrom(n);this.ctx.state==="suspended"&&await this.ctx.resume()}bufferFrom(t){let e=this.ctx.createBuffer(1,t.length,this.ctx.sampleRate);return e.copyToChannel(t,0),e}setVolumes(t,e){this.ctx&&(this.musicGain.gain.value=t,this.sfxGain.gain.value=e)}heardTime(){let t=this.ctx;if(!t)return 0;if(t.getOutputTimestamp){let e=t.getOutputTimestamp();if(e&&e.performanceTime>0&&t.state==="running")return e.contextTime+(performance.now()-e.performanceTime)/1e3}return t.currentTime-(t.outputLatency||t.baseLatency||0)}songTime(){return this.heardTime()-this.songStart-this.offsetSec}playSong(t,{loop:e=!1,lead:i=.15}={}){this.stopSong(),this.stopPreview(.1);let n=this.ctx.createBufferSource();n.buffer=t,n.loop=e,n.connect(this.musicIn);let r=this.ctx.currentTime+i;n.start(r),this.source=n,this.songStart=r,this.playing=!0}stopSong(t=0){if(!this.source)return;let e=this.source;this.source=null,this.playing=!1;try{if(t>0){let i=this.ctx.createGain();e.disconnect(),e.connect(i),i.connect(this.musicIn),i.gain.setValueAtTime(1,this.ctx.currentTime),i.gain.linearRampToValueAtTime(0,this.ctx.currentTime+t),e.stop(this.ctx.currentTime+t+.05)}else e.stop()}catch{}}playPreview(t,e=0,i=12){if(this.stopPreview(.15),!this.ctx||!t)return;let n=this.ctx;e=Math.max(0,Math.min(e,Math.max(0,t.duration-2)));let r=Math.min(t.duration,e+Math.max(4,i)),o=n.createBufferSource();o.buffer=t,o.loop=!0,o.loopStart=e,o.loopEnd=r;let a=n.createGain();a.gain.setValueAtTime(0,n.currentTime),a.gain.linearRampToValueAtTime(1,n.currentTime+.6),o.connect(a),a.connect(this.musicIn),o.start(n.currentTime+.02,e),this.preview={src:o,g:a}}stopPreview(t=.3){let e=this.preview;if(!e)return;this.preview=null;let i=this.ctx.currentTime;try{e.g.gain.cancelScheduledValues(i),e.g.gain.setValueAtTime(e.g.gain.value,i),e.g.gain.linearRampToValueAtTime(0,i+t),e.src.stop(i+t+.05)}catch{}}get previewing(){return!!this.preview}async pause(){this.ctx?.state==="running"&&await this.ctx.suspend()}async resume(){this.ctx?.state==="suspended"&&await this.ctx.resume()}play(t,e=1,i=0,n={}){let r=this.sfx[t];if(!r||!this.ctx)return;let o=this.ctx.createBufferSource();o.buffer=r,n.rate&&(o.playbackRate.value=n.rate);let a=this.ctx.createGain();a.gain.value=e,o.connect(a);let l=a;if(n.pan&&this.ctx.createStereoPanner){let c=this.ctx.createStereoPanner();c.pan.value=Math.max(-1,Math.min(1,n.pan)),a.connect(c),l=c}l.connect(this.sfxGain),o.start(i||0)}bins(){return this.analyser?(this.analyser.getByteFrequencyData(this._bins),this._bins):null}async decode(t){return await this.ctx.decodeAudioData(t.slice(0))}};var Uu=Mm(Op(),1);var as={Easy:{label:"Easy",njs:10,step:2,halfChance:0,doubleChance:0,diagChance:.1,anyChance:.15,bombChance:0,wallChance:0},Normal:{label:"Normal",njs:12,step:1,halfChance:0,doubleChance:.12,diagChance:.2,anyChance:.08,bombChance:.06,wallChance:.3},Hard:{label:"Hard",njs:14,step:1,halfChance:.3,doubleChance:.2,diagChance:.3,anyChance:.05,bombChance:.1,wallChance:.5},Expert:{label:"Expert",njs:16,step:1,halfChance:.55,doubleChance:.28,diagChance:.35,anyChance:.03,bombChance:.12,wallChance:.7}};function mb(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function gb(s,t,e,i){if(s()<i.anyChance)return Qt.ANY;let n=ic(t),r=s();if(r<i.diagChance)n=au(n,s()<.5?1:-1);else if(r<i.diagChance+.12){let o=e===xi.LEFT?Qt.LEFT:Qt.RIGHT;(t===Qt.DOWN||t===Qt.UP||t===Qt.ANY)&&(n=o)}return n}function _b(s,t){return s===Qt.LEFT||s===Qt.RIGHT?1:s===Qt.UP_LEFT||s===Qt.UP_RIGHT?t()<.7?0:1:s===Qt.DOWN_LEFT||s===Qt.DOWN_RIGHT?t()<.5?1:0:t()<.25?1:t()<.06?2:0}function kp({bpm:s,bars:t,introBars:e=2,difficulty:i="Normal",seed:n=1}){let r=as[i]||as.Normal,o=mb(n*7919+Object.keys(as).indexOf(i)*104729),a=60/s,l=[],c=[],h=[Qt.UP,Qt.UP],u=0,d=t-e,f=[];for(let _=e;_<t;_+=8){if((_-e)/d<.2||o()>=r.wallChance)continue;let g=(_+2)*4,y=o()<.5?0:3,x=8;f.push({start:g,end:g+x,lane:y}),c.push({time:g*a,endTime:(g+x)*a,lane:y,width:1,row:0,height:5})}let m=(_,p)=>f.some(g=>g.lane===p&&_>=g.start-1&&_<g.end+.5);for(let _=e*4;_<t*4;_+=r.step){let p=Math.floor(_/4),g=(p-e)/d;if(p%8===7&&_%4>=3){i==="Expert"&&g>.3&&o()<.5&&c.push({time:(_-.25)*a,endTime:(_+.75)*a,lane:0,width:4,row:2,height:3});continue}let y=[0];o()<r.halfChance*(.5+g)&&(y=[0,.5]);for(let x of y){let v=(_+x)*a,E=x===0&&g>.1&&o()<r.doubleChance*(.6+g)?[xi.LEFT,xi.RIGHT]:[u++%2];for(let R of E){let M=gb(o,h[R],R,r);h[R]=M;let C=R===xi.LEFT?o()<.5?0:1:o()<.5?2:3;m(_+x,C)&&(C=R===xi.LEFT?1:2),l.push({time:v,kind:he.NOTE,hand:R,lane:C,row:_b(M,o),dir:M})}}if(y.length===1&&g>.2&&o()<r.bombChance){let x=o()<.5?0:3;m(_+.5,x)||l.push({time:(_+.5)*a,kind:he.BOMB,hand:-1,lane:x,row:2,dir:Qt.ANY})}}return l.sort((_,p)=>_.time-p.time),c.sort((_,p)=>_.time-p.time),{notes:l,walls:c,njs:r.njs}}var Hp={api:"https://api.beatsaver.com",allowedHosts:/(^|\.)beatsaver\.com$/i},wc={top:{label:"Top rated",sortOrder:"Rating"},latest:{label:"Latest",sortOrder:"Latest"},curated:{label:"Curated",sortOrder:"Curated"},search:{label:"Search",sortOrder:"Relevance"}};function Vp(s,t=0,e=""){let i=wc[s]||wc.top,n=new URLSearchParams;return e&&n.set("q",e),n.set("sortOrder",i.sortOrder),`/search/text/${Math.max(0,t|0)}?${n.toString()}`}var zp=["Easy","Normal","Hard","Expert","ExpertPlus"],xb={Easy:"E",Normal:"N",Hard:"H",Expert:"Ex",ExpertPlus:"E+"};function vb(s){let t=(s.versions||[]).filter(n=>n&&n.downloadURL),e=t.filter(n=>!n.state||n.state==="Published");return(e.length?e:t).sort((n,r)=>String(r.createdAt||"").localeCompare(String(n.createdAt||"")))[0]||null}function yb(s){if(!s||!s.id)return null;let t=vb(s);if(!t)return null;let e=s.metadata||{},i=s.stats||{},n=(t.diffs||[]).filter(a=>!a.characteristic||a.characteristic==="Standard").map(a=>({name:a.difficulty,short:xb[a.difficulty]||a.difficulty,nps:Number(a.nps)||0,notes:a.notes||0,njs:a.njs||0})).sort((a,l)=>zp.indexOf(a.name)-zp.indexOf(l.name)),r=i.upvotes||0,o=i.downvotes||0;return{key:String(s.id),hash:t.hash||"",title:e.songName||s.name||"Untitled",subTitle:e.songSubName||"",artist:e.songAuthorName||"",mapper:e.levelAuthorName||s.uploader?.name||"",bpm:Number(e.bpm)||0,duration:Number(e.duration)||0,rating:typeof i.score=="number"?i.score:r+o?r/(r+o):0,upvotes:r,downloadURL:t.downloadURL,coverURL:t.coverURL||"",previewURL:t.previewURL||"",diffs:n,uploaded:s.uploaded||s.createdAt||""}}function Gp(s){return(Array.isArray(s?.docs)?s.docs:Array.isArray(s)?s:[]).map(yb).filter(Boolean)}function Wp(s){let t=i=>String(i||"").replace(/[<>:"/\\|?*\u0000-\u001f]/g,"").replace(/\s+/g," ").trim(),e=t(`${s.title} - ${s.mapper}`).slice(0,80).replace(/[. ]+$/,"");return`${t(s.key)} (${e||"map"})`}function hr(s){let t=/^([0-9a-f]{1,6}) \(/i.exec(String(s||""));return t?t[1].toLowerCase():null}function Nu(s){let t=Math.max(0,Math.round(s));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}var Ec=["Easy","Normal","Hard","Expert","ExpertPlus"],bb={Easy:{nps:1.3,njs:10,reaction:1.2,stacks:!1,diagonals:!1,bombs:"none",walls:"sides",chains:!1},Normal:{nps:2.1,njs:11,reaction:1,stacks:!1,diagonals:!0,bombs:"few",walls:"standing",chains:!1},Hard:{nps:3.2,njs:13,reaction:.85,stacks:!0,diagonals:!0,bombs:"all",walls:"all",chains:!0},Expert:{nps:4.6,njs:15,reaction:.75,stacks:!0,diagonals:!0,bombs:"all",walls:"all",chains:!0}},Xp=new Set([Qt.UP,Qt.UP_LEFT,Qt.UP_RIGHT]),qp=new Set([Qt.DOWN,Qt.DOWN_LEFT,Qt.DOWN_RIGHT]),Yp={[Qt.UP_LEFT]:Qt.UP,[Qt.UP_RIGHT]:Qt.UP,[Qt.DOWN_LEFT]:Qt.DOWN,[Qt.DOWN_RIGHT]:Qt.DOWN};function Zp(s){let t=s-Math.floor(s),e=i=>Math.abs(t-i)<.03||Math.abs(t-i-1)<.03;return e(0)?3:e(.5)?2:e(.25)||e(.75)?1:0}function Sb(s){if(s.length<8)return 0;let t=r=>s.reduce((o,a)=>o+Zp(a-r),0),e=t(0),i=0,n=e;for(let r=1;r<200;r++){let o=r/200,a=t(o);a>n&&(i=o,n=a)}return n>e*1.25+s.length*.1?i:0}function $p(s){let t=s.filter(i=>i.kind!==he.BOMB);if(t.length<2)return t.length;let e=Math.max(1,t[t.length-1].time-t[0].time);return t.length/e}function Mb(s,t,e){let i=s.map(o=>({n:o,beat:e(o.time),s:Zp(e(o.time))})),n=[],r=o=>n.every(a=>Math.abs(a.beat-o.beat)>=t-1e-6);for(let o of[3,2,1,0])for(let a of i)a.s===o&&r(a)&&n.push(a);return n.sort((o,a)=>o.beat-a.beat).map(o=>o.n)}function Du(s,t,e){let i=bb[t];if(!i)return null;let n=x=>e?e.secToBeat(x):x*2,r=Sb(s.notes.filter(x=>x.kind===he.NOTE).map(x=>n(x.time))),o=x=>n(x)-r;if($p(s.notes)<=i.nps*1.08)return null;let l=s.notes.filter(x=>x.kind===he.NOTE).map(x=>({...x}));if(!i.stacks){let x=new Map;l=l.filter(v=>{let S=`${v.hand}|${Math.round(v.time*200)}`;return x.has(S)?!1:(x.set(S,!0),!0)})}let c=[.125,.25,.33,.375,.5,.625,.75,.875,1,1.125,1.25,1.5,1.75,2,2.5,3,4],h=l;for(let x of c)if(h=[0,1].flatMap(v=>Mb(l.filter(S=>S.hand===v),x,o)),h.sort((v,S)=>v.time-S.time),$p(h)<=i.nps)break;for(let x of[0,1]){let v=null;for(let S of h)S.hand===x&&(S.flipped=!1,!i.diagonals&&Yp[S.dir]!==void 0&&(S.dir=Yp[S.dir]),v!==null&&S.dir!==Qt.ANY&&v!==Qt.ANY&&(Xp.has(S.dir)&&Xp.has(v)||qp.has(S.dir)&&qp.has(v)||S.dir===v)&&(S.dir=ic(S.dir),S.flipped=!0),S.dir!==Qt.ANY&&(v=S.dir),i.chains||delete S.chainHead)}let u=new Set(h.filter(x=>!x.flipped).map(x=>`${x.hand}|${x.time.toFixed(3)}`)),d=[];if(i.chains){let x=h.filter(v=>v.chainHead&&!v.flipped);d=s.notes.filter(v=>v.kind===he.LINK&&x.some(S=>S.hand===v.hand&&v.time>S.time&&v.time-S.time<1.5))}let f=s.notes.filter(x=>x.kind===he.BOMB).filter(x=>i.bombs==="none"?!1:i.bombs==="all"?!0:!h.some(v=>Math.abs(v.time-x.time)<.6&&Math.abs(v.lane-x.lane)<=1)),m=s.walls.filter(x=>i.walls==="all"?!0:x.row>=2||x.row>0&&x.height<4?!1:i.walls==="sides"?x.width<=1&&(x.lane<=0||x.lane+x.width>=4):!0),_=(s.arcs||[]).filter(x=>u.has(`${x.hand}|${x.time.toFixed(3)}`)&&u.has(`${x.hand}|${x.endTime.toFixed(3)}`)),p=new Set(_.flatMap(x=>[`${x.hand}|${x.time.toFixed(3)}`,`${x.hand}|${x.endTime.toFixed(3)}`]));for(let x of h){let v=`${x.hand}|${x.time.toFixed(3)}`;p.has(v)||(delete x.arcHead,delete x.arcTail),delete x.flipped}let g=[...h,...d,...f].sort((x,v)=>x.time-v.time),y=Math.max(i.reaction,s.reaction||0);return{notes:g,walls:m,arcs:_,njs:Math.min(s.njs||i.njs,i.njs),reaction:y}}function Kp(s){let t=new Set(s),e=Math.max(...s.map(n=>Ec.indexOf(n)));if(e<=0)return[];let i=[];for(let n=0;n<Math.min(e,4);n++){if(t.has(Ec[n]))continue;let r=Ec.slice(n+1).find(o=>t.has(o));r&&i.push({name:Ec[n],from:r})}return i}var wb="neon-slice",Fu="maps";function Eb(){return new Promise((s,t)=>{let e;try{e=indexedDB.open(wb,1)}catch(i){t(i);return}e.onupgradeneeded=()=>e.result.createObjectStore(Fu,{keyPath:"id"}),e.onsuccess=()=>s(e.result),e.onerror=()=>t(e.error)})}async function Tc(s,t){let e=await Eb();return new Promise((i,n)=>{let r=e.transaction(Fu,s),o=t(r.objectStore(Fu));r.oncomplete=()=>i(o?.result??o),r.onerror=()=>n(r.error)})}var Rc=class{constructor(t){if(this.audio=t,this.songs=[],this.autoLevels=!0,this._loopCache=new Map,typeof location<"u"&&/[?&]builtin\b/.test(location.search))for(let i of Up)this.songs.push(this._builtIn(i))}_builtIn(t){return{id:t.id,title:t.title,artist:t.artist,mapper:"Generated",bpm:t.bpm,builtIn:!0,hue:t.hue,cover:null,difficulties:Object.keys(as).map(e=>({name:e,label:as[e].label,njs:as[e].njs,offset:0})),previewStart:480/t.bpm,previewDuration:1920/t.bpm,loadAudio:async()=>{if(!this._loopCache.has(t.id)){let e=Pu(t,this.audio.ctx.sampleRate);this._loopCache.set(t.id,this.audio.bufferFrom(e))}return this._loopCache.get(t.id)},load:async e=>{if(!this._loopCache.has(t.id)){let n=Pu(t,this.audio.ctx.sampleRate);this._loopCache.set(t.id,this.audio.bufferFrom(n))}let i=kp({bpm:t.bpm,bars:t.bars,introBars:2,difficulty:e,seed:t.seed});return{buffer:this._loopCache.get(t.id),loop:!0,notes:i.notes,walls:i.walls,njs:i.njs,njsOffset:0,bpm:t.bpm,duration:t.bars*4*60/t.bpm,tempo:new nr(t.bpm)}}}}async restore(){let t=[];try{t=await Tc("readonly",e=>e.getAll())}catch{return}for(let e of t||[])try{let i=await this._addZip(e.zip,e.id);e.bsKey&&(i.bsKey=e.bsKey)}catch(i){console.warn("Skipping saved map",e.id,i)}}async importZip(t,e=!0,i={}){let n=await this._addZip(t);if(i.bsKey&&(n.bsKey=i.bsKey),n.added=Date.now(),e)try{await Tc("readwrite",r=>r.put({id:n.id,zip:t,added:n.added,bsKey:i.bsKey||null}))}catch{}return n}async addServerFolder(t,e){let i=t+e.split("/").map(encodeURIComponent).join("/")+"/",n=await this._addUrlFolder(i,e);return n&&(n.fromFolder=!0,this.songs=this.songs.filter(r=>r===n||r.fromFolder||r.title!==n.title||r.mapper!==n.mapper)),n}forget(t){this.songs=this.songs.filter(e=>e!==t)}async remove(t){this.songs=this.songs.filter(e=>e.id!==t);try{await Tc("readwrite",e=>e.delete(t))}catch{}}async importFolder(t,e=!0){let i=Array.from(t),n=l=>(l.webkitRelativePath||l.name).replace(/\\/g,"/"),r=i.filter(l=>/(^|\/)info\.dat$/i.test(n(l))),o=[],a=[];r.length||a.push("No Beat Saber maps found (no Info.dat in this folder or its sub-folders).");for(let l of r){let c=n(l).slice(0,-8),h=i.filter(f=>n(f).startsWith(c)&&!n(f).slice(c.length).includes("/")),u=h.map(f=>Tb(f,n(f))),d=h.reduce((f,m)=>f+m.size,0);try{let f=await this._addEntries(u,null,d,"folder");if(o.push(f),e){let m=new Uu.default;for(let p of h)m.file(n(p).slice(c.length),p);let _=await m.generateAsync({type:"arraybuffer",compression:"STORE"});try{await Tc("readwrite",p=>p.put({id:f.id,zip:_,added:Date.now()}))}catch{}}}catch(f){a.push(`${c.replace(/\/$/,"")}: ${f.message||f}`)}}return{added:o,errors:a}}async scanServerFolder(t=["Songs/","../Songs/"]){let e=[];this.scanReport=[];let i=n=>{try{return new URL(n,location.href).href}catch{return n}};for(let n of t){let r=null;try{let a=await fetch(n+"index.json",{cache:"no-store"});if(a.ok)try{r=(await a.json()).map(l=>typeof l=="string"?l:l.folder).filter(Boolean),this.scanReport.push({url:i(n+"index.json"),result:`${r.length} folders`})}catch{this.scanReport.push({url:i(n+"index.json"),result:"not a song list"})}else this.scanReport.push({url:i(n+"index.json"),result:`HTTP ${a.status}`})}catch{this.scanReport.push({url:i(n+"index.json"),result:"unreachable"})}if(!r)try{let a=await fetch(n,{cache:"no-store"});if(!a.ok){this.scanReport.push({url:i(n),result:`HTTP ${a.status}`});continue}r=Rb(await a.text(),a.url||i(n)),this.scanReport.push({url:i(n),result:`listing with ${r.length} folders`})}catch{this.scanReport.push({url:i(n),result:"unreachable"});continue}let o=new Set;for(let a of r){let l=/\.zip$/i.test(a),c=n+a.split("/").map(encodeURIComponent).join("/")+(l?"":"/");try{let h=l?await this._addUrlZip(c,a):await this._addUrlFolder(c,a),u=h&&`${h.title}|${h.mapper}`;if(h&&o.has(u)){this.songs=this.songs.filter(d=>d!==h);continue}h&&o.add(u),h?(h.fromFolder=!0,e.push(h),this.songs=this.songs.filter(d=>d===h||d.fromFolder||d.title!==h.title||d.mapper!==h.mapper)):this.scanReport.push({url:i(c),result:"no Info.dat"})}catch(h){console.warn("Skipping",a,h),this.scanReport.push({url:i(c),result:h.message||String(h)})}}if(r.length)break}return e}async _addUrlZip(t,e){let i=await fetch(t);if(!i.ok)throw new Error(`Could not load ${e} (${i.status}).`);let n=await this._addZip(await i.arrayBuffer(),`zipf-${zo(e)}-${zo(e.slice(-24))}`);return n.folder=e,n.fromZip=!0,n.bsKey=hr(e),n}async _addUrlFolder(t,e){let i=null,n=null;for(let h of["Info.dat","info.dat","INFO.DAT"]){let u=await fetch(t+h,{cache:"no-store"}).catch(()=>null);if(u?.ok){i=await u.text(),n=h;break}}if(!i)return null;let r=JSON.parse(Ac(i)),o=mu(r),a=[o.songFile,o.coverFile,r.audio?.audioDataFilename,...o.difficulties.map(h=>h.file)].filter(Boolean),l=[{name:n,async:async()=>i}];for(let h of new Set(a))l.push(Ab(t+encodeURIComponent(h),h));let c=await this._addEntries(l,`dir-${zo(e)}`,0,"folder");return c.folder=e,c.bsKey=hr(e),c}async _addZip(t,e){let i=await Uu.default.loadAsync(t),n=Object.values(i.files).filter(r=>!r.dir);return this._addEntries(n,e,t.byteLength,"zip")}async _addEntries(t,e,i,n){let r=t.find(C=>/(^|\/)info\.dat$/i.test(C.name));if(!r)throw new Error(`No Info.dat found in the ${n}. Is this a Beat Saber map?`);let o=r.name.slice(0,r.name.length-8),a=C=>{if(!C)return null;let T=(o+C).toLowerCase();return t.find(P=>P.name.toLowerCase()===T)||t.find(P=>P.name.toLowerCase().endsWith("/"+C.toLowerCase())||P.name.toLowerCase()===C.toLowerCase())},l=JSON.parse(Ac(await r.async("string"))),c=mu(l),h=a(c.songFile);if(!h)throw new Error(`The song file "${c.songFile}" is missing from the ${n}.`);let u=c.difficulties.filter(C=>a(C.file));if(!u.length)throw new Error(`None of the difficulty files listed in Info.dat are in the ${n}.`);let d=null,f=a(c.coverFile);if(f){let C=await f.async("blob");d=URL.createObjectURL(C)}let m=e||`map-${zo(c.title)}-${zo(c.mapper)}-${i}`;this.songs=this.songs.filter(C=>C.id!==m);let _=null,p=l.audio?.audioDataFilename?a(l.audio.audioDataFilename):null,g=new Map,y=async C=>(g.has(C.name)||g.set(C.name,(async()=>{let T=JSON.parse(Ac(await a(C.file).async("string"))),P=[];if(p)try{P=xp(JSON.parse(Ac(await p.async("string"))),c.bpm)}catch{}return _p(T,c.bpm,P)})()),g.get(C.name)),x=this,v=null,S=new Map,E=["Easy","Normal","Hard","Expert","ExpertPlus"],R=C=>{let T=E.indexOf(C.name);return T<0?99:T},M={id:m,title:c.title,artist:c.artist,mapper:c.mapper,bpm:c.bpm,builtIn:!1,hue:Cb(c.title),cover:d,oneSaber:c.oneSaber,get difficulties(){return!x.autoLevels||!v||!v.length?u:[...u,...v].sort((C,T)=>R(C)-R(T))},previewStart:c.previewStart||0,previewDuration:c.previewDuration||0,loadAudio:async()=>(_||(_=await this.audio.decode(await h.async("arraybuffer"))),_),prepareAutoLevels:async()=>{if(v)return v;let C=[];for(let T of Kp(u.map(P=>P.name))){let P=u.find(b=>b.name===T.from);try{let b=await y(P),B=nc(P.njs,c.bpm,P.offset||0),H=Du({notes:b.notes,walls:b.walls,arcs:b.arcs,njs:P.njs,reaction:B},T.name,b.tempo);if(!H)continue;S.set(T.name,H);let z=ap(H.njs,c.bpm,H.reaction);C.push({name:T.name,label:T.name,njs:H.njs,offset:z,colors:P.colors,auto:!0,from:P.name})}catch(b){console.warn("Could not make",T.name,b)}}return v=C,C},load:async C=>{let P=[...u,...v||[]].find(j=>j.name===C)||u[0],b=P.auto?u.find(j=>j.name===P.from):P,B=await y(b),{notes:H,walls:z,arcs:Y}=B;if(P.auto){let j=S.get(P.name);j||(j=Du({notes:H,walls:z,arcs:Y,njs:b.njs},P.name,B.tempo)),j&&({notes:H,walls:z,arcs:Y}=j)}_||(_=await this.audio.decode(await h.async("arraybuffer")));let V=H.length?H[H.length-1].time:0;return{buffer:_,loop:!1,notes:H,walls:z,arcs:Y,lights:B.lights,njs:P.njs,njsOffset:P.offset,bpm:c.bpm,duration:Math.max(_.duration,V+1),colors:P.colors||null,tempo:B.tempo,version:B.version,auto:!!P.auto}}};return this.songs.push(M),M}};function Tb(s,t){return{name:t,async:e=>e==="string"?s.text():e==="blob"?Promise.resolve(s):s.arrayBuffer()}}function Ab(s,t){return{name:t,async:async e=>{let i=await fetch(s);if(!i.ok)throw new Error(`Could not load ${t} (${i.status}).`);return e==="string"?i.text():e==="blob"?i.blob():i.arrayBuffer()}}}function Rb(s,t){let e=new Set,i=new URL(t);i.pathname.endsWith("/")||(i.pathname+="/");let n=/href\s*=\s*(?:"([^"]+)"|'([^']+)')/gi,r;for(;r=n.exec(s);){let o=(r[1]||r[2]).replace(/&amp;/g,"&");if(o.startsWith("?")||o.startsWith("#"))continue;let a;try{a=new URL(o,i)}catch{continue}if(a.origin!==i.origin||!a.pathname.startsWith(i.pathname))continue;let l=a.pathname.slice(i.pathname.length),c=null;if(l.endsWith("/")&&l.length>1&&!l.slice(0,-1).includes("/")?c=l.slice(0,-1):/\.zip$/i.test(l)&&!l.includes("/")&&(c=l),!!c)try{e.add(decodeURIComponent(c))}catch{}}return[...e]}function Ac(s){return s.charCodeAt(0)===65279?s.slice(1):s}function zo(s){return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,30)}function Cb(s){let t=0;for(let e of String(s))t=t*31+e.charCodeAt(0)>>>0;return t%360}var Ib=300*1e3,Cc=class{constructor(t){this.library=t,this.mode=null,this.api=typeof window<"u"&&window.__NEON_BS?.api||Hp.api,this._cache=new Map}async detect(){if(this.mode)return this.mode;try{let t=await fetch("/__neon/ping",{cache:"no-store"}),e=t.ok?await t.json():null;this.mode=e?.launcher?"launcher":"direct"}catch{this.mode="direct"}return this.mode}async _getJson(t){let e=this._cache.get(t);if(e&&Date.now()-e.t<Ib)return e.data;let i=this.mode==="launcher"?`/__neon/api?path=${encodeURIComponent(t)}`:this.api+t,n;try{n=await fetch(i)}catch{throw new Error(this.mode==="launcher"?"The launcher could not reach BeatSaver. Check the PC's internet connection.":"Could not reach BeatSaver. Check the internet connection, or play through the PC launcher.")}if(!n.ok)throw new Error(`BeatSaver answered with an error (${n.status}). Try again in a moment.`);let r=await n.json();return this._cache.set(t,{t:Date.now(),data:r}),r}async list(t,e,i){await this.detect();let n=await this._getJson(Vp(t,e,i)),r=Gp(n);return r.full=(Array.isArray(n?.docs)?n.docs.length:r.length)>=20,r}mediaUrl(t){return t?this.mode==="launcher"?`/__neon/cdn?url=${encodeURIComponent(t)}`:t:""}installedKeys(){let t=new Set;for(let e of this.library.songs){let i=e.bsKey||hr(e.folder);i&&t.add(i.toLowerCase())}return t}findInstalled(t){let e=String(t).toLowerCase();return this.library.songs.find(i=>(i.bsKey||hr(i.folder)||"").toLowerCase()===e)||null}async install(t,e=()=>{}){if(await this.detect(),this.mode==="launcher"){e(null);let o=Wp(t),a=new URLSearchParams({key:t.key,url:t.downloadURL,name:o}),l=await fetch(`/__neon/install?${a}`),c=await l.json().catch(()=>({}));if(!l.ok||!c.ok)throw new Error(c.error||`Install failed (${l.status}).`);let h=await this.library.addServerFolder("/Songs/",c.folder);if(!h)throw new Error("The map was downloaded but could not be read.");return h.bsKey=t.key,h}let i;try{i=await fetch(t.downloadURL)}catch{throw new Error("Could not download from BeatSaver. Check the internet connection, or play through the PC launcher.")}if(!i.ok)throw new Error(`Download failed (${i.status}).`);let n=Number(i.headers.get("content-length"))||0,r;if(i.body&&n){let o=i.body.getReader(),a=[],l=0;for(;;){let{done:u,value:d}=await o.read();if(u)break;a.push(d),l+=d.length,e(l/n)}let c=new Uint8Array(l),h=0;for(let u of a)c.set(u,h),h+=u.length;r=c.buffer}else e(null),r=await i.arrayBuffer();return e(1),await this.library.importZip(r,!0,{bsKey:t.key})}};var Ho=4,Pb=["1234567890","QWERTYUIOP","ASDFGHJKL","ZXCVBNM"],Ic=class{constructor(t){this.game=t,this.client=new Cc(t.library),this.list="top",this.query="",this.draft="",this.results=[],this.apiPage=-1,this.more=!0,this.page=0,this.loading=!1,this.error="",this.selected=null,this.installing=null,this.installError="",this.preview=null,this.previewKey=null,this._covers=new Map,this._gen=0}get blockedHere(){try{return window.self!==window.top}catch{return!0}}redraw(){this.game._redrawMenu()}open(){!this.results.length&&!this.loading&&!this.error&&this.load(this.list,this.query)}async load(t,e=""){if(this.list=t,this.query=e,this.results=[],this.apiPage=-1,this.more=!0,this.page=0,this.error="",t==="search"&&!e){this.loading=!1,this.more=!1,this.redraw();return}await this._fetchNext()}async _fetchNext(){if(this.blockedHere){this.error="BeatSaver can't be reached from this preview link. Open the game with Play Neon Slice.bat on your PC, or from a hosted copy.",this.redraw();return}let t=++this._gen;this.loading=!0,this.redraw();try{let e=this.apiPage+1,i=await this.client.list(this.list,e,this.query);if(t!==this._gen)return;let n=new Set(this.results.map(r=>r.key));for(let r of i)n.has(r.key)||this.results.push(r);this.apiPage=e,this.more=i.full}catch(e){if(t!==this._gen)return;this.error=e.message||String(e)}this.loading=!1,this.redraw()}async nextPage(){let t=Math.ceil(this.results.length/Ho);if(this.page+1<t)this.page++,this.redraw();else if(this.more&&!this.loading){let e=this.results.length;await this._fetchNext(),this.results.length>e&&(this.page++,this.redraw())}}prevPage(){this.page>0&&(this.page--,this.redraw())}togglePreview(t){if(this.previewKey===t.key){this.stopPreview();return}this.stopPreview(),t.previewURL&&(this.previewKey=t.key,this.previewLoading=!0,this.installError="",this.redraw(),this._playPreview(t).catch(e=>{this.previewKey===t.key&&(console.warn("Preview failed",e),this.previewKey=null,this.installError="The preview could not be played.")}).finally(()=>{this.previewLoading=!1,this.redraw()}))}async _playPreview(t){let e=this.game.audio,i=this.client.mediaUrl(t.previewURL),n=null;try{await e.init();let o=await fetch(i);if(!o.ok)throw new Error(`HTTP ${o.status}`);n=await e.decode(await o.arrayBuffer())}catch(o){if(this.client.mode==="launcher")throw o}if(this.previewKey!==t.key)return;if(n){e.playPreview(n,0,n.duration),this._handle=e.preview;return}let r=new Audio(i);r.loop=!0,r.volume=Math.max(0,Math.min(1,this.game.settings.music??.8)),this.preview=r,await r.play()}stopPreview(){let t=!!this.previewKey;this.preview&&(this.preview.pause(),this.preview.src=""),this._handle&&this.game.audio.preview===this._handle&&this.game.audio.stopPreview(),this._handle=null,this.preview=null,this.previewKey=null,t&&this.redraw()}async install(t){if(this.installing)return;this.installing={key:t.key,progress:null},this.installError="",this.redraw();let e=0;try{await this.client.install(t,i=>{if(!this.installing)return;this.installing.progress=i;let n=performance.now();(n-e>120||i===1)&&(e=n,this.redraw())}),this.game.hooks.onLibraryChange?.()}catch(i){this.installError=i.message||String(i)}this.installing=null,this.redraw()}_cover(t){if(!t.coverURL)return null;let e=this._covers.get(t.key);return e||(e=new Image,this.client.mode!=="launcher"&&(e.crossOrigin="anonymous"),e.onload=()=>this.redraw(),e.src=this.client.mediaUrl(t.coverURL),this._covers.set(t.key,e),this._covers.size>80&&this._covers.delete(this._covers.keys().next().value)),e.complete&&e.naturalWidth?e:null}_drawCover(t,e,i,n,r){let o=t.g,a=this._cover(e);if(a){o.save(),o.beginPath(),o.roundRect?o.roundRect(i,n,r,r,12):o.rect(i,n,r,r),o.clip(),o.drawImage(a,i,n,r,r),o.restore();return}let l=0;for(let h of e.key)l=(l*31+h.charCodeAt(0))%360;let c=o.createLinearGradient(i,n,i+r,n+r);c.addColorStop(0,`hsl(${l}, 90%, 55%)`),c.addColorStop(1,`hsl(${(l+60)%360}, 90%, 30%)`),t.rect(i,n,r,r,c,12),t.text((e.title||"?").slice(0,1).toUpperCase(),i+r/2,n+r/2+2,{size:r*.5,weight:700,align:"center",baseline:"middle"})}_chips(t,e,i,n,r){let o=i;for(let a of e.diffs){if(o+52>i+r)break;t.rect(o,n,52,30,Jp(a.name),8),t.text(a.short,o+52/2,n+16,{size:20,weight:700,align:"center",baseline:"middle",color:"#120a22"}),o+=60}}drawBrowse(t){let e=this.game;t.button("back",64,40,160,64,"\u2039 Back",()=>{this.stopPreview(),e.openMenu("songs")},{size:30}),t.text("BEATSAVER",250,88,{size:48,weight:700,spacing:2}),this.blockedHere||t.text(this.client.mode==="launcher"?"Saves to your Songs folder":"Saves in this browser",1216,88,{size:22,color:mt.faint,align:"right"}),["top","latest","curated","search"].forEach((l,c)=>{t.button(`bs-tab-${l}`,64+c*184,124,172,60,wc[l].label,()=>{if(l==="search"){this.list="search",this.draft=this.query,e.openMenu("keyboard");return}this.load(l)},{selected:this.list===l,size:26})}),this.list==="search"&&t.button("bs-query",816,124,400,60,this.query?t.fit(`\u201C${this.query}\u201D`,360,26):"Type a search\u2026",()=>{this.draft=this.query,e.openMenu("keyboard")},{size:26,align:"left",accent:mt.gold});let n=204;if(this.error){t.text("Can't load maps",64,n+60,{size:36,weight:600,color:mt.bad}),jp(t,this.error,64,n+110,1150,30,{size:28,color:mt.dim}),this.blockedHere||t.button("bs-retry",64,n+250,260,70,"Try again",()=>this.load(this.list,this.query),{size:30});return}let r=this.results.slice(this.page*Ho,this.page*Ho+Ho);if(!r.length){let l=this.loading?"Loading\u2026":this.list==="search"&&!this.query?"Choose \u201CType a search\u2026\u201D to find maps.":"No maps found.";t.text(l,64,n+70,{size:32,color:mt.dim})}let o=this.client.installedKeys();r.forEach((l,c)=>{let h=n+c*120;t.button(`bs-map-${l.key}`,64,h,1152,108,"",()=>{this.selected=l,this.installError="",e.openMenu("bsmap")}),this._drawCover(t,l,78,h+10,88),t.text(t.fit(l.title,620,34,600),186,h+44,{size:34,weight:600}),t.text(t.fit(`${l.artist||"Unknown artist"}  \xB7  ${l.mapper||"unknown"}`,620,24),186,h+80,{size:24,color:mt.dim}),this._chips(t,l,830,h+16,370);let u=`${Math.round(l.bpm)} BPM \xB7 ${Nu(l.duration)} \xB7 ${Math.round(l.rating*100)}%`;t.text(u,1196,h+84,{size:22,color:mt.dim,align:"right"}),o.has(l.key.toLowerCase())&&t.text("Installed",830,h+84,{size:22,color:mt.good,weight:600})});let a=Math.ceil(this.results.length/Ho);if(r.length){t.button("bs-prev",64,704,180,64,"\u2039 Prev",()=>this.prevPage(),{disabled:this.page===0,size:30}),t.text(`${this.page+1} / ${a}${this.more?"+":""}`,340,746,{size:26,color:mt.dim,align:"center"});let l=this.page+1<a||this.more;t.button("bs-next",436,704,180,64,this.loading?"\u2026":"Next \u203A",()=>this.nextPage(),{disabled:!l||this.loading,size:30})}t.text("Maps from beatsaver.com \xB7 for personal play",1216,746,{size:22,color:mt.faint,align:"right"})}drawMap(t){let e=this.game,i=this.selected;if(!i){e.screen="browse",this.drawBrowse(t);return}t.button("back",64,48,180,70,"\u2039 Back",()=>{this.stopPreview(),e.openMenu("browse")}),this._drawCover(t,i,64,150,220),t.text(t.fit(i.title,880,52,700),316,196,{size:52,weight:700}),i.subTitle&&t.text(t.fit(i.subTitle,880,26),316,232,{size:26,color:mt.dim}),t.text(t.fit(i.artist||"Unknown artist",880,32),316,i.subTitle?276:250,{size:32,color:mt.dim}),t.text(t.fit(`Mapped by ${i.mapper||"unknown"}`,880,28),316,i.subTitle?316:292,{size:28,color:mt.faint}),t.text(`${Math.round(i.bpm)} BPM  \xB7  ${Nu(i.duration)}  \xB7  ${Math.round(i.rating*100)}% rating  \xB7  key ${i.key}`,316,358,{size:26,color:mt.dim}),t.text("DIFFICULTIES",64,432,{size:22,color:mt.dim,spacing:4});let n=Math.max(1,i.diffs.length),r=Math.min(220,(1152-(n-1)*14)/n);i.diffs.forEach((c,h)=>{let u=64+h*(r+14);t.rect(u,448,r,90,"rgba(138,77,255,0.14)",14),t.rect(u,448,8,90,Jp(c.name),4),t.text(Lb(c.name),u+24,484,{size:28,weight:600}),t.text(`${c.nps.toFixed(1)} NPS \xB7 NJS ${c.njs}`,u+24,520,{size:20,color:mt.dim,maxWidth:r-32})}),i.diffs.length||t.text("No standard difficulties in this map.",64,500,{size:26,color:mt.faint});let o=this.client.findInstalled(i.key),a=this.installing&&this.installing.key===i.key,l=this.previewKey===i.key;if(t.button("bs-preview",64,600,300,110,l?this.previewLoading?"Loading\u2026":"\u25A0 Stop":"\u25B6 Preview",()=>this.togglePreview(i),{size:38,disabled:!i.previewURL,selected:l,accent:mt.gold}),o)t.button("bs-play",388,600,420,110,"Play",()=>{this.stopPreview(),e.selectedSong=o,e.selectedDiff=o.difficulties[Math.min(1,o.difficulties.length-1)].name,e.openMenu("song")},{size:46,accent:mt.good,sub:"Installed"});else if(a){let c=this.installing.progress;t.rect(388,600,420,110,"rgba(77,255,166,0.12)",16),c!=null&&t.rect(388,600,420*Math.max(.03,c),110,"rgba(77,255,166,0.35)",16),t.text(c!=null?`Downloading ${Math.round(c*100)}%`:"Downloading\u2026",598,656,{size:34,weight:600,align:"center",baseline:"middle"})}else t.button("bs-download",388,600,420,110,"Download",()=>this.install(i),{size:46,accent:mt.good,disabled:!!this.installing||this.blockedHere,sub:this.client.mode==="launcher"?"to your Songs folder":"to this browser"});this.installError&&jp(t,this.installError,840,640,380,26,{size:22,color:mt.bad})}drawKeyboard(t){let e=this.game;t.button("back",64,40,160,64,"\u2039 Back",()=>e.openMenu("browse"),{size:30}),t.text("SEARCH BEATSAVER",250,88,{size:44,weight:700,spacing:2}),t.rect(64,128,1152,84,"rgba(0,0,0,0.35)",14),t.text(t.fit(this.draft||"",1100,44,600)+"|",90,184,{size:44,weight:600,color:this.draft?mt.text:mt.dim});let i=100,n=84,r=12;Pb.forEach((a,l)=>{let h=640-(a.length*i+(a.length-1)*r)/2;[...a].forEach((u,d)=>{t.button(`key-${u}`,h+d*(i+r),236+l*(n+r),i,n,u,()=>this.type(u),{size:38})})});let o=236+4*(n+r);t.button("key-clear",64,o,200,n,"Clear",()=>{this.draft="",this.redraw()},{size:30}),t.button("key-space",280,o,440,n,"Space",()=>this.type(" "),{size:30}),t.button("key-back",736,o,200,n,"\u232B",()=>{this.draft=this.draft.slice(0,-1),this.redraw()},{size:38}),t.button("key-go",952,o,264,n,"Search",()=>this.submit(),{size:34,accent:mt.good,selected:!0})}type(t){this.draft.length>=40||(this.draft+=t.toLowerCase(),this.redraw())}submit(){let t=this.draft.trim();this.game.openMenu("browse"),this.load("search",t)}onKey(t){if(this.game.screen!=="keyboard")return!1;if(t.key==="Enter")this.submit();else if(t.key==="Backspace")this.draft=this.draft.slice(0,-1),this.redraw();else if(t.key==="Escape")this.game.openMenu("browse");else if(t.key.length===1&&/[\w\s\-'&.!]/.test(t.key))this.type(t.key);else return!1;return!0}};function Lb(s){return{ExpertPlus:"Expert+"}[s]||s}function Jp(s){return{Easy:"#3ee07a",Normal:"#4fb6ff",Hard:"#ffb340",Expert:"#ff5470",ExpertPlus:"#c77dff"}[s]||"#a99cc8"}function jp(s,t,e,i,n,r,o){let a=s.g;a.font=`${o.weight||500} ${o.size}px ${lr}`;let l=String(t).split(/\s+/),c="",h=i;for(let u of l){let d=c?`${c} ${u}`:u;a.measureText(d).width>n&&c?(s.text(c,e,h,o),c=u,h+=r+6):c=d}c&&s.text(c,e,h,o)}var Qp="neon-slice-settings-v1",tm="neon-slice-best-v1",em="neon-slice-history-v1",im=30,Nb={offsetMs:0,tiltDeg:0,noFail:!1,haptics:!0,music:.85,sfx:.8,lowFx:!1,softFlash:!1,trail:"normal",hitSound:"new",arcs:!0,autoLevels:!0,theme:"tunnel",stageColors:"map",mapLights:!0,mapDark:1,musicFx:!0,playFx:!0,runway:!0,flyby:!0,skyline:!0,introFx:!0,beatSync:!0},nm=["tunnel","orbital","city","liquid","crystal","void"],sm=["default","map","cover"],Db={default:"Default",map:"Map colours",cover:"Cover art"},Ub=.28,Fb=.18,Bb=.22,Ob=-3,kb=100;function Bu(s,t){try{let e=JSON.parse(localStorage.getItem(s));return e&&typeof e=="object"?{...t,...e}:{...t}}catch{return{...t}}}function Ou(s,t){try{localStorage.setItem(s,JSON.stringify(t))}catch{}}var Pc=class{constructor(t,e={}){this.hooks=e,this.settings=Bu(Qp,Nb),this.best=Bu(tm,{}),this.history=Bu(em,{});let i=new Ql({canvas:t,antialias:!0,powerPreference:"high-performance"});i.localClippingEnabled=!0,i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight,!1),i.outputColorSpace=Ae,i.xr.enabled=!0,i.xr.setReferenceSpaceType("local-floor"),i.xr.setFoveation(1),this.renderer=i,this.scene=new Ur,this.camera=new ii(72,window.innerWidth/window.innerHeight,.05,120),this.camera.position.set(0,1.6,.35),this.scene.add(this.camera),window.addEventListener("resize",()=>this.onResize()),this.world=new cc(this.scene),this.factory=new uc,this.sparks=new fc(this.scene),this.music=new pc,this.settingsTab="general",this.effects=new dc(this.scene),this._buildBloom(),this._applyFx(),this.popups=new yc(this.scene),this.audio=new Mc,this.library=new Rc(this.audio),this.bs=new Ic(this),this.library.autoLevels=this.settings.autoLevels!==!1,this.raycaster=new uo,this.state="idle",this.screen="songs",this.page=0,this.selectedSong=null,this.selectedDiff=null,this.xrMode=!1,this.track=new pe,this.mirrorTrack=new pe,this.mirrorTrack.scale.y=-1,this.scene.add(this.mirrorTrack),this.scene.add(this.track),this.activeNotes=[],this.activeWalls=[],this.debris=[],this.pendingCuts=[],this._buildUi(),this._buildSabers(),this._buildHud(),this._buildVignette(),this.lastT=performance.now()/1e3,i.setAnimationLoop((n,r)=>this.frame(r)),window.__neon=this}_buildUi(){this.menu=new cr(1280,800,2),this.menu.mesh.position.set(0,1.45,-2.3),this.menu.visible=!1,this.scene.add(this.menu.mesh),this.panels=[this.menu]}_buildHud(){this.hudLeft=new cr(512,360,.9,{interactive:!1}),this.hudLeft.mesh.position.set(-1.75,1.15,-2.4),this.hudLeft.mesh.rotation.y=.45,this.hudRight=new cr(512,360,.9,{interactive:!1}),this.hudRight.mesh.position.set(1.75,1.15,-2.4),this.hudRight.mesh.rotation.y=-.45;for(let t of[this.hudLeft,this.hudRight])t.visible=!1,this.scene.add(t.mesh);this._hudKey=""}_buildVignette(){this.vignette=new Ft(new tn(.3,16,12),new ge({color:16715824,transparent:!0,opacity:0,side:Oe,depthTest:!1,depthWrite:!1})),this.vignette.renderOrder=30,this.camera.add(this.vignette)}_buildSabers(){this.sabers=[],this.controllers=[];for(let e=0;e<2;e++){let i=this.renderer.xr.getController(e);this.scene.add(i);let n={ctrl:i,saber:null,source:null,laser:this._makeLaser(),cursor:this._makeCursor(),lastB:!1};i.add(n.laser),this.scene.add(n.cursor),i.addEventListener("connected",r=>this._onControllerConnected(n,r.data)),i.addEventListener("disconnected",()=>{n.saber&&(n.saber.visible=!1),n.source=null}),i.addEventListener("selectstart",()=>this._onTrigger(n)),this.controllers.push(n)}this.mouse=new xt(0,0),this.mouseRig=new pe,this.scene.add(this.mouseRig),this.mouseSaber=new Do(this.mouseRig,-1,Jt.violet,this.scene,1.2),this.mouseSaber.visible=!1,this.mouseSaber.setTrailSeconds(rs[this.settings.trail]??rs.normal);let t=this.renderer.domElement;t.addEventListener("pointermove",e=>{let i=t.getBoundingClientRect();this.mouse.set((e.clientX-i.left)/i.width*2-1,-((e.clientY-i.top)/i.height)*2+1)}),t.addEventListener("pointerdown",()=>{this.xrMode||this._onTrigger(null)}),window.addEventListener("keydown",e=>{if(!(this.xrMode||this.state==="idle")){if(this.state==="menu"&&this.bs.onKey(e)){e.preventDefault();return}(e.code==="Escape"||e.code==="KeyP")&&(this.togglePause(),e.preventDefault()),e.code==="Space"&&this.state==="calibrate"&&(this._calibTap(),e.preventDefault())}}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.state==="playing"&&this.pause()})}_makeLaser(){let t=new se().setFromPoints([new D(0,0,0),new D(0,0,-1)]),e=new Vs(t,new Ei({color:14272767,transparent:!0,opacity:.7}));return e.scale.z=4,e.visible=!1,e}_makeCursor(){let t=new He(new ze({map:Ye(),color:16777215,depthTest:!1,transparent:!0}));return t.scale.set(.05,.05,1),t.renderOrder=40,t.visible=!1,t}_onControllerConnected(t,e){if(t.source=e,e.targetRayMode!=="tracked-pointer")return;let i=e.handedness==="left"?xi.LEFT:xi.RIGHT;(!t.saber||t.saber.hand!==i)&&(t.saber&&(t.ctrl.remove(t.saber.pivot),this.scene.remove(t.saber.trail)),t.saber=new Do(t.ctrl,i,i===xi.LEFT?Jt.left:Jt.right,this.scene),t.saber.setTilt(this.settings.tiltDeg),t.saber.setTrailSeconds(rs[this.settings.trail]??rs.normal)),t.saber.inputSource=e,t.saber.visible=!0}get activeSabers(){if(!this.xrMode)return[this.mouseSaber];let t=[];for(let e of this.controllers)if(e.saber&&e.source&&e.saber.pivot.visible){if(this.oneSaber&&e.saber.hand===xi.LEFT)continue;t.push(e.saber)}return t}onResize(){this.renderer.xr.isPresenting||(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.composer?.setSize(window.innerWidth,window.innerHeight))}_buildBloom(){try{let t=new xt(window.innerWidth,window.innerHeight);this.composer=new _c(this.renderer),this.composer.addPass(new xc(this.scene,this.camera)),this.bloom=new ar(t,.75,.45,.62),this.composer.addPass(this.bloom),this.composer.addPass(new vc),this.composer.setSize(t.x,t.y)}catch(t){console.warn("Bloom unavailable",t),this.composer=null}}_applyFx(){let t=rs[this.settings.trail]??rs.normal;for(let n of this.controllers||[])n.saber?.setTrailSeconds(t);this.mouseSaber?.setTrailSeconds(t);let e=this.settings;this.world.setQuality(e.lowFx),this.world.flashScale=e.softFlash?.25:1,this.world.setOptions({theme:e.theme,musicFx:e.musicFx,playFx:e.playFx,runway:e.runway,flyby:e.flyby,skyline:e.skyline,introFx:e.introFx,beatSync:e.beatSync});let i=this.world.voidMode?450:120;this.bloom&&(this.bloom.strength=this.world.voidMode?.35:.75),this.camera.far!==i&&(this.camera.far=i,this.camera.updateProjectionMatrix())}async _coverPalette(t){if(t._palette!==void 0)return t._palette;let e=null;if(t.cover)try{let i=new Image;i.src=t.cover,await i.decode();let n=document.createElement("canvas");n.width=n.height=40;let r=n.getContext("2d",{willReadFrequently:!0});r.drawImage(i,0,0,40,40),e=Lp(r.getImageData(0,0,40,40).data)}catch{e=null}return!e&&t.hue!==void 0&&(e={a:Bo(t.hue%360,.85,1),b:Bo((t.hue+150)%360,.85,1)}),t._palette=e,e}async _applyStageColors(t,e){let i=this.settings.stageColors,n=null,r=null,o=a=>a?new dt(a[0],a[1],a[2]):null;if(i==="map"&&e.colors)n=o(e.colors.envLeft||e.colors.left),r=o(e.colors.envRight||e.colors.right);else if(i==="cover"){let a=await this._coverPalette(t);a&&(n=o(a.a),r=o(a.b))}this.world.setStageColors(n,r)}async startDesktop(){await this.audio.init(),this._applyVolumes(),this.xrMode=!1,this.mouseSaber.visible=!0,this.mouseSaber.setTilt(0),this.openMenu("songs")}async startXR(){await this.audio.init(),this._applyVolumes();let t=await navigator.xr.requestSession("immersive-vr",{optionalFeatures:["local-floor","bounded-floor","hand-tracking"]});t.addEventListener("end",()=>this._onSessionEnd()),t.addEventListener("visibilitychange",()=>{t.visibilityState!=="visible"&&this.state==="playing"&&this.pause()}),await this.renderer.xr.setSession(t);try{let e=t.supportedFrameRates;if(e&&t.updateTargetFrameRate){let i=[90,72].find(n=>Array.from(e).includes(n));i&&await t.updateTargetFrameRate(i)}}catch{}this.xrMode=!0,this.mouseSaber.visible=!1,this.openMenu("songs")}_onSessionEnd(){this.xrMode=!1,this._stopSong(),this._setIdle(),this.hooks.onExitToPage?.()}exitToPage(){let t=this.renderer.xr.getSession();if(t){t.end();return}this._stopSong(),this._setIdle(),this.hooks.onExitToPage?.()}_setIdle(){this.state="idle",this.menu.visible=!1,this.hudLeft.visible=this.hudRight.visible=!1,this.mouseSaber.visible=!1}_applyVolumes(){this.audio.setVolumes(this.settings.music,this.settings.sfx)}_saveSettings(){this._applyFx(),this.library.autoLevels=this.settings.autoLevels!==!1,Ou(Qp,this.settings),this.audio.offsetSec=this.settings.offsetMs/1e3;for(let t of this.controllers)t.saber?.setTilt(this.settings.tiltDeg);this._applyVolumes()}_onTrigger(t){if(this.state==="calibrate"){this._clickUi(t)||this._calibTap();return}this.menu.visible&&this._clickUi(t)}_rayFor(t){if(t){t.ctrl.updateMatrixWorld(!0);let e=t.ctrl.matrixWorld,i=new D().setFromMatrixPosition(e),n=new D(0,0,-1).transformDirection(e);this.raycaster.set(i,n)}else this.raycaster.setFromCamera(this.mouse,this.camera);return this.raycaster}_pointAt(t){if(!this.menu.visible)return null;let e=this._rayFor(t).intersectObject(this.menu.mesh,!1)[0];return e?{hit:e,button:this.menu.hitTest(e.uv)}:null}_clickUi(t){let e=this._pointAt(t);return e?.button?(this.audio.play("blip",.6),e.button.onClick(),!0):!1}_updatePointers(){let t=this.menu.visible,e=null;if(this.xrMode)for(let i of this.controllers){let n=t&&!!i.source;if(i.laser.visible=n,i.cursor.visible=!1,!n)continue;let r=this._pointAt(i);r?(i.laser.scale.z=r.hit.distance,i.cursor.position.copy(r.hit.point),i.cursor.visible=!0,r.button&&(e=r.button.id)):i.laser.scale.z=4}else if(t){let i=this._pointAt(null);i?.button&&(e=i.button.id),this.renderer.domElement.style.cursor=e?"pointer":"default"}t&&this.menu.setHover(e)}_pollButtons(){if(this.xrMode)for(let t of this.controllers){let e=t.source?.gamepad;if(!e||t.source.handedness!=="left")continue;let i=!1;for(let n=7;n<e.buttons.length;n++)e.buttons[n]?.pressed&&(i=!0);i&&!t.lastMenu&&this.togglePause(),t.lastMenu=i}}_updateMouseSaber(){this.raycaster.setFromCamera(this.mouse,this.camera);let t=this.raycaster.ray.origin,e=this.raycaster.ray.direction,i=t.clone().addScaledVector(e,1.6),n=t.clone().addScaledVector(e,.35).add(new D(0,-.3,0));this.mouseRig.position.copy(n),this.mouseRig.lookAt(n.clone().multiplyScalar(2).sub(i)),this.mouseRig.updateMatrixWorld(!0)}openMenu(t="songs"){if(this.world.useMenuShow(),this.world.setMapLights(!1),this.state="menu",this.screen=t,this.hudLeft.visible=this.hudRight.visible=!1,t!=="bsmap"&&this.bs.stopPreview(),t!=="song"&&(this._stopSongPreview(),this.confirmRemove=null),this.menu.show(e=>this._drawMenu(e)),t==="song"){this.bs.client.detect().then(()=>this._redrawMenu()),this._startSongPreview(this.selectedSong);let e=this.selectedSong;e?.prepareAutoLevels&&this.settings.autoLevels!==!1&&e.prepareAutoLevels().then(()=>{this.screen==="song"&&this.selectedSong===e&&this._redrawMenu()})}t==="browse"&&this.bs.client.detect().then(()=>{this.bs.open(),this._redrawMenu()})}_redrawMenu(){this.menu.visible&&this.menu.redraw()}async _startSongPreview(t){if(!t||this.previewSongId===t.id)return;this._stopSongPreview();let e=this.previewSongId=t.id;try{await this.audio.init();let i=await(t.loadAudio?t.loadAudio():t.load(t.difficulties[0].name).then(n=>n.buffer));if(this.previewSongId!==e||this.state!=="menu"||this.screen!=="song")return;this.audio.playPreview(i,t.previewStart||0,t.previewDuration>3?t.previewDuration:12),this._songPreview=this.audio.preview}catch(i){console.warn("Preview failed",i)}}_stopSongPreview(){this.previewSongId=null,this._songPreview&&this.audio.preview===this._songPreview&&this.audio.stopPreview(),this._songPreview=null}async _removeSong(t){if(this.confirmRemove!==t.id){this.confirmRemove=t.id,this.removeError="",this._redrawMenu();return}this.confirmRemove=null;try{if(t.fromFolder){let e=await fetch(`/__neon/delete?${new URLSearchParams({folder:t.folder})}`),i=await e.json().catch(()=>({}));if(!e.ok||!i.ok)throw new Error(i.error||`Remove failed (${e.status}).`);this.library.forget(t)}else await this.library.remove(t.id);this._stopSongPreview(),this.selectedSong=null,this.hooks.onLibraryChange?.(),this.openMenu("songs")}catch(e){this.removeError=e.message||String(e),this._redrawMenu()}}_drawMenu(t){this.screen==="songs"?this._drawSongs(t):this.screen==="song"?this._drawSong(t):this.screen==="settings"?this._drawSettings(t):this.screen==="browse"?this.bs.drawBrowse(t):this.screen==="bsmap"?this.bs.drawMap(t):this.screen==="keyboard"&&this.bs.drawKeyboard(t)}_header(t,e,i){t.text(e,64,104,{size:64,weight:700,spacing:2}),i&&t.text(i,66,148,{size:28,color:mt.dim})}_drawSongs(t){this._header(t,"NEON SLICE","Choose a song"),t.button("beatsaver",600,60,296,76,"BeatSaver",()=>this.openMenu("browse"),{accent:mt.gold}),t.button("settings",920,60,296,76,"Settings",()=>this.openMenu("settings"));let e=this.library.songs;if(!e.length){t.text("No songs yet",640,380,{size:44,weight:600,align:"center"}),t.text("Get maps with the BeatSaver button above, or add them on the start page.",640,430,{size:26,color:mt.dim,align:"center"});return}let i=6,n=Math.max(1,Math.ceil(e.length/i));this.page=Math.min(this.page,n-1);let r=e.slice(this.page*i,this.page*i+i),o=80,a=6,l=178;r.forEach((c,h)=>{let u=l+h*(o+a),d=this._bestFor(c.id);t.button(`song-${c.id}`,64,u,1152,o,"",()=>{this.selectedSong=c,this.selectedDiff=c.difficulties[Math.min(1,c.difficulties.length-1)].name,this.openMenu("song")},{accent:`#${new dt().setHSL(c.hue/360,.9,.6).getHexString()}`}),this._drawCover(t,c,76,u+8,o-16),t.text(t.fit(c.title,720,30,600),166,u+36,{size:30,weight:600}),t.text(t.fit(`${c.artist||"Unknown artist"}  \xB7  mapped by ${c.mapper||"unknown"}`,720,22),166,u+66,{size:22,color:mt.dim}),t.text(`${Math.round(c.bpm)} BPM`,1196,u+36,{size:24,color:mt.dim,align:"right"}),d&&t.text(`Best ${d.toLocaleString()}`,1196,u+66,{size:22,color:mt.gold,align:"right"})}),n>1&&(t.button("prev",64,708,180,64,"\u2039 Prev",()=>{this.page=(this.page-1+n)%n,this._redrawMenu()}),t.text(`${this.page+1} / ${n}`,340,750,{size:28,color:mt.dim,align:"center"}),t.button("next",436,708,180,64,"Next \u203A",()=>{this.page=(this.page+1)%n,this._redrawMenu()})),t.text(`${e.length} ${e.length===1?"song":"songs"}`,1216,750,{size:24,color:mt.faint,align:"right"})}_drawCover(t,e,i,n,r){let o=t.g;if(e.cover&&(e._img||(e._img=new Image,e._img.onload=()=>this._redrawMenu(),e._img.src=e.cover),e._img.complete&&e._img.naturalWidth)){o.save(),o.beginPath(),o.roundRect?o.roundRect(i,n,r,r,12):o.rect(i,n,r,r),o.clip(),o.drawImage(e._img,i,n,r,r),o.restore();return}let a=o.createLinearGradient(i,n,i+r,n+r);a.addColorStop(0,`hsl(${e.hue}, 90%, 55%)`),a.addColorStop(1,`hsl(${(e.hue+60)%360}, 90%, 30%)`),t.rect(i,n,r,r,a,12),t.text(e.title.slice(0,1).toUpperCase(),i+r/2,n+r/2+2,{size:Math.round(r*.55),weight:700,align:"center",baseline:"middle"})}_drawSong(t){let e=this.selectedSong;if(!e){this.screen="songs",this._drawSongs(t);return}t.button("back",64,48,180,70,"\u2039 Back",()=>this.openMenu("songs")),this._drawCover(t,e,64,150,200),t.text(t.fit(e.title,860,56,700),300,200,{size:56,weight:700}),t.text(t.fit(e.artist||"Unknown artist",860,32),300,248,{size:32,color:mt.dim}),t.text(t.fit(`Mapped by ${e.mapper||"unknown"}  \xB7  ${Math.round(e.bpm)} BPM`,860,28),300,296,{size:28,color:mt.faint}),this._drawHistory(t,e,this.selectedDiff,300,326),t.text("DIFFICULTY",64,410,{size:24,color:mt.dim,spacing:4});let i=e.difficulties.length,n=Math.min(260,(1152-(i-1)*16)/i);if(e.difficulties.forEach((r,o)=>{let a=this._bestFor(e.id,r.name),l=r.auto?a?`Auto \xB7 ${a.toLocaleString()}`:"Auto \xB7 from "+(r.from==="ExpertPlus"?"Expert+":r.from):a?`Best ${a.toLocaleString()}`:`NJS ${r.njs}`;t.button(`diff-${r.name}`,64+o*(n+16),430,n,110,r.label,()=>{this.selectedDiff=r.name,this._redrawMenu()},{selected:this.selectedDiff===r.name,size:34,sub:t.fit(l,n-20,21),accent:r.auto?mt.edge:mt.gold})}),t.button("play",64,600,520,120,"Play",()=>this.startSong(e,this.selectedDiff),{size:52,accent:mt.good}),!e.builtIn){let r=!e.fromFolder||this.bs.client.mode==="launcher",o=this.confirmRemove===e.id;t.button("remove",616,600,340,120,o?"Tap again":"Remove",()=>this._removeSong(e),{size:40,accent:mt.bad,selected:o,disabled:!r,sub:o?e.fromFolder?"to send it to the Recycle Bin":"to remove it":null});let a=this.removeError||(r?"":"In your Songs folder: delete it there, or remove it here when using the PC launcher.");a&&t.text(t.fit(a,1150,22),64,760,{size:22,color:this.removeError?mt.bad:mt.faint})}}_drawSettings(t){let e=this.settings;t.button("back",64,48,180,70,"\u2039 Back",()=>this.openMenu("songs")),t.text("SETTINGS",290,104,{size:56,weight:700,spacing:2});let i=(o,a,l)=>t.button(`tab-${o}`,l,48,180,70,a,()=>{this.settingsTab=o,this._redrawMenu()},{selected:this.settingsTab===o,accent:mt.edge,size:30});i("general","General",640),i("visuals","Visuals",832),i("feel","Feel",1024);let n=o=>()=>{o(),this._saveSettings(),this._redrawMenu()};if(this.settingsTab==="feel"){let o=(u,d,f,m,_,p,g)=>{t.text(f,64,u+46,{size:34,weight:600}),g&&t.text(g,64,u+82,{size:22,color:mt.faint}),t.button(`${d}-prev`,620,u,90,76,"\u2039",_,{size:44}),t.text(m,890,u+50,{size:34,align:"center",weight:600}),t.button(`${d}-next`,1082,u,90,76,"\u203A",p,{size:44})},a=(u,d,f)=>n(()=>{e[u]=d[(d.indexOf(e[u])+f+d.length)%d.length]}),l=["off","short","normal","long"];o(160,"trail","Saber trail",{off:"Off",short:"Short",normal:"Normal",long:"Long"}[e.trail]||"Normal",a("trail",l,-1),a("trail",l,1)),o(270,"hitsound","Hit sound",e.hitSound==="classic"?"Classic":"New",a("hitSound",["new","classic"],-1),a("hitSound",["new","classic"],1),"Layered, and placed where you cut"),t.button("hit-test",470,270,130,76,"Play",()=>this._playHit(new D((Math.random()-.5)*2,1,-1),1),{size:28}),((u,d,f,m,_,p)=>{t.button(u,d,f,540,72,`${m}: ${e[_]?"On":"Off"}`,n(()=>{e[_]=!e[_]}),{selected:!!e[_],accent:mt.gold,size:28}),p&&t.text(p,d+4,f+104,{size:22,color:mt.faint,maxWidth:530})})("arcs",64,400,"Arcs","arcs","Curves that guide your swing; follow them to feel a buzz"),t.button("autolevels",632,400,540,72,`Easier levels: ${e.autoLevels!==!1?"On":"Off"}`,n(()=>{e.autoLevels=e.autoLevels===!1}),{selected:e.autoLevels!==!1,accent:mt.gold,size:28}),t.text("Makes missing Easy, Normal and Hard levels from a harder one",636,504,{size:22,color:mt.faint,maxWidth:530});return}if(this.settingsTab==="visuals"){let o=(d,f,m,_,p,g,y)=>{t.text(m,64,d+46,{size:34,weight:600}),y&&t.text(y,64,d+82,{size:22,color:mt.faint}),t.button(`${f}-prev`,620,d,90,76,"\u2039",p,{size:44}),t.text(_,890,d+50,{size:34,align:"center",weight:600}),t.button(`${f}-next`,1082,d,90,76,"\u203A",g,{size:44})},a=(d,f,m)=>n(()=>{e[d]=f[(f.indexOf(e[d])+m+f.length)%f.length]});o(150,"theme","Environment",Cp[e.theme]||"Neon Tunnel",a("theme",nm,-1),a("theme",nm,1)),o(250,"stagecol","Stage colours",Db[e.stageColors],a("stageColors",sm,-1),a("stageColors",sm,1),"Lights only. Notes and sabers stay red and blue.");let l=(d,f,m,_,p,g=!1)=>{let y=g?!e[p]:!!e[p];t.button(d,f,m,540,72,`${_}: ${y?"On":"Off"}`,n(()=>{e[p]=!e[p]}),{selected:y,accent:mt.gold,size:28})};l("musicfx",64,352,"Music-reactive","musicFx"),l("playfx",632,352,"Play-reactive","playFx"),l("runway",64,434,"Runway lights","runway"),l("flyby",632,434,"Fly-by arches","flyby"),l("beatsync",64,516,"Beat-synced motion","beatSync"),l("skyline",632,516,"Far skyline","skyline"),l("intro",64,598,"Intro & outro","introFx"),t.button("lowfx",632,598,540,72,`Effects: ${e.lowFx?"Low":"Full"}`,n(()=>e.lowFx=!e.lowFx),{selected:!e.lowFx,accent:mt.gold,size:28}),t.button("flash",64,680,540,72,`Light flashes: ${e.softFlash?"Soft":"Full"}`,n(()=>e.softFlash=!e.softFlash),{selected:!e.softFlash,accent:mt.gold,size:28});let c=e.mapLights?Math.round((e.mapDark??1)*10):0;t.text("Map light shows",632,700,{size:26,weight:600}),t.text(c?`${c*10}% dark`:"Off",1172,700,{size:24,color:c?mt.gold:mt.dim,align:"right"});let h=44,u=(540-11*h)/10;for(let d=0;d<=10;d++){let f=632+d*(h+u);t.button(`mapdark-${d}`,f,714,h,40,d===0?"\xD7":"",n(()=>{d===0?e.mapLights=!1:(e.mapLights=!0,e.mapDark=d/10)}),{size:22,selected:d>0&&d<=c,accent:mt.gold})}return}let r=(o,a,l,c,h,u)=>{t.text(a,64,o+46,{size:34,weight:600}),u&&t.text(u,64,o+82,{size:22,color:mt.faint}),t.button(`${a}-dec`,760,o,96,76,"\u2212",c,{size:44}),t.text(l,966,o+50,{size:36,align:"center",weight:600}),t.button(`${a}-inc`,1076,o,96,76,"+",h,{size:44})};r(160,"Audio offset",`${e.offsetMs} ms`,n(()=>e.offsetMs-=5),n(()=>e.offsetMs+=5),"Raise it if notes arrive before the beat"),t.button("calibrate",470,160,260,76,"Calibrate",()=>this.startCalibration(),{size:30,accent:mt.gold}),r(270,"Saber angle",`${e.tiltDeg}\xB0`,n(()=>e.tiltDeg=Math.max(-45,e.tiltDeg-5)),n(()=>e.tiltDeg=Math.min(45,e.tiltDeg+5)),"Tilts the blade up or down from the controller"),r(380,"Music volume",`${Math.round(e.music*100)}%`,n(()=>e.music=Math.max(0,+(e.music-.1).toFixed(2))),n(()=>e.music=Math.min(1,+(e.music+.1).toFixed(2)))),r(490,"Effects volume",`${Math.round(e.sfx*100)}%`,n(()=>e.sfx=Math.max(0,+(e.sfx-.1).toFixed(2))),n(()=>e.sfx=Math.min(1,+(e.sfx+.1).toFixed(2)))),t.button("nofail",64,620,540,80,`No fail: ${e.noFail?"On":"Off"}`,n(()=>e.noFail=!e.noFail),{selected:e.noFail,accent:mt.gold,size:30}),t.button("haptics",632,620,360,80,`Vibration: ${e.haptics?"On":"Off"}`,n(()=>e.haptics=!e.haptics),{selected:e.haptics,accent:mt.gold,size:30}),t.button("haptics-test",1008,620,164,80,"Test",()=>this._testVibration(),{size:30}),this.vibrationResult&&t.text(this.vibrationResult,1172,740,{size:22,color:mt.dim,align:"right",maxWidth:1100})}_testVibration(){let t=this.controllers.map(e=>e.saber).filter(e=>e?.inputSource);if(!this.xrMode||!t.length)this.vibrationResult="Enter VR with both controllers to test vibration.";else{let e=t.filter(i=>i.pulse(.9,350)).length;this.vibrationResult=e?`Sent a pulse to ${e} controller${e>1?"s":""}. If you felt nothing, this browser blocks vibration.`:"This browser does not support controller vibration."}this._redrawMenu()}_drawHistory(t,e,i,n,r){let o=(this.history[`${e.id}:${i}`]||[]).filter(p=>!p.failed);if(!o.length){t.text("Not played yet on this difficulty",n,r+40,{size:24,color:mt.faint});return}let a=o.slice(-12),l=o.reduce((p,g)=>Math.max(p,g.pct),0),c=o[o.length-1];if(t.text(`${o.length} ${o.length===1?"play":"plays"}  \xB7  best ${l.toFixed(1)}%  \xB7  last ${c.pct.toFixed(1)}% ${c.rank}`,n,r+20,{size:24,color:mt.dim}),a.length<2)return;let h=t.g,u=420,d=36,f=r+32,m=Math.min(...a.map(p=>p.pct))-2,_=Math.max(...a.map(p=>p.pct))+2;h.beginPath(),a.forEach((p,g)=>{let y=n+u*g/(a.length-1),x=f+d*(1-(p.pct-m)/Math.max(1,_-m));g?h.lineTo(y,x):h.moveTo(y,x)}),h.strokeStyle=mt.gold,h.lineWidth=3,h.stroke()}_bestFor(t,e){if(e)return this.best[`${t}:${e}`]||0;let i=0;for(let[n,r]of Object.entries(this.best))n.startsWith(t+":")&&(i=Math.max(i,r));return i}async startSong(t,e){this.bs.stopPreview(),this._stopSongPreview(),this.menu.show(u=>{this._header(u,"Loading\u2026",t.title)});let i;try{i=await t.load(e)}catch(u){console.error(u),this.menu.show(d=>{this._header(d,"Could not load this song",String(u.message||u).slice(0,80)),d.button("back",64,600,300,90,"\u2039 Back",()=>this.openMenu("songs"))});return}this.current={song:t,diffName:e,data:i},this.oneSaber=!!t.oneSaber,this._resetRun();let n=this.camera.getWorldPosition(new D);this.gridX=this.xrMode?n.x:0,this.rowY0=Le.clamp(n.y*.5,.55,1.05),this.speed=i.njs,this.travel=nc(i.njs,i.bpm,i.njsOffset),this.beatLen=60/i.bpm,this.tempo=i.tempo||null,this.notes=i.notes,this.walls=i.walls,this.arcs=i.arcs||[];let r=this.notes.filter(u=>u.kind!==he.BOMB);this.noteCount=r.length,this.maxScore=Ep(r);let o=this.notes.length?this.notes[this.notes.length-1].time:0,a=this.walls.reduce((u,d)=>Math.max(u,d.endTime),0);this.songEnd=Math.max(o,a)+1.5,i.loop||(this.songEnd=Math.min(Math.max(this.songEnd,2),i.duration+.5));let l=this.notes.length?this.notes[0].time:2,c=!!(i.lights&&dp(i.lights));this.world.setMapLights(c&&this.settings.mapLights?this.settings.mapDark:0);let h=c?i.lights:rc({bpm:i.bpm,startSec:0,endSec:this.songEnd+2,introSec:Math.max(0,l-.6)});this.world.useSongShow(h),await this._applyStageColors(t,i),this.world.startIntro(),this.world.setCombo(1),this.world.setLowEnergy(0),this.music.reset(),this._worldMult=1,this.effects.clear(),this._lastMult=1,this.audio.offsetSec=this.settings.offsetMs/1e3,this.audio.playSong(i.buffer,{loop:i.loop,lead:.3}),this.menu.visible=!1,this.hudLeft.visible=this.hudRight.visible=!0,this.state="playing",this._hudKey=""}_resetRun(){this._clearTrack(),this.score=0,this.combo=0,this.maxCombo=0,this.health=mn.START,this.hits=0,this.wallHits=0,this.misses=0,this.badCuts=0,this.cutScoreSum=0,this.cutCount=0,this.linkHits=0,this.mult=new Lo,this.nextNote=0,this.nextWall=0,this.nextArc=0,this.timeline=[],this.failed=!1,this.popups.clear()}_clearTrack(){for(let t of this.activeNotes)this._removeNote(t);for(let t of this.activeWalls)this._removeWall(t);for(let t of this.activeArcs||[])this._removeArc(t);this.activeNotes=[],this.activeWalls=[],this.activeArcs=[],this.pendingCuts=[],this.popups.clear()}_stopSong(){this.audio.stopSong(.4),this._clearTrack(),this.audio.resume()}pause(){this.state==="playing"&&(this.state="paused",this.audio.pause(),this.menu.show(t=>{if(this._header(t,"PAUSED",this.current?.song.title),t.button("resume",64,240,560,110,"Resume",()=>this.resume(),{size:44,accent:mt.good}),t.button("restart",64,370,560,100,"Restart",()=>{this.audio.resume(),this.startSong(this.current.song,this.current.diffName)}),t.button("quit",64,490,560,100,"Song list",()=>{this._stopSong(),this.openMenu("songs")}),t.button("page",64,610,560,100,this.xrMode?"Exit VR":"Back to start page",()=>this.exitToPage()),t.text(this.xrMode?"Choose Resume to continue":"Press Esc to resume",680,300,{size:30,color:mt.dim}),this.xrMode&&this.lastHead){let e=this.lastHead;t.text(`Walls touched: ${this.wallHits||0}`,680,360,{size:26,color:mt.faint}),t.text(`Head ${e.x.toFixed(2)}, ${e.y.toFixed(2)}, ${e.z.toFixed(2)} m`,680,396,{size:22,color:mt.faint})}}))}async resume(){this.state==="paused"&&(this.menu.visible=!1,await this.audio.resume(),this.state="playing")}togglePause(){this.state==="playing"?this.pause():this.state==="paused"&&this.resume()}_finish(t){if(this.failed=t,t||(this.world.flashAll(2,1.6),this.effects.burst(Jt.white,1.4)),this.audio.stopSong(t?.2:1.5),this._clearTrack(),this.hudLeft.visible=this.hudRight.visible=!1,this.world.setLowEnergy(0),!t&&this.settings.introFx){this.state="outro",this.world.startOutro(),setTimeout(()=>{this.state==="outro"&&(this.world.endOutro(),this._showResults(t))},1700);return}this._showResults(t)}_showResults(t){var g;this.state="results";let e=this.current.song,i=this.current.diffName,n=this.maxScore?this.score/this.maxScore:0,r=t?"FAILED":vu(n),o=`${e.id}:${i}`,a=this.best[o]||0,l=!t&&this.score>a;l&&(this.best[o]=this.score,Ou(tm,this.best));let c=this.cutCount?Math.round(this.cutScoreSum/this.cutCount):0,h=this.noteCount?Math.round(100*this.hits/this.noteCount):0,u=(g=this.history)[o]||(g[o]=[]);u.push({at:Date.now(),score:this.score,pct:+(n*100).toFixed(2),rank:r,misses:this.misses,combo:this.maxCombo,avgCut:c,failed:!!t}),u.length>im&&u.splice(0,u.length-im),Ou(em,this.history);let d=this.timeline.slice().sort((y,x)=>y.t-x.t),f=Math.max(this.songEnd-1.5,d.length?d[d.length-1].t+1:10),m=e.difficulties.find(y=>y.name===i),_=(m?.label||i)+(m?.auto?" (auto)":""),p=this._nextSong(e);this.menu.show(y=>{this._header(y,y.fit(e.title,1100,64,700),`${_}${this.settings.noFail?"  \xB7  No fail":""}`),y.text(r,64,330,{size:t?96:150,weight:700,color:t?mt.bad:mt.gold,maxWidth:330}),y.text("SCORE",420,214,{size:24,color:mt.dim,spacing:3}),y.text(this.score.toLocaleString(),420,268,{size:52,weight:700});let x,v=mt.dim;l&&a?(x=`NEW BEST  +${(this.score-a).toLocaleString()}`,v=mt.gold):l?(x="FIRST CLEAR",v=mt.gold):a?x=`Best ${a.toLocaleString()}  (\u2212${(a-this.score).toLocaleString()})`:x="No best yet",y.text(x,420,308,{size:26,weight:600,color:v});let S=(E,R,M,C)=>{y.text(M,E,R,{size:22,color:mt.dim,spacing:3}),y.text(C,E,R+40,{size:36,weight:600})};S(820,214,"SCORE %",`${(n*100).toFixed(1)}%`),S(1040,214,"AVG CUT",`${c}`),S(420,352,"NOTES HIT",`${this.hits}/${this.noteCount} (${h}%)`),S(820,352,"MAX COMBO",String(this.maxCombo)),S(1040,352,"MISSED",`${this.misses}${this.badCuts?` +${this.badCuts}`:""}`),this._drawAccuracyGraph(y,d,f,64,450,1152,170),y.button("again",64,668,340,96,"Retry",()=>this.startSong(e,i),{accent:mt.good,size:38}),y.button("next",424,668,420,96,"Next song",()=>this.startSong(p.song,p.diff),{accent:mt.gold,size:38,sub:y.fit(p.song.title,380,22)}),y.button("list",864,668,352,96,"Song list",()=>this.openMenu("songs"),{size:38})})}_nextSong(t){let e=this.library.songs,i=Math.max(0,e.indexOf(t)),n=e[(i+1)%e.length]||t,r=["Easy","Normal","Hard","Expert","ExpertPlus"],o=r.indexOf(this.current?.diffName),a=n.difficulties.find(l=>l.name===this.current?.diffName);return a||(a=n.difficulties.slice().sort((l,c)=>Math.abs(r.indexOf(l.name)-o)-Math.abs(r.indexOf(c.name)-o))[0]),{song:n,diff:(a||n.difficulties[0]).name}}_drawAccuracyGraph(t,e,i,n,r,o,a){let l=t.g;t.text("ACCURACY THROUGH THE SONG",n,r-14,{size:20,color:mt.dim,spacing:3}),t.rect(n,r,o,a,"rgba(255,255,255,0.04)",12);let c=a-34,h=r+8,u=x=>h+c*(1-(x-.5)/.5);l.strokeStyle="rgba(255,255,255,0.08)",l.lineWidth=2;for(let x of[.6,.7,.8,.9,1])l.beginPath(),l.moveTo(n+48,u(x)),l.lineTo(n+o-12,u(x)),l.stroke(),t.text(`${Math.round(x*100)}`,n+38,u(x)+7,{size:18,color:mt.faint,align:"right"});let d=x=>n+48+(o-60)*Math.min(1,Math.max(0,x/i));if(!e.length){t.text("No notes played",n+o/2,r+a/2,{size:26,color:mt.faint,align:"center"});return}let f=[],m=140,_=Math.max(2,i/40);for(let x=0;x<=m;x++){let v=i*x/m,S=0,E=0;for(let R of e)Math.abs(R.t-v)<=_&&(S+=R.v,E++);E?f.push([d(v),u(Math.max(.5,S/E))]):f.push(null)}let p=l.createLinearGradient(0,h,0,h+c);p.addColorStop(0,"rgba(255,209,102,0.35)"),p.addColorStop(1,"rgba(255,209,102,0)");let g=[],y=()=>{if(g.length>1){l.beginPath(),l.moveTo(g[0][0],h+c);for(let[x,v]of g)l.lineTo(x,v);l.lineTo(g[g.length-1][0],h+c),l.closePath(),l.fillStyle=p,l.fill(),l.beginPath(),g.forEach(([x,v],S)=>S?l.lineTo(x,v):l.moveTo(x,v)),l.strokeStyle=mt.gold,l.lineWidth=4,l.stroke()}g=[]};for(let x of f)x?g.push(x):y();y();for(let x of e)!x.miss&&!x.bad||(l.fillStyle=x.miss?mt.bad:"#ff9a3d",l.fillRect(d(x.t)-2,r+a-22,4,16));t.text("misses",n+o-16,r+a-26,{size:16,color:mt.faint,align:"right"})}startCalibration(){this.world.useMenuShow(),this._clearTrack();let t=60/kb,e=Math.round(8*t*this.audio.ctx.sampleRate),i=this.audio.sfx.click.getChannelData(0),n=this.audio.ctx.createBuffer(1,e*4,this.audio.ctx.sampleRate),r=n.getChannelData(0),o=e/8;for(let a=0;a<32;a++){let l=Math.round(a*o);for(let c=0;c<i.length&&l+c<r.length;c++)r[l+c]+=i[c]*(a%4===0?1:.6)}this.calib={taps:[],beatLen:t,lastSpawn:-1},this.state="calibrate",this.rowY0=Le.clamp(this.camera.getWorldPosition(new D).y*.5,.55,1.05),this.gridX=0,this.speed=10,this.travel=1.2,this.audio.offsetSec=this.settings.offsetMs/1e3,this.audio.playSong(n,{loop:!0,lead:.3}),this._calibMarker(),this._drawCalib()}_calibMarker(){this.calibLine||(this.calibLine=new Ft(new ni(2.4,.03),new ge({color:16777215,transparent:!0,opacity:.6})),this.calibLine.rotation.x=-Math.PI/2,this.scene.add(this.calibLine))}_drawCalib(){let t=this.calib;this.menu.show(e=>{this._header(e,"CALIBRATE","Tap the trigger on every click"),e.text("Blocks should cross the white line exactly on the click.",64,230,{size:30}),e.text(`Taps: ${t.taps.length} / 12`,64,300,{size:34,weight:600}),t.suggested!==void 0&&e.text(`Measured: ${t.suggested} ms`,420,300,{size:34,color:mt.gold,weight:600}),e.text("Offset",64,430,{size:34,weight:600}),e.button("c-dec",300,380,110,80,"\u2212",()=>{this.settings.offsetMs-=5,this._saveSettings(),this._drawCalib()},{size:44}),e.text(`${this.settings.offsetMs} ms`,530,432,{size:40,weight:600,align:"center"}),e.button("c-inc",650,380,110,80,"+",()=>{this.settings.offsetMs+=5,this._saveSettings(),this._drawCalib()},{size:44}),e.button("c-reset",800,380,330,80,"Restart taps",()=>{t.taps=[],t.suggested=void 0,this._drawCalib()},{size:30}),e.button("c-done",64,640,400,96,"Done",()=>this._endCalibration(),{accent:mt.good}),e.text(this.xrMode?"Point away from this panel and pull the trigger to tap":"Press Space to tap",500,700,{size:26,color:mt.faint})}),this.menu.mesh.position.set(0,2.25,-2.6),this.menu.mesh.scale.setScalar(.7)}_calibTap(){let t=this.calib;if(!t)return;let e=this.audio.heardTime()-this.audio.songStart,i=e-Math.round(e/t.beatLen)*t.beatLen;if(t.taps.push(i),t.taps.length>12&&t.taps.shift(),t.taps.length>=6){let n=t.taps.slice().sort((o,a)=>o-a),r=n[Math.floor(n.length/2)];t.suggested=Math.round(r*1e3/5)*5,t.taps.length===12&&(this.settings.offsetMs=t.suggested,this._saveSettings())}this._drawCalib()}_endCalibration(){this.calib=null,this.audio.stopSong(.1),this._clearTrack(),this.calibLine&&(this.scene.remove(this.calibLine),this.calibLine=null),this.menu.mesh.position.set(0,1.45,-2.3),this.menu.mesh.scale.setScalar(1),this.openMenu("settings")}_updateCalibration(t){let e=this.calib;this.calibLine&&this.calibLine.position.set(0,.06,Bn);let i=Math.ceil((t+this.travel)/e.beatLen);if(i>e.lastSpawn){e.lastSpawn=i;let n=i%2;this._spawnNote({time:i*e.beatLen,kind:he.NOTE,hand:n,lane:n?2:1,row:0,dir:8,calib:!0})}for(let n=this.activeNotes.length-1;n>=0;n--){let r=this.activeNotes[n];this._placeNote(r,t),r.obj.position.z>lu&&(this._removeNote(r),this.activeNotes.splice(n,1))}}_laneX(t){return this.gridX+(t-1.5)*ri.LANE_W}_rowY(t){return this.rowY0+t*ri.ROW_H}_spawnNote(t){let e=t.kind===he.LINK,i=e?this.factory.makeLink(t):this.factory.makeNote(t);this.track.add(i);let n={note:t,obj:i,prev:null,cur:null,spin:e?0:(Math.random()<.5?-1:1)*Math.PI};!this.settings.lowFx&&!e&&(n.mirror=this.factory.makeReflection(t),this.mirrorTrack.add(n.mirror)),this._placeNote(n,this.audio.songTime()),n.prev=n.cur,this.activeNotes.push(n)}_removeNote(t){this.track.remove(t.obj),t.mirror&&this.mirrorTrack.remove(t.mirror)}_spawnArc(t){let e=[],i=Math.max(12,Math.min(60,Math.round((t.endTime-t.time)*30)));for(let r=0;r<=i;r++){let o=r/i,a=gu(t,o),l=(t.endTime-t.time)*o;e.push(new D(this._laneX(a.x),this._rowY(a.y),-l*this.speed))}let n=this.factory.makeArc(e,t.hand);this.track.add(n),this.activeArcs.push({arc:t,obj:n,held:0})}_removeArc(t){this.track.remove(t.obj),t.obj.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}_updateArcs(t,e){for(let i=this.activeArcs.length-1;i>=0;i--){let n=this.activeArcs[i],{arc:r}=n;n.obj.position.z=Bn-(r.time-t)*this.speed;let o=Le.clamp(1-(r.time-t-this.travel*.6)/(this.travel*.7),0,1),a=Le.clamp(1-(t-r.endTime)/.25,0,1),l=0;if(t>=r.time&&t<=r.endTime){let u=(t-r.time)/(r.endTime-r.time),d=gu(r,u),f=ve(this._laneX(d.x),this._rowY(d.y),Bn),m=this.activeSabers.find(_=>_.hand===r.hand);m&&hu(m.base,m.tip,f)<.3&&(l=1,Math.floor(e*12)!==Math.floor((e-1/60)*12)&&this._haptic(m,.15,30))}n.held+=(l-n.held)*.3;let[c,h]=n.obj.userData.mats;c.uniforms.opacity.value=(.75+.25*n.held)*o*a,h.uniforms.opacity.value=(.2+.2*n.held)*o*a,t-r.endTime>.3&&(this._removeArc(n),this.activeArcs.splice(i,1))}}_removeWall(t){this.track.remove(t.obj),t.mirror&&this.mirrorTrack.remove(t.mirror)}_placeNote(t,e){let i=t.note,n=i.time-e,r=Bn-n*this.speed,o=1-n/this.travel,a=Le.smootherstep(o,0,.3),l=Le.lerp(.1,this._rowY(i.row),a);t.obj.position.set(this._laneX(i.lane),l,r);let c=.55+.45*a;t.obj.scale.set(c,c,c),i.kind===he.BOMB?t.obj.rotation.set(e*1.3,e*.9,0):t.obj.rotation.set(0,0,t.obj.userData.finalAngle+(1-a)*t.spin),t.prev=t.cur,t.cur=ve(t.obj.position.x,t.obj.position.y,r),t.mirror&&(t.mirror.position.copy(t.obj.position),t.mirror.rotation.copy(t.obj.rotation),t.mirror.scale.copy(t.obj.scale))}_spawnWall(t){let e=this.factory.makeWall(),i=this._laneX(t.lane)-ri.LANE_W/2,n=i+t.width*ri.LANE_W,r=t.row<=0?0:this._rowY(t.row)-ri.ROW_H/2,o=Math.min(this._rowY(Math.min(t.row,2))-ri.ROW_H/2+t.height*ri.ROW_H,3.2),a=Math.max(.05,(t.endTime-t.time)*this.speed);e.scale.set(n-i,Math.max(.05,o-r),a);let l={wall:t,obj:e,x0:i,x1:n,y0:r,y1:o,depth:a};return this.track.add(e),this.settings.lowFx||(l.mirror=this.factory.makeWallReflection(),this.mirrorTrack.add(l.mirror)),this.activeWalls.push(l),l}_headPosition(){let t=this.xrFrame,e=this.renderer.xr.getReferenceSpace?.();if(t&&e)try{let i=t.getViewerPose(e);if(i){let n=i.transform.position;return new D(n.x,n.y,n.z)}}catch{}return this.camera.getWorldPosition(new D)}_updateSong(t,e,i){for(;this.nextNote<this.notes.length&&this.notes[this.nextNote].time-this.travel<=t;)this._spawnNote(this.notes[this.nextNote++]);for(;this.nextWall<this.walls.length&&this.walls[this.nextWall].time-this.travel<=t;)this._spawnWall(this.walls[this.nextWall++]);for(;this.nextArc<this.arcs.length&&this.arcs[this.nextArc].time-this.travel*1.3<=t;){let a=this.arcs[this.nextArc++];this.settings.arcs&&this._spawnArc(a)}this._updateArcs(t,e);let n=this.activeSabers;for(let a=this.activeNotes.length-1;a>=0;a--){let l=this.activeNotes[a];this._placeNote(l,t);let c=!1;if(l.cur.z>Ob){let h=this._findHit(l,n);h&&(this._onCut(l,h,e),c=!0)}if(!c&&l.cur.z>lu&&(l.note.kind!==he.BOMB&&this._onMiss(l),c=!0),this.state!=="playing")return;c&&(this._removeNote(l),this.activeNotes.splice(a,1))}let r=this._headPosition(),o=!1;for(let a=this.activeWalls.length-1;a>=0;a--){let l=this.activeWalls[a],c=-(l.wall.time-t)*this.speed,h=c-l.depth/2;l.obj.position.set((l.x0+l.x1)/2,(l.y0+l.y1)/2,h),l.mirror&&(l.mirror.position.copy(l.obj.position),l.mirror.scale.copy(l.obj.scale)),this.xrMode&&hp(r,ve(l.x0,l.y0,c-l.depth),ve(l.x1,l.y1,c),.05)&&(o=!0),c-l.depth>2&&(this._removeWall(l),this.activeWalls.splice(a,1))}if(this.vignette.material.opacity+=((o?.6:0)-this.vignette.material.opacity)*Math.min(1,i*12),o&&!this._wasInWall&&(this._log({ev:"wall",t:+t.toFixed(3)}),this.wallHits=(this.wallHits||0)+1,this.audio.play("bomb",.5)),this.lastHead=r,this._wasInWall=o,o){if(this._damage(mn.WALL_PER_SEC*i),this.combo>0&&(this.combo=0,this.mult.miss()),Math.floor(e*10)!==Math.floor((e-i)*10))for(let a of n)this._haptic(a,.6,90);if(this.state!=="playing")return}this.mult.value!==this._worldMult&&(this._worldMult=this.mult.value,this.world.setCombo(this.mult.value)),this.world.setLowEnergy(this.health<25&&!this.settings.noFail?(25-this.health)/25:0),this._updateHud(),t>this.songEnd&&this.nextNote>=this.notes.length&&this.activeNotes.length===0&&this._finish(!1)}_findHit(t,e){let i=t.note,n=i.kind===he.BOMB?Fb:i.kind===he.LINK?Bb:Ub,r=t.prev||t.cur,o=e.slice().sort((a,l)=>(l.hand===i.hand)-(a.hand===i.hand));for(let a of o)if(cp(a.prevBase,a.prevTip,a.base,a.tip,r,t.cur,n)>=0)return a;return null}_onCut(t,e,i){let n=t.note,r=t.cur,o=Sp({note:n,saberHand:e.hand,base:e.base,tip:e.tip,tipVel:e.vel,center:r}),a=new D(r.x,r.y,r.z);if(this._log({ev:"cut",t:+this.audio.songTime().toFixed(3),noteT:n.time,hand:n.hand,saber:e.hand,dir:n.dir,reason:o.reason,swing:[+o.swingDir.x.toFixed(2),+o.swingDir.y.toFixed(2)],speed:+Math.hypot(e.vel.x,e.vel.y).toFixed(2),z:+r.z.toFixed(2)}),n.kind===he.LINK){this._onLinkCut(t,e,o,a);return}if(this._spawnDebris(t,n,o,e),n.kind===he.BOMB){this.audio.play("bomb",.9),this.sparks.burst(a,new dt(1,.45,.15),this.settings.lowFx?30:70,4),this.effects.flash(a,new dt(1,.4,.1),2.2,.35),this.effects.cut(a,o.swingDir,new dt(1,.45,.15),1.4),this._haptic(e,1,200),this.badCuts++,this._breakCombo(),this.popups.spawn("BOMB",a,"#ff8a3d"),this._damage(mn.BOMB);return}let l=n.hand===xi.LEFT?Jt.left:Jt.right,c=new D(o.swingDir.x,o.swingDir.y,0);if(this.sparks.burst(a,l,this.settings.lowFx?14:30,2.6,c),!o.good){this.audio.play("bad",.8),this.effects.flash(a,new dt(1,.2,.25),1.2,.25),this._haptic(e,1,120),this.badCuts++,this.timeline.push({t:n.time,v:0,bad:!0}),this._breakCombo(),this.popups.spawn(o.reason==="TOO SLOW"?"TOO SLOW":"BAD CUT",a,mt.bad,52,o.reason==="TOO SLOW"?null:o.reason.toLowerCase()),this._damage(mn.BAD_CUT);return}this._playHit(a,n.hand),this._haptic(e,.6,35),this.world.kick(.4),this.effects.cut(a,o.swingDir,l,1),this.settings.playFx&&this.world.ripple(a.x,a.z,1);let h=e.tracker.preSwingAngle(o.axis),u=this.mult.value;this.mult.hit(),this.hits++,this.combo++,this._milestones(l),this.maxCombo=Math.max(this.maxCombo,this.combo),this.health=Math.min(100,this.health+mn.HIT);let d=n.chainHead?0:n.arcHead?30:null;this.pendingCuts.push({saber:e,pos:a,multiplier:u,note:n,prePts:n.arcTail?70:Mp(h),centerPts:o.centerPts,fixedPost:d,post:d===null?new lc(i,o.bladeDir,o.axis):null})}_onLinkCut(t,e,i,n){let r=t.note,o=r.hand===xi.LEFT?Jt.left:Jt.right;if(!i.good){this.audio.play("bad",.6),this.badCuts++,this.timeline.push({t:r.time,v:0,bad:!0}),this._breakCombo(),this._damage(mn.BAD_CUT);return}this.sparks.burst(n,o,this.settings.lowFx?6:12,1.8),this.effects.flash(n,o,.5,.12),this._playHit(n,r.hand,!0),this._haptic(e,.35,20),this.score+=20*this.mult.value,this.linkHits++,this.mult.hit(),this.hits++,this.combo++,this._milestones(o),this.maxCombo=Math.max(this.maxCombo,this.combo),this.health=Math.min(100,this.health+mn.HIT),this.timeline.push({t:r.time,v:1})}_milestones(t){if(this.mult.value>this._lastMult&&(this._lastMult=this.mult.value,this.effects.burst(Jt.violet,1),this.mult.value===8&&this.world.flashAll(2,1.2)),this.mult.value<this._lastMult&&(this._lastMult=this.mult.value),this.combo>0&&this.combo%50===0){this.world.flashAll(this.combo%100===0?2:t===Jt.left?0:1,1.5),this.effects.burst(Jt.white,1.3),this.popups.spawn(`${this.combo} COMBO`,new D(0,this.rowY0+1.4,-2.2),mt.gold,54);for(let e of this.activeSabers)this._haptic(e,.4,80)}}_checkClash(t){let e=this.activeSabers;if(e.length<2)return;let i=up(e[0].base,e[0].tip,e[1].base,e[1].tip);if(i.dist<.035&&t-(this._lastClash||0)>.06){this._lastClash=t;let n=new D(i.point.x,i.point.y,i.point.z);this.sparks.burst(n,Jt.white,8,1.8),this.effects.flash(n,Jt.white,.35,.1);for(let r of e)this._haptic(r,.25,20)}}_updatePendingCuts(t){for(let e=this.pendingCuts.length-1;e>=0;e--){let i=this.pendingCuts[e];if(i.post&&!i.post.update(t,i.saber.base,i.saber.tip))continue;let n=i.post?wp(i.post.angle):i.fixedPost,r=i.prePts+n+i.centerPts;this.timeline.push({t:i.note.time,v:r/xu(i.note)}),this.score+=r*i.multiplier,this.cutScoreSum+=r,this.cutCount++;let o=r>=115?mt.gold:r>=100?"#ffffff":r>=80?"#c9bdf0":"#8f84ad";this.popups.spawn(String(r),i.pos,o,r>=110?72:60,`${i.prePts} + ${n} + ${i.centerPts}`),this.pendingCuts.splice(e,1)}}_log(t){(this.debugLog||(this.debugLog=[])).push(t),this.debugLog.length>300&&this.debugLog.shift()}_onMiss(t){this._log({ev:"miss",t:+this.audio.songTime().toFixed(3),noteT:t.note.time,hand:t.note.hand,lane:t.note.lane,row:t.note.row}),this.misses++,this.timeline.push({t:t.note.time,v:0,miss:!0}),this._breakCombo(),this.audio.play("miss",.5);let e=t.cur;this.popups.spawn("MISS",new D(e.x,e.y,Bn),mt.bad),this._damage(mn.MISS)}_breakCombo(){this.combo=0,this.mult.miss()}_playHit(t,e,i=!1){let n=Le.clamp((t.x-(this.gridX||0))/1.2,-1,1)*.6,r=.97+Math.random()*.06;this.settings.hitSound==="classic"?this.audio.play("slice",i?.45:.9,0,{rate:i?1.4:1}):i?this.audio.play("link",.6,0,{pan:n,rate:r}):this.audio.play(`hit${Math.floor(Math.random()*3)}`,.95,0,{pan:n,rate:r})}_damage(t){this.health=Math.max(0,Math.min(100,this.health+t)),this.health<=0&&!this.settings.noFail&&this.state==="playing"&&this._finish(!0)}_haptic(t,e,i){this.settings.haptics&&t.pulse(e,i)}_spawnDebris(t,e,i,n){let r=this.factory.slice(t.obj,e,i.axis,n.base);for(let o of r){this.scene.add(o);let a=o.userData.side,l=o.userData.normal,c=l.clone().multiplyScalar(a*1.4).add(new D(i.swingDir.x,i.swingDir.y,0).multiplyScalar(1.6)).add(new D(0,.4,this.speed*.25)),h=new D(i.swingDir.x,i.swingDir.y,0).cross(l).normalize();h.lengthSq()<.5&&h.set(1,0,0),this.debris.push({mesh:o,vel:c,spinAxis:h,spin:a*(6+Math.random()*6),life:1})}}_updateDebris(t){for(let e=this.debris.length-1;e>=0;e--){let i=this.debris[e];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),i.mesh.geometry.dispose(),this.debris.splice(e,1);continue}i.vel.y-=7*t,i.mesh.position.addScaledVector(i.vel,t),i.mesh.rotateOnWorldAxis(i.spinAxis,i.spin*t);let n=Math.min(1,i.life/.35);i.mesh.scale.setScalar(n)}}_updateHud(){let t=this.maxScore?this.score/this.maxScore:0,e=`${this.score}|${this.combo}|${this.mult.value}|${this.mult.progress}|${Math.round(this.health)}`;e!==this._hudKey&&(this._hudKey=e,this.hudLeft.show(i=>{i.text("SCORE",40,70,{size:28,color:mt.dim,spacing:4}),i.text(this.score.toLocaleString(),40,150,{size:76,weight:700}),i.text(`${(t*100).toFixed(1)}%`,40,230,{size:44,weight:600,color:mt.gold}),i.text(this.failed?"":vu(t),470,230,{size:56,weight:700,align:"right",color:mt.gold}),i.text("ENERGY",40,292,{size:22,color:mt.dim,spacing:4}),i.rect(40,306,432,22,"rgba(255,255,255,0.12)",11);let n=this.health/100;i.rect(40,306,Math.max(22,432*n),22,n<.25?mt.bad:mt.good,11)}),this.hudRight.show(i=>{i.text("COMBO",40,70,{size:28,color:mt.dim,spacing:4}),i.text(String(this.combo),40,160,{size:92,weight:700});let n=i.g,r=380,o=190,a=90;n.lineWidth=16,n.strokeStyle="rgba(255,255,255,0.12)",n.beginPath(),n.arc(r,o,a,0,Math.PI*2),n.stroke(),n.strokeStyle=mt.edge,n.beginPath(),n.arc(r,o,a,-Math.PI/2,-Math.PI/2+Math.PI*2*this.mult.fill),n.stroke(),i.text(`\xD7${this.mult.value}`,r,o+4,{size:64,weight:700,align:"center",baseline:"middle"})}))}frame(t){this.xrFrame=t||null;let e=performance.now()/1e3,i=Math.min(.05,Math.max(0,e-this.lastT));this.lastT=e,!this.xrMode&&this.state!=="idle"&&this._updateMouseSaber();for(let h of this.activeSabers)h.sample(e,i);this.xrMode&&this._checkClash(e),this._pollButtons(),this._updatePointers();let n=.6;if(this.state==="playing"){let h=this.audio.songTime();this._updateSong(h,e,i),n=(h%this.beatLen+this.beatLen)%this.beatLen/this.beatLen}else if(this.state==="calibrate"){let h=this.audio.songTime();this._updateCalibration(h),this.calib&&(n=(h/this.calib.beatLen%1+1)%1)}else n=e*1%1;this._updatePendingCuts(e),this._updateDebris(i),this.sparks.update(i),this.popups.update(i),this.effects.update(i);let o=this.state==="playing"||this.state==="paused"||this.state==="calibrate"||this.state==="outro"?this.audio.songTime():e%600,a=null;if((this.state==="playing"||this.state==="outro")&&this.settings.musicFx){let h=this.audio.bins();h&&(a=this.music.update(h,this.audio.ctx.sampleRate,i))}let l=(this.state==="playing"||this.state==="paused"||this.state==="outro")&&this.tempo,c=l?this.tempo.secToBeat(o):e*1.6;this.world.update(i,{showTime:o,now:e,playing:this.state==="playing",speed:this.speed||10,beat:c,music:a,tempo:l?this.tempo:null}),this.state!=="playing"&&this.vignette.material.opacity>0&&(this.vignette.material.opacity=0),this.composer&&!this.renderer.xr.isPresenting&&!this.settings.lowFx?this.composer.render(i):this.renderer.render(this.scene,this.camera)}};var Li=s=>document.getElementById(s),di=new Pc(Li("scene"),{onExitToPage:()=>om()}),rm=Li("status");function bi(s,t=""){rm.textContent=s,rm.dataset.kind=t}function om(){document.body.classList.remove("in-game"),Li("start").hidden=!1,fr()}function am(){document.body.classList.add("in-game"),Li("start").hidden=!0}var Vo=Li("enter-vr");async function zb(){let s=Li("vr-note");if(!window.isSecureContext){Vo.disabled=!0,s.textContent="VR needs a secure (https) page. Open this game from an https address.";return}if(!navigator.xr){Vo.disabled=!0,s.textContent="This browser has no WebXR. On Quest 3, open this page in the Meta Quest Browser.";return}try{let t=await navigator.xr.isSessionSupported("immersive-vr");Vo.disabled=!t;let e=window.self!==window.top,i=/OculusBrowser|Quest/i.test(navigator.userAgent);t?s.textContent="Put on your headset and press Enter VR.":i||e?s.textContent="VR is blocked while this page is embedded. Open the self-hosted copy of Neon Slice to play in VR.":s.textContent="No VR headset found. Open this page in the Meta Quest Browser on your headset."}catch{Vo.disabled=!0,s.textContent='This page is not allowed to start VR here. Use the self-hosted copy (see "Playing on Quest").'}}zb();Vo.addEventListener("click",async()=>{try{am(),await di.startXR()}catch(s){console.error(s),om(),bi(`Could not start VR: ${s.message||s}`,"error")}});Li("play-desktop").addEventListener("click",async()=>{am(),await di.startDesktop()});var ku=Li("map-folder");ku.addEventListener("change",async()=>{let s=Array.from(ku.files||[]);if(ku.value="",!s.length)return;await di.audio.init(),bi(`Scanning ${s.length} files\u2026`);let{added:t,errors:e}=await di.library.importFolder(s);t.length?bi(`Added ${t.length} ${t.length===1?"song":"songs"}: ${t.map(i=>i.title).join(", ")}.${e.length?` Skipped ${e.length}: ${e[0]}`:""}`,"ok"):bi(e[0]||"No maps found in that folder.","error"),fr(),di._redrawMenu()});var zu=Li("map-file");zu.addEventListener("change",async()=>{let s=Array.from(zu.files||[]);zu.value="",s.length&&await lm(s)});var ur=Li("import");ur.addEventListener("dragover",s=>{s.preventDefault(),ur.classList.add("drag")});ur.addEventListener("dragleave",()=>ur.classList.remove("drag"));ur.addEventListener("drop",async s=>{s.preventDefault(),ur.classList.remove("drag");let t=Array.from(s.dataTransfer?.files||[]).filter(e=>/\.zip$/i.test(e.name));t.length&&await lm(t)});async function lm(s){await di.audio.init();let t=0;for(let e of s){bi(`Importing ${e.name}\u2026`);try{let i=await di.library.importZip(await e.arrayBuffer());t++,bi(`Added "${i.title}".`,"ok")}catch(i){console.error(i),bi(`${e.name}: ${i.message||i}`,"error")}}t>1&&bi(`Added ${t} maps.`,"ok"),fr()}function fr(){let s=Li("library");s.replaceChildren();let t=di.library.songs.filter(e=>!e.builtIn);Li("library-empty").hidden=t.length>0,t.sort((e,i)=>(i.fromFolder?1:0)-(e.fromFolder?1:0));for(let e of t){let i=document.createElement("li"),n=document.createElement(e.cover?"img":"span");n.className="cover",e.cover?(n.src=e.cover,n.alt=""):(n.style.setProperty("--h",e.hue),n.textContent=e.title.slice(0,1));let r=document.createElement("div");r.className="meta";let o=document.createElement("strong");o.textContent=e.title;let a=document.createElement("span");if(a.textContent=`${e.artist||"Unknown artist"} \xB7 ${e.difficulties.map(c=>c.label).join(", ")}`,r.append(o,a),e.fromFolder){let c=document.createElement("span");c.className="note",c.textContent="Songs folder",i.append(n,r,c),s.append(i);continue}let l=document.createElement("button");l.type="button",l.className="ghost",l.textContent="Remove",l.setAttribute("aria-label",`Remove ${e.title}`),l.addEventListener("click",async()=>{await di.library.remove(e.id),fr(),bi(`Removed "${e.title}".`)}),i.append(n,r,l),s.append(i)}}di.library.restore().then(()=>di.library.scanServerFolder()).then(async s=>{fr();let t=await di.bs.client.detect()==="launcher";if(s.length)bi(`Loaded ${s.length} ${s.length===1?"song":"songs"} from the Songs folder.`,"ok");else if(t)bi("Launcher connected. Your Songs folder is empty: get maps with the BeatSaver button in the game.","ok");else if(location.protocol!=="file:"){let e=(di.library.scanReport||[]).find(i=>/index\.json$/.test(i.url)&&/\/Songs\/index\.json$/.test(i.url)&&!/\/web\/Songs\//.test(i.url))||(di.library.scanReport||[])[0];e&&bi(`No songs found next to the game. Looked for ${e.url} (${e.result}). Upload the Songs folder with its index.json: double-click "Make song list.bat" on your PC to create it.`,"error")}else location.protocol==="file:"&&bi("This page was opened as a file, so it can't read your Songs folder or BeatSaver. Close it and double-click Play Neon Slice.bat instead.","error")});fr();})();

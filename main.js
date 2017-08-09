function GB2312UTF8(){
  this.Dig2Dec=function(s){
      var retV = 0;
      if(s.length == 4){
          for(var i = 0; i < 4; i ++){
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
  } 
  this.Hex2Utf8=function(s){
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16){
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" +  s.substring(4, 10); 
         tempS += "10" + s.substring(10,16); 
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++){
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
            retS += sss.charAt(this.Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(this.Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
  } 
  this.Dec2Dig=function(n1){
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++){
         n2 = Math.pow(2,3 - i);
         if(n1 >= n2){
            s += '1';
            n1 = n1 - n2;
          }
         else
          s += '0';
      }
      return s;      
  }

  this.Str2Hex=function(s){
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++){
         c = s.charAt(i);
         n = ss.indexOf(c);
         digS += this.Dec2Dig(eval(n));
      }
      return digS;
  }
  this.Gb2312ToUtf8=function(s1){
    var s = escape(s1);
    var sa = s.split("%");
    var retV ="";
    if(sa[0] != ""){
      retV = sa[0];
    }
    for(var i = 1; i < sa.length; i ++){
      if(sa[i].substring(0,1) == "u"){
        retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1,5)));
  if(sa[i].length){
    retV += sa[i].substring(5);
  }
      }
      else{
     retV += unescape("%" + sa[i]);
  if(sa[i].length){
    retV += sa[i].substring(5);
  }
   }
    }
    return retV;
  }
  this.Utf8ToGb2312=function(str1){
        var substr = "";
        var a = "";
        var b = "";
        var c = "";
        var i = -1;
        i = str1.indexOf("%");
        if(i==-1){
          return str1;
        }
        while(i!= -1){
    if(i<3){
                substr = substr + str1.substr(0,i-1);
                str1 = str1.substr(i+1,str1.length-i);
                a = str1.substr(0,2);
                str1 = str1.substr(2,str1.length - 2);
                if(parseInt("0x" + a) & 0x80 == 0){
                  substr = substr + String.fromCharCode(parseInt("0x" + a));
                }
                else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte
                        b = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        var widechar = (parseInt("0x" + a) & 0x1F) << 6;
                        widechar = widechar | (parseInt("0x" + b) & 0x3F);
                        substr = substr + String.fromCharCode(widechar);
                }
                else{
                        b = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        c = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        var widechar = (parseInt("0x" + a) & 0x0F) << 12;
                        widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
                        widechar = widechar | (parseInt("0x" + c) & 0x3F);
                        substr = substr + String.fromCharCode(widechar);
                }
     }
     else {
      substr = substr + str1.substring(0,i);
      str1= str1.substring(i);
     }
              i = str1.indexOf("%");
        }

        return substr+str1;
  }
}

$("#menuBackButton").click(() => {
  $("#menuMain").toggle(800);
  document.body.style.overflow = "visible";
  document.body.style.overflowX = "hidden";
});

$("#menuButton").click(() => {
  $("#menuMain").toggle(800);
  document.body.style.overflow = "hidden";
});

let videoIsPlaying = false;
$("#videoButton").click(() => {
  videoIsPlaying = !videoIsPlaying;
  $("#video").toggle(800);
  if(videoIsPlaying) {
    document.getElementsByTagName('video')[0].play();
    document.body.style.overflow = "hidden";  
    if ($("#menuMain").css('display') === "block") {
      $("#menuMain").toggle(800);
    }
  } else {
    document.getElementsByTagName('video')[0].pause();
    document.body.style.overflow = "visible";
    document.body.style.overflowX = "hidden";
  }
});

$("#closeVideo").click(() => {
  videoIsPlaying = !videoIsPlaying;
  $("#video").toggle(800);
  if(videoIsPlaying) {
    document.getElementsByTagName('video')[0].play();
    document.body.style.overflow = "hidden";  
    if ($("#menuMain").css('display') === "block") {
      $("#menuMain").toggle(800);
    }
  } else {
    document.getElementsByTagName('video')[0].pause();
    document.body.style.overflow = "visible";
    document.body.style.overflowX = "hidden";
  }
});

$("#videoContent").click(() => {
  $("#menuMain").toggle(800);
  videoIsPlaying = !videoIsPlaying;
  $("#video").toggle(800);
  if(videoIsPlaying) {
    document.getElementsByTagName('video')[0].play();
    document.body.style.overflow = "hidden";  
  } else {
    document.getElementsByTagName('video')[0].pause();
    document.body.style.overflow = "visible";
    document.body.style.overflowX = "hidden";
  }
})

function addClick(line) {
  let obj = $('#' + line + 'Direction');
  obj.click(() => {
    $('#' + line + 'Block').slideToggle();
  })
}

addClick("first");
addClick("second");
addClick("third");
addClick("fourth");

function setTitlePosition(line) {
  let title = $('#' + line + 'Title');
  let direction = $('#' + line + 'Direction');
  let block = $('#' + line + 'Block');

  title.css('left', block.offset().left + 'px');
  title.css('top', block.offset().top - 146 + 'px');
  direction.css('left', block.offset().left + 104 + 'px');
  direction.css('top', block.offset().top + 586 + 'px');
}

setTitlePosition("first");
setTitlePosition("second");
setTitlePosition("third");
setTitlePosition("fourth");


let cities = {};
let cityList = "北京市、上海市、广州市、深圳市、成都市、杭州市、武汉市、重庆市、南京市、天津市、苏州市、西安市、长沙市、沈阳市、青岛市、郑州市、大连市、东莞市、宁波市、厦门市、福州市、无锡市、合肥市、昆明市、哈尔滨市、济南市、佛山市、长春市、温州市、石家庄市、南宁市、常州市、泉州市、南昌市、贵阳市、太原市、烟台市、嘉兴市、南通市、金华市、珠海市、惠州市、徐州市、海口市、乌鲁木齐市、绍兴市、中山市、台州市、兰州市".split('、');
cityList = cityList.map((x) => {return x.split("市")[0]});

cities["大连市"] = "http://otwi5p3ox.bkt.clouddn.com/%E5%A4%A7%E8%BF%9E.bmp";

let trans = new GB2312UTF8();

trans.Gb2312ToUtf8("北京");

cityList.map((city) => {
  cities[city] = "http://otwi5p3ox.bkt.clouddn.com/" + trans.Gb2312ToUtf8(city) + ".bmp";
})

$("#searchButton").click(() => {
  let keyWord = $("#searchInput").val().replace('市', '');
  let imgURL = cities[keyWord];
  $("#cityDataImg").attr("src", imgURL);
})
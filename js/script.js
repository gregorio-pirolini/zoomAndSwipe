jQuery(document).ready(function ($) {
  console.log("javascript loads");

  //zoom!!
  var imgPosLeft;
  var imgPosTop;
  var imgWidth;
  var imgHeight;
  var prozent;

  var quotientWidth;
  var quotientHeight;
  var $bodyOffSetTop;
  var $newBodyOffSetTop;
  var $diffscroll;

  var topLarge;
  var leftLarge;

  var xUp;
  var yUp;
  var $name; //the name of pix hovered
  var hasTouch = false; //is it on tpouchscreen or monitor? SET TO NOT

  //to know if screen or laptop computer

  $("body").one("touchstart", function (e) {
    hasTouch = true;
    console.log("AM ON A SCRREN");
    $(this).off(".noTouch");
  });

  // ZOOM START
  
  $("body").on("mouseenter.noTouch", ".zoom img", function (e) {
    console.log("ready for zoom");

    if (hasTouch === true) {
      return;
    }

    var parentOffset = $(this).parent().offset();
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    // alert(` X ${relX} y ${relY}`);
    console.log(` X ${relX} y ${relY}`);

    xUp = e.pageX;
    yUp = e.pageY;
    $bodyOffSetTop = $(document).scrollTop();
    console.log("zoom Works");
    console.log("$bodyOffSetTop: " + $bodyOffSetTop);
    var src = $(this).attr("src");
    var lastIndex = src.lastIndexOf("-");
    $name = src.substring(0, lastIndex) + ".jpg";
    //alert(name);
    imgPosLeft = $(this).offset().left;
    imgPosTop = $(this).offset().top;
    //imgMarginTop= $('#content').height();
    //imgMarginTop=78;
    // console.log(imgMarginTop);
    console.log("imgPosLeft: " + imgPosLeft);
    console.log("imgPosTop: " + imgPosTop);
    imgWidth = $(this).width();
    imgHeight = $(this).height();
    //console.log('imgWidth: '+imgWidth);
    //console.log('imgHeight: '+imgHeight);
    createNewDiv($name); //put bigPix in div
    //show div
  });

  ////////////////////////////////

  $("body").on(
    "mousewheel.noTouch DOMMouseScroll.noTouch",
    ".zoom img",
    function (e) {
      // console.log('ready for zoom 2');
      if (hasTouch === true) {
        return;
      }

      //console.log('mousewheel DOMMouseScroll zoom 1')
      //   console.log('scroll');
      //   console.log('b4 scroll: '+ $bodyOffSetTop);
      //
      $newBodyOffSetTop = $(document).scrollTop();
      //console.log('after scroll: '+ $newBodyOffSetTop);
      // console.log('diff scroll: '+ ($bodyOffSetTop-$newBodyOffSetTop));
      $diffscroll = $bodyOffSetTop - $newBodyOffSetTop;
      $bodyOffSetTop = $newBodyOffSetTop;

      whereAmIFunction(true, $diffscroll, "mousewheel");
    }
  );
  ///////////////////////////

  $("body").on("mousemove.noTouch", ".zoom img", function (e) {
    console.log("mouse move");
    if (hasTouch === true) {
      console.log("i stop!!");
      return;
    }

    var parentOffset = $(this).parent().offset();
    // //or $(this).offset(); if you really just want the current element's offset
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    // alert(` X ${relX} y ${relY}`);
    // console.log(` X ${relX} y ${relY}`);
    var imgWidth = $(this).attr("width");
    var imgHeight = $(this).attr("height");
    imageQuotient = imgWidth / imgHeight;

    console.log("!!!!figureQuotient>imageQuotient");
    xUp = e.pageX;
    yUp = e.pageY;
    whereAmIFunction(false, "", e);

    // var ImgScrollWidth=
    // var ImgScrollHeight=

    xUp = e.pageX;
    yUp = e.pageY;
    console.log("imgWidth: " + imgWidth);
    console.log("imgHeight: " + imgHeight);
    console.log("imgPosLeft: " + imgPosLeft);
    console.log("imgPosTop: " + imgPosTop);
    console.log("xUp: " + xUp);
    console.log("yUp: " + yUp);

    whereAmIFunction(false, "", e);
  });

  ///////////////////////////
  $("body").on("mouseleave.noTouch", ".zoom img", function () {
    if (hasTouch === true) {
      return;
    }
    hideZoom("mouseleave");
  });
  ///////////////////////////

  //create new Div large

  function createNewDiv(name) {
    console.log("createNewDiv: " + name);
    //console.log('createNewDiv(name)')

    $("#large").css("background-image", "url(" + name + ")");
    //$('#large').css('background-image','url('+urlupload+'centerMe.png)');
    var img = new Image();
    img.src = name;
    //console.log(img.src);
    $(img).on("load", function () {
      var bgImgWidth = img.width;

      console.log("......createNewDiv w:" + bgImgWidth);
      prozent = bgImgWidth / imgWidth;
    });
  }

  function whereAmIFunction(scroll, pixels, e) {
    console.log(
      "...........................whereAmIFunction(scroll: " +
        scroll +
        ",pixels: " +
        pixels +
        ")"
    );
    //$('#bannerText').text('whereAmIFunction: '+scroll+", "+pixels+", "+from);
    if ($("#large").css("display") !== "block") {
      //alert('show');
      $("#large").show();
    }

    if (!scroll) {
      //console.log('not scroll');
      //y = e.pageY;
      //x =  e.pageX;
      //xUp = e.originalEvent.pageX;
      //yUp = e.originalEvent.pageY;
    } else {
      //console.log('scrolliiing: '+xUp+" "+yUp);
      yUp -= $diffscroll;
    }
    //$('#large').text(touchingMe+' x: '+x)//y-100
    //console.log('x:'+x);
    //        console.log('y:'+y);
    //
    //console.log($('#large').width());
    //    console.log ('imgPosLeft'+imgPosLeft);
    //     console.log ('imgWidth'+imgWidth);
    //     console.log ('imgPosTop'+imgPosTop);
    //     console.log ('imgHeight'+imgHeight);
    //     console.log ('x'+x);
    //     console.log ('y'+y);
    quotientWidth = 1 - (xUp - imgPosLeft) / (imgWidth / 2);
    quotientHeight = 1 - (yUp - imgPosTop) / (imgHeight / 2);

    // console.log('quotientWidth: '+quotientWidth +' quotientHeight: '+quotientHeight);
    //quotientWidth=1;
    //quotientHeight=1;
    var quotientWidth100 = 100 - 100 * quotientWidth;
    var quotientHeight100 = 100 - 100 * quotientHeight;
    var bgLeft = (imgPosLeft - xUp) * prozent + quotientWidth100;
    var bgTop = (imgPosTop - yUp) * prozent + quotientHeight100;

    topLarge = yUp - 100 + 80 * quotientHeight; //imgPosTop-100;//-(100*quotientHeight);
    // console.log('2 imgMarginTop: '+imgMarginTop);
    leftLarge = xUp - 100 + 80 * quotientWidth;
    //console.log('topLarge: '+topLarge);
    //console.log('leftLarge: '+leftLarge);
    $("#large")
      .css("top", topLarge) //y-100   .css('top',topLarge)
      .css("left", leftLarge) //-100
      .css("background-position", bgLeft + "px " + bgTop + "px ");

    console.log("top: " + topLarge + " left: " + leftLarge);
    console.log(
      "imgPosLeft: " +
        imgPosLeft +
        " imgPosTop: " +
        imgPosTop +
        " imgWidth: " +
        imgWidth +
        " imgHeight: " +
        imgHeight
    );

    if (
      xUp < imgPosLeft ||
      yUp < imgPosTop ||
      xUp > imgPosLeft + imgWidth ||
      yUp > imgPosTop + imgHeight
    ) {
      hideZoom("whereAmIFunction");
    }
  }

  function hideZoom(from) {
    console.log("hideZoom");
    $("#large").hide();
  }

  //SWIPE

  var xDown = null;
  var yDown = null;
  var theClickTime;
  var theClickTimeEnd;
  var minTime = 150;

  var classname = document.getElementsByClassName("swipeMich");

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener(
      "touchstart",
      function (someVar) {
        handleTouchstartTimo(someVar);
      },
      false
    );
    classname[i].addEventListener(
      "touchend",
      function (someVar) {
        handleTouchEndTimo(someVar);
      },
      false
    );
  }

  function handleTouchstartTimo(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
    var d = new Date();
    theClickTime = d.getTime();
    $("#swipeStart").html(theClickTime);

    console.log("xDown:" + xDown);
    console.log("yDown:" + yDown);
    $("#xTouchstartPos").html(xDown);
    $("#yTouchstartPos").html(yDown);
  }

  function handleTouchEndTimo(evt) {
    var timeDiffEnd;
    var d = new Date();
    theClickTimeEnd = d.getTime();
    $("#swipeEnd").html(theClickTimeEnd);
    console.log("----theClickTimeEnd-------" + theClickTimeEnd);
    timeDiffEnd = theClickTimeEnd - theClickTime;
    $("#swipeTime").html(timeDiffEnd);
    if (!xDown || !yDown) {
      return;
    }
    //   var xUp = evt.touches[0].clientX;
    //  var yUp = evt.touches[0].clientY;
    var xUp = evt.changedTouches[evt.changedTouches.length - 1].clientX;
    var yUp = evt.changedTouches[evt.changedTouches.length - 1].clientY;
    console.log("xUp:" + xUp);
    console.log("yUp:" + yUp);
    $("#xTouchendPos").html(xUp);
    $("#yTouchendPos").html(yUp);
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    $("#xDiff").html(Math.abs(xDiff));
    $("#yDiff").html(Math.abs(yDiff));
    console.log("-----------?????----");
    console.log("xDiff:" + Math.abs(xDiff));
    console.log("yDiff:" + Math.abs(yDiff));
    console.log("timeDiff:" + timeDiffEnd);
    console.log("---------???????????/------");

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        $("#swipeRichtung").html("left swipe");
        if (timeDiffEnd < minTime && Math.abs(xDiff) > 30) {
          console.log("CHANGE +");
          goOnePixMore();
        } else {
          $("#swipeRichtung").html("too slow for swipe");
          return;
        }
      } else {
        /* right swipe */
        console.log("* +++right swipe +++*");
        if (timeDiffEnd < minTime && Math.abs(xDiff) > 30) {
          console.log("CHANGE -");
          $("#swipeRichtung").html("right swipe");
          goOnePixless();
        } else {
          //zoom
          $("#swipeRichtung").html("too slow for swipe");
          return;
        }
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        if (timeDiffEnd < minTime) {
          $("#swipeRichtung").html("too slow for swipe");
          return;
        } else {
          $("#swipeRichtung").html("down swipe");
          /* down swipe */
          return;
        }
      } else {
        if (timeDiffEnd < minTime) {
          $("#swipeRichtung").html("too slow for swipe");
          return;
        } else {
          //zoom
          $("#swipeRichtung").html("up swipe");
          return;
        }
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  //swipe END

  function goOnePixMore() {
    var mysrc = $(".wp-image-341").attr("src");
    var newSrc;
    var srcset = $(".wp-image-341").attr("srcset");
    var newSrcset;
    if (mysrc.match("yellow")) {
      newSrc = mysrc.replace("yellow", "red");
      newSrcset = srcset.replace(/yellow/g, "red");
    } else {
      newSrc = mysrc.replace("red", "yellow");
      newSrcset = srcset.replace(/red/g, "yellow");
    }
    $(".wp-image-341").attr("src", newSrc);
    $(".wp-image-341").attr("srcset", newSrcset);
  }

  function goOnePixless() {
    var mysrc = $(".wp-image-341").attr("src");
    var newSrc;
    var srcset = $(".wp-image-341").attr("srcset");
    var newSrcset;
    if (mysrc.match("yellow")) {
      newSrc = mysrc.replace("yellow", "red");
      newSrcset = srcset.replace(/yellow/g, "red");
    } else {
      newSrc = mysrc.replace("red", "yellow");
      newSrcset = srcset.replace(/red/g, "yellow");
    }
    $(".wp-image-341").attr("src", newSrc);
    $(".wp-image-341").attr("srcset", newSrcset);
  }
}); // JavaScript Document

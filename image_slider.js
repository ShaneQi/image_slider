$(function() {
  //  Generate controller elements.
  var filler = '<div class="filler"></div>';
  var previousArrow = '<span class="previousArrow"><</span>';
  var nextArrow = '<span class="nextArrow">></span>';
  var description = '<span class="description">Description</span>';
  var pageContainer = '<div class="pageContainer"></div>';
  //  Declare elements variable.
  var is_container = $('ul.image_slider');
  var images = $('ul.image_slider li');
  //  Declare numberic variable.
  var imgCount = images.size();
  var currentImgIndex = 0;
  //  Initialize the slider.
  images.hide();
  is_container.prepend(filler);
  is_container.append(previousArrow);
  is_container.append(nextArrow);
  is_container.append(description);
  is_container.append(pageContainer);
  images.eq(currentImgIndex).show();
  $('ul.image_slider span.description').text(images.eq(currentImgIndex).children().first().attr('alt'));
  for (var i = 0; i < imgCount; i++) {
    $('ul.image_slider .pageContainer').append('<span class="pageBtn">' + (i+1) + '</span>');
  }
  //  Define click event.
  $('ul.image_slider span.previousArrow').click(function() {
    $(this).css({pointerEvents: 'none'});
    setPrevious(currentImgIndex);
    images.eq(currentImgIndex).animate({left:sliderWidth()}, 200);
    images.eq(previousIndex(currentImgIndex)).animate({left:'0px'}, 200, function() {
      currentImgIndex = previousIndex(currentImgIndex);
      $('ul.image_slider span.description').text(images.eq(currentImgIndex).children().first().attr('alt'));
      hideOtherImg(currentImgIndex);
      $('ul.image_slider span.previousArrow').css({pointerEvents: 'auto'});
    });
  });
  $('ul.image_slider span.nextArrow').click(function() {
    $(this).css({pointerEvents: 'none'});
    setNext(currentImgIndex);
    images.eq(currentImgIndex).animate({left:'-' + sliderWidth()}, 200);
    images.eq(nextIndex(currentImgIndex)).animate({left:'0px'}, 200, function() {
      currentImgIndex = nextIndex(currentImgIndex);
      $('ul.image_slider span.description').text(images.eq(currentImgIndex).children().first().attr('alt'));
      hideOtherImg(currentImgIndex);
      $('ul.image_slider span.nextArrow').css({pointerEvents: 'auto'});
    });
  });
  $('ul.image_slider .pageContainer span.pageBtn').each(function() {
    var tmpInt = parseInt($(this).text()) - 1;
    $(this).click(function() {
      currentImgIndex = tmpInt;
      $('ul.image_slider span.description').text(images.eq(currentImgIndex).children().first().attr('alt'));
      images.eq(currentImgIndex).show().css({left: '0'});
      hideOtherImg(currentImgIndex);
    });
  })
  //  Functions statements.
  //  set wait -> move -> hide others
  function setPrevious(i) {
    images.eq(previousIndex(i)).show().css({left: '-' + sliderWidth()});
  }
  function setNext(i) {
    images.eq(nextIndex(i)).show().css({left: sliderWidth()});
  }
  function previousIndex(i) {
    if (i==0) return imgCount - 1;
    return i-1;
  }
  function nextIndex(i) {
    if (i==imgCount - 1) return 0;
    return i+1;
  }
  function hideOtherImg(i) {
    for(var index = 0; index < imgCount; index++) {
      if (index != i) images.eq(index).hide();
    }
  }
  function sliderWidth() {
    return $('ul.image_slider').css('width');
  }
});

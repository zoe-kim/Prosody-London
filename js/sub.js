$(document).ready(function() {
  // 스크롤 내릴 시
  $(window).on('scroll', function () {
    const scrollY = $(this).scrollTop() + $(this).height()*2/3; // 전체 창의 2/3 정도 추가

    // top버튼 등장
    if (scrollY > $(this).height()*2/3) {
      $('.top_btn').fadeIn();
    }
    else {
      $('.top_btn').fadeOut();
    }
  });

  // .menu_wrap 열고 닫기
  const $menuwrap = $('#m_head .menu_wrap');
  $('#m_head .menu_open').on('click', function () {
    const $first =  $menuwrap.find('.first');
    const $last =  $menuwrap.find('.last');
    const $openBtn = $(this);

    // .menu_dim 생성 후 fadeTo로 서서히 나타내기
    $openBtn.after('<div class="menu_dim"></div>').next().stop().fadeTo('fast', 0.7);
    // .menu_wrap 우측에서 등장 애니메이션
    $menuwrap.css('visibility', 'visible').stop().animate({right: 0}, 300, function () {
      $first.focus(); // 상단 로고로 포커스 강제 이동
      $('html').css({overflowY: 'hidden', height: '100%'}); // .menu_wrap 내 스크롤바 없애기
    });

    // .menu_wrap 내 키보드 제어 접근성
    // 1) $first에서 shift+tab 눌러 이전으로 나가는 경우, $last로 포커스 이동
    $first.on('keydown', function (e) {
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $last.focus();
      }
    })
    // 2) $last에서 (shift 없이)tab만 눌러 다음으로 나가는 경우, $first로 포커스 이동
    $last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $first.focus();
      }
    });

    // .menu_wrap 닫기
    $menuwrap.find($last).on('click', function () {
      $('html').removeAttr('style'); // 화면에 스크롤바 다시 만들기
      $('.menu_dim').stop().fadeTo('slow', 0, function () {
        $(this).remove(); // .menu_dim을 fadeTo로 서서히 없앤 뒤, 완전히 제거
      });

      // .menu_wrap 우측으로 사라지는 애니메이션
      $menuwrap.stop().animate({right: '-100%'}, 300, function () {
        $(this).css('visibility', 'hidden');
        $openBtn.focus(); // 열기 버튼으로 포커스 강제 이동
      });
    });
  });
  
  // .top_btn 클릭 시 #cnt1로 이동
  $(".top_btn").on("click", function() {
    if (window.innerWidth > 1152) fullpage_api.moveTo(1);  // pc
    else $('html, body').stop().animate({scrollTop: 0}, 800);  // 태블릿, 모바일
    $('#cnt1').focus(); // 접근성을 위해 본문의 처음으로 포커스 강제 이동
  })
});
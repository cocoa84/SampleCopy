//drawer  - header -
$(document).ready(function () {
  $('.drawer').drawer();
});

//swiper  - results -
const swiper = new Swiper('.results__container .swiper', {
  loop: true,// 無限ループさせる
  slidesPerView: 'auto', // コンテナ内に表示させるスライド数（CSSでサイズ指定する場合は 'auto'）
  spaceBetween: 20, // スライド間の余白（px）

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',// ページネーション要素のクラス
    clickable: true,// クリックによるスライド切り替えを有効にする
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',// スクロールバー要素のクラス
  },

  autoplay: { // 自動再生させる
    delay: 3000, // 次のスライドに切り替わるまでの時間（ミリ秒）
    disableOnInteraction: false, // ユーザーが操作しても自動再生を止めない
    waitForTransition: false, // アニメーションの間も自動再生を止めない（最初のスライドの表示時間を揃えたいときに）
  },

  breakpoints: { // ブレークポイント
    768: {  // 画面幅768px以上で適用
      spaceBetween: 40,
    },
  },
});

//faqs
//Q and Aをアコーディオンでコーディング
jQuery('.faqs-box__q').on('click', function () {
  //クリックした隣の要素を開閉する / slideToggle()はslideUpとslideDownを交互に行う
  jQuery(this).next().slideToggle();
  //タイトルにopenクラスの追加、削除を行う / toggleClassはクラスの追加と削除を切り替える
  jQuery(this).children('.faqs-box__icon').toggleClass('is-open');
});

//スクロールに応じて表示する
jQuery(window).on('scroll', function () {//スクロール状態を検知するイベント
  if (100 < jQuery(this).scrollTop()) {
    //スクロールされた時
    jQuery('.to-top').addClass('is-show');
  } else {
    //スクロールされなかった時
    jQuery('.to-top').removeClass('is-show');
  }
});

//
$('.top__button').on('click', function () {
  $(this).toggleClass('.is-active');
});

new WOW().init();

//ページ内リンクとスムーススクロールのコーディング
jQuery('a[href^="#"]').on('click', function () {

  var header = jQuery('.header').innerHeight();//headerの高さを取得
  var id = jQuery(this).attr('href');
  var position = 0;
  if (id != '#') {//#以外は適用する。#(topへ戻るボタン)は０位置へ戻る
    position = jQuery(id).offset().top - header;//offsetは位置を取得。topよりheaderの高さを引く
  }
  jQuery('html,body').animate({
    scrollTop: position //topからの位置
  },
    300);
});

$(function () {
  //googleForm
  let $form = $("#js-form")
  $form.submit(function (e) {
    $.ajax({
      url: $form.attr('action'),
      data: $form.serialize(),
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //送信に成功したときの処理
          $form.slideUp()
          $("#js-success").slideDown()
        },
        200: function () {
          //送信に失敗したときの処理 
          $form.slideUp()
          $("#js-error").slideDown()
        }
      }
    });
    return false;
  });

  // form 
  (function () {
    let requireFlg = false;
    let privacyFlg = false;
    let $require = $('#js-form .js-require');
    let fillCount = 0;

    function setSubmitProp() {
      if (requireFlg && privacyFlg) {
        $('#js-submit').prop('disabled', false);
      } else {
        $('#js-submit').prop('disabled', true);
      }
    }

    // 必須項目
    $require.on('blur', function () {
      if ($(this).attr('id') === 'your-ruby' && !$(this).val().match(/^([ァ-ン]|ー)+$/)) {
        $(this).val('');
        alert('全角カタカナで入力してください。')
      }

      $require.each(function () {
        var value = $(this).val();

        if ((value !== '' && value.match(/[^\s\t]/))) {
          fillCount++;
        }
      });

      requireFlg = (fillCount === $require.length ? true : false);

      setSubmitProp();
      fillCount = 0;
    });

    // 個人情報保護方針
    $('#form__check').on('change', function () {
      privacyFlg = ($(this).prop('checked') ? true : false);
      setSubmitProp();
    });

    // 送信時
    $('#js-form').on('submit', function () {
      if (!(requireFlg && privacyFlg)) {
        alert('入力に誤りがあります。');
        return false;
      }
    });
  })();
})




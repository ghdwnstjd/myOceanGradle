const $confirmText = $("input[name=confirm]");
const $confirmBtn = $("button.kpRdoO");
const $todayBadgeClick = $("img.FripBadge__BadgeImage-sc-1symmx5-11");

console.log($todayBadgeClick);
// 카테고리 크기 미디어쿼리
checkWidth();


/*현재 파일 경로 찾기*/
/*console.log(window.location.pathname);*/

function checkWidth(){

    if(window.innerWidth<564){
        $(".ijXgoc > *").css("margin", "0 auto");
        $(".epAnZX").css("padding-left", "20px");
    } else{
        $(".ijXgoc > *").css("margin", "0 20px 0 0");
        $(".epAnZX").css("padding-left", "0px");
    }
}


$(window).resize(function(){
    if(window.innerWidth<564){
        $(".ijXgoc > *").css("margin", "0 auto");
        $(".epAnZX").css("padding-left", "20px");
    } else{
        $(".ijXgoc > *").css("margin", "0 20px 0 0");
        $(".epAnZX").css("padding-left", "0px");
    }
})

// 확인 버튼 활성화
$("input").on("input", function(){
    if($confirmText.val().length > 0){
        $confirmBtn.removeAttr("disabled");
    }else{
        $confirmBtn.attr("disabled", "disabled");
    }
});


// 오늘의 퀘스트 뱃지 눌렀을 때 이미지 색상 변경
$todayBadgeClick.on("click", function(){
    if($(this).attr("class").includes("uncheckedBadge")){
        $("img.FripBadge__BadgeImage-sc-1symmx5-11").attr("class", "FripBadge__BadgeImage-sc-1symmx5-11 fSDzSK");
        $(".completeWrap").show();
    } else{
        $("img.FripBadge__BadgeImage-sc-1symmx5-11").attr("class", "FripBadge__BadgeImage-sc-1symmx5-11 fSDzSK uncheckedBadge");
        $(".completeWrap").hide();
    }
})

/*===========================================================================*/
// $(".btn-tab").on("click",function(){
//     $("#__BVID__287___BV_modal_outer_").hide();
//     location.href="/myPoint/index";
// });
/*===========================================================================*/
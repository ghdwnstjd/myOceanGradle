const $save = $("button.jMUPmW");
const $nicknameInput = $("input[name=nickname]");
const $nickname = $(".gGztpV");
const $profilePicture = $(".iOgbWN");

// 카테고리 크기 미디어쿼리
checkWidth();

$(window).resize(function(){
    if(window.innerWidth<610){
        $(".dduMk").css({"gap": "0px", "justify-content": "space-between"});

    } else{
        $(".dduMk").css({"gap": "60px", "justify-content": "left"});
    }
})

function checkWidth(){
    if(window.innerWidth<610){
        $(".dduMk").css({"gap": "0px", "justify-content": "space-between"});
    } else{
        $(".dduMk").css({"gap": "60px", "justify-content": "left"});
    }
}


//닉네임 변경 input 클릭 시
$nickname.on("click", function(){
    $(this).css("border", "1px solid #b3d4fc");
})
//닉네임 변경 input 벗어났을 때
$nickname.on("blur", function(){
    $(this).css("border", "1px solid rgb(238, 238, 238)");
})

//닉네임 유효성 검사
// $save.on("click", function(){
//     //닉네임 입력하지 않았을 경우
//     if($nicknameInput.val()==0){
//         alert("닉네임을 입력해주세요.");
//         return;
//     }
// })


// 프로필 사진 변경
// $profilePicture.on("click", function(){
//     $(".fSxFPc").click();
// })

// 프로필 사진 썸네일 띄우기
// $(".fSxFPc").on("change", function(event) {
//     let file = event.target.files[0];
//     let reader = new FileReader();
//     reader.onload = function(e) {
//         $(".gFQPgt").attr("src", e.target.result);
//     }
//     reader.readAsDataURL(file);
// });






$(".fSxFPc").on("change", function(){
    let arrayFile =[];

    let formData = new FormData();
    let $inputFile = $("input[name='fSxFPc']");
    let files = $inputFile[0].files;

    Array.from(files).forEach(file => arrayFile.push(file));
    const dataTransfer = new DataTransfer();

    arrayFile.forEach(file => dataTransfer.items.add(file));
    $(this)[0].files = dataTransfer.files;

    $(files).each(function(i, file){
        formData.append("upload", file);
    });

    $.ajax({
        url: "/mypage/thumbnail",
        type: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function(result) {
            console.log(Object.values(result[0]));
            $('input[name=userFileName]').attr('value', Object.values(result[0])[7]);
            $('input[name=userFilePath]').attr('value', Object.values(result[0])[8]);
            $('input[name=userFileSize]').attr('value', Object.values(result[0])[9]);
            $('input[name=userFileUuid]').attr('value', Object.values(result[0])[10]);
            let imageSrc = "/mypage/display?fileName=" + Object.values(result[0])[8] + "/" + Object.values(result[0])[10] + "_" + Object.values(result[0])[7];
            console.log(Object.values(result));
            console.log(imageSrc);

            if($('input[name=userFileSize]').val()>100000){
                checkFileSize();
                return;
            }

            $('.image-header').show();
            $('.img-box').show();

            let text = "";
            text += `<li id="thumbnailImage" data-file-size="` + Object.values(result[0])[9] + `" data-file-name="` + Object.values(result[0])[7] + `" data-file-upload-path="` + Object.values(result[0])[8] + `" data-file-uuid="` + Object.values(result[0])[10] + `" style="list-style: none;width:100%;">`;
            text += `<img src=` + imageSrc + ` style="border-radius:50%" width="64px" height="64px">`;
            text+=`<div class="MyProfilePage__ImageCameraContainer-sc-162q6w5-5 elHCaO">
              <img class="MyProfilePage__CameraIamge-sc-162q6w5-6 epcUtq" src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.72386 3.05752L10.4714 3.80507C10.5964 3.93009 10.766 4.00032 10.9428 4.00033H12.6667C13.403 4.00033 14 4.59728 14 5.33366V11.3337C14 12.07 13.403 12.667 12.6667 12.667H3.33333C2.59695 12.667 2 12.07 2 11.3337V5.33366C2 4.59728 2.59695 4.00033 3.33333 4.00033H5.05719C5.234 4.00032 5.40357 3.93009 5.52859 3.80507L6.27614 3.05752C6.52619 2.80747 6.86533 2.66699 7.21895 2.66699H8.78105C9.13467 2.66699 9.47381 2.80747 9.72386 3.05752ZM10.6667 8.00033C10.6667 9.47308 9.47276 10.667 8 10.667C6.52724 10.667 5.33333 9.47308 5.33333 8.00033C5.33333 6.52757 6.52724 5.33366 8 5.33366C9.47276 5.33366 10.6667 6.52757 10.6667 8.00033ZM11.5 6.00024C11.7761 6.00024 12 5.77639 12 5.50024C12 5.2241 11.7761 5.00024 11.5 5.00024C11.2239 5.00024 11 5.2241 11 5.50024C11 5.77639 11.2239 6.00024 11.5 6.00024Z' fill='white'/%3E %3C/svg%3E"></div>`;
            text += `</li>`;

            $(".iOgbWN").html(text);

            $(".gFQPgt").hide();
        }
    });
});

//썸네일 삭제
$('.removeImg').on('click', function(){
    $('.image-header').hide();
    $('.img-box').attr('src', '');
    let uploadPath = $("#thumbnailImage").data("file-upload-path");
    let fileName = $("#thumbnailImage").data("file-uuid") + "_" + $("#thumbnailImage").data("file-name");

    $.ajax({
        url: "/mypage/delete",
        type: "post",
        data: {uploadPath: uploadPath, fileName: fileName},
        success: function(){
            $("#thumbnailImage").remove();
            $(".text-center.container.thumbnailPlus").show();
        }
    });
});









// 내 정보 저장
$(".jMUPmW").on("click", function(e){

    e.preventDefault();

    if($("input[name='nickname']").val()==""){
        checkNickname();
        return;
    }

    if($("input[name=communityFileName]").val()==""){
        checkThumbnail();
        return;
    }

    // changeInfo();

    // if($('input[name=userFileName]').val()){
    /*업데이트*/
    userSave.update({
        userFileName: $("input[name=userFileName]").val(),
        userFileUuid: $("input[name=userFileUuid]").val(),
        userFileSize: $("input[name=userFileSize]").val(),
        userFilePath: $("input[name=userFilePath]").val(),
        userNickname: $("input[name=nickname]").val()
    });
    // }

    // else{
    //     /*추가*/
    //     userSave.add({
    //         userFileName: $("input[name=userFileName]").val(),
    //         userFileUuid: $("input[name=userFileUuid]").val(),
    //         userFileSize: $("input[name=userFileSize]").val(),
    //         userFilePath: $("input[name=userFilePath]").val()
    //     })
    // }
});

// function changeInfo(){
//     $.ajax({
//         type:"post",
//         url:"/myPage/changeInfo",
//         headers:{"Content-Type":"application/json"},
//         data:$nicknameInput.val(),
//         success:function(){;},
//         error:function(){;}
//     })
// }

let userSave = (function(){
    function add(myPageContents, callback, error){
        $.ajax({
            url: "/mypage/index",
            async: false,
            type: "post",
            data: JSON.stringify(myPageContents),
            contentType: "application/json; charset=utf-8",
            success:checkSuccessAdd,
            error: function(xhr, status, err) {
                if(error){
                    error(err);
                }
            }
        });
    }
    function update(myPageContents, callback, error){

        $.ajax({
            url: "/mypage/update",
            async: false,
            type: "post",
            data: JSON.stringify(myPageContents),
            contentType: "application/json; charset=utf-8",
            success: checkSuccessUpdate,
            error: function(xhr, status, err){
                if(error){
                    error(err);
                }
            }
        });
    }

    return {add: add, update: update}
})();

/*===========================================================================*/
function checkSuccessUpdate() {
    $("div.modal-content").find("h2").text("수정완료");
    $("div.modal-content").find("span").text("회원님의 정보수정이 완료되었습니다.");
    $("#__BVID__287___BV_modal_outer_").show();
    $(".btn-tab").on("click", function () {
        $("#__BVID__287___BV_modal_outer_").hide();
        location.href="/myPage/index";
        return;
    });
}
function checkSuccessAdd() {
    $("div.modal-content").find("h2").text("등록완료");
    $("div.modal-content").find("span").text("회원님의 정보등록이 완료되었습니다.");
    $("#__BVID__287___BV_modal_outer_").show();
    $(".btn-tab").on("click", function () {
        $("#__BVID__287___BV_modal_outer_").hide();
        location.href="/myPage/index";
        return;
    });
}
function checkFileSize() {
    $("div.modal-content").find("h2").text("변경오류");
    $("div.modal-content").find("span").text("파일 사이즈는 10MB 이하여야합니다.");
    $("#__BVID__287___BV_modal_outer_").show();
    $(".btn-tab").on("click", function () {
        $("#__BVID__287___BV_modal_outer_").hide();
        return;
    });
}
function checkNickname() {
    $("div.modal-content").find("h2").text("변경오류");
    $("div.modal-content").find("span").text("닉네임을 입력해주세요.");
    $("#__BVID__287___BV_modal_outer_").show();
    $(".btn-tab").on("click", function () {
        $("#__BVID__287___BV_modal_outer_").hide();
        return;
    });
}
function checkThumbnail() {
    $("div.modal-content").find("h2").text("변경오류");
    $("div.modal-content").find("span").text("썸네일 이미지를 입력해주세요.");
    $("#__BVID__287___BV_modal_outer_").show();
    $(".btn-tab").on("click", function () {
        $("#__BVID__287___BV_modal_outer_").hide();
        return;
    });
}

/*===========================================================================*/
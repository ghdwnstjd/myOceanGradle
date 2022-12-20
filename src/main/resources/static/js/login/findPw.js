/* 이메일 정규식,input박스 입력값, uuid생성 및 url경로값 저장하는 변수선언 */
var emailRegex=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{3,4}$/;
var $inputemail=findForm.email;
var uuid=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c=>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c/4).toString(16));
var url=location.href;

/* 입력박스 클릭시 테두리 변경 */
$(findForm.email).on("click",function(){
    $(this).css("border","1px solid blue");
});

/* 아이디 입력박스 위치에서 다른 곳 클릭시 */
$(findForm.email).on("blur",function(e){
    $("input[name='email']").css("border","");
});

/* 이메일 입력값의 변화를 확인하는 부분 */
$(findForm.email).on("change input",function(){
    /* 이메일 정규식표현식 통과 못할시 */
    if(!emailRegex.test($inputemail.value)){
        $("input[name='email']").attr("class","Form__Input-sc-1quypp7-1 hYhAPw");
        $(".cIOZzg").text("올바른 이메일 형식이 아닙니다.");
        $(".cIOZzg").attr("class","Form__Description-sc-1quypp7-2 bViOzS");
        $("button[name='sendemail']").attr("disabled",true);
        $("button[name='sendemail']").attr("class","Button-bqxlp0-0 ppTTf");
    }
    /* 이메일 정규표현식 통과시 */
    else{
        $("input[name='email']").attr("class","Form__Input-sc-1quypp7-1 iRBMai");
        $(".bViOzS").text("재설정하려는 비밀번호의 아이디(이메일)를 입력해 주세요.");
        $(".bViOzS").attr("class","Form__Description-sc-1quypp7-2 cIOZzg");
        $("button[name='sendemail']").attr("disabled",false);
        $("button[name='sendemail']").attr("class","Button-bqxlp0-0 bGHqGe");
    }
});

$('button[name=sendemail]').on("click",function() {
    checkEmail();
});

function checkEmail(){
    $.ajax({
        type:"post",
        url:"checkUserEmail",
        headers:{"Content-Type":"application/json"},
        data:$inputemail.value,
        dataType:"text",
        success:function(result){
            if(result=="unavailable"){verifyEmail();}
            else{transferMail();}
        }
    })
}

function saveFindData(){
    var requestFindPw={"email":$inputemail.value,"uuid":uuid};
    $.ajax({
        type:"post",
        url:"requestSaveFind",
        headers:{"Content-Type":"application/json"},
        data:JSON.stringify(requestFindPw),
        dataType:"text",
        success:function(result){;},
        error:function(status,error){;}
    })
}

function verifyEmail() {
    $("div.modal-content").find("h2").text("작성 오류");
    $("div.modal-content").find("span").text("등록된 이메일이 아닙니다. 소셜 회원이라면 가입한 소셜로 로그인해주세요.");
    $("#__BVID__287___BV_modal_outer_").show();
    $(".btn-tab").on("click", function () {
        $("#__BVID__287___BV_modal_outer_").hide();
        return;
    });
}

// if(result=="unavailable"){alert("등록된 이메일이 아닙니다. 소셜 회원이라면 가입한 소셜로 로그인해주세요.");}
// else{transferMail();}
function refundPay(tag) {
    $.ajax({
        url: "refundRequest",
        type: "post",
        headers: {"Content-Type": "application/json"},
        data: $(tag).next().val(),
        dataType: "text",
        success: checkSuccess,
        //     {
        //     if (result == "success") {
        //         console.log(result);
        //         alert("포인트 환불신청이 완료되었습니다.");
        //         location.href = "/myPoint/index";
        //     }
        // }
        error(status, error) {
            console.log(status, error);
        }
    })
}

function checkSuccess() {
    $("div.modal-content").find("span").text("회원님의 환불요청이 접수되었습니다. \n 환불 소요기간은 최대 2~3일이 소요될 수 있습니다.");
    $("#__BVID__287___BV_modal_outer_").show();
    $(".btn-tab").on("click", function () {
        $("#__BVID__287___BV_modal_outer_").hide();
        location.href="/myPoint/index";
        return;
    });
}
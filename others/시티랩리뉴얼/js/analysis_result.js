var t_zone_data = {   
    datasets: [{
        label: '데이터',
        data: [{x: 10,y: 20}],
        backgroundColor: 'rgba(200, 200, 200, 0.8)',          
    }]
}


var ctx = document.getElementById('t_zone_chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'scatter',
    data: t_zone_data,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 60,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)' // grid 색상
                }
            },
            y: {
                type: 'linear',
                position: 'left',
                min: 0,
                max: 60,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)' // grid 색상
                }
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            }
        }
    }
});

function updatTZoneData(tzone_subun_result,tzone_ubun_result){
t_zone_data.datasets.data[0]=tzone_subun_result;
t_zone_data.datasets.data[1]=tzone_ubun_result;
t_zone_chart.update();
}




function setSkinScore(markvu, course_flg) {
    let score = 0;
    let list_avr_score_data = {};

    for (let str_gubun of str_list) {
        if (str_gubun !== "탄력") {
            let avr_value = getGubunByAverage(markvu, str_gubun);
            score = rl.getSkinConcernScore(LoginSession.SelectedMember.sex, LoginSession.SelectedMember.AgeReal, str_gubun, avr_value);
            list_avr_score_data[str_gubun] = score;
        } else {
            if (course_flg === "I") {
                let avr_value = getGubunByAverage(markvu, str_gubun);
                score = rl.getSkinConcernScore(LoginSession.SelectedMember.sex, LoginSession.SelectedMember.AgeReal, str_gubun, avr_value);
                list_avr_score_data[str_gubun] = score;
            }
        }
    }

    let rsr_list = new Result_SkinConcern_Rpt();
    rsr_list.pore = parseFloat(list_avr_score_data["모공"].toFixed(1));
    rsr_list.wrinkle = parseFloat(list_avr_score_data["주름"].toFixed(1));
    rsr_list.futurewrinkles = parseFloat(list_avr_score_data["미래주름"].toFixed(1));
    rsr_list.pigmentation = parseFloat(list_avr_score_data["색소침착"].toFixed(1));
    rsr_list.melanin = parseFloat(list_avr_score_data["멜라닌"].toFixed(1));
    rsr_list.transdermal = parseFloat(list_avr_score_data["경피수분손실도"].toFixed(1));
    rsr_list.redness = parseFloat(list_avr_score_data["붉은기"].toFixed(1));
    rsr_list.porphyrin = parseFloat(list_avr_score_data["포피린"].toFixed(1));
    rsr_list.elasticity = list_avr_score_data.length === 9 ? parseFloat(list_avr_score_data["탄력"].toFixed(1)) : 0;

    LoginSession.Result_SkinConcern_Rpt = rsr_list;
    skin_score = Math.floor(Object.values(list_avr_score_data).reduce((total, current) => total + current) / Object.keys(list_avr_score_data).length);
}







$(document).ready(function () {   
console.log('analysis_result page start -> ')
});


/** 
* 24.05. 13
* @description 
**/
$(document).ready(function () {
var surveyNo = $('#survey-value').val();
console.log("surveyNo : ", surveyNo);

$('#survey-value').on('input', function(){
    surveyNo = $(this).val();
    //console.log('입력된 Survey Value 값 : ',surveyNo);
})


$('#submit-button').click(function(){

    // #1 Scalp Type, Hair Conditions, hair Density Type 부분 API 값요청
    var ResultMarkvu_API_URL = 'http://127.0.0.1:8000/v1/skin/markvu/result/' + surveyNo;
    let markvu;
    $.ajax({
        url: ResultMarkvu_API_URL,
        type: 'GET',
        success: function(markvu){
            console.log('ResultMarkvu_API_URL2 응답 : ', markvu);    

            //T존
            var tzone_subun_value = markvu.FSubun_A;
            var tzone_ubun_value = (markvu.FSebum_A + markvu.FSebum_B) / 2;
            var t_zone_subun = tzone_subun_value;
            var t_zone_ubun = tzone_ubun_value;

            //U존
            var uzone_subun_value = (markvu.FSubun_G + markvu.FSubun_H) / 2;
            var uzone_ubun_value = (markvu.FSebum_G + markvu.FSebum_H) / 2;
            var u_zone_subun = uzone_subun_value;
            var u_zone_ubun = uzone_ubun_value;

            // console.log("t_zone_subun :",t_zone_subun );
            // console.log("t_zone_ubun :",t_zone_ubun );
            // console.log("u_zone_subun :",u_zone_subun );
            // console.log("u_zone_ubun :",u_zone_ubun );



            var tzone_subun_result = null;
            var tzone_ubun_result = null;

            //T존 수분위치
            if (tzone_subun_value < 20)
            {
                tzone_subun_result = "수분부족";
            }
            else if (20 <= tzone_subun_value && tzone_subun_value < 40)
            {
                tzone_subun_result = "수분적당";
            }
            else if (40 <= tzone_subun_value)
            {
                tzone_subun_result = "수분충분";
            }
            //T존 유분위치

            if (tzone_ubun_value < 9)
            {
                tzone_ubun_result = "유분부족";
            }
            else if (9 <= tzone_ubun_value && tzone_ubun_value < 19)

            {
                tzone_ubun_result = "유분적당";
            }
            else if (19 <= tzone_ubun_value)
            {
                tzone_ubun_result = "유분과다";
            }
            
            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분과다") { t_zone_position_num = 1; t_zone_result = "수분부족 유분과다 지성"; }
            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분적당") { t_zone_position_num = 2; t_zone_result = "수분 부족 건성"; }
            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분부족") { t_zone_position_num = 3; t_zone_result = "유수분 부족 건성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분과다") { t_zone_position_num = 4; t_zone_result = "유분 과다 지성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분적당") { t_zone_position_num = 5; t_zone_result = "유수분 균형 중성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분부족") { t_zone_position_num = 6; t_zone_result = "유분 부족 건성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분과다") { t_zone_position_num = 7; t_zone_result = "유분 과다 지성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분적당") { t_zone_position_num = 8; t_zone_result = "유수분 균형 중성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분부족") { t_zone_position_num = 9; t_zone_result = "유분 부족 건성"; }




            var uzone_subun_result = null;
            var uzone_ubun_result = null;

            //U존 수분위치
            if (uzone_subun_value < 20)
            {
                uzone_subun_result = "수분부족";
            }
            else if (20 <= uzone_subun_value && uzone_subun_value < 40)
            {
                uzone_subun_result = "수분적당";
            }
            else if (40 <= uzone_subun_value)
            {
                uzone_subun_result = "수분충분";
            }
            //U존 유분위치
            if (uzone_ubun_value <= 5.5)
            {
                uzone_ubun_result = "유분부족";
            }
            else if (5.5 < uzone_ubun_value && uzone_ubun_value < 12 )
            {
                uzone_ubun_result = "유분적당";
            }
            else if (12 <= uzone_ubun_value)
            {
                uzone_ubun_result = "유분과다";
            }

            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분과다") {  u_zone_position_num = 1; u_zone_result = "수분부족 유분과다 지성"; }
            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분적당") {  u_zone_position_num = 2; u_zone_result = "수분 부족 건성"; }
            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분부족") {  u_zone_position_num = 3; u_zone_result = "유수분 부족 건성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분과다") {  u_zone_position_num = 4; u_zone_result = "유분 과다 지성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분적당") {  u_zone_position_num = 5; u_zone_result = "유수분 균형 중성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분부족") {  u_zone_position_num = 6; u_zone_result = "유분 부족 건성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분과다") {  u_zone_position_num = 7; u_zone_result = "유분 과다 지성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분적당") {  u_zone_position_num = 8; u_zone_result = "유수분 균형 중성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분부족") {  u_zone_position_num = 9; u_zone_result = "유분 부족 건성"; }

            
            console.log("tzone_subun_result : ",tzone_subun_result);
            console.log("tzone_ubun_result : ",tzone_ubun_result);
            console.log("t_zone_result : ",t_zone_result);
            console.log("**************************");

            console.log("uzone_subun_result : ",uzone_subun_result);
            console.log("uzone_ubun_result : ",uzone_ubun_result);
            console.log("u_zone_result : ",u_zone_result);

            $('#t_zone_result').text(t_zone_result);
            $('#u_zone_result').text(u_zone_result);

            //updatTZoneData(tzone_subun_result, tzone_ubun_result);

           



        },
        error: function(xhr, status, error){

            console.error('에러 : ', error);
        }            
    })        
})
})




function calculateAge(birthdate) {
    if (birthdate) {
        let now = new Date();
        let iNow = parseInt(now.toISOString().slice(0, 10).replace(/-/g, ''));
        let iBirthDay = parseInt(birthdate);
        let sAge = (iNow - iBirthDay).toString();
        if (sAge.length > 4)
            return parseInt(sAge.substring(0, sAge.length - 4));
        else
            return 0;
    } else {
        return 0;
    }
}







/** 
 * 24.05. 13
 * @description 피부 항목별 점수 계산 로직 (마크뷰 값 기준)
 **/
function GetGubunByAverage(markvu, vapometer_C_Left, vapometer_C_Right, cutometer_cheek, gubun){
    let result = 0;

    switch (gubun)
            {
                case "모공":
                    result = (markvu.FPore_A + markvu.FPore_B + markvu.FPore_G + markvu.FPore_H) / 4;
                    break;
                case "주름":
                    result = (markvu.FWrinkle_A + markvu.FWrinkle_C + markvu.FWrinkle_D + markvu.FWrinkle_E + markvu.FWrinkle_F) / 5;
                    break;
                case "미래주름":
                    result = (markvu.FFutureWrinkle_A + markvu.FFutureWrinkle_E + markvu.FFutureWrinkle_F + markvu.FFutureWrinkle_G + markvu.FFutureWrinkle_H) / 5;
                    break;
                case "색소침착":
                    result = (markvu.FPigmentation_A + markvu.FPigmentation_B + markvu.FPigmentation_E + markvu.FPigmentation_F + markvu.FPigmentation_G + markvu.FPigmentation_H) / 6;
                    break;
                case "멜라닌":
                    if(markvu.Sex==="M")
                        result = (markvu.FMelanin_A + markvu.FMelanin_B + markvu.FMelanin_E + markvu.FMelanin_F + markvu.FMelanin_G + markvu.FMelanin_H) / 6;
                    else
                        result = (markvu.FMelanin_A + markvu.FMelanin_G + markvu.FMelanin_H) / 3;
                    break;
                case "붉은기":
                    result = (markvu.FRedness_A + markvu.FRedness_B + markvu.FRedness_E + markvu.FRedness_F + markvu.FRedness_G + markvu.FRedness_H) / 6;
                    break;
                case "포피린":
                    result = (markvu.FPorphyrin_A + markvu.FPorphyrin_B + markvu.FPorphyrin_G + markvu.FPorphyrin_H) / 4;
                    break;
            
                //바포미터
                case "경피수분손실도":
                    if (vapometer_C_Left !== null)
                    {
                        result = (vapometer_C_Left + vapometer_C_Right)/2 ;
                    }
                    else
                    {           
                        result = -1;
                    }
                    break;

                //큐토미터
                case "탄력":
                    if (cutometer_cheek !== null)
                    {

                        result = cutometer_cheek;
                    }
                    else
                    {
                        //측정을 안했을경우 보통 표기
                        result = -1;
                    }
                    //탄력값
                    break;
            }

            return result;

}

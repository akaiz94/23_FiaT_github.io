$(document).ready(function () {
    console.log('print003 page start ->')
    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));
  
    // var surveyNo = localStorage.getItem('custom_surveyNo');
    surveyNo = 1111;
    console.log('surveyNo : ', surveyNo);

// #1 Scalp Type, Hair Conditions, hair Density Type 부분 API 값요청
var hairMain_URL = 'http://127.0.0.1:8000/v1/hairMain/' + surveyNo;
$.ajax({
    url: hairMain_URL,
    type: 'GET',
    success: function (response) {
        console.log('hairMain 응답 : ', response);

        // 1st. Scalp Type 값
        var ScalpType_Nor = response.ScalpType_Nor;
        var ScalpType_Oily = response.ScalpType_Oily;
        var ScalpType_Ato = response.ScalpType_Ato;
        var ScalpType_Trb = response.ScalpType_Trb;
        var ScalpType_Dry = response.ScalpType_Dry;
        var ScalpType_Sen = response.ScalpType_Sen;
        var ScalpType_Seb = response.ScalpType_Seb;
        var ScalpType_Ddan = response.ScalpType_Ddan;
        var ScalpType_Odan = response.ScalpType_Odan;
        var ScalpType_Unknown = response.ScalpType_Unknown;

        var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
        $('.type-item').removeClass('active');
        $(`.type-item:contains(${scalpType})`).addClass('active');


        // 2nd. Hair Conditions 값
        var Haircondition_Tips = response.Haircondition_Tips;
        var Haircondition_Mid = response.Haircondition_Mid;
        var Haircondition_Root = response.Haircondition_Root;

        //console.log("Haircondition_Tips : ", Haircondition_Tips);
        //console.log(typeof(Haircondition_Tips));

        var Haircondition_Tips_Result = getHaiconditionResult(parseInt(Haircondition_Tips));
        var Haircondition_Mid_Result = getHaiconditionResult(parseInt(Haircondition_Mid));
        var Haircondition_Root_Result = getHaiconditionResult(parseInt(Haircondition_Root));

        //console.log("Haircondition_Tips_Result : ", Haircondition_Tips_Result);

        $('#haircondition_tips').text(Haircondition_Tips_Result);
        $('#haircondition_mid').text(Haircondition_Mid_Result);
        $('#haircondition_root').text(Haircondition_Root_Result);


        // 3rd. hair Density Type 값
        var HairlossType_Basic = response.HairlossType_Basic; //기본
        var HairlossType_Center = response.HairlossType_Center; //정수리
        var HairlossType_FrontCenter = response.HairlossType_FrontCenter; //앞중앙

        console.log("HairlossType_Basic : ", HairlossType_Basic);
        console.log("HairlossType_Basic22 : ", $('#HairlossType_Basic').length);
       

        if (HairlossType_Basic !== null) {
            $('#HairlossType_Basic').text(HairlossType_Basic);
        } else {
            //$('#HairlossType_Basic').hide();
            $('#HairlossType_Basic').parent().remove();
        }

        if (HairlossType_Center !== null) {
            $('#HairlossType_Center').text(HairlossType_Center);
        } else {
            //$('#HairlossType_Center').hide();
            $('#HairlossType_Center').parent().remove();
        }

        if (HairlossType_FrontCenter !== null) {
            $('#HairlossType_FrontCenter').text(HairlossType_FrontCenter);
        } else {
            //$('#HairlossType_FrontCenter').hide();
            $('#HairlossType_FrontCenter').parent().remove();
        }







    },
    error: function (xhr, status, error) {

        console.error('에러 : ', error);
    }
})



// #2 Detailed Information On hair Thickness & Density 부분 API 값요청
var hairLeftHairLine_URL = 'http://127.0.0.1:8000/v1/hairBack/' + surveyNo;
var hairFrontCenter_URL = 'http://127.0.0.1:8000/v1/hairFrontCenter/' + surveyNo;
var hairFrontHairLine_URL = 'http://127.0.0.1:8000/v1/hairFrontHairLine/' + surveyNo;
var hairCenter_URL = 'http://127.0.0.1:8000/v1/hairCenter/' + surveyNo;
var hairRightHairLine_URL = 'http://127.0.0.1:8000/v1/hairRightHairLine/' + surveyNo;
var hairBack_URL = 'http://127.0.0.1:8000/v1/hairBack/' + surveyNo;


// 1.왼쪽 헤어라인
$.ajax({
    url: hairLeftHairLine_URL,
    type: 'GET',
    success: function (response) {
        //console.log('hairLeftHairLine 응답 : ', response);

        var density = response.Density;
        var thickness = response.Thickness;
        updateDensityData(0, density);
        updateThicknessData(0, thickness);
        updateScatterData(0,thickness,density);
       


        $('#hairLeftHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
        $('#hairLeftHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

        var ScalpType_Nor = response.ScalpType_Nor;
        var ScalpType_Oily = response.ScalpType_Oily;
        var ScalpType_Ato = response.ScalpType_Ato;
        var ScalpType_Trb = response.ScalpType_Trb;
        var ScalpType_Dry = response.ScalpType_Dry;
        var ScalpType_Sen = response.ScalpType_Sen;
        var ScalpType_Seb = response.ScalpType_Seb;
        var ScalpType_Ddan = response.ScalpType_Ddan;
        var ScalpType_Odan = response.ScalpType_Odan;
        var ScalpType_Unknown = response.ScalpType_Unknown;

        var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
        $('#hairLeftHairLine .hair-skin-info dd:eq(2)').text(scalpType);


    },
    error: function (xhr, status, error) {

        console.error('에러 : ', error);
    }
})

// 2.앞 헤어라인
$.ajax({
    url: hairFrontHairLine_URL,
    type: 'GET',
    success: function (response) {
        //console.log('hairFrontHairLine 응답 : ', response);

        var density = response.Density;
        var thickness = response.Thickness;
        updateDensityData(1, density);
        updateThicknessData(1, thickness);
        updateScatterData(1,thickness,density);

        $('#hairFrontHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
        $('#hairFrontHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

        var ScalpType_Nor = response.ScalpType_Nor;
        var ScalpType_Oily = response.ScalpType_Oily;
        var ScalpType_Ato = response.ScalpType_Ato;
        var ScalpType_Trb = response.ScalpType_Trb;
        var ScalpType_Dry = response.ScalpType_Dry;
        var ScalpType_Sen = response.ScalpType_Sen;
        var ScalpType_Seb = response.ScalpType_Seb;
        var ScalpType_Ddan = response.ScalpType_Ddan;
        var ScalpType_Odan = response.ScalpType_Odan;
        var ScalpType_Unknown = response.ScalpType_Unknown;

        var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
        $('#hairFrontHairLine .hair-skin-info dd:eq(2)').text(scalpType);

    },
    error: function (xhr, status, error) {

        console.error('에러 : ', error);
    }
})

// 3. 오른쪽 헤어라인
$.ajax({
    url: hairRightHairLine_URL,
    type: 'GET',
    success: function (response) {
        //console.log('hairRightHairLine 응답 : ', response);

        var density = response.Density;
        var thickness = response.Thickness;
        updateDensityData(2, density);
        updateThicknessData(2, thickness);
        updateScatterData(2,thickness,density);

        $('#hairRightHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
        $('#hairRightHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

        var ScalpType_Nor = response.ScalpType_Nor;
        var ScalpType_Oily = response.ScalpType_Oily;
        var ScalpType_Ato = response.ScalpType_Ato;
        var ScalpType_Trb = response.ScalpType_Trb;
        var ScalpType_Dry = response.ScalpType_Dry;
        var ScalpType_Sen = response.ScalpType_Sen;
        var ScalpType_Seb = response.ScalpType_Seb;
        var ScalpType_Ddan = response.ScalpType_Ddan;
        var ScalpType_Odan = response.ScalpType_Odan;
        var ScalpType_Unknown = response.ScalpType_Unknown;

        var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
        $('#hairRightHairLine .hair-skin-info dd:eq(2)').text(scalpType);

    },
    error: function (xhr, status, error) {

        console.error('에러 : ', error);
    }
})



// 4.앞 중앙
$.ajax({
    url: hairFrontCenter_URL,
    type: 'GET',
    success: function (response) {
        //console.log('hairFrontCenter 응답 : ', response);

        var density = response.Density;
        var thickness = response.Thickness;
        updateDensityData(3, density);
        updateThicknessData(3, thickness);
        updateScatterData(3,thickness,density);

        $('#hairFrontCenter .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
        $('#hairFrontCenter .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

        var ScalpType_Nor = response.ScalpType_Nor;
        var ScalpType_Oily = response.ScalpType_Oily;
        var ScalpType_Ato = response.ScalpType_Ato;
        var ScalpType_Trb = response.ScalpType_Trb;
        var ScalpType_Dry = response.ScalpType_Dry;
        var ScalpType_Sen = response.ScalpType_Sen;
        var ScalpType_Seb = response.ScalpType_Seb;
        var ScalpType_Ddan = response.ScalpType_Ddan;
        var ScalpType_Odan = response.ScalpType_Odan;
        var ScalpType_Unknown = response.ScalpType_Unknown;

        var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
        $('#hairFrontCenter .hair-skin-info dd:eq(2)').text(scalpType);

    },
    error: function (xhr, status, error) {

        console.error('에러 : ', error);
    }
})


// 5.정수리
$.ajax({
    url: hairCenter_URL,
    type: 'GET',
    success: function (response) {
        //console.log('hairCenter 응답 : ', response);

        var density = response.Density;
        var thickness = response.Thickness;
        updateDensityData(4, density);
        updateThicknessData(4, thickness);
        updateScatterData(4,thickness,density);

        $('#hairCenter .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
        $('#hairCenter .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

        var ScalpType_Nor = response.ScalpType_Nor;
        var ScalpType_Oily = response.ScalpType_Oily;
        var ScalpType_Ato = response.ScalpType_Ato;
        var ScalpType_Trb = response.ScalpType_Trb;
        var ScalpType_Dry = response.ScalpType_Dry;
        var ScalpType_Sen = response.ScalpType_Sen;
        var ScalpType_Seb = response.ScalpType_Seb;
        var ScalpType_Ddan = response.ScalpType_Ddan;
        var ScalpType_Odan = response.ScalpType_Odan;
        var ScalpType_Unknown = response.ScalpType_Unknown;

        var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
        $('#hairCenter .hair-skin-info dd:eq(2)').text(scalpType);



    },
    error: function (xhr, status, error) {

        console.error('에러 : ', error);
    }
})


// 6. 후두부
$.ajax({
    url: hairBack_URL,
    type: 'GET',
    success: function (response) {
        //console.log('hairBack 응답 : ', response);

        var density = response.Density;
        var thickness = response.Thickness;
        updateDensityData(5, density);
        updateThicknessData(5, thickness);
        updateScatterData(5,thickness,density);

        $('#hairBack .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
        $('#hairBack .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

        var ScalpType_Nor = response.ScalpType_Nor;
        var ScalpType_Oily = response.ScalpType_Oily;
        var ScalpType_Ato = response.ScalpType_Ato;
        var ScalpType_Trb = response.ScalpType_Trb;
        var ScalpType_Dry = response.ScalpType_Dry;
        var ScalpType_Sen = response.ScalpType_Sen;
        var ScalpType_Seb = response.ScalpType_Seb;
        var ScalpType_Ddan = response.ScalpType_Ddan;
        var ScalpType_Odan = response.ScalpType_Odan;
        var ScalpType_Unknown = response.ScalpType_Unknown;

        var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
        $('#hairBack .hair-skin-info dd:eq(2)').text(scalpType);

    },
    error: function (xhr, status, error) {

        console.error('에러 : ', error);
    }
})






});  


















/** 
 * 24.05. 08 
 * @description 
 **/
$(document).ready(function () {
    var surveyNo = $('#survey-value').val();

    $('#survey-value').on('input', function () {
        surveyNo = $(this).val();
        //console.log('입력된 Survey Value 값 : ',surveyNo);
    })


    $('#submit-button').click(function () {

        // #1 Scalp Type, Hair Conditions, hair Density Type 부분 API 값요청
        var hairMain_URL = 'http://127.0.0.1:8000/v1/hairMain/' + surveyNo;
        $.ajax({
            url: hairMain_URL,
            type: 'GET',
            success: function (response) {
                console.log('hairMain 응답 : ', response);

                // 1st. Scalp Type 값
                var ScalpType_Nor = response.ScalpType_Nor;
                var ScalpType_Oily = response.ScalpType_Oily;
                var ScalpType_Ato = response.ScalpType_Ato;
                var ScalpType_Trb = response.ScalpType_Trb;
                var ScalpType_Dry = response.ScalpType_Dry;
                var ScalpType_Sen = response.ScalpType_Sen;
                var ScalpType_Seb = response.ScalpType_Seb;
                var ScalpType_Ddan = response.ScalpType_Ddan;
                var ScalpType_Odan = response.ScalpType_Odan;
                var ScalpType_Unknown = response.ScalpType_Unknown;

                var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
                $('.type-item').removeClass('active');
                $(`.type-item:contains(${scalpType})`).addClass('active');


                // 2nd. Hair Conditions 값
                var Haircondition_Tips = response.Haircondition_Tips;
                var Haircondition_Mid = response.Haircondition_Mid;
                var Haircondition_Root = response.Haircondition_Root;

                //console.log("Haircondition_Tips : ", Haircondition_Tips);
                //console.log(typeof(Haircondition_Tips));

                var Haircondition_Tips_Result = getHaiconditionResult(parseInt(Haircondition_Tips));
                var Haircondition_Mid_Result = getHaiconditionResult(parseInt(Haircondition_Mid));
                var Haircondition_Root_Result = getHaiconditionResult(parseInt(Haircondition_Root));

                //console.log("Haircondition_Tips_Result : ", Haircondition_Tips_Result);

                $('#haircondition_tips').text(Haircondition_Tips_Result);
                $('#haircondition_mid').text(Haircondition_Mid_Result);
                $('#haircondition_root').text(Haircondition_Root_Result);


                // 3rd. hair Density Type 값
                var HairlossType_Basic = response.HairlossType_Basic; //기본
                var HairlossType_Center = response.HairlossType_Center; //정수리
                var HairlossType_FrontCenter = response.HairlossType_FrontCenter; //앞중앙
                if (HairlossType_Basic !== null) {
                    $('#HairlossType_Basic').text(HairlossType_Basic);
                } else {
                    //$('#HairlossType_Basic').hide();
                    $('#HairlossType_Basic').parent().remove();
                }

                if (HairlossType_Center !== null) {
                    $('#HairlossType_Center').text(HairlossType_Center);
                } else {
                    //$('#HairlossType_Center').hide();
                    $('#HairlossType_Center').parent().remove();
                }

                if (HairlossType_FrontCenter !== null) {
                    $('#HairlossType_FrontCenter').text(HairlossType_FrontCenter);
                } else {
                    //$('#HairlossType_FrontCenter').hide();
                    $('#HairlossType_FrontCenter').parent().remove();
                }







            },
            error: function (xhr, status, error) {

                console.error('에러 : ', error);
            }
        })



        // #2 Detailed Information On hair Thickness & Density 부분 API 값요청
        var hairLeftHairLine_URL = 'http://127.0.0.1:8000/v1/hairBack/' + surveyNo;
        var hairFrontCenter_URL = 'http://127.0.0.1:8000/v1/hairFrontCenter/' + surveyNo;
        var hairFrontHairLine_URL = 'http://127.0.0.1:8000/v1/hairFrontHairLine/' + surveyNo;
        var hairCenter_URL = 'http://127.0.0.1:8000/v1/hairCenter/' + surveyNo;
        var hairRightHairLine_URL = 'http://127.0.0.1:8000/v1/hairRightHairLine/' + surveyNo;
        var hairBack_URL = 'http://127.0.0.1:8000/v1/hairBack/' + surveyNo;


        // 1.왼쪽 헤어라인
        $.ajax({
            url: hairLeftHairLine_URL,
            type: 'GET',
            success: function (response) {
                //console.log('hairLeftHairLine 응답 : ', response);

                var density = response.Density;
                var thickness = response.Thickness;
                updateDensityData(0, density);
                updateThicknessData(0, thickness);
                updateScatterData(0,thickness,density);
               


                $('#hairLeftHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
                $('#hairLeftHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

                var ScalpType_Nor = response.ScalpType_Nor;
                var ScalpType_Oily = response.ScalpType_Oily;
                var ScalpType_Ato = response.ScalpType_Ato;
                var ScalpType_Trb = response.ScalpType_Trb;
                var ScalpType_Dry = response.ScalpType_Dry;
                var ScalpType_Sen = response.ScalpType_Sen;
                var ScalpType_Seb = response.ScalpType_Seb;
                var ScalpType_Ddan = response.ScalpType_Ddan;
                var ScalpType_Odan = response.ScalpType_Odan;
                var ScalpType_Unknown = response.ScalpType_Unknown;

                var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
                $('#hairLeftHairLine .hair-skin-info dd:eq(2)').text(scalpType);


            },
            error: function (xhr, status, error) {

                console.error('에러 : ', error);
            }
        })

        // 2.앞 헤어라인
        $.ajax({
            url: hairFrontHairLine_URL,
            type: 'GET',
            success: function (response) {
                //console.log('hairFrontHairLine 응답 : ', response);

                var density = response.Density;
                var thickness = response.Thickness;
                updateDensityData(1, density);
                updateThicknessData(1, thickness);
                updateScatterData(1,thickness,density);

                $('#hairFrontHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
                $('#hairFrontHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

                var ScalpType_Nor = response.ScalpType_Nor;
                var ScalpType_Oily = response.ScalpType_Oily;
                var ScalpType_Ato = response.ScalpType_Ato;
                var ScalpType_Trb = response.ScalpType_Trb;
                var ScalpType_Dry = response.ScalpType_Dry;
                var ScalpType_Sen = response.ScalpType_Sen;
                var ScalpType_Seb = response.ScalpType_Seb;
                var ScalpType_Ddan = response.ScalpType_Ddan;
                var ScalpType_Odan = response.ScalpType_Odan;
                var ScalpType_Unknown = response.ScalpType_Unknown;

                var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
                $('#hairFrontHairLine .hair-skin-info dd:eq(2)').text(scalpType);

            },
            error: function (xhr, status, error) {

                console.error('에러 : ', error);
            }
        })

        // 3. 오른쪽 헤어라인
        $.ajax({
            url: hairRightHairLine_URL,
            type: 'GET',
            success: function (response) {
                //console.log('hairRightHairLine 응답 : ', response);

                var density = response.Density;
                var thickness = response.Thickness;
                updateDensityData(2, density);
                updateThicknessData(2, thickness);
                updateScatterData(2,thickness,density);

                $('#hairRightHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
                $('#hairRightHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

                var ScalpType_Nor = response.ScalpType_Nor;
                var ScalpType_Oily = response.ScalpType_Oily;
                var ScalpType_Ato = response.ScalpType_Ato;
                var ScalpType_Trb = response.ScalpType_Trb;
                var ScalpType_Dry = response.ScalpType_Dry;
                var ScalpType_Sen = response.ScalpType_Sen;
                var ScalpType_Seb = response.ScalpType_Seb;
                var ScalpType_Ddan = response.ScalpType_Ddan;
                var ScalpType_Odan = response.ScalpType_Odan;
                var ScalpType_Unknown = response.ScalpType_Unknown;

                var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
                $('#hairRightHairLine .hair-skin-info dd:eq(2)').text(scalpType);

            },
            error: function (xhr, status, error) {

                console.error('에러 : ', error);
            }
        })



        // 4.앞 중앙
        $.ajax({
            url: hairFrontCenter_URL,
            type: 'GET',
            success: function (response) {
                //console.log('hairFrontCenter 응답 : ', response);

                var density = response.Density;
                var thickness = response.Thickness;
                updateDensityData(3, density);
                updateThicknessData(3, thickness);
                updateScatterData(3,thickness,density);

                $('#hairFrontCenter .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
                $('#hairFrontCenter .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

                var ScalpType_Nor = response.ScalpType_Nor;
                var ScalpType_Oily = response.ScalpType_Oily;
                var ScalpType_Ato = response.ScalpType_Ato;
                var ScalpType_Trb = response.ScalpType_Trb;
                var ScalpType_Dry = response.ScalpType_Dry;
                var ScalpType_Sen = response.ScalpType_Sen;
                var ScalpType_Seb = response.ScalpType_Seb;
                var ScalpType_Ddan = response.ScalpType_Ddan;
                var ScalpType_Odan = response.ScalpType_Odan;
                var ScalpType_Unknown = response.ScalpType_Unknown;

                var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
                $('#hairFrontCenter .hair-skin-info dd:eq(2)').text(scalpType);

            },
            error: function (xhr, status, error) {

                console.error('에러 : ', error);
            }
        })


        // 5.정수리
        $.ajax({
            url: hairCenter_URL,
            type: 'GET',
            success: function (response) {
                //console.log('hairCenter 응답 : ', response);

                var density = response.Density;
                var thickness = response.Thickness;
                updateDensityData(4, density);
                updateThicknessData(4, thickness);
                updateScatterData(4,thickness,density);

                $('#hairCenter .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
                $('#hairCenter .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

                var ScalpType_Nor = response.ScalpType_Nor;
                var ScalpType_Oily = response.ScalpType_Oily;
                var ScalpType_Ato = response.ScalpType_Ato;
                var ScalpType_Trb = response.ScalpType_Trb;
                var ScalpType_Dry = response.ScalpType_Dry;
                var ScalpType_Sen = response.ScalpType_Sen;
                var ScalpType_Seb = response.ScalpType_Seb;
                var ScalpType_Ddan = response.ScalpType_Ddan;
                var ScalpType_Odan = response.ScalpType_Odan;
                var ScalpType_Unknown = response.ScalpType_Unknown;

                var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
                $('#hairCenter .hair-skin-info dd:eq(2)').text(scalpType);



            },
            error: function (xhr, status, error) {

                console.error('에러 : ', error);
            }
        })


        // 6. 후두부
        $.ajax({
            url: hairBack_URL,
            type: 'GET',
            success: function (response) {
                //console.log('hairBack 응답 : ', response);

                var density = response.Density;
                var thickness = response.Thickness;
                updateDensityData(5, density);
                updateThicknessData(5, thickness);
                updateScatterData(5,thickness,density);

                $('#hairBack .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
                $('#hairBack .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

                var ScalpType_Nor = response.ScalpType_Nor;
                var ScalpType_Oily = response.ScalpType_Oily;
                var ScalpType_Ato = response.ScalpType_Ato;
                var ScalpType_Trb = response.ScalpType_Trb;
                var ScalpType_Dry = response.ScalpType_Dry;
                var ScalpType_Sen = response.ScalpType_Sen;
                var ScalpType_Seb = response.ScalpType_Seb;
                var ScalpType_Ddan = response.ScalpType_Ddan;
                var ScalpType_Odan = response.ScalpType_Odan;
                var ScalpType_Unknown = response.ScalpType_Unknown;

                var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
                $('#hairBack .hair-skin-info dd:eq(2)').text(scalpType);

            },
            error: function (xhr, status, error) {

                console.error('에러 : ', error);
            }
        })

    })


});



/*
******************* 이후 차트 생성 **********************
*/





/** 
 * 24.05. 11
 * @description 모발 굵기 차트(생성 후, 더미데이터 값)
 **/
var thicknessData = {
    labels: ['좌 ①', '앞 ②', '우 ③', '앞중앙 ④', '정수리 ⑤', '후두부 ⑥'],
    datasets: [{
        label: '굵기(mm)',
        data: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06],
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1
    }]
}

var ctx = document.getElementById('thicknessChart').getContext('2d');
var thicknessChart = new Chart(ctx, {
    type: 'bar',
    data: thicknessData,
    plugins: [ChartDataLabels],
    options: {
        responsive: false,
        indexAxis: 'y',
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 0.15,
                ticks: {
                    stepSize: 0.075,
                    font: {
                        size: 9
                    }
                },                 
                grid: {
                    borderDash: [5, 5],
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            y: {
                ticks:{                    
                    font: {
                        size: 9
                    }
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        // onRender: function(chart){
        //     var ctx = chart.ctx;
        //     chart.data.datasets.array.forEach(function(dataset, datasetIndex) {
        //         var meta = chart.getDatasetMeta (datasetIndex);
        //         meta.data.forEach(function(bar,index){
        //             var data = dataset.data[index];
        //             ctx.fillStyle = '#000';
        //             ctx.font = '12px Arial';
        //             ctx.textAlign = 'center';
        //             ctx.textBaseline = 'bottom';
        //             ctx.fillText(data, bar.x, bar.y -5);
        //         });                    
        //     });
        // }
    }
});

/** 
 * 24.05. 11
 * @description API통신을 통한 실제 고객 모발굵기 업데이트
 **/
function updateThicknessData(index, thicknessValue) {
    thicknessData.datasets[0].data[index] = thicknessValue;
    thicknessChart.update();
}




/** 
 * 24.05. 11
 * @description 모발 밀도 차트(생성 후, 더미데이터 값)
 **/
var densityData = {
    labels: ['좌 ①', '앞 ②', '우 ③', '앞중앙 ④', '정수리 ⑤', '후두부 ⑥'],
    datasets: [{
        label: '밀도(hairs/㎠)',
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1
    }]
}

var ctx2 = document.getElementById('densityChart').getContext('2d');
var densityChart = new Chart(ctx2, {
    type: 'bar',
    data: densityData,
    plugins: [ChartDataLabels],
    options: {
        responsive: false,
        indexAxis: 'y',
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 240,
                ticks: {
                    stepSize: 120,
                    font: {
                        size: 9
                    }
                },  
                grid: {
                    borderDash: [5, 5],
                    color: 'rgba(0, 0, 0, 0.1)',                    
                },
                // afterBulidTicks: function(scale, ticks){
                //     var newTicks = ticks.slice();
                //     newTicks.push(100);
                //     return newTicks;
                // }
            },
            y: {
                ticks:{                    
                    font: {
                        size: 9
                    }
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
    }
});

/** 
 * 24.05. 11
 * @description API통신을 통한 실제 고객 모발밀도 업데이트
 **/
function updateDensityData(index, densityValue) {
    densityData.datasets[0].data[index] = densityValue;
    densityChart.update();
}





/** 
 * 24.05. 14
 * @description 모발 밀도&굵기 scatter 차트(생성 후, 더미데이터 값)
 **/
var scatterData = {
    datasets: [{
        label: '',
        data: [
            { x: 0.077, y: 50, label: '① 좌' },
            { x: 0.065, y: 90, label: '② 앞' },
            { x: 0.06, y: 70, label: '③ 우' },        
            { x: 0.065, y: 40, label: '④ 중앙' },
            { x: 0.07, y: 75, label: '⑤ 정수리' },
            { x: 0.07, y: 75, label: '⑥ 후두부' }
        ],
        backgroundColor: 'rgba(159, 159, 159, 0.5)', // 데이터 포인트 색상
        pointRadius: 5,
        pointHoverRadius: 10
    }]
}

var ctx_scatterChart = document.getElementById('scatterChart').getContext('2d');
var scatterChart = new Chart(ctx_scatterChart, {
    type: 'scatter',
    data: scatterData,    
    options: {
        responsive: false,
        plugins: {
            annotation: {
                annotations: {
                    circle: {
                        type: 'ellipse',
                        xMin: 0.045,
                        xMax: 0.085,
                        yMin: 40,
                        yMax: 100,
                        backgroundColor: 'rgba(255, 192, 203, 0.3)', // 원형 영역 색상
                        borderColor: 'transparent',
                        borderWidth: 0
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '굵기',
                    font: {
                        size: 9
                    }
                },
                min: 0,
                max: 0.15,
                ticks: {
                    stepSize: 0.075,
                    font: {
                        size: 9 // 폰트 크기 조절
                    }

                },
                grid: {
                    color: '#ddd',
                    borderDash: [5, 5]
                }
            },
            y: {
                title: {
                    display: true,
                    text: '밀도',
                    font: {
                        size: 9
                    }
                },
                min: 0,
                max: 240,
                ticks: {
                    stepSize: 120,
                    font: {
                        size: 9 // 폰트 크기 조절
                    }
                },
                grid: {
                    color: '#ddd',
                    borderDash: [5, 5]
                }
            }
        },
        elements: {
            point: {
                borderWidth: 0, // 데이터 포인트 테두리 제거
            }
        },
        layout: {
            padding: {
                right: 30 // 오른쪽 여백 조정
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.dataset.data[context.dataIndex].label; // 툴팁에 레이블 표시
                    }
                }
            },
        }
    }
});

/** 
 * 24.05. 14
 * @description API통신을 통한 실제 모발 밀도&굵기 scatter업데이트
 **/
function updateScatterData(index, thicknessValue, densityValue) {
    scatterData.datasets[0].data[index].x = thicknessValue;
    scatterData.datasets[0].data[index].y = densityValue;
    scatterChart.update();
}







/** 
 * 24.05. 08 
 * @description 두피 타입별 결과 구분
 **/
function getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown) {
    var scalpType;

    //console.log("getScalpType ScalpType_Ato 출력값 ", ScalpType_Ato);

    if (ScalpType_Nor === 1) {
        scalpType = '양호';
    } else if (ScalpType_Oily === 1) {
        scalpType = '지성';
    } else if (ScalpType_Ato === 1) {
        scalpType = '아토피성';
    } else if (ScalpType_Trb === 1) {
        scalpType = '트러블성';
    } else if (ScalpType_Dry === 1) {
        scalpType = '건성';
    } else if (ScalpType_Sen === 1) {
        scalpType = '민감성';
    } else if (ScalpType_Seb === 1) {
        scalpType = '지루성';
    } else if (ScalpType_Ddan === 1) {
        scalpType = '건성비듬성';
    } else if (ScalpType_Odan === 1) {
        scalpType = '지성비듬성';
    } else if (ScalpType_Unknown === 1) {
        scalpType = '확인필요';
    } else {
        scalpType = '확인필요';
    }
    //console.log("getScalpType scalType 출력값 ", scalType);

    return scalpType;
}

/** 
 * 24.05. 010
 * @description Hair Condition 결과 
 **/
function getHaiconditionResult(score) {
    var haircondition;

    //console.log("score : ", score);
    if (score === 0) {
        haircondition = '건강모';
    } else if (score === 1) {
        haircondition = '약손상모';
    } else if (score === 2) {
        haircondition = '손상모';
    } else if (score === 3) {
        haircondition = '극손상모';
    } else if (score === 4) {
        haircondition = '열모/지모';
    } else {
        haircondition = '확인필요';
    }

    //console.log("haircondition : ",haircondition);
    return haircondition;
}
